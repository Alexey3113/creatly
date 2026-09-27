import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "features-list-01",
  name: "Фичи — вертикальный список с номерами",
  description: "Вертикальный список фич с горизонтальными разделителями и номерами слева",
  category: "features",
  subcategory: "list",
  icon: "◆",
  tags: ["list", "numbered", "vertical", "dividers"],
  motionLevel: "css",
  fields: [
    { name: "features-title", type: "heading", hint: "заголовок секции 3-6 слов", required: true },
    { name: "features-subtitle", type: "text", hint: "подзаголовок 1-2 предложения", required: false },
    { name: "feature-title", type: "heading", hint: "название фичи 2-5 слов", required: true },
    { name: "feature-desc", type: "text", hint: "описание фичи 1-2 предложения", required: true },
  ],
  html: `<section class="b-ft10" data-block="features">
  <div class="b-ft10__inner">
    <h2 class="b-ft10__title" data-field="features-title" data-reveal="word">Наши преимущества</h2>
    <p class="b-ft10__subtitle" data-field="features-subtitle" data-reveal="fade">Каждая деталь продумана для удобства вашей команды.</p>
    <div class="b-ft10__list" data-collection="features" data-collection-grid>
      <div class="b-ft10__item" data-collection-item data-reveal="up" style="--stagger:0">
        <span class="b-ft10__num">01</span>
        <div class="b-ft10__body">
          <h3 data-field="feature-title">Мгновенный онбординг</h3>
          <p data-field="feature-desc">Новые сотрудники начинают работать в первый день. Интерактивные подсказки и готовые чек-листы.</p>
        </div>
      </div>
      <div class="b-ft10__item" data-collection-item data-reveal="up" style="--stagger:1">
        <span class="b-ft10__num">02</span>
        <div class="b-ft10__body">
          <h3 data-field="feature-title">Гибкие процессы</h3>
          <p data-field="feature-desc">Настраивайте воркфлоу под свою методологию: Scrum, Kanban или гибрид.</p>
        </div>
      </div>
      <div class="b-ft10__item" data-collection-item data-reveal="up" style="--stagger:2">
        <span class="b-ft10__num">03</span>
        <div class="b-ft10__body">
          <h3 data-field="feature-title">Единый дашборд</h3>
          <p data-field="feature-desc">Все проекты, метрики и уведомления в одном окне. Кастомизируемые виджеты.</p>
        </div>
      </div>
      <div class="b-ft10__item" data-collection-item data-reveal="up" style="--stagger:3">
        <span class="b-ft10__num">04</span>
        <div class="b-ft10__body">
          <h3 data-field="feature-title">Поддержка 24/7</h3>
          <p data-field="feature-desc">Живой чат, база знаний и персональный менеджер на тарифе Pro.</p>
        </div>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-ft10{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-ft10__inner{max-width:900px;margin:0 auto}
.b-ft10__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem;text-align:center;letter-spacing:-0.02em}
.b-ft10__subtitle{font-family:var(--font-body);font-size:1.0625rem;color:var(--color-text-muted);text-align:center;max-width:520px;margin:0 auto 3rem;line-height:1.6}
.b-ft10__list{display:flex;flex-direction:column}
.b-ft10__item{position:relative;display:flex;gap:2.25rem;padding:2.25rem 1.25rem;border-top:1px solid var(--color-border);align-items:center;border-radius:var(--radius-md);transition:background .3s}
.b-ft10__item:hover{background:color-mix(in srgb,var(--color-accent) 5%,transparent)}
.b-ft10__item:last-child{border-bottom:1px solid var(--color-border)}
.b-ft10__num{font-family:var(--font-heading);font-size:clamp(2.4rem,4.5vw,3.6rem);line-height:1;color:transparent;-webkit-text-stroke:1.5px color-mix(in srgb,var(--color-accent) 75%,transparent);font-weight:800;letter-spacing:-.03em;flex-shrink:0;min-width:4.5rem;transition:color .3s}
.b-ft10__item:hover .b-ft10__num{color:var(--color-accent);-webkit-text-stroke-color:var(--color-accent)}
.b-ft10__body h3{font-family:var(--font-heading);font-size:1.25rem;color:var(--color-text);margin:0 0 .4rem}
.b-ft10__body p{font-family:var(--font-body);font-size:.9375rem;color:var(--color-text-muted);margin:0;line-height:1.6}
@media(max-width:768px){.b-ft10__item{gap:1.25rem;padding:1.5rem 0}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-ft10{background:var(--color-primary)}.b-ft10__title{color:var(--color-text-on-primary)}.b-ft10__subtitle{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-ft10__item{border-color:color-mix(in srgb,var(--color-text-on-primary) 15%,transparent)}.b-ft10__body h3{color:var(--color-text-on-primary)}.b-ft10__body p{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}` },
    { id: "accent", label: "Акцентный", css: `.b-ft10__num{background:var(--color-accent);color:var(--color-text-on-accent);width:2.5rem;height:2.5rem;border-radius:var(--radius-full);display:flex;align-items:center;justify-content:center;font-size:.875rem}` },
  ],
};
