/**
 * VOLT — студия дерзких брендов. Демо КОНТРАСТНОГО архетипа editorial-kinetic:
 * НЕ пролёт-премиум, а текст-герой + горизонтальная лента + видео-в-буквах +
 * сетка. Доказательство, что движок выдаёт структурно РАЗНЫЕ сайты.
 * Медиа — из demo-ассетов (без генерации). Запуск: npx tsx --tsconfig tsconfig.json scripts/authored-volt.ts
 */
import { PrismaClient } from "@prisma/client";
import { createEmptyDocument } from "@/lib/site/create";
import { applyOps, type SiteOp } from "@/lib/site/ops";
const prisma = new PrismaClient();
const A = "/assets/demo";

async function main() {
  let doc = createEmptyDocument("VOLT — студия дерзких брендов");
  const ops: SiteOp[] = [
    { op: "set-fonts", heading: "Unbounded", body: "Rubik" },
    { op: "set-tokens", tokens: {
      "--color-bg": "#0b0b0d", "--color-bg-alt": "#141416", "--color-surface": "#1c1c20",
      "--color-text": "#f5f5f0", "--color-text-muted": "#8a8a85",
      "--color-primary": "#1c1c20", "--color-accent": "#c5f82a", "--color-border": "#2a2a2e",
    } },
    { op: "add-block", presetId: "header-transparent-01", fields: { "hd03-logo": "VOLT", "hd03-cta": "Начать проект" } },

    // hero — кинетический текст-манифест (не фото/видео пролёт!)
    { op: "add-block", presetId: "story-manifesto-01", fields: { "sm01-eyebrow": "VOLT · брендинг-студия" }, collections: {
      "sm01-steps": [
        { fields: { "sm01-step-kicker": "01", "sm01-step-line": "Мы делаем бренды," } },
        { fields: { "sm01-step-kicker": "02", "sm01-step-line": "которые *не листают*." } },
        { fields: { "sm01-step-kicker": "03", "sm01-step-line": "Которые запоминают" } },
        { fields: { "sm01-step-kicker": "04", "sm01-step-line": "и *пересказывают*." } },
      ],
    } },

    // горизонтальная лента работ (скролл везёт вбок)
    { op: "add-block", presetId: "story-horizontal-01", fields: {
      "sh01-eyebrow": "Работы", "sh01-title": "Проекты, которые *взорвали* ленту",
    }, collections: {
      "sh01-cards": [
        { fields: { "sh01-card-image": `${A}/bold.webp`, "sh01-card-tag": "Айдентика", "sh01-card-title": "PULSE Festival" } },
        { fields: { "sh01-card-image": `${A}/brutalist.webp`, "sh01-card-tag": "Кампания", "sh01-card-title": "Concrete Wear" } },
        { fields: { "sh01-card-image": `${A}/tech.webp`, "sh01-card-tag": "Диджитал", "sh01-card-title": "Nova Finance" } },
        { fields: { "sh01-card-image": `${A}/editorial.webp`, "sh01-card-tag": "Печать", "sh01-card-title": "OFFSET Mag" } },
        { fields: { "sh01-card-image": `${A}/aurora.webp`, "sh01-card-tag": "Моушн", "sh01-card-title": "Drift Sound" } },
      ],
    } },

    // видео в буквах — акцент
    { op: "add-block", presetId: "story-video-text-01", fields: {
      "svt01-word": "ДЕРЗКО", "svt01-sub": "Осторожные бренды забывают первыми.", "svt01-video": `${A}/bold.mp4`,
    } },

    // сетка работ — оживает под курсором
    { op: "add-block", presetId: "gallery-hover-grid-01", fields: {
      "hg01-eyebrow": "Ещё кейсы", "hg01-title": "Наведите — *оживает*",
    }, collections: {
      "hg01-tiles": [
        { fields: { "hg01-tile-image": `${A}/tech.webp`, "hg01-tile-label": "SaaS", "hg01-tile-name": "Nova Finance" } },
        { fields: { "hg01-tile-image": `${A}/brutalist.webp`, "hg01-tile-label": "Fashion", "hg01-tile-name": "Concrete Wear" } },
        { fields: { "hg01-tile-image": `${A}/bold.webp`, "hg01-tile-label": "Event", "hg01-tile-name": "PULSE Festival" } },
        { fields: { "hg01-tile-image": `${A}/editorial.webp`, "hg01-tile-label": "Print", "hg01-tile-name": "OFFSET Mag" } },
        { fields: { "hg01-tile-image": `${A}/luxury.webp`, "hg01-tile-label": "Retail", "hg01-tile-name": "Maison D" } },
        { fields: { "hg01-tile-image": `${A}/aurora.webp`, "hg01-tile-label": "Music", "hg01-tile-name": "Drift Sound" } },
      ],
    } },

    // второй смысловой удар
    { op: "add-block", presetId: "story-highlight-01", fields: {
      "hl01-kicker": "Как мы работаем",
      "hl01-statement": "Мы не рисуем логотипы. Мы находим *нерв* бренда и бьём по нему так, чтобы отозвалось у каждого, кто пролистывает мимо. Дерзко — не значит громко. Дерзко — значит *точно*.",
    } },

    { op: "add-block", presetId: "cta-banner-02", fields: {
      "cta-heading": "У вас есть бренд. У нас — *ток*.",
      "cta-description": "Расскажите о проекте — вернёмся с идеей в течение суток.",
      "cta-button-primary": "Начать проект",
      "cta-button-secondary": "Смотреть работы",
    } },

    { op: "add-block", presetId: "footer-dark-01", variantId: "gradient-line", fields: {
      "footer-logo": "VOLT",
      "footer-description": "Брендинг-студия. Айдентика, кампании, диджитал, моушн.",
      "footer-contact-text": "hello@volt.studio · @volt",
      "footer-copyright": "© VOLT. Ток по бренду.",
    } },
  ];

  const r = applyOps(doc, ops);
  if (r.errors.length) console.log("ERR:", r.errors);
  doc = r.doc;

  // дерзкая хореография — резкие слайды и пролёты
  const enters: Record<string, string> = {
    "story-horizontal-01": "slide-left", "story-video-text-01": "zoom-through",
    "gallery-hover-grid-01": "rise", "story-highlight-01": "fade",
    "cta-banner-02": "zoom-through", "footer-dark-01": "fade",
  };
  doc = applyOps(doc, doc.pages[0].blocks.filter((b) => enters[b.presetId]).map((b) => ({ op: "set-block-enter" as const, blockId: b.id, enter: enters[b.presetId] as never }))).doc;

  const user = await prisma.user.findFirst({ orderBy: { id: "asc" } });
  if (!user) return;
  const p = await prisma.project.upsert({ where: { slug: "volt-studio" }, update: { document: doc as never }, create: { slug: "volt-studio", name: "VOLT — студия дерзких брендов", document: doc as never, userId: user.id } });
  console.log(`готово: http://localhost:3000/editor?project=${p.id}`);
}
main().finally(() => prisma.$disconnect());
