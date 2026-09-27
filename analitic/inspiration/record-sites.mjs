import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import { mkdirSync, renameSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const W = 1920, H = 1080;
const BASE = "http://127.0.0.1:3011/visual-hooks";
const RAW = "/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad/rec-raw";
const OUT = process.env.REC_OUT || "/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad/rec-mp4";
mkdirSync(RAW, { recursive: true }); mkdirSync(OUT, { recursive: true });

const slugs = process.argv.slice(2);
if (!slugs.length) { console.error("usage: record-sites.mjs <slug...>"); process.exit(1); }

const browser = await chromium.launch({ args: ["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist","--autoplay-policy=no-user-gesture-required"] });

for (const slug of slugs) {
  const ctx = await browser.newContext({
    viewport: { width: W, height: H }, deviceScaleFactor: 1,
    recordVideo: { dir: RAW, size: { width: W, height: H } },
    reducedMotion: "no-preference",
  });
  const pg = await ctx.newPage();
  await pg.goto(`${BASE}/${slug}`, { waitUntil: "networkidle", timeout: 45000 });
  try { await pg.evaluate(() => document.fonts && document.fonts.ready); } catch {}
  await pg.waitForTimeout(1600); // dwell on hero (autoplay video)
  // плавный eased-скролл сверху вниз, длительность пропорц. высоте (клип 18-32с)
  await pg.evaluate(async () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const dur = Math.min(32000, Math.max(18000, max / 260 * 1000));
    await new Promise((res) => {
      const t0 = performance.now();
      const step = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        const e = p < 0.5 ? 2*p*p : 1 - Math.pow(-2*p+2, 2)/2; // easeInOutQuad
        window.scrollTo(0, max * e);
        if (p < 1) requestAnimationFrame(step); else res();
      };
      requestAnimationFrame(step);
    });
  });
  await pg.waitForTimeout(1400); // dwell on footer/CTA
  const vpath = await pg.video().path();
  await ctx.close(); // flush video
  const mp4 = resolve(OUT, `${slug}.mp4`);
  execFileSync("/opt/homebrew/bin/ffmpeg", ["-y","-i",vpath,"-c:v","libx264","-crf","20","-preset","medium","-pix_fmt","yuv420p","-movflags","+faststart","-an",mp4], { stdio: "ignore" });
  console.log("ok", slug, "->", mp4);
}
await browser.close();
