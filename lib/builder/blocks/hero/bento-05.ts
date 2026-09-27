import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-bento-05",
  name: "Hero — бенто-полоса",
  description: "Полноширинный горизонтальный бенто из 4 ячеек разной ширины: текст, изображение, статистика и CTA",
  category: "hero",
  subcategory: "bento",
  icon: "⊟",
  tags: ["bento", "horizontal", "stats", "cta", "modern", "saas"],
  motionLevel: "css",
  fields: [
    { name: "hero-title", type: "heading", hint: "главный заголовок 4-7 слов", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание 1-2 предложения", required: true },
    { name: "hero-image", type: "image", hint: "изображение продукта или иллюстрация", required: true },
    { name: "hero-stat-number", type: "stat", hint: "крупная цифра, напр. 98% или 12K+", required: true },
    { name: "hero-stat-label", type: "text", hint: "подпись к цифре, 2-4 слова", required: true },
    { name: "hero-cta", type: "link", hint: "текст CTA-кнопки", required: true },
    { name: "hero-cta-note", type: "text", hint: "мелкий текст под кнопкой, напр. Без карты", required: false },
  ],
  html: `<section class="b-hbn05" data-block="hero">
  <div class="b-hbn05__inner">
    <div class="b-hbn05__cell b-hbn05__cell--text" data-reveal="up">
      <h1 data-field="hero-title">Платформа нового поколения для роста</h1>
      <p data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">Объединяем данные, аналитику и автоматизацию в единый поток — чтобы ваш бизнес масштабировался без лишних усилий.</p>
    </div>
    <div class="b-hbn05__cell b-hbn05__cell--image" data-reveal="fade" style="--stagger:1">
      <img data-field="hero-image" src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" alt="Продукт" />
    </div>
    <div class="b-hbn05__cell b-hbn05__cell--stat" data-reveal="up" style="--stagger:2">
      <div class="b-hbn05__stat-number" data-field="hero-stat-number">98%</div>
      <div class="b-hbn05__stat-label" data-field="hero-stat-label">клиентов довольны результатом</div>
    </div>
    <div class="b-hbn05__cell b-hbn05__cell--cta" data-reveal="up" style="--stagger:3">
      <a class="b-hbn05__btn" href="#" data-field="hero-cta">Попробовать</a>
      <span class="b-hbn05__note" data-field="hero-cta-note">Бесплатно 14 дней</span>
    </div>
  </div>
</section>`,
  css: `.b-hbn05{padding:var(--space-section) var(--space-block);background:var(--color-bg);min-height:80vh;display:flex;align-items:center}
.b-hbn05__inner{max-width:var(--container-width,1400px);margin:0 auto;display:grid;grid-template-columns:1fr;gap:1rem;width:100%}
@media(min-width:768px){.b-hbn05__inner{grid-template-columns:1fr 1fr;grid-template-rows:auto auto}}
@media(min-width:1024px){.b-hbn05__inner{grid-template-columns:40% 25% 20% 15%;grid-template-rows:1fr}}
.b-hbn05__cell{background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:2rem;display:flex;flex-direction:column;justify-content:center}
.b-hbn05__cell--text{padding:2.5rem}
@media(min-width:1024px){.b-hbn05__cell--text{padding:3rem}}
.b-hbn05__cell--text h1{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 1rem;line-height:1.1;letter-spacing:-0.02em}
.b-hbn05__cell--text p{font-family:var(--font-body);color:var(--color-text-muted);font-size:1rem;line-height:1.6;margin:0;max-width:420px}
.b-hbn05__cell--image{padding:0;overflow:hidden}
.b-hbn05__cell--image img{width:100%;height:100%;min-height:240px;object-fit:cover;display:block;border-radius:var(--radius-lg)}
.b-hbn05__cell--stat{align-items:center;text-align:center;gap:.5rem;background:color-mix(in srgb,var(--color-primary) 6%,var(--color-surface))}
.b-hbn05__stat-number{font-family:var(--font-heading);font-size:clamp(2.5rem,5vw,3.5rem);font-weight:800;color:var(--color-primary);line-height:1;letter-spacing:-0.03em}
.b-hbn05__stat-label{font-family:var(--font-body);font-size:.875rem;color:var(--color-text-muted);line-height:1.4;max-width:160px}
.b-hbn05__cell--cta{align-items:center;text-align:center;gap:1rem;background:var(--color-primary)}
.b-hbn05__btn{display:inline-flex;align-items:center;justify-content:center;font-family:var(--font-body);font-size:1rem;font-weight:700;color:var(--color-primary);background:var(--color-bg);padding:.75rem 1.5rem;border-radius:var(--radius-md);text-decoration:none;width:100%;transition:opacity .25s ease,transform .25s ease}
.b-hbn05__btn:hover{opacity:.9;transform:translateY(-1px)}
.b-hbn05__note{font-family:var(--font-body);font-size:.75rem;color:var(--color-text-on-primary);opacity:.8}`,
  variants: [
    {
      id: "hero-bento-05-accent-stat",
      label: "Акцентная статистика + обводка CTA",
      css: `.b-hbn05{padding:var(--space-section) var(--space-block);background:var(--color-bg);min-height:80vh;display:flex;align-items:center}
.b-hbn05__inner{max-width:var(--container-width,1400px);margin:0 auto;display:grid;grid-template-columns:1fr;gap:1rem;width:100%}
@media(min-width:768px){.b-hbn05__inner{grid-template-columns:1fr 1fr;grid-template-rows:auto auto}}
@media(min-width:1024px){.b-hbn05__inner{grid-template-columns:40% 25% 20% 15%;grid-template-rows:1fr}}
.b-hbn05__cell{background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:2rem;display:flex;flex-direction:column;justify-content:center}
.b-hbn05__cell--text{padding:2.5rem}
@media(min-width:1024px){.b-hbn05__cell--text{padding:3rem}}
.b-hbn05__cell--text h1{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 1rem;line-height:1.1;letter-spacing:-0.02em}
.b-hbn05__cell--text p{font-family:var(--font-body);color:var(--color-text-muted);font-size:1rem;line-height:1.6;margin:0;max-width:420px}
.b-hbn05__cell--image{padding:0;overflow:hidden}
.b-hbn05__cell--image img{width:100%;height:100%;min-height:240px;object-fit:cover;display:block;border-radius:var(--radius-lg)}
.b-hbn05__cell--stat{align-items:center;text-align:center;gap:.5rem;background:var(--color-accent)}
.b-hbn05__stat-number{font-family:var(--font-heading);font-size:clamp(2.5rem,5vw,3.5rem);font-weight:800;color:var(--color-text-on-accent);line-height:1;letter-spacing:-0.03em}
.b-hbn05__stat-label{font-family:var(--font-body);font-size:.875rem;color:var(--color-text-on-accent);opacity:.85;line-height:1.4;max-width:160px}
.b-hbn05__cell--cta{align-items:center;text-align:center;gap:1rem;background:transparent;border:2px solid var(--color-primary)}
.b-hbn05__btn{display:inline-flex;align-items:center;justify-content:center;font-family:var(--font-body);font-size:1rem;font-weight:700;color:var(--color-text-on-primary);background:var(--color-primary);padding:.75rem 1.5rem;border-radius:var(--radius-md);text-decoration:none;width:100%;transition:opacity .25s ease,transform .25s ease}
.b-hbn05__btn:hover{opacity:.9;transform:translateY(-1px)}
.b-hbn05__note{font-family:var(--font-body);font-size:.75rem;color:var(--color-text-muted)}`,
    },
    {
      id: "hero-bento-05-minimal",
      label: "Минималистичный без заливок",
      css: `.b-hbn05{padding:var(--space-section) var(--space-block);background:var(--color-bg);min-height:80vh;display:flex;align-items:center}
.b-hbn05__inner{max-width:var(--container-width,1400px);margin:0 auto;display:grid;grid-template-columns:1fr;gap:1rem;width:100%}
@media(min-width:768px){.b-hbn05__inner{grid-template-columns:1fr 1fr;grid-template-rows:auto auto}}
@media(min-width:1024px){.b-hbn05__inner{grid-template-columns:40% 25% 20% 15%;grid-template-rows:1fr}}
.b-hbn05__cell{background:transparent;border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:2rem;display:flex;flex-direction:column;justify-content:center}
.b-hbn05__cell--text{padding:2.5rem;border:none}
@media(min-width:1024px){.b-hbn05__cell--text{padding:3rem}}
.b-hbn05__cell--text h1{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 1rem;line-height:1.1;letter-spacing:-0.02em}
.b-hbn05__cell--text p{font-family:var(--font-body);color:var(--color-text-muted);font-size:1rem;line-height:1.6;margin:0;max-width:420px}
.b-hbn05__cell--image{padding:0;overflow:hidden;border:none}
.b-hbn05__cell--image img{width:100%;height:100%;min-height:240px;object-fit:cover;display:block;border-radius:var(--radius-lg)}
.b-hbn05__cell--stat{align-items:center;text-align:center;gap:.5rem;background:transparent}
.b-hbn05__stat-number{font-family:var(--font-heading);font-size:clamp(2.5rem,5vw,3.5rem);font-weight:800;color:var(--color-primary);line-height:1;letter-spacing:-0.03em}
.b-hbn05__stat-label{font-family:var(--font-body);font-size:.875rem;color:var(--color-text-muted);line-height:1.4;max-width:160px}
.b-hbn05__cell--cta{align-items:center;text-align:center;gap:1rem;background:transparent;border:none}
.b-hbn05__btn{display:inline-flex;align-items:center;justify-content:center;font-family:var(--font-body);font-size:1rem;font-weight:700;color:var(--color-text-on-primary);background:var(--color-primary);padding:.75rem 1.5rem;border-radius:var(--radius-md);text-decoration:none;width:100%;transition:opacity .25s ease,transform .25s ease}
.b-hbn05__btn:hover{opacity:.9;transform:translateY(-1px)}
.b-hbn05__note{font-family:var(--font-body);font-size:.75rem;color:var(--color-text-muted)}`,
    },
  ],
};
