import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "portfolio-grid-01",
  name: "Портфолио — сетка 3×2",
  description: "Сетка из 6 работ с hover-оверлеем: тёмное затемнение с названием проекта и категорией. 3 колонки десктоп, 2 планшет, 1 мобильный",
  category: "portfolio",
  subcategory: "grid",
  icon: "▦",
  tags: ["portfolio", "grid", "hover", "overlay", "projects"],
  motionLevel: "css",
  fields: [
    { name: "pf01-title", type: "heading", hint: "заголовок секции 3-6 слов", required: false },
    { name: "pf01-subtitle", type: "text", hint: "описание портфолио 1-2 предложения", required: false },
    { name: "pf01-img", type: "image", hint: "изображение проекта", required: true },
    { name: "pf01-name", type: "text", hint: "название проекта 2-5 слов", required: true },
    { name: "pf01-cat", type: "text", hint: "категория проекта 1-2 слова", required: false },
  ],
  html: `<section class="b-pf01" data-block="portfolio">
  <div class="b-pf01__inner">
    <div class="b-pf01__header" data-reveal="up">
      <h2 data-field="pf01-title">Избранные проекты</h2>
      <p data-field="pf01-subtitle">Работы, которыми мы по-настоящему гордимся — от идеи до реализации</p>
    </div>
    <div class="b-pf01__grid" data-collection="pf01-img">
      <div class="b-pf01__item" data-reveal="up" style="--stagger:0" data-collection-item>
        <img data-field="pf01-img" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        <div class="b-pf01__overlay">
          <span class="b-pf01__cat" data-field="pf01-cat">Веб-дизайн</span>
          <h3 class="b-pf01__name" data-field="pf01-name">Редизайн корпоративного портала</h3>
        </div>
      </div>
      <div class="b-pf01__item" data-reveal="up" style="--stagger:1" data-collection-item>
        <img data-field="pf01-img" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        <div class="b-pf01__overlay">
          <span class="b-pf01__cat" data-field="pf01-cat">Разработка</span>
          <h3 class="b-pf01__name" data-field="pf01-name">Мобильное приложение банка</h3>
        </div>
      </div>
      <div class="b-pf01__item" data-reveal="up" style="--stagger:2" data-collection-item>
        <img data-field="pf01-img" src="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        <div class="b-pf01__overlay">
          <span class="b-pf01__cat" data-field="pf01-cat">Брендинг</span>
          <h3 class="b-pf01__name" data-field="pf01-name">Фирменный стиль ресторана</h3>
        </div>
      </div>
      <div class="b-pf01__item" data-reveal="up" style="--stagger:3" data-collection-item>
        <img data-field="pf01-img" src="https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        <div class="b-pf01__overlay">
          <span class="b-pf01__cat" data-field="pf01-cat">UI/UX</span>
          <h3 class="b-pf01__name" data-field="pf01-name">Интерфейс аналитической платформы</h3>
        </div>
      </div>
      <div class="b-pf01__item" data-reveal="up" style="--stagger:4" data-collection-item>
        <img data-field="pf01-img" src="https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        <div class="b-pf01__overlay">
          <span class="b-pf01__cat" data-field="pf01-cat">Маркетинг</span>
          <h3 class="b-pf01__name" data-field="pf01-name">Лендинг запуска продукта</h3>
        </div>
      </div>
      <div class="b-pf01__item" data-reveal="up" style="--stagger:5" data-collection-item>
        <img data-field="pf01-img" src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        <div class="b-pf01__overlay">
          <span class="b-pf01__cat" data-field="pf01-cat">Дизайн</span>
          <h3 class="b-pf01__name" data-field="pf01-name">Дашборд для SaaS-сервиса</h3>
        </div>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-pf01{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-pf01__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-pf01__header{text-align:center;margin-bottom:3.5rem}
.b-pf01__header h2{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem;letter-spacing:-0.02em}
.b-pf01__header p{font-family:var(--font-body);color:var(--color-text-muted);font-size:1.0625rem;line-height:1.6;margin:0;max-width:520px;margin-inline:auto}
.b-pf01__grid{display:grid;grid-template-columns:1fr;gap:1.5rem}
.b-pf01__item{position:relative;border-radius:var(--radius-lg);overflow:hidden;aspect-ratio:4/3;cursor:pointer}
.b-pf01__item img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s cubic-bezier(.16,1,.3,1)}
.b-pf01__overlay{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;padding:1.5rem;background:linear-gradient(to top,rgba(0,0,0,.72) 0%,rgba(0,0,0,.15) 50%,transparent 100%);opacity:0;transition:opacity .4s cubic-bezier(.16,1,.3,1)}
.b-pf01__item:hover .b-pf01__overlay{opacity:1}
.b-pf01__item:hover img{transform:scale(1.05)}
.b-pf01__cat{font-family:var(--font-body);font-size:.75rem;text-transform:uppercase;letter-spacing:.08em;color:rgba(255,255,255,.7);margin-bottom:.375rem;transform:translateY(8px);transition:transform .4s cubic-bezier(.16,1,.3,1)}
.b-pf01__name{font-family:var(--font-heading);font-size:1.125rem;font-weight:600;color:#fff;margin:0;transform:translateY(8px);transition:transform .4s cubic-bezier(.16,1,.3,1) .05s}
.b-pf01__item:hover .b-pf01__cat,.b-pf01__item:hover .b-pf01__name{transform:translateY(0)}
@media(min-width:768px){.b-pf01__grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1024px){.b-pf01__grid{grid-template-columns:repeat(3,1fr);gap:1.75rem}}`,
  variants: [
    { id: "default", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-pf01{background:var(--color-primary)}.b-pf01__header h2{color:var(--color-text-on-primary)}.b-pf01__header p{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}` },
    { id: "rounded", label: "Скруглённый", css: `.b-pf01__item{border-radius:var(--radius-full);aspect-ratio:1/1}.b-pf01__overlay{border-radius:var(--radius-full);padding:2rem;justify-content:center;align-items:center;text-align:center;background:rgba(0,0,0,.55)}` },
  ],
};
