// Профиль прокрутки: BASE=http://host:port DPR=2 CPU=1 node scroll-profile.mjs [path] [секунд]
// Крутит колесо (Lenis) и пишет трассировку Chrome. Считает по конвейеру кадров Chrome (PipelineReporter):
// показанные / пропущенные кадры; занятость потоков (главный, композитор, растеризация, GPU, декодирование);
// принудительные пересчёты стиля/раскладки из JS; «длинные кадры» (LoAF) с источником скрипта.
// DPR=2 — как Retina; CPU=4 — замедление процессора в 4 раза (ноутбук послабее).
import { chromium } from "/Users/leo/programming/creatly/node_modules/playwright/index.mjs";

const BASE = process.env.BASE || "http://localhost:3011";
const DPR = +(process.env.DPR || 2);
const CPU = +(process.env.CPU || 1);
const path = process.argv[2] ?? "";
const secs = +(process.argv[3] || 12);
const b = await chromium.launch({ channel: "chrome", headless: process.env.HEADED !== "1" });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: DPR });
const p = await ctx.newPage();
await p.goto(`${BASE}/${path}`, { waitUntil: "load", timeout: 120000 });
await p.waitForTimeout(3000);
await p.mouse.move(700, 450);
const cdp = await ctx.newCDPSession(p);
if (CPU > 1) await cdp.send("Emulation.setCPUThrottlingRate", { rate: CPU });

const events = [];
cdp.on("Tracing.dataCollected", (e) => { for (const x of e.value) events.push(x); });
const done = new Promise((r) => cdp.once("Tracing.tracingComplete", r));
await cdp.send("Tracing.start", { categories: "devtools.timeline,disabled-by-default-devtools.timeline,disabled-by-default-devtools.timeline.frame,benchmark,cc,viz,gpu", transferMode: "ReportEvents" });
await p.evaluate(() => {
  window.__f = []; let last = performance.now();
  const tick = (t) => { window.__f.push(t - last); last = t; window.__raf = requestAnimationFrame(tick); };
  window.__raf = requestAnimationFrame(tick);
  window.__loaf = [];
  try { new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__loaf.push({ d: e.duration, s: (e.scripts || []).map((s) => `${(s.sourceURL || "").split("/").pop()}:${s.sourceFunctionName || ""} ${Math.round(s.duration)}`).slice(0, 2) }))).observe({ type: "long-animation-frame" }); } catch {}
});
// слои композитора в середине прокрутки: сколько, какой площади (Мпикс с учётом DPR), сколько «полноэкранных»
let layers = null;
await cdp.send("LayerTree.enable");
cdp.on("LayerTree.layerTreeDidChange", (e) => { if (e.layers) layers = e.layers; });
const t0 = Date.now();
let snapped = false, snap = null;
while (Date.now() - t0 < secs * 1000) {
  await p.mouse.wheel(0, 90); await p.waitForTimeout(16);
  if (!snapped && Date.now() - t0 > secs * 500 && layers) { snapped = true; snap = layers.filter((l) => l.drawsContent); }
}
await p.waitForTimeout(600);
const r = await p.evaluate(() => { cancelAnimationFrame(window.__raf); return { f: window.__f.slice(2), loaf: window.__loaf, y: scrollY, h: document.documentElement.scrollHeight }; });
await cdp.send("Tracing.end"); await done;
await b.close();

// имена потоков
const tname = {};
for (const e of events) if (e.name === "thread_name") tname[`${e.pid}:${e.tid}`] = e.args?.name || "";
// кадры по PipelineReporter
const states = {};
for (const e of events) if (e.name === "PipelineReporter" && e.ph === "b") { const s = e.args?.chrome_frame_reporter?.state || e.args?.data?.state || "?"; states[s] = (states[s] || 0) + 1; }
const presented = Object.entries(states).filter(([k]) => /PRESENTED/.test(k)).reduce((s, [, n]) => s + n, 0);
const dropped = states.STATE_DROPPED || 0;
// занятость потоков (верхнеуровневые X-события, без вложенных)
const busy = {};
const byThread = {};
for (const e of events) if (e.ph === "X" && e.dur) (byThread[`${e.pid}:${e.tid}`] ||= []).push(e);
for (const [k, xs] of Object.entries(byThread)) {
  xs.sort((a, b) => a.ts - b.ts); let end = -1, sum = 0;
  for (const e of xs) { if (e.ts >= end) { sum += e.dur; end = e.ts + e.dur; } else if (e.ts + e.dur > end) { sum += e.ts + e.dur - end; end = e.ts + e.dur; } }
  const n = (tname[k] || "?").replace(/\d+$/, "");
  busy[n] = (busy[n] || 0) + sum / 1000;
}
// главный поток: разбивка и принудительные пересчёты
const mainKey = Object.keys(tname).find((k) => tname[k] === "CrRendererMain" && byThread[k]?.length > 50);
const mx = (byThread[mainKey] || []).slice().sort((a, b) => a.ts - b.ts);
const agg = {}; let forced = 0, forcedMs = 0; const stack = [];
for (const e of mx) {
  (agg[e.name] ||= { n: 0, ms: 0 }); agg[e.name].n++; agg[e.name].ms += e.dur / 1000;
  while (stack.length && stack[stack.length - 1].ts + stack[stack.length - 1].dur <= e.ts) stack.pop();
  if ((e.name === "Layout" || e.name === "UpdateLayoutTree") && stack.some((s) => s.name === "FunctionCall" || s.name === "FireAnimationFrame")) { forced++; forcedMs += e.dur / 1000; }
  stack.push(e);
}
const decode = Object.entries(agg).filter(([k]) => /Decode/i.test(k)).reduce((s, [, v]) => s + v.ms, 0);
const wanted = presented + dropped;
const ff = r.f.slice().sort((a, b) => a - b), q = (x) => ff[Math.min(ff.length - 1, Math.floor(ff.length * x))] || 0;
console.log(`/${path}  rAF: ${ff.length} кадров за ${secs} с ≈ ${(ff.length / secs).toFixed(0)} fps, медиана ${q(0.5).toFixed(1)} мс, p95 ${q(0.95).toFixed(1)} мс, >50 мс: ${ff.filter((x) => x > 50).length}`);
if (snap) {
  const area = snap.reduce((s, l) => s + l.width * l.height, 0) * DPR * DPR / 1e6;
  const full = snap.filter((l) => l.width * l.height >= 1440 * 900 * 0.8).length;
  console.log(`  слои (рисуют содержимое): ${snap.length}, площадь ${area.toFixed(0)} Мпикс (≈${(area * 4).toFixed(0)} МБ текстур), полноэкранных и больше: ${full}`);
}
console.log(`/${path}  DPR ${DPR}  CPU×${CPU}: кадров показано ${presented}, пропущено ${dropped} (${wanted ? Math.round((100 * dropped) / wanted) : 0}%), ≈${(presented / secs).toFixed(0)} fps; длинных кадров (LoAF>50мс) ${r.loaf.length}; прокручено ${Math.round(r.y)}/${r.h}`);
console.log(`  занятость потоков, мс: ` + Object.entries(busy).filter(([, v]) => v > 20).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([k, v]) => `${k} ${v.toFixed(0)}`).join(" · "));
const show = ["FireAnimationFrame", "FunctionCall", "UpdateLayoutTree", "Layout", "PrePaint", "Paint", "Layerize", "Commit", "HitTest"];
console.log(`  главный поток: ` + show.filter((k) => agg[k]).map((k) => `${k} ${agg[k].ms.toFixed(0)}`).join(" · ") + (decode ? ` · Decode ${decode.toFixed(0)}` : ""));
console.log(`  принудительных пересчётов стиля/раскладки из JS: ${forced} (${forcedMs.toFixed(0)} мс), на кадр ≈ ${(forced / Math.max(1, presented)).toFixed(1)}`);
const top = r.loaf.sort((a, b) => b.d - a.d).slice(0, 4);
for (const l of top) console.log(`  LoAF ${Math.round(l.d)} мс: ${l.s.join(" | ")}`);
