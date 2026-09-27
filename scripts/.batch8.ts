import { join } from "path"; import { existsSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImage } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites"); const F="visual-hooks";
const jobs:[string,string,string][]=[
 ["ink","soul-cinematic","A single tattoo machine resting in a dramatic pool of light in a dark studio, editorial, cinematic, minimal. 16:9."],
 ["malt","nano-banana-pro","A single glass of amber craft beer with a thick foam head and a few hops beside it in a warm shaft of light, cinematic macro, hyper-detailed. 16:9."],
 ["botanic","nano-banana-pro","A clear gin bottle with fresh botanicals, juniper and citrus, floating around it in a bright shaft of light, surreal editorial, cinematic, hyper-detailed. 16:9."],
 ["mane","soul-cinematic","Surreal flowing dark hair caught mid-motion against a soft neutral void, editorial beauty, dramatic, cinematic, minimal. 16:9."],
 ["selvedge","nano-banana-pro","Surreal macro of neatly folded raw selvedge denim with the red line showing, in a warm shaft of light, editorial, cinematic, hyper-detailed. 16:9."],
 ["deck","soul-cinematic","A single skateboard deck floating upright in a dramatic shaft of light against a dark void, editorial product, cinematic, minimal. 16:9."],
 ["lather","nano-banana-pro","Surreal macro of a natural soap bar with soft foam and water droplets in gentle light, editorial, cinematic, hyper-detailed. 16:9."],
];
async function g(name:string,model:string,prompt:string){ if(existsSync(join(DIR,`${name}.jpg`))){console.log("skip",name);return;} try{const u=await higsGenerateImage({model,aspectRatio:"16:9",quality:"2K",folder:F,jobId:`b8-${name}-${Date.now().toString(36)}`,prompt});await higsDownload(u,join(DIR,`${name}.jpg`));console.log("ok",name);}catch(e){console.log("fail",name,String(e).slice(-40));}}
(async()=>{if(!(await higsAvailable()))throw new Error("bot off");await Promise.allSettled(jobs.map(j=>g(j[0],j[1],j[2])));console.log("batch8 done");})().catch(e=>{console.error(e);process.exit(1);});
