import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","ecology"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Deep muted sage-green and fresh forest-green tones, glossy glass, cinematic soft studio light, subtle film grain, calm and premium. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`ec-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("bg","16:9",`A dark muted sage-green studio backdrop with a soft radial gradient and gentle vignette, deep forest-green tones, minimal and clean. Backdrop only, no object, no plants, no trees, no capsule, no people. ${PAL}`));
  jobs.push(gen("capsule","2:3",`EXACTLY ONE large translucent glass capsule pill standing vertically, containing a whole miniature living forest of tall pine trees, moss and green undergrowth sealed inside it, glossy glass shell with soft highlights and reflections, isolated and centered on a plain flat dark charcoal-green background with wide margin. ONLY ONE capsule, no duplicate, no reflection, no second capsule. Photoreal cinematic product render. No text, no logo.`));
  jobs.push(gen("leaves","1:1",`A few loose green fern fronds and small moss sprigs with a couple of falling leaves, fresh vivid green, on a plain flat dark charcoal background, scattered, centered with wide margin. No text, no watermark.`));
  const [ , capPath, lvPath] = await Promise.all(jobs);
  for(const [p,nm] of [[capPath,"capsule-cut"],[lvPath,"leaves-cut"]] as [string,string][]){
    try{ const u=await higsRemoveBackground(p, `ec-${nm}-${Date.now().toString(36)}`, F); await higsDownload(u, join(DIR,`${nm}.png`)); console.log("cut",nm); }
    catch(e){ console.log("cut-fail",nm,String(e).slice(-50)); }
  }
  console.log("anim-ecology done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
