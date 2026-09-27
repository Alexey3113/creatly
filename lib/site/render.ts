/**
 * Детерминированный рендерер: SiteDocument -> HTML/CSS/JS.
 *
 * Единственное место, где документ превращается в разметку. Используется
 * везде: превью в редакторе, публикация, экспорт. Результат рендера нигде
 * не хранится и не редактируется.
 */

import { blockIndex } from "@/lib/builder/blocks/_registry";
import { cinematicRuntime } from "@/lib/builder/cinematic-runtime";
import { annotateRoot, fillBlockFields, fillCollections } from "./fill";
import { storyRuntime } from "./story-runtime";
import { chaptersRuntime } from "./chapters-runtime";
import { widgetsRuntime } from "./widgets-runtime";
import { textRuntime, textRuntimeCss } from "./text-runtime";
import { demoRuntime } from "./demo-runtime";
import { SCENE_CSS, sceneMarkup, sceneRuntime } from "./scene-runtime";
import { TRANSITIONS_CSS, transitionsRuntime } from "./transitions-runtime";
import type { BlockNode, PageNode, RenderedPage, SiteDocument, StyleScope } from "./types";

export interface RenderOptions {
  /** preview — для iframe редактора (data-bid остаются); publish — чистовой. */
  mode: "preview" | "publish";
  /** Подставить ссылки навигации (pageId -> href). */
  pageHref?: (pageId: string) => string;
}

// Reveal-анимации применяются ТОЛЬКО когда html.rv проставлен скриптом —
// если JS не выполнился, контент остаётся видимым (никаких пустых секций).
const REVEAL_CSS = `html.rv [data-reveal]{opacity:0;transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1),clip-path 1s cubic-bezier(.16,1,.3,1);transition-delay:calc(var(--stagger,0)*80ms)}html.rv [data-reveal="up"]{transform:translateY(30px)}html.rv [data-reveal="fade"]{transform:none}html.rv [data-reveal="scale"]{transform:scale(.95)}html.rv [data-reveal="clip"]{clip-path:inset(100% 0 0 0);opacity:1}html.rv [data-reveal].is-visible{opacity:1;transform:none;clip-path:inset(0)}@media(prefers-reduced-motion:reduce){html.rv [data-reveal]{opacity:1;transform:none;clip-path:none;transition:none}}`;

// Failsafe: через 2.5s всё, что не открылось (сломанный observer, скрытые
// вкладки, вложенные скроллы) принудительно показывается.
const REVEAL_JS = `(function(){if(window.matchMedia("(prefers-reduced-motion:reduce)").matches)return;if(!("IntersectionObserver" in window))return;document.documentElement.classList.add("rv");function boot(){var els=document.querySelectorAll("[data-reveal]");var o=new IntersectionObserver(function(e){e.forEach(function(en){if(en.isIntersecting){en.target.classList.add("is-visible");o.unobserve(en.target)}})},{threshold:.05,rootMargin:"0px 0px -40px 0px"});els.forEach(function(el){o.observe(el)});setTimeout(function(){els.forEach(function(el){el.classList.add("is-visible")})},2500)}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot()})();`;

/** Нейтральный SVG-плейсхолдер для битых картинок. */
const IMG_FALLBACK = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'%3E%3Crect width='1200' height='800' fill='%23e8e6e1'/%3E%3Crect x='540' y='340' width='120' height='120' rx='16' fill='%23cfccc5'/%3E%3Ccircle cx='578' cy='382' r='14' fill='%23e8e6e1'/%3E%3Cpath d='M552 436l28-30 20 20 26-32 34 42z' fill='%23e8e6e1'/%3E%3C/svg%3E`;

/** Подставляет фолбэк битым картинкам прямо в разметке. */
function withImageFallback(html: string): string {
  return html.replace(/<img(?![^>]*onerror)/gi, `<img onerror="this.onerror=null;this.src='${IMG_FALLBACK}'"`);
}

const BTN_CSS = `.b-btn{display:inline-flex;align-items:center;min-height:52px;padding:0 2rem;border-radius:var(--radius-md);background:var(--color-accent);color:var(--color-text-on-accent);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;transition:transform .3s cubic-bezier(.16,1,.3,1),opacity .3s}.b-btn:hover{transform:translateY(-2px);opacity:.9}.b-btn--ghost{background:transparent;border:1.5px solid var(--color-border);color:var(--color-text)}.b-btn--ghost:hover{border-color:var(--color-accent);color:var(--color-accent)}`;

const BASE_CSS = `*,*::before,*::after{box-sizing:border-box}html{scroll-behavior:auto!important}body{margin:0;font-family:var(--font-body);background:var(--color-bg);color:var(--color-text);-webkit-font-smoothing:antialiased}img{max-width:100%}`;

const MEDIA: Record<Exclude<StyleScope, "all">, string> = {
  desktop: "@media (min-width: 1024px)",
  tablet: "@media (min-width: 768px) and (max-width: 1023px)",
  mobile: "@media (max-width: 767px)",
};

function toKebab(prop: string): string {
  return prop.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
}

/** CSS правок конкретного блока (styles-оверрайды + hidden + surface). */
function blockOverridesCss(node: BlockNode): string {
  const rules: string[] = [];
  // Секционная палитра: локальные токены → секция и все её дети видят свой
  // набор цветов (светлая секция посреди тёмного сайта = ритм свет/тьма).
  if (node.palette && Object.keys(node.palette).length) {
    const vars = Object.entries(node.palette)
      .filter(([k, v]) => /^--[a-z0-9-]+$/i.test(k) && v)
      .map(([k, v]) => `${k}:${v}`)
      .join(";");
    if (vars) rules.push(`[data-bid="${node.id}"]{${vars}}`);
  }
  // Поверхность относительно сцены: снимаем фон секции, сцена просвечивает
  if (node.surface === "transparent") {
    rules.push(`[data-bid="${node.id}"]{background:transparent!important}`);
  } else if (node.surface === "veil") {
    // Liquid glass: luminosity-подложка + blur + inset-хайлайт +
    // градиентная кромка сверху/снизу через mask-composite
    rules.push(
      `[data-bid="${node.id}"]{position:relative;background:color-mix(in srgb,var(--color-bg) 42%,transparent)!important;background-blend-mode:luminosity;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);box-shadow:inset 0 1px 1px color-mix(in srgb,var(--color-text) 10%,transparent)}` +
      `[data-bid="${node.id}"]::before{content:"";position:absolute;inset:0;padding:1.4px;background:linear-gradient(180deg,color-mix(in srgb,var(--color-text) 26%,transparent) 0%,color-mix(in srgb,var(--color-text) 9%,transparent) 20%,transparent 40%,transparent 60%,color-mix(in srgb,var(--color-text) 9%,transparent) 80%,color-mix(in srgb,var(--color-text) 26%,transparent) 100%);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}`,
    );
  }
  for (const [scope, byField] of Object.entries(node.styles || {})) {
    for (const [field, props] of Object.entries(byField || {})) {
      const entries = Object.entries(props).filter(([, v]) => v);
      if (!entries.length) continue;
      const selector = field === "root"
        ? `[data-bid="${node.id}"]`
        : `[data-bid="${node.id}"] [data-field="${field}"]`;
      const body = entries.map(([k, v]) => `${toKebab(k)}:${v}`).join(";");
      const rule = `${selector}{${body}}`;
      rules.push(scope === "all" ? rule : `${MEDIA[scope as keyof typeof MEDIA]}{${rule}}`);
    }
  }
  for (const [vp, hidden] of Object.entries(node.hidden || {})) {
    if (hidden) rules.push(`${MEDIA[vp as keyof typeof MEDIA]}{[data-bid="${node.id}"]{display:none!important}}`);
  }
  return rules.join("\n");
}

export function renderBlock(node: BlockNode): { html: string; css: string } | null {
  // Bespoke-блок: собственный html/css (санитизирован при создании через ops)
  if (node.custom) {
    let html = fillBlockFields(node.custom.html.trim(), node.fields);
    html = annotateRoot(html, node.id);
    const attrs: string[] = [];
    if (node.sceneTint) attrs.push(`data-scene-tint="${node.sceneTint}"`);
    if (node.enter && node.enter !== "none") attrs.push(`data-enter="${node.enter}"`);
    if (attrs.length) html = html.replace(`data-bid="${node.id}"`, `data-bid="${node.id}" ${attrs.join(" ")}`);
    return { html, css: node.custom.css };
  }
  const preset = blockIndex.get(node.presetId);
  if (!preset) return null;
  let html = preset.html.trim();
  // Сначала коллекции (каждый item со своими данными), затем блочные поля —
  // они не заходят внутрь item'ов, чтобы не перезаписать их контент.
  if (node.collections) html = fillCollections(html, node.collections);
  html = fillBlockFields(html, node.fields);
  html = annotateRoot(html, node.id);
  const rootAttrs: string[] = [];
  if (node.sceneTint) rootAttrs.push(`data-scene-tint="${node.sceneTint}"`);
  if (node.enter && node.enter !== "none") rootAttrs.push(`data-enter="${node.enter}"`);
  if (rootAttrs.length) {
    html = html.replace(`data-bid="${node.id}"`, `data-bid="${node.id}" ${rootAttrs.join(" ")}`);
  }

  let css = preset.css;
  if (node.variantId && preset.variants) {
    const variant = preset.variants.find((v) => v.id === node.variantId);
    if (variant?.css) css += "\n" + variant.css;
  }
  return { html, css };
}

function fontsLink(doc: SiteDocument): string {
  const heading = doc.fonts.heading || "Playfair Display";
  const body = doc.fonts.body || "Source Sans 3";
  const families = [...new Set([heading, body])]
    .map((f) => `family=${encodeURIComponent(f)}:wght@300;400;500;600;700;800;900`)
    .join("&");
  return `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?${families}&display=swap" rel="stylesheet">`;
}

function tokensCss(tokens: Record<string, string>): string {
  const entries = Object.entries(tokens).filter(([k, v]) => k.startsWith("--") && v);
  if (!entries.length) return "";
  return `:root{\n${entries.map(([k, v]) => `${k}:${v};`).join("\n")}\n}`;
}

/** Нужен ли странице cinematic-runtime (GSAP/WebGL-блоки). */
export function pageMotionLevel(page: PageNode): "css" | "gsap" | "webgl" {
  let level: "css" | "gsap" | "webgl" = "css";
  for (const node of page.blocks) {
    const preset = blockIndex.get(node.presetId);
    if (preset?.motionLevel === "webgl") return "webgl";
    if (preset?.motionLevel === "gsap") level = "gsap";
  }
  return level;
}

/** Резолвит навигационные ссылки в fields блока (actions вида page:<id>). */
function resolveLinks(html: string, doc: SiteDocument, opts: RenderOptions): string {
  if (!opts.pageHref) return html;
  return html.replace(/href="page:([^"]+)"/g, (_, pageId) => `href="${opts.pageHref!(pageId)}"`);
}

export function renderPage(doc: SiteDocument, pageId: string, opts: RenderOptions): RenderedPage {
  const page = doc.pages.find((p) => p.id === pageId) || doc.pages[0];
  const htmlParts: string[] = [];
  const cssParts: string[] = [];
  const overrideParts: string[] = [];
  const seenCss = new Set<string>();

  for (const node of page.blocks) {
    const rendered = renderBlock(node);
    if (!rendered) continue;
    htmlParts.push(rendered.html);
    // CSS пресета дедуплицируем: два одинаковых блока — один набор правил.
    // У bespoke-блоков css уникален на блок — ключ по id.
    const cssKey = node.custom ? `custom::${node.id}` : `${node.presetId}::${node.variantId || ""}`;
    if (!seenCss.has(cssKey)) {
      seenCss.add(cssKey);
      cssParts.push(rendered.css);
    }
    const overrides = blockOverridesCss(node);
    if (overrides) overrideParts.push(overrides);
  }

  // В превью редактора анимации выключены полностью: WYSIWYG-стабильность.
  // Плюс глушим переходы входа (data-enter), чтобы канвас был стабилен.
  const previewCss = opts.mode === "preview"
    ? `[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important;transition:none!important}[data-enter]{opacity:1!important;transform:none!important;filter:none!important}`
    : "";

  const scene = doc.scene && doc.scene.type !== "none" ? doc.scene : null;
  // Режим-фильм только на паблише/просмотре; в edit-канвасе — обычный поток
  const cinema = opts.mode === "publish" && doc.cinema === true;
  const hasEnter = htmlParts.some((h) => /data-enter=/.test(h));

  const css = [
    tokensCss(doc.tokens),
    BASE_CSS,
    scene ? SCENE_CSS : "",
    opts.mode === "publish" ? REVEAL_CSS : "",
    opts.mode === "publish" ? textRuntimeCss : "",
    opts.mode === "publish" && (hasEnter || cinema) ? TRANSITIONS_CSS : "",
    BTN_CSS,
    ...cssParts,
    previewCss,
    overrideParts.length ? `/* overrides */\n${overrideParts.join("\n")}` : "",
  ].filter(Boolean).join("\n\n");

  let blocksHtml = withImageFallback(resolveLinks(htmlParts.join("\n\n"), doc, opts));
  // Режим-фильм: оборачиваем блоки в колоду (первый child — слайд)
  if (cinema) blocksHtml = `<div class="cinema-deck" data-cinema>\n${blocksHtml}\n</div>`;
  // Сцена — первый элемент: fixed-слой под всем контентом
  const body = scene ? sceneMarkup(scene) + "\n" + blocksHtml : blocksHtml;

  // Story/widgets-runtime нужны и в превью (это суть блоков), и на паблише.
  // Text/demo/cinematic-runtime — только на паблише: в превью-канвасе редактора
  // reveal принудительно выключен, а cinematic его подключает srcdoc сам.
  const js = [
    opts.mode === "publish" ? REVEAL_JS : "",
    opts.mode === "publish" && /data-reveal="(word|char|highlight)"/.test(body) ? textRuntime : "",
    opts.mode === "publish" ? demoRuntime : "",
    opts.mode === "publish" && pageMotionLevel(page) !== "css" ? cinematicRuntime : "",
    scene ? sceneRuntime : "",
    opts.mode === "publish" && (hasEnter || cinema) ? transitionsRuntime : "",
    body.includes("data-story") ? storyRuntime : "",
    body.includes("data-chapters") ? chaptersRuntime : "",
    /data-(marquee|ba|header|tilt|count|spotlight|magnet|smooth-loop|reveal-mask|orbit|hover-cycle|coverflow)/.test(body) ? widgetsRuntime : "",
  ].filter(Boolean)
    // Изоляция рантаймов: упавший модуль не гасит остальные
    .map((src) => `try{${src}}catch(e){console.error("[creatly-runtime]",e)}`)
    .join("\n");

  return { html: body, css, js };
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

/** Полный HTML-документ страницы (publish/export). CSS/JS — отдельные файлы. */
export function renderPublishHtml(
  doc: SiteDocument,
  pageId: string,
  opts: { cssHref?: string; jsSrc?: string; inline?: boolean; extraHead?: string; extraBody?: string } = {},
): { html: string; css: string; js: string } {
  const page = doc.pages.find((p) => p.id === pageId) || doc.pages[0];
  const rendered = renderPage(doc, page.id, {
    mode: "publish",
    pageHref: (id) => {
      const target = doc.pages.find((p) => p.id === id);
      return target ? (target.isHome ? "/" : target.slug) : "#";
    },
  });

  const seo = page.seo || { title: page.title, description: "" };
  const headTags = [
    `<meta charset="UTF-8">`,
    `<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
    `<title>${escapeAttr(seo.title || page.title)}</title>`,
    seo.description ? `<meta name="description" content="${escapeAttr(seo.description)}">` : "",
    seo.title ? `<meta property="og:title" content="${escapeAttr(seo.title)}">` : "",
    seo.description ? `<meta property="og:description" content="${escapeAttr(seo.description)}">` : "",
    seo.ogImage ? `<meta property="og:image" content="${escapeAttr(seo.ogImage)}">` : "",
    doc.settings.faviconUrl ? `<link rel="icon" href="${escapeAttr(doc.settings.faviconUrl)}">` : "",
    fontsLink(doc),
    opts.inline ? `<style>${rendered.css}</style>` : `<link rel="stylesheet" href="${opts.cssHref || "styles.css"}">`,
    opts.extraHead || "",
  ].filter(Boolean);

  const bodyTags = [
    rendered.html,
    opts.inline ? `<script>${rendered.js}</script>` : `<script src="${opts.jsSrc || "script.js"}" defer></script>`,
    opts.extraBody || "",
  ].filter(Boolean);

  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
${headTags.join("\n")}
</head>
<body>
${bodyTags.join("\n")}
</body>
</html>`;

  return { html, css: rendered.css, js: rendered.js };
}

export { fontsLink, tokensCss, REVEAL_CSS, REVEAL_JS };
