import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "faq-accordion-01",
  name: "FAQ — аккордеон с иконками",
  description: "Классический аккордеон на details/summary с иконкой открытия/закрытия. 5 вопросов с плавной анимацией",
  category: "faq",
  subcategory: "accordion",
  icon: "▤",
  tags: ["accordion", "details", "summary", "toggle", "classic"],
  motionLevel: "css",
  fields: [
    { name: "faq-title", type: "heading", hint: "заголовок секции 3-6 слов", required: true },
    { name: "faq-subtitle", type: "text", hint: "подзаголовок 1-2 предложения", required: false },
    { name: "faq-question", type: "heading", hint: "вопрос 5-12 слов", required: true },
    { name: "faq-answer", type: "text", hint: "ответ 1-3 предложения", required: true },
  ],
  html: `<section class="b-fq01" data-block="faq" data-collection="faq">
  <div class="b-fq01__inner">
    <h2 class="b-fq01__title" data-field="faq-title" data-reveal="up">Часто задаваемые вопросы</h2>
    <p class="b-fq01__subtitle" data-field="faq-subtitle" data-reveal="fade" style="--stagger:1">Ответы на самые популярные вопросы о нашей платформе и услугах.</p>
    <div class="b-fq01__list" data-collection-grid>
      <details class="b-fq01__item" data-collection-item data-reveal="up" style="--stagger:0">
        <summary class="b-fq01__question"><span data-field="faq-question">Как начать пользоваться платформой?</span><span class="b-fq01__icon"></span></summary>
        <div class="b-fq01__answer"><p data-field="faq-answer">Зарегистрируйтесь на сайте, выберите подходящий тариф и получите доступ ко всем инструментам в течение нескольких минут.</p></div>
      </details>
      <details class="b-fq01__item" data-collection-item data-reveal="up" style="--stagger:1">
        <summary class="b-fq01__question"><span data-field="faq-question">Можно ли попробовать сервис бесплатно?</span><span class="b-fq01__icon"></span></summary>
        <div class="b-fq01__answer"><p data-field="faq-answer">Да, мы предоставляем 14-дневный пробный период с полным доступом ко всем функциям без ограничений.</p></div>
      </details>
      <details class="b-fq01__item" data-collection-item data-reveal="up" style="--stagger:2">
        <summary class="b-fq01__question"><span data-field="faq-question">Какие способы оплаты вы принимаете?</span><span class="b-fq01__icon"></span></summary>
        <div class="b-fq01__answer"><p data-field="faq-answer">Принимаем банковские карты Visa, Mastercard, МИР, а также оплату через СБП и электронные кошельки.</p></div>
      </details>
      <details class="b-fq01__item" data-collection-item data-reveal="up" style="--stagger:3">
        <summary class="b-fq01__question"><span data-field="faq-question">Есть ли техническая поддержка?</span><span class="b-fq01__icon"></span></summary>
        <div class="b-fq01__answer"><p data-field="faq-answer">Наша команда поддержки работает 24/7 через чат, email и телефон. Среднее время ответа — менее 5 минут.</p></div>
      </details>
      <details class="b-fq01__item" data-collection-item data-reveal="up" style="--stagger:4">
        <summary class="b-fq01__question"><span data-field="faq-question">Можно ли отменить подписку в любой момент?</span><span class="b-fq01__icon"></span></summary>
        <div class="b-fq01__answer"><p data-field="faq-answer">Конечно. Вы можете отменить подписку в один клик из личного кабинета без каких-либо штрафов или скрытых условий.</p></div>
      </details>
    </div>
  </div>
</section>`,
  css: `.b-fq01{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-fq01__inner{max-width:800px;margin:0 auto}
.b-fq01__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem;text-align:center;letter-spacing:-0.02em}
.b-fq01__subtitle{font-family:var(--font-body);font-size:1.0625rem;color:var(--color-text-muted);text-align:center;max-width:560px;margin:0 auto 3rem;line-height:1.6}
.b-fq01__list{display:flex;flex-direction:column;gap:0}
.b-fq01__item{border-bottom:1px solid var(--color-border);overflow:hidden}
.b-fq01__question{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1.5rem 0;cursor:pointer;list-style:none;font-family:var(--font-heading);font-size:1.125rem;color:var(--color-text);font-weight:500;transition:color .2s}
.b-fq01__question::-webkit-details-marker{display:none}
.b-fq01__question:hover{color:var(--color-primary)}
.b-fq01__icon{width:1.5rem;height:1.5rem;flex-shrink:0;position:relative;transition:transform .3s}
.b-fq01__icon::before,.b-fq01__icon::after{content:"";position:absolute;background:var(--color-text);border-radius:2px;top:50%;left:50%;transform:translate(-50%,-50%)}
.b-fq01__icon::before{width:1rem;height:2px}
.b-fq01__icon::after{width:2px;height:1rem;transition:transform .3s}
.b-fq01__item[open] .b-fq01__icon::after{transform:translate(-50%,-50%) rotate(90deg);opacity:0}
.b-fq01__answer{padding:0 0 1.5rem;font-family:var(--font-body);font-size:.9375rem;color:var(--color-text-muted);line-height:1.7}
.b-fq01__answer p{margin:0}
@media(max-width:768px){.b-fq01{padding:3rem 1.25rem}.b-fq01__question{font-size:1rem;padding:1.25rem 0}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-fq01{background:var(--color-primary)}.b-fq01__title{color:var(--color-text-on-primary)}.b-fq01__subtitle{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-fq01__question{color:var(--color-text-on-primary)}.b-fq01__icon::before,.b-fq01__icon::after{background:var(--color-text-on-primary)}.b-fq01__answer{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}.b-fq01__item{border-color:color-mix(in srgb,var(--color-text-on-primary) 15%,transparent)}` },
    { id: "surface", label: "На подложке", css: `.b-fq01{background:var(--color-bg-alt)}.b-fq01__question:hover{color:var(--color-accent)}` },
  ],
};
