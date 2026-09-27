import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "product-showcase-gallery-01",
  name: "Продукт — Горизонтальная галерея",
  description: "Горизонтальная лента изображений продукта с CSS scroll-snap",
  category: "product-showcase",
  subcategory: "gallery",
  icon: "📸",
  tags: ["product", "gallery", "scroll", "snap", "carousel", "screenshots"],
  motionLevel: "css",
  fields: [
    { name: "ps03-title", type: "heading", hint: "заголовок секции 3-6 слов", required: true },
    { name: "ps03-desc", type: "text", hint: "описание продукта 1-2 предложения", required: false },
    { name: "ps03-slide-image", type: "image", hint: "скриншот продукта 600×400+", required: true },
    { name: "ps03-slide-caption", type: "text", hint: "подпись к скриншоту 3-8 слов", required: false },
  ],
  html: `<section class="b-ps03" data-block="product-showcase">
  <div class="b-ps03__inner">
    <div class="b-ps03__header" data-reveal="up">
      <h2 class="b-ps03__title" data-field="ps03-title">Интерфейс изнутри</h2>
      <p class="b-ps03__desc" data-field="ps03-desc">Изучите каждый экран нашего продукта — от дашборда до настроек</p>
    </div>
    <div class="b-ps03__track" data-collection="ps03-slide-image" data-reveal="fade">
      <div class="b-ps03__slide" style="--stagger:0" data-collection-item>
        <img class="b-ps03__slide-img" data-field="ps03-slide-image" src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&amp;q=80" alt="Дашборд">
        <p class="b-ps03__caption" data-field="ps03-slide-caption">Главный дашборд</p>
      </div>
      <div class="b-ps03__slide" style="--stagger:1" data-collection-item>
        <img class="b-ps03__slide-img" data-field="ps03-slide-image" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&amp;q=80" alt="Аналитика">
        <p class="b-ps03__caption" data-field="ps03-slide-caption">Панель аналитики</p>
      </div>
      <div class="b-ps03__slide" style="--stagger:2" data-collection-item>
        <img class="b-ps03__slide-img" data-field="ps03-slide-image" src="https://images.unsplash.com/photo-1555421689-d68471e189f2?w=600&amp;q=80" alt="Проекты">
        <p class="b-ps03__caption" data-field="ps03-slide-caption">Управление проектами</p>
      </div>
      <div class="b-ps03__slide" style="--stagger:3" data-collection-item>
        <img class="b-ps03__slide-img" data-field="ps03-slide-image" src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&amp;q=80" alt="Команда">
        <p class="b-ps03__caption" data-field="ps03-slide-caption">Командная работа</p>
      </div>
      <div class="b-ps03__slide" style="--stagger:4" data-collection-item>
        <img class="b-ps03__slide-img" data-field="ps03-slide-image" src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&amp;q=80" alt="Настройки">
        <p class="b-ps03__caption" data-field="ps03-slide-caption">Гибкие настройки</p>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-ps03{padding:var(--space-section) 0;background:var(--color-bg)}
.b-ps03__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-ps03__header{text-align:center;padding:0 var(--space-block);margin-bottom:2.5rem}
.b-ps03__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem;letter-spacing:-0.02em}
.b-ps03__desc{font-family:var(--font-body);font-size:1.05rem;color:var(--color-text-muted);margin:0;line-height:1.6;max-width:540px;margin-inline:auto}
.b-ps03__track{display:flex;gap:1.25rem;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;padding:0 var(--space-block) 1.5rem;scrollbar-width:thin;scrollbar-color:var(--color-border) transparent}
.b-ps03__track::-webkit-scrollbar{height:6px}
.b-ps03__track::-webkit-scrollbar-track{background:transparent}
.b-ps03__track::-webkit-scrollbar-thumb{background:var(--color-border);border-radius:var(--radius-full)}
.b-ps03__slide{flex:0 0 80%;scroll-snap-align:center;border-radius:var(--radius-lg);overflow:hidden;background:var(--color-surface);transition:transform .4s cubic-bezier(.22,1,.36,1),box-shadow .4s ease}
.b-ps03__slide:hover{transform:translateY(-4px);box-shadow:0 16px 48px color-mix(in srgb,var(--color-text) 10%,transparent)}
.b-ps03__slide-img{width:100%;aspect-ratio:3/2;object-fit:cover;display:block}
.b-ps03__caption{font-family:var(--font-body);font-size:.875rem;color:var(--color-text-muted);margin:0;padding:.875rem 1.25rem;text-align:center}
@media(min-width:768px){.b-ps03__slide{flex:0 0 45%}.b-ps03__track{gap:1.5rem}}
@media(min-width:1024px){.b-ps03__slide{flex:0 0 35%}.b-ps03__track{gap:2rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-ps03{background:var(--color-primary)}.b-ps03__title{color:var(--color-text-on-primary)}.b-ps03__desc{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-ps03__slide{background:color-mix(in srgb,var(--color-text-on-primary) 6%,transparent)}.b-ps03__caption{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}` },
    { id: "bordered", label: "С рамкой", css: `.b-ps03__slide{border:1px solid var(--color-border);box-shadow:none}.b-ps03__slide:hover{box-shadow:0 8px 32px color-mix(in srgb,var(--color-text) 8%,transparent)}` },
  ],
};
