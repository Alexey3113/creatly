/**
 * ЖАР — ресторан авторской кухни на открытом огне. Cinematic-journey в ПЕРВОМ
 * тёплом/чувственном регистре (все прошлые сайты — холодный luxury). Сквозной
 * пролёт сквозь дым и пламя: улица → зал при свечах → открытый огонь → продукт
 * на углях → блюдо. 6 кадров → 5 сегментов start→end → фильм.
 * Запуск: set -a; source .env; set +a; npx tsx --tsconfig tsconfig.json scripts/zhar-run.ts
 */
import { PrismaClient } from "@prisma/client";
import { join } from "path";
import { higsAvailable, higsDownload, higsGenerateImage, higsGenerateVideo } from "@/lib/ai/higs";
import { concatScrub, extractPoster } from "@/lib/media/ffmpeg";
import { createEmptyDocument } from "@/lib/site/create";
import { applyOps, type SiteOp } from "@/lib/site/ops";

const prisma = new PrismaClient();
const DIR = join(process.cwd(), "public", "uploads", "1", "gen");
const WEB = "/uploads/1/gen";
const FOLDER = "zhar-fire";
const S = "zhar";
const t0 = Date.now();
const log = (m: string) => console.log(`[${((Date.now() - t0) / 60000).toFixed(1)}м] ${m}`);

const UNIVERSE = "an intimate fine-dining restaurant built around open live fire, charred wood, aged copper, candlelight, warm amber and ember-orange glow, drifting smoke, dark moody interior, cinematic warm chiaroscuro light like a Dutch master painting, sensual and appetizing, no people faces";

async function frame(id: string, prompt: string, ref?: string): Promise<string | null> {
  for (let a = 0; a < 3; a++) {
    try {
      const url = await higsGenerateImage({ prompt: `${prompt}, ${UNIVERSE}, cinematic, 16:9, no text, no watermark`, jobId: `${S}-${id}-${a}-${Date.now().toString(36)}`, folder: FOLDER, refFrames: ref ? [ref] : undefined });
      const local = join(DIR, `${S}-${id}.jpg`);
      await higsDownload(url, local);
      return local;
    } catch (e) { log(`  ${id} попытка ${a + 1}: ${String(e).slice(0, 80)}`); }
  }
  return null;
}

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot оффлайн");

  log("кадры пролёта: 6 последовательно…");
  const chainPrompts = [
    "a dark evening street, warm amber light spilling from the windows of an intimate restaurant, a glowing doorway inviting inside",
    "just inside the restaurant, dim candlelit interior, aged copper and charred wood, warm reflections, tables with flickering candles",
    "the dining room at night, tables lit by candles, in the background the glow of an open kitchen fire",
    "the open kitchen, tall flames rising from a live-fire grill, sparks and drifting smoke, copper pans catching the firelight",
    "extreme close-up of glistening meat and vegetables searing on the grill grate over glowing embers, smoke rising, drops of fat flaring",
    "the finished plated dish on a dark ceramic plate, warm rim light, wisps of steam, garnish, elegant fine-dining presentation on a wooden table",
  ];
  const chain: string[] = [];
  for (let i = 0; i < chainPrompts.length; i++) {
    const f = await frame(`chain-${i}`, chainPrompts[i], chain[i - 1]);
    if (!f) throw new Error(`кадр ${i} не собрался`);
    chain.push(f);
    log(`  кадр ${i + 1}/${chainPrompts.length} готов`);
  }

  log("видео-мосты: 5 сегментов последовательно…");
  const motions = [
    "camera glides forward from the dark street through the glowing doorway into the warm candlelit interior",
    "camera moves through the dining room past flickering candles toward the glow of the open kitchen fire",
    "camera approaches the live-fire grill as tall flames rise and sparks drift, heat shimmer in the air",
    "camera pushes in close to the grill grate where meat and vegetables sear over glowing embers, smoke curling",
    "camera lifts from the grill and settles onto the finished plated dish, steam rising in warm light",
  ];
  const clips: string[] = [];
  for (let i = 0; i < motions.length; i++) {
    let ok = false;
    for (let a = 0; a < 3 && !ok; a++) {
      try {
        const url = await higsGenerateVideo({ prompt: `${motions[i]}, slow smooth continuous camera move, warm firelight, drifting smoke, no cuts, no scene change, seamless, cinematic`, jobId: `${S}-seg-${i}-${a}-${Date.now().toString(36)}`, folder: FOLDER, startFrame: chain[i], endFrame: chain[i + 1], duration: 5 });
        const local = join(DIR, `${S}-seg-${i}.mp4`);
        await higsDownload(url, local);
        clips.push(local);
        ok = true;
        log(`  сегмент ${i + 1}/${motions.length} готов`);
      } catch (e) { log(`  сегмент ${i + 1} попытка ${a + 1}: ${String(e).slice(0, 90)}`); }
    }
    if (!ok) { log(`  сегмент ${i + 1} не собрался — стоп`); break; }
  }
  let heroVideo: string | null = null;
  if (clips.length === motions.length) {
    const hv = join(DIR, `${S}-film.mp4`);
    await concatScrub(clips, hv);
    await extractPoster(hv, join(DIR, `${S}-film-poster.jpg`));
    heroVideo = `${WEB}/${S}-film.mp4`;
    log(`фильм склеен ✓ (${clips.length} сегментов)`);
  }

  const cw = (i: number) => `${WEB}/${S}-chain-${i}.jpg`;

  log("сборка документа…");
  let doc = createEmptyDocument("ЖАР — кухня на огне");
  const ops: SiteOp[] = [
    { op: "set-fonts", heading: "Cormorant Garamond", body: "Jost" },
    { op: "set-tokens", tokens: {
      "--color-bg": "#0d0a08", "--color-bg-alt": "#14100c", "--color-surface": "#1c1712",
      "--color-text": "#f2e8dc", "--color-text-muted": "#a8988a",
      "--color-primary": "#3a2318", "--color-accent": "#d97a34", "--color-border": "#2a2018",
    } },
    { op: "add-block", presetId: "header-transparent-01", fields: { "hd03-logo": "ЖАР", "hd03-cta": "Забронировать стол" } },
  ];

  if (heroVideo) {
    ops.push({ op: "add-block", presetId: "story-poster-01", variantId: "center", fields: {
      "sp01-video": heroVideo, "sp01-meta-left": "ЖАР · кухня на открытом огне", "sp01-meta-right": "Ужин при свечах",
    }, collections: { "sp01-chapters": [
      { fields: { "sp01-step-text": "ЖАР. Кухня, которая *дышит огнём*.", "sp01-step-time": "5" } },
      { fields: { "sp01-step-text": "Здесь всё решает *пламя*.", "sp01-step-time": "11" } },
      { fields: { "sp01-step-text": "Продукт, огонь — и *ничего лишнего*.", "sp01-step-time": "17" } },
      { fields: { "sp01-step-text": "Вкус, который помнит *дым*.", "sp01-step-time": "24" } },
    ] } });
  } else {
    ops.push({ op: "add-block", presetId: "story-prologue-01", fields: {
      "prl-media": cw(3), "prl-meta": "ЖАР · кухня на открытом огне", "prl-title": "Кухня, которая *дышит огнём*",
      "prl-sub": "Авторская кухня на живом пламени. Продукт, огонь — и ничего лишнего.", "prl-hint": "Листайте — к огню",
    } });
  }

  ops.push({ op: "add-block", presetId: "story-highlight-01", variantId: "dark", fields: {
    "hl01-kicker": "Философия",
    "hl01-statement": "У нас нет плиты. Есть *огонь* — живой, капризный, честный. Он не прощает лишнего движения и не терпит полуфабрикатов. Мы кладём на решётку только то, что *не боится* пламени: сезонный продукт, соль и дым. Остальное — *лишнее*.",
  } });

  ops.push({ op: "add-block", presetId: "gallery-coverflow-01", variantId: "dark", fields: {
    "cf01-eyebrow": "Меню огня", "cf01-title": "Что рождается в *пламени*",
  }, collections: { "cf01-cards": [
    { fields: { "cf01-card-image": cw(4), "cf01-card-name": "Рёбра на углях", "cf01-card-tag": "12 часов в дыму" } },
    { fields: { "cf01-card-image": cw(5), "cf01-card-name": "Сет от шефа", "cf01-card-tag": "7 подач" } },
    { fields: { "cf01-card-image": cw(3), "cf01-card-name": "Овощи с огня", "cf01-card-tag": "сезон и зола" } },
    { fields: { "cf01-card-image": cw(2), "cf01-card-name": "Ужин у пламени", "cf01-card-tag": "стол у гриля" } },
  ] } });

  ops.push({ op: "add-block", presetId: "case-studies-counters-01", variantId: "dark", fields: { "csc01-title": "ЖАР в цифрах" }, collections: { "csc01-stats": [
    { fields: { "csc01-value": "600°", "csc01-label": "температура углей" } },
    { fields: { "csc01-value": "9 лет", "csc01-label": "у одного огня" } },
    { fields: { "csc01-value": "24", "csc01-label": "стола у пламени" } },
    { fields: { "csc01-value": "1", "csc01-label": "гриль. Никакой плиты" } },
  ] } });

  ops.push({ op: "add-block", presetId: "cta-split-02", fields: {
    "cta-image": cw(5),
    "cta-heading": "Стол у огня ждёт",
    "cta-description": "Забронируйте место за грилем — смотрите, как рождается ваш ужин, и чувствуйте жар пламени за спиной. Мест немного: всего 24 стола.",
    "cta-button": "Забронировать стол",
  } });

  ops.push({ op: "add-block", presetId: "footer-dark-01", variantId: "gradient-line", fields: {
    "footer-logo": "ЖАР",
    "footer-description": "Ресторан авторской кухни на открытом огне. Ужины при свечах, стол у гриля, сет от шефа.",
    "footer-contact-text": "Москва, Столешников 8 · +7 495 000-00-00",
    "footer-copyright": "© ЖАР. Всё решает пламя.",
  } });

  const r = applyOps(doc, ops);
  if (r.errors.length) log(`ops errors: ${r.errors.join("; ")}`);
  doc = r.doc;

  const enters: Record<string, string> = {
    "story-highlight-01": "fade", "gallery-coverflow-01": "rise", "case-studies-counters-01": "zoom-in",
    "cta-split-02": "rise", "footer-dark-01": "fade",
  };
  doc = applyOps(doc, doc.pages[0].blocks.filter((b) => enters[b.presetId]).map((b) => ({ op: "set-block-enter" as const, blockId: b.id, enter: enters[b.presetId] as never }))).doc;

  const user = await prisma.user.findFirst({ orderBy: { id: "asc" } });
  if (!user) throw new Error("нет пользователя");
  const p = await prisma.project.upsert({ where: { slug: "zhar-fire" }, update: { document: doc as never }, create: { slug: "zhar-fire", name: "ЖАР — кухня на огне", document: doc as never, userId: user.id } });
  log(`ГОТОВО: http://localhost:3000/editor?project=${p.id} (фильм: ${heroVideo ? "да" : "нет"})`);
}
main().catch((e) => { console.error("ZHAR FAILED:", e); process.exit(1); }).finally(() => prisma.$disconnect());
