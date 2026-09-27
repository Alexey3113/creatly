import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const slug=process.argv[2];
const prog=parseFloat(process.argv[3]||"0.5");
const mob=process.argv[4]==="m";
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage(mob?{viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true}:{viewport:{width:1512,height:945}});
await pg.goto(`http://127.0.0.1:3011/story/${slug}`,{waitUntil:"networkidle",timeout:45000});
await pg.waitForTimeout(1200);
const n=await pg.evaluate(()=>document.querySelectorAll('.ps-scene').length);
for(let i=0;i<n;i++){
  const y=await pg.evaluate(({i,prog})=>{const el=document.querySelectorAll('.ps-scene')[i];const r=el.getBoundingClientRect();const top=r.top+window.scrollY;const range=el.offsetHeight-window.innerHeight;return top+range*prog;},{i,prog});
  await pg.evaluate((yy)=>window.scrollTo(0,yy),y);
  await pg.waitForTimeout(450);
  await pg.mouse.move(760,470);
  await pg.waitForTimeout(200);
  await pg.screenshot({path:`${OUT}/${mob?'m-':''}st-${slug}-scene${i}.jpg`,quality:82,type:"jpeg"});
}
console.log(`${slug}: ${n} scenes @${prog}${mob?' mobile':''}`);
await b.close();
