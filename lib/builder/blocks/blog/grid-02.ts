import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "blog-grid-02",
  name: "Блог — асимметричная сетка",
  description: "Крупная статья слева и 3 маленькие статьи справа. Ассиметричный двухколоночный layout",
  category: "blog",
  subcategory: "grid",
  icon: "📐",
  tags: ["blog", "grid", "asymmetric", "featured", "sidebar"],
  motionLevel: "css",
  fields: [
    { name: "bl02-title", type: "heading", hint: "заголовок секции 3-6 слов", required: false },
    { name: "bl02-main-img", type: "image", hint: "изображение главной статьи", required: true },
    { name: "bl02-main-date", type: "text", hint: "дата главной статьи", required: true },
    { name: "bl02-main-heading", type: "heading", hint: "заголовок главной статьи 5-10 слов", required: true },
    { name: "bl02-main-excerpt", type: "text", hint: "отрывок главной статьи 2-3 предложения", required: true },
    { name: "bl02-main-link", type: "link", hint: "ссылка на главную статью", required: false },
    { name: "bl02-side-img", type: "image", hint: "изображение боковой статьи", required: true },
    { name: "bl02-side-heading", type: "heading", hint: "заголовок боковой статьи 4-8 слов", required: true },
    { name: "bl02-side-date", type: "text", hint: "дата боковой статьи", required: true },
    { name: "bl02-side-link", type: "link", hint: "ссылка на боковую статью", required: false },
  ],
  html: `<section class="b-bl02" data-block="blog">
  <div class="b-bl02__inner">
    <h2 class="b-bl02__section-title" data-field="bl02-title" data-reveal="up">Из нашего блога</h2>
    <div class="b-bl02__layout">
      <a class="b-bl02__main" data-field="bl02-main-link" href="#" data-reveal="up" style="--stagger:0">
        <div class="b-bl02__main-img-wrap">
          <img data-field="bl02-main-img" src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&amp;fit=crop&amp;w=800&amp;q=80" alt="Статья">
        </div>
        <div class="b-bl02__main-body">
          <span class="b-bl02__date" data-field="bl02-main-date">18 июня 2025</span>
          <h3 data-field="bl02-main-heading">Полное руководство по UX-исследованиям для стартапов</h3>
          <p data-field="bl02-main-excerpt">Как проводить пользовательские исследования с ограниченным бюджетом и превращать инсайты в продуктовые решения, которые работают.</p>
        </div>
      </a>
      <div class="b-bl02__sidebar" data-collection="bl02-items">
        <a class="b-bl02__side-card" data-collection-item data-field="bl02-side-link" href="#" data-reveal="up" style="--stagger:1">
          <div class="b-bl02__side-img-wrap">
            <img data-field="bl02-side-img" src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&amp;fit=crop&amp;w=400&amp;q=80" alt="Статья">
          </div>
          <div class="b-bl02__side-body">
            <span class="b-bl02__date" data-field="bl02-side-date">14 июня 2025</span>
            <h4 data-field="bl02-side-heading">Автоматизация рутинных задач с помощью AI</h4>
          </div>
        </a>
        <a class="b-bl02__side-card" data-collection-item data-field="bl02-side-link" href="#" data-reveal="up" style="--stagger:2">
          <div class="b-bl02__side-img-wrap">
            <img data-field="bl02-side-img" src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&amp;fit=crop&amp;w=400&amp;q=80" alt="Статья">
          </div>
          <div class="b-bl02__side-body">
            <span class="b-bl02__date" data-field="bl02-side-date">9 июня 2025</span>
            <h4 data-field="bl02-side-heading">Пять принципов эффективного брендинга</h4>
          </div>
        </a>
        <a class="b-bl02__side-card" data-collection-item data-field="bl02-side-link" href="#" data-reveal="up" style="--stagger:3">
          <div class="b-bl02__side-img-wrap">
            <img data-field="bl02-side-img" src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&amp;fit=crop&amp;w=400&amp;q=80" alt="Статья">
          </div>
          <div class="b-bl02__side-body">
            <span class="b-bl02__date" data-field="bl02-side-date">3 июня 2025</span>
            <h4 data-field="bl02-side-heading">Оптимизация конверсии посадочных страниц</h4>
          </div>
        </a>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-bl02{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-bl02__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-bl02__section-title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 2.5rem;letter-spacing:-0.02em}
.b-bl02__layout{display:grid;grid-template-columns:1fr;gap:2rem}
.b-bl02__main{display:block;text-decoration:none;color:inherit;background:var(--color-surface);border-radius:var(--radius-lg);overflow:hidden;border:1px solid var(--color-border);transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s cubic-bezier(.16,1,.3,1)}
.b-bl02__main:hover{transform:translateY(-4px);box-shadow:0 16px 40px color-mix(in srgb,var(--color-text) 8%,transparent)}
.b-bl02__main-img-wrap{overflow:hidden;aspect-ratio:16/9}
.b-bl02__main-img-wrap img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s cubic-bezier(.16,1,.3,1)}
.b-bl02__main:hover .b-bl02__main-img-wrap img{transform:scale(1.04)}
.b-bl02__main-body{padding:1.75rem}
.b-bl02__date{font-family:var(--font-body);font-size:.8125rem;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:.06em;display:block;margin-bottom:.5rem}
.b-bl02__main-body h3{font-family:var(--font-heading);font-size:clamp(1.25rem,2.5vw,1.75rem);color:var(--color-text);margin:0 0 .75rem;line-height:1.3;letter-spacing:-0.01em}
.b-bl02__main-body p{font-family:var(--font-body);font-size:1rem;color:var(--color-text-muted);margin:0;line-height:1.6}
.b-bl02__sidebar{display:flex;flex-direction:column;gap:1.25rem}
.b-bl02__side-card{display:grid;grid-template-columns:5rem 1fr;gap:1rem;align-items:center;text-decoration:none;color:inherit;padding:1rem;background:var(--color-surface);border-radius:var(--radius-md);border:1px solid var(--color-border);transition:transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s cubic-bezier(.16,1,.3,1)}
.b-bl02__side-card:hover{transform:translateX(4px);box-shadow:0 4px 16px color-mix(in srgb,var(--color-text) 6%,transparent)}
.b-bl02__side-img-wrap{border-radius:var(--radius-sm);overflow:hidden;aspect-ratio:1;width:5rem}
.b-bl02__side-img-wrap img{width:100%;height:100%;object-fit:cover;display:block}
.b-bl02__side-body h4{font-family:var(--font-heading);font-size:1rem;color:var(--color-text);margin:0;line-height:1.4;letter-spacing:-0.01em}
@media(min-width:1024px){.b-bl02__layout{grid-template-columns:3fr 2fr}.b-bl02__side-card{grid-template-columns:5.5rem 1fr}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-bl02{background:var(--color-primary)}.b-bl02__section-title{color:var(--color-text-on-primary)}.b-bl02__main{background:color-mix(in srgb,var(--color-text-on-primary) 6%,transparent);border-color:color-mix(in srgb,var(--color-text-on-primary) 10%,transparent)}.b-bl02__main-body h3{color:var(--color-text-on-primary)}.b-bl02__main-body p,.b-bl02__date{color:color-mix(in srgb,var(--color-text-on-primary) 60%,transparent)}.b-bl02__side-card{background:color-mix(in srgb,var(--color-text-on-primary) 6%,transparent);border-color:color-mix(in srgb,var(--color-text-on-primary) 10%,transparent)}.b-bl02__side-body h4{color:var(--color-text-on-primary)}` },
    { id: "minimal", label: "Минимальный", css: `.b-bl02__main,.b-bl02__side-card{background:transparent;border:none;border-radius:0}.b-bl02__main-body,.b-bl02__side-card{padding:1rem 0}.b-bl02__main-img-wrap{border-radius:var(--radius-md)}.b-bl02__side-card{border-bottom:1px solid var(--color-border);border-radius:0;padding:1rem 0}` },
  ],
};
