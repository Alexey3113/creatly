import { join } from "path"; import { mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","anim","porsche"); mkdirSync(DIR,{recursive:true});
const F="visual-hooks";
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  const prompt="EXACTLY ONE single silver metallic Porsche 911 GT3 sports car with a large rear wing, three-quarter rear view, glossy reflective bodywork catching cool light, isolated and centered on a plain flat neutral light-grey studio background with soft contact shadow. ONLY ONE car, no second car, no duplicate, no reflection, no mirror image. Sharp automotive studio photography. No text, no license plate text, no logo.";
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:"16:9",quality:"2K",folder:F,jobId:`ps-car2-${Date.now().toString(36)}`,prompt});
  await higsDownload(u, join(DIR,"car.jpg")); console.log("ok car");
  const c=await higsRemoveBackground(join(DIR,"car.jpg"), `ps-carcut2-${Date.now().toString(36)}`, F);
  await higsDownload(c, join(DIR,"car-cut.png")); console.log("cut car");
})().catch(e=>{console.error("FAIL",String(e).slice(-120));process.exit(1);});
