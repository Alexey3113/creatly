/* STORY — LANDSCAPE (16:9) кадры работ, по 1 на сайт. Закрывает форматный пробел «не все 9:16»:
   панорамный горизонтальный кадр для широкой сцены-монумента. Стиль-ref = hero каждого сайта. */
import path from "node:path";
import fs from "node:fs";
import { higsAvailable, higsGenerateImageAsync, higsDownload } from "@/lib/ai/higs";

const OUT = path.resolve("public/uploads/1/story/tatoo");
const FOLDER = "story-tatoo";
const NEG = "no watermark, no logo, no typography, no text, no extra fingers, no malformed hands, tasteful, editorial";

const WORKS = [
  { name: "vision-work-wide", ref: "vision-hero-a.jpg", prompt: "Wide panoramic editorial photograph, horizontal composition, a reclining woman shot from above along her bare back and spine, a large fine-line glass-flower and translucent-wing tattoo spreading across both shoulder blades, pink-and-chrome ink, wet-look skin sheen, deep black background, sculptural raking side light, sensual premium beauty, cinematic wide crop. " + NEG },
  { name: "shadows-work-wide", ref: "shadows-hero-a.jpg", prompt: "Wide panoramic horizontal editorial photograph, a woman lying across the frame, dense blackwork thorn-crown and reliquary tattoo spanning her upper back and outstretched arm, crushed blacks, harsh red rim light, ink-splatter photocopy grain, glossy skin, occult zine mood, cinematic wide crop. " + NEG },
  { name: "solitude-work-wide", ref: "solitude-hero-a.jpg", prompt: "Wide panoramic horizontal editorial photograph, a reclining woman in renaissance candlelight, delicate fine-line ornamental botanical tattoo flowing across her shoulder, collarbone and arm, warm Rembrandt light, antique gold and oxblood tones, museum oil-painting mood, sensual aristocratic, cinematic wide crop. " + NEG },
];

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot недоступен");
  const stamp = Date.now();
  const jobs: Promise<void>[] = [];
  for (const w of WORKS) {
    const dst = path.join(OUT, `${w.name}.jpg`);
    if (fs.existsSync(dst)) { console.log(`SKIP ${w.name} (уже есть)`); continue; }
    const p = (async () => {
      try {
        const url = await higsGenerateImageAsync({
          jobId: `${w.name}-${stamp}`,
          prompt: w.prompt,
          folder: FOLDER,
          refFrames: [path.join(OUT, w.ref)],
          aspectRatio: "16:9",
          quality: "2k",
        });
        await higsDownload(url, path.join(OUT, `${w.name}.jpg`));
        console.log(`OK ${w.name}`);
      } catch (e) {
        console.error(`FAIL ${w.name}:`, (e as Error).message);
      }
    })();
    jobs.push(p);
    await new Promise((r) => setTimeout(r, 4000));
  }
  await Promise.all(jobs);
  console.log("story-work-wide: готово");
}
main().catch((e) => { console.error(e); process.exit(1); });
