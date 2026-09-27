import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "pricing-three-tier-02",
  name: "Тарифы — 3 колонки, тёмный + переключатель",
  description: "Три тарифа на тёмном фоне с визуальным переключателем месяц/год",
  category: "pricing",
  subcategory: "three-tier",
  icon: "◆",
  tags: ["three-tier", "dark", "toggle", "cta"],
  motionLevel: "css",
  fields: [
    { name: "pricing-title", type: "heading", hint: "заголовок секции", required: true },
    { name: "pricing-toggle-month", type: "text", hint: "лейбл «Месяц»", required: false },
    { name: "pricing-toggle-year", type: "text", hint: "лейбл «Год»", required: false },
    { name: "pricing-plan-name", type: "text", hint: "название тарифа", required: true },
    { name: "pricing-plan-price", type: "stat", hint: "цена тарифа", required: true },
    { name: "pricing-plan-features", type: "text", hint: "список возможностей", required: true },
    { name: "pricing-plan-cta", type: "link", hint: "текст кнопки", required: true },
  ],
  html: `<section class="b-pr02" data-block="pricing">
  <div class="b-pr02__inner">
    <h2 class="b-pr02__title" data-field="pricing-title" data-reveal="up">Тарифные планы</h2>
    <div class="b-pr02__toggle" data-reveal="fade">
      <span class="b-pr02__toggle-label b-pr02__toggle-label--active" data-field="pricing-toggle-month">Месяц</span>
      <span class="b-pr02__toggle-pill"></span>
      <span class="b-pr02__toggle-label" data-field="pricing-toggle-year">Год</span>
    </div>
    <div class="b-pr02__grid" data-collection="pricing" data-collection-grid>
      <div class="b-pr02__card" data-collection-item data-reveal="up">
        <h3 data-field="pricing-plan-name">Базовый</h3>
        <div class="b-pr02__price" data-field="pricing-plan-price">990 ₽</div>
        <ul class="b-pr02__features" data-field="pricing-plan-features"><li>3 проекта</li><li>5 ГБ</li><li>Базовая аналитика</li></ul>
        <a class="b-btn b-btn--outline" href="#" data-field="pricing-plan-cta">Выбрать</a>
      </div>
      <div class="b-pr02__card b-pr02__card--popular" data-collection-item data-reveal="up" style="--stagger:1">
        <span class="b-pr02__badge">Лучший выбор</span>
        <h3 data-field="pricing-plan-name">Стандарт</h3>
        <div class="b-pr02__price" data-field="pricing-plan-price">2 490 ₽</div>
        <ul class="b-pr02__features" data-field="pricing-plan-features"><li>20 проектов</li><li>100 ГБ</li><li>Расширенная аналитика</li></ul>
        <a class="b-btn" href="#" data-field="pricing-plan-cta">Выбрать</a>
      </div>
      <div class="b-pr02__card" data-collection-item data-reveal="up" style="--stagger:2">
        <h3 data-field="pricing-plan-name">Премиум</h3>
        <div class="b-pr02__price" data-field="pricing-plan-price">5 990 ₽</div>
        <ul class="b-pr02__features" data-field="pricing-plan-features"><li>Безлимит</li><li>1 ТБ</li><li>API-доступ</li></ul>
        <a class="b-btn b-btn--outline" href="#" data-field="pricing-plan-cta">Выбрать</a>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-pr02{padding:var(--space-section) var(--space-block);background:var(--color-primary)}
.b-pr02__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-pr02__title{text-align:center;font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text-on-primary);margin:0 0 1.5rem}
.b-pr02__toggle{display:flex;align-items:center;justify-content:center;gap:.75rem;margin-bottom:3rem}
.b-pr02__toggle-label{font-family:var(--font-body);font-size:.875rem;color:color-mix(in srgb,var(--color-text-on-primary) 50%,transparent)}
.b-pr02__toggle-label--active{color:var(--color-text-on-primary);font-weight:700}
.b-pr02__toggle-pill{width:44px;height:24px;border-radius:var(--radius-full);background:var(--color-accent)}
.b-pr02__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.b-pr02__card{background:color-mix(in srgb,var(--color-primary) 75%,white);border:1px solid color-mix(in srgb,var(--color-text-on-primary) 12%,transparent);border-radius:var(--radius-lg);padding:2.5rem 2rem;text-align:center;position:relative}
.b-pr02__card--popular{border-color:var(--color-accent);background:color-mix(in srgb,var(--color-primary) 60%,white)}
.b-pr02__badge{position:absolute;top:-0.75rem;left:50%;transform:translateX(-50%);background:var(--color-accent);color:var(--color-text-on-accent);font-family:var(--font-body);font-size:.75rem;font-weight:700;padding:.25rem 1rem;border-radius:var(--radius-full);text-transform:uppercase;letter-spacing:.05em}
.b-pr02__card h3{font-family:var(--font-heading);font-size:1.25rem;color:var(--color-text-on-primary);margin:0 0 .75rem}
.b-pr02__price{font-family:var(--font-heading);font-size:2.5rem;color:var(--color-text-on-primary);font-weight:800}
.b-pr02__features{list-style:none;padding:0;margin:1.5rem 0 2rem;font-family:var(--font-body);font-size:.9375rem;color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent);line-height:2}
.b-btn{display:inline-flex;align-items:center;min-height:48px;padding:0 2rem;border-radius:var(--radius-md);background:var(--color-accent);color:var(--color-text-on-accent);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem}
.b-btn--outline{background:transparent;border:2px solid var(--color-accent);color:var(--color-accent)}
@media(max-width:768px){.b-pr02__grid{grid-template-columns:1fr;max-width:400px;margin:0 auto}}`,
  variants: [
    { id: "dark", label: "Тёмный", css: "" },
    { id: "light", label: "Светлый", css: `.b-pr02{background:var(--color-bg)}.b-pr02__title{color:var(--color-text)}.b-pr02__card{background:var(--color-surface);border-color:var(--color-border)}.b-pr02__card h3,.b-pr02__price{color:var(--color-text)}.b-pr02__features{color:var(--color-text-muted)}.b-pr02__toggle-label{color:var(--color-text-muted)}.b-pr02__toggle-label--active{color:var(--color-text)}` },
    { id: "accent", label: "Акцентный", css: `.b-pr02{background:var(--color-accent)}.b-pr02__title{color:var(--color-text-on-accent)}` },
  ],
};
