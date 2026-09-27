// Harvest pin permalink IDs from the "animated web sites" Pinterest search.
// Collects /pin/<id>/ hrefs + poster img; we later probe each with yt-dlp and keep video pins.
import { chromium } from "playwright";
import fs from "node:fs";
const Q = process.argv[2] || "animated web sites";
const TARGET = parseInt(process.argv[3] || "80", 10);
const OUT = "analitic/pins/animated/pins.json";
const b = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const ctx = await b.newContext({
  userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
  viewport: { width: 1400, height: 1000 }, locale: "ru-RU",
});
const pg = await ctx.newPage();
const url = `https://ru.pinterest.com/search/pins/?q=${encodeURIComponent(Q)}`;
await pg.goto(url, { waitUntil: "domcontentloaded", timeout: 40000 });
await pg.waitForTimeout(4000);
const map = new Map();
for (let i = 0; i < 30 && map.size < TARGET; i++) {
  const batch = await pg.evaluate(() => {
    const out = [];
    document.querySelectorAll('a[href*="/pin/"]').forEach((a) => {
      const m = a.getAttribute("href").match(/\/pin\/(\d+)/);
      if (!m) return;
      const img = a.querySelector("img");
      const hasVideoHint = !!a.querySelector('[class*="video"], [aria-label*="video" i], svg[aria-label*="play" i]');
      out.push({ id: m[1], img: img ? img.src : null, alt: img ? (img.alt || "").slice(0, 140) : "", vhint: hasVideoHint });
    });
    return out;
  });
  for (const p of batch) if (!map.has(p.id)) map.set(p.id, p);
  await pg.mouse.wheel(0, 3000);
  await pg.waitForTimeout(1300);
  process.stderr.write(`scroll ${i}: ${map.size} pins\n`);
}
await b.close();
const pins = [...map.values()];
fs.writeFileSync(OUT, JSON.stringify({ query: Q, count: pins.length, pins }, null, 2));
console.log(`harvested ${pins.length} pin ids -> ${OUT}  (vhint: ${pins.filter(p=>p.vhint).length})`);
