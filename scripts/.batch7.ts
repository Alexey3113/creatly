import { join } from "path"; import { existsSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImage } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites"); const F="visual-hooks";
const jobs:[string,string,string][]=[
 ["pour","nano-banana-pro","A single elegant cocktail in a coupe with a citrus twist and a thin curl of smoke, dark moody bar, one dramatic light, cinematic macro, hyper-detailed. 16:9."],
 ["stride","nano-banana-pro","A single sculptural running shoe floating amid surreal streaks of motion-blur light, editorial product hero, dynamic, cinematic, minimal negative space, hyper-detailed. 16:9."],
 ["wax","soul-cinematic","A surreal fanned stack of vinyl records in a dramatic shaft of light against a dark room, editorial, cinematic, minimal. 16:9."],
 ["cask","nano-banana-pro","A single glass of amber whisky glowing in a warm shaft of light beside a dark oak barrel, surreal, cinematic macro, hyper-detailed. 16:9."],
 ["grove","nano-banana-pro","Surreal macro of golden-green olive oil pouring in a warm shaft of light, glistening ribbon, cinematic, hyper-detailed. 16:9."],
 ["spine","soul-cinematic","A surreal tower of stacked old hardback books rising up into shadow in a warm shaft of light, editorial, cinematic, minimal. 16:9."],
 ["curd","nano-banana-pro","A surreal aged wheel of artisan cheese in a dramatic shaft of light against dark, editorial macro, cinematic, hyper-detailed. 16:9."],
];
async function g(name:string,model:string,prompt:string){ if(existsSync(join(DIR,`${name}.jpg`))){console.log("skip",name);return;} try{const u=await higsGenerateImage({model,aspectRatio:"16:9",quality:"2K",folder:F,jobId:`b7-${name}-${Date.now().toString(36)}`,prompt});await higsDownload(u,join(DIR,`${name}.jpg`));console.log("ok",name);}catch(e){console.log("fail",name,String(e).slice(-40));}}
(async()=>{if(!(await higsAvailable()))throw new Error("bot off");await Promise.allSettled(jobs.map(j=>g(j[0],j[1],j[2])));console.log("batch7 done");})().catch(e=>{console.error(e);process.exit(1);});
