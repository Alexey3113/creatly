import { chromium } from "playwright";
import fs from "fs";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad/ms";
const ABS="/Users/leo/programming/creatly/analitic/motionsites";
const rows=fs.readFileSync(OUT+"/index.tsv","utf8").trim().split("\n").map(l=>l.split("\t"));
fs.mkdirSync(OUT+"/pairs",{recursive:true});
const b=await chromium.launch();
const pg=await b.newPage({viewport:{width:380,height:900},deviceScaleFactor:1});
let ok=0;
for(const [n,id,title,cat,mt] of rows){
  const ext=mt.includes("mp4")?"mp4":mt.includes("gif")?"gif":mt.includes("png")?"png":"webp";
  const file="file://"+ABS+"/media/"+id+"."+ext;
  const label=(n+" "+title+" ["+cat+"]").replace(/[<>"]/g,"").slice(0,46);
  try{
    if(ext==="mp4"){
      await pg.setContent('<body style="margin:0;background:#111"><video id="v" src="'+file+'" muted style="width:360px;display:block"></video></body>',{waitUntil:"load",timeout:20000});
      await pg.waitForFunction('document.getElementById("v")&&document.getElementById("v").readyState>=2',{timeout:15000}).catch(()=>{});
      const dur=await pg.evaluate('document.getElementById("v").duration||5');
      const shots=[];
      for(const t of [dur*0.4,dur*0.75]){
        await pg.evaluate(tt=>{const v=document.getElementById("v");v.currentTime=tt;},t);
        await pg.waitForTimeout(500);
        shots.push(await pg.$eval("#v",()=>true));
        await (await pg.$("#v")).screenshot({path:`${OUT}/pairs/${n}_${shots.length}.jpg`,quality:70,type:"jpeg"});
      }
    } else {
      await pg.setContent('<body style="margin:0;background:#111"><img id="im" src="'+file+'" style="width:360px;display:block"></body>',{waitUntil:"load",timeout:20000});
      await pg.waitForTimeout(1500); await (await pg.$("#im")).screenshot({path:`${OUT}/pairs/${n}_1.jpg`,quality:70,type:"jpeg"});
      await pg.waitForTimeout(1800); await (await pg.$("#im")).screenshot({path:`${OUT}/pairs/${n}_2.jpg`,quality:70,type:"jpeg"});
    }
    // stack the two vertically with label via a compose page
    const p1="file://"+OUT+"/pairs/"+n+"_1.jpg", p2="file://"+OUT+"/pairs/"+n+"_2.jpg";
    await pg.setContent('<body style="margin:0;background:#0c0c0c"><div id="c" style="width:360px;position:relative"><img src="'+p1+'" style="width:360px;display:block"><img src="'+p2+'" style="width:360px;display:block;border-top:2px solid #0c0c0c"><div style="position:absolute;top:2px;left:2px;background:rgba(0,0,0,.75);color:#ff0;font:12px monospace;padding:2px 5px;white-space:nowrap">'+label+'</div></div></body>',{waitUntil:"load",timeout:15000});
    await pg.waitForTimeout(120);
    await (await pg.$("#c")).screenshot({path:`${OUT}/frames/${n}.jpg`,quality:72,type:"jpeg"});
    ok++;
  }catch(e){console.log("fail",n,id,String(e).slice(0,40));}
}
await b.close();
console.log("done ok:",ok,"/",rows.length);
