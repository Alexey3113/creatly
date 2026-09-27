import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","freestyle"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="High-energy nocturnal skate palette, near-black concrete and deep shadow with a hard white key light and cold blue rim, crisp and punchy, film grain. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"1k",folder:F,jobId:`fsg-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("g1","2:3",`A skateboarder mid-kickflip over a set of stairs at night, hard flash, gritty urban plaza, dynamic. ${PAL}`));
  jobs.push(gen("g2","3:2",`A concrete skate plaza with ledges and rails at night lit by a single floodlight, empty, atmospheric. ${PAL}`));
  jobs.push(gen("g3","1:1",`Close-up of a worn skateboard deck and scuffed trucks on rough concrete, hard light, grit. ${PAL}`));
  jobs.push(gen("g4","2:3",`A skater grinding a handrail at night in silhouette, sparks, hard flash, dramatic action. ${PAL}`));
  jobs.push(gen("g5","3:2",`A group of skaters sitting on a ledge at a night plaza, boards in hand, urban documentary. ${PAL}`));
  await Promise.all(jobs);
  console.log("anim-freestyle-gallery done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
