import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","porsche"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Cinematic dark magenta and lavender palette, moody pink-purple light, glossy silver reflections, dramatic and elegant, film grain. No text, no letters, no watermark, no badges, no logos.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"1k",folder:F,jobId:`prg-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("g1","3:2",`A silver classic rear-engine sports coupe rear three-quarter in moody magenta studio light, glossy, dramatic. ${PAL}`));
  jobs.push(gen("g2","1:1",`Macro of a polished silver five-spoke wheel and low-profile tyre under magenta light, glossy reflections. ${PAL}`));
  jobs.push(gen("g3","2:3",`A minimalist classic sports car cockpit with a round gauge cluster, magenta ambient light, elegant. ${PAL}`));
  jobs.push(gen("g4","3:2",`A silver sports coupe on a coastal mountain road at dusk under a magenta-lavender sky, cinematic wide. ${PAL}`));
  jobs.push(gen("g5","1:1",`Macro of a round headlight and curved silver fender of a classic coupe, magenta reflections, glossy. ${PAL}`));
  await Promise.all(jobs);
  console.log("anim-porsche-gallery done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
