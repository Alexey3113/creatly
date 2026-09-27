import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","bmw"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Technical automotive palette, carbon graphite black and cool steel with electric blue accents, hard studio light, glossy reflections, crisp and precise, subtle grain. No text, no letters, no watermark, no badges, no logos.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`bmg-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("g1","1:1",`Macro of a forged alloy performance wheel and carbon brake caliper, electric blue accent, studio, glossy. ${PAL}`));
  jobs.push(gen("g2","3:2",`A dark carbon-fibre sports car cockpit interior with electric blue ambient light, driver focused, studio. ${PAL}`));
  jobs.push(gen("g3","2:3",`A sculpted carbon rear diffuser and quad exhaust detail of a performance coupe, hard light, glossy. ${PAL}`));
  jobs.push(gen("g4","3:2",`A performance coupe carving a wet racetrack corner at speed, motion blur, cool blue tone, dramatic. ${PAL}`));
  jobs.push(gen("g5","1:1",`Macro of carbon-fibre weave and a stitched leather bucket seat, electric blue thread, studio detail. ${PAL}`));
  await Promise.all(jobs);
  console.log("anim-bmw-gallery done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
