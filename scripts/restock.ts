import { PrismaClient } from "@prisma/client";
import { assignStockImages } from "@/lib/site/generate";
import { stockThemeById } from "@/lib/site/stock";
import { isSiteDocument, normalizeDocument } from "@/lib/site/create";

const prisma = new PrismaClient();
async function main() {
  const id = Number(process.argv[2] || 11);
  const theme = process.argv[3] || "medical";
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project || !isSiteDocument(project.document)) { console.log("нет документа"); return; }
  const doc = normalizeDocument(project.document as never);
  assignStockImages(doc, stockThemeById(theme));
  await prisma.project.update({ where: { id }, data: { document: doc as never } });
  const json = JSON.stringify(doc);
  console.log(`проект ${id}: unsplash-фото = ${(json.match(/images\.unsplash/g) || []).length}, тема = ${theme}`);
  const uniq = new Set(json.match(/photo-[0-9a-f-]+/g));
  console.log(`уникальных фото: ${uniq.size}`);
}
main().finally(() => prisma.$disconnect());
