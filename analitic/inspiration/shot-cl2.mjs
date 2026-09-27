import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage({viewport:{width:1512,height:945}});
await pg.goto("http://127.0.0.1:3011/visual-hooks/clothing",{waitUntil:"networkidle",timeout:45000});
await pg.waitForTimeout(1200); await pg.mouse.move(756,472);
async function sceneSp(sel,t){for(let i=0;i<300;i++){const sp=await pg.evaluate((s)=>{const el=document.querySelector(s);if(!el)return 2;return parseFloat(getComputedStyle(el).getPropertyValue('--sp')||'0');},sel);if(sp>=t)break;await pg.mouse.wheel(0,240);await pg.waitForTimeout(35);}await pg.waitForTimeout(450);}
async function toEl(sel){for(let i=0;i<300;i++){const top=await pg.evaluate((s)=>{const el=document.querySelector(s);if(!el)return 1e9;return el.getBoundingClientRect().top;},sel);if(top<300)break;await pg.mouse.wheel(0,240);await pg.waitForTimeout(35);}await pg.waitForTimeout(400);}
await sceneSp('.cl-collection',0.5); await pg.screenshot({path:`${OUT}/cl-coll.jpg`,quality:84,type:"jpeg"});
await sceneSp('.cl-lookbook',0.5); await pg.screenshot({path:`${OUT}/cl-look.jpg`,quality:84,type:"jpeg"});
await toEl('.cl-about'); await pg.screenshot({path:`${OUT}/cl-about.jpg`,quality:84,type:"jpeg"});
await toEl('.cl-cta'); await pg.screenshot({path:`${OUT}/cl-cta.jpg`,quality:84,type:"jpeg"});
console.log("done");
await b.close();
