import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-cards-04",
  name: "Hero — до/после",
  description: "Текст сверху, два изображения рядом (до и после) с лейблами",
  category: "hero",
  subcategory: "cards",
  icon: "◧",
  tags: ["cards", "before-after", "comparison", "transformation"],
  motionLevel: "css",
  fields: [
    { name: "hero-title", type: "heading", hint: "заголовок 5-8 слов", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание", required: true },
    { name: "hero-cta", type: "link", hint: "CTA", required: true },
    { name: "hero-before-img", type: "image", hint: "фото «до»", required: true },
    { name: "hero-after-img", type: "image", hint: "фото «после»", required: true },
    { name: "hero-before-label", type: "text", hint: "лейбл «До»", required: false },
    { name: "hero-after-label", type: "text", hint: "лейбл «После»", required: false },
  ],
  html: `<section class="b-hca04" data-block="hero">
  <div class="b-hca04__inner">
    <div class="b-hca04__text">
      <h1 data-field="hero-title" data-reveal="up">Преображаем пространство за 14 дней</h1>
      <p data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">Дизайн интерьера под ключ: от концепции до реализации. 250+ завершённых объектов.</p>
      <a class="b-btn" href="#" data-field="hero-cta" data-reveal="fade" style="--stagger:2">Заказать проект</a>
    </div>
    <div class="b-hca04__compare" data-reveal="up" style="--stagger:2">
      <div class="b-hca04__card">
        <span class="b-hca04__label" data-field="hero-before-label">До</span>
        <img data-field="hero-before-img" src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80" alt="До" />
      </div>
      <div class="b-hca04__card">
        <span class="b-hca04__label b-hca04__label--accent" data-field="hero-after-label">После</span>
        <img data-field="hero-after-img" src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80" alt="После" />
      </div>
    </div>
  </div>
</section>`,
  css: `.b-hca04{padding:var(--space-section) var(--space-block);background:var(--color-bg);text-align:center}
.b-hca04__inner{max-width:1100px;margin:0 auto}
.b-hca04 h1{font-family:var(--font-heading);font-size:clamp(2.25rem,4.5vw,3.5rem);color:var(--color-text);margin:0 0 1rem;line-height:1.1}
.b-hca04__text p{font-family:var(--font-body);color:var(--color-text-muted);font-size:1.125rem;line-height:1.6;max-width:560px;margin:0 auto 2rem}
.b-hca04__compare{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-top:3rem}
.b-hca04__card{position:relative;border-radius:var(--radius-lg);overflow:hidden}
.b-hca04__card img{width:100%;aspect-ratio:4/3;object-fit:cover;display:block}
.b-hca04__label{position:absolute;top:1rem;left:1rem;padding:.375rem 1rem;border-radius:var(--radius-full);background:var(--color-surface);color:var(--color-text);font-family:var(--font-body);font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em}
.b-hca04__label--accent{background:var(--color-accent);color:var(--color-text-on-accent)}
@media(max-width:767px){.b-hca04{padding:3rem 1.25rem}.b-hca04__compare{grid-template-columns:1fr;gap:1rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-hca04{background:var(--color-primary)}.b-hca04 h1{color:var(--color-text-on-primary)}.b-hca04__text p{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-hca04__label{background:rgba(255,255,255,.15);color:var(--color-text-on-primary)}` },
  ],
};
