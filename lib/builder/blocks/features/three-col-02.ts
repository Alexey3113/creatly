import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "features-three-col-02",
  name: "Фичи — 3 карточки с нумерацией",
  description: "3 карточки с номерами (01, 02, 03), тонкие бордеры, минимализм",
  category: "features",
  subcategory: "three-col",
  icon: "◆",
  tags: ["three-col", "numbers", "bordered", "minimal", "grid"],
  motionLevel: "css",
  fields: [
    { name: "features-title", type: "heading", hint: "заголовок секции 3-6 слов", required: true },
    { name: "feature-number", type: "text", hint: "номер карточки, напр. 01", required: true },
    { name: "feature-title", type: "heading", hint: "заголовок карточки 2-4 слова", required: true },
    { name: "feature-desc", type: "text", hint: "описание карточки 1-2 предложения", required: true },
  ],
  html: `<section class="b-ft02" data-block="features">
  <div class="b-ft02__inner">
    <h2 class="b-ft02__title" data-field="features-title" data-reveal="up">Наш подход к работе</h2>
    <div class="b-ft02__grid" data-collection="features" data-collection-grid>
      <div class="b-ft02__card" data-collection-item data-reveal="up" style="--stagger:0">
        <span class="b-ft02__num" data-field="feature-number">01</span>
        <h3 data-field="feature-title">Исследование</h3>
        <p data-field="feature-desc">Глубокий анализ рынка, конкурентов и целевой аудитории перед стартом проекта.</p>
      </div>
      <div class="b-ft02__card" data-collection-item data-reveal="up" style="--stagger:1">
        <span class="b-ft02__num" data-field="feature-number">02</span>
        <h3 data-field="feature-title">Стратегия</h3>
        <p data-field="feature-desc">Формируем позиционирование и коммуникационную платформу бренда на 3-5 лет.</p>
      </div>
      <div class="b-ft02__card" data-collection-item data-reveal="up" style="--stagger:2">
        <span class="b-ft02__num" data-field="feature-number">03</span>
        <h3 data-field="feature-title">Реализация</h3>
        <p data-field="feature-desc">Дизайн, разработка и запуск с непрерывным A/B-тестированием результатов.</p>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-ft02{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-ft02__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-ft02__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 3rem;letter-spacing:-0.02em;text-align:center}
.b-ft02__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.b-ft02__card{border:1px solid var(--color-border);border-radius:var(--radius-md);padding:2.5rem 2rem;transition:border-color .3s}
.b-ft02__card:hover{border-color:var(--color-accent)}
.b-ft02__num{font-family:var(--font-heading);font-size:2.5rem;color:var(--color-accent);font-weight:700;display:block;margin-bottom:1rem;line-height:1}
.b-ft02__card h3{font-family:var(--font-heading);font-size:1.25rem;color:var(--color-text);margin:0 0 .5rem}
.b-ft02__card p{font-family:var(--font-body);font-size:.9375rem;color:var(--color-text-muted);margin:0;line-height:1.6}
@media(max-width:768px){.b-ft02__grid{grid-template-columns:1fr;gap:1.25rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-ft02{background:var(--color-primary)}.b-ft02__title{color:var(--color-text-on-primary)}.b-ft02__card{border-color:color-mix(in srgb,var(--color-text-on-primary) 15%,transparent)}.b-ft02__card h3{color:var(--color-text-on-primary)}.b-ft02__card p{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}` },
    { id: "accent", label: "Акцентный", css: `.b-ft02__num{color:var(--color-text)}.b-ft02__card{background:var(--color-surface);border:none}` },
  ],
};
