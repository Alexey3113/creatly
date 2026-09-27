import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-cards-03",
  name: "Hero — дашборд-превью",
  description: "Заголовок по центру сверху, под ним большой скриншот дашборда в рамке браузера",
  category: "hero",
  subcategory: "cards",
  icon: "◧",
  tags: ["cards", "dashboard", "screenshot", "saas", "browser-frame"],
  motionLevel: "css",
  fields: [
    { name: "hero-eyebrow", type: "text", hint: "лейбл", required: false },
    { name: "hero-title", type: "heading", hint: "заголовок 5-8 слов", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание", required: true },
    { name: "hero-cta", type: "link", hint: "CTA", required: true },
    { name: "hero-screenshot", type: "image", hint: "скриншот дашборда/продукта (широкий)", required: true },
  ],
  html: `<section class="b-hca03" data-block="hero">
  <div class="b-hca03__inner">
    <div class="b-hca03__text">
      <p class="b-hca03__eyebrow" data-field="hero-eyebrow" data-reveal="fade">Платформа аналитики</p>
      <h1 data-field="hero-title" data-reveal="up">Вся аналитика бизнеса на одном экране</h1>
      <p data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">Подключите источники данных за 5 минут. Дашборды обновляются в реальном времени.</p>
      <a class="b-btn" href="#" data-field="hero-cta" data-reveal="fade" style="--stagger:2">Начать бесплатно</a>
    </div>
    <div class="b-hca03__browser" data-reveal="up" style="--stagger:3">
      <div class="b-hca03__browser-bar"><span></span><span></span><span></span></div>
      <img data-field="hero-screenshot" src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" alt="Дашборд" />
    </div>
  </div>
</section>`,
  css: `.b-hca03{padding:var(--space-section) var(--space-block);background:var(--color-bg);text-align:center}
.b-hca03__inner{max-width:1100px;margin:0 auto}
.b-hca03 h1{font-family:var(--font-heading);font-size:clamp(2.25rem,4.5vw,3.5rem);color:var(--color-text);margin:0 0 1rem;line-height:1.1}
.b-hca03__eyebrow{color:var(--color-accent);font-family:var(--font-body);font-weight:700;text-transform:uppercase;letter-spacing:.1em;font-size:.8125rem;margin:0 0 1rem}
.b-hca03__text p{font-family:var(--font-body);color:var(--color-text-muted);font-size:1.125rem;line-height:1.6;max-width:560px;margin:0 auto 2rem}
.b-hca03__browser{margin-top:3rem;border-radius:var(--radius-lg);overflow:hidden;border:1px solid var(--color-border);box-shadow:0 20px 80px rgba(0,0,0,.08)}
.b-hca03__browser-bar{display:flex;gap:6px;padding:12px 16px;background:var(--color-surface);border-bottom:1px solid var(--color-border)}
.b-hca03__browser-bar span{width:10px;height:10px;border-radius:50%;background:var(--color-border)}
.b-hca03__browser img{width:100%;display:block;object-fit:cover;aspect-ratio:16/9}
@media(max-width:767px){.b-hca03{padding:3rem 1.25rem}.b-hca03__browser{margin-top:2rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-hca03{background:var(--color-primary)}.b-hca03 h1{color:var(--color-text-on-primary)}.b-hca03__text p{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-hca03__browser-bar{background:var(--color-surface)}` },
  ],
};
