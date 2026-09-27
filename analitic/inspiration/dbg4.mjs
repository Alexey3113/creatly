import { chromium } from "playwright";
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage({viewport:{width:1512,height:945}});
await pg.goto("http://127.0.0.1:3011/visual-hooks/forge",{waitUntil:"networkidle",timeout:45000});
await pg.waitForTimeout(1200);
// smoothly step-scroll to force scroll events, then read hero --sp at ~mid
for(const y of [200,400,600,800,1000,1200]){ await pg.evaluate(v=>window.scrollTo(0,v),y); await pg.waitForTimeout(120); }
await pg.waitForTimeout(400);
const r=await pg.evaluate(()=>{
  const hero=document.querySelector('.pos-hero');
  return {sy:window.scrollY, heroSp:getComputedStyle(hero).getPropertyValue('--sp'), heroTop:Math.round(hero.getBoundingClientRect().top), heroH:hero.offsetHeight};
});
console.log("stepscroll:",JSON.stringify(r));
// now dispatch a manual scroll event after direct set
await pg.evaluate(()=>{window.scrollTo(0,700);window.dispatchEvent(new Event('scroll'));});
await pg.waitForTimeout(500);
const r2=await pg.evaluate(()=>({sy:window.scrollY, heroSp:getComputedStyle(document.querySelector('.pos-hero')).getPropertyValue('--sp')}));
console.log("after manual dispatch:",JSON.stringify(r2));
await b.close();
