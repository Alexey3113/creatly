// node _shot.mjs out.jpg url1 url2 ... — первые экраны на телефоне в ряд
import { chromium } from "/Users/leo/programming/creatly/node_modules/playwright/index.mjs";
import sharp from "/Users/leo/programming/creatly/node_modules/sharp/lib/index.js";
const [out, ...urls] = process.argv.slice(2);
const b = await chromium.launch({ channel: "chrome" });
const bufs = [];
for (const u of urls) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3011/" + u, { waitUntil: "load" });
  await p.waitForTimeout(2600);
  bufs.push(await sharp(await p.screenshot({ type: "png" })).resize(300).toBuffer());
  await ctx.close();
}
await b.close();
await sharp({ create: { width: bufs.length * 306, height: 650, channels: 3, background: "#222" } }).composite(bufs.map((x, i) => ({ input: x, left: i * 306, top: 0 }))).jpeg({ quality: 80 }).toFile(out);
