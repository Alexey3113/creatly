import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "steps-timeline-01",
  name: "Этапы — вертикальный таймлайн зигзаг",
  description: "Вертикальный таймлайн с точками и линией, контент чередуется слева и справа",
  category: "steps",
  subcategory: "timeline",
  icon: "⋮",
  tags: ["steps", "timeline", "alternating", "vertical", "zigzag"],
  motionLevel: "css",
  fields: [
    { name: "steps-heading", type: "heading", hint: "заголовок секции", required: true },
    { name: "steps-subtitle", type: "text", hint: "подзаголовок секции", required: false },
    { name: "step-title", type: "heading", hint: "название шага", required: true },
    { name: "step-desc", type: "text", hint: "описание шага", required: true },
  ],
  html: `<section class="b-st05" data-block="steps" data-collection="steps">
  <div class="b-st05__inner">
    <div class="b-st05__header" data-reveal="up">
      <h2 class="b-st05__heading" data-field="steps-heading">История проекта</h2>
      <p class="b-st05__subtitle" data-field="steps-subtitle">Ключевые этапы на пути к цели</p>
    </div>
    <div class="b-st05__timeline" data-collection-grid>
      <div class="b-st05__line"></div>
      <div class="b-st05__item b-st05__item--left" data-collection-item data-reveal="clip" style="--stagger:0">
        <div class="b-st05__content">
          <h3 class="b-st05__title" data-field="step-title">Погружение в контекст</h3>
          <p class="b-st05__desc" data-field="step-desc">Изучаем бизнес, рынок и аудиторию. Проводим серию интервью и формируем карту пользовательских сценариев</p>
        </div>
        <div class="b-st05__dot"></div>
      </div>
      <div class="b-st05__item b-st05__item--right" data-collection-item data-reveal="clip" style="--stagger:1">
        <div class="b-st05__dot"></div>
        <div class="b-st05__content">
          <h3 class="b-st05__title" data-field="step-title">Концепция и архитектура</h3>
          <p class="b-st05__desc" data-field="step-desc">Проектируем информационную архитектуру и создаём визуальную концепцию на основе собранных данных</p>
        </div>
      </div>
      <div class="b-st05__item b-st05__item--left" data-collection-item data-reveal="clip" style="--stagger:2">
        <div class="b-st05__content">
          <h3 class="b-st05__title" data-field="step-title">Детальный дизайн</h3>
          <p class="b-st05__desc" data-field="step-desc">Прорабатываем каждый экран, каждый элемент интерфейса с вниманием к типографике и микровзаимодействиям</p>
        </div>
        <div class="b-st05__dot"></div>
      </div>
      <div class="b-st05__item b-st05__item--right" data-collection-item data-reveal="clip" style="--stagger:3">
        <div class="b-st05__dot"></div>
        <div class="b-st05__content">
          <h3 class="b-st05__title" data-field="step-title">Реализация и развитие</h3>
          <p class="b-st05__desc" data-field="step-desc">Разрабатываем, тестируем, запускаем и продолжаем развивать продукт на основе обратной связи</p>
        </div>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-st05{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-st05__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-st05__header{text-align:center;margin-bottom:5rem}
.b-st05__heading{font-family:var(--font-heading);font-size:clamp(2rem,4vw,3.5rem);color:var(--color-text);margin:0 0 1rem;letter-spacing:-0.02em;font-weight:600}
.b-st05__subtitle{font-family:var(--font-body);font-size:clamp(1rem,1.5vw,1.25rem);color:var(--color-text-muted);margin:0;max-width:480px;margin-inline:auto}
.b-st05__timeline{position:relative;max-width:900px;margin:0 auto}
.b-st05__line{position:absolute;left:50%;top:0;bottom:0;width:2px;background:var(--color-border);transform:translateX(-50%)}
.b-st05__item{display:flex;align-items:flex-start;gap:2rem;padding:2rem 0;position:relative}
.b-st05__item--left{justify-content:flex-end;padding-right:calc(50% + 2rem)}
.b-st05__item--right{justify-content:flex-start;padding-left:calc(50% + 2rem)}
.b-st05__dot{position:absolute;left:50%;top:2.5rem;width:16px;height:16px;border-radius:var(--radius-full);background:var(--color-primary);border:4px solid var(--color-bg);transform:translateX(-50%);z-index:1;box-shadow:0 0 0 2px var(--color-primary)}
.b-st05__content{max-width:360px}
.b-st05__item--left .b-st05__content{text-align:right}
.b-st05__title{font-family:var(--font-heading);font-size:clamp(1.125rem,1.5vw,1.375rem);color:var(--color-text);margin:0 0 0.75rem;font-weight:600}
.b-st05__desc{font-family:var(--font-body);font-size:0.9375rem;color:var(--color-text-muted);margin:0;line-height:1.7}
@media(max-width:768px){.b-st05__line{left:1rem}.b-st05__item--left,.b-st05__item--right{padding-left:3rem;padding-right:0;justify-content:flex-start}.b-st05__dot{left:1rem;top:2rem}.b-st05__item--left .b-st05__content{text-align:left}.b-st05__header{margin-bottom:3rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-st05{background:var(--color-primary)}.b-st05__heading{color:var(--color-text-on-primary)}.b-st05__subtitle{color:color-mix(in srgb,var(--color-text-on-primary) 60%,transparent)}.b-st05__title{color:var(--color-text-on-primary)}.b-st05__desc{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-st05__line{background:color-mix(in srgb,var(--color-text-on-primary) 15%,transparent)}.b-st05__dot{background:var(--color-accent);border-color:var(--color-primary);box-shadow:0 0 0 2px var(--color-accent)}` },
    { id: "surface", label: "На подложке", css: `.b-st05{background:var(--color-bg-alt)}.b-st05__dot{border-color:var(--color-bg-alt)}` },
  ],
};
