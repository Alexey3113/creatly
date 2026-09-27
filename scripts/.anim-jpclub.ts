import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","jpclub"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Hot magenta-pink and black DUOTONE manga anime illustration, bold ink linework and halftone dot shading, gritty Tokyo-night street aesthetic, high contrast. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`jc-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("bg","16:9",`A Tokyo night scene: a torii gate, a large glowing pink moon low on the horizon, a distant neon city skyline silhouette with a tall tower, dark water reflection, cherry-blossom branches at the edges, halftone shading. Environment only, no people. ${PAL}`));
  jobs.push(gen("figure","2:3",`EXACTLY ONE stylish tattooed young woman club-goer in a black cropped top and pleated mini-skirt with hanging chains and a thigh strap, an elaborate dragon-and-sakura tattoo sleeve, confident over-the-shoulder pose, isolated and centered on a plain flat black background with wide margin. ONLY ONE figure, no duplicate, no reflection, no second person. ${PAL}`));
  jobs.push(gen("petals","1:1",`A spray of falling cherry-blossom petals and a small blossom branch, hot magenta-pink on flat pure black background, scattered, centered with margin. ${PAL}`));
  const [ , figPath, petPath] = await Promise.all(jobs);
  for(const [p,nm] of [[figPath,"figure-cut"],[petPath,"petals-cut"]] as [string,string][]){
    try{ const u=await higsRemoveBackground(p, `jc-${nm}-${Date.now().toString(36)}`, F); await higsDownload(u, join(DIR,`${nm}.png`)); console.log("cut",nm); }
    catch(e){ console.log("cut-fail",nm,String(e).slice(-50)); }
  }
  console.log("anim-jpclub done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
