import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage({viewport:{width:1440,height:900}});
for(const s of ["botanic","clay","plat","fetch","fern","hide"]){try{await pg.goto(`http://127.0.0.1:3011/visual-hooks/${s}`,{waitUntil:"networkidle",timeout:30000});await pg.waitForTimeout(1400);await pg.screenshot({path:`${OUT}/b1-${s}.jpg`,quality:70,type:"jpeg"});console.log("ok",s);}catch(e){console.log("fail",s,String(e).slice(0,50));}}
await b.close();
