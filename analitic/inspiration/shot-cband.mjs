import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage({viewport:{width:1440,height:900}});
await pg.goto("http://127.0.0.1:3011/visual-hooks/cask",{waitUntil:"networkidle",timeout:30000});await pg.waitForTimeout(1000);
const H=await pg.evaluate(()=>document.body.scrollHeight);
// cinematicBand примерно во 2-м блоке; сканируем и ловим 3 полезных кадра
const shots=[["cband", 1.55],["bignum", 3.4],["dip", 4.2]];
for(const [name,vh] of shots){
  await pg.evaluate(y=>window.scrollTo(0,window.innerHeight*y),vh); await pg.waitForTimeout(650);
  await pg.screenshot({path:`${OUT}/nb-${name}.jpg`,quality:74,type:"jpeg"});console.log("shot",name);
}
await b.close();
