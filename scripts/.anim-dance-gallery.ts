import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","dance"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="High-contrast monochrome charcoal and off-white with a single lime-green accent, a hard spotlight, deep shadow, energetic and cinematic, film grain. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"1k",folder:F,jobId:`dng-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("g1","2:3",`A contemporary dancer mid-leap in a hard spotlight, monochrome charcoal, dramatic shadow, dynamic. ${PAL}`));
  jobs.push(gen("g2","3:2",`A dance studio with a wall of mirrors and a sprung wooden floor, single spotlight, empty, atmospheric. ${PAL}`));
  jobs.push(gen("g3","1:1",`Close-up of a dancer's feet en pointe on a worn studio floor, monochrome, hard light. ${PAL}`));
  jobs.push(gen("g4","2:3",`A ballet dancer in a deep backbend in a spotlight, monochrome charcoal, long shadow, elegant. ${PAL}`));
  jobs.push(gen("g5","3:2",`A group of dancers in silhouette rehearsing in a dim studio, single light source, motion. ${PAL}`));
  await Promise.all(jobs);
  console.log("anim-dance-gallery done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
