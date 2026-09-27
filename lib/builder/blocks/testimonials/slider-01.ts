import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "testimonials-slider-01",
  name: "Отзывы — горизонтальный слайдер",
  description: "Карусель из 4 отзывов с CSS scroll-snap горизонтальной прокруткой",
  category: "testimonials",
  subcategory: "slider",
  icon: "◀▶",
  tags: ["slider", "carousel", "scroll-snap"],
  motionLevel: "css",
  fields: [
    { name: "tm05-title", type: "heading", hint: "заголовок секции", required: true },
    { name: "tm05-avatar", type: "image", hint: "фото автора 80×80", required: false },
    { name: "tm05-quote", type: "text", hint: "текст отзыва", required: true },
    { name: "tm05-name", type: "text", hint: "имя автора", required: true },
    { name: "tm05-position", type: "text", hint: "должность и компания", required: true },
  ],
  html: `<section class="b-tm05" data-block="testimonials">
  <div class="b-tm05__inner">
    <h2 class="b-tm05__title" data-field="tm05-title" data-reveal="word">Что о нас говорят</h2>
    <div class="b-tm05__track" data-collection="testimonials" data-collection-grid>
      <div class="b-tm05__slide" data-collection-item data-reveal="fade" style="--stagger:0">
        <blockquote class="b-tm05__quote" data-field="tm05-quote">Быстро, качественно, без лишней бюрократии. Идеальный партнёр для стартапа.</blockquote>
        <div class="b-tm05__author">
          <img class="b-tm05__avatar" src="https://placehold.co/48x48" alt="" data-field="tm05-avatar" />
          <div><p class="b-tm05__name" data-field="tm05-name">Андрей Лебедев</p><p class="b-tm05__pos" data-field="tm05-position">Фаундер, RocketLab</p></div>
        </div>
      </div>
      <div class="b-tm05__slide" data-collection-item data-reveal="fade" style="--stagger:1">
        <blockquote class="b-tm05__quote" data-field="tm05-quote">Редизайн сайта окупился за две недели. Невероятный результат.</blockquote>
        <div class="b-tm05__author">
          <img class="b-tm05__avatar" src="https://placehold.co/48x48" alt="" data-field="tm05-avatar" />
          <div><p class="b-tm05__name" data-field="tm05-name">Елена Кузнецова</p><p class="b-tm05__pos" data-field="tm05-position">CMO, FoodBox</p></div>
        </div>
      </div>
      <div class="b-tm05__slide" data-collection-item data-reveal="fade" style="--stagger:2">
        <blockquote class="b-tm05__quote" data-field="tm05-quote">Внимание к деталям и понимание аудитории — то, что отличает эту команду.</blockquote>
        <div class="b-tm05__author">
          <img class="b-tm05__avatar" src="https://placehold.co/48x48" alt="" data-field="tm05-avatar" />
          <div><p class="b-tm05__name" data-field="tm05-name">Павел Новиков</p><p class="b-tm05__pos" data-field="tm05-position">Продакт, Тинькофф</p></div>
        </div>
      </div>
      <div class="b-tm05__slide" data-collection-item data-reveal="fade" style="--stagger:3">
        <blockquote class="b-tm05__quote" data-field="tm05-quote">Третий проект вместе — и каждый раз удивляют креативностью решений.</blockquote>
        <div class="b-tm05__author">
          <img class="b-tm05__avatar" src="https://placehold.co/48x48" alt="" data-field="tm05-avatar" />
          <div><p class="b-tm05__name" data-field="tm05-name">Анна Белова</p><p class="b-tm05__pos" data-field="tm05-position">Бренд-менеджер, Wildberries</p></div>
        </div>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-tm05{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-tm05__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-tm05__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 2.5rem}
.b-tm05__track{display:flex;gap:1.5rem;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;padding-bottom:1rem}
.b-tm05__slide{position:relative;flex:0 0 360px;scroll-snap-align:start;background:var(--color-surface);border-radius:var(--radius-lg);padding:2.5rem 2.25rem 2.25rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 20px 50px -30px color-mix(in srgb,var(--color-text) 26%,transparent);transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s}
.b-tm05__slide:hover{transform:translateY(-5px);box-shadow:0 30px 65px -30px color-mix(in srgb,var(--color-text) 36%,transparent)}
.b-tm05__slide::before{content:"\\201C";position:absolute;top:.4rem;left:1.6rem;font-family:var(--font-heading);font-size:4.5rem;line-height:1;color:color-mix(in srgb,var(--color-accent) 35%,transparent);pointer-events:none}
.b-tm05__quote{font-family:var(--font-body);font-size:1.0325rem;color:var(--color-text);line-height:1.65;margin:1rem 0 1.5rem;font-style:normal}
.b-tm05__author{display:flex;align-items:center;gap:.75rem}
.b-tm05__avatar{width:48px;height:48px;border-radius:var(--radius-full);object-fit:cover;border:2px solid color-mix(in srgb,var(--color-accent) 40%,transparent)}
.b-tm05__name{font-family:var(--font-heading);font-weight:700;color:var(--color-text);margin:0;font-size:.875rem}
.b-tm05__pos{font-family:var(--font-body);color:var(--color-accent);font-weight:600;margin:.125rem 0 0;font-size:.75rem}
.b-tm05__track::-webkit-scrollbar{height:4px}.b-tm05__track::-webkit-scrollbar-thumb{background:var(--color-border);border-radius:var(--radius-full)}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-tm05{background:var(--color-primary)}.b-tm05__title,.b-tm05__quote,.b-tm05__name{color:var(--color-text-on-primary)}` },
    { id: "accent", label: "Акцентный", css: `.b-tm05{background:var(--color-accent)}.b-tm05__title,.b-tm05__quote,.b-tm05__name{color:var(--color-text-on-accent)}` },
  ],
};
