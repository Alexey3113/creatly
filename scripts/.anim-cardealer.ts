import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","cardealer"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Heritage luxury showroom palette, deep midnight navy and charcoal with polished chrome and a warm amber headlight glow, cinematic low light, glossy reflective floor, subtle grain, refined and timeless. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`cd-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("bg","16:9",`A minimalist dark luxury car showroom at night, smooth charcoal walls, a single warm amber spotlight, glossy black reflective polished floor, empty. Environment only, no car, no people, no text. ${PAL}`));
  jobs.push(gen("car","16:9",`EXACTLY ONE elegant restored classic sports car from the 1960s, deep navy blue with chrome details, dramatic low three-quarter front angle, headlights softly glowing, isolated and centered on a plain flat neutral grey studio background with generous margin. ONLY ONE car, no duplicate, no reflection, no mirror image, no text. ${PAL}`));
  const [ , cPath] = await Promise.all(jobs);
  try{ const u=await higsRemoveBackground(cPath, `cd-carcut-${Date.now().toString(36)}`, F); await higsDownload(u, join(DIR,"car-cut.png")); console.log("cut car"); }
  catch(e){ console.log("cut-fail",String(e).slice(-40)); }
  console.log("anim-cardealer done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
