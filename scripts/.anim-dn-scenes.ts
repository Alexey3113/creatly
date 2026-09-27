import { join } from "path"; import { existsSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","dance");
const PIN = join(process.cwd(),"analitic","pins","dance.jpg");
const F="visual-hooks";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"1k",folder:F,jobId:`dns-${name}-${Date.now().toString(36)}`,prompt,refFrames:[PIN]});
  await higsDownload(u,out); console.log("ok",name); return out;
}
async function cut(src:string,outname:string){
  const out=join(DIR,`${outname}.png`); if(existsSync(out)){console.log("skip-cut",outname);return;}
  try{ const u=await higsRemoveBackground(src,`dns-cut-${outname}-${Date.now().toString(36)}`,F); await higsDownload(u,out); console.log("cut",outname);}
  catch(e){console.log("cut-fail",outname,String(e).slice(-50));}
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  // S2 THE FLOOR — танцевальный зал
  await gen("studiobg","16:9","A bright contemporary dance studio interior, pale wood sprung floor, a full wall of mirrors, a ballet barre, tall windows with soft daylight, clean and minimal, white and warm-grey tones with soft long shadows, empty, no people, no text. High-key, editorial, cinematic.");
  // S6 FIND YOUR LINE — пуанты
  const pt=await gen("pointeobj","2:3","A pair of well-worn pink satin ballet pointe shoes with long ribbons, resting at an angle, soft directional light, delicate and worn. Isolated on a plain solid black background with generous margin for a clean cutout. No text, no logos.");
  await cut(pt,"pointeobj-cut");
  console.log("DN-SCENES DONE");
})().catch(e=>{console.error("FAIL",String(e).slice(-160));process.exit(1);});
