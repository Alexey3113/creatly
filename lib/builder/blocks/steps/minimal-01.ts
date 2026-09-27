import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "steps-minimal-01",
  name: "Этапы — минимал с крупными номерами",
  description: "3 шага с увеличенными номерами, тонкие разделители. Максимум воздуха и типографики",
  category: "steps",
  subcategory: "minimal",
  icon: "—",
  tags: ["steps", "minimal", "oversized", "typography", "clean"],
  motionLevel: "css",
  fields: [
    { name: "steps-heading", type: "heading", hint: "заголовок секции", required: true },
    { name: "step-number", type: "text", hint: "номер шага", required: true },
    { name: "step-title", type: "heading", hint: "название шага", required: true },
    { name: "step-desc", type: "text", hint: "описание шага", required: true },
  ],
  html: `<section class="b-st08" data-block="steps" data-collection="steps">
  <div class="b-st08__inner">
    <h2 class="b-st08__heading" data-field="steps-heading" data-reveal="up">Три шага</h2>
    <div class="b-st08__list" data-collection-grid>
      <div class="b-st08__item" data-collection-item data-reveal="up" style="--stagger:0">
        <span class="b-st08__num" data-field="step-number">01</span>
        <div class="b-st08__divider"></div>
        <div class="b-st08__body">
          <h3 class="b-st08__title" data-field="step-title">Слушаем</h3>
          <p class="b-st08__desc" data-field="step-desc">Внимательно изучаем ваши потребности, погружаемся в контекст бизнеса и определяем ключевые задачи проекта</p>
        </div>
      </div>
      <div class="b-st08__item" data-collection-item data-reveal="up" style="--stagger:1">
        <span class="b-st08__num" data-field="step-number">02</span>
        <div class="b-st08__divider"></div>
        <div class="b-st08__body">
          <h3 class="b-st08__title" data-field="step-title">Создаём</h3>
          <p class="b-st08__desc" data-field="step-desc">Проектируем и разрабатываем решение, которое точно соответствует целям и превосходит ожидания</p>
        </div>
      </div>
      <div class="b-st08__item" data-collection-item data-reveal="up" style="--stagger:2">
        <span class="b-st08__num" data-field="step-number">03</span>
        <div class="b-st08__divider"></div>
        <div class="b-st08__body">
          <h3 class="b-st08__title" data-field="step-title">Развиваем</h3>
          <p class="b-st08__desc" data-field="step-desc">Запускаем проект и продолжаем совершенствовать продукт на основе реальных данных и обратной связи</p>
        </div>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-st08{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-st08__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-st08__heading{font-family:var(--font-heading);font-size:clamp(1rem,1.3vw,1.125rem);color:var(--color-text-muted);margin:0 0 4rem;text-transform:uppercase;letter-spacing:0.2em;font-weight:500}
.b-st08__list{display:flex;flex-direction:column;gap:0}
.b-st08__item{display:grid;grid-template-columns:auto 1fr 2fr;gap:3rem;align-items:start;padding:3.5rem 0}
.b-st08__item+.b-st08__item{border-top:1px solid var(--color-border)}
.b-st08__item:first-child{border-top:1px solid var(--color-border)}
.b-st08__item:last-child{border-bottom:1px solid var(--color-border)}
.b-st08__num{font-family:var(--font-heading);font-size:clamp(4rem,7vw,6.5rem);font-weight:200;color:var(--color-text);line-height:0.85;letter-spacing:-0.04em;opacity:0.15;min-width:8rem}
.b-st08__divider{width:1px;height:100%;min-height:3rem;background:var(--color-border);align-self:stretch}
.b-st08__body{display:flex;flex-direction:column;gap:1rem;padding-top:0.75rem}
.b-st08__title{font-family:var(--font-heading);font-size:clamp(1.5rem,2.5vw,2.25rem);color:var(--color-text);margin:0;font-weight:600;letter-spacing:-0.02em}
.b-st08__desc{font-family:var(--font-body);font-size:clamp(0.9375rem,1.2vw,1.0625rem);color:var(--color-text-muted);margin:0;line-height:1.7;max-width:480px}
@media(max-width:768px){.b-st08__item{grid-template-columns:1fr;gap:1rem;padding:2rem 0}.b-st08__num{font-size:3rem;min-width:auto}.b-st08__divider{width:3rem;height:1px;min-height:auto}.b-st08__heading{margin-bottom:2.5rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-st08{background:var(--color-primary)}.b-st08__heading{color:color-mix(in srgb,var(--color-text-on-primary) 50%,transparent)}.b-st08__num{color:var(--color-text-on-primary)}.b-st08__title{color:var(--color-text-on-primary)}.b-st08__desc{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}.b-st08__item,.b-st08__item:first-child,.b-st08__item:last-child{border-color:color-mix(in srgb,var(--color-text-on-primary) 12%,transparent)}.b-st08__divider{background:color-mix(in srgb,var(--color-text-on-primary) 15%,transparent)}` },
    { id: "accent-nums", label: "Акцентные номера", css: `.b-st08__num{color:var(--color-primary);opacity:0.25}` },
  ],
};
