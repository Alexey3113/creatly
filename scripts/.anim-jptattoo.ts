import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","jptattoo"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Bold graphic ukiyo-e street-poster illustration, acid mustard-yellow with vermillion-red and sumi-ink black, high contrast, grunge texture and paint splatter. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`jt-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("bg","16:9","A textured acid mustard-yellow washi-paper backdrop with faint grunge marks, ink splatter and torn-paper collage edges, minimal. Backdrop only, no figure, no people, no circle, no text, no letters."));
  jobs.push(gen("figure","2:3",`EXACTLY ONE tattooed young woman kneeling on one knee in a confident pose, extensive traditional Japanese irezumi tattoos (koi, dragon, peony) covering her arms and thighs, cropped hoodie and pleated skirt, isolated and centered on a plain flat neutral grey studio background with wide margin. ONLY ONE person, no duplicate, no reflection, no second figure. ${PAL}`));
  jobs.push(gen("brush","1:1",`A single bold black sumi-ink brushstroke calligraphy mark, expressive rough dry-brush texture, on a plain flat pure white background, centered with wide margin. No readable text, abstract single kanji-like stroke.`));
  const [ , figPath, brPath] = await Promise.all(jobs);
  for(const [p,nm] of [[figPath,"figure-cut"],[brPath,"brush-cut"]] as [string,string][]){
    try{ const u=await higsRemoveBackground(p, `jt-${nm}-${Date.now().toString(36)}`, F); await higsDownload(u, join(DIR,`${nm}.png`)); console.log("cut",nm); }
    catch(e){ console.log("cut-fail",nm,String(e).slice(-50)); }
  }
  console.log("anim-jptattoo done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
