import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-bento-01",
  name: "Hero — bento-сетка 2×2",
  description: "Bento-grid из 4 ячеек: широкий заголовочный блок сверху, снизу — статистика, изображение и CTA-кнопка",
  category: "hero",
  subcategory: "bento",
  icon: "⊞",
  tags: ["bento", "grid", "stat", "cta", "modern"],
  motionLevel: "css",
  fields: [
    { name: "hero-title", type: "heading", hint: "главный заголовок 5-8 слов, крупный", required: true },
    { name: "hero-subtitle", type: "text", hint: "подзаголовок 1-2 предложения", required: true },
    { name: "hero-stat-number", type: "stat", hint: "крупная цифра, напр. 500+", required: true },
    { name: "hero-stat-label", type: "text", hint: "подпись к цифре, 2-3 слова", required: true },
    { name: "hero-image", type: "image", hint: "изображение продукта или команды", required: true },
    { name: "hero-cta", type: "link", hint: "текст CTA-кнопки 2-4 слова", required: true },
    { name: "hero-cta-note", type: "text", hint: "мелкий текст под кнопкой", required: false },
  ],
  html: `<section class="b-hbn01" data-block="hero">
  <div class="b-hbn01__grid">
    <div class="b-hbn01__main" data-reveal="up">
      <h1 data-field="hero-title">Платформа нового поколения для вашего бизнеса</h1>
      <p class="b-hbn01__desc" data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">Объединяем аналитику, автоматизацию и командную работу в едином пространстве. Запуск за 5 минут.</p>
    </div>
    <div class="b-hbn01__stat" data-reveal="fade" style="--stagger:1">
      <span class="b-hbn01__stat-num" data-field="hero-stat-number">500+</span>
      <span class="b-hbn01__stat-label" data-field="hero-stat-label">Активных компаний</span>
    </div>
    <div class="b-hbn01__img" data-reveal="fade" style="--stagger:2">
      <img data-field="hero-image" src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Продукт" />
    </div>
    <div class="b-hbn01__cta" data-reveal="fade" style="--stagger:3">
      <a class="b-btn" href="#" data-field="hero-cta">Начать бесплатно</a>
      <p class="b-hbn01__cta-note" data-field="hero-cta-note">Без карты · настройка за 2 минуты</p>
    </div>
  </div>
</section>`,
  css: `.b-hbn01{padding:var(--space-section) var(--space-block);background:var(--color-bg);min-height:85vh;display:flex;align-items:center;justify-content:center}
.b-hbn01__grid{max-width:var(--container-width,1400px);width:100%;margin:0 auto;display:grid;grid-template-columns:1fr 1fr 1fr;grid-template-rows:auto auto;gap:1.25rem}
.b-hbn01__main{grid-column:1 / -1;background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:3.5rem 3rem 3rem;display:flex;flex-direction:column;align-items:flex-start;gap:1rem}
.b-hbn01__main h1{font-family:var(--font-heading);font-size:clamp(2rem,4.5vw,3.5rem);color:var(--color-text);margin:0;line-height:1.1;letter-spacing:-0.02em;max-width:720px}
.b-hbn01__desc{font-family:var(--font-body);color:var(--color-text-muted);font-size:1.125rem;line-height:1.6;margin:0;max-width:560px}
.b-hbn01__stat{background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:2.5rem 2rem;display:flex;flex-direction:column;justify-content:center;gap:.5rem}
.b-hbn01__stat-num{font-family:var(--font-heading);font-size:clamp(2.5rem,4vw,3.5rem);color:var(--color-primary);font-weight:800;line-height:1;letter-spacing:-0.03em}
.b-hbn01__stat-label{font-family:var(--font-body);color:var(--color-text-muted);font-size:.9375rem;font-weight:500}
.b-hbn01__img{background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);overflow:hidden;display:flex;align-items:center;justify-content:center;min-height:200px}
.b-hbn01__img img{width:100%;height:100%;object-fit:cover;display:block}
.b-hbn01__cta{background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:2.5rem 2rem;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;text-align:center}
.b-hbn01__cta-note{font-family:var(--font-body);color:var(--color-text-muted);font-size:.8125rem;margin:0}
.b-btn{display:inline-flex;align-items:center;min-height:52px;padding:0 2rem;border-radius:var(--radius-md);background:var(--color-accent);color:var(--color-text-on-accent);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;transition:transform .3s cubic-bezier(.16,1,.3,1),opacity .3s}
.b-btn:hover{transform:translateY(-2px);opacity:.9}
@media(max-width:767px){.b-hbn01{min-height:auto;padding:3rem 1.25rem}.b-hbn01__grid{grid-template-columns:1fr;gap:1rem}.b-hbn01__main{padding:2.5rem 1.5rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-hbn01{background:var(--color-primary)}.b-hbn01__main{background:color-mix(in srgb,var(--color-text-on-primary) 8%,transparent);border-color:color-mix(in srgb,var(--color-text-on-primary) 12%,transparent)}.b-hbn01__main h1{color:var(--color-text-on-primary)}.b-hbn01__desc{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-hbn01__stat,.b-hbn01__img,.b-hbn01__cta{background:color-mix(in srgb,var(--color-text-on-primary) 8%,transparent);border-color:color-mix(in srgb,var(--color-text-on-primary) 12%,transparent)}.b-hbn01__stat-label,.b-hbn01__cta-note{color:color-mix(in srgb,var(--color-text-on-primary) 60%,transparent)}` },
    { id: "accent-cards", label: "Акцентные карточки", css: `.b-hbn01__stat{background:var(--color-primary);border-color:var(--color-primary)}.b-hbn01__stat-num{color:var(--color-text-on-primary)}.b-hbn01__stat-label{color:color-mix(in srgb,var(--color-text-on-primary) 75%,transparent)}.b-hbn01__cta{background:var(--color-accent);border-color:var(--color-accent)}.b-hbn01__cta-note{color:color-mix(in srgb,var(--color-text-on-accent) 75%,transparent)}.b-btn{background:var(--color-bg);color:var(--color-text)}` },
  ],
};
