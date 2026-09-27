import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-bento-03",
  name: "Hero — bento микс-медиа 4 ячейки",
  description: "Четыре ячейки разного размера: крупный заголовок, изображение, отзыв клиента и метрика",
  category: "hero",
  subcategory: "bento",
  icon: "⊠",
  tags: ["bento", "grid", "mixed", "testimonial", "stat", "image"],
  motionLevel: "css",
  fields: [
    { name: "hero-title", type: "heading", hint: "главный заголовок 5-8 слов", required: true },
    { name: "hero-subtitle", type: "text", hint: "подзаголовок 1-2 предложения", required: true },
    { name: "hero-cta", type: "link", hint: "текст CTA-кнопки 2-4 слова", required: true },
    { name: "hero-image", type: "image", hint: "фото продукта, интерфейса или команды", required: true },
    { name: "hero-quote", type: "text", hint: "цитата клиента, 1-2 предложения", required: true },
    { name: "hero-quote-author", type: "text", hint: "имя и должность автора цитаты", required: true },
    { name: "hero-metric-number", type: "stat", hint: "крупная цифра-метрика", required: true },
    { name: "hero-metric-desc", type: "text", hint: "описание метрики, 3-5 слов", required: true },
  ],
  html: `<section class="b-hbn03" data-block="hero">
  <div class="b-hbn03__grid">
    <div class="b-hbn03__hero" data-reveal="up">
      <h1 data-field="hero-title">Будущее вашей команды начинается здесь</h1>
      <p class="b-hbn03__desc" data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">Управляйте проектами, отслеживайте прогресс и выстраивайте процессы без лишних инструментов.</p>
      <a class="b-btn" href="#" data-field="hero-cta" data-reveal="fade" style="--stagger:2">Попробовать сейчас</a>
    </div>
    <div class="b-hbn03__img" data-reveal="fade" style="--stagger:1">
      <img data-field="hero-image" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" alt="Продукт" />
    </div>
    <div class="b-hbn03__quote" data-reveal="fade" style="--stagger:2">
      <blockquote>
        <p data-field="hero-quote">«За 3 месяца мы сократили время на согласование задач в 4 раза. Команда наконец работает синхронно.»</p>
        <cite data-field="hero-quote-author">Мария Козлова, COO в TechFlow</cite>
      </blockquote>
    </div>
    <div class="b-hbn03__metric" data-reveal="fade" style="--stagger:3">
      <span class="b-hbn03__metric-num" data-field="hero-metric-number">4.9★</span>
      <span class="b-hbn03__metric-desc" data-field="hero-metric-desc">Средняя оценка от 1 200+ отзывов</span>
    </div>
  </div>
</section>`,
  css: `.b-hbn03{padding:var(--space-section) var(--space-block);background:var(--color-bg);min-height:80vh;display:flex;align-items:center;justify-content:center}
.b-hbn03__grid{max-width:var(--container-width,1400px);width:100%;margin:0 auto;display:grid;grid-template-columns:1.4fr 1fr;grid-template-rows:auto auto;gap:1.25rem}
.b-hbn03__hero{grid-column:1 / -1;background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:3.5rem 3rem 3rem;display:flex;flex-direction:column;gap:1.25rem;align-items:flex-start}
.b-hbn03__hero h1{font-family:var(--font-heading);font-size:clamp(2rem,4.5vw,3.25rem);color:var(--color-text);margin:0;line-height:1.1;letter-spacing:-0.02em;max-width:680px}
.b-hbn03__desc{font-family:var(--font-body);color:var(--color-text-muted);font-size:1.0625rem;line-height:1.6;margin:0;max-width:540px}
.b-hbn03__img{background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);overflow:hidden;min-height:240px}
.b-hbn03__img img{width:100%;height:100%;object-fit:cover;display:block}
.b-hbn03__quote{background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:2rem 2rem;display:flex;align-items:center;grid-row:span 1}
.b-hbn03__quote blockquote{margin:0;display:flex;flex-direction:column;gap:.75rem}
.b-hbn03__quote p{font-family:var(--font-body);color:var(--color-text);font-size:1rem;line-height:1.55;margin:0;font-style:italic}
.b-hbn03__quote cite{font-family:var(--font-body);color:var(--color-text-muted);font-size:.8125rem;font-style:normal;font-weight:600}
.b-hbn03__metric{background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:2rem 1.75rem;display:flex;flex-direction:column;justify-content:center;gap:.5rem}
.b-hbn03__metric-num{font-family:var(--font-heading);font-size:clamp(2rem,3.5vw,3rem);color:var(--color-accent);font-weight:800;line-height:1;letter-spacing:-0.02em}
.b-hbn03__metric-desc{font-family:var(--font-body);color:var(--color-text-muted);font-size:.875rem;line-height:1.4;font-weight:500}
.b-btn{display:inline-flex;align-items:center;min-height:52px;padding:0 2rem;border-radius:var(--radius-md);background:var(--color-accent);color:var(--color-text-on-accent);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;transition:transform .3s cubic-bezier(.16,1,.3,1),opacity .3s}
.b-btn:hover{transform:translateY(-2px);opacity:.9}
@media(max-width:1023px){.b-hbn03__grid{grid-template-columns:1fr 1fr}}
@media(max-width:767px){.b-hbn03{min-height:auto;padding:3rem 1.25rem}.b-hbn03__grid{grid-template-columns:1fr;gap:1rem}.b-hbn03__hero{padding:2.5rem 1.5rem}.b-hbn03__quote{grid-column:1}.b-hbn03__metric{grid-column:1}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-hbn03{background:var(--color-primary)}.b-hbn03__hero,.b-hbn03__img,.b-hbn03__quote,.b-hbn03__metric{background:color-mix(in srgb,var(--color-text-on-primary) 8%,transparent);border-color:color-mix(in srgb,var(--color-text-on-primary) 12%,transparent)}.b-hbn03__hero h1{color:var(--color-text-on-primary)}.b-hbn03__desc,.b-hbn03__quote cite,.b-hbn03__metric-desc{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}.b-hbn03__quote p{color:var(--color-text-on-primary)}` },
    { id: "accent-hero", label: "Акцентный заголовок", css: `.b-hbn03__hero{background:var(--color-primary);border-color:var(--color-primary)}.b-hbn03__hero h1{color:var(--color-text-on-primary)}.b-hbn03__desc{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}` },
  ],
};
