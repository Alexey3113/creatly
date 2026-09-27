/* STORY v2 — ПИЛОТ 3 (pin 5 Tokyo cyber-zine: oxblood-red + чёрный, гранж, кинематографичный нуар).
   Пин как стиль-ref. Кандзи/барокоды/типографика = HTML. Скип-если-есть. */
import path from "node:path";
import fs from "node:fs";
import { higsAvailable, higsGenerateImageAsync, higsDownload, higsRemoveBackground } from "@/lib/ai/higs";

const OUT = path.resolve("public/uploads/1/story2");
const PIN = path.resolve("analitic/pins/tatoo/story/5.jpg");
const FOLDER = "story2-p03";
const NEG = "no watermark, no logo, no lettering, no kanji, no typography, no text, no barcode, no extra fingers, no malformed hands, no deformed face, tasteful, editorial, photographic";

const GEN = [
  { name: "p03-hero", aspect: "4:5", prompt: "Cinematic portrait of a red-haired woman in a dark oxblood-red silk and leather jacket over a black bodice, wet tousled hair, intense upward gaze, grimy Tokyo-underground neon-noir lighting, deep shadows, red rim light, editorial grunge, moody, 85mm, film grain. " + NEG },
  { name: "p03-portrait-b", aspect: "4:5", prompt: "Cinematic full-length of the same red-haired woman seated on a dark street stoop at night, red leather jacket, legs crossed, Tokyo underground neon reflections, wet asphalt, gritty noir editorial, deep blacks and red glow. " + NEG },
  { name: "p03-still-1", aspect: "1:1", prompt: "Moody cinematic close-up of the red-haired woman's hands in black gloves resting on her knee, dark red-black palette, neon-noir night light, gritty film grain, Tokyo underground mood. " + NEG },
  { name: "p03-still-2", aspect: "4:5", prompt: "Cinematic polaroid-style photo of the red-haired woman leaning against a graffiti concrete wall at night, red leather, harsh flash, deep shadows, gritty Tokyo underground noir, film grain. " + NEG },
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
  const hero = path.join(OUT, "p03-hero.jpg"), cut = path.join(OUT, "p03-hero-cut.png");
  if (fs.existsSync(hero) && !fs.existsSync(cut)) {
    try { const u = await higsRemoveBackground(hero, `p03-hero-cut-${stamp}`, FOLDER); await higsDownload(u, cut); console.log("OK p03-hero-cut"); }
    catch (e) { console.error("FAIL cutout:", (e as Error).message); }
  }
  console.log("story2-p03: готово");
}
main().catch((e) => { console.error(e); process.exit(1); });
