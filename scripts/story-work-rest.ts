/* STORY — кадры РАБОТ для SHADOWS и SOLITUDE (тату на коже в стиле каждого сайта). */
import path from "node:path";
import { higsAvailable, higsGenerateImageAsync, higsDownload } from "@/lib/ai/higs";

const OUT = path.resolve("public/uploads/1/story/tatoo");
const FOLDER = "story-tatoo";
const NEG = "no watermark, no logo, no typography, no text, no extra fingers, no malformed hands, tasteful, editorial";

const WORKS = [
  // SHADOWS — blackwork/оккульт, красный свет
  { name: "shadows-work-1", ref: "shadows-hero-a.jpg", aspect: "9:16", prompt: "Editorial macro of a dense blackwork thorn-crown tattoo across a woman's upper back and nape, crushed blacks, harsh red rim light, ink-splatter grain, glossy skin, occult zine mood. " + NEG },
  { name: "shadows-work-2", ref: "shadows-hero-a.jpg", aspect: "1:1", prompt: "Close-up of an ornamental medieval-engraving raven tattoo on a shoulder, heavy blackwork, red backlight, distressed photocopy texture, dark and elegant. " + NEG },
  { name: "shadows-work-3", ref: "shadows-hero-a.jpg", aspect: "9:16", prompt: "A gothic reliquary-cross blackwork tattoo down a sternum and chest, baroque ornament, red-black occult lighting, dramatic shadow, tasteful coverage. " + NEG },
  // SOLITUDE — тонкая орнаментальная линия, тёплый золотой свет
  { name: "solitude-work-1", ref: "solitude-hero-a.jpg", aspect: "9:16", prompt: "Editorial macro of a delicate fine-line ornamental botanical tattoo across a woman's shoulder and collarbone, warm Rembrandt candlelight, antique gold and oxblood tones, museum oil-painting mood, sensual and aristocratic. " + NEG },
  { name: "solitude-work-2", ref: "solitude-hero-a.jpg", aspect: "1:1", prompt: "Close-up of a single-line profile-muse tattoo on a forearm, thin elegant linework, warm golden light, painterly skin, renaissance atmosphere. " + NEG },
  { name: "solitude-work-3", ref: "solitude-hero-a.jpg", aspect: "9:16", prompt: "Fine-line dotwork rose tattoo on an inner elbow, delicate stippled shading, warm candlelight, ivory and gold palette, intimate classical portrait feel. " + NEG },
];

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot недоступен");
  const jobs: Promise<void>[] = [];
  const stamp = Date.now();
  for (const w of WORKS) {
    const p = (async () => {
      try {
        const url = await higsGenerateImageAsync({
          jobId: `${w.name}-${stamp}`, prompt: w.prompt, folder: FOLDER,
          refFrames: [path.join(OUT, w.ref)], aspectRatio: w.aspect, quality: "2k",
        });
        await higsDownload(url, path.join(OUT, `${w.name}.jpg`));
        console.log(`OK ${w.name}`);
      } catch (e) { console.error(`FAIL ${w.name}:`, (e as Error).message); }
    })();
    jobs.push(p);
    await new Promise((r) => setTimeout(r, 4000));
  }
  await Promise.all(jobs);
  console.log("story-work-rest: готово");
}
main().catch((e) => { console.error(e); process.exit(1); });
