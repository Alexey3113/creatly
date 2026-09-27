import { chromium } from "playwright";
let b;
try {
  b = await chromium.launch({ headless: false, args:["--autoplay-policy=no-user-gesture-required"] });
} catch(e){ console.log("HEADED_LAUNCH_FAILED:", e.message); process.exit(2); }
const ctx = await b.newContext({ viewport:{width:1920,height:1080}, deviceScaleFactor:1.5 });
const pg = await ctx.newPage();
await pg.goto("http://127.0.0.1:3011/visual-hooks/iron",{waitUntil:"networkidle",timeout:45000});
await pg.waitForTimeout(600);
const N=40, t0=Date.now();
for(let i=0;i<N;i++){
  await pg.evaluate((y)=>{window.scrollTo(0,y);return new Promise(r=>requestAnimationFrame(r));}, i*40);
  await pg.screenshot({type:"jpeg",quality:90});
}
const sec=(Date.now()-t0)/1000;
console.log(`HEADED_OK: ${N} frames in ${sec.toFixed(1)}s = ${(N/sec).toFixed(1)} fps`);
await b.close();
