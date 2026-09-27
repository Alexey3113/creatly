import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-stats-03",
  name: "Hero — гигантские числа",
  description: "Огромные полупрозрачные числа за текстом, акцентный цвет, минимальная структура",
  category: "hero",
  subcategory: "stats",
  icon: "▥",
  tags: ["stats", "giant-numbers", "overlay", "bold"],
  motionLevel: "css",
  fields: [
    { name: "hero-title", type: "heading", hint: "заголовок", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание", required: true },
    { name: "hero-big-num", type: "stat", hint: "одно крупное число (напр. 10K+)", required: true },
    { name: "hero-big-label", type: "text", hint: "подпись к числу", required: true },
    { name: "hero-cta", type: "link", hint: "CTA", required: true },
  ],
  html: `<section class="b-hst03" data-block="hero">
  <div class="b-hst03__inner">
    <span class="b-hst03__big" data-field="hero-big-num" data-reveal="scale">10K+</span>
    <div class="b-hst03__text">
      <h1 data-field="hero-title" data-reveal="up">Клиентов доверяют нам свои проекты</h1>
      <p data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">Разработка, дизайн, маркетинг — полный цикл digital-услуг для растущего бизнеса.</p>
      <p class="b-hst03__meta" data-field="hero-big-label" data-reveal="fade" style="--stagger:2">довольных клиентов по всему миру</p>
      <a class="b-btn" href="#" data-field="hero-cta" data-reveal="fade" style="--stagger:3">Начать проект</a>
    </div>
  </div>
</section>`,
  css: `.b-hst03{padding:var(--space-section) var(--space-block);background:var(--color-primary);min-height:90vh;display:flex;align-items:center;position:relative;overflow:hidden}
.b-hst03__inner{max-width:900px;margin:0 auto;text-align:center;position:relative;z-index:1}
.b-hst03__big{display:block;font-family:var(--font-heading);font-size:clamp(6rem,18vw,14rem);font-weight:900;color:var(--color-accent);opacity:.12;line-height:.85;letter-spacing:-.04em;position:absolute;top:50%;left:50%;transform:translate(-50%,-55%);z-index:0;pointer-events:none;white-space:nowrap}
.b-hst03__text{position:relative;z-index:1}
.b-hst03 h1{font-family:var(--font-heading);font-size:clamp(2.25rem,4.5vw,3.75rem);color:var(--color-text-on-primary);margin:0 0 1rem;line-height:1.1}
.b-hst03__text>p{font-family:var(--font-body);color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent);font-size:1.125rem;line-height:1.6;max-width:560px;margin:0 auto 1.5rem}
.b-hst03__meta{font-family:var(--font-body);font-size:.8125rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--color-accent);margin-bottom:2rem}
@media(max-width:767px){.b-hst03{min-height:auto;padding:4rem 1.25rem}.b-hst03__big{font-size:5rem}}`,
  variants: [
    { id: "dark", label: "Тёмный", css: "" },
    { id: "light", label: "Светлый", css: `.b-hst03{background:var(--color-bg)}.b-hst03 h1{color:var(--color-text)}.b-hst03__text>p{color:var(--color-text-muted)}` },
  ],
};
