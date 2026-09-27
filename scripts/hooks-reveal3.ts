/**
 * 3 Reveal-сайта — пары кадров (A → B через ref). Курсор-маска покажет B под A.
 * Запуск: cd <root>; set -a; source .env; set +a; npx tsx --tsconfig <root>/tsconfig.json scripts/hooks-reveal3.ts
 */
import { join } from "path";
import { higsAvailable, higsDownload, higsGenerateImage } from "@/lib/ai/higs";

const DIR = join(process.cwd(), "public", "uploads", "1", "hooks", "scenes");
const FOLDER = "visual-hooks";
const t0 = Date.now();
const log = (m: string) => console.log(`[${((Date.now() - t0) / 60000).toFixed(1)}м] ${m}`);

async function gen(name: string, model: string, aspect: string, prompt: string, ref?: string) {
  log(`→ ${name}`);
  const url = await higsGenerateImage({ model, aspectRatio: aspect, quality: "2K", folder: FOLDER, jobId: `hooks-${name}-${Date.now().toString(36)}`, prompt, ...(ref ? { refFrames: [join(DIR, ref)] } : {}) });
  await higsDownload(url, join(DIR, `${name}.png`));
  log(`  ✓ ${name}`);
}

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot оффлайн");

  // Phase 1: base states A (параллельно)
  await Promise.all([
    gen("rev-face-a", "soul-v2", "16:9", "Cinematic close-up portrait of a striking person with calm neutral expression, soft dramatic studio light, dark moody background, photoreal, sharp, editorial. No text. 16:9."),
    gen("rev-land-a", "soul-cinematic", "16:9", "A serene misty green mountain valley with a river and forest at soft daylight, cinematic, calm, natural colors, wide landscape. 16:9."),
    gen("rev-map-a", "nano-banana-pro", "16:9", "A dark minimalist 3D world map / globe on a deep navy background, faint continents, subtle, clean, cinematic, empty space. 16:9."),
  ]);

  // Phase 2: revealed states B (ref = A, параллельно)
  await Promise.all([
    gen("rev-face-b", "nano-banana-pro", "16:9", "The exact same portrait and framing, now with glowing cyan and magenta neural circuitry and holographic data lines mapped across the face and skin, futuristic augmented x-ray reveal, same pose and background. 16:9.", "rev-face-a.png"),
    gen("rev-land-b", "nano-banana-pro", "16:9", "The exact same valley and composition, now transformed into a magical bioluminescent night — glowing turquoise plants, softly lit mist, purple starry sky, mythic, same layout. 16:9.", "rev-land-a.png"),
    gen("rev-map-b", "nano-banana-pro", "16:9", "The exact same world map, now lit with a glowing network of cyan connection lines, bright nodes and secure data arcs linking cities across the globe, futuristic VPN network, same layout. 16:9.", "rev-map-a.png"),
  ]);
  log("reveal3 готово");
}
main().catch((e) => { console.error(e); process.exit(1); });
