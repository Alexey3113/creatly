import { join } from "path"; import { existsSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImage } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites"); const F="visual-hooks";
const jobs:[string,string,string][]=[
 ["iron","soul-cinematic","A single chalk-dusted kettlebell resting in a dramatic pool of light in a dark raw gym, surreal, editorial, cinematic, minimal. 16:9."],
 ["fetch","soul-cinematic","A noble dog portrait against a soft surreal pastel void, oversized editorial, dreamy, cinematic, minimal. 16:9."],
 ["nib","nano-banana-pro","Surreal extreme macro of a fountain pen nib with a single glossy drop of black ink about to fall, dramatic light, editorial, cinematic, hyper-detailed. 16:9."],
 ["swell","soul-cinematic","A single surfboard floating upright in surreal misty ocean spray at dawn, soft teal, editorial, cinematic, minimal. 16:9."],
 ["wick","nano-banana-pro","Surreal macro of a single candle flame with molten wax and a soft warm glow in the dark, cinematic, hyper-detailed. 16:9."],
 ["fern","soul-cinematic","A giant surreal monstera leaf against a soft green-grey void, oversized and dreamy, editorial, cinematic, minimal. 16:9."],
];
async function g(name:string,model:string,prompt:string){ if(existsSync(join(DIR,`${name}.jpg`))){console.log("skip",name);return;} try{const u=await higsGenerateImage({model,aspectRatio:"16:9",quality:"2K",folder:F,jobId:`b5-${name}-${Date.now().toString(36)}`,prompt});await higsDownload(u,join(DIR,`${name}.jpg`));console.log("ok",name);}catch(e){console.log("fail",name,String(e).slice(-40));}}
(async()=>{if(!(await higsAvailable()))throw new Error("bot off");await Promise.allSettled(jobs.map(j=>g(j[0],j[1],j[2])));console.log("batch5 done");})().catch(e=>{console.error(e);process.exit(1);});
