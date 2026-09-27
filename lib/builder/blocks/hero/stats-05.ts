import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-stats-05",
  name: "Hero — прогресс-бары",
  description: "Текст по центру сверху, под ним 3 горизонтальных прогресс-бара с процентами",
  category: "hero",
  subcategory: "stats",
  icon: "▥",
  tags: ["stats", "progress", "bars", "percentage", "achievement"],
  motionLevel: "css",
  fields: [
    { name: "hero-title", type: "heading", hint: "заголовок", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание", required: true },
    { name: "hero-cta", type: "link", hint: "CTA", required: true },
    { name: "hero-prog-1-label", type: "text", hint: "метрика 1", required: true },
    { name: "hero-prog-1-value", type: "stat", hint: "значение 1 (напр. 95%)", required: true },
    { name: "hero-prog-2-label", type: "text", hint: "метрика 2", required: true },
    { name: "hero-prog-2-value", type: "stat", hint: "значение 2", required: true },
    { name: "hero-prog-3-label", type: "text", hint: "метрика 3", required: true },
    { name: "hero-prog-3-value", type: "stat", hint: "значение 3", required: true },
  ],
  html: `<section class="b-hst05" data-block="hero">
  <div class="b-hst05__inner">
    <div class="b-hst05__text">
      <h1 data-field="hero-title" data-reveal="up">Результат, который можно измерить</h1>
      <p data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">Наши клиенты растут быстрее рынка. Вот их средние показатели после 6 месяцев работы с нами.</p>
    </div>
    <div class="b-hst05__bars">
      <div class="b-hst05__bar" data-reveal="up" style="--stagger:1">
        <div class="b-hst05__bar-header"><span data-field="hero-prog-1-label">Рост конверсии</span><span data-field="hero-prog-1-value">95%</span></div>
        <div class="b-hst05__bar-track"><div class="b-hst05__bar-fill" style="width:95%"></div></div>
      </div>
      <div class="b-hst05__bar" data-reveal="up" style="--stagger:2">
        <div class="b-hst05__bar-header"><span data-field="hero-prog-2-label">Удовлетворённость клиентов</span><span data-field="hero-prog-2-value">88%</span></div>
        <div class="b-hst05__bar-track"><div class="b-hst05__bar-fill" style="width:88%"></div></div>
      </div>
      <div class="b-hst05__bar" data-reveal="up" style="--stagger:3">
        <div class="b-hst05__bar-header"><span data-field="hero-prog-3-label">Повторные обращения</span><span data-field="hero-prog-3-value">72%</span></div>
        <div class="b-hst05__bar-track"><div class="b-hst05__bar-fill" style="width:72%"></div></div>
      </div>
    </div>
    <a class="b-btn" href="#" data-field="hero-cta" data-reveal="fade" style="--stagger:4">Получить аудит</a>
  </div>
</section>`,
  css: `.b-hst05{padding:var(--space-section) var(--space-block);background:var(--color-bg);min-height:80vh;display:flex;align-items:center}
.b-hst05__inner{max-width:800px;margin:0 auto;width:100%;text-align:center}
.b-hst05 h1{font-family:var(--font-heading);font-size:clamp(2.25rem,4.5vw,3.5rem);color:var(--color-text);margin:0 0 1rem;line-height:1.1}
.b-hst05__text p{font-family:var(--font-body);color:var(--color-text-muted);font-size:1.0625rem;line-height:1.6;max-width:560px;margin:0 auto 3rem}
.b-hst05__bars{display:flex;flex-direction:column;gap:1.75rem;text-align:left;margin-bottom:2.5rem}
.b-hst05__bar-header{display:flex;justify-content:space-between;margin-bottom:.5rem;font-family:var(--font-body);font-size:.9375rem}
.b-hst05__bar-header span:first-child{color:var(--color-text);font-weight:600}
.b-hst05__bar-header span:last-child{color:var(--color-accent);font-weight:700;font-family:var(--font-heading)}
.b-hst05__bar-track{height:8px;background:var(--color-bg-alt);border-radius:var(--radius-full);overflow:hidden}
.b-hst05__bar-fill{height:100%;background:var(--color-accent);border-radius:var(--radius-full);transition:width 1.2s cubic-bezier(.16,1,.3,1)}
@media(max-width:767px){.b-hst05{min-height:auto;padding:3rem 1.25rem}.b-hst05__text p{margin-bottom:2rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-hst05{background:var(--color-primary)}.b-hst05 h1{color:var(--color-text-on-primary)}.b-hst05__text p{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-hst05__bar-header span:first-child{color:var(--color-text-on-primary)}.b-hst05__bar-track{background:rgba(255,255,255,.1)}` },
  ],
};
