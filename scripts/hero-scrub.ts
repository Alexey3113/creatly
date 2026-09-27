/**
 * Сборка фирменного hero-скраба для авторского Davel (проект 39):
 * 3 сегмента start→end (kling) по готовым кадрам цепочки → concat -g 2 →
 * story-poster-01 со скрабом заменяет пролог. Сегменты идут ПО ОДНОМУ —
 * end-frame автоматизация сервиса падала под параллельной нагрузкой.
 * Запуск: set -a; source .env; set +a; npx tsx --tsconfig tsconfig.json scripts/hero-scrub.ts
 */
import { PrismaClient } from "@prisma/client";
import { join } from "path";
import { higsAvailable, higsDownload, higsGenerateVideo } from "@/lib/ai/higs";
import { concatScrub, extractPoster } from "@/lib/media/ffmpeg";
import { applyOps } from "@/lib/site/ops";
import type { SiteDocument } from "@/lib/site/types";

const prisma = new PrismaClient();
const DIR = join(process.cwd(), "public", "uploads", "1", "gen");
const G = "/uploads/1/gen";
const FRAMES = ["mroqd3e3-chain-0.png", "mroqd3e3-chain-1.png", "mroqd3e3-chain-2.png", "mroqd3e3-chain-3.png"];
const MOTIONS = [
  "Camera slowly glides forward through the open wooden door into the dark evening living room, approaching the sofa by the fireplace, warm lamplight, subtle continuous motion, no cuts, no scene change, seamless, cinematic",
  "Camera drifts past the green velvet sofa and turns into the warm corridor, moving toward the glowing doorway at the end, subtle continuous motion, no cuts, no scene change, seamless, cinematic",
  "Camera moves down the corridor and through the double doors into the softly lit bedroom, settling on the linen bed, subtle continuous motion, no cuts, no scene change, seamless, cinematic",
];

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot оффлайн");
  const t0 = Date.now();
  const log = (m: string) => console.log(`[${((Date.now() - t0) / 60000).toFixed(1)}м] ${m}`);

  const clips: string[] = [];
  for (let i = 0; i < 3; i++) {
    log(`сегмент ${i + 1}/3: ${FRAMES[i]} → ${FRAMES[i + 1]}`);
    let ok = false;
    for (let attempt = 0; attempt < 3 && !ok; attempt++) {
      try {
        const url = await higsGenerateVideo({
          prompt: MOTIONS[i],
          jobId: `davel-seg-${i}-try${attempt}-${Date.now().toString(36)}`,
          folder: "davel-hero",
          startFrame: join(DIR, FRAMES[i]),
          endFrame: join(DIR, FRAMES[i + 1]),
          duration: 5,
        });
        const local = join(DIR, `davel-seg-${i}.mp4`);
        await higsDownload(url, local);
        clips.push(local);
        ok = true;
        log(`  сегмент ${i + 1} готов`);
      } catch (err) {
        log(`  попытка ${attempt + 1} упала: ${String(err).slice(0, 140)}`);
      }
    }
    if (!ok) throw new Error(`сегмент ${i + 1} не собрался после 3 попыток — стоп`);
  }

  log("склейка…");
  const hero = join(DIR, "davel-hero-scrub.mp4");
  await concatScrub(clips, hero);
  await extractPoster(hero, join(DIR, "davel-hero-poster.jpg"));

  const p = await prisma.project.findUnique({ where: { id: 39 } });
  if (!p) throw new Error("нет проекта 39");
  let doc = p.document as never as SiteDocument;
  const prologue = doc.pages[0].blocks.find((b) => b.presetId === "story-prologue-01");
  const ops = [];
  if (prologue) ops.push({ op: "remove-block", blockId: prologue.id } as const);
  ops.push({
    op: "add-block" as const,
    presetId: "story-poster-01",
    index: 1,
    fields: {
      "sp01-video": `${G}/davel-hero-scrub.mp4`,
      "sp01-meta-left": "Davel Mebel · мебельная фабрика",
      "sp01-meta-right": "Путешествие по дому",
    },
    collections: {
      "sp01-chapters": [
        { fields: { "sp01-step-text": "Дом начинается *с двери*. За ней — комнаты, которые мы собрали руками.", "sp01-step-time": "0.3" } },
        { fields: { "sp01-step-text": "Гостиная. Диван, который будет помнить *ваши вечера*.", "sp01-step-time": "5" } },
        { fields: { "sp01-step-text": "Дальше — спальня. Свет уже включён, осталось *войти*.", "sp01-step-time": "10.5" } },
      ],
    },
  });
  doc = applyOps(doc, ops as never).doc;
  await prisma.project.update({ where: { id: 39 }, data: { document: doc as never } });
  log("ГОТОВО: hero-скраб в проекте 39");
}
main().catch((e) => { console.error("HERO SCRUB FAILED:", e); process.exit(1); }).finally(() => prisma.$disconnect());
