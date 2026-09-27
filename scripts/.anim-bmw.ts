import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","bmw"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Dark graphite and carbon-fibre with a cool electric cyan-blue accent, precise high-tech engineering aesthetic, sharp studio light, subtle grain. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`bm-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("bg","16:9",`A dark graphite carbon-fibre textured studio backdrop with a very subtle radial sheen and vignette, minimal and high-tech. Backdrop only, no car, no vehicle, no people, no grid, no text. ${PAL}`));
  jobs.push(gen("car","16:9",`A dark metallic gunmetal-grey high-performance German coupe (M-style sports car) with aggressive aero and a subtle rear spoiler, dynamic three-quarter front view, glossy reflective bodywork catching cool electric-blue light, on a plain flat neutral grey studio background, sharp automotive studio photography, centered with margin. EXACTLY ONE car, no duplicate, no reflection, no second car. No text, no license plate text, no brand logo.`));
  const [ , carPath] = await Promise.all(jobs);
  try{ const u=await higsRemoveBackground(carPath, `bm-carcut-${Date.now().toString(36)}`, F); await higsDownload(u, join(DIR,"car-cut.png")); console.log("cut car"); }
  catch(e){ console.log("cut-fail",String(e).slice(-50)); }
  console.log("anim-bmw done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
