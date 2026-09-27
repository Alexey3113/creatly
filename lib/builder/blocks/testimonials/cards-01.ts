import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "testimonials-cards-01",
  name: "Отзывы — 3 карточки",
  description: "Три карточки с аватаром, именем, должностью и цитатой",
  category: "testimonials",
  subcategory: "cards",
  icon: "💬",
  tags: ["cards", "avatars", "grid"],
  motionLevel: "css",
  fields: [
    { name: "tm01-title", type: "heading", hint: "заголовок секции", required: true },
    { name: "tm01-avatar", type: "image", hint: "фото автора 80×80", required: false },
    { name: "tm01-name", type: "text", hint: "имя автора", required: true },
    { name: "tm01-position", type: "text", hint: "должность и компания", required: true },
    { name: "tm01-quote", type: "text", hint: "текст отзыва", required: true },
  ],
  html: `<section class="b-tm01" data-block="testimonials">
  <div class="b-tm01__inner">
    <h2 class="b-tm01__title" data-field="tm01-title" data-reveal="up">Отзывы клиентов</h2>
    <div class="b-tm01__grid" data-collection="testimonials" data-collection-grid>
      <div class="b-tm01__card" data-collection-item data-reveal="fade" style="--stagger:0">
        <img class="b-tm01__avatar" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" alt="" data-field="tm01-avatar" />
        <blockquote class="b-tm01__quote" data-field="tm01-quote">Команда полностью погрузилась в проект и превзошла все ожидания. Рекомендую!</blockquote>
        <p class="b-tm01__name" data-field="tm01-name">Алексей Петров</p>
        <p class="b-tm01__pos" data-field="tm01-position">CEO, ТехноСтарт</p>
      </div>
      <div class="b-tm01__card" data-collection-item data-reveal="fade" style="--stagger:1">
        <img class="b-tm01__avatar" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80" alt="" data-field="tm01-avatar" />
        <blockquote class="b-tm01__quote" data-field="tm01-quote">Результат превзошёл ожидания — конверсия выросла на 40% за первый месяц.</blockquote>
        <p class="b-tm01__name" data-field="tm01-name">Мария Иванова</p>
        <p class="b-tm01__pos" data-field="tm01-position">Маркетолог, СберЛогистика</p>
      </div>
      <div class="b-tm01__card" data-collection-item data-reveal="fade" style="--stagger:2">
        <img class="b-tm01__avatar" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80" alt="" data-field="tm01-avatar" />
        <blockquote class="b-tm01__quote" data-field="tm01-quote">Профессиональный подход к дизайну и чёткое соблюдение сроков.</blockquote>
        <p class="b-tm01__name" data-field="tm01-name">Дмитрий Козлов</p>
        <p class="b-tm01__pos" data-field="tm01-position">CTO, Финтех Плюс</p>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-tm01{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-tm01__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-tm01__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);text-align:center;margin:0 0 3rem}
.b-tm01__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
.b-tm01__card{background:var(--color-surface);border-radius:var(--radius-lg);padding:2rem;border:1px solid var(--color-border)}
.b-tm01__avatar{width:64px;height:64px;border-radius:var(--radius-full);object-fit:cover;margin-bottom:1rem}
.b-tm01__quote{font-family:var(--font-body);font-size:1rem;color:var(--color-text);line-height:1.6;margin:0 0 1.25rem;font-style:italic}
.b-tm01__name{font-family:var(--font-heading);font-weight:700;color:var(--color-text);margin:0;font-size:.9375rem}
.b-tm01__pos{font-family:var(--font-body);color:var(--color-text-muted);margin:.25rem 0 0;font-size:.8125rem}
@media(max-width:768px){.b-tm01__grid{grid-template-columns:1fr}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-tm01{background:var(--color-primary)}.b-tm01__title,.b-tm01__quote,.b-tm01__name{color:var(--color-text-on-primary)}` },
    { id: "accent", label: "Акцентный", css: `.b-tm01{background:var(--color-accent)}.b-tm01__title,.b-tm01__quote,.b-tm01__name{color:var(--color-text-on-accent)}` },
  ],
};
