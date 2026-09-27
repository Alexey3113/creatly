/**
 * Visual Hooks флагман — reveal END-кадр через nano-banana-pro + ref (start кадр).
 * Тот же объект, шов раскрывается, изнутри тёплый свет. Композиция сохраняется.
 * Запуск: set -a; source .env; set +a; npx tsx --tsconfig tsconfig.json scripts/hooks-reveal.ts
 */
import { join } from "path";
import { higsAvailable, higsDownload, higsGenerateImage } from "@/lib/ai/higs";

const DIR = join(process.cwd(), "public", "uploads", "1", "hooks");
const FOLDER = "visual-hooks";
const START = join(DIR, "bot-ovoid-nano-banana-pro.png");

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot оффлайн");
  const t0 = Date.now();
  const log = (m: string) => console.log(`[${((Date.now() - t0) / 60000).toFixed(1)}м] ${m}`);

  const variants = [
    {
      name: "ovoid-reveal-open",
      prompt:
        "Keep the exact same ovoid object, same travertine plinth, same warm framing and camera. Now the central seam has opened into a bright glowing gap emitting warm amber light from within, a soft volumetric glow blooming out of the opening and catching the polished chrome and frosted glass halves. Same filmic editorial mood, warm muted palette, soft window light, shallow depth of field, object centered-right with vast negative space on the left. No text. 16:9.",
    },
  ];

  for (const v of variants) {
    log(`→ ${v.name}`);
    try {
      const url = await higsGenerateImage({
        prompt: v.prompt,
        model: "nano-banana-pro",
        jobId: `hooks-${v.name}-${Date.now().toString(36)}`,
        folder: FOLDER,
        aspectRatio: "16:9",
        quality: "2K",
        refFrames: [START],
      });
      const local = join(DIR, `bot-${v.name}.png`);
      await higsDownload(url, local);
      log(`  ✓ ${v.name}`);
    } catch (err) {
      log(`  ✗ ${v.name}: ${String(err).slice(0, 180)}`);
    }
  }
  log("готово");
}

main().catch((e) => { console.error(e); process.exit(1); });
