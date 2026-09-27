/**
 * Visual Hooks флагман — видео через Higs Bot (ASYNC kling-3.0) → upscale 4K.
 * Async-путь (wait:false + опрос) обходит headers-timeout Node fetch на длинных видео.
 * Пробуем reveal (start→end); при сбое сабмита — фолбэк в orbit (только start).
 * Запуск: cd <root>; set -a; source .env; set +a; npx tsx --tsconfig <root>/tsconfig.json scripts/hooks-video.ts
 */
import { join } from "path";
import { higsAvailable, higsDownload, higsGenerateVideoAsync, higsUpscaleVideo } from "@/lib/ai/higs";

const DIR = join(process.cwd(), "public", "uploads", "1", "hooks");
const FOLDER = "visual-hooks";
const START = join(DIR, "bot-ovoid-nano-banana-pro.png");
const END = join(DIR, "bot-ovoid-reveal-open.png");

const PROMPT_REVEAL =
  "Slow cinematic push-in on the ovoid object. The central seam gradually opens and a warm amber light blooms from within, softly illuminating the polished chrome and frosted glass. Subtle continuous motion, no cuts, no scene change, seamless, photoreal, shallow depth of field, warm filmic editorial mood, camera almost still.";
const PROMPT_ORBIT =
  "Very slow cinematic orbit around the ovoid object, warm light gently sweeping across the polished chrome, the amber seam softly pulsing brighter then settling. Subtle continuous motion, no cuts, seamless, photoreal, shallow depth of field, warm filmic editorial mood.";

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot оффлайн");
  const t0 = Date.now();
  const log = (m: string) => console.log(`[${((Date.now() - t0) / 60000).toFixed(1)}м] ${m}`);

  let url: string | null = null;
  // 1) reveal (start→end)
  try {
    log("видео kling-3.0 async (reveal start→end)…");
    url = await higsGenerateVideoAsync({
      prompt: PROMPT_REVEAL,
      jobId: `hooks-ovoid-reveal-${Date.now().toString(36)}`,
      folder: FOLDER,
      startFrame: START,
      endFrame: END,
      duration: 5,
      quality: "1080p",
    });
    log("  ✓ reveal видео готово");
  } catch (err) {
    log(`  ✗ reveal: ${String(err).slice(0, 160)} → фолбэк orbit`);
  }
  // 2) fallback orbit (start only)
  if (!url) {
    log("видео kling-3.0 async (orbit)…");
    url = await higsGenerateVideoAsync({
      prompt: PROMPT_ORBIT,
      jobId: `hooks-ovoid-orbit-${Date.now().toString(36)}`,
      folder: FOLDER,
      startFrame: START,
      duration: 5,
      quality: "1080p",
    });
    log("  ✓ orbit видео готово");
  }

  const raw = join(DIR, "ovoid-hero-1080.mp4");
  await higsDownload(url, raw);
  log(`  ↓ ${raw}`);

  log("upscale bytedance → 4K…");
  try {
    const up = await higsUpscaleVideo(raw, { resolution: "4K", fps: 30, preset: "Common", maxCredits: 60 });
    await higsDownload(up, join(DIR, "ovoid-hero-4k.mp4"));
    log("  ✓ 4K готов");
  } catch (err) {
    log(`  ✗ upscale: ${String(err).slice(0, 160)} (оставляю 1080p как 4k-имя)`);
    await higsDownload(url, join(DIR, "ovoid-hero-4k.mp4"));
  }
  log("готово");
}

main().catch((e) => { console.error(e); process.exit(1); });
