/**
 * Visual Hooks — оживление batch 1 (reverie world / vanguard fight / liquid morph).
 * Композитные кадры (nano) где нужен фон под видео, затем kling-видео (async) ~10с.
 * Запуск: cd <root>; set -a; source .env; set +a; npx tsx --tsconfig <root>/tsconfig.json scripts/hooks-anim1.ts
 */
import { join } from "path";
import { higsAvailable, higsDownload, higsGenerateImage, higsGenerateVideoAsync } from "@/lib/ai/higs";

const DIR = join(process.cwd(), "public", "uploads", "1", "hooks", "scenes");
const FOLDER = "visual-hooks";
const t0 = Date.now();
const log = (m: string) => console.log(`[${((Date.now() - t0) / 60000).toFixed(1)}м] ${m}`);

async function img(name: string, model: string, aspect: string, prompt: string) {
  log(`img → ${name}`);
  const url = await higsGenerateImage({ prompt, model, jobId: `hooks-${name}-${Date.now().toString(36)}`, folder: FOLDER, aspectRatio: aspect, quality: "2K" });
  await higsDownload(url, join(DIR, `${name}.png`));
  log(`  ✓ ${name}`);
}
async function vid(name: string, startFile: string, prompt: string) {
  log(`vid → ${name} (kling)`);
  const url = await higsGenerateVideoAsync({ prompt, jobId: `hooks-${name}-${Date.now().toString(36)}`, folder: FOLDER, startFrame: join(DIR, startFile), duration: 10, quality: "1080p" });
  await higsDownload(url, join(DIR, `${name}.mp4`));
  log(`  ✓ ${name}.mp4`);
}

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot оффлайн");

  // composed backdrops for object scenes that need a bg baked under the video
  await img("van-red", "nano-banana-pro", "16:9",
    "Two bold stylized 3D collectible hero characters in confident battle-ready poses, one raising a fist, one resting a large sword on the shoulder, standing together on the RIGHT side of the frame, on a seamless flat vivid red studio background, dramatic even lighting, full body, vast empty red space on the left. Sharp, high detail. 16:9.");
  await img("lw-lav", "nano-banana-pro", "16:9",
    "The word \"FLUX\" as thick glossy liquid chrome 3D letters, mirror finish, floating centered on a soft lavender-to-periwinkle gradient background, dramatic reflections, lots of empty space around. Sharp studio render. 16:9.");

  // videos (~10s)
  await vid("reverie-world-vid", "s3-world.png",
    "The floating fantasy realm slowly comes alive: soft clouds drift, warm golden light shifts and gently pulses, waterfalls cascade down the islands, a tiny dragon glides slowly across the distance, very slow continuous camera drift forward. Seamless, no cuts, no scene change, dreamlike, cinematic.");
  await vid("vanguard-vid", "van-red.png",
    "The two hero characters hold a powerful battle-ready stance with subtle continuous motion — one slowly pumps a fist, capes and small details sway, breathing, confident energy, the camera holds steady. Seamless, no cuts, no scene change, cinematic.");
  await vid("liquid-vid", "lw-lav.png",
    "Camera slowly orbits the liquid chrome word FLUX, glossy reflections and bright highlights sweeping across the mirror metal surface, the letters stay fully intact and readable, subtle molten shimmer. Seamless, no cuts, no scene change, mesmerizing, cinematic.");

  log("anim1 готово");
}
main().catch((e) => { console.error(e); process.exit(1); });
