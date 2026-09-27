import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage({viewport:{width:1440,height:900}});
for(const s of ["stem","clay"]){
  await pg.goto(`http://127.0.0.1:3011/visual-hooks/${s}`,{waitUntil:"networkidle",timeout:30000});
  await pg.waitForTimeout(800);
  await pg.evaluate(()=>{const e=[...document.querySelectorAll('.pb-seam')];const el=e[1]||e[0];if(!el)return;const t=el.getBoundingClientRect().top+window.scrollY;window.scrollTo(0,t-window.innerHeight*0.80);});
  await pg.waitForTimeout(650);
  await pg.screenshot({path:`${OUT}/seam-${s}.jpg`,quality:76,type:"jpeg"});console.log("ok",s);
}
await b.close();
