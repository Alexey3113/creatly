import { chromium } from "playwright";
const OUT = "/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const sites = [
  ["iron", "ProSite dark"], ["stem", "ProSite light"], ["phantom", "bespoke+gal"], ["wax", "cine-grid"], ["fetch", "ember cine"],
];
const b = await chromium.launch({ args: ["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"] });
const pg = await b.newPage({ viewport: { width: 1440, height: 900 } });
for (const [slug, tag] of sites) {
  try {
    await pg.goto(`http://127.0.0.1:3011/visual-hooks/${slug}`, { waitUntil: "networkidle", timeout: 30000 });
    await pg.waitForTimeout(1200);
    await pg.screenshot({ path: `${OUT}/prod-${slug}-hero.jpg`, quality: 70, type: "jpeg" });
    // scroll to a gallery
    await pg.evaluate(() => { const g = document.querySelector(".pb-gal,.vh-gal2"); if (g) g.scrollIntoView({ block: "center" }); });
    await pg.waitForTimeout(1000);
    await pg.screenshot({ path: `${OUT}/prod-${slug}-gal.jpg`, quality: 70, type: "jpeg" });
    console.log("ok", slug, tag);
  } catch (e) { console.log("fail", slug, String(e).slice(0, 60)); }
}
await b.close();
