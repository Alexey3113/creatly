import { join } from "path";
import { existsSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImage } from "@/lib/ai/higs";
const DIR = join(process.cwd(), "public", "uploads", "1", "hooks", "sites");
const F = "visual-hooks";
const jobs:[string,string,string,string][]=[ // name, model, aspect, prompt
 ["veu","nano-banana-pro","16:9","Extreme editorial close-up of a woman's face wearing oversized sculptural sunglasses, the mirrored lenses reflecting a surreal gradient sunset, bold minimal fashion, cinematic, hyper-detailed. 16:9."],
 ["sillage","soul-cinematic","16:9","A giant serene woman's face emerging from soft pink and peach clouds, a glass perfume bottle floating in front, dreamy surreal editorial, pastel, cinematic, minimal. 16:9."],
 ["drift","nano-banana-pro","16:9","A single sculptural white sneaker floating weightless in soft pink and lilac clouds, surreal dreamscape, editorial product hero, cinematic, minimal negative space. 16:9."],
 ["mono","soul-cinematic","16:9","A lone minimalist concrete house floating on a perfectly mirror-still lake in soft fog, surreal architectural, muted, cinematic, minimal. 16:9."],
 ["phantom","soul-cinematic","16:9","A sleek matte-black luxury car alone on an endless white salt flat under a vast surreal gradient sky, cinematic, minimal editorial, dramatic. 16:9."],
 ["horologe","nano-banana-pro","16:9","A luxury mechanical watch floating in dark space with a swirling galaxy nebula inside its open dial, surreal macro, premium, cinematic, hyper-detailed. 16:9."],
 ["forge-blade1","nano-banana-pro","16:9","Extreme macro of a hand-forged damascus steel knife blade, flowing water-pattern steel, dark moody background, single dramatic light, premium, hyper-detailed. 16:9."],
 ["forge-blade2","nano-banana-pro","16:9","A finished chef's knife with a walnut handle resting on dark slate, warm rim light, editorial product macro, cinematic, hyper-detailed. 16:9."],
 ["forge-quench","nano-banana-pro","16:9","A glowing orange-hot blade plunged into oil, steam and fire bursting up in a dark smithy, dramatic, cinematic, hyper-detailed. 16:9."],
];
async function g(name:string,model:string,aspect:string,prompt:string){
 if(existsSync(join(DIR,`${name}.jpg`))){console.log("skip",name);return;}
 try{const u=await higsGenerateImage({model,aspectRatio:aspect,quality:"2K",folder:F,jobId:`concept-${name}-${Date.now().toString(36)}`,prompt});await higsDownload(u,join(DIR,`${name}.jpg`));console.log("ok",name);}catch(e){console.log("fail",name,String(e).slice(-40));}
}
(async()=>{if(!(await higsAvailable()))throw new Error("bot off");await Promise.allSettled(jobs.map(j=>g(j[0],j[1],j[2],j[3])));console.log("concepts done");})().catch(e=>{console.error(e);process.exit(1);});
