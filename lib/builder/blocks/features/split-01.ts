import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "features-split-01",
  name: "Фичи — текст + сетка карточек",
  description: "Заголовок и описание слева, сетка из 4 фич-карточек справа",
  category: "features",
  subcategory: "split",
  icon: "◆",
  tags: ["split", "cards", "grid", "two-column"],
  motionLevel: "css",
  fields: [
    { name: "features-title", type: "heading", hint: "заголовок секции 4-8 слов", required: true },
    { name: "features-desc", type: "text", hint: "описание 2-3 предложения", required: true },
    { name: "feature-title", type: "heading", hint: "заголовок карточки 2-3 слова", required: true },
    { name: "feature-desc", type: "text", hint: "описание карточки 1 предложение", required: true },
  ],
  html: `<section class="b-ft07" data-block="features">
  <div class="b-ft07__inner">
    <div class="b-ft07__text" data-reveal="up">
      <h2 data-field="features-title">Инструменты для масштабирования бизнеса</h2>
      <p data-field="features-desc">Автоматизируйте рутину и сосредоточьтесь на стратегии. Наша платформа растёт вместе с вашей командой — от 5 до 5000 сотрудников.</p>
    </div>
    <div class="b-ft07__grid" data-collection="feature-title">
      <div class="b-ft07__card" data-reveal="up" style="--stagger:0" data-collection-item>
        <h3 data-field="feature-title">Автоматизация</h3>
        <p data-field="feature-desc">300+ готовых сценариев для типовых процессов.</p>
      </div>
      <div class="b-ft07__card" data-reveal="up" style="--stagger:1" data-collection-item>
        <h3 data-field="feature-title">Отчётность</h3>
        <p data-field="feature-desc">Конструктор отчётов с экспортом в PDF и Excel.</p>
      </div>
      <div class="b-ft07__card" data-reveal="up" style="--stagger:2" data-collection-item>
        <h3 data-field="feature-title">API-доступ</h3>
        <p data-field="feature-desc">RESTful API с документацией и песочницей.</p>
      </div>
      <div class="b-ft07__card" data-reveal="up" style="--stagger:3" data-collection-item>
        <h3 data-field="feature-title">Безопасность</h3>
        <p data-field="feature-desc">SOC 2 Type II и ежегодный пентест.</p>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-ft07{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-ft07__inner{max-width:var(--container-width,1400px);margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}
.b-ft07__text h2{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 1.25rem;letter-spacing:-0.02em}
.b-ft07__text p{font-family:var(--font-body);font-size:1.0625rem;color:var(--color-text-muted);margin:0;line-height:1.65}
.b-ft07__grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}
.b-ft07__card{padding:1.75rem;border-radius:var(--radius-md);background:var(--color-surface);transition:transform .3s}
.b-ft07__card:hover{transform:translateY(-3px)}
.b-ft07__card h3{font-family:var(--font-heading);font-size:1.125rem;color:var(--color-text);margin:0 0 .5rem}
.b-ft07__card p{font-family:var(--font-body);font-size:.9rem;color:var(--color-text-muted);margin:0;line-height:1.55}
@media(max-width:768px){.b-ft07__inner{grid-template-columns:1fr;gap:2.5rem}.b-ft07__grid{grid-template-columns:1fr}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-ft07{background:var(--color-primary)}.b-ft07__text h2{color:var(--color-text-on-primary)}.b-ft07__text p{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-ft07__card{background:color-mix(in srgb,var(--color-text-on-primary) 8%,transparent)}.b-ft07__card h3{color:var(--color-text-on-primary)}.b-ft07__card p{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}` },
    { id: "accent", label: "Акцентный", css: `.b-ft07__card{border:1px solid var(--color-border)}.b-ft07__card:hover{border-color:var(--color-accent)}` },
  ],
};
