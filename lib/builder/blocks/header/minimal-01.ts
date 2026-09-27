import type { BlockPreset } from "../_types";

/**
 * Шапка — минимальная. Sticky с blur-подложкой; тонкая линия-граница
 * появляется только после скролла (класс .is-scrolled вешает widgets-runtime).
 */
export const block: BlockPreset = {
  id: "header-minimal-01",
  name: "Шапка — минимум",
  description: "Логотип слева, навигация справа. Прилипает к верху с blur-подложкой, граница проявляется при скролле. Тихая и универсальная.",
  category: "header",
  subcategory: "minimal",
  icon: "▔",
  tags: ["header", "nav", "sticky", "minimal", "blur"],
  motionLevel: "css",
  fields: [
    { name: "hd01-logo", type: "text", hint: "название/логотип, 1-2 слова", required: true },
    { name: "hd01-link", type: "link", hint: "пункт меню, 1-2 слова", required: true },
  ],
  html: `<header class="b-hd01" data-block="header" data-header>
  <div class="b-hd01__inner">
    <a class="b-hd01__logo" href="#" data-field="hd01-logo">Студия</a>
    <nav class="b-hd01__nav" data-collection="hd01-links">
      <a class="b-hd01__link" href="#" data-field="hd01-link" data-collection-item>Подход</a>
      <a class="b-hd01__link" href="#" data-field="hd01-link" data-collection-item>Работы</a>
      <a class="b-hd01__link" href="#" data-field="hd01-link" data-collection-item>Цены</a>
      <a class="b-hd01__link" href="#" data-field="hd01-link" data-collection-item>Контакты</a>
    </nav>
  </div>
</header>`,
  css: `.b-hd01{position:sticky;top:0;z-index:200;background:color-mix(in srgb,var(--color-bg) 82%,transparent);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid transparent;transition:border-color .3s ease,background .3s ease}
.b-hd01.is-scrolled{border-bottom-color:var(--color-border);background:color-mix(in srgb,var(--color-bg) 92%,transparent)}
.b-hd01__inner{max-width:var(--container-width,1400px);margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:2rem;padding:1rem var(--space-block)}
.b-hd01__logo{font-family:var(--font-heading);font-size:1.2rem;font-weight:800;letter-spacing:-.02em;color:var(--color-text);text-decoration:none}
.b-hd01__nav{display:flex;align-items:center;gap:clamp(1rem,2.5vw,2rem)}
.b-hd01__link{font-family:var(--font-body);font-size:.9rem;font-weight:600;color:var(--color-text-muted);text-decoration:none;transition:color .2s}
.b-hd01__link:hover{color:var(--color-text)}
@media(max-width:768px){.b-hd01__nav{gap:.9rem}.b-hd01__link{font-size:.8125rem}.b-hd01__nav .b-hd01__link:nth-child(n+4){display:none}}`,
  variants: [
    { id: "light", label: "Светлая", css: "" },
    { id: "dark", label: "Тёмная", css: `.b-hd01{background:rgba(10,10,15,.78)}.b-hd01.is-scrolled{background:rgba(10,10,15,.92);border-bottom-color:rgba(255,255,255,.08)}.b-hd01__logo{color:#fff}.b-hd01__link{color:rgba(255,255,255,.6)}.b-hd01__link:hover{color:#fff}` },
  ],
};
