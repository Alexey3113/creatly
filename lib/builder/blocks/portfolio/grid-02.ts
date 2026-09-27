import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "portfolio-grid-02",
  name: "Портфолио — masonry-сетка",
  description: "Masonry-сетка работ разной высоты с подписями. CSS columns. Адаптивная раскладка: 3 колонки десктоп, 2 планшет, 1 мобильный",
  category: "portfolio",
  subcategory: "grid",
  icon: "▥",
  tags: ["portfolio", "masonry", "grid", "images", "captions"],
  motionLevel: "css",
  fields: [
    { name: "pf02-title", type: "heading", hint: "заголовок секции 3-6 слов", required: false },
    { name: "pf02-subtitle", type: "text", hint: "описание портфолио 1-2 предложения", required: false },
    { name: "pf02-img", type: "image", hint: "изображение проекта", required: true },
    { name: "pf02-caption", type: "text", hint: "подпись к работе 2-6 слов", required: false },
    { name: "pf02-cat", type: "text", hint: "категория 1-2 слова", required: false },
  ],
  html: `<section class="b-pf02" data-block="portfolio">
  <div class="b-pf02__inner">
    <div class="b-pf02__header" data-reveal="up">
      <h2 data-field="pf02-title">Галерея проектов</h2>
      <p data-field="pf02-subtitle">Подборка работ из разных направлений — дизайн, разработка и брендинг</p>
    </div>
    <div class="b-pf02__masonry" data-collection="pf02-img">
      <div class="b-pf02__item" data-reveal="fade" style="--stagger:0" data-collection-item>
        <div class="b-pf02__img-wrap">
          <img data-field="pf02-img" src="https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        </div>
        <div class="b-pf02__info">
          <span class="b-pf02__cat" data-field="pf02-cat">UI/UX</span>
          <p class="b-pf02__caption" data-field="pf02-caption">Мобильное приложение для фитнеса</p>
        </div>
      </div>
      <div class="b-pf02__item" data-reveal="fade" style="--stagger:1" data-collection-item>
        <div class="b-pf02__img-wrap b-pf02__img-wrap--tall">
          <img data-field="pf02-img" src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        </div>
        <div class="b-pf02__info">
          <span class="b-pf02__cat" data-field="pf02-cat">Брендинг</span>
          <p class="b-pf02__caption" data-field="pf02-caption">Айдентика кофейни «Зерно»</p>
        </div>
      </div>
      <div class="b-pf02__item" data-reveal="fade" style="--stagger:2" data-collection-item>
        <div class="b-pf02__img-wrap">
          <img data-field="pf02-img" src="https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        </div>
        <div class="b-pf02__info">
          <span class="b-pf02__cat" data-field="pf02-cat">Разработка</span>
          <p class="b-pf02__caption" data-field="pf02-caption">E-commerce платформа</p>
        </div>
      </div>
      <div class="b-pf02__item" data-reveal="fade" style="--stagger:3" data-collection-item>
        <div class="b-pf02__img-wrap b-pf02__img-wrap--tall">
          <img data-field="pf02-img" src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        </div>
        <div class="b-pf02__info">
          <span class="b-pf02__cat" data-field="pf02-cat">Дизайн</span>
          <p class="b-pf02__caption" data-field="pf02-caption">Интерфейс дашборда аналитики</p>
        </div>
      </div>
      <div class="b-pf02__item" data-reveal="fade" style="--stagger:4" data-collection-item>
        <div class="b-pf02__img-wrap">
          <img data-field="pf02-img" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        </div>
        <div class="b-pf02__info">
          <span class="b-pf02__cat" data-field="pf02-cat">Фото</span>
          <p class="b-pf02__caption" data-field="pf02-caption">Съёмка для каталога одежды</p>
        </div>
      </div>
      <div class="b-pf02__item" data-reveal="fade" style="--stagger:5" data-collection-item>
        <div class="b-pf02__img-wrap">
          <img data-field="pf02-img" src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        </div>
        <div class="b-pf02__info">
          <span class="b-pf02__cat" data-field="pf02-cat">Веб</span>
          <p class="b-pf02__caption" data-field="pf02-caption">Лендинг для стартапа</p>
        </div>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-pf02{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-pf02__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-pf02__header{text-align:center;margin-bottom:3.5rem}
.b-pf02__header h2{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem;letter-spacing:-0.02em}
.b-pf02__header p{font-family:var(--font-body);color:var(--color-text-muted);font-size:1.0625rem;line-height:1.6;margin:0;max-width:520px;margin-inline:auto}
.b-pf02__masonry{columns:1;column-gap:1.5rem}
.b-pf02__item{break-inside:avoid;margin-bottom:1.5rem;border-radius:var(--radius-lg);overflow:hidden;background:var(--color-surface);border:1px solid var(--color-border)}
.b-pf02__img-wrap{overflow:hidden}
.b-pf02__img-wrap img{width:100%;display:block;object-fit:cover;transition:transform .5s cubic-bezier(.16,1,.3,1)}
.b-pf02__img-wrap--tall img{aspect-ratio:3/4}
.b-pf02__img-wrap:not(.b-pf02__img-wrap--tall) img{aspect-ratio:4/3}
.b-pf02__item:hover .b-pf02__img-wrap img{transform:scale(1.04)}
.b-pf02__info{padding:1rem 1.25rem}
.b-pf02__cat{font-family:var(--font-body);font-size:.6875rem;text-transform:uppercase;letter-spacing:.08em;color:var(--color-primary);font-weight:600}
.b-pf02__caption{font-family:var(--font-body);font-size:.9375rem;color:var(--color-text);margin:.25rem 0 0;line-height:1.4}
@media(min-width:768px){.b-pf02__masonry{columns:2}}
@media(min-width:1024px){.b-pf02__masonry{columns:3;column-gap:1.75rem}}`,
  variants: [
    { id: "default", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-pf02{background:var(--color-primary)}.b-pf02__header h2{color:var(--color-text-on-primary)}.b-pf02__header p{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-pf02__item{background:color-mix(in srgb,var(--color-text-on-primary) 6%,transparent);border-color:color-mix(in srgb,var(--color-text-on-primary) 10%,transparent)}.b-pf02__cat{color:var(--color-accent)}.b-pf02__caption{color:var(--color-text-on-primary)}` },
    { id: "minimal", label: "Минималистичный", css: `.b-pf02__item{border:none;background:transparent;border-radius:var(--radius-md)}.b-pf02__info{padding:.75rem 0}` },
  ],
};
