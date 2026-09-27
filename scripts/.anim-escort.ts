import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","escort"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Refined glamorous evening palette of deep emerald green, warm antique gold and midnight noir, soft cinematic low light, elegant and discreet, subtle grain. Tasteful, dignified, upscale. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`es-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("bg","16:9",`An upscale private members' lounge at night, emerald velvet and dark walnut, warm golden lamplight and soft city bokeh through a window, empty, refined and discreet. Environment only, no people, no text. ${PAL}`));
  jobs.push(gen("figure","2:3",`EXACTLY ONE elegant, dignified woman in a floor-length refined black evening gown, poised and composed, holding a small clutch, full length, tasteful and modest, isolated and centered on a plain flat neutral grey studio background with generous margin. ONLY ONE person, no duplicate, no reflection, no second figure. ${PAL}`));
  const [ , fPath] = await Promise.all(jobs);
  try{ const u=await higsRemoveBackground(fPath, `es-figcut-${Date.now().toString(36)}`, F); await higsDownload(u, join(DIR,"figure-cut.png")); console.log("cut figure"); }
  catch(e){ console.log("cut-fail",String(e).slice(-40)); }
  console.log("anim-escort done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
