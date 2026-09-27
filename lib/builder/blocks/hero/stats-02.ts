import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-stats-02",
  name: "Hero — вертикальные метрики",
  description: "Текст слева, вертикальный столбец из 3 крупных цифр справа с разделителями",
  category: "hero",
  subcategory: "stats",
  icon: "▥",
  tags: ["stats", "vertical", "numbers", "sidebar"],
  motionLevel: "css",
  fields: [
    { name: "hero-title", type: "heading", hint: "заголовок", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание", required: true },
    { name: "hero-cta", type: "link", hint: "CTA", required: true },
    { name: "hero-stat-1-num", type: "stat", hint: "число 1", required: true },
    { name: "hero-stat-1-label", type: "text", hint: "подпись 1", required: true },
    { name: "hero-stat-2-num", type: "stat", hint: "число 2", required: true },
    { name: "hero-stat-2-label", type: "text", hint: "подпись 2", required: true },
    { name: "hero-stat-3-num", type: "stat", hint: "число 3", required: true },
    { name: "hero-stat-3-label", type: "text", hint: "подпись 3", required: true },
  ],
  html: `<section class="b-hst02" data-block="hero">
  <div class="b-hst02__inner">
    <div class="b-hst02__text">
      <h1 data-field="hero-title" data-reveal="up">Строим дома, в которых хочется жить</h1>
      <p data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">Проектирование и строительство загородных домов под ключ. От фундамента до ландшафта.</p>
      <a class="b-btn" href="#" data-field="hero-cta" data-reveal="fade" style="--stagger:2">Рассчитать стоимость</a>
    </div>
    <div class="b-hst02__col" data-reveal="up" style="--stagger:2">
      <div class="b-hst02__stat">
        <span class="b-hst02__num" data-field="hero-stat-1-num">120+</span>
        <span data-field="hero-stat-1-label">Домов построено</span>
      </div>
      <div class="b-hst02__stat">
        <span class="b-hst02__num" data-field="hero-stat-2-num">8 лет</span>
        <span data-field="hero-stat-2-label">Гарантия на работы</span>
      </div>
      <div class="b-hst02__stat">
        <span class="b-hst02__num" data-field="hero-stat-3-num">3 мес</span>
        <span data-field="hero-stat-3-label">Средний срок сдачи</span>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-hst02{padding:var(--space-section) var(--space-block);background:var(--color-bg);min-height:85vh;display:flex;align-items:center}
.b-hst02__inner{max-width:var(--container-width,1400px);margin:0 auto;display:grid;grid-template-columns:1fr;gap:3rem;align-items:center;width:100%}
@media(min-width:1024px){.b-hst02__inner{grid-template-columns:1.4fr .6fr}}
.b-hst02 h1{font-family:var(--font-heading);font-size:clamp(2.5rem,5vw,4rem);color:var(--color-text);margin:0 0 1.25rem;line-height:1.08}
.b-hst02__text p{font-family:var(--font-body);color:var(--color-text-muted);font-size:1.125rem;line-height:1.6;max-width:520px;margin:0 0 2rem}
.b-hst02__col{display:flex;flex-direction:column;gap:0;border-left:2px solid var(--color-accent);padding-left:2rem}
.b-hst02__stat{padding:1.5rem 0;border-bottom:1px solid var(--color-border)}
.b-hst02__stat:last-child{border-bottom:0}
.b-hst02__num{display:block;font-family:var(--font-heading);font-size:clamp(1.75rem,3vw,2.5rem);font-weight:700;color:var(--color-text);line-height:1.1}
.b-hst02__stat span:last-child{font-family:var(--font-body);font-size:.875rem;color:var(--color-text-muted);margin-top:.25rem;display:block}
@media(max-width:767px){.b-hst02{min-height:auto;padding:3rem 1.25rem}.b-hst02__col{padding-left:1.5rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-hst02{background:var(--color-primary)}.b-hst02 h1,.b-hst02__num{color:var(--color-text-on-primary)}.b-hst02__text p,.b-hst02__stat span:last-child{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}.b-hst02__stat{border-bottom-color:rgba(255,255,255,.1)}` },
  ],
};
