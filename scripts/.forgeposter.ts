import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","forge-p"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const PAL="Dark editorial poster art. Steel-blue and graphite duotone with a single molten-orange ember accent. Dramatic single-source rim light, painterly cinematic 3D sculpt, fine film grain, near-black background, heavy negative space around the subject, matte, moody, high contrast. no text, no letters, no watermark.";
const jobs:[string,string,string][]=[
 ["smith","1:1",`A lone master blacksmith as a heroic sculptural figure, low dramatic angle, frozen mid hammer-strike over an anvil, heavy leather apron, face lost in shadow, a single glowing ember-orange billet lighting him from below while cold steel-blue light rims him from behind, centered with deep empty negative space above the figure. ${PAL}`],
 ["blade","9:16",`A single hand-forged damascus chef's knife standing upright as a sacred monument, floating in a black void, the wavy damascus watering pattern catching cold silver light, a faint ember glow tracing the cutting edge, reverent and still, centered with negative space around it. ${PAL}`],
 ["hands","1:1",`Extreme close-up of a blacksmith's weathered hands folding a glowing orange billet of steel with tongs and hammer, a spray of sparks, cold dark surroundings, ember light on the knuckles, sculptural and tactile. ${PAL}`],
 ["quench","16:9",`A glowing orange blade plunged into dark quenching oil, a violent burst of steam and smoke, the exact instant steel turns from fire to cold graphite, dramatic and cinematic. ${PAL}`],
 ["atmos","16:9",`An empty ancient forge interior at night, a bed of glowing coals, embers drifting through the air, volumetric shafts of light through deep atmospheric haze, no people, cavernous and cinematic. ${PAL}`],
];
async function g(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`);
  if(existsSync(out)){console.log("skip",name);return;}
  try{const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`fp-${name}-${Date.now().toString(36)}`,prompt});await higsDownload(u,out);console.log("ok",name);}
  catch(e){console.log("fail",name,String(e).slice(-70));}
}
(async()=>{if(!(await higsAvailable()))throw new Error("higs bot off");await Promise.allSettled(jobs.map(j=>g(j[0],j[1],j[2])));console.log("forge-poster gen done");})().catch(e=>{console.error(e);process.exit(1);});
