// Multi-query harvest → merged pin pool for the "animated web sites" theme.
import { chromium } from "playwright";
import fs from "node:fs";
const QUERIES = [
  "animated web sites", "website animation interaction", "awwwards website design",
  "webgl website hero", "scroll animation website", "kinetic web design motion",
  "interactive landing page animation", "3d website hero cinematic",
];
const OUT = "analitic/pins/animated/pins.json";
const prev = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT)) : { pins: [] };
const map = new Map(prev.pins.map((p) => [p.id, p]));
const b = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const ctx = await b.newContext({
  userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
  viewport: { width: 1400, height: 1000 }, locale: "ru-RU",
});
const pg = await ctx.newPage();
for (const Q of QUERIES) {
  try {
    await pg.goto(`https://ru.pinterest.com/search/pins/?q=${encodeURIComponent(Q)}`, { waitUntil: "domcontentloaded", timeout: 40000 });
    await pg.waitForTimeout(3800);
    let before = map.size;
    for (let i = 0; i < 10; i++) {
      const batch = await pg.evaluate(() => {
        const out = [];
        document.querySelectorAll('a[href*="/pin/"]').forEach((a) => {
          const m = a.getAttribute("href").match(/\/pin\/(\d+)/);
          if (!m) return;
          const img = a.querySelector("img");
          out.push({ id: m[1], img: img ? img.src : null, alt: img ? (img.alt || "").slice(0, 140) : "" });
        });
        return out;
      });
      for (const p of batch) if (!map.has(p.id)) map.set(p.id, { ...p, q: Q });
      await pg.mouse.wheel(0, 3000);
      await pg.waitForTimeout(1200);
    }
    process.stderr.write(`[${Q}] +${map.size - before} (pool ${map.size})\n`);
  } catch (e) { process.stderr.write(`[${Q}] ERR ${String(e).slice(0, 80)}\n`); }
}
await b.close();
const pins = [...map.values()];
fs.writeFileSync(OUT, JSON.stringify({ theme: "animated web sites", count: pins.length, pins }, null, 2));
console.log(`pool = ${pins.length} pin ids`);
