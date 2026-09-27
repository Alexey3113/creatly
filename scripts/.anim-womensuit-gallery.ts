import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","womensuit"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Refined editorial fashion palette of deep aubergine plum, soft blush and warm ivory, elegant directional studio light, subtle grain, luxurious and understated. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`wsg-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("g1","2:3",`Editorial fashion shot of a woman in a wide-leg ivory double-breasted trouser suit, confident stride, studio, film look. ${PAL}`));
  jobs.push(gen("g2","1:1",`Close-up of a tailor's hands pinning and chalk-marking a plum wool jacket on a mannequin, atelier detail. ${PAL}`));
  jobs.push(gen("g3","3:2",`A rail of tailored women's suits in blush and plum in a minimalist atelier, soft light. ${PAL}`));
  jobs.push(gen("g4","2:3",`Editorial back view of a woman in a sharply tailored blush suit showing shoulder construction, studio, film look. ${PAL}`));
  jobs.push(gen("g5","1:1",`Close-up of folded suiting fabrics, a tape measure and tailor's chalk on an ivory surface, atelier still life. ${PAL}`));
  await Promise.all(jobs);
  console.log("anim-womensuit-gallery done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
