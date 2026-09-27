import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "pricing-cards-01",
  name: "Тарифы — горизонтальные карточки",
  description: "Горизонтально расположенные карточки-планы с ценой и CTA",
  category: "pricing",
  subcategory: "cards",
  icon: "◆",
  tags: ["cards", "horizontal", "stacked", "cta"],
  motionLevel: "css",
  fields: [
    { name: "pricing-title", type: "heading", hint: "заголовок секции", required: true },
    { name: "pricing-plan-name", type: "text", hint: "название тарифа", required: true },
    { name: "pricing-plan-price", type: "stat", hint: "цена тарифа", required: true },
    { name: "pricing-plan-desc", type: "text", hint: "краткое описание", required: true },
    { name: "pricing-plan-cta", type: "link", hint: "текст кнопки", required: true },
  ],
  html: `<section class="b-pr07" data-block="pricing">
  <div class="b-pr07__inner">
    <h2 class="b-pr07__title" data-field="pricing-title" data-reveal="up">Наши планы</h2>
    <div class="b-pr07__list" data-collection="pricing" data-collection-grid>
      <div class="b-pr07__card" data-collection-item data-reveal="up">
        <div class="b-pr07__info">
          <h3 data-field="pricing-plan-name">Стартовый</h3>
          <p data-field="pricing-plan-desc">Для личных проектов и экспериментов</p>
        </div>
        <div class="b-pr07__price" data-field="pricing-plan-price">590 ₽ / мес</div>
        <a class="b-btn b-btn--outline" href="#" data-field="pricing-plan-cta">Выбрать</a>
      </div>
      <div class="b-pr07__card" data-collection-item data-reveal="up" style="--stagger:1">
        <div class="b-pr07__info">
          <h3 data-field="pricing-plan-name">Команда</h3>
          <p data-field="pricing-plan-desc">Для малого бизнеса до 15 человек</p>
        </div>
        <div class="b-pr07__price" data-field="pricing-plan-price">1 990 ₽ / мес</div>
        <a class="b-btn" href="#" data-field="pricing-plan-cta">Выбрать</a>
      </div>
      <div class="b-pr07__card" data-collection-item data-reveal="up" style="--stagger:2">
        <div class="b-pr07__info">
          <h3 data-field="pricing-plan-name">Масштаб</h3>
          <p data-field="pricing-plan-desc">Для растущих компаний без лимитов</p>
        </div>
        <div class="b-pr07__price" data-field="pricing-plan-price">4 990 ₽ / мес</div>
        <a class="b-btn" href="#" data-field="pricing-plan-cta">Выбрать</a>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-pr07{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-pr07__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-pr07__title{text-align:center;font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 3rem}
.b-pr07__list{display:flex;flex-direction:column;gap:1rem}
.b-pr07__card{display:flex;align-items:center;justify-content:space-between;background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:1.75rem 2rem;gap:2rem}
.b-pr07__info{flex:1}
.b-pr07__info h3{font-family:var(--font-heading);font-size:1.25rem;color:var(--color-text);margin:0 0 .25rem}
.b-pr07__info p{font-family:var(--font-body);font-size:.9375rem;color:var(--color-text-muted);margin:0}
.b-pr07__price{font-family:var(--font-heading);font-size:1.5rem;font-weight:800;color:var(--color-text);white-space:nowrap}
.b-btn{display:inline-flex;align-items:center;min-height:44px;padding:0 1.75rem;border-radius:var(--radius-md);background:var(--color-accent);color:var(--color-text-on-accent);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.875rem;white-space:nowrap}
.b-btn--outline{background:transparent;border:2px solid var(--color-accent);color:var(--color-accent)}
@media(max-width:768px){.b-pr07__card{flex-direction:column;text-align:center;gap:1rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-pr07{background:var(--color-primary)}.b-pr07__title{color:var(--color-text-on-primary)}.b-pr07__card{background:color-mix(in srgb,var(--color-primary) 80%,white);border-color:color-mix(in srgb,var(--color-text-on-primary) 12%,transparent)}.b-pr07__info h3,.b-pr07__price{color:var(--color-text-on-primary)}.b-pr07__info p{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}` },
    { id: "accent", label: "Акцентный", css: `.b-pr07{background:var(--color-accent)}.b-pr07__title{color:var(--color-text-on-accent)}` },
  ],
};
