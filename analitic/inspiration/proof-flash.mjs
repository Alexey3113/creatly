import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:1512,height:945}});
const pg=await ctx.newPage();
await pg.goto("http://127.0.0.1:3011/story2/nocturne",{waitUntil:"networkidle"});
await pg.waitForTimeout(900);
// A: курсор на лицо (центр, чуть выше середины)
await pg.mouse.move(756,430); await pg.waitForTimeout(700);
await pg.screenshot({path:`${OUT}/flash-face.jpg`,quality:82,type:"jpeg"});
// B: курсор в правый-верхний угол — луч уезжает, лицо тонет во мраке
await pg.mouse.move(1300,140); await pg.waitForTimeout(800);
await pg.screenshot({path:`${OUT}/flash-corner.jpg`,quality:82,type:"jpeg"});
const px=await pg.evaluate(()=>getComputedStyle(document.querySelector(".stage")).getPropertyValue("--px").trim());
console.log("flash proof done, --px@corner:",px);
await b.close();
