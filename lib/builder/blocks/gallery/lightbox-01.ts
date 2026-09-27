import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "gallery-lightbox-01",
  name: "Галерея — сетка с hover-оверлеем",
  description: "Сетка 2×3 из изображений с тёмным оверлеем при наведении, показывающим название и категорию",
  category: "gallery",
  subcategory: "lightbox",
  icon: "◧",
  tags: ["gallery", "lightbox", "overlay", "hover", "portfolio"],
  motionLevel: "css",
  fields: [
    { name: "gl06-title", type: "heading", hint: "заголовок секции 3-6 слов", required: false },
    { name: "gl06-subtitle", type: "text", hint: "описание галереи 1-2 предложения", required: false },
    { name: "gl06-img", type: "image", hint: "изображение проекта", required: true },
    { name: "gl06-name", type: "text", hint: "название проекта 2-4 слова", required: true },
    { name: "gl06-category", type: "text", hint: "категория проекта 1-2 слова", required: true },
  ],
  html: `<section class="b-gl06" data-block="gallery">
  <div class="b-gl06__inner">
    <div class="b-gl06__header" data-reveal="up">
      <h2 data-field="gl06-title">Портфолио работ</h2>
      <p data-field="gl06-subtitle">Наведите на изображение, чтобы узнать подробности о проекте</p>
    </div>
    <div class="b-gl06__grid" data-collection="gl06-img">
      <div class="b-gl06__card" data-reveal="up" style="--stagger:0" data-collection-item>
        <img data-field="gl06-img" src="https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        <div class="b-gl06__hover">
          <span class="b-gl06__cat" data-field="gl06-category">Брендинг</span>
          <h3 class="b-gl06__name" data-field="gl06-name">Айдентика «Волна»</h3>
        </div>
      </div>
      <div class="b-gl06__card" data-reveal="up" style="--stagger:1" data-collection-item>
        <img data-field="gl06-img" src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        <div class="b-gl06__hover">
          <span class="b-gl06__cat" data-field="gl06-category">Веб-дизайн</span>
          <h3 class="b-gl06__name" data-field="gl06-name">Редизайн портала</h3>
        </div>
      </div>
      <div class="b-gl06__card" data-reveal="up" style="--stagger:2" data-collection-item>
        <img data-field="gl06-img" src="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        <div class="b-gl06__hover">
          <span class="b-gl06__cat" data-field="gl06-category">Иллюстрация</span>
          <h3 class="b-gl06__name" data-field="gl06-name">Серия постеров</h3>
        </div>
      </div>
      <div class="b-gl06__card" data-reveal="up" style="--stagger:3" data-collection-item>
        <img data-field="gl06-img" src="https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        <div class="b-gl06__hover">
          <span class="b-gl06__cat" data-field="gl06-category">Упаковка</span>
          <h3 class="b-gl06__name" data-field="gl06-name">Линейка напитков</h3>
        </div>
      </div>
      <div class="b-gl06__card" data-reveal="up" style="--stagger:4" data-collection-item>
        <img data-field="gl06-img" src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        <div class="b-gl06__hover">
          <span class="b-gl06__cat" data-field="gl06-category">UI/UX</span>
          <h3 class="b-gl06__name" data-field="gl06-name">Мобильное приложение</h3>
        </div>
      </div>
      <div class="b-gl06__card" data-reveal="up" style="--stagger:5" data-collection-item>
        <img data-field="gl06-img" src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        <div class="b-gl06__hover">
          <span class="b-gl06__cat" data-field="gl06-category">Типографика</span>
          <h3 class="b-gl06__name" data-field="gl06-name">Шрифт «Геометрия»</h3>
        </div>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-gl06{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-gl06__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-gl06__header{text-align:center;margin-bottom:3.5rem}
.b-gl06__header h2{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem;letter-spacing:-0.02em}
.b-gl06__header p{font-family:var(--font-body);color:var(--color-text-muted);font-size:1.0625rem;line-height:1.6;margin:0;max-width:520px;margin-inline:auto}
.b-gl06__grid{display:grid;grid-template-columns:1fr;gap:1.25rem}
.b-gl06__card{position:relative;border-radius:var(--radius-lg);overflow:hidden;aspect-ratio:4/3;cursor:pointer}
.b-gl06__card img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s cubic-bezier(.16,1,.3,1)}
.b-gl06__card:hover img{transform:scale(1.06)}
.b-gl06__hover{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.5rem;background:color-mix(in srgb,var(--color-text) 65%,transparent);opacity:0;transition:opacity .35s ease}
.b-gl06__card:hover .b-gl06__hover{opacity:1}
.b-gl06__cat{font-family:var(--font-body);font-size:.75rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--color-accent);transform:translateY(8px);transition:transform .35s cubic-bezier(.16,1,.3,1)}
.b-gl06__card:hover .b-gl06__cat{transform:translateY(0)}
.b-gl06__name{font-family:var(--font-heading);font-size:clamp(1rem,2vw,1.375rem);color:var(--color-bg);margin:0;text-align:center;transform:translateY(12px);transition:transform .4s cubic-bezier(.16,1,.3,1)}
.b-gl06__card:hover .b-gl06__name{transform:translateY(0)}
@media(min-width:768px){.b-gl06__grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1024px){.b-gl06__grid{grid-template-columns:repeat(3,1fr);gap:1.5rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-gl06{background:var(--color-primary)}.b-gl06__header h2{color:var(--color-text-on-primary)}.b-gl06__header p{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-gl06__hover{background:color-mix(in srgb,var(--color-primary) 75%,transparent)}.b-gl06__name{color:var(--color-text-on-primary)}` },
    { id: "bottom-bar", label: "Нижняя панель", css: `.b-gl06__hover{inset:auto 0 0 0;flex-direction:row;justify-content:space-between;padding:1rem 1.25rem;background:color-mix(in srgb,var(--color-text) 80%,transparent);opacity:1;transform:translateY(100%);transition:transform .35s cubic-bezier(.16,1,.3,1),opacity 0s}.b-gl06__card:hover .b-gl06__hover{transform:translateY(0)}.b-gl06__cat,.b-gl06__name{transform:none}.b-gl06__card:hover .b-gl06__cat,.b-gl06__card:hover .b-gl06__name{transform:none}` },
  ],
};
