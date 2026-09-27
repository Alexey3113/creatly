import { join } from "path"; import { existsSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImage } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites"); const F="visual-hooks";
const jobs:[string,string,string][]=[
 ["plat","nano-banana-pro","A single exquisite plated fine-dining dish floating in a dark void, one dramatic beam of light, surreal, editorial, cinematic macro, hyper-detailed. 16:9."],
 ["clay","soul-cinematic","A single perfect sculptural ceramic vessel floating in a warm sand-coloured void, one soft shaft of light, minimal surreal, editorial, cinematic. 16:9."],
 ["velo","nano-banana-pro","A sculptural steel road bicycle floating weightless against a surreal dusk gradient sky, editorial product hero, cinematic, minimal negative space, hyper-detailed. 16:9."],
 ["cacao","nano-banana-pro","Surreal macro of glossy dark chocolate pouring and folding in warm golden light, rich and liquid, cinematic, hyper-detailed. 16:9."],
 ["stem","soul-cinematic","A single giant surreal flower blooming against a soft pastel void, oversized and dreamy, editorial, cinematic, minimal. 16:9."],
 ["steep","nano-banana-pro","Surreal macro of green tea leaves unfurling in swirling clear water with rising steam caught in a shaft of light, serene, cinematic, hyper-detailed. 16:9."],
];
async function g(name:string,model:string,prompt:string){ if(existsSync(join(DIR,`${name}.jpg`))){console.log("skip",name);return;} try{const u=await higsGenerateImage({model,aspectRatio:"16:9",quality:"2K",folder:F,jobId:`b3-${name}-${Date.now().toString(36)}`,prompt});await higsDownload(u,join(DIR,`${name}.jpg`));console.log("ok",name);}catch(e){console.log("fail",name,String(e).slice(-40));}}
(async()=>{if(!(await higsAvailable()))throw new Error("bot off");await Promise.allSettled(jobs.map(j=>g(j[0],j[1],j[2])));console.log("batch3 done");})().catch(e=>{console.error(e);process.exit(1);});
