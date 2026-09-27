import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","hoodie"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Gritty streetwear editorial, raw concrete grey and deep black with a punch of high-visibility safety yellow, hard flash, urban and bold, film grain. No text, no letters, no watermark, no logos.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"1k",folder:F,jobId:`hdg-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("g1","2:3",`Streetwear lookbook shot of a person in an oversized grey hoodie, hood up, hard flash against concrete, bold. ${PAL}`));
  jobs.push(gen("g2","1:1",`Macro of heavyweight loopback cotton hoodie fabric with a safety-yellow drawcord, product detail. ${PAL}`));
  jobs.push(gen("g3","3:2",`Two people in oversized hoodies leaning on a concrete underpass wall, streetwear editorial, hard flash. ${PAL}`));
  jobs.push(gen("g4","2:3",`Back view of an oversized hoodie showing boxy fit and dropped shoulders, concrete backdrop, studio. ${PAL}`));
  jobs.push(gen("g5","1:1",`Flatlay of a folded grey hoodie, safety-yellow tag and a numbered drop card on concrete, top-down. ${PAL}`));
  await Promise.all(jobs);
  console.log("anim-hoodie-gallery done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
