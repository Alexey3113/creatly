/* STORY v2 — БАТЧ 3: deity(pin10 мрамор/золото) · corrosive(pin12 red pop-art nun) · ardour(pin13 halftone zine) ·
   aesthetic(pin14 gothic blood nun) · handover(pin15 biblical gold epic). Пин ref. Текст=HTML. Скип-если-есть. */
import path from "node:path";
import fs from "node:fs";
import { higsAvailable, higsGenerateImageAsync, higsDownload, higsRemoveBackground } from "@/lib/ai/higs";

const OUT = path.resolve("public/uploads/1/story2");
const P = (n: string) => path.resolve(`analitic/pins/tatoo/story/${n}`);
const NEG = "no watermark, no logo, no lettering, no typography, no text, no extra fingers, no malformed hands, no deformed face, editorial, cinematic";

const GEN = [
  // DEITY (pin10) — cracked marble + gold, baroque statue (male)
  { name: "deity-hero", pin: "10.jpg", aspect: "4:5", prompt: "A cracked white marble classical statue bust of a man with gold-veined fractured marble skin, wearing gold aviator sunglasses and an ornate gold brocade robe, one hand raised, black background, baroque vaporwave, dramatic museum light, ultra-detailed. " + NEG },
  { name: "deity-portrait-b", pin: "10.jpg", aspect: "4:5", prompt: "A shattered marble-and-gold classical statue of a man in profile, gold brocade drapery, veined cracks glowing gold, black background, baroque, dramatic. " + NEG },
  { name: "deity-still-1", pin: "10.jpg", aspect: "1:1", prompt: "Macro of cracked white marble with molten gold veins and ornate gold brocade fabric, baroque still-life, black background, dramatic light. " + NEG },
  { name: "deity-still-2", pin: "10.jpg", aspect: "4:5", prompt: "A marble hand with gold-veined cracks holding gold ornament, classical statue detail, black background, baroque vaporwave. " + NEG },
  // CORROSIVE (pin12) — red screenprint pop-art horned nun (illustration)
  { name: "corrosive-hero", pin: "12.jpg", aspect: "4:5", prompt: "Vintage screenprint propaganda poster illustration of a horned nun figure in black-and-white habit looking upward, bold flat crimson-red background, cream and black high-contrast pop-art, retro halftone, stylized vector shading. " + NEG },
  { name: "corrosive-portrait-b", pin: "12.jpg", aspect: "4:5", prompt: "Retro screenprint illustration of a horned nun in profile, flat crimson-red background, cream and black pop-art, bold graphic shading. " + NEG },
  { name: "corrosive-still-1", pin: "12.jpg", aspect: "1:1", prompt: "Flat pop-art screenprint of black curved horns and a nun coif, crimson-red background, cream-black high contrast, retro halftone. " + NEG },
  { name: "corrosive-still-2", pin: "12.jpg", aspect: "4:5", prompt: "Retro screenprint illustration of draped black nun habit folds, crimson-red flat background, cream-black graphic, halftone texture. " + NEG },
  // ARDOUR (pin13) — bone/grey halftone + red, zine nun
  { name: "ardour-hero", pin: "13.jpg", aspect: "4:5", prompt: "High-contrast black-and-white halftone photo of a nun with a barbed thorn-crown halo, a painted red cross on her face, hands raised near her face, tattooed arms, riso-grunge zine style on a bone-grey background, red accents. " + NEG },
  { name: "ardour-portrait-b", pin: "13.jpg", aspect: "4:5", prompt: "Halftone black-and-white zine portrait of the same nun, head bowed, thorn halo, tattoos, bone-grey background, red risograph accents, grunge. " + NEG },
  { name: "ardour-still-1", pin: "13.jpg", aspect: "1:1", prompt: "Halftone black-and-white macro of a barbed thorn-crown halo, bone-grey background, red risograph accent, grunge zine. " + NEG },
  { name: "ardour-still-2", pin: "13.jpg", aspect: "4:5", prompt: "Halftone black-and-white zine detail of tattooed hands and a silver cross pendant, bone-grey background, red accents, grunge. " + NEG },
  // AESTHETIC (pin14) — black/blood-red gothic tattoo nun
  { name: "aesthetic-hero", pin: "14.jpg", aspect: "4:5", prompt: "Dark gothic portrait of a tattooed nun in a black habit with a barbed thorn crown, a red cross painted on her forehead, hands with intricate tattoos raised near her face, blood-red splatter accents, charcoal-black background, occult grunge, painterly. " + NEG },
  { name: "aesthetic-portrait-b", pin: "14.jpg", aspect: "4:5", prompt: "Gothic portrait of the same tattooed nun, black habit, thorn crown, blood-red accents, dark charcoal background, occult painterly grunge. " + NEG },
  { name: "aesthetic-still-1", pin: "14.jpg", aspect: "1:1", prompt: "Macro of tattooed hands and a silver cross with blood-red splatter, charcoal-black background, gothic occult still, painterly. " + NEG },
  { name: "aesthetic-still-2", pin: "14.jpg", aspect: "4:5", prompt: "Detail of a barbed thorn crown and black habit with blood-red drips, charcoal-black background, gothic grunge occult. " + NEG },
  // HANDOVER (pin15) — golden biblical epic (prophet + chariot of fire)
  { name: "handover-hero", pin: "15.jpg", aspect: "4:5", prompt: "Epic biblical oil painting of a robed bearded prophet reaching upward with open arms toward a blazing chariot of fire drawn by fiery horses in golden storm clouds, dramatic golden-amber light, painterly, cinematic, ultra-detailed. " + NEG },
  { name: "handover-portrait-b", pin: "15.jpg", aspect: "4:5", prompt: "Epic oil painting of a robed prophet kneeling in golden desert light, arms raised in reverence, amber storm sky, painterly biblical, dramatic. " + NEG },
  { name: "handover-still-1", pin: "15.jpg", aspect: "1:1", prompt: "A blazing chariot of fire and fiery horses in golden storm clouds, epic biblical oil painting, amber-gold light, painterly. " + NEG },
  { name: "handover-still-2", pin: "15.jpg", aspect: "4:5", prompt: "A fallen prophet's mantle cloak on desert ground in golden light, epic biblical oil painting still, amber tones, painterly. " + NEG },
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
        const url = await higsGenerateImageAsync({ jobId: `${g.name}-${stamp}`, prompt: g.prompt, folder: "story2-batch3", refFrames: [P(g.pin)], aspectRatio: g.aspect, quality: "2k" });
        await higsDownload(url, dst); console.log(`OK ${g.name}`);
      } catch (e) { console.error(`FAIL ${g.name}:`, (e as Error).message); }
    })();
    jobs.push(p);
    await new Promise((r) => setTimeout(r, 3000));
  }
  await Promise.all(jobs);
  for (const slug of ["deity", "corrosive", "ardour", "aesthetic", "handover"]) {
    const hero = path.join(OUT, `${slug}-hero.jpg`), cut = path.join(OUT, `${slug}-hero-cut.png`);
    if (fs.existsSync(hero) && !fs.existsSync(cut)) {
      try { const u = await higsRemoveBackground(hero, `${slug}-hero-cut-${stamp}`, "story2-batch3"); await higsDownload(u, cut); console.log(`OK ${slug}-hero-cut`); }
      catch (e) { console.error(`FAIL ${slug} cutout:`, (e as Error).message); }
    }
  }
  console.log("story2-batch3: готово");
}
main().catch((e) => { console.error(e); process.exit(1); });
