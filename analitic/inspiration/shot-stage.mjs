import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const slug=process.argv[2]||"portfolio";
const target=parseInt(process.argv[3]||"0",10);
const mob=process.argv[4]==="m";
const b=await chromium.launch();
const ctx=await b.newContext(mob?{viewport:{width:390,height:844},isMobile:true,hasTouch:true}:{viewport:{width:1512,height:945}});
const pg=await ctx.newPage();
await pg.goto(`http://127.0.0.1:3011/story2/${slug}`,{waitUntil:"networkidle"});
await pg.waitForTimeout(900);
await pg.locator(".stage").focus();
for(let i=0;i<target;i++){ await pg.keyboard.press("ArrowDown"); await pg.waitForTimeout(1500); }
await pg.waitForTimeout(500);
await pg.screenshot({path:`${OUT}/${mob?'m-':''}stage-${slug}-${target}.jpg`,quality:82,type:"jpeg"});
console.log(`${slug}: сцена→${target}${mob?' моб':''}`);
await b.close();
