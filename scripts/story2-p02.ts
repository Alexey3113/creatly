/* STORY v2 — ПИЛОТ 2 (pin 2 punk personal-brand: black/white + hot-pink, дерзкая энергия, спрей/маркер).
   Пин как стиль-ref. Текст/спрей-типографика = HTML. Скип-если-есть. */
import path from "node:path";
import fs from "node:fs";
import { higsAvailable, higsGenerateImageAsync, higsDownload, higsRemoveBackground } from "@/lib/ai/higs";

const OUT = path.resolve("public/uploads/1/story2");
const PIN = path.resolve("analitic/pins/tatoo/story/2.jpg");
const FOLDER = "story2-p02";
const NEG = "no watermark, no logo, no lettering, no typography, no text, no extra fingers, no malformed hands, no deformed face, tasteful, editorial, photographic";

const GEN = [
  { name: "p02-hero", aspect: "4:5", prompt: "Confident woman with tousled dark hair in an oversized black blazer over a black bralette and thin black sunglasses, leaning with bold attitude, bright high-key studio, punk personal-brand editorial, high contrast, unapologetic energy, 50mm, crisp. " + NEG },
  { name: "p02-portrait-b", aspect: "4:5", prompt: "Full-length editorial of the same woman in black blazer and sunglasses sitting cross-legged on a stool, hand on knee, bright white studio, bold confident personal-brand pose, high contrast. " + NEG },
  { name: "p02-still-1", aspect: "1:1", prompt: "Flat-lay of black wireless over-ear headphones and a smartphone on a white surface, single hot-pink accent object, bright high-key product shot, punk podcast brand mood. " + NEG },
  { name: "p02-still-2", aspect: "4:5", prompt: "A stack of black-and-white polaroid photos of a confident woman scattered on a white desk, high contrast editorial, personal-brand flat-lay, crisp light. " + NEG },
];

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot недоступен");
  const stamp = Date.now();
  const jobs: Promise<void>[] = [];
  for (const g of GEN) {
    const dst = path.join(OUT, `${g.name}.jpg`);
    if (fs.existsSync(dst)) { console.log(`SKIP ${g.name}`); continue; }
    const p = (async () => {
      try {
        const url = await higsGenerateImageAsync({ jobId: `${g.name}-${stamp}`, prompt: g.prompt, folder: FOLDER, refFrames: [PIN], aspectRatio: g.aspect, quality: "2k" });
        await higsDownload(url, dst); console.log(`OK ${g.name}`);
      } catch (e) { console.error(`FAIL ${g.name}:`, (e as Error).message); }
    })();
    jobs.push(p);
    await new Promise((r) => setTimeout(r, 3500));
  }
  await Promise.all(jobs);
  const hero = path.join(OUT, "p02-hero.jpg"), cut = path.join(OUT, "p02-hero-cut.png");
  if (fs.existsSync(hero) && !fs.existsSync(cut)) {
    try { const u = await higsRemoveBackground(hero, `p02-hero-cut-${stamp}`, FOLDER); await higsDownload(u, cut); console.log("OK p02-hero-cut"); }
    catch (e) { console.error("FAIL cutout:", (e as Error).message); }
  }
  console.log("story2-p02: готово");
}
main().catch((e) => { console.error(e); process.exit(1); });
