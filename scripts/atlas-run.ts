/** АТЛАС — архитектурное бюро. showcase-grid: сетка проектов + стек кейсов. Светлый editorial. */
import { PrismaClient } from "@prisma/client";
import { join } from "path";
import { higsAvailable, higsDownload, higsGenerateImage } from "@/lib/ai/higs";
import { createEmptyDocument } from "@/lib/site/create";
import { applyOps, type SiteOp } from "@/lib/site/ops";
const prisma = new PrismaClient();
const DIR = join(process.cwd(), "public", "uploads", "1", "gen");
const WEB = "/uploads/1/gen"; const S = "atlas"; const FOLDER = "atlas-arch";
const t0 = Date.now(); const log = (m: string) => console.log(`[${((Date.now()-t0)/60000).toFixed(1)}м] ${m}`);
const U = "award-winning contemporary architecture, board-formed concrete, floor-to-ceiling glass, warm natural oak, minimalist interiors flooded with soft daylight, clean editorial architectural photography, calm precise and expensive, no people no text";
async function frame(id: string, p: string): Promise<string|null> {
  for (let a=0;a<3;a++){ try { const url=await higsGenerateImage({prompt:`${p}, ${U}, cinematic, 16:9, no text, no watermark`,jobId:`${S}-${id}-${a}-${Date.now().toString(36)}`,folder:FOLDER}); const l=join(DIR,`${S}-${id}.jpg`); await higsDownload(url,l); return l; } catch(e){ log(`  ${id} #${a+1}: ${String(e).slice(0,70)}`);} } return null;
}
async function pool<T>(tasks:(()=>Promise<T>)[],limit=6):Promise<T[]>{const out:T[]=new Array(tasks.length);let i=0;await Promise.all(Array.from({length:Math.min(limit,tasks.length)},async()=>{while(i<tasks.length){const k=i++;out[k]=await tasks[k]();}}));return out;}
async function main(){
  if(!(await higsAvailable())) throw new Error("offline");
  log("кадры проектов…");
  const specs:[string,string][]=[
    ["hero","a striking concrete-and-glass villa on a hillside at dusk, warm interior light glowing, wide architectural hero shot"],
    ["p1","a minimalist concrete house exterior, sharp cantilever, reflecting pool"],
    ["p2","a double-height living space, floor-to-ceiling glass, oak floor, sunlight"],
    ["p3","a concrete staircase sculpture with a skylight above, dramatic shadow"],
    ["p4","a kitchen of stone and oak, island, glass wall to a garden"],
    ["p5","a bedroom opening to a terrace with a sea view, minimalist"],
    ["p6","a museum-like gallery interior, concrete walls, art, daylight from above"],
    ["portrait","a calm architect in a dark shirt standing in a concrete studio with models on the table"],
  ];
  const fr=await pool(specs.map(([id,p])=>()=>frame(id,p)));
  const path=(id:string)=>{const i=specs.findIndex(s=>s[0]===id); return fr[i]?`${WEB}/${S}-${id}.jpg`:`${WEB}/${S}-hero.jpg`;};
  log("сборка…");
  let doc=createEmptyDocument("АТЛАС — архитектурное бюро");
  const ops:SiteOp[]=[
    {op:"set-fonts",heading:"Cormorant Garamond",body:"Jost"},
    {op:"set-tokens",tokens:{"--color-bg":"#f3f1ec","--color-bg-alt":"#e9e6df","--color-surface":"#ffffff","--color-text":"#22201c","--color-text-muted":"#6b6860","--color-primary":"#2c2a26","--color-accent":"#9a6a44","--color-border":"#dcd8cf"}},
    {op:"add-block",presetId:"header-minimal-01",fields:{"hd01-logo":"АТЛАС"}},
    {op:"add-block",presetId:"hero-poster-01",variantId:"bottom-left",fields:{"hp01-media":path("hero"),"hp01-eyebrow":"АТЛАС · архитектурное бюро","hp01-title":"Дома, которые *переживут* нас","hp01-text":"Проектируем частные виллы и общественные пространства с 2009 года.","hp01-cta":"Смотреть проекты"}},
    {op:"add-block",presetId:"gallery-grid-02",fields:{"gl02-title":"Избранные *проекты*","gl02-subtitle":"37 реализованных объектов от виллы до музея"},collections:{"gl02-img":[
      {fields:{"gl02-img":path("p1"),"gl02-caption":"Вилла на склоне · 2023"}},
      {fields:{"gl02-img":path("p2"),"gl02-caption":"Дом со светом · 2022"}},
      {fields:{"gl02-img":path("p6"),"gl02-caption":"Частная галерея · 2023"}},
      {fields:{"gl02-img":path("p4"),"gl02-caption":"Кухня-сад · 2021"}},
      {fields:{"gl02-img":path("p3"),"gl02-caption":"Лестница-скульптура · 2022"}},
      {fields:{"gl02-img":path("p5"),"gl02-caption":"Спальня у моря · 2024"}},
    ]}},
    {op:"add-block",presetId:"story-stack-01",fields:{"ss01-eyebrow":"Как мы работаем","ss01-title":"Путь одного *проекта*"},collections:{"ss01-cards":[
      {fields:{"ss01-card-image":path("p1"),"ss01-card-tag":"01 · Диалог","ss01-card-title":"Слушаем участок","ss01-card-text":"Свет, ветер, вид, соседи — дом начинается с места, а не с эскиза."}},
      {fields:{"ss01-card-image":path("p3"),"ss01-card-tag":"02 · Форма","ss01-card-title":"Ищем единственную линию","ss01-card-text":"Десятки макетов ради одного силуэта, который нельзя изменить."}},
      {fields:{"ss01-card-image":path("p2"),"ss01-card-tag":"03 · Материя","ss01-card-title":"Бетон, стекло, дерево","ss01-card-text":"Честные материалы, которые стареют красиво и не требуют масок."}},
      {fields:{"ss01-card-image":path("p5"),"ss01-card-tag":"04 · Жизнь","ss01-card-title":"Ведём до последней ручки","ss01-card-text":"Авторский надзор до момента, когда вы поворачиваете ключ."}},
    ]}},
    {op:"add-block",presetId:"case-studies-counters-01",fields:{"csc01-title":"Бюро в цифрах"},collections:{"csc01-stats":[
      {fields:{"csc01-value":"37","csc01-label":"реализованных объектов"}},
      {fields:{"csc01-value":"15 лет","csc01-label":"практики"}},
      {fields:{"csc01-value":"9","csc01-label":"наград и публикаций"}},
      {fields:{"csc01-value":"100%","csc01-label":"с авторским надзором"}},
    ]}},
    {op:"add-block",presetId:"testimonials-quote-01",fields:{"tm03-quote":"Они спорили с нами полгода — и оказались правы в каждой мелочи. Дом дышит.","tm03-name":"Семья Верещагиных","tm03-position":"частная вилла, 2023","tm03-avatar":path("portrait")}},
    {op:"add-block",presetId:"cta-split-02",fields:{"cta-image":path("hero"),"cta-heading":"Расскажите о вашем участке","cta-description":"Первая встреча — бесплатно. Приезжаем на место, слушаем, через две недели показываем концепцию.","cta-button":"Записаться на встречу"}},
    {op:"add-block",presetId:"footer-dark-01",variantId:"gradient-line",fields:{"footer-logo":"АТЛАС","footer-description":"Архитектурное бюро полного цикла. Частные виллы, общественные пространства, интерьеры.","footer-contact-text":"studio@atlas.arch · Москва","footer-copyright":"© АТЛАС. Дома, которые переживут нас."}},
  ];
  const r=applyOps(doc,ops); if(r.errors.length) log(`errors: ${r.errors.join("; ")}`); doc=r.doc;
  const enters:Record<string,string>={"gallery-grid-02":"rise","story-stack-01":"fade","case-studies-counters-01":"zoom-in","testimonials-quote-01":"fade","cta-split-02":"rise","footer-dark-01":"fade"};
  doc=applyOps(doc,doc.pages[0].blocks.filter(b=>enters[b.presetId]).map(b=>({op:"set-block-enter" as const,blockId:b.id,enter:enters[b.presetId] as never}))).doc;
  const user=await prisma.user.findFirst({orderBy:{id:"asc"}}); if(!user) return;
  const p=await prisma.project.upsert({where:{slug:"atlas-arch"},update:{document:doc as never},create:{slug:"atlas-arch",name:"АТЛАС — архитектурное бюро",document:doc as never,userId:user.id}});
  log(`ГОТОВО: http://localhost:3000/editor?project=${p.id}`);
}
main().catch(e=>{console.error("ATLAS FAILED:",String(e).slice(0,200));process.exit(1);}).finally(()=>prisma.$disconnect());
