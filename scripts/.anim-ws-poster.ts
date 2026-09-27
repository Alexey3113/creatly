import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","womensuit"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks"; const PIN = join(process.cwd(),"analitic","pins","womensuit.jpg");
async function gen(name:string,aspect:string,prompt:string,ref?:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"1k",folder:F,jobId:`wsp-${name}-${Date.now().toString(36)}`,prompt,refFrames:ref?[ref]:undefined});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const fig = await gen("figv","3:4",
    "Editorial fashion magazine-cover portrait matching the reference art direction and attitude. EXACTLY ONE confident young woman in an oversized black tailored suit jacket over a crisp white shirt and a loose black tie, lighting a cigarette with a lit match held up, cool defiant half-lidded expression, slim rimless glasses, high-contrast editorial studio light, cinematic grain. Isolated and centered on a plain flat neutral mid-grey studio background with generous margin. ONLY ONE person, no text, no letters, no logo.",
    PIN);
  try{ const u=await higsRemoveBackground(fig, `wsp-figc-${Date.now().toString(36)}`, F); await higsDownload(u, join(DIR,"figv-cut.png")); console.log("cut figv"); }
  catch(e){ console.log("cut-fail",String(e).slice(-40)); }
  await gen("redwall","3:4","A deep blood-red seamless studio paper background, subtle vignette and film grain, flat, empty, no subject, no text, editorial fashion cover backdrop.", PIN);
  console.log("ws-poster done");
})().catch(e=>{console.error("FAIL",String(e).slice(-140));process.exit(1);});
