import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","jptattoo"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Ukiyo-e punk palette, warm mustard yellow, vermilion red and sumi ink black, bold graphic, warm studio light, film grain. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"1k",folder:F,jobId:`jtg-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("g1","2:3",`A full irezumi back-piece tattoo of a koi and waves in vermilion and sumi ink on skin, warm light, editorial. ${PAL}`));
  jobs.push(gen("g2","1:1",`Close-up of a tattoo artist's tebori hand-poking a design, ink and needle detail, warm light. ${PAL}`));
  jobs.push(gen("g3","3:2",`A traditional Japanese tattoo studio interior with ukiyo-e prints on the wall, warm mustard light, empty. ${PAL}`));
  jobs.push(gen("g4","2:3",`A sleeve tattoo of a dragon in vermilion and black wrapping a forearm, dramatic warm light, macro. ${PAL}`));
  jobs.push(gen("g5","1:1",`Flatlay of tattoo ink caps, needles and a brush-drawn koi design on washi paper, warm light. ${PAL}`));
  await Promise.all(jobs);
  console.log("anim-jptattoo-gallery done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
