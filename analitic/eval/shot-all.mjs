import { chromium } from "playwright";
const OUT="/Users/leo/programming/creatly/analitic/eval/shots";
const SLUGS=["clothing","skydive","vinyl","porsche","skisnow","ecology","anime","notredame","dj","bmw","dance","folkmusic","rockband","photographer","womensuit","hoodie","escort","cardealer","jprestaurant","jptattoo","jpclub","redsuit","freestyle"];
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage({viewport:{width:1512,height:945}});
for(const s of SLUGS){
  try{
    await pg.goto(`http://127.0.0.1:3011/visual-hooks/${s}`,{waitUntil:"networkidle",timeout:40000});
    await pg.waitForTimeout(1100); await pg.mouse.move(760,470);
    let sp=0;
    for(let i=0;i<170;i++){
      sp=await pg.evaluate(()=>{const e=document.querySelector('.ps-scene');return e?parseFloat(getComputedStyle(e).getPropertyValue('--sp')||'0'):1;});
      if(sp>=0.6)break; await pg.mouse.wheel(0,220); await pg.waitForTimeout(32);
    }
    await pg.waitForTimeout(500);
    await pg.screenshot({path:`${OUT}/${s}.jpg`,quality:85,type:"jpeg"});
    console.log("ok",s,"sp="+sp.toFixed(2));
  }catch(e){console.log("FAIL",s,String(e).slice(0,80));}
}
await b.close(); console.log("DONE");
