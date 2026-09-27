/**
 * Авторский автосалон APEX Motors — я как арт-директор.
 * Генерю всё медиа через Higs Bot (я пишу промпты), собираю сайт руками через ops.
 * Концепция: ночное путешествие к машине в тёмном шоуруме — обсидиан + янтарь.
 * Hero — фирменный start→end скраб (пустой зал → машина проявляется → облёт → фары).
 * Запуск: set -a; source .env; set +a; npx tsx --tsconfig tsconfig.json scripts/apex-run.ts
 */
import { PrismaClient } from "@prisma/client";
import { join } from "path";
import { higsAvailable, higsDownload, higsGenerateImage, higsGenerateVideo, higsRemoveBackground } from "@/lib/ai/higs";
import { concatScrub, extractPoster, probeHasAlpha, toPng } from "@/lib/media/ffmpeg";
import { createEmptyDocument } from "@/lib/site/create";
import { applyOps, type SiteOp } from "@/lib/site/ops";

const prisma = new PrismaClient();
const DIR = join(process.cwd(), "public", "uploads", "1", "gen");
const WEB = "/uploads/1/gen";
const FOLDER = "apex-motors";
const S = "apex";

const t0 = Date.now();
const log = (m: string) => console.log(`[${((Date.now() - t0) / 60000).toFixed(1)}м] ${m}`);

const UNIVERSE = "nocturnal luxury car gallery, polished obsidian-black reflective floor, thin amber and warm-white light strips, volumetric haze, deep shadows, cinematic automotive commercial lighting, rim light on glossy paint, moody expensive quiet power";

/** Обычный кадр 16:9 с ретраями. */
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

/** fg-объект 1:1 → вырез PNG. Возвращает web-путь png или null. */
async function cutout(id: string, prompt: string): Promise<string | null> {
  let src: string | null = null;
  for (let a = 0; a < 3 && !src; a++) {
    try {
      const url = await higsGenerateImage({ prompt: `${prompt}, dramatic amber rim light, dark atmospheric background, premium product shot`, jobId: `${S}-${id}-${a}-${Date.now().toString(36)}`, folder: FOLDER, aspectRatio: "1:1" });
      src = join(DIR, `${S}-${id}-src.png`);
      await higsDownload(url, src);
    } catch (e) { log(`  ${id} gen попытка ${a + 1}: ${String(e).slice(0, 70)}`); }
  }
  if (!src) return null;
  for (let a = 0; a < 2; a++) {
    try {
      const url = await higsRemoveBackground(src, `${S}-${id}-cut-${a}-${Date.now().toString(36)}`, FOLDER);
      const raw = join(DIR, `${S}-${id}-cutraw.png`);
      await higsDownload(url, raw);
      if (!(await probeHasAlpha(raw))) throw new Error("no alpha");
      const out = join(DIR, `${S}-${id}-cut.png`);
      await toPng(raw, out);
      return `${WEB}/${S}-${id}-cut.png`;
    } catch (e) { log(`  ${id} cut попытка ${a + 1}: ${String(e).slice(0, 70)}`); }
  }
  log(`  ${id}: вырез не удался — карточка ${WEB}/${S}-${id}-src.png`);
  return `${WEB}/${S}-${id}-src.png`;
}

async function pool<T>(tasks: (() => Promise<T>)[], limit = 6): Promise<T[]> {
  const out: T[] = new Array(tasks.length);
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(limit, tasks.length) }, async () => {
    while (i < tasks.length) { const k = i++; out[k] = await tasks[k](); }
  }));
  return out;
}

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot оффлайн");

  // ── Hero-цепочка start→end: 4 кадра одного путешествия (ref-связка = один мир) ──
  log("hero-цепочка: 4 кадра последовательно…");
  const chainPrompts = [
    "wide empty dark luxury showroom, a single thin amber light strip runs into the depth toward a covered shape under a cloth, no car visible yet, volumetric haze",
    "same showroom, camera moved forward, the cloth slides revealing the silhouette of a sleek black sports sedan, rim light catching the roofline, reflections on the floor",
    "same black sports sedan, camera at front three-quarter low angle, headlights igniting with warm glow, amber reflections on the hood",
    "extreme close-up of the illuminated headlight and sculpted hood of the black sports sedan, amber light streaks, glossy paint macro detail",
  ];
  const chain: string[] = [];
  for (let i = 0; i < 4; i++) {
    const f = await frame(`chain-${i}`, chainPrompts[i], chain[i - 1]);
    if (!f) throw new Error(`hero кадр ${i} не собрался`);
    chain.push(f);
    log(`  кадр ${i + 1}/4 готов`);
  }

  // ── Hero-видео: 3 сегмента start→end СТРОГО ПО ОДНОМУ ──
  log("hero-видео: 3 сегмента (последовательно — end-frame боится параллели)…");
  const motions = [
    "camera glides slowly forward through the dark showroom toward the covered car shape, the cloth begins to lift, subtle continuous motion, no cuts, no scene change, seamless, cinematic",
    "camera continues forward as the cloth slides off and the black sports sedan is revealed, rim light sweeps the body, subtle continuous motion, no cuts, no scene change, seamless, cinematic",
    "camera arcs around to the front of the car as the headlights ignite with warm amber glow, subtle continuous motion, no cuts, no scene change, seamless, cinematic",
  ];
  const clips: string[] = [];
  for (let i = 0; i < 3; i++) {
    let ok = false;
    for (let a = 0; a < 3 && !ok; a++) {
      try {
        const url = await higsGenerateVideo({ prompt: motions[i], jobId: `${S}-seg-${i}-${a}-${Date.now().toString(36)}`, folder: FOLDER, startFrame: chain[i], endFrame: chain[i + 1], duration: 5 });
        const local = join(DIR, `${S}-seg-${i}.mp4`);
        await higsDownload(url, local);
        clips.push(local);
        ok = true;
        log(`  сегмент ${i + 1}/3 готов`);
      } catch (e) { log(`  сегмент ${i + 1} попытка ${a + 1}: ${String(e).slice(0, 90)}`); }
    }
    if (!ok) { log(`  сегмент ${i + 1} не собрался — hero-скраб отменён`); break; }
  }
  let heroVideo: string | null = null;
  if (clips.length === 3) {
    const hv = join(DIR, `${S}-hero-scrub.mp4`);
    await concatScrub(clips, hv);
    await extractPoster(hv, join(DIR, `${S}-hero-poster.jpg`));
    heroVideo = `${WEB}/${S}-hero-scrub.mp4`;
    log("hero-скраб склеен ✓");
  }

  // ── Кадры глав + галерея + прочее (пул) ──
  log("кадры глав, галерея, cta…");
  const specs: [string, string][] = [
    ["ch-design", "side profile of a sleek black luxury sports sedan in a dark studio, a single sweeping light line tracing the silhouette from headlight to taillight, glossy reflections, automotive design shot"],
    ["ch-power", "dynamic low rear three-quarter shot of the black sports sedan, warm light trails from the taillights, wheel detail, sense of speed in a dark tunnel"],
    ["ch-interior", "interior of a premium sports sedan at night, quilted leather seats, illuminated curved dashboard screen glowing amber, steering wheel in focus, warm ambient light"],
    ["car-1", "front three-quarter of a black luxury coupe in a dark showroom, glossy reflections"],
    ["car-2", "rear three-quarter of a silver luxury sedan under warm light in a dark studio"],
    ["car-3", "front of a deep midnight-blue luxury grand tourer on a dark reflective floor"],
    ["cta", "close-up of hands on a leather steering wheel, warm dashboard glow, night drive"],
    ["owner", "elegant man in a dark tailored suit standing beside a black luxury car at night, three-quarter, confident"],
  ];
  const frames = await pool(specs.map(([id, p]) => () => frame(id, p)));
  const path = (id: string) => { const i = specs.findIndex((s) => s[0] === id); return frames[i] ? `${WEB}/${S}-${id}.jpg` : `${WEB}/${S}-ch-design.jpg`; };

  log("вырезы деталей…");
  const cuts = await pool([
    () => cutout("key", "a premium car key fob, matte black with brushed metal accents, floating"),
    () => cutout("wheel", "a forged alloy sports wheel rim, dark spokes with machined faces, floating"),
    () => cutout("caliper", "a high-performance brake caliper in amber-gold over a carbon ceramic disc, floating"),
    () => cutout("emblem", "a polished chrome abstract circular emblem badge catching amber light, floating"),
  ]);
  const [cutKey, cutWheel, cutCaliper, cutEmblem] = cuts;

  // ═══ СБОРКА САЙТА ═══
  log("сборка документа…");
  let doc = createEmptyDocument("APEX Motors");
  const ops: SiteOp[] = [
    { op: "set-fonts", heading: "Unbounded", body: "Manrope" },
    { op: "set-tokens", tokens: {
      "--color-bg": "#08080a", "--color-bg-alt": "#0f0f12", "--color-surface": "#16161b",
      "--color-text": "#f4f2ee", "--color-text-muted": "#9a968f",
      "--color-primary": "#1a1a20", "--color-accent": "#e0a858", "--color-border": "#26262c",
    } },
    { op: "add-block", presetId: "header-transparent-01", fields: { "hd03-logo": "APEX", "hd03-cta": "Записаться на тест-драйв" } },
  ];

  // Hero: скраб если собрался, иначе постер на кадре D
  if (heroVideo) {
    ops.push({ op: "add-block", presetId: "story-poster-01", fields: {
      "sp01-video": heroVideo,
      "sp01-meta-left": "APEX Motors · премиальный автосалон",
      "sp01-meta-right": "Ночной показ",
    }, collections: { "sp01-chapters": [
      { fields: { "sp01-step-text": "Свет включается только для *вас*.", "sp01-step-time": "0.3" } },
      { fields: { "sp01-step-text": "Машина, которую ждали. Снимаем *покров*.", "sp01-step-time": "5" } },
      { fields: { "sp01-step-text": "Фары загораются — *знакомьтесь*.", "sp01-step-time": "10.5" } },
    ] } });
  } else {
    ops.push({ op: "add-block", presetId: "story-prologue-01", fields: {
      "prl-media": chain[3] ? `${WEB}/${S}-chain-3.jpg` : path("ch-design"),
      "prl-meta": "APEX Motors", "prl-title": "Ключи от *другой скорости*",
      "prl-sub": "Премиальные автомобили с character. Приезжайте вечером — мы включим свет только для вас.",
      "prl-hint": "Листайте — заходим в зал",
    } });
  }

  // Главы: Дизайн / Мощность / Салон — со срезанными углами + вырезы деталей
  ops.push({ op: "add-block", presetId: "story-chapters-01", variantId: "bevel", collections: { "chp-chapters": [
    { fields: {
      "chp-tag": "Глава 01 · Форма", "chp-word": "Дизайн",
      "chp-sub": "Каждая линия проведена рукой, а не алгоритмом. Силуэт, который узнают по одной фаре.",
      "chp-bg": path("ch-design"),
      "chp-fg-a": cutEmblem || cutKey || "", "chp-fg-b": cutWheel || "",
      "chp-comp": "word=lb,mega; a=rt,1.1,-6; b=rb,0.75,9",
    } },
    { fields: {
      "chp-tag": "Глава 02 · Характер", "chp-word": "Мощность",
      "chp-sub": "620 сил под правой ногой. Разгон, от которого сжимается время — 3.1 секунды до сотни.",
      "chp-bg": path("ch-power"),
      "chp-fg-a": cutCaliper || cutWheel || "", "chp-fg-b": cutWheel || "",
      "chp-comp": "word=rt,xl; a=lb,1.2,7; b=rb,0.7,-9",
    } },
    { fields: {
      "chp-tag": "Глава 03 · Тишина", "chp-word": "Салон",
      "chp-sub": "Внутри — только вы и дорога. Кожа ручной выделки, звук студийного класса, свет под настроение.",
      "chp-bg": path("ch-interior"),
      "chp-fg-a": cutKey || cutEmblem || "", "chp-fg-b": cutCaliper || "",
      "chp-comp": "word=cb,xxl; a=lt,1.05,-6; b=rt,0.8,9",
    } },
  ] } });

  // Манифест
  ops.push({ op: "add-block", presetId: "story-highlight-01", variantId: "dark", fields: {
    "hl01-kicker": "Философия APEX",
    "hl01-statement": "Мы не продаём машины. Мы отдаём *ключи* от вечера, когда дорога пустая, город горит внизу, а двигатель дышит вам в спину. Автомобиль — это не металл. Это *свобода*, которую можно завести с кнопки.",
  } });

  // Витрина моделей — coverflow
  ops.push({ op: "add-block", presetId: "gallery-coverflow-01", variantId: "dark", fields: {
    "cf01-eyebrow": "Модельный ряд", "cf01-title": "Выберите свою *ночь*",
  }, collections: { "cf01-cards": [
    { fields: { "cf01-card-image": path("car-1"), "cf01-card-name": "APEX Coupé", "cf01-card-tag": "от 8 900 000 ₽" } },
    { fields: { "cf01-card-image": path("car-2"), "cf01-card-name": "APEX Sedan", "cf01-card-tag": "от 7 400 000 ₽" } },
    { fields: { "cf01-card-image": path("car-3"), "cf01-card-name": "APEX GT", "cf01-card-tag": "от 12 500 000 ₽" } },
    { fields: { "cf01-card-image": path("ch-design"), "cf01-card-name": "APEX Black", "cf01-card-tag": "special edition" } },
  ] } });

  // Характеристики — набегающие цифры
  ops.push({ op: "add-block", presetId: "case-studies-counters-01", variantId: "dark", fields: { "csc01-title": "Цифры, которые чувствуешь" }, collections: { "csc01-stats": [
    { fields: { "csc01-value": "620", "csc01-label": "лошадиных сил" } },
    { fields: { "csc01-value": "3.1 с", "csc01-label": "разгон 0–100 км/ч" } },
    { fields: { "csc01-value": "320", "csc01-label": "км/ч максимальная" } },
    { fields: { "csc01-value": "7 лет", "csc01-label": "гарантии на двигатель" } },
  ] } });

  // Цитата владельца
  ops.push({ op: "add-block", presetId: "testimonials-cinematic-01", fields: {
    "tc01-media": path("owner"),
    "tc01-quote": "Я приехал «просто посмотреть». Через час я понял, что уже *не хочу* выходить из этой машины. APEX не уговаривают — они *показывают*.",
    "tc01-author": "Артём К. — владелец APEX Coupé",
  } });

  // CTA
  ops.push({ op: "add-block", presetId: "cta-split-02", fields: {
    "cta-image": path("cta"),
    "cta-heading": "Вечер за рулём — бесплатно",
    "cta-description": "Оставьте заявку — подадим выбранную модель к вашему дому и отдадим ключи на 24 часа. Без менеджеров над душой. Просто вы и дорога.",
    "cta-button": "Записаться на тест-драйв",
  } });

  ops.push({ op: "add-block", presetId: "footer-dark-01", variantId: "gradient-line", fields: {
    "footer-logo": "APEX Motors",
    "footer-description": "Премиальный автосалон. Ночные показы, тест-драйв на 24 часа, trade-in и лизинг.",
    "footer-contact-text": "Москва, Пресненская наб. 12 · +7 495 000-00-00",
    "footer-copyright": "© APEX Motors. Дорога ждёт.",
  } });

  const r = applyOps(doc, ops);
  if (r.errors.length) log(`ops errors: ${r.errors.join("; ")}`);
  doc = r.doc;

  // Хореография
  const enters: Record<string, string> = {
    "story-highlight-01": "fade", "gallery-coverflow-01": "zoom-through", "case-studies-counters-01": "zoom-in",
    "testimonials-cinematic-01": "fade", "cta-split-02": "rise", "footer-dark-01": "fade",
  };
  doc = applyOps(doc, doc.pages[0].blocks.filter((b) => enters[b.presetId]).map((b) => ({ op: "set-block-enter" as const, blockId: b.id, enter: enters[b.presetId] as never }))).doc;

  const user = await prisma.user.findFirst({ orderBy: { id: "asc" } });
  if (!user) throw new Error("нет пользователя");
  const p = await prisma.project.upsert({ where: { slug: "apex-motors" }, update: { document: doc as never }, create: { slug: "apex-motors", name: "APEX Motors", document: doc as never, userId: user.id } });
  log(`ГОТОВО: http://localhost:3000/editor?project=${p.id} (hero-скраб: ${heroVideo ? "да" : "нет"})`);
}
main().catch((e) => { console.error("APEX FAILED:", e); process.exit(1); }).finally(() => prisma.$disconnect());
