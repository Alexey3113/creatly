// Аудит-съёмка: node cap.mjs jobs.json  (OUT, CONC, FORCE через env)
// scroll-режим: равномерная раскадровка всей страницы; deck-режим: сцена в покое + кадр посреди перехода.
import { chromium } from "/Users/leo/programming/creatly/node_modules/playwright/index.mjs";
import fs from "node:fs";
import path from "node:path";

const OUT = process.env.OUT || new URL("../frames", import.meta.url).pathname;
const CONC = +(process.env.CONC || 3);
const VW = 1440, VH = 900;
const jobs = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const only = process.argv.slice(3);
const queue = jobs.filter((j) => !only.length || only.includes(j.id) || only.includes(j.fam));

const browser = await chromium.launch({
  channel: "chrome",
  args: ["--autoplay-policy=no-user-gesture-required", "--hide-scrollbars"],
});

const STATS = () => {
  const all = Array.from(document.querySelectorAll("body *"));
  let sticky = 0, fixed = 0;
  for (const el of all) {
    const p = getComputedStyle(el).position;
    if (p === "sticky") sticky++;
    else if (p === "fixed") fixed++;
  }
  const imgs = Array.from(document.images);
  const broken = imgs.filter((i) => i.complete && i.naturalWidth === 0 && i.currentSrc).map((i) => i.currentSrc.replace(location.origin, ""));
  const fonts = Array.from(new Set(Array.from(document.fonts).filter((f) => f.status === "loaded").map((f) => f.family.replace(/"/g, ""))));
  const failedFonts = Array.from(new Set(Array.from(document.fonts).filter((f) => f.status === "error").map((f) => f.family.replace(/"/g, ""))));
  return {
    title: document.title,
    screens: +(document.documentElement.scrollHeight / innerHeight).toFixed(1),
    sections: document.querySelectorAll("section").length,
    videos: document.querySelectorAll("video").length,
    canvases: document.querySelectorAll("canvas").length,
    imgs: imgs.length,
    sticky, fixed, broken: broken.slice(0, 12), brokenCount: broken.length, fonts, failedFonts,
  };
};

async function runJob(job) {
  const dir = path.join(OUT, job.fam, job.id);
  if (fs.existsSync(path.join(dir, "meta.json")) && !process.env.FORCE) return "skip";
  fs.mkdirSync(dir, { recursive: true });
  const ctx = await browser.newContext({ viewport: { width: VW, height: VH }, deviceScaleFactor: 1 });
  await ctx.addInitScript(() => {
    const st = document.createElement("style");
    st.textContent = "nextjs-portal{display:none!important}";
    document.addEventListener("DOMContentLoaded", () => document.head.appendChild(st));
  });
  const pg = await ctx.newPage();
  const errs = [], failed = [];
  pg.on("pageerror", (e) => errs.push(String(e).slice(0, 220)));
  pg.on("console", (m) => { if (m.type() === "error") errs.push("console: " + m.text().slice(0, 200)); });
  pg.on("response", (r) => { if (r.status() >= 400) failed.push(r.status() + " " + r.url().replace("http://localhost:3011", "").slice(0, 160)); });
  const t0 = Date.now();
  try {
    await pg.goto(`http://localhost:3011/${job.url}`, { waitUntil: "load", timeout: 240000 });
  } catch (e) {
    errs.push("goto: " + String(e).slice(0, 200));
  }
  await pg.waitForTimeout(2200);
  const frames = [];
  const shot = async (label, extra = {}) => {
    const f = `f${String(frames.length).padStart(2, "0")}.jpg`;
    await pg.screenshot({ path: path.join(dir, f), type: "jpeg", quality: 72 });
    frames.push({ f, label, ...extra });
  };

  if (job.mode === "deck") {
    const sel = job.deckSel;
    const n = await pg.evaluate((s) => document.querySelectorAll(s).length, job.sceneSel);
    try { await pg.locator(sel).first().focus(); } catch {}
    for (let i = 0; i < n; i++) {
      await shot(`S${i + 1}`);
      if (i < n - 1) {
        await pg.keyboard.press("ArrowDown");
        await pg.waitForTimeout(110); // StageDeck v2: доводка lerp 0.13/кадр → ~110 мс ≈ середина перехода
        await shot(`S${i + 1}→${i + 2} mid`);
        await pg.waitForTimeout(1300);
      }
    }
    // что под деком (если есть)
    const more = await pg.evaluate(() => document.documentElement.scrollHeight - innerHeight);
    if (more > 50) {
      for (const fr of [0.5, 1]) {
        await pg.evaluate((fr) => { window.scrollTo({ top: (document.documentElement.scrollHeight - innerHeight) * fr, behavior: "instant" }); window.dispatchEvent(new Event("scroll")); }, fr);
        await pg.waitForTimeout(900);
        await shot(`below ${fr}`);
      }
    }
  } else {
    const max0 = await pg.evaluate(() => document.documentElement.scrollHeight - innerHeight);
    const N = Math.max(8, Math.min(32, Math.round(max0 / (0.55 * VH)) + 1));
    for (let k = 0; k < N; k++) {
      const y = await pg.evaluate(([k, N]) => {
        const m = document.documentElement.scrollHeight - innerHeight;
        const y = Math.round((k * m) / (N - 1));
        window.scrollTo({ top: y, behavior: "instant" });
        window.dispatchEvent(new Event("scroll"));
        return y;
      }, [k, N]);
      await pg.waitForTimeout(k === 0 ? 400 : 850);
      await shot(`${(y / VH).toFixed(1)}vh`, { y });
    }
  }
  let stats = {};
  try { stats = await pg.evaluate(STATS); } catch (e) { errs.push("stats: " + String(e).slice(0, 120)); }
  const meta = { ...job, ms: Date.now() - t0, frames, stats, errs: Array.from(new Set(errs)).slice(0, 20), failed: Array.from(new Set(failed)).slice(0, 20) };
  fs.writeFileSync(path.join(dir, "meta.json"), JSON.stringify(meta, null, 1));
  await ctx.close();
  return `${frames.length}f ${((Date.now() - t0) / 1000).toFixed(0)}s err:${meta.errs.length} 4xx:${meta.failed.length}`;
}

let idx = 0;
async function worker(w) {
  while (idx < queue.length) {
    const job = queue[idx++];
    try {
      const r = await runJob(job);
      console.log(`[w${w}] ${job.fam}/${job.id}: ${r}`);
    } catch (e) {
      console.log(`[w${w}] ${job.fam}/${job.id}: FAIL ${String(e).slice(0, 200)}`);
    }
  }
}
await Promise.all(Array.from({ length: CONC }, (_, i) => worker(i)));
await browser.close();
console.log("DONE", queue.length);
