import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "gallery-grid-02",
  name: "Галерея — masonry-сетка",
  description: "Masonry-раскладка из изображений разной высоты в 3 колонки через CSS columns",
  category: "gallery",
  subcategory: "grid",
  icon: "▥",
  tags: ["gallery", "masonry", "columns", "images", "pinterest"],
  motionLevel: "css",
  fields: [
    { name: "gl02-title", type: "heading", hint: "заголовок секции 3-6 слов", required: false },
    { name: "gl02-subtitle", type: "text", hint: "описание галереи 1-2 предложения", required: false },
    { name: "gl02-img", type: "image", hint: "изображение галереи", required: true },
    { name: "gl02-caption", type: "text", hint: "подпись к изображению 2-5 слов", required: false },
  ],
  html: `<section class="b-gl02" data-block="gallery">
  <div class="b-gl02__inner">
    <div class="b-gl02__header" data-reveal="up">
      <h2 data-field="gl02-title">Вдохновение и стиль</h2>
      <p data-field="gl02-subtitle">Коллекция изображений для настроения и визуального вдохновения</p>
    </div>
    <div class="b-gl02__masonry" data-collection="gl02-img">
      <div class="b-gl02__item" data-reveal="fade" style="--stagger:0" data-collection-item>
        <img data-field="gl02-img" src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Фото">
        <p class="b-gl02__caption" data-field="gl02-caption">Звёздная ночь</p>
      </div>
      <div class="b-gl02__item" data-reveal="fade" style="--stagger:1" data-collection-item>
        <img data-field="gl02-img" src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Фото">
        <p class="b-gl02__caption" data-field="gl02-caption">Водопад в джунглях</p>
      </div>
      <div class="b-gl02__item" data-reveal="fade" style="--stagger:2" data-collection-item>
        <img data-field="gl02-img" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Фото">
        <p class="b-gl02__caption" data-field="gl02-caption">Тропический пляж</p>
      </div>
      <div class="b-gl02__item" data-reveal="fade" style="--stagger:3" data-collection-item>
        <img data-field="gl02-img" src="https://images.unsplash.com/photo-1465056836900-8f1e940f1904?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Фото">
        <p class="b-gl02__caption" data-field="gl02-caption">Архитектура города</p>
      </div>
      <div class="b-gl02__item" data-reveal="fade" style="--stagger:4" data-collection-item>
        <img data-field="gl02-img" src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Фото">
        <p class="b-gl02__caption" data-field="gl02-caption">Морская волна</p>
      </div>
      <div class="b-gl02__item" data-reveal="fade" style="--stagger:5" data-collection-item>
        <img data-field="gl02-img" src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Фото">
        <p class="b-gl02__caption" data-field="gl02-caption">Космическая перспектива</p>
      </div>
      <div class="b-gl02__item" data-reveal="fade" style="--stagger:6" data-collection-item>
        <img data-field="gl02-img" src="https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Фото">
        <p class="b-gl02__caption" data-field="gl02-caption">Северное сияние</p>
      </div>
      <div class="b-gl02__item" data-reveal="fade" style="--stagger:7" data-collection-item>
        <img data-field="gl02-img" src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Фото">
        <p class="b-gl02__caption" data-field="gl02-caption">Золотой рассвет</p>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-gl02{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-gl02__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-gl02__header{text-align:center;margin-bottom:3.5rem}
.b-gl02__header h2{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem;letter-spacing:-0.02em}
.b-gl02__header p{font-family:var(--font-body);color:var(--color-text-muted);font-size:1.0625rem;line-height:1.6;margin:0;max-width:520px;margin-inline:auto}
.b-gl02__masonry{columns:1;column-gap:1.5rem}
.b-gl02__item{break-inside:avoid;margin-bottom:1.5rem;border-radius:var(--radius-lg);overflow:hidden;background:var(--color-surface);border:1px solid var(--color-border);transition:transform .4s cubic-bezier(.16,1,.3,1),box-shadow .4s}
.b-gl02__item:hover{transform:translateY(-4px);box-shadow:0 12px 32px color-mix(in srgb,var(--color-text) 10%,transparent)}
.b-gl02__item img{width:100%;display:block;object-fit:cover}
.b-gl02__caption{font-family:var(--font-body);color:var(--color-text-muted);font-size:.875rem;margin:0;padding:.875rem 1rem}
@media(min-width:768px){.b-gl02__masonry{columns:2}}
@media(min-width:1024px){.b-gl02__masonry{columns:3}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-gl02{background:var(--color-primary)}.b-gl02__header h2{color:var(--color-text-on-primary)}.b-gl02__header p{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-gl02__item{background:color-mix(in srgb,var(--color-text-on-primary) 6%,transparent);border-color:color-mix(in srgb,var(--color-text-on-primary) 12%,transparent)}.b-gl02__caption{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}` },
    { id: "rounded", label: "Скруглённый", css: `.b-gl02__item{border-radius:var(--radius-full);overflow:hidden}.b-gl02__caption{text-align:center}` },
  ],
};
