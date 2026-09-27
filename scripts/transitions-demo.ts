import { PrismaClient } from "@prisma/client";
import { createEmptyDocument } from "@/lib/site/create";
import { applyOps, type SiteOp } from "@/lib/site/ops";
const prisma = new PrismaClient();

const DARK = {
  "--color-bg": "#08080d", "--color-bg-alt": "#0e0e15", "--color-surface": "#14141c",
  "--color-text": "#f5f5f7", "--color-text-muted": "rgba(235,235,245,.55)",
  "--color-primary": "#0e0e15", "--color-border": "rgba(255,255,255,.09)", "--color-accent": "#3b5bff",
};

// Одноэкранные секции для наглядных переходов (без длинных story)
function baseOps(): SiteOp[] {
  return [
    { op: "add-block", presetId: "hero-centered-01", variantId: "dark", fields: { "hero-eyebrow": "Студия", "hero-title": "Каждая секция въезжает по-своему", "hero-subtitle": "Скролльте — и смотрите, как блоки появляются с разных сторон.", "hero-cta": "Начать" } },
    { op: "add-block", presetId: "features-glow-01", fields: { "fg01-title": "Слева" } },
    { op: "add-block", presetId: "case-studies-counters-01", variantId: "dark", fields: { "csc01-title": "Снизу вверх" } },
    { op: "add-block", presetId: "testimonials-cinematic-01", variantId: "warm", fields: { "tc01-media": "/assets/demo/luxury.webp", "tc01-quote": "«Сайт, который *пролетаешь насквозь* — и запоминаешь.»", "tc01-author": "Клиент" } },
    { op: "add-block", presetId: "cta-banner-02", fields: { "cta-heading": "Поворот в финале" } },
  ];
}
const ENTERS = ["fade", "slide-left", "rise", "zoom-through", "rotate"] as const;

async function build(slug: string, name: string, cinema: boolean) {
  let doc = createEmptyDocument(name);
  const r = applyOps(doc, [...baseOps(), { op: "set-tokens", tokens: DARK }, { op: "set-scene", scene: { type: "aurora", intensity: 0.6, grain: true } }]);
  doc = r.doc;
  const enterOps: SiteOp[] = doc.pages[0].blocks.map((b, i) => ({ op: "set-block-enter", blockId: b.id, enter: ENTERS[i % ENTERS.length] }));
  if (cinema) enterOps.push({ op: "set-cinema", enabled: true });
  doc = applyOps(doc, enterOps).doc;
  const user = await prisma.user.findFirst({ orderBy: { id: "asc" } });
  if (!user) return;
  const p = await prisma.project.upsert({ where: { slug }, update: { document: doc as never }, create: { slug, name, document: doc as never, userId: user.id } });
  console.log(`${name}: http://localhost:3000/editor?project=${p.id}`);
}

async function main() {
  await build("transitions-scroll", "Переходы — скролл (путь B)", false);
  await build("transitions-cinema", "Режим-фильм (путь A)", true);
}
main().finally(() => prisma.$disconnect());
