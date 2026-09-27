import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "pricing-single-01",
  name: "Тариф — один план, центр",
  description: "Один тариф по центру с крупной ценой и чеклистом возможностей",
  category: "pricing",
  subcategory: "single",
  icon: "◆",
  tags: ["single", "centered", "checklist"],
  motionLevel: "css",
  fields: [
    { name: "pricing-title", type: "heading", hint: "заголовок секции", required: true },
    { name: "pricing-subtitle", type: "text", hint: "подзаголовок", required: false },
    { name: "pricing-price", type: "stat", hint: "цена", required: true },
    { name: "pricing-period", type: "text", hint: "период оплаты", required: false },
    { name: "pricing-features", type: "text", hint: "список возможностей", required: true },
    { name: "pricing-cta", type: "link", hint: "текст CTA-кнопки", required: true },
  ],
  html: `<section class="b-pr05" data-block="pricing">
  <div class="b-pr05__inner">
    <h2 class="b-pr05__title" data-field="pricing-title" data-reveal="up">Один тариф — всё включено</h2>
    <p class="b-pr05__subtitle" data-field="pricing-subtitle" data-reveal="fade">Без скрытых платежей и ограничений</p>
    <div class="b-pr05__card" data-reveal="up" style="--stagger:1">
      <div class="b-pr05__price" data-field="pricing-price">3 490 ₽</div>
      <p class="b-pr05__period" data-field="pricing-period">в месяц</p>
      <ul class="b-pr05__features" data-field="pricing-features">
        <li>✓ Безлимит проектов</li>
        <li>✓ 500 ГБ хранилище</li>
        <li>✓ До 25 пользователей</li>
        <li>✓ Приоритетная поддержка 24/7</li>
        <li>✓ API-доступ</li>
      </ul>
      <a class="b-btn" href="#" data-field="pricing-cta" data-reveal="fade" style="--stagger:2">Начать сейчас</a>
    </div>
  </div>
</section>`,
  css: `.b-pr05{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-pr05__inner{max-width:var(--container-width,1400px);margin:0 auto;text-align:center}
.b-pr05__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem}
.b-pr05__subtitle{font-family:var(--font-body);font-size:1.125rem;color:var(--color-text-muted);margin:0 0 3rem}
.b-pr05__card{max-width:520px;margin:0 auto;background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:3rem 2.5rem}
.b-pr05__price{font-family:var(--font-heading);font-size:3.5rem;font-weight:800;color:var(--color-text);margin:0}
.b-pr05__period{font-family:var(--font-body);font-size:.875rem;color:var(--color-text-muted);margin:.25rem 0 2rem}
.b-pr05__features{list-style:none;padding:0;margin:0 0 2.5rem;font-family:var(--font-body);font-size:1rem;color:var(--color-text);line-height:2.2;text-align:left;display:inline-block}
.b-btn{display:inline-flex;align-items:center;min-height:52px;padding:0 2.5rem;border-radius:var(--radius-md);background:var(--color-accent);color:var(--color-text-on-accent);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:1rem}
@media(max-width:768px){.b-pr05__card{padding:2rem 1.5rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-pr05{background:var(--color-primary)}.b-pr05__title,.b-pr05__price,.b-pr05__features{color:var(--color-text-on-primary)}.b-pr05__subtitle,.b-pr05__period{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}.b-pr05__card{background:color-mix(in srgb,var(--color-primary) 80%,white);border-color:color-mix(in srgb,var(--color-text-on-primary) 12%,transparent)}` },
    { id: "accent", label: "Акцентный", css: `.b-pr05{background:var(--color-accent)}.b-pr05__title,.b-pr05__price,.b-pr05__features{color:var(--color-text-on-accent)}.b-pr05__subtitle,.b-pr05__period{color:color-mix(in srgb,var(--color-text-on-accent) 80%,transparent)}` },
  ],
};
