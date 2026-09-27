import type { BlockPreset } from "../_types";

/**
 * Фичи: неоновые glow-карточки (паттерн «Glow Features»):
 * тёмная секция, карточки с градиентной неоновой рамкой (conic-gradient
 * через border-маску) и мягким свечением, у каждой карточки свой оттенок.
 */
export const block: BlockPreset = {
  id: "features-glow-01",
  name: "Неоновые карточки",
  description: "Тёмная секция с карточками в неоновых градиентных рамках — у каждой свой оттенок свечения. Техно/гейминг/диджитал-вайб.",
  category: "features",
  subcategory: "glow",
  icon: "◈",
  tags: ["features", "glow", "neon", "gradient-border", "dark", "tech", "wow", "premium"],
  motionLevel: "css",
  fields: [
    { name: "fg01-eyebrow", type: "text", hint: "рубрика, 2-4 слова", required: false },
    { name: "fg01-title", type: "heading", hint: "заголовок секции, 2-6 слов", required: true },
    { name: "fg01-card-icon", type: "icon", hint: "эмодзи/символ", required: false },
    { name: "fg01-card-title", type: "heading", hint: "заголовок карточки, 1-3 слова", required: true },
    { name: "fg01-card-text", type: "text", hint: "текст карточки, 1-2 предложения", required: true },
  ],
  html: `<section class="b-fg01" data-block="features">
  <div class="b-fg01__inner">
    <span class="b-fg01__eyebrow" data-field="fg01-eyebrow" data-reveal="fade">Экосистема</span>
    <h2 class="b-fg01__title" data-field="fg01-title" data-reveal="word">Всё связано и светится</h2>
    <div class="b-fg01__grid" data-collection="fg01-cards">
      <article class="b-fg01__card" style="--glow:#38bdf8" data-collection-item data-reveal="up">
        <span class="b-fg01__icon" data-field="fg01-card-icon">🖥</span>
        <h3 data-field="fg01-card-title">Hardware</h3>
        <p data-field="fg01-card-text">Железо, которое не подводит: тихое, мощное, всегда под рукой.</p>
      </article>
      <article class="b-fg01__card" style="--glow:#a78bfa" data-collection-item data-reveal="up" style="--stagger:1">
        <span class="b-fg01__icon" data-field="fg01-card-icon">🎛</span>
        <h3 data-field="fg01-card-title">Studio</h3>
        <p data-field="fg01-card-text">Пространство, где каждый пиксель определён. Хаб всех процессов.</p>
      </article>
      <article class="b-fg01__card" style="--glow:#f472b6" data-collection-item data-reveal="up" style="--stagger:2">
        <span class="b-fg01__icon" data-field="fg01-card-icon">⚡</span>
        <h3 data-field="fg01-card-title">Motion</h3>
        <p data-field="fg01-card-text">Живые прототипы, которые сокращают путь от идеи до кода.</p>
      </article>
    </div>
  </div>
</section>`,
  css: `.b-fg01{padding:var(--space-section) var(--space-block);background:#0a0a10}
.b-fg01__inner{max-width:var(--container-width,1400px);margin:0 auto;text-align:center}
.b-fg01__eyebrow{display:block;font-family:var(--font-body);font-size:.8125rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--color-accent);margin-bottom:1rem}
.b-fg01__title{font-family:var(--font-heading);font-size:clamp(1.85rem,3.6vw,2.9rem);letter-spacing:-.02em;color:#fff;margin:0 0 3rem}
.b-fg01__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.75rem}
.b-fg01__card{position:relative;padding:2.5rem 2rem;border-radius:var(--radius-lg);background:#0f0f16;text-align:left;border:1px solid transparent;background-clip:padding-box;transition:transform .35s cubic-bezier(.16,1,.3,1)}
.b-fg01__card::before{content:"";position:absolute;inset:-1px;border-radius:inherit;padding:1px;background:linear-gradient(135deg,var(--glow,#38bdf8),transparent 40%,transparent 60%,var(--glow,#38bdf8));-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
.b-fg01__card::after{content:"";position:absolute;inset:0;border-radius:inherit;box-shadow:0 0 60px -18px var(--glow,#38bdf8);opacity:.35;transition:opacity .35s;pointer-events:none}
.b-fg01__card:hover{transform:translateY(-6px)}
.b-fg01__card:hover::after{opacity:.7}
.b-fg01__icon{font-size:1.4rem;display:inline-flex;align-items:center;justify-content:center;width:3rem;height:3rem;border-radius:var(--radius-md);background:color-mix(in srgb,var(--glow,#38bdf8) 16%,transparent);margin-bottom:1.4rem}
.b-fg01__card h3{font-family:var(--font-heading);font-size:1.2rem;color:#fff;margin:0 0 .55rem}
.b-fg01__card p{font-family:var(--font-body);font-size:.9rem;color:rgba(255,255,255,.55);line-height:1.65;margin:0}
@media(max-width:768px){.b-fg01__grid{grid-template-columns:1fr}}`,
  variants: [
    { id: "dark", label: "Тёмный", css: "" },
    { id: "mono", label: "Один оттенок (акцент)", css: `.b-fg01__card{--glow:var(--color-accent)!important}` },
  ],
};
