import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","clothing"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`ac-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  // 1) glass periwinkle bg (no subject, no text)
  jobs.push(gen("bg","16:9","A full-bleed abstract background of frosted ribbed glass with soft chromatic refraction, periwinkle lavender monochrome, gentle vertical glass distortion streaks, dreamy premium fashion editorial backdrop, soft even studio light. No subject, no people, no text, no letters. Clean and minimal."));
  // 2) model for cutout (clean bg → remove-bg)
  jobs.push(gen("model","2:3","A high-fashion editorial full-body photograph of a woman in a sleek glossy white futuristic bodysuit and small mirrored sunglasses, elegant confident contrapposto pose, hand near face, isolated on a plain seamless light-grey studio backdrop, sharp premium fashion photography, soft cinematic light. No text, no watermark."));
  // 3) glass decor object (translucent bolt/shard, plain bg → remove-bg)
  jobs.push(gen("shard","1:1","A single translucent frosted-glass lightning-bolt sculpture, periwinkle lavender tint, soft internal refraction and caustics, floating on a plain flat light-grey background, product render, soft studio light. No text."));
  const [ , modelPath, shardPath] = await Promise.all(jobs);
  // cutouts (transparent PNG)
  for(const [p,nm] of [[modelPath,"model-cut"],[shardPath,"shard-cut"]] as [string,string][]){
    try{ const u=await higsRemoveBackground(p, `ac-${nm}-${Date.now().toString(36)}`, F); await higsDownload(u, join(DIR,`${nm}.png`)); console.log("cut",nm); }
    catch(e){ console.log("cut-fail",nm,String(e).slice(-50)); }
  }
  console.log("anim-clothing done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
