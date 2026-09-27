import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist","--autoplay-policy=no-user-gesture-required"]});
const pg=await b.newPage({viewport:{width:1512,height:945}});
await pg.goto("http://127.0.0.1:3011/visual-hooks/forge",{waitUntil:"networkidle",timeout:45000});
await pg.waitForTimeout(1000);
const H=await pg.evaluate(()=>document.documentElement.scrollHeight-window.innerHeight);
const marks=[0,0.16,0.34,0.52,0.72,0.9];
for(let i=0;i<marks.length;i++){
  await pg.evaluate((y)=>window.scrollTo(0,y),Math.round(H*marks[i]));
  await pg.waitForTimeout(650);
  await pg.screenshot({path:`${OUT}/forge-${i}.jpg`,quality:80,type:"jpeg"});
}
console.log("forge shots done, scrollH:",H);
await b.close();
