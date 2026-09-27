import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-full-image-04",
  name: "Hero — дуотон эффект, акцентный заголовок",
  description: "Фоновое изображение с CSS-фильтром дуотона, центрированный текст с акцентным подчёркиванием",
  category: "hero",
  subcategory: "full-image",
  icon: "◼",
  tags: ["full-image", "duotone", "filter", "accent-underline", "centered"],
  motionLevel: "css",
  fields: [
    { name: "hero-image", type: "image", hint: "фоновое изображение, мин. 1920×1080", required: true },
    { name: "hero-eyebrow", type: "text", hint: "лейбл над заголовком", required: false },
    { name: "hero-title", type: "heading", hint: "заголовок 3-7 слов", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание 1-2 предложения", required: true },
    { name: "hero-cta", type: "link", hint: "текст CTA-кнопки", required: true },
  ],
  html: `<section class="b-hfi04" data-block="hero">
  <div class="b-hfi04__bg-wrap">
    <img class="b-hfi04__bg" src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1600&q=80" alt="" data-field="hero-image" />
  </div>
  <div class="b-hfi04__overlay"></div>
  <div class="b-hfi04__inner">
    <p class="b-hfi04__eyebrow" data-field="hero-eyebrow" data-reveal="fade" style="--stagger:0">Инновация</p>
    <h1 data-field="hero-title" data-reveal="up" style="--stagger:1"><span class="b-hfi04__title-text">Будущее начинается здесь</span></h1>
    <p class="b-hfi04__desc" data-field="hero-subtitle" data-reveal="fade" style="--stagger:2">Присоединяйтесь к тысячам компаний, которые уже трансформируют свой бизнес.</p>
    <a class="b-btn" href="#" data-field="hero-cta" data-reveal="fade" style="--stagger:3">Присоединиться</a>
  </div>
</section>`,
  css: `.b-hfi04{position:relative;min-height:90vh;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden}
.b-hfi04__bg-wrap{position:absolute;inset:0;z-index:0;filter:grayscale(1) contrast(1.1)}
.b-hfi04__bg-wrap::after{content:"";position:absolute;inset:0;background:color-mix(in srgb,var(--color-primary) 45%,transparent);mix-blend-mode:multiply}
.b-hfi04__bg{width:100%;height:100%;object-fit:cover;display:block}
.b-hfi04__overlay{position:absolute;inset:0;background:color-mix(in srgb,var(--color-bg-alt) 40%,transparent);z-index:1}
.b-hfi04__inner{position:relative;z-index:2;max-width:850px;padding:var(--space-section) var(--space-block)}
.b-hfi04__eyebrow{color:var(--color-accent);font-family:var(--font-body);font-weight:700;text-transform:uppercase;letter-spacing:.14em;font-size:.8125rem;margin:0 0 1.25rem}
.b-hfi04 h1{font-family:var(--font-heading);font-size:clamp(2.5rem,6vw,5rem);color:var(--color-text-on-primary);margin:0;line-height:1.08;letter-spacing:-0.03em}
.b-hfi04__title-text{display:inline;background-image:linear-gradient(var(--color-accent),var(--color-accent));background-size:100% 4px;background-position:0 92%;background-repeat:no-repeat;padding-bottom:.08em}
.b-hfi04__desc{color:color-mix(in srgb,var(--color-text-on-primary) 75%,transparent);font-family:var(--font-body);font-size:1.125rem;margin:1.5rem auto 2.5rem;line-height:1.65;max-width:560px}
.b-btn{display:inline-flex;align-items:center;min-height:56px;padding:0 2.5rem;border-radius:var(--radius-md);background:var(--color-accent);color:var(--color-text-on-accent);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:1rem;transition:transform .3s cubic-bezier(.16,1,.3,1),opacity .3s}
.b-btn:hover{transform:translateY(-2px);opacity:.9}
@media(max-width:767px){.b-hfi04{min-height:80vh}.b-hfi04__inner{padding:3rem 1.25rem}}`,
  variants: [
    { id: "default", label: "Дуотон + основной", css: "" },
    { id: "accent-duotone", label: "Дуотон + акцент", css: `.b-hfi04__bg-wrap::after{background:color-mix(in srgb,var(--color-accent) 40%,transparent)}` },
    { id: "sepia", label: "Сепия", css: `.b-hfi04__bg-wrap{filter:sepia(.7) contrast(1.05)}.b-hfi04__bg-wrap::after{display:none}` },
  ],
};
