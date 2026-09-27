import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","folkmusic"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Warm candle-lit palette of deep claret red, antique gold and pale linen, rich Slavic folk atmosphere, soft warm rim light, subtle film grain, painterly and cinematic. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`fk-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("bg","16:9",`Interior of a rustic wooden Slavic izba hall at night, dark timber walls, embroidered folk textiles and hanging lanterns, warm candle glow, deep atmospheric shadows, empty stage. Environment only, no people, no instruments in focus, no text. ${PAL}`));
  jobs.push(gen("singer","2:3",`EXACTLY ONE young woman folk singer in an ornately embroidered traditional Russian folk dress and beaded kokoshnik headdress, standing tall and serene, one hand raised expressively, isolated and centered on a plain flat neutral grey studio background with generous margin all around. ONLY ONE person, no duplicate, no reflection, no second figure. ${PAL}`));
  jobs.push(gen("ornament","1:1",`A single ornamental Khokhloma-style golden floral scrollwork motif, curling vines berries and leaves in antique gold and claret red, symmetrical decorative element, on a plain flat white background, isolated with wide margin, no text. ${PAL}`));
  const [ , sPath, oPath] = await Promise.all(jobs);
  for(const [p,nm,tag] of [[sPath,"singer-cut","fk-singercut"],[oPath,"ornament-cut","fk-orncut"]] as const){
    try{ const u=await higsRemoveBackground(p, `${tag}-${Date.now().toString(36)}`, F); await higsDownload(u, join(DIR,`${nm}.png`)); console.log("cut",nm); }
    catch(e){ console.log("cut-fail",nm,String(e).slice(-40)); }
  }
  console.log("anim-folkmusic done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
