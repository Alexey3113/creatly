import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "contact-cta-form-01",
  name: "Контакт — CTA с формой",
  description: "CTA-стиль: акцентный фон, заголовок, инлайн-форма с полем email и кнопкой",
  category: "contact",
  subcategory: "cta-form",
  icon: "⚡",
  tags: ["contact", "cta", "form", "inline", "email", "subscribe"],
  motionLevel: "css",
  fields: [
    { name: "cta-heading", type: "heading", hint: "Заголовок CTA", required: true },
    { name: "cta-description", type: "text", hint: "Описание", required: false },
    { name: "form-email", type: "text", hint: "Поле email", required: true },
    { name: "form-button", type: "text", hint: "Текст кнопки", required: true },
  ],
  html: `<section class="b-cn06" data-block="contact">
  <div class="b-cn06__inner">
    <div class="b-cn06__content" data-reveal="up" style="--stagger:0">
      <h2 class="b-cn06__heading" data-field="cta-heading">Готовы начать?</h2>
      <p class="b-cn06__desc" data-field="cta-description">Оставьте свой email и мы свяжемся с вами для бесплатной консультации</p>
    </div>
    <form class="b-cn06__form" data-reveal="up" style="--stagger:1">
      <input class="b-cn06__input" type="email" data-field="form-email" placeholder="Ваш email" />
      <button class="b-cn06__btn" type="button" data-field="form-button">Отправить</button>
    </form>
  </div>
</section>`,
  css: `.b-cn06{background:var(--color-primary);padding:var(--space-section) var(--space-block)}
.b-cn06__inner{max-width:800px;margin:0 auto;text-align:center}
.b-cn06__heading{font-family:var(--font-heading);font-size:clamp(2rem,4vw,3rem);color:var(--color-text-on-primary);margin:0 0 1rem}
.b-cn06__desc{font-family:var(--font-body);font-size:1.125rem;color:var(--color-text-on-primary);opacity:0.85;line-height:1.7;margin:0 0 2.5rem}
.b-cn06__form{display:flex;gap:0.75rem;max-width:520px;margin:0 auto}
.b-cn06__input{flex:1;border:2px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.1);color:var(--color-text-on-primary);font-family:var(--font-body);font-size:1rem;border-radius:var(--radius-md);padding:1rem 1.25rem;outline:none;transition:border-color 0.2s}
.b-cn06__input::placeholder{color:var(--color-text-on-primary);opacity:0.6}
.b-cn06__input:focus{border-color:rgba(255,255,255,0.6)}
.b-cn06__btn{background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:1rem;font-weight:600;padding:1rem 2rem;border:none;border-radius:var(--radius-md);cursor:pointer;white-space:nowrap;transition:opacity 0.2s}
.b-cn06__btn:hover{opacity:0.9}
@media(max-width:768px){.b-cn06__form{flex-direction:column}.b-cn06__btn{width:100%}}`,
  variants: [
    { id: "primary", label: "Основной", css: "" },
    { id: "accent", label: "Акцентный", css: `.b-cn06{background:var(--color-accent)}.b-cn06__heading{color:var(--color-text-on-accent)}.b-cn06__desc{color:var(--color-text-on-accent)}.b-cn06__input{color:var(--color-text-on-accent)}.b-cn06__input::placeholder{color:var(--color-text-on-accent)}` },
    { id: "dark", label: "Тёмный", css: `.b-cn06{background:var(--color-bg-alt)}.b-cn06__heading{color:var(--color-text)}.b-cn06__desc{color:var(--color-text-muted)}.b-cn06__input{border-color:var(--color-border);background:var(--color-bg);color:var(--color-text)}.b-cn06__input::placeholder{color:var(--color-text-muted)}.b-cn06__btn{background:var(--color-primary);color:var(--color-text-on-primary)}` },
  ],
};
