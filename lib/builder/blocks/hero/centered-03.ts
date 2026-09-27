import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-centered-03",
  name: "Hero — фон-изображение",
  description: "Полноэкранное фоновое изображение с затемнением + центрированный текст + CTA",
  category: "hero",
  subcategory: "centered",
  icon: "◈",
  tags: ["centered", "image-bg", "overlay", "fullscreen", "cta"],
  motionLevel: "css",
  fields: [
    { name: "hero-bg-image", type: "image", hint: "фоновое изображение 1920x1080+", required: true },
    { name: "hero-eyebrow", type: "text", hint: "короткий лейбл 2-3 слова", required: false },
    { name: "hero-title", type: "heading", hint: "главный заголовок 4-7 слов", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание 1-2 предложения", required: true },
    { name: "hero-cta", type: "link", hint: "текст CTA-кнопки", required: true },
  ],
  html: `<section class="b-hc03" data-block="hero" data-field="hero-bg-image" style="background-image:url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1600&q=80">
  <div class="b-hc03__overlay"></div>
  <div class="b-hc03__inner">
    <p class="b-hc03__eyebrow" data-field="hero-eyebrow" data-reveal="fade">Premium Collection</p>
    <h1 class="b-hc03__title" data-field="hero-title" data-reveal="up">Откройте мир безграничных возможностей</h1>
    <p class="b-hc03__desc" data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">Премиальные решения для тех, кто ценит качество и внимание к деталям в каждом элементе.</p>
    <a class="b-hc03__btn" href="#" data-field="hero-cta" data-reveal="fade" style="--stagger:2">Узнать больше</a>
  </div>
</section>`,
  css: `.b-hc03{position:relative;text-align:center;min-height:90vh;display:flex;align-items:center;justify-content:center;background-size:cover;background-position:center;background-repeat:no-repeat;padding:var(--space-section) var(--space-block)}
.b-hc03__overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.55) 0%,rgba(0,0,0,.7) 100%);z-index:1}
.b-hc03__inner{position:relative;z-index:2;max-width:800px;margin:0 auto;padding:0 clamp(1rem,3vw,3rem)}
.b-hc03__eyebrow{color:var(--color-accent);font-family:var(--font-body);font-weight:700;text-transform:uppercase;letter-spacing:.14em;font-size:.75rem;margin:0 0 1.5rem}
.b-hc03__title{font-family:var(--font-heading);font-size:clamp(2.25rem,5vw,4rem);color:#fff;margin:0;line-height:1.1;letter-spacing:-0.02em}
.b-hc03__desc{color:rgba(255,255,255,.75);font-family:var(--font-body);font-size:1.0625rem;max-width:540px;margin:1.5rem auto 2.25rem;line-height:1.7}
.b-hc03__btn{display:inline-flex;align-items:center;min-height:52px;padding:0 2.25rem;border-radius:var(--radius-md);background:var(--color-accent);color:var(--color-text-on-accent);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;transition:transform .3s cubic-bezier(.16,1,.3,1),opacity .3s}
.b-hc03__btn:hover{transform:translateY(-2px);opacity:.9}
@media(max-width:768px){.b-hc03{min-height:80vh;padding:4rem 1.25rem}}`,
  variants: [
    { id: "dark", label: "Тёмный оверлей", css: "" },
    { id: "light", label: "Светлый оверлей", css: `.b-hc03__overlay{background:linear-gradient(180deg,rgba(255,255,255,.8) 0%,rgba(255,255,255,.9) 100%)}.b-hc03__title{color:var(--color-text)}.b-hc03__desc{color:var(--color-text-muted)}.b-hc03__eyebrow{color:var(--color-primary)}` },
    { id: "gradient", label: "Градиент", css: `.b-hc03__overlay{background:linear-gradient(135deg,rgba(0,0,0,.75) 0%,color-mix(in srgb,var(--color-primary) 40%,transparent) 100%)}` },
  ],
};
