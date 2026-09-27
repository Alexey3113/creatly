import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "pricing-gradient-01",
  name: "Тарифы — карточки с градиентом",
  description: "Карточки тарифов, популярный план с градиентным акцентным фоном",
  category: "pricing",
  subcategory: "gradient",
  icon: "◆",
  tags: ["gradient", "cards", "popular", "accent"],
  motionLevel: "css",
  fields: [
    { name: "pricing-title", type: "heading", hint: "заголовок секции", required: true },
    { name: "pricing-subtitle", type: "text", hint: "подзаголовок", required: false },
    { name: "pricing-plan-name", type: "text", hint: "название тарифа", required: true },
    { name: "pricing-plan-price", type: "stat", hint: "цена тарифа", required: true },
    { name: "pricing-plan-period", type: "text", hint: "период оплаты", required: false },
    { name: "pricing-plan-features", type: "text", hint: "список возможностей", required: true },
    { name: "pricing-plan-cta", type: "link", hint: "текст кнопки", required: true },
  ],
  html: `<section class="b-pr10" data-block="pricing">
  <div class="b-pr10__inner">
    <h2 class="b-pr10__title" data-field="pricing-title" data-reveal="up">Тарифы</h2>
    <p class="b-pr10__subtitle" data-field="pricing-subtitle" data-reveal="fade">Выберите подходящий план</p>
    <div class="b-pr10__grid" data-collection="pricing" data-collection-grid>
      <div class="b-pr10__card" data-collection-item data-reveal="up">
        <h3 data-field="pricing-plan-name">Лайт</h3>
        <div class="b-pr10__price" data-field="pricing-plan-price">490 ₽</div>
        <p class="b-pr10__period" data-field="pricing-plan-period">в месяц</p>
        <ul class="b-pr10__features" data-field="pricing-plan-features"><li>3 проекта</li><li>5 ГБ</li><li>Email-поддержка</li></ul>
        <a class="b-btn b-btn--outline" href="#" data-field="pricing-plan-cta">Выбрать</a>
      </div>
      <div class="b-pr10__card b-pr10__card--gradient" data-collection-item data-reveal="up" style="--stagger:1">
        <span class="b-pr10__badge">Популярный</span>
        <h3 data-field="pricing-plan-name">Стандарт</h3>
        <div class="b-pr10__price" data-field="pricing-plan-price">1 990 ₽</div>
        <p class="b-pr10__period" data-field="pricing-plan-period">в месяц</p>
        <ul class="b-pr10__features" data-field="pricing-plan-features"><li>20 проектов</li><li>100 ГБ</li><li>Приоритет</li></ul>
        <a class="b-btn b-btn--white" href="#" data-field="pricing-plan-cta">Выбрать</a>
      </div>
      <div class="b-pr10__card" data-collection-item data-reveal="up" style="--stagger:2">
        <h3 data-field="pricing-plan-name">Максимум</h3>
        <div class="b-pr10__price" data-field="pricing-plan-price">4 990 ₽</div>
        <p class="b-pr10__period" data-field="pricing-plan-period">в месяц</p>
        <ul class="b-pr10__features" data-field="pricing-plan-features"><li>Безлимит</li><li>1 ТБ</li><li>API + менеджер</li></ul>
        <a class="b-btn b-btn--outline" href="#" data-field="pricing-plan-cta">Выбрать</a>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-pr10{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-pr10__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-pr10__title{text-align:center;font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem}
.b-pr10__subtitle{text-align:center;font-family:var(--font-body);font-size:1.125rem;color:var(--color-text-muted);margin:0 0 3rem}
.b-pr10__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.b-pr10__card{background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:2.5rem 2rem;text-align:center;position:relative}
.b-pr10__card--gradient{background:linear-gradient(135deg,var(--color-accent),var(--color-primary));border:none}
.b-pr10__badge{position:absolute;top:-0.75rem;left:50%;transform:translateX(-50%);background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:.75rem;font-weight:700;padding:.25rem 1rem;border-radius:var(--radius-full);text-transform:uppercase;letter-spacing:.05em}
.b-pr10__card h3{font-family:var(--font-heading);font-size:1.25rem;color:var(--color-text);margin:0 0 .75rem}
.b-pr10__card--gradient h3{color:var(--color-text-on-accent)}
.b-pr10__price{font-family:var(--font-heading);font-size:2.5rem;font-weight:800;color:var(--color-text)}
.b-pr10__card--gradient .b-pr10__price{color:var(--color-text-on-accent)}
.b-pr10__period{font-family:var(--font-body);font-size:.875rem;color:var(--color-text-muted);margin:.25rem 0 1.5rem}
.b-pr10__card--gradient .b-pr10__period{color:color-mix(in srgb,var(--color-text-on-accent) 80%,transparent)}
.b-pr10__features{list-style:none;padding:0;margin:0 0 2rem;font-family:var(--font-body);font-size:.9375rem;color:var(--color-text-muted);line-height:2}
.b-pr10__card--gradient .b-pr10__features{color:color-mix(in srgb,var(--color-text-on-accent) 80%,transparent)}
.b-btn{display:inline-flex;align-items:center;min-height:48px;padding:0 2rem;border-radius:var(--radius-md);background:var(--color-accent);color:var(--color-text-on-accent);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem}
.b-btn--outline{background:transparent;border:2px solid var(--color-accent);color:var(--color-accent)}
.b-btn--white{background:var(--color-bg);color:var(--color-text)}
@media(max-width:768px){.b-pr10__grid{grid-template-columns:1fr;max-width:400px;margin:0 auto}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-pr10{background:var(--color-primary)}.b-pr10__title{color:var(--color-text-on-primary)}.b-pr10__subtitle{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}.b-pr10__card{background:color-mix(in srgb,var(--color-primary) 80%,white);border-color:color-mix(in srgb,var(--color-text-on-primary) 12%,transparent)}.b-pr10__card h3,.b-pr10__price{color:var(--color-text-on-primary)}.b-pr10__period,.b-pr10__features{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}` },
    { id: "accent", label: "Акцентный", css: `.b-pr10{background:var(--color-accent)}.b-pr10__title{color:var(--color-text-on-accent)}.b-pr10__subtitle{color:color-mix(in srgb,var(--color-text-on-accent) 80%,transparent)}` },
  ],
};
