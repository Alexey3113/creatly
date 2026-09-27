import { chromium } from "playwright";
const OUT = process.argv[2];
const B = "http://localhost:3011";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 810 } });
async function shot(slug, name, scrollFrac) {
  await page.goto(`${B}/visual-hooks/${slug}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2600);
  if (scrollFrac) { const doc = await page.evaluate(() => document.documentElement.scrollHeight); await page.evaluate((y) => window.scrollTo(0, y), Math.round((doc - 810) * scrollFrac)); await page.waitForTimeout(1400); }
  await page.screenshot({ path: `${OUT}/${name}.jpg`, quality: 84, type: "jpeg" });
  console.log(name);
}
await shot("reverie", "an-reverie", 0.5);
await shot("vanguard", "an-vanguard");
await shot("liquid-word", "an-liquid");
await browser.close();
console.log("done");
