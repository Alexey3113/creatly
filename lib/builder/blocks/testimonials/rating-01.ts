import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "testimonials-rating-01",
  name: "Отзывы — карточки с рейтингом",
  description: "Три карточки отзывов со звёздным рейтингом",
  category: "testimonials",
  subcategory: "rating",
  icon: "★",
  tags: ["rating", "stars", "cards"],
  motionLevel: "css",
  fields: [
    { name: "tm09-title", type: "heading", hint: "заголовок секции", required: true },
    { name: "tm09-rating", type: "stat", hint: "рейтинг от 1 до 5", required: true },
    { name: "tm09-quote", type: "text", hint: "текст отзыва", required: true },
    { name: "tm09-name", type: "text", hint: "имя автора", required: true },
    { name: "tm09-position", type: "text", hint: "должность и компания", required: true },
  ],
  html: `<section class="b-tm09" data-block="testimonials">
  <div class="b-tm09__inner">
    <h2 class="b-tm09__title" data-field="tm09-title" data-reveal="up">Оценки клиентов</h2>
    <div class="b-tm09__grid" data-collection="testimonials" data-collection-grid>
      <div class="b-tm09__card" data-collection-item data-reveal="fade" style="--stagger:0">
        <div class="b-tm09__stars" data-field="tm09-rating" aria-label="5 из 5">★★★★★</div>
        <blockquote class="b-tm09__quote" data-field="tm09-quote">Безупречная работа от начала до конца. Каждый дедлайн соблюдён.</blockquote>
        <p class="b-tm09__name" data-field="tm09-name">Олег Захаров</p>
        <p class="b-tm09__pos" data-field="tm09-position">CTO, НетоПлат</p>
      </div>
      <div class="b-tm09__card" data-collection-item data-reveal="fade" style="--stagger:1">
        <div class="b-tm09__stars" data-field="tm09-rating" aria-label="5 из 5">★★★★★</div>
        <blockquote class="b-tm09__quote" data-field="tm09-quote">Отличный UX-дизайн. Пользователи отмечают, что стало удобнее.</blockquote>
        <p class="b-tm09__name" data-field="tm09-name">Ирина Степанова</p>
        <p class="b-tm09__pos" data-field="tm09-position">Product Owner, ВкусВилл</p>
      </div>
      <div class="b-tm09__card" data-collection-item data-reveal="fade" style="--stagger:2">
        <div class="b-tm09__stars" data-field="tm09-rating" aria-label="4 из 5">★★★★☆</div>
        <blockquote class="b-tm09__quote" data-field="tm09-quote">Креативный подход и глубокое понимание рынка. Единственное — хотелось бы чуть быстрее.</blockquote>
        <p class="b-tm09__name" data-field="tm09-name">Денис Попов</p>
        <p class="b-tm09__pos" data-field="tm09-position">Маркетолог, Lamoda</p>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-tm09{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-tm09__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-tm09__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);text-align:center;margin:0 0 3rem}
.b-tm09__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
.b-tm09__card{background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:2rem}
.b-tm09__stars{font-size:1.25rem;color:var(--color-accent);margin-bottom:1rem;letter-spacing:.15em}
.b-tm09__quote{font-family:var(--font-body);font-size:1rem;color:var(--color-text);line-height:1.6;margin:0 0 1.25rem;font-style:italic}
.b-tm09__name{font-family:var(--font-heading);font-weight:700;color:var(--color-text);margin:0;font-size:.9375rem}
.b-tm09__pos{font-family:var(--font-body);color:var(--color-text-muted);margin:.25rem 0 0;font-size:.8125rem}
@media(max-width:768px){.b-tm09__grid{grid-template-columns:1fr}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-tm09{background:var(--color-primary)}.b-tm09__title,.b-tm09__quote,.b-tm09__name{color:var(--color-text-on-primary)}` },
    { id: "accent", label: "Акцентный", css: `.b-tm09{background:var(--color-accent)}.b-tm09__title,.b-tm09__quote,.b-tm09__name{color:var(--color-text-on-accent)}` },
  ],
};
