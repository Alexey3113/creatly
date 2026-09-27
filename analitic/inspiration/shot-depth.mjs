import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage({viewport:{width:1440,height:900}});
for(const [s,x,y] of [["cask",300,750],["fetch",1150,700]]){
  await pg.goto(`http://127.0.0.1:3011/visual-hooks/${s}`,{waitUntil:"networkidle",timeout:30000});
  await pg.waitForTimeout(1400); // дать WebGL прогрузить текстуры
  await pg.mouse.move(x,y,{steps:14}); await pg.waitForTimeout(800);
  await pg.screenshot({path:`${OUT}/depth-${s}.jpg`,quality:74,type:"jpeg"});console.log("ok",s);
}
await b.close();
