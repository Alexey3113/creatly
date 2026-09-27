import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "testimonials-split-01",
  name: "Отзыв — split-секция",
  description: "Заголовок «Что говорят клиенты» слева, карточка отзыва справа",
  category: "testimonials",
  subcategory: "split",
  icon: "◧",
  tags: ["split", "two-column", "single"],
  motionLevel: "css",
  fields: [
    { name: "tm07-heading", type: "heading", hint: "заголовок секции", required: true },
    { name: "tm07-subtitle", type: "text", hint: "подзаголовок", required: false },
    { name: "tm07-avatar", type: "image", hint: "фото автора 80×80", required: false },
    { name: "tm07-quote", type: "text", hint: "текст отзыва", required: true },
    { name: "tm07-name", type: "text", hint: "имя автора", required: true },
    { name: "tm07-position", type: "text", hint: "должность и компания", required: true },
  ],
  html: `<section class="b-tm07" data-block="testimonials">
  <div class="b-tm07__inner">
    <div class="b-tm07__left" data-reveal="up">
      <h2 class="b-tm07__heading" data-field="tm07-heading">Что говорят клиенты</h2>
      <p class="b-tm07__subtitle" data-field="tm07-subtitle">Более 200 компаний выбрали нас за последние 5 лет</p>
    </div>
    <div class="b-tm07__right" data-reveal="fade" style="--stagger:1">
      <blockquote class="b-tm07__quote" data-field="tm07-quote">Мы искали партнёра, который разделит наши ценности — и нашли. Каждый этап работы был прозрачным, а результат превзошёл ожидания.</blockquote>
      <div class="b-tm07__author">
        <img class="b-tm07__avatar" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" alt="" data-field="tm07-avatar" />
        <div>
          <p class="b-tm07__name" data-field="tm07-name">Екатерина Данилова</p>
          <p class="b-tm07__pos" data-field="tm07-position">COO, GreenTech Solutions</p>
        </div>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-tm07{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-tm07__inner{max-width:var(--container-width,1400px);margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}
.b-tm07__heading{font-family:var(--font-heading);font-size:clamp(2rem,4vw,3rem);color:var(--color-text);margin:0 0 1rem;line-height:1.15}
.b-tm07__subtitle{font-family:var(--font-body);color:var(--color-text-muted);font-size:1.125rem;margin:0;line-height:1.5}
.b-tm07__right{background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:2.5rem}
.b-tm07__quote{font-family:var(--font-body);font-size:1.125rem;color:var(--color-text);line-height:1.6;margin:0 0 1.5rem;font-style:italic}
.b-tm07__author{display:flex;align-items:center;gap:1rem}
.b-tm07__avatar{width:56px;height:56px;border-radius:var(--radius-full);object-fit:cover}
.b-tm07__name{font-family:var(--font-heading);font-weight:700;color:var(--color-text);margin:0;font-size:.9375rem}
.b-tm07__pos{font-family:var(--font-body);color:var(--color-text-muted);margin:.25rem 0 0;font-size:.8125rem}
@media(max-width:768px){.b-tm07__inner{grid-template-columns:1fr;gap:2rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-tm07{background:var(--color-primary)}.b-tm07__heading,.b-tm07__quote,.b-tm07__name{color:var(--color-text-on-primary)}` },
    { id: "accent", label: "Акцентный", css: `.b-tm07{background:var(--color-accent)}.b-tm07__heading,.b-tm07__quote,.b-tm07__name{color:var(--color-text-on-accent)}` },
  ],
};
