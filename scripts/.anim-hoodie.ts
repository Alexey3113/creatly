import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","hoodie"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Gritty streetwear palette, raw concrete grey and deep black with a punch of high-visibility safety yellow, hard direct on-camera flash, sharp shadows, urban and bold. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`hd-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("bg","16:9",`A raw urban underpass at night, bare concrete pillars and walls, faint safety-yellow sodium light, wet asphalt, empty. Environment only, no people, no text. ${PAL}`));
  jobs.push(gen("model","2:3",`EXACTLY ONE young person wearing a heavyweight oversized hoodie with the hood up, hands in the front pocket, relaxed confident streetwear stance, full length, isolated and centered on a plain flat neutral grey studio background with generous margin. ONLY ONE person, no duplicate, no reflection, no second figure. ${PAL}`));
  jobs.push(gen("garment","1:1",`EXACTLY ONE heavyweight oversized hoodie floating as a product shot, natural folds and drape, safety-yellow drawcords, isolated on a plain flat white background with wide margin. ONLY ONE hoodie, no duplicate, no person, no text. ${PAL}`));
  const [ , mPath, gPath] = await Promise.all(jobs);
  for(const [p,nm,tag] of [[mPath,"model-cut","hd-modelcut"],[gPath,"garment-cut","hd-garcut"]] as const){
    try{ const u=await higsRemoveBackground(p, `${tag}-${Date.now().toString(36)}`, F); await higsDownload(u, join(DIR,`${nm}.png`)); console.log("cut",nm); }
    catch(e){ console.log("cut-fail",nm,String(e).slice(-40)); }
  }
  console.log("anim-hoodie done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
