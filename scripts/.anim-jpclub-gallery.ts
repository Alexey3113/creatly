import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","jpclub"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Hot-pink and black neon duotone palette, Tokyo nightclub energy, magenta neon glow, deep shadow, haze, high contrast, film grain. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"1k",folder:F,jobId:`jcg-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("g1","3:2",`A packed Tokyo nightclub crowd dancing under hot-pink neon and haze, silhouettes, energetic. ${PAL}`));
  jobs.push(gen("g2","2:3",`A DJ in a neon-lit booth from behind facing a pink-lit crowd, haze, dramatic. ${PAL}`));
  jobs.push(gen("g3","1:1",`A narrow neon Tokyo nightlife alley at night, pink and magenta signage glow, wet asphalt, no text. ${PAL}`));
  jobs.push(gen("g4","1:1",`Cocktails glowing under pink neon on a dark club bar, macro, moody nightlife. ${PAL}`));
  jobs.push(gen("g5","3:2",`A dancer silhouette in pink smoke and strobe on a club floor, motion, energetic. ${PAL}`));
  await Promise.all(jobs);
  console.log("anim-jpclub-gallery done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
