import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "testimonials-logo-wall-01",
  name: "Отзывы — лого клиентов + цитаты",
  description: "Ряд логотипов клиентов сверху, два отзыва снизу",
  category: "testimonials",
  subcategory: "logo-wall",
  icon: "🏢",
  tags: ["logos", "clients", "trust"],
  motionLevel: "css",
  fields: [
    { name: "tm10-title", type: "heading", hint: "заголовок секции", required: true },
    { name: "tm10-logo", type: "image", hint: "логотип клиента", required: true },
    { name: "tm10-quote", type: "text", hint: "текст отзыва", required: true },
    { name: "tm10-name", type: "text", hint: "имя автора", required: true },
    { name: "tm10-position", type: "text", hint: "должность и компания", required: true },
  ],
  html: `<section class="b-tm10" data-block="testimonials">
  <div class="b-tm10__inner">
    <h2 class="b-tm10__title" data-field="tm10-title" data-reveal="up">Нам доверяют лидеры рынка</h2>
    <div class="b-tm10__logos" data-reveal="fade" style="--stagger:1" data-collection="tm10-logo">
      <img class="b-tm10__logo" src="https://placehold.co/140x48?text=Яндекс" alt="Яндекс" data-field="tm10-logo" data-collection-item>
      <img class="b-tm10__logo" src="https://placehold.co/140x48?text=Сбер" alt="Сбер" data-field="tm10-logo" data-collection-item>
      <img class="b-tm10__logo" src="https://placehold.co/140x48?text=Ozon" alt="Ozon" data-field="tm10-logo" data-collection-item>
      <img class="b-tm10__logo" src="https://placehold.co/140x48?text=VK" alt="VK" data-field="tm10-logo" data-collection-item>
      <img class="b-tm10__logo" src="https://placehold.co/140x48?text=Тинькофф" alt="Тинькофф" data-field="tm10-logo" data-collection-item>
    </div>
    <div class="b-tm10__reviews" data-reveal="fade" style="--stagger:2" data-collection="tm10-quote">
      <div class="b-tm10__card" data-collection-item>
        <blockquote class="b-tm10__quote" data-field="tm10-quote">Студия помогла нам выстроить визуальную систему бренда, которая работает на всех каналах.</blockquote>
        <p class="b-tm10__name" data-field="tm10-name">Алина Крылова</p>
        <p class="b-tm10__pos" data-field="tm10-position">Бренд-директор, МТС</p>
      </div>
      <div class="b-tm10__card" data-collection-item>
        <blockquote class="b-tm10__quote" data-field="tm10-quote">Дизайн-система, которую создала команда, ускорила нашу разработку в два раза.</blockquote>
        <p class="b-tm10__name" data-field="tm10-name">Георгий Миронов</p>
        <p class="b-tm10__pos" data-field="tm10-position">VP Engineering, Авито</p>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-tm10{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-tm10__inner{max-width:var(--container-width,1400px);margin:0 auto;text-align:center}
.b-tm10__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 3rem}
.b-tm10__logos{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:2.5rem;margin-bottom:3rem;opacity:.6}
.b-tm10__logo{height:40px;width:auto;object-fit:contain;filter:grayscale(1);transition:filter .2s}
.b-tm10__logo:hover{filter:grayscale(0)}
.b-tm10__reviews{display:grid;grid-template-columns:1fr 1fr;gap:2rem;text-align:left}
.b-tm10__card{background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:2rem}
.b-tm10__quote{font-family:var(--font-body);font-size:1rem;color:var(--color-text);line-height:1.6;margin:0 0 1.25rem;font-style:italic}
.b-tm10__name{font-family:var(--font-heading);font-weight:700;color:var(--color-text);margin:0;font-size:.9375rem}
.b-tm10__pos{font-family:var(--font-body);color:var(--color-text-muted);margin:.25rem 0 0;font-size:.8125rem}
@media(max-width:768px){.b-tm10__reviews{grid-template-columns:1fr}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-tm10{background:var(--color-primary)}.b-tm10__title,.b-tm10__quote,.b-tm10__name{color:var(--color-text-on-primary)}.b-tm10__logos{opacity:.4}` },
    { id: "accent", label: "Акцентный", css: `.b-tm10{background:var(--color-accent)}.b-tm10__title,.b-tm10__quote,.b-tm10__name{color:var(--color-text-on-accent)}.b-tm10__logos{opacity:.4}` },
  ],
};
