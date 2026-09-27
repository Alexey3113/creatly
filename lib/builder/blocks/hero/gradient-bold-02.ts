import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-gradient-bold-02",
  name: "Hero — диагональный сплит",
  description: "Экран разделён диагональю на два цвета, заголовок пересекает обе зоны",
  category: "hero",
  subcategory: "gradient-bold",
  icon: "★",
  tags: ["gradient", "diagonal", "split-color", "dynamic", "contrast"],
  motionLevel: "css",
  fields: [
    { name: "hero-title", type: "heading", hint: "мощный заголовок 4-6 слов", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание 1-2 предложения", required: true },
    { name: "hero-cta", type: "link", hint: "CTA", required: true },
    { name: "hero-cta-secondary", type: "link", hint: "вторичная ссылка", required: false },
  ],
  html: `<section class="b-hgb02" data-block="hero">
  <div class="b-hgb02__inner">
    <h1 data-field="hero-title" data-reveal="up">Разрушаем границы возможного</h1>
    <p data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">Креативное агентство нового формата. Стратегия, дизайн, технологии — без компромиссов.</p>
    <div class="b-hgb02__btns" data-reveal="fade" style="--stagger:2">
      <a class="b-btn" href="#" data-field="hero-cta">Смотреть кейсы</a>
      <a class="b-btn b-btn--ghost" href="#" data-field="hero-cta-secondary">О нас</a>
    </div>
  </div>
</section>`,
  css: `.b-hgb02{position:relative;min-height:100vh;display:flex;align-items:center;background:var(--color-primary);overflow:hidden}
.b-hgb02::after{content:"";position:absolute;inset:0;background:var(--color-accent);clip-path:polygon(55% 0,100% 0,100% 100%,35% 100%);z-index:0}
.b-hgb02__inner{position:relative;z-index:1;max-width:1000px;margin:0 auto;padding:0 var(--space-block);text-align:center}
.b-hgb02 h1{font-family:var(--font-heading);font-size:clamp(3rem,7vw,5.5rem);color:var(--color-text-on-primary);margin:0;line-height:.98;letter-spacing:-.03em;font-weight:800;mix-blend-mode:difference}
.b-hgb02 p{font-family:var(--font-body);color:color-mix(in srgb,var(--color-text-on-primary) 80%,transparent);font-size:1.125rem;max-width:520px;margin:1.5rem auto 2rem;line-height:1.6}
.b-hgb02__btns{display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap}
.b-hgb02 .b-btn--ghost{background:transparent;border:1.5px solid rgba(255,255,255,.3);color:var(--color-text-on-primary)}
@media(max-width:767px){.b-hgb02{min-height:80vh}.b-hgb02::after{clip-path:polygon(40% 0,100% 0,100% 100%,20% 100%)}}`,
  variants: [
    { id: "primary-accent", label: "Primary → Accent", css: "" },
    { id: "accent-primary", label: "Accent → Primary", css: `.b-hgb02{background:var(--color-accent)}.b-hgb02::after{background:var(--color-primary)}` },
  ],
};
