import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "pricing-two-tier-02",
  name: "Тарифы — 2 карточки, градиент-акцент",
  description: "Два тарифа рядом, один с градиентным акцентным фоном",
  category: "pricing",
  subcategory: "two-tier",
  icon: "◆",
  tags: ["two-tier", "gradient", "accent"],
  motionLevel: "css",
  fields: [
    { name: "pricing-title", type: "heading", hint: "заголовок секции", required: true },
    { name: "pricing-basic-name", type: "text", hint: "название базового плана", required: true },
    { name: "pricing-basic-price", type: "stat", hint: "цена базового", required: true },
    { name: "pricing-basic-features", type: "text", hint: "список возможностей", required: true },
    { name: "pricing-basic-cta", type: "link", hint: "кнопка базового", required: true },
    { name: "pricing-premium-name", type: "text", hint: "название премиум плана", required: true },
    { name: "pricing-premium-price", type: "stat", hint: "цена премиум", required: true },
    { name: "pricing-premium-features", type: "text", hint: "список возможностей", required: true },
    { name: "pricing-premium-cta", type: "link", hint: "кнопка премиум", required: true },
  ],
  html: `<section class="b-pr04" data-block="pricing">
  <div class="b-pr04__inner">
    <h2 class="b-pr04__title" data-field="pricing-title" data-reveal="up">Простые тарифы</h2>
    <div class="b-pr04__grid" data-reveal="up" style="--stagger:1">
      <div class="b-pr04__card">
        <h3 data-field="pricing-basic-name">Базовый</h3>
        <div class="b-pr04__price" data-field="pricing-basic-price">790 ₽ / мес</div>
        <ul class="b-pr04__features" data-field="pricing-basic-features"><li>5 проектов</li><li>10 ГБ хранилище</li><li>Email-поддержка</li></ul>
        <a class="b-btn b-btn--outline" href="#" data-field="pricing-basic-cta">Начать</a>
      </div>
      <div class="b-pr04__card b-pr04__card--accent">
        <h3 data-field="pricing-premium-name">Премиум</h3>
        <div class="b-pr04__price" data-field="pricing-premium-price">2 990 ₽ / мес</div>
        <ul class="b-pr04__features" data-field="pricing-premium-features"><li>Безлимит проектов</li><li>200 ГБ хранилище</li><li>Приоритетная поддержка</li></ul>
        <a class="b-btn b-btn--white" href="#" data-field="pricing-premium-cta">Оформить</a>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-pr04{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-pr04__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-pr04__title{text-align:center;font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 3rem}
.b-pr04__grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem}
.b-pr04__card{background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:2.5rem 2rem;text-align:center}
.b-pr04__card--accent{background:linear-gradient(135deg,var(--color-accent),var(--color-primary));border:none}
.b-pr04__card h3{font-family:var(--font-heading);font-size:1.25rem;color:var(--color-text);margin:0 0 .75rem}
.b-pr04__card--accent h3{color:var(--color-text-on-accent)}
.b-pr04__price{font-family:var(--font-heading);font-size:2.25rem;font-weight:800;color:var(--color-text);margin:0 0 1.5rem}
.b-pr04__card--accent .b-pr04__price{color:var(--color-text-on-accent)}
.b-pr04__features{list-style:none;padding:0;margin:0 0 2rem;font-family:var(--font-body);font-size:.9375rem;color:var(--color-text-muted);line-height:2}
.b-pr04__card--accent .b-pr04__features{color:color-mix(in srgb,var(--color-text-on-accent) 80%,transparent)}
.b-btn{display:inline-flex;align-items:center;min-height:48px;padding:0 2rem;border-radius:var(--radius-md);background:var(--color-accent);color:var(--color-text-on-accent);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem}
.b-btn--outline{background:transparent;border:2px solid var(--color-accent);color:var(--color-accent)}
.b-btn--white{background:var(--color-bg);color:var(--color-text)}
@media(max-width:768px){.b-pr04__grid{grid-template-columns:1fr;max-width:420px;margin:0 auto}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-pr04{background:var(--color-primary)}.b-pr04__title{color:var(--color-text-on-primary)}.b-pr04__card{background:color-mix(in srgb,var(--color-primary) 80%,white);border-color:color-mix(in srgb,var(--color-text-on-primary) 12%,transparent)}.b-pr04__card h3,.b-pr04__price{color:var(--color-text-on-primary)}.b-pr04__features{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}` },
    { id: "accent", label: "Акцентный", css: `.b-pr04{background:var(--color-accent)}.b-pr04__title{color:var(--color-text-on-accent)}` },
  ],
};
