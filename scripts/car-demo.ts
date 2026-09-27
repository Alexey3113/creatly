import { PrismaClient } from "@prisma/client";
import { createEmptyDocument } from "@/lib/site/create";
import { applyOps, type SiteOp } from "@/lib/site/ops";
const prisma = new PrismaClient();

async function main() {
  let doc = createEmptyDocument("M Performance — шоурум");
  const ops: SiteOp[] = [
    { op: "add-block", presetId: "header-transparent-01", variantId: "over-dark",
      fields: { "hd03-logo": "M Motors", "hd03-cta": "Записаться на тест-драйв" } },

    // 1. Hero — прозрачный, машина говорит сама
    { op: "add-block", presetId: "hero-centered-01", variantId: "dark", fields: {
      "hero-eyebrow": "M8 Competition · В наличии",
      "hero-title": "Само совершенство стоит в нашем шоуруме",
      "hero-subtitle": "625 л.с., карбон и матовый Frozen Black. Скролльте — камера сама обойдёт автомобиль.",
      "hero-cta": "Записаться на тест-драйв",
      "hero-cta2": "Характеристики ↓",
    } },

    // 2. Счётчики характеристик — стекло над видео
    { op: "add-block", presetId: "case-studies-counters-01", variantId: "dark", fields: {
      "csc01-title": "Цифры, которые чувствуешь спиной",
    } },

    // 3. 3D-карточки преимуществ
    { op: "add-block", presetId: "features-tilt-01", fields: {
      "ftt01-eyebrow": "Почему у нас",
      "ftt01-title": "Больше, чем дилер",
    } },

    // 4. Манифест-подсветка
    { op: "add-block", presetId: "story-highlight-01", variantId: "dark", fields: {
      "hl01-kicker": "Философия M",
      "hl01-statement": "Мы не продаём автомобили. Мы передаём ключи от *ощущения*, которое невозможно описать — только испытать на первом же светофоре.",
    } },

    // 5. Модельный ряд — 3D-карусель
    { op: "add-block", presetId: "gallery-coverflow-01", variantId: "dark", fields: {
      "cf01-eyebrow": "В наличии",
      "cf01-title": "Модельный ряд",
    } },

    // 6. FAQ покупателя
    { op: "add-block", presetId: "faq-accordion-02", fields: {
      "faq-title": "Вопросы перед покупкой",
      "faq-subtitle": "Всё о трейд-ине, кредите и гарантии — без звонка менеджеру.",
    } },

    { op: "add-block", presetId: "cta-banner-02", fields: {
      "cta-heading": "Ключи ждут вас",
      "cta-description": "Тест-драйв занимает 30 минут. Впечатления остаются навсегда.",
      "cta-button-primary": "Записаться на тест-драйв",
      "cta-button-secondary": "Задать вопрос",
    } },
    { op: "add-block", presetId: "footer-columns-02", variantId: "dark",
      fields: { "footer-logo": "M Motors", "footer-description": "Официальный дилер. Москва, Кутузовский 12." } },

    // Палитра из кадра: чёрный шоурум + янтарные линии света
    { op: "set-tokens", tokens: {
      "--color-bg": "#0a0a0c", "--color-bg-alt": "#101014", "--color-surface": "#15151a",
      "--color-text": "#f5f4f2", "--color-text-muted": "rgba(240,238,232,.58)",
      "--color-primary": "#101014", "--color-border": "rgba(224,164,88,.18)",
      "--color-accent": "#e0a458", "--color-text-on-accent": "#141210",
    } },
    { op: "set-fonts", heading: "Unbounded", body: "Manrope" },

    // Корона: видео-сцена со скрабом на весь сайт
    { op: "set-scene", scene: { type: "video", video: "/assets/demo/car2.mp4", poster: "/assets/demo/car2-poster.jpg", scrub: true, intensity: 1, grain: true } },
  ];
  const r = applyOps(doc, ops);
  if (r.errors.length) { console.log("ERR", r.errors); return; }
  doc = r.doc;

  const b = doc.pages[0].blocks;
  // характеристики: count-up с суффиксами
  const counters = b[2].collections?.["csc01-stats"];
  if (counters) {
    const data = [
      ["625 л.с.", "мощность V8 BiTurbo"],
      ["3.2 сек", "разгон 0–100 км/ч"],
      ["305 км/ч", "максимальная скорость"],
      ["5 лет", "гарантия дилера"],
    ];
    data.forEach((d, i) => { if (counters[i]) counters[i].fields = { "csc01-value": d[0], "csc01-label": d[1] }; });
  }
  // карточки преимуществ
  const cards = b[3].collections?.["ftt01-cards"];
  if (cards) {
    const data = [
      ["🔑", "Выдача в день сделки", "Автомобиль в наличии, документы за 2 часа, страховка и постановка на учёт — здесь же."],
      ["◈", "Трейд-ин по рынку", "Оценка вашего авто за 20 минут по реальной рыночной цене, а не «дилерской»."],
      ["∞", "M-сервис навсегда", "Персональный мастер, подменный автомобиль и приоритетная запись — пожизненно."],
    ];
    data.forEach((d, i) => { if (cards[i]) cards[i].fields = { "ftt01-card-icon": d[0], "ftt01-card-title": d[1], "ftt01-card-text": d[2] }; });
  }
  // FAQ
  const faq = b[6].collections?.["faq"];
  if (faq) {
    const data = [
      ["Можно ли в кредит или лизинг?", "Да — работаем с 9 банками, одобрение от 40 минут, первый взнос от 10%. Лизинг для юрлиц — от 5% удорожания."],
      ["Принимаете мой автомобиль в трейд-ин?", "Любой марки. Оценка 20 минут, деньги идут в зачёт сразу, доплату можно в кредит."],
      ["Что с гарантией?", "Заводская 3 года плюс 2 года дилерской — итого 5 лет без ограничения пробега по двигателю и коробке."],
      ["Есть ли машины не из наличия?", "Привезём под заказ за 45-60 дней с фиксацией цены договором."],
    ];
    data.forEach((d, i) => { if (faq[i]) faq[i].fields = { "faq-question": d[0], "faq-answer": d[1] }; });
  }

  // поверхности: всё стеклом над видео, hero прозрачный; мягкие входы
  const enters = ["none", "fade", "rise", "fade", "rise", "zoom-in", "rise", "fade", "fade"];
  const surf: SiteOp[] = [];
  b.forEach((blk, i) => {
    if (i === 0) return; // шапка
    surf.push({ op: "set-block-surface", blockId: blk.id, surface: i === 1 ? "transparent" : "veil" });
    surf.push({ op: "set-block-enter", blockId: blk.id, enter: enters[i] as never });
  });
  doc = applyOps(doc, surf).doc;

  const user = await prisma.user.findFirst({ orderBy: { id: "asc" } });
  if (!user) return;
  const p = await prisma.project.upsert({ where: { slug: "m-motors-demo" }, update: { document: doc as never }, create: { slug: "m-motors-demo", name: "M Performance — шоурум", document: doc as never, userId: user.id } });
  console.log(`готово: http://localhost:3000/editor?project=${p.id}`);
}
main().finally(() => prisma.$disconnect());
