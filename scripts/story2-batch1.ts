/* STORY v2 — БАТЧ 1: forlorn (pin3 dark-fantasy gothic, RODERIKA) + lilith (pin4 occult-romantic).
   Пин как стиль-ref. Текст/blackletter/HUD = HTML. Тактично, без наготы. Скип-если-есть. */
import path from "node:path";
import fs from "node:fs";
import { higsAvailable, higsGenerateImageAsync, higsDownload, higsRemoveBackground } from "@/lib/ai/higs";

const OUT = path.resolve("public/uploads/1/story2");
const P = (n: string) => path.resolve(`analitic/pins/tatoo/story/${n}`);
const NEG = "no watermark, no logo, no lettering, no typography, no text, no barcode, no nudity, covered, tasteful, no extra fingers, no malformed hands, no deformed face, editorial, painterly, cinematic";

const GEN = [
  // FORLORN (pin 3) — dark-fantasy gothic, charcoal/bone/oxblood/steel
  { name: "forlorn-hero", pin: "3.jpg", aspect: "4:5", prompt: "Cinematic dark-fantasy portrait of a hooded woman in a white and oxblood-red robe wearing an ornate blackened-silver thorn crown, one hand in a black armored gauntlet raised near her face, heavy silver chains, painterly game-cover art, deep charcoal background, dramatic somber rim light, bone and blood-red palette. " + NEG },
  { name: "forlorn-portrait-b", pin: "3.jpg", aspect: "4:5", prompt: "Cinematic dark-fantasy portrait of the same hooded woman in white-and-red robe and thorn crown, head bowed, silver chains draping, black gauntlet hand, charcoal void background, painterly somber light. " + NEG },
  { name: "forlorn-still-1", pin: "3.jpg", aspect: "1:1", prompt: "Macro of an ornate blackened-silver armored gauntlet and heavy chains on dark fabric, painterly dark-fantasy still-life, oxblood accents, dramatic low light. " + NEG },
  { name: "forlorn-still-2", pin: "3.jpg", aspect: "4:5", prompt: "An ornate blackened-silver thorn crown resting on draped white and red cloth, painterly dark-fantasy still-life, charcoal background, somber light. " + NEG },
  // LILITH (pin 4) — occult-romantic, forest-green-black/bone/oxblood
  { name: "lilith-hero", pin: "4.jpg", aspect: "4:5", prompt: "Cinematic dark-romantic occult portrait of a pale woman with long black hair and large black horns, black feathered wings behind her, eyes closed, wearing a draped black gown, sensual but fully covered and tasteful, deep forest-green-black background, bone skin and oxblood lips, fine-art poster painting. " + NEG },
  { name: "lilith-portrait-b", pin: "4.jpg", aspect: "4:5", prompt: "Cinematic occult portrait of the same horned woman with black wings, head tilted, black draped gown, covered and tasteful, forest-green-black void, painterly fine-art, bone and oxblood palette. " + NEG },
  { name: "lilith-still-1", pin: "4.jpg", aspect: "1:1", prompt: "Macro of large glossy black demon horns and black feathers on dark green fabric, painterly occult still-life, moody low light. " + NEG },
  { name: "lilith-still-2", pin: "4.jpg", aspect: "4:5", prompt: "Black feathered wings spread against a forest-green-black background, painterly fine-art occult still, dramatic rim light. " + NEG },
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
        const url = await higsGenerateImageAsync({ jobId: `${g.name}-${stamp}`, prompt: g.prompt, folder: "story2-batch1", refFrames: [P(g.pin)], aspectRatio: g.aspect, quality: "2k" });
        await higsDownload(url, dst); console.log(`OK ${g.name}`);
      } catch (e) { console.error(`FAIL ${g.name}:`, (e as Error).message); }
    })();
    jobs.push(p);
    await new Promise((r) => setTimeout(r, 3500));
  }
  await Promise.all(jobs);
  for (const slug of ["forlorn", "lilith"]) {
    const hero = path.join(OUT, `${slug}-hero.jpg`), cut = path.join(OUT, `${slug}-hero-cut.png`);
    if (fs.existsSync(hero) && !fs.existsSync(cut)) {
      try { const u = await higsRemoveBackground(hero, `${slug}-hero-cut-${stamp}`, "story2-batch1"); await higsDownload(u, cut); console.log(`OK ${slug}-hero-cut`); }
      catch (e) { console.error(`FAIL ${slug} cutout:`, (e as Error).message); }
    }
  }
  console.log("story2-batch1: готово");
}
main().catch((e) => { console.error(e); process.exit(1); });
