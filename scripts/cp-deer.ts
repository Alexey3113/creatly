import path from "node:path";
import { higsAvailable, higsRemoveBackground, higsDownload } from "@/lib/ai/higs";
const DIR="public/uploads/1/animated/model/canopy";
async function one(src:string,out:string){ const u=await higsRemoveBackground(src,`cpdeer-${out}-${Date.now().toString(36)}`,"animated"); await higsDownload(u,path.join(DIR,out+".png")); console.log("OK",out); }
async function main(){ if(!(await higsAvailable())) throw new Error("higs down");
  try{ await one("upd-photos/6.png","deer"); }catch(e){ console.log("FAIL deer",(e as Error).message.slice(0,60)); }
  await new Promise(r=>setTimeout(r,2500));
  try{ await one("upd-photos/13.png","stag"); }catch(e){ console.log("FAIL stag",(e as Error).message.slice(0,60)); }
  console.log("done"); }
main().catch(e=>{console.error(e);process.exit(1);});
