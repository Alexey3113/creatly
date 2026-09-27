import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","skydive"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Surreal teal-grey high-altitude palette, cool misty tones, soft diffused light, vast sky and cloud, cinematic and airy, subtle grain. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`sdg-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("g1","2:3",`A skydiver in freefall arched belly-to-earth high above misty coastline, cool teal tones, aerial, cinematic. ${PAL}`));
  jobs.push(gen("g2","3:2",`An open parachute canopy gliding over teal mountains and cloud at altitude, wide serene. ${PAL}`));
  jobs.push(gen("g3","1:1",`Close-up of an altimeter and gloved hand against a jumpsuit, cool tones, gear detail. ${PAL}`));
  jobs.push(gen("g4","3:2",`Aerial view of a small dropzone airfield beside a teal coastline from high altitude, misty. ${PAL}`));
  jobs.push(gen("g5","1:1",`A group of skydivers linking hands in a freefall formation, teal sky, dynamic. ${PAL}`));
  await Promise.all(jobs);
  console.log("anim-skydive-gallery done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
