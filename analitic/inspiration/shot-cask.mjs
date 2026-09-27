import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage({viewport:{width:1440,height:900}});
await pg.goto("http://127.0.0.1:3011/visual-hooks/cask",{waitUntil:"networkidle",timeout:30000}); await pg.waitForTimeout(1400);
await pg.screenshot({path:`${OUT}/arch-cask2.jpg`,quality:72,type:"jpeg"}); console.log("ok");
await b.close();
