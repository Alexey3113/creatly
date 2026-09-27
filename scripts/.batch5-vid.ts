import { join } from "path"; import { existsSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateVideoAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites"); const BASE=process.env.HIGS_BOT_URL||"http://127.0.0.1:3210"; const F="visual-hooks";
const sleep=(ms:number)=>new Promise(r=>setTimeout(r,ms));
async function hist(pfx:string,since:number){try{const r=await fetch(`${BASE}/api/history`,{signal:AbortSignal.timeout(20000)});const j:any=await r.json();const it=(j.items||[]).filter((x:any)=>x.model==="kling-3.0"&&x.folder===F&&(x.prompt||"").slice(0,42)===pfx.slice(0,42)&&(x.timestamp||0)>=since);for(const x of it){const p=x.images&&x.images[0];if(p)return p.startsWith("http")?p:`${BASE}/${String(p).replace(/^\/+/,"")}`;}}catch{}return null;}
const jobs:[string,string][]=[
 ["iron","The pool of light slowly breathes over the chalk-dusted kettlebell, fine dust drifting in the dark. Seamless, no cuts, cinematic."],
 ["fetch","The dog shifts its gaze and breathes calmly against the soft pastel void, gentle. Seamless, no cuts, cinematic."],
 ["nib","A single glossy drop of black ink swells at the pen nib and slowly falls, macro. Seamless, no cuts, cinematic."],
 ["swell","Mist and spray drift slowly past the upright surfboard at dawn, the water shimmering. Seamless, no cuts, cinematic."],
 ["wick","The candle flame flickers softly, molten wax glistening, warm glow breathing in the dark. Seamless, no cuts, cinematic."],
 ["fern","The giant monstera leaf sways very slowly against the soft void, light gliding across it. Seamless, no cuts, cinematic."],
];
async function one(name:string,prompt:string,i:number){ if(existsSync(join(DIR,`${name}-hero.mp4`))||!existsSync(join(DIR,`${name}.jpg`))){console.log("skip",name);return;} await sleep(i*4000); const since=Date.now()-20000;
 try{const u=await higsGenerateVideoAsync({prompt,jobId:`b5v-${name}-${Date.now().toString(36)}`,folder:F,startFrame:join(DIR,`${name}.jpg`),duration:10,quality:"1080p"});await higsDownload(u,join(DIR,`${name}-hero.mp4`));console.log("ok",name);}
 catch(e){const dl=Date.now()+18*60000; while(Date.now()<dl){const r=await hist(prompt,since);if(r){await higsDownload(r,join(DIR,`${name}-hero.mp4`));console.log("ok",name,"(hist)");return;}await sleep(12000);}console.log("fail",name);}
}
(async()=>{if(!(await higsAvailable()))throw new Error("bot off");await Promise.allSettled(jobs.map(([n,p],i)=>one(n,p,i)));console.log("batch5-vid done");})().catch(e=>{console.error(e);process.exit(1);});
