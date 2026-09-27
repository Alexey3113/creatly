import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const slug=process.argv[2];
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage({viewport:{width:1512,height:945}});
await pg.goto(`http://127.0.0.1:3011/visual-hooks/${slug}`,{waitUntil:"networkidle",timeout:45000});
await pg.waitForTimeout(1300); await pg.mouse.move(760,470);
let sp=0;for(let i=0;i<170;i++){sp=await pg.evaluate(()=>{const e=document.querySelector('.ps-scene');return e?parseFloat(getComputedStyle(e).getPropertyValue('--sp')||'0'):1;});if(sp>=0.6)break;await pg.mouse.wheel(0,220);await pg.waitForTimeout(32);}
await pg.waitForTimeout(600); await pg.screenshot({path:`${OUT}/${slug}-hero.jpg`,quality:86,type:"jpeg"});
console.log(`${slug} done sp=`+sp.toFixed(2)); await b.close();
