import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-full-image-05",
  name: "Hero — параллакс-фон, индикатор прокрутки",
  description: "Фоновое изображение с data-parallax атрибутом, центрированный текст и индикатор прокрутки внизу",
  category: "hero",
  subcategory: "full-image",
  icon: "◼",
  tags: ["full-image", "parallax", "scroll-indicator", "centered", "immersive"],
  motionLevel: "css",
  fields: [
    { name: "hero-image", type: "image", hint: "фоновое изображение, мин. 1920×1200 (высокое для параллакса)", required: true },
    { name: "hero-eyebrow", type: "text", hint: "короткий лейбл", required: false },
    { name: "hero-title", type: "heading", hint: "заголовок 3-7 слов", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание 1-2 предложения", required: true },
    { name: "hero-cta", type: "link", hint: "текст CTA-кнопки", required: true },
  ],
  html: `<section class="b-hfi05" data-block="hero">
  <div class="b-hfi05__bg-wrap" data-parallax="0.3">
    <img class="b-hfi05__bg" src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1600&q=80" alt="" data-field="hero-image" />
  </div>
  <div class="b-hfi05__overlay"></div>
  <div class="b-hfi05__inner">
    <p class="b-hfi05__eyebrow" data-field="hero-eyebrow" data-reveal="fade" style="--stagger:0">Откройте для себя</p>
    <h1 data-field="hero-title" data-reveal="up" style="--stagger:1">Погрузитесь в мир возможностей</h1>
    <p class="b-hfi05__desc" data-field="hero-subtitle" data-reveal="fade" style="--stagger:2">Интерактивный опыт, который вдохновляет и помогает достигать целей.</p>
    <a class="b-btn" href="#" data-field="hero-cta" data-reveal="fade" style="--stagger:3">Исследовать</a>
  </div>
  <div class="b-hfi05__scroll" data-reveal="fade" style="--stagger:4" aria-hidden="true">
    <span class="b-hfi05__scroll-text">Прокрутите вниз</span>
    <span class="b-hfi05__scroll-line"></span>
  </div>
</section>`,
  css: `.b-hfi05{position:relative;min-height:90vh;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden}
.b-hfi05__bg-wrap{position:absolute;inset:-15% 0;z-index:0;will-change:transform}
.b-hfi05__bg{width:100%;height:100%;object-fit:cover;display:block}
.b-hfi05__overlay{position:absolute;inset:0;background:color-mix(in srgb,var(--color-bg-alt) 55%,transparent);z-index:1}
.b-hfi05__inner{position:relative;z-index:2;max-width:860px;padding:var(--space-section) var(--space-block)}
.b-hfi05__eyebrow{color:var(--color-accent);font-family:var(--font-body);font-weight:700;text-transform:uppercase;letter-spacing:.14em;font-size:.8125rem;margin:0 0 1.25rem}
.b-hfi05 h1{font-family:var(--font-heading);font-size:clamp(2.5rem,6vw,4.5rem);color:var(--color-text-on-primary);margin:0;line-height:1.08;letter-spacing:-0.03em}
.b-hfi05__desc{color:color-mix(in srgb,var(--color-text-on-primary) 72%,transparent);font-family:var(--font-body);font-size:1.125rem;margin:1.25rem auto 2.5rem;line-height:1.65;max-width:560px}
.b-btn{display:inline-flex;align-items:center;min-height:56px;padding:0 2.5rem;border-radius:var(--radius-md);background:var(--color-accent);color:var(--color-text-on-accent);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:1rem;transition:transform .3s cubic-bezier(.16,1,.3,1),opacity .3s}
.b-btn:hover{transform:translateY(-2px);opacity:.9}
.b-hfi05__scroll{position:absolute;bottom:2rem;left:50%;transform:translateX(-50%);z-index:2;display:flex;flex-direction:column;align-items:center;gap:.75rem}
.b-hfi05__scroll-text{font-family:var(--font-body);font-size:.6875rem;text-transform:uppercase;letter-spacing:.15em;color:color-mix(in srgb,var(--color-text-on-primary) 60%,transparent)}
.b-hfi05__scroll-line{width:1px;height:40px;background:color-mix(in srgb,var(--color-text-on-primary) 40%,transparent);position:relative;overflow:hidden}
.b-hfi05__scroll-line::after{content:"";position:absolute;top:-100%;left:0;width:100%;height:100%;background:var(--color-accent);animation:b-hfi05-scroll 2s ease-in-out infinite}
@keyframes b-hfi05-scroll{0%{top:-100%}50%{top:100%}100%{top:100%}}
@media(max-width:767px){.b-hfi05{min-height:85vh}.b-hfi05__inner{padding:3rem 1.25rem}.b-hfi05__scroll{bottom:1.5rem}}`,
  variants: [
    { id: "default", label: "Тёмный", css: "" },
    { id: "light", label: "Светлый оверлей", css: `.b-hfi05__overlay{background:color-mix(in srgb,var(--color-bg) 65%,transparent)}.b-hfi05 h1{color:var(--color-text)}.b-hfi05__desc{color:var(--color-text-muted)}.b-hfi05__scroll-text{color:var(--color-text-muted)}.b-hfi05__scroll-line{background:var(--color-border)}` },
    { id: "no-overlay", label: "Без оверлея", css: `.b-hfi05__overlay{background:transparent}.b-hfi05 h1{text-shadow:0 2px 20px color-mix(in srgb,var(--color-bg-alt) 60%,transparent)}.b-hfi05__desc{text-shadow:0 1px 10px color-mix(in srgb,var(--color-bg-alt) 50%,transparent)}` },
  ],
};
