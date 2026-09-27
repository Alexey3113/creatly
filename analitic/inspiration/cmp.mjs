import { chromium } from "playwright";
import fs from "fs";
const S="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad", MS="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad/ms/frames";
const ours=[["/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad/prod-cask2.jpg","НАШ cask (product-theatre)"],["/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad/arch-thread.jpg","НАШ thread (hard-split)"],["/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad/arch2-wax2.jpg","НАШ wax (type-collision)"],["/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad/arch3-velo.jpg","НАШ velo (index-stage)"]];
const theirs=[[MS+"/020.jpg","MS Guardnet (живая нефть-сфера)"],[MS+"/013.jpg","MS Immersive (жидкая 3D-форма)"],[MS+"/018.jpg","MS Form Study (хром-сфера+орбиты)"],[MS+"/059.jpg","MS OYLA (рука-объект ближе камеры)"]];
function row(list){return list.map(([f,c])=>'<div style="flex:1"><img src="file://'+f+'" style="width:100%;display:block;border:1px solid #333"><div style="color:#ddd;font:12px sans-serif;padding:3px">'+c+'</div></div>').join("");}
const html='<body style="margin:0;background:#0a0a0a;font-family:sans-serif"><div style="color:#8f8;padding:6px;font:13px monospace">НАШИ 4 (видео/постер в композиции):</div><div style="display:flex;gap:5px;padding:0 5px">'+row(ours)+'</div><div style="color:#f88;padding:6px;font:13px monospace">MOTIONSITES 4 (один живой объект в центре):</div><div style="display:flex;gap:5px;padding:0 5px 8px">'+row(theirs)+'</div></body>';
fs.writeFileSync(S+"/_cmp.html",html);
const b=await chromium.launch();const pg=await b.newPage({viewport:{width:1500,height:1000}});
await pg.goto("file://"+S+"/_cmp.html",{waitUntil:"networkidle",timeout:20000});await pg.waitForTimeout(300);
await pg.screenshot({path:S+"/compare.jpg",quality:78,type:"jpeg",fullPage:true});await b.close();console.log("ok");
