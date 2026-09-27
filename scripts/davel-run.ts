/**
 * Живой прогон ПОЛНОЙ цепочки для Davel Mebel: арт-дирекшн → выбор → контент
 * (с chp-comp) → медиа Higgsfield (QA, ретраи, вырезы с альфа-гейтом, видео)
 * → палитра из кадра → хореография → bespoke-hero → цикл самопроверки.
 * Запуск: set -a; source .env; set +a; npx tsx --tsconfig tsconfig.json scripts/davel-run.ts
 */
import { PrismaClient } from "@prisma/client";
import { buildArtDirectionPrompt, parseArtDirection } from "@/lib/ai/art-direction";
import {
  buildContentPrompt,
  buildDocumentFromManifest,
  buildSelectionPrompt,
  parseContentManifest,
  parseSelection,
} from "@/lib/site/generate";
import { runMediaPipeline } from "@/lib/ai/media-pipeline";
import { applyBespokeHero } from "@/lib/ai/bespoke";
import { runReviewLoop } from "@/lib/ai/review-loop";
import { higsAvailable } from "@/lib/ai/higs";

const prisma = new PrismaClient();
const KEY = process.env.ANTHROPIC_API_KEY || "";
const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5";
const BASE = "https://api.anthropic.com/v1";

type Img = { data: string; mime: string };
async function claude(system: string, user: string, images: Img[] = []): Promise<string> {
  const content: unknown[] = [
    ...images.map((img) => ({ type: "image", source: { type: "base64", media_type: img.mime, data: img.data } })),
    { type: "text", text: user },
  ];
  const res = await fetch(`${BASE}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": KEY, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({ model: MODEL, max_tokens: 8000, system, messages: [{ role: "user", content }] }),
  });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  return (data.content || []).filter((p: { type?: string }) => p?.type === "text").map((p: { text?: string }) => p.text || "").join("");
}

const BRIEF = `Премиальный сайт для мебельной фабрики Davel Mebel: мебель на заказ — шкафы, диваны, кровати, двери, кухни. Под ключ по всей России, онлайн-расчёт по фото за 5 минут, телеграм t.me/davelmeb_bot, быстро и качественно.

Концепция — сайт-путешествие по квартире: посетитель как будто идёт по премиальному интерьеру вечером и осматривает мебель — тёплый направленный свет, благородное дерево, ткань и латунь, каждая глава — новая комната (гостиная с диваном → спальня с кроватью → гардеробная со шкафом), в кадре всегда мебель фабрики как главный герой. Никакой античности и исторических декораций — современный премиальный интерьер, кино-свет, глубокие тени, атмосфера дорогого дома.

Главы истории: глава 1 — «Гостиная» (диван ручной работы в вечернем свете), глава 2 — «Спальня» (кровать с мягким изголовьем, льняной текстиль), глава 3 — «Гардеробная» (шкаф-купе от пола до потолка, подсветка полок). Поверх сцен летают предметы мастерской: образец шпона ореха, латунная ручка, катушка обивочной нити, бархатная подушка. Переход между главами — маска со срезанными углами (гранёная плита), это фирменный эффект сайта.

Между главами — чистые секции: как мы работаем (фото → расчёт за 5 минут → замер → производство → монтаж), материалы и фурнитура, отзывы, цифры (12 лет, 3400 проектов, гарантия 5 лет), CTA «Рассчитать по фото» → телеграм-бот. Тон — спокойный, мастерской, без пафоса.`;

async function main() {
  if (!KEY) throw new Error("нет ANTHROPIC_API_KEY (запусти с source .env)");
  if (!(await higsAvailable())) throw new Error("Higs Bot оффлайн");
  const t0 = Date.now();
  const log = (m: string) => console.log(`[${((Date.now() - t0) / 60000).toFixed(1)}м] ${m}`);

  log("Stage A: арт-дирекшн…");
  const ad = parseArtDirection(await claude("Ты — арт-директор премиум веб-студии. Отвечай только валидным JSON.", buildArtDirectionPrompt(BRIEF, undefined, "story")));
  if (!ad) throw new Error("арт-дирекшн не распарсился");
  log(`пак ${ad.stylePackId} | ${ad.concept.slice(0, 90)}`);

  log("Stage B1: выбор блоков…");
  const ids = parseSelection(await claude("Ты — арт-директор. Выбирай блоки из каталога. Отвечай только JSON.", buildSelectionPrompt(BRIEF, ad, undefined, "story")));
  if (!ids) throw new Error("выбор блоков не распарсился");
  log(`блоки: ${ids.join(", ")}`);

  log("Stage B2: контент…");
  const manifest = parseContentManifest(await claude("Ты — копирайтер. Заполняй поля блоков конкретикой из брифа. Отвечай только JSON.", buildContentPrompt(BRIEF, ad, ids)), ids);
  if (!manifest) throw new Error("контент не распарсился");
  const chapters = manifest.find((b) => b.presetId === "story-chapters-01");
  log(`главы: ${chapters?.collections?.["chp-chapters"]?.length ?? 0}, variant=${chapters?.variantId || "-"}, comp главы 1: ${chapters?.collections?.["chp-chapters"]?.[0]?.fields?.["chp-comp"] || "-"}`);

  log("Медиа-конвейер Higgsfield…");
  const media = await runMediaPipeline(BRIEF, ad, manifest, 1, {
    callModel: (s, u) => claude(s, u),
    callVision: (s, u, img, mime) => claude(s, u, [{ data: img, mime }]),
    progress: (info) => log(`  ${info.phase}: ${info.done ?? "-"}/${info.total ?? "-"}`),
  });
  log(`медиа: кадров ${media.imagesDone}, видео ${media.videosDone}, палитра ${media.palette ? "из кадра" : "арт-дирекшн"}`);
  if (media.palette) ad.palette = media.palette;
  if (!media.heroVideoApplied) {
    const idx = manifest.findIndex((b) => b.presetId === "story-poster-01");
    if (idx !== -1) { manifest.splice(idx, 1); log("story-poster убран: hero-видео не собралось"); }
  }

  let doc = buildDocumentFromManifest("Davel Mebel", manifest, ad, "story");

  log("Bespoke-hero…");
  const b = await applyBespokeHero(doc, ad, BRIEF, (s, u) => claude(s, u));
  doc = b.doc;
  log(`bespoke: ${b.applied ? "применён" : "остался пресетный hero"}`);

  log("Цикл самопроверки…");
  const review = await runReviewLoop(doc, ad, {
    callVisionMulti: (s, u, imgs) => claude(s, u, imgs),
    progress: (round, note) => log(`  ревью ${round}: ${note}`),
  });
  doc = review.doc;
  for (const r of review.reports) log(`  раунд ${r.round}: score ${r.score}, правок ${r.applied}, проблемы: ${r.issues.slice(0, 3).join(" | ")}`);

  const user = await prisma.user.findFirst({ orderBy: { id: "asc" } });
  if (!user) return;
  const p = await prisma.project.upsert({
    where: { slug: "davel-mebel" },
    update: { document: doc as never },
    create: { slug: "davel-mebel", name: "Davel Mebel", document: doc as never, userId: user.id },
  });
  log(`ГОТОВО: http://localhost:3000/editor?project=${p.id}`);
}
main().catch((e) => { console.error("DAVEL RUN FAILED:", e); process.exit(1); }).finally(() => prisma.$disconnect());
