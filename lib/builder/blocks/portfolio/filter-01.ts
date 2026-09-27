import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "portfolio-filter-01",
  name: "Портфолио — фильтр с табами",
  description: "Фильтр-табы в виде pill-кнопок (Все / Дизайн / Разработка / Маркетинг) сверху и сетка работ ниже. Табы — визуальные, CSS-only",
  category: "portfolio",
  subcategory: "filter",
  icon: "⊞",
  tags: ["portfolio", "filter", "tabs", "pills", "grid"],
  motionLevel: "css",
  fields: [
    { name: "pf05-title", type: "heading", hint: "заголовок секции 3-6 слов", required: false },
    { name: "pf05-subtitle", type: "text", hint: "описание портфолио 1-2 предложения", required: false },
    { name: "pf05-tab", type: "text", hint: "название таба-фильтра 1-2 слова", required: false },
    { name: "pf05-img", type: "image", hint: "изображение проекта", required: true },
    { name: "pf05-name", type: "text", hint: "название проекта 2-5 слов", required: true },
    { name: "pf05-cat", type: "text", hint: "категория проекта 1-2 слова", required: false },
  ],
  html: `<section class="b-pf05" data-block="portfolio">
  <div class="b-pf05__inner">
    <div class="b-pf05__header" data-reveal="up">
      <h2 data-field="pf05-title">Портфолио</h2>
      <p data-field="pf05-subtitle">Фильтруйте работы по категории или просматривайте все проекты сразу</p>
    </div>
    <div class="b-pf05__tabs" data-reveal="up" style="--stagger:0" data-collection="pf05-tab">
      <button class="b-pf05__tab b-pf05__tab--active" data-field="pf05-tab" data-collection-item>Все</button>
      <button class="b-pf05__tab" data-field="pf05-tab" data-collection-item>Дизайн</button>
      <button class="b-pf05__tab" data-field="pf05-tab" data-collection-item>Разработка</button>
      <button class="b-pf05__tab" data-field="pf05-tab" data-collection-item>Маркетинг</button>
    </div>
    <div class="b-pf05__grid" data-collection="pf05-img">
      <div class="b-pf05__item" data-reveal="scale" style="--stagger:0" data-collection-item>
        <div class="b-pf05__img-wrap">
          <img data-field="pf05-img" src="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        </div>
        <div class="b-pf05__info">
          <span class="b-pf05__cat" data-field="pf05-cat">Дизайн</span>
          <h3 class="b-pf05__name" data-field="pf05-name">Брендбук для IT-компании</h3>
        </div>
      </div>
      <div class="b-pf05__item" data-reveal="scale" style="--stagger:1" data-collection-item>
        <div class="b-pf05__img-wrap">
          <img data-field="pf05-img" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        </div>
        <div class="b-pf05__info">
          <span class="b-pf05__cat" data-field="pf05-cat">Разработка</span>
          <h3 class="b-pf05__name" data-field="pf05-name">CRM-система для агентства</h3>
        </div>
      </div>
      <div class="b-pf05__item" data-reveal="scale" style="--stagger:2" data-collection-item>
        <div class="b-pf05__img-wrap">
          <img data-field="pf05-img" src="https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        </div>
        <div class="b-pf05__info">
          <span class="b-pf05__cat" data-field="pf05-cat">Маркетинг</span>
          <h3 class="b-pf05__name" data-field="pf05-name">Стратегия продвижения бренда</h3>
        </div>
      </div>
      <div class="b-pf05__item" data-reveal="scale" style="--stagger:3" data-collection-item>
        <div class="b-pf05__img-wrap">
          <img data-field="pf05-img" src="https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        </div>
        <div class="b-pf05__info">
          <span class="b-pf05__cat" data-field="pf05-cat">Дизайн</span>
          <h3 class="b-pf05__name" data-field="pf05-name">UI-кит мобильного приложения</h3>
        </div>
      </div>
      <div class="b-pf05__item" data-reveal="scale" style="--stagger:4" data-collection-item>
        <div class="b-pf05__img-wrap">
          <img data-field="pf05-img" src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        </div>
        <div class="b-pf05__info">
          <span class="b-pf05__cat" data-field="pf05-cat">Разработка</span>
          <h3 class="b-pf05__name" data-field="pf05-name">Аналитический портал данных</h3>
        </div>
      </div>
      <div class="b-pf05__item" data-reveal="scale" style="--stagger:5" data-collection-item>
        <div class="b-pf05__img-wrap">
          <img data-field="pf05-img" src="https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        </div>
        <div class="b-pf05__info">
          <span class="b-pf05__cat" data-field="pf05-cat">Маркетинг</span>
          <h3 class="b-pf05__name" data-field="pf05-name">Лендинг продуктового запуска</h3>
        </div>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-pf05{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-pf05__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-pf05__header{text-align:center;margin-bottom:2rem}
.b-pf05__header h2{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem;letter-spacing:-0.02em}
.b-pf05__header p{font-family:var(--font-body);color:var(--color-text-muted);font-size:1.0625rem;line-height:1.6;margin:0;max-width:520px;margin-inline:auto}
.b-pf05__tabs{display:flex;flex-wrap:wrap;justify-content:center;gap:.625rem;margin-bottom:3rem}
.b-pf05__tab{font-family:var(--font-body);font-size:.875rem;font-weight:500;padding:.5rem 1.25rem;border-radius:var(--radius-full);border:1px solid var(--color-border);background:transparent;color:var(--color-text-muted);cursor:pointer;transition:all .25s ease;white-space:nowrap}
.b-pf05__tab:hover{border-color:var(--color-primary);color:var(--color-primary)}
.b-pf05__tab--active{background:var(--color-primary);color:var(--color-text-on-primary);border-color:var(--color-primary)}
.b-pf05__tab--active:hover{background:var(--color-primary);color:var(--color-text-on-primary)}
.b-pf05__grid{display:grid;grid-template-columns:1fr;gap:1.5rem}
.b-pf05__item{border-radius:var(--radius-lg);overflow:hidden;background:var(--color-surface);border:1px solid var(--color-border);transition:box-shadow .3s ease,transform .3s ease}
.b-pf05__item:hover{box-shadow:0 8px 32px color-mix(in srgb,var(--color-text) 8%,transparent);transform:translateY(-2px)}
.b-pf05__img-wrap{overflow:hidden;aspect-ratio:4/3}
.b-pf05__img-wrap img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s cubic-bezier(.16,1,.3,1)}
.b-pf05__item:hover .b-pf05__img-wrap img{transform:scale(1.04)}
.b-pf05__info{padding:1.125rem 1.25rem}
.b-pf05__cat{font-family:var(--font-body);font-size:.6875rem;text-transform:uppercase;letter-spacing:.08em;color:var(--color-primary);font-weight:600}
.b-pf05__name{font-family:var(--font-heading);font-size:1rem;font-weight:600;color:var(--color-text);margin:.25rem 0 0;line-height:1.3}
@media(min-width:768px){.b-pf05__grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1024px){.b-pf05__grid{grid-template-columns:repeat(3,1fr);gap:1.75rem}}`,
  variants: [
    { id: "default", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-pf05{background:var(--color-primary)}.b-pf05__header h2{color:var(--color-text-on-primary)}.b-pf05__header p{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-pf05__tab{border-color:color-mix(in srgb,var(--color-text-on-primary) 20%,transparent);color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-pf05__tab:hover{border-color:var(--color-accent);color:var(--color-accent)}.b-pf05__tab--active{background:var(--color-accent);border-color:var(--color-accent);color:var(--color-text-on-accent)}.b-pf05__tab--active:hover{background:var(--color-accent);color:var(--color-text-on-accent)}.b-pf05__item{background:color-mix(in srgb,var(--color-text-on-primary) 6%,transparent);border-color:color-mix(in srgb,var(--color-text-on-primary) 10%,transparent)}.b-pf05__cat{color:var(--color-accent)}.b-pf05__name{color:var(--color-text-on-primary)}` },
    { id: "outline", label: "Контурные табы", css: `.b-pf05__tab--active{background:transparent;color:var(--color-primary);border-color:var(--color-primary);box-shadow:inset 0 0 0 1px var(--color-primary)}.b-pf05__tab--active:hover{background:transparent;color:var(--color-primary)}` },
  ],
};
