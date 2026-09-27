import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "portfolio-carousel-01",
  name: "Портфолио — карусель",
  description: "Горизонтальная карусель работ с CSS scroll-snap. Каждый слайд: изображение, название и категория. Свайп на мобильных, скролл на десктопе",
  category: "portfolio",
  subcategory: "carousel",
  icon: "⟷",
  tags: ["portfolio", "carousel", "scroll", "snap", "horizontal"],
  motionLevel: "css",
  fields: [
    { name: "pf04-title", type: "heading", hint: "заголовок секции 3-6 слов", required: false },
    { name: "pf04-subtitle", type: "text", hint: "описание портфолио 1-2 предложения", required: false },
    { name: "pf04-img", type: "image", hint: "изображение проекта", required: true },
    { name: "pf04-name", type: "text", hint: "название проекта 2-5 слов", required: true },
    { name: "pf04-cat", type: "text", hint: "категория 1-2 слова", required: false },
  ],
  html: `<section class="b-pf04" data-block="portfolio">
  <div class="b-pf04__inner">
    <div class="b-pf04__header" data-reveal="up">
      <h2 data-field="pf04-title">Наши работы</h2>
      <p data-field="pf04-subtitle">Листайте, чтобы увидеть все проекты — от концепции до финального результата</p>
    </div>
    <div class="b-pf04__track" data-collection="pf04-img">
      <div class="b-pf04__slide" data-reveal="up" style="--stagger:0" data-collection-item>
        <div class="b-pf04__img-wrap">
          <img data-field="pf04-img" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&amp;fit=crop&amp;w=700&amp;q=80" alt="Проект">
        </div>
        <div class="b-pf04__info">
          <span class="b-pf04__cat" data-field="pf04-cat">Веб-дизайн</span>
          <h3 class="b-pf04__name" data-field="pf04-name">Корпоративный сайт «Вектор»</h3>
        </div>
      </div>
      <div class="b-pf04__slide" data-reveal="up" style="--stagger:1" data-collection-item>
        <div class="b-pf04__img-wrap">
          <img data-field="pf04-img" src="https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&amp;fit=crop&amp;w=700&amp;q=80" alt="Проект">
        </div>
        <div class="b-pf04__info">
          <span class="b-pf04__cat" data-field="pf04-cat">Брендинг</span>
          <h3 class="b-pf04__name" data-field="pf04-name">Ребрендинг сети отелей</h3>
        </div>
      </div>
      <div class="b-pf04__slide" data-reveal="up" style="--stagger:2" data-collection-item>
        <div class="b-pf04__img-wrap">
          <img data-field="pf04-img" src="https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&amp;fit=crop&amp;w=700&amp;q=80" alt="Проект">
        </div>
        <div class="b-pf04__info">
          <span class="b-pf04__cat" data-field="pf04-cat">Маркетинг</span>
          <h3 class="b-pf04__name" data-field="pf04-name">Рекламная кампания запуска</h3>
        </div>
      </div>
      <div class="b-pf04__slide" data-reveal="up" style="--stagger:3" data-collection-item>
        <div class="b-pf04__img-wrap">
          <img data-field="pf04-img" src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&amp;fit=crop&amp;w=700&amp;q=80" alt="Проект">
        </div>
        <div class="b-pf04__info">
          <span class="b-pf04__cat" data-field="pf04-cat">UI/UX</span>
          <h3 class="b-pf04__name" data-field="pf04-name">Дашборд для финтеха</h3>
        </div>
      </div>
      <div class="b-pf04__slide" data-reveal="up" style="--stagger:4" data-collection-item>
        <div class="b-pf04__img-wrap">
          <img data-field="pf04-img" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&amp;fit=crop&amp;w=700&amp;q=80" alt="Проект">
        </div>
        <div class="b-pf04__info">
          <span class="b-pf04__cat" data-field="pf04-cat">Разработка</span>
          <h3 class="b-pf04__name" data-field="pf04-name">Мобильное приложение доставки</h3>
        </div>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-pf04{padding:var(--space-section) 0;background:var(--color-bg)}
.b-pf04__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-pf04__header{text-align:center;margin-bottom:3rem;padding:0 var(--space-block)}
.b-pf04__header h2{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem;letter-spacing:-0.02em}
.b-pf04__header p{font-family:var(--font-body);color:var(--color-text-muted);font-size:1.0625rem;line-height:1.6;margin:0;max-width:520px;margin-inline:auto}
.b-pf04__track{display:flex;gap:1.5rem;overflow-x:auto;scroll-snap-type:x mandatory;scroll-padding:0 var(--space-block);padding:0 var(--space-block) 1rem;-webkit-overflow-scrolling:touch;scrollbar-width:thin;scrollbar-color:var(--color-border) transparent}
.b-pf04__track::-webkit-scrollbar{height:6px}
.b-pf04__track::-webkit-scrollbar-track{background:transparent}
.b-pf04__track::-webkit-scrollbar-thumb{background:var(--color-border);border-radius:var(--radius-full)}
.b-pf04__slide{flex:0 0 85%;scroll-snap-align:start;border-radius:var(--radius-lg);overflow:hidden;background:var(--color-surface);border:1px solid var(--color-border);transition:box-shadow .3s ease}
.b-pf04__slide:hover{box-shadow:0 8px 32px color-mix(in srgb,var(--color-text) 8%,transparent)}
.b-pf04__img-wrap{overflow:hidden;aspect-ratio:16/10}
.b-pf04__img-wrap img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s cubic-bezier(.16,1,.3,1)}
.b-pf04__slide:hover .b-pf04__img-wrap img{transform:scale(1.04)}
.b-pf04__info{padding:1.25rem 1.5rem}
.b-pf04__cat{font-family:var(--font-body);font-size:.6875rem;text-transform:uppercase;letter-spacing:.08em;color:var(--color-primary);font-weight:600}
.b-pf04__name{font-family:var(--font-heading);font-size:1.125rem;font-weight:600;color:var(--color-text);margin:.375rem 0 0;line-height:1.3}
@media(min-width:768px){.b-pf04__slide{flex:0 0 45%}}
@media(min-width:1024px){.b-pf04__slide{flex:0 0 35%}.b-pf04__track{gap:1.75rem}}`,
  variants: [
    { id: "default", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-pf04{background:var(--color-primary)}.b-pf04__header h2{color:var(--color-text-on-primary)}.b-pf04__header p{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-pf04__slide{background:color-mix(in srgb,var(--color-text-on-primary) 6%,transparent);border-color:color-mix(in srgb,var(--color-text-on-primary) 10%,transparent)}.b-pf04__cat{color:var(--color-accent)}.b-pf04__name{color:var(--color-text-on-primary)}.b-pf04__track{scrollbar-color:color-mix(in srgb,var(--color-text-on-primary) 20%,transparent) transparent}` },
    { id: "borderless", label: "Без рамок", css: `.b-pf04__slide{border:none;background:transparent;box-shadow:none}.b-pf04__slide:hover{box-shadow:none}.b-pf04__info{padding:1rem 0}` },
  ],
};
