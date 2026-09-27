/**
 * Visual Hooks — ассеты для batch 1 (сцены cloud-step / strata / reverie) через Higs Bot.
 * Фоны — soul-cinematic (атмосфера), объекты — nano-banana-pro (+ remove-background для cutout).
 * Запуск: cd <root>; set -a; source .env; set +a; npx tsx --tsconfig <root>/tsconfig.json scripts/hooks-batch1.ts
 */
import { join } from "path";
import { higsAvailable, higsDownload, higsGenerateImage, higsRemoveBackground } from "@/lib/ai/higs";

const DIR = join(process.cwd(), "public", "uploads", "1", "hooks", "scenes");
const FOLDER = "visual-hooks";

type Job = { name: string; model: string; aspect: string; prompt: string; cutout?: boolean };

const jobs: Job[] = [
  { name: "s1-sky", model: "soul-cinematic", aspect: "16:9",
    prompt: "Dreamy vast sky filled with soft pink, peach and lavender clouds at golden hour, gentle gradient, ethereal, minimal, editorial, lots of open space, no ground. 16:9." },
  { name: "s1-sneaker", model: "nano-banana-pro", aspect: "1:1", cutout: true,
    prompt: "A single sculptural chunky lifestyle sneaker in soft baby-pink and cream, glossy inflated design, floating at a dynamic three-quarter angle, clean studio product render, centered on a perfectly flat plain light-grey seamless background, soft contact shadow, ultra sharp. 1:1." },
  { name: "s2-strata", model: "nano-banana-pro", aspect: "16:9",
    prompt: "A long horizontal ribbon-like rock formation, weathered stone with patches of green moss on top, twisting and curving across the whole frame, floating against a clean pale blue sky, cinematic depth, the formation bleeds off both left and right edges, soft daylight. 16:9." },
  { name: "s3-forest", model: "soul-cinematic", aspect: "16:9",
    prompt: "A dark enchanted fantasy forest at dusk, ancient trees, drifting mist, a glowing circular portal of warm light in the center distance, moody amethyst and deep emerald tones, cinematic, volumetric light. 16:9." },
  { name: "s3-world", model: "soul-cinematic", aspect: "16:9",
    prompt: "A breathtaking dreamlike fantasy realm: floating islands, cascading waterfalls, golden ethereal light, distant palace, soft clouds, magical, hyper-detailed, cinematic. 16:9." },
];

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot оффлайн");
  const t0 = Date.now();
  const log = (m: string) => console.log(`[${((Date.now() - t0) / 60000).toFixed(1)}м] ${m}`);

  let i = 0;
  const POOL = 6;
  const run = async (j: Job) => {
    log(`→ ${j.name} (${j.model})`);
    try {
      const url = await higsGenerateImage({
        prompt: j.prompt, model: j.model,
        jobId: `hooks-${j.name}-${Date.now().toString(36)}`,
        folder: FOLDER, aspectRatio: j.aspect, quality: "2K",
      });
      const local = join(DIR, `${j.name}.png`);
      await higsDownload(url, local);
      log(`  ✓ ${j.name}`);
      if (j.cutout) {
        log(`  ✂ remove-bg ${j.name}…`);
        const curl = await higsRemoveBackground(local, `hooks-${j.name}-cut-${Date.now().toString(36)}`, FOLDER);
        await higsDownload(curl, join(DIR, `${j.name}-cut.png`));
        log(`  ✓ ${j.name}-cut`);
      }
    } catch (err) {
      log(`  ✗ ${j.name}: ${String(err).slice(0, 160)}`);
    }
  };
  const workers = Array.from({ length: Math.min(POOL, jobs.length) }, async () => {
    while (i < jobs.length) await run(jobs[i++]);
  });
  await Promise.all(workers);
  log("batch1 готово");
}

main().catch((e) => { console.error(e); process.exit(1); });
