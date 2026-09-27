import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-stats-04",
  name: "Hero — счётчик + изображение",
  description: "Изображение слева, текст с рядом из 3 метрик справа, разделённых линиями",
  category: "hero",
  subcategory: "stats",
  icon: "▥",
  tags: ["stats", "image", "counter", "split"],
  motionLevel: "css",
  fields: [
    { name: "hero-image", type: "image", hint: "атмосферное фото", required: true },
    { name: "hero-title", type: "heading", hint: "заголовок", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание", required: true },
    { name: "hero-cta", type: "link", hint: "CTA", required: true },
    { name: "hero-stat-1-num", type: "stat", hint: "число 1", required: true },
    { name: "hero-stat-1-label", type: "text", hint: "подпись 1", required: true },
    { name: "hero-stat-2-num", type: "stat", hint: "число 2", required: true },
    { name: "hero-stat-2-label", type: "text", hint: "подпись 2", required: true },
    { name: "hero-stat-3-num", type: "stat", hint: "число 3", required: true },
    { name: "hero-stat-3-label", type: "text", hint: "подпись 3", required: true },
  ],
  html: `<section class="b-hst04" data-block="hero">
  <div class="b-hst04__inner">
    <div class="b-hst04__media" data-reveal="clip">
      <img data-field="hero-image" src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" alt="Офис" />
    </div>
    <div class="b-hst04__content">
      <h1 data-field="hero-title" data-reveal="up">Масштабируем бизнес через технологии</h1>
      <p data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">IT-консалтинг и разработка для компаний, которые хотят расти быстрее рынка.</p>
      <a class="b-btn" href="#" data-field="hero-cta" data-reveal="fade" style="--stagger:2">Получить оценку</a>
      <div class="b-hst04__row" data-reveal="up" style="--stagger:3">
        <div class="b-hst04__stat"><span data-field="hero-stat-1-num">200+</span><span data-field="hero-stat-1-label">Интеграций</span></div>
        <div class="b-hst04__stat"><span data-field="hero-stat-2-num">50M</span><span data-field="hero-stat-2-label">Обработано запросов</span></div>
        <div class="b-hst04__stat"><span data-field="hero-stat-3-num">99.9%</span><span data-field="hero-stat-3-label">Uptime</span></div>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-hst04{padding:var(--space-section) var(--space-block);background:var(--color-bg);min-height:85vh;display:flex;align-items:center}
.b-hst04__inner{max-width:var(--container-width,1400px);margin:0 auto;display:grid;grid-template-columns:1fr;gap:3rem;align-items:center;width:100%}
@media(min-width:1024px){.b-hst04__inner{grid-template-columns:.9fr 1.1fr}}
.b-hst04__media img{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:var(--radius-lg)}
.b-hst04 h1{font-family:var(--font-heading);font-size:clamp(2rem,4vw,3.25rem);color:var(--color-text);margin:0 0 1rem;line-height:1.1}
.b-hst04__content p{font-family:var(--font-body);color:var(--color-text-muted);font-size:1.0625rem;line-height:1.6;max-width:480px;margin:0 0 1.75rem}
.b-hst04__row{display:flex;gap:0;margin-top:2.5rem;border-top:1px solid var(--color-border);padding-top:1.5rem}
.b-hst04__stat{flex:1;padding-right:1.5rem;border-right:1px solid var(--color-border)}
.b-hst04__stat:last-child{border-right:0;padding-right:0}
.b-hst04__stat span:first-child{display:block;font-family:var(--font-heading);font-size:clamp(1.5rem,2.5vw,2rem);font-weight:700;color:var(--color-accent);line-height:1.1}
.b-hst04__stat span:last-child{display:block;font-family:var(--font-body);font-size:.8125rem;color:var(--color-text-muted);margin-top:.25rem}
@media(max-width:767px){.b-hst04{min-height:auto;padding:3rem 1.25rem}.b-hst04__row{flex-direction:column;gap:1rem}.b-hst04__stat{border-right:0;padding-right:0;border-bottom:1px solid var(--color-border);padding-bottom:1rem}.b-hst04__stat:last-child{border-bottom:0;padding-bottom:0}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-hst04{background:var(--color-primary)}.b-hst04 h1{color:var(--color-text-on-primary)}.b-hst04__content p,.b-hst04__stat span:last-child{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}.b-hst04__row,.b-hst04__stat{border-color:rgba(255,255,255,.1)}` },
  ],
};
