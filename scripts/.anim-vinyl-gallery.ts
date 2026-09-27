import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","vinyl"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Dark after-hours sepia-amber palette, warm low tungsten light, deep shadow, glossy highlights, vintage and moody, film grain. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`vng-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("g1","1:1",`Macro of a stylus needle riding a spinning vinyl record groove, warm amber highlight, shallow depth. ${PAL}`));
  jobs.push(gen("g2","2:3",`A person browsing wooden crates of records in a dim after-hours record shop, warm light from behind. ${PAL}`));
  jobs.push(gen("g3","3:2",`An intimate listening lounge with a hi-fi system, leather chairs and warm lamplight at night, empty. ${PAL}`));
  jobs.push(gen("g4","1:1",`A stack of worn vinyl LP sleeves on a wooden table, warm light, moody still life. ${PAL}`));
  jobs.push(gen("g5","3:2",`Hands sliding a black vinyl record from its sleeve under warm amber light, close-up. ${PAL}`));
  await Promise.all(jobs);
  console.log("anim-vinyl-gallery done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
