import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "cta-newsletter-01",
  name: "CTA — подписка на рассылку",
  description: "Блок подписки на рассылку: заголовок, поле email и кнопка",
  category: "cta",
  subcategory: "newsletter",
  icon: "✉",
  tags: ["cta", "newsletter", "email", "subscription", "form"],
  motionLevel: "css",
  fields: [
    { name: "cta-heading", type: "heading", hint: "заголовок блока подписки", required: true },
    { name: "cta-description", type: "text", hint: "описание / подзаголовок", required: false },
    { name: "cta-input-placeholder", type: "text", hint: "плейсхолдер поля email", required: false },
    { name: "cta-button", type: "link", hint: "текст кнопки подписки", required: true },
    { name: "cta-note", type: "text", hint: "примечание под формой", required: false },
  ],
  html: `<section class="b-ct10" data-block="cta">
  <div class="b-ct10__inner">
    <div class="b-ct10__content" data-reveal="up">
      <h2 class="b-ct10__heading" data-field="cta-heading">Подпишитесь на рассылку</h2>
      <p class="b-ct10__desc" data-field="cta-description">Полезные материалы, кейсы и новости — без спама, раз в неделю.</p>
    </div>
    <div class="b-ct10__form-wrap" data-reveal="up" style="--stagger:1">
      <div class="b-ct10__form">
        <input class="b-ct10__input" type="email" data-field="cta-input-placeholder" placeholder="Введите ваш email" />
        <a class="b-ct10__btn" href="#" data-field="cta-button">Подписаться</a>
      </div>
      <p class="b-ct10__note" data-field="cta-note">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
    </div>
  </div>
</section>`,
  css: `.b-ct10{background:var(--color-bg-alt);padding:var(--space-section) var(--space-block)}
.b-ct10__inner{max-width:var(--container-width,1400px);margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:2rem;text-align:center}
.b-ct10__content{display:flex;flex-direction:column;gap:.75rem;align-items:center}
.b-ct10__heading{font-family:var(--font-heading);font-size:clamp(1.5rem,3vw,2.25rem);font-weight:800;color:var(--color-text);line-height:1.2;margin:0}
.b-ct10__desc{font-family:var(--font-body);font-size:1.0625rem;color:var(--color-text-muted);margin:0;line-height:1.6;max-width:520px}
.b-ct10__form-wrap{display:flex;flex-direction:column;align-items:center;gap:.75rem;width:100%;max-width:520px}
.b-ct10__form{display:flex;gap:.75rem;width:100%}
.b-ct10__input{flex:1;min-height:52px;padding:0 1.25rem;border:2px solid var(--color-border);border-radius:var(--radius-md);background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:.9375rem;outline:none;transition:border-color .2s}
.b-ct10__input:focus{border-color:var(--color-primary)}
.b-ct10__btn{display:inline-flex;align-items:center;min-height:52px;padding:0 2rem;border-radius:var(--radius-md);background:var(--color-primary);color:var(--color-text-on-primary);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;transition:transform .3s,opacity .3s;white-space:nowrap;flex-shrink:0}
.b-ct10__btn:hover{transform:translateY(-2px);opacity:.92}
.b-ct10__note{font-family:var(--font-body);font-size:.75rem;color:var(--color-text-muted);margin:0;opacity:.7}
@media(max-width:768px){.b-ct10{padding:3rem 1.25rem}.b-ct10__form{flex-direction:column}.b-ct10__btn{justify-content:center}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "card-style", label: "Карточка", css: `.b-ct10{background:var(--color-bg)}.b-ct10__inner{background:var(--color-surface);border-radius:var(--radius-lg);padding:3rem;box-shadow:0 4px 24px rgba(0,0,0,.06);max-width:720px}` },
    { id: "primary-bg", label: "Основной фон", css: `.b-ct10{background:var(--color-primary)}.b-ct10__heading{color:var(--color-text-on-primary)}.b-ct10__desc{color:var(--color-text-on-primary);opacity:.85}.b-ct10__input{background:rgba(255,255,255,.15);border-color:rgba(255,255,255,.25);color:var(--color-text-on-primary)}.b-ct10__input::placeholder{color:var(--color-text-on-primary);opacity:.6}.b-ct10__btn{background:var(--color-bg);color:var(--color-text)}.b-ct10__note{color:var(--color-text-on-primary);opacity:.6}` },
  ],
};
