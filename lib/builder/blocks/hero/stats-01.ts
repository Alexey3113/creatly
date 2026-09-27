import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-stats-01",
  name: "Hero — горизонтальные метрики",
  description: "Заголовок сверху, ряд из 4 крупных метрик снизу с подписями",
  category: "hero",
  subcategory: "stats",
  icon: "▥",
  tags: ["stats", "numbers", "metrics", "horizontal", "data"],
  motionLevel: "css",
  fields: [
    { name: "hero-title", type: "heading", hint: "заголовок 5-8 слов", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание", required: true },
    { name: "hero-cta", type: "link", hint: "CTA", required: true },
    { name: "hero-stat-1-num", type: "stat", hint: "число 1 (напр. 500+)", required: true },
    { name: "hero-stat-1-label", type: "text", hint: "подпись 1", required: true },
    { name: "hero-stat-2-num", type: "stat", hint: "число 2", required: true },
    { name: "hero-stat-2-label", type: "text", hint: "подпись 2", required: true },
    { name: "hero-stat-3-num", type: "stat", hint: "число 3", required: true },
    { name: "hero-stat-3-label", type: "text", hint: "подпись 3", required: true },
    { name: "hero-stat-4-num", type: "stat", hint: "число 4", required: true },
    { name: "hero-stat-4-label", type: "text", hint: "подпись 4", required: true },
  ],
  html: `<section class="b-hst01" data-block="hero">
  <div class="b-hst01__inner">
    <div class="b-hst01__text">
      <h1 data-field="hero-title" data-reveal="up">Цифры, которые говорят за нас</h1>
      <p data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">10 лет на рынке. Каждый проект — измеримый результат для бизнеса клиента.</p>
      <a class="b-btn" href="#" data-field="hero-cta" data-reveal="fade" style="--stagger:2">Стать клиентом</a>
    </div>
    <div class="b-hst01__stats">
      <div class="b-hst01__stat" data-reveal="up" style="--stagger:1">
        <span class="b-hst01__num" data-field="hero-stat-1-num">500+</span>
        <span class="b-hst01__label" data-field="hero-stat-1-label">Завершённых проектов</span>
      </div>
      <div class="b-hst01__stat" data-reveal="up" style="--stagger:2">
        <span class="b-hst01__num" data-field="hero-stat-2-num">98%</span>
        <span class="b-hst01__label" data-field="hero-stat-2-label">Клиентов возвращаются</span>
      </div>
      <div class="b-hst01__stat" data-reveal="up" style="--stagger:3">
        <span class="b-hst01__num" data-field="hero-stat-3-num">24ч</span>
        <span class="b-hst01__label" data-field="hero-stat-3-label">Среднее время ответа</span>
      </div>
      <div class="b-hst01__stat" data-reveal="up" style="--stagger:4">
        <span class="b-hst01__num" data-field="hero-stat-4-num">15</span>
        <span class="b-hst01__label" data-field="hero-stat-4-label">Лет на рынке</span>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-hst01{padding:var(--space-section) var(--space-block);background:var(--color-bg);min-height:80vh;display:flex;align-items:center}
.b-hst01__inner{max-width:var(--container-width,1400px);margin:0 auto;width:100%}
.b-hst01 h1{font-family:var(--font-heading);font-size:clamp(2.25rem,4.5vw,3.75rem);color:var(--color-text);margin:0 0 1rem;line-height:1.1;max-width:700px}
.b-hst01__text p{font-family:var(--font-body);color:var(--color-text-muted);font-size:1.125rem;line-height:1.6;max-width:560px;margin:0 0 2rem}
.b-hst01__stats{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;margin-top:3.5rem;padding-top:2.5rem;border-top:1px solid var(--color-border)}
.b-hst01__num{display:block;font-family:var(--font-heading);font-size:clamp(2rem,3.5vw,3rem);font-weight:700;color:var(--color-accent);line-height:1}
.b-hst01__label{display:block;font-family:var(--font-body);font-size:.875rem;color:var(--color-text-muted);margin-top:.5rem;line-height:1.4}
@media(max-width:1023px){.b-hst01__stats{grid-template-columns:repeat(2,1fr)}}
@media(max-width:767px){.b-hst01{min-height:auto;padding:3rem 1.25rem}.b-hst01__stats{gap:1.5rem;margin-top:2rem;padding-top:1.5rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-hst01{background:var(--color-primary)}.b-hst01 h1{color:var(--color-text-on-primary)}.b-hst01__text p{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-hst01__label{color:color-mix(in srgb,var(--color-text-on-primary) 60%,transparent)}.b-hst01__stats{border-top-color:rgba(255,255,255,.1)}` },
  ],
};
