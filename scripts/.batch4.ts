import { join } from "path"; import { existsSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImage } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites"); const F="visual-hooks";
const jobs:[string,string,string][]=[
 ["cacao","nano-banana-pro","Surreal macro of glossy dark chocolate pouring and folding in warm golden light, rich liquid ribbons, cinematic, hyper-detailed. 16:9."],
 ["barb","soul-cinematic","A single vintage barber chair alone in a dramatic pool of spotlight in a dark room, moody, editorial, cinematic, minimal. 16:9."],
 ["loaf","nano-banana-pro","Surreal macro of a rustic sourdough loaf breaking open with steam rising, warm golden light, dark background, cinematic, hyper-detailed. 16:9."],
 ["thread","soul-cinematic","A sharply tailored charcoal suit worn by an invisible body caught mid-motion against a surreal grey void, editorial menswear, dramatic, cinematic, minimal. 16:9."],
 ["ledger","nano-banana-pro","A single matte-black metal card floating in dark space with soft glowing light ribbons curving around it, premium minimal fintech, cinematic, hyper-detailed. 16:9."],
 ["balm","nano-banana-pro","Surreal macro of a smooth dark hot stone with rising steam and glistening water droplets in soft warm light, serene spa, cinematic, hyper-detailed. 16:9."],
];
async function g(name:string,model:string,prompt:string){ if(existsSync(join(DIR,`${name}.jpg`))){console.log("skip",name);return;} try{const u=await higsGenerateImage({model,aspectRatio:"16:9",quality:"2K",folder:F,jobId:`b4-${name}-${Date.now().toString(36)}`,prompt});await higsDownload(u,join(DIR,`${name}.jpg`));console.log("ok",name);}catch(e){console.log("fail",name,String(e).slice(-40));}}
(async()=>{if(!(await higsAvailable()))throw new Error("bot off");await Promise.allSettled(jobs.map(j=>g(j[0],j[1],j[2])));console.log("batch4 done");})().catch(e=>{console.error(e);process.exit(1);});
