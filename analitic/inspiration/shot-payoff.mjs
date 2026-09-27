import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage({viewport:{width:1440,height:900}});
// cask rest (centering fix)
await pg.goto("http://127.0.0.1:3011/visual-hooks/cask",{waitUntil:"networkidle",timeout:30000});await pg.waitForTimeout(900);
await pg.screenshot({path:`${OUT}/fix-cask.jpg`,quality:74,type:"jpeg"});console.log("cask ok");
// swell portal: top, then scrolled ~55%
await pg.goto("http://127.0.0.1:3011/visual-hooks/swell",{waitUntil:"networkidle",timeout:30000});await pg.waitForTimeout(1000);
await pg.screenshot({path:`${OUT}/portal-0.jpg`,quality:74,type:"jpeg"});
await pg.evaluate(()=>window.scrollTo(0, window.innerHeight*0.7)); await pg.waitForTimeout(700);
await pg.screenshot({path:`${OUT}/portal-1.jpg`,quality:74,type:"jpeg"});console.log("portal ok");
await b.close();
