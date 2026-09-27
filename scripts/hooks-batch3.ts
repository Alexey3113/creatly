/**
 * Visual Hooks — ассеты batch 3 (macro-optics / liquid-word / orbit-data / atelier-hand / fold-horizon).
 * Запуск: cd <root>; set -a; source .env; set +a; npx tsx --tsconfig <root>/tsconfig.json scripts/hooks-batch3.ts
 */
import { join } from "path";
import { higsAvailable, higsDownload, higsGenerateImage, higsRemoveBackground } from "@/lib/ai/higs";

const DIR = join(process.cwd(), "public", "uploads", "1", "hooks", "scenes");
const FOLDER = "visual-hooks";
type Job = { name: string; model: string; aspect: string; prompt: string; cutout?: boolean };

const jobs: Job[] = [
  { name: "s8-glasses", model: "nano-banana-pro", aspect: "1:1", cutout: true,
    prompt: "A single pair of luxury futuristic sunglasses, sculptural frame, tinted amber lenses, dramatic macro three-quarter view, glossy, on a perfectly flat plain dark charcoal seamless background, sharp studio product render, warm rim light. 1:1." },
  { name: "s9-word", model: "nano-banana-pro", aspect: "3:2", cutout: true,
    prompt: "The word \"FLUX\" rendered as thick 3D liquid chrome metal letters, glossy mirror finish, bold sans-serif, dramatic reflections, floating, on a perfectly flat plain white seamless background, sharp studio render. 3:2." },
  { name: "s10-globe", model: "nano-banana-pro", aspect: "1:1", cutout: true,
    prompt: "A stylized glossy 3D planet Earth globe, clean minimal continents, soft blue oceans, subtle clouds, gentle studio lighting, on a perfectly flat plain white seamless background, product render. 1:1." },
  { name: "s11-hand", model: "soul-v2", aspect: "16:9",
    prompt: "Editorial fashion photograph, an elegant hand entering from the right holding a small sculptural glass perfume object close to camera, softly blurred shoulder behind, warm neutral studio backdrop, soft beauty light, realistic skin, shallow depth of field, negative space on the left. Photorealistic. No text. 16:9." },
  { name: "s12-landscape", model: "soul-cinematic", aspect: "16:9",
    prompt: "A vast dramatic mountain landscape at dawn, layered ridges fading into mist, a single tiny lone human figure standing on a cliff for scale, cold cinematic light, epic, minimal, huge sky. 16:9." },
];

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot оффлайн");
  const t0 = Date.now();
  const log = (m: string) => console.log(`[${((Date.now() - t0) / 60000).toFixed(1)}м] ${m}`);
  let i = 0;
  const run = async (j: Job) => {
    log(`→ ${j.name} (${j.model})`);
    try {
      const url = await higsGenerateImage({ prompt: j.prompt, model: j.model, jobId: `hooks-${j.name}-${Date.now().toString(36)}`, folder: FOLDER, aspectRatio: j.aspect, quality: "2K" });
      const local = join(DIR, `${j.name}.png`);
      await higsDownload(url, local);
      log(`  ✓ ${j.name}`);
      if (j.cutout) {
        log(`  ✂ ${j.name}…`);
        const c = await higsRemoveBackground(local, `hooks-${j.name}-cut-${Date.now().toString(36)}`, FOLDER);
        await higsDownload(c, join(DIR, `${j.name}-cut.png`));
        log(`  ✓ ${j.name}-cut`);
      }
    } catch (err) { log(`  ✗ ${j.name}: ${String(err).slice(0, 160)}`); }
  };
  const workers = Array.from({ length: Math.min(6, jobs.length) }, async () => { while (i < jobs.length) await run(jobs[i++]); });
  await Promise.all(workers);
  log("batch3 готово");
}
main().catch((e) => { console.error(e); process.exit(1); });
