import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage({viewport:{width:1512,height:945}});
await pg.goto("http://127.0.0.1:3011/visual-hooks/forge",{waitUntil:"networkidle",timeout:45000});
await pg.waitForTimeout(1000);
await pg.mouse.move(756,472);
async function toY(target){
  for(let i=0;i<80;i++){ const y=await pg.evaluate(()=>window.scrollY); if(Math.abs(y-target)<80||y>=target)break; await pg.mouse.wheel(0,Math.min(240,target-y+30)); await pg.waitForTimeout(45); }
  await pg.waitForTimeout(450);
}
const marks=[[700,"01hero"],[2450,"02hands"],[4300,"03proc-heat"],[5600,"04proc-quench"],[7700,"05relic"],[9300,"06quote"],[10600,"07cta"]];
for(const [y,tag] of marks){ await toY(y); await pg.screenshot({path:`${OUT}/full-${tag}.jpg`,quality:82,type:"jpeg"}); const sy=await pg.evaluate(()=>window.scrollY); console.log(tag,"@",sy); }
await b.close();
