import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "steps-split-01",
  name: "Этапы — сплит: текст + список",
  description: "Заголовок «Как мы работаем» слева, 4 шага в виде нумерованного списка справа",
  category: "steps",
  subcategory: "split",
  icon: "◫",
  tags: ["steps", "split", "how-we-work", "list", "two-column"],
  motionLevel: "css",
  fields: [
    { name: "steps-heading", type: "heading", hint: "заголовок секции", required: true },
    { name: "steps-subtitle", type: "text", hint: "описание подхода", required: false },
    { name: "step-number", type: "text", hint: "номер шага", required: true },
    { name: "step-title", type: "heading", hint: "название шага", required: true },
    { name: "step-desc", type: "text", hint: "описание шага", required: true },
  ],
  html: `<section class="b-st06" data-block="steps" data-collection="steps">
  <div class="b-st06__inner">
    <div class="b-st06__left" data-reveal="up">
      <h2 class="b-st06__heading" data-field="steps-heading">Как мы работаем</h2>
      <p class="b-st06__subtitle" data-field="steps-subtitle">Отлаженный процесс, проверенный десятками проектов. Каждый этап чётко определён и прозрачен для клиента</p>
    </div>
    <div class="b-st06__right" data-collection-grid>
      <div class="b-st06__step" data-collection-item data-reveal="up" style="--stagger:0">
        <span class="b-st06__num" data-field="step-number">01</span>
        <div class="b-st06__text">
          <h3 class="b-st06__title" data-field="step-title">Диагностика</h3>
          <p class="b-st06__desc" data-field="step-desc">Анализируем текущее состояние, определяем точки роста и формируем стратегию</p>
        </div>
      </div>
      <div class="b-st06__step" data-collection-item data-reveal="up" style="--stagger:1">
        <span class="b-st06__num" data-field="step-number">02</span>
        <div class="b-st06__text">
          <h3 class="b-st06__title" data-field="step-title">Планирование</h3>
          <p class="b-st06__desc" data-field="step-desc">Составляем дорожную карту, распределяем ресурсы и определяем ключевые метрики</p>
        </div>
      </div>
      <div class="b-st06__step" data-collection-item data-reveal="up" style="--stagger:2">
        <span class="b-st06__num" data-field="step-number">03</span>
        <div class="b-st06__text">
          <h3 class="b-st06__title" data-field="step-title">Реализация</h3>
          <p class="b-st06__desc" data-field="step-desc">Работаем спринтами с регулярными демо и корректировкой курса по результатам</p>
        </div>
      </div>
      <div class="b-st06__step" data-collection-item data-reveal="up" style="--stagger:3">
        <span class="b-st06__num" data-field="step-number">04</span>
        <div class="b-st06__text">
          <h3 class="b-st06__title" data-field="step-title">Поддержка</h3>
          <p class="b-st06__desc" data-field="step-desc">Обеспечиваем стабильную работу, мониторинг и непрерывное улучшение продукта</p>
        </div>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-st06{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-st06__inner{max-width:var(--container-width,1400px);margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:start}
.b-st06__left{position:sticky;top:6rem}
.b-st06__heading{font-family:var(--font-heading);font-size:clamp(2rem,4vw,3.5rem);color:var(--color-text);margin:0 0 1.5rem;letter-spacing:-0.02em;font-weight:600}
.b-st06__subtitle{font-family:var(--font-body);font-size:clamp(1rem,1.3vw,1.125rem);color:var(--color-text-muted);margin:0;line-height:1.7;max-width:420px}
.b-st06__right{display:flex;flex-direction:column;gap:0}
.b-st06__step{display:flex;gap:1.5rem;padding:2rem 0;border-bottom:1px solid var(--color-border);align-items:flex-start}
.b-st06__step:first-child{border-top:1px solid var(--color-border)}
.b-st06__num{font-family:var(--font-heading);font-size:clamp(1.5rem,2vw,2rem);font-weight:700;color:var(--color-primary);line-height:1;min-width:3rem;padding-top:0.125rem}
.b-st06__text{flex:1}
.b-st06__title{font-family:var(--font-heading);font-size:clamp(1.0625rem,1.3vw,1.25rem);color:var(--color-text);margin:0 0 0.5rem;font-weight:600}
.b-st06__desc{font-family:var(--font-body);font-size:0.9375rem;color:var(--color-text-muted);margin:0;line-height:1.6}
@media(max-width:768px){.b-st06__inner{grid-template-columns:1fr;gap:2.5rem}.b-st06__left{position:static}.b-st06__step{gap:1rem;padding:1.5rem 0}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-st06{background:var(--color-primary)}.b-st06__heading{color:var(--color-text-on-primary)}.b-st06__subtitle{color:color-mix(in srgb,var(--color-text-on-primary) 60%,transparent)}.b-st06__num{color:var(--color-accent)}.b-st06__title{color:var(--color-text-on-primary)}.b-st06__desc{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-st06__step{border-color:color-mix(in srgb,var(--color-text-on-primary) 12%,transparent)}` },
    { id: "surface", label: "На подложке", css: `.b-st06{background:var(--color-surface)}` },
  ],
};
