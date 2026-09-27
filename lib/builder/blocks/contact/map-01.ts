import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "contact-map-01",
  name: "Контакт — карта сверху",
  description: "Плейсхолдер карты сверху, контактная информация и форма снизу",
  category: "contact",
  subcategory: "map",
  icon: "📍",
  tags: ["contact", "map", "form", "address", "phone", "email"],
  motionLevel: "css",
  fields: [
    { name: "contact-map-image", type: "image", hint: "Карта или изображение", required: false },
    { name: "contact-heading", type: "heading", hint: "Заголовок", required: true },
    { name: "contact-phone", type: "text", hint: "Телефон", required: true },
    { name: "contact-email", type: "text", hint: "Email", required: true },
    { name: "contact-address", type: "text", hint: "Адрес", required: true },
    { name: "contact-hours", type: "text", hint: "Часы работы", required: false },
    { name: "form-name", type: "text", hint: "Поле имени", required: true },
    { name: "form-email", type: "text", hint: "Поле email", required: true },
    { name: "form-message", type: "text", hint: "Поле сообщения", required: true },
    { name: "form-button", type: "text", hint: "Текст кнопки", required: true },
  ],
  html: `<section class="b-cn08" data-block="contact">
  <div class="b-cn08__map" data-field="contact-map-image" data-reveal="fade" style="--stagger:0">
    <div class="b-cn08__map-placeholder">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
      <span>Карта</span>
    </div>
  </div>
  <div class="b-cn08__body">
    <div class="b-cn08__inner">
      <div class="b-cn08__info" data-reveal="up" style="--stagger:1">
        <h2 class="b-cn08__heading" data-field="contact-heading">Наш офис</h2>
        <div class="b-cn08__details">
          <div class="b-cn08__detail">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span data-field="contact-address">Москва, Большая Никитская ул., д. 15</span>
          </div>
          <div class="b-cn08__detail">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span data-field="contact-phone">+7 (495) 987-65-43</span>
          </div>
          <div class="b-cn08__detail">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <span data-field="contact-email">office@company.ru</span>
          </div>
          <div class="b-cn08__detail">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span data-field="contact-hours">Пн-Пт: 9:00 — 18:00</span>
          </div>
        </div>
      </div>
      <form class="b-cn08__form" data-reveal="up" style="--stagger:2">
        <h3 class="b-cn08__form-title">Напишите нам</h3>
        <input class="b-cn08__input" type="text" data-field="form-name" placeholder="Ваше имя" />
        <input class="b-cn08__input" type="email" data-field="form-email" placeholder="Ваш email" />
        <textarea class="b-cn08__textarea" data-field="form-message" placeholder="Сообщение" rows="4"></textarea>
        <button class="b-cn08__btn" type="button" data-field="form-button">Отправить</button>
      </form>
    </div>
  </div>
</section>`,
  css: `.b-cn08{background:var(--color-bg)}
.b-cn08__map{background:var(--color-bg-alt);min-height:350px;display:flex;align-items:center;justify-content:center}
.b-cn08__map-placeholder{display:flex;flex-direction:column;align-items:center;gap:0.75rem;color:var(--color-text-muted);font-family:var(--font-body);font-size:0.875rem}
.b-cn08__body{padding:var(--space-section) var(--space-block)}
.b-cn08__inner{max-width:var(--container-width,1400px);margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start}
.b-cn08__heading{font-family:var(--font-heading);font-size:clamp(1.75rem,3vw,2.5rem);color:var(--color-text);margin:0 0 2rem}
.b-cn08__details{display:flex;flex-direction:column;gap:1.25rem}
.b-cn08__detail{display:flex;align-items:center;gap:0.875rem;font-family:var(--font-body);font-size:1rem;color:var(--color-text)}
.b-cn08__detail svg{color:var(--color-primary);flex-shrink:0}
.b-cn08__form{display:flex;flex-direction:column;gap:1rem;background:var(--color-surface);padding:2rem;border-radius:var(--radius-lg);border:1px solid var(--color-border)}
.b-cn08__form-title{font-family:var(--font-heading);font-size:1.25rem;color:var(--color-text);margin:0 0 0.5rem}
.b-cn08__input{border:1px solid var(--color-border);background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:1rem;border-radius:var(--radius-md);padding:0.875rem 1rem;outline:none;transition:border-color 0.2s}
.b-cn08__input:focus{border-color:var(--color-primary)}
.b-cn08__textarea{border:1px solid var(--color-border);background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:1rem;border-radius:var(--radius-md);padding:0.875rem 1rem;outline:none;resize:vertical;transition:border-color 0.2s}
.b-cn08__textarea:focus{border-color:var(--color-primary)}
.b-cn08__btn{background:var(--color-primary);color:var(--color-text-on-primary);font-family:var(--font-body);font-size:1rem;font-weight:600;padding:1rem 2rem;border:none;border-radius:var(--radius-md);cursor:pointer;transition:opacity 0.2s}
.b-cn08__btn:hover{opacity:0.9}
@media(max-width:768px){.b-cn08__map{min-height:250px}.b-cn08__inner{grid-template-columns:1fr;gap:2.5rem}.b-cn08__form{padding:1.5rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-cn08{background:var(--color-bg-alt)}.b-cn08__map{background:var(--color-bg)}.b-cn08__form{background:var(--color-bg);border-color:var(--color-border)}` },
    { id: "compact", label: "Компактный", css: `.b-cn08__map{min-height:250px}.b-cn08__body{padding:2rem var(--space-block)}` },
  ],
};
