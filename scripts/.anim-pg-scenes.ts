import { join } from "path"; import { existsSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","photographer");
const PIN = join(process.cwd(),"analitic","pins","photographer.jpg");
const F="visual-hooks";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"1k",folder:F,jobId:`pgs-${name}-${Date.now().toString(36)}`,prompt,refFrames:[PIN]});
  await higsDownload(u,out); console.log("ok",name); return out;
}
async function cut(src:string,outname:string){
  const out=join(DIR,`${outname}.png`); if(existsSync(out)){console.log("skip-cut",outname);return;}
  try{ const u=await higsRemoveBackground(src,`pgs-cut-${outname}-${Date.now().toString(36)}`,F); await higsDownload(u,out); console.log("cut",outname);}
  catch(e){console.log("cut-fail",outname,String(e).slice(-50));}
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  // S3 THE APPROACH — тёплый золотой-час фон
  await gen("goldenbg","16:9","A warm golden-hour landscape at the last hour of light — soft sun flare through haze, honey and amber tones, an open field meeting a soft coastline, shot on 35mm film with gentle grain and shallow focus, cinematic and intimate, mostly empty with soft bokeh and room for text. No people, no text.");
  // S6 CHASE THE LIGHT — плёночная камера объект
  const cam=await gen("cameraobj","2:3","A vintage 35mm film camera resting at an angle, warm golden side-light catching worn black leather and chrome, shallow focus, dust motes in the light. Isolated on a plain solid black background with generous margin for a clean cutout. No text, no logos.");
  await cut(cam,"cameraobj-cut");
  console.log("PG-SCENES DONE");
})().catch(e=>{console.error("FAIL",String(e).slice(-160));process.exit(1);});
