import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-gradient-bold-03",
  name: "Hero — радиальный свет",
  description: "Тёмный фон с радиальным свечением из центра, текст по центру, spotlight-эффект",
  category: "hero",
  subcategory: "gradient-bold",
  icon: "★",
  tags: ["gradient", "radial", "spotlight", "dramatic", "dark"],
  motionLevel: "css",
  fields: [
    { name: "hero-eyebrow", type: "text", hint: "лейбл", required: false },
    { name: "hero-title", type: "heading", hint: "заголовок 4-7 слов", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание", required: true },
    { name: "hero-cta", type: "link", hint: "CTA", required: true },
  ],
  html: `<section class="b-hgb03" data-block="hero">
  <div class="b-hgb03__inner">
    <p class="b-hgb03__eyebrow" data-field="hero-eyebrow" data-reveal="fade">Запуск 2026</p>
    <h1 data-field="hero-title" data-reveal="up">Продукт, который ждали все</h1>
    <p data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">Новая платформа для управления проектами. Быстрее, умнее, проще.</p>
    <a class="b-btn b-btn--glow" href="#" data-field="hero-cta" data-reveal="fade" style="--stagger:2">Получить ранний доступ</a>
  </div>
</section>`,
  css: `.b-hgb03{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--color-primary);overflow:hidden}
.b-hgb03::before{content:"";position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--color-accent) 40%,transparent),transparent 70%);top:50%;left:50%;transform:translate(-50%,-50%);filter:blur(80px);animation:b-hgb03-pulse 6s ease-in-out infinite alternate;z-index:0}
@keyframes b-hgb03-pulse{0%{opacity:.5;transform:translate(-50%,-50%) scale(1)}100%{opacity:.8;transform:translate(-50%,-50%) scale(1.15)}}
.b-hgb03__inner{position:relative;z-index:1;text-align:center;max-width:800px;padding:0 var(--space-block)}
.b-hgb03__eyebrow{font-family:var(--font-body);font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.15em;color:var(--color-accent);margin:0 0 1.5rem;padding:.375rem 1rem;border:1px solid color-mix(in srgb,var(--color-accent) 30%,transparent);border-radius:var(--radius-full);display:inline-block}
.b-hgb03 h1{font-family:var(--font-heading);font-size:clamp(2.75rem,6vw,5rem);color:var(--color-text-on-primary);margin:0;line-height:1;letter-spacing:-.02em;font-weight:800}
.b-hgb03__inner>p{font-family:var(--font-body);color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent);font-size:1.125rem;max-width:480px;margin:1.25rem auto 2.5rem;line-height:1.6}
.b-btn--glow{box-shadow:0 0 30px color-mix(in srgb,var(--color-accent) 40%,transparent)}
.b-btn--glow:hover{box-shadow:0 0 50px color-mix(in srgb,var(--color-accent) 55%,transparent)}
@media(max-width:767px){.b-hgb03{min-height:80vh}.b-hgb03::before{width:300px;height:300px}}`,
  variants: [
    { id: "dark", label: "Тёмный", css: "" },
    { id: "deep", label: "Глубокий", css: `.b-hgb03{background:#0a0a0a}` },
  ],
};
