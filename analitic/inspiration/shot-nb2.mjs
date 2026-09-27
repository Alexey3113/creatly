import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage({viewport:{width:1440,height:900}});
await pg.goto("http://127.0.0.1:3011/visual-hooks/cask",{waitUntil:"networkidle",timeout:30000});await pg.waitForTimeout(900);
// глава III: доскроллить почти до конца cinematicBand
await pg.evaluate(()=>{const el=document.querySelector('.pb-cband');const r=el.getBoundingClientRect();window.scrollTo(0, window.scrollY + r.top + el.offsetHeight - window.innerHeight*1.15);});
await pg.waitForTimeout(700); await pg.screenshot({path:`${OUT}/nb-cband3.jpg`,quality:74,type:"jpeg"});console.log("cband3");
// bigNumber
await pg.evaluate(()=>document.querySelector('.pb-bignum')?.scrollIntoView({block:'center'})); await pg.waitForTimeout(700);
await pg.screenshot({path:`${OUT}/nb-bignum2.jpg`,quality:74,type:"jpeg"});console.log("bignum");
// diptych
await pg.evaluate(()=>document.querySelector('.pb-dip')?.scrollIntoView({block:'center'})); await pg.waitForTimeout(700);
await pg.screenshot({path:`${OUT}/nb-dip2.jpg`,quality:74,type:"jpeg"});console.log("dip");
await b.close();
