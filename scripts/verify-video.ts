import { PrismaClient } from "@prisma/client";
import { renderPublishHtml } from "@/lib/site/render";
import { isSiteDocument, normalizeDocument } from "@/lib/site/create";
const prisma = new PrismaClient();
async function main(){
  const p = await prisma.project.findFirst({ where: { slug: "cinema-video-demo" } });
  if(!p || !isSiteDocument(p.document)){ console.log("нет"); return; }
  const doc = normalizeDocument(p.document as never);
  const out = renderPublishHtml(doc, doc.activePageId, { inline: true });
  for(const probe of ["/assets/demo/luxury.mp4","/assets/demo/bold.mp4","/assets/demo/brutalist.mp4",'data-story-mode="scrub"',"data-smooth-loop",">0.3<",">2.5<",">4.6<","data-story-gesture","<em>свет решает всё</em>","readChapterFields"]){
    console.log((out.html.includes(probe)||out.js.includes(probe)?"ok  ":"MISS ")+probe);
  }
}
main().finally(()=>prisma.$disconnect());
