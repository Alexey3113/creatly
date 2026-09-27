import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","dance"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="High-contrast monochrome charcoal and off-white, a single dramatic hard spotlight, deep shadows, subtle film grain, energetic and cinematic. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`dn-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("bg","16:9",`A dark empty dance studio at night, a single hard spotlight pool on a worn wooden floor, faint mirror wall, deep shadows, atmospheric haze. Environment only, no dancer, no people. ${PAL}`));
  jobs.push(gen("dancer","2:3",`EXACTLY ONE contemporary dancer captured mid-movement in a dynamic expressive leap-and-extension pose, flowing fabric, athletic, a subtle hint of motion, isolated and centered on a plain flat neutral grey studio background with wide margin. ONLY ONE dancer, no duplicate, no reflection, no second figure. ${PAL}`));
  const [ , dPath] = await Promise.all(jobs);
  try{ const u=await higsRemoveBackground(dPath, `dn-dancercut-${Date.now().toString(36)}`, F); await higsDownload(u, join(DIR,"dancer-cut.png")); console.log("cut dancer"); }
  catch(e){ console.log("cut-fail",String(e).slice(-50)); }
  console.log("anim-dance done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
