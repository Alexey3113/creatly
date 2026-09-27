import { PrismaClient } from "@prisma/client";
import { renderPublishHtml } from "@/lib/site/render";
import { isSiteDocument, normalizeDocument } from "@/lib/site/create";
const prisma = new PrismaClient();
async function chk(slug: string){
  const p = await prisma.project.findFirst({ where: { slug } });
  if(!p||!isSiteDocument(p.document)){console.log(slug,"нет");return;}
  const doc = normalizeDocument(p.document as never);
  const out = renderPublishHtml(doc, doc.activePageId, { inline: true });
  const enters = (out.html.match(/data-enter="[a-z-]+"/g)||[]);
  const deck = out.html.includes('class="cinema-deck"');
  console.log(`${slug}: enters=${enters.length} [${[...new Set(enters)].join(",")}] cinema=${deck} runtime=${out.js.includes("transformFor")}`);
}
async function main(){ await chk("transitions-scroll"); await chk("transitions-cinema"); }
main().finally(()=>prisma.$disconnect());
