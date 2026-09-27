/**
 * Ассеты под индивидуальные лендинги (галереи, reveal-пары, миры). allSettled, параллельно.
 * Запуск: cd <root>; set -a; source .env; set +a; npx tsx --tsconfig <root>/tsconfig.json scripts/land-assets2.ts
 */
import { join } from "path";
import { higsAvailable, higsDownload, higsGenerateImage } from "@/lib/ai/higs";

const DIR = join(process.cwd(), "public", "uploads", "1", "hooks", "land");
const FOLDER = "visual-hooks";
const t0 = Date.now();
const log = (m: string) => console.log(`[${((Date.now() - t0) / 60000).toFixed(1)}м] ${m}`);

async function gen(name: string, aspect: string, prompt: string, ref?: string) {
  try {
    const u = await higsGenerateImage({ model: "nano-banana-pro", aspectRatio: aspect, quality: "2K", folder: FOLDER, jobId: `land2-${name}-${Date.now().toString(36)}`, prompt, ...(ref ? { refFrames: [join(DIR, ref)] } : {}) });
    await higsDownload(u, join(DIR, `${name}.jpg`));
    log(`  ✓ ${name}`);
  } catch (e) { log(`  ✗ ${name}: ${String(e).slice(-40)}`); }
}

const batch: [string, string, string][] = [
  // Bloom — макро галерея
  ["bloom-dead", "16:9", "Extreme close-up of cracked barren dead grey soil, drought, lifeless, no plants, harsh flat daylight, desaturated, top-down view. 16:9."],
  ["bloom-macro1", "16:9", "Extreme macro of glowing bioluminescent cyan and soft-pink veins branching through translucent wet organic tissue, luminous, hyper-detailed, dark background. 16:9."],
  ["bloom-macro2", "16:9", "Extreme macro of tiny glowing spores and pink bioluminescent buds on delicate organic filaments, dark moody background, hyper-detailed, cinematic. 16:9."],
  ["bloom-macro3", "16:9", "Extreme macro of fine glowing root threads spreading through dark soil, cyan light tracing through the earth, hyper-detailed, cinematic. 16:9."],
  // ORBE — интерьер + эдишены
  ["orbe-interior", "16:9", "Extreme macro looking inside a tiny sealed glass ecosystem, miniature moss hills, a still glistening pond and tiny plants, soft light beams, dreamy, shallow depth of field, hyper-detailed. 16:9."],
  ["orbe-ed-dune", "1:1", "Product photo of a crystal glass sphere containing a tiny sealed desert world, miniature red dunes and one small succulent, matte pedestal, dark gallery, dramatic beam of light, premium. 1:1."],
  ["orbe-ed-coral", "1:1", "Product photo of a crystal glass sphere containing a tiny sealed underwater world, miniature coral, blue water and tiny shrimp, matte pedestal, dark gallery, dramatic light, premium. 1:1."],
  ["orbe-ed-forest", "1:1", "Product photo of a crystal glass sphere containing a tiny sealed rainforest, miniature ferns, a small waterfall and mist, matte pedestal, dark gallery, dramatic light, premium. 1:1."],
  // OBELISK
  ["obe-night", "16:9", "A vast black monolith standing alone in the Nevada desert under a brilliant starry night sky and the milky way, faint warm glow at its base, cinematic wide, hyper-detailed. 16:9."],
  ["obe-aerial", "16:9", "High aerial drone view looking down at a single black monolith casting a long shadow across empty desert at golden hour, tiny for scale, minimalist, cinematic. 16:9."],
  // VIGIL — миры
  ["vig-w1", "1:1", "A photoreal ringed gas giant planet, pale gold and cream cloud bands, on pure black space background, cinematic, hyper-detailed. 1:1."],
  ["vig-w2", "1:1", "A photoreal icy blue moon with a cracked frozen surface, on pure black space, cinematic, hyper-detailed. 1:1."],
  ["vig-w3", "1:1", "A photoreal rust-red desert planet wrapped in dust storms, on pure black space, cinematic, hyper-detailed. 1:1."],
  ["vig-w4", "1:1", "A photoreal ocean planet, deep blue with swirling white cloud systems, on pure black space, cinematic, hyper-detailed. 1:1."],
  ["vig-w5", "1:1", "A photoreal volcanic planet, dark crust with glowing orange lava cracks, on pure black space, cinematic, hyper-detailed. 1:1."],
  ["vig-w6", "1:1", "A photoreal pale-green toxic-atmosphere planet with swirling clouds, on pure black space, cinematic, hyper-detailed. 1:1."],
  // ASCENSION — галерея
  ["asc-g1", "16:9", "A woman sitting cross-legged by a large window in soft dawn light, eyes closed, breathing calmly, minimalist warm interior, muted tones, film photography. 16:9."],
  ["asc-g2", "16:9", "A quiet misty forest path at dawn, soft light filtering through tall trees, serene, muted natural tones, film photography. 16:9."],
  ["asc-g3", "16:9", "Close-up of open relaxed hands resting on knees in meditation, soft natural light, shallow depth of field, calm, muted tones. 16:9."],
];

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot оффлайн");
  log(`${batch.length} ассетов (allSettled)`);
  await Promise.allSettled(batch.map(([n, a, p]) => gen(n, a, p)));
  // reveal-пара Bloom: alive поверх dead по ref (после dead)
  log("bloom-alive (ref dead)");
  await gen("bloom-alive", "16:9", "The exact same cracked soil, now overgrown with a living lattice of glowing cyan and soft-pink bioluminescent moss and fine circuitry threads spreading through the cracks, luminous and alive, same framing and camera angle. 16:9.", "bloom-dead.jpg");
  log("land-assets2 готово");
}
main().catch((e) => { console.error(e); process.exit(1); });
