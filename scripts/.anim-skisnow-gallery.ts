import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","skisnow"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Crisp alpine palette, cobalt-blue sky and bright snow white, cold clear light, sharp and clean, cinematic, subtle grain. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"1k",folder:F,jobId:`skg-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("g1","2:3",`A skier carving deep powder with a big spray of snow, cobalt sky, dynamic action, cold light. ${PAL}`));
  jobs.push(gen("g2","3:2",`A panorama of sharp snowy alpine peaks under a deep cobalt sky, crisp and vast. ${PAL}`));
  jobs.push(gen("g3","1:1",`Skis and a snowboard standing upright in fresh snow, cobalt shadows, clean product-style. ${PAL}`));
  jobs.push(gen("g4","3:2",`A chairlift climbing over a bright snowy slope under cobalt sky, clean lines. ${PAL}`));
  jobs.push(gen("g5","1:1",`A lone skier silhouette on a snowy ridge at cold sunset, cobalt and white, minimal. ${PAL}`));
  await Promise.all(jobs);
  console.log("anim-skisnow-gallery done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
