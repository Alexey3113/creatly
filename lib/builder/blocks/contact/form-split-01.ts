import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "contact-form-split-01",
  name: "Контакт — форма + инфо",
  description: "Контактная информация слева (телефон, email, адрес), форма обратной связи справа",
  category: "contact",
  subcategory: "form-split",
  icon: "✉",
  tags: ["contact", "form", "split", "phone", "email", "address"],
  motionLevel: "css",
  fields: [
    { name: "contact-heading", type: "heading", hint: "Заголовок секции", required: true },
    { name: "contact-description", type: "text", hint: "Описание", required: false },
    { name: "contact-phone", type: "text", hint: "Телефон", required: true },
    { name: "contact-email", type: "text", hint: "Email", required: true },
    { name: "contact-address", type: "text", hint: "Адрес", required: true },
    { name: "form-name", type: "text", hint: "Поле имени", required: true },
    { name: "form-email", type: "text", hint: "Поле email", required: true },
    { name: "form-message", type: "text", hint: "Поле сообщения", required: true },
    { name: "form-button", type: "text", hint: "Текст кнопки", required: true },
  ],
  html: `<section class="b-cn01" data-block="contact">
  <div class="b-cn01__inner">
    <div class="b-cn01__info" data-reveal="up" style="--stagger:0">
      <h2 class="b-cn01__heading" data-field="contact-heading">Свяжитесь с нами</h2>
      <p class="b-cn01__desc" data-field="contact-description">Мы всегда рады ответить на ваши вопросы и обсудить сотрудничество</p>
      <div class="b-cn01__details">
        <div class="b-cn01__detail" data-reveal="up" style="--stagger:1">
          <span class="b-cn01__icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
          <span data-field="contact-phone">+7 (495) 123-45-67</span>
        </div>
        <div class="b-cn01__detail" data-reveal="up" style="--stagger:2">
          <span class="b-cn01__icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
          <span data-field="contact-email">info@company.ru</span>
        </div>
        <div class="b-cn01__detail" data-reveal="up" style="--stagger:3">
          <span class="b-cn01__icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
          <span data-field="contact-address">Москва, ул. Примерная, д. 42</span>
        </div>
      </div>
    </div>
    <form class="b-cn01__form" data-reveal="up" style="--stagger:1">
      <input class="b-cn01__input" type="text" data-field="form-name" placeholder="Ваше имя" />
      <input class="b-cn01__input" type="email" data-field="form-email" placeholder="Ваш email" />
      <textarea class="b-cn01__textarea" data-field="form-message" placeholder="Ваше сообщение" rows="5"></textarea>
      <button class="b-cn01__btn" type="button" data-field="form-button">Отправить сообщение</button>
    </form>
  </div>
</section>`,
  css: `.b-cn01{background:var(--color-bg);padding:var(--space-section) var(--space-block)}
.b-cn01__inner{max-width:var(--container-width,1400px);margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start}
.b-cn01__heading{font-family:var(--font-heading);font-size:clamp(2rem,4vw,3rem);color:var(--color-text);margin:0 0 1rem}
.b-cn01__desc{font-family:var(--font-body);font-size:1.125rem;color:var(--color-text-muted);line-height:1.7;margin:0 0 2.5rem}
.b-cn01__details{display:flex;flex-direction:column;gap:1.5rem}
.b-cn01__detail{display:flex;align-items:center;gap:1rem;font-family:var(--font-body);font-size:1rem;color:var(--color-text)}
.b-cn01__icon{display:flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:var(--radius-md);background:var(--color-bg-alt);color:var(--color-primary);flex-shrink:0}
.b-cn01__form{display:flex;flex-direction:column;gap:1rem;background:var(--color-surface);padding:2.5rem;border-radius:var(--radius-lg);border:1px solid var(--color-border)}
.b-cn01__input{border:1px solid var(--color-border);background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:1rem;border-radius:var(--radius-md);padding:0.875rem 1rem;outline:none;transition:border-color 0.2s}
.b-cn01__input:focus{border-color:var(--color-primary)}
.b-cn01__textarea{border:1px solid var(--color-border);background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:1rem;border-radius:var(--radius-md);padding:0.875rem 1rem;outline:none;resize:vertical;transition:border-color 0.2s}
.b-cn01__textarea:focus{border-color:var(--color-primary)}
.b-cn01__btn{background:var(--color-primary);color:var(--color-text-on-primary);font-family:var(--font-body);font-size:1rem;font-weight:600;padding:1rem 2rem;border:none;border-radius:var(--radius-md);cursor:pointer;transition:opacity 0.2s}
.b-cn01__btn:hover{opacity:0.9}
@media(max-width:768px){.b-cn01__inner{grid-template-columns:1fr;gap:2.5rem}.b-cn01__form{padding:1.5rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-cn01{background:var(--color-bg-alt)}.b-cn01__form{background:var(--color-bg);border-color:var(--color-border)}` },
    { id: "accent", label: "Акцентный", css: `.b-cn01__icon{background:var(--color-primary);color:var(--color-text-on-primary)}` },
  ],
};
