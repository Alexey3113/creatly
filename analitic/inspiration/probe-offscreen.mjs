import { chromium } from "playwright";
const b = await chromium.launch({ headless:false, args:[
  "--window-position=-3400,-3400","--window-size=1940,1120",
  "--disable-backgrounding-occluded-windows","--disable-renderer-backgrounding",
  "--disable-background-timer-throttling","--disable-features=CalculateNativeWinOcclusion",
  "--autoplay-policy=no-user-gesture-required","--hide-scrollbars"
]});
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
const gl = await pg.evaluate(()=>{try{const c=document.createElement('canvas');const g=c.getContext('webgl');const e=g.getExtension('WEBGL_debug_renderer_info');return g.getParameter(e.UNMASKED_RENDERER_WEBGL);}catch(_){return 'n/a';}});
console.log(`OFFSCREEN: ${(N/sec).toFixed(1)} fps | GL: ${gl}`);
await b.close();
