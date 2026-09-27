import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "blog-featured-01",
  name: "Блог — featured + 3 карточки",
  description: "Крупная featured-статья с оверлеем поверх изображения и 3 маленькие карточки ниже в ряд",
  category: "blog",
  subcategory: "featured",
  icon: "⭐",
  tags: ["blog", "featured", "hero", "overlay", "cards"],
  motionLevel: "css",
  fields: [
    { name: "bl04-title", type: "heading", hint: "заголовок секции 3-5 слов", required: false },
    { name: "bl04-hero-img", type: "image", hint: "изображение featured-статьи", required: true },
    { name: "bl04-hero-tag", type: "text", hint: "тег/категория featured-статьи 1-2 слова", required: false },
    { name: "bl04-hero-heading", type: "heading", hint: "заголовок featured-статьи 5-12 слов", required: true },
    { name: "bl04-hero-excerpt", type: "text", hint: "отрывок featured-статьи 1-2 предложения", required: true },
    { name: "bl04-hero-link", type: "link", hint: "ссылка на featured-статью", required: false },
    { name: "bl04-card-img", type: "image", hint: "изображение карточки", required: true },
    { name: "bl04-card-date", type: "text", hint: "дата карточки", required: true },
    { name: "bl04-card-heading", type: "heading", hint: "заголовок карточки 4-8 слов", required: true },
    { name: "bl04-card-link", type: "link", hint: "ссылка на статью", required: false },
  ],
  html: `<section class="b-bl04" data-block="blog">
  <div class="b-bl04__inner">
    <h2 class="b-bl04__section-title" data-field="bl04-title" data-reveal="up">Избранное</h2>
    <a class="b-bl04__hero" data-field="bl04-hero-link" href="#" data-reveal="scale">
      <img class="b-bl04__hero-img" data-field="bl04-hero-img" src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&amp;fit=crop&amp;w=1200&amp;q=80" alt="Featured">
      <div class="b-bl04__hero-overlay">
        <span class="b-bl04__hero-tag" data-field="bl04-hero-tag">Стратегия</span>
        <h3 data-field="bl04-hero-heading">Как построить продуктовую культуру в распределённой команде</h3>
        <p data-field="bl04-hero-excerpt">Практический опыт перехода на удалённый формат: процессы, инструменты и принципы, которые сохраняют скорость и качество.</p>
      </div>
    </a>
    <div class="b-bl04__cards" data-collection="bl04-items">
      <a class="b-bl04__card" data-collection-item data-field="bl04-card-link" href="#" data-reveal="up" style="--stagger:0">
        <div class="b-bl04__card-img-wrap">
          <img data-field="bl04-card-img" src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&amp;fit=crop&amp;w=500&amp;q=80" alt="Статья">
        </div>
        <div class="b-bl04__card-body">
          <span class="b-bl04__card-date" data-field="bl04-card-date">22 июня 2025</span>
          <h4 data-field="bl04-card-heading">Микрофронтенды: когда стоит внедрять</h4>
        </div>
      </a>
      <a class="b-bl04__card" data-collection-item data-field="bl04-card-link" href="#" data-reveal="up" style="--stagger:1">
        <div class="b-bl04__card-img-wrap">
          <img data-field="bl04-card-img" src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&amp;fit=crop&amp;w=500&amp;q=80" alt="Статья">
        </div>
        <div class="b-bl04__card-body">
          <span class="b-bl04__card-date" data-field="bl04-card-date">17 июня 2025</span>
          <h4 data-field="bl04-card-heading">Аналитика без cookie: новые подходы</h4>
        </div>
      </a>
      <a class="b-bl04__card" data-collection-item data-field="bl04-card-link" href="#" data-reveal="up" style="--stagger:2">
        <div class="b-bl04__card-img-wrap">
          <img data-field="bl04-card-img" src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&amp;fit=crop&amp;w=500&amp;q=80" alt="Статья">
        </div>
        <div class="b-bl04__card-body">
          <span class="b-bl04__card-date" data-field="bl04-card-date">10 июня 2025</span>
          <h4 data-field="bl04-card-heading">Edge computing и будущее веб-приложений</h4>
        </div>
      </a>
    </div>
  </div>
</section>`,
  css: `.b-bl04{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-bl04__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-bl04__section-title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 2.5rem;letter-spacing:-0.02em}
.b-bl04__hero{display:block;position:relative;border-radius:var(--radius-lg);overflow:hidden;text-decoration:none;color:inherit;aspect-ratio:21/9;margin-bottom:2rem}
.b-bl04__hero-img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s cubic-bezier(.16,1,.3,1)}
.b-bl04__hero:hover .b-bl04__hero-img{transform:scale(1.03)}
.b-bl04__hero-overlay{position:absolute;inset:0;background:linear-gradient(to top,color-mix(in srgb,var(--color-text) 80%,transparent) 0%,color-mix(in srgb,var(--color-text) 20%,transparent) 50%,transparent 100%);display:flex;flex-direction:column;justify-content:flex-end;padding:2rem;gap:.5rem}
.b-bl04__hero-tag{font-family:var(--font-body);font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--color-accent);background:color-mix(in srgb,var(--color-accent) 15%,transparent);padding:.25rem .75rem;border-radius:var(--radius-full);width:fit-content}
.b-bl04__hero-overlay h3{font-family:var(--font-heading);font-size:clamp(1.375rem,3vw,2rem);color:#fff;margin:0;line-height:1.25;letter-spacing:-0.02em;max-width:680px}
.b-bl04__hero-overlay p{font-family:var(--font-body);font-size:1rem;color:rgba(255,255,255,.75);margin:0;line-height:1.6;max-width:560px}
.b-bl04__cards{display:grid;grid-template-columns:1fr;gap:1.5rem}
.b-bl04__card{display:block;text-decoration:none;color:inherit;background:var(--color-surface);border-radius:var(--radius-lg);overflow:hidden;border:1px solid var(--color-border);transition:transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s cubic-bezier(.16,1,.3,1)}
.b-bl04__card:hover{transform:translateY(-4px);box-shadow:0 8px 24px color-mix(in srgb,var(--color-text) 6%,transparent)}
.b-bl04__card-img-wrap{overflow:hidden;aspect-ratio:16/10}
.b-bl04__card-img-wrap img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s cubic-bezier(.16,1,.3,1)}
.b-bl04__card:hover .b-bl04__card-img-wrap img{transform:scale(1.05)}
.b-bl04__card-body{padding:1.25rem}
.b-bl04__card-date{font-family:var(--font-body);font-size:.8125rem;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:.06em;display:block;margin-bottom:.375rem}
.b-bl04__card-body h4{font-family:var(--font-heading);font-size:1.0625rem;color:var(--color-text);margin:0;line-height:1.35;letter-spacing:-0.01em}
@media(min-width:768px){.b-bl04__cards{grid-template-columns:repeat(3,1fr)}.b-bl04__hero{aspect-ratio:21/9}}
@media(min-width:1024px){.b-bl04__hero-overlay{padding:3rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-bl04{background:var(--color-primary)}.b-bl04__section-title{color:var(--color-text-on-primary)}.b-bl04__card{background:color-mix(in srgb,var(--color-text-on-primary) 6%,transparent);border-color:color-mix(in srgb,var(--color-text-on-primary) 10%,transparent)}.b-bl04__card-date{color:color-mix(in srgb,var(--color-text-on-primary) 55%,transparent)}.b-bl04__card-body h4{color:var(--color-text-on-primary)}` },
    { id: "rounded", label: "Скруглённый", css: `.b-bl04__hero{border-radius:var(--radius-lg)}.b-bl04__card{border-radius:var(--radius-lg)}.b-bl04__hero-tag{border-radius:var(--radius-full)}` },
  ],
};
