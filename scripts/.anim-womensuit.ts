import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","womensuit"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Refined editorial fashion palette of deep aubergine plum, soft blush and warm ivory, elegant directional studio light, subtle grain, luxurious and understated. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`ws-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("bg","16:9",`A minimalist editorial fashion studio, smooth warm plaster wall in deep plum tones, a soft directional light and long shadow, empty. Environment only, no people, no text. ${PAL}`));
  jobs.push(gen("model","2:3",`EXACTLY ONE elegant woman wearing a sharply tailored premium women's suit in deep aubergine, confident editorial pose with one hand in pocket, full length, isolated and centered on a plain flat neutral grey studio background with generous margin. ONLY ONE person, no duplicate, no reflection, no second figure. ${PAL}`));
  jobs.push(gen("swatch1","1:1",`A close-up detail of folded premium aubergine wool suiting fabric with a fine lapel and a single button, soft light, editorial. Fills the frame. ${PAL}`));
  jobs.push(gen("swatch2","1:1",`A close-up detail of an elegant tailored cuff and hand with a minimalist ring, blush and ivory tones, editorial. Fills the frame. ${PAL}`));
  const [ , mPath] = await Promise.all(jobs);
  try{ const u=await higsRemoveBackground(mPath, `ws-modelcut-${Date.now().toString(36)}`, F); await higsDownload(u, join(DIR,"model-cut.png")); console.log("cut model"); }
  catch(e){ console.log("cut-fail",String(e).slice(-40)); }
  console.log("anim-womensuit done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
