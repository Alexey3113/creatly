/**
 * SiteDocument v3 — единственный источник правды о сайте.
 *
 * HTML/CSS/JS нигде не хранятся: они детерминированно рендерятся из документа
 * (см. render.ts). Все изменения — и от пользователя в редакторе, и от AI —
 * выражаются операциями над документом (см. ops.ts).
 */

export type Viewport = "desktop" | "tablet" | "mobile";
export type StyleScope = "all" | Viewport;

/** Тип появления блока при входе в экран (путь B) и перехода в режиме-фильме (путь A). */
export type EnterTransition =
  | "none"
  | "fade"
  | "slide-left"
  | "slide-right"
  | "rise"
  | "fall"
  | "zoom-in"
  | "zoom-through"
  | "rotate";

/** Один элемент повторяющейся коллекции (карточка товара, отзыв, пункт FAQ). */
export interface RepeatItem {
  id: string;
  /** Значения data-field внутри элемента коллекции. */
  fields: Record<string, string>;
}

/** Экземпляр блока на странице. */
export interface BlockNode {
  id: string;
  /** id пресета из реестра блоков (lib/builder/blocks). */
  presetId: string;
  variantId?: string;
  /** Значения обычных (не коллекционных) data-field блока. */
  fields: Record<string, string>;
  /**
   * Данные именованных коллекций блока: имя (data-collection="имя") -> items.
   * undefined — рендерятся элементы-заглушки из пресета как есть.
   */
  collections?: Record<string, RepeatItem[]>;
  /** @deprecated Легаси-формат одной коллекции; мигрируется в collections. */
  items?: RepeatItem[];
  /**
   * Ручные стилевые оверрайды: scope -> (field | "root") -> css-свойства.
   * Например: { all: { "hero-title": { color: "#fff" } }, mobile: { root: { padding: "24px" } } }
   */
  styles?: Partial<Record<StyleScope, Record<string, Record<string, string>>>>;
  /**
   * Поверхность блока относительно сцены (doc.scene):
   * solid — свой фон (по умолчанию); transparent — сцена просвечивает;
   * veil — полупрозрачное «стекло» с blur поверх сцены.
   */
  surface?: "solid" | "transparent" | "veil";
  /** Ключ сцены: при входе блока в вьюпорт сцена морфится к этому тону. */
  sceneTint?: string;
  /**
   * Секционная палитра: локальный набор CSS-токенов (--color-bg/text/...),
   * действующий только внутри этой секции. Даёт РИТМ свет/тьма — светлую
   * секцию-передышку посреди тёмного сайта — без смены глобальных токенов.
   */
  palette?: Record<string, string>;
  /** Как блок появляется при входе в экран (и переходит в режиме-фильме). */
  enter?: EnterTransition;
  hidden?: Partial<Record<Viewport, boolean>>;
  /**
   * Bespoke-блок: уникальный HTML/CSS, написанный AI под конкретный бренд
   * (presetId === "custom"). HTML хранится санитизированным, тексты размечены
   * data-field — редактируются как обычные поля. CSS живёт только в классах
   * с префиксом .cb- (изоляция от остальной страницы).
   */
  custom?: { html: string; css: string };
}

export interface PageSeo {
  title: string;
  description: string;
  ogImage?: string;
}

export interface PageNode {
  id: string;
  title: string;
  /** "/" для главной, "/about" и т.п. */
  slug: string;
  seo: PageSeo;
  blocks: BlockNode[];
  isHome?: boolean;
  showInNavigation?: boolean;
}

export interface NavLink {
  id: string;
  label: string;
  pageId?: string;
  href?: string;
}

export interface SiteFonts {
  heading: string;
  body: string;
}

export interface SiteSettings {
  analyticsCode?: string;
  cookieBannerEnabled?: boolean;
  cookieBannerText?: string;
  customDomain?: string;
  customDomainVerified?: boolean;
  faviconUrl?: string;
}

/**
 * Сцена — непрерывный живой фон на весь сайт (слой под всеми блоками).
 * aurora — дышащие световые пятна; mesh — переливающийся градиент;
 * field — точечное поле со связями (canvas); liquid — плывущие мягкие
 * пятна (canvas). grain — плёночное зерно поверх.
 */
export interface SiteScene {
  type: "none" | "aurora" | "mesh" | "field" | "liquid" | "video";
  /** 0..1 — насколько сцена заметна. */
  intensity?: number;
  grain?: boolean;
  /** Для type="video": URL непрерывного ролика (5-8 сек, без склеек). */
  video?: string;
  /** Постер-кадр: статичный фон на мобильных / без JS / в превью. */
  poster?: string;
  /** true — видео скрабится глобальным скроллом всей страницы; false — луп. */
  scrub?: boolean;
}

export interface SiteDocument {
  version: 3;
  name: string;
  activePageId: string;
  pages: PageNode[];
  navigation: {
    headerLinks: NavLink[];
    footerLinks: NavLink[];
  };
  /** CSS custom properties арт-дирекшна: "--color-accent" -> "#c4613a". */
  tokens: Record<string, string>;
  fonts: SiteFonts;
  settings: SiteSettings;
  /** Живой фон сайта; отсутствие = выключено. */
  scene?: SiteScene;
  /**
   * Режим-фильм (путь A): секции — полноэкранные слайды, скролл перехватывается,
   * переход к следующей — с её enter-анимацией. Десктоп-онли; на мобильных и при
   * наличии многоэкранных story-блоков авто-выключается в пользу обычного скролла.
   */
  cinema?: boolean;
}

/** Результат рендера страницы — чистый артефакт, никогда не хранится. */
export interface RenderedPage {
  html: string;
  css: string;
  js: string;
}
