import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "comparison-cards-01",
  name: "Карточки VS — мы vs конкурент",
  description: "Две карточки: наш продукт с акцентной стилизацией и плюсами vs конкурент с приглушённой стилизацией и минусами.",
  category: "comparison",
  subcategory: "cards",
  icon: "⚔",
  tags: ["vs", "cards", "competitor", "pros", "cons", "comparison"],
  motionLevel: "css",
  fields: [
    { name: "cm03-title", type: "heading", hint: "заголовок секции 3-6 слов", required: true },
    { name: "cm03-subtitle", type: "text", hint: "подзаголовок 1-2 предложения", required: false },
    { name: "cm03-card-title-1", type: "heading", hint: "название продукта/конкурента 1-3 слова (1)", required: true },
    { name: "cm03-card-title-2", type: "heading", hint: "название продукта/конкурента 1-3 слова (2)", required: true },
    { name: "cm03-card-label-1", type: "text", hint: "метка карточки (Наш/Другие) (1)", required: false },
    { name: "cm03-card-label-2", type: "text", hint: "метка карточки (Наш/Другие) (2)", required: false },
    { name: "cm03-card-item", type: "text", hint: "пункт списка плюсов/минусов", required: true },
    { name: "cm03-card-icon-1", type: "icon", hint: "иконка карточки (1)", required: false },
    { name: "cm03-card-icon-2", type: "icon", hint: "иконка карточки (2)", required: false },
  ],
  html: `<section class="b-cm03" data-block="comparison">
  <div class="b-cm03__inner">
    <h2 class="b-cm03__title" data-field="cm03-title" data-reveal="up">Почему мы, а не другие?</h2>
    <p class="b-cm03__subtitle" data-field="cm03-subtitle" data-reveal="fade">Объективное сравнение нашего решения с типичными альтернативами на рынке.</p>
    <div class="b-cm03__vs" data-reveal="up" style="--stagger:1">
      <span class="b-cm03__vs-badge">VS</span>
    </div>
    <div class="b-cm03__grid">
      <div class="b-cm03__card b-cm03__card--ours" data-reveal="up" style="--stagger:1">
        <span class="b-cm03__card-icon" data-field="cm03-card-icon-1">🚀</span>
        <span class="b-cm03__label" data-field="cm03-card-label-1">Наше решение</span>
        <h3 class="b-cm03__card-title" data-field="cm03-card-title-1">Creatly Platform</h3>
        <ul class="b-cm03__list" data-collection="cm03-ours-items">
          <li class="b-cm03__item b-cm03__item--pro" data-collection-item data-field="cm03-card-item">✓ Запуск за 15 минут без кода</li>
          <li class="b-cm03__item b-cm03__item--pro" data-collection-item data-field="cm03-card-item">✓ AI-генерация контента встроена</li>
          <li class="b-cm03__item b-cm03__item--pro" data-collection-item data-field="cm03-card-item">✓ Поддержка 24/7 на русском</li>
          <li class="b-cm03__item b-cm03__item--pro" data-collection-item data-field="cm03-card-item">✓ Прозрачные цены без скрытых платежей</li>
        </ul>
      </div>
      <div class="b-cm03__card b-cm03__card--theirs" data-reveal="up" style="--stagger:2">
        <span class="b-cm03__card-icon" data-field="cm03-card-icon-2">🐌</span>
        <span class="b-cm03__label" data-field="cm03-card-label-2">Типичный конкурент</span>
        <h3 class="b-cm03__card-title" data-field="cm03-card-title-2">Другие решения</h3>
        <ul class="b-cm03__list" data-collection="cm03-theirs-items">
          <li class="b-cm03__item b-cm03__item--con" data-collection-item data-field="cm03-card-item">✕ Настройка занимает дни</li>
          <li class="b-cm03__item b-cm03__item--con" data-collection-item data-field="cm03-card-item">✕ AI только за доплату</li>
          <li class="b-cm03__item b-cm03__item--con" data-collection-item data-field="cm03-card-item">✕ Поддержка только по email</li>
          <li class="b-cm03__item b-cm03__item--con" data-collection-item data-field="cm03-card-item">✕ Скрытые комиссии и лимиты</li>
        </ul>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-cm03{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-cm03__inner{max-width:var(--container-width,1400px);margin:0 auto;text-align:center}
.b-cm03__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem;letter-spacing:-0.02em}
.b-cm03__subtitle{font-family:var(--font-body);font-size:1.0625rem;color:var(--color-text-muted);max-width:560px;margin:0 auto 2rem;line-height:1.6}
.b-cm03__vs{display:flex;justify-content:center;margin-bottom:2rem}
.b-cm03__vs-badge{font-family:var(--font-heading);font-size:1.25rem;font-weight:800;color:var(--color-text-on-accent);background:var(--color-accent);width:3rem;height:3rem;border-radius:var(--radius-full);display:flex;align-items:center;justify-content:center;letter-spacing:.05em}
.b-cm03__grid{display:grid;grid-template-columns:1fr;gap:1.5rem}
.b-cm03__card{border-radius:var(--radius-lg);padding:2.5rem 2rem;text-align:left;position:relative;transition:transform .3s}
.b-cm03__card:hover{transform:translateY(-4px)}
.b-cm03__card--ours{background:var(--color-surface);border:2px solid var(--color-accent);box-shadow:0 0 0 4px color-mix(in srgb,var(--color-accent) 12%,transparent)}
.b-cm03__card--theirs{background:var(--color-bg-alt);border:1px solid var(--color-border);opacity:.85}
.b-cm03__card-icon{font-size:2rem;display:block;margin-bottom:.75rem}
.b-cm03__label{font-family:var(--font-body);font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--color-text-muted);display:block;margin-bottom:.35rem}
.b-cm03__card--ours .b-cm03__label{color:var(--color-accent)}
.b-cm03__card-title{font-family:var(--font-heading);font-size:1.375rem;color:var(--color-text);margin:0 0 1.25rem;letter-spacing:-0.01em}
.b-cm03__list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.75rem}
.b-cm03__item{font-family:var(--font-body);font-size:.9375rem;line-height:1.5}
.b-cm03__item--pro{color:var(--color-text)}
.b-cm03__item--con{color:var(--color-text-muted)}
@media(min-width:768px){.b-cm03__grid{grid-template-columns:repeat(2,1fr);gap:2rem}.b-cm03__card{padding:2.75rem 2.25rem}}
@media(min-width:1024px){.b-cm03__card{padding:3rem 2.5rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-cm03{background:var(--color-primary)}.b-cm03__title{color:var(--color-text-on-primary)}.b-cm03__subtitle{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-cm03__card--ours{background:color-mix(in srgb,var(--color-text-on-primary) 8%,transparent);border-color:var(--color-accent)}.b-cm03__card--theirs{background:color-mix(in srgb,var(--color-text-on-primary) 4%,transparent);border-color:color-mix(in srgb,var(--color-text-on-primary) 12%,transparent)}.b-cm03__card-title{color:var(--color-text-on-primary)}.b-cm03__item--pro{color:var(--color-text-on-primary)}.b-cm03__item--con{color:color-mix(in srgb,var(--color-text-on-primary) 55%,transparent)}.b-cm03__label{color:color-mix(in srgb,var(--color-text-on-primary) 55%,transparent)}.b-cm03__card--ours .b-cm03__label{color:var(--color-accent)}` },
    { id: "primary-ours", label: "Акцент primary", css: `.b-cm03__card--ours{border-color:var(--color-primary);box-shadow:0 0 0 4px color-mix(in srgb,var(--color-primary) 12%,transparent)}.b-cm03__card--ours .b-cm03__label{color:var(--color-primary)}` },
  ],
};
