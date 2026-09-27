import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "gallery-carousel-01",
  name: "Галерея — горизонтальная карусель",
  description: "Горизонтальная карусель с CSS scroll-snap: плавное перелистывание изображений",
  category: "gallery",
  subcategory: "carousel",
  icon: "⇔",
  tags: ["gallery", "carousel", "scroll", "snap", "horizontal"],
  motionLevel: "css",
  fields: [
    { name: "gl04-title", type: "heading", hint: "заголовок секции 3-6 слов", required: false },
    { name: "gl04-subtitle", type: "text", hint: "описание галереи 1-2 предложения", required: false },
    { name: "gl04-img", type: "image", hint: "изображение карусели", required: true },
    { name: "gl04-caption", type: "text", hint: "подпись к изображению 2-5 слов", required: false },
  ],
  html: `<section class="b-gl04" data-block="gallery">
  <div class="b-gl04__inner">
    <div class="b-gl04__header" data-reveal="up">
      <h2 data-field="gl04-title">Галерея проектов</h2>
      <p data-field="gl04-subtitle">Листайте горизонтально, чтобы увидеть все работы</p>
    </div>
    <div class="b-gl04__track" data-collection="gl04-img">
      <div class="b-gl04__slide" data-reveal="fade" style="--stagger:0" data-collection-item>
        <div class="b-gl04__img-wrap">
          <img data-field="gl04-img" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&amp;fit=crop&amp;w=700&amp;q=80" alt="Проект">
        </div>
        <p class="b-gl04__caption" data-field="gl04-caption">Аналитическая панель</p>
      </div>
      <div class="b-gl04__slide" data-reveal="fade" style="--stagger:1" data-collection-item>
        <div class="b-gl04__img-wrap">
          <img data-field="gl04-img" src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&amp;fit=crop&amp;w=700&amp;q=80" alt="Проект">
        </div>
        <p class="b-gl04__caption" data-field="gl04-caption">Дашборд метрик</p>
      </div>
      <div class="b-gl04__slide" data-reveal="fade" style="--stagger:2" data-collection-item>
        <div class="b-gl04__img-wrap">
          <img data-field="gl04-img" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&amp;fit=crop&amp;w=700&amp;q=80" alt="Проект">
        </div>
        <p class="b-gl04__caption" data-field="gl04-caption">Разработка кода</p>
      </div>
      <div class="b-gl04__slide" data-reveal="fade" style="--stagger:3" data-collection-item>
        <div class="b-gl04__img-wrap">
          <img data-field="gl04-img" src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&amp;fit=crop&amp;w=700&amp;q=80" alt="Проект">
        </div>
        <p class="b-gl04__caption" data-field="gl04-caption">Креативный процесс</p>
      </div>
      <div class="b-gl04__slide" data-reveal="fade" style="--stagger:4" data-collection-item>
        <div class="b-gl04__img-wrap">
          <img data-field="gl04-img" src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&amp;fit=crop&amp;w=700&amp;q=80" alt="Проект">
        </div>
        <p class="b-gl04__caption" data-field="gl04-caption">Технологии будущего</p>
      </div>
      <div class="b-gl04__slide" data-reveal="fade" style="--stagger:5" data-collection-item>
        <div class="b-gl04__img-wrap">
          <img data-field="gl04-img" src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&amp;fit=crop&amp;w=700&amp;q=80" alt="Проект">
        </div>
        <p class="b-gl04__caption" data-field="gl04-caption">Рабочее пространство</p>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-gl04{padding:var(--space-section) 0;background:var(--color-bg)}
.b-gl04__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-gl04__header{text-align:center;margin-bottom:3rem;padding:0 var(--space-block)}
.b-gl04__header h2{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem;letter-spacing:-0.02em}
.b-gl04__header p{font-family:var(--font-body);color:var(--color-text-muted);font-size:1.0625rem;line-height:1.6;margin:0;max-width:520px;margin-inline:auto}
.b-gl04__track{display:flex;gap:1.25rem;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;padding:0 var(--space-block) 1.5rem;scrollbar-width:thin;scrollbar-color:var(--color-border) transparent}
.b-gl04__track::-webkit-scrollbar{height:6px}
.b-gl04__track::-webkit-scrollbar-track{background:transparent}
.b-gl04__track::-webkit-scrollbar-thumb{background:var(--color-border);border-radius:var(--radius-full)}
.b-gl04__slide{scroll-snap-align:start;flex:0 0 85%;max-width:420px;border-radius:var(--radius-lg);overflow:hidden;background:var(--color-surface);border:1px solid var(--color-border);transition:transform .4s cubic-bezier(.16,1,.3,1)}
.b-gl04__slide:hover{transform:translateY(-3px)}
.b-gl04__img-wrap{overflow:hidden;aspect-ratio:16/10}
.b-gl04__img-wrap img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s cubic-bezier(.16,1,.3,1)}
.b-gl04__slide:hover .b-gl04__img-wrap img{transform:scale(1.04)}
.b-gl04__caption{font-family:var(--font-body);color:var(--color-text-muted);font-size:.875rem;margin:0;padding:.875rem 1.125rem}
@media(min-width:768px){.b-gl04__slide{flex:0 0 45%;max-width:480px}}
@media(min-width:1024px){.b-gl04__slide{flex:0 0 32%;max-width:520px}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-gl04{background:var(--color-primary)}.b-gl04__header h2{color:var(--color-text-on-primary)}.b-gl04__header p{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-gl04__slide{background:color-mix(in srgb,var(--color-text-on-primary) 6%,transparent);border-color:color-mix(in srgb,var(--color-text-on-primary) 12%,transparent)}.b-gl04__caption{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-gl04__track{scrollbar-color:color-mix(in srgb,var(--color-text-on-primary) 20%,transparent) transparent}` },
    { id: "full-width-slides", label: "Широкие слайды", css: `.b-gl04__slide{flex:0 0 90%;max-width:700px}.b-gl04__img-wrap{aspect-ratio:21/9}@media(min-width:768px){.b-gl04__slide{flex:0 0 70%}}@media(min-width:1024px){.b-gl04__slide{flex:0 0 55%}}` },
  ],
};
