import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage({viewport:{width:1512,height:945}});
await pg.goto("http://127.0.0.1:3011/visual-hooks/forge",{waitUntil:"networkidle",timeout:45000});
await pg.waitForTimeout(1000);
await pg.mouse.move(756,472);
for(let i=0;i<7;i++){ await pg.mouse.wheel(0,120); await pg.waitForTimeout(90); }
await pg.waitForTimeout(400);
await pg.screenshot({path:`${OUT}/hero2.jpg`,quality:84,type:"jpeg"});
const sp=await pg.evaluate(()=>getComputedStyle(document.querySelector('.pos-hero')).getPropertyValue('--sp'));
console.log("hero2 done, --sp:",sp.trim());
await b.close();
