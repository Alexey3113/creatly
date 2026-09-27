import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage({viewport:{width:1440,height:900}});
for(const s of ["iron","velo"]){
  await pg.goto(`http://127.0.0.1:3011/visual-hooks/${s}`,{waitUntil:"networkidle",timeout:30000});
  await pg.waitForTimeout(800);
  // scroll a seam block so its top sits ~78% down the viewport (mid-emergence → scrim visible)
  const ok = await pg.evaluate(()=>{
    const seams=[...document.querySelectorAll('.pb-seam')];
    const el=seams[1]||seams[0]; if(!el) return false;
    const top=el.getBoundingClientRect().top+window.scrollY;
    window.scrollTo(0, top - window.innerHeight*0.80);
    return true;
  });
  await pg.waitForTimeout(650);
  const ev = await pg.evaluate(()=>{const e=[...document.querySelectorAll('.pb-seam')][1]||document.querySelector('.pb-seam');return e?getComputedStyle(e).getPropertyValue('--ev'):'n/a';});
  await pg.screenshot({path:`${OUT}/seam-${s}.jpg`,quality:76,type:"jpeg"});
  console.log("ok",s,"seams:",ok,"--ev:",ev.trim());
}
await b.close();
