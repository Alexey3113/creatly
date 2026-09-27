import { chromium } from "playwright";
const OUT = process.argv[2];
const B = "http://localhost:3011";
const slugs = ["living-object","cloud-step","strata","reverie","vanguard","aether","botanica","neon-forge","macro-optics","liquid-word","orbit-data","atelier-hand","fold-horizon"];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 810 } });
let i = 1;
for (const slug of slugs) {
  await page.goto(`${B}/visual-hooks/${slug}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1400);
  await page.mouse.move(760, 380);
  await page.waitForTimeout(400);
  const n = String(i).padStart(2, "0");
  await page.screenshot({ path: `${OUT}/all-${n}.jpg`, quality: 80, type: "jpeg" });
  console.log(n, slug);
  i++;
}
await browser.close();
console.log("done");
