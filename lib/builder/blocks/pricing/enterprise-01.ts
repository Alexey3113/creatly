import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "pricing-enterprise-01",
  name: "Тарифы — 3 плана + Enterprise",
  description: "Три тарифа сверху и отдельный блок Enterprise с CTA «Связаться»",
  category: "pricing",
  subcategory: "enterprise",
  icon: "◆",
  tags: ["enterprise", "three-tier", "contact", "cta"],
  motionLevel: "css",
  fields: [
    { name: "pricing-title", type: "heading", hint: "заголовок секции", required: true },
    { name: "pricing-plan-name", type: "text", hint: "название тарифа", required: true },
    { name: "pricing-plan-price", type: "stat", hint: "цена тарифа", required: true },
    { name: "pricing-plan-features", type: "text", hint: "список возможностей", required: true },
    { name: "pricing-plan-cta", type: "link", hint: "текст кнопки", required: true },
    { name: "pricing-enterprise-title", type: "heading", hint: "заголовок Enterprise", required: true },
    { name: "pricing-enterprise-desc", type: "text", hint: "описание Enterprise", required: true },
    { name: "pricing-enterprise-cta", type: "link", hint: "кнопка Enterprise", required: true },
  ],
  html: `<section class="b-pr08" data-block="pricing">
  <div class="b-pr08__inner">
    <h2 class="b-pr08__title" data-field="pricing-title" data-reveal="up">Тарифные планы</h2>
    <div class="b-pr08__grid" data-collection="pricing" data-collection-grid>
      <div class="b-pr08__card" data-collection-item data-reveal="up">
        <h3 data-field="pricing-plan-name">Старт</h3>
        <div class="b-pr08__price" data-field="pricing-plan-price">0 ₽</div>
        <ul class="b-pr08__features" data-field="pricing-plan-features"><li>1 проект</li><li>500 МБ</li></ul>
        <a class="b-btn b-btn--outline" href="#" data-field="pricing-plan-cta">Начать</a>
      </div>
      <div class="b-pr08__card" data-collection-item data-reveal="up" style="--stagger:1">
        <h3 data-field="pricing-plan-name">Про</h3>
        <div class="b-pr08__price" data-field="pricing-plan-price">1 490 ₽</div>
        <ul class="b-pr08__features" data-field="pricing-plan-features"><li>15 проектов</li><li>50 ГБ</li></ul>
        <a class="b-btn" href="#" data-field="pricing-plan-cta">Выбрать</a>
      </div>
      <div class="b-pr08__card" data-collection-item data-reveal="up" style="--stagger:2">
        <h3 data-field="pricing-plan-name">Бизнес</h3>
        <div class="b-pr08__price" data-field="pricing-plan-price">3 990 ₽</div>
        <ul class="b-pr08__features" data-field="pricing-plan-features"><li>Безлимит</li><li>500 ГБ</li></ul>
        <a class="b-btn" href="#" data-field="pricing-plan-cta">Выбрать</a>
      </div>
    </div>
    <div class="b-pr08__enterprise" data-reveal="fade" style="--stagger:3">
      <div class="b-pr08__ent-content">
        <h3 data-field="pricing-enterprise-title">Enterprise</h3>
        <p data-field="pricing-enterprise-desc">Индивидуальные условия, SLA, выделенный менеджер и безлимитные ресурсы для вашей команды.</p>
      </div>
      <a class="b-btn" href="#" data-field="pricing-enterprise-cta">Связаться</a>
    </div>
  </div>
</section>`,
  css: `.b-pr08{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-pr08__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-pr08__title{text-align:center;font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 3rem}
.b-pr08__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-bottom:2rem}
.b-pr08__card{background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:2.5rem 2rem;text-align:center}
.b-pr08__card h3{font-family:var(--font-heading);font-size:1.25rem;color:var(--color-text);margin:0 0 .75rem}
.b-pr08__price{font-family:var(--font-heading);font-size:2.25rem;font-weight:800;color:var(--color-text);margin:0 0 1.25rem}
.b-pr08__features{list-style:none;padding:0;margin:0 0 2rem;font-family:var(--font-body);font-size:.9375rem;color:var(--color-text-muted);line-height:2}
.b-pr08__enterprise{display:flex;align-items:center;justify-content:space-between;background:var(--color-bg-alt);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:2rem 2.5rem;gap:2rem}
.b-pr08__ent-content h3{font-family:var(--font-heading);font-size:1.5rem;color:var(--color-text);margin:0 0 .5rem}
.b-pr08__ent-content p{font-family:var(--font-body);font-size:1rem;color:var(--color-text-muted);margin:0;max-width:600px}
.b-btn{display:inline-flex;align-items:center;min-height:48px;padding:0 2rem;border-radius:var(--radius-md);background:var(--color-accent);color:var(--color-text-on-accent);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;white-space:nowrap}
.b-btn--outline{background:transparent;border:2px solid var(--color-accent);color:var(--color-accent)}
@media(max-width:768px){.b-pr08__grid{grid-template-columns:1fr;max-width:400px;margin:0 auto 2rem}.b-pr08__enterprise{flex-direction:column;text-align:center}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-pr08{background:var(--color-primary)}.b-pr08__title,.b-pr08__card h3,.b-pr08__price,.b-pr08__ent-content h3{color:var(--color-text-on-primary)}.b-pr08__features,.b-pr08__ent-content p{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}.b-pr08__card,.b-pr08__enterprise{background:color-mix(in srgb,var(--color-primary) 80%,white);border-color:color-mix(in srgb,var(--color-text-on-primary) 12%,transparent)}` },
    { id: "accent", label: "Акцентный", css: `.b-pr08{background:var(--color-accent)}.b-pr08__title,.b-pr08__ent-content h3{color:var(--color-text-on-accent)}` },
  ],
};
