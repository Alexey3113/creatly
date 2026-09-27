import { chromium } from "playwright";
const OUT = process.argv[2];
const B = "http://localhost:3011";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 810 } });
async function shot(slug, name, mx, my) {
  await page.goto(`${B}/visual-hooks/${slug}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1600);
  if (mx != null) { await page.mouse.move(mx, my); await page.waitForTimeout(500); }
  await page.screenshot({ path: `${OUT}/${name}.jpg`, quality: 82, type: "jpeg" });
  console.log(name);
}
await shot("macro-optics", "sc-macro", 900, 300);
await shot("liquid-word", "sc-liquid", 720, 400);
await shot("orbit-data", "sc-orbit", 720, 400);
await shot("atelier-hand", "sc-atelier", 720, 400);
await shot("fold-horizon", "sc-fold", 720, 400);
await browser.close();
console.log("done");
