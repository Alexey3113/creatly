import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","rockband"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="High-contrast gritty rock-club palette, deep black, harsh electric red stage light and haze, raw concrete, hard rim light, heavy film grain, energetic and raw. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`rkg-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("g1","3:2",`View from the stage over a packed crowd with hands raised in red haze at a rock show, energetic, motion blur. ${PAL}`));
  jobs.push(gen("g2","2:3",`A guitarist shredding mid-solo leaning back under red light, sweat and grit, dynamic. ${PAL}`));
  jobs.push(gen("g3","1:1",`A drummer mid-hit, sticks blurred, cymbals flaring under red light, close energetic. ${PAL}`));
  jobs.push(gen("g4","3:2",`A rock band silhouetted on a smoky stage backlit by harsh red spotlights, wide dramatic. ${PAL}`));
  jobs.push(gen("g5","1:1",`A crowd surfer carried over raised hands at a gig, red light and haze, raw energy. ${PAL}`));
  await Promise.all(jobs);
  console.log("anim-rockband-gallery done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
