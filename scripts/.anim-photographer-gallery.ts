import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","photographer"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Warm cinematic golden-hour palette, soft natural light, muted graphite and bone tones with a burnt-orange warmth, gentle film grain, editorial and understated. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`phg-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("g1","2:3",`Editorial on-location portrait of a man laughing at golden hour in tall grass, backlit, film look, shallow depth. ${PAL}`));
  jobs.push(gen("g2","2:3",`Editorial engagement portrait of a couple embracing on a misty cliff at dawn, tender, film look. ${PAL}`));
  jobs.push(gen("g3","3:2",`Editorial documentary photograph of a family walking a coastal path at sunset, silhouettes, film look. ${PAL}`));
  jobs.push(gen("g4","2:3",`Editorial portrait of a woman in a linen dress by a rain-streaked window, contemplative, film look. ${PAL}`));
  jobs.push(gen("g5","3:2",`Editorial wedding photograph of a first dance in warm string lights, motion and joy, film look. ${PAL}`));
  jobs.push(gen("g6","1:1",`Editorial detail photograph of two hands intertwined with a simple wedding band, warm light, film look. ${PAL}`));
  await Promise.all(jobs);
  console.log("anim-photographer-gallery done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
