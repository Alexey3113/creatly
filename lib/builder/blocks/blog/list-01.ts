import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "blog-list-01",
  name: "Блог — вертикальный список",
  description: "Горизонтальные карточки статей: миниатюра слева, текст справа. Стекаются вертикально",
  category: "blog",
  subcategory: "list",
  icon: "📋",
  tags: ["blog", "list", "articles", "horizontal", "cards"],
  motionLevel: "css",
  fields: [
    { name: "bl03-title", type: "heading", hint: "заголовок секции 3-6 слов", required: false },
    { name: "bl03-subtitle", type: "text", hint: "подзаголовок секции 1-2 предложения", required: false },
    { name: "bl03-img", type: "image", hint: "миниатюра статьи", required: true },
    { name: "bl03-date", type: "text", hint: "дата публикации", required: true },
    { name: "bl03-heading", type: "heading", hint: "заголовок статьи 4-8 слов", required: true },
    { name: "bl03-excerpt", type: "text", hint: "отрывок статьи 1-2 предложения", required: true },
    { name: "bl03-link", type: "link", hint: "ссылка на статью", required: false },
  ],
  html: `<section class="b-bl03" data-block="blog">
  <div class="b-bl03__inner">
    <div class="b-bl03__header" data-reveal="up">
      <h2 data-field="bl03-title">Наш блог</h2>
      <p data-field="bl03-subtitle">Делимся знаниями, опытом и идеями из мира цифровых продуктов</p>
    </div>
    <div class="b-bl03__list" data-collection="bl03-items">
      <a class="b-bl03__row" data-collection-item data-field="bl03-link" href="#" data-reveal="up" style="--stagger:0">
        <div class="b-bl03__thumb">
          <img data-field="bl03-img" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&amp;fit=crop&amp;w=400&amp;q=80" alt="Статья">
        </div>
        <div class="b-bl03__content">
          <span class="b-bl03__date" data-field="bl03-date">20 июня 2025</span>
          <h3 data-field="bl03-heading">Как выбрать стек технологий для нового проекта</h3>
          <p data-field="bl03-excerpt">Критерии оценки, подводные камни и практические советы по выбору технологий, которые не устареют через год.</p>
        </div>
      </a>
      <a class="b-bl03__row" data-collection-item data-field="bl03-link" href="#" data-reveal="up" style="--stagger:1">
        <div class="b-bl03__thumb">
          <img data-field="bl03-img" src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&amp;fit=crop&amp;w=400&amp;q=80" alt="Статья">
        </div>
        <div class="b-bl03__content">
          <span class="b-bl03__date" data-field="bl03-date">15 июня 2025</span>
          <h3 data-field="bl03-heading">Дизайн-токены: от теории к практике</h3>
          <p data-field="bl03-excerpt">Как внедрить дизайн-токены в рабочий процесс команды и синхронизировать дизайн с кодом.</p>
        </div>
      </a>
      <a class="b-bl03__row" data-collection-item data-field="bl03-link" href="#" data-reveal="up" style="--stagger:2">
        <div class="b-bl03__thumb">
          <img data-field="bl03-img" src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&amp;fit=crop&amp;w=400&amp;q=80" alt="Статья">
        </div>
        <div class="b-bl03__content">
          <span class="b-bl03__date" data-field="bl03-date">8 июня 2025</span>
          <h3 data-field="bl03-heading">Эффективные ретроспективы: формат и инструменты</h3>
          <p data-field="bl03-excerpt">Проверенные форматы командных ретроспектив, которые помогают находить реальные точки роста.</p>
        </div>
      </a>
      <a class="b-bl03__row" data-collection-item data-field="bl03-link" href="#" data-reveal="up" style="--stagger:3">
        <div class="b-bl03__thumb">
          <img data-field="bl03-img" src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&amp;fit=crop&amp;w=400&amp;q=80" alt="Статья">
        </div>
        <div class="b-bl03__content">
          <span class="b-bl03__date" data-field="bl03-date">1 июня 2025</span>
          <h3 data-field="bl03-heading">Почему пользовательское тестирование нельзя откладывать</h3>
          <p data-field="bl03-excerpt">Четыре причины начинать тестирование на ранних этапах и как это экономит ресурсы команды.</p>
        </div>
      </a>
    </div>
  </div>
</section>`,
  css: `.b-bl03{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-bl03__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-bl03__header{text-align:center;margin-bottom:3.5rem}
.b-bl03__header h2{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem;letter-spacing:-0.02em}
.b-bl03__header p{font-family:var(--font-body);color:var(--color-text-muted);font-size:1.0625rem;line-height:1.6;margin:0;max-width:520px;margin-inline:auto}
.b-bl03__list{display:flex;flex-direction:column;gap:1.5rem}
.b-bl03__row{display:grid;grid-template-columns:1fr;gap:1.25rem;text-decoration:none;color:inherit;background:var(--color-surface);border-radius:var(--radius-lg);overflow:hidden;border:1px solid var(--color-border);padding:1.25rem;transition:transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s cubic-bezier(.16,1,.3,1)}
.b-bl03__row:hover{transform:translateY(-3px);box-shadow:0 8px 24px color-mix(in srgb,var(--color-text) 6%,transparent)}
.b-bl03__thumb{border-radius:var(--radius-md);overflow:hidden;aspect-ratio:16/10}
.b-bl03__thumb img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s cubic-bezier(.16,1,.3,1)}
.b-bl03__row:hover .b-bl03__thumb img{transform:scale(1.04)}
.b-bl03__content{display:flex;flex-direction:column;justify-content:center}
.b-bl03__date{font-family:var(--font-body);font-size:.8125rem;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:.5rem}
.b-bl03__content h3{font-family:var(--font-heading);font-size:1.25rem;color:var(--color-text);margin:0 0 .5rem;line-height:1.35;letter-spacing:-0.01em}
.b-bl03__content p{font-family:var(--font-body);font-size:.9375rem;color:var(--color-text-muted);margin:0;line-height:1.6}
@media(min-width:768px){.b-bl03__row{grid-template-columns:16rem 1fr;gap:1.75rem;padding:1.5rem}.b-bl03__thumb{aspect-ratio:4/3}.b-bl03__content h3{font-size:1.375rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-bl03{background:var(--color-primary)}.b-bl03__header h2{color:var(--color-text-on-primary)}.b-bl03__header p{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-bl03__row{background:color-mix(in srgb,var(--color-text-on-primary) 6%,transparent);border-color:color-mix(in srgb,var(--color-text-on-primary) 10%,transparent)}.b-bl03__content h3{color:var(--color-text-on-primary)}.b-bl03__content p,.b-bl03__date{color:color-mix(in srgb,var(--color-text-on-primary) 60%,transparent)}` },
    { id: "separated", label: "Разделённый", css: `.b-bl03__row{background:transparent;border:none;border-radius:0;padding:1.5rem 0;border-bottom:1px solid var(--color-border)}.b-bl03__row:last-child{border-bottom:none}.b-bl03__row:hover{transform:none;box-shadow:none}` },
  ],
};
