import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "contact-cards-01",
  name: "Контакт — карточки + форма",
  description: "Три карточки контактов (телефон, email, адрес) с формой ниже",
  category: "contact",
  subcategory: "cards",
  icon: "🃏",
  tags: ["contact", "cards", "form", "phone", "email", "address"],
  motionLevel: "css",
  fields: [
    { name: "contact-heading", type: "heading", hint: "Заголовок секции", required: true },
    { name: "card-phone-label", type: "text", hint: "Заголовок карточки телефона", required: true },
    { name: "card-phone-value", type: "text", hint: "Номер телефона", required: true },
    { name: "card-email-label", type: "text", hint: "Заголовок карточки email", required: true },
    { name: "card-email-value", type: "text", hint: "Email адрес", required: true },
    { name: "card-address-label", type: "text", hint: "Заголовок карточки адреса", required: true },
    { name: "card-address-value", type: "text", hint: "Адрес", required: true },
    { name: "form-name", type: "text", hint: "Поле имени", required: true },
    { name: "form-email", type: "text", hint: "Поле email", required: true },
    { name: "form-message", type: "text", hint: "Поле сообщения", required: true },
    { name: "form-button", type: "text", hint: "Текст кнопки", required: true },
  ],
  html: `<section class="b-cn04" data-block="contact">
  <div class="b-cn04__inner">
    <h2 class="b-cn04__heading" data-field="contact-heading" data-reveal="up" style="--stagger:0">Как с нами связаться</h2>
    <div class="b-cn04__cards">
      <div class="b-cn04__card" data-reveal="up" style="--stagger:1">
        <div class="b-cn04__card-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
        <h3 class="b-cn04__card-title" data-field="card-phone-label">Телефон</h3>
        <p class="b-cn04__card-value" data-field="card-phone-value">+7 (495) 123-45-67</p>
      </div>
      <div class="b-cn04__card" data-reveal="up" style="--stagger:2">
        <div class="b-cn04__card-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
        <h3 class="b-cn04__card-title" data-field="card-email-label">Электронная почта</h3>
        <p class="b-cn04__card-value" data-field="card-email-value">info@company.ru</p>
      </div>
      <div class="b-cn04__card" data-reveal="up" style="--stagger:3">
        <div class="b-cn04__card-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
        <h3 class="b-cn04__card-title" data-field="card-address-label">Адрес офиса</h3>
        <p class="b-cn04__card-value" data-field="card-address-value">Москва, Тверская ул., д. 12</p>
      </div>
    </div>
    <form class="b-cn04__form" data-reveal="up" style="--stagger:4">
      <input class="b-cn04__input" type="text" data-field="form-name" placeholder="Ваше имя" />
      <input class="b-cn04__input" type="email" data-field="form-email" placeholder="Ваш email" />
      <textarea class="b-cn04__textarea" data-field="form-message" placeholder="Сообщение" rows="4"></textarea>
      <button class="b-cn04__btn" type="button" data-field="form-button">Отправить</button>
    </form>
  </div>
</section>`,
  css: `.b-cn04{background:var(--color-bg);padding:var(--space-section) var(--space-block)}
.b-cn04__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-cn04__heading{font-family:var(--font-heading);font-size:clamp(2rem,4vw,3rem);color:var(--color-text);text-align:center;margin:0 0 3rem}
.b-cn04__cards{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-bottom:3rem}
.b-cn04__card{background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:2rem;text-align:center;transition:border-color 0.2s}
.b-cn04__card:hover{border-color:var(--color-primary)}
.b-cn04__card-icon{display:inline-flex;align-items:center;justify-content:center;width:56px;height:56px;border-radius:var(--radius-full);background:var(--color-bg-alt);color:var(--color-primary);margin-bottom:1.25rem}
.b-cn04__card-title{font-family:var(--font-heading);font-size:1.125rem;color:var(--color-text);margin:0 0 0.5rem}
.b-cn04__card-value{font-family:var(--font-body);font-size:1rem;color:var(--color-text-muted);margin:0}
.b-cn04__form{max-width:720px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.b-cn04__input{border:1px solid var(--color-border);background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:1rem;border-radius:var(--radius-md);padding:0.875rem 1rem;outline:none;transition:border-color 0.2s}
.b-cn04__input:focus{border-color:var(--color-primary)}
.b-cn04__textarea{border:1px solid var(--color-border);background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:1rem;border-radius:var(--radius-md);padding:0.875rem 1rem;outline:none;resize:vertical;grid-column:1/-1;transition:border-color 0.2s}
.b-cn04__textarea:focus{border-color:var(--color-primary)}
.b-cn04__btn{background:var(--color-primary);color:var(--color-text-on-primary);font-family:var(--font-body);font-size:1rem;font-weight:600;padding:1rem 2rem;border:none;border-radius:var(--radius-md);cursor:pointer;grid-column:1/-1;transition:opacity 0.2s}
.b-cn04__btn:hover{opacity:0.9}
@media(max-width:768px){.b-cn04__cards{grid-template-columns:1fr}.b-cn04__form{grid-template-columns:1fr}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-cn04{background:var(--color-bg-alt)}.b-cn04__card{background:var(--color-bg)}` },
    { id: "filled-icons", label: "Заливка иконок", css: `.b-cn04__card-icon{background:var(--color-primary);color:var(--color-text-on-primary)}` },
  ],
};
