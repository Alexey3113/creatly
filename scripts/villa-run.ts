/**
 * AZURA — вилла на краю моря. Сайт-фильм: сквозной пролёт камеры по вилле
 * на закате (въезд → холл → гостиная → спальня → терраса → бассейн), собранный
 * из 6 сегментов start→end в одно 30-сек видео; главы-станции всплывают на
 * таймкодах стыков — камера ведёт «из истории в историю» не прерываясь.
 * Запуск: set -a; source .env; set +a; npx tsx --tsconfig tsconfig.json scripts/villa-run.ts
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
const FOLDER = "azura-villa";
const S = "villa";
const t0 = Date.now();
const log = (m: string) => console.log(`[${((Date.now() - t0) / 60000).toFixed(1)}м] ${m}`);

const UNIVERSE = "luxury Mediterranean cliffside villa at golden hour, warm travertine stone, natural oak, floor-to-ceiling glass, infinity pool merging with the sea, minimalist architecture, cinematic warm sunset light, calm and expensive, no people";

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

  // ── 7 кадров сквозного пролёта (ref-цепочка = один мир, одна вилла) ──
  log("кадры пролёта: 7 последовательно…");
  const chainPrompts = [
    "aerial approach to a modern minimalist villa on a Mediterranean clifftop, cypress trees lining the driveway, warm travertine facade, the glowing sea behind",
    "the tall glass and oak entrance doors of the villa, warm light spilling from inside, inviting threshold",
    "wide double-height living room with floor-to-ceiling glass overlooking the sea, minimalist furniture, warm travertine floor, sunset light flooding in",
    "open kitchen with a sculptural stone island flowing into a dining area, glass doors open to the terrace, sea view, golden light",
    "master bedroom with a low bed facing a panoramic window, the sea and sunset filling the frame, serene minimalism",
    "open terrace with an infinity pool, loungers, the pool edge merging with the sea horizon",
    "close low view of the infinity pool water merging seamlessly with the glowing sea at sunset, reflections, the villa edge",
  ];
  const chain: string[] = [];
  for (let i = 0; i < chainPrompts.length; i++) {
    const f = await frame(`chain-${i}`, chainPrompts[i], chain[i - 1]);
    if (!f) throw new Error(`кадр ${i} не собрался`);
    chain.push(f);
    log(`  кадр ${i + 1}/${chainPrompts.length} готов`);
  }

  // ── 6 видео-сегментов start→end СТРОГО ПОСЛЕДОВАТЕЛЬНО (end-frame боится параллели) ──
  log("видео-мосты: 6 сегментов последовательно…");
  const motions = [
    "camera flies forward up the driveway toward the villa entrance, the doors growing closer",
    "camera glides through the entrance doors into the double-height living room, revealing the sea view",
    "camera moves across the living room into the open kitchen and dining area toward the terrace doors",
    "camera drifts from the kitchen down a hall into the master bedroom, the panoramic sea window revealed",
    "camera moves from the bedroom out onto the terrace toward the infinity pool",
    "camera glides low across the terrace to the infinity pool edge where the water meets the sea",
  ];
  const clips: string[] = [];
  for (let i = 0; i < motions.length; i++) {
    let ok = false;
    for (let a = 0; a < 3 && !ok; a++) {
      try {
        const url = await higsGenerateVideo({ prompt: `${motions[i]}, slow smooth continuous camera move, no cuts, no scene change, seamless, cinematic golden hour`, jobId: `${S}-seg-${i}-${a}-${Date.now().toString(36)}`, folder: FOLDER, startFrame: chain[i], endFrame: chain[i + 1], duration: 5 });
        const local = join(DIR, `${S}-seg-${i}.mp4`);
        await higsDownload(url, local);
        clips.push(local);
        ok = true;
        log(`  сегмент ${i + 1}/${motions.length} готов`);
      } catch (e) { log(`  сегмент ${i + 1} попытка ${a + 1}: ${String(e).slice(0, 90)}`); }
    }
    if (!ok) { log(`  сегмент ${i + 1} не собрался — стоп фильма`); break; }
  }
  let heroVideo: string | null = null;
  if (clips.length === motions.length) {
    const hv = join(DIR, `${S}-film.mp4`);
    await concatScrub(clips, hv);
    await extractPoster(hv, join(DIR, `${S}-film-poster.jpg`));
    heroVideo = `${WEB}/${S}-film.mp4`;
    log(`фильм склеен ✓ (${clips.length} сегментов)`);
  } else {
    log(`фильм НЕ полный (${clips.length}/${motions.length}) — hero станет постером`);
  }

  const cw = (i: number) => `${WEB}/${S}-chain-${i}.jpg`;

  // ═══ СБОРКА ═══
  log("сборка документа…");
  let doc = createEmptyDocument("AZURA — вилла на краю моря");
  const ops: SiteOp[] = [
    { op: "set-fonts", heading: "Cormorant Garamond", body: "Jost" },
    { op: "set-tokens", tokens: {
      "--color-bg": "#f4efe6", "--color-bg-alt": "#ebe3d5", "--color-surface": "#ffffff",
      "--color-text": "#2b2621", "--color-text-muted": "#7d7264",
      "--color-primary": "#3f5c54", "--color-accent": "#c17a4f", "--color-border": "#ddd3c4",
    } },
    { op: "add-block", presetId: "header-transparent-01", fields: { "hd03-logo": "AZURA", "hd03-cta": "Приватный показ" } },
  ];

  // ── АКТ 1: фильм-пролёт (story-poster, 6 глав-станций на таймкодах) ──
  if (heroVideo) {
    ops.push({ op: "add-block", presetId: "story-poster-01", variantId: "center", fields: {
      "sp01-video": heroVideo,
      "sp01-meta-left": "AZURA · частная вилла",
      "sp01-meta-right": "Средиземное море",
    }, collections: { "sp01-chapters": [
      { fields: { "sp01-step-text": "AZURA. Здесь *суша* заканчивается.", "sp01-step-time": "0.3" } },
      { fields: { "sp01-step-text": "Свет входит раньше *гостей*.", "sp01-step-time": "5" } },
      { fields: { "sp01-step-text": "Кухня, где ужин — *спектакль* с видом на закат.", "sp01-step-time": "11" } },
      { fields: { "sp01-step-text": "Спальня наедине с *горизонтом*.", "sp01-step-time": "17" } },
      { fields: { "sp01-step-text": "Граница между домом и морем — *стёрта*.", "sp01-step-time": "23" } },
      { fields: { "sp01-step-text": "Дальше только вода. И она — *ваша*.", "sp01-step-time": "29" } },
    ] } });
  } else {
    ops.push({ op: "add-block", presetId: "story-prologue-01", fields: {
      "prl-media": cw(6), "prl-meta": "AZURA · частная вилла", "prl-title": "Здесь *суша* заканчивается",
      "prl-sub": "Частная вилла на средиземноморской скале. Инфинити-бассейн сливается с морем, а закат приходит прямо в спальню.",
      "prl-hint": "Листайте — входим",
    } });
  }

  // ── АКТ 2: детали ──
  ops.push({ op: "add-block", presetId: "story-highlight-01", variantId: "dark", fields: {
    "hl01-kicker": "О вилле",
    "hl01-statement": "AZURA — это не дом с видом на море. Это дом, *растворённый* в нём: стекло вместо стен, вода вместо границы, свет вместо украшений. Восемьсот метров тишины на самом краю *континента*.",
  } });

  ops.push({ op: "add-block", presetId: "gallery-coverflow-01", variantId: "dark", fields: {
    "cf01-eyebrow": "Пространства", "cf01-title": "Шесть *комнат* без стен",
  }, collections: { "cf01-cards": [
    { fields: { "cf01-card-image": cw(2), "cf01-card-name": "Гостиная", "cf01-card-tag": "двусветная, панорама 180°" } },
    { fields: { "cf01-card-image": cw(3), "cf01-card-name": "Кухня-столовая", "cf01-card-tag": "каменный остров, выход на террасу" } },
    { fields: { "cf01-card-image": cw(4), "cf01-card-name": "Мастер-спальня", "cf01-card-tag": "окно во всю стену на море" } },
    { fields: { "cf01-card-image": cw(5), "cf01-card-name": "Терраса", "cf01-card-tag": "инфинити-бассейн 25 м" } },
    { fields: { "cf01-card-image": cw(1), "cf01-card-name": "Входная группа", "cf01-card-tag": "дуб и стекло 5 м" } },
  ] } });

  ops.push({ op: "add-block", presetId: "case-studies-counters-01", variantId: "dark", fields: { "csc01-title": "Вилла в цифрах" }, collections: { "csc01-stats": [
    { fields: { "csc01-value": "820 м²", "csc01-label": "жилой площади" } },
    { fields: { "csc01-value": "40", "csc01-label": "соток на скале" } },
    { fields: { "csc01-value": "6", "csc01-label": "спален с видом на море" } },
    { fields: { "csc01-value": "25 м", "csc01-label": "инфинити-бассейн" } },
  ] } });

  ops.push({ op: "add-block", presetId: "cta-split-02", fields: {
    "cta-image": cw(5),
    "cta-heading": "Приезжайте на закат",
    "cta-description": "Мы открываем AZURA только для одного гостя в день. Приватный показ с бокалом на террасе — пока солнце садится в ваш будущий бассейн.",
    "cta-button": "Запросить приватный показ",
  } });

  ops.push({ op: "add-block", presetId: "footer-dark-01", variantId: "gradient-line", fields: {
    "footer-logo": "AZURA",
    "footer-description": "Частная вилла на средиземноморской скале. Продажа и приватные показы по записи.",
    "footer-contact-text": "azura@estate.com · +7 495 000-00-00",
    "footer-copyright": "© AZURA Estate. Где заканчивается суша.",
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
  const p = await prisma.project.upsert({ where: { slug: "azura-villa" }, update: { document: doc as never }, create: { slug: "azura-villa", name: "AZURA — вилла на краю моря", document: doc as never, userId: user.id } });
  log(`ГОТОВО: http://localhost:3000/editor?project=${p.id} (фильм: ${heroVideo ? "да" : "нет"})`);
}
main().catch((e) => { console.error("VILLA FAILED:", e); process.exit(1); }).finally(() => prisma.$disconnect());
