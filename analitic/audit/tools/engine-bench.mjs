// Сравнение движков: BASE=… ENGINE=webkit|chromium HEADED=1 DPR=2 node engine-bench.mjs [path] [y1]
// 1) ровный проход scrollTo по кадрам 0→y1 (30 px/кадр); 2) колесо (Lenis) 5 с. Интервалы кадров → рывки.
import { webkit, chromium } from "/Users/leo/programming/creatly/node_modules/playwright/index.mjs";
const BASE = process.env.BASE || "http://localhost:3011";
const ENGINE = process.env.ENGINE || "webkit", DPR = +(process.env.DPR || 2);
const [path = "", y1 = "14000"] = process.argv.slice(2);
const bt = ENGINE === "webkit" ? webkit : chromium;
const b = await bt.launch({ headless: process.env.HEADED !== "1", ...(ENGINE === "chromium" ? { channel: "chrome" } : {}) });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: DPR });
const p = await ctx.newPage();
await p.goto(`${BASE}/${path}`, { waitUntil: "load", timeout: 180000 });
await p.waitForTimeout(3000);
const stat = (gaps) => {
  const s = gaps.slice().sort((a, b) => a - b), med = s[Math.floor(s.length / 2)] || 16.7;
  const h = gaps.filter((g) => g > med * 1.6);
  return `кадров ${gaps.length}, шаг ${med.toFixed(1)} мс, p95 ${s[Math.floor(s.length * 0.95)].toFixed(1)} мс, рывков ${h.length}${h.length ? " (" + h.map((g) => Math.round(g)).sort((a, b) => b - a).slice(0, 6).join(", ") + ")" : ""}`;
};
// 1) ровный проход
const g1 = await p.evaluate((z) => new Promise((res) => {
  let y = 0, last = 0; const gaps = [];
  const f = (t) => { if (last) gaps.push(t - last); last = t; scrollTo(0, y); y += 30; if (y <= z) requestAnimationFrame(f); else res(gaps); };
  requestAnimationFrame(f);
}), +y1);
console.log(`${ENGINE} /${path} DPR ${DPR} · ровный проход: ${stat(g1)}`);
// 2) колесо
await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(1500);
await p.mouse.move(700, 450);
await p.evaluate(() => { window.__g = []; let last = 0; const f = (t) => { if (last) window.__g.push(t - last); last = t; window.__raf = requestAnimationFrame(f); }; window.__raf = requestAnimationFrame(f); });
const t0 = Date.now();
while (Date.now() - t0 < 5000) { await p.mouse.wheel(0, 60); await p.waitForTimeout(16); }
await p.waitForTimeout(1000);
const g2 = await p.evaluate(() => { cancelAnimationFrame(window.__raf); return window.__g; });
console.log(`${ENGINE} /${path} DPR ${DPR} · колесо: ${stat(g2)} · прокручено до ${await p.evaluate(() => Math.round(scrollY))}`);
await b.close();
