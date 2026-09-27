import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","folkmusic"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PIN = join(process.cwd(),"analitic","pins","folkmusic.jpg");
async function gen(name:string,aspect:string,prompt:string,ref?:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"1k",folder:F,jobId:`fkp-${name}-${Date.now().toString(36)}`,prompt,refFrames:ref?[ref]:undefined});
  await higsDownload(u,out); console.log("ok",name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  // ФИГУРА как в пине: безликая (лицо — чёрная пустота), венок из ромашек, длинные серебристые волосы, белая драпировка. Холодный десат. На плоском светло-сером фоне для вырезки.
  const fig = await gen("figure2","2:3",
    "Editorial poster portrait matching the reference art direction. EXACTLY ONE young woman standing frontally, her face a smooth solid matte-black void with no features at all, long straight silver-grey hair falling past the shoulders, an ornate crown of white daisies and dried wildflowers around her head, wearing a simple draped off-white linen robe. Cold desaturated grey tones, hard editorial light, high contrast, film grain. Isolated and centered on a plain flat light-grey studio background with generous margin. No text, no letters, no poster layout, no red circle, just the figure.",
    PIN);
  try{ const u=await higsRemoveBackground(fig, `fkp-figcut-${Date.now().toString(36)}`, F); await higsDownload(u, join(DIR,"figure2-cut.png")); console.log("cut figure2"); }
  catch(e){ console.log("cut-fail",String(e).slice(-40)); }
  // ХОЛОДНАЯ БУМАГА/СТЕНА: серый гранж, ризо-текстура, печатные марки, без сюжета.
  await gen("paper","16:9",
    "A cold desaturated light-grey textured risograph paper background, subtle concrete grain, faint printing registration marks and dust, empty, flat, no subject, no text, minimal, high-key grey.",
    PIN);
  console.log("folk-poster done");
})().catch(e=>{console.error("FAIL",String(e).slice(-140));process.exit(1);});
