import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage({viewport:{width:1512,height:945}});
await pg.goto("http://127.0.0.1:3011/visual-hooks/forge",{waitUntil:"networkidle",timeout:45000});
await pg.waitForTimeout(900);
// hero poster: assembled state (scroll a bit so --as ~1)
for(const [sel,frac,tag] of [[".pos-hero",0.5,"hero"],[".pos-relic",0.4,"relic"]]){
  const ok=await pg.evaluate(({sel,frac})=>{const el=document.querySelector(sel);if(!el)return "no "+sel;const top=el.getBoundingClientRect().top+window.scrollY;const tr=el.offsetHeight-window.innerHeight;window.scrollTo(0,Math.round(top+frac*tr));return "ok";},{sel,frac});
  await pg.waitForTimeout(700);
  await pg.screenshot({path:`${OUT}/poster-${tag}.jpg`,quality:82,type:"jpeg"});console.log(tag,ok);
}
await b.close();
