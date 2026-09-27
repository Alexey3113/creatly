import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage({viewport:{width:1440,height:900}});
for(const [s,fn] of [["loaf","cband"],["plat","dip"]]){
  await pg.goto(`http://127.0.0.1:3011/visual-hooks/${s}`,{waitUntil:"networkidle",timeout:30000});await pg.waitForTimeout(900);
  if(fn==="cband"){ await pg.evaluate(()=>{document.querySelector('.pb-cband').scrollIntoView();window.scrollBy(0,window.innerHeight*0.5);}); }
  else { await pg.evaluate(()=>document.querySelector('.pb-dip')?.scrollIntoView({block:'center'})); }
  await pg.waitForTimeout(700);
  await pg.screenshot({path:`${OUT}/roll2-${s}.jpg`,quality:74,type:"jpeg"});console.log("ok",s);
}
await b.close();
