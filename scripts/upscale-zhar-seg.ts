/** Посегментный апскейл ЖАР: каждый сегмент 4K (под лимитом формы) → concatScrub → HQ-фильм (суперсэмплинг). */
import { join } from "path";
import { higsAvailable, higsDownload, higsUpscaleVideo } from "@/lib/ai/higs";
import { concatScrub, extractPoster } from "@/lib/media/ffmpeg";
const DIR = join(process.cwd(), "public", "uploads", "1", "gen");
const t0 = Date.now();
const log = (m: string) => console.log(`[${((Date.now()-t0)/60000).toFixed(1)}м] ${m}`);
async function main() {
  if (!(await higsAvailable())) throw new Error("offline");
  const up: string[] = [];
  for (let i = 0; i < 5; i++) {
    log(`сегмент ${i}: upscale 4K…`);
    let ok = false;
    for (let a = 0; a < 2 && !ok; a++) {
      try {
        const url = await higsUpscaleVideo(join(DIR, `zhar-seg-${i}.mp4`), { resolution: a === 0 ? "4K" : "2K", fps: 30, jobId: `zhar-up-${i}-${a}-${Date.now().toString(36)}` });
        const local = join(DIR, `zhar-seg-${i}-up.mp4`);
        await higsDownload(url, local);
        up.push(local);
        ok = true;
        log(`  сегмент ${i} готов (${a === 0 ? "4K" : "2K"})`);
      } catch (e) { log(`  сегмент ${i} попытка ${a + 1}: ${String(e).slice(0, 100)}`); }
    }
    if (!ok) throw new Error(`сегмент ${i} не апскейлился`);
  }
  log("склейка апскейленных сегментов → HQ (даунскейл 1080p суперсэмплинг)…");
  const hq = join(DIR, "zhar-film-hq.mp4");
  await concatScrub(up, hq);
  await extractPoster(hq, join(DIR, "zhar-film-hq-poster.jpg"));
  log("ГОТОВО: zhar-film-hq.mp4");
}
main().catch(e => { console.error("SEG-UPSCALE FAILED:", String(e).slice(0,200)); process.exit(1); });
