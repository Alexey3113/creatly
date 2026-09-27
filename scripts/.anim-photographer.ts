import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","photographer"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Warm cinematic golden-hour palette, soft natural light, muted graphite and bone tones with a burnt-orange warmth, gentle film grain, editorial and understated. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`ph-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("bg","16:9",`A wide open coastal cliff meadow at golden hour, tall dry grass, soft haze and distant sea horizon, warm low sun, empty landscape. Environment only, no people, no text. ${PAL}`));
  jobs.push(gen("photog","2:3",`EXACTLY ONE on-location photographer raising a professional camera to their eye, composing a shot, wearing a simple field jacket, calm and focused, isolated and centered on a plain flat neutral grey studio background with generous margin. ONLY ONE person, no duplicate, no reflection, no second figure. ${PAL}`));
  jobs.push(gen("shot1","2:3",`An editorial portrait photograph of a woman looking away, soft window light, shallow depth of field, film look. Fills the frame. ${PAL}`));
  jobs.push(gen("shot2","3:2",`An editorial landscape photograph of misty rolling hills at dawn, minimal and atmospheric, film look. Fills the frame. ${PAL}`));
  jobs.push(gen("shot3","1:1",`An editorial detail photograph of hands holding a ceramic cup, warm light, film look, shallow depth. Fills the frame. ${PAL}`));
  const [ , pPath] = await Promise.all(jobs);
  try{ const u=await higsRemoveBackground(pPath, `ph-photogcut-${Date.now().toString(36)}`, F); await higsDownload(u, join(DIR,"photog-cut.png")); console.log("cut photog"); }
  catch(e){ console.log("cut-fail",String(e).slice(-40)); }
  console.log("anim-photographer done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
