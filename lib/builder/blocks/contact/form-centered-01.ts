import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "contact-form-centered-01",
  name: "Контакт — центрированная форма",
  description: "Компактная форма по центру с заголовком и кнопкой отправки",
  category: "contact",
  subcategory: "form-centered",
  icon: "📝",
  tags: ["contact", "form", "centered", "compact"],
  motionLevel: "css",
  fields: [
    { name: "contact-heading", type: "heading", hint: "Заголовок", required: true },
    { name: "contact-description", type: "text", hint: "Описание", required: false },
    { name: "form-name", type: "text", hint: "Поле имени", required: true },
    { name: "form-email", type: "text", hint: "Поле email", required: true },
    { name: "form-subject", type: "text", hint: "Поле темы", required: false },
    { name: "form-message", type: "text", hint: "Поле сообщения", required: true },
    { name: "form-button", type: "text", hint: "Текст кнопки", required: true },
  ],
  html: `<section class="b-cn03" data-block="contact">
  <div class="b-cn03__inner">
    <div class="b-cn03__header" data-reveal="up" style="--stagger:0">
      <h2 class="b-cn03__heading" data-field="contact-heading">Обратная связь</h2>
      <p class="b-cn03__desc" data-field="contact-description">Есть вопрос или предложение? Мы с радостью выслушаем вас</p>
    </div>
    <form class="b-cn03__form" data-reveal="up" style="--stagger:1">
      <div class="b-cn03__row">
        <input class="b-cn03__input" type="text" data-field="form-name" placeholder="Ваше имя" />
        <input class="b-cn03__input" type="email" data-field="form-email" placeholder="Ваш email" />
      </div>
      <input class="b-cn03__input" type="text" data-field="form-subject" placeholder="Тема обращения" />
      <textarea class="b-cn03__textarea" data-field="form-message" placeholder="Расскажите подробнее..." rows="5"></textarea>
      <button class="b-cn03__btn" type="button" data-field="form-button">Отправить сообщение</button>
    </form>
  </div>
</section>`,
  css: `.b-cn03{background:var(--color-bg);padding:var(--space-section) var(--space-block)}
.b-cn03__inner{max-width:720px;margin:0 auto}
.b-cn03__header{text-align:center;margin-bottom:2.5rem}
.b-cn03__heading{font-family:var(--font-heading);font-size:clamp(2rem,4vw,3rem);color:var(--color-text);margin:0 0 1rem}
.b-cn03__desc{font-family:var(--font-body);font-size:1.125rem;color:var(--color-text-muted);line-height:1.7;margin:0}
.b-cn03__form{display:flex;flex-direction:column;gap:1rem;background:var(--color-surface);padding:2.5rem;border-radius:var(--radius-lg);border:1px solid var(--color-border)}
.b-cn03__row{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.b-cn03__input{border:1px solid var(--color-border);background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:1rem;border-radius:var(--radius-md);padding:0.875rem 1rem;outline:none;transition:border-color 0.2s}
.b-cn03__input:focus{border-color:var(--color-primary)}
.b-cn03__textarea{border:1px solid var(--color-border);background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:1rem;border-radius:var(--radius-md);padding:0.875rem 1rem;outline:none;resize:vertical;transition:border-color 0.2s}
.b-cn03__textarea:focus{border-color:var(--color-primary)}
.b-cn03__btn{background:var(--color-primary);color:var(--color-text-on-primary);font-family:var(--font-body);font-size:1rem;font-weight:600;padding:1rem 2rem;border:none;border-radius:var(--radius-md);cursor:pointer;transition:opacity 0.2s;align-self:center}
.b-cn03__btn:hover{opacity:0.9}
@media(max-width:768px){.b-cn03__row{grid-template-columns:1fr}.b-cn03__form{padding:1.5rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-cn03{background:var(--color-bg-alt)}.b-cn03__form{background:var(--color-bg)}` },
    { id: "borderless", label: "Без рамки", css: `.b-cn03__form{border:none;box-shadow:0 4px 24px rgba(0,0,0,0.08)}` },
  ],
};
