import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-split-right-01",
  name: "Hero — изображение слева, текст справа",
  description: "Скруглённое изображение с тенью слева + заголовок, описание и CTA справа",
  category: "hero",
  subcategory: "split-right",
  icon: "⬔",
  tags: ["split", "image-left", "cta", "rounded", "shadow"],
  motionLevel: "css",
  fields: [
    { name: "hero-image", type: "image", hint: "основное изображение, мин. 800×600", required: true },
    { name: "hero-eyebrow", type: "text", hint: "короткий лейбл 2-3 слова", required: false },
    { name: "hero-title", type: "heading", hint: "заголовок 5-8 слов", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание 1-2 предложения", required: true },
    { name: "hero-cta", type: "link", hint: "текст CTA-кнопки 2-4 слова", required: true },
    { name: "hero-cta-secondary", type: "link", hint: "вторичная кнопка 2-4 слова", required: false },
  ],
  html: `<section class="b-hsr01" data-block="hero">
  <div class="b-hsr01__inner">
    <div class="b-hsr01__media" data-reveal="fade" style="--stagger:0">
      <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80" alt="" data-field="hero-image" />
    </div>
    <div class="b-hsr01__content">
      <p class="b-hsr01__eyebrow" data-field="hero-eyebrow" data-reveal="fade" style="--stagger:1">Новый релиз</p>
      <h1 data-field="hero-title" data-reveal="up" style="--stagger:2">Продукт, который меняет правила игры</h1>
      <p class="b-hsr01__desc" data-field="hero-subtitle" data-reveal="fade" style="--stagger:3">Удобный, быстрый и безопасный инструмент для вашего бизнеса. Более 10 000 компаний уже оценили.</p>
      <div class="b-hsr01__actions" data-reveal="fade" style="--stagger:4">
        <a class="b-btn" href="#" data-field="hero-cta">Попробовать бесплатно</a>
        <a class="b-btn b-btn--ghost" href="#" data-field="hero-cta-secondary">Узнать больше</a>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-hsr01{min-height:85vh;display:flex;align-items:center;padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-hsr01__inner{max-width:var(--container-width,1400px);margin:0 auto;display:flex;align-items:center;gap:clamp(2rem,5vw,5rem);width:100%}
.b-hsr01__media{flex:1 1 50%}
.b-hsr01__media img{width:100%;height:auto;display:block;border-radius:var(--radius-lg);box-shadow:0 20px 60px color-mix(in srgb,var(--color-text) 12%,transparent);object-fit:cover;aspect-ratio:4/3}
.b-hsr01__content{flex:1 1 45%}
.b-hsr01__eyebrow{color:var(--color-primary);font-family:var(--font-body);font-weight:700;text-transform:uppercase;letter-spacing:.12em;font-size:.8125rem;margin:0 0 1rem}
.b-hsr01 h1{font-family:var(--font-heading);font-size:clamp(2rem,4vw,3.5rem);color:var(--color-text);margin:0;line-height:1.1;letter-spacing:-0.02em}
.b-hsr01__desc{color:var(--color-text-muted);font-family:var(--font-body);font-size:1.125rem;margin:1.25rem 0 2rem;line-height:1.65;max-width:520px}
.b-hsr01__actions{display:flex;gap:1rem;flex-wrap:wrap}
.b-btn{display:inline-flex;align-items:center;min-height:52px;padding:0 2rem;border-radius:var(--radius-md);background:var(--color-primary);color:var(--color-text-on-primary);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;transition:transform .3s cubic-bezier(.16,1,.3,1),opacity .3s}
.b-btn:hover{transform:translateY(-2px);opacity:.9}
.b-btn--ghost{background:transparent;color:var(--color-primary);border:2px solid var(--color-border)}
.b-btn--ghost:hover{border-color:var(--color-primary)}
@media(max-width:767px){.b-hsr01__inner{flex-direction:column}.b-hsr01{min-height:auto;padding:3rem 1.25rem}}`,
  variants: [
    { id: "default", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-hsr01{background:var(--color-bg-alt)}.b-hsr01 h1{color:var(--color-text)}.b-hsr01__desc{color:var(--color-text-muted)}` },
    { id: "accent-bg", label: "Акцентный фон", css: `.b-hsr01{background:var(--color-primary)}.b-hsr01 h1{color:var(--color-text-on-primary)}.b-hsr01__eyebrow{color:var(--color-accent)}.b-hsr01__desc{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-btn{background:var(--color-accent);color:var(--color-text-on-accent)}.b-btn--ghost{color:var(--color-text-on-primary);border-color:color-mix(in srgb,var(--color-text-on-primary) 30%,transparent)}` },
  ],
};
