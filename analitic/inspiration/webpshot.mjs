import { chromium } from "playwright";
import fs from "fs";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad/ms";
const ABS="/Users/leo/programming/creatly/analitic/motionsites";
const rows=fs.readFileSync(OUT+"/index.tsv","utf8").trim().split("\n").map(l=>l.split("\t"));
const webp=rows.filter(r=>r[4]==="image/webp");
const b=await chromium.launch();
const pg=await b.newPage({viewport:{width:380,height:420},deviceScaleFactor:1});
let ok=0;
for(const [n,id,title,cat] of webp){
  const file="file://"+ABS+"/media/"+id+".webp";
  const label=(n+" "+title+" ["+cat+"]").replace(/[<>]/g,"").slice(0,44);
  const html='<body style="margin:0;background:#111"><div id="w" style="width:360px;position:relative"><img src="'+file+'" style="width:360px;display:block"><div style="position:absolute;top:3px;left:3px;background:rgba(0,0,0,.7);color:#ff0;font:13px monospace;padding:2px 5px;white-space:nowrap">'+label+'</div></div></body>';
  try{
    await pg.setContent(html,{waitUntil:"load",timeout:15000});
    await pg.waitForTimeout(1100);
    const el=await pg.$("#w");
    await el.screenshot({path:OUT+"/frames/"+n+".jpg",quality:72,type:"jpeg"});
    ok++;
  }catch(e){console.log("fail",n,id,String(e).slice(0,40));}
}
await b.close();
console.log("webp ok:",ok,"/",webp.length);
