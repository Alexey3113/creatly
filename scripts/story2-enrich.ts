/* STORY v2 — ОБОГАЩЕНИЕ: по 4 доп-кадра на сайт в стиле его пина, РАЗНЫЕ форматы (16:9/1:1/9:16),
   чтобы галереи/контакт-листы были из УНИКАЛЬНЫХ кадров, а не повторов. Пин как стиль-ref. Скип-если-есть. */
import path from "node:path";
import fs from "node:fs";
import { higsAvailable, higsGenerateImageAsync, higsDownload } from "@/lib/ai/higs";

const OUT = path.resolve("public/uploads/1/story2");
const P = (n: string) => path.resolve(`analitic/pins/tatoo/story/${n}`);
const NEG = "no watermark, no logo, no lettering, no typography, no text, no extra fingers, no malformed hands, no deformed face, editorial, cinematic";

// slug → { pin, style }
const SITES: Record<string, { pin: string; style: string }> = {
  chrome:    { pin: "6.jpg",  style: "futuristic silver metallic couture, crystal mesh, chrome, spiked accessories, black background, sparkling highlights, sci-fi femme-warrior glam" },
  rosaline:  { pin: "7.jpg",  style: "romantic sepia-rose mood, roses, lace, pink ribbons, pearls, dreamy melancholic beauty, warm painterly film grain" },
  seraph:    { pin: "8.jpg",  style: "rose-pink angelic warrior, platinum-blonde hair, silver crown-halo, white and soft-red feathered wings, black-red armor, ethereal high-fashion fantasy" },
  salt:      { pin: "9.jpg",  style: "surreal fine-art poster, pale bandage blindfold, metal thorn-spike crown halo, copper-red hair, pale draped robe, burnt-orange and cool-grey palette, distressed grunge" },
  deity:     { pin: "10.jpg", style: "cracked white marble statue with molten gold veins, ornate gold brocade, baroque vaporwave, black background, dramatic museum light" },
  corrosive: { pin: "12.jpg", style: "vintage screenprint propaganda pop-art illustration, horned nun, bold flat crimson-red background, cream and black high-contrast halftone, retro graphic" },
  ardour:    { pin: "13.jpg", style: "high-contrast black-and-white halftone riso-zine, nun with barbed thorn-crown halo, painted red cross accents, tattoos, bone-grey background, grunge" },
  aesthetic: { pin: "14.jpg", style: "dark gothic tattooed nun, barbed thorn crown, black habit, blood-red splatter accents, charcoal-black background, occult grunge painterly" },
  handover:  { pin: "15.jpg", style: "epic biblical oil painting, golden-amber storm clouds, fire, robed prophet, dramatic reverent light, painterly museum quality" },
  alexander: { pin: "16.jpg", style: "epic historical museum oil painting, armored warrior, desaturated teal-cream palette, red cape, smoky orange battle sky, grunge texture" },
  lover:     { pin: "17.jpg", style: "classical marble statue lit entirely in deep crimson-red monochrome, pure black background, dramatic sculptural fine-art" },
  justice:   { pin: "18.jpg", style: "painterly classical chiaroscuro, veiled figure with ornate gold crown, glowing golden torch-lamp, deep black background, fine-art somber" },
  nocturne:  { pin: "19.jpg", style: "dark horror magazine, shadowy figure, black smoke, blood-red haze, faint glowing red, near-black background, ominous cinematic painterly" },
  chivalry:  { pin: "20.jpg", style: "dark gothic crimson-red, veiled figure with ornate spiked metal crown, dark crimson autumn forest, red rim light, cinematic painterly" },
  ostpuck:   { pin: "21.jpg", style: "Old Master baroque oil painting, warm brown-amber-gold chiaroscuro candlelight, Renaissance atmosphere, painterly museum quality" },
};

const VARIS = [
  { suf: "extra-1", aspect: "16:9", pre: "Wide cinematic panoramic composition, subject reclining across the frame. " },
  { suf: "extra-2", aspect: "1:1",  pre: "Extreme macro close-up detail fragment. " },
  { suf: "extra-3", aspect: "9:16", pre: "Full-length dramatic vertical composition. " },
  { suf: "extra-4", aspect: "1:1",  pre: "Atmospheric still-life fragment, no face, objects and texture. " },
];

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot недоступен");
  const stamp = Date.now();
  const jobs: Promise<void>[] = [];
  for (const [slug, { pin, style }] of Object.entries(SITES)) {
    for (const v of VARIS) {
      const name = `${slug}-${v.suf}`;
      const dst = path.join(OUT, `${name}.jpg`);
      if (fs.existsSync(dst)) { console.log(`SKIP ${name}`); continue; }
      const p = (async () => {
        try {
          const url = await higsGenerateImageAsync({ jobId: `${name}-${stamp}`, prompt: v.pre + style + ". " + NEG, folder: "story2-enrich", refFrames: [P(pin)], aspectRatio: v.aspect, quality: "2k" });
          await higsDownload(url, dst); console.log(`OK ${name}`);
        } catch (e) { console.error(`FAIL ${name}:`, (e as Error).message); }
      })();
      jobs.push(p);
      await new Promise((r) => setTimeout(r, 2500));
    }
  }
  await Promise.all(jobs);
  console.log("story2-enrich: готово");
}
main().catch((e) => { console.error(e); process.exit(1); });
