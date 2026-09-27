import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","porsche"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Dark cinematic twilight, magenta-pink and deep purple tones with cool silver, moody and atmospheric, subtle film grain. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`ps-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("bg","16:9",`A dark cinematic twilight landscape, a wide field of purple lavender and heather under a moody magenta-and-violet dusk sky, distant hazy mountains, deep atmospheric depth. Environment only, no car, no people. ${PAL}`));
  jobs.push(gen("car","16:9",`A silver metallic Porsche 911 GT3 sports car with a large rear wing, dramatic three-quarter rear view, glossy reflective bodywork catching cool light, on a plain flat neutral grey studio background, sharp automotive photography, centered with margin. No text, no license plate text, no logo.`));
  jobs.push(gen("blossom","1:1",`A branch of pink cherry blossom flowers with dark twigs, delicate petals, on a plain flat dark charcoal background, soft cinematic light, centered with wide margin, a foreground framing element. ${PAL}`));
  const [ , carPath, blPath] = await Promise.all(jobs);
  for(const [p,nm] of [[carPath,"car-cut"],[blPath,"blossom-cut"]] as [string,string][]){
    try{ const u=await higsRemoveBackground(p, `ps-${nm}-${Date.now().toString(36)}`, F); await higsDownload(u, join(DIR,`${nm}.png`)); console.log("cut",nm); }
    catch(e){ console.log("cut-fail",nm,String(e).slice(-50)); }
  }
  console.log("anim-porsche done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
