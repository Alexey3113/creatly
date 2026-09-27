import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "faq-two-col-01",
  name: "FAQ — сетка в 2 колонки",
  description: "Вопросы и ответы в двухколоночной сетке. Жирный вопрос + ответ под ним, без аккордеона",
  category: "faq",
  subcategory: "two-col",
  icon: "▦",
  tags: ["grid", "two-col", "static", "open", "simple"],
  motionLevel: "css",
  fields: [
    { name: "faq-title", type: "heading", hint: "заголовок секции 3-6 слов", required: true },
    { name: "faq-subtitle", type: "text", hint: "подзаголовок 1-2 предложения", required: false },
    { name: "faq-question", type: "heading", hint: "вопрос 5-10 слов", required: true },
    { name: "faq-answer", type: "text", hint: "ответ 1-3 предложения", required: true },
  ],
  html: `<section class="b-fq03" data-block="faq" data-collection="faq">
  <div class="b-fq03__inner">
    <div class="b-fq03__header" data-reveal="up">
      <h2 class="b-fq03__title" data-field="faq-title">Ответы на ваши вопросы</h2>
      <p class="b-fq03__subtitle" data-field="faq-subtitle">Собрали ответы на самые частые вопросы, чтобы вам было проще разобраться.</p>
    </div>
    <div class="b-fq03__grid" data-collection-grid>
      <div class="b-fq03__item" data-collection-item data-reveal="up" style="--stagger:0">
        <h3 class="b-fq03__question" data-field="faq-question">Нужны ли технические знания для старта?</h3>
        <p class="b-fq03__answer" data-field="faq-answer">Нет, интерфейс интуитивно понятен. Наши пользователи начинают работать без обучения в первые 10 минут.</p>
      </div>
      <div class="b-fq03__item" data-collection-item data-reveal="up" style="--stagger:1">
        <h3 class="b-fq03__question" data-field="faq-question">Как часто выходят обновления?</h3>
        <p class="b-fq03__answer" data-field="faq-answer">Мы выпускаем обновления каждые две недели с новыми функциями и улучшениями на основе обратной связи.</p>
      </div>
      <div class="b-fq03__item" data-collection-item data-reveal="up" style="--stagger:2">
        <h3 class="b-fq03__question" data-field="faq-question">Поддерживаете ли вы мобильные устройства?</h3>
        <p class="b-fq03__answer" data-field="faq-answer">Да, платформа полностью адаптивна и работает на всех устройствах. Есть нативные приложения для iOS и Android.</p>
      </div>
      <div class="b-fq03__item" data-collection-item data-reveal="up" style="--stagger:3">
        <h3 class="b-fq03__question" data-field="faq-question">Можно ли экспортировать данные?</h3>
        <p class="b-fq03__answer" data-field="faq-answer">Вы можете экспортировать все данные в форматах CSV, JSON и PDF в любой момент из панели управления.</p>
      </div>
      <div class="b-fq03__item" data-collection-item data-reveal="up" style="--stagger:4">
        <h3 class="b-fq03__question" data-field="faq-question">Есть ли скидки для образовательных учреждений?</h3>
        <p class="b-fq03__answer" data-field="faq-answer">Да, мы предоставляем скидку 50% для школ, университетов и некоммерческих организаций.</p>
      </div>
      <div class="b-fq03__item" data-collection-item data-reveal="up" style="--stagger:5">
        <h3 class="b-fq03__question" data-field="faq-question">Как связаться с командой продаж?</h3>
        <p class="b-fq03__answer" data-field="faq-answer">Оставьте заявку на сайте или напишите на sales@company.ru — мы ответим в течение часа в рабочее время.</p>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-fq03{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-fq03__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-fq03__header{text-align:center;margin-bottom:3.5rem}
.b-fq03__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem;letter-spacing:-0.02em}
.b-fq03__subtitle{font-family:var(--font-body);font-size:1.0625rem;color:var(--color-text-muted);max-width:560px;margin:0 auto;line-height:1.6}
.b-fq03__grid{display:grid;grid-template-columns:repeat(2,1fr);gap:2.5rem 3rem}
.b-fq03__item{padding-top:1.5rem;border-top:1px solid var(--color-border)}
.b-fq03__question{font-family:var(--font-heading);font-size:1.125rem;color:var(--color-text);margin:0 0 .625rem;font-weight:600;line-height:1.35}
.b-fq03__answer{font-family:var(--font-body);font-size:.9375rem;color:var(--color-text-muted);margin:0;line-height:1.7}
@media(max-width:768px){.b-fq03{padding:3rem 1.25rem}.b-fq03__grid{grid-template-columns:1fr;gap:1.5rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-fq03{background:var(--color-primary)}.b-fq03__title{color:var(--color-text-on-primary)}.b-fq03__subtitle{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-fq03__question{color:var(--color-text-on-primary)}.b-fq03__answer{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}.b-fq03__item{border-top-color:color-mix(in srgb,var(--color-text-on-primary) 15%,transparent)}` },
    { id: "surface", label: "На подложке", css: `.b-fq03{background:var(--color-surface)}.b-fq03__item{border-top-color:var(--color-border);padding:1.5rem;border:1px solid var(--color-border);border-radius:var(--radius-md)}` },
  ],
};
