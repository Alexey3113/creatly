import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "faq-categories-01",
  name: "FAQ — с категориями",
  description: "Кнопки-категории сверху для визуальной навигации, вопросы с ответами ниже. Стиль базы знаний",
  category: "faq",
  subcategory: "categories",
  icon: "⊡",
  tags: ["categories", "tabs", "filter", "organized", "knowledge-base"],
  motionLevel: "css",
  fields: [
    { name: "faq-title", type: "heading", hint: "заголовок секции 3-6 слов", required: true },
    { name: "faq-subtitle", type: "text", hint: "подзаголовок 1-2 предложения", required: false },
    { name: "faq-category", type: "text", hint: "название категории 1-2 слова", required: true },
    { name: "faq-category-icon", type: "icon", hint: "эмодзи-иконка категории", required: false },
    { name: "faq-question", type: "heading", hint: "вопрос 5-12 слов", required: true },
    { name: "faq-answer", type: "text", hint: "ответ 1-3 предложения", required: true },
  ],
  html: `<section class="b-fq07" data-block="faq" data-collection="faq">
  <div class="b-fq07__inner">
    <div class="b-fq07__header" data-reveal="up">
      <h2 class="b-fq07__title" data-field="faq-title">База знаний</h2>
      <p class="b-fq07__subtitle" data-field="faq-subtitle">Выберите категорию или просмотрите все вопросы ниже.</p>
    </div>
    <div class="b-fq07__cats" data-reveal="fade" style="--stagger:1" data-collection="faq-category-icon">
      <button class="b-fq07__cat b-fq07__cat--active" data-collection-item>
        <span class="b-fq07__cat-icon" data-field="faq-category-icon">🚀</span>
        <span data-field="faq-category">Начало работы</span>
      </button>
      <button class="b-fq07__cat" data-collection-item>
        <span class="b-fq07__cat-icon" data-field="faq-category-icon">💰</span>
        <span data-field="faq-category">Оплата</span>
      </button>
      <button class="b-fq07__cat" data-collection-item>
        <span class="b-fq07__cat-icon" data-field="faq-category-icon">⚙️</span>
        <span data-field="faq-category">Настройки</span>
      </button>
      <button class="b-fq07__cat" data-collection-item>
        <span class="b-fq07__cat-icon" data-field="faq-category-icon">🛡️</span>
        <span data-field="faq-category">Безопасность</span>
      </button>
    </div>
    <div class="b-fq07__list" data-collection-grid="">
      <details class="b-fq07__item" data-collection-item data-reveal="up" style="--stagger:0">
        <summary class="b-fq07__question"><span data-field="faq-question">Как создать первый проект на платформе?</span><svg class="b-fq07__arrow" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></summary>
        <div class="b-fq07__answer"><p data-field="faq-answer">После регистрации нажмите «Новый проект» на главной панели. Выберите шаблон или начните с чистого листа — настройка займёт пару минут.</p></div>
      </details>
      <details class="b-fq07__item" data-collection-item data-reveal="up" style="--stagger:1">
        <summary class="b-fq07__question"><span data-field="faq-question">Какие шаблоны доступны бесплатно?</span><svg class="b-fq07__arrow" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></summary>
        <div class="b-fq07__answer"><p data-field="faq-answer">Более 50 базовых шаблонов доступны на всех тарифах. Премиум-шаблоны с расширенными функциями доступны от тарифа Pro.</p></div>
      </details>
      <details class="b-fq07__item" data-collection-item data-reveal="up" style="--stagger:2">
        <summary class="b-fq07__question"><span data-field="faq-question">Можно ли совместно работать над проектом?</span><svg class="b-fq07__arrow" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></summary>
        <div class="b-fq07__answer"><p data-field="faq-answer">Да, пригласите участников по email или ссылке. Поддерживается совместное редактирование в реальном времени с ролями и правами доступа.</p></div>
      </details>
      <details class="b-fq07__item" data-collection-item data-reveal="up" style="--stagger:3">
        <summary class="b-fq07__question"><span data-field="faq-question">Как настроить уведомления о событиях?</span><svg class="b-fq07__arrow" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></summary>
        <div class="b-fq07__answer"><p data-field="faq-answer">Откройте Настройки → Уведомления. Настройте каналы доставки (email, push, Telegram) и типы событий для каждого проекта.</p></div>
      </details>
      <details class="b-fq07__item" data-collection-item data-reveal="up" style="--stagger:4">
        <summary class="b-fq07__question"><span data-field="faq-question">Где найти историю изменений проекта?</span><svg class="b-fq07__arrow" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></summary>
        <div class="b-fq07__answer"><p data-field="faq-answer">Вся история хранится в разделе «Версии» внутри проекта. Вы можете просматривать, сравнивать и откатывать любое изменение.</p></div>
      </details>
    </div>
  </div>
</section>`,
  css: `.b-fq07{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-fq07__inner{max-width:900px;margin:0 auto}
.b-fq07__header{text-align:center;margin-bottom:2rem}
.b-fq07__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem;letter-spacing:-0.02em}
.b-fq07__subtitle{font-family:var(--font-body);font-size:1.0625rem;color:var(--color-text-muted);max-width:500px;margin:0 auto;line-height:1.6}
.b-fq07__cats{display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap;margin-bottom:3rem}
.b-fq07__cat{display:inline-flex;align-items:center;gap:.5rem;padding:.75rem 1.25rem;border:1px solid var(--color-border);border-radius:var(--radius-full);background:var(--color-surface);font-family:var(--font-body);font-size:.875rem;color:var(--color-text);cursor:pointer;transition:all .2s;font-weight:500}
.b-fq07__cat:hover{border-color:var(--color-primary);color:var(--color-primary)}
.b-fq07__cat--active{background:var(--color-primary);color:var(--color-text-on-primary);border-color:var(--color-primary)}
.b-fq07__cat-icon{font-size:1.125rem}
.b-fq07__list{display:flex;flex-direction:column}
.b-fq07__item{border-bottom:1px solid var(--color-border)}
.b-fq07__question{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1.25rem 0;cursor:pointer;list-style:none;font-family:var(--font-heading);font-size:1.0625rem;color:var(--color-text);font-weight:500;transition:color .2s}
.b-fq07__question::-webkit-details-marker{display:none}
.b-fq07__question:hover{color:var(--color-primary)}
.b-fq07__arrow{flex-shrink:0;color:var(--color-text-muted);transition:transform .3s}
.b-fq07__item[open] .b-fq07__arrow{transform:rotate(180deg)}
.b-fq07__answer{padding:0 0 1.25rem;font-family:var(--font-body);font-size:.9375rem;color:var(--color-text-muted);line-height:1.7}
.b-fq07__answer p{margin:0}
@media(max-width:768px){.b-fq07{padding:3rem 1.25rem}.b-fq07__cats{gap:.5rem}.b-fq07__cat{padding:.625rem 1rem;font-size:.8125rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-fq07{background:var(--color-primary)}.b-fq07__title{color:var(--color-text-on-primary)}.b-fq07__subtitle{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-fq07__cat{background:color-mix(in srgb,var(--color-text-on-primary) 6%,transparent);border-color:color-mix(in srgb,var(--color-text-on-primary) 15%,transparent);color:var(--color-text-on-primary)}.b-fq07__cat--active{background:var(--color-accent);color:var(--color-text-on-accent);border-color:var(--color-accent)}.b-fq07__question{color:var(--color-text-on-primary)}.b-fq07__arrow{color:color-mix(in srgb,var(--color-text-on-primary) 50%,transparent)}.b-fq07__answer{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}.b-fq07__item{border-color:color-mix(in srgb,var(--color-text-on-primary) 15%,transparent)}` },
    { id: "pill-outline", label: "Контурные табы", css: `.b-fq07__cat{background:transparent}.b-fq07__cat--active{background:transparent;color:var(--color-primary);border-color:var(--color-primary);border-width:2px}` },
  ],
};
