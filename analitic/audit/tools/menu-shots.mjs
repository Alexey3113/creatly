// Снимки главного меню: node menu-shots.mjs <outDir>
import { chromium } from "/Users/leo/programming/creatly/node_modules/playwright/index.mjs";
const OUT = process.argv[2];
const B = "http://localhost:3011";
const b = await chromium.launch({ channel: "chrome" });
const errs = [];
async function page(vp, mob) {
  const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: 1, ...(mob ? { isMobile: true, hasTouch: true } : {}) });
  const p = await ctx.newPage();
  p.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
  p.on("console", (m) => { if (m.type() === "error") errs.push("console: " + m.text().slice(0, 160)); });
  return [ctx, p];
}
const D = { width: 1440, height: 900 }, M = { width: 390, height: 844 };
{ const [c, p] = await page(D);
  await p.goto(B + "/", { waitUntil: "load" }); await p.waitForTimeout(2500);
  await p.hover(".sm-tabs li:nth-child(1) .sm-tab"); await p.waitForTimeout(600);
  await p.hover(".sm-panel .sm-grid li:nth-child(5) a"); await p.waitForTimeout(500);
  await p.screenshot({ path: `${OUT}/d-landing-worlds.jpg`, type: "jpeg", quality: 75 });
  await p.hover(".sm-tabs li:nth-child(3) .sm-tab"); await p.waitForTimeout(700);
  await p.screenshot({ path: `${OUT}/d-landing-biz.jpg`, type: "jpeg", quality: 75 });
  await p.hover(".sm-tabs li:nth-child(6) .sm-tab"); await p.waitForTimeout(700);
  await p.screenshot({ path: `${OUT}/d-landing-lab.jpg`, type: "jpeg", quality: 75 });
  // клик по сайту из панели → переход
  await p.click(".sm-panel .sm-grid li:nth-child(1) a"); await p.waitForTimeout(3000);
  errs.push("nav-after-click: " + p.url());
  await c.close(); }
for (const u of ["/story2", "/visual-hooks/sites", "/animated/worlds", "/visual-hooks", "/animated", "/story", "/visual-hooks/animated"]) {
  const [c, p] = await page(D);
  await p.goto(B + u, { waitUntil: "load" }); await p.waitForTimeout(2200);
  await p.screenshot({ path: `${OUT}/d-gal${u.replace(/\//g, "_")}.jpg`, type: "jpeg", quality: 72 });
  const fab = await p.$(".sm-fab"); errs.push(`fab on ${u}: ${!!fab}`);
  await c.close(); }
{ const [c, p] = await page(D);
  await p.goto(B + "/animated/w-tidewell", { waitUntil: "load" }); await p.waitForTimeout(2500);
  await p.screenshot({ path: `${OUT}/d-site-fab.jpg`, type: "jpeg", quality: 72 });
  await p.click(".sm-fab"); await p.waitForTimeout(700);
  await p.screenshot({ path: `${OUT}/d-site-sheet.jpg`, type: "jpeg", quality: 72 });
  await c.close(); }
{ const [c, p] = await page(M, true);
  await p.goto(B + "/", { waitUntil: "load" }); await p.waitForTimeout(2500);
  await p.screenshot({ path: `${OUT}/m-landing.jpg`, type: "jpeg", quality: 75 });
  await p.click(".sm-inline .sm-burger"); await p.waitForTimeout(600);
  await p.screenshot({ path: `${OUT}/m-landing-sheet.jpg`, type: "jpeg", quality: 75 });
  await p.click(".sm-acc-f:nth-child(3) .sm-acc-b"); await p.waitForTimeout(700);
  await p.screenshot({ path: `${OUT}/m-landing-sheet-biz.jpg`, type: "jpeg", quality: 75 });
  await c.close(); }
{ const [c, p] = await page(M, true);
  await p.goto(B + "/visual-hooks/fetch", { waitUntil: "load" }); await p.waitForTimeout(2500);
  await p.screenshot({ path: `${OUT}/m-site-fab.jpg`, type: "jpeg", quality: 75 });
  await p.click(".sm-fab"); await p.waitForTimeout(600);
  await p.screenshot({ path: `${OUT}/m-site-sheet.jpg`, type: "jpeg", quality: 75 });
  await c.close(); }
await b.close();
console.log(errs.join("\n"));
