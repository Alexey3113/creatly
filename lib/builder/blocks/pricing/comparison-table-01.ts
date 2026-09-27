import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "pricing-comparison-table-01",
  name: "Тарифы — таблица сравнения",
  description: "Таблица сравнения: строки — фичи, колонки — тарифы, галочки и крестики",
  category: "pricing",
  subcategory: "comparison",
  icon: "◆",
  tags: ["comparison", "table", "checkmarks"],
  motionLevel: "css",
  fields: [
    { name: "pricing-title", type: "heading", hint: "заголовок секции", required: true },
    { name: "pricing-subtitle", type: "text", hint: "подзаголовок", required: false },
    { name: "pricing-tier-name-1", type: "text", hint: "название тарифа (колонка) (1)", required: true },
    { name: "pricing-tier-name-2", type: "text", hint: "название тарифа (колонка) (2)", required: true },
    { name: "pricing-tier-name-3", type: "text", hint: "название тарифа (колонка) (3)", required: true },
    { name: "pricing-feature-name", type: "text", hint: "название возможности (строка)", required: true },
  ],
  html: `<section class="b-pr06" data-block="pricing">
  <div class="b-pr06__inner">
    <h2 class="b-pr06__title" data-field="pricing-title" data-reveal="up">Сравнение тарифов</h2>
    <p class="b-pr06__subtitle" data-field="pricing-subtitle" data-reveal="fade">Выберите план под ваши задачи</p>
    <div class="b-pr06__wrap" data-reveal="fade" style="--stagger:1">
      <table class="b-pr06__table">
        <thead>
          <tr>
            <th data-field="pricing-feature-name">Возможность</th>
            <th data-field="pricing-tier-name-1">Старт</th>
            <th data-field="pricing-tier-name-2">Про</th>
            <th data-field="pricing-tier-name-3">Бизнес</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Проекты</td><td>3</td><td>30</td><td>∞</td></tr>
          <tr><td>Хранилище</td><td>1 ГБ</td><td>50 ГБ</td><td>500 ГБ</td></tr>
          <tr><td>Пользователи</td><td>1</td><td>10</td><td>∞</td></tr>
          <tr><td>Аналитика</td><td>✕</td><td>✓</td><td>✓</td></tr>
          <tr><td>API-доступ</td><td>✕</td><td>✕</td><td>✓</td></tr>
          <tr><td>Менеджер</td><td>✕</td><td>✕</td><td>✓</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>`,
  css: `.b-pr06{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-pr06__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-pr06__title{text-align:center;font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem}
.b-pr06__subtitle{text-align:center;font-family:var(--font-body);font-size:1.125rem;color:var(--color-text-muted);margin:0 0 3rem}
.b-pr06__wrap{overflow-x:auto}
.b-pr06__table{width:100%;border-collapse:collapse;font-family:var(--font-body);font-size:.9375rem}
.b-pr06__table th{font-family:var(--font-heading);font-weight:700;color:var(--color-text);padding:1rem;text-align:center;border-bottom:2px solid var(--color-border)}
.b-pr06__table th:first-child{text-align:left}
.b-pr06__table td{padding:.875rem 1rem;text-align:center;border-bottom:1px solid var(--color-border);color:var(--color-text-muted)}
.b-pr06__table td:first-child{text-align:left;color:var(--color-text);font-weight:600}
.b-pr06__table tbody tr:hover{background:var(--color-bg-alt)}
@media(max-width:768px){.b-pr06__wrap{margin:0 -1rem}.b-pr06__table{font-size:.8125rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-pr06{background:var(--color-primary)}.b-pr06__title,.b-pr06__table th,.b-pr06__table td:first-child{color:var(--color-text-on-primary)}.b-pr06__subtitle,.b-pr06__table td{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}.b-pr06__table th{border-color:color-mix(in srgb,var(--color-text-on-primary) 20%,transparent)}.b-pr06__table td{border-color:color-mix(in srgb,var(--color-text-on-primary) 10%,transparent)}.b-pr06__table tbody tr:hover{background:color-mix(in srgb,var(--color-primary) 85%,white)}` },
    { id: "accent", label: "Акцентный", css: `.b-pr06{background:var(--color-accent)}.b-pr06__title{color:var(--color-text-on-accent)}` },
  ],
};
