import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "faq-search-01",
  name: "FAQ — с полем поиска",
  description: "Визуальное поле поиска сверху и аккордеон с вопросами под ним. Стиль справочного центра",
  category: "faq",
  subcategory: "search",
  icon: "⌕",
  tags: ["search", "accordion", "help-center", "input", "modern"],
  motionLevel: "css",
  fields: [
    { name: "faq-title", type: "heading", hint: "заголовок 3-6 слов", required: true },
    { name: "faq-search-placeholder", type: "text", hint: "плейсхолдер поля поиска", required: false },
    { name: "faq-question", type: "heading", hint: "вопрос 5-12 слов", required: true },
    { name: "faq-answer", type: "text", hint: "ответ 1-3 предложения", required: true },
  ],
  html: `<section class="b-fq06" data-block="faq" data-collection="faq">
  <div class="b-fq06__inner">
    <div class="b-fq06__hero" data-reveal="up">
      <h2 class="b-fq06__title" data-field="faq-title">Чем можем помочь?</h2>
      <div class="b-fq06__search-wrap">
        <svg class="b-fq06__search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="6" stroke="currentColor" stroke-width="1.5"/><path d="M13.5 13.5L17 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        <input class="b-fq06__search" type="text" data-field="faq-search-placeholder" placeholder="Поиск по вопросам..." />
      </div>
    </div>
    <div class="b-fq06__list" data-collection-grid>
      <details class="b-fq06__item" data-collection-item data-reveal="up" style="--stagger:0">
        <summary class="b-fq06__question"><span data-field="faq-question">Как восстановить доступ к аккаунту?</span><span class="b-fq06__toggle"></span></summary>
        <div class="b-fq06__answer"><p data-field="faq-answer">Перейдите на страницу восстановления, введите email. Если доступ к почте утерян, обратитесь в поддержку с документом, удостоверяющим личность.</p></div>
      </details>
      <details class="b-fq06__item" data-collection-item data-reveal="up" style="--stagger:1">
        <summary class="b-fq06__question"><span data-field="faq-question">Почему не приходит письмо с подтверждением?</span><span class="b-fq06__toggle"></span></summary>
        <div class="b-fq06__answer"><p data-field="faq-answer">Проверьте папку «Спам». Если письма нет — нажмите «Отправить повторно» на странице входа или смените email в настройках.</p></div>
      </details>
      <details class="b-fq06__item" data-collection-item data-reveal="up" style="--stagger:2">
        <summary class="b-fq06__question"><span data-field="faq-question">Как подключить двухфакторную аутентификацию?</span><span class="b-fq06__toggle"></span></summary>
        <div class="b-fq06__answer"><p data-field="faq-answer">Откройте Настройки → Безопасность → 2FA. Поддерживаем Google Authenticator, SMS и аппаратные ключи FIDO2.</p></div>
      </details>
      <details class="b-fq06__item" data-collection-item data-reveal="up" style="--stagger:3">
        <summary class="b-fq06__question"><span data-field="faq-question">Можно ли перенести проект между аккаунтами?</span><span class="b-fq06__toggle"></span></summary>
        <div class="b-fq06__answer"><p data-field="faq-answer">Да, используйте функцию «Передать проект» в меню проекта. Получатель должен подтвердить передачу в течение 48 часов.</p></div>
      </details>
      <details class="b-fq06__item" data-collection-item data-reveal="up" style="--stagger:4">
        <summary class="b-fq06__question"><span data-field="faq-question">Как удалить аккаунт и все данные?</span><span class="b-fq06__toggle"></span></summary>
        <div class="b-fq06__answer"><p data-field="faq-answer">Перейдите в Настройки → Аккаунт → Удаление. Данные будут удалены безвозвратно через 30 дней после подтверждения.</p></div>
      </details>
    </div>
  </div>
</section>`,
  css: `.b-fq06{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-fq06__inner{max-width:800px;margin:0 auto}
.b-fq06__hero{text-align:center;margin-bottom:3rem}
.b-fq06__title{font-family:var(--font-heading);font-size:clamp(1.75rem,4vw,3rem);color:var(--color-text);margin:0 0 1.5rem;letter-spacing:-0.02em}
.b-fq06__search-wrap{position:relative;max-width:520px;margin:0 auto}
.b-fq06__search-icon{position:absolute;left:1.25rem;top:50%;transform:translateY(-50%);color:var(--color-text-muted);pointer-events:none}
.b-fq06__search{width:100%;padding:1rem 1.25rem 1rem 3.25rem;font-family:var(--font-body);font-size:1rem;color:var(--color-text);background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-full);outline:none;transition:border-color .2s,box-shadow .2s;box-sizing:border-box}
.b-fq06__search:focus{border-color:var(--color-primary);box-shadow:0 0 0 3px color-mix(in srgb,var(--color-primary) 15%,transparent)}
.b-fq06__search::placeholder{color:var(--color-text-muted)}
.b-fq06__list{display:flex;flex-direction:column}
.b-fq06__item{border-bottom:1px solid var(--color-border)}
.b-fq06__question{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1.25rem 0;cursor:pointer;list-style:none;font-family:var(--font-heading);font-size:1.0625rem;color:var(--color-text);font-weight:500;transition:color .2s}
.b-fq06__question::-webkit-details-marker{display:none}
.b-fq06__question:hover{color:var(--color-primary)}
.b-fq06__toggle{width:1.25rem;height:1.25rem;flex-shrink:0;position:relative}
.b-fq06__toggle::before,.b-fq06__toggle::after{content:"";position:absolute;background:var(--color-text-muted);border-radius:1px;top:50%;left:50%;transform:translate(-50%,-50%)}
.b-fq06__toggle::before{width:.875rem;height:1.5px}
.b-fq06__toggle::after{width:1.5px;height:.875rem;transition:transform .3s}
.b-fq06__item[open] .b-fq06__toggle::after{transform:translate(-50%,-50%) rotate(90deg);opacity:0}
.b-fq06__answer{padding:0 0 1.25rem;font-family:var(--font-body);font-size:.9375rem;color:var(--color-text-muted);line-height:1.7}
.b-fq06__answer p{margin:0}
@media(max-width:768px){.b-fq06{padding:3rem 1.25rem}.b-fq06__search{padding:.875rem 1rem .875rem 2.75rem;font-size:.9375rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-fq06{background:var(--color-primary)}.b-fq06__title{color:var(--color-text-on-primary)}.b-fq06__search{background:color-mix(in srgb,var(--color-text-on-primary) 8%,transparent);border-color:color-mix(in srgb,var(--color-text-on-primary) 15%,transparent);color:var(--color-text-on-primary)}.b-fq06__search::placeholder{color:color-mix(in srgb,var(--color-text-on-primary) 40%,transparent)}.b-fq06__search-icon{color:color-mix(in srgb,var(--color-text-on-primary) 40%,transparent)}.b-fq06__question{color:var(--color-text-on-primary)}.b-fq06__toggle::before,.b-fq06__toggle::after{background:var(--color-text-on-primary)}.b-fq06__answer{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}.b-fq06__item{border-color:color-mix(in srgb,var(--color-text-on-primary) 15%,transparent)}` },
    { id: "hero-bg", label: "С фоном хедера", css: `.b-fq06__hero{background:var(--color-bg-alt);padding:3rem 2rem;border-radius:var(--radius-lg);margin-bottom:2rem}` },
  ],
};
