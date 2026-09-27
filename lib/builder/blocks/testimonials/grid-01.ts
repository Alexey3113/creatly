import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "testimonials-grid-01",
  name: "Отзывы — masonry-сетка",
  description: "Masonry-сетка из 4–6 отзывов разной высоты",
  category: "testimonials",
  subcategory: "grid",
  icon: "▦",
  tags: ["grid", "masonry", "multiple"],
  motionLevel: "css",
  fields: [
    { name: "tm06-title", type: "heading", hint: "заголовок секции", required: true },
    { name: "tm06-quote", type: "text", hint: "текст отзыва", required: true },
    { name: "tm06-name", type: "text", hint: "имя автора", required: true },
    { name: "tm06-position", type: "text", hint: "должность и компания", required: true },
  ],
  html: `<section class="b-tm06" data-block="testimonials">
  <div class="b-tm06__inner">
    <h2 class="b-tm06__title" data-field="tm06-title" data-reveal="up">Нам доверяют</h2>
    <div class="b-tm06__grid" data-collection="testimonials" data-collection-grid>
      <div class="b-tm06__card" data-collection-item data-reveal="fade" style="--stagger:0">
        <blockquote class="b-tm06__quote" data-field="tm06-quote">Лучшая студия, с которой мы работали. Проект был сложный, но ребята справились на отлично.</blockquote>
        <p class="b-tm06__name" data-field="tm06-name">Виктор Соколов</p>
        <p class="b-tm06__pos" data-field="tm06-position">Директор, АльфаСтрой</p>
      </div>
      <div class="b-tm06__card" data-collection-item data-reveal="fade" style="--stagger:1">
        <blockquote class="b-tm06__quote" data-field="tm06-quote">Быстро и по делу. Без воды.</blockquote>
        <p class="b-tm06__name" data-field="tm06-name">Ксения Морозова</p>
        <p class="b-tm06__pos" data-field="tm06-position">Фрилансер</p>
      </div>
      <div class="b-tm06__card" data-collection-item data-reveal="fade" style="--stagger:2">
        <blockquote class="b-tm06__quote" data-field="tm06-quote">Ребята предложили решение, о котором мы даже не думали. Конверсия сайта выросла в 3 раза за квартал после запуска нового дизайна.</blockquote>
        <p class="b-tm06__name" data-field="tm06-name">Роман Фёдоров</p>
        <p class="b-tm06__pos" data-field="tm06-position">Head of Growth, Ozon</p>
      </div>
      <div class="b-tm06__card" data-collection-item data-reveal="fade" style="--stagger:3">
        <blockquote class="b-tm06__quote" data-field="tm06-quote">Всё чётко, профессионально, в срок. Будем работать ещё.</blockquote>
        <p class="b-tm06__name" data-field="tm06-name">Татьяна Жукова</p>
        <p class="b-tm06__pos" data-field="tm06-position">PR-директор, Сколково</p>
      </div>
      <div class="b-tm06__card" data-collection-item data-reveal="fade" style="--stagger:4">
        <blockquote class="b-tm06__quote" data-field="tm06-quote">Очень приятно работать с людьми, которые понимают бизнес так же хорошо, как и дизайн. Рекомендую всем знакомым предпринимателям.</blockquote>
        <p class="b-tm06__name" data-field="tm06-name">Михаил Громов</p>
        <p class="b-tm06__pos" data-field="tm06-position">CEO, DataPulse</p>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-tm06{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-tm06__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-tm06__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);text-align:center;margin:0 0 3rem}
.b-tm06__grid{columns:3;column-gap:1.5rem}
.b-tm06__card{break-inside:avoid;background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:1.75rem;margin-bottom:1.5rem}
.b-tm06__quote{font-family:var(--font-body);font-size:1rem;color:var(--color-text);line-height:1.6;margin:0 0 1rem;font-style:italic}
.b-tm06__name{font-family:var(--font-heading);font-weight:700;color:var(--color-text);margin:0;font-size:.875rem}
.b-tm06__pos{font-family:var(--font-body);color:var(--color-text-muted);margin:.25rem 0 0;font-size:.8125rem}
@media(max-width:1024px){.b-tm06__grid{columns:2}}
@media(max-width:640px){.b-tm06__grid{columns:1}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-tm06{background:var(--color-primary)}.b-tm06__title,.b-tm06__quote,.b-tm06__name{color:var(--color-text-on-primary)}` },
    { id: "accent", label: "Акцентный", css: `.b-tm06{background:var(--color-accent)}.b-tm06__title,.b-tm06__quote,.b-tm06__name{color:var(--color-text-on-accent)}` },
  ],
};
