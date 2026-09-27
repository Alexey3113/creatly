import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "cta-card-01",
  name: "CTA — карточка с тенью",
  description: "CTA в виде центрированной карточки с border-radius и тенью",
  category: "cta",
  subcategory: "card",
  icon: "▢",
  tags: ["cta", "card", "shadow", "centered"],
  motionLevel: "css",
  fields: [
    { name: "cta-icon", type: "icon", hint: "иконка над заголовком", required: false },
    { name: "cta-heading", type: "heading", hint: "заголовок призыва к действию", required: true },
    { name: "cta-description", type: "text", hint: "описание / подзаголовок", required: false },
    { name: "cta-button", type: "link", hint: "текст кнопки", required: true },
  ],
  html: `<section class="b-ct06" data-block="cta">
  <div class="b-ct06__inner">
    <div class="b-ct06__card" data-reveal="scale">
      <span class="b-ct06__icon" data-field="cta-icon">🚀</span>
      <h2 class="b-ct06__heading" data-field="cta-heading">Запустите свой проект сегодня</h2>
      <p class="b-ct06__desc" data-field="cta-description">Получите доступ ко всем инструментам и начните строить будущее вашего бизнеса прямо сейчас.</p>
      <a class="b-ct06__btn" href="#" data-field="cta-button">Начать бесплатно</a>
    </div>
  </div>
</section>`,
  css: `.b-ct06{background:var(--color-bg);padding:var(--space-section) var(--space-block)}
.b-ct06__inner{max-width:var(--container-width,1400px);margin:0 auto;display:flex;justify-content:center}
.b-ct06__card{background:var(--color-surface);border-radius:var(--radius-lg);box-shadow:0 8px 40px rgba(0,0,0,.08);padding:3.5rem 3rem;text-align:center;display:flex;flex-direction:column;align-items:center;gap:1.25rem;max-width:640px;width:100%}
.b-ct06__icon{font-size:2.5rem;line-height:1}
.b-ct06__heading{font-family:var(--font-heading);font-size:clamp(1.5rem,3vw,2.25rem);font-weight:800;color:var(--color-text);line-height:1.2;margin:0}
.b-ct06__desc{font-family:var(--font-body);font-size:1.0625rem;color:var(--color-text-muted);margin:0;line-height:1.6;max-width:480px}
.b-ct06__btn{display:inline-flex;align-items:center;min-height:52px;padding:0 2rem;border-radius:var(--radius-md);background:var(--color-primary);color:var(--color-text-on-primary);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;transition:transform .3s,opacity .3s}
.b-ct06__btn:hover{transform:translateY(-2px);opacity:.92}
@media(max-width:768px){.b-ct06{padding:2rem 1.25rem}.b-ct06__card{padding:2.5rem 1.5rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "primary-card", label: "Основной фон", css: `.b-ct06__card{background:var(--color-primary);box-shadow:0 12px 48px rgba(0,0,0,.15)}.b-ct06__heading{color:var(--color-text-on-primary)}.b-ct06__desc{color:var(--color-text-on-primary);opacity:.85}.b-ct06__btn{background:var(--color-bg);color:var(--color-text)}` },
    { id: "bordered", label: "С обводкой", css: `.b-ct06__card{box-shadow:none;border:2px solid var(--color-border)}` },
  ],
};
