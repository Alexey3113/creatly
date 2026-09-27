import { PrismaClient } from "@prisma/client";
import { renderPublishHtml } from "@/lib/site/render";
import { isSiteDocument, normalizeDocument } from "@/lib/site/create";
const prisma = new PrismaClient();
async function main(){
  const p = await prisma.project.findFirst({ where: { slug: "scrub-bg-demo" } });
  if(!p || !isSiteDocument(p.document)){ console.log("нет проекта"); return; }
  const doc = normalizeDocument(p.document as never);
  const out = renderPublishHtml(doc, doc.activePageId, { inline: true });
  // 1. синтаксис всего бандла
  try { new Function(out.js); console.log("JS bundle: syntax OK"); }
  catch(e){ console.log("JS bundle SYNTAX ERROR:", (e as Error).message); }
  // 2. каждый рантайм отдельно
  const mods = ["scene-runtime","story-runtime","widgets-runtime","text-runtime","demo-runtime","transitions-runtime"];
  for (const m of mods) {
    const mod = await import(`@/lib/site/${m}`);
    for (const [k, v] of Object.entries(mod)) {
      if (typeof v === "string" && v.includes("function")) {
        try { new Function(v as string); console.log(`${m}.${k}: OK`); }
        catch(e){ console.log(`${m}.${k}: SYNTAX ERROR -> ${(e as Error).message}`); }
      }
    }
  }
  // 3. структура video-сцены в html
  console.log("video-разметка:", out.html.includes('class="cscene__video"'), "| scrub-флаг:", out.html.includes('data-scene-scrub="1"'));
}
main().finally(()=>prisma.$disconnect());
