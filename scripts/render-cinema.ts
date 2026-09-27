import { PrismaClient } from "@prisma/client";
import { renderPublishHtml } from "@/lib/site/render";
import { isSiteDocument, normalizeDocument } from "@/lib/site/create";
const prisma = new PrismaClient();
async function main(){
  const p = await prisma.project.findFirst({ where: { slug: "cinema-static-demo" } });
  if(!p || !isSiteDocument(p.document)){ console.log("нет"); return; }
  const doc = normalizeDocument(p.document as never);
  const out = renderPublishHtml(doc, doc.activePageId, { inline: true });
  for(const probe of ["/assets/demo/editorial.webp","/assets/demo/tech.webp","/assets/demo/brutalist.webp","/assets/demo/luxury.webp","/assets/demo/bold.webp","data-reveal-mask","cscene--aurora","b-sz01__frame","<em>сырую форму</em>"]){
    console.log((out.html.includes(probe)?"ok  ":"MISS ")+probe);
  }
  console.log("html size:", Math.round(out.html.length/1024)+"kb");
}
main().finally(()=>prisma.$disconnect());
