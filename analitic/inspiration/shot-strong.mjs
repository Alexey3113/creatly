import { chromium } from "playwright";
const OUT = process.argv[2];
const B = "http://localhost:3011";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 810 } });
async function shot(slug, name) {
  await page.goto(`${B}/visual-hooks/${slug}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `${OUT}/${name}.jpg`, quality: 84, type: "jpeg" });
  console.log(name);
}
await shot("macro-optics", "st-macro");
await shot("atelier-hand", "st-atelier");
await shot("aether", "st-aether");
await browser.close();
console.log("done");
