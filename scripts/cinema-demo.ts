import { PrismaClient } from "@prisma/client";
import { createEmptyDocument } from "@/lib/site/create";
import { applyOps, type SiteOp } from "@/lib/site/ops";

const A = (n: string) => `/assets/demo/${n}.webp`;

const prisma = new PrismaClient();
async function main() {
  let doc = createEmptyDocument("Кино на статике");

  const ops: SiteOp[] = [
    { op: "add-block", presetId: "header-transparent-01", variantId: "over-dark",
      fields: { "hd03-logo": "Atelier", "hd03-cta": "Обсудить проект" } },

    // 1. Постер-манифест на editorial-развороте (место под текст справа)
    { op: "add-block", presetId: "hero-poster-01", variantId: "bottom-left", fields: {
      "hp01-media": A("editorial"),
      "hp01-manifesto": "Мы превращаем *сырую форму* в предметы, которые хочется трогать. Каждый проект — это история материала.",
      "hp01-meta-left": "Atelier — 2026",
      "hp01-meta-right": "Керамика · Свет · Тишина",
      "hp01-cta": "Смотреть работы",
    } },

    // 2. Зум-погружение: камера «отъезжает» от полноэкранного кадра
    { op: "add-block", presetId: "story-zoom-01", variantId: "dark", fields: {
      "sz01-image": A("tech"),
      "sz01-eyebrow": "Как мы думаем",
      "sz01-title": "Форма рождается из света и пустоты",
      "sz01-caption": "Мы строим объекты, которые парят — и держат внимание секундами",
    } },

    // 2b. Показ продукта по шагам (пиннутое медиа)
    { op: "add-block", presetId: "story-showcase-01", variantId: "dark", fields: {
      "ss02-image": A("luxury"),
      "ss02-eyebrow": "Что внутри",
      "ss02-title": "Один кадр — вся атмосфера",
      "ss02-step-title": "Свет решает всё",
      "ss02-step-text": "Каждый источник выставлен вручную — пространство дышит, а не просто освещено.",
    } },

    // 2c. Орбита возможностей (вращение по скроллу)
    { op: "add-block", presetId: "features-orbit-01", variantId: "dark", fields: {
      "fo01-center-title": "Всё связано",
      "fo01-center-eyebrow": "Метод",
    } },

    // 3. Курсор-проявитель: сырое → доведённое
    { op: "add-block", presetId: "gallery-reveal-01", fields: {
      "gr01-base": A("brutalist"),
      "gr01-hidden": A("luxury"),
      "gr01-title": "От *бетона* к пространству, где хочется остаться",
      "gr01-hint": "Ведите курсором, чтобы увидеть результат",
    } },

    // 4. Цитата-кино поверх энергичного кадра
    { op: "add-block", presetId: "testimonials-cinematic-01", variantId: "warm", fields: {
      "tc01-media": A("bold"),
      "tc01-quote": "«Они не сделали нам сайт — они поставили *нашей энергии* правильный ритм. Заявки пошли в первый день.»",
      "tc01-author": "Марина Ковалёва — основатель бренда",
    } },

    // 4b. Живая сетка работ
    { op: "add-block", presetId: "gallery-hover-grid-01", variantId: "dark", fields: {
      "hg01-eyebrow": "Портфолио",
      "hg01-title": "Наведите — оживёт",
    } },

    { op: "add-block", presetId: "cta-banner-02" },
    { op: "add-block", presetId: "footer-columns-02", variantId: "dark" },

    // Живой фон: аврора с зерном, морфинг тона по секциям
    { op: "set-scene", scene: { type: "aurora", intensity: 0.55, grain: true } },
  ];

  const r = applyOps(doc, ops);
  if (r.errors.length) { console.log("ERRORS:", r.errors); return; }
  doc = r.doc;

  // морфинг сцены: разный тон под каждой секцией
  const [, , zoom, reveal, quote] = doc.pages[0].blocks;
  const r2 = applyOps(doc, [
    { op: "set-block-surface", blockId: zoom.id, sceneTint: "#3b5bff" },
    { op: "set-block-surface", blockId: reveal.id, sceneTint: "#9aa0a6" },
    { op: "set-block-surface", blockId: quote.id, sceneTint: "#e8843c" },
  ]);
  doc = r2.doc;

  const user = await prisma.user.findFirst({ orderBy: { id: "asc" } });
  if (!user) { console.log("нет пользователей"); return; }
  const project = await prisma.project.upsert({
    where: { slug: "cinema-static-demo" },
    update: { document: doc as never },
    create: { slug: "cinema-static-demo", name: "Кино на статике", document: doc as never, userId: user.id },
  });
  console.log(`готово: http://localhost:3000/editor?project=${project.id}`);
}
main().finally(() => prisma.$disconnect());
