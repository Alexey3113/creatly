import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "faq-cards-01",
  name: "FAQ — карточки 2×2",
  description: "Вопросы и ответы на карточках в сетке 2×2. Каждая карточка с иконкой, вопросом и ответом",
  category: "faq",
  subcategory: "cards",
  icon: "⊞",
  tags: ["cards", "grid", "2x2", "icons", "visual"],
  motionLevel: "css",
  fields: [
    { name: "faq-title", type: "heading", hint: "заголовок секции 3-6 слов", required: true },
    { name: "faq-subtitle", type: "text", hint: "подзаголовок 1-2 предложения", required: false },
    { name: "faq-icon", type: "icon", hint: "эмодзи-иконка вопроса", required: false },
    { name: "faq-question", type: "heading", hint: "вопрос 4-8 слов", required: true },
    { name: "faq-answer", type: "text", hint: "ответ 1-3 предложения", required: true },
  ],
  html: `<section class="b-fq05" data-block="faq" data-collection="faq">
  <div class="b-fq05__inner">
    <div class="b-fq05__header" data-reveal="up">
      <h2 class="b-fq05__title" data-field="faq-title">Популярные вопросы</h2>
      <p class="b-fq05__subtitle" data-field="faq-subtitle">Быстрые ответы на то, что интересует чаще всего.</p>
    </div>
    <div class="b-fq05__grid" data-collection-grid>
      <div class="b-fq05__card" data-collection-item data-reveal="scale" style="--stagger:0">
        <span class="b-fq05__icon" data-field="faq-icon">💳</span>
        <h3 class="b-fq05__question" data-field="faq-question">Как оформить возврат?</h3>
        <p class="b-fq05__answer" data-field="faq-answer">Подайте заявку на возврат в личном кабинете в течение 14 дней. Деньги вернутся на карту за 3-5 рабочих дней.</p>
      </div>
      <div class="b-fq05__card" data-collection-item data-reveal="scale" style="--stagger:1">
        <span class="b-fq05__icon" data-field="faq-icon">🔄</span>
        <h3 class="b-fq05__question" data-field="faq-question">Как сменить тариф?</h3>
        <p class="b-fq05__answer" data-field="faq-answer">Перейдите в настройки аккаунта и выберите новый тариф. Перерасчёт произойдёт автоматически в ту же секунду.</p>
      </div>
      <div class="b-fq05__card" data-collection-item data-reveal="scale" style="--stagger:2">
        <span class="b-fq05__icon" data-field="faq-icon">👥</span>
        <h3 class="b-fq05__question" data-field="faq-question">Как пригласить коллег?</h3>
        <p class="b-fq05__answer" data-field="faq-answer">Отправьте инвайт-ссылку из раздела «Команда». Коллеги получат доступ мгновенно после регистрации.</p>
      </div>
      <div class="b-fq05__card" data-collection-item data-reveal="scale" style="--stagger:3">
        <span class="b-fq05__icon" data-field="faq-icon">🔐</span>
        <h3 class="b-fq05__question" data-field="faq-question">Забыл пароль, что делать?</h3>
        <p class="b-fq05__answer" data-field="faq-answer">Нажмите «Забыли пароль?» на странице входа. Ссылка для сброса придёт на вашу почту в течение минуты.</p>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-fq05{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-fq05__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-fq05__header{text-align:center;margin-bottom:3.5rem}
.b-fq05__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem;letter-spacing:-0.02em}
.b-fq05__subtitle{font-family:var(--font-body);font-size:1.0625rem;color:var(--color-text-muted);max-width:560px;margin:0 auto;line-height:1.6}
.b-fq05__grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem}
.b-fq05__card{background:var(--color-surface);border-radius:var(--radius-lg);padding:2.25rem;transition:transform .3s,box-shadow .3s;border:1px solid var(--color-border)}
.b-fq05__card:hover{transform:translateY(-3px);box-shadow:0 12px 32px color-mix(in srgb,var(--color-text) 6%,transparent)}
.b-fq05__icon{font-size:1.75rem;display:block;margin-bottom:1rem}
.b-fq05__question{font-family:var(--font-heading);font-size:1.125rem;color:var(--color-text);margin:0 0 .625rem;font-weight:600;line-height:1.35}
.b-fq05__answer{font-family:var(--font-body);font-size:.9375rem;color:var(--color-text-muted);margin:0;line-height:1.7}
@media(max-width:768px){.b-fq05{padding:3rem 1.25rem}.b-fq05__grid{grid-template-columns:1fr;gap:1rem}.b-fq05__card{padding:1.75rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-fq05{background:var(--color-primary)}.b-fq05__title{color:var(--color-text-on-primary)}.b-fq05__subtitle{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-fq05__card{background:color-mix(in srgb,var(--color-text-on-primary) 6%,transparent);border-color:color-mix(in srgb,var(--color-text-on-primary) 10%,transparent)}.b-fq05__question{color:var(--color-text-on-primary)}.b-fq05__answer{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}` },
    { id: "bordered", label: "С акцентом", css: `.b-fq05__card{border-color:transparent;border-top:3px solid var(--color-accent);border-radius:var(--radius-md)}` },
  ],
};
