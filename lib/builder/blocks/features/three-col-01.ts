import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "features-three-col-01",
  name: "Фичи — 3 карточки с иконками",
  description: "Секция с заголовком + 3 карточки: иконка, заголовок, описание",
  category: "features",
  subcategory: "three-col",
  icon: "◆",
  tags: ["three-col", "cards", "icons", "grid", "simple"],
  motionLevel: "css",
  fields: [
    { name: "features-title", type: "heading", hint: "заголовок секции 3-6 слов", required: true },
    { name: "features-subtitle", type: "text", hint: "подзаголовок секции 1-2 предложения", required: false },
    { name: "feature-icon", type: "icon", hint: "эмодзи-иконка фичи", required: true },
    { name: "feature-title", type: "heading", hint: "заголовок карточки 2-4 слова", required: true },
    { name: "feature-desc", type: "text", hint: "описание карточки 1-2 предложения", required: true },
  ],
  html: `<section class="b-ft01" data-block="features">
  <div class="b-ft01__inner">
    <h2 class="b-ft01__title" data-field="features-title" data-reveal="word">Почему выбирают нас</h2>
    <p class="b-ft01__subtitle" data-field="features-subtitle" data-reveal="fade">Три ключевых преимущества, которые отличают нашу платформу от конкурентов.</p>
    <div class="b-ft01__grid" data-collection="features" data-collection-grid>
      <div class="b-ft01__card" data-collection-item data-reveal="up" style="--stagger:0">
        <span class="b-ft01__icon" data-field="feature-icon">⚡</span>
        <h3 data-field="feature-title">Мгновенная скорость</h3>
        <p data-field="feature-desc">Загрузка страниц менее чем за 0.3 секунды благодаря edge-серверам в 42 странах.</p>
      </div>
      <div class="b-ft01__card" data-collection-item data-reveal="up" style="--stagger:1">
        <span class="b-ft01__icon" data-field="feature-icon">🔒</span>
        <h3 data-field="feature-title">Защита данных</h3>
        <p data-field="feature-desc">Шифрование AES-256 и двухфакторная аутентификация для каждого аккаунта.</p>
      </div>
      <div class="b-ft01__card" data-collection-item data-reveal="up" style="--stagger:2">
        <span class="b-ft01__icon" data-field="feature-icon">📊</span>
        <h3 data-field="feature-title">Умная аналитика</h3>
        <p data-field="feature-desc">Дашборды в реальном времени с AI-прогнозами и автоматическими отчётами.</p>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-ft01{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-ft01__inner{max-width:var(--container-width,1400px);margin:0 auto;text-align:center}
.b-ft01__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem;letter-spacing:-0.02em}
.b-ft01__subtitle{font-family:var(--font-body);font-size:1.0625rem;color:var(--color-text-muted);max-width:560px;margin:0 auto 3rem;line-height:1.6}
.b-ft01__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.75rem}
.b-ft01__card{position:relative;background:var(--color-surface);border-radius:var(--radius-lg);padding:2.75rem 2.25rem;text-align:left;box-shadow:0 22px 55px -30px color-mix(in srgb,var(--color-text) 28%,transparent);transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s}
.b-ft01__card:hover{transform:translateY(-6px);box-shadow:0 34px 70px -30px color-mix(in srgb,var(--color-text) 38%,transparent)}
.b-ft01__card::after{content:"";position:absolute;left:2.25rem;right:2.25rem;top:0;height:3px;border-radius:0 0 3px 3px;background:var(--color-accent);opacity:0;transition:opacity .3s}
.b-ft01__card:hover::after{opacity:1}
.b-ft01__icon{font-size:1.6rem;display:inline-flex;align-items:center;justify-content:center;width:3.25rem;height:3.25rem;border-radius:var(--radius-md);background:color-mix(in srgb,var(--color-accent) 12%,transparent);margin-bottom:1.5rem}
.b-ft01__card h3{font-family:var(--font-heading);font-size:1.25rem;color:var(--color-text);margin:0 0 .5rem}
.b-ft01__card p{font-family:var(--font-body);font-size:.9375rem;color:var(--color-text-muted);margin:0;line-height:1.6}
@media(max-width:768px){.b-ft01__grid{grid-template-columns:1fr;gap:1.25rem}}`,
  variants: [
    { id: "dark", label: "Тёмный", css: `.b-ft01{background:var(--color-primary)}.b-ft01__title{color:var(--color-text-on-primary)}.b-ft01__subtitle{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-ft01__card{background:color-mix(in srgb,var(--color-text-on-primary) 8%,transparent)}.b-ft01__card h3{color:var(--color-text-on-primary)}.b-ft01__card p{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}` },
    { id: "light", label: "Светлый", css: "" },
    { id: "accent", label: "Акцентный", css: `.b-ft01__card{border:1px solid var(--color-accent)}.b-ft01__icon{color:var(--color-accent)}` },
  ],
};
