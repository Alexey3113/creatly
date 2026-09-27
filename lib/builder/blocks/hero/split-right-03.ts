import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-split-right-03",
  name: "Hero — видео слева, текст справа",
  description: "Видеоплеер 16:9 с оверлеем кнопки воспроизведения слева + заголовок и описание справа",
  category: "hero",
  subcategory: "split-right",
  icon: "⬔",
  tags: ["split", "video", "play-button", "embed", "cta"],
  motionLevel: "css",
  fields: [
    { name: "hero-image", type: "image", hint: "постер/превью видео, 16:9", required: true },
    { name: "hero-eyebrow", type: "text", hint: "лейбл над заголовком", required: false },
    { name: "hero-title", type: "heading", hint: "заголовок 4-8 слов", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание 1-2 предложения", required: true },
    { name: "hero-cta", type: "link", hint: "текст CTA-кнопки", required: true },
  ],
  html: `<section class="b-hsr03" data-block="hero">
  <div class="b-hsr03__inner">
    <div class="b-hsr03__video" data-reveal="fade" style="--stagger:0">
      <img src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1600&q=80" alt="" data-field="hero-image" />
      <button class="b-hsr03__play" aria-label="Play video">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="var(--color-primary)" opacity=".9"/><polygon points="26,20 26,44 46,32" fill="var(--color-text-on-primary)"/></svg>
      </button>
    </div>
    <div class="b-hsr03__content">
      <p class="b-hsr03__eyebrow" data-field="hero-eyebrow" data-reveal="fade" style="--stagger:1">Смотреть демо</p>
      <h1 data-field="hero-title" data-reveal="up" style="--stagger:2">Узнайте, как это работает за 2 минуты</h1>
      <p class="b-hsr03__desc" data-field="hero-subtitle" data-reveal="fade" style="--stagger:3">Короткое видео покажет все ключевые возможности продукта — от настройки до первых результатов.</p>
      <a class="b-btn" href="#" data-field="hero-cta" data-reveal="fade" style="--stagger:4">Начать бесплатно</a>
    </div>
  </div>
</section>`,
  css: `.b-hsr03{min-height:80vh;display:flex;align-items:center;padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-hsr03__inner{max-width:var(--container-width,1400px);margin:0 auto;display:flex;align-items:center;gap:clamp(2rem,5vw,5rem);width:100%}
.b-hsr03__video{flex:1 1 55%;position:relative;border-radius:var(--radius-lg);overflow:hidden;box-shadow:0 16px 48px color-mix(in srgb,var(--color-text) 10%,transparent)}
.b-hsr03__video img{width:100%;height:auto;display:block;aspect-ratio:16/9;object-fit:cover}
.b-hsr03__play{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:none;border:none;cursor:pointer;transition:transform .3s cubic-bezier(.16,1,.3,1)}
.b-hsr03__play:hover{transform:translate(-50%,-50%) scale(1.1)}
.b-hsr03__content{flex:1 1 40%}
.b-hsr03__eyebrow{color:var(--color-primary);font-family:var(--font-body);font-weight:700;text-transform:uppercase;letter-spacing:.12em;font-size:.8125rem;margin:0 0 1rem}
.b-hsr03 h1{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,3rem);color:var(--color-text);margin:0;line-height:1.12;letter-spacing:-0.02em}
.b-hsr03__desc{color:var(--color-text-muted);font-family:var(--font-body);font-size:1.0625rem;margin:1.25rem 0 2rem;line-height:1.65;max-width:480px}
.b-btn{display:inline-flex;align-items:center;min-height:52px;padding:0 2rem;border-radius:var(--radius-md);background:var(--color-primary);color:var(--color-text-on-primary);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;transition:transform .3s cubic-bezier(.16,1,.3,1),opacity .3s}
.b-btn:hover{transform:translateY(-2px);opacity:.9}
@media(max-width:767px){.b-hsr03__inner{flex-direction:column}.b-hsr03{min-height:auto;padding:3rem 1.25rem}}`,
  variants: [
    { id: "default", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-hsr03{background:var(--color-bg-alt)}` },
    { id: "surface", label: "Поверхность", css: `.b-hsr03{background:var(--color-surface)}.b-hsr03__video{box-shadow:0 8px 32px color-mix(in srgb,var(--color-text) 8%,transparent)}` },
  ],
};
