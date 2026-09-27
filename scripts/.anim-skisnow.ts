import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","skisnow"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const DUO="cobalt-blue and cream DUOTONE photographic treatment, Swiss-modernist editorial, high contrast, subtle grain. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`ss-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("bg","16:9","A textured cream off-white Swiss-modernist poster paper background, faint paper grain and a soft vignette, minimal and clean. Backdrop only, no figure, no people, no mountains, no text, no letters."));
  jobs.push(gen("figure","2:3",`EXACTLY ONE snowboarder in profile wearing ski goggles, a knitted beanie and a puffy winter jacket with a backpack, dusted with snow, looking toward the mountains, isolated and centered on a plain flat neutral grey studio background with wide margin. ONLY ONE person, no duplicate, no reflection, no second figure. ${DUO}`));
  jobs.push(gen("peaks","16:9",`Jagged snow-covered alpine mountain peaks under a clear sky, majestic and sharp, no people, on a plain background. ${DUO}`));
  const [ , figPath, pkPath] = await Promise.all(jobs);
  for(const [p,nm] of [[figPath,"figure-cut"],[pkPath,"peaks-cut"]] as [string,string][]){
    try{ const u=await higsRemoveBackground(p, `ss-${nm}-${Date.now().toString(36)}`, F); await higsDownload(u, join(DIR,`${nm}.png`)); console.log("cut",nm); }
    catch(e){ console.log("cut-fail",nm,String(e).slice(-50)); }
  }
  console.log("anim-skisnow done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
