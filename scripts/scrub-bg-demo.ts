import { PrismaClient } from "@prisma/client";
import { createEmptyDocument } from "@/lib/site/create";
import { applyOps, type SiteOp } from "@/lib/site/ops";
const prisma = new PrismaClient();

async function main() {
  let doc = createEmptyDocument("Сайт внутри видео");
  const ops: SiteOp[] = [
    { op: "add-block", presetId: "hero-centered-01", variantId: "dark", fields: {
      "hero-eyebrow": "Atelier", "hero-title": "Весь сайт живёт внутри одного кадра",
      "hero-subtitle": "Скролльте — фон едет сквозь всю страницу, а секции плывут поверх, как стекло над водой.",
      "hero-cta": "Смотреть проекты",
    } },
    { op: "add-block", presetId: "features-three-col-01", fields: { "ft01-title": "Три опоры студии" } },
    { op: "add-block", presetId: "case-studies-counters-01", variantId: "dark", fields: { "csc01-title": "Результат" } },
    { op: "add-block", presetId: "story-highlight-01", variantId: "dark", fields: {
      "hl01-kicker": "Философия",
      "hl01-statement": "Мы не собираем страницы из блоков — мы ведём посетителя сквозь *единое пространство*, где каждая секция продолжает предыдущую.",
    } },
    { op: "add-block", presetId: "cta-banner-02", fields: { "cta-heading": "Войдите в кадр" } },
    { op: "add-block", presetId: "footer-columns-02", variantId: "dark" },
    { op: "set-tokens", tokens: {
      "--color-bg": "#08080d", "--color-bg-alt": "#0e0e15", "--color-surface": "#14141c",
      "--color-text": "#f5f5f7", "--color-text-muted": "rgba(235,235,245,.6)",
      "--color-primary": "#0e0e15", "--color-border": "rgba(255,255,255,.1)", "--color-accent": "#c9a86a",
    } },
    { op: "set-scene", scene: { type: "video", video: "/assets/demo/luxury.mp4", poster: "/assets/demo/luxury.webp", scrub: true, intensity: 1, grain: true } },
  ];
  const r = applyOps(doc, ops);
  if (r.errors.length) { console.log("ERR", r.errors); return; }
  doc = r.doc;

  // все секции — стекло/прозрачные, чтобы фон-видео просвечивал; лёгкие въезды
  const enters = ["fade", "rise", "rise", "fade", "zoom-in", "fade"];
  const surfOps: SiteOp[] = [];
  doc.pages[0].blocks.forEach((b, i) => {
    surfOps.push({ op: "set-block-surface", blockId: b.id, surface: i === 0 ? "transparent" : "veil" });
    surfOps.push({ op: "set-block-enter", blockId: b.id, enter: enters[i] as never });
  });
  doc = applyOps(doc, surfOps).doc;

  const user = await prisma.user.findFirst({ orderBy: { id: "asc" } });
  if (!user) return;
  const p = await prisma.project.upsert({ where: { slug: "scrub-bg-demo" }, update: { document: doc as never }, create: { slug: "scrub-bg-demo", name: "Сайт внутри видео", document: doc as never, userId: user.id } });
  console.log(`готово: http://localhost:3000/editor?project=${p.id}`);
}
main().finally(() => prisma.$disconnect());
