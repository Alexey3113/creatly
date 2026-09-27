import path from "node:path";
import { higsAvailable, higsGenerateImageAsync, higsDownload } from "@/lib/ai/higs";
async function main(){
  if(!(await higsAvailable())) throw new Error("Higs down");
  const url=await higsGenerateImageAsync({jobId:`monolith-${Date.now().toString(36)}`,folder:"animated",aspectRatio:"16:9",quality:"2k",
    prompt:"Painterly cinematic fantasy concept-art key-art. A lone cloaked traveler silhouette on a dark rocky ledge in the foreground, gazing up at a colossal glowing arcane spire-structure rising through magenta and indigo dusk mist in the distance, drifting golden ember particles, layered volumetric fog at separated depths, dramatic god-ray backlight, epic painterly brushwork, awe and mystery, cool magenta-indigo palette with warm ember accents. No text, no interface, no watermark."});
  await higsDownload(url, path.join("public/uploads/1/animated","monolith-hero-v2.jpg"));
  console.log("OK monolith-v2");
}
main().catch(e=>{console.error(e);process.exit(1);});
