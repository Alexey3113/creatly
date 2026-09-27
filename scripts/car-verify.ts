import { PrismaClient } from "@prisma/client";
import { renderPublishHtml } from "@/lib/site/render";
import { isSiteDocument, normalizeDocument } from "@/lib/site/create";
const prisma = new PrismaClient();
async function main(){
  const p = await prisma.project.findFirst({ where: { slug: "m-motors-demo" } });
  if(!p||!isSiteDocument(p.document))return;
  const doc = normalizeDocument(p.document as never);
  const out = renderPublishHtml(doc, doc.activePageId, { inline: true });
  for(const probe of ["car2.mp4","car2-poster.jpg",'data-scene-scrub="1"',"cscene__scrim","currentTime=Math.max(seekTarget,0.02)","[creatly-runtime]","625","3.2 сек","data-tilt","data-count","data-coverflow","<em>ощущения</em>","Записаться на тест-драйв"]){
    console.log((out.html.includes(probe)||out.js.includes(probe)?"ok  ":"MISS ")+probe);
  }
  const veils = (out.css.match(/backdrop-filter:blur\(16px\)/g)||[]).length;
  console.log("veil-секций:", veils);
}
main().finally(()=>prisma.$disconnect());
