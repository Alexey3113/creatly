import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-split-right-05",
  name: "Hero — до/после слева, отзыв справа",
  description: "Два изображения (до и после) стопкой слева + заголовок с цитатой-отзывом справа",
  category: "hero",
  subcategory: "split-right",
  icon: "⬔",
  tags: ["split", "before-after", "comparison", "testimonial", "quote"],
  motionLevel: "css",
  fields: [
    { name: "hero-image-before", type: "image", hint: "изображение «До»", required: true },
    { name: "hero-image-after", type: "image", hint: "изображение «После»", required: true },
    { name: "hero-title", type: "heading", hint: "заголовок 4-7 слов", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание 1-2 предложения", required: false },
    { name: "hero-quote", type: "text", hint: "цитата клиента 1-3 предложения", required: true },
    { name: "hero-quote-author", type: "text", hint: "имя и должность автора цитаты", required: true },
    { name: "hero-cta", type: "link", hint: "текст CTA-кнопки", required: true },
  ],
  html: `<section class="b-hsr05" data-block="hero">
  <div class="b-hsr05__inner">
    <div class="b-hsr05__compare" data-reveal="fade" style="--stagger:0">
      <div class="b-hsr05__img-wrap">
        <span class="b-hsr05__label">До</span>
        <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80" alt="" data-field="hero-image-before" />
      </div>
      <div class="b-hsr05__img-wrap">
        <span class="b-hsr05__label b-hsr05__label--after">После</span>
        <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80" alt="" data-field="hero-image-after" />
      </div>
    </div>
    <div class="b-hsr05__content">
      <h1 data-field="hero-title" data-reveal="up" style="--stagger:1">Результат, который говорит сам за себя</h1>
      <p class="b-hsr05__desc" data-field="hero-subtitle" data-reveal="fade" style="--stagger:2">Наши клиенты видят разницу уже в первый месяц работы.</p>
      <blockquote class="b-hsr05__quote" data-reveal="fade" style="--stagger:3">
        <p data-field="hero-quote">«Конверсия выросла на 340% за первые 30 дней. Это лучшее вложение, которое мы сделали за год.»</p>
        <cite data-field="hero-quote-author">— Анна Козлова, CEO DigitalBox</cite>
      </blockquote>
      <a class="b-btn" href="#" data-field="hero-cta" data-reveal="fade" style="--stagger:4">Получить такой результат</a>
    </div>
  </div>
</section>`,
  css: `.b-hsr05{min-height:85vh;display:flex;align-items:center;padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-hsr05__inner{max-width:var(--container-width,1400px);margin:0 auto;display:flex;align-items:center;gap:clamp(2rem,5vw,5rem);width:100%}
.b-hsr05__compare{flex:1 1 48%;display:flex;flex-direction:column;gap:1rem}
.b-hsr05__img-wrap{position:relative;border-radius:var(--radius-md);overflow:hidden;box-shadow:0 8px 32px color-mix(in srgb,var(--color-text) 8%,transparent)}
.b-hsr05__img-wrap img{width:100%;height:auto;display:block;aspect-ratio:5/3;object-fit:cover}
.b-hsr05__label{position:absolute;top:.75rem;left:.75rem;background:var(--color-surface);color:var(--color-text-muted);font-family:var(--font-body);font-weight:700;font-size:.75rem;text-transform:uppercase;letter-spacing:.08em;padding:.35rem .75rem;border-radius:var(--radius-sm)}
.b-hsr05__label--after{background:var(--color-primary);color:var(--color-text-on-primary)}
.b-hsr05__content{flex:1 1 45%}
.b-hsr05 h1{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,3rem);color:var(--color-text);margin:0;line-height:1.12;letter-spacing:-0.02em}
.b-hsr05__desc{color:var(--color-text-muted);font-family:var(--font-body);font-size:1.0625rem;margin:1rem 0 2rem;line-height:1.6}
.b-hsr05__quote{margin:0 0 2.5rem;padding:1.5rem;border-left:4px solid var(--color-primary);background:color-mix(in srgb,var(--color-primary) 5%,transparent);border-radius:0 var(--radius-md) var(--radius-md) 0}
.b-hsr05__quote p{font-family:var(--font-body);font-size:1.0625rem;color:var(--color-text);line-height:1.65;margin:0 0 .75rem;font-style:italic}
.b-hsr05__quote cite{font-family:var(--font-body);font-size:.875rem;color:var(--color-text-muted);font-style:normal;font-weight:600}
.b-btn{display:inline-flex;align-items:center;min-height:52px;padding:0 2rem;border-radius:var(--radius-md);background:var(--color-primary);color:var(--color-text-on-primary);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;transition:transform .3s cubic-bezier(.16,1,.3,1),opacity .3s}
.b-btn:hover{transform:translateY(-2px);opacity:.9}
@media(max-width:767px){.b-hsr05__inner{flex-direction:column}.b-hsr05{min-height:auto;padding:3rem 1.25rem}}`,
  variants: [
    { id: "default", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-hsr05{background:var(--color-bg-alt)}.b-hsr05__quote{background:color-mix(in srgb,var(--color-primary) 8%,transparent)}` },
    { id: "accent-quote", label: "Акцентная цитата", css: `.b-hsr05__quote{border-left-color:var(--color-accent);background:color-mix(in srgb,var(--color-accent) 6%,transparent)}` },
  ],
};
