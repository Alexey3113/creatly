/**
 * Visual Hooks — ассеты batch 2 (vanguard / aether / botanica / neon-forge) через Higs Bot.
 * Запуск: cd <root>; set -a; source .env; set +a; npx tsx --tsconfig <root>/tsconfig.json scripts/hooks-batch2.ts
 */
import { join } from "path";
import { higsAvailable, higsDownload, higsGenerateImage, higsRemoveBackground } from "@/lib/ai/higs";

const DIR = join(process.cwd(), "public", "uploads", "1", "hooks", "scenes");
const FOLDER = "visual-hooks";

type Job = { name: string; model: string; aspect: string; prompt: string; cutout?: boolean };

const jobs: Job[] = [
  { name: "s4-figures", model: "nano-banana-pro", aspect: "3:4", cutout: true,
    prompt: "Two bold stylized 3D collectible hero characters, dynamic confident poses, matte designer-toy look, standing together, full body, on a perfectly flat plain neutral grey seamless studio background, even lighting, sharp, high detail. 3:4." },
  { name: "s5-monolith", model: "soul-cinematic", aspect: "16:9",
    prompt: "A monumental minimalist architectural monolith emerging from thick drifting lavender and lilac fog at dawn, soft volumetric light, calm, refined, vast negative space, dreamy purple gradient sky, cinematic, ultra clean. 16:9." },
  { name: "s6-object", model: "nano-banana-pro", aspect: "1:1", cutout: true,
    prompt: "A single sculptural organic object, smooth matte ceramic form intertwined with clear glass, soft sage-green and cream, elegant, on a perfectly flat plain warm sand seamless background, one hard directional light, clean product render. 1:1." },
  { name: "s7-chrome", model: "nano-banana-pro", aspect: "1:1", cutout: true,
    prompt: "A single twisting liquid chrome shard sculpture, sharp faceted mirror-metal, futuristic, dramatic reflections, floating, on a perfectly flat plain black seamless background, studio rim light, ultra sharp product render. 1:1." },
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
  log("batch2 готово");
}
main().catch((e) => { console.error(e); process.exit(1); });
