import { chromium } from "playwright";
async function probe(label, launchOpts){
  let b;
  try { b = await chromium.launch(launchOpts); }
  catch(e){ console.log(`${label}: LAUNCH_FAIL ${e.message}`); return; }
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
  // report GPU renderer
  const gl = await pg.evaluate(()=>{try{const c=document.createElement('canvas');const g=c.getContext('webgl');const e=g.getExtension('WEBGL_debug_renderer_info');return g.getParameter(e.UNMASKED_RENDERER_WEBGL);}catch(_){return 'n/a';}});
  console.log(`${label}: ${(N/sec).toFixed(1)} fps | GL: ${gl}`);
  await b.close();
}
await probe("HEADLESS_plain", { headless:true, args:["--autoplay-policy=no-user-gesture-required"] });
await probe("HEADLESS_newflag", { headless:true, args:["--headless=new","--autoplay-policy=no-user-gesture-required"] });
