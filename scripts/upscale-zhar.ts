/** Апскейл ЖАР-фильма: 4K через bytedance-upscale → даунскейл 1080p (суперсэмплинг). */
import { join } from "path";
import { higsAvailable, higsDownload, higsUpscaleVideo } from "@/lib/ai/higs";
import { hasFfmpeg } from "@/lib/media/ffmpeg";
import { execFile } from "child_process";
import { promisify } from "util";
const exec = promisify(execFile);
const DIR = join(process.cwd(), "public", "uploads", "1", "gen");
const t0 = Date.now();
const log = (m: string) => console.log(`[${((Date.now() - t0) / 60000).toFixed(1)}м] ${m}`);

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot оффлайн");
  const src = join(DIR, "zhar-film.mp4");
  log("upscale 4K…");
  const url = await higsUpscaleVideo(src, { resolution: "4K", fps: 30, preset: "Common" });
  const up4k = join(DIR, "zhar-film-4k.mp4");
  await higsDownload(url, up4k);
  log("скачано 4K, даунскейл до 1080p…");
  if (await hasFfmpeg()) {
    const out = join(DIR, "zhar-film-hq.mp4");
    await exec("ffmpeg", ["-y", "-loglevel", "error", "-i", up4k, "-vf", "scale=1920:-2:flags=lanczos", "-an", "-c:v", "libx264", "-g", "2", "-keyint_min", "2", "-sc_threshold", "0", "-preset", "slow", "-crf", "20", "-pix_fmt", "yuv420p", "-movflags", "+faststart", out], { timeout: 600_000 });
    log("готово: zhar-film-hq.mp4 (суперсэмплинг 4K→1080p)");
  }
}
main().catch((e) => { console.error("UPSCALE FAILED:", e); process.exit(1); });
