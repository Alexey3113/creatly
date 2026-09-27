import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "comparison-table-01",
  name: "Таблица сравнения — 3 колонки",
  description: "Таблица фич с тремя тарифами: Базовый, Стандарт, Премиум. Строки с галочками и крестиками.",
  category: "comparison",
  subcategory: "table",
  icon: "⊞",
  tags: ["table", "comparison", "pricing", "features", "plans", "grid"],
  motionLevel: "css",
  fields: [
    { name: "cm01-title", type: "heading", hint: "заголовок секции 3-6 слов", required: true },
    { name: "cm01-subtitle", type: "text", hint: "подзаголовок 1-2 предложения", required: false },
    { name: "cm01-plan-name-1", type: "heading", hint: "название тарифа 1-2 слова (1)", required: true },
    { name: "cm01-plan-name-2", type: "heading", hint: "название тарифа 1-2 слова (2)", required: true },
    { name: "cm01-plan-name-3", type: "heading", hint: "название тарифа 1-2 слова (3)", required: true },
    { name: "cm01-feature-name", type: "text", hint: "название фичи 2-5 слов", required: true },
    { name: "cm01-feature-check", type: "text", hint: "✓ или ✕", required: true },
  ],
  html: `<section class="b-cm01" data-block="comparison">
  <div class="b-cm01__inner">
    <h2 class="b-cm01__title" data-field="cm01-title" data-reveal="up">Сравните тарифные планы</h2>
    <p class="b-cm01__subtitle" data-field="cm01-subtitle" data-reveal="fade">Выберите план, который лучше всего подходит вашему бизнесу.</p>
    <div class="b-cm01__table-wrap" data-reveal="up" style="--stagger:1">
      <table class="b-cm01__table">
        <thead>
          <tr>
            <th class="b-cm01__corner"></th>
            <th class="b-cm01__plan-head" data-field="cm01-plan-name-1">Базовый</th>
            <th class="b-cm01__plan-head" data-field="cm01-plan-name-2">Стандарт</th>
            <th class="b-cm01__plan-head" data-field="cm01-plan-name-3">Премиум</th>
          </tr>
        </thead>
        <tbody data-collection="cm01-features">
          <tr data-collection-item data-reveal="up" style="--stagger:2">
            <td class="b-cm01__feat" data-field="cm01-feature-name">Облачное хранилище</td>
            <td class="b-cm01__check b-cm01__check--yes" data-field="cm01-feature-check">✓</td>
            <td class="b-cm01__check b-cm01__check--yes" data-field="cm01-feature-check">✓</td>
            <td class="b-cm01__check b-cm01__check--yes" data-field="cm01-feature-check">✓</td>
          </tr>
          <tr data-collection-item data-reveal="up" style="--stagger:3">
            <td class="b-cm01__feat" data-field="cm01-feature-name">Аналитика и отчёты</td>
            <td class="b-cm01__check b-cm01__check--no" data-field="cm01-feature-check">✕</td>
            <td class="b-cm01__check b-cm01__check--yes" data-field="cm01-feature-check">✓</td>
            <td class="b-cm01__check b-cm01__check--yes" data-field="cm01-feature-check">✓</td>
          </tr>
          <tr data-collection-item data-reveal="up" style="--stagger:4">
            <td class="b-cm01__feat" data-field="cm01-feature-name">API-интеграции</td>
            <td class="b-cm01__check b-cm01__check--no" data-field="cm01-feature-check">✕</td>
            <td class="b-cm01__check b-cm01__check--yes" data-field="cm01-feature-check">✓</td>
            <td class="b-cm01__check b-cm01__check--yes" data-field="cm01-feature-check">✓</td>
          </tr>
          <tr data-collection-item data-reveal="up" style="--stagger:5">
            <td class="b-cm01__feat" data-field="cm01-feature-name">Приоритетная поддержка</td>
            <td class="b-cm01__check b-cm01__check--no" data-field="cm01-feature-check">✕</td>
            <td class="b-cm01__check b-cm01__check--no" data-field="cm01-feature-check">✕</td>
            <td class="b-cm01__check b-cm01__check--yes" data-field="cm01-feature-check">✓</td>
          </tr>
          <tr data-collection-item data-reveal="up" style="--stagger:6">
            <td class="b-cm01__feat" data-field="cm01-feature-name">Персональный менеджер</td>
            <td class="b-cm01__check b-cm01__check--no" data-field="cm01-feature-check">✕</td>
            <td class="b-cm01__check b-cm01__check--no" data-field="cm01-feature-check">✕</td>
            <td class="b-cm01__check b-cm01__check--yes" data-field="cm01-feature-check">✓</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>`,
  css: `.b-cm01{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-cm01__inner{max-width:var(--container-width,1400px);margin:0 auto;text-align:center}
.b-cm01__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem;letter-spacing:-0.02em}
.b-cm01__subtitle{font-family:var(--font-body);font-size:1.0625rem;color:var(--color-text-muted);max-width:560px;margin:0 auto 3rem;line-height:1.6}
.b-cm01__table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch}
.b-cm01__table{width:100%;border-collapse:separate;border-spacing:0;background:var(--color-surface);border-radius:var(--radius-lg);overflow:hidden}
.b-cm01__table th,.b-cm01__table td{padding:1rem 1.25rem;font-family:var(--font-body);font-size:.9375rem;text-align:center;border-bottom:1px solid var(--color-border)}
.b-cm01__table tbody tr:last-child td{border-bottom:none}
.b-cm01__corner{background:var(--color-surface)}
.b-cm01__plan-head{font-family:var(--font-heading);font-size:1.125rem;font-weight:700;color:var(--color-text);background:var(--color-bg-alt);letter-spacing:-0.01em}
.b-cm01__feat{text-align:left;font-weight:500;color:var(--color-text)}
.b-cm01__check{font-size:1.125rem}
.b-cm01__check--yes{color:var(--color-primary);font-weight:700}
.b-cm01__check--no{color:var(--color-text-muted);opacity:.5}
.b-cm01__table tbody tr{transition:background .2s}
.b-cm01__table tbody tr:hover{background:var(--color-bg-alt)}
@media(min-width:768px){.b-cm01__table th,.b-cm01__table td{padding:1.125rem 1.5rem}}
@media(min-width:1024px){.b-cm01__table th,.b-cm01__table td{padding:1.25rem 2rem;font-size:1rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-cm01{background:var(--color-primary)}.b-cm01__title{color:var(--color-text-on-primary)}.b-cm01__subtitle{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-cm01__table{background:color-mix(in srgb,var(--color-text-on-primary) 6%,transparent)}.b-cm01__plan-head{background:color-mix(in srgb,var(--color-text-on-primary) 10%,transparent);color:var(--color-text-on-primary)}.b-cm01__feat{color:var(--color-text-on-primary)}.b-cm01__check--yes{color:var(--color-accent)}.b-cm01__table th,.b-cm01__table td{border-color:color-mix(in srgb,var(--color-text-on-primary) 12%,transparent)}.b-cm01__table tbody tr:hover{background:color-mix(in srgb,var(--color-text-on-primary) 4%,transparent)}` },
    { id: "bordered", label: "С рамкой", css: `.b-cm01__table{border:1px solid var(--color-border)}.b-cm01__check--yes{color:var(--color-accent)}` },
  ],
};
