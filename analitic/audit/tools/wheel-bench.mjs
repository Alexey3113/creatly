// Реальный ввод: колесо/трекпад через CDP (как у пользователя, через Lenis), сразу после загрузки (картинки ещё в пути).
// BASE=… DPR=2 CPU=1 DELAY=500 node wheel-bench.mjs [path] [секунд] [дельта px]
// Меряет: интервалы кадров (рывки), неравномерность шага прокрутки по кадрам, «хвост» инерции после отпускания.
import { chromium } from "/Users/leo/programming/creatly/node_modules/playwright/index.mjs";
const BASE = process.env.BASE || "http://localhost:3011";
const DPR = +(process.env.DPR || 2), CPU = +(process.env.CPU || 1), DELAY = +(process.env.DELAY || 500);
const [path = "", secs = "6", dy = "24"] = process.argv.slice(2);
const b = await chromium.launch({ channel: "chrome" });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: DPR });
const p = await ctx.newPage();
const cdp = await ctx.newCDPSession(p);
if (CPU > 1) await cdp.send("Emulation.setCPUThrottlingRate", { rate: CPU });
const t0 = Date.now();
await p.goto(`${BASE}/${path}`, { waitUntil: "domcontentloaded", timeout: 120000 });
await p.waitForTimeout(DELAY);
await p.evaluate(() => {
  window.__r = []; let last = 0;
  const f = (t) => { window.__r.push([t, scrollY, last ? t - last : 0]); last = t; requestAnimationFrame(f); };
  requestAnimationFrame(f);
});
const start = Date.now();
while (Date.now() - start < +secs * 1000) {
  await cdp.send("Input.dispatchMouseEvent", { type: "mouseWheel", x: 700, y: 450, deltaX: 0, deltaY: +dy });
  await new Promise((r) => setTimeout(r, 16));
}
const release = await p.evaluate(() => performance.now());
await p.waitForTimeout(2500);
const r = await p.evaluate(() => window.__r);
await b.close();
const during = r.filter(([t]) => t <= release), after = r.filter(([t]) => t > release);
const gaps = during.map((x) => x[2]).filter((g) => g > 0);
const med = gaps.slice().sort((a, b) => a - b)[Math.floor(gaps.length / 2)] || 16.7;
const hitches = gaps.filter((g) => g > med * 1.6);
// неравномерность: шаг прокрутки за кадр при постоянном вводе (коэф. вариации во второй половине)
const steps = during.slice(Math.floor(during.length / 2)).map((x, i, a) => (i ? x[1] - a[i - 1][1] : null)).filter((x) => x != null);
const mean = steps.reduce((s, x) => s + x, 0) / Math.max(1, steps.length);
const sd = Math.sqrt(steps.reduce((s, x) => s + (x - mean) ** 2, 0) / Math.max(1, steps.length));
// хвост: сколько страница ещё едет после последнего события колеса (до сдвига < 0.5 px/кадр)
let tail = 0; for (let i = 1; i < after.length; i++) if (Math.abs(after[i][1] - after[i - 1][1]) >= 0.5) tail = after[i][0] - release;
console.log(`/${path} DPR ${DPR} CPU×${CPU}, старт через ${DELAY} мс после DOMContentLoaded: кадров ${during.length}, шаг ${med.toFixed(1)} мс, рывков ${hitches.length}${hitches.length ? " (" + hitches.map((g) => Math.round(g)).sort((a, b) => b - a).slice(0, 8).join(", ") + " мс)" : ""}`);
console.log(`  прокрутка за кадр при ровном вводе: ${mean.toFixed(1)} px ± ${sd.toFixed(1)} (неравномерность ${mean ? Math.round((100 * sd) / mean) : 0}%) · после отпускания страница едет ещё ${Math.round(tail)} мс · загружено за ${((Date.now() - t0) / 1000).toFixed(0)} с`);
