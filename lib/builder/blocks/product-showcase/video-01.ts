import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "product-showcase-video-01",
  name: "Продукт — Видео-превью",
  description: "Крупное изображение-превью с кнопкой воспроизведения и описанием под ним",
  category: "product-showcase",
  subcategory: "video",
  icon: "▶",
  tags: ["product", "video", "preview", "play", "showcase", "demo"],
  motionLevel: "css",
  fields: [
    { name: "ps05-title", type: "heading", hint: "заголовок секции 3-6 слов", required: true },
    { name: "ps05-desc", type: "text", hint: "описание 2-3 предложения", required: true },
    { name: "ps05-poster", type: "image", hint: "постер видео 1200×675+", required: true },
    { name: "ps05-duration", type: "stat", hint: "длительность видео, напр. 2:30", required: false },
    { name: "ps05-cta", type: "link", hint: "текст под видео 3-6 слов", required: false },
  ],
  html: `<section class="b-ps05" data-block="product-showcase">
  <div class="b-ps05__inner">
    <div class="b-ps05__header" data-reveal="up">
      <h2 class="b-ps05__title" data-field="ps05-title">Посмотрите продукт в действии</h2>
      <p class="b-ps05__desc" data-field="ps05-desc">Двухминутный обзор ключевых возможностей платформы. Узнайте, как наши клиенты ускоряют работу команд и повышают продуктивность.</p>
    </div>
    <div class="b-ps05__player" data-reveal="scale">
      <div class="b-ps05__poster-wrap">
        <img class="b-ps05__poster" data-field="ps05-poster" src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80" alt="Превью видео" />
        <div class="b-ps05__overlay">
          <button class="b-ps05__play" aria-label="Воспроизвести видео">
            <span class="b-ps05__play-triangle"></span>
          </button>
          <span class="b-ps05__duration" data-field="ps05-duration">2:30</span>
        </div>
      </div>
    </div>
    <p class="b-ps05__footnote" data-field="ps05-cta" data-reveal="fade">Без регистрации — нажмите play и смотрите</p>
  </div>
</section>`,
  css: `.b-ps05{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-ps05__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-ps05__header{text-align:center;margin-bottom:2.5rem}
.b-ps05__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem;letter-spacing:-0.02em}
.b-ps05__desc{font-family:var(--font-body);font-size:1.05rem;color:var(--color-text-muted);margin:0;line-height:1.7;max-width:600px;margin-inline:auto}
.b-ps05__player{position:relative;border-radius:var(--radius-lg);overflow:hidden;cursor:pointer}
.b-ps05__poster-wrap{position:relative}
.b-ps05__poster{width:100%;aspect-ratio:16/9;object-fit:cover;display:block;transition:transform .6s cubic-bezier(.22,1,.36,1)}
.b-ps05__player:hover .b-ps05__poster{transform:scale(1.03)}
.b-ps05__overlay{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;background:color-mix(in srgb,var(--color-text) 25%,transparent);transition:background .4s ease}
.b-ps05__player:hover .b-ps05__overlay{background:color-mix(in srgb,var(--color-text) 35%,transparent)}
.b-ps05__play{width:5rem;height:5rem;border-radius:var(--radius-full);border:none;background:var(--color-primary);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform .3s ease,box-shadow .3s ease;box-shadow:0 8px 32px color-mix(in srgb,var(--color-primary) 40%,transparent)}
.b-ps05__player:hover .b-ps05__play{transform:scale(1.1);box-shadow:0 12px 40px color-mix(in srgb,var(--color-primary) 50%,transparent)}
.b-ps05__play-triangle{display:block;width:0;height:0;border-style:solid;border-width:12px 0 12px 22px;border-color:transparent transparent transparent var(--color-text-on-primary);margin-left:4px}
.b-ps05__duration{font-family:var(--font-body);font-size:.8rem;font-weight:600;color:var(--color-text-on-primary);background:color-mix(in srgb,var(--color-text) 50%,transparent);padding:.3rem .75rem;border-radius:var(--radius-sm);backdrop-filter:blur(4px)}
.b-ps05__footnote{font-family:var(--font-body);font-size:.875rem;color:var(--color-text-muted);text-align:center;margin:1.5rem 0 0}
@media(min-width:768px){.b-ps05__play{width:5.5rem;height:5.5rem}.b-ps05__play-triangle{border-width:14px 0 14px 26px}}
@media(min-width:1024px){.b-ps05__play{width:6rem;height:6rem}.b-ps05__play-triangle{border-width:16px 0 16px 28px}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-ps05{background:var(--color-primary)}.b-ps05__title{color:var(--color-text-on-primary)}.b-ps05__desc{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-ps05__footnote{color:color-mix(in srgb,var(--color-text-on-primary) 60%,transparent)}` },
    { id: "accent-play", label: "Акцентная кнопка", css: `.b-ps05__play{background:var(--color-accent);box-shadow:0 8px 32px color-mix(in srgb,var(--color-accent) 40%,transparent)}.b-ps05__player:hover .b-ps05__play{box-shadow:0 12px 40px color-mix(in srgb,var(--color-accent) 50%,transparent)}.b-ps05__play-triangle{border-color:transparent transparent transparent var(--color-text-on-accent)}` },
  ],
};
