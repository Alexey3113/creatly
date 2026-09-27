/* STORY — доп. детальные кадры для БЕНТО-СТЕНЫ «Архив» (разные части тела, как в референсе-портфолио).
   По 3 на сайт, 1:1 (мелкие плитки мозаики). Стиль-ref = hero. Скип-если-есть. */
import path from "node:path";
import fs from "node:fs";
import { higsAvailable, higsGenerateImageAsync, higsDownload } from "@/lib/ai/higs";

const OUT = path.resolve("public/uploads/1/story/tatoo");
const FOLDER = "story-tatoo";
const NEG = "no watermark, no logo, no typography, no text, no extra fingers, no malformed hands, tasteful, editorial";

const TILES = [
  // VISION — роза-стекло, pink-chrome fine-line
  { name: "vision-tile-1", ref: "vision-hero-a.jpg", prompt: "Editorial macro of a woman's hands and wrists resting together, delicate fine-line glass-flower bracelet tattoos in translucent pink-and-chrome ink, wet-look skin, deep black background, soft side light. " + NEG },
  { name: "vision-tile-2", ref: "vision-hero-a.jpg", prompt: "Close-up of the back of a woman's neck and nape with a small translucent glass-butterfly fine-line tattoo, pink and silver highlights, black studio backdrop, sensual editorial. " + NEG },
  { name: "vision-tile-3", ref: "vision-hero-a.jpg", prompt: "Macro of ribs and side torso with a trailing glass-vine fine-line tattoo, pink glass petals, glossy skin, dark studio, shallow depth of field. " + NEG },
  // SHADOWS — красный оккульт blackwork
  { name: "shadows-tile-1", ref: "shadows-hero-a.jpg", prompt: "Macro of knuckles and fingers with small blackwork occult symbol tattoos, harsh red rim light, ink-splatter photocopy grain, glossy skin, dark zine mood. " + NEG },
  { name: "shadows-tile-2", ref: "shadows-hero-a.jpg", prompt: "Close-up of the side of a neck and throat with ornamental blackwork tattoo, crushed blacks, red backlight, distressed texture, occult elegance. " + NEG },
  { name: "shadows-tile-3", ref: "shadows-hero-a.jpg", prompt: "Macro of a calf with a blackwork dagger-and-thorn tattoo, heavy black ink, red-black occult lighting, dramatic shadow. " + NEG },
  // SOLITUDE — ренессанс золото fine-line
  { name: "solitude-tile-1", ref: "solitude-hero-a.jpg", prompt: "Editorial macro of fingers and a hand with fine-line ornamental ring and knuckle tattoos, warm golden candlelight, antique gold tones, renaissance oil-painting mood. " + NEG },
  { name: "solitude-tile-2", ref: "solitude-hero-a.jpg", prompt: "Close-up of the back of a neck with a delicate fine-line ornament tattoo, ivory and gold palette, warm Rembrandt light, painterly skin. " + NEG },
  { name: "solitude-tile-3", ref: "solitude-hero-a.jpg", prompt: "Macro of an ankle with a fine-line botanical tattoo, thin elegant linework, warm candlelight, classical intimate atmosphere. " + NEG },
];

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot недоступен");
  const stamp = Date.now();
  const jobs: Promise<void>[] = [];
  for (const t of TILES) {
    const dst = path.join(OUT, `${t.name}.jpg`);
    if (fs.existsSync(dst)) { console.log(`SKIP ${t.name}`); continue; }
    const p = (async () => {
      try {
        const url = await higsGenerateImageAsync({
          jobId: `${t.name}-${stamp}`,
          prompt: t.prompt,
          folder: FOLDER,
          refFrames: [path.join(OUT, t.ref)],
          aspectRatio: "1:1",
          quality: "2k",
        });
        await higsDownload(url, dst);
        console.log(`OK ${t.name}`);
      } catch (e) {
        console.error(`FAIL ${t.name}:`, (e as Error).message);
      }
    })();
    jobs.push(p);
    await new Promise((r) => setTimeout(r, 3500));
  }
  await Promise.all(jobs);
  console.log("story-tiles: готово");
}
main().catch((e) => { console.error(e); process.exit(1); });
