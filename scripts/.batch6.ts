import { join } from "path"; import { existsSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImage } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites"); const F="visual-hooks";
const jobs:[string,string,string][]=[
 ["cacao","soul-cinematic","A single glossy dark chocolate bar snapping in two, rich, warm golden light, editorial macro, cinematic, minimal. 16:9."],
 ["pour","nano-banana-pro","A single elegant cocktail in a coupe glass with a citrus twist and a wisp of smoke, dark moody bar, dramatic light, cinematic macro, hyper-detailed. 16:9."],
 ["hide","nano-banana-pro","A sculptural leather holdall bag resting in a warm shaft of light against a dark void, editorial product, cinematic, minimal, hyper-detailed. 16:9."],
 ["comb","nano-banana-pro","Surreal macro of a honeycomb dripping golden honey in a warm shaft of light, rich and glistening, cinematic, hyper-detailed. 16:9."],
 ["spice","nano-banana-pro","Surreal macro of vivid crimson saffron threads and small mounds of spice in a warm shaft of light, editorial, cinematic, hyper-detailed. 16:9."],
 ["lens","soul-cinematic","A single vintage film camera resting in a dramatic shaft of light against a dark void, editorial, cinematic, minimal. 16:9."],
];
async function g(name:string,model:string,prompt:string){ if(existsSync(join(DIR,`${name}.jpg`))){console.log("skip",name);return;} try{const u=await higsGenerateImage({model,aspectRatio:"16:9",quality:"2K",folder:F,jobId:`b6-${name}-${Date.now().toString(36)}`,prompt});await higsDownload(u,join(DIR,`${name}.jpg`));console.log("ok",name);}catch(e){console.log("fail",name,String(e).slice(-40));}}
(async()=>{if(!(await higsAvailable()))throw new Error("bot off");await Promise.allSettled(jobs.map(j=>g(j[0],j[1],j[2])));console.log("batch6 done");})().catch(e=>{console.error(e);process.exit(1);});
