import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "pricing-three-tier-01",
  name: "Тарифы — 3 колонки, популярный",
  description: "Три тарифных плана в ряд, средний выделен акцентной рамкой и бейджем «Популярный»",
  category: "pricing",
  subcategory: "three-tier",
  icon: "◆",
  tags: ["three-tier", "popular", "badge", "cta"],
  motionLevel: "css",
  fields: [
    { name: "pricing-title", type: "heading", hint: "заголовок секции", required: true },
    { name: "pricing-plan-name", type: "text", hint: "название тарифа", required: true },
    { name: "pricing-plan-price", type: "stat", hint: "цена тарифа", required: true },
    { name: "pricing-plan-period", type: "text", hint: "период (мес/год)", required: false },
    { name: "pricing-plan-features", type: "text", hint: "список возможностей", required: true },
    { name: "pricing-plan-cta", type: "link", hint: "текст кнопки", required: true },
  ],
  html: `<section class="b-pr01" data-block="pricing">
  <div class="b-pr01__inner">
    <h2 class="b-pr01__title" data-field="pricing-title" data-reveal="up">Выберите тариф</h2>
    <div class="b-pr01__grid" data-collection="pricing" data-collection-grid>
      <div class="b-pr01__card" data-collection-item data-reveal="up">
        <h3 data-field="pricing-plan-name">Старт</h3>
        <div class="b-pr01__price" data-field="pricing-plan-price">0 ₽</div>
        <p class="b-pr01__period" data-field="pricing-plan-period">навсегда</p>
        <ul class="b-pr01__features" data-field="pricing-plan-features"><li>1 проект</li><li>500 МБ</li><li>Email-поддержка</li></ul>
        <a class="b-btn" href="#" data-field="pricing-plan-cta">Начать</a>
      </div>
      <div class="b-pr01__card b-pr01__card--popular" data-collection-item data-reveal="up" style="--stagger:1">
        <span class="b-pr01__badge">Популярный</span>
        <h3 data-field="pricing-plan-name">Про</h3>
        <div class="b-pr01__price" data-field="pricing-plan-price">1 490 ₽</div>
        <p class="b-pr01__period" data-field="pricing-plan-period">в месяц</p>
        <ul class="b-pr01__features" data-field="pricing-plan-features"><li>10 проектов</li><li>50 ГБ</li><li>Приоритет</li></ul>
        <a class="b-btn" href="#" data-field="pricing-plan-cta">Выбрать</a>
      </div>
      <div class="b-pr01__card" data-collection-item data-reveal="up" style="--stagger:2">
        <h3 data-field="pricing-plan-name">Бизнес</h3>
        <div class="b-pr01__price" data-field="pricing-plan-price">4 990 ₽</div>
        <p class="b-pr01__period" data-field="pricing-plan-period">в месяц</p>
        <ul class="b-pr01__features" data-field="pricing-plan-features"><li>Безлимит</li><li>500 ГБ</li><li>Менеджер</li></ul>
        <a class="b-btn" href="#" data-field="pricing-plan-cta">Выбрать</a>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-pr01{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-pr01__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-pr01__title{text-align:center;font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 3rem}
.b-pr01__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.b-pr01__card{background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:2.5rem 2rem;text-align:center;position:relative}
.b-pr01__card--popular{border-color:var(--color-accent);box-shadow:0 0 0 2px var(--color-accent)}
.b-pr01__badge{position:absolute;top:-0.75rem;left:50%;transform:translateX(-50%);background:var(--color-accent);color:var(--color-text-on-accent);font-family:var(--font-body);font-size:.75rem;font-weight:700;padding:.25rem 1rem;border-radius:var(--radius-full);text-transform:uppercase;letter-spacing:.05em}
.b-pr01__card h3{font-family:var(--font-heading);font-size:1.25rem;color:var(--color-text);margin:0 0 .75rem}
.b-pr01__price{font-family:var(--font-heading);font-size:2.5rem;color:var(--color-text);font-weight:800;margin:0}
.b-pr01__period{font-family:var(--font-body);font-size:.875rem;color:var(--color-text-muted);margin:.25rem 0 1.5rem}
.b-pr01__features{list-style:none;padding:0;margin:0 0 2rem;font-family:var(--font-body);font-size:.9375rem;color:var(--color-text-muted);line-height:2}
.b-btn{display:inline-flex;align-items:center;min-height:48px;padding:0 2rem;border-radius:var(--radius-md);background:var(--color-accent);color:var(--color-text-on-accent);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem}
@media(max-width:768px){.b-pr01__grid{grid-template-columns:1fr;max-width:400px;margin:0 auto}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-pr01{background:var(--color-primary)}.b-pr01__title{color:var(--color-text-on-primary)}.b-pr01__card{background:color-mix(in srgb,var(--color-primary) 80%,white);border-color:color-mix(in srgb,var(--color-text-on-primary) 15%,transparent)}.b-pr01__card h3,.b-pr01__price{color:var(--color-text-on-primary)}.b-pr01__period,.b-pr01__features{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}` },
    { id: "accent", label: "Акцентный", css: `.b-pr01{background:var(--color-accent)}.b-pr01__title{color:var(--color-text-on-accent)}` },
  ],
};
