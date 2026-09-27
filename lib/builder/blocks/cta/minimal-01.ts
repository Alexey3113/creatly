import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "cta-minimal-01",
  name: "CTA — минималистичный однострочный",
  description: "Текст и кнопка в одну строку, тонкие разделители сверху и снизу",
  category: "cta",
  subcategory: "minimal",
  icon: "─",
  tags: ["cta", "minimal", "inline", "compact"],
  motionLevel: "css",
  fields: [
    { name: "cta-heading", type: "heading", hint: "текст призыва к действию", required: true },
    { name: "cta-button", type: "link", hint: "текст кнопки", required: true },
  ],
  html: `<section class="b-ct05" data-block="cta">
  <div class="b-ct05__inner" data-reveal="fade">
    <h2 class="b-ct05__heading" data-field="cta-heading">Готовы к следующему шагу?</h2>
    <a class="b-ct05__btn" href="#" data-field="cta-button" data-reveal="scale" style="--stagger:1">Связаться с нами</a>
  </div>
</section>`,
  css: `.b-ct05{background:var(--color-bg);padding:0 var(--space-block);border-top:1px solid var(--color-border);border-bottom:1px solid var(--color-border)}
.b-ct05__inner{max-width:var(--container-width,1400px);margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:2rem;padding:var(--space-block) 0}
.b-ct05__heading{font-family:var(--font-heading);font-size:clamp(1.25rem,2.5vw,1.75rem);font-weight:700;color:var(--color-text);margin:0;line-height:1.3}
.b-ct05__btn{display:inline-flex;align-items:center;min-height:52px;padding:0 2rem;border-radius:var(--radius-md);background:var(--color-primary);color:var(--color-text-on-primary);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;transition:transform .3s,opacity .3s;white-space:nowrap;flex-shrink:0}
.b-ct05__btn:hover{transform:translateY(-2px);opacity:.92}
@media(max-width:768px){.b-ct05__inner{flex-direction:column;text-align:center;gap:1.25rem;padding:2.5rem 0}.b-ct05__btn{width:100%;justify-content:center}}`,
  variants: [
    { id: "default", label: "По умолчанию", css: "" },
    { id: "surface", label: "Поверхность", css: `.b-ct05{background:var(--color-surface);border-color:transparent}` },
    { id: "accent-btn", label: "Акцентная кнопка", css: `.b-ct05__btn{background:var(--color-accent);color:var(--color-text-on-accent)}` },
  ],
};
