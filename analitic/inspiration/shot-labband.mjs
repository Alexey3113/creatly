import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage({viewport:{width:1512,height:945}});
await pg.goto("http://127.0.0.1:3011/visual-hooks",{waitUntil:"networkidle",timeout:45000});
await pg.waitForTimeout(1500); await pg.mouse.move(756,472);
// find & scroll the animated band into view
const y=await pg.evaluate(()=>{const els=[...document.querySelectorAll('.vh-sites-band-head h2')];const t=els.find(e=>/Animated/.test(e.textContent||''));if(!t)return -1;t.scrollIntoView({block:'center'});return Math.round(t.getBoundingClientRect().top);});
await pg.waitForTimeout(700);
await pg.screenshot({path:`${OUT}/labband.jpg`,quality:82,type:"jpeg"});
console.log("band-found-at", y);
await b.close();
