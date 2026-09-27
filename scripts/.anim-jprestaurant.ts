import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","jprestaurant"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Refined minimal Japanese omakase palette, sumi charcoal black, warm hinoki cedar wood and pale washi cream, a soft amber lantern glow, quiet negative space, subtle grain, elegant and serene. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`jr-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("bg","16:9",`An intimate high-end Japanese omakase sushi counter at night, smooth hinoki cedar wood counter, dark sumi walls, a single warm paper lantern, quiet and minimal, empty. Environment only, no people, no food, no text. ${PAL}`));
  jobs.push(gen("chef","2:3",`EXACTLY ONE dignified Japanese itamae sushi master standing behind the counter in a clean indigo and white chef's outfit with a folded headband, calm focused expression, hands preparing, full length, isolated and centered on a plain flat neutral grey studio background with generous margin. ONLY ONE person, no duplicate, no reflection, no second figure. ${PAL}`));
  jobs.push(gen("dish","1:1",`A single exquisite piece of nigiri sushi on a dark slate plate, top-down macro, glistening, minimal, isolated on a plain flat white background with wide margin. ONLY ONE piece, no text. ${PAL}`));
  const [ , cPath] = await Promise.all(jobs);
  try{ const u=await higsRemoveBackground(cPath, `jr-chefcut-${Date.now().toString(36)}`, F); await higsDownload(u, join(DIR,"chef-cut.png")); console.log("cut chef"); }
  catch(e){ console.log("cut-fail",String(e).slice(-40)); }
  console.log("anim-jprestaurant done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
