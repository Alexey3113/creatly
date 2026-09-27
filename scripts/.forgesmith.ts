import { join } from "path"; import { mkdirSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync } from "@/lib/ai/higs";
const DIR = join(process.cwd(),"public","uploads","1","hooks","sites","forge-p"); mkdirSync(DIR,{recursive:true});
const PAL="Dark editorial poster art, in the style of a dramatic album cover: steel-blue and graphite duotone with a single molten-orange ember accent, one hard rim light, painterly cinematic 3D sculpt, fine film grain, near-black background, heavy negative space around the subject, matte, moody, very high contrast. no text, no letters, no watermark, no border.";
const prompt=`A lone master blacksmith frozen mid-swing, a heavy forging HAMMER raised high over his head, about to strike a glowing ember-orange billet of steel on the anvil. Low heroic angle, powerful sculptural silhouette, heavy leather apron, face lost in shadow. The raised hammer and the glowing billet are the focal points; ember light glows from the anvil while cold steel-blue light rims the figure from behind. Sparks frozen in the air. Centered composition with deep empty negative space above and around the figure for a poster title. ${PAL}`;
(async()=>{
  if(!(await higsAvailable())) throw new Error("higs bot off");
  console.log("generating smith (hammer)...");
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:"1:1",quality:"2K",folder:"visual-hooks",jobId:`fp-smith-${Date.now().toString(36)}`,prompt});
  await higsDownload(u, join(DIR,"smith.jpg"));
  console.log("ok smith ->", join(DIR,"smith.jpg"));
})().catch(e=>{console.error("FAIL:", String(e).slice(-120)); process.exit(1);});
