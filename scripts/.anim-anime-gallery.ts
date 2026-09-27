import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","anime"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Anime cel-shaded illustration, soft cream and pink palette, cherry blossoms, dreamy editorial cover art style, clean linework. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"1k",folder:F,jobId:`amg-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("g1","2:3",`Anime cel-shaded portrait of a girl with flowing hair among cherry blossoms, soft pink, magazine cover art. ${PAL}`));
  jobs.push(gen("g2","3:2",`Anime illustration of a dreamy pastel city street at dusk with cherry blossoms, cel-shaded. ${PAL}`));
  jobs.push(gen("g3","2:3",`Anime action illustration of a character mid-leap with a flowing ribbon, dynamic, pink palette, cel-shaded. ${PAL}`));
  jobs.push(gen("g4","1:1",`Close-up anime illustration of a cherry blossom branch against a soft pink sky, cel-shaded. ${PAL}`));
  jobs.push(gen("g5","1:1",`Anime illustration of two friends sharing sweets at a summer festival, warm pink lanterns, cel-shaded. ${PAL}`));
  await Promise.all(jobs);
  console.log("anim-anime-gallery done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
