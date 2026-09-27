import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-split-left-01",
  name: "Hero — текст слева, фото справа",
  description: "Классический сплит: текст (60%) слева + изображение (40%) справа с вертикальным центрированием",
  category: "hero",
  subcategory: "split-left",
  icon: "◧",
  tags: ["split", "image", "classic", "left-text", "cta"],
  motionLevel: "css",
  fields: [
    { name: "hero-eyebrow", type: "text", hint: "короткий лейбл 2-3 слова", required: false },
    { name: "hero-title", type: "heading", hint: "главный заголовок 5-8 слов", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание 1-2 предложения", required: true },
    { name: "hero-cta", type: "link", hint: "текст CTA-кнопки", required: true },
    { name: "hero-image", type: "image", hint: "изображение справа, портрет или квадрат", required: true },
  ],
  html: `<section class="b-hsl01" data-block="hero">
  <div class="b-hsl01__inner">
    <div class="b-hsl01__text">
      <p class="b-hsl01__eyebrow" data-field="hero-eyebrow" data-reveal="fade">О нас</p>
      <h1 class="b-hsl01__title" data-field="hero-title" data-reveal="up">Мы превращаем идеи в цифровые продукты</h1>
      <p class="b-hsl01__desc" data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">Команда из 30 специалистов с опытом в e-commerce, fintech и EdTech. Работаем по Agile, запускаем MVP за 6 недель.</p>
      <a class="b-hsl01__btn" href="#" data-field="hero-cta" data-reveal="fade" style="--stagger:2">Связаться с нами</a>
    </div>
    <div class="b-hsl01__media" data-reveal="clip">
      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" alt="" data-field="hero-image"/>
    </div>
  </div>
</section>`,
  css: `.b-hsl01{background:var(--color-bg);min-height:90vh;display:flex;align-items:center;padding:var(--space-section) var(--space-block)}
.b-hsl01__inner{max-width:var(--container-width,1400px);width:100%;margin:0 auto;display:grid;grid-template-columns:1.5fr 1fr;gap:clamp(2rem,5vw,5rem);align-items:center;padding:0 clamp(1rem,3vw,3rem)}
.b-hsl01__text{max-width:600px}
.b-hsl01__eyebrow{color:var(--color-primary);font-family:var(--font-body);font-weight:700;text-transform:uppercase;letter-spacing:.12em;font-size:.8125rem;margin:0 0 1.25rem}
.b-hsl01__title{font-family:var(--font-heading);font-size:clamp(2rem,4vw,3.5rem);color:var(--color-text);margin:0;line-height:1.1;letter-spacing:-0.02em}
.b-hsl01__desc{color:var(--color-text-muted);font-family:var(--font-body);font-size:1.0625rem;margin:1.25rem 0 2rem;line-height:1.7;max-width:480px}
.b-hsl01__btn{display:inline-flex;align-items:center;min-height:52px;padding:0 2rem;border-radius:var(--radius-md);background:var(--color-primary);color:var(--color-text-on-primary);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;transition:transform .3s cubic-bezier(.16,1,.3,1),opacity .3s}
.b-hsl01__btn:hover{transform:translateY(-2px);opacity:.9}
.b-hsl01__media{border-radius:var(--radius-lg);overflow:hidden}
.b-hsl01__media img{display:block;width:100%;height:100%;object-fit:cover;aspect-ratio:4/5}
@media(max-width:768px){.b-hsl01{min-height:auto;padding:3rem 1.25rem}.b-hsl01__inner{grid-template-columns:1fr;gap:2.5rem}.b-hsl01__media{order:-1}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-hsl01{background:var(--color-primary)}.b-hsl01__eyebrow{color:var(--color-accent)}.b-hsl01__title{color:var(--color-text-on-primary)}.b-hsl01__desc{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-hsl01__btn{background:var(--color-accent);color:var(--color-text-on-accent)}` },
    { id: "accent", label: "Акцентный фон", css: `.b-hsl01{background:var(--color-bg-alt)}` },
  ],
};
