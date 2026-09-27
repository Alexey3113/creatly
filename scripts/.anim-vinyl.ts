import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","vinyl"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Dark warm sepia-amber palette with an oxblood-red accent, glossy, cinematic, heavy analog film grain, intimate after-hours mood, moody low tungsten light. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`vn-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("bg","16:9",`A dim intimate late-night vinyl listening bar, out-of-focus warm bokeh of bottles, lamps and record shelves, deep shadows, thick smoky atmosphere. Environment only, no people. ${PAL}`));
  jobs.push(gen("record","1:1",`A single glossy black vinyl record seen straight top-down, concentric grooves catching a warm amber rim of light, a deep red center label with no text, on a plain flat dark charcoal background, centered with wide margin, cinematic product shot. ${PAL}`));
  jobs.push(gen("hand","1:1",`A hand gently lowering a turntable tonearm with its needle toward a record, glossy skin, warm amber rim light, cinematic macro, on a plain flat dark charcoal background, centered with margin. ${PAL}`));
  const [ , recPath, handPath] = await Promise.all(jobs);
  for(const [p,nm] of [[recPath,"record-cut"],[handPath,"hand-cut"]] as [string,string][]){
    try{ const u=await higsRemoveBackground(p, `vn-${nm}-${Date.now().toString(36)}`, F); await higsDownload(u, join(DIR,`${nm}.png`)); console.log("cut",nm); }
    catch(e){ console.log("cut-fail",nm,String(e).slice(-50)); }
  }
  console.log("anim-vinyl done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
