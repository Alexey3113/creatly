import { chromium } from "playwright";
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage({viewport:{width:1512,height:945}});
await pg.goto("http://127.0.0.1:3011/visual-hooks/forge",{waitUntil:"networkidle",timeout:45000});
await pg.waitForTimeout(1000);
await pg.mouse.move(756,472);
// real wheel scroll in steps
for(let i=0;i<7;i++){ await pg.mouse.wheel(0,130); await pg.waitForTimeout(90); }
await pg.waitForTimeout(400);
const r=await pg.evaluate(()=>({sy:window.scrollY, heroSp:getComputedStyle(document.querySelector('.pos-hero')).getPropertyValue('--sp')}));
console.log("wheel:",JSON.stringify(r));
await pg.screenshot({path:"/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad/poster-wheel.jpg",quality:82,type:"jpeg"});
await b.close();
