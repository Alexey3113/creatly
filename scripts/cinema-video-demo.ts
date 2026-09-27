import { PrismaClient } from "@prisma/client";
import { createEmptyDocument } from "@/lib/site/create";
import { applyOps, type SiteOp } from "@/lib/site/ops";

const V = (n: string) => `/assets/demo/${n}.mp4`;

const prisma = new PrismaClient();
async function main() {
  let doc = createEmptyDocument("Кино на видео");

  const ops: SiteOp[] = [
    { op: "add-block", presetId: "header-transparent-01", variantId: "over-dark",
      fields: { "hd03-logo": "Atelier", "hd03-cta": "Обсудить проект" } },

    // 1. ФЛАГМАН: видео-постер со скрабом по главам (наезд в интерьер)
    { op: "add-block", presetId: "story-poster-01", variantId: "scrub", fields: {
      "sp01-video": V("luxury"),
      "sp01-meta-left": "Atelier — 2026",
      "sp01-meta-right": "Фильм о студии",
      "sp01-step-text": "Мы создаём пространства, где *свет решает всё* — и каждая деталь на своём месте.",
      "sp01-step-time": "0.3",
    } },

    // 2. Видео в буквах (энергия просвечивает сквозь текст)
    { op: "add-block", presetId: "story-video-text-01", variantId: "dark", fields: {
      "svt01-video": V("bold"),
      "svt01-word": "ЭНЕРГИЯ",
      "svt01-sub": "Всё, что мы делаем — живёт и движется",
    } },

    // 3. 3D-карусель работ (карточки под углом)
    { op: "add-block", presetId: "gallery-coverflow-01", variantId: "dark", fields: {
      "cf01-eyebrow": "Портфолио",
      "cf01-title": "Работы, которыми гордимся",
    } },

    // 4. Видео-история по шагам (жест = шаг; подъём камеры по бетону)
    { op: "add-block", presetId: "story-video-02", fields: {
      "sv02-video": V("brutalist"),
      "sv02-eyebrow": "Путь проекта",
      "sv02-step-tag": "01 · Основа",
      "sv02-step-title": "Начинаем с сырого материала",
      "sv02-step-text": "Бетон, свет, объём. Мы видим потенциал там, где другие видят стройку.",
      "sv02-step-time": "0.3",
    } },

    // 5. Живая сетка работ
    { op: "add-block", presetId: "gallery-hover-grid-01", variantId: "dark", fields: {
      "hg01-eyebrow": "Портфолио",
      "hg01-title": "Наведите — оживёт",
    } },

    { op: "add-block", presetId: "cta-banner-02" },
    { op: "add-block", presetId: "footer-columns-02", variantId: "dark" },

    { op: "set-tokens", tokens: {
      "--color-bg": "#08080d", "--color-bg-alt": "#0e0e15", "--color-surface": "#14141c",
      "--color-text": "#f5f5f7", "--color-text-muted": "rgba(235,235,245,.55)",
      "--color-primary": "#0e0e15", "--color-border": "rgba(255,255,255,.09)",
      "--color-accent": "#3b5bff",
    } },
    { op: "set-scene", scene: { type: "aurora", intensity: 0.7, grain: true } },
  ];

  const r = applyOps(doc, ops);
  if (r.errors.length) { console.log("ERRORS:", r.errors); return; }
  doc = r.doc;

  // Дозаполняем главы видео-постера и видео-истории (по 3 шага, таймкоды под 5-сек ролик)
  const poster = doc.pages[0].blocks[1];
  const posterCol = poster.collections?.["sp01-chapters"];
  if (posterCol) {
    posterCol[0].fields = { "sp01-step-text": "Мы создаём пространства, где *свет решает всё* — и каждая деталь на своём месте.", "sp01-step-time": "0.3" };
    if (posterCol[1]) posterCol[1].fields = { "sp01-step-text": "Сначала мы *слушаем место*: как падает свет, где хочется задержаться.", "sp01-step-time": "2.5" };
    if (posterCol[2]) posterCol[2].fields = { "sp01-step-text": "И доводим до состояния, из которого *не хочется уходить*.", "sp01-step-time": "4.6" };
  }
  const story = doc.pages[0].blocks[3];
  const storyCol = story.collections?.["sv02-steps"];
  if (storyCol) {
    storyCol[0].fields = { "sv02-step-tag": "01 · Основа", "sv02-step-title": "Начинаем с сырого материала", "sv02-step-text": "Бетон, свет, объём — мы видим потенциал там, где другие видят стройку.", "sv02-step-time": "0.3" };
    if (storyCol[1]) storyCol[1].fields = { "sv02-step-tag": "02 · Форма", "sv02-step-title": "Выстраиваем ритм и свет", "sv02-step-text": "Каждая плоскость работает на ощущение — пространство начинает дышать.", "sv02-step-time": "2.5" };
    if (storyCol[2]) storyCol[2].fields = { "sv02-step-tag": "03 · Жизнь", "sv02-step-title": "Отдаём готовым к жизни", "sv02-step-text": "Место, в которое возвращаются. Это и есть результат.", "sv02-step-time": "4.6" };
  }

  // морфинг сцены по секциям
  const b = doc.pages[0].blocks;
  const r2 = applyOps(doc, [
    { op: "set-block-surface", blockId: b[2].id, surface: "transparent", sceneTint: "#3b5bff" },
    { op: "set-block-surface", blockId: b[3].id, sceneTint: "#9aa0a6" },
    { op: "set-block-surface", blockId: b[4].id, sceneTint: "#e8843c" },
  ]);
  doc = r2.doc;

  const user = await prisma.user.findFirst({ orderBy: { id: "asc" } });
  if (!user) { console.log("нет пользователей"); return; }
  const project = await prisma.project.upsert({
    where: { slug: "cinema-video-demo" },
    update: { document: doc as never },
    create: { slug: "cinema-video-demo", name: "Кино на видео", document: doc as never, userId: user.id },
  });
  console.log(`готово: http://localhost:3000/editor?project=${project.id}`);
}
main().finally(() => prisma.$disconnect());
