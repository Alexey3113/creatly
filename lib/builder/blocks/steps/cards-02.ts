import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "steps-cards-02",
  name: "Этапы — крупные карточки с изображениями",
  description: "3 больших карточки с изображением сверху и описанием шага снизу",
  category: "steps",
  subcategory: "cards",
  icon: "▣",
  tags: ["steps", "cards", "images", "large", "visual"],
  motionLevel: "css",
  fields: [
    { name: "steps-heading", type: "heading", hint: "заголовок секции", required: true },
    { name: "steps-subtitle", type: "text", hint: "подзаголовок секции", required: false },
    { name: "step-image", type: "image", hint: "изображение шага", required: true },
    { name: "step-number", type: "text", hint: "номер шага", required: true },
    { name: "step-title", type: "heading", hint: "название шага", required: true },
    { name: "step-desc", type: "text", hint: "описание шага", required: true },
  ],
  html: `<section class="b-st04" data-block="steps" data-collection="steps">
  <div class="b-st04__inner">
    <div class="b-st04__header" data-reveal="up">
      <h2 class="b-st04__heading" data-field="steps-heading">Путь к результату</h2>
      <p class="b-st04__subtitle" data-field="steps-subtitle">Три этапа, которые превращают идею в работающий продукт</p>
    </div>
    <div class="b-st04__grid" data-collection-grid>
      <div class="b-st04__card" data-collection-item data-reveal="up" style="--stagger:0">
        <div class="b-st04__img-wrap">
          <img class="b-st04__img" data-field="step-image" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80" alt="Исследование" loading="lazy"/>
        </div>
        <div class="b-st04__body">
          <span class="b-st04__num" data-field="step-number">Шаг 01</span>
          <h3 class="b-st04__title" data-field="step-title">Исследование и аналитика</h3>
          <p class="b-st04__desc" data-field="step-desc">Проводим глубокий анализ ниши, изучаем аудиторию и формируем стратегию, которая ляжет в основу проекта</p>
        </div>
      </div>
      <div class="b-st04__card" data-collection-item data-reveal="up" style="--stagger:1">
        <div class="b-st04__img-wrap">
          <img class="b-st04__img" data-field="step-image" src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80" alt="Дизайн" loading="lazy"/>
        </div>
        <div class="b-st04__body">
          <span class="b-st04__num" data-field="step-number">Шаг 02</span>
          <h3 class="b-st04__title" data-field="step-title">Дизайн и прототипирование</h3>
          <p class="b-st04__desc" data-field="step-desc">Создаём визуальный язык бренда и интерактивные прототипы для проверки гипотез до начала разработки</p>
        </div>
      </div>
      <div class="b-st04__card" data-collection-item data-reveal="up" style="--stagger:2">
        <div class="b-st04__img-wrap">
          <img class="b-st04__img" data-field="step-image" src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80" alt="Запуск" loading="lazy"/>
        </div>
        <div class="b-st04__body">
          <span class="b-st04__num" data-field="step-number">Шаг 03</span>
          <h3 class="b-st04__title" data-field="step-title">Разработка и запуск</h3>
          <p class="b-st04__desc" data-field="step-desc">Реализуем проект с вниманием к деталям, проводим тестирование и обеспечиваем безупречный запуск</p>
        </div>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-st04{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-st04__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-st04__header{text-align:center;margin-bottom:4rem}
.b-st04__heading{font-family:var(--font-heading);font-size:clamp(2rem,4vw,3.5rem);color:var(--color-text);margin:0 0 1rem;letter-spacing:-0.02em;font-weight:600}
.b-st04__subtitle{font-family:var(--font-body);font-size:clamp(1rem,1.5vw,1.25rem);color:var(--color-text-muted);margin:0;max-width:560px;margin-inline:auto}
.b-st04__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
.b-st04__card{border-radius:var(--radius-lg);overflow:hidden;background:var(--color-surface);border:1px solid var(--color-border);transition:transform 0.3s ease,box-shadow 0.3s ease}
.b-st04__card:hover{transform:translateY(-6px);box-shadow:0 20px 60px color-mix(in srgb,var(--color-text) 10%,transparent)}
.b-st04__img-wrap{overflow:hidden;aspect-ratio:3/2}
.b-st04__img{width:100%;height:100%;object-fit:cover;transition:transform 0.5s ease}
.b-st04__card:hover .b-st04__img{transform:scale(1.05)}
.b-st04__body{padding:2rem;display:flex;flex-direction:column;gap:0.75rem}
.b-st04__num{font-family:var(--font-body);font-size:0.75rem;font-weight:600;color:var(--color-primary);text-transform:uppercase;letter-spacing:0.15em}
.b-st04__title{font-family:var(--font-heading);font-size:clamp(1.125rem,1.5vw,1.375rem);color:var(--color-text);margin:0;font-weight:600}
.b-st04__desc{font-family:var(--font-body);font-size:0.9375rem;color:var(--color-text-muted);margin:0;line-height:1.7}
@media(max-width:768px){.b-st04__grid{grid-template-columns:1fr;gap:1.5rem}.b-st04__header{margin-bottom:2.5rem}.b-st04__body{padding:1.5rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-st04{background:var(--color-primary)}.b-st04__heading{color:var(--color-text-on-primary)}.b-st04__subtitle{color:color-mix(in srgb,var(--color-text-on-primary) 60%,transparent)}.b-st04__card{background:color-mix(in srgb,var(--color-text-on-primary) 5%,transparent);border-color:color-mix(in srgb,var(--color-text-on-primary) 10%,transparent)}.b-st04__title{color:var(--color-text-on-primary)}.b-st04__desc{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-st04__num{color:var(--color-accent)}` },
    { id: "no-border", label: "Без рамок", css: `.b-st04__card{border:none;box-shadow:0 4px 24px color-mix(in srgb,var(--color-text) 6%,transparent)}` },
  ],
};
