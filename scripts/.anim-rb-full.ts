import { join } from "path"; import { existsSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","rockband");
const PIN = join(process.cwd(),"analitic","pins","rockband.jpg");
const F="visual-hooks";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"1k",folder:F,jobId:`rbf-${name}-${Date.now().toString(36)}`,prompt,refFrames:[PIN]});
  await higsDownload(u,out); console.log("ok",name); return out;
}
async function cut(src:string,outname:string){
  const out=join(DIR,`${outname}.png`); if(existsSync(out)){console.log("skip-cut",outname);return;}
  try{ const u=await higsRemoveBackground(src,`rbf-cut-${outname}-${Date.now().toString(36)}`,F); await higsDownload(u,out); console.log("cut",outname);}
  catch(e){console.log("cut-fail",outname,String(e).slice(-50));}
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  // HERO — обёрнутый рогатый фронтмен (уровень пина DEMON/SYSTEM)
  const wf=await gen("wrapfig","2:3","A rock band frontman shown from the chest up, head and face entirely wrapped in strips of red printed caution-tape and bandage, two dark twisted horns rising from the head, bare shoulders, monochrome grey skin with red tape accents, industrial, menacing and high-contrast. Isolated on a plain solid black background with generous margin for a clean cutout. No readable text.");
  await cut(wf,"wrapfig-cut");
  // HERO bg — красная техно-сетка
  await gen("redgrid","16:9","A dark technical poster background: deep oxblood-red with a faint blueprint grid, halftone dot texture, subtle glitch scan-lines and registration marks, industrial and empty, no subject, no readable text. High contrast red and black.");
  // S2 THE PIT — толпа
  await gen("pitbg","16:9","A dark live rock concert crowd seen from the stage — a sea of silhouetted raised hands and heads in thick haze, harsh red and white stage backlight, motion blur, high-contrast monochrome with red light. No readable text.");
  await gen("handsfg","16:9","Silhouetted raised hands and arms reaching upward, isolated on a plain solid black background, high-contrast, arranged along the bottom edge as a foreground overlay. No text.");
  // S6 GET TICKETS — рваный билет-стаб
  const ts=await gen("stubobj","2:3","A torn rock concert ticket stub, worn cream paper with a red printed edge, a barcode and perforated tear, resting at an angle, dramatic hard light. Isolated on a plain solid black background with generous margin for a clean cutout. No readable text.");
  await cut(ts,"stubobj-cut");
  console.log("RB-FULL DONE");
})().catch(e=>{console.error("FAIL",String(e).slice(-160));process.exit(1);});
