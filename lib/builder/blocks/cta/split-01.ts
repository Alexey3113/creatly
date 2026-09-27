import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "cta-split-01",
  name: "CTA — сплит с формой подписки",
  description: "Текст слева, форма с полем ввода email и кнопкой справа",
  category: "cta",
  subcategory: "split",
  icon: "◧",
  tags: ["cta", "split", "form", "email", "subscription"],
  motionLevel: "css",
  fields: [
    { name: "cta-heading", type: "heading", hint: "заголовок призыва к действию", required: true },
    { name: "cta-description", type: "text", hint: "описание / подзаголовок", required: false },
    { name: "cta-input-placeholder", type: "text", hint: "плейсхолдер поля ввода", required: false },
    { name: "cta-button", type: "link", hint: "текст кнопки", required: true },
  ],
  html: `<section class="b-ct03" data-block="cta">
  <div class="b-ct03__inner">
    <div class="b-ct03__text" data-reveal="up">
      <h2 class="b-ct03__heading" data-field="cta-heading">Будьте в курсе обновлений</h2>
      <p class="b-ct03__desc" data-field="cta-description">Подпишитесь и получайте эксклюзивные материалы, советы и новости прямо на почту.</p>
    </div>
    <div class="b-ct03__form" data-reveal="up" style="--stagger:1">
      <input class="b-ct03__input" type="email" data-field="cta-input-placeholder" placeholder="Ваш email" />
      <a class="b-ct03__btn" href="#" data-field="cta-button">Подписаться</a>
    </div>
  </div>
</section>`,
  css: `.b-ct03{background:var(--color-bg-alt);padding:var(--space-section) var(--space-block)}
.b-ct03__inner{max-width:var(--container-width,1400px);margin:0 auto;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:3rem}
.b-ct03__heading{font-family:var(--font-heading);font-size:clamp(1.5rem,3vw,2.25rem);font-weight:800;color:var(--color-text);line-height:1.2;margin:0 0 .75rem}
.b-ct03__desc{font-family:var(--font-body);font-size:1rem;color:var(--color-text-muted);margin:0;line-height:1.6}
.b-ct03__form{display:flex;gap:.75rem;align-items:stretch}
.b-ct03__input{flex:1;min-height:52px;padding:0 1.25rem;border:2px solid var(--color-border);border-radius:var(--radius-md);background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:.9375rem;outline:none;transition:border-color .2s}
.b-ct03__input:focus{border-color:var(--color-primary)}
.b-ct03__btn{display:inline-flex;align-items:center;min-height:52px;padding:0 2rem;border-radius:var(--radius-md);background:var(--color-primary);color:var(--color-text-on-primary);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;transition:transform .3s,opacity .3s;white-space:nowrap}
.b-ct03__btn:hover{transform:translateY(-2px);opacity:.92}
@media(max-width:768px){.b-ct03{padding:3rem 1.25rem}.b-ct03__inner{grid-template-columns:1fr;gap:1.5rem}.b-ct03__form{flex-direction:column}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "surface", label: "Поверхность", css: `.b-ct03{background:var(--color-surface)}.b-ct03__input{background:var(--color-bg-alt)}` },
    { id: "bordered", label: "С обводкой", css: `.b-ct03{background:var(--color-bg);border-top:1px solid var(--color-border);border-bottom:1px solid var(--color-border)}` },
  ],
};
