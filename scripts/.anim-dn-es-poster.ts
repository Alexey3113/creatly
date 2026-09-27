import { join } from "path"; import { existsSync, mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const F="visual-hooks";
async function gen(dir:string,name:string,aspect:string,prompt:string){
  const D=join(process.cwd(),"public","uploads","1","hooks","sites","anim",dir); mkdirSync(D,{recursive:true});
  const out=join(D,`${name}.jpg`); if(existsSync(out)){console.log("skip",dir,name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"1k",folder:F,jobId:`p2-${dir}-${name}-${Date.now().toString(36)}`,prompt});
  await higsDownload(u,out); console.log("ok",dir,name); return out;
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  // DANCE: реальный динамичный танцор на белом (девайс пина: гигантский тип + фигура-окклюзия), SFW
  const df = await gen("dance","dfig","2:3","EXACTLY ONE contemporary dancer frozen in a dramatic dynamic pose, deep lunge with one leg extended and arms sweeping, wearing a flowing off-white outfit, athletic expressive tension, bright high-key studio light, sharp. Isolated and centered on a plain flat pure white studio background with generous margin. ONLY ONE person, no text, no letters.");
  try{ const D=join(process.cwd(),"public","uploads","1","hooks","sites","anim","dance"); const u=await higsRemoveBackground(df, `p2-dfig-${Date.now().toString(36)}`, F); await higsDownload(u, join(D,"dfig-cut.png")); console.log("cut dfig"); }catch(e){ console.log("cut-fail dance",String(e).slice(-40)); }
  // ESCORT: тёмный туманный noir-backdrop (Everest-облака в escort-палитре) для гигант-тайп постера
  await gen("escort","mist","16:9","A dramatic cinematic scene of deep emerald-black storm clouds and haze pierced by a single warm gold shaft of light, moody, vast, atmospheric, empty, no subject, no people, no text, editorial poster backdrop.");
  console.log("dn-es done");
})().catch(e=>{console.error("FAIL",String(e).slice(-140));process.exit(1);});
