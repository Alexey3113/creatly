import { chromium } from "playwright";
const OUT = process.argv[2];
const B = "http://localhost:3011";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 810 } });
async function shot(slug, name) {
  await page.goto(`${B}/visual-hooks/${slug}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2800);
  await page.screenshot({ path: `${OUT}/${name}.jpg`, quality: 82, type: "jpeg" });
  console.log(name);
}
await shot("macro-optics", "a2-macro");
await shot("atelier-hand", "a2-atelier");
await shot("aether", "a2-aether");
await shot("fold-horizon", "a2-fold");
await shot("cloud-step", "a2-cloud");
await browser.close();
console.log("done");
