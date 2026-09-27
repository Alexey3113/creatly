import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "steps-numbered-01",
  name: "Этапы — нумерованные горизонтальные",
  description: "4 шага горизонтально с крупными номерами 01-04, соединённые линией. Чистая структура процесса",
  category: "steps",
  subcategory: "numbered",
  icon: "①",
  tags: ["steps", "numbered", "horizontal", "process", "line"],
  motionLevel: "css",
  fields: [
    { name: "steps-heading", type: "heading", hint: "заголовок секции", required: true },
    { name: "steps-subtitle", type: "text", hint: "подзаголовок секции", required: false },
    { name: "step-number", type: "text", hint: "номер шага (01, 02...)", required: true },
    { name: "step-title", type: "heading", hint: "название шага", required: true },
    { name: "step-desc", type: "text", hint: "описание шага 1-2 предложения", required: true },
  ],
  html: `<section class="b-st01" data-block="steps" data-collection="steps">
  <div class="b-st01__inner">
    <div class="b-st01__header" data-reveal="up">
      <h2 class="b-st01__heading" data-field="steps-heading">Как мы работаем</h2>
      <p class="b-st01__subtitle" data-field="steps-subtitle">Прозрачный процесс от идеи до результата</p>
    </div>
    <div class="b-st01__grid" data-collection-grid>
      <div class="b-st01__line"></div>
      <div class="b-st01__item" data-collection-item data-reveal="up" style="--stagger:0">
        <span class="b-st01__num" data-field="step-number">01</span>
        <h3 class="b-st01__title" data-field="step-title">Знакомство</h3>
        <p class="b-st01__desc" data-field="step-desc">Обсуждаем ваши цели, задачи и ожидания от проекта</p>
      </div>
      <div class="b-st01__item" data-collection-item data-reveal="up" style="--stagger:1">
        <span class="b-st01__num" data-field="step-number">02</span>
        <h3 class="b-st01__title" data-field="step-title">Анализ</h3>
        <p class="b-st01__desc" data-field="step-desc">Исследуем рынок, конкурентов и целевую аудиторию</p>
      </div>
      <div class="b-st01__item" data-collection-item data-reveal="up" style="--stagger:2">
        <span class="b-st01__num" data-field="step-number">03</span>
        <h3 class="b-st01__title" data-field="step-title">Разработка</h3>
        <p class="b-st01__desc" data-field="step-desc">Создаём дизайн и реализуем техническое решение</p>
      </div>
      <div class="b-st01__item" data-collection-item data-reveal="up" style="--stagger:3">
        <span class="b-st01__num" data-field="step-number">04</span>
        <h3 class="b-st01__title" data-field="step-title">Запуск</h3>
        <p class="b-st01__desc" data-field="step-desc">Тестируем, запускаем и обеспечиваем поддержку</p>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-st01{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-st01__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-st01__header{text-align:center;margin-bottom:4rem}
.b-st01__heading{font-family:var(--font-heading);font-size:clamp(2rem,4vw,3.5rem);color:var(--color-text);margin:0 0 1rem;letter-spacing:-0.02em;font-weight:600}
.b-st01__subtitle{font-family:var(--font-body);font-size:clamp(1rem,1.5vw,1.25rem);color:var(--color-text-muted);margin:0;max-width:560px;margin-inline:auto}
.b-st01__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;position:relative}
.b-st01__line{position:absolute;top:2rem;left:10%;right:10%;height:2px;background:var(--color-border);z-index:0}
.b-st01__item{position:relative;z-index:1;text-align:center;display:flex;flex-direction:column;align-items:center;gap:1rem}
.b-st01__num{font-family:var(--font-heading);font-size:clamp(2.5rem,4vw,4rem);font-weight:700;color:var(--color-primary);line-height:1;background:var(--color-bg);padding:0 0.5rem}
.b-st01__title{font-family:var(--font-heading);font-size:clamp(1rem,1.3vw,1.25rem);color:var(--color-text);margin:0;font-weight:600}
.b-st01__desc{font-family:var(--font-body);font-size:0.9375rem;color:var(--color-text-muted);margin:0;line-height:1.6;max-width:260px}
@media(max-width:768px){.b-st01__grid{grid-template-columns:1fr;gap:2.5rem}.b-st01__line{display:none}.b-st01__header{margin-bottom:2.5rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-st01{background:var(--color-primary)}.b-st01__heading{color:var(--color-text-on-primary)}.b-st01__subtitle{color:color-mix(in srgb,var(--color-text-on-primary) 60%,transparent)}.b-st01__num{color:var(--color-accent);background:var(--color-primary)}.b-st01__title{color:var(--color-text-on-primary)}.b-st01__desc{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-st01__line{background:color-mix(in srgb,var(--color-text-on-primary) 15%,transparent)}` },
    { id: "accent-bg", label: "Акцентный фон", css: `.b-st01{background:var(--color-bg-alt)}.b-st01__num{background:var(--color-bg-alt)}` },
  ],
};
