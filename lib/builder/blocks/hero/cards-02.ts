import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-cards-02",
  name: "Hero — мокап телефона",
  description: "Текст слева, справа мокап телефона (высокий скриншот) с тенью",
  category: "hero",
  subcategory: "cards",
  icon: "◧",
  tags: ["cards", "phone", "mockup", "app", "mobile"],
  motionLevel: "css",
  fields: [
    { name: "hero-eyebrow", type: "text", hint: "лейбл категории", required: false },
    { name: "hero-title", type: "heading", hint: "заголовок 5-8 слов", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание 1-2 предложения", required: true },
    { name: "hero-cta", type: "link", hint: "текст CTA", required: true },
    { name: "hero-cta-secondary", type: "link", hint: "вторичная кнопка", required: false },
    { name: "hero-phone-img", type: "image", hint: "скриншот приложения (вертикальный)", required: true },
  ],
  html: `<section class="b-hca02" data-block="hero">
  <div class="b-hca02__inner">
    <div class="b-hca02__text">
      <p class="b-hca02__eyebrow" data-field="hero-eyebrow" data-reveal="fade">Мобильное приложение</p>
      <h1 data-field="hero-title" data-reveal="up">Всё управление бизнесом в одном приложении</h1>
      <p data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">Финансы, команда, задачи и аналитика — в кармане. Уже 10 000+ предпринимателей.</p>
      <div class="b-hca02__btns" data-reveal="fade" style="--stagger:2">
        <a class="b-btn" href="#" data-field="hero-cta">Скачать</a>
        <a class="b-btn b-btn--ghost" href="#" data-field="hero-cta-secondary">Демо</a>
      </div>
    </div>
    <div class="b-hca02__phone" data-reveal="up" style="--stagger:2">
      <img data-field="hero-phone-img" src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80" alt="Приложение" />
    </div>
  </div>
</section>`,
  css: `.b-hca02{padding:var(--space-section) var(--space-block);background:var(--color-bg);min-height:90vh;display:flex;align-items:center}
.b-hca02__inner{max-width:var(--container-width,1400px);margin:0 auto;display:grid;grid-template-columns:1fr;gap:3rem;align-items:center}
@media(min-width:1024px){.b-hca02__inner{grid-template-columns:1.2fr .8fr}}
.b-hca02__text h1{font-family:var(--font-heading);font-size:clamp(2.25rem,4.5vw,3.75rem);color:var(--color-text);margin:0 0 1rem;line-height:1.1}
.b-hca02__eyebrow{color:var(--color-accent);font-family:var(--font-body);font-weight:700;text-transform:uppercase;letter-spacing:.1em;font-size:.8125rem;margin:0 0 1rem}
.b-hca02__text p{font-family:var(--font-body);color:var(--color-text-muted);font-size:1.125rem;line-height:1.6;margin:0 0 2rem;max-width:500px}
.b-hca02__btns{display:flex;gap:.75rem;flex-wrap:wrap}
.b-btn--ghost{background:transparent;border:1.5px solid var(--color-border);color:var(--color-text)}
.b-btn--ghost:hover{border-color:var(--color-accent);color:var(--color-accent)}
.b-hca02__phone{display:flex;justify-content:center}
.b-hca02__phone img{width:280px;border-radius:var(--radius-lg);box-shadow:0 30px 80px rgba(0,0,0,.15);object-fit:cover;aspect-ratio:9/19}
@media(max-width:767px){.b-hca02{min-height:auto;padding:3rem 1.25rem}.b-hca02__phone img{width:220px}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-hca02{background:var(--color-primary)}.b-hca02__text h1{color:var(--color-text-on-primary)}.b-hca02__text p{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-hca02__eyebrow{color:var(--color-accent)}.b-btn--ghost{border-color:rgba(255,255,255,.2);color:var(--color-text-on-primary)}` },
  ],
};
