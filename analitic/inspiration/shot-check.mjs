import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage({viewport:{width:1512,height:945}});
await pg.goto("http://127.0.0.1:3011/visual-hooks/forge",{waitUntil:"networkidle",timeout:45000});
await pg.waitForTimeout(1000); await pg.mouse.move(756,472);
async function toY(t){for(let i=0;i<80;i++){const y=await pg.evaluate(()=>window.scrollY);if(y>=t-40)break;await pg.mouse.wheel(0,Math.min(240,t-y+30));await pg.waitForTimeout(45);}await pg.waitForTimeout(450);}
for(const [y,tag] of [[820,"hero"],[2450,"hands"],[7730,"relic"]]){ await toY(y); await pg.screenshot({path:`${OUT}/chk-${tag}.jpg`,quality:84,type:"jpeg"}); console.log(tag,"@",await pg.evaluate(()=>window.scrollY)); }
await b.close();
