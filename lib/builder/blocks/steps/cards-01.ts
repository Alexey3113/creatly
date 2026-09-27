import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "steps-cards-01",
  name: "Этапы — карточки с иконками",
  description: "4 карточки шагов в ряд с иконками, нумерацией и текстом. Аккуратная сетка",
  category: "steps",
  subcategory: "cards",
  icon: "▦",
  tags: ["steps", "cards", "icons", "numbered", "grid"],
  motionLevel: "css",
  fields: [
    { name: "steps-heading", type: "heading", hint: "заголовок секции", required: true },
    { name: "steps-subtitle", type: "text", hint: "подзаголовок секции", required: false },
    { name: "step-icon", type: "icon", hint: "иконка шага", required: true },
    { name: "step-number", type: "text", hint: "номер шага", required: true },
    { name: "step-title", type: "heading", hint: "название шага", required: true },
    { name: "step-desc", type: "text", hint: "описание шага", required: true },
  ],
  html: `<section class="b-st03" data-block="steps" data-collection="steps">
  <div class="b-st03__inner">
    <div class="b-st03__header" data-reveal="up">
      <h2 class="b-st03__heading" data-field="steps-heading">Процесс сотрудничества</h2>
      <p class="b-st03__subtitle" data-field="steps-subtitle">Четыре шага к идеальному результату</p>
    </div>
    <div class="b-st03__grid" data-collection-grid>
      <div class="b-st03__card" data-collection-item data-reveal="up" style="--stagger:0">
        <div class="b-st03__icon" data-field="step-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
        </div>
        <span class="b-st03__num" data-field="step-number">01</span>
        <h3 class="b-st03__title" data-field="step-title">Брифинг</h3>
        <p class="b-st03__desc" data-field="step-desc">Собираем требования, определяем цели и формируем техническое задание</p>
      </div>
      <div class="b-st03__card" data-collection-item data-reveal="up" style="--stagger:1">
        <div class="b-st03__icon" data-field="step-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
        </div>
        <span class="b-st03__num" data-field="step-number">02</span>
        <h3 class="b-st03__title" data-field="step-title">Проектирование</h3>
        <p class="b-st03__desc" data-field="step-desc">Разрабатываем структуру, прототипы и визуальную концепцию</p>
      </div>
      <div class="b-st03__card" data-collection-item data-reveal="up" style="--stagger:2">
        <div class="b-st03__icon" data-field="step-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        </div>
        <span class="b-st03__num" data-field="step-number">03</span>
        <h3 class="b-st03__title" data-field="step-title">Разработка</h3>
        <p class="b-st03__desc" data-field="step-desc">Реализуем проект с регулярными демонстрациями промежуточных результатов</p>
      </div>
      <div class="b-st03__card" data-collection-item data-reveal="up" style="--stagger:3">
        <div class="b-st03__icon" data-field="step-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
        <span class="b-st03__num" data-field="step-number">04</span>
        <h3 class="b-st03__title" data-field="step-title">Запуск</h3>
        <p class="b-st03__desc" data-field="step-desc">Финальное тестирование, деплой и передача всех материалов</p>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-st03{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-st03__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-st03__header{text-align:center;margin-bottom:4rem}
.b-st03__heading{font-family:var(--font-heading);font-size:clamp(2rem,4vw,3.5rem);color:var(--color-text);margin:0 0 1rem;letter-spacing:-0.02em;font-weight:600}
.b-st03__subtitle{font-family:var(--font-body);font-size:clamp(1rem,1.5vw,1.25rem);color:var(--color-text-muted);margin:0;max-width:520px;margin-inline:auto}
.b-st03__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem}
.b-st03__card{background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:2rem;display:flex;flex-direction:column;gap:1rem;transition:box-shadow 0.3s ease,transform 0.3s ease}
.b-st03__card:hover{transform:translateY(-4px);box-shadow:0 12px 40px color-mix(in srgb,var(--color-text) 8%,transparent)}
.b-st03__icon{width:3.5rem;height:3.5rem;border-radius:var(--radius-md);background:color-mix(in srgb,var(--color-primary) 10%,transparent);display:flex;align-items:center;justify-content:center;color:var(--color-primary)}
.b-st03__num{font-family:var(--font-heading);font-size:0.8125rem;font-weight:600;color:var(--color-text-muted);letter-spacing:0.05em}
.b-st03__title{font-family:var(--font-heading);font-size:clamp(1rem,1.3vw,1.25rem);color:var(--color-text);margin:0;font-weight:600}
.b-st03__desc{font-family:var(--font-body);font-size:0.9375rem;color:var(--color-text-muted);margin:0;line-height:1.6}
@media(max-width:768px){.b-st03__grid{grid-template-columns:1fr;gap:1rem}.b-st03__header{margin-bottom:2.5rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-st03{background:var(--color-primary)}.b-st03__heading{color:var(--color-text-on-primary)}.b-st03__subtitle{color:color-mix(in srgb,var(--color-text-on-primary) 60%,transparent)}.b-st03__card{background:color-mix(in srgb,var(--color-text-on-primary) 6%,transparent);border-color:color-mix(in srgb,var(--color-text-on-primary) 10%,transparent)}.b-st03__num{color:color-mix(in srgb,var(--color-text-on-primary) 50%,transparent)}.b-st03__title{color:var(--color-text-on-primary)}.b-st03__desc{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-st03__icon{background:color-mix(in srgb,var(--color-accent) 15%,transparent);color:var(--color-accent)}` },
    { id: "bordered", label: "С рамками", css: `.b-st03__card{background:transparent;border:2px solid var(--color-border)}.b-st03__card:hover{border-color:var(--color-primary)}` },
  ],
};
