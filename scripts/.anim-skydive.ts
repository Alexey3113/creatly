import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","skydive"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Desaturated teal-grey-green, misty, cinematic, high-altitude, deep atmospheric fog, subtle film grain, muted and minimal. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`sk-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("sky","16:9",`A vast atmospheric high-altitude sky, soft luminous gradient, drifting layered haze and clouds far below. Environment only, no people, no aircraft. ${PAL}`));
  jobs.push(gen("mountains","16:9",`A surreal range of jagged snow-dusted mountain peaks rising through deep fog, layered atmospheric depth, cinematic and minimal, no people. ${PAL}`));
  jobs.push(gen("figure","1:1",`One tiny human skydiver in free-fall, arms and legs spread in a stable belly-to-earth position, seen from a great distance as a small dark silhouette, on a plain flat neutral light-grey background, sharp, centered with wide empty margin. No parachute, no text.`));
  const [ , , figPath] = await Promise.all(jobs);
  try{ const u=await higsRemoveBackground(figPath, `sk-figcut-${Date.now().toString(36)}`, F); await higsDownload(u, join(DIR,"figure-cut.png")); console.log("cut figure"); }
  catch(e){ console.log("cut-fail",String(e).slice(-50)); }
  console.log("anim-skydive done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
