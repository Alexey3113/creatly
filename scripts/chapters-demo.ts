/**
 * Демо системы «бесшовные главы + foreground»: slug=chapters-demo.
 * Запуск: npx tsx --tsconfig tsconfig.json scripts/chapters-demo.ts
 */
import { PrismaClient } from "@prisma/client";
import { createEmptyDocument } from "@/lib/site/create";
import { applyOps, type SiteOp } from "@/lib/site/ops";
const prisma = new PrismaClient();

async function main() {
  let doc = createEmptyDocument("Бесшовные главы");
  const ops: SiteOp[] = [
    { op: "add-block", presetId: "header-transparent-01", fields: {
      "hd03-logo": "Chapters", "hd03-cta": "Начать историю",
    } },
    { op: "add-block", presetId: "story-chapters-01", collections: {
      "chp-chapters": [
        { fields: {
          "chp-tag": "Глава 01 · Тишина", "chp-word": "Замысел",
          "chp-sub": "Каждый большой проект начинается в темноте — с одного точного вопроса: что должно остаться в памяти?",
          "chp-bg": "/assets/demo/luxury.webp",
          "chp-fg-a": "/assets/demo/editorial.webp", "chp-fg-b": "/assets/demo/aurora.webp",
        } },
        { fields: {
          "chp-tag": "Глава 02 · Движение", "chp-word": "Материя",
          "chp-sub": "Идея обретает фактуру: свет ведёт взгляд, ритм задаёт темп, движение рассказывает то, что не скажет текст.",
          "chp-bg": "/assets/demo/tech.mp4",
          "chp-fg-a": "/assets/demo/brutalist.webp", "chp-fg-b": "/assets/demo/bold.webp",
        } },
        { fields: {
          "chp-tag": "Глава 03 · Столкновение", "chp-word": "Контраст",
          "chp-sub": "История без конфликта не запоминается. Мы сталкиваем фактуры, масштабы и темп — и держим внимание.",
          "chp-bg": "/assets/demo/brutalist.webp",
          "chp-fg-a": "/assets/demo/tech.webp", "chp-fg-b": "/assets/demo/luxury.webp",
        } },
        { fields: {
          "chp-tag": "Глава 04 · Свет", "chp-word": "История",
          "chp-sub": "Сайт, который не листают — который проживают. И пересказывают другим.",
          "chp-bg": "/assets/demo/bold.mp4",
          "chp-fg-a": "/assets/demo/aurora.webp", "chp-fg-b": "/assets/demo/editorial.webp",
        } },
      ],
    } },
    { op: "add-block", presetId: "cta-banner-02", fields: {
      "cta-heading": "Ваша история начинается здесь",
      "cta-description": "Соберём сайт-кино под ваш бренд: главы, свет, движение.",
      "cta-button-primary": "Запросить показ",
    } },
    { op: "add-block", presetId: "footer-columns-02", variantId: "dark" },
    { op: "set-tokens", tokens: {
      "--color-bg": "#08080d", "--color-bg-alt": "#0e0e15", "--color-surface": "#14141c",
      "--color-text": "#f5f5f7", "--color-text-muted": "rgba(235,235,245,.6)",
      "--color-primary": "#0e0e15", "--color-border": "rgba(255,255,255,.1)", "--color-accent": "#c9a86a",
    } },
  ];
  const r = applyOps(doc, ops);
  if (r.errors.length) { console.log("ERR", r.errors); return; }
  doc = r.doc;
  const cta = doc.pages[0].blocks.find((b) => b.presetId === "cta-banner-02");
  if (cta) doc = applyOps(doc, [{ op: "set-block-enter", blockId: cta.id, enter: "zoom-through" }]).doc;

  const user = await prisma.user.findFirst({ orderBy: { id: "asc" } });
  if (!user) return;
  const p = await prisma.project.upsert({
    where: { slug: "chapters-demo" },
    update: { document: doc as never },
    create: { slug: "chapters-demo", name: "Бесшовные главы", document: doc as never, userId: user.id },
  });
  console.log(`готово: http://localhost:3000/editor?project=${p.id}`);
}
main().finally(() => prisma.$disconnect());
