import { chromium } from "playwright";
import fs from "node:fs";

const queries = [
  { key: "3d-product-hero", q: "3d product hero website dark cinematic" },
  { key: "cursor-reveal", q: "hover reveal interaction landing page ui" },
  { key: "editorial-fashion-hero", q: "editorial fashion website hero big typography" },
  { key: "glass-portal-ui", q: "glassmorphism portal card ui landscape" },
  { key: "kinetic-typography", q: "kinetic typography poster brutalist motion" },
  { key: "organic-3d", q: "organic 3d render moss glass abstract hero" },
  { key: "product-theatre", q: "luxury product photography watch dark studio light" },
  { key: "material-reveal", q: "product cutaway cross section reveal render" },
];

const out = {};
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
  viewport: { width: 1400, height: 1000 },
  locale: "en-US",
});
const page = await ctx.newPage();

for (const { key, q } of queries) {
  try {
    const url = `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(q)}`;
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(3500);
    for (let i = 0; i < 4; i++) {
      await page.mouse.wheel(0, 2600);
      await page.waitForTimeout(1400);
    }
    const pins = await page.evaluate(() => {
      const seen = new Set();
      const res = [];
      document.querySelectorAll("img").forEach((img) => {
        const src = img.src || "";
        if (!src.includes("pinimg.com")) return;
        const orig = src.replace(/\/\d+x\d*\//, "/736x/").replace(/\/\d+x\//, "/736x/");
        if (seen.has(orig)) return;
        seen.add(orig);
        res.push({ img: orig, alt: (img.alt || "").trim().slice(0, 160) });
      });
      return res.slice(0, 30);
    });
    out[key] = { query: q, count: pins.length, pins };
    console.error(`[${key}] ${pins.length} pins`);
  } catch (e) {
    out[key] = { query: q, error: String(e).slice(0, 200) };
    console.error(`[${key}] ERROR ${String(e).slice(0, 120)}`);
  }
}

await browser.close();
fs.writeFileSync(process.argv[2] || "pins.json", JSON.stringify(out, null, 2));
console.error("done");
