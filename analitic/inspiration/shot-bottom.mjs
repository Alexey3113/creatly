import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const slug=process.argv[2];
const frac=parseFloat(process.argv[3]||"0.965"); // доля общей высоты документа
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage({viewport:{width:1512,height:945}});
await pg.goto(`http://127.0.0.1:3011/visual-hooks/${slug}`,{waitUntil:"networkidle",timeout:45000});
await pg.waitForTimeout(1200); await pg.mouse.move(760,470);
// докручиваем колесом до нужной доли высоты (wheel, чтобы триггерить scroll-события)
for(let i=0;i<600;i++){const done=await pg.evaluate((f)=>{const y=window.scrollY,max=document.body.scrollHeight-window.innerHeight;window.__p=y/max;return y/max>=f;},frac);if(done)break;await pg.mouse.wheel(0,320);await pg.waitForTimeout(24);}
await pg.waitForTimeout(700); await pg.screenshot({path:`${OUT}/${slug}-bottom.jpg`,quality:86,type:"jpeg"});
const p=await pg.evaluate(()=>window.__p); console.log(`${slug} bottom p=`+p.toFixed(3)); await b.close();
