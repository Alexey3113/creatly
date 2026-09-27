import { join } from "path"; import { existsSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","folkmusic");
const PIN = join(process.cwd(),"analitic","pins","folkmusic.jpg");
const F="visual-hooks";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"1k",folder:F,jobId:`fks-${name}-${Date.now().toString(36)}`,prompt,refFrames:[PIN]});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  // S2 ОБРЯД — свечной обрядовый зал
  await gen("obryadbg","16:9","A dark cold candlelit folk-ritual interior — an old wooden izba hall at night, dozens of thin beeswax candles glowing, drifting smoke and haze, faint silhouettes of a standing folk choir far in the deep background, cold desaturated grey and slate-blue tones with small warm candle points, high-contrast and atmospheric, empty foreground, no readable text. Editorial, cinematic.");
  // S2 передний план — свечи
  await gen("candlefg","16:9","A row of tall thin lit beeswax candles with flames and drifting smoke, isolated on a plain solid black background, warm glowing points of light, arranged along the bottom edge as a foreground overlay. No text.");
  console.log("FK-SCENES DONE");
})().catch(e=>{console.error("FAIL",String(e).slice(-160));process.exit(1);});
