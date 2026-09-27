import { PrismaClient } from "@prisma/client";
import { renderPage } from "@/lib/site/render";
import { isSiteDocument, normalizeDocument } from "@/lib/site/create";

const prisma = new PrismaClient();
async function main() {
  const project = await prisma.project.findUnique({ where: { id: Number(process.argv[2] || 11) } });
  if (!project || !isSiteDocument(project.document)) return;
  const doc = normalizeDocument(project.document as never);
  const page = renderPage(doc, doc.activePageId, { mode: "publish" });
  // Разные номера в нумерованных списках?
  for (const probe of ["01", "02", "03", "04"]) {
    console.log(`"${probe}" в html: ${(page.html.match(new RegExp(">" + probe + "<", "g")) || []).length}`);
  }
  console.log("медицинские фото в html:", (page.html.match(/photo-(1629909613654|1588776814546|1559839734|1622253692010|1594824476967|1537368910025)/g) || []).length);
  console.log("одинаковых соседних src:", /src="([^"]+)"[^]{0,600}src="\1"/.test(page.html) ? "есть (норм для сеток с малым пулом)" : "нет");
}
main().finally(() => prisma.$disconnect());
