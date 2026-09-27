/** ТРОПА — эко-ретрит на острове. cinematic-journey, тёплый тропический регистр (контраст luxury-холоду). */
import { PrismaClient } from "@prisma/client";
import { join } from "path";
import { higsAvailable, higsDownload, higsGenerateImage, higsGenerateVideo } from "@/lib/ai/higs";
import { concatScrub, extractPoster } from "@/lib/media/ffmpeg";
import { createEmptyDocument } from "@/lib/site/create";
import { applyOps, type SiteOp } from "@/lib/site/ops";
const prisma = new PrismaClient();
const DIR = join(process.cwd(), "public", "uploads", "1", "gen");
const WEB = "/uploads/1/gen"; const S = "tropa"; const FOLDER = "tropa-resort";
const t0 = Date.now(); const log = (m: string) => console.log(`[${((Date.now()-t0)/60000).toFixed(1)}м] ${m}`);
const U = "a luxury eco-resort on a tropical island at golden hour, turquoise water, white sand, teak-wood villas on stilts, lush green jungle, infinity pool merging with the ocean, warm honeyed sunlight, airy and paradisiacal, cinematic travel photography, no people no text";
async function frame(id:string,p:string,ref?:string):Promise<string|null>{ for(let a=0;a<3;a++){try{const url=await higsGenerateImage({prompt:`${p}, ${U}, cinematic, 16:9, no text, no watermark`,jobId:`${S}-${id}-${a}-${Date.now().toString(36)}`,folder:FOLDER,refFrames:ref?[ref]:undefined});const l=join(DIR,`${S}-${id}.jpg`);await higsDownload(url,l);return l;}catch(e){log(`  ${id} #${a+1}: ${String(e).slice(0,70)}`);}}return null;}
async function main(){
  if(!(await higsAvailable())) throw new Error("offline");
  log("кадры пролёта: 6…");
  const cp=[
    "aerial approach over turquoise water toward a tropical island with teak villas along a white-sand beach",
    "a wooden boardwalk through lush jungle leading to a villa, dappled sunlight, tropical plants",
    "the open-air interior of a teak villa, gauzy curtains, a bed facing the ocean through open walls",
    "an outdoor stone bathroom with a rain shower open to the jungle canopy",
    "an infinity pool at the villa's edge merging with the turquoise ocean, loungers, palm shadows",
    "the beach at sunset, a lone hammock between palms, the sun melting into the sea, warm glow",
  ];
  const chain:string[]=[]; for(let i=0;i<cp.length;i++){const f=await frame(`chain-${i}`,cp[i],chain[i-1]);if(!f)throw new Error(`кадр ${i}`);chain.push(f);log(`  ${i+1}/${cp.length}`);}
  log("видео-мосты: 5 сегментов…");
  const mo=[
    "camera flies low over the turquoise water toward the island villas",
    "camera glides along the jungle boardwalk toward the villa entrance",
    "camera drifts through the open villa interior toward the ocean view",
    "camera moves from the villa out to the infinity pool edge",
    "camera glides along the beach toward the hammock as the sun sets into the sea",
  ];
  const clips:string[]=[]; for(let i=0;i<mo.length;i++){let ok=false;for(let a=0;a<3&&!ok;a++){try{const url=await higsGenerateVideo({prompt:`${mo[i]}, slow smooth continuous camera move, warm golden light, no cuts, no scene change, seamless, cinematic`,jobId:`${S}-seg-${i}-${a}-${Date.now().toString(36)}`,folder:FOLDER,startFrame:chain[i],endFrame:chain[i+1],duration:5});const l=join(DIR,`${S}-seg-${i}.mp4`);await higsDownload(url,l);clips.push(l);ok=true;log(`  сег ${i+1}/${mo.length}`);}catch(e){log(`  сег ${i+1} #${a+1}: ${String(e).slice(0,80)}`);}}if(!ok)break;}
  let hero:string|null=null; if(clips.length===mo.length){const hv=join(DIR,`${S}-film.mp4`);await concatScrub(clips,hv);await extractPoster(hv,join(DIR,`${S}-film-poster.jpg`));hero=`${WEB}/${S}-film.mp4`;log("фильм ✓");}
  const cw=(i:number)=>`${WEB}/${S}-chain-${i}.jpg`;
  log("сборка…");
  let doc=createEmptyDocument("ТРОПА — эко-ретрит на острове");
  const ops:SiteOp[]=[
    {op:"set-fonts",heading:"Cormorant Garamond",body:"Jost"},
    {op:"set-tokens",tokens:{"--color-bg":"#0f1512","--color-bg-alt":"#16201b","--color-surface":"#1d2822","--color-text":"#f0f4ec","--color-text-muted":"#9db0a2","--color-primary":"#1d3a2e","--color-accent":"#e0a34e","--color-border":"#26332b"}},
    {op:"add-block",presetId:"header-transparent-01",fields:{"hd03-logo":"ТРОПА","hd03-cta":"Забронировать виллу"}},
  ];
  if(hero){ops.push({op:"add-block",presetId:"story-poster-01",variantId:"center",fields:{"sp01-video":hero,"sp01-meta-left":"ТРОПА · частный эко-ретрит","sp01-meta-right":"12 вилл у океана"},collections:{"sp01-chapters":[
    {fields:{"sp01-step-text":"ТРОПА. Где кончается *связь* и начинаетесь вы.","sp01-step-time":"5"}},
    {fields:{"sp01-step-text":"Вилла без стен — только *океан* и вы.","sp01-step-time":"11"}},
    {fields:{"sp01-step-text":"Душ под открытым *небом*.","sp01-step-time":"17"}},
    {fields:{"sp01-step-text":"Бассейн, который стёр *горизонт*.","sp01-step-time":"22"}},
    {fields:{"sp01-step-text":"А вечером — только *закат* и гамак.","sp01-step-time":"27"}},
  ]}});}
  else {ops.push({op:"add-block",presetId:"story-prologue-01",fields:{"prl-media":cw(4),"prl-meta":"ТРОПА · частный эко-ретрит","prl-title":"Где кончается *связь*","prl-sub":"12 вилл без стен на частном острове. Только океан, джунгли и вы.","prl-hint":"Листайте — на остров"}});}
  ops.push({op:"add-block",presetId:"story-highlight-01",variantId:"dark",fields:{"hl01-kicker":"Философия","hl01-statement":"Мы не строили отель. Мы *убрали лишнее*: стены, Wi-Fi в спальне, будильники. Осталось то, ради чего вы летели через полмира — *тишина*, солёный ветер и небо, которое видно с подушки."}});
  ops.push({op:"add-block",presetId:"gallery-coverflow-01",variantId:"dark",fields:{"cf01-eyebrow":"Виллы","cf01-title":"Выберите свой *угол острова*"},collections:{"cf01-cards":[
    {fields:{"cf01-card-image":cw(2),"cf01-card-name":"Вилла Океан","cf01-card-tag":"стена-океан, 90 м²"}},
    {fields:{"cf01-card-image":cw(4),"cf01-card-name":"Вилла Инфинити","cf01-card-tag":"свой бассейн"}},
    {fields:{"cf01-card-image":cw(3),"cf01-card-name":"Вилла Джунгли","cf01-card-tag":"душ под небом"}},
    {fields:{"cf01-card-image":cw(5),"cf01-card-name":"Вилла Закат","cf01-card-tag":"гамак у воды"}},
  ]}});
  ops.push({op:"add-block",presetId:"case-studies-counters-01",variantId:"dark",fields:{"csc01-title":"ТРОПА в цифрах"},collections:{"csc01-stats":[
    {fields:{"csc01-value":"12","csc01-label":"вилл на весь остров"}},
    {fields:{"csc01-value":"0","csc01-label":"машин и дорог"}},
    {fields:{"csc01-value":"1","csc01-label":"частный пляж на виллу"}},
    {fields:{"csc01-value":"365","csc01-label":"закатов в год"}},
  ]}});
  ops.push({op:"add-block",presetId:"cta-split-02",fields:{"cta-image":cw(5),"cta-heading":"Остров ждёт вас","cta-description":"Бронируем виллу минимум на 3 ночи и только для одного гостя за раз в каждой. Трансфер на катере, завтрак на террасе, никакого расписания.","cta-button":"Забронировать виллу"}});
  ops.push({op:"add-block",presetId:"footer-dark-01",variantId:"gradient-line",fields:{"footer-logo":"ТРОПА","footer-description":"Частный эко-ретрит на острове. 12 вилл без стен, свой пляж, полное уединение.","footer-contact-text":"stay@tropa.island · WhatsApp только","footer-copyright":"© ТРОПА. Где кончается связь."}});
  const r=applyOps(doc,ops); if(r.errors.length) log(`errors: ${r.errors.join("; ")}`); doc=r.doc;
  const enters:Record<string,string>={"story-highlight-01":"fade","gallery-coverflow-01":"rise","case-studies-counters-01":"zoom-in","cta-split-02":"rise","footer-dark-01":"fade"};
  doc=applyOps(doc,doc.pages[0].blocks.filter(b=>enters[b.presetId]).map(b=>({op:"set-block-enter" as const,blockId:b.id,enter:enters[b.presetId] as never}))).doc;
  const { applyPaletteRhythm } = await import("@/lib/site/generate");
  applyPaletteRhythm(doc, { palette:{ accent:"#e0a34e", primary:"#1d3a2e", bg:"#0f1512", text:"#f0f4ec" } } as never);
  const user=await prisma.user.findFirst({orderBy:{id:"asc"}}); if(!user) return;
  const p=await prisma.project.upsert({where:{slug:"tropa-resort"},update:{document:doc as never},create:{slug:"tropa-resort",name:"ТРОПА — эко-ретрит",document:doc as never,userId:user.id}});
  log(`ГОТОВО: http://localhost:3000/editor?project=${p.id} (фильм: ${hero?"да":"нет"})`);
}
main().catch(e=>{console.error("TROPA FAILED:",String(e).slice(0,200));process.exit(1);}).finally(()=>prisma.$disconnect());
