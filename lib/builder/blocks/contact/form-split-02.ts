import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "contact-form-split-02",
  name: "Контакт — карта + форма",
  description: "Плейсхолдер карты/изображения слева, форма обратной связи справа",
  category: "contact",
  subcategory: "form-split",
  icon: "🗺",
  tags: ["contact", "form", "split", "map", "image"],
  motionLevel: "css",
  fields: [
    { name: "contact-map-image", type: "image", hint: "Карта или изображение", required: false },
    { name: "contact-heading", type: "heading", hint: "Заголовок формы", required: true },
    { name: "contact-subheading", type: "text", hint: "Подзаголовок формы", required: false },
    { name: "form-name", type: "text", hint: "Поле имени", required: true },
    { name: "form-email", type: "text", hint: "Поле email", required: true },
    { name: "form-phone", type: "text", hint: "Поле телефона", required: false },
    { name: "form-message", type: "text", hint: "Поле сообщения", required: true },
    { name: "form-button", type: "text", hint: "Текст кнопки", required: true },
  ],
  html: `<section class="b-cn02" data-block="contact">
  <div class="b-cn02__inner">
    <div class="b-cn02__media" data-reveal="fade" style="--stagger:0">
      <div class="b-cn02__map-placeholder" data-field="contact-map-image">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        <span class="b-cn02__map-label">Карта / Изображение</span>
      </div>
    </div>
    <div class="b-cn02__content" data-reveal="up" style="--stagger:1">
      <h2 class="b-cn02__heading" data-field="contact-heading">Напишите нам</h2>
      <p class="b-cn02__sub" data-field="contact-subheading">Заполните форму и мы свяжемся с вами в ближайшее время</p>
      <form class="b-cn02__form">
        <div class="b-cn02__row">
          <input class="b-cn02__input" type="text" data-field="form-name" placeholder="Имя" />
          <input class="b-cn02__input" type="tel" data-field="form-phone" placeholder="Телефон" />
        </div>
        <input class="b-cn02__input" type="email" data-field="form-email" placeholder="Email" />
        <textarea class="b-cn02__textarea" data-field="form-message" placeholder="Сообщение" rows="4"></textarea>
        <button class="b-cn02__btn" type="button" data-field="form-button">Отправить</button>
      </form>
    </div>
  </div>
</section>`,
  css: `.b-cn02{background:var(--color-bg);padding:var(--space-section) var(--space-block)}
.b-cn02__inner{max-width:var(--container-width,1400px);margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:0;min-height:600px;border-radius:var(--radius-lg);overflow:hidden;border:1px solid var(--color-border)}
.b-cn02__media{position:relative;background:var(--color-bg-alt)}
.b-cn02__map-placeholder{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;min-height:400px;color:var(--color-text-muted);gap:1rem}
.b-cn02__map-label{font-family:var(--font-body);font-size:0.875rem;color:var(--color-text-muted)}
.b-cn02__content{padding:3rem;display:flex;flex-direction:column;justify-content:center;background:var(--color-surface)}
.b-cn02__heading{font-family:var(--font-heading);font-size:clamp(1.75rem,3vw,2.5rem);color:var(--color-text);margin:0 0 0.75rem}
.b-cn02__sub{font-family:var(--font-body);font-size:1rem;color:var(--color-text-muted);margin:0 0 2rem;line-height:1.6}
.b-cn02__form{display:flex;flex-direction:column;gap:1rem}
.b-cn02__row{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.b-cn02__input{border:1px solid var(--color-border);background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:1rem;border-radius:var(--radius-md);padding:0.875rem 1rem;outline:none;transition:border-color 0.2s}
.b-cn02__input:focus{border-color:var(--color-primary)}
.b-cn02__textarea{border:1px solid var(--color-border);background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:1rem;border-radius:var(--radius-md);padding:0.875rem 1rem;outline:none;resize:vertical;transition:border-color 0.2s}
.b-cn02__textarea:focus{border-color:var(--color-primary)}
.b-cn02__btn{background:var(--color-primary);color:var(--color-text-on-primary);font-family:var(--font-body);font-size:1rem;font-weight:600;padding:1rem 2rem;border:none;border-radius:var(--radius-md);cursor:pointer;transition:opacity 0.2s}
.b-cn02__btn:hover{opacity:0.9}
@media(max-width:768px){.b-cn02__inner{grid-template-columns:1fr}.b-cn02__content{padding:2rem}.b-cn02__row{grid-template-columns:1fr}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-cn02{background:var(--color-bg-alt)}.b-cn02__content{background:var(--color-bg)}` },
    { id: "rounded", label: "Округлый", css: `.b-cn02__inner{border-radius:var(--radius-lg)}.b-cn02__btn{border-radius:var(--radius-full)}` },
  ],
};
