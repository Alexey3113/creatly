import { join } from "path"; import { existsSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImage } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites"); const F="visual-hooks";
const jobs:[string,string,string][]=[
 ["vessel","soul-cinematic","A model in a flowing sculptural cream garment caught mid-motion against a vast surreal deep-red colour void, bold editorial fashion, dramatic, cinematic, minimal. 16:9."],
 ["haven","soul-cinematic","A lone infinity pool merging seamlessly into the ocean horizon at golden hour, one small figure at the edge, surreal calm, cinematic, minimal. 16:9."],
 ["dew","nano-banana-pro","Extreme macro of a single dewy drop of clear serum resting on luminous glowing skin, iridescent highlights, soft light, surreal beauty, cinematic, hyper-detailed. 16:9."],
 ["roast","nano-banana-pro","Surreal macro of roasted coffee beans tumbling through the air in a warm golden shaft of light with swirling steam and smoke, dark moody, cinematic, hyper-detailed. 16:9."],
 ["lume","nano-banana-pro","A single diamond solitaire ring floating in dark space, refracting a rainbow spectrum of light across the black, surreal macro, premium, cinematic, hyper-detailed. 16:9."],
 ["form","soul-cinematic","A single sculptural minimalist chair alone in a vast raw-concrete gallery, one dramatic shaft of light falling on it, surreal, editorial, cinematic, minimal. 16:9."],
];
async function g(name:string,model:string,prompt:string){ if(existsSync(join(DIR,`${name}.jpg`))){console.log("skip",name);return;} try{const u=await higsGenerateImage({model,aspectRatio:"16:9",quality:"2K",folder:F,jobId:`b2-${name}-${Date.now().toString(36)}`,prompt});await higsDownload(u,join(DIR,`${name}.jpg`));console.log("ok",name);}catch(e){console.log("fail",name,String(e).slice(-40));}}
(async()=>{if(!(await higsAvailable()))throw new Error("bot off");await Promise.allSettled(jobs.map(j=>g(j[0],j[1],j[2])));console.log("batch2 done");})().catch(e=>{console.error(e);process.exit(1);});
