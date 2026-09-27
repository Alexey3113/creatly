import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "faq-accordion-02",
  name: "FAQ — нумерованный аккордеон",
  description: "Аккордеон с нумерацией вопросов (01, 02...) и акцентной линией слева. Премиальный строгий стиль",
  category: "faq",
  subcategory: "accordion",
  icon: "▥",
  tags: ["accordion", "numbered", "line", "strict", "premium"],
  motionLevel: "css",
  fields: [
    { name: "faq-title", type: "heading", hint: "заголовок секции 3-6 слов", required: true },
    { name: "faq-subtitle", type: "text", hint: "подзаголовок 1-2 предложения", required: false },
    { name: "faq-question", type: "heading", hint: "вопрос 5-12 слов", required: true },
    { name: "faq-answer", type: "text", hint: "ответ 1-3 предложения", required: true },
  ],
  html: `<section class="b-fq02" data-block="faq" data-collection="faq">
  <div class="b-fq02__inner">
    <h2 class="b-fq02__title" data-field="faq-title" data-reveal="up">Вопросы и ответы</h2>
    <p class="b-fq02__subtitle" data-field="faq-subtitle" data-reveal="fade" style="--stagger:1">Всё, что нужно знать перед началом работы с нами.</p>
    <div class="b-fq02__list" data-collection-grid>
      <details class="b-fq02__item" data-collection-item data-reveal="up" style="--stagger:0">
        <summary class="b-fq02__question"><span class="b-fq02__num">01</span><span data-field="faq-question">Сколько времени занимает интеграция?</span></summary>
        <div class="b-fq02__answer"><p data-field="faq-answer">Базовая интеграция занимает от 2 до 5 рабочих дней. Мы предоставляем подробную документацию и персонального менеджера на каждом этапе.</p></div>
      </details>
      <details class="b-fq02__item" data-collection-item data-reveal="up" style="--stagger:1">
        <summary class="b-fq02__question"><span class="b-fq02__num">02</span><span data-field="faq-question">Какие гарантии безопасности данных вы предоставляете?</span></summary>
        <div class="b-fq02__answer"><p data-field="faq-answer">Мы сертифицированы по ISO 27001 и SOC 2 Type II. Все данные хранятся в зашифрованном виде на серверах в России.</p></div>
      </details>
      <details class="b-fq02__item" data-collection-item data-reveal="up" style="--stagger:2">
        <summary class="b-fq02__question"><span class="b-fq02__num">03</span><span data-field="faq-question">Есть ли ограничения по количеству пользователей?</span></summary>
        <div class="b-fq02__answer"><p data-field="faq-answer">Нет. Все тарифы включают неограниченное количество пользователей. Вы платите только за объём используемых ресурсов.</p></div>
      </details>
      <details class="b-fq02__item" data-collection-item data-reveal="up" style="--stagger:3">
        <summary class="b-fq02__question"><span class="b-fq02__num">04</span><span data-field="faq-question">Предоставляете ли вы API для разработчиков?</span></summary>
        <div class="b-fq02__answer"><p data-field="faq-answer">Да, у нас есть REST API и GraphQL с полной документацией, примерами на 8 языках и песочницей для тестирования.</p></div>
      </details>
      <details class="b-fq02__item" data-collection-item data-reveal="up" style="--stagger:4">
        <summary class="b-fq02__question"><span class="b-fq02__num">05</span><span data-field="faq-question">Как работает миграция с другой платформы?</span></summary>
        <div class="b-fq02__answer"><p data-field="faq-answer">Наша команда возьмёт на себя весь процесс миграции бесплатно. Мы поддерживаем импорт данных из более чем 50 популярных систем.</p></div>
      </details>
      <details class="b-fq02__item" data-collection-item data-reveal="up" style="--stagger:5">
        <summary class="b-fq02__question"><span class="b-fq02__num">06</span><span data-field="faq-question">Какой минимальный срок договора?</span></summary>
        <div class="b-fq02__answer"><p data-field="faq-answer">Минимальный срок — 1 месяц. Долгосрочные контракты дают скидку до 40%, но мы не навязываем обязательства.</p></div>
      </details>
    </div>
  </div>
</section>`,
  css: `.b-fq02{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-fq02__inner{max-width:800px;margin:0 auto}
.b-fq02__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem;letter-spacing:-0.02em}
.b-fq02__subtitle{font-family:var(--font-body);font-size:1.0625rem;color:var(--color-text-muted);margin:0 0 3rem;line-height:1.6}
.b-fq02__list{display:flex;flex-direction:column;gap:0}
.b-fq02__item{border-left:3px solid var(--color-border);padding-left:1.5rem;margin-bottom:0;transition:border-color .3s}
.b-fq02__item[open]{border-left-color:var(--color-accent)}
.b-fq02__question{display:flex;align-items:center;gap:1rem;padding:1.4rem 0;cursor:pointer;list-style:none;font-family:var(--font-heading);font-size:1.125rem;color:var(--color-text);font-weight:600;transition:color .2s}
.b-fq02__question::after{content:"+";margin-left:auto;font-size:1.5rem;font-weight:300;color:var(--color-text-muted);transition:transform .35s cubic-bezier(.16,1,.3,1),color .2s;line-height:1}
.b-fq02__item[open] .b-fq02__question::after{transform:rotate(45deg);color:var(--color-accent)}
.b-fq02__question::-webkit-details-marker{display:none}
.b-fq02__question:hover{color:var(--color-accent)}
.b-fq02__num{font-family:var(--font-heading);font-size:.875rem;color:var(--color-accent);font-weight:600;flex-shrink:0;min-width:1.75rem}
.b-fq02__answer{padding:0 0 1.25rem 2.75rem;font-family:var(--font-body);font-size:.9375rem;color:var(--color-text-muted);line-height:1.7}
.b-fq02__answer p{margin:0}
.b-fq02__item+.b-fq02__item{border-top:1px solid var(--color-border)}
@media(max-width:768px){.b-fq02{padding:3rem 1.25rem}.b-fq02__item{padding-left:1rem}.b-fq02__answer{padding-left:2.25rem}.b-fq02__question{font-size:1rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-fq02{background:var(--color-primary)}.b-fq02__title{color:var(--color-text-on-primary)}.b-fq02__subtitle{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-fq02__question{color:var(--color-text-on-primary)}.b-fq02__num{color:var(--color-accent)}.b-fq02__answer{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}.b-fq02__item{border-left-color:color-mix(in srgb,var(--color-text-on-primary) 20%,transparent)}.b-fq02__item+.b-fq02__item{border-top-color:color-mix(in srgb,var(--color-text-on-primary) 10%,transparent)}.b-fq02__item[open]{border-left-color:var(--color-accent)}` },
    { id: "accent-bg", label: "Акцентный фон", css: `.b-fq02{background:var(--color-bg-alt)}.b-fq02__item{border-left-color:var(--color-primary)}.b-fq02__item[open]{border-left-color:var(--color-accent)}` },
  ],
};
