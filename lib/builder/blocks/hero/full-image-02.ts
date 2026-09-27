import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-full-image-02",
  name: "Hero — полноэкранное фото, текст внизу",
  description: "Фоновое изображение с градиентом снизу вверх, текст в нижней трети",
  category: "hero",
  subcategory: "full-image",
  icon: "◼",
  tags: ["full-image", "gradient", "bottom-text", "cinematic"],
  motionLevel: "css",
  fields: [
    { name: "hero-image", type: "image", hint: "фоновое изображение, мин. 1920×1080", required: true },
    { name: "hero-eyebrow", type: "text", hint: "короткий лейбл", required: false },
    { name: "hero-title", type: "heading", hint: "заголовок 4-8 слов", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание 1-2 предложения", required: true },
    { name: "hero-cta", type: "link", hint: "текст CTA-кнопки", required: true },
  ],
  html: `<section class="b-hfi02" data-block="hero">
  <img class="b-hfi02__bg" src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1600&q=80" alt="" data-field="hero-image" />
  <div class="b-hfi02__gradient"></div>
  <div class="b-hfi02__inner">
    <p class="b-hfi02__eyebrow" data-field="hero-eyebrow" data-reveal="fade" style="--stagger:0">Премиум решение</p>
    <h1 data-field="hero-title" data-reveal="up" style="--stagger:1">Визуальное повествование нового уровня</h1>
    <p class="b-hfi02__desc" data-field="hero-subtitle" data-reveal="fade" style="--stagger:2">Платформа для брендов, которые хотят выделяться в насыщенном информационном потоке.</p>
    <a class="b-btn" href="#" data-field="hero-cta" data-reveal="fade" style="--stagger:3">Посмотреть кейсы</a>
  </div>
</section>`,
  css: `.b-hfi02{position:relative;min-height:90vh;display:flex;align-items:flex-end;overflow:hidden}
.b-hfi02__bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0}
.b-hfi02__gradient{position:absolute;inset:0;background:linear-gradient(to top,color-mix(in srgb,var(--color-bg-alt) 90%,transparent) 0%,color-mix(in srgb,var(--color-bg-alt) 50%,transparent) 40%,transparent 70%);z-index:1}
.b-hfi02__inner{position:relative;z-index:2;max-width:var(--container-width,1400px);width:100%;margin:0 auto;padding:0 var(--space-block) clamp(3rem,8vh,6rem)}
.b-hfi02__eyebrow{color:var(--color-accent);font-family:var(--font-body);font-weight:700;text-transform:uppercase;letter-spacing:.12em;font-size:.8125rem;margin:0 0 1rem}
.b-hfi02 h1{font-family:var(--font-heading);font-size:clamp(2rem,5vw,4rem);color:var(--color-text-on-primary);margin:0;line-height:1.1;letter-spacing:-0.02em;max-width:700px}
.b-hfi02__desc{color:color-mix(in srgb,var(--color-text-on-primary) 75%,transparent);font-family:var(--font-body);font-size:1.125rem;margin:1rem 0 2rem;line-height:1.6;max-width:540px}
.b-btn{display:inline-flex;align-items:center;min-height:52px;padding:0 2rem;border-radius:var(--radius-md);background:var(--color-accent);color:var(--color-text-on-accent);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;transition:transform .3s cubic-bezier(.16,1,.3,1),opacity .3s}
.b-btn:hover{transform:translateY(-2px);opacity:.9}
@media(max-width:767px){.b-hfi02{min-height:80vh}.b-hfi02__inner{padding:0 1.25rem 2.5rem}}`,
  variants: [
    { id: "default", label: "Тёмный градиент", css: "" },
    { id: "light-gradient", label: "Светлый градиент", css: `.b-hfi02__gradient{background:linear-gradient(to top,color-mix(in srgb,var(--color-bg) 95%,transparent) 0%,color-mix(in srgb,var(--color-bg) 50%,transparent) 40%,transparent 70%)}.b-hfi02 h1{color:var(--color-text)}.b-hfi02__desc{color:var(--color-text-muted)}` },
    { id: "primary-gradient", label: "Брендовый градиент", css: `.b-hfi02__gradient{background:linear-gradient(to top,color-mix(in srgb,var(--color-primary) 92%,transparent) 0%,color-mix(in srgb,var(--color-primary) 40%,transparent) 45%,transparent 75%)}` },
  ],
};
