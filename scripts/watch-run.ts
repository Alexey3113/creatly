/**
 * MERIDIAN — часовая мануфактура. Архетип PRODUCT-REVEAL (объект в фокусе).
 * Движение — не пролёт сквозь пространство, а ВРАЩЕНИЕ объекта по скроллу:
 * 4 кадра turntable → 3 сегмента start→end → orbit-скраб (часы поворачиваются
 * когда листаешь). Плюс showcase с выносками, зум-механизм, спеки. Доказывает,
 * что тот же start→end движок даёт другой архетип.
 * Запуск: set -a; source .env; set +a; npx tsx --tsconfig tsconfig.json scripts/watch-run.ts
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
const FOLDER = "meridian-watch";
const S = "watch";
const t0 = Date.now();
const log = (m: string) => console.log(`[${((Date.now() - t0) / 60000).toFixed(1)}м] ${m}`);

const UNIVERSE = "a luxury mechanical wristwatch with a deep blue sunburst dial, polished stainless steel case, gold hands and hour markers, minimalist dial with no brand text, floating on a dark graphite background with dramatic rim light, macro product photography, extremely detailed, cinematic";

async function frame(id: string, prompt: string, ref?: string): Promise<string | null> {
  for (let a = 0; a < 3; a++) {
    try {
      const url = await higsGenerateImage({ prompt: `${prompt}, ${UNIVERSE}, 16:9, no text, no watermark`, jobId: `${S}-${id}-${a}-${Date.now().toString(36)}`, folder: FOLDER, refFrames: ref ? [ref] : undefined });
      const local = join(DIR, `${S}-${id}.jpg`);
      await higsDownload(url, local);
      return local;
    } catch (e) { log(`  ${id} попытка ${a + 1}: ${String(e).slice(0, 80)}`); }
  }
  return null;
}

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot оффлайн");

  // ── Turntable: 4 кадра одних часов под разными углами (ref = один объект) ──
  log("turntable: 4 кадра вращения…");
  const angles = [
    "front view of the watch, dial facing camera, symmetric",
    "same watch rotated 30 degrees to a three-quarter angle, showing the case side and crown",
    "same watch in side profile, showing case thickness, crown and lugs",
    "same watch rotated to a three-quarter back angle, showing the bracelet links",
  ];
  const chain: string[] = [];
  for (let i = 0; i < angles.length; i++) {
    const f = await frame(`orbit-${i}`, angles[i], chain[i - 1]);
    if (!f) throw new Error(`кадр ${i} не собрался`);
    chain.push(f);
    log(`  кадр ${i + 1}/4 готов`);
  }

  // ── Orbit-видео: 3 сегмента turntable start→end ПОСЛЕДОВАТЕЛЬНО ──
  log("orbit-видео: 3 сегмента…");
  const motions = [
    "the luxury watch slowly rotates on a turntable revealing its three-quarter angle and crown",
    "the watch continues rotating smoothly to its side profile showing case thickness",
    "the watch rotates to a three-quarter back angle revealing the bracelet",
  ];
  const clips: string[] = [];
  for (let i = 0; i < motions.length; i++) {
    let ok = false;
    for (let a = 0; a < 3 && !ok; a++) {
      try {
        const url = await higsGenerateVideo({ prompt: `${motions[i]}, seamless smooth turntable rotation, macro product shot, no cuts, no scene change, cinematic`, jobId: `${S}-seg-${i}-${a}-${Date.now().toString(36)}`, folder: FOLDER, startFrame: chain[i], endFrame: chain[i + 1], duration: 5 });
        const local = join(DIR, `${S}-seg-${i}.mp4`);
        await higsDownload(url, local);
        clips.push(local);
        ok = true;
        log(`  сегмент ${i + 1}/3 готов`);
      } catch (e) { log(`  сегмент ${i + 1} попытка ${a + 1}: ${String(e).slice(0, 90)}`); }
    }
    if (!ok) { log(`  сегмент ${i + 1} не собрался — orbit отменён`); break; }
  }
  let orbit: string | null = null;
  if (clips.length === motions.length) {
    const ov = join(DIR, `${S}-orbit.mp4`);
    await concatScrub(clips, ov);
    await extractPoster(ov, join(DIR, `${S}-orbit-poster.jpg`));
    orbit = `${WEB}/${S}-orbit.mp4`;
    log("orbit-скраб склеен ✓");
  }

  // ── Доп. кадры: showcase (фронт для выносок) + zoom-механизм ──
  log("showcase + zoom кадры…");
  const showcase = await frame("showcase", "front view of the watch centered with clean space around it for callout labels", chain[0]);
  const movement = await frame("movement", "extreme macro of the exposed mechanical movement, gears bridges jewels and gold rotor, dramatic light", chain[0]);
  const sc = showcase ? `${WEB}/${S}-showcase.jpg` : `${WEB}/${S}-orbit-0.jpg`;
  const mv = movement ? `${WEB}/${S}-movement.jpg` : sc;
  const cw = (i: number) => `${WEB}/${S}-orbit-${i}.jpg`;

  // ═══ СБОРКА (архетип product-reveal) ═══
  log("сборка документа…");
  let doc = createEmptyDocument("MERIDIAN — часовая мануфактура");
  const ops: SiteOp[] = [
    { op: "set-fonts", heading: "Cormorant Garamond", body: "Jost" },
    { op: "set-tokens", tokens: {
      "--color-bg": "#0c0e13", "--color-bg-alt": "#12141b", "--color-surface": "#1a1d26",
      "--color-text": "#eef1f6", "--color-text-muted": "#93a0b5",
      "--color-primary": "#1a2740", "--color-accent": "#c9a227", "--color-border": "#242836",
    } },
    { op: "add-block", presetId: "header-transparent-01", fields: { "hd03-logo": "MERIDIAN", "hd03-cta": "Подобрать модель" } },
  ];

  // hero-object: orbit-скраб (часы вращаются по скроллу) или постер
  if (orbit) {
    ops.push({ op: "add-block", presetId: "story-poster-01", variantId: "center", fields: {
      "sp01-video": orbit, "sp01-meta-left": "MERIDIAN · мануфактура с 1948", "sp01-meta-right": "Калибр M-24",
    }, collections: { "sp01-chapters": [
      { fields: { "sp01-step-text": "MERIDIAN. Время как *инженерия*.", "sp01-step-time": "0.3" } },
      { fields: { "sp01-step-text": "Каждый оборот — *234* детали в согласии.", "sp01-step-time": "6" } },
      { fields: { "sp01-step-text": "72 часа автономии на одном *заводе*.", "sp01-step-time": "12" } },
    ] } });
  } else {
    ops.push({ op: "add-block", presetId: "hero-poster-01", variantId: "bottom-left", fields: {
      "hp01-media": cw(1), "hp01-eyebrow": "MERIDIAN · мануфактура с 1948",
      "hp01-title": "Время как *инженерия*", "hp01-text": "Механические часы, собранные вручную из 234 деталей.",
      "hp01-cta": "Подобрать модель",
    } });
  }

  // showcase — часы залипают, выноски-характеристики проявляются вокруг
  ops.push({ op: "add-block", presetId: "story-showcase-01", fields: {
    "ss02-eyebrow": "Анатомия", "ss02-title": "Всё на виду. *Скрывать нечего*.", "ss02-image": sc,
  }, collections: { "ss02-steps": [
    { fields: { "ss02-step-title": "Циферблат", "ss02-step-text": "Синий санбёрст, гальваника в 7 слоёв — глубина, которая играет на свету." } },
    { fields: { "ss02-step-title": "Стрелки", "ss02-step-text": "Золото 18К, полировка вручную, люминофор Super-LumiNova C3." } },
    { fields: { "ss02-step-title": "Корпус", "ss02-step-text": "Хирургическая сталь 316L, 40 мм, водозащита 300 м." } },
    { fields: { "ss02-step-title": "Механизм", "ss02-step-text": "Калибр M-24 собственной разработки, 28 800 полуколебаний в час." } },
  ] } });

  // zoom — погружение в механизм
  ops.push({ op: "add-block", presetId: "story-zoom-01", fields: {
    "sz01-eyebrow": "Калибр M-24", "sz01-title": "Сердце, которое *видно*",
    "sz01-caption": "Скелетонизированный ротор из золота 22К, 42 камня, запас хода 72 часа.",
    "sz01-image": mv,
  } });

  // features — почему MERIDIAN
  ops.push({ op: "add-block", presetId: "features-tilt-01", variantId: "dark", fields: {
    "ftt01-eyebrow": "Мануфактура", "ftt01-title": "Что стоит за *оборотом*",
  }, collections: { "ftt01-cards": [
    { fields: { "ftt01-card-icon": "⚙", "ftt01-card-title": "Своя разработка", "ftt01-card-text": "Калибр от эскиза до сборки — в одной мастерской, без аутсорса." } },
    { fields: { "ftt01-card-icon": "◈", "ftt01-card-title": "Ручная сборка", "ftt01-card-text": "Один мастер ведёт часы от первой детали до последнего теста." } },
    { fields: { "ftt01-card-icon": "∞", "ftt01-card-title": "Гарантия 10 лет", "ftt01-card-text": "И сервис, который переживёт вас — часы MERIDIAN передают по наследству." } },
  ] } });

  // video-text — имя бренда с видео вращения сквозь буквы
  if (orbit) {
    ops.push({ op: "add-block", presetId: "story-video-text-01", fields: {
      "svt01-word": "ТОЧНОСТЬ", "svt01-sub": "−4/+6 секунд в сутки. Хронометр по стандарту COSC.", "svt01-video": orbit,
    } });
  }

  // спеки
  ops.push({ op: "add-block", presetId: "case-studies-counters-01", variantId: "dark", fields: { "csc01-title": "Калибр M-24 в цифрах" }, collections: { "csc01-stats": [
    { fields: { "csc01-value": "234", "csc01-label": "детали в механизме" } },
    { fields: { "csc01-value": "72 ч", "csc01-label": "запас хода" } },
    { fields: { "csc01-value": "300 м", "csc01-label": "водозащита" } },
    { fields: { "csc01-value": "10 лет", "csc01-label": "гарантия" } },
  ] } });

  ops.push({ op: "add-block", presetId: "cta-split-02", fields: {
    "cta-image": cw(2),
    "cta-heading": "Найдите свой калибр",
    "cta-description": "Запишитесь в бутик MERIDIAN — примерьте, послушайте ход, подберите модель под руку. Или закажите приватную презентацию у себя.",
    "cta-button": "Подобрать модель",
  } });

  ops.push({ op: "add-block", presetId: "footer-dark-01", variantId: "gradient-line", fields: {
    "footer-logo": "MERIDIAN",
    "footer-description": "Часовая мануфактура с 1948 года. Механические часы ручной сборки.",
    "footer-contact-text": "boutique@meridian.watch · +7 495 000-00-00",
    "footer-copyright": "© MERIDIAN Manufacture. Точность по наследству.",
  } });

  const r = applyOps(doc, ops);
  if (r.errors.length) log(`ops errors: ${r.errors.join("; ")}`);
  doc = r.doc;

  const enters: Record<string, string> = {
    "story-showcase-01": "fade", "story-zoom-01": "zoom-in", "features-tilt-01": "rise",
    "story-video-text-01": "zoom-through", "case-studies-counters-01": "zoom-in", "cta-split-02": "rise", "footer-dark-01": "fade",
  };
  doc = applyOps(doc, doc.pages[0].blocks.filter((b) => enters[b.presetId]).map((b) => ({ op: "set-block-enter" as const, blockId: b.id, enter: enters[b.presetId] as never }))).doc;

  const user = await prisma.user.findFirst({ orderBy: { id: "asc" } });
  if (!user) throw new Error("нет пользователя");
  const p = await prisma.project.upsert({ where: { slug: "meridian-watch" }, update: { document: doc as never }, create: { slug: "meridian-watch", name: "MERIDIAN — часовая мануфактура", document: doc as never, userId: user.id } });
  log(`ГОТОВО: http://localhost:3000/editor?project=${p.id} (orbit: ${orbit ? "да" : "нет"})`);
}
main().catch((e) => { console.error("WATCH FAILED:", e); process.exit(1); }).finally(() => prisma.$disconnect());
