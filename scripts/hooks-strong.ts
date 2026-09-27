/**
 * Visual Hooks — усиление слабых сцен: крупные лица / божественный мир / богаче органика.
 * Запуск: cd <root>; set -a; source .env; set +a; npx tsx --tsconfig <root>/tsconfig.json scripts/hooks-strong.ts
 */
import { join } from "path";
import { higsAvailable, higsDownload, higsGenerateImage } from "@/lib/ai/higs";

const DIR = join(process.cwd(), "public", "uploads", "1", "hooks", "scenes");
const FOLDER = "visual-hooks";
const t0 = Date.now();
const log = (m: string) => console.log(`[${((Date.now() - t0) / 60000).toFixed(1)}м] ${m}`);

const jobs: { name: string; model: string; aspect: string; prompt: string }[] = [
  { name: "s8b-face", model: "soul-v2", aspect: "16:9",
    prompt: "Editorial high-fashion beauty photograph, a striking model wearing bold sculptural futuristic wrap sunglasses with warm amber-tinted lenses, dramatic close crop of the face on the RIGHT side of the frame, glossy skin, cinematic studio light, deep warm charcoal background, vast negative space on the left. Photoreal, sharp, luxurious. No text. 16:9." },
  { name: "s11b-face", model: "soul-v2", aspect: "16:9",
    prompt: "OYLA-style editorial beauty photograph, a striking model's face and bare shoulder on the RIGHT, one elegant hand raised holding a small sculptural glass perfume bottle beside the cheek, warm nude and beige tones, soft directional beauty light, luxurious, calm gaze, vast negative space on the left. Photoreal, cinematic, sharp. No text. 16:9." },
  { name: "s5b-world", model: "soul-cinematic", aspect: "16:9",
    prompt: "A divine dreamlike realm: monumental pale minimalist architecture and floating monoliths emerging from luminous lavender and lilac clouds, soft godrays breaking through, ethereal mist, grand scale, a tiny distant bird for scale, refined, cinematic, hyper-detailed. 16:9." },
  { name: "s6b-scene", model: "soul-cinematic", aspect: "16:9",
    prompt: "A surreal organic still-life scene: a single sculptural matte sage-ceramic and clear-glass form resting on a warm travertine plinth on the RIGHT, surrounded by a few floating fresh green leaves, moss fragments and one translucent petal drifting, one hard directional light casting a long dramatic shadow, warm sand background, editorial, cinematic, negative space on the left. Sharp. 16:9." },
];

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot оффлайн");
  let i = 0;
  const run = async (j: (typeof jobs)[number]) => {
    log(`→ ${j.name} (${j.model})`);
    try {
      const url = await higsGenerateImage({ prompt: j.prompt, model: j.model, jobId: `hooks-${j.name}-${Date.now().toString(36)}`, folder: FOLDER, aspectRatio: j.aspect, quality: "2K" });
      await higsDownload(url, join(DIR, `${j.name}.png`));
      log(`  ✓ ${j.name}`);
    } catch (err) { log(`  ✗ ${j.name}: ${String(err).slice(0, 150)}`); }
  };
  const workers = Array.from({ length: 4 }, async () => { while (i < jobs.length) await run(jobs[i++]); });
  await Promise.all(workers);
  log("strong готово");
}
main().catch((e) => { console.error(e); process.exit(1); });
