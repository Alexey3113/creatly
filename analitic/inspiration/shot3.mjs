import { chromium } from "playwright";
const OUT = process.argv[2];
const B = "http://localhost:3011";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 810 } });

async function shot(slug, name, { mx, my, scrollFrac } = {}) {
  await page.goto(`${B}/visual-hooks/${slug}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1600);
  if (scrollFrac) {
    const doc = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.evaluate((y) => window.scrollTo(0, y), Math.round((doc - 810) * scrollFrac));
    await page.waitForTimeout(900);
  }
  if (mx != null) { await page.mouse.move(mx, my); await page.waitForTimeout(500); }
  await page.screenshot({ path: `${OUT}/${name}.jpg`, quality: 82, type: "jpeg" });
  console.log(name);
}

await shot("cloud-step", "sc-cloud", { mx: 1050, my: 360 });
await shot("strata", "sc-strata", { mx: 620, my: 430 });
await shot("reverie", "sc-reverie-0", {});
await shot("reverie", "sc-reverie-55", { scrollFrac: 0.55 });
await browser.close();
console.log("done");
