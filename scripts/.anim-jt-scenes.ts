import { join } from "path"; import { existsSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","jptattoo");
const PIN = join(process.cwd(),"analitic","pins","jptattoo.jpg");
const F="visual-hooks";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"1k",folder:F,jobId:`jts-${name}-${Date.now().toString(36)}`,prompt,refFrames:[PIN]});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  await gen("wavebg","16:9","A bold ukiyo-e woodblock great-wave illustration in mustard-yellow, vermillion-red and sumi-black on aged textured paper, halftone and ink grain, high-contrast graphic poster style, empty foreground, no readable text.");
  await gen("irezumibg","16:9","A moody macro of a traditional Japanese irezumi tattoo — a coiled dragon and peony rendered in vermillion, mustard-yellow and sumi-black ink on skin, bold ukiyo-e line-work, halftone, high-contrast, dark background, no readable text.");
  console.log("JT-SCENES DONE");
})().catch(e=>{console.error("FAIL",String(e).slice(-160));process.exit(1);});
