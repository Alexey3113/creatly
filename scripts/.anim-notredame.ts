import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","notredame"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Deep indigo midnight-blue and warm golden stone, stained-glass accents, gothic, cinematic blue-hour twilight, subtle film grain, majestic and reverent. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`nd-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("bg","16:9",`A deep indigo midnight-blue gothic stone textured backdrop, faint carved stone relief and a soft dark vignette, moody and minimal. Backdrop only, no cathedral, no building, no people. ${PAL}`));
  jobs.push(gen("cathedral","16:9",`The Notre-Dame de Paris gothic cathedral west facade with twin bell towers and a great circular rose window, symmetrical, dramatic blue-hour twilight, deep indigo sky above warm golden illuminated stone, cinematic and majestic, no people. ${PAL}`));
  jobs.push(gen("rose","1:1",`A single circular gothic stained-glass rose window, intricate stone tracery, glowing deep-blue, gold and ruby-red glass, on a plain flat pure black background, centered with wide margin. No text, no watermark.`));
  const [ , , rosePath] = await Promise.all(jobs);
  try{ const u=await higsRemoveBackground(rosePath, `nd-rosecut-${Date.now().toString(36)}`, F); await higsDownload(u, join(DIR,"rose-cut.png")); console.log("cut rose"); }
  catch(e){ console.log("cut-fail",String(e).slice(-50)); }
  console.log("anim-notredame done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
