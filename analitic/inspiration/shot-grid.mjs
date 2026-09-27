import { chromium } from "playwright";
const OUT = process.argv[2];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 810 } });
await page.goto("http://localhost:3011/visual-hooks", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
// scroll into the experiments grid
await page.evaluate(() => document.querySelector("#experiments")?.scrollIntoView());
await page.waitForTimeout(1500);
await page.screenshot({ path: `${OUT}/shot-grid.jpg`, quality: 82, type: "jpeg" });
await browser.close();
console.log("grid shot done");
