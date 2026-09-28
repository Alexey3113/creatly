// Слои композитора страницы: BASE=… DPR=2 node layers.mjs [path] [scrollY…] — топ слоёв по площади, класс элемента,
// причина выделения в слой (will-change, transform, opacity-анимация…) и суммарная видеопамять на каждой отметке.
import { chromium } from "/Users/leo/programming/creatly/node_modules/playwright/index.mjs";
const BASE = process.env.BASE || "http://localhost:3011";
const DPR = +(process.env.DPR || 2);
const [path = "", ...ys] = process.argv.slice(2);
const b = await chromium.launch({ channel: "chrome" });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: DPR });
const p = await ctx.newPage();
await p.goto(`${BASE}/${path}`, { waitUntil: "load", timeout: 120000 });
await p.waitForTimeout(2500);
const cdp = await ctx.newCDPSession(p);
await cdp.send("DOM.getDocument", { depth: 0 });
let layers = [];
cdp.on("LayerTree.layerTreeDidChange", (e) => { if (e.layers) layers = e.layers; });
await cdp.send("LayerTree.enable");
for (const y of (ys.length ? ys : ["0"]).map(Number)) {
  await p.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
  await p.waitForTimeout(1500);
  const draw = layers.filter((l) => l.drawsContent);
  const area = draw.reduce((s, l) => s + l.width * l.height, 0) * DPR * DPR / 1e6;
  console.log(`\n== scrollY ${y}: слоёв ${draw.length}, ${area.toFixed(0)} Мпикс ≈ ${(area * 4).toFixed(0)} МБ`);
  const top = draw.sort((a, b) => b.width * b.height - a.width * a.height).slice(0, 14);
  for (const l of top) {
    let who = "?", why = "";
    try {
      if (l.backendNodeId) { const d = await cdp.send("DOM.describeNode", { backendNodeId: l.backendNodeId }); const n = d.node; who = `${n.localName}${n.attributes ? "." + ((n.attributes[n.attributes.indexOf("class") + 1] || "").split(" ").slice(0, 3).join(".")) : ""}`; }
      const c = await cdp.send("LayerTree.compositingReasons", { layerId: l.layerId }); why = (c.compositingReasonIds || c.compositingReasons || []).slice(0, 3).join(",");
    } catch {}
    console.log(`  ${String(Math.round(l.width)).padStart(5)}×${String(Math.round(l.height)).padEnd(5)} ${(l.width * l.height * DPR * DPR * 4 / 1e6).toFixed(0).padStart(4)} МБ  ${who.slice(0, 60).padEnd(60)} ${why}`);
  }
}
await b.close();
