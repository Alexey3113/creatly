import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "comparison-before-after-01",
  name: "До / После — с изображениями",
  description: "Две колонки: «До» с изображением и списком проблем, «После» с изображением и списком улучшений.",
  category: "comparison",
  subcategory: "before-after",
  icon: "↹",
  tags: ["before", "after", "images", "transformation", "results", "comparison"],
  motionLevel: "css",
  fields: [
    { name: "cm05-title", type: "heading", hint: "заголовок секции 3-6 слов", required: true },
    { name: "cm05-subtitle", type: "text", hint: "подзаголовок 1-2 предложения", required: false },
    { name: "cm05-col-title-1", type: "heading", hint: "заголовок колонки (До/После) 1-2 слова (1)", required: true },
    { name: "cm05-col-title-2", type: "heading", hint: "заголовок колонки (До/После) 1-2 слова (2)", required: true },
    { name: "cm05-col-image-1", type: "image", hint: "изображение до/после (1)", required: true },
    { name: "cm05-col-image-2", type: "image", hint: "изображение до/после (2)", required: true },
    { name: "cm05-col-item", type: "text", hint: "пункт списка проблем/улучшений", required: true },
  ],
  html: `<section class="b-cm05" data-block="comparison">
  <div class="b-cm05__inner">
    <h2 class="b-cm05__title" data-field="cm05-title" data-reveal="up">Трансформация результатов</h2>
    <p class="b-cm05__subtitle" data-field="cm05-subtitle" data-reveal="fade">Посмотрите, как наш продукт меняет рабочие процессы наших клиентов.</p>
    <div class="b-cm05__grid">
      <div class="b-cm05__col b-cm05__col--before" data-reveal="up" style="--stagger:1">
        <div class="b-cm05__img-wrap">
          <img class="b-cm05__img" data-field="cm05-col-image-1" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80" alt="До" loading="lazy">
          <span class="b-cm05__col-badge b-cm05__col-badge--before">До</span>
        </div>
        <h3 class="b-cm05__col-title" data-field="cm05-col-title-1">До внедрения</h3>
        <ul class="b-cm05__list" data-collection="cm05-before-items">
          <li class="b-cm05__item b-cm05__item--problem" data-collection-item data-field="cm05-col-item">✕ Ручной ввод данных в таблицы</li>
          <li class="b-cm05__item b-cm05__item--problem" data-collection-item data-field="cm05-col-item">✕ Потеря 40% рабочего времени</li>
          <li class="b-cm05__item b-cm05__item--problem" data-collection-item data-field="cm05-col-item">✕ Частые ошибки и дубликаты</li>
          <li class="b-cm05__item b-cm05__item--problem" data-collection-item data-field="cm05-col-item">✕ Отсутствие аналитики</li>
        </ul>
      </div>
      <div class="b-cm05__arrow" data-reveal="scale" style="--stagger:2">
        <span class="b-cm05__arrow-icon">→</span>
      </div>
      <div class="b-cm05__col b-cm05__col--after" data-reveal="up" style="--stagger:3">
        <div class="b-cm05__img-wrap">
          <img class="b-cm05__img" data-field="cm05-col-image-2" src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80" alt="После" loading="lazy">
          <span class="b-cm05__col-badge b-cm05__col-badge--after">После</span>
        </div>
        <h3 class="b-cm05__col-title" data-field="cm05-col-title-2">После внедрения</h3>
        <ul class="b-cm05__list" data-collection="cm05-after-items">
          <li class="b-cm05__item b-cm05__item--improvement" data-collection-item data-field="cm05-col-item">✓ Полная автоматизация процессов</li>
          <li class="b-cm05__item b-cm05__item--improvement" data-collection-item data-field="cm05-col-item">✓ Экономия 15 часов в неделю</li>
          <li class="b-cm05__item b-cm05__item--improvement" data-collection-item data-field="cm05-col-item">✓ Нулевой процент ошибок</li>
          <li class="b-cm05__item b-cm05__item--improvement" data-collection-item data-field="cm05-col-item">✓ Дашборд в реальном времени</li>
        </ul>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-cm05{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-cm05__inner{max-width:var(--container-width,1400px);margin:0 auto;text-align:center}
.b-cm05__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem;letter-spacing:-0.02em}
.b-cm05__subtitle{font-family:var(--font-body);font-size:1.0625rem;color:var(--color-text-muted);max-width:560px;margin:0 auto 3rem;line-height:1.6}
.b-cm05__grid{display:grid;grid-template-columns:1fr;gap:2rem;align-items:start}
.b-cm05__col{text-align:left}
.b-cm05__img-wrap{position:relative;border-radius:var(--radius-lg);overflow:hidden;margin-bottom:1.5rem}
.b-cm05__img{width:100%;height:auto;display:block;aspect-ratio:3/2;object-fit:cover}
.b-cm05__col-badge{position:absolute;top:.75rem;left:.75rem;font-family:var(--font-heading);font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;padding:.35rem .75rem;border-radius:var(--radius-sm)}
.b-cm05__col-badge--before{background:var(--color-bg-alt);color:var(--color-text-muted);border:1px solid var(--color-border)}
.b-cm05__col-badge--after{background:var(--color-accent);color:var(--color-text-on-accent)}
.b-cm05__col-title{font-family:var(--font-heading);font-size:1.375rem;color:var(--color-text);margin:0 0 1.25rem;letter-spacing:-0.01em}
.b-cm05__list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.75rem}
.b-cm05__item{font-family:var(--font-body);font-size:.9375rem;line-height:1.5}
.b-cm05__item--problem{color:var(--color-text-muted)}
.b-cm05__item--improvement{color:var(--color-text);font-weight:500}
.b-cm05__arrow{display:flex;align-items:center;justify-content:center}
.b-cm05__arrow-icon{font-size:2rem;color:var(--color-accent);font-weight:700;background:color-mix(in srgb,var(--color-accent) 10%,transparent);width:3.5rem;height:3.5rem;border-radius:var(--radius-full);display:flex;align-items:center;justify-content:center;transform:rotate(90deg)}
@media(min-width:768px){.b-cm05__grid{grid-template-columns:1fr auto 1fr;gap:1.5rem}.b-cm05__arrow-icon{transform:rotate(0deg)}}
@media(min-width:1024px){.b-cm05__grid{gap:2.5rem}.b-cm05__col-title{font-size:1.5rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-cm05{background:var(--color-primary)}.b-cm05__title{color:var(--color-text-on-primary)}.b-cm05__subtitle{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-cm05__col-title{color:var(--color-text-on-primary)}.b-cm05__item--problem{color:color-mix(in srgb,var(--color-text-on-primary) 55%,transparent)}.b-cm05__item--improvement{color:var(--color-text-on-primary)}.b-cm05__col-badge--before{background:color-mix(in srgb,var(--color-text-on-primary) 10%,transparent);color:color-mix(in srgb,var(--color-text-on-primary) 55%,transparent);border-color:color-mix(in srgb,var(--color-text-on-primary) 15%,transparent)}.b-cm05__arrow-icon{background:color-mix(in srgb,var(--color-accent) 15%,transparent)}` },
    { id: "bordered", label: "С рамками", css: `.b-cm05__col{background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:1.5rem}.b-cm05__col--after{border-color:var(--color-accent)}` },
  ],
};
