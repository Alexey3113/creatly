import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-split-left-02",
  name: "Hero — текст + карточка-дашборд",
  description: "Текст слева, справа — плавающая карточка-дашборд со статистикой и тенями",
  category: "hero",
  subcategory: "split-left",
  icon: "◨",
  tags: ["split", "dashboard", "stats", "card", "saas"],
  motionLevel: "css",
  fields: [
    { name: "hero-eyebrow", type: "text", hint: "короткий лейбл", required: false },
    { name: "hero-title", type: "heading", hint: "главный заголовок 5-8 слов", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание 1-2 предложения", required: true },
    { name: "hero-cta", type: "link", hint: "текст CTA-кнопки", required: true },
    { name: "hero-stat-1", type: "stat", hint: "число + подпись, напр. 98%", required: true },
    { name: "hero-stat-2", type: "stat", hint: "число + подпись", required: true },
    { name: "hero-stat-3", type: "stat", hint: "число + подпись", required: true },
  ],
  html: `<section class="b-hsl02" data-block="hero">
  <div class="b-hsl02__inner">
    <div class="b-hsl02__text">
      <p class="b-hsl02__eyebrow" data-field="hero-eyebrow" data-reveal="fade">Analytics Platform</p>
      <h1 class="b-hsl02__title" data-field="hero-title" data-reveal="up">Все данные вашего бизнеса в одном окне</h1>
      <p class="b-hsl02__desc" data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">Отслеживайте ключевые метрики, прогнозируйте рост и принимайте решения на основе данных.</p>
      <a class="b-hsl02__btn" href="#" data-field="hero-cta" data-reveal="fade" style="--stagger:2">Начать бесплатно</a>
    </div>
    <div class="b-hsl02__card" data-reveal="up" style="--stagger:1">
      <div class="b-hsl02__card-header">
        <span class="b-hsl02__card-dot"></span>
        <span class="b-hsl02__card-dot"></span>
        <span class="b-hsl02__card-dot"></span>
      </div>
      <div class="b-hsl02__stats">
        <div class="b-hsl02__stat" data-field="hero-stat-1">
          <span class="b-hsl02__stat-num">98%</span>
          <span class="b-hsl02__stat-label">Uptime</span>
        </div>
        <div class="b-hsl02__stat" data-field="hero-stat-2">
          <span class="b-hsl02__stat-num">2.4M</span>
          <span class="b-hsl02__stat-label">Запросов/день</span>
        </div>
        <div class="b-hsl02__stat" data-field="hero-stat-3">
          <span class="b-hsl02__stat-num">150ms</span>
          <span class="b-hsl02__stat-label">Среднее время</span>
        </div>
      </div>
      <div class="b-hsl02__chart-bar"><div class="b-hsl02__chart-fill" style="width:72%"></div></div>
      <div class="b-hsl02__chart-bar"><div class="b-hsl02__chart-fill" style="width:89%"></div></div>
      <div class="b-hsl02__chart-bar"><div class="b-hsl02__chart-fill" style="width:54%"></div></div>
    </div>
  </div>
</section>`,
  css: `.b-hsl02{background:var(--color-bg);min-height:90vh;display:flex;align-items:center;padding:var(--space-section) var(--space-block)}
.b-hsl02__inner{max-width:var(--container-width,1400px);width:100%;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:clamp(2rem,5vw,5rem);align-items:center;padding:0 clamp(1rem,3vw,3rem)}
.b-hsl02__text{max-width:540px}
.b-hsl02__eyebrow{color:var(--color-primary);font-family:var(--font-body);font-weight:700;text-transform:uppercase;letter-spacing:.12em;font-size:.8125rem;margin:0 0 1.25rem}
.b-hsl02__title{font-family:var(--font-heading);font-size:clamp(2rem,3.8vw,3.25rem);color:var(--color-text);margin:0;line-height:1.12;letter-spacing:-0.02em}
.b-hsl02__desc{color:var(--color-text-muted);font-family:var(--font-body);font-size:1.0625rem;margin:1.25rem 0 2rem;line-height:1.7}
.b-hsl02__btn{display:inline-flex;align-items:center;min-height:52px;padding:0 2rem;border-radius:var(--radius-md);background:var(--color-primary);color:var(--color-text-on-primary);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;transition:transform .3s cubic-bezier(.16,1,.3,1),opacity .3s}
.b-hsl02__btn:hover{transform:translateY(-2px);opacity:.9}
.b-hsl02__card{background:var(--color-surface);border-radius:var(--radius-lg);padding:1.75rem;box-shadow:0 4px 24px color-mix(in srgb,var(--color-text) 8%,transparent),0 1px 3px color-mix(in srgb,var(--color-text) 5%,transparent);border:1px solid var(--color-border)}
.b-hsl02__card-header{display:flex;gap:6px;margin-bottom:1.5rem}
.b-hsl02__card-dot{width:10px;height:10px;border-radius:var(--radius-full);background:var(--color-border)}
.b-hsl02__stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:1.75rem}
.b-hsl02__stat{text-align:center}
.b-hsl02__stat-num{display:block;font-family:var(--font-heading);font-size:1.75rem;font-weight:800;color:var(--color-text);letter-spacing:-0.02em}
.b-hsl02__stat-label{display:block;font-family:var(--font-body);font-size:.75rem;color:var(--color-text-muted);margin-top:.25rem;text-transform:uppercase;letter-spacing:.06em}
.b-hsl02__chart-bar{height:8px;border-radius:var(--radius-full);background:var(--color-border);margin-bottom:.75rem;overflow:hidden}
.b-hsl02__chart-bar:last-child{margin-bottom:0}
.b-hsl02__chart-fill{height:100%;border-radius:var(--radius-full);background:linear-gradient(90deg,var(--color-primary),var(--color-accent))}
@media(max-width:768px){.b-hsl02{min-height:auto;padding:3rem 1.25rem}.b-hsl02__inner{grid-template-columns:1fr;gap:2.5rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-hsl02{background:var(--color-primary)}.b-hsl02__eyebrow{color:var(--color-accent)}.b-hsl02__title{color:var(--color-text-on-primary)}.b-hsl02__desc{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-hsl02__btn{background:var(--color-accent);color:var(--color-text-on-accent)}.b-hsl02__card{background:color-mix(in srgb,var(--color-primary) 80%,var(--color-surface));border-color:color-mix(in srgb,var(--color-text-on-primary) 10%,transparent)}.b-hsl02__stat-num{color:var(--color-text-on-primary)}.b-hsl02__stat-label{color:color-mix(in srgb,var(--color-text-on-primary) 55%,transparent)}.b-hsl02__chart-bar{background:color-mix(in srgb,var(--color-text-on-primary) 12%,transparent)}` },
    { id: "accent", label: "Акцентный", css: `.b-hsl02{background:var(--color-bg-alt)}.b-hsl02__card{box-shadow:0 8px 40px color-mix(in srgb,var(--color-primary) 15%,transparent)}` },
  ],
};
