import { chromium } from "playwright";
const OUT = process.argv[2] || "/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const B = "http://localhost:3011";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 810 } });

await page.goto(`${B}/visual-hooks`, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
await page.screenshot({ path: `${OUT}/shot-gallery.jpg`, quality: 80, type: "jpeg" });

await page.goto(`${B}/visual-hooks/living-object`, { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
const doc = await page.evaluate(() => document.documentElement.scrollHeight);
for (const [name, frac] of [["00", 0], ["50", 0.5], ["95", 0.95]]) {
  await page.evaluate((y) => window.scrollTo(0, y), Math.round((doc - 810) * frac));
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT}/shot-scene-${name}.jpg`, quality: 82, type: "jpeg" });
}
await browser.close();
console.log("shots done");
