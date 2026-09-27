/* STORY v2 — БАТЧ 2: chrome(pin6 futuristic glam) · rosaline(pin7 romantic sepia) · seraph(pin8 angel) · salt(pin9 orange occult).
   Пин как стиль-ref. Текст/вордмарк = HTML. Тактично. Скип-если-есть. */
import path from "node:path";
import fs from "node:fs";
import { higsAvailable, higsGenerateImageAsync, higsDownload, higsRemoveBackground } from "@/lib/ai/higs";

const OUT = path.resolve("public/uploads/1/story2");
const P = (n: string) => path.resolve(`analitic/pins/tatoo/story/${n}`);
const NEG = "no watermark, no logo, no lettering, no typography, no text, no extra fingers, no malformed hands, no deformed face, editorial, cinematic";

const GEN = [
  // CHROME (pin6) — futuristic silver/chrome/lime, femme-warrior
  { name: "chrome-hero", pin: "6.jpg", aspect: "4:5", prompt: "High-fashion futuristic editorial portrait of a woman in a silver metallic corset and sheer crystal mesh bodysuit with reflective beadwork and spiked metallic accessories, long dark wavy hair, poised intimate stance, deep black background, dramatic studio light with sparkling highlights, dark couture sci-fi femme-warrior, ultra-detailed, cinematic. " + NEG },
  { name: "chrome-portrait-b", pin: "6.jpg", aspect: "4:5", prompt: "Futuristic editorial of the same woman in silver metallic corset, holding a sculptural chrome blade near her shoulder, long dark hair, black background, cold reflective sci-fi glam, sparkling highlights. " + NEG },
  { name: "chrome-still-1", pin: "6.jpg", aspect: "1:1", prompt: "Macro of a sculptural chrome blade and spiked silver metallic jewelry on black, reflective sci-fi still-life, dramatic sparkling highlights. " + NEG },
  { name: "chrome-still-2", pin: "6.jpg", aspect: "4:5", prompt: "Macro of a silver crystal-beadwork corset and mesh fabric, reflective futuristic couture detail, black background, glittering light. " + NEG },
  // ROSALINE (pin7) — romantic sepia-rose scrapbook
  { name: "rosaline-hero", pin: "7.jpg", aspect: "4:5", prompt: "Romantic dreamy portrait of a woman with long wavy dark hair, pink ribbons and lace, pearl strands, roses, soft warm sepia-rose lighting, melancholic ethereal beauty, painterly, film grain. " + NEG },
  { name: "rosaline-portrait-b", pin: "7.jpg", aspect: "4:5", prompt: "Soft romantic portrait of the same woman among pink roses at a window, lace dress, pink ribbon, warm moonlit sepia glow, dreamy melancholic, painterly. " + NEG },
  { name: "rosaline-still-1", pin: "7.jpg", aspect: "1:1", prompt: "Still-life of pink roses, old books, a pearl necklace and pink silk ribbon on dark wood, warm sepia romantic light, film grain. " + NEG },
  { name: "rosaline-still-2", pin: "7.jpg", aspect: "4:5", prompt: "Close-up of delicate hands holding pink flowers with lace cuffs and a silver heart locket, warm sepia-rose light, romantic melancholic. " + NEG },
  // SERAPH (pin8) — rose-pink angel warrior
  { name: "seraph-hero", pin: "8.jpg", aspect: "4:5", prompt: "Elegant angelic warrior woman with long platinum-blonde straight hair, a delicate silver crown-halo, white and soft-red feathered wings, black metal armor with red accents, rose-pink dreamy studio light, confident serene expression, high-fashion fantasy, ultra-detailed. " + NEG },
  { name: "seraph-portrait-b", pin: "8.jpg", aspect: "4:5", prompt: "Angelic warrior with platinum hair and silver halo holding an elegant sword, white-red wings, black-red armor, rose-pink light, confident elegant fantasy portrait. " + NEG },
  { name: "seraph-still-1", pin: "8.jpg", aspect: "1:1", prompt: "Macro of a delicate silver spiked crown-halo with pearls, rose-pink light, high-fashion fantasy still-life, glittering. " + NEG },
  { name: "seraph-still-2", pin: "8.jpg", aspect: "4:5", prompt: "White and soft-red feathered angel wing against a rose-pink glowing background, ethereal fantasy still, dramatic light. " + NEG },
  // SALT (pin9) — burnt-orange/grey occult art-poster, blindfold + thorn halo
  { name: "salt-hero", pin: "9.jpg", aspect: "4:5", prompt: "Surreal fine-art poster figure: a woman with a pale bandage blindfold wrapped over her eyes and a metal thorn-spike crown halo, long copper-red hair, pale draped fabric robe, burnt-orange and cool-grey palette, distressed grunge texture, dramatic somber, editorial art. " + NEG },
  { name: "salt-portrait-b", pin: "9.jpg", aspect: "4:5", prompt: "Surreal art portrait of the same blindfolded woman with thorn-halo, head tilted up, draped pale robe, weathered hands, burnt-orange grey palette, grunge, fine-art. " + NEG },
  { name: "salt-still-1", pin: "9.jpg", aspect: "1:1", prompt: "Macro of a metal thorn-spike crown halo and bandage wrap on pale skin, burnt-orange grey palette, distressed grunge fine-art still. " + NEG },
  { name: "salt-still-2", pin: "9.jpg", aspect: "4:5", prompt: "Draped pale weathered fabric and clasped weathered hands, burnt-orange and grey palette, surreal grunge fine-art still, somber. " + NEG },
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
        const url = await higsGenerateImageAsync({ jobId: `${g.name}-${stamp}`, prompt: g.prompt, folder: "story2-batch2", refFrames: [P(g.pin)], aspectRatio: g.aspect, quality: "2k" });
        await higsDownload(url, dst); console.log(`OK ${g.name}`);
      } catch (e) { console.error(`FAIL ${g.name}:`, (e as Error).message); }
    })();
    jobs.push(p);
    await new Promise((r) => setTimeout(r, 3000));
  }
  await Promise.all(jobs);
  for (const slug of ["chrome", "rosaline", "seraph", "salt"]) {
    const hero = path.join(OUT, `${slug}-hero.jpg`), cut = path.join(OUT, `${slug}-hero-cut.png`);
    if (fs.existsSync(hero) && !fs.existsSync(cut)) {
      try { const u = await higsRemoveBackground(hero, `${slug}-hero-cut-${stamp}`, "story2-batch2"); await higsDownload(u, cut); console.log(`OK ${slug}-hero-cut`); }
      catch (e) { console.error(`FAIL ${slug} cutout:`, (e as Error).message); }
    }
  }
  console.log("story2-batch2: готово");
}
main().catch((e) => { console.error(e); process.exit(1); });
