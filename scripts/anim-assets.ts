/* ANIMATED — генерация кино-ассетов (nano-banana-pro, 16:9, 2k) для фото/depth/museum сайтов.
   Оригинальный арт-дирекшн (не клоны брендов), без nudity-терминов. → public/uploads/1/animated/. */
import path from "node:path";
import { higsAvailable, higsGenerateImageAsync, higsDownload } from "@/lib/ai/higs";

const OUT = "public/uploads/1/animated";
const FOLDER = "animated";

const ASSETS: { slug: string; prompt: string }[] = [
  { slug: "ascend", prompt: "Cinematic alpine mountain range at first light, peach dawn glow on jagged snow peaks over cool blue shadowed valleys, layered atmospheric depth and haze, fine film grain, moody editorial landscape photography, wide vista, no text, no watermark" },
  { slug: "relic", prompt: "A single weathered marble classical bust on a stone plinth in a pitch-black gallery, one hard rim key-light plus faint cool electric-blue ambient spill, dramatic museum spotlight, deep black shadow, volumetric dust, cinematic still, centered negative space, no text, no watermark" },
  { slug: "archive", prompt: "Warm sunlit archive reading room interior, golden light beams through tall windows with drifting dust, oak shelves of books, matte editorial photography, shallow depth of field, quiet heritage atmosphere, no people, no text, no watermark" },
  { slug: "current", prompt: "Cinematic misty forest gorge at dawn, moss-green wet boulders and a thin waterfall, thick volumetric fog, cool moody natural light, atmospheric nature photography, layered depth, no text, no watermark" },
  { slug: "vigil", prompt: "A single dark ceremonial relic object resting on black velvet, a narrow red spotlight raking across its surface, deep surrounding shadow, mysterious cinematic product-in-the-dark, centered, no text, no watermark" },
  { slug: "strata", prompt: "Flat vector cinematic illustration of a twilight canyon vista, indigo to amber dusk gradient sky, layered silhouetted ridges receding into haze, soft ambient light, poster art, clean depth planes, no text, no watermark" },
];

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot недоступен (127.0.0.1:3210)");
  const stamp = Date.now().toString(36);
  const jobs = ASSETS.map((a, i) => (async () => {
    await new Promise((r) => setTimeout(r, i * 3500)); // стаггер сабмита
    const dest = path.join(OUT, `${a.slug}-hero.jpg`);
    try {
      const url = await higsGenerateImageAsync({
        jobId: `anim-${a.slug}-${stamp}`,
        prompt: a.prompt, folder: FOLDER, aspectRatio: "16:9", quality: "2k",
      });
      await higsDownload(url, dest);
      console.log(`OK ${a.slug} -> ${dest}`);
    } catch (e) { console.error(`FAIL ${a.slug}:`, (e as Error).message); }
  })());
  await Promise.all(jobs);
  console.log("anim-assets: done");
}
main().catch((e) => { console.error(e); process.exit(1); });
