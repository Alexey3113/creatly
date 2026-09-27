import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage({viewport:{width:1512,height:945}});
await pg.goto("http://127.0.0.1:3011/visual-hooks/rockband",{waitUntil:"networkidle",timeout:45000});
await pg.waitForTimeout(1400); await pg.mouse.move(756,472);
async function toSp(t){for(let i=0;i<180;i++){const sp=await pg.evaluate(()=>parseFloat(getComputedStyle(document.querySelector('.rb-hero')).getPropertyValue('--sp')||'0'));if(sp>=t)break;await pg.mouse.wheel(0,200);await pg.waitForTimeout(38);}await pg.waitForTimeout(450);}
await toSp(0.55); await pg.screenshot({path:`${OUT}/rb-1.jpg`,quality:85,type:"jpeg"});
console.log("done");
await b.close();
