import { join } from "path"; import { existsSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateVideoAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites"); const BASE=process.env.HIGS_BOT_URL||"http://127.0.0.1:3210"; const F="visual-hooks";
const sleep=(ms:number)=>new Promise(r=>setTimeout(r,ms));
async function hist(pfx:string,since:number){try{const r=await fetch(`${BASE}/api/history`,{signal:AbortSignal.timeout(20000)});const j:any=await r.json();const it=(j.items||[]).filter((x:any)=>x.model==="kling-3.0"&&x.folder===F&&(x.prompt||"").slice(0,42)===pfx.slice(0,42)&&(x.timestamp||0)>=since);for(const x of it){const p=x.images&&x.images[0];if(p)return p.startsWith("http")?p:`${BASE}/${String(p).replace(/^\/+/,"")}`;}}catch{}return null;}
const jobs:[string,string][]=[
 ["vessel","The sculptural cream garment flows and ripples in slow motion, fabric drifting weightlessly against the deep-red void, editorial fashion. Seamless, no cuts, cinematic."],
 ["haven","The infinity pool water shimmers and merges into the ocean, gentle ripples catching golden light, the figure perfectly still. Seamless, no cuts, cinematic."],
 ["dew","The dewy serum drop trembles and catches shifting iridescent light on luminous skin, extreme macro. Seamless, no cuts, cinematic."],
 ["roast","Roasted coffee beans tumble slowly through a golden shaft of light, steam and smoke swirling around them. Seamless, no cuts, cinematic."],
 ["lume","The diamond solitaire ring slowly rotates in dark space, refracting shifting rainbow light across the black. Seamless, no cuts, cinematic."],
 ["form","Dust motes drift through the shaft of light falling on the sculptural chair, the light slowly shifting across the raw concrete. Seamless, no cuts, cinematic."],
];
async function one(name:string,prompt:string,i:number){ if(existsSync(join(DIR,`${name}-hero.mp4`))){console.log("skip",name);return;} await sleep(i*4000); const since=Date.now()-20000; console.log("vid",name);
 try{const u=await higsGenerateVideoAsync({prompt,jobId:`b2v-${name}-${Date.now().toString(36)}`,folder:F,startFrame:join(DIR,`${name}.jpg`),duration:10,quality:"1080p"});await higsDownload(u,join(DIR,`${name}-hero.mp4`));console.log("ok",name);}
 catch(e){console.log("...",name); const dl=Date.now()+18*60000; while(Date.now()<dl){const r=await hist(prompt,since);if(r){await higsDownload(r,join(DIR,`${name}-hero.mp4`));console.log("ok",name,"(hist)");return;}await sleep(12000);}console.log("fail",name);}
}
(async()=>{if(!(await higsAvailable()))throw new Error("bot off");await Promise.allSettled(jobs.map(([n,p],i)=>one(n,p,i)));console.log("batch2-vid done");})().catch(e=>{console.error(e);process.exit(1);});
