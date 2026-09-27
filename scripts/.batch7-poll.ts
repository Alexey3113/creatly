import { join } from "path"; import { existsSync } from "fs";
import { higsAvailable, higsDownload } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites"); const BASE=process.env.HIGS_BOT_URL||"http://127.0.0.1:3210"; const F="visual-hooks";
const sleep=(ms:number)=>new Promise(r=>setTimeout(r,ms));
// имя → префикс промпта (для матчинга в истории)
const want:[string,string][]=[
 ["pour","A single elegant cocktail in a coupe with a citrus twist"],
 ["stride","A single sculptural running shoe floating amid surreal"],
 ["cask","A single glass of amber whisky glowing in a warm shaft"],
 ["grove","Surreal macro of golden-green olive oil pouring in a warm"],
 ["curd","A surreal aged wheel of artisan cheese in a dramatic shaft"],
];
async function hist(pfx:string){try{const r=await fetch(`${BASE}/api/history`,{signal:AbortSignal.timeout(20000)});const j:any=await r.json();const it=(j.items||[]).filter((x:any)=>x.folder===F&&(x.type==="image"||x.model==="nano-banana-pro"||x.model==="soul-cinematic")&&(x.prompt||"").slice(0,40)===pfx.slice(0,40));it.sort((a:any,b:any)=>(b.timestamp||0)-(a.timestamp||0));for(const x of it){const p=x.images&&x.images[0];if(p)return p.startsWith("http")?p:`${BASE}/${String(p).replace(/^\/+/,"")}`;}}catch{}return null;}
(async()=>{ if(!(await higsAvailable()))throw new Error("bot off");
 const dl=Date.now()+16*60000;
 while(Date.now()<dl){ let left=0;
  for(const [name,pfx] of want){ if(existsSync(join(DIR,`${name}.jpg`)))continue; const u=await hist(pfx); if(u){await higsDownload(u,join(DIR,`${name}.jpg`));console.log("got",name);} else left++; }
  if(left===0){console.log("all downloaded");break;} await sleep(12000);
 } console.log("batch7-poll done");
})().catch(e=>{console.error(e);process.exit(1);});
