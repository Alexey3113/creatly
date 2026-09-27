import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-full-image-03",
  name: "Hero — сплит: текст + открытое фото",
  description: "Левая половина с тёмным оверлеем и текстом, правая — открытое изображение без наложения",
  category: "hero",
  subcategory: "full-image",
  icon: "◼",
  tags: ["full-image", "split", "half-overlay", "editorial"],
  motionLevel: "css",
  fields: [
    { name: "hero-image", type: "image", hint: "фоновое изображение, мин. 1920×1080", required: true },
    { name: "hero-eyebrow", type: "text", hint: "короткий лейбл", required: false },
    { name: "hero-title", type: "heading", hint: "заголовок 4-8 слов", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание 1-2 предложения", required: true },
    { name: "hero-cta", type: "link", hint: "текст CTA-кнопки", required: true },
    { name: "hero-cta-secondary", type: "link", hint: "вторичная кнопка", required: false },
  ],
  html: `<section class="b-hfi03" data-block="hero">
  <img class="b-hfi03__bg" src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1600&q=80" alt="" data-field="hero-image" />
  <div class="b-hfi03__overlay"></div>
  <div class="b-hfi03__inner">
    <div class="b-hfi03__content">
      <p class="b-hfi03__eyebrow" data-field="hero-eyebrow" data-reveal="fade" style="--stagger:0">Наша миссия</p>
      <h1 data-field="hero-title" data-reveal="up" style="--stagger:1">Делаем технологии доступными каждому</h1>
      <p class="b-hfi03__desc" data-field="hero-subtitle" data-reveal="fade" style="--stagger:2">Простые инструменты для сложных задач. Более 50 000 пользователей по всему миру.</p>
      <div class="b-hfi03__actions" data-reveal="fade" style="--stagger:3">
        <a class="b-btn" href="#" data-field="hero-cta">Попробовать</a>
        <a class="b-btn b-btn--outline" href="#" data-field="hero-cta-secondary">Подробнее</a>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-hfi03{position:relative;min-height:90vh;display:flex;align-items:center;overflow:hidden}
.b-hfi03__bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0}
.b-hfi03__overlay{position:absolute;top:0;bottom:0;left:0;width:55%;background:linear-gradient(to right,color-mix(in srgb,var(--color-bg-alt) 88%,transparent) 0%,color-mix(in srgb,var(--color-bg-alt) 75%,transparent) 70%,transparent 100%);z-index:1}
.b-hfi03__inner{position:relative;z-index:2;max-width:var(--container-width,1400px);width:100%;margin:0 auto;padding:var(--space-section) var(--space-block)}
.b-hfi03__content{max-width:520px}
.b-hfi03__eyebrow{color:var(--color-accent);font-family:var(--font-body);font-weight:700;text-transform:uppercase;letter-spacing:.12em;font-size:.8125rem;margin:0 0 1rem}
.b-hfi03 h1{font-family:var(--font-heading);font-size:clamp(2rem,4.5vw,3.75rem);color:var(--color-text-on-primary);margin:0;line-height:1.1;letter-spacing:-0.02em}
.b-hfi03__desc{color:color-mix(in srgb,var(--color-text-on-primary) 72%,transparent);font-family:var(--font-body);font-size:1.0625rem;margin:1.25rem 0 2rem;line-height:1.65}
.b-hfi03__actions{display:flex;gap:1rem;flex-wrap:wrap}
.b-btn{display:inline-flex;align-items:center;min-height:52px;padding:0 2rem;border-radius:var(--radius-md);background:var(--color-primary);color:var(--color-text-on-primary);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;transition:transform .3s cubic-bezier(.16,1,.3,1),opacity .3s}
.b-btn:hover{transform:translateY(-2px);opacity:.9}
.b-btn--outline{background:transparent;border:2px solid color-mix(in srgb,var(--color-text-on-primary) 40%,transparent);color:var(--color-text-on-primary)}
.b-btn--outline:hover{border-color:var(--color-text-on-primary)}
@media(max-width:767px){.b-hfi03__overlay{width:100%}.b-hfi03{min-height:80vh}.b-hfi03__inner{padding:3rem 1.25rem}}
@media(min-width:1024px){.b-hfi03__overlay{width:50%}}`,
  variants: [
    { id: "default", label: "Тёмный сплит", css: "" },
    { id: "right-text", label: "Текст справа", css: `.b-hfi03__overlay{left:auto;right:0;background:linear-gradient(to left,color-mix(in srgb,var(--color-bg-alt) 88%,transparent) 0%,color-mix(in srgb,var(--color-bg-alt) 75%,transparent) 70%,transparent 100%)}.b-hfi03__content{margin-left:auto}` },
    { id: "primary-split", label: "Брендовый сплит", css: `.b-hfi03__overlay{background:linear-gradient(to right,color-mix(in srgb,var(--color-primary) 90%,transparent) 0%,color-mix(in srgb,var(--color-primary) 70%,transparent) 70%,transparent 100%)}` },
  ],
};
