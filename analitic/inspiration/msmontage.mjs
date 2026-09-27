import { chromium } from "playwright";
import fs from "fs";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad/ms";
const frames=fs.readdirSync(OUT+"/frames").filter(f=>f.endsWith(".jpg")&&!f.startsWith("_")).sort();
const b=await chromium.launch();
const pg=await b.newPage({viewport:{width:1600,height:1000},deviceScaleFactor:1});
const G=15; let sheet=0;
for(let s=0;s<frames.length;s+=G){
  const grp=frames.slice(s,s+G);
  const cells=grp.map(f=>'<div style="background:#111;border:1px solid #333;overflow:hidden"><img src="frames/'+f+'" style="width:100%;display:block"></div>').join("");
  const html='<body style="margin:0;background:#000"><div id="g" style="display:grid;grid-template-columns:repeat(5,1fr);gap:5px;padding:5px;width:1560px">'+cells+'</div></body>';
  fs.writeFileSync(OUT+"/_m.html",html);
  await pg.goto("file://"+OUT+"/_m.html",{waitUntil:"networkidle",timeout:20000});
  await pg.waitForTimeout(200);
  await (await pg.$("#g")).screenshot({path:`${OUT}/sheet-${String(sheet).padStart(2,"0")}.jpg`,quality:74,type:"jpeg"});
  sheet++;
}
await b.close(); console.log("sheets:",sheet);
