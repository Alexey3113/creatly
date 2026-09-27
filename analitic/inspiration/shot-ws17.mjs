import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage({viewport:{width:1512,height:945}});
await pg.goto("http://127.0.0.1:3011/visual-hooks/womensuit",{waitUntil:"networkidle",timeout:45000});
await pg.waitForTimeout(1200); await pg.mouse.move(756,472);
for(let i=0;i<16;i++){await pg.mouse.wheel(0,300);await pg.waitForTimeout(45);}
await pg.waitForTimeout(400); await pg.screenshot({path:`${OUT}/ws17a.jpg`,quality:80,type:"jpeg"});
for(let i=0;i<2;i++){await pg.mouse.wheel(0,300);await pg.waitForTimeout(45);}
await pg.waitForTimeout(400); await pg.screenshot({path:`${OUT}/ws17b.jpg`,quality:80,type:"jpeg"});
console.log("done"); await b.close();
