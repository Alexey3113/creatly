import { join } from "path"; import { existsSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImage } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","g"); const F="visual-hooks";
const jobs:[string,string,string][]=[
 ["ledger-app","nano-banana-pro","A sleek minimal banking app on a phone screen glowing softly, floating in dark space with faint light ribbons, premium fintech UI, clean, cinematic, hyper-detailed. 16:9."],
 ["ledger-edge","nano-banana-pro","Extreme macro of the edge of a matte-black brushed-metal bank card catching a single thin line of light in the dark, premium, cinematic, hyper-detailed. 16:9."],
 ["ledger-calm","soul-cinematic","A person's hands holding a phone with a calm minimal banking app in soft window light, premium quiet lifestyle, minimal, cinematic. 16:9."],
];
async function g(name:string,model:string,prompt:string){ if(existsSync(join(DIR,`${name}.jpg`))){console.log("skip",name);return;} try{const u=await higsGenerateImage({model,aspectRatio:"16:9",quality:"2K",folder:F,jobId:`up-${name}-${Date.now().toString(36)}`,prompt});await higsDownload(u,join(DIR,`${name}.jpg`));console.log("ok",name);}catch(e){console.log("fail",name,String(e).slice(-40));}}
(async()=>{if(!(await higsAvailable()))throw new Error("bot off");await Promise.allSettled(jobs.map(j=>g(j[0],j[1],j[2])));console.log("up-ledger done");})().catch(e=>{console.error(e);process.exit(1);});
