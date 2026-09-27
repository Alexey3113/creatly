import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const slug=process.argv[2];
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
// эмулируем prefers-reduced-motion: reduce
const ctx=await b.newContext({viewport:{width:1512,height:945},reducedMotion:"reduce"});
const pg=await ctx.newPage();
await pg.goto(`http://127.0.0.1:3011/visual-hooks/${slug}`,{waitUntil:"networkidle",timeout:45000});
await pg.waitForTimeout(1500);
// БЕЗ скролла — проверяем, что hero сразу в полном resting-state
await pg.screenshot({path:`${OUT}/${slug}-reduced.jpg`,quality:86,type:"jpeg"});
const sp=await pg.evaluate(()=>{const e=document.querySelector('.ps-scene');return e?getComputedStyle(e).getPropertyValue('--sp'):'?';});
console.log(`${slug} reduced shot, hero --sp=${sp.trim()}`); await b.close();
