import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","jprestaurant"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Refined minimal Japanese omakase palette, sumi charcoal black, warm hinoki cedar wood and pale washi cream, a soft amber lantern glow, quiet negative space, subtle grain, elegant and serene. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`jrg-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("g1","3:2",`Top-down of an assortment of exquisite nigiri sushi on a long dark slate board, glistening, minimal omakase presentation. ${PAL}`));
  jobs.push(gen("g2","1:1",`A plate of precisely arranged sashimi with a shiso leaf and grated wasabi, macro, on ceramic. ${PAL}`));
  jobs.push(gen("g3","2:3",`An itamae's hands searing a piece of sushi with a small torch at the counter, warm glow, close-up. ${PAL}`));
  jobs.push(gen("g4","1:1",`Warm sake being poured into a small ceramic cup on the hinoki counter, steam, close-up. ${PAL}`));
  jobs.push(gen("g5","3:2",`A single elegant place setting on a hinoki counter, chopsticks on a rest, a small ceramic dish, minimal. ${PAL}`));
  await Promise.all(jobs);
  console.log("anim-jprestaurant-gallery done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
