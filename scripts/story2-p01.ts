/* STORY v2 — ПИЛОТ 1 (pin 1 «PORTFOLIO» / art-director, dusty-pink+plum glossy editorial).
   Пин как стиль-ref. Текст/вордмарк = HTML, тут только фигура/среда/стиллы. Скип-если-есть. */
import path from "node:path";
import fs from "node:fs";
import { higsAvailable, higsGenerateImageAsync, higsDownload, higsRemoveBackground } from "@/lib/ai/higs";

const OUT = path.resolve("public/uploads/1/story2");
const PIN = path.resolve("analitic/pins/tatoo/story/1.jpg");
const FOLDER = "story2-p01";
const NEG = "no watermark, no logo, no lettering, no typography, no text, no barcode, no extra fingers, no malformed hands, no deformed face, tasteful, editorial, photographic";

const GEN = [
  { name: "p01-hero", aspect: "4:5", prompt: "Editorial magazine-cover portrait of a confident woman with tousled dark hair, black blazer over black top, glancing over her shoulder toward camera, dramatic dusty-pink and deep-plum studio light, glossy high-fashion beauty, plum background, art-director portfolio mood, 85mm, subtle film grain. " + NEG },
  { name: "p01-portrait-b", aspect: "4:5", prompt: "Editorial three-quarter portrait of the same confident dark-haired woman in a black blazer and thin dark sunglasses, dusty-pink rim light, deep plum backdrop, poised fashion pose, glossy magazine beauty, 85mm. " + NEG },
  { name: "p01-still-1", aspect: "1:1", prompt: "Luxury product still-life on dusty-pink silk: a single minimalist frosted skincare bottle beside torn cream paper, deep-plum shadows, soft directional studio light, editorial brand art-direction, glossy. " + NEG },
  { name: "p01-still-2", aspect: "4:5", prompt: "Overhead shot of an open editorial fashion magazine spread on plum velvet, a moody portrait page in dusty-pink and maroon tones, refined art-direction layout mock, soft shadow. " + NEG },
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
        await higsDownload(url, dst);
        console.log(`OK ${g.name}`);
      } catch (e) { console.error(`FAIL ${g.name}:`, (e as Error).message); }
    })();
    jobs.push(p);
    await new Promise((r) => setTimeout(r, 3500));
  }
  await Promise.all(jobs);
  // cutout героя (если готов)
  const hero = path.join(OUT, "p01-hero.jpg");
  const cut = path.join(OUT, "p01-hero-cut.png");
  if (fs.existsSync(hero) && !fs.existsSync(cut)) {
    try { const u = await higsRemoveBackground(hero, `p01-hero-cut-${stamp}`, FOLDER); await higsDownload(u, cut); console.log("OK p01-hero-cut"); }
    catch (e) { console.error("FAIL cutout:", (e as Error).message); }
  }
  console.log("story2-p01: готово");
}
main().catch((e) => { console.error(e); process.exit(1); });
