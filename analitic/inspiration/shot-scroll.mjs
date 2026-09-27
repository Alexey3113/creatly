import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const path=process.argv[2]||"animated/manifesto";
const shots=(process.argv[3]||"0,0.3,0.6,0.9").split(",").map(Number);
const b=await chromium.launch();
const pg=await (await b.newContext({viewport:{width:1512,height:945}})).newPage();
const errs=[];
pg.on("pageerror",e=>errs.push(String(e).slice(0,140)));
await pg.goto(`http://127.0.0.1:3011/${path}`,{waitUntil:"networkidle"});
await pg.waitForTimeout(700);
const tag=path.replace(/\//g,"-");
for(const f of shots){
  await pg.evaluate((frac)=>{ const m=document.documentElement.scrollHeight-window.innerHeight; window.scrollTo(0,m*frac); }, f);
  await pg.waitForTimeout(650);
  await pg.screenshot({path:`${OUT}/${tag}-${f}.jpg`,quality:82,type:"jpeg"});
}
console.log("shots",shots.join(","),"| errs:",errs.length?errs.join(" || "):"none");
await b.close();
