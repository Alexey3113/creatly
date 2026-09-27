import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage({viewport:{width:1440,height:900}});
// iron/velo: catch color-wipe over bigNumber at ev~0.18 (panel covering); wax: grain motif
for(const [s,frac,tag] of [["iron",0.90,"wipe"],["velo",0.90,"wipe"],["wax",0.55,"grain"]]){
  await pg.goto(`http://127.0.0.1:3011/visual-hooks/${s}`,{waitUntil:"networkidle",timeout:30000});
  await pg.waitForTimeout(800);
  await pg.evaluate((f)=>{
    // find the color-wipe seam (bigNumber) — first .pb-seam[data-seam="color"]
    const el=document.querySelector('.pb-seam[data-seam="color"]')||document.querySelectorAll('.pb-seam')[1];
    if(!el)return; const t=el.getBoundingClientRect().top+window.scrollY;
    window.scrollTo(0, t - window.innerHeight*f);
  },frac);
  await pg.waitForTimeout(500);
  const ev=await pg.evaluate(()=>{const e=document.querySelector('.pb-seam[data-seam="color"]');return e?getComputedStyle(e).getPropertyValue('--ev'):'n/a';});
  await pg.screenshot({path:`${OUT}/wipe-${s}.jpg`,quality:76,type:"jpeg"});console.log("ok",s,tag,"ev:",ev.trim());
}
await b.close();
