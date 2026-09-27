import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist","--autoplay-policy=no-user-gesture-required"]});
const pg=await b.newPage({viewport:{width:1512,height:945}});
await pg.goto("http://127.0.0.1:3011/visual-hooks/forge",{waitUntil:"networkidle",timeout:45000});
await pg.waitForTimeout(1000);
for(const [sp,tag] of [[0.12,"heat"],[0.38,"hammer"],[0.62,"quench"],[0.9,"hone"]]){
  const ok=await pg.evaluate((sp)=>{
    const el=document.querySelector('.frg-proc'); if(!el) return "no .frg-proc";
    const top=el.getBoundingClientRect().top+window.scrollY;
    const travel=el.offsetHeight - window.innerHeight;
    window.scrollTo(0, Math.round(top + sp*travel));
    return getComputedStyle(el).getPropertyValue('--sp');
  },sp);
  await pg.waitForTimeout(600);
  await pg.screenshot({path:`${OUT}/fproc-${tag}.jpg`,quality:82,type:"jpeg"});
  console.log(tag,"--sp:",ok.trim());
}
await b.close();
