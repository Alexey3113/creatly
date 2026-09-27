import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "steps-icons-01",
  name: "Этапы — горизонтальные с иконками и стрелками",
  description: "5 шагов горизонтально с иконками и стрелками-разделителями между ними",
  category: "steps",
  subcategory: "icons",
  icon: "→",
  tags: ["steps", "icons", "arrows", "horizontal", "flow"],
  motionLevel: "css",
  fields: [
    { name: "steps-heading", type: "heading", hint: "заголовок секции", required: true },
    { name: "steps-subtitle", type: "text", hint: "подзаголовок секции", required: false },
    { name: "step-icon", type: "icon", hint: "иконка шага", required: true },
    { name: "step-title", type: "heading", hint: "название шага", required: true },
    { name: "step-desc", type: "text", hint: "короткое описание", required: false },
  ],
  html: `<section class="b-st07" data-block="steps" data-collection="steps">
  <div class="b-st07__inner">
    <div class="b-st07__header" data-reveal="up">
      <h2 class="b-st07__heading" data-field="steps-heading">Наш подход</h2>
      <p class="b-st07__subtitle" data-field="steps-subtitle">Пять этапов создания цифрового продукта</p>
    </div>
    <div class="b-st07__flow" data-collection-grid>
      <div class="b-st07__step" data-collection-item data-reveal="scale" style="--stagger:0">
        <div class="b-st07__icon" data-field="step-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"/></svg>
        </div>
        <h3 class="b-st07__title" data-field="step-title">Исследование</h3>
        <p class="b-st07__desc" data-field="step-desc">Анализ рынка и аудитории</p>
      </div>
      <div class="b-st07__arrow">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
      <div class="b-st07__step" data-collection-item data-reveal="scale" style="--stagger:1">
        <div class="b-st07__icon" data-field="step-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
        </div>
        <h3 class="b-st07__title" data-field="step-title">Концепция</h3>
        <p class="b-st07__desc" data-field="step-desc">Стратегия и идея</p>
      </div>
      <div class="b-st07__arrow">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
      <div class="b-st07__step" data-collection-item data-reveal="scale" style="--stagger:2">
        <div class="b-st07__icon" data-field="step-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
        </div>
        <h3 class="b-st07__title" data-field="step-title">Дизайн</h3>
        <p class="b-st07__desc" data-field="step-desc">UI/UX и прототипы</p>
      </div>
      <div class="b-st07__arrow">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
      <div class="b-st07__step" data-collection-item data-reveal="scale" style="--stagger:3">
        <div class="b-st07__icon" data-field="step-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        </div>
        <h3 class="b-st07__title" data-field="step-title">Код</h3>
        <p class="b-st07__desc" data-field="step-desc">Фронтенд и бэкенд</p>
      </div>
      <div class="b-st07__arrow">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
      <div class="b-st07__step" data-collection-item data-reveal="scale" style="--stagger:4">
        <div class="b-st07__icon" data-field="step-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
        <h3 class="b-st07__title" data-field="step-title">Запуск</h3>
        <p class="b-st07__desc" data-field="step-desc">Деплой и поддержка</p>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-st07{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-st07__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-st07__header{text-align:center;margin-bottom:4rem}
.b-st07__heading{font-family:var(--font-heading);font-size:clamp(2rem,4vw,3.5rem);color:var(--color-text);margin:0 0 1rem;letter-spacing:-0.02em;font-weight:600}
.b-st07__subtitle{font-family:var(--font-body);font-size:clamp(1rem,1.5vw,1.25rem);color:var(--color-text-muted);margin:0;max-width:480px;margin-inline:auto}
.b-st07__flow{display:flex;align-items:flex-start;justify-content:center;gap:0}
.b-st07__step{display:flex;flex-direction:column;align-items:center;gap:1rem;text-align:center;flex:1;max-width:200px}
.b-st07__icon{width:4.5rem;height:4.5rem;border-radius:var(--radius-full);background:color-mix(in srgb,var(--color-primary) 10%,transparent);display:flex;align-items:center;justify-content:center;color:var(--color-primary);transition:background 0.3s ease,transform 0.3s ease}
.b-st07__step:hover .b-st07__icon{background:var(--color-primary);color:var(--color-text-on-primary);transform:scale(1.1)}
.b-st07__arrow{display:flex;align-items:center;color:var(--color-border);padding-top:1.25rem;flex-shrink:0;margin:0 0.25rem}
.b-st07__title{font-family:var(--font-heading);font-size:clamp(0.9375rem,1.2vw,1.0625rem);color:var(--color-text);margin:0;font-weight:600}
.b-st07__desc{font-family:var(--font-body);font-size:0.8125rem;color:var(--color-text-muted);margin:0;line-height:1.5}
@media(max-width:768px){.b-st07__flow{flex-direction:column;align-items:center;gap:1rem}.b-st07__step{max-width:100%;flex-direction:row;text-align:left;gap:1rem}.b-st07__arrow{transform:rotate(90deg);padding-top:0;margin:0}.b-st07__header{margin-bottom:2.5rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-st07{background:var(--color-primary)}.b-st07__heading{color:var(--color-text-on-primary)}.b-st07__subtitle{color:color-mix(in srgb,var(--color-text-on-primary) 60%,transparent)}.b-st07__icon{background:color-mix(in srgb,var(--color-text-on-primary) 10%,transparent);color:var(--color-accent)}.b-st07__step:hover .b-st07__icon{background:var(--color-accent);color:var(--color-text-on-accent)}.b-st07__title{color:var(--color-text-on-primary)}.b-st07__desc{color:color-mix(in srgb,var(--color-text-on-primary) 60%,transparent)}.b-st07__arrow{color:color-mix(in srgb,var(--color-text-on-primary) 20%,transparent)}` },
    { id: "filled-icons", label: "Заполненные", css: `.b-st07__icon{background:var(--color-primary);color:var(--color-text-on-primary)}.b-st07__step:hover .b-st07__icon{background:var(--color-accent);color:var(--color-text-on-accent)}` },
  ],
};
