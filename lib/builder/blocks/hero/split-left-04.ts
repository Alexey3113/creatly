import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-split-left-04",
  name: "Hero — текст + каскад изображений",
  description: "Текст слева, справа — три перекрывающихся изображения с поворотом и смещением",
  category: "hero",
  subcategory: "split-left",
  icon: "◪",
  tags: ["split", "stacked-images", "creative", "overlap", "gallery"],
  motionLevel: "css",
  fields: [
    { name: "hero-eyebrow", type: "text", hint: "короткий лейбл", required: false },
    { name: "hero-title", type: "heading", hint: "главный заголовок 5-8 слов", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание 1-2 предложения", required: true },
    { name: "hero-cta", type: "link", hint: "текст CTA-кнопки", required: true },
    { name: "hero-image-1", type: "image", hint: "основное изображение (переднее)", required: true },
    { name: "hero-image-2", type: "image", hint: "второе изображение (среднее)", required: true },
    { name: "hero-image-3", type: "image", hint: "третье изображение (заднее)", required: true },
  ],
  html: `<section class="b-hsl04" data-block="hero">
  <div class="b-hsl04__inner">
    <div class="b-hsl04__text">
      <p class="b-hsl04__eyebrow" data-field="hero-eyebrow" data-reveal="fade">Creative Studio</p>
      <h1 class="b-hsl04__title" data-field="hero-title" data-reveal="up">Визуальные истории для смелых брендов</h1>
      <p class="b-hsl04__desc" data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">Фотография, видео и дизайн — создаём контент, который вызывает эмоции и побуждает к действию.</p>
      <a class="b-hsl04__btn" href="#" data-field="hero-cta" data-reveal="fade" style="--stagger:2">Смотреть работы</a>
    </div>
    <div class="b-hsl04__gallery" data-reveal="fade" style="--stagger:1">
      <div class="b-hsl04__img b-hsl04__img--3">
        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" alt="" data-field="hero-image-3"/>
      </div>
      <div class="b-hsl04__img b-hsl04__img--2">
        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80" alt="" data-field="hero-image-2"/>
      </div>
      <div class="b-hsl04__img b-hsl04__img--1">
        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80" alt="" data-field="hero-image-1"/>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-hsl04{background:var(--color-bg);min-height:90vh;display:flex;align-items:center;padding:var(--space-section) var(--space-block);overflow:hidden}
.b-hsl04__inner{max-width:var(--container-width,1400px);width:100%;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:clamp(2rem,4vw,4rem);align-items:center;padding:0 clamp(1rem,3vw,3rem)}
.b-hsl04__text{max-width:520px}
.b-hsl04__eyebrow{color:var(--color-accent);font-family:var(--font-body);font-weight:700;text-transform:uppercase;letter-spacing:.12em;font-size:.8125rem;margin:0 0 1.25rem}
.b-hsl04__title{font-family:var(--font-heading);font-size:clamp(2rem,4vw,3.25rem);color:var(--color-text);margin:0;line-height:1.12;letter-spacing:-0.02em}
.b-hsl04__desc{color:var(--color-text-muted);font-family:var(--font-body);font-size:1.0625rem;margin:1.25rem 0 2rem;line-height:1.7}
.b-hsl04__btn{display:inline-flex;align-items:center;min-height:52px;padding:0 2rem;border-radius:var(--radius-md);background:var(--color-primary);color:var(--color-text-on-primary);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;transition:transform .3s cubic-bezier(.16,1,.3,1),opacity .3s}
.b-hsl04__btn:hover{transform:translateY(-2px);opacity:.9}
.b-hsl04__gallery{position:relative;height:clamp(400px,50vw,550px);display:flex;align-items:center;justify-content:center}
.b-hsl04__img{position:absolute;border-radius:var(--radius-lg);overflow:hidden;box-shadow:0 8px 32px color-mix(in srgb,var(--color-text) 12%,transparent);transition:transform .5s cubic-bezier(.16,1,.3,1)}
.b-hsl04__img img{display:block;width:100%;height:100%;object-fit:cover}
.b-hsl04__img--1{width:55%;aspect-ratio:4/5;z-index:3;transform:rotate(2deg) translate(5%,0)}
.b-hsl04__img--2{width:50%;aspect-ratio:4/5;z-index:2;transform:rotate(-4deg) translate(-20%,8%)}
.b-hsl04__img--3{width:45%;aspect-ratio:4/5;z-index:1;transform:rotate(6deg) translate(25%,-10%)}
.b-hsl04__gallery:hover .b-hsl04__img--1{transform:rotate(0deg) translate(5%,0)}
.b-hsl04__gallery:hover .b-hsl04__img--2{transform:rotate(-1deg) translate(-22%,8%)}
.b-hsl04__gallery:hover .b-hsl04__img--3{transform:rotate(2deg) translate(28%,-10%)}
@media(max-width:768px){.b-hsl04{min-height:auto;padding:3rem 1.25rem}.b-hsl04__inner{grid-template-columns:1fr;gap:2.5rem}.b-hsl04__gallery{height:350px;order:-1}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-hsl04{background:var(--color-primary)}.b-hsl04__eyebrow{color:var(--color-accent)}.b-hsl04__title{color:var(--color-text-on-primary)}.b-hsl04__desc{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-hsl04__btn{background:var(--color-accent);color:var(--color-text-on-accent)}.b-hsl04__img{box-shadow:0 8px 32px rgba(0,0,0,.3)}` },
    { id: "accent", label: "Акцентный", css: `.b-hsl04{background:var(--color-bg-alt)}.b-hsl04__img{box-shadow:0 8px 32px color-mix(in srgb,var(--color-primary) 12%,transparent)}` },
  ],
};
