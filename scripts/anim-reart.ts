/* ANIMATED — пилот перегенерации 2 ассетов с ЖЁСТКИМ арт-дирекшном (committed grade/lens/palette).
   Пишет в <slug>-hero-v2.jpg (не перетирая текущие) для сравнения до/после. */
import path from "node:path";
import { higsAvailable, higsGenerateImageAsync, higsDownload } from "@/lib/ai/higs";
const OUT = "public/uploads/1/animated"; const FOLDER = "animated";
const ASSETS: { slug: string; prompt: string }[] = [
  { slug: "relic", prompt: "Museum film still. A single weathered marble bust of a classical figure, three-quarter turn, isolated in a pure black void. One hard ring-shaped key light rims the marble edge; a cold electric-blue ambient wash bleeds from directly behind the head. Deep matte black shadow swallowing the base, faint volumetric haze in the beam, 85mm portrait lens, shallow depth of field, desaturated palette with a single electric-blue accent, anamorphic cinema color grade, heavy grain, generous black negative space framing the subject off-center. No text, no interface, no border, no watermark." },
  { slug: "orbit", prompt: "Perfume-house cinema still. A sculptural faceted heavy-glass perfume bottle standing on a black glossy reflective turntable in a pitch-black studio. A single warm champagne key light from upper right carves hard specular highlights along the glass edges; deep espresso shadow fills the rest; a thin amber rim traces the silhouette. 40mm anamorphic, moody chiaroscuro product grade, subtle smoke, bottle placed off-center with wide dark negative space, mirror reflection below. No text, no interface, no border, no watermark." },
];
async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot недоступен (127.0.0.1:3210)");
  const stamp = Date.now().toString(36);
  for (const a of ASSETS) {
    const dest = path.join(OUT, `${a.slug}-hero-v2.jpg`);
    try {
      const url = await higsGenerateImageAsync({ jobId: `reart-${a.slug}-${stamp}`, prompt: a.prompt, folder: FOLDER, aspectRatio: "16:9", quality: "2k" });
      await higsDownload(url, dest); console.log(`OK ${a.slug} -> ${dest}`);
    } catch (e) { console.error(`FAIL ${a.slug}:`, (e as Error).message); }
    await new Promise((r) => setTimeout(r, 2000));
  }
  console.log("anim-reart pilot: done");
}
main().catch((e) => { console.error(e); process.exit(1); });
