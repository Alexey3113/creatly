import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "blog-grid-01",
  name: "Блог — сетка 3 карточки",
  description: "Три карточки статей с изображением, датой, заголовком и отрывком. Hover-подъём, 3 колонки на десктопе",
  category: "blog",
  subcategory: "grid",
  icon: "📰",
  tags: ["blog", "grid", "cards", "articles", "posts"],
  motionLevel: "css",
  fields: [
    { name: "bl01-title", type: "heading", hint: "заголовок секции блога 3-6 слов", required: false },
    { name: "bl01-subtitle", type: "text", hint: "подзаголовок секции 1-2 предложения", required: false },
    { name: "bl01-img", type: "image", hint: "изображение статьи", required: true },
    { name: "bl01-date", type: "text", hint: "дата публикации", required: true },
    { name: "bl01-heading", type: "heading", hint: "заголовок статьи 4-8 слов", required: true },
    { name: "bl01-excerpt", type: "text", hint: "отрывок статьи 1-2 предложения", required: true },
    { name: "bl01-link", type: "link", hint: "ссылка на полную статью", required: false },
  ],
  html: `<section class="b-bl01" data-block="blog">
  <div class="b-bl01__inner">
    <div class="b-bl01__header" data-reveal="up">
      <h2 data-field="bl01-title">Последние публикации</h2>
      <p data-field="bl01-subtitle">Актуальные статьи о дизайне, технологиях и бизнесе</p>
    </div>
    <div class="b-bl01__grid" data-collection="bl01-items">
      <a class="b-bl01__card" data-collection-item data-field="bl01-link" href="#" data-reveal="up" style="--stagger:0">
        <div class="b-bl01__img-wrap">
          <img data-field="bl01-img" src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Статья">
        </div>
        <div class="b-bl01__body">
          <span class="b-bl01__date" data-field="bl01-date">12 июня 2025</span>
          <h3 data-field="bl01-heading">Как создать дизайн-систему с нуля</h3>
          <p data-field="bl01-excerpt">Пошаговое руководство по построению масштабируемой дизайн-системы для продуктовых команд.</p>
        </div>
      </a>
      <a class="b-bl01__card" data-collection-item data-field="bl01-link" href="#" data-reveal="up" style="--stagger:1">
        <div class="b-bl01__img-wrap">
          <img data-field="bl01-img" src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Статья">
        </div>
        <div class="b-bl01__body">
          <span class="b-bl01__date" data-field="bl01-date">5 июня 2025</span>
          <h3 data-field="bl01-heading">Тренды веб-разработки в 2025 году</h3>
          <p data-field="bl01-excerpt">Обзор ключевых технологий и подходов, которые определят будущее веб-разработки.</p>
        </div>
      </a>
      <a class="b-bl01__card" data-collection-item data-field="bl01-link" href="#" data-reveal="up" style="--stagger:2">
        <div class="b-bl01__img-wrap">
          <img data-field="bl01-img" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Статья">
        </div>
        <div class="b-bl01__body">
          <span class="b-bl01__date" data-field="bl01-date">28 мая 2025</span>
          <h3 data-field="bl01-heading">Метрики, которые действительно важны</h3>
          <p data-field="bl01-excerpt">Какие показатели стоит отслеживать, чтобы принимать правильные продуктовые решения.</p>
        </div>
      </a>
    </div>
  </div>
</section>`,
  css: `.b-bl01{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-bl01__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-bl01__header{text-align:center;margin-bottom:3.5rem}
.b-bl01__header h2{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem;letter-spacing:-0.02em}
.b-bl01__header p{font-family:var(--font-body);color:var(--color-text-muted);font-size:1.0625rem;line-height:1.6;margin:0;max-width:520px;margin-inline:auto}
.b-bl01__grid{display:grid;grid-template-columns:1fr;gap:2rem}
.b-bl01__card{display:block;text-decoration:none;color:inherit;background:var(--color-surface);border-radius:var(--radius-lg);overflow:hidden;border:1px solid var(--color-border);transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s cubic-bezier(.16,1,.3,1)}
.b-bl01__card:hover{transform:translateY(-6px);box-shadow:0 12px 32px color-mix(in srgb,var(--color-text) 8%,transparent)}
.b-bl01__img-wrap{overflow:hidden;aspect-ratio:16/10}
.b-bl01__img-wrap img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s cubic-bezier(.16,1,.3,1)}
.b-bl01__card:hover .b-bl01__img-wrap img{transform:scale(1.05)}
.b-bl01__body{padding:1.5rem}
.b-bl01__date{font-family:var(--font-body);font-size:.8125rem;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:.06em;display:block;margin-bottom:.625rem}
.b-bl01__body h3{font-family:var(--font-heading);font-size:1.25rem;color:var(--color-text);margin:0 0 .5rem;line-height:1.35;letter-spacing:-0.01em}
.b-bl01__body p{font-family:var(--font-body);font-size:.9375rem;color:var(--color-text-muted);margin:0;line-height:1.6}
@media(min-width:768px){.b-bl01__grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1024px){.b-bl01__grid{grid-template-columns:repeat(3,1fr)}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-bl01{background:var(--color-primary)}.b-bl01__header h2{color:var(--color-text-on-primary)}.b-bl01__header p{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-bl01__card{background:color-mix(in srgb,var(--color-text-on-primary) 6%,transparent);border-color:color-mix(in srgb,var(--color-text-on-primary) 10%,transparent)}.b-bl01__date{color:color-mix(in srgb,var(--color-text-on-primary) 55%,transparent)}.b-bl01__body h3{color:var(--color-text-on-primary)}.b-bl01__body p{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}` },
    { id: "accent-border", label: "Акцент", css: `.b-bl01__card{border-color:transparent;border-top:3px solid var(--color-accent)}.b-bl01__date{color:var(--color-accent)}` },
  ],
};
