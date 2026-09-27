import { join } from "path"; import { existsSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","womensuit");
const PIN = join(process.cwd(),"analitic","pins","womensuit.jpg");
const F="visual-hooks";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"1k",folder:F,jobId:`wss-${name}-${Date.now().toString(36)}`,prompt,refFrames:[PIN]});
  await higsDownload(u,out); console.log("ok",name); return out;
}
async function cut(src:string,outname:string){
  const out=join(DIR,`${outname}.png`); if(existsSync(out)){console.log("skip-cut",outname);return;}
  try{ const u=await higsRemoveBackground(src,`wss-cut-${outname}-${Date.now().toString(36)}`,F); await higsDownload(u,out); console.log("cut",outname);}
  catch(e){console.log("cut-fail",outname,String(e).slice(-50));}
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  // S2 THE CUT — ателье
  await gen("atelierbg","16:9","A refined bespoke tailoring atelier interior, deep oxblood-red walls and warm ivory tones, a tailor's dress-form mannequin, bolts of fine wool cloth on a table, a tall mirror, warm directional window light and long soft shadows, cinematic and editorial, empty foreground centre, no people, no text. Red, paper and black palette, high contrast.");
  // S2 передний план — булавки/мел/нить
  await gen("pinsfg","16:9","Sewing pins, a piece of tailor's chalk, a threaded needle and loose red thread scattered, isolated on a plain solid black background, sharp macro detail, arranged along the bottom and side edges as a foreground overlay. No text.");
  // S6 TO YOUR MEASURE — ножницы + рулетка
  const sc=await gen("shearsobj","2:3","A pair of vintage tailor's shears and a rolled cloth tape-measure resting at an angle on a dark surface, warm directional light catching worn steel and chrome, dramatic shadow. Isolated on a plain solid black background with generous margin for a clean cutout. No text, no logos.");
  await cut(sc,"shearsobj-cut");
  console.log("WS-SCENES DONE");
})().catch(e=>{console.error("FAIL",String(e).slice(-160));process.exit(1);});
