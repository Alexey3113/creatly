/**
 * Бенчмарк-прогон генерации (Sidekick, референс «Can you believe Claude did this»).
 * Повторяет боевой пайплайн: арт-дирекшн → выбор → контент → медиа-конвейер
 * Higgsfield (фото+QA+вырезы+видео) → палитра из кадра → документ в БД.
 * Запуск: set -a; source .env; set +a; npx tsx --tsconfig tsconfig.json scripts/benchmark-run.ts
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
import { higsAvailable } from "@/lib/ai/higs";

const prisma = new PrismaClient();
const KEY = process.env.ANTHROPIC_API_KEY || "";
const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5";
const BASE = "https://api.anthropic.com/v1";

async function claude(system: string, user: string, image?: { data: string; mime: string }): Promise<string> {
  const content: unknown[] = image
    ? [{ type: "image", source: { type: "base64", media_type: image.mime, data: image.data } }, { type: "text", text: user }]
    : [{ type: "text", text: user }];
  const res = await fetch(`${BASE}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": KEY, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({ model: MODEL, max_tokens: 8000, system, messages: [{ role: "user", content }] }),
  });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  return (data.content || []).filter((p: { type?: string }) => p?.type === "text").map((p: { text?: string }) => p.text || "").join("");
}

const BRIEF = `Сайт для AI-ассистента Sidekick — умный помощник, который берёт на себя рутину: пишет тексты, отвечает клиентам, ведёт продажи и аналитику, работает в мессенджерах и на сайте 24/7.

Концепция — сайт-кино из полноэкранных глав, как ожившие классические полотна эпохи Возрождения: величественные мраморные залы и библиотеки в живописном свете старых мастеров, фигуры в античных драпировках, гигантские небесные тела над горизонтом в глубоких голубых тонах, преувеличенный монументальный масштаб. В этих сценах живёт современная технология как главный герой: персонаж в тоге спокойно работает за ноутбуком посреди храма, светящийся экран парит в библиотеке, античная статуя держит смартфон. Контраст «вечное искусство × современный продукт» — суть бренда.

Каждая глава — одно гигантское слово и сцена-полотно: глава 1 — «Рутина» (герой утопает в свитках-задачах, драматичная сцена перегруза), глава 2 — «Помощник» (рядом с героем возникает светящаяся фигура-ассистент, свет меняется на спокойный), глава 3 — «Свобода» (герой смотрит в огромное окно на рассвет, задачи решаются сами на парящих экранах). Поверх сцен летают предметы этого мира: смартфон со светящимся интерфейсом, бронзовое перо, свиток, песочные часы, ноутбук.

Между главами — чистые editorial-секции с серифной типографикой: возможности (ответы клиентам за секунды, тексты и рассылки, аналитика продаж, интеграция с Telegram и сайтом), цифры (отвечает за 3 секунды, экономит 20 часов в неделю, работает 24/7), отзыв клиента, тарифы от 990 ₽/мес, вопросы-ответы. CTA — «Попробовать бесплатно», 14 дней без карты. Тон текстов — спокойный, уверенный, с лёгкой иронией.`;

async function main() {
  if (!KEY) throw new Error("нет ANTHROPIC_API_KEY (запусти с source .env)");
  if (!(await higsAvailable())) throw new Error("Higs Bot оффлайн");
  const t0 = Date.now();
  const log = (m: string) => console.log(`[${((Date.now() - t0) / 60000).toFixed(1)}м] ${m}`);

  log("Stage A: арт-дирекшн…");
  const ad = parseArtDirection(await claude("Ты — арт-директор премиум веб-студии. Отвечай только валидным JSON.", buildArtDirectionPrompt(BRIEF, undefined, "story")));
  if (!ad) throw new Error("арт-дирекшн не распарсился");
  log(`концепция: ${ad.concept.slice(0, 100)} | пак ${ad.stylePackId}`);

  log("Stage B1: выбор блоков…");
  const ids = parseSelection(await claude("Ты — арт-директор. Выбирай блоки из каталога. Отвечай только JSON.", buildSelectionPrompt(BRIEF, ad, undefined, "story")));
  if (!ids) throw new Error("выбор блоков не распарсился");
  log(`блоки: ${ids.join(", ")}`);

  log("Stage B2: контент…");
  const manifest = parseContentManifest(await claude("Ты — копирайтер. Заполняй поля блоков конкретикой из брифа. Отвечай только JSON.", buildContentPrompt(BRIEF, ad, ids)), ids);
  if (!manifest) throw new Error("контент не распарсился");

  log("Медиа-конвейер Higgsfield…");
  const media = await runMediaPipeline(BRIEF, ad, manifest, 1, {
    callModel: (s, u) => claude(s, u),
    callVision: (s, u, img, mime) => claude(s, u, { data: img, mime }),
    progress: (info) => log(`  ${info.phase}: ${info.done ?? "-"}/${info.total ?? "-"}`),
  });
  log(`медиа: кадров ${media.imagesDone}, видео ${media.videosDone}, палитра ${media.palette ? "из кадра" : "арт-дирекшн"}`);
  if (media.palette) ad.palette = media.palette;

  const doc = buildDocumentFromManifest("Sidekick — бенчмарк", manifest, ad, "story");
  const user = await prisma.user.findFirst({ orderBy: { id: "asc" } });
  if (!user) throw new Error("нет пользователя");
  const p = await prisma.project.upsert({
    where: { slug: "benchmark-sidekick" },
    update: { document: doc as never },
    create: { slug: "benchmark-sidekick", name: "Sidekick — бенчмарк", document: doc as never, userId: user.id },
  });
  log(`ГОТОВО: http://localhost:3000/editor?project=${p.id}`);
}
main().catch((e) => { console.error("BENCHMARK FAILED:", e); process.exit(1); }).finally(() => prisma.$disconnect());
