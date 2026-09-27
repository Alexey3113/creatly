import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "comparison-table-02",
  name: "Таблица сравнения — выделенная колонка",
  description: "Таблица тарифов с акцентной средней колонкой «Рекомендуем» и бейджем.",
  category: "comparison",
  subcategory: "table",
  icon: "⊞",
  tags: ["table", "comparison", "pricing", "recommended", "highlight", "badge"],
  motionLevel: "css",
  fields: [
    { name: "cm02-title", type: "heading", hint: "заголовок секции 3-6 слов", required: true },
    { name: "cm02-subtitle", type: "text", hint: "подзаголовок 1-2 предложения", required: false },
    { name: "cm02-plan-name-1", type: "heading", hint: "название тарифа 1-2 слова (1)", required: true },
    { name: "cm02-plan-name-2", type: "heading", hint: "название тарифа 1-2 слова (2)", required: true },
    { name: "cm02-plan-name-3", type: "heading", hint: "название тарифа 1-2 слова (3)", required: true },
    { name: "cm02-badge", type: "text", hint: "текст бейджа рекомендации", required: false },
    { name: "cm02-feature-name", type: "text", hint: "название фичи 2-5 слов", required: true },
    { name: "cm02-feature-check", type: "text", hint: "✓ или ✕", required: true },
  ],
  html: `<section class="b-cm02" data-block="comparison">
  <div class="b-cm02__inner">
    <h2 class="b-cm02__title" data-field="cm02-title" data-reveal="up">Какой план вам подходит?</h2>
    <p class="b-cm02__subtitle" data-field="cm02-subtitle" data-reveal="fade">Сравните возможности каждого тарифа и выберите оптимальный.</p>
    <div class="b-cm02__table-wrap" data-reveal="up" style="--stagger:1">
      <table class="b-cm02__table">
        <thead>
          <tr>
            <th class="b-cm02__corner"></th>
            <th class="b-cm02__plan-head" data-field="cm02-plan-name-1">Старт</th>
            <th class="b-cm02__plan-head b-cm02__plan-head--rec">
              <span class="b-cm02__badge" data-field="cm02-badge">Рекомендуем</span>
              <span data-field="cm02-plan-name-2">Бизнес</span>
            </th>
            <th class="b-cm02__plan-head" data-field="cm02-plan-name-3">Корпоративный</th>
          </tr>
        </thead>
        <tbody data-collection="cm02-features">
          <tr data-collection-item data-reveal="up" style="--stagger:2">
            <td class="b-cm02__feat" data-field="cm02-feature-name">Неограниченные проекты</td>
            <td class="b-cm02__check b-cm02__check--no" data-field="cm02-feature-check">✕</td>
            <td class="b-cm02__check b-cm02__check--yes b-cm02__cell--rec" data-field="cm02-feature-check">✓</td>
            <td class="b-cm02__check b-cm02__check--yes" data-field="cm02-feature-check">✓</td>
          </tr>
          <tr data-collection-item data-reveal="up" style="--stagger:3">
            <td class="b-cm02__feat" data-field="cm02-feature-name">Командная работа</td>
            <td class="b-cm02__check b-cm02__check--no" data-field="cm02-feature-check">✕</td>
            <td class="b-cm02__check b-cm02__check--yes b-cm02__cell--rec" data-field="cm02-feature-check">✓</td>
            <td class="b-cm02__check b-cm02__check--yes" data-field="cm02-feature-check">✓</td>
          </tr>
          <tr data-collection-item data-reveal="up" style="--stagger:4">
            <td class="b-cm02__feat" data-field="cm02-feature-name">Продвинутая аналитика</td>
            <td class="b-cm02__check b-cm02__check--no" data-field="cm02-feature-check">✕</td>
            <td class="b-cm02__check b-cm02__check--yes b-cm02__cell--rec" data-field="cm02-feature-check">✓</td>
            <td class="b-cm02__check b-cm02__check--yes" data-field="cm02-feature-check">✓</td>
          </tr>
          <tr data-collection-item data-reveal="up" style="--stagger:5">
            <td class="b-cm02__feat" data-field="cm02-feature-name">Белый лейбл</td>
            <td class="b-cm02__check b-cm02__check--no" data-field="cm02-feature-check">✕</td>
            <td class="b-cm02__check b-cm02__check--no b-cm02__cell--rec" data-field="cm02-feature-check">✕</td>
            <td class="b-cm02__check b-cm02__check--yes" data-field="cm02-feature-check">✓</td>
          </tr>
          <tr data-collection-item data-reveal="up" style="--stagger:6">
            <td class="b-cm02__feat" data-field="cm02-feature-name">SLA 99.9%</td>
            <td class="b-cm02__check b-cm02__check--no" data-field="cm02-feature-check">✕</td>
            <td class="b-cm02__check b-cm02__check--no b-cm02__cell--rec" data-field="cm02-feature-check">✕</td>
            <td class="b-cm02__check b-cm02__check--yes" data-field="cm02-feature-check">✓</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>`,
  css: `.b-cm02{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-cm02__inner{max-width:var(--container-width,1400px);margin:0 auto;text-align:center}
.b-cm02__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem;letter-spacing:-0.02em}
.b-cm02__subtitle{font-family:var(--font-body);font-size:1.0625rem;color:var(--color-text-muted);max-width:560px;margin:0 auto 3rem;line-height:1.6}
.b-cm02__table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch}
.b-cm02__table{width:100%;border-collapse:separate;border-spacing:0;background:var(--color-surface);border-radius:var(--radius-lg);overflow:hidden}
.b-cm02__table th,.b-cm02__table td{padding:1rem 1.25rem;font-family:var(--font-body);font-size:.9375rem;text-align:center;border-bottom:1px solid var(--color-border)}
.b-cm02__table tbody tr:last-child td{border-bottom:none}
.b-cm02__corner{background:var(--color-surface)}
.b-cm02__plan-head{font-family:var(--font-heading);font-size:1.125rem;font-weight:700;color:var(--color-text);background:var(--color-bg-alt);letter-spacing:-0.01em;position:relative}
.b-cm02__plan-head--rec{background:var(--color-accent);color:var(--color-text-on-accent);display:flex;flex-direction:column;align-items:center;gap:.35rem}
.b-cm02__badge{font-family:var(--font-body);font-size:.6875rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;background:var(--color-text-on-accent);color:var(--color-accent);padding:.2rem .6rem;border-radius:var(--radius-full);display:inline-block}
.b-cm02__cell--rec{background:color-mix(in srgb,var(--color-accent) 6%,transparent)}
.b-cm02__feat{text-align:left;font-weight:500;color:var(--color-text)}
.b-cm02__check{font-size:1.125rem}
.b-cm02__check--yes{color:var(--color-primary);font-weight:700}
.b-cm02__check--no{color:var(--color-text-muted);opacity:.5}
.b-cm02__table tbody tr{transition:background .2s}
.b-cm02__table tbody tr:hover{background:var(--color-bg-alt)}
@media(min-width:768px){.b-cm02__table th,.b-cm02__table td{padding:1.125rem 1.5rem}}
@media(min-width:1024px){.b-cm02__table th,.b-cm02__table td{padding:1.25rem 2rem;font-size:1rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-cm02{background:var(--color-primary)}.b-cm02__title{color:var(--color-text-on-primary)}.b-cm02__subtitle{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-cm02__table{background:color-mix(in srgb,var(--color-text-on-primary) 6%,transparent)}.b-cm02__plan-head{background:color-mix(in srgb,var(--color-text-on-primary) 10%,transparent);color:var(--color-text-on-primary)}.b-cm02__feat{color:var(--color-text-on-primary)}.b-cm02__check--yes{color:var(--color-accent)}.b-cm02__table th,.b-cm02__table td{border-color:color-mix(in srgb,var(--color-text-on-primary) 12%,transparent)}.b-cm02__cell--rec{background:color-mix(in srgb,var(--color-accent) 10%,transparent)}` },
    { id: "primary-rec", label: "Основной акцент", css: `.b-cm02__plan-head--rec{background:var(--color-primary);color:var(--color-text-on-primary)}.b-cm02__badge{background:var(--color-text-on-primary);color:var(--color-primary)}.b-cm02__cell--rec{background:color-mix(in srgb,var(--color-primary) 6%,transparent)}` },
  ],
};
