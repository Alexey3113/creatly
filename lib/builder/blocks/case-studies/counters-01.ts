import type { BlockPreset } from "../_types";

/**
 * Кейсы: счётчики результата. Гигантские цифры набегают от нуля,
 * когда секция попадает в вьюпорт ([data-count] в widgets-runtime).
 * Суффиксы (+, %, ×, млн) сохраняются как есть.
 */
export const block: BlockPreset = {
  id: "case-studies-counters-01",
  name: "Счётчики результата",
  description: "Ряд гигантских цифр, которые набегают от нуля при появлении на экране: проекты, проценты роста, годы опыта. Классика доверия в живом исполнении.",
  category: "case-studies",
  subcategory: "counters",
  icon: "𝟙",
  tags: ["stats", "counters", "numbers", "count-up", "social-proof", "wow"],
  motionLevel: "css",
  fields: [
    { name: "csc01-title", type: "heading", hint: "заголовок секции, 2-5 слов", required: false },
    { name: "csc01-value", type: "stat", hint: "цифра с суффиксом: «240+», «97%», «12 лет»", required: true },
    { name: "csc01-label", type: "text", hint: "подпись метрики, 2-5 слов", required: true },
  ],
  html: `<section class="b-csc01" data-block="case-studies">
  <div class="b-csc01__inner">
    <h2 class="b-csc01__title" data-field="csc01-title" data-reveal="word">Результат в цифрах</h2>
    <div class="b-csc01__grid" data-collection="csc01-stats">
      <div class="b-csc01__stat" data-collection-item data-reveal="up" style="--stagger:0">
        <span class="b-csc01__value" data-count data-field="csc01-value">240+</span>
        <span class="b-csc01__label" data-field="csc01-label">запущенных проектов</span>
      </div>
      <div class="b-csc01__stat" data-collection-item data-reveal="up" style="--stagger:1">
        <span class="b-csc01__value" data-count data-field="csc01-value">97%</span>
        <span class="b-csc01__label" data-field="csc01-label">клиентов возвращаются</span>
      </div>
      <div class="b-csc01__stat" data-collection-item data-reveal="up" style="--stagger:2">
        <span class="b-csc01__value" data-count data-field="csc01-value">12 лет</span>
        <span class="b-csc01__label" data-field="csc01-label">на рынке</span>
      </div>
      <div class="b-csc01__stat" data-collection-item data-reveal="up" style="--stagger:3">
        <span class="b-csc01__value" data-count data-field="csc01-value">4.9</span>
        <span class="b-csc01__label" data-field="csc01-label">средняя оценка</span>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-csc01{padding:var(--space-section) var(--space-block);background:var(--color-primary)}
.b-csc01__inner{max-width:var(--container-width,1400px);margin:0 auto;text-align:center}
.b-csc01__title{font-family:var(--font-heading);font-size:clamp(1.85rem,3.6vw,2.9rem);letter-spacing:-.02em;color:var(--color-text-on-primary);margin:0 0 3.5rem}
.b-csc01__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem}
.b-csc01__stat{display:flex;flex-direction:column;gap:.6rem}
.b-csc01__value{font-family:var(--font-heading);font-size:clamp(2.6rem,6vw,4.75rem);font-weight:800;letter-spacing:-.03em;line-height:1;color:var(--color-accent);font-variant-numeric:tabular-nums}
.b-csc01__label{font-family:var(--font-body);font-size:.9375rem;color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}
@media(max-width:768px){.b-csc01__grid{grid-template-columns:repeat(2,1fr);gap:2.25rem 1rem}}`,
  variants: [
    { id: "brand", label: "Брендовый", css: "" },
    { id: "light", label: "Светлый", css: `.b-csc01{background:var(--color-bg)}.b-csc01__title{color:var(--color-text)}.b-csc01__label{color:var(--color-text-muted)}` },
    { id: "dark", label: "Чёрный", css: `.b-csc01{background:#0a0a0f}.b-csc01__title{color:#fff}.b-csc01__label{color:rgba(255,255,255,.55)}` },
  ],
};
