import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "faq-two-col-02",
  name: "FAQ — сплит: текст + аккордеон",
  description: "Разделённый макет: заголовок и описание слева, аккордеон с вопросами справа",
  category: "faq",
  subcategory: "two-col",
  icon: "◫",
  tags: ["split", "accordion", "two-col", "asymmetric", "editorial"],
  motionLevel: "css",
  fields: [
    { name: "faq-title", type: "heading", hint: "заголовок секции 3-6 слов", required: true },
    { name: "faq-description", type: "text", hint: "описание секции 2-3 предложения", required: false },
    { name: "faq-cta", type: "link", hint: "ссылка на страницу поддержки", required: false },
    { name: "faq-question", type: "heading", hint: "вопрос 5-12 слов", required: true },
    { name: "faq-answer", type: "text", hint: "ответ 1-3 предложения", required: true },
  ],
  html: `<section class="b-fq04" data-block="faq" data-collection="faq">
  <div class="b-fq04__inner">
    <div class="b-fq04__left" data-reveal="up">
      <h2 class="b-fq04__title" data-field="faq-title">Остались вопросы?</h2>
      <p class="b-fq04__desc" data-field="faq-description">Мы собрали ответы на самые частые вопросы. Если не нашли нужного — свяжитесь с нашей командой поддержки.</p>
      <a class="b-fq04__cta" data-field="faq-cta" href="#">Написать в поддержку →</a>
    </div>
    <div class="b-fq04__right" data-collection-grid>
      <details class="b-fq04__item" data-collection-item data-reveal="up" style="--stagger:0">
        <summary class="b-fq04__question"><span data-field="faq-question">Как долго действует лицензия?</span><svg class="b-fq04__chevron" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></summary>
        <div class="b-fq04__answer"><p data-field="faq-answer">Лицензия действует весь срок подписки. При продлении все настройки и данные сохраняются автоматически.</p></div>
      </details>
      <details class="b-fq04__item" data-collection-item data-reveal="up" style="--stagger:1">
        <summary class="b-fq04__question"><span data-field="faq-question">Можно ли использовать на нескольких устройствах?</span><svg class="b-fq04__chevron" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></summary>
        <div class="b-fq04__answer"><p data-field="faq-answer">Да, одна подписка работает на неограниченном количестве устройств с синхронизацией в реальном времени.</p></div>
      </details>
      <details class="b-fq04__item" data-collection-item data-reveal="up" style="--stagger:2">
        <summary class="b-fq04__question"><span data-field="faq-question">Доступна ли white-label версия?</span><svg class="b-fq04__chevron" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></summary>
        <div class="b-fq04__answer"><p data-field="faq-answer">White-label доступна на тарифе Enterprise. Мы полностью настроим платформу под ваш бренд, домен и стиль.</p></div>
      </details>
      <details class="b-fq04__item" data-collection-item data-reveal="up" style="--stagger:3">
        <summary class="b-fq04__question"><span data-field="faq-question">Предоставляете ли вы обучение для команды?</span><svg class="b-fq04__chevron" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></summary>
        <div class="b-fq04__answer"><p data-field="faq-answer">Да, мы проводим онлайн-вебинары и персональные сессии онбординга для команд от 5 человек бесплатно.</p></div>
      </details>
      <details class="b-fq04__item" data-collection-item data-reveal="up" style="--stagger:4">
        <summary class="b-fq04__question"><span data-field="faq-question">Какие интеграции поддерживаются?</span><svg class="b-fq04__chevron" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></summary>
        <div class="b-fq04__answer"><p data-field="faq-answer">Более 200 интеграций: Slack, Notion, Jira, 1С, Bitrix24, Telegram и другие. Также есть открытый API и Webhook.</p></div>
      </details>
    </div>
  </div>
</section>`,
  css: `.b-fq04{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-fq04__inner{max-width:var(--container-width,1400px);margin:0 auto;display:grid;grid-template-columns:1fr 1.4fr;gap:4rem;align-items:start}
.b-fq04__left{position:sticky;top:6rem}
.b-fq04__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 1rem;letter-spacing:-0.02em}
.b-fq04__desc{font-family:var(--font-body);font-size:1.0625rem;color:var(--color-text-muted);margin:0 0 1.5rem;line-height:1.7}
.b-fq04__cta{font-family:var(--font-body);font-size:.9375rem;color:var(--color-primary);text-decoration:none;font-weight:500;transition:color .2s}
.b-fq04__cta:hover{color:var(--color-accent)}
.b-fq04__right{display:flex;flex-direction:column}
.b-fq04__item{border-bottom:1px solid var(--color-border)}
.b-fq04__question{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1.25rem 0;cursor:pointer;list-style:none;font-family:var(--font-heading);font-size:1.0625rem;color:var(--color-text);font-weight:500;transition:color .2s}
.b-fq04__question::-webkit-details-marker{display:none}
.b-fq04__question:hover{color:var(--color-primary)}
.b-fq04__chevron{flex-shrink:0;transition:transform .3s;color:var(--color-text-muted)}
.b-fq04__item[open] .b-fq04__chevron{transform:rotate(180deg)}
.b-fq04__answer{padding:0 0 1.25rem;font-family:var(--font-body);font-size:.9375rem;color:var(--color-text-muted);line-height:1.7}
.b-fq04__answer p{margin:0}
@media(max-width:768px){.b-fq04__inner{grid-template-columns:1fr;gap:2rem}.b-fq04__left{position:static}.b-fq04{padding:3rem 1.25rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-fq04{background:var(--color-primary)}.b-fq04__title{color:var(--color-text-on-primary)}.b-fq04__desc{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-fq04__cta{color:var(--color-accent)}.b-fq04__question{color:var(--color-text-on-primary)}.b-fq04__chevron{color:color-mix(in srgb,var(--color-text-on-primary) 50%,transparent)}.b-fq04__answer{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}.b-fq04__item{border-color:color-mix(in srgb,var(--color-text-on-primary) 15%,transparent)}` },
    { id: "accent-left", label: "Акцент слева", css: `.b-fq04__left{background:var(--color-accent);padding:2.5rem;border-radius:var(--radius-lg)}.b-fq04__title{color:var(--color-text-on-accent)}.b-fq04__desc{color:color-mix(in srgb,var(--color-text-on-accent) 80%,transparent)}.b-fq04__cta{color:var(--color-text-on-accent)}` },
  ],
};
