import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-gradient-bold-04",
  name: "Hero — градиентный текст",
  description: "Заголовок с gradient-текстом (background-clip), тёмный фон, минимализм",
  category: "hero",
  subcategory: "gradient-bold",
  icon: "★",
  tags: ["gradient", "text-gradient", "bold-type", "minimal", "statement"],
  motionLevel: "css",
  fields: [
    { name: "hero-title", type: "heading", hint: "мощный короткий заголовок 3-5 слов", required: true },
    { name: "hero-subtitle", type: "text", hint: "одно уточняющее предложение", required: true },
    { name: "hero-cta", type: "link", hint: "CTA", required: true },
    { name: "hero-cta-secondary", type: "link", hint: "вторичная ссылка", required: false },
  ],
  html: `<section class="b-hgb04" data-block="hero">
  <div class="b-hgb04__inner">
    <h1 class="b-hgb04__gradient-text" data-field="hero-title" data-reveal="up">Создаём невозможное</h1>
    <p data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">Digital-продакшн для брендов, которые хотят выделяться.</p>
    <div class="b-hgb04__btns" data-reveal="fade" style="--stagger:2">
      <a class="b-btn" href="#" data-field="hero-cta">Портфолио</a>
      <a class="b-hgb04__link" href="#" data-field="hero-cta-secondary">Связаться →</a>
    </div>
  </div>
</section>`,
  css: `.b-hgb04{min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--color-primary);padding:var(--space-section) var(--space-block)}
.b-hgb04__inner{max-width:1000px;text-align:center}
.b-hgb04__gradient-text{font-family:var(--font-heading);font-size:clamp(3.5rem,9vw,8rem);font-weight:900;line-height:.9;letter-spacing:-.04em;margin:0;background:linear-gradient(135deg,var(--color-accent),color-mix(in srgb,var(--color-accent) 60%,#fff),var(--color-accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.b-hgb04 p{font-family:var(--font-body);color:color-mix(in srgb,var(--color-text-on-primary) 60%,transparent);font-size:1.25rem;max-width:440px;margin:2rem auto 2.5rem;line-height:1.5}
.b-hgb04__btns{display:flex;align-items:center;gap:1.5rem;justify-content:center;flex-wrap:wrap}
.b-hgb04__link{font-family:var(--font-body);color:var(--color-text-on-primary);text-decoration:none;font-size:.9375rem;font-weight:600;opacity:.7;transition:opacity .2s}
.b-hgb04__link:hover{opacity:1}
@media(max-width:767px){.b-hgb04{min-height:80vh}}`,
  variants: [
    { id: "dark", label: "Тёмный", css: "" },
    { id: "light", label: "Светлый", css: `.b-hgb04{background:var(--color-bg)}.b-hgb04__gradient-text{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));-webkit-background-clip:text;background-clip:text}.b-hgb04 p{color:var(--color-text-muted)}.b-hgb04__link{color:var(--color-text)}` },
  ],
};
