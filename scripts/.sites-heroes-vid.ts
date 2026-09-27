import { join } from "path";
import { existsSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateVideoAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(), "public", "uploads", "1", "hooks", "sites");
const BASE = process.env.HIGS_BOT_URL || "http://127.0.0.1:3210";
const F = "visual-hooks";
const sleep=(ms:number)=>new Promise(r=>setTimeout(r,ms));
async function hist(pfx:string,since:number){try{const r=await fetch(`${BASE}/api/history`,{signal:AbortSignal.timeout(20000)});const j:any=await r.json();const it=(j.items||[]).filter((x:any)=>x.model==="kling-3.0"&&x.folder===F&&(x.prompt||"").slice(0,42)===pfx.slice(0,42)&&(x.timestamp||0)>=since);for(const x of it){const p=x.images&&x.images[0];if(p)return p.startsWith("http")?p:`${BASE}/${String(p).replace(/^\/+/,"")}`;}}catch{}return null;}
const jobs:[string,string][]=[
 ["forge","The bladesmith strikes the glowing steel, bright sparks burst and fly, embers drift, hot metal pulses, smoke curls in the dark smithy. Seamless, no cuts, cinematic."],
 ["tide","The swimmer moves through dark cold water, ripples and spray, mist drifting over the surface, slow and powerful. Seamless, no cuts, cinematic."],
 ["canto","The vinyl record slowly spins on the turntable, warm light glinting off brass and the tonearm, dust motes floating in the beam. Seamless, no cuts, cinematic."],
 ["atlas","Wind blows fine snow across the glacier ridge, clouds drift past the mountains, the lone figure stands still, epic scale. Seamless, no cuts, cinematic."],
 ["sol","Slow aerial drift over the solar panel field at sunrise, light shimmering across the panels, warm and clean. Seamless, no cuts, cinematic."],
 ["noct","Candlelight flickers warmly on the glass of orange wine, subtle reflections shifting, intimate glow in the dark. Seamless, no cuts, cinematic."],
];
async function one(name:string,prompt:string,i:number){
 if(existsSync(join(DIR,`${name}-hero.mp4`))){console.log("skip",name);return;}
 await sleep(i*4000); const since=Date.now()-20000; console.log("vid",name);
 try{ const u=await higsGenerateVideoAsync({prompt,jobId:`sitevid-${name}-${Date.now().toString(36)}`,folder:F,startFrame:join(DIR,`${name}-hero.jpg`),duration:10,quality:"1080p"}); await higsDownload(u,join(DIR,`${name}-hero.mp4`)); console.log("ok",name); }
 catch(e){ console.log("...",name,"->history"); const dl=Date.now()+18*60000; while(Date.now()<dl){const r=await hist(prompt,since); if(r){await higsDownload(r,join(DIR,`${name}-hero.mp4`));console.log("ok",name,"(hist)");return;} await sleep(12000);} console.log("fail",name); }
}
(async()=>{ if(!(await higsAvailable()))throw new Error("bot off"); await Promise.allSettled(jobs.map(([n,p],i)=>one(n,p,i))); console.log("sites-heroes-vid done"); })().catch(e=>{console.error(e);process.exit(1);});
