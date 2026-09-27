import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "testimonials-quote-01",
  name: "Отзыв — большая цитата по центру",
  description: "Одна крупная цитата по центру с именем и фото автора снизу",
  category: "testimonials",
  subcategory: "quote",
  icon: "❝",
  tags: ["quote", "centered", "single"],
  motionLevel: "css",
  fields: [
    { name: "tm03-quote", type: "text", hint: "текст цитаты", required: true },
    { name: "tm03-avatar", type: "image", hint: "фото автора 80×80", required: false },
    { name: "tm03-name", type: "text", hint: "имя автора", required: true },
    { name: "tm03-position", type: "text", hint: "должность и компания", required: true },
  ],
  html: `<section class="b-tm03" data-block="testimonials">
  <div class="b-tm03__inner">
    <blockquote class="b-tm03__quote" data-field="tm03-quote" data-reveal="up">Сотрудничество с командой стало поворотным моментом для нашего бизнеса. Каждая деталь продумана, каждый срок соблюдён — именно так должна работать идеальная студия.</blockquote>
    <div class="b-tm03__author" data-reveal="fade" style="--stagger:1">
      <img class="b-tm03__avatar" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" alt="" data-field="tm03-avatar" />
      <div>
        <p class="b-tm03__name" data-field="tm03-name">Наталья Орлова</p>
        <p class="b-tm03__pos" data-field="tm03-position">VP of Product, Авито</p>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-tm03{padding:var(--space-section) var(--space-block);background:var(--color-bg);text-align:center}
.b-tm03__inner{max-width:860px;margin:0 auto}
.b-tm03__quote{font-family:var(--font-heading);font-size:clamp(1.5rem,3.5vw,2.5rem);color:var(--color-text);line-height:1.4;margin:0 0 2.5rem;font-style:italic}
.b-tm03__author{display:inline-flex;align-items:center;gap:1rem}
.b-tm03__avatar{width:64px;height:64px;border-radius:var(--radius-full);object-fit:cover}
.b-tm03__name{font-family:var(--font-heading);font-weight:700;color:var(--color-text);margin:0;font-size:1rem;text-align:left}
.b-tm03__pos{font-family:var(--font-body);color:var(--color-text-muted);margin:.25rem 0 0;font-size:.8125rem;text-align:left}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-tm03{background:var(--color-primary)}.b-tm03__quote,.b-tm03__name{color:var(--color-text-on-primary)}` },
    { id: "accent", label: "Акцентный", css: `.b-tm03{background:var(--color-accent)}.b-tm03__quote,.b-tm03__name{color:var(--color-text-on-accent)}` },
  ],
};
