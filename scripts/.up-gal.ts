import { join } from "path"; import { existsSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImage } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","g"); const F="visual-hooks";
const jobs:[string,string,string][]=[
 ["roast-beans","nano-banana-pro","Freshly roasted coffee beans pouring from a roaster cooling tray, warm glowing light, editorial coffee, hyper-detailed, cinematic. 16:9."],
 ["roast-pour","soul-cinematic","A slow pour-over coffee being made, water spiralling over grounds, warm morning light, intimate editorial, cinematic. 16:9."],
 ["lume-ring","nano-banana-pro","An exquisite fine gold ring with a single gemstone on dark velvet, dramatic jewel light, editorial product, hyper-detailed. 16:9."],
 ["lume-bench","soul-cinematic","A jeweller working at a bench with fine tools and a loupe, warm focused light, intimate editorial, cinematic. 16:9."],
];
async function g(name:string,model:string,prompt:string){ if(existsSync(join(DIR,`${name}.jpg`))){console.log("skip",name);return;} try{const u=await higsGenerateImage({model,aspectRatio:"16:9",quality:"2K",folder:F,jobId:`bs-${name}-${Date.now().toString(36)}`,prompt});await higsDownload(u,join(DIR,`${name}.jpg`));console.log("ok",name);}catch(e){console.log("fail",name,String(e).slice(-40));}}
(async()=>{if(!(await higsAvailable()))throw new Error("bot off");await Promise.allSettled(jobs.map(j=>g(j[0],j[1],j[2])));console.log("bs-gal7 done");})().catch(e=>{console.error(e);process.exit(1);});
