import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-gradient-bold-05",
  name: "Hero — неоновая полоса",
  description: "Горизонтальная светящаяся линия по центру, заголовок над ней, подзаголовок под ней",
  category: "hero",
  subcategory: "gradient-bold",
  icon: "★",
  tags: ["gradient", "neon", "line", "futuristic", "tech"],
  motionLevel: "css",
  fields: [
    { name: "hero-title", type: "heading", hint: "заголовок 4-6 слов", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание", required: true },
    { name: "hero-cta", type: "link", hint: "CTA", required: true },
  ],
  html: `<section class="b-hgb05" data-block="hero">
  <div class="b-hgb05__inner">
    <h1 data-field="hero-title" data-reveal="up">Скорость решает всё</h1>
    <div class="b-hgb05__line" data-reveal="clip"></div>
    <p data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">CDN нового поколения. 50ms отклик в 190 точках мира. Нулевой даунтайм.</p>
    <a class="b-btn" href="#" data-field="hero-cta" data-reveal="fade" style="--stagger:2">Подключить</a>
  </div>
</section>`,
  css: `.b-hgb05{min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--color-primary);padding:var(--space-section) var(--space-block);position:relative}
.b-hgb05__inner{max-width:900px;text-align:center;position:relative;z-index:1}
.b-hgb05 h1{font-family:var(--font-heading);font-size:clamp(3rem,7vw,5.5rem);color:var(--color-text-on-primary);margin:0;line-height:.95;letter-spacing:-.03em;font-weight:800}
.b-hgb05__line{width:clamp(200px,50vw,500px);height:2px;margin:2rem auto;background:linear-gradient(90deg,transparent,var(--color-accent),transparent);position:relative}
.b-hgb05__line::after{content:"";position:absolute;inset:-4px 0;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--color-accent) 30%,transparent),transparent);filter:blur(8px)}
.b-hgb05 p{font-family:var(--font-body);color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent);font-size:1.125rem;max-width:480px;margin:0 auto 2.5rem;line-height:1.6}
@media(max-width:767px){.b-hgb05{min-height:80vh}}`,
  variants: [
    { id: "dark", label: "Тёмный", css: "" },
    { id: "deep", label: "Глубокий чёрный", css: `.b-hgb05{background:#050505}` },
    { id: "surface", label: "На поверхности", css: `.b-hgb05{background:var(--color-bg)}.b-hgb05 h1{color:var(--color-text)}.b-hgb05 p{color:var(--color-text-muted)}` },
  ],
};
