import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "steps-numbered-02",
  name: "Этапы — вертикальный таймлайн с номерами",
  description: "3 шага вертикально: номера слева, описание справа, соединены таймлайн-линией",
  category: "steps",
  subcategory: "numbered",
  icon: "②",
  tags: ["steps", "numbered", "vertical", "timeline", "process"],
  motionLevel: "css",
  fields: [
    { name: "steps-heading", type: "heading", hint: "заголовок секции", required: true },
    { name: "steps-subtitle", type: "text", hint: "подзаголовок секции", required: false },
    { name: "step-number", type: "text", hint: "номер шага", required: true },
    { name: "step-title", type: "heading", hint: "название шага", required: true },
    { name: "step-desc", type: "text", hint: "описание шага", required: true },
  ],
  html: `<section class="b-st02" data-block="steps" data-collection="steps">
  <div class="b-st02__inner">
    <div class="b-st02__header" data-reveal="up">
      <h2 class="b-st02__heading" data-field="steps-heading">Этапы работы</h2>
      <p class="b-st02__subtitle" data-field="steps-subtitle">Каждый проект проходит три ключевых этапа</p>
    </div>
    <div class="b-st02__list" data-collection-grid>
      <div class="b-st02__timeline-line"></div>
      <div class="b-st02__item" data-collection-item data-reveal="up" style="--stagger:0">
        <div class="b-st02__left">
          <span class="b-st02__num" data-field="step-number">01</span>
          <span class="b-st02__dot"></span>
        </div>
        <div class="b-st02__right">
          <h3 class="b-st02__title" data-field="step-title">Стратегия и концепция</h3>
          <p class="b-st02__desc" data-field="step-desc">Глубокое погружение в бизнес клиента, определение целей, формирование стратегии и концептуального видения проекта</p>
        </div>
      </div>
      <div class="b-st02__item" data-collection-item data-reveal="up" style="--stagger:1">
        <div class="b-st02__left">
          <span class="b-st02__num" data-field="step-number">02</span>
          <span class="b-st02__dot"></span>
        </div>
        <div class="b-st02__right">
          <h3 class="b-st02__title" data-field="step-title">Дизайн и прототип</h3>
          <p class="b-st02__desc" data-field="step-desc">Создание визуальной концепции, детальная проработка интерфейсов и интерактивный прототип для тестирования</p>
        </div>
      </div>
      <div class="b-st02__item" data-collection-item data-reveal="up" style="--stagger:2">
        <div class="b-st02__left">
          <span class="b-st02__num" data-field="step-number">03</span>
          <span class="b-st02__dot"></span>
        </div>
        <div class="b-st02__right">
          <h3 class="b-st02__title" data-field="step-title">Реализация и запуск</h3>
          <p class="b-st02__desc" data-field="step-desc">Техническая разработка, тестирование на всех платформах и сопровождение после успешного запуска</p>
        </div>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-st02{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-st02__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-st02__header{margin-bottom:4rem}
.b-st02__heading{font-family:var(--font-heading);font-size:clamp(2rem,4vw,3.5rem);color:var(--color-text);margin:0 0 1rem;letter-spacing:-0.02em;font-weight:600}
.b-st02__subtitle{font-family:var(--font-body);font-size:clamp(1rem,1.5vw,1.25rem);color:var(--color-text-muted);margin:0;max-width:480px}
.b-st02__list{position:relative;display:flex;flex-direction:column;gap:0;max-width:800px}
.b-st02__timeline-line{position:absolute;left:3.5rem;top:0;bottom:0;width:2px;background:linear-gradient(to bottom,var(--color-accent) 0%,color-mix(in srgb,var(--color-accent) 25%,transparent) 60%,var(--color-border) 100%)}
.b-st02__item{display:flex;gap:2.5rem;padding:2.5rem 0;position:relative}
.b-st02__item+.b-st02__item{border-top:none}
.b-st02__left{display:flex;flex-direction:column;align-items:center;gap:0.75rem;min-width:7rem;position:relative;z-index:1}
.b-st02__num{font-family:var(--font-heading);font-size:clamp(2.2rem,3.4vw,3.4rem);font-weight:800;letter-spacing:-.03em;color:transparent;-webkit-text-stroke:1.5px color-mix(in srgb,var(--color-accent) 80%,transparent);line-height:1;transition:color .3s}
.b-st02__item:hover .b-st02__num{color:var(--color-accent)}
.b-st02__dot{width:14px;height:14px;border-radius:var(--radius-full);background:var(--color-accent);border:3px solid var(--color-bg);box-shadow:0 0 0 2px var(--color-accent)}
.b-st02__right{flex:1;padding-top:0.5rem}
.b-st02__title{font-family:var(--font-heading);font-size:clamp(1.125rem,1.5vw,1.5rem);color:var(--color-text);margin:0 0 0.75rem;font-weight:600}
.b-st02__desc{font-family:var(--font-body);font-size:1rem;color:var(--color-text-muted);margin:0;line-height:1.7}
@media(max-width:768px){.b-st02__timeline-line{left:1.75rem}.b-st02__left{min-width:3.5rem;gap:0.5rem}.b-st02__num{font-size:1.5rem}.b-st02__item{gap:1.5rem;padding:1.75rem 0}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "surface", label: "На подложке", css: `.b-st02{background:var(--color-surface)}.b-st02__dot{border-color:var(--color-surface)}` },
    { id: "accent-line", label: "Акцентная линия", css: `.b-st02__timeline-line{background:var(--color-accent)}.b-st02__dot{background:var(--color-accent);box-shadow:0 0 0 2px var(--color-accent)}` },
  ],
};
