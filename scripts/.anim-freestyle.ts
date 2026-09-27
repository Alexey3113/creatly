import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","freestyle"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="High-energy nocturnal skate palette, near-black concrete and deep shadow with a hard white key light and cold blue rim, crisp and punchy, subtle motion, film grain. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`fs-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("bg","16:9",`A gritty urban skate plaza at night, wet concrete ledges and stairs, harsh overhead floodlight and long shadows, empty. Environment only, no people, no skateboard, no text. ${PAL}`));
  jobs.push(gen("skater","2:3",`EXACTLY ONE skateboarder frozen mid-air in a dynamic kickflip, board flipping beneath the feet, arms out for balance, streetwear, dramatic action, isolated and centered on a plain flat neutral grey studio background with generous margin. ONLY ONE person, no duplicate, no reflection, no second figure. ${PAL}`));
  const [ , sPath] = await Promise.all(jobs);
  try{ const u=await higsRemoveBackground(sPath, `fs-skatercut-${Date.now().toString(36)}`, F); await higsDownload(u, join(DIR,"skater-cut.png")); console.log("cut skater"); }
  catch(e){ console.log("cut-fail",String(e).slice(-40)); }
  console.log("anim-freestyle done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
