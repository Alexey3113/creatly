import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "gallery-grid-01",
  name: "Галерея — сетка 3×2",
  description: "Равномерная сетка из 6 изображений с подписями и hover-зумом. 3 колонки на десктопе, 2 на планшете, 1 на мобильном",
  category: "gallery",
  subcategory: "grid",
  icon: "▦",
  tags: ["gallery", "grid", "images", "hover", "zoom"],
  motionLevel: "css",
  fields: [
    { name: "gl01-title", type: "heading", hint: "заголовок секции 3-6 слов", required: false },
    { name: "gl01-subtitle", type: "text", hint: "описание галереи 1-2 предложения", required: false },
    { name: "gl01-img", type: "image", hint: "изображение галереи", required: true },
    { name: "gl01-caption", type: "text", hint: "подпись к изображению 2-5 слов", required: false },
  ],
  html: `<section class="b-gl01" data-block="gallery">
  <div class="b-gl01__inner">
    <div class="b-gl01__header" data-reveal="up">
      <h2 data-field="gl01-title">Наши последние работы</h2>
      <p data-field="gl01-subtitle">Избранные проекты из портфолио студии за последний год</p>
    </div>
    <div class="b-gl01__grid" data-collection="gl01-img">
      <div class="b-gl01__item" data-reveal="up" style="--stagger:0" data-collection-item>
        <div class="b-gl01__img-wrap">
          <img data-field="gl01-img" src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        </div>
        <p class="b-gl01__caption" data-field="gl01-caption">Горный пейзаж</p>
      </div>
      <div class="b-gl01__item" data-reveal="up" style="--stagger:1" data-collection-item>
        <div class="b-gl01__img-wrap">
          <img data-field="gl01-img" src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        </div>
        <p class="b-gl01__caption" data-field="gl01-caption">Лесное озеро</p>
      </div>
      <div class="b-gl01__item" data-reveal="up" style="--stagger:2" data-collection-item>
        <div class="b-gl01__img-wrap">
          <img data-field="gl01-img" src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        </div>
        <p class="b-gl01__caption" data-field="gl01-caption">Утренний туман</p>
      </div>
      <div class="b-gl01__item" data-reveal="up" style="--stagger:3" data-collection-item>
        <div class="b-gl01__img-wrap">
          <img data-field="gl01-img" src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        </div>
        <p class="b-gl01__caption" data-field="gl01-caption">Зелёный лес</p>
      </div>
      <div class="b-gl01__item" data-reveal="up" style="--stagger:4" data-collection-item>
        <div class="b-gl01__img-wrap">
          <img data-field="gl01-img" src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        </div>
        <p class="b-gl01__caption" data-field="gl01-caption">Солнечная долина</p>
      </div>
      <div class="b-gl01__item" data-reveal="up" style="--stagger:5" data-collection-item>
        <div class="b-gl01__img-wrap">
          <img data-field="gl01-img" src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        </div>
        <p class="b-gl01__caption" data-field="gl01-caption">Закат в горах</p>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-gl01{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-gl01__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-gl01__header{text-align:center;margin-bottom:3.5rem}
.b-gl01__header h2{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem;letter-spacing:-0.02em}
.b-gl01__header p{font-family:var(--font-body);color:var(--color-text-muted);font-size:1.0625rem;line-height:1.6;margin:0;max-width:520px;margin-inline:auto}
.b-gl01__grid{display:grid;grid-template-columns:1fr;gap:1.5rem}
.b-gl01__item{border-radius:var(--radius-lg);overflow:hidden;background:var(--color-surface);border:1px solid var(--color-border)}
.b-gl01__img-wrap{overflow:hidden;aspect-ratio:4/3}
.b-gl01__img-wrap img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s cubic-bezier(.16,1,.3,1)}
.b-gl01__item:hover .b-gl01__img-wrap img{transform:scale(1.06)}
.b-gl01__caption{font-family:var(--font-body);color:var(--color-text-muted);font-size:.875rem;margin:0;padding:.875rem 1rem}
@media(min-width:768px){.b-gl01__grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1024px){.b-gl01__grid{grid-template-columns:repeat(3,1fr);gap:1.75rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-gl01{background:var(--color-primary)}.b-gl01__header h2{color:var(--color-text-on-primary)}.b-gl01__header p{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-gl01__item{background:color-mix(in srgb,var(--color-text-on-primary) 6%,transparent);border-color:color-mix(in srgb,var(--color-text-on-primary) 12%,transparent)}.b-gl01__caption{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}` },
    { id: "borderless", label: "Без рамок", css: `.b-gl01__item{border:none;background:transparent;border-radius:var(--radius-md)}.b-gl01__caption{padding:.75rem 0;text-align:center}` },
  ],
};
