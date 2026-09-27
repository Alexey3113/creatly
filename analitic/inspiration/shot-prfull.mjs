import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage({viewport:{width:1512,height:945}});
await pg.goto("http://127.0.0.1:3011/visual-hooks/porsche",{waitUntil:"networkidle",timeout:45000});
await pg.waitForTimeout(1200); await pg.mouse.move(756,472);
const shots=[14,19];
for(let s=0;s<=19;s++){
  if(shots.includes(s)){await pg.waitForTimeout(350);await pg.screenshot({path:`${OUT}/prf-${s}.jpg`,quality:80,type:"jpeg"});}
  await pg.mouse.wheel(0,300);await pg.waitForTimeout(45);
}
console.log("done"); await b.close();
