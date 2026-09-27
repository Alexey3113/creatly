import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","clothing"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
const TR="Editorial high-fashion photograph, periwinkle lavender monochrome studio, soft cinematic light, glossy premium minimal, faint frosted-glass atmosphere. No text, no logo, no watermark.";
const jobs:[string,string,string][]=[
 ["look1","2:3",`A model in a sharply tailored oversized white coat and mirrored sunglasses, confident editorial pose, full body. ${TR}`],
 ["look2","2:3",`A model in a liquid-silver metallic slip dress, elegant pose, full body, chrome sheen. ${TR}`],
 ["look3","2:3",`A model in a soft lavender knit co-ord set, relaxed editorial pose, full body. ${TR}`],
 ["look4","2:3",`A model in a structured white bodysuit with long opera gloves, strong pose, full body. ${TR}`],
 ["detail","4:5",`Extreme macro close-up of glossy white futuristic garment fabric, precise seams and stitching, soft periwinkle light, tactile premium. No text.`],
 ["atelier","16:9",`A minimal fashion atelier interior, a rail of white and silver garments, a tailor's mannequin, large soft window light, periwinkle lavender tone, empty and calm, no people. No text.`],
];
async function g(name:string,aspect:string,prompt:string){
  const out=join(DIR,`${name}.jpg`); if(existsSync(out)){console.log("skip",name);return;}
  try{const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"2K",folder:F,jobId:`ac2-${name}-${Date.now().toString(36)}`,prompt});await higsDownload(u,out);console.log("ok",name);}
  catch(e){console.log("fail",name,String(e).slice(-60));}
}
(async()=>{if(!(await higsAvailable()))throw new Error("higs bot off");await Promise.allSettled(jobs.map(j=>g(j[0],j[1],j[2])));console.log("clothing2 done");})().catch(e=>{console.error(e);process.exit(1);});
