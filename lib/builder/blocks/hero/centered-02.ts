import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-centered-02",
  name: "Hero — гигантская типографика",
  description: "Сверхкрупный заголовок на весь экран + тонкий подзаголовок + два CTA в ряд",
  category: "hero",
  subcategory: "centered",
  icon: "◇",
  tags: ["centered", "bold-type", "dual-cta", "oversized", "minimal"],
  motionLevel: "css",
  fields: [
    { name: "hero-title", type: "heading", hint: "короткий заголовок 2-4 слова", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание 1 предложение, лаконично", required: true },
    { name: "hero-cta", type: "link", hint: "текст основного CTA", required: true },
    { name: "hero-cta-2", type: "link", hint: "текст второго CTA", required: false },
  ],
  html: `<section class="b-hc02" data-block="hero">
  <div class="b-hc02__inner">
    <h1 class="b-hc02__title" data-field="hero-title" data-reveal="up">Дизайн будущего</h1>
    <p class="b-hc02__sub" data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">Минималистичные решения для амбициозных брендов нового поколения.</p>
    <div class="b-hc02__ctas" data-reveal="fade" style="--stagger:2">
      <a class="b-hc02__btn b-hc02__btn--primary" href="#" data-field="hero-cta">Начать сейчас</a>
      <a class="b-hc02__btn b-hc02__btn--ghost" href="#" data-field="hero-cta-2">Смотреть кейсы</a>
    </div>
  </div>
</section>`,
  css: `.b-hc02{text-align:center;padding:var(--space-section) var(--space-block);background:var(--color-bg);min-height:90vh;display:flex;align-items:center;justify-content:center;overflow:hidden}
.b-hc02__inner{max-width:var(--container-width,1400px);width:100%;margin:0 auto;padding:0 clamp(1rem,3vw,3rem)}
.b-hc02__title{font-family:var(--font-heading);font-size:clamp(3rem,10vw,7rem);color:var(--color-text);margin:0;line-height:1;letter-spacing:-0.04em;font-weight:900}
.b-hc02__sub{color:var(--color-text-muted);font-family:var(--font-body);font-weight:300;font-size:clamp(1rem,1.4vw,1.25rem);max-width:480px;margin:clamp(1.5rem,3vw,2.5rem) auto clamp(2rem,4vw,3rem);line-height:1.7;letter-spacing:.01em}
.b-hc02__ctas{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
.b-hc02__btn{display:inline-flex;align-items:center;min-height:54px;padding:0 2.25rem;border-radius:var(--radius-md);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;transition:transform .3s cubic-bezier(.16,1,.3,1),opacity .3s,box-shadow .3s}
.b-hc02__btn:hover{transform:translateY(-2px)}
.b-hc02__btn--primary{background:var(--color-primary);color:var(--color-text-on-primary)}
.b-hc02__btn--primary:hover{opacity:.9}
.b-hc02__btn--ghost{background:transparent;color:var(--color-text);border:2px solid var(--color-border)}
.b-hc02__btn--ghost:hover{border-color:var(--color-primary);color:var(--color-primary)}
@media(max-width:768px){.b-hc02{min-height:auto;padding:5rem 1.25rem}.b-hc02__ctas{flex-direction:column;align-items:center}}`,
  variants: [
    { id: "dark", label: "Тёмный", css: `.b-hc02{background:var(--color-bg)}.b-hc02__title{color:var(--color-text)}` },
    { id: "light", label: "Светлый", css: `.b-hc02{background:var(--color-surface)}.b-hc02__title{color:var(--color-text)}` },
    { id: "accent", label: "Акцентный", css: `.b-hc02{background:var(--color-primary)}.b-hc02__title{color:var(--color-text-on-primary)}.b-hc02__sub{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-hc02__btn--primary{background:var(--color-accent);color:var(--color-text-on-accent)}.b-hc02__btn--ghost{color:var(--color-text-on-primary);border-color:color-mix(in srgb,var(--color-text-on-primary) 30%,transparent)}.b-hc02__btn--ghost:hover{border-color:var(--color-text-on-primary)}` },
  ],
};
