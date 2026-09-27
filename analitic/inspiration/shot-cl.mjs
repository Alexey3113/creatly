import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage({viewport:{width:1512,height:945}});
await pg.goto("http://127.0.0.1:3011/visual-hooks/clothing",{waitUntil:"networkidle",timeout:45000});
await pg.waitForTimeout(1400);
await pg.screenshot({path:`${OUT}/cl-0.jpg`,quality:85,type:"jpeg"});
await pg.mouse.move(756,472);
async function toSp(t){for(let i=0;i<170;i++){const sp=await pg.evaluate(()=>parseFloat(getComputedStyle(document.querySelector('.cl-hero')).getPropertyValue('--sp')||'0'));if(sp>=t)break;await pg.mouse.wheel(0,200);await pg.waitForTimeout(40);}await pg.waitForTimeout(400);}
await toSp(0.32); await pg.screenshot({path:`${OUT}/cl-1.jpg`,quality:85,type:"jpeg"});
await toSp(0.6); await pg.screenshot({path:`${OUT}/cl-2.jpg`,quality:85,type:"jpeg"});
console.log("done sp:",await pg.evaluate(()=>getComputedStyle(document.querySelector('.cl-hero')).getPropertyValue('--sp')));
await b.close();
