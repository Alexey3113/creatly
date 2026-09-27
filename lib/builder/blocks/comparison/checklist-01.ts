import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "comparison-checklist-01",
  name: "Чеклист-сравнение — 2 колонки",
  description: "Два столбца с заголовками и чеклистами: каждый пункт с иконкой ✓ или ✕. Чистый минималистичный формат.",
  category: "comparison",
  subcategory: "checklist",
  icon: "☑",
  tags: ["checklist", "two-col", "check", "comparison", "list", "clean"],
  motionLevel: "css",
  fields: [
    { name: "cm06-title", type: "heading", hint: "заголовок секции 3-6 слов", required: true },
    { name: "cm06-subtitle", type: "text", hint: "подзаголовок 1-2 предложения", required: false },
    { name: "cm06-col-title-1", type: "heading", hint: "заголовок колонки 1-3 слова (1)", required: true },
    { name: "cm06-col-title-2", type: "heading", hint: "заголовок колонки 1-3 слова (2)", required: true },
    { name: "cm06-col-item", type: "text", hint: "пункт чеклиста", required: true },
  ],
  html: `<section class="b-cm06" data-block="comparison">
  <div class="b-cm06__inner">
    <h2 class="b-cm06__title" data-field="cm06-title" data-reveal="up">Что вы получаете</h2>
    <p class="b-cm06__subtitle" data-field="cm06-subtitle" data-reveal="fade">Подробный чеклист возможностей двух подходов — всё прозрачно и честно.</p>
    <div class="b-cm06__grid">
      <div class="b-cm06__col" data-reveal="up" style="--stagger:1">
        <div class="b-cm06__col-header">
          <h3 class="b-cm06__col-title" data-field="cm06-col-title-1">Традиционный подход</h3>
        </div>
        <ul class="b-cm06__list" data-collection="cm06-traditional-items">
          <li class="b-cm06__item b-cm06__item--yes" data-collection-item data-field="cm06-col-item">
            <span class="b-cm06__icon b-cm06__icon--yes">✓</span>
            Знакомые процессы
          </li>
          <li class="b-cm06__item b-cm06__item--no" data-collection-item data-field="cm06-col-item">
            <span class="b-cm06__icon b-cm06__icon--no">✕</span>
            Масштабирование ограничено
          </li>
          <li class="b-cm06__item b-cm06__item--no" data-collection-item data-field="cm06-col-item">
            <span class="b-cm06__icon b-cm06__icon--no">✕</span>
            Высокие операционные расходы
          </li>
          <li class="b-cm06__item b-cm06__item--yes" data-collection-item data-field="cm06-col-item">
            <span class="b-cm06__icon b-cm06__icon--yes">✓</span>
            Полный контроль
          </li>
          <li class="b-cm06__item b-cm06__item--no" data-collection-item data-field="cm06-col-item">
            <span class="b-cm06__icon b-cm06__icon--no">✕</span>
            Медленное внедрение изменений
          </li>
        </ul>
      </div>
      <div class="b-cm06__col" data-reveal="up" style="--stagger:2">
        <div class="b-cm06__col-header b-cm06__col-header--accent">
          <h3 class="b-cm06__col-title" data-field="cm06-col-title-2">С нашей платформой</h3>
        </div>
        <ul class="b-cm06__list" data-collection="cm06-platform-items">
          <li class="b-cm06__item b-cm06__item--yes" data-collection-item data-field="cm06-col-item">
            <span class="b-cm06__icon b-cm06__icon--yes">✓</span>
            Интуитивный интерфейс
          </li>
          <li class="b-cm06__item b-cm06__item--yes" data-collection-item data-field="cm06-col-item">
            <span class="b-cm06__icon b-cm06__icon--yes">✓</span>
            Безграничное масштабирование
          </li>
          <li class="b-cm06__item b-cm06__item--yes" data-collection-item data-field="cm06-col-item">
            <span class="b-cm06__icon b-cm06__icon--yes">✓</span>
            Снижение расходов на 60%
          </li>
          <li class="b-cm06__item b-cm06__item--yes" data-collection-item data-field="cm06-col-item">
            <span class="b-cm06__icon b-cm06__icon--yes">✓</span>
            Полный контроль и гибкость
          </li>
          <li class="b-cm06__item b-cm06__item--yes" data-collection-item data-field="cm06-col-item">
            <span class="b-cm06__icon b-cm06__icon--yes">✓</span>
            Обновления в один клик
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-cm06{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-cm06__inner{max-width:var(--container-width,1400px);margin:0 auto;text-align:center}
.b-cm06__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem;letter-spacing:-0.02em}
.b-cm06__subtitle{font-family:var(--font-body);font-size:1.0625rem;color:var(--color-text-muted);max-width:560px;margin:0 auto 3rem;line-height:1.6}
.b-cm06__grid{display:grid;grid-template-columns:1fr;gap:1.5rem}
.b-cm06__col{background:var(--color-surface);border-radius:var(--radius-lg);overflow:hidden;transition:transform .3s}
.b-cm06__col:hover{transform:translateY(-4px)}
.b-cm06__col-header{padding:1.25rem 2rem;background:var(--color-bg-alt);border-bottom:1px solid var(--color-border)}
.b-cm06__col-header--accent{background:var(--color-accent);border-bottom-color:var(--color-accent)}
.b-cm06__col-header--accent .b-cm06__col-title{color:var(--color-text-on-accent)}
.b-cm06__col-title{font-family:var(--font-heading);font-size:1.25rem;color:var(--color-text);margin:0;letter-spacing:-0.01em}
.b-cm06__list{list-style:none;padding:1.5rem 2rem;margin:0;display:flex;flex-direction:column;gap:.875rem;text-align:left}
.b-cm06__item{font-family:var(--font-body);font-size:.9375rem;line-height:1.5;display:flex;align-items:center;gap:.75rem}
.b-cm06__icon{width:1.5rem;height:1.5rem;border-radius:var(--radius-full);display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:700;flex-shrink:0}
.b-cm06__icon--yes{background:color-mix(in srgb,var(--color-primary) 12%,transparent);color:var(--color-primary)}
.b-cm06__icon--no{background:color-mix(in srgb,var(--color-text-muted) 10%,transparent);color:var(--color-text-muted)}
.b-cm06__item--yes{color:var(--color-text)}
.b-cm06__item--no{color:var(--color-text-muted)}
@media(min-width:768px){.b-cm06__grid{grid-template-columns:repeat(2,1fr);gap:2rem}}
@media(min-width:1024px){.b-cm06__col-header{padding:1.5rem 2.5rem}.b-cm06__list{padding:2rem 2.5rem;gap:1rem}.b-cm06__item{font-size:1rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-cm06{background:var(--color-primary)}.b-cm06__title{color:var(--color-text-on-primary)}.b-cm06__subtitle{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-cm06__col{background:color-mix(in srgb,var(--color-text-on-primary) 6%,transparent)}.b-cm06__col-header{background:color-mix(in srgb,var(--color-text-on-primary) 10%,transparent);border-color:color-mix(in srgb,var(--color-text-on-primary) 12%,transparent)}.b-cm06__col-title{color:var(--color-text-on-primary)}.b-cm06__item--yes{color:var(--color-text-on-primary)}.b-cm06__item--no{color:color-mix(in srgb,var(--color-text-on-primary) 50%,transparent)}.b-cm06__icon--yes{background:color-mix(in srgb,var(--color-accent) 15%,transparent);color:var(--color-accent)}.b-cm06__icon--no{background:color-mix(in srgb,var(--color-text-on-primary) 8%,transparent);color:color-mix(in srgb,var(--color-text-on-primary) 40%,transparent)}` },
    { id: "primary-header", label: "Primary акцент", css: `.b-cm06__col-header--accent{background:var(--color-primary);border-color:var(--color-primary)}.b-cm06__col-header--accent .b-cm06__col-title{color:var(--color-text-on-primary)}` },
  ],
};
