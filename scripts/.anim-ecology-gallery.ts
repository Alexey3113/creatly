import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","ecology"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Lush sage-green natural palette, soft misty diffused light, deep forest tones, serene and clean, cinematic, subtle grain. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"1k",folder:F,jobId:`ecg-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("g1","3:2",`A misty ancient forest canopy seen from above at dawn, sage-green tones, serene, aerial. ${PAL}`));
  jobs.push(gen("g2","1:1",`Close-up of two hands holding a young seedling in dark soil, soft light, tender. ${PAL}`));
  jobs.push(gen("g3","2:3",`A glass terrarium biosphere with a tiny lush forest inside, soft studio light, minimal. ${PAL}`));
  jobs.push(gen("g4","3:2",`A clear winding river through a green wetland valley in soft mist, wide serene landscape. ${PAL}`));
  jobs.push(gen("g5","1:1",`Macro of a dewdrop on a green leaf with veins, soft morning light, pristine. ${PAL}`));
  await Promise.all(jobs);
  console.log("anim-ecology-gallery done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
