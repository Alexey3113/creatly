/* STORY v2 — БАТЧ 4: alexander(16 историч-эпик) · lover(17 red statue) · justice(18 факел/HUD) ·
   nocturne(19 хоррор red-eyes) · chivalry(20 crimson корона) · ostpuck(21 baroque cello). Пин ref. Скип-если-есть. */
import path from "node:path";
import fs from "node:fs";
import { higsAvailable, higsGenerateImageAsync, higsDownload, higsRemoveBackground } from "@/lib/ai/higs";

const OUT = path.resolve("public/uploads/1/story2");
const P = (n: string) => path.resolve(`analitic/pins/tatoo/story/${n}`);
const NEG = "no watermark, no logo, no lettering, no typography, no text, no extra fingers, no malformed hands, no deformed face, editorial, cinematic";

const GEN = [
  // ALEXANDER (16) — teal/cream historical epic, warrior on horse
  { name: "alexander-hero", pin: "16.jpg", aspect: "4:5", prompt: "Epic historical painting of a young armored warrior king on a rearing white horse raising a sword, flowing red cape, smoky orange-and-teal battle sky, desaturated cream and teal palette, museum oil painting, grunge texture, cinematic. " + NEG },
  { name: "alexander-portrait-b", pin: "16.jpg", aspect: "4:5", prompt: "Epic historical portrait of an armored warrior king with red cape and laurel, teal-cream desaturated palette, smoky sky, museum oil painting, dramatic. " + NEG },
  { name: "alexander-still-1", pin: "16.jpg", aspect: "1:1", prompt: "Macro of an ornate bronze war helmet and sword hilt, teal-cream desaturated palette, museum oil painting still, grunge. " + NEG },
  { name: "alexander-still-2", pin: "16.jpg", aspect: "4:5", prompt: "A flowing red war cape and bronze armor against a smoky teal battlefield, epic historical oil painting still, desaturated. " + NEG },
  // LOVER (17) — red monochrome classical lovers statue
  { name: "lover-hero", pin: "17.jpg", aspect: "4:5", prompt: "A classical marble statue of two lovers embracing, lit entirely in deep crimson-red monochrome, pure black background, dramatic sculptural light, fine-art poster, ultra-detailed. " + NEG },
  { name: "lover-portrait-b", pin: "17.jpg", aspect: "4:5", prompt: "A crimson-red lit classical statue of an embracing couple, close crop, black background, dramatic sculptural shadows, fine-art. " + NEG },
  { name: "lover-still-1", pin: "17.jpg", aspect: "1:1", prompt: "Macro of a crimson-red lit marble statue hand resting on drapery, black background, dramatic sculptural fine-art still. " + NEG },
  { name: "lover-still-2", pin: "17.jpg", aspect: "4:5", prompt: "Crimson-red lit marble drapery folds of a classical statue, black background, dramatic fine-art still. " + NEG },
  // JUSTICE (18) — black/red veiled crowned figure with torch
  { name: "justice-hero", pin: "18.jpg", aspect: "4:5", prompt: "Painterly classical portrait of a veiled woman wearing an ornate gold crown over a translucent white veil, holding a glowing golden torch-lamp, deep black background, chiaroscuro light, fine-art, dramatic somber. " + NEG },
  { name: "justice-portrait-b", pin: "18.jpg", aspect: "4:5", prompt: "Painterly portrait of the same veiled crowned woman, head bowed, holding a lantern glow, black background, chiaroscuro fine-art, somber. " + NEG },
  { name: "justice-still-1", pin: "18.jpg", aspect: "1:1", prompt: "Macro of a glowing golden ornate torch-lamp held in pale hands, black background, chiaroscuro fine-art still, warm glow. " + NEG },
  { name: "justice-still-2", pin: "18.jpg", aspect: "4:5", prompt: "An ornate gold crown over a translucent white veil, black background, chiaroscuro painterly still, dramatic. " + NEG },
  // TЬМА (19) — near-black/blood-red horror, red-eyed shadow
  { name: "nocturne-hero", pin: "19.jpg", aspect: "4:5", prompt: "Dark horror magazine portrait of a shadowy female figure emerging from black smoke and flowing dark hair, faint glowing red eyes, hand raised to her face, deep near-black background with blood-red smoke, cinematic, ominous, painterly. " + NEG },
  { name: "nocturne-portrait-b", pin: "19.jpg", aspect: "4:5", prompt: "Dark horror portrait of a shadow figure dissolving into black smoke, glowing red eyes, blood-red haze, near-black background, ominous cinematic. " + NEG },
  { name: "nocturne-still-1", pin: "19.jpg", aspect: "1:1", prompt: "Abstract black smoke and blood-red embers swirling on a near-black background, dark horror still, cinematic ominous. " + NEG },
  { name: "nocturne-still-2", pin: "19.jpg", aspect: "4:5", prompt: "A pale hand emerging from black smoke with faint red glow, near-black background, dark horror still, ominous. " + NEG },
  // CHIVALRY (20) — crimson gothic crowned veiled figure + red forest
  { name: "chivalry-hero", pin: "20.jpg", aspect: "4:5", prompt: "Dark gothic portrait of a veiled figure wearing an ornate spiked metal crown, lit in deep crimson-red, standing before a dark crimson autumn forest with red leaves, red rim light, cinematic gothic, painterly, ultra-detailed. " + NEG },
  { name: "chivalry-portrait-b", pin: "20.jpg", aspect: "4:5", prompt: "Gothic portrait of the same crowned veiled figure in profile, crimson-red light, dark red forest, cinematic somber, painterly. " + NEG },
  { name: "chivalry-still-1", pin: "20.jpg", aspect: "1:1", prompt: "Macro of an ornate spiked metal crown lit in crimson-red, dark background with red autumn leaves, gothic still, painterly. " + NEG },
  { name: "chivalry-still-2", pin: "20.jpg", aspect: "4:5", prompt: "Crimson autumn maple leaves and dark drapery lit in red, gothic still, dark cinematic, painterly. " + NEG },
  // OSTPUCK (21) — warm baroque oil-painting musician with cello
  { name: "ostpuck-hero", pin: "21.jpg", aspect: "4:5", prompt: "Old Master baroque oil painting of a young woman with a headscarf playing a cello, warm brown-amber-gold palette, chiaroscuro candlelight, Renaissance style, painterly, museum quality. " + NEG },
  { name: "ostpuck-portrait-b", pin: "21.jpg", aspect: "4:5", prompt: "Baroque oil painting portrait of the same young woman with headscarf, eyes downcast, warm amber-gold chiaroscuro, Renaissance, painterly. " + NEG },
  { name: "ostpuck-still-1", pin: "21.jpg", aspect: "1:1", prompt: "Baroque oil painting still-life of a wooden cello scroll and strings, warm amber-gold chiaroscuro candlelight, Renaissance, painterly. " + NEG },
  { name: "ostpuck-still-2", pin: "21.jpg", aspect: "4:5", prompt: "Baroque oil painting of hands on cello strings with a bow, warm brown-amber chiaroscuro, Renaissance, painterly. " + NEG },
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
        const url = await higsGenerateImageAsync({ jobId: `${g.name}-${stamp}`, prompt: g.prompt, folder: "story2-batch4", refFrames: [P(g.pin)], aspectRatio: g.aspect, quality: "2k" });
        await higsDownload(url, dst); console.log(`OK ${g.name}`);
      } catch (e) { console.error(`FAIL ${g.name}:`, (e as Error).message); }
    })();
    jobs.push(p);
    await new Promise((r) => setTimeout(r, 3000));
  }
  await Promise.all(jobs);
  for (const slug of ["alexander", "lover", "justice", "nocturne", "chivalry", "ostpuck"]) {
    const hero = path.join(OUT, `${slug}-hero.jpg`), cut = path.join(OUT, `${slug}-hero-cut.png`);
    if (fs.existsSync(hero) && !fs.existsSync(cut)) {
      try { const u = await higsRemoveBackground(hero, `${slug}-hero-cut-${stamp}`, "story2-batch4"); await higsDownload(u, cut); console.log(`OK ${slug}-hero-cut`); }
      catch (e) { console.error(`FAIL ${slug} cutout:`, (e as Error).message); }
    }
  }
  console.log("story2-batch4: готово");
}
main().catch((e) => { console.error(e); process.exit(1); });
