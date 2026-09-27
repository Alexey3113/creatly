import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","folkmusic"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Warm candle-lit palette of deep claret red, antique gold and pale linen, rich Slavic folk atmosphere, soft warm rim light, subtle film grain, painterly and cinematic. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`fkg-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("g1","3:2",`A Slavic folk ensemble singing together in a candle-lit wooden hall, embroidered costumes, warm glow, documentary. ${PAL}`));
  jobs.push(gen("g2","1:1",`Close-up of hands playing a traditional gusli zither, warm light, shallow depth, folk. ${PAL}`));
  jobs.push(gen("g3","2:3",`A folk singer mid-song eyes closed, embroidered kokoshnik, candlelight, intimate portrait. ${PAL}`));
  jobs.push(gen("g4","3:2",`A village round dance khorovod at dusk in a field, linen dresses, motion, folk celebration. ${PAL}`));
  jobs.push(gen("g5","1:1",`Close-up of a wooden zhaleika folk woodwind and embroidered cloth on a table, warm light. ${PAL}`));
  await Promise.all(jobs);
  console.log("anim-folkmusic-gallery done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
