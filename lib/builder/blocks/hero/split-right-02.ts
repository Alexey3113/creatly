import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-split-right-02",
  name: "Hero — мокап приложения слева, текст справа",
  description: "Телефонный мокап с высоким соотношением сторон слева + заголовок и список фич справа",
  category: "hero",
  subcategory: "split-right",
  icon: "⬔",
  tags: ["split", "mockup", "phone", "app", "features"],
  motionLevel: "css",
  fields: [
    { name: "hero-image", type: "image", hint: "скриншот приложения, 390×844 или подобный", required: true },
    { name: "hero-title", type: "heading", hint: "заголовок 4-7 слов", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание 1-2 предложения", required: true },
    { name: "hero-feature-1", type: "text", hint: "фича 1 — короткое описание", required: true },
    { name: "hero-feature-2", type: "text", hint: "фича 2 — короткое описание", required: true },
    { name: "hero-feature-3", type: "text", hint: "фича 3 — короткое описание", required: true },
    { name: "hero-cta", type: "link", hint: "текст CTA-кнопки", required: true },
  ],
  html: `<section class="b-hsr02" data-block="hero">
  <div class="b-hsr02__inner">
    <div class="b-hsr02__phone" data-reveal="up" style="--stagger:0">
      <div class="b-hsr02__phone-frame">
        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" alt="" data-field="hero-image" />
      </div>
    </div>
    <div class="b-hsr02__content">
      <h1 data-field="hero-title" data-reveal="up" style="--stagger:1">Ваш бизнес в кармане</h1>
      <p class="b-hsr02__desc" data-field="hero-subtitle" data-reveal="fade" style="--stagger:2">Управляйте всем из одного приложения — от аналитики до коммуникации с клиентами.</p>
      <ul class="b-hsr02__features">
        <li data-field="hero-feature-1" data-reveal="fade" style="--stagger:3"><span class="b-hsr02__feat-icon">✦</span>Мгновенные уведомления о заказах</li>
        <li data-field="hero-feature-2" data-reveal="fade" style="--stagger:4"><span class="b-hsr02__feat-icon">✦</span>Аналитика в реальном времени</li>
        <li data-field="hero-feature-3" data-reveal="fade" style="--stagger:5"><span class="b-hsr02__feat-icon">✦</span>Интеграция с 50+ сервисами</li>
      </ul>
      <a class="b-btn" href="#" data-field="hero-cta" data-reveal="fade" style="--stagger:6">Скачать приложение</a>
    </div>
  </div>
</section>`,
  css: `.b-hsr02{min-height:85vh;display:flex;align-items:center;padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-hsr02__inner{max-width:var(--container-width,1400px);margin:0 auto;display:flex;align-items:center;gap:clamp(3rem,6vw,7rem);width:100%}
.b-hsr02__phone{flex:0 0 auto;width:clamp(240px,22vw,320px)}
.b-hsr02__phone-frame{background:var(--color-surface);border-radius:2.5rem;padding:.75rem;box-shadow:0 24px 80px color-mix(in srgb,var(--color-text) 15%,transparent)}
.b-hsr02__phone-frame img{width:100%;height:auto;display:block;border-radius:2rem;object-fit:cover;aspect-ratio:9/19.5}
.b-hsr02__content{flex:1 1 auto}
.b-hsr02 h1{font-family:var(--font-heading);font-size:clamp(2rem,4vw,3.5rem);color:var(--color-text);margin:0;line-height:1.1;letter-spacing:-0.02em}
.b-hsr02__desc{color:var(--color-text-muted);font-family:var(--font-body);font-size:1.125rem;margin:1rem 0 2rem;line-height:1.65;max-width:500px}
.b-hsr02__features{list-style:none;padding:0;margin:0 0 2.5rem;display:flex;flex-direction:column;gap:1rem}
.b-hsr02__features li{font-family:var(--font-body);font-size:1rem;color:var(--color-text);display:flex;align-items:center;gap:.75rem;line-height:1.5}
.b-hsr02__feat-icon{color:var(--color-primary);font-size:1rem;flex-shrink:0}
.b-btn{display:inline-flex;align-items:center;min-height:52px;padding:0 2rem;border-radius:var(--radius-md);background:var(--color-primary);color:var(--color-text-on-primary);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;transition:transform .3s cubic-bezier(.16,1,.3,1),opacity .3s}
.b-btn:hover{transform:translateY(-2px);opacity:.9}
@media(max-width:767px){.b-hsr02__inner{flex-direction:column}.b-hsr02__phone{width:60%;max-width:280px}.b-hsr02{min-height:auto;padding:3rem 1.25rem}}`,
  variants: [
    { id: "default", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный фон", css: `.b-hsr02{background:var(--color-bg-alt)}.b-hsr02__phone-frame{background:var(--color-border)}` },
    { id: "gradient", label: "Градиент", css: `.b-hsr02{background:linear-gradient(135deg,var(--color-bg) 0%,var(--color-bg-alt) 100%)}` },
  ],
};
