import { join } from "path"; import { existsSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","freestyle");
const PIN = join(process.cwd(),"analitic","pins","freestyle.jpg");
const F="visual-hooks";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"1k",folder:F,jobId:`fss-${name}-${Date.now().toString(36)}`,prompt,refFrames:[PIN]});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  // S2 THE SPOTS — андеркрофт/бетон
  await gen("undercroftbg","16:9","A gritty urban skate spot under a concrete overpass undercroft at dusk, raw concrete pillars, ledges and stairs, graffiti-smeared walls, scuffed ground, one harsh overhead light, deep shadows, atmospheric haze. High-contrast cold monochrome grunge, empty, no people, no text. Streetwear zine aesthetic.");
  // S2 передний план — тэги/наклейки/рваная бумага
  await gen("graffitifg","16:9","Spray-paint tag marks, worn stickers and torn paper scraps scattered, isolated on a plain solid black background, high-contrast monochrome with a single crimson-red mark, arranged around the edges as a foreground overlay. No readable words.");
  // S5 THE WORD — граффити-стена
  await gen("wallbg","16:9","A rough concrete skatepark wall covered in layered grey spray paint, scuff marks, grime, tar streaks and torn stickers, flat frontal view, harsh raking light, high-contrast cold monochrome grunge, empty, no readable text. Zine aesthetic.");
  console.log("FS-SCENES DONE");
})().catch(e=>{console.error("FAIL",String(e).slice(-160));process.exit(1);});
