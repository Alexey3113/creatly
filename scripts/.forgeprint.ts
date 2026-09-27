import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","forge-p"); mkdirSync(DIR,{recursive:true});
const ST="A bold SCREENPRINT gig-poster illustration, dark-fantasy graphic art, heavy risograph grain and paper texture, flat hand-cut poster shapes with painted shading, high-contrast DUOTONE of deep steel-blue and molten ember-orange, matte art print, editorial. Absolutely NO text, NO letters, NO words, NO title, NO logo, NO badge, NO credits, NO watermark, NO signature — picture only. Not a photo, not a 3D render, not CGI.";
const jobs:[string,string,string][]=[
 ["smith","16:9",`Wide full-bleed composition, edge to edge. A lone blacksmith mid hammer-swing over an anvil, rendered as a bold molten-orange silhouette against a deep steel-blue field, hammer raised high, a glowing billet on the anvil throwing sparks. The figure sits on the RIGHT third of the frame; the LEFT half is deep dark steel-blue empty space (for a poster title). ${ST}`],
 ["blade","9:16",`A single hand-forged damascus chef's knife standing upright as a monument, bold graphic poster shape, cold steel-blue with a molten ember-orange glow along the cutting edge, centered with deep negative space around it. ${ST}`],
 ["hands","1:1",`Close-up of a blacksmith's hands folding a glowing billet of steel with tongs and hammer, bold orange-and-steel-blue screenprint shapes, a spray of sparks, centered with negative space. ${ST}`],
 ["quench","16:9",`A blade plunged into dark quenching oil, a violent burst of steam and smoke, bold orange-and-steel-blue screenprint, wide dramatic composition. ${ST}`],
 ["atmos","16:9",`An empty forge interior with a bed of glowing ember coals and drifting sparks, volumetric light, bold orange-and-steel-blue screenprint, wide, no people. ${ST}`],
];
async function g(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return;}
  try{const u=await higsGenerateImageAsync({model:"soul-cinematic",aspectRatio:aspect,quality:"2K",folder:"visual-hooks",jobId:`fs-${name}-${Date.now().toString(36)}`,prompt});await higsDownload(u,out);console.log("ok",name);}
  catch(e){console.log("fail",name,String(e).slice(-70));}
}
(async()=>{if(!(await higsAvailable()))throw new Error("higs bot off");await Promise.allSettled(jobs.map(j=>g(j[0],j[1],j[2])));console.log("forge-print done");})().catch(e=>{console.error(e);process.exit(1);});
