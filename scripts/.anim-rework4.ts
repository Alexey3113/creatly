import { join } from "path"; import { existsSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImageAsync, higsRemoveBackground } from "@/lib/ai/higs";
const ROOT = join(process.cwd(),"public","uploads","1","hooks","sites","anim");
const PINS = join(process.cwd(),"analitic","pins");
const F="visual-hooks";
async function gen(slug:string,name:string,aspect:string,prompt:string,ref?:string){
  const out=join(ROOT,slug,`${name}.jpg`); if(existsSync(out)){console.log("skip",slug,name);return out;}
  const u=await higsGenerateImageAsync({model:"nano-banana-pro",aspectRatio:aspect,quality:"1k",folder:F,jobId:`rw-${slug}-${name}-${Date.now().toString(36)}`,prompt,refFrames:ref?[ref]:undefined});
  await higsDownload(u,out); console.log("ok",slug,name); return out;
}
async function cut(src:string,slug:string,outname:string){
  try{ const u=await higsRemoveBackground(src,`rw-${slug}-cut-${Date.now().toString(36)}`,F); await higsDownload(u,join(ROOT,slug,`${outname}.png`)); console.log("cut",slug,outname);}
  catch(e){console.log("cut-fail",slug,String(e).slice(-50));}
}
(async()=>{
  if(!(await higsAvailable()))throw new Error("higs bot off");
  // 1) ESCORT — перегенерация девушки: кинематографично, золото+изумруд, светящийся луч снизу
  const fig = await gen("escort","figv2","2:3",
    "Cinematic editorial full-length poster portrait of exactly one elegant woman standing, poised and composed, wearing a floor-length dark emerald-black evening gown with long sleeves, holding a small gold-embroidered clutch at her waist. Dramatic low-key lighting: a warm golden light shaft rises from below and behind her and rims her whole silhouette in gold, cool deep-emerald ambient fills the shadows, faint haze in the air. Lit like a couture magazine cover — confident, dignified, tasteful and sophisticated, fully clothed and SFW. Deep emerald-noir tones with gold rim highlights, strong chiaroscuro, film grain. Isolated on a plain very dark near-black studio backdrop with a soft gold-green glow behind her, generous empty margin all around the full figure for clean cutout. No text, no logos.",
    join(PINS,"escort.jpg"));
  await cut(fig,"escort","figure-cut");
  // 2) CARDEALER — сумеречный сад в цвету (тёмный аметист + розовый), пустая сцена под машину
  await gen("cardealer","blossombg","16:9",
    "Cinematic wide dusk scene matching the moody purple-and-pink art direction of the reference. Deep aubergine-amethyst twilight sky, bare cherry-blossom branches heavy with glowing pink and magenta blossoms arching across the top and both sides, a wet reflective dark asphalt forecourt in the foreground catching soft pink light, gentle bokeh, an empty dark clearing in the lower center where a car will be placed, deep rich shadows. Moody, luxurious, magazine-poster lighting, near-black background with pink blossom accents. No car, no people, no text.",
    join(PINS,"cardealer.jpg"));
  // 3) FREESTYLE — рваная бумага поверх гранж-бетона, монохром зин
  await gen("freestyle","paperbg","16:9",
    "A gritty street-zine poster background matching the torn-paper art direction of the reference. The top forty percent is torn, crumpled off-white printed newsprint paper with subtle texture and a rough ripped bottom edge; below the tear is dark grungy black concrete and scuffed asphalt with dust, scratches, scuffs and heavy grain. High-contrast cold monochrome, empty, no subject, no text, dramatic streetwear aesthetic.",
    join(PINS,"freestyle.jpg"));
  // 4) PHOTOGRAPHER — тёплый золотой-час портрет (обложка), справа, слева место под текст
  await gen("photographer","coverportrait","2:3",
    "A warm golden-hour editorial portrait photograph of exactly one person, a striking woman with natural freckled skin and soft windblown hair, gazing calmly toward the camera, lit by warm late-afternoon sun, shot on 35mm film with shallow depth of field and gentle grain. Warm cream, honey and soft-coral tones, intimate and natural, on-location not studio. She fills the right side of the frame with headroom above; a plain warm out-of-focus wall on the left leaves room for text. No text, no logos.",
    join(PINS,"photographer.jpg"));
  // 5) PHOTOGRAPHER — тёплая мятая бумага (фон-панель)
  await gen("photographer","paper","16:9",
    "A warm cream crumpled paper texture, soft folds and gentle shadows, faint warm beige and ivory tone, subtle fibre grain, empty, flat magazine paper, high-key, no text, no subject.",
    join(PINS,"photographer.jpg"));
  console.log("REWORK4 DONE");
})().catch(e=>{console.error("FAIL",String(e).slice(-160));process.exit(1);});
