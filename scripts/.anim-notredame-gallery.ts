import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","notredame"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Gothic cathedral palette, deep indigo-blue and antique gold, stained-glass glow, dramatic god-rays and stone, cinematic and reverent, film grain. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"1k",folder:F,jobId:`ndg-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("g1","1:1",`A gothic cathedral rose window of blue and gold stained glass glowing, symmetrical, dramatic. ${PAL}`));
  jobs.push(gen("g2","2:3",`The soaring gothic nave interior of a cathedral with god-rays through stained glass, indigo and gold. ${PAL}`));
  jobs.push(gen("g3","2:3",`A stone gargoyle chimera perched over a misty city at dusk, gothic, indigo sky. ${PAL}`));
  jobs.push(gen("g4","3:2",`A gothic cathedral facade and spire against a deep indigo dusk sky, golden uplight, cinematic wide. ${PAL}`));
  jobs.push(gen("g5","3:2",`Gothic flying buttresses and carved stone detail in golden evening light against indigo sky. ${PAL}`));
  await Promise.all(jobs);
  console.log("anim-notredame-gallery done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
