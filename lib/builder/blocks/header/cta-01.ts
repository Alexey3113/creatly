import type { BlockPreset } from "../_types";

/**
 * Шапка с CTA-кнопкой. Логотип — навигация — акцентная кнопка записи.
 * Для бизнесов с конверсионной целью (запись, заявка, покупка).
 */
export const block: BlockPreset = {
  id: "header-cta-01",
  name: "Шапка с кнопкой",
  description: "Логотип, навигация по центру и акцентная CTA-кнопка справа. Для сайтов с целевым действием: запись, заявка, консультация.",
  category: "header",
  subcategory: "cta",
  icon: "▛",
  tags: ["header", "nav", "sticky", "cta", "conversion"],
  motionLevel: "css",
  fields: [
    { name: "hd02-logo", type: "text", hint: "название/логотип, 1-2 слова", required: true },
    { name: "hd02-link", type: "link", hint: "пункт меню, 1-2 слова", required: true },
    { name: "hd02-cta", type: "link", hint: "текст CTA-кнопки, 1-3 слова", required: true },
  ],
  html: `<header class="b-hd02" data-block="header" data-header>
  <div class="b-hd02__inner">
    <a class="b-hd02__logo" href="#" data-field="hd02-logo">Клиника</a>
    <nav class="b-hd02__nav" data-collection="hd02-links">
      <a class="b-hd02__link" href="#" data-field="hd02-link" data-collection-item>Услуги</a>
      <a class="b-hd02__link" href="#" data-field="hd02-link" data-collection-item>Врачи</a>
      <a class="b-hd02__link" href="#" data-field="hd02-link" data-collection-item>Отзывы</a>
      <a class="b-hd02__link" href="#" data-field="hd02-link" data-collection-item>Контакты</a>
    </nav>
    <a class="b-hd02__cta" href="#" data-field="hd02-cta">Записаться</a>
  </div>
</header>`,
  css: `.b-hd02{position:sticky;top:0;z-index:200;background:color-mix(in srgb,var(--color-bg) 85%,transparent);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid transparent;transition:border-color .3s ease}
.b-hd02.is-scrolled{border-bottom-color:var(--color-border)}
.b-hd02__inner{max-width:var(--container-width,1400px);margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:1.5rem;padding:.85rem var(--space-block)}
.b-hd02__logo{font-family:var(--font-heading);font-size:1.2rem;font-weight:800;letter-spacing:-.02em;color:var(--color-text);text-decoration:none}
.b-hd02__nav{display:flex;align-items:center;gap:clamp(.9rem,2.2vw,1.8rem);margin:0 auto}
.b-hd02__link{font-family:var(--font-body);font-size:.9rem;font-weight:600;color:var(--color-text-muted);text-decoration:none;transition:color .2s}
.b-hd02__link:hover{color:var(--color-text)}
.b-hd02__cta{font-family:var(--font-body);font-size:.875rem;font-weight:700;color:var(--color-text-on-accent);background:var(--color-accent);text-decoration:none;padding:.6rem 1.25rem;border-radius:var(--radius-full);transition:transform .25s cubic-bezier(.16,1,.3,1),opacity .2s;white-space:nowrap}
.b-hd02__cta:hover{transform:translateY(-1px);opacity:.92}
@media(max-width:768px){.b-hd02__nav{display:none}.b-hd02__cta{font-size:.8125rem;padding:.5rem 1rem}}`,
  variants: [
    { id: "light", label: "Светлая", css: "" },
    { id: "dark", label: "Тёмная", css: `.b-hd02{background:rgba(10,10,15,.8)}.b-hd02.is-scrolled{border-bottom-color:rgba(255,255,255,.08)}.b-hd02__logo{color:#fff}.b-hd02__link{color:rgba(255,255,255,.6)}.b-hd02__link:hover{color:#fff}` },
    { id: "outline", label: "Кнопка-контур", css: `.b-hd02__cta{background:transparent;color:var(--color-text);border:1.5px solid var(--color-text)}.b-hd02__cta:hover{background:var(--color-text);color:var(--color-bg)}` },
  ],
};
