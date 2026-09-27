import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-centered-05",
  name: "Hero — раздельные CTA",
  description: "Центрированный заголовок + подзаголовок + два контрастных CTA (заливка + контур), чистый редакционный стиль",
  category: "hero",
  subcategory: "centered",
  icon: "◆",
  tags: ["centered", "dual-cta", "editorial", "clean", "split-cta"],
  motionLevel: "css",
  fields: [
    { name: "hero-eyebrow", type: "text", hint: "короткий лейбл", required: false },
    { name: "hero-title", type: "heading", hint: "главный заголовок 5-8 слов", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание 1-2 предложения", required: true },
    { name: "hero-cta", type: "link", hint: "текст основного CTA", required: true },
    { name: "hero-cta-2", type: "link", hint: "текст второго CTA (контурная кнопка)", required: true },
  ],
  html: `<section class="b-hc05" data-block="hero">
  <div class="b-hc05__inner">
    <span class="b-hc05__eyebrow" data-field="hero-eyebrow" data-reveal="fade">With love & precision</span>
    <h1 class="b-hc05__title" data-field="hero-title" data-reveal="up">Создаём продукты, которые меняют правила игры</h1>
    <p class="b-hc05__desc" data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">Стратегический подход к дизайну и разработке. От идеи до запуска за 8 недель с гарантией результата.</p>
    <div class="b-hc05__actions" data-reveal="fade" style="--stagger:2">
      <a class="b-hc05__btn b-hc05__btn--fill" href="#" data-field="hero-cta">Начать проект</a>
      <a class="b-hc05__btn b-hc05__btn--outline" href="#" data-field="hero-cta-2">Посмотреть портфолио</a>
    </div>
  </div>
</section>`,
  css: `.b-hc05{text-align:center;min-height:90vh;display:flex;align-items:center;justify-content:center;padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-hc05__inner{max-width:720px;margin:0 auto;padding:0 clamp(1rem,3vw,3rem)}
.b-hc05__eyebrow{display:inline-block;color:var(--color-primary);font-family:var(--font-body);font-weight:600;font-size:.8125rem;letter-spacing:.08em;text-transform:uppercase;margin:0 0 1.5rem;padding:.35em .9em;border:1.5px solid var(--color-primary);border-radius:var(--radius-full)}
.b-hc05__title{font-family:var(--font-heading);font-size:clamp(2.25rem,4.5vw,3.75rem);color:var(--color-text);margin:0;line-height:1.12;letter-spacing:-0.02em}
.b-hc05__desc{color:var(--color-text-muted);font-family:var(--font-body);font-size:1.0625rem;max-width:540px;margin:1.25rem auto 2.5rem;line-height:1.7}
.b-hc05__actions{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
.b-hc05__btn{display:inline-flex;align-items:center;min-height:52px;padding:0 2rem;border-radius:var(--radius-md);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;transition:transform .3s cubic-bezier(.16,1,.3,1),opacity .3s,border-color .3s}
.b-hc05__btn:hover{transform:translateY(-2px)}
.b-hc05__btn--fill{background:var(--color-primary);color:var(--color-text-on-primary)}
.b-hc05__btn--fill:hover{opacity:.9}
.b-hc05__btn--outline{background:transparent;color:var(--color-text);border:2px solid var(--color-border)}
.b-hc05__btn--outline:hover{border-color:var(--color-primary);color:var(--color-primary)}
@media(max-width:768px){.b-hc05{min-height:auto;padding:4rem 1.25rem}.b-hc05__actions{flex-direction:column;align-items:center}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-hc05{background:var(--color-primary)}.b-hc05__eyebrow{color:var(--color-text-on-primary);border-color:color-mix(in srgb,var(--color-text-on-primary) 30%,transparent)}.b-hc05__title{color:var(--color-text-on-primary)}.b-hc05__desc{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}.b-hc05__btn--fill{background:var(--color-accent);color:var(--color-text-on-accent)}.b-hc05__btn--outline{color:var(--color-text-on-primary);border-color:color-mix(in srgb,var(--color-text-on-primary) 30%,transparent)}.b-hc05__btn--outline:hover{border-color:var(--color-text-on-primary)}` },
    { id: "accent", label: "Акцентный", css: `.b-hc05{background:var(--color-bg-alt)}.b-hc05__eyebrow{color:var(--color-accent);border-color:var(--color-accent)}` },
  ],
};
