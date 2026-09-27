import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","escort"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Refined glamorous evening palette of deep emerald green, warm antique gold and midnight noir, soft cinematic low light, elegant and discreet, subtle grain. Tasteful, dignified, upscale. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`esg-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("g1","3:2",`A grand empty gala ballroom with crystal chandeliers and emerald drapery at night, warm golden light, elegant, no people. ${PAL}`));
  jobs.push(gen("g2","2:3",`An intimate candlelit fine-dining table set for two by a window, refined, no people. ${PAL}`));
  jobs.push(gen("g3","3:2",`The gilded interior of a historic opera house with empty red-and-gold boxes, warm light, no people. ${PAL}`));
  jobs.push(gen("g4","1:1",`Two crystal champagne coupes touching in a toast, warm bokeh, macro, no faces. ${PAL}`));
  jobs.push(gen("g5","1:1",`A luxury car headlights arriving at a lit grand venue entrance at night, elegant, no people. ${PAL}`));
  await Promise.all(jobs);
  console.log("anim-escort-gallery done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
