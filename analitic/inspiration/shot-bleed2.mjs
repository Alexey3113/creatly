import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage({viewport:{width:1512,height:945}});
await pg.goto("http://127.0.0.1:3011/visual-hooks/forge",{waitUntil:"networkidle",timeout:45000});
await pg.waitForTimeout(1200);
await pg.screenshot({path:`${OUT}/b2-hero.jpg`,quality:85,type:"jpeg"});
await pg.mouse.move(756,472);
// scroll a given poster section to ~mid (--as≈1) using wheel until its --sp≈0.45
async function toScene(sel){
  for(let i=0;i<160;i++){
    const sp=await pg.evaluate((s)=>{const el=document.querySelector(s);if(!el)return -1;return parseFloat(getComputedStyle(el).getPropertyValue('--sp')||'0');},sel);
    if(sp>=0.42)break;
    await pg.mouse.wheel(0,220); await pg.waitForTimeout(45);
  }
  await pg.waitForTimeout(450);
}
await toScene('.pos-hands'); await pg.screenshot({path:`${OUT}/b2-hands.jpg`,quality:84,type:"jpeg"});
await toScene('.pos-relic'); await pg.screenshot({path:`${OUT}/b2-relic.jpg`,quality:84,type:"jpeg"});
console.log("done");
await b.close();
