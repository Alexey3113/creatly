import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-full-image-01",
  name: "Hero — полноэкранное фото, тёмный оверлей",
  description: "Фоновое изображение на весь экран с тёмным оверлеем, центрированный заголовок и CTA",
  category: "hero",
  subcategory: "full-image",
  icon: "◼",
  tags: ["full-image", "overlay", "dark", "centered", "minimal"],
  motionLevel: "css",
  fields: [
    { name: "hero-image", type: "image", hint: "фоновое изображение, мин. 1920×1080", required: true },
    { name: "hero-title", type: "heading", hint: "заголовок 3-7 слов, ёмкий", required: true },
    { name: "hero-cta", type: "link", hint: "текст CTA-кнопки", required: true },
  ],
  html: `<section class="b-hfi01" data-block="hero">
  <img class="b-hfi01__bg" src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1600&q=80" alt="" data-field="hero-image" />
  <div class="b-hfi01__overlay"></div>
  <div class="b-hfi01__inner">
    <h1 data-field="hero-title" data-reveal="up" style="--stagger:0">Создавайте без границ</h1>
    <a class="b-btn" href="#" data-field="hero-cta" data-reveal="fade" style="--stagger:1">Начать</a>
  </div>
</section>`,
  css: `.b-hfi01{position:relative;min-height:90vh;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden}
.b-hfi01__bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0}
.b-hfi01__overlay{position:absolute;inset:0;background:color-mix(in srgb,var(--color-bg-alt) 65%,transparent);z-index:1}
.b-hfi01__inner{position:relative;z-index:2;max-width:900px;padding:var(--space-section) var(--space-block)}
.b-hfi01 h1{font-family:var(--font-heading);font-size:clamp(2.5rem,6vw,5rem);color:var(--color-text-on-primary);margin:0 0 2rem;line-height:1.06;letter-spacing:-0.03em}
.b-btn{display:inline-flex;align-items:center;min-height:56px;padding:0 2.5rem;border-radius:var(--radius-md);background:var(--color-accent);color:var(--color-text-on-accent);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:1rem;transition:transform .3s cubic-bezier(.16,1,.3,1),opacity .3s}
.b-btn:hover{transform:translateY(-2px);opacity:.9}
@media(max-width:767px){.b-hfi01{min-height:75vh}.b-hfi01 h1{font-size:clamp(2rem,8vw,3rem)}}`,
  variants: [
    { id: "default", label: "Тёмный оверлей", css: "" },
    { id: "light-overlay", label: "Светлый оверлей", css: `.b-hfi01__overlay{background:color-mix(in srgb,var(--color-bg) 70%,transparent)}.b-hfi01 h1{color:var(--color-text)}` },
    { id: "primary-overlay", label: "Брендовый оверлей", css: `.b-hfi01__overlay{background:color-mix(in srgb,var(--color-primary) 75%,transparent)}.b-btn{background:var(--color-bg);color:var(--color-text)}` },
  ],
};
