import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-cards-01",
  name: "Hero — плавающие карточки",
  description: "Заголовок слева, три плавающие карточки справа с лёгким поворотом и тенью",
  category: "hero",
  subcategory: "cards",
  icon: "◧",
  tags: ["cards", "floating", "3d", "product", "saas"],
  motionLevel: "css",
  fields: [
    { name: "hero-title", type: "heading", hint: "главный заголовок 5-8 слов", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание 1-2 предложения", required: true },
    { name: "hero-cta", type: "link", hint: "текст CTA", required: true },
    { name: "hero-card-1-img", type: "image", hint: "скриншот/продукт 1", required: true },
    { name: "hero-card-2-img", type: "image", hint: "скриншот/продукт 2", required: true },
    { name: "hero-card-3-img", type: "image", hint: "скриншот/продукт 3", required: true },
  ],
  html: `<section class="b-hca01" data-block="hero">
  <div class="b-hca01__inner">
    <div class="b-hca01__text" data-reveal="up">
      <h1 data-field="hero-title">Инструмент, который меняет подход к работе</h1>
      <p data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">Автоматизируйте рутину, сфокусируйтесь на важном. 3 000+ команд уже перешли.</p>
      <a class="b-btn" href="#" data-field="hero-cta" data-reveal="fade" style="--stagger:2">Попробовать бесплатно</a>
    </div>
    <div class="b-hca01__cards">
      <img class="b-hca01__card b-hca01__card--1" data-field="hero-card-1-img" src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80" alt="Продукт" data-reveal="up" style="--stagger:1" />
      <img class="b-hca01__card b-hca01__card--2" data-field="hero-card-2-img" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80" alt="Продукт" data-reveal="up" style="--stagger:2" />
      <img class="b-hca01__card b-hca01__card--3" data-field="hero-card-3-img" src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80" alt="Продукт" data-reveal="up" style="--stagger:3" />
    </div>
  </div>
</section>`,
  css: `.b-hca01{padding:var(--space-section) var(--space-block);background:var(--color-bg);min-height:90vh;display:flex;align-items:center}
.b-hca01__inner{max-width:var(--container-width,1400px);margin:0 auto;display:grid;grid-template-columns:1fr;gap:3rem;align-items:center}
@media(min-width:1024px){.b-hca01__inner{grid-template-columns:1fr 1.1fr}}
.b-hca01__text h1{font-family:var(--font-heading);font-size:clamp(2.25rem,4.5vw,3.75rem);color:var(--color-text);margin:0 0 1rem;line-height:1.1;letter-spacing:-0.02em}
.b-hca01__text p{font-family:var(--font-body);color:var(--color-text-muted);font-size:1.125rem;line-height:1.6;margin:0 0 2rem;max-width:480px}
.b-hca01__cards{position:relative;height:420px}
.b-hca01__card{position:absolute;width:260px;border-radius:var(--radius-lg);box-shadow:0 20px 60px rgba(0,0,0,.12);object-fit:cover;aspect-ratio:4/3;transition:transform .6s cubic-bezier(.16,1,.3,1)}
.b-hca01__card--1{top:0;left:8%;transform:rotate(-5deg);animation:b-hca01-float 6s ease-in-out infinite}
.b-hca01__card--2{top:60px;left:38%;transform:rotate(3deg);animation:b-hca01-float 6s ease-in-out 1s infinite}
.b-hca01__card--3{top:140px;left:12%;transform:rotate(-2deg);animation:b-hca01-float 6s ease-in-out 2s infinite}
@keyframes b-hca01-float{0%,100%{transform:rotate(var(--r,0deg)) translateY(0)}50%{transform:rotate(var(--r,0deg)) translateY(-14px)}}
.b-hca01__card--1{--r:-5deg}.b-hca01__card--2{--r:3deg}.b-hca01__card--3{--r:-2deg}
@media(max-width:1023px){.b-hca01__cards{height:300px}.b-hca01__card{width:200px}}
@media(max-width:767px){.b-hca01{min-height:auto;padding:3rem 1.25rem}.b-hca01__cards{height:260px}.b-hca01__card{width:180px}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-hca01{background:var(--color-primary)}.b-hca01__text h1{color:var(--color-text-on-primary)}.b-hca01__text p{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}` },
  ],
};
