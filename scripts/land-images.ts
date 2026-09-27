/**
 * Опорные фото для 5 лендингов (секции). nano-banana-pro, параллельно.
 * Запуск: cd <root>; set -a; source .env; set +a; npx tsx --tsconfig <root>/tsconfig.json scripts/land-images.ts
 */
import { join } from "path";
import { higsAvailable, higsDownload, higsGenerateImage } from "@/lib/ai/higs";

const DIR = join(process.cwd(), "public", "uploads", "1", "hooks", "land");
const FOLDER = "visual-hooks";
const t0 = Date.now();
const log = (m: string) => console.log(`[${((Date.now() - t0) / 60000).toFixed(1)}м] ${m}`);

const jobs: { name: string; aspect: string; prompt: string }[] = [
  { name: "bloom-app", aspect: "16:9", prompt: "A vast interior wall of a modern museum entirely covered in living bioluminescent moss and delicate glowing circuitry, soft cyan and pink light pulsing beneath, two people standing small for scale, dark elegant architecture, cinematic, hyper-detailed. 16:9." },
  { name: "bloom-lab", aspect: "16:9", prompt: "A clean dark biotech laboratory, a scientist in a lab coat holding a petri dish of glowing pink and cyan living tissue, soft rim light, shallow depth of field, cinematic, editorial, hyper-detailed. 16:9." },
  { name: "orbe-object", aspect: "1:1", prompt: "Product photography of a pristine crystal-glass sphere the size of a grapefruit containing a tiny living self-sustaining ecosystem — a miniature landscape with water, moss and tiny plants — resting on a minimal matte pedestal in a dark gallery, a single dramatic beam of light, premium, hyper-detailed. 1:1." },
  { name: "obelisk-wide", aspect: "16:9", prompt: "A vast monolithic black stone obelisk standing alone in the open Nevada desert at golden dusk, one tiny lone human figure at its base for scale, dramatic wide landscape, distant mountains, glowing sky, cinematic, hyper-detailed. 16:9." },
  { name: "vigil-deck", aspect: "16:9", prompt: "A lone person silhouetted at a huge curved observation window of a dark quiet control room, looking out at an enormous glowing planet, soft screens and instrument light in dusty pink and blue, cinematic, hyper-detailed. 16:9." },
  { name: "ascension-retreat", aspect: "16:9", prompt: "A serene minimalist wooden retreat pavilion on a misty mountainside at soft dawn, a few people seated calmly in meditation on the deck, ethereal light, muted natural tones, wellness photography, hyper-detailed. 16:9." },
];

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot оффлайн");
  log(`${jobs.length} фото параллельно`);
  await Promise.all(jobs.map(async (j) => {
    const u = await higsGenerateImage({ model: "nano-banana-pro", aspectRatio: j.aspect, quality: "2K", folder: FOLDER, jobId: `land-${j.name}-${Date.now().toString(36)}`, prompt: j.prompt });
    await higsDownload(u, join(DIR, `${j.name}.jpg`));
    log(`  ✓ ${j.name}`);
  }));
  log("land-images готово");
}
main().catch((e) => { console.error(e); process.exit(1); });
