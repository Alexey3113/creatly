import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const slug=process.argv[2]||"vision";
const target=parseInt(process.argv[3]||"2",10);
const mob=process.argv[4]==="m";
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage(mob?{viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true}:{viewport:{width:1512,height:945}});
await pg.goto(`http://127.0.0.1:3011/story/${slug}`,{waitUntil:"networkidle",timeout:45000});
await pg.waitForTimeout(1000);
const advance=async()=>{
  if(mob){ // свайп вверх мышью → pointerdown/up (dy<0 => вперёд)
    await pg.mouse.move(195,650); await pg.mouse.down(); await pg.mouse.move(195,560,{steps:3}); await pg.mouse.move(195,360,{steps:6}); await pg.mouse.up();
  } else { await pg.mouse.move(760,470); await pg.mouse.wheel(0,150); }
  await pg.waitForTimeout(1300);
};
for(let i=0;i<target;i++){ await advance(); }
await pg.waitForTimeout(300);
await pg.screenshot({path:`${OUT}/${mob?'m-':''}deck-${slug}-${target}.jpg`,quality:82,type:"jpeg"});
const active=await pg.evaluate(()=>[...document.querySelectorAll('.deck-scene')].findIndex(e=>e.classList.contains('is-active')));
console.log(`${slug}: сцена ${active} (цель ${target})${mob?' моб':''}`);
await b.close();
