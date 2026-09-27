import { chromium } from "playwright";
const b=await chromium.launch({args:["--no-sandbox"]});
const pg=await b.newPage({viewport:{width:1280,height:1000},userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"});
for(const id of ["957437202045244501","819584832235378980"]){
  try{
    await pg.goto(`https://ru.pinterest.com/pin/${id}/`,{waitUntil:"domcontentloaded",timeout:25000});
    await pg.waitForTimeout(2500);
    const og=await pg.evaluate(()=>{const m=document.querySelector('meta[property="og:image"]');return m?m.content:null;});
    const big=await pg.evaluate(()=>{let best=null,area=0;for(const im of document.querySelectorAll('img')){const a=im.naturalWidth*im.naturalHeight;if(a>area&&im.src.includes('pinimg')){area=a;best=im.src;}}return best;});
    console.log(id,"og:",og?og.slice(0,90):"none","| big:",big?big.slice(0,90):"none");
  }catch(e){console.log(id,"ERR",String(e).slice(0,80));}
}
await b.close();
