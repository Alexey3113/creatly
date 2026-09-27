/**
 * Videos-only (kling) для batch 1 — кадры уже сгенерированы. Ретрай при сбое сабмита.
 * Запуск: cd <root>; set -a; source .env; set +a; npx tsx --tsconfig <root>/tsconfig.json scripts/hooks-vid1.ts
 */
import { join } from "path";
import { higsAvailable, higsDownload, higsGenerateVideoAsync } from "@/lib/ai/higs";

const DIR = join(process.cwd(), "public", "uploads", "1", "hooks", "scenes");
const FOLDER = "visual-hooks";
const t0 = Date.now();
const log = (m: string) => console.log(`[${((Date.now() - t0) / 60000).toFixed(1)}м] ${m}`);

const jobs = [
  { name: "reverie-world-vid", start: "s3-world.png", prompt: "The floating fantasy realm comes alive: soft clouds drift, warm golden light shifts and gently pulses, waterfalls cascade, a tiny dragon glides slowly in the distance, very slow camera drift forward. Seamless, no cuts, no scene change, dreamlike, cinematic." },
  { name: "vanguard-vid", start: "van-red.png", prompt: "The two hero characters hold a powerful battle-ready stance with subtle continuous motion — one slowly pumps a fist, capes and details sway, breathing, confident energy, camera steady. Seamless, no cuts, no scene change, cinematic." },
  { name: "liquid-vid", start: "lw-lav.png", prompt: "Camera slowly orbits the liquid chrome word FLUX, glossy reflections and highlights sweeping across the mirror metal, letters stay intact and readable, subtle molten shimmer. Seamless, no cuts, no scene change, cinematic." },
];

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot оффлайн");
  for (const j of jobs) {
    log(`vid → ${j.name}`);
    let ok = false;
    for (let attempt = 0; attempt < 3 && !ok; attempt++) {
      try {
        const url = await higsGenerateVideoAsync({ prompt: j.prompt, jobId: `hooks-${j.name}-t${attempt}-${Date.now().toString(36)}`, folder: FOLDER, startFrame: join(DIR, j.start), duration: 10, quality: "1080p" });
        await higsDownload(url, join(DIR, `${j.name}.mp4`));
        log(`  ✓ ${j.name}.mp4`);
        ok = true;
      } catch (err) {
        log(`  ✗ ${j.name} try${attempt}: ${String(err).slice(0, 130)}`);
        await new Promise((r) => setTimeout(r, 8000));
      }
    }
  }
  log("vid1 готово");
}
main().catch((e) => { console.error(e); process.exit(1); });
