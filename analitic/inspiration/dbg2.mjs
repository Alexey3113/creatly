import { chromium } from "playwright";
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage({viewport:{width:1512,height:945}});
await pg.goto("http://127.0.0.1:3011/visual-hooks/forge",{waitUntil:"networkidle",timeout:45000});
await pg.waitForTimeout(1000);
const before=await pg.evaluate(()=>({sy:window.scrollY, docH:document.documentElement.scrollHeight, winH:window.innerHeight, reduced:matchMedia("(prefers-reduced-motion: reduce)").matches}));
await pg.evaluate(()=>window.scrollTo(0, 900));
await pg.waitForTimeout(800);
const after=await pg.evaluate(()=>{
  const hero=document.querySelector('.pos-hero'), proc=document.querySelector('.frg-proc');
  return {sy:window.scrollY,
    heroSp:hero?getComputedStyle(hero).getPropertyValue('--sp'):'none',
    procSp:proc?getComputedStyle(proc).getPropertyValue('--sp'):'none',
    heroTop:hero?Math.round(hero.getBoundingClientRect().top):'n/a'};
});
console.log("before",JSON.stringify(before));
console.log("after ",JSON.stringify(after));
await b.close();
