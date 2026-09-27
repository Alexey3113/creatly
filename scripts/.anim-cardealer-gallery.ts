import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","cardealer"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Heritage luxury showroom palette, deep midnight navy and charcoal with polished chrome and a warm amber glow, cinematic low light, glossy reflections, refined and timeless. No text, no letters, no watermark, no logos, no badges.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"1k",folder:F,jobId:`cdg-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("g1","1:1",`Macro of a chrome wire wheel and whitewall tyre of a restored classic car, amber light, glossy. ${PAL}`));
  jobs.push(gen("g2","3:2",`A restored classic car engine bay, polished chrome and cast alloy, warm amber garage light, detailed. ${PAL}`));
  jobs.push(gen("g3","2:3",`A classic car wood-and-leather interior dashboard with round dials, warm amber light, elegant. ${PAL}`));
  jobs.push(gen("g4","3:2",`A restored classic sports car three-quarter in a dark showroom with amber spotlight, glossy floor. ${PAL}`));
  jobs.push(gen("g5","1:1",`Macro of a chrome bumper and round headlight of a classic car, amber reflections, glossy. ${PAL}`));
  await Promise.all(jobs);
  console.log("anim-cardealer-gallery done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
