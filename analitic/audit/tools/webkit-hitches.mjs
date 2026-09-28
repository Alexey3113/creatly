// Рывки прокрутки в WebKit (движок Safari и всех браузеров iOS): BASE=… PASSES=3 [PAUSE=y PAUSEMS=800] [CSS=…] node webkit-hitches.mjs [path] [y1]
// Ровный проход scrollTo по кадрам 0→y1 (30 px/кадр, Retina DPR 2); печатает каждый кадр длиннее 28 мс и где он случился.
// Первый проход — ещё с загрузкой картинок, следующие — «тёплые» (рывок, который повторяется, — цена отрисовки, не сети).
import { webkit } from "/Users/leo/programming/creatly/node_modules/playwright/index.mjs";
const BASE = process.env.BASE || "http://localhost:3011";
const PASSES = +(process.env.PASSES || 3);
const [path = "", y1 = "14000"] = process.argv.slice(2);
const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
// CSS="…" — подмешать стили для эксперимента (например, держать слои плит Backdrop)
if (process.env.CSS) await ctx.addInitScript((css) => { addEventListener("DOMContentLoaded", () => { const s = document.createElement("style"); s.textContent = css; document.head.append(s); }); }, process.env.CSS);
const p = await ctx.newPage();
await p.goto(`${BASE}/${path}`, { waitUntil: "load", timeout: 180000 });
await p.waitForTimeout(3000);
for (let pass = 1; pass <= PASSES; pass++) {
  const r = await p.evaluate(([z, pause, pauseMs]) => new Promise((res) => {
    let y = 0, last = 0; const out = [];
    // PAUSE=y — постоять там PAUSEMS (0.8 с), как человек, дочитывающий сцену (пауза в замер не входит)
    const f = (t) => {
      if (last && t - last > 28) out.push([Math.round(t - last), y]); last = t; scrollTo(0, y); y += 30;
      if (y > z) return res(out);
      if (pause && y - 30 < pause && y >= pause) setTimeout(() => { last = 0; requestAnimationFrame(f); }, pauseMs); else requestAnimationFrame(f);
    };
    requestAnimationFrame(f);
  }), [+y1, +(process.env.PAUSE || 0), +(process.env.PAUSEMS || 800)]);
  const worst = r.reduce((m, [g]) => Math.max(m, g), 0);
  console.log(`/${path} проход ${pass}: рывков ${r.length}, худший ${worst} мс: ` + r.map(([g, y]) => `${g}мс@${y}`).join("  "));
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(1200);
}
await b.close();
