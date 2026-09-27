import { join } from "path"; import { existsSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","vinyl");
const PIN = join(process.cwd(),"analitic","pins","vinyl.jpg");
const F="visual-hooks";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"1k",folder:F,jobId:`vnf-${name}-${Date.now().toString(36)}`,prompt,refFrames:[PIN]});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  // HERO — album-cover макро (sepia-amber, глянец, уровень пина)
  await gen("coverface","2:3","A glossy retro album-cover macro portrait, deep sepia-amber toned: a person's face in warm low club light, eyes half-closed lost in the music, dewy skin with warm gloss highlights, heavy film grain, sensual but tasteful and fully SFW, vintage vinyl record-sleeve aesthetic, dark warm background, dramatic amber rim light. No text, no logos.");
  // S2 THE ROOM — after-hours винил-бар
  await gen("clubbg","16:9","A dim intimate after-hours vinyl listening bar interior, warm sepia-amber light, shelves packed with records, a glowing turntable, bottles and glasses catching amber light, smoke haze, deep shadows, empty foreground centre, cinematic, no people, no text.");
  // S2 передний план — дым/боке
  await gen("smokefg","16:9","Warm amber cigarette smoke wisps and soft golden bokeh orbs, isolated on a plain solid black background, arranged along the top and side edges as a foreground overlay. No text.");
  console.log("VN-FULL DONE");
})().catch(e=>{console.error("FAIL",String(e).slice(-160));process.exit(1);});
