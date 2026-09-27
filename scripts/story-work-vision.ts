/* STORY — кадры РАБОТ для VISION (макро/монумент тату в стиле пина, для уникальных страниц).
   nano-banana-pro, стиль-ref = hero (консистентность). Запуск как story-gen.ts. */
import path from "node:path";
import { higsAvailable, higsGenerateImageAsync, higsDownload } from "@/lib/ai/higs";

const OUT = path.resolve("public/uploads/1/story/tatoo");
const HERO = path.join(OUT, "vision-hero-a.jpg");
const FOLDER = "story-tatoo";
const NEG = "no watermark, no logo, no typography, no text, no extra fingers, no malformed hands, tasteful, editorial";

const WORKS = [
  { name: "vision-work-1", aspect: "9:16", prompt: "Editorial macro photograph of a fine-line botanical glass-flower tattoo on a woman's forearm and wrist, translucent pink-and-chrome ink, delicate leaves and petals, wet-look skin sheen, deep black background, sculptural side light, sensual premium beauty. " + NEG },
  { name: "vision-work-2", aspect: "9:16", prompt: "Extreme macro of a black fine-line thorn-branch tattoo running along a bare shoulder and arm, subtle pink edge glow on the linework, glossy skin, dark editorial studio, shallow depth of field. " + NEG },
  { name: "vision-work-3", aspect: "1:1", prompt: "Fine-line glass-wing tattoo across a woman's shoulder blade and back, geometric translucent shards, pink and silver highlights, black studio backdrop, elegant sensual editorial. " + NEG },
];

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot недоступен");
  const jobs: Promise<void>[] = [];
  const stamp = Date.now();
  for (const w of WORKS) {
    const p = (async () => {
      try {
        const url = await higsGenerateImageAsync({
          jobId: `${w.name}-${stamp}`,
          prompt: w.prompt,
          folder: FOLDER,
          refFrames: [HERO],
          aspectRatio: w.aspect,
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
  console.log("story-work-vision: готово");
}
main().catch((e) => { console.error(e); process.exit(1); });
