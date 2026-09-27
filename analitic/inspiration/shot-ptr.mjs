import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage({viewport:{width:1440,height:900}});
for(const [s,x,y] of [["wax",430,320],["cask",1050,300],["swell",1000,300]]){
  await pg.goto(`http://127.0.0.1:3011/visual-hooks/${s}`,{waitUntil:"networkidle",timeout:30000});
  await pg.waitForTimeout(900);
  await pg.mouse.move(x,y,{steps:12}); await pg.waitForTimeout(700);
  await pg.screenshot({path:`${OUT}/ptr-${s}.jpg`,quality:74,type:"jpeg"}); console.log("ok",s);
}
await b.close();
