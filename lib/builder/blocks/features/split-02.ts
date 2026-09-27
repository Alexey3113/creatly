import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "features-split-02",
  name: "Фичи — изображение + список с галочками",
  description: "Изображение слева, список из 4 фич с галочками справа",
  category: "features",
  subcategory: "split",
  icon: "◆",
  tags: ["split", "image", "checklist", "two-column"],
  motionLevel: "css",
  fields: [
    { name: "features-image", type: "image", hint: "изображение продукта или интерфейса", required: true },
    { name: "features-title", type: "heading", hint: "заголовок секции 4-7 слов", required: true },
    { name: "features-desc", type: "text", hint: "описание 1-2 предложения", required: false },
    { name: "feature-title", type: "heading", hint: "название фичи 2-4 слова", required: true },
    { name: "feature-desc", type: "text", hint: "описание фичи 1 предложение", required: true },
  ],
  html: `<section class="b-ft08" data-block="features">
  <div class="b-ft08__inner">
    <div class="b-ft08__media" data-reveal="clip">
      <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80" alt="" data-field="features-image">
    </div>
    <div class="b-ft08__content">
      <h2 data-field="features-title" data-reveal="up">Всё для продуктивной работы</h2>
      <p class="b-ft08__desc" data-field="features-desc" data-reveal="fade">Каждая функция спроектирована, чтобы экономить ваше время.</p>
      <ul class="b-ft08__list" data-collection="feature-title">
        <li data-reveal="up" style="--stagger:0" data-collection-item><span class="b-ft08__check">✓</span><div><strong data-field="feature-title">Умные шаблоны</strong><span data-field="feature-desc">Более 120 готовых шаблонов для любых задач.</span></div></li>
        <li data-reveal="up" style="--stagger:1" data-collection-item><span class="b-ft08__check">✓</span><div><strong data-field="feature-title">Командная работа</strong><span data-field="feature-desc">Совместное редактирование в реальном времени.</span></div></li>
        <li data-reveal="up" style="--stagger:2" data-collection-item><span class="b-ft08__check">✓</span><div><strong data-field="feature-title">Версионирование</strong><span data-field="feature-desc">История изменений с возможностью отката.</span></div></li>
        <li data-reveal="up" style="--stagger:3" data-collection-item><span class="b-ft08__check">✓</span><div><strong data-field="feature-title">Уведомления</strong><span data-field="feature-desc">Гибкая настройка оповещений по каналам.</span></div></li>
      </ul>
    </div>
  </div>
</section>`,
  css: `.b-ft08{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-ft08__inner{max-width:var(--container-width,1400px);margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}
.b-ft08__media img{width:100%;border-radius:var(--radius-lg);display:block}
.b-ft08__content h2{font-family:var(--font-heading);font-size:clamp(1.75rem,3vw,2.5rem);color:var(--color-text);margin:0 0 .75rem;letter-spacing:-0.02em}
.b-ft08__desc{font-family:var(--font-body);font-size:1.0625rem;color:var(--color-text-muted);margin:0 0 2rem;line-height:1.6}
.b-ft08__list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:1.25rem}
.b-ft08__list li{display:flex;gap:1rem;align-items:flex-start}
.b-ft08__check{color:var(--color-accent);font-weight:700;font-size:1.125rem;flex-shrink:0;margin-top:.1rem}
.b-ft08__list strong{font-family:var(--font-heading);font-size:1rem;color:var(--color-text);display:block;margin-bottom:.2rem}
.b-ft08__list span{font-family:var(--font-body);font-size:.9rem;color:var(--color-text-muted);line-height:1.5}
@media(max-width:768px){.b-ft08__inner{grid-template-columns:1fr;gap:2.5rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-ft08{background:var(--color-primary)}.b-ft08__content h2{color:var(--color-text-on-primary)}.b-ft08__desc{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-ft08__list strong{color:var(--color-text-on-primary)}.b-ft08__list span{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}` },
    { id: "accent", label: "Акцентный", css: `.b-ft08__check{background:var(--color-accent);color:var(--color-text-on-accent);width:1.5rem;height:1.5rem;border-radius:var(--radius-full);display:flex;align-items:center;justify-content:center;font-size:.75rem}` },
  ],
};
