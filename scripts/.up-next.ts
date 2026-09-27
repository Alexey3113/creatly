import { join } from "path"; import { existsSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImage } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","g"); const F="visual-hooks";
const jobs:[string,string,string][]=[
 ["dew-drop","nano-banana-pro","Extreme macro of a single glossy serum drop on luminous skin with iridescent highlights, clean beauty, soft light, cinematic, hyper-detailed. 16:9."],
 ["dew-skin","nano-banana-pro","Macro of calm dewy glowing skin with soft natural texture, clean minimal beauty, gentle light, cinematic, hyper-detailed. 16:9."],
 ["dew-bottle","nano-banana-pro","A minimal frosted-glass serum dropper bottle on a soft neutral surface in gentle light, clean beauty product, editorial, cinematic, hyper-detailed. 16:9."],
 ["iron-lift","soul-cinematic","An athlete mid-deadlift in a dark raw gym, dramatic single light, chalk dust, powerful, cinematic. 16:9."],
 ["iron-chalk","nano-banana-pro","Extreme macro of chalked hands gripping a rough barbell knurl, dramatic light, dark gym, cinematic, hyper-detailed. 16:9."],
 ["iron-rack","soul-cinematic","An empty squat rack in a dark raw gym lit by a single dramatic shaft of light at dawn, minimal, cinematic. 16:9."],
];
async function g(name:string,model:string,prompt:string){ if(existsSync(join(DIR,`${name}.jpg`))){console.log("skip",name);return;} try{const u=await higsGenerateImage({model,aspectRatio:"16:9",quality:"2K",folder:F,jobId:`up-${name}-${Date.now().toString(36)}`,prompt});await higsDownload(u,join(DIR,`${name}.jpg`));console.log("ok",name);}catch(e){console.log("fail",name,String(e).slice(-40));}}
(async()=>{if(!(await higsAvailable()))throw new Error("bot off");await Promise.allSettled(jobs.map(j=>g(j[0],j[1],j[2])));console.log("up-next done");})().catch(e=>{console.error(e);process.exit(1);});
