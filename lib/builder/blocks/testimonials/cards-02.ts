import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "testimonials-cards-02",
  name: "Отзывы — 2 крупные карточки с фото",
  description: "Две большие карточки с фотографией слева и крупной цитатой справа",
  category: "testimonials",
  subcategory: "cards",
  icon: "💬",
  tags: ["cards", "large", "photo"],
  motionLevel: "css",
  fields: [
    { name: "tm02-photo", type: "image", hint: "фото автора", required: true },
    { name: "tm02-quote", type: "text", hint: "текст отзыва", required: true },
    { name: "tm02-name", type: "text", hint: "имя автора", required: true },
    { name: "tm02-position", type: "text", hint: "должность и компания", required: true },
  ],
  html: `<section class="b-tm02" data-block="testimonials">
  <div class="b-tm02__inner" data-collection="tm02-photo">
    <div class="b-tm02__card" data-reveal="fade" style="--stagger:0" data-collection-item>
      <img class="b-tm02__photo" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" alt="" data-field="tm02-photo">
      <div class="b-tm02__body">
        <blockquote class="b-tm02__quote" data-field="tm02-quote">Мы работали с десятком студий — эта единственная, которая услышала нас с первого раза и предложила решение лучше, чем мы могли представить.</blockquote>
        <p class="b-tm02__name" data-field="tm02-name">Ольга Смирнова</p>
        <p class="b-tm02__pos" data-field="tm02-position">Директор по маркетингу, Яндекс.Еда</p>
      </div>
    </div>
    <div class="b-tm02__card" data-reveal="fade" style="--stagger:1" data-collection-item>
      <img class="b-tm02__photo" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80" alt="" data-field="tm02-photo">
      <div class="b-tm02__body">
        <blockquote class="b-tm02__quote" data-field="tm02-quote">За три месяца совместной работы мы полностью обновили бренд. Продажи выросли вдвое — это лучшая инвестиция года.</blockquote>
        <p class="b-tm02__name" data-field="tm02-name">Игорь Васильев</p>
        <p class="b-tm02__pos" data-field="tm02-position">Основатель, CloudPay</p>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-tm02{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-tm02__inner{max-width:var(--container-width,1400px);margin:0 auto;display:flex;flex-direction:column;gap:2.5rem}
.b-tm02__card{display:flex;gap:2.5rem;background:var(--color-surface);border-radius:var(--radius-lg);overflow:hidden;border:1px solid var(--color-border)}
.b-tm02__photo{width:280px;min-height:280px;object-fit:cover;flex-shrink:0}
.b-tm02__body{padding:2.5rem;display:flex;flex-direction:column;justify-content:center}
.b-tm02__quote{font-family:var(--font-body);font-size:clamp(1.125rem,2vw,1.375rem);color:var(--color-text);line-height:1.6;margin:0 0 1.5rem;font-style:italic}
.b-tm02__name{font-family:var(--font-heading);font-weight:700;color:var(--color-text);margin:0;font-size:1rem}
.b-tm02__pos{font-family:var(--font-body);color:var(--color-text-muted);margin:.25rem 0 0;font-size:.875rem}
@media(max-width:768px){.b-tm02__card{flex-direction:column}.b-tm02__photo{width:100%;height:200px}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-tm02{background:var(--color-primary)}.b-tm02__quote,.b-tm02__name{color:var(--color-text-on-primary)}` },
    { id: "accent", label: "Акцентный", css: `.b-tm02{background:var(--color-accent)}.b-tm02__quote,.b-tm02__name{color:var(--color-text-on-accent)}` },
  ],
};
