import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "cta-split-02",
  name: "CTA — изображение слева, текст справа",
  description: "Изображение слева, CTA-текст с кнопкой справа",
  category: "cta",
  subcategory: "split",
  icon: "🖼",
  tags: ["cta", "split", "image", "visual"],
  motionLevel: "css",
  fields: [
    { name: "cta-image", type: "image", hint: "изображение слева", required: true },
    { name: "cta-heading", type: "heading", hint: "заголовок призыва к действию", required: true },
    { name: "cta-description", type: "text", hint: "описание / подзаголовок", required: false },
    { name: "cta-button", type: "link", hint: "текст кнопки", required: true },
  ],
  html: `<section class="b-ct04" data-block="cta">
  <div class="b-ct04__inner">
    <div class="b-ct04__media" data-reveal="clip">
      <img class="b-ct04__img" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80" alt="" data-field="cta-image" />
    </div>
    <div class="b-ct04__content" data-reveal="up" style="--stagger:1">
      <h2 class="b-ct04__heading" data-field="cta-heading">Создайте что-то удивительное</h2>
      <p class="b-ct04__desc" data-field="cta-description">Наши инструменты помогут вам реализовать самые смелые идеи — от концепции до запуска.</p>
      <a class="b-ct04__btn" href="#" data-field="cta-button">Начать сейчас</a>
    </div>
  </div>
</section>`,
  css: `.b-ct04{background:var(--color-bg);padding:var(--space-section) var(--space-block)}
.b-ct04__inner{max-width:var(--container-width,1400px);margin:0 auto;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:4rem}
.b-ct04__media{overflow:hidden;border-radius:var(--radius-lg)}
.b-ct04__img{width:100%;height:100%;object-fit:cover;display:block;aspect-ratio:3/2}
.b-ct04__content{display:flex;flex-direction:column;gap:1.25rem}
.b-ct04__heading{font-family:var(--font-heading);font-size:clamp(1.5rem,3vw,2.5rem);font-weight:800;color:var(--color-text);line-height:1.15;margin:0}
.b-ct04__desc{font-family:var(--font-body);font-size:1.0625rem;color:var(--color-text-muted);margin:0;line-height:1.6}
.b-ct04__btn{display:inline-flex;align-items:center;min-height:52px;padding:0 2rem;border-radius:var(--radius-md);background:var(--color-primary);color:var(--color-text-on-primary);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;transition:transform .3s,opacity .3s;align-self:flex-start}
.b-ct04__btn:hover{transform:translateY(-2px);opacity:.92}
@media(max-width:768px){.b-ct04{padding:3rem 1.25rem}.b-ct04__inner{grid-template-columns:1fr;gap:2rem}.b-ct04__btn{align-self:stretch;justify-content:center}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "reversed", label: "Зеркальный", css: `.b-ct04__inner{direction:rtl}.b-ct04__content{direction:ltr}.b-ct04__media{direction:ltr}` },
    { id: "dark-bg", label: "Тёмный фон", css: `.b-ct04{background:var(--color-bg-alt)}.b-ct04__media{border-radius:var(--radius-md)}` },
  ],
};
