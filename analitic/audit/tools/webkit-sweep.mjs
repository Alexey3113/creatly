// Обход сайтов в WebKit (Safari/iOS): BASE=… [CSS=…] node webkit-sweep.mjs path1 path2 … — по одному ровному проходу
// сверху вниз (30 px/кадр, DPR 2) после загрузки; печатает долю «тяжёлых» кадров (> 50 мс) и худшие места.
// Ищет катастрофы вида «каждый кадр 150 мс» (фильтры/размытие, которые WebKit пересчитывает на CPU при движении).
import { webkit } from "/Users/leo/programming/creatly/node_modules/playwright/index.mjs";
const BASE = process.env.BASE || "http://localhost:3011";
const Y1 = +(process.env.Y1 || 16000);
const b = await webkit.launch();
for (const path of process.argv.slice(2)) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  // CSS="…" — подмешать стили (проверка гипотез: какое свойство даёт тяжёлые кадры)
  if (process.env.CSS) await ctx.addInitScript((css) => { addEventListener("DOMContentLoaded", () => { const s = document.createElement("style"); s.textContent = css; document.head.append(s); }); }, process.env.CSS);
  const p = await ctx.newPage();
  try {
    await p.goto(`${BASE}/${path}`, { waitUntil: "load", timeout: 120000 });
    await p.waitForTimeout(2500);
    const r = await p.evaluate((cap) => new Promise((res) => {
      const z = Math.min(cap, document.documentElement.scrollHeight - innerHeight);
      let y = 0, last = 0; const g = [];
      const f = (t) => { if (last) g.push([t - last, y]); last = t; scrollTo(0, y); y += 30; if (y <= z) requestAnimationFrame(f); else res({ g, z }); };
      requestAnimationFrame(f);
    }), Y1);
    const heavy = r.g.filter(([d]) => d > 50);
    const worst = r.g.slice().sort((a, b) => b[0] - a[0]).slice(0, 4).map(([d, y]) => `${Math.round(d)}@${y}`).join(" ");
    const share = (100 * heavy.length) / Math.max(1, r.g.length);
    console.log(`${share >= 5 ? "!!" : share >= 1 ? "! " : "  "} ${path.padEnd(28)} кадров ${String(r.g.length).padStart(4)} · >50 мс: ${String(heavy.length).padStart(3)} (${share.toFixed(1)}%) · худшие ${worst}`);
  } catch (e) { console.log(`?? ${path}: ${e.message.split("\n")[0]}`); }
  await ctx.close();
}
await b.close();
