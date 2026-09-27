import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "faq-minimal-01",
  name: "FAQ — минимал с разделителями",
  description: "Минималистичный список вопросов и ответов с тонкими разделителями. Чистая типографика, без аккордеона",
  category: "faq",
  subcategory: "minimal",
  icon: "─",
  tags: ["minimal", "dividers", "clean", "typography", "editorial"],
  motionLevel: "css",
  fields: [
    { name: "faq-title", type: "heading", hint: "заголовок секции 3-6 слов", required: true },
    { name: "faq-question", type: "heading", hint: "вопрос 5-10 слов", required: true },
    { name: "faq-answer", type: "text", hint: "ответ 1-3 предложения", required: true },
  ],
  html: `<section class="b-fq08" data-block="faq" data-collection="faq">
  <div class="b-fq08__inner">
    <h2 class="b-fq08__title" data-field="faq-title" data-reveal="up">FAQ</h2>
    <div class="b-fq08__list" data-collection-grid>
      <div class="b-fq08__item" data-collection-item data-reveal="up" style="--stagger:0">
        <div class="b-fq08__row">
          <h3 class="b-fq08__question" data-field="faq-question">В чём уникальность вашего подхода?</h3>
          <p class="b-fq08__answer" data-field="faq-answer">Мы объединяем автоматизацию и персональный подход. Каждый клиент получает решение, адаптированное под его задачи, а не шаблонный продукт.</p>
        </div>
      </div>
      <div class="b-fq08__item" data-collection-item data-reveal="up" style="--stagger:1">
        <div class="b-fq08__row">
          <h3 class="b-fq08__question" data-field="faq-question">Работаете ли вы с малым бизнесом?</h3>
          <p class="b-fq08__answer" data-field="faq-answer">Да, у нас есть тарифы для команд от 1 человека. Мы верим, что качественные инструменты должны быть доступны всем.</p>
        </div>
      </div>
      <div class="b-fq08__item" data-collection-item data-reveal="up" style="--stagger:2">
        <div class="b-fq08__row">
          <h3 class="b-fq08__question" data-field="faq-question">Есть ли партнёрская программа?</h3>
          <p class="b-fq08__answer" data-field="faq-answer">Да, наши партнёры получают 20% с каждой оплаты приведённого клиента. Выплаты ежемесячно, без минимального порога.</p>
        </div>
      </div>
      <div class="b-fq08__item" data-collection-item data-reveal="up" style="--stagger:3">
        <div class="b-fq08__row">
          <h3 class="b-fq08__question" data-field="faq-question">Какой SLA вы гарантируете?</h3>
          <p class="b-fq08__answer" data-field="faq-answer">99.9% аптайм с компенсацией при нарушении. Мониторинг 24/7, инциденты публикуются на странице статуса в реальном времени.</p>
        </div>
      </div>
      <div class="b-fq08__item" data-collection-item data-reveal="up" style="--stagger:4">
        <div class="b-fq08__row">
          <h3 class="b-fq08__question" data-field="faq-question">Где расположены ваши серверы?</h3>
          <p class="b-fq08__answer" data-field="faq-answer">Основные серверы в Москве и Франкфурте. Для корпоративных клиентов доступен выделенный кластер в любом регионе.</p>
        </div>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-fq08{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-fq08__inner{max-width:1000px;margin:0 auto}
.b-fq08__title{font-family:var(--font-heading);font-size:clamp(1.5rem,2.5vw,2rem);color:var(--color-text);margin:0 0 3rem;letter-spacing:0.1em;text-transform:uppercase;font-weight:400}
.b-fq08__list{display:flex;flex-direction:column}
.b-fq08__item{border-top:1px solid var(--color-border);padding:2rem 0}
.b-fq08__item:last-child{border-bottom:1px solid var(--color-border)}
.b-fq08__row{display:grid;grid-template-columns:1fr 1.2fr;gap:2rem;align-items:start}
.b-fq08__question{font-family:var(--font-heading);font-size:1.125rem;color:var(--color-text);margin:0;font-weight:600;line-height:1.4}
.b-fq08__answer{font-family:var(--font-body);font-size:.9375rem;color:var(--color-text-muted);margin:0;line-height:1.7}
@media(max-width:768px){.b-fq08{padding:3rem 1.25rem}.b-fq08__row{grid-template-columns:1fr;gap:.625rem}.b-fq08__item{padding:1.5rem 0}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-fq08{background:var(--color-primary)}.b-fq08__title{color:var(--color-text-on-primary)}.b-fq08__question{color:var(--color-text-on-primary)}.b-fq08__answer{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}.b-fq08__item{border-color:color-mix(in srgb,var(--color-text-on-primary) 15%,transparent)}` },
    { id: "numbered", label: "С нумерацией", css: `.b-fq08__item{counter-increment:faq}.b-fq08__list{counter-reset:faq}.b-fq08__question::before{content:counter(faq,decimal-leading-zero) ".";display:block;font-family:var(--font-heading);font-size:.75rem;color:var(--color-accent);margin-bottom:.5rem;font-weight:400;letter-spacing:.05em}` },
  ],
};
