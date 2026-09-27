// Универсальный video-gen с даунскейлом startFrame (фикс base64 >5MB апстрима Higgsfield).
import { join } from "path"; import { existsSync } from "fs"; import { execSync } from "child_process";
import { higsAvailable, higsDownload, higsGenerateVideoAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites"); const BASE=process.env.HIGS_BOT_URL||"http://127.0.0.1:3210"; const F="visual-hooks";
const sleep=(ms:number)=>new Promise(r=>setTimeout(r,ms));
function small(name:string){ const src=join(DIR,`${name}.jpg`); const out=join(DIR,`${name}.sm.jpg`); if(!existsSync(out)){ try{execSync(`sips -Z 1600 "${src}" --out "${out}"`,{stdio:"ignore"});}catch{return src;} } return existsSync(out)?out:src; }
async function hist(pfx:string,since:number){try{const r=await fetch(`${BASE}/api/history`,{signal:AbortSignal.timeout(20000)});const j:any=await r.json();const it=(j.items||[]).filter((x:any)=>x.model==="kling-3.0"&&x.folder===F&&(x.prompt||"").slice(0,42)===pfx.slice(0,42)&&(x.timestamp||0)>=since);for(const x of it){const p=x.images&&x.images[0];if(p)return p.startsWith("http")?p:`${BASE}/${String(p).replace(/^\/+/,"")}`;}}catch{}return null;}
// имена берём из argv (через запятую) + промпты из JSON-файла scripts/.vidgen.json
const names = (process.argv[2]||"").split(",").filter(Boolean);
const prompts:Record<string,string> = require(join(process.cwd(),"scripts",".vidgen.json"));
async function one(name:string,i:number){ if(existsSync(join(DIR,`${name}-hero.mp4`))||!existsSync(join(DIR,`${name}.jpg`))){console.log("skip",name);return;} const prompt=prompts[name]; if(!prompt){console.log("noprompt",name);return;} await sleep(i*4000); const since=Date.now()-20000; const sf=small(name);
 try{const u=await higsGenerateVideoAsync({prompt,jobId:`vg-${name}-${Date.now().toString(36)}`,folder:F,startFrame:sf,duration:10,quality:"1080p"});await higsDownload(u,join(DIR,`${name}-hero.mp4`));console.log("ok",name);}
 catch(e){const dl=Date.now()+18*60000; while(Date.now()<dl){const r=await hist(prompt,since);if(r){await higsDownload(r,join(DIR,`${name}-hero.mp4`));console.log("ok",name,"(hist)");return;}await sleep(12000);}console.log("fail",name);}
}
(async()=>{if(!(await higsAvailable()))throw new Error("bot off");await Promise.allSettled(names.map((n,i)=>one(n,i)));console.log("vidgen done");})().catch(e=>{console.error(e);process.exit(1);});
