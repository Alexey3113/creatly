import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "pricing-two-tier-01",
  name: "Тарифы — Free vs Pro + таблица",
  description: "Два тарифа Free и Pro с таблицей сравнения ниже",
  category: "pricing",
  subcategory: "two-tier",
  icon: "◆",
  tags: ["two-tier", "comparison", "free", "pro"],
  motionLevel: "css",
  fields: [
    { name: "pricing-title", type: "heading", hint: "заголовок секции", required: true },
    { name: "pricing-subtitle", type: "text", hint: "подзаголовок", required: false },
    { name: "pricing-free-name", type: "text", hint: "название бесплатного плана", required: true },
    { name: "pricing-free-price", type: "stat", hint: "цена (0 ₽)", required: true },
    { name: "pricing-free-cta", type: "link", hint: "кнопка бесплатного плана", required: true },
    { name: "pricing-pro-name", type: "text", hint: "название платного плана", required: true },
    { name: "pricing-pro-price", type: "stat", hint: "цена платного плана", required: true },
    { name: "pricing-pro-cta", type: "link", hint: "кнопка платного плана", required: true },
  ],
  html: `<section class="b-pr03" data-block="pricing">
  <div class="b-pr03__inner">
    <h2 class="b-pr03__title" data-field="pricing-title" data-reveal="up">Тарифы</h2>
    <p class="b-pr03__subtitle" data-field="pricing-subtitle" data-reveal="fade">Начните бесплатно, перейдите когда готовы</p>
    <div class="b-pr03__cards" data-reveal="up" style="--stagger:1">
      <div class="b-pr03__card">
        <h3 data-field="pricing-free-name">Free</h3>
        <div class="b-pr03__price" data-field="pricing-free-price">0 ₽</div>
        <a class="b-btn b-btn--outline" href="#" data-field="pricing-free-cta">Начать бесплатно</a>
      </div>
      <div class="b-pr03__card b-pr03__card--pro">
        <h3 data-field="pricing-pro-name">Pro</h3>
        <div class="b-pr03__price" data-field="pricing-pro-price">1 990 ₽ / мес</div>
        <a class="b-btn" href="#" data-field="pricing-pro-cta">Оформить</a>
      </div>
    </div>
    <table class="b-pr03__table" data-reveal="fade" style="--stagger:2">
      <thead><tr><th>Возможность</th><th>Free</th><th>Pro</th></tr></thead>
      <tbody>
        <tr><td>Проекты</td><td>2</td><td>Безлимит</td></tr>
        <tr><td>Хранилище</td><td>1 ГБ</td><td>100 ГБ</td></tr>
        <tr><td>Пользователи</td><td>1</td><td>10</td></tr>
        <tr><td>Поддержка</td><td>Email</td><td>Приоритет 24/7</td></tr>
      </tbody>
    </table>
  </div>
</section>`,
  css: `.b-pr03{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-pr03__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-pr03__title{text-align:center;font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem}
.b-pr03__subtitle{text-align:center;font-family:var(--font-body);font-size:1.125rem;color:var(--color-text-muted);margin:0 0 3rem}
.b-pr03__cards{display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem;margin-bottom:3rem}
.b-pr03__card{background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:2.5rem 2rem;text-align:center}
.b-pr03__card--pro{border-color:var(--color-accent);box-shadow:0 0 0 2px var(--color-accent)}
.b-pr03__card h3{font-family:var(--font-heading);font-size:1.25rem;color:var(--color-text);margin:0 0 .75rem}
.b-pr03__price{font-family:var(--font-heading);font-size:2.25rem;color:var(--color-text);font-weight:800;margin:0 0 1.5rem}
.b-pr03__table{width:100%;border-collapse:collapse;font-family:var(--font-body);font-size:.9375rem}
.b-pr03__table th,.b-pr03__table td{padding:.875rem 1rem;text-align:left;border-bottom:1px solid var(--color-border)}
.b-pr03__table th{color:var(--color-text);font-weight:700}
.b-pr03__table td{color:var(--color-text-muted)}
.b-btn{display:inline-flex;align-items:center;min-height:48px;padding:0 2rem;border-radius:var(--radius-md);background:var(--color-accent);color:var(--color-text-on-accent);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem}
.b-btn--outline{background:transparent;border:2px solid var(--color-accent);color:var(--color-accent)}
@media(max-width:768px){.b-pr03__cards{grid-template-columns:1fr;max-width:400px;margin:0 auto 3rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-pr03{background:var(--color-primary)}.b-pr03__title,.b-pr03__card h3,.b-pr03__price,.b-pr03__table th{color:var(--color-text-on-primary)}.b-pr03__subtitle,.b-pr03__table td{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}.b-pr03__card{background:color-mix(in srgb,var(--color-primary) 80%,white);border-color:color-mix(in srgb,var(--color-text-on-primary) 12%,transparent)}.b-pr03__table th,.b-pr03__table td{border-color:color-mix(in srgb,var(--color-text-on-primary) 12%,transparent)}` },
    { id: "accent", label: "Акцентный", css: `.b-pr03{background:var(--color-accent)}.b-pr03__title,.b-pr03__card h3,.b-pr03__price{color:var(--color-text-on-accent)}` },
  ],
};
