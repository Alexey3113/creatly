import { join } from "path"; import { existsSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","escort");
const F="visual-hooks";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"1k",folder:F,jobId:`ess-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",name); return out;
}
async function cut(src:string,outname:string){
  const out=join(DIR,`${outname}.png`); if(existsSync(out)){console.log("skip-cut",outname);return;}
  try{ const u=await higsRemoveBackground(src,`ess-cut-${outname}-${Date.now().toString(36)}`,F); await higsDownload(u,out); console.log("cut",outname);}
  catch(e){console.log("cut-fail",outname,String(e).slice(-50));}
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  // S2 THE ROOM — бальный зал + люстры-боке + пара силуэтом
  await gen("ballroombg","16:9","A grand opulent ballroom interior at night, deep emerald-green walls with gilded panelling, warm golden chandeliers, polished dark marble floor, soft atmospheric haze, dramatic low-key cinematic lighting, empty, luxurious, no people, no text. Emerald-noir and gold palette, high contrast.");
  await gen("chandelierfg","16:9","An ornate golden crystal chandelier glowing warmly, plus soft golden bokeh orbs, isolated on a plain solid black background, dramatic, arranged across the top as a foreground overlay element. No text.");
  const couple=await gen("couple","16:9","An elegant well-dressed couple in formal eveningwear seen from behind, walking away together into a grand hall, a woman in a long dark gown and a man in a tuxedo, dignified and tasteful, dramatic warm rim-light on their silhouettes. Isolated on a plain solid black background with generous margin for a clean cutout. No text, no logos.");
  await cut(couple,"couple-cut");
  // S5 IN CONFIDENCE — изумрудный бархат
  await gen("velvetbg","16:9","A deep emerald-green velvet fabric surface with soft folds and warm golden raking light catching the pile, luxurious texture, dark and moody, empty, no text, no subject. Emerald and gold.");
  // S6 NEVER ARRIVE ALONE — золотая печать/приглашение
  const seal=await gen("sealobj","16:9","A cream ivory invitation card with an ornate gold wax seal and gold embossed border, resting at an angle, dramatic warm spotlight, deep emerald shadow. Isolated on a plain solid black background with generous margin for a clean cutout. No readable text, no logos.");
  await cut(seal,"sealobj-cut");
  console.log("ES-SCENES DONE");
})().catch(e=>{console.error("FAIL",String(e).slice(-160));process.exit(1);});
