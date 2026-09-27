import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const slug=process.argv[2];
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage({viewport:{width:1512,height:945}});
await pg.goto(`http://127.0.0.1:3011/visual-hooks/${slug}`,{waitUntil:"networkidle",timeout:45000});
await pg.waitForTimeout(1200);
// jump past the 300vh sticky hero into the sections
const vh=945;
const total=await pg.evaluate(()=>document.body.scrollHeight);
const start=vh*3+40; // sections begin after 300vh hero
const shots=Math.min(5,Math.ceil((total-start)/vh));
for(let i=0;i<shots;i++){
  const y=start+i*vh;
  await pg.evaluate((yy)=>window.scrollTo(0,yy),y);
  await pg.waitForTimeout(400);
  await pg.screenshot({path:`${OUT}/${slug}-sec${i}.jpg`,quality:80,type:"jpeg"});
}
console.log(`${slug}: total=${total} shots=${shots}`);
await b.close();
