import { join } from "path"; import { existsSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","anime");
const PIN = join(process.cwd(),"analitic","pins","anime.jpg");
const F="visual-hooks";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"1k",folder:F,jobId:`ans-${name}-${Date.now().toString(36)}`,prompt,refFrames:[PIN]});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  await gen("actionbg","16:9","A shonen manga action background: dynamic radial speed-lines and motion streaks, soft cream and hot-pink duotone with halftone dots, cherry-blossom petals flying across, high-energy, empty centre, no readable text.");
  await gen("skybg","16:9","A soft anime sky at dusk with cherry-blossom branches and drifting petals, pastel cream-pink and rose tones, gentle bokeh, dreamy cel-shaded illustration, empty foreground, no readable text.");
  console.log("AN-SCENES DONE");
})().catch(e=>{console.error("FAIL",String(e).slice(-160));process.exit(1);});
