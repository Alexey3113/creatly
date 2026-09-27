import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","anime"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`an-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("bg","16:9","A textured cream and soft-pink collectible magazine cover paper background, subtle halftone grain and a faint scattered sakura-petal pattern, minimal and clean. Environment/backdrop only, no character, no people, no text, no letters, no barcode, no logo."));
  jobs.push(gen("hero","2:3","EXACTLY ONE full-body anime character: a cool confident young heroine with vivid pink hair, wearing a modern streetwear-meets-traditional Japanese outfit with sakura motifs, dynamic hero pose, crisp cel-shaded anime illustration, vibrant magenta-pink and cream palette, isolated and centered on a plain flat neutral grey background with margin. ONLY ONE character, no duplicate, no reflection, no second figure. No text, no logo, no watermark."));
  jobs.push(gen("petals","1:1","A small branch of pink cherry blossoms with a few loose falling petals, crisp cel-shaded anime illustration style, vibrant pink, on a plain flat dark charcoal background, centered with wide margin. No text, no watermark."));
  const [ , heroPath, petalPath] = await Promise.all(jobs);
  for(const [p,nm] of [[heroPath,"hero-cut"],[petalPath,"petals-cut"]] as [string,string][]){
    try{ const u=await higsRemoveBackground(p, `an-${nm}-${Date.now().toString(36)}`, F); await higsDownload(u, join(DIR,`${nm}.png`)); console.log("cut",nm); }
    catch(e){ console.log("cut-fail",nm,String(e).slice(-50)); }
  }
  console.log("anim-anime done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
