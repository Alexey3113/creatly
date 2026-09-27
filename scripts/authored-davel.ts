/**
 * Авторская сборка Davel Mebel — я как арт-директор, без AI-генератора:
 * вся режиссура (палитра, композиции, тексты, хореография) руками через ops.
 * Медиа — из готового пула прогона mroqd3e3 (кадры + вырезанные PNG).
 * Запуск: npx tsx --tsconfig tsconfig.json scripts/authored-davel.ts
 */
import { PrismaClient } from "@prisma/client";
import { createEmptyDocument } from "@/lib/site/create";
import { applyOps, type SiteOp } from "@/lib/site/ops";
const prisma = new PrismaClient();

const G = "/uploads/1/gen";

async function main() {
  let doc = createEmptyDocument("Davel Mebel — авторская");
  const ops: SiteOp[] = [
    // ── Дизайн-система: вечерний дом — дерево, латунь, зелёный бархат ──
    { op: "set-fonts", heading: "Cormorant Garamond", body: "Jost" },
    { op: "set-tokens", tokens: {
      "--color-bg": "#0d0b08", "--color-bg-alt": "#14110c", "--color-surface": "#1c1812",
      "--color-text": "#f1e9da", "--color-text-muted": "#a5947b",
      "--color-primary": "#35503c", "--color-accent": "#c9a35c", "--color-border": "#2c261c",
    } },

    { op: "add-block", presetId: "header-transparent-01", fields: {
      "hd03-logo": "Davel Mebel", "hd03-cta": "Рассчитать по фото",
    } },

    // ── Пролог: дверь открывается ──
    { op: "add-block", presetId: "story-prologue-01", fields: {
      "prl-media": `${G}/mroqd3e3-chain-0.png`,
      "prl-meta": "Davel Mebel · мебельная фабрика",
      "prl-title": "Дом начинается *с двери*",
      "prl-sub": "Пройдите по комнатам, которые мы собрали руками — от каркаса из массива до последнего шва.",
      "prl-hint": "Листайте — мы входим",
    } },

    // ── Главы: гостиная → спальня → гардеробная ──
    { op: "add-block", presetId: "story-chapters-01", variantId: "bevel", collections: {
      "chp-chapters": [
        { fields: {
          "chp-tag": "Глава 01 · Гостиная", "chp-word": "Диван",
          "chp-sub": "Каркас из массива ореха, обивка на заказ: 40 000 циклов истирания и шов, который переживёт переезды.",
          "chp-bg": `${G}/mroqd3e3-img-1-a0.webp`,
          "chp-fg-a": `${G}/mroqd3e3-img-4-cut.png`,
          "chp-fg-b": `${G}/mroqd3e3-img-6-cut.png`,
          "chp-fg-c": `${G}/mroqd3e3-img-12-cut.png`,
          "chp-comp": "word=lb,mega; a=rb,1.2,-7; b=rt,0.7,9; c=lt,0.75,-12",
        } },
        { fields: {
          "chp-tag": "Глава 02 · Спальня", "chp-word": "Кровать",
          "chp-sub": "Изголовье держит спину, лён дышит. Кровать собираем под ваш матрас — а не наоборот.",
          "chp-bg": `${G}/mroqd3e3-img-2-a0.webp`,
          "chp-fg-a": `${G}/mroqd3e3-img-7-cut.png`,
          "chp-fg-b": `${G}/mroqd3e3-img-11-cut.png`,
          "chp-fg-c": `${G}/mroqd3e3-img-9-cut.png`,
          "chp-comp": "word=rt,xl; a=lb,1.25,6; b=rb,0.7,-9; c=lt,0.6,10",
        } },
        { fields: {
          "chp-tag": "Глава 03 · Гардеробная", "chp-word": "Шкаф",
          "chp-sub": "От пола до потолка, до миллиметра. Подсветка загорается, когда вы открываете дверь.",
          "chp-bg": `${G}/mroqd3e3-img-3-a0.webp`,
          "chp-fg-a": `${G}/mroqd3e3-img-10-cut.png`,
          "chp-fg-b": `${G}/mroqd3e3-img-8-cut.png`,
          "chp-fg-c": `${G}/mroqd3e3-img-6-cut.png`,
          "chp-comp": "word=cb,xxl; a=lt,1.1,-6; b=rt,0.8,9; c=rb,0.6,-10",
        } },
      ],
    } },

    // ── Манифест мастерской ──
    { op: "add-block", presetId: "story-highlight-01", variantId: "dark", fields: {
      "hl01-kicker": "Манифест мастерской",
      "hl01-statement": "Мы не продаём мебель. Мы собираем *дом*: место, где диван помнит ваши вечера, а шкаф держит порядок без усилий. Дерево, латунь и ткань — *руками*, под ваш размер и вашу жизнь.",
    } },

    // ── Полка объектов: материалы ──
    { op: "add-block", presetId: "gallery-objects-01", fields: {
      "gob-eyebrow": "Материалы",
      "gob-title": "Из чего собран *ваш дом*",
    }, collections: {
      "gob-items": [
        { fields: { "gob-item-image": `${G}/mroqd3e3-img-8-cut.png`, "gob-item-name": "Орех американский", "gob-item-note": "Массив и шпон, финиш масло-воск" } },
        { fields: { "gob-item-image": `${G}/mroqd3e3-img-10-cut.png`, "gob-item-name": "Латунь", "gob-item-note": "Фурнитура, которая темнеет красиво" } },
        { fields: { "gob-item-image": `${G}/mroqd3e3-img-6-cut.png`, "gob-item-name": "Нить обивки", "gob-item-note": "Смотана вручную — шов невидим" } },
        { fields: { "gob-item-image": `${G}/mroqd3e3-img-7-cut.png`, "gob-item-name": "Лён и бархат", "gob-item-note": "Ткани с запасом на десятилетия" } },
      ],
    } },

    // ── Как мы работаем ──
    { op: "add-block", presetId: "steps-split-01", fields: {
      "steps-heading": "От фото комнаты до готовой мебели",
      "steps-subtitle": "Пять шагов — и в вашей комнате стоит то, что собрали для неё одной.",
      }, collections: {
      "steps": [
        { fields: { "step-number": "01", "step-title": "Фото комнаты", "step-desc": "Пришлите фото в телеграм-бот — с телефона, как есть." } },
        { fields: { "step-number": "02", "step-title": "Расчёт за 5 минут", "step-desc": "Мастер считает стоимость и предлагает раскрой под ваш размер." } },
        { fields: { "step-number": "03", "step-title": "Замер и проект", "step-desc": "Приезжаем с лазером, согласуем чертёж и материалы." } },
        { fields: { "step-number": "04", "step-title": "Производство", "step-desc": "20–30 дней в собственном цеху: массив, латунь, обивка." } },
        { fields: { "step-number": "05", "step-title": "Монтаж под ключ", "step-desc": "Привозим, собираем, убираем за собой. Гарантия 5 лет." } },
      ],
    } },

    // ── Цитата мастера ──
    { op: "add-block", presetId: "testimonials-cinematic-01", fields: {
      "tc01-media": `${G}/mroqd3e3-img-15-a0.webp`,
      "tc01-quote": "Кресло, которое я собираю сегодня, будут открывать и закрывать тридцать лет. Поэтому на *шов* я смотрю дольше, чем вы будете его искать.",
      "tc01-author": "Виктор Давель — основатель мастерской",
    } },

    // ── Цифры ──
    { op: "add-block", presetId: "case-studies-counters-01", variantId: "dark", fields: {
      "csc01-title": "Мастерская в цифрах",
    }, collections: {
      "csc01-stats": [
        { fields: { "csc01-value": "12 лет", "csc01-label": "собственному производству" } },
        { fields: { "csc01-value": "3400+", "csc01-label": "проектов по всей России" } },
        { fields: { "csc01-value": "5 лет", "csc01-label": "гарантии на каждое изделие" } },
        { fields: { "csc01-value": "5 минут", "csc01-label": "до расчёта по фото" } },
      ],
    } },

    // ── CTA ──
    { op: "add-block", presetId: "cta-split-02", fields: {
      "cta-image": `${G}/mroqd3e3-img-14-a0.webp`,
      "cta-heading": "Пришлите фото комнаты",
      "cta-description": "Мастер посчитает стоимость за 5 минут и предложит раскрой под ваш размер. Без замера, звонков и обязательств — просто фото в t.me/davelmeb_bot.",
      "cta-button": "Рассчитать в Telegram",
    } },

    { op: "add-block", presetId: "footer-dark-01", variantId: "gradient-line", fields: {
      "footer-logo": "Davel Mebel",
      "footer-description": "Мебель на заказ: диваны, кровати, шкафы, кухни и двери. Собственный цех, доставка по всей России.",
      "footer-contact-text": "t.me/davelmeb_bot",
      "footer-copyright": "© Davel Mebel. Сделано руками.",
    } },
  ];

  const r = applyOps(doc, ops);
  if (r.errors.length) { console.log("ERR:", r.errors); }
  doc = r.doc;

  // ── Хореография: спокойный вечерний ритм ──
  const enters: Record<string, string> = {
    "story-highlight-01": "fade", "gallery-objects-01": "rise", "steps-split-01": "rise",
    "testimonials-cinematic-01": "fade", "case-studies-counters-01": "zoom-in",
    "cta-split-02": "rise", "footer-dark-01": "fade",
  };
  const chOps: SiteOp[] = [];
  for (const b of doc.pages[0].blocks) {
    const e = enters[b.presetId];
    if (e) chOps.push({ op: "set-block-enter", blockId: b.id, enter: e as never });
  }
  doc = applyOps(doc, chOps).doc;

  const user = await prisma.user.findFirst({ orderBy: { id: "asc" } });
  if (!user) return;
  const p = await prisma.project.upsert({
    where: { slug: "davel-authored" },
    update: { document: doc as never },
    create: { slug: "davel-authored", name: "Davel Mebel — авторская", document: doc as never, userId: user.id },
  });
  console.log(`готово: http://localhost:3000/editor?project=${p.id}`);
}
main().finally(() => prisma.$disconnect());
