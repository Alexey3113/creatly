import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","forge-p"); mkdirSync(DIR,{recursive:true});
const PAL="Dark editorial poster art, dramatic album-cover style: steel-blue and graphite duotone with a single molten-orange ember accent, one hard rim light, painterly cinematic 3D sculpt, fine film grain, near-black background, heavy negative space around the subject, matte, moody, very high contrast. no text, no letters, no watermark, no border.";
const jobs:[string,string,string][]=[
 ["blade","9:16",`A single hand-forged damascus chef's knife standing perfectly upright as a sacred monument, floating in a black void, the wavy damascus watering pattern catching cold silver light along the blade, a faint ember-orange glow tracing the cutting edge, reverent and still, centered with deep negative space above and around it. ${PAL}`],
 ["hands","1:1",`Extreme close-up of a blacksmith's weathered hands folding a glowing ember-orange billet of steel with tongs and a hammer, a spray of sparks frozen in the air, cold dark surroundings, ember light on the knuckles, sculptural and tactile, centered with negative space. ${PAL}`],
 ["quench","16:9",`A glowing ember-orange blade plunged into dark quenching oil, a violent burst of steam and smoke rising, the exact instant steel turns from fire to cold graphite, dramatic and cinematic, wide composition. ${PAL}`],
 ["atmos","16:9",`An empty ancient forge interior at night, a bed of glowing ember coals, sparks drifting through the air, volumetric shafts of cold light through deep atmospheric haze, no people, cavernous and cinematic, wide composition. ${PAL}`],
];
async function g(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return;}
  try{const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:"visual-hooks",jobId:`fp-${name}-${Date.now().toString(36)}`,prompt});await higsDownload(u,out);console.log("ok",name);}
  catch(e){console.log("fail",name,String(e).slice(-70));}
}
(async()=>{if(!(await higsAvailable()))throw new Error("higs bot off");await Promise.allSettled(jobs.map(j=>g(j[0],j[1],j[2])));console.log("forge-rest done");})().catch(e=>{console.error(e);process.exit(1);});
