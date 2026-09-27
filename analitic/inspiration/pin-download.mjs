import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { statSync } from "node:fs";
const OUT="analitic/pins";
const concepts=[
 ["clothing","957437202045244501"],["skydive","1084382416549411158"],["escort","1068267974139237742"],
 ["skisnow","1015561784739167616"],["vinyl","974114594422232695"],["ecology","1152006779739881235"],
 ["anime","819584832235378980"],["notredame","881579695805696041"],["porsche911","1019713540628634711"],
 ["cardealer","688136018108872471"],["djconcert","964192601513511617"],["bmw","1091841503414403227"],
 ["photographer","1025976358868817378"],["womensuit","908601293599283746"],["hoodie","1090997079014575562"],
 ["jptattoo","973692381954755236"],["dance","358810295338388694"],["jprestaurant","580190364538625284"],
 ["jpclub","818388563583841337"],["folkmusic","218354281934834086"],["redsuit","1026187465112445691"],
 ["rockband","39406565486107704"],["freestyle","957437202045001140"],
];
const refs=[
 ["ref-scenes","492649952502712"],["ref-clothswap","1093671090781192414"],["ref-bgorbit","14707136282628743"],
 ["ref-startend","492159065536937776"],["ref-sideobj","753719687675127382"],["ref-blurbg","1140888518105751838"],
 ["ref-diagonal","852728510714141113"],["ref-parallax","852728510711919134"],
];
const all=[...concepts.map(c=>[...c,"c"]),...refs.map(r=>[...r,"r"])];
const b=await chromium.launch({args:["--no-sandbox"]});
const pg=await b.newPage({viewport:{width:1200,height:900},userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"});
let ok=0,fail=0;
for(const [name,id] of all){
  try{
    await pg.goto(`https://ru.pinterest.com/pin/${id}/`,{waitUntil:"domcontentloaded",timeout:25000});
    await pg.waitForTimeout(1800);
    let url=await pg.evaluate(()=>{const m=document.querySelector('meta[property="og:image"]');return m?m.content:null;});
    if(!url){console.log("FAIL",name,"no og"); fail++; continue;}
    // try higher res: swap /736x/ -> /originals/
    const hi=url.replace(/\/\d+x\//,"/originals/");
    const out=join(OUT,`${name}.jpg`);
    try{ execFileSync("curl",["-s","-L","-m","20","-o",out,hi]); if(statSync(out).size<3000) throw 0; }
    catch{ execFileSync("curl",["-s","-L","-m","20","-o",out,url]); }
    console.log("ok",name); ok++;
  }catch(e){console.log("FAIL",name,String(e).slice(0,50)); fail++;}
}
console.log(`done ok=${ok} fail=${fail}`);
await b.close();
