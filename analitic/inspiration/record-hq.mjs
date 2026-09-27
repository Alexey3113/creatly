import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const FPS = +(process.env.FPS || 60);
const DSF = +(process.env.DSF || 2);
const W = 1920, H = 1080;
const BASE = "http://127.0.0.1:3011/visual-hooks";
const OUT = process.env.REC_OUT || "/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad/hq";
const TMP = "/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad/hq-frames";
mkdirSync(OUT, { recursive: true });
const slugs = process.argv.slice(2);

const browser = await chromium.launch({ headless: false, args: ["--window-position=-3400,-3400","--window-size=1940,1120","--disable-backgrounding-occluded-windows","--disable-renderer-backgrounding","--disable-background-timer-throttling","--disable-features=CalculateNativeWinOcclusion","--autoplay-policy=no-user-gesture-required","--hide-scrollbars"] });

for (const slug of slugs) {
  rmSync(TMP, { recursive: true, force: true }); mkdirSync(TMP, { recursive: true });
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: DSF, reducedMotion: "no-preference" });
  const pg = await ctx.newPage();
  await pg.goto(`${BASE}/${slug}`, { waitUntil: "networkidle", timeout: 45000 });
  try { await pg.evaluate(() => document.fonts && document.fonts.ready); } catch {}
  await pg.waitForTimeout(700);
  const max = await pg.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
  const scrollSec = Math.min(30, Math.max(16, max / 260));
  const topDwell = 1.4, botDwell = 1.3, total = topDwell + scrollSec + botDwell;
  const frames = Math.round(total * FPS);
  const easeInOut = (p) => p < 0.5 ? 2*p*p : 1 - Math.pow(-2*p+2, 2)/2;
  const t0 = Date.now();
  for (let i = 0; i <= frames; i++) {
    const tSec = i / FPS;
    let y;
    if (tSec < topDwell) y = 0;
    else if (tSec < topDwell + scrollSec) y = max * easeInOut((tSec - topDwell) / scrollSec);
    else y = max;
    await pg.evaluate(({ y, vt }) => {
      window.scrollTo(0, y);
      document.querySelectorAll("video").forEach(v => { try { v.pause(); if (v.duration) v.currentTime = vt % v.duration; } catch {} });
      return new Promise(r => requestAnimationFrame(r));
    }, { y, vt: tSec });
    await pg.screenshot({ path: resolve(TMP, `f${String(i).padStart(5,"0")}.jpg`), type: "jpeg", quality: 96 });
  }
  const capSec = ((Date.now() - t0)/1000).toFixed(0);
  const mp4 = resolve(OUT, `${slug}.mp4`);
  execFileSync("/opt/homebrew/bin/ffmpeg", ["-y","-framerate",String(FPS),"-i",resolve(TMP,"f%05d.jpg"),
    "-vf",`scale=${W}:${H}:flags=lanczos`,"-c:v","libx264","-crf","17","-preset","slow","-pix_fmt","yuv420p","-movflags","+faststart","-r",String(FPS),"-an",mp4], { stdio: "ignore" });
  console.log(`ok ${slug} frames=${frames} cap=${capSec}s -> ${mp4}`);
}
await browser.close();
