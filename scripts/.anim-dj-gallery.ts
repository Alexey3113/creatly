import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","dj"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="High-energy dark rave palette, near-black and oil-slick shadow lit by fiery orange and ember light, haze and sparks, cinematic grunge, heavy film grain. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`djg-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("g1","3:2",`A massive festival crowd with hands raised, silhouettes against a wall of fiery orange stage light and haze, euphoric. ${PAL}`));
  jobs.push(gen("g2","2:3",`A DJ silhouette at the decks arms raised on a smoky stage, backlit by orange light and sparks, dramatic. ${PAL}`));
  jobs.push(gen("g3","1:1",`Close-up of hands on a glowing CDJ mixer, orange light, haze, macro nightlife. ${PAL}`));
  jobs.push(gen("g4","3:2",`A festival main stage erupting with flame jets and orange lights over a huge crowd at night, epic. ${PAL}`));
  jobs.push(gen("g5","1:1",`Laser beams and smoke cutting through a dark crowd lit by ember orange, energetic rave. ${PAL}`));
  await Promise.all(jobs);
  console.log("anim-dj-gallery done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
