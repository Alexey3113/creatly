import { join } from "path";
import { higsAvailable, higsDownload, higsGenerateImage } from "@/lib/ai/higs";
const DIR = join(process.cwd(), "public", "uploads", "1", "hooks", "sites");
const F = "visual-hooks";
const jobs: [string,string,string][] = [
  ["tide","soul-cinematic","A lone open-water swimmer in dark cold teal-grey ocean at dawn, spray and drifting mist, moody, dramatic, cinematic wide. 16:9."],
  ["forge","soul-cinematic","A bladesmith striking glowing orange-hot steel on an anvil in a dark smithy, sparks flying through the air, dramatic rim light, cinematic. 16:9."],
  ["canto","nano-banana-pro","A premium turntable and vinyl record in warm dim light, brass and walnut, extreme macro, analog hi-fi, cinematic, shallow depth of field. 16:9."],
  ["atlas","soul-cinematic","A lone figure standing on a vast glacier ridge with towering snow mountains behind, cold blue, epic scale, cinematic wide. 16:9."],
  ["sol","nano-banana-pro","A vast field of dark solar panels at golden sunrise, high aerial view, clean optimistic warm light, cinematic, hyper-detailed. 16:9."],
  ["noct","soul-cinematic","A single candlelit glass of orange natural wine on a dark wooden bar, intimate and moody, warm glow, cinematic macro. 16:9."],
];
const sleep=(ms:number)=>new Promise(r=>setTimeout(r,ms));
async function gen(name:string,model:string,prompt:string,i:number){
  await sleep(i*1500);
  try{ const u=await higsGenerateImage({model,aspectRatio:"16:9",quality:"2K",folder:F,jobId:`site-${name}-${Date.now().toString(36)}`,prompt}); await higsDownload(u,join(DIR,`${name}-hero.jpg`)); console.log("ok",name);}catch(e){console.log("fail",name,String(e).slice(-40));}
}
(async()=>{ if(!(await higsAvailable()))throw new Error("bot off"); await Promise.allSettled(jobs.map(([n,m,p],i)=>gen(n,m,p,i))); console.log("sites-heroes done"); })().catch(e=>{console.error(e);process.exit(1);});
