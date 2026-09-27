/**
 * Blueprint'ы сайта — структурные архетипы, ломающие однотипность.
 *
 * Проблема: генерация всегда собирала один скелет (пролёт-премиум: hero-скраб
 * → главы → coverflow → цифры), поэтому сайты различались только медиа.
 * Решение: над блоками — слой РЕЖИССУРЫ. Арт-директор выбирает архетип под
 * бриз, а он задаёт тип hero, набор и порядок секций, тип движения и ритм.
 * Один движок (генерация + скролл) — принципиально разные сайты.
 *
 * Все четыре используют РАЗНЫЕ story-механики (они уже есть в библиотеке, но
 * раньше не комбинировались): пролёт vs объект-в-фокусе vs кинетический текст
 * vs сеточное портфолио.
 */

export interface SiteBlueprint {
  id: string;
  name: string;
  /** Когда уместен — типы бизнеса. */
  bestFor: string;
  /** Тип движения — определяет характер всего сайта. */
  motion: "forward-journey" | "object-focus" | "kinetic-text" | "lateral-grid";
  /** Одно предложение о ритме — подмешивается в промпты. */
  rhythm: string;
  /**
   * «Спайн» — упорядоченные роли секций с рекомендованными блоками.
   * Генерация выбирает по этому плану, а не по фиксированному правилу.
   */
  spine: { role: string; blocks: string[]; note: string }[];
  /** Нужна ли сквозная hero-видео-цепочка start→end (Higgsfield). */
  wantsHeroFilm: boolean;
}

export const blueprints: SiteBlueprint[] = [
  {
    id: "cinematic-journey",
    name: "Кино-путешествие",
    bestFor: "недвижимость, отели, авто, туризм, премиум-места и пространства",
    motion: "forward-journey",
    rhythm: "непрерывный пролёт камеры сквозь пространство, из истории в историю, медленно и кинематографично",
    wantsHeroFilm: true,
    spine: [
      { role: "hero-film", blocks: ["story-poster-01"], note: "сквозной видео-пролёт со скраб-главами (start→end)" },
      { role: "chapters", blocks: ["story-chapters-01"], note: "полноэкранные главы-сцены с масками перехода" },
      { role: "manifesto", blocks: ["story-highlight-01", "story-manifesto-01"], note: "манифест бренда" },
      { role: "gallery", blocks: ["gallery-coverflow-01"], note: "витрина пространств/моделей" },
      { role: "stats", blocks: ["case-studies-counters-01"], note: "цифры" },
      { role: "cta", blocks: ["cta-split-02", "cta-gradient-01"], note: "призыв" },
    ],
  },
  {
    id: "product-reveal",
    name: "Продукт в фокусе",
    bestFor: "гаджеты, техника, часы, кроссовки, парфюм, авто, один герой-продукт",
    motion: "object-focus",
    rhythm: "объект в центре, детали и характеристики всплывают вокруг по мере скролла, фокус и приближение вместо пролёта",
    wantsHeroFilm: false,
    spine: [
      { role: "hero-object", blocks: ["hero-poster-01", "story-poster-01"], note: "герой-объект крупно, драматичный свет" },
      { role: "showcase", blocks: ["story-showcase-01"], note: "продукт залипает по центру, фичи-выноски проявляются вокруг" },
      { role: "detail-zoom", blocks: ["story-zoom-01"], note: "зум-погружение в деталь" },
      { role: "features", blocks: ["features-tilt-01", "features-glow-01"], note: "характеристики карточками" },
      { role: "kinetic", blocks: ["story-video-text-01"], note: "имя/слово продукта с видео сквозь буквы" },
      { role: "stats", blocks: ["case-studies-counters-01"], note: "цифры-спеки" },
      { role: "cta", blocks: ["cta-split-02", "cta-banner-02"], note: "купить/заказать" },
    ],
  },
  {
    id: "editorial-kinetic",
    name: "Кинетический журнал",
    bestFor: "креативные студии, агентства, музыка, мода, медиа, дерзкие бренды, портфолио",
    motion: "kinetic-text",
    rhythm: "текст — главный герой, гигантская кинетическая типографика, скролл вбок, дерзкий темп, видео акцентно а не фоном",
    wantsHeroFilm: false,
    spine: [
      { role: "hero-statement", blocks: ["story-manifesto-01", "hero-statement-01"], note: "кинетический текст-манифест во весь экран" },
      { role: "lateral", blocks: ["story-horizontal-01"], note: "горизонтальная лента работ (скролл везёт вбок)" },
      { role: "kinetic", blocks: ["story-video-text-01"], note: "огромное слово с видео сквозь буквы" },
      { role: "grid", blocks: ["gallery-hover-grid-01", "gallery-reveal-01"], note: "сетка работ, оживает под курсором" },
      { role: "manifesto", blocks: ["story-highlight-01"], note: "второй смысловой удар" },
      { role: "cta", blocks: ["cta-banner-02", "cta-split-01"], note: "начать проект" },
    ],
  },
  {
    id: "showcase-grid",
    name: "Витрина-портфолио",
    bestFor: "фотографы, архитекторы, дизайн-бюро, каталоги, коллекции, услуги с кейсами",
    motion: "lateral-grid",
    rhythm: "структурная сетка и стек, много воздуха, работы говорят сами, спокойный editorial-ритм",
    wantsHeroFilm: false,
    spine: [
      { role: "hero", blocks: ["hero-poster-01", "hero-full-image-05"], note: "большой кадр + editorial-заголовок" },
      { role: "grid", blocks: ["gallery-bento-01", "gallery-grid-02"], note: "бенто/сетка работ" },
      { role: "stack", blocks: ["story-stack-01"], note: "стек кейсов внахлёст" },
      { role: "lateral", blocks: ["story-horizontal-01"], note: "лента работ вбок" },
      { role: "testimonials", blocks: ["testimonials-cinematic-01", "testimonials-quote-01"], note: "отзыв/цитата" },
      { role: "cta", blocks: ["cta-split-02"], note: "связаться" },
    ],
  },
];

export function blueprintById(id?: string): SiteBlueprint | undefined {
  return blueprints.find((b) => b.id === id);
}

/** Список архетипов для промпта арт-дирекшна. */
export function blueprintsPrompt(): string {
  return blueprints
    .map((b) => `### ${b.name} (id: "${b.id}")\n- Подходит: ${b.bestFor}\n- Движение: ${b.rhythm}\n- Структура: ${b.spine.map((s) => s.role).join(" → ")}`)
    .join("\n\n");
}

/** План секций blueprint'а для selection-промпта. */
export function blueprintSpinePrompt(bp: SiteBlueprint): string {
  return bp.spine
    .map((s, i) => `${i + 1}. [${s.role}] ${s.note}\n   кандидаты: ${s.blocks.join(", ")}`)
    .join("\n");
}
