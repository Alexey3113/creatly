// Детерминированный замер прокрутки: BASE=… DPR=2 CPU=4 node scroll-bench.mjs [path] [y0] [y1] [шаг px/кадр]
// Каждый кадр страница прокручивается на одинаковый шаг по одному и тому же пути (без инерции колеса) —
// итоги сравнимы между версиями. Печатает время главного потока на кадр по категориям, работу GPU-процесса
// и композитора, число принудительных пересчётов стиля/раскладки и чьи функции их вызвали.
import { chromium } from "/Users/leo/programming/creatly/node_modules/playwright/index.mjs";

const BASE = process.env.BASE || "http://localhost:3011";
const DPR = +(process.env.DPR || 2), CPU = +(process.env.CPU || 1);
const [path = "", y0s = "0", y1s = "9000", steps = "30"] = process.argv.slice(2);
const Y0 = +y0s, Y1 = +y1s, STEP = +steps;
const b = await chromium.launch({ channel: "chrome" });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: DPR });
const p = await ctx.newPage();
await p.goto(`${BASE}/${path}`, { waitUntil: "load", timeout: 120000 });
await p.waitForTimeout(3000);
// прогрев: один проход по пути (загрузка картинок и декодирование не должны попасть в замер)
await p.evaluate(async ([a, z]) => { for (let y = a; y <= z; y += 300) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } scrollTo(0, a); }, [Y0, Y1]);
await p.waitForTimeout(2500);
const cdp = await ctx.newCDPSession(p);
if (CPU > 1) await cdp.send("Emulation.setCPUThrottlingRate", { rate: CPU });
const events = [];
cdp.on("Tracing.dataCollected", (e) => { for (const x of e.value) events.push(x); });
const done = new Promise((r) => cdp.once("Tracing.tracingComplete", r));
await cdp.send("Tracing.start", { categories: "devtools.timeline,disabled-by-default-devtools.timeline,disabled-by-default-devtools.timeline.stack", transferMode: "ReportEvents" });
const frames = await p.evaluate(([a, z, s]) => new Promise((res) => {
  let y = a, n = 0;
  const f = () => { scrollTo(0, y); n++; y += s; if (y <= z) requestAnimationFrame(f); else setTimeout(() => res(n), 400); };
  requestAnimationFrame(f);
}), [Y0, Y1, STEP]);
await cdp.send("Tracing.end"); await done;
await b.close();

const tname = {};
for (const e of events) if (e.name === "thread_name") tname[`${e.pid}:${e.tid}`] = e.args?.name || "";
const byThread = {};
for (const e of events) if (e.ph === "X" && e.dur) (byThread[`${e.pid}:${e.tid}`] ||= []).push(e);
const busy = {};
for (const [k, xs] of Object.entries(byThread)) {
  xs.sort((a, b) => a.ts - b.ts); let end = -1, sum = 0;
  for (const e of xs) { if (e.ts >= end) { sum += e.dur; end = e.ts + e.dur; } else if (e.ts + e.dur > end) { sum += e.ts + e.dur - end; end = e.ts + e.dur; } }
  const n = (tname[k] || "?").replace(/\d+$/, "");
  busy[n] = (busy[n] || 0) + sum / 1000;
}
const mainKey = Object.keys(tname).find((k) => tname[k] === "CrRendererMain" && byThread[k]?.length > 50);
const mx = (byThread[mainKey] || []).slice().sort((a, b) => a.ts - b.ts);
const agg = {}; let forced = 0, forcedMs = 0; const stack = []; const who = {};
for (const e of mx) {
  (agg[e.name] ||= 0); agg[e.name] += e.dur / 1000;
  while (stack.length && stack[stack.length - 1].ts + stack[stack.length - 1].dur <= e.ts) stack.pop();
  if ((e.name === "Layout" || e.name === "UpdateLayoutTree") && stack.some((s) => s.name === "FunctionCall" || s.name === "FireAnimationFrame")) {
    forced++; forcedMs += e.dur / 1000;
    const st = e.args?.beginData?.stackTrace || e.args?.data?.stackTrace || [];
    const top = st[0] ? `${(st[0].url || "").split("/").pop().split("?")[0]}:${st[0].functionName || "(anon)"}` : "?";
    who[top] = (who[top] || 0) + 1;
  }
  stack.push(e);
}
const per = (ms) => (ms / frames).toFixed(2);
console.log(`/${path} ${Y0}→${Y1} шаг ${STEP}px  DPR ${DPR} CPU×${CPU}: кадров ${frames}`);
console.log(`  главный поток на кадр, мс: всего ${per(busy.CrRendererMain || 0)} · скрипты ${per((agg.FireAnimationFrame || 0))} · стиль ${per(agg.UpdateLayoutTree || 0)} · раскладка ${per(agg.Layout || 0)} · отрисовка ${per((agg.Paint || 0) + (agg.PrePaint || 0))} · слои ${per((agg.Layerize || 0) + (agg.Commit || 0))}`);
console.log(`  GPU-процесс на кадр ${per(busy.CrGpuMain || 0)} мс · композитор ${per(busy.Compositor || 0)} мс · растр ${per((busy.CompositorTileWorker || 0))} мс`);
console.log(`  принудительных пересчётов: ${forced} (${(forced / frames).toFixed(1)} на кадр, ${per(forcedMs)} мс/кадр); источники: ` + Object.entries(who).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([k, v]) => `${k} ${v}`).join(" · "));
