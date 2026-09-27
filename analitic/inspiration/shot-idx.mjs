import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage({viewport:{width:1512,height:945}});
await pg.goto("http://127.0.0.1:3011/visual-hooks/animated",{waitUntil:"networkidle",timeout:45000});
await pg.waitForTimeout(1500);
await pg.screenshot({path:`${OUT}/idx-top.jpg`,quality:82,type:"jpeg"});
for(let i=0;i<8;i++){await pg.mouse.wheel(0,300);await pg.waitForTimeout(40);}
await pg.waitForTimeout(500); await pg.screenshot({path:`${OUT}/idx-grid.jpg`,quality:82,type:"jpeg"});
console.log("done"); await b.close();
