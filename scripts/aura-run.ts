/** AURA — нишевый парфюм. product-reveal: orbit флакона + макро ноты. Тёмный чувственный люкс. */
import { PrismaClient } from "@prisma/client";
import { join } from "path";
import { higsAvailable, higsDownload, higsGenerateImage, higsGenerateVideo } from "@/lib/ai/higs";
import { concatScrub, extractPoster } from "@/lib/media/ffmpeg";
import { createEmptyDocument } from "@/lib/site/create";
import { applyOps, type SiteOp } from "@/lib/site/ops";
const prisma = new PrismaClient();
const DIR = join(process.cwd(), "public", "uploads", "1", "gen");
const WEB = "/uploads/1/gen"; const S = "aura"; const FOLDER = "aura-parfum";
const t0 = Date.now(); const log = (m: string) => console.log(`[${((Date.now()-t0)/60000).toFixed(1)}м] ${m}`);
const U = "a luxury niche perfume bottle, heavy faceted crystal glass, brushed gold cap, floating amid swirling silk and soft smoke, dark moody background with dramatic rim light, macro product photography, sensual and expensive, no text on bottle";
async function frame(id: string, p: string, ref?: string): Promise<string|null> {
  for (let a=0;a<3;a++){ try { const url=await higsGenerateImage({prompt:`${p}, ${U}, cinematic, 16:9, no text, no watermark`,jobId:`${S}-${id}-${a}-${Date.now().toString(36)}`,folder:FOLDER,refFrames:ref?[ref]:undefined}); const l=join(DIR,`${S}-${id}.jpg`); await higsDownload(url,l); return l; } catch(e){ log(`  ${id} #${a+1}: ${String(e).slice(0,70)}`);} } return null;
}
async function main(){
  if(!(await higsAvailable())) throw new Error("offline");
  log("turntable флакона: 4 кадра…");
  const angles=["front view of the perfume bottle, label facing camera","same bottle rotated 30 degrees three-quarter showing the faceted side","same bottle in profile showing depth and the gold cap edge","same bottle three-quarter back, light refracting through the crystal"];
  const chain:string[]=[]; for(let i=0;i<4;i++){ const f=await frame(`orbit-${i}`,angles[i],chain[i-1]); if(!f) throw new Error(`кадр ${i}`); chain.push(f); log(`  ${i+1}/4`);}
  log("orbit-видео: 3 сегмента…");
  const motions=["the crystal perfume bottle slowly rotates on a turntable, light refracting through the facets","the bottle continues rotating to its profile, silk drifting around it","the bottle rotates to three-quarter back, smoke curling, gold cap catching light"];
  const clips:string[]=[]; for(let i=0;i<3;i++){ let ok=false; for(let a=0;a<3&&!ok;a++){ try{ const url=await higsGenerateVideo({prompt:`${motions[i]}, seamless smooth turntable rotation, macro, no cuts, no scene change, cinematic`,jobId:`${S}-seg-${i}-${a}-${Date.now().toString(36)}`,folder:FOLDER,startFrame:chain[i],endFrame:chain[i+1],duration:5}); const l=join(DIR,`${S}-seg-${i}.mp4`); await higsDownload(url,l); clips.push(l); ok=true; log(`  сег ${i+1}/3`);}catch(e){log(`  сег ${i+1} #${a+1}: ${String(e).slice(0,80)}`);} } if(!ok) break; }
  let orbit:string|null=null; if(clips.length===3){ const ov=join(DIR,`${S}-orbit.mp4`); await concatScrub(clips,ov); await extractPoster(ov,join(DIR,`${S}-orbit-poster.jpg`)); orbit=`${WEB}/${S}-orbit.mp4`; log("orbit ✓"); }
  log("макро-кадры…");
  const notes=await frame("notes","macro of perfume ingredients — rose petals, amber resin, bergamot peel, arranged on dark stone, drops of oil");
  const drop=await frame("drop","extreme macro of a single golden drop of perfume falling, splash frozen, dark background, dramatic light");
  const nt=notes?`${WEB}/${S}-notes.jpg`:`${WEB}/${S}-orbit-0.jpg`; const dr=drop?`${WEB}/${S}-drop.jpg`:nt;
  const cw=(i:number)=>`${WEB}/${S}-orbit-${i}.jpg`;
  log("сборка…");
  let doc=createEmptyDocument("AURA — нишевый парфюм");
  const ops:SiteOp[]=[
    {op:"set-fonts",heading:"Cormorant Garamond",body:"Jost"},
    {op:"set-tokens",tokens:{"--color-bg":"#0e0b12","--color-bg-alt":"#151019","--color-surface":"#1c1622","--color-text":"#f3ecf2","--color-text-muted":"#a596a8","--color-primary":"#2a1d2e","--color-accent":"#c9a15e","--color-border":"#2a2130"}},
    {op:"add-block",presetId:"header-transparent-01",fields:{"hd03-logo":"AURA","hd03-cta":"Подобрать аромат"}},
  ];
  if(orbit){ ops.push({op:"add-block",presetId:"story-poster-01",variantId:"center",fields:{"sp01-video":orbit,"sp01-meta-left":"AURA · нишевая парфюмерия","sp01-meta-right":"Parfum Extrait"},collections:{"sp01-chapters":[{fields:{"sp01-step-text":"AURA. Аромат, который *помнят*.","sp01-step-time":"5"}},{fields:{"sp01-step-text":"30% концентрации. Держится *весь день*.","sp01-step-time":"11"}},{fields:{"sp01-step-text":"Собран вручную во *Франции*.","sp01-step-time":"16"}}]}}); }
  else { ops.push({op:"add-block",presetId:"hero-poster-01",variantId:"bottom-left",fields:{"hp01-media":cw(1),"hp01-eyebrow":"AURA · нишевая парфюмерия","hp01-title":"Аромат, который *помнят*","hp01-text":"Parfum extrait, 30% концентрации, ручная сборка.","hp01-cta":"Подобрать аромат"}}); }
  ops.push({op:"add-block",presetId:"story-showcase-01",fields:{"ss02-eyebrow":"Пирамида","ss02-title":"Три аккорда одной *истории*","ss02-image":nt},collections:{"ss02-steps":[{fields:{"ss02-step-title":"Верх","ss02-step-text":"Бергамот и розовый перец — первый вдох, дерзкий и свежий."}},{fields:{"ss02-step-title":"Сердце","ss02-step-text":"Дамасская роза и ирис — тепло, которое раскрывается через час."}},{fields:{"ss02-step-title":"База","ss02-step-text":"Амбра, уд и ваниль — шлейф, который остаётся на коже до утра."}}]}});
  ops.push({op:"add-block",presetId:"story-zoom-01",fields:{"sz01-eyebrow":"Капля","sz01-title":"Каждая капля — *ручная работа*","sz01-caption":"Мацерация 6 недель, розлив вручную, никаких красителей и наполнителей.","sz01-image":dr}});
  ops.push({op:"add-block",presetId:"features-tilt-01",variantId:"dark",fields:{"ftt01-eyebrow":"Почему AURA","ftt01-title":"Что в *флаконе*"},collections:{"ftt01-cards":[{fields:{"ftt01-card-icon":"✦","ftt01-card-title":"Натуральные эссенции","ftt01-card-text":"Грас, Болгария, Мадагаскар — сырьё от проверенных полей."}},{fields:{"ftt01-card-icon":"◈","ftt01-card-title":"30% экстракт","ftt01-card-text":"Не туалетная вода. Настоящий parfum, который живёт часами."}},{fields:{"ftt01-card-icon":"∞","ftt01-card-title":"Малые партии","ftt01-card-text":"200 флаконов в партии. Каждый пронумерован."}}]}});
  ops.push({op:"add-block",presetId:"case-studies-counters-01",variantId:"dark",fields:{"csc01-title":"AURA в цифрах"},collections:{"csc01-stats":[{fields:{"csc01-value":"30%","csc01-label":"концентрация экстракта"}},{fields:{"csc01-value":"6 нед","csc01-label":"мацерация"}},{fields:{"csc01-value":"14","csc01-label":"нот в композиции"}},{fields:{"csc01-value":"200","csc01-label":"флаконов в партии"}}]}});
  ops.push({op:"add-block",presetId:"cta-split-02",fields:{"cta-image":cw(2),"cta-heading":"Найдите свой аромат","cta-description":"Закажите пробный набор из трёх ароматов — носите неделю, вернитесь за полным флаконом того, что стал вашим.","cta-button":"Заказать пробный набор"}});
  ops.push({op:"add-block",presetId:"footer-dark-01",variantId:"gradient-line",fields:{"footer-logo":"AURA","footer-description":"Нишевая парфюмерия ручной сборки. Parfum extrait малыми партиями.","footer-contact-text":"atelier@aura.parfum · +7 495 000-00-00","footer-copyright":"© AURA Parfum. Аромат, который помнят."}});
  const r=applyOps(doc,ops); if(r.errors.length) log(`errors: ${r.errors.join("; ")}`); doc=r.doc;
  const enters:Record<string,string>={"story-showcase-01":"fade","story-zoom-01":"zoom-in","features-tilt-01":"rise","case-studies-counters-01":"zoom-in","cta-split-02":"rise","footer-dark-01":"fade"};
  doc=applyOps(doc,doc.pages[0].blocks.filter(b=>enters[b.presetId]).map(b=>({op:"set-block-enter" as const,blockId:b.id,enter:enters[b.presetId] as never}))).doc;
  // палитровый ритм тела
  const { applyPaletteRhythm } = await import("@/lib/site/generate");
  const ad={ palette:{ accent:"#c9a15e", primary:"#2a1d2e", bg:"#0e0b12", text:"#f3ecf2" } } as never;
  applyPaletteRhythm(doc, ad);
  const user=await prisma.user.findFirst({orderBy:{id:"asc"}}); if(!user) return;
  const p=await prisma.project.upsert({where:{slug:"aura-parfum"},update:{document:doc as never},create:{slug:"aura-parfum",name:"AURA — нишевый парфюм",document:doc as never,userId:user.id}});
  log(`ГОТОВО: http://localhost:3000/editor?project=${p.id} (orbit: ${orbit?"да":"нет"})`);
}
main().catch(e=>{console.error("AURA FAILED:",String(e).slice(0,200));process.exit(1);}).finally(()=>prisma.$disconnect());
