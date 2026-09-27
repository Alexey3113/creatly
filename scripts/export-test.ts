import { PrismaClient } from "@prisma/client";
import { renderPublishHtml } from "@/lib/site/render";
import { isSiteDocument, normalizeDocument } from "@/lib/site/create";
const prisma = new PrismaClient();
function assert(c: boolean, m: string){ if(!c){console.error("FAIL:",m);process.exitCode=1;} else console.log("ok:",m); }
async function main(){
  const p = await prisma.project.findFirst({ where: { slug: "m-motors-demo" } });
  if(!p||!isSiteDocument(p.document))return;
  const doc = normalizeDocument(p.document as never);
  const out = renderPublishHtml(doc, doc.activePageId, {});
  // та же логика, что в exportZip
  const media = new Set<string>();
  for (const m of (out.html + out.css).matchAll(/["'(](\/(?:assets|uploads)\/[^"')?#]+)/g)) media.add(m[1]);
  console.log("собрано медиа:", [...media].join(", ") || "(пусто)");
  assert(media.has("/assets/demo/car2.mp4"), "видео сцены попало в список");
  assert(media.has("/assets/demo/car2-poster.jpg"), "постер попал в список");
  const rel = out.html.replace(/(["'(])\/(assets|uploads)\//g, "$1$2/");
  assert(!/["'(]\/assets\//.test(rel), "ссылки переписаны на относительные");
  assert(rel.includes('src="assets/demo/car2.mp4"'), "относительный путь видео корректен");
  // и все файлы реально существуют
  const fs = await import("fs");
  for (const m of media) {
    assert(fs.existsSync("public" + m), `файл существует: ${m}`);
  }
}
main().finally(()=>prisma.$disconnect());
