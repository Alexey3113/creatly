import { join } from "path"; import { existsSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateVideoAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites"); const BASE=process.env.HIGS_BOT_URL||"http://127.0.0.1:3210"; const F="visual-hooks";
const sleep=(ms:number)=>new Promise(r=>setTimeout(r,ms));
async function hist(pfx:string,since:number){try{const r=await fetch(`${BASE}/api/history`,{signal:AbortSignal.timeout(20000)});const j:any=await r.json();const it=(j.items||[]).filter((x:any)=>x.model==="kling-3.0"&&x.folder===F&&(x.prompt||"").slice(0,42)===pfx.slice(0,42)&&(x.timestamp||0)>=since);for(const x of it){const p=x.images&&x.images[0];if(p)return p.startsWith("http")?p:`${BASE}/${String(p).replace(/^\/+/,"")}`;}}catch{}return null;}
const jobs:[string,string][]=[
 ["plat","The plated dish holds still in the dark void as the beam of light slowly shifts across it, a wisp of steam rising, surreal fine-dining. Seamless, no cuts, cinematic."],
 ["clay","The ceramic vessel turns very slowly in the warm void, soft light gliding over its curve, minimal and calm. Seamless, no cuts, cinematic."],
 ["velo","The steel bicycle floats and turns slowly against the dusk sky, light gliding along its frame. Seamless, no cuts, cinematic."],
 ["cacao","Glossy dark chocolate pours and folds slowly in warm golden light, rich ribbons moving. Seamless, no cuts, cinematic."],
 ["stem","The giant flower slowly opens its petals against the pastel void, dreamy and soft. Seamless, no cuts, cinematic."],
 ["steep","Green tea leaves unfurl and drift in swirling water, steam rising through the shaft of light. Seamless, no cuts, cinematic."],
];
async function one(name:string,prompt:string,i:number){ if(existsSync(join(DIR,`${name}-hero.mp4`))){console.log("skip",name);return;} await sleep(i*4000); const since=Date.now()-20000;
 try{const u=await higsGenerateVideoAsync({prompt,jobId:`b3v-${name}-${Date.now().toString(36)}`,folder:F,startFrame:join(DIR,`${name}.jpg`),duration:10,quality:"1080p"});await higsDownload(u,join(DIR,`${name}-hero.mp4`));console.log("ok",name);}
 catch(e){const dl=Date.now()+18*60000; while(Date.now()<dl){const r=await hist(prompt,since);if(r){await higsDownload(r,join(DIR,`${name}-hero.mp4`));console.log("ok",name,"(hist)");return;}await sleep(12000);}console.log("fail",name);}
}
(async()=>{if(!(await higsAvailable()))throw new Error("bot off");await Promise.allSettled(jobs.map(([n,p],i)=>one(n,p,i)));console.log("batch3-vid done");})().catch(e=>{console.error(e);process.exit(1);});
