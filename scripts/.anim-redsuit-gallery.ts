import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","redsuit"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Opulent deep crimson palette, oxblood and scarlet, rich red wool and velvet, dramatic directional light, luxurious and bold, subtle grain. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"1k",folder:F,jobId:`rdg-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("g1","2:3",`Editorial full-length of a man in a bold scarlet double-breasted suit, confident, dramatic red-lit studio, film look. ${PAL}`));
  jobs.push(gen("g2","1:1",`Macro of a crimson peak lapel with a silk boutonniere and a single horn button, rich wool, studio. ${PAL}`));
  jobs.push(gen("g3","3:2",`A rail of tailored red and oxblood suits in a dark luxurious atelier, dramatic light. ${PAL}`));
  jobs.push(gen("g4","2:3",`Editorial back view of a man in a sharply tailored oxblood suit showing shoulder line, red-lit studio. ${PAL}`));
  jobs.push(gen("g5","1:1",`A flatlay of crimson suiting cloth, a silk tie and oxblood leather shoes on a dark surface, luxe still life. ${PAL}`));
  await Promise.all(jobs);
  console.log("anim-redsuit-gallery done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
