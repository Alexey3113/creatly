/* ANIMATED — Higs asset batch 2 (nano-banana-pro, 16:9, 2k). Оригинальный арт-дирекшн, без nudity. */
import path from "node:path";
import { higsAvailable, higsGenerateImageAsync, higsDownload } from "@/lib/ai/higs";
const OUT = "public/uploads/1/animated"; const FOLDER = "animated";

const ASSETS: { slug: string; prompt: string }[] = [
  { slug: "member", prompt: "Cinematic editorial portrait of a person in warm grey studio light, single ember-orange rim light, three-quarter view, calm confident expression, fine film grain, fashion-editorial photography, dark background, fully clothed, no text, no watermark" },
  { slug: "prism", prompt: "A sleek modern smartphone floating tilted in three-quarter perspective on a dark charcoal surface, neon cobalt-magenta gradient glowing on its screen, studio product lighting, soft reflections, cinematic tech product shot, no text, no watermark" },
  { slug: "split", prompt: "A glossy unbranded beverage can standing centered on a bold candy-colored seamless background, fresh citrus fruit slices and juice splash frozen mid-air around it, bright high-key studio light, hyperreal product photography, no text, no watermark" },
  { slug: "terra", prompt: "Photorealistic planet Earth seen from space, the day-night terminator crossing with glowing city lights on the night side, thin blue atmospheric rim, deep starfield, cinematic NASA-style render, centered, no text, no watermark" },
  { slug: "column-1", prompt: "A single sculptural designer lounge chair in soft natural window light, warm off-white and sage interior, minimalist, matte editorial furniture photography, shallow depth of field, no text, no watermark" },
  { slug: "column-2", prompt: "A single sculptural oak dining chair in warm afternoon light against a plaster wall, sage and bone palette, minimalist editorial furniture photography, shallow depth of field, no text, no watermark" },
  { slug: "column-3", prompt: "A single curved fabric armchair in gentle daylight, warm neutral studio, sage accents, matte editorial furniture photography, shallow depth of field, no text, no watermark" },
  { slug: "echo-1", prompt: "A single pale ceramic sculptural object on a bone-white plinth in a warm gallery, soft directional light, editorial still life, generous negative space, no text, no watermark" },
  { slug: "echo-2", prompt: "A folded cream paper art object casting soft shadow on a warm timber surface, gallery light, editorial still life, minimal, no text, no watermark" },
  { slug: "echo-3", prompt: "A small bronze figurine on a bone pedestal in a sunlit gallery interior, warm timber and cream tones, editorial still life, shallow depth, no text, no watermark" },
];

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot недоступен (127.0.0.1:3210)");
  const stamp = Date.now().toString(36);
  const jobs = ASSETS.map((a, i) => (async () => {
    await new Promise((r) => setTimeout(r, i * 3500));
    const dest = path.join(OUT, `${a.slug}-hero.jpg`);
    try {
      const url = await higsGenerateImageAsync({ jobId: `anim2-${a.slug}-${stamp}`, prompt: a.prompt, folder: FOLDER, aspectRatio: "16:9", quality: "2k" });
      await higsDownload(url, dest); console.log(`OK ${a.slug} -> ${dest}`);
    } catch (e) { console.error(`FAIL ${a.slug}:`, (e as Error).message); }
  })());
  await Promise.all(jobs); console.log("anim-assets2: done");
}
main().catch((e) => { console.error(e); process.exit(1); });
