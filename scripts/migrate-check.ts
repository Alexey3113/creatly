import { PrismaClient } from "@prisma/client";
import { normalizeDocument, isSiteDocument } from "@/lib/site/create";
import { renderPage } from "@/lib/site/render";

const prisma = new PrismaClient();
async function main() {
  const project = await prisma.project.findFirst({ where: { slug: { startsWith: "hochu-sdelat" } } });
  if (!project || !isSiteDocument(project.document)) { console.log("проект не найден или без документа"); return; }
  const doc = normalizeDocument(project.document as never);

  for (const b of doc.pages[0].blocks) {
    const colls = Object.entries(b.collections || {}).map(([n, items]) => `${n}(${items.length})`).join(", ");
    console.log(`${b.presetId}: fields=${Object.keys(b.fields).length}${colls ? " | " + colls : ""}`);
  }

  const page = renderPage(doc, doc.pages[0].id, { mode: "preview" });
  console.log(`\n"Аудит роста" встречается: ${(page.html.match(/Аудит роста/g) || []).length} раз (было 3 одинаковых)`);
  console.log(`Заголовки колонок футера различаются: ${page.html.includes("Навигация") && !/НАВИГАЦИЯ[\s\S]{0,600}НАВИГАЦИЯ[\s\S]{0,600}НАВИГАЦИЯ/i.test(page.html.replace(/Навигация/g, "НАВИГАЦИЯ").slice(0, 999999)) ? "проверь глазами" : "см. рендер"}`);
  console.log(`reveal выключен в превью: ${page.css.includes("opacity:1!important")}`);
  await prisma.project.update({ where: { id: project.id }, data: { document: doc as never } });
  console.log("документ мигрирован и сохранён в БД");
}
main().finally(() => prisma.$disconnect());
