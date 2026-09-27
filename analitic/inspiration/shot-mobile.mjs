import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const slug=process.argv[2];
const prog=parseFloat(process.argv[3]||"0.5");
const only=process.argv[4]!==undefined?parseInt(process.argv[4],10):null; // optional single scene index
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
await pg.goto(`http://127.0.0.1:3011/visual-hooks/${slug}`,{waitUntil:"networkidle",timeout:45000});
await pg.waitForTimeout(1200);
const n=await pg.evaluate(()=>document.querySelectorAll('.ps-scene').length);
for(let i=0;i<n;i++){
  if(only!==null && i!==only) continue;
  const y=await pg.evaluate(({i,prog})=>{
    const el=document.querySelectorAll('.ps-scene')[i];
    const r=el.getBoundingClientRect();
    const top=r.top+window.scrollY;
    const range=el.offsetHeight-window.innerHeight;
    return top+range*prog;
  },{i,prog});
  await pg.evaluate((yy)=>window.scrollTo(0,yy),y);
  await pg.waitForTimeout(500);
  await pg.screenshot({path:`${OUT}/m-${slug}-scene${i}.jpg`,quality:82,type:"jpeg"});
}
console.log(`${slug}: mobile 390px ${only!==null?`scene${only}`:`${n} scenes`} shot @${prog}`);
await b.close();
