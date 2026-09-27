import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-minimal-02",
  name: "Hero — раздельный baseline",
  description: "Заголовок слева, описание справа, разделены тонкой горизонтальной линией. Типографичный минимализм",
  category: "hero",
  subcategory: "minimal",
  icon: "◇",
  tags: ["minimal", "split", "baseline", "typography", "line"],
  motionLevel: "css",
  fields: [
    { name: "hero-title", type: "heading", hint: "заголовок 3-5 слов, крупный и выразительный", required: true },
    { name: "hero-body", type: "text", hint: "описание 1-2 предложения, дополняет заголовок", required: true },
  ],
  html: `<section class="b-hmn02" data-block="hero">
  <div class="b-hmn02__inner">
    <div class="b-hmn02__row">
      <h1 class="b-hmn02__title" data-field="hero-title" data-reveal="up">Форма следует за смыслом</h1>
      <p class="b-hmn02__body" data-field="hero-body" data-reveal="fade" style="--stagger:1">Мы проектируем цифровые продукты, в которых каждая деталь работает на результат. Стратегия, дизайн, разработка.</p>
    </div>
  </div>
</section>`,
  css: `.b-hmn02{min-height:85vh;display:flex;align-items:center;padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-hmn02__inner{width:100%;max-width:var(--container-width,1400px);margin:0 auto}
.b-hmn02__row{display:flex;align-items:baseline;justify-content:space-between;gap:3rem;border-top:1px solid var(--color-border);padding-top:2.5rem}
.b-hmn02__title{font-family:var(--font-heading);font-size:clamp(2rem,5vw,4rem);color:var(--color-text);margin:0;line-height:1.1;letter-spacing:-0.02em;font-weight:400;flex:1 1 50%;max-width:55%}
.b-hmn02__body{font-family:var(--font-body);font-size:clamp(0.9375rem,1.2vw,1.125rem);color:var(--color-text-muted);margin:0;line-height:1.65;flex:1 1 40%;max-width:40%;text-align:right}
@media(max-width:768px){.b-hmn02{min-height:auto;padding:5rem 1.25rem}.b-hmn02__row{flex-direction:column;gap:1.5rem;align-items:flex-start}.b-hmn02__title,.b-hmn02__body{max-width:100%;flex:1 1 100%;text-align:left}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-hmn02{background:var(--color-primary)}.b-hmn02__title{color:var(--color-text-on-primary)}.b-hmn02__body{color:color-mix(in srgb,var(--color-text-on-primary) 60%,transparent)}.b-hmn02__row{border-top-color:color-mix(in srgb,var(--color-text-on-primary) 15%,transparent)}` },
    { id: "accent-line", label: "Акцентная линия", css: `.b-hmn02__row{border-top-color:var(--color-accent);border-top-width:2px}` },
  ],
};
