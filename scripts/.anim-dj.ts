import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","dj"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Fire-orange and ember tones over deep oil-slick teal-black, grungy distressed texture, cinematic dark-fantasy, heavy film grain, dramatic high contrast. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`dj-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("bg","16:9",`A grungy dark concert backdrop, a fiery burnt-orange glow at the top dissolving into deep dark oil-slick teal-black at the bottom, heavy distressed grain and scratched texture, smoke and haze, dramatic and moody. Environment only, no figure, no people. ${PAL}`));
  jobs.push(gen("angel","2:3",`EXACTLY ONE dramatic winged deity: a dark muscular fallen-angel figure standing, huge feathered wings spread wide, a thin glowing halo ring above the bowed head, ember-orange rim light from below, ashen cracked skin, cinematic dark-fantasy 3D render, isolated and centered on a plain flat dark charcoal background with wide margin. ONLY ONE figure, no duplicate, no reflection, no second figure. No text, no logo.`));
  jobs.push(gen("embers","1:1",`Glowing fire embers, sparks and drifting ash rising upward, bright orange, on a plain flat pure black background, scattered across the frame. No text, no watermark.`));
  const [ , angPath, embPath] = await Promise.all(jobs);
  for(const [p,nm] of [[angPath,"angel-cut"],[embPath,"embers-cut"]] as [string,string][]){
    try{ const u=await higsRemoveBackground(p, `dj-${nm}-${Date.now().toString(36)}`, F); await higsDownload(u, join(DIR,`${nm}.png`)); console.log("cut",nm); }
    catch(e){ console.log("cut-fail",nm,String(e).slice(-50)); }
  }
  console.log("anim-dj done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
