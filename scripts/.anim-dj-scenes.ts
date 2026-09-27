import { join } from "path"; import { existsSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","dj");
const PIN = join(process.cwd(),"analitic","pins","djconcert.jpg");
const F="visual-hooks";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"1k",folder:F,jobId:`djs-${name}-${Date.now().toString(36)}`,prompt,refFrames:[PIN]});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  await gen("stagebg","16:9","A dramatic dark concert stage engulfed in orange fire and flying sparks, a silhouetted DJ booth, thick smoke and rising embers, harsh fire-orange light against near-black, grunge film texture, empty foreground centre, cinematic, no people, no text.");
  await gen("oilbg","16:9","A dark iridescent oil-slick texture background, near-black with rainbow petrol sheen and scattered orange embers, heavy grunge film grain, moody abstract, empty, no subject, no readable text.");
  console.log("DJ-SCENES DONE");
})().catch(e=>{console.error("FAIL",String(e).slice(-160));process.exit(1);});
