import { chromium } from "playwright";
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage({viewport:{width:1512,height:945}});
await pg.goto("http://127.0.0.1:3011/visual-hooks/forge",{waitUntil:"networkidle",timeout:45000});
await pg.waitForTimeout(1000);
const r=await pg.evaluate(()=>{
  const el=document.querySelector('.pos-hero');
  const top=el.getBoundingClientRect().top+window.scrollY, tr=el.offsetHeight-window.innerHeight;
  window.scrollTo(0, Math.round(top+0.5*tr));
  return new Promise(res=>setTimeout(()=>{
    const cs=getComputedStyle(el);
    const back=document.querySelector('.pos-hero .pos-back');
    const cb=back?getComputedStyle(back):null;
    const br=back?back.getBoundingClientRect():null;
    res({sp:cs.getPropertyValue('--sp'),as:cs.getPropertyValue('--as'),secH:el.offsetHeight,tr,
      backText:back?back.textContent:'NONE',backOpacity:cb?cb.opacity:'n/a',backTop:br?Math.round(br.top):'n/a',backFont:cb?cb.fontSize:'n/a',
      posBefore:getComputedStyle(document.querySelector('.pos-hero .pos-sticky'),'::before').zIndex});
  },900));
});
console.log(JSON.stringify(r,null,1));
await b.close();
