import { join } from "path"; import { existsSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","cardealer");
const PIN = join(process.cwd(),"analitic","pins","cardealer.jpg");
const F="visual-hooks";
async function gen(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"1k",folder:F,jobId:`cds-${name}-${Date.now().toString(36)}`,prompt,refFrames:[PIN]});
  await higsDownload(u,out); console.log("ok",name); return out;
}
async function cut(src:string,outname:string){
  const out=join(DIR,`${outname}.png`); if(existsSync(out)){console.log("skip-cut",outname);return;}
  try{ const u=await higsRemoveBackground(src,`cds-cut-${outname}-${Date.now().toString(36)}`,F); await higsDownload(u,out); console.log("cut",outname);}
  catch(e){console.log("cut-fail",outname,String(e).slice(-50));}
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  // S2 THE HUNT
  await gen("garagedusk","16:9","A dark moody private garage interior at dusk, matching the aubergine-and-pink cinematic art direction of the reference. Bare concrete and brick, a single roll-up door open to a twilight cherry-blossom garden spilling soft pink light across the floor, deep shadows, an empty bay in the center, atmospheric haze. Near-black with pink rim light, luxurious, no car, no people, no text.");
  const sheet=await gen("dustsheet","16:9","A classic sports car fully draped under a soft off-white dust cover car sheet, only the sculpted silhouette of the body visible under the cloth, sitting isolated, dramatic side rim-light, deep shadow beneath. Cinematic and moody. Isolated on a plain solid black background with generous margin all around for a clean cutout. No text, no logos.");
  await cut(sheet,"dustsheet-cut");
  const branch=await gen("blossomfg","16:9","A single dark cherry-blossom tree branch heavy with glowing pink and magenta blossoms, crisp and sharp, isolated on a plain solid black background, dramatic lighting, arranged along the top and one side as a foreground overlay element. No text.");
  await cut(branch,"blossomfg-cut");
  // S4 THE COLLECTION
  await gen("showroom","16:9","A moody luxury classic-car showroom at night matching the aubergine-and-pink art direction, polished dark concrete floor with pink and violet spotlights pooling on the ground, dark brick walls, deep shadows, an empty staged floor, cinematic, near-black with magenta accents. No cars, no people, no text.");
  const car2=await gen("car2","16:9","A pristine silver nineteen-sixties classic sports roadster, three-quarter rear view, chrome wire wheels, top down, dramatic cool studio rim-light. Isolated on a plain solid black background with generous margin for a clean cutout. No text, no logos.");
  await cut(car2,"car2-cut");
  const car3=await gen("car3","16:9","A fully restored cream-and-chrome nineteen-fifties classic grand-tourer coupe, three-quarter front view, whitewall tyres, warm dramatic rim-light. Isolated on a plain solid black background with generous margin for a clean cutout. No text, no logos.");
  await cut(car3,"car3-cut");
  // S5 THE DRIVE
  await gen("roaddusk","16:9","A wet reflective mountain road at dusk lined with glowing pink cherry-blossom trees, matching the aubergine-and-pink cinematic art direction, soft motion-blurred blossom petals drifting, deep twilight sky, an empty road curving away into bokeh. Cinematic, near-black with pink accents. No car, no people, no text.");
  console.log("CD-SCENES DONE");
})().catch(e=>{console.error("FAIL",String(e).slice(-160));process.exit(1);});
