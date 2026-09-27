import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "comparison-split-01",
  name: "Сплит — Без нас / С нами",
  description: "Драматический сплит: левая часть «Без нас» с мрачной стилизацией и крестиками, правая «С нами» — яркая с галочками.",
  category: "comparison",
  subcategory: "split",
  icon: "◧",
  tags: ["split", "with-without", "contrast", "dramatic", "comparison"],
  motionLevel: "css",
  fields: [
    { name: "cm04-title", type: "heading", hint: "заголовок секции 3-6 слов", required: true },
    { name: "cm04-subtitle", type: "text", hint: "подзаголовок 1-2 предложения", required: false },
    { name: "cm04-side-title-1", type: "heading", hint: "заголовок стороны 2-4 слова (1)", required: true },
    { name: "cm04-side-title-2", type: "heading", hint: "заголовок стороны 2-4 слова (2)", required: true },
    { name: "cm04-side-item", type: "text", hint: "пункт списка", required: true },
  ],
  html: `<section class="b-cm04" data-block="comparison">
  <div class="b-cm04__inner">
    <h2 class="b-cm04__title" data-field="cm04-title" data-reveal="up">Почувствуйте разницу</h2>
    <p class="b-cm04__subtitle" data-field="cm04-subtitle" data-reveal="fade">Два сценария — с нашей платформой и без неё. Выбор очевиден.</p>
    <div class="b-cm04__grid">
      <div class="b-cm04__side b-cm04__side--without" data-reveal="clip" style="--stagger:1">
        <div class="b-cm04__side-inner">
          <span class="b-cm04__emoji">😩</span>
          <h3 class="b-cm04__side-title" data-field="cm04-side-title-1">Без нас</h3>
          <ul class="b-cm04__list" data-collection="cm04-without-items">
            <li class="b-cm04__item" data-collection-item data-field="cm04-side-item">✕ Часы ручной работы каждый день</li>
            <li class="b-cm04__item" data-collection-item data-field="cm04-side-item">✕ Ошибки и потеря данных</li>
            <li class="b-cm04__item" data-collection-item data-field="cm04-side-item">✕ Разрозненные инструменты</li>
            <li class="b-cm04__item" data-collection-item data-field="cm04-side-item">✕ Непредсказуемые расходы</li>
            <li class="b-cm04__item" data-collection-item data-field="cm04-side-item">✕ Стресс и выгорание команды</li>
          </ul>
        </div>
      </div>
      <div class="b-cm04__side b-cm04__side--with" data-reveal="clip" style="--stagger:2">
        <div class="b-cm04__side-inner">
          <span class="b-cm04__emoji">🎉</span>
          <h3 class="b-cm04__side-title" data-field="cm04-side-title-2">С нами</h3>
          <ul class="b-cm04__list" data-collection="cm04-with-items">
            <li class="b-cm04__item" data-collection-item data-field="cm04-side-item">✓ Автоматизация рутины за минуты</li>
            <li class="b-cm04__item" data-collection-item data-field="cm04-side-item">✓ Надёжность и резервные копии</li>
            <li class="b-cm04__item" data-collection-item data-field="cm04-side-item">✓ Всё в одном месте</li>
            <li class="b-cm04__item" data-collection-item data-field="cm04-side-item">✓ Прозрачная фиксированная цена</li>
            <li class="b-cm04__item" data-collection-item data-field="cm04-side-item">✓ Спокойствие и рост продуктивности</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-cm04{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-cm04__inner{max-width:var(--container-width,1400px);margin:0 auto;text-align:center}
.b-cm04__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem;letter-spacing:-0.02em}
.b-cm04__subtitle{font-family:var(--font-body);font-size:1.0625rem;color:var(--color-text-muted);max-width:560px;margin:0 auto 3rem;line-height:1.6}
.b-cm04__grid{display:grid;grid-template-columns:1fr;gap:1.5rem}
.b-cm04__side{border-radius:var(--radius-lg);overflow:hidden;transition:transform .3s}
.b-cm04__side:hover{transform:translateY(-4px)}
.b-cm04__side-inner{padding:2.5rem 2rem}
.b-cm04__side--without{background:var(--color-bg-alt);border:1px solid var(--color-border)}
.b-cm04__side--without .b-cm04__side-title{color:var(--color-text-muted)}
.b-cm04__side--without .b-cm04__item{color:var(--color-text-muted)}
.b-cm04__side--with{background:var(--color-primary);border:1px solid var(--color-primary)}
.b-cm04__side--with .b-cm04__side-title{color:var(--color-text-on-primary)}
.b-cm04__side--with .b-cm04__item{color:var(--color-text-on-primary)}
.b-cm04__emoji{font-size:2.5rem;display:block;margin-bottom:1rem}
.b-cm04__side-title{font-family:var(--font-heading);font-size:1.5rem;margin:0 0 1.5rem;letter-spacing:-0.01em}
.b-cm04__list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.875rem;text-align:left}
.b-cm04__item{font-family:var(--font-body);font-size:1rem;line-height:1.5}
@media(min-width:768px){.b-cm04__grid{grid-template-columns:repeat(2,1fr);gap:0}.b-cm04__side{border-radius:0}.b-cm04__side--without{border-radius:var(--radius-lg) 0 0 var(--radius-lg)}.b-cm04__side--with{border-radius:0 var(--radius-lg) var(--radius-lg) 0}.b-cm04__side-inner{padding:3rem 2.5rem}}
@media(min-width:1024px){.b-cm04__side-inner{padding:3.5rem 3rem}.b-cm04__side-title{font-size:1.75rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "accent-with", label: "Акцентный", css: `.b-cm04__side--with{background:var(--color-accent);border-color:var(--color-accent)}.b-cm04__side--with .b-cm04__side-title{color:var(--color-text-on-accent)}.b-cm04__side--with .b-cm04__item{color:var(--color-text-on-accent)}` },
    { id: "dark", label: "Тёмный", css: `.b-cm04{background:var(--color-primary)}.b-cm04__title{color:var(--color-text-on-primary)}.b-cm04__subtitle{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-cm04__side--without{background:color-mix(in srgb,var(--color-text-on-primary) 4%,transparent);border-color:color-mix(in srgb,var(--color-text-on-primary) 12%,transparent)}.b-cm04__side--without .b-cm04__side-title{color:color-mix(in srgb,var(--color-text-on-primary) 55%,transparent)}.b-cm04__side--without .b-cm04__item{color:color-mix(in srgb,var(--color-text-on-primary) 50%,transparent)}.b-cm04__side--with{background:var(--color-accent);border-color:var(--color-accent)}.b-cm04__side--with .b-cm04__side-title{color:var(--color-text-on-accent)}.b-cm04__side--with .b-cm04__item{color:var(--color-text-on-accent)}` },
  ],
};
