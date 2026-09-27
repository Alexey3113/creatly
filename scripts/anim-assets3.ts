/* ANIMATED — Higs asset batch 3 (3d-theatre рендеры, 16:9, 2k). Оригинальный арт-дирекшн, без nudity. */
import path from "node:path";
import { higsAvailable, higsGenerateImageAsync, higsDownload } from "@/lib/ai/higs";
const OUT = "public/uploads/1/animated"; const FOLDER = "animated";
const ASSETS: { slug: string; prompt: string }[] = [
  { slug: "orbit", prompt: "A sculptural unbranded luxury perfume bottle centered on a dark reflective turntable in a black studio, dramatic single key light with soft rim, glossy glass and metal, cinematic product theatre, deep shadow, centered with negative space, no text, no watermark" },
  { slug: "vertex", prompt: "A row of collectible design objects standing on a warm wooden library table in amber lamplight, blurred bookshelves behind, cinematic depth of field, museum-catalog product staging, burgundy and amber palette, no text, no watermark" },
  { slug: "monolith", prompt: "A towering smooth black basalt monolith standing in drifting mist on a dark plain, a faint ember-orange glow at its base, dramatic low-angle cinematic lighting, minimal, awe-inspiring, deep shadow, no text, no watermark" },
];
async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot недоступен (127.0.0.1:3210)");
  const stamp = Date.now().toString(36);
  const jobs = ASSETS.map((a, i) => (async () => {
    await new Promise((r) => setTimeout(r, i * 3500));
    const dest = path.join(OUT, `${a.slug}-hero.jpg`);
    try {
      const url = await higsGenerateImageAsync({ jobId: `anim3-${a.slug}-${stamp}`, prompt: a.prompt, folder: FOLDER, aspectRatio: "16:9", quality: "2k" });
      await higsDownload(url, dest); console.log(`OK ${a.slug} -> ${dest}`);
    } catch (e) { console.error(`FAIL ${a.slug}:`, (e as Error).message); }
  })());
  await Promise.all(jobs); console.log("anim-assets3: done");
}
main().catch((e) => { console.error(e); process.exit(1); });
