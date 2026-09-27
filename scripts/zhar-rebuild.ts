/**
 * Перережиссура ВТОРОГО АКТА ЖАР (проект 46) — уход от тёмно-однотипного хвоста.
 * Те же медиа, но тело сайта: РИТМ свет/тьма (секционные палитры) + выразительные
 * story-блоки вместо generic-карточек + втекание. Демонстрация «режиссуры 2-го акта».
 * Запуск: npx tsx --tsconfig tsconfig.json scripts/zhar-rebuild.ts
 */
import { PrismaClient } from "@prisma/client";
import { createEmptyDocument } from "@/lib/site/create";
import { applyOps, type SiteOp } from "@/lib/site/ops";
const prisma = new PrismaClient();
const WEB = "/uploads/1/gen";
const cw = (i: number) => `${WEB}/zhar-chain-${i}.jpg`;

// Тёплая кремовая палитра — светлая секция-передышка посреди тёмного сайта
const LIGHT = {
  "--color-bg": "#f4ece0", "--color-bg-alt": "#ece0cf", "--color-surface": "#ffffff",
  "--color-text": "#261d14", "--color-text-muted": "#6f6150",
  "--color-primary": "#3a2318", "--color-accent": "#c0561f", "--color-border": "#dccbb2",
  "--color-text-on-primary": "#fff6ea", "--color-text-on-accent": "#fff6ea",
};
// Огненная акцентная палитра — секция «в пламени»
const FIRE = {
  "--color-bg": "#bf551e", "--color-bg-alt": "#a8471a", "--color-surface": "#d16226",
  "--color-text": "#fff6ea", "--color-text-muted": "rgba(255,246,234,.75)",
  "--color-primary": "#bf551e", "--color-accent": "#2a1206", "--color-border": "rgba(255,255,255,.2)",
  "--color-text-on-primary": "#fff6ea", "--color-text-on-accent": "#fff6ea",
};

async function main() {
  let doc = createEmptyDocument("ЖАР — кухня на огне");
  const ops: SiteOp[] = [
    { op: "set-fonts", heading: "Cormorant Garamond", body: "Jost" },
    { op: "set-tokens", tokens: {
      "--color-bg": "#0d0a08", "--color-bg-alt": "#14100c", "--color-surface": "#1c1712",
      "--color-text": "#f2e8dc", "--color-text-muted": "#a8988a",
      "--color-primary": "#3a2318", "--color-accent": "#d97a34", "--color-border": "#2a2018",
    } },
    { op: "add-block", presetId: "header-transparent-01", fields: { "hd03-logo": "ЖАР", "hd03-cta": "Забронировать стол" } },

    // ── АКТ 1: hero-фильм (ТЁМНЫЙ) ──
    { op: "add-block", presetId: "story-poster-01", variantId: "center", fields: {
      "sp01-video": `${WEB}/zhar-film.mp4`, "sp01-meta-left": "ЖАР · кухня на открытом огне", "sp01-meta-right": "Ужин при свечах",
    }, collections: { "sp01-chapters": [
      { fields: { "sp01-step-text": "ЖАР. Кухня, которая *дышит огнём*.", "sp01-step-time": "5" } },
      { fields: { "sp01-step-text": "Здесь всё решает *пламя*.", "sp01-step-time": "11" } },
      { fields: { "sp01-step-text": "Продукт, огонь — и *ничего лишнего*.", "sp01-step-time": "17" } },
      { fields: { "sp01-step-text": "Вкус, который помнит *дым*.", "sp01-step-time": "24" } },
    ] } },

    // ── АКТ 2, режиссура: Т → СВЕТ → Т → ОГОНЬ → Т → СВЕТ → Т ──

    // 1) Манифест — СВЕТЛАЯ передышка, крупный serif, воздух
    { op: "add-block", presetId: "story-highlight-01", fields: {
      "hl01-kicker": "Философия",
      "hl01-statement": "У нас нет плиты. Есть *огонь* — живой, капризный, честный. Он не прощает лишнего движения и не терпит полуфабрикатов. Мы кладём на решётку только то, что *не боится* пламени: сезонный продукт, соль и дым. Остальное — *лишнее*.",
    } },

    // 2) Меню — тёмная горизонтальная лента (скролл вбок, крупные фото)
    { op: "add-block", presetId: "story-horizontal-01", fields: {
      "sh01-eyebrow": "Меню огня", "sh01-title": "Что рождается в *пламени*",
    }, collections: { "sh01-cards": [
      { fields: { "sh01-card-image": cw(4), "sh01-card-tag": "12 часов в дыму", "sh01-card-title": "Рёбра на углях" } },
      { fields: { "sh01-card-image": cw(5), "sh01-card-tag": "7 подач", "sh01-card-title": "Сет от шефа" } },
      { fields: { "sh01-card-image": cw(3), "sh01-card-tag": "сезон и зола", "sh01-card-title": "Овощи с огня" } },
      { fields: { "sh01-card-image": cw(2), "sh01-card-tag": "стол у гриля", "sh01-card-title": "Ужин у пламени" } },
    ] } },

    // 3) Цифры — ОГНЕННАЯ секция
    { op: "add-block", presetId: "case-studies-counters-01", fields: { "csc01-title": "ЖАР в цифрах" }, collections: { "csc01-stats": [
      { fields: { "csc01-value": "600°", "csc01-label": "температура углей" } },
      { fields: { "csc01-value": "9 лет", "csc01-label": "у одного огня" } },
      { fields: { "csc01-value": "24", "csc01-label": "стола у пламени" } },
      { fields: { "csc01-value": "1", "csc01-label": "гриль. Никакой плиты" } },
    ] } },

    // 4) Как готовим — тёмный showcase (продукт залипает, выноски процесса)
    { op: "add-block", presetId: "story-showcase-01", fields: {
      "ss02-eyebrow": "Процесс", "ss02-title": "Пять минут между *огнём и вами*", "ss02-image": cw(4),
    }, collections: { "ss02-steps": [
      { fields: { "ss02-step-title": "Угли", "ss02-step-text": "Дуб и фруктовое дерево прогорают 2 часа до нужного жара." } },
      { fields: { "ss02-step-title": "Продукт", "ss02-step-text": "Сезонное, охлаждённое, никогда не мороженое. Соль за минуту до." } },
      { fields: { "ss02-step-title": "Огонь", "ss02-step-text": "Шеф ведёт кусок по зонам жара — где-то корка, где-то томление." } },
      { fields: { "ss02-step-title": "Подача", "ss02-step-text": "На тёплой керамике, с дымком, пока живой. Без соусов-масок." } },
    ] } },

    // 5) CTA — СВЕТЛАЯ секция перед футером
    { op: "add-block", presetId: "cta-split-02", fields: {
      "cta-image": cw(5), "cta-heading": "Стол у огня ждёт",
      "cta-description": "Забронируйте место за грилем — смотрите, как рождается ваш ужин, и чувствуйте жар пламени за спиной. Мест немного: всего 24 стола.",
      "cta-button": "Забронировать стол",
    } },

    // футер — ТЁМНЫЙ
    { op: "add-block", presetId: "footer-dark-01", variantId: "gradient-line", fields: {
      "footer-logo": "ЖАР", "footer-description": "Ресторан авторской кухни на открытом огне. Ужины при свечах, стол у гриля, сет от шефа.",
      "footer-contact-text": "Москва, Столешников 8 · +7 495 000-00-00", "footer-copyright": "© ЖАР. Всё решает пламя.",
    } },
  ];

  const r = applyOps(doc, ops);
  if (r.errors.length) console.log("ERR:", r.errors);
  doc = r.doc;

  // Секционные палитры — РИТМ свет/тьма
  const blocks = doc.pages[0].blocks;
  const byPreset = (id: string) => blocks.find((b) => b.presetId === id);
  const paletteOps: SiteOp[] = [];
  const hl = byPreset("story-highlight-01"); if (hl) paletteOps.push({ op: "set-block-palette", blockId: hl.id, palette: LIGHT });
  const csc = byPreset("case-studies-counters-01"); if (csc) paletteOps.push({ op: "set-block-palette", blockId: csc.id, palette: FIRE });
  const cta = byPreset("cta-split-02"); if (cta) paletteOps.push({ op: "set-block-palette", blockId: cta.id, palette: LIGHT });
  doc = applyOps(doc, paletteOps).doc;

  // Втекание — enter-переходы на все секции тела
  const enters: Record<string, string> = {
    "story-highlight-01": "rise", "story-horizontal-01": "fade", "case-studies-counters-01": "zoom-in",
    "story-showcase-01": "fade", "cta-split-02": "rise", "footer-dark-01": "fade",
  };
  doc = applyOps(doc, blocks.filter((b) => enters[b.presetId]).map((b) => ({ op: "set-block-enter" as const, blockId: b.id, enter: enters[b.presetId] as never }))).doc;

  const user = await prisma.user.findFirst({ orderBy: { id: "asc" } });
  if (!user) return;
  const p = await prisma.project.upsert({ where: { slug: "zhar-fire" }, update: { document: doc as never }, create: { slug: "zhar-fire", name: "ЖАР — кухня на огне", document: doc as never, userId: user.id } });
  console.log(`готово: http://localhost:3000/editor?project=${p.id}`);
}
main().finally(() => prisma.$disconnect());
