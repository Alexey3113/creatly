import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "testimonials-quote-02",
  name: "Отзыв — декоративные кавычки",
  description: "Минималистичная цитата с крупными декоративными кавычками",
  category: "testimonials",
  subcategory: "quote",
  icon: "❝",
  tags: ["quote", "minimal", "decorative"],
  motionLevel: "css",
  fields: [
    { name: "tm04-quote", type: "text", hint: "текст цитаты", required: true },
    { name: "tm04-name", type: "text", hint: "имя автора", required: true },
    { name: "tm04-position", type: "text", hint: "должность и компания", required: true },
  ],
  html: `<section class="b-tm04" data-block="testimonials">
  <div class="b-tm04__inner">
    <span class="b-tm04__mark" aria-hidden="true" data-reveal="scale">“</span>
    <blockquote class="b-tm04__quote" data-field="tm04-quote" data-reveal="fade" style="--stagger:1">Дизайн, который они создали, говорит за себя — наши клиенты стали доверять нам больше с первого визита на сайт.</blockquote>
    <footer class="b-tm04__footer" data-reveal="fade" style="--stagger:2">
      <p class="b-tm04__name" data-field="tm04-name">Сергей Волков</p>
      <p class="b-tm04__pos" data-field="tm04-position">Генеральный директор, МедТех Групп</p>
    </footer>
  </div>
</section>`,
  css: `.b-tm04{padding:var(--space-section) var(--space-block);background:var(--color-bg);text-align:center}
.b-tm04__inner{max-width:800px;margin:0 auto}
.b-tm04__mark{font-family:var(--font-heading);font-size:8rem;line-height:1;color:var(--color-accent);display:block;margin-bottom:-2rem}
.b-tm04__quote{font-family:var(--font-body);font-size:clamp(1.25rem,2.5vw,1.75rem);color:var(--color-text);line-height:1.6;margin:0 0 2rem;font-style:italic}
.b-tm04__footer{border-top:1px solid var(--color-border);display:inline-block;padding-top:1.5rem}
.b-tm04__name{font-family:var(--font-heading);font-weight:700;color:var(--color-text);margin:0;font-size:1rem}
.b-tm04__pos{font-family:var(--font-body);color:var(--color-text-muted);margin:.25rem 0 0;font-size:.8125rem}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-tm04{background:var(--color-primary)}.b-tm04__quote,.b-tm04__name{color:var(--color-text-on-primary)}.b-tm04__mark{color:var(--color-text-on-primary);opacity:.3}` },
    { id: "accent", label: "Акцентный", css: `.b-tm04{background:var(--color-accent)}.b-tm04__quote,.b-tm04__name{color:var(--color-text-on-accent)}.b-tm04__mark{color:var(--color-text-on-accent);opacity:.3}` },
  ],
};
