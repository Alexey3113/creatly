import { join } from "path"; import { mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","forge-p","var"); mkdirSync(DIR,{recursive:true});
// широкая full-bleed сцена: фигура смещена вправо, слева глубокая тень/воздух под крупный титул
const SUBJ="Wide full-bleed cinematic composition, edge to edge. A lone master blacksmith mid hammer-swing over an anvil, heavy hammer raised, powerful heroic silhouette, heavy leather apron, a glowing ember-orange billet of steel on the anvil throwing sparks. The figure sits on the RIGHT third of the frame; the LEFT half falls into deep shadow and smoke — empty negative space for a large poster title. Atmospheric depth, volumetric light.";
const jobs:[string,string,string][]=[
 ["v1-soul-paint","soul-cinematic",`Dark romantic editorial poster ILLUSTRATION — a 2D digital painting in the style of a gothic album cover and dark-fantasy concept art. Hand-painted with visible brush strokes and canvas grain, matte finish, heavy film grain and subtle halftone texture, a limited desaturated DUOTONE palette of steel-blue and graphite with a single molten-orange ember accent, dramatic chiaroscuro, art-print quality. ${SUBJ} Absolutely NOT a photograph, NOT a smooth 3D render, NOT glossy CGI, no plastic, no realism.`],
 ["v2-soul-print","soul-cinematic",`A bold screenprint gig-poster illustration, dark-fantasy graphic art, heavy risograph grain and paper texture, flat hand-drawn ink linework with painted shading, high-contrast DUOTONE of deep steel-blue and molten ember-orange, matte art print, editorial. ${SUBJ} Not a photo, not a 3D render, not CGI.`],
 ["v3-nano-paint","nano-banana-pro",`Dark romantic editorial poster ILLUSTRATION — a hand-painted 2D digital painting, gothic album-cover / dark-fantasy concept art, visible brush strokes, matte, heavy film grain and halftone texture, desaturated DUOTONE steel-blue and graphite with one molten-orange ember accent, dramatic chiaroscuro. ${SUBJ} NOT a photograph, NOT a 3D render, NOT CGI.`],
];
async function g(name:string,model:string,prompt:string){
  try{const u=await higsGenerateImageAsync({model,aspectRatio:"16:9",quality:"2K",folder:"visual-hooks",jobId:`fv-${name}-${Date.now().toString(36)}`,prompt});await higsDownload(u,join(DIR,`${name}.jpg`));console.log("ok",name);}
  catch(e){console.log("fail",name,String(e).slice(-70));}
}
(async()=>{if(!(await higsAvailable()))throw new Error("higs bot off");await Promise.allSettled(jobs.map(j=>g(j[0],j[1],j[2])));console.log("forge-var 16:9 done");})().catch(e=>{console.error(e);process.exit(1);});
