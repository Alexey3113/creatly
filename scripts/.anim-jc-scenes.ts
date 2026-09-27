import { join } from "path"; import { existsSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","jpclub");
const PIN = join(process.cwd(),"analitic","pins","jpclub.jpg");
const F="visual-hooks";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"1k",folder:F,jobId:`jcs-${name}-${Date.now().toString(36)}`,prompt,refFrames:[PIN]});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  // S2 — торий + розовое солнце duotone
  await gen("toriibg","16:9","A pink-and-black duotone manga illustration background: a large glowing pink sun low behind a torii gate standing in water, a silhouetted Tokyo skyline with a tall tower, cherry-blossom branches framing the top, heavy halftone shading, high-contrast ink line-art, empty foreground, no readable text.");
  // S5 — ночной город duotone
  await gen("citybg","16:9","A pink-and-black duotone manga night-city street scene: glowing neon signs and lanterns, wet asphalt reflections, light rain, silhouetted crowd far back, heavy halftone shading, high-contrast ink line-art, empty foreground centre, no readable text.");
  console.log("JC-SCENES DONE");
})().catch(e=>{console.error("FAIL",String(e).slice(-160));process.exit(1);});
