import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","redsuit"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Deep crimson oxblood-red palette with cream-white accents, dramatic luxurious editorial light, subtle film grain, moody and rich. No text, no letters, no watermark.";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`rs-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const jobs:Promise<any>[]=[];
  jobs.push(gen("bg","16:9",`A deep crimson oxblood-red textured backdrop, rich fabric weave and subtle paper grain, soft dark vignette at the edges, luxurious and moody, evenly lit centre. Backdrop only, no figure, no people, no clothes. ${PAL}`));
  jobs.push(gen("man","2:3",`EXACTLY ONE man wearing a sharp deep crimson-red pinstripe three-piece tailored suit, confident powerful stance with both hands in trouser pockets, elegant and imposing, dramatic studio rim light, face partly in shadow under the brow, isolated and centered on a plain flat neutral grey studio background with wide margin. ONLY ONE man, no duplicate, no reflection, no second figure. Premium menswear editorial photography. No text, no logo.`));
  const [ , manPath] = await Promise.all(jobs);
  try{ const u=await higsRemoveBackground(manPath, `rs-mancut-${Date.now().toString(36)}`, F); await higsDownload(u, join(DIR,"man-cut.png")); console.log("cut man"); }
  catch(e){ console.log("cut-fail",String(e).slice(-50)); }
  console.log("anim-redsuit done");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
