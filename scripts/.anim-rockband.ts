import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","rockband"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="High-contrast gritty rock-club palette, deep black, harsh electric red stage light and haze, raw concrete, hard rim light, heavy film grain, energetic and raw. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`rk-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("bg","16:9",`A gritty underground rock club stage at night, raw concrete and brick walls, stacked amplifiers and cables, thick smoke pierced by harsh red stage lights, empty stage. Environment only, no people, no text. ${PAL}`));
  jobs.push(gen("singer","2:3",`EXACTLY ONE male rock singer gripping a microphone stand, leaning back mid-scream with raw energy, wearing a black leather jacket, sweat and grit, isolated and centered on a plain flat neutral grey studio background with generous margin. ONLY ONE person, no duplicate, no reflection, no second figure. ${PAL}`));
  jobs.push(gen("guitar","1:1",`EXACTLY ONE worn electric guitar, battered sunburst body, hovering at a dynamic diagonal angle, isolated on a plain flat white background with wide margin. ONLY ONE guitar, no duplicate, no text. ${PAL}`));
  const [ , sPath, gPath] = await Promise.all(jobs);
  for(const [p,nm,tag] of [[sPath,"singer-cut","rk-singercut"],[gPath,"guitar-cut","rk-guitarcut"]] as const){
    try{ const u=await higsRemoveBackground(p, `${tag}-${Date.now().toString(36)}`, F); await higsDownload(u, join(DIR,`${nm}.png`)); console.log("cut",nm); }
    catch(e){ console.log("cut-fail",nm,String(e).slice(-40)); }
  }
  console.log("anim-rockband done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
