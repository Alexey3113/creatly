import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "testimonials-video-01",
  name: "Отзыв — видео + цитата",
  description: "Отзыв с превью видео (плейсхолдер с кнопкой play) и текстовой цитатой",
  category: "testimonials",
  subcategory: "video",
  icon: "▶",
  tags: ["video", "play", "media"],
  motionLevel: "css",
  fields: [
    { name: "tm08-poster", type: "image", hint: "превью видео", required: true },
    { name: "tm08-quote", type: "text", hint: "текст отзыва", required: true },
    { name: "tm08-name", type: "text", hint: "имя автора", required: true },
    { name: "tm08-position", type: "text", hint: "должность и компания", required: true },
  ],
  html: `<section class="b-tm08" data-block="testimonials">
  <div class="b-tm08__inner">
    <div class="b-tm08__video" data-reveal="scale">
      <img class="b-tm08__poster" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80" alt="" data-field="tm08-poster" />
      <button class="b-tm08__play" aria-label="Воспроизвести видео">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="var(--color-accent)"/><polygon points="26,20 26,44 46,32" fill="var(--color-text-on-accent)"/></svg>
      </button>
    </div>
    <div class="b-tm08__body" data-reveal="fade" style="--stagger:1">
      <blockquote class="b-tm08__quote" data-field="tm08-quote">Видео-отзыв лучше любых слов — посмотрите, как изменился наш бренд после сотрудничества. Результат говорит сам за себя.</blockquote>
      <p class="b-tm08__name" data-field="tm08-name">Артём Зайцев</p>
      <p class="b-tm08__pos" data-field="tm08-position">Основатель, BrandForge</p>
    </div>
  </div>
</section>`,
  css: `.b-tm08{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-tm08__inner{max-width:var(--container-width,1400px);margin:0 auto;display:grid;grid-template-columns:1.2fr 1fr;gap:3rem;align-items:center}
.b-tm08__video{position:relative;border-radius:var(--radius-lg);overflow:hidden}
.b-tm08__poster{width:100%;display:block;aspect-ratio:16/9;object-fit:cover}
.b-tm08__play{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:transparent;border:none;cursor:pointer;transition:transform .2s}
.b-tm08__play:hover{transform:scale(1.1)}
.b-tm08__body{display:flex;flex-direction:column;justify-content:center}
.b-tm08__quote{font-family:var(--font-body);font-size:clamp(1.125rem,2vw,1.375rem);color:var(--color-text);line-height:1.6;margin:0 0 1.5rem;font-style:italic}
.b-tm08__name{font-family:var(--font-heading);font-weight:700;color:var(--color-text);margin:0;font-size:1rem}
.b-tm08__pos{font-family:var(--font-body);color:var(--color-text-muted);margin:.25rem 0 0;font-size:.875rem}
@media(max-width:768px){.b-tm08__inner{grid-template-columns:1fr}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-tm08{background:var(--color-primary)}.b-tm08__quote,.b-tm08__name{color:var(--color-text-on-primary)}` },
    { id: "accent", label: "Акцентный", css: `.b-tm08{background:var(--color-accent)}.b-tm08__quote,.b-tm08__name{color:var(--color-text-on-accent)}` },
  ],
};
