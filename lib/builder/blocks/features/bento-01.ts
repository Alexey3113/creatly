import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "features-bento-01",
  name: "Фичи — Bento 1+3",
  description: "Bento-сетка: 1 крупная карточка слева + 3 маленьких справа",
  category: "features",
  subcategory: "bento",
  icon: "◆",
  tags: ["bento", "grid", "asymmetric", "cards", "modern"],
  motionLevel: "css",
  fields: [
    { name: "features-title", type: "heading", hint: "заголовок секции 3-6 слов", required: true },
    { name: "feature-main-title", type: "heading", hint: "заголовок большой карточки 3-5 слов", required: true },
    { name: "feature-main-desc", type: "text", hint: "описание большой карточки 2-3 предложения", required: true },
    { name: "feature-sm-icon", type: "icon", hint: "иконка маленькой карточки", required: true },
    { name: "feature-sm-title", type: "heading", hint: "заголовок маленькой карточки 2-3 слова", required: true },
    { name: "feature-sm-desc", type: "text", hint: "короткое описание 1 предложение", required: true },
  ],
  html: `<section class="b-ft03" data-block="features">
  <div class="b-ft03__inner">
    <h2 class="b-ft03__title" data-field="features-title" data-reveal="up">Возможности платформы</h2>
    <div class="b-ft03__grid" data-collection="feature-sm-icon">
      <div class="b-ft03__main" data-reveal="up">
        <h3 data-field="feature-main-title">Единая панель управления</h3>
        <p data-field="feature-main-desc">Контролируйте все процессы из одного интерфейса. Интеграция с 50+ сервисами, автоматические уведомления и полная история изменений.</p>
      </div>
      <div class="b-ft03__sm" data-reveal="up" style="--stagger:1" data-collection-item>
        <span class="b-ft03__icon" data-field="feature-sm-icon">🚀</span>
        <h3 data-field="feature-sm-title">Быстрый запуск</h3>
        <p data-field="feature-sm-desc">Старт проекта за 15 минут без привлечения разработчиков.</p>
      </div>
      <div class="b-ft03__sm" data-reveal="up" style="--stagger:2" data-collection-item>
        <span class="b-ft03__icon" data-field="feature-sm-icon">🔄</span>
        <h3 data-field="feature-sm-title">Автосинхронизация</h3>
        <p data-field="feature-sm-desc">Данные обновляются в реальном времени на всех устройствах.</p>
      </div>
      <div class="b-ft03__sm" data-reveal="up" style="--stagger:3" data-collection-item>
        <span class="b-ft03__icon" data-field="feature-sm-icon">📈</span>
        <h3 data-field="feature-sm-title">Рост метрик</h3>
        <p data-field="feature-sm-desc">Средний рост конверсии клиентов составляет 34% за первый квартал.</p>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-ft03{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-ft03__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-ft03__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 3rem;text-align:center;letter-spacing:-0.02em}
.b-ft03__grid{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:auto auto;gap:1.5rem}
.b-ft03__main{grid-row:1/3;background:var(--color-accent);border-radius:var(--radius-lg);padding:3rem 2.5rem;display:flex;flex-direction:column;justify-content:flex-end}
.b-ft03__main h3{font-family:var(--font-heading);font-size:1.75rem;color:var(--color-text-on-accent);margin:0 0 1rem}
.b-ft03__main p{font-family:var(--font-body);font-size:1rem;color:color-mix(in srgb,var(--color-text-on-accent) 80%,transparent);margin:0;line-height:1.6}
.b-ft03__sm{background:var(--color-surface);border-radius:var(--radius-md);padding:1.75rem 1.5rem}
.b-ft03__icon{font-size:1.5rem;display:block;margin-bottom:.75rem}
.b-ft03__sm h3{font-family:var(--font-heading);font-size:1.1rem;color:var(--color-text);margin:0 0 .35rem}
.b-ft03__sm p{font-family:var(--font-body);font-size:.875rem;color:var(--color-text-muted);margin:0;line-height:1.55}
@media(max-width:768px){.b-ft03__grid{grid-template-columns:1fr}.b-ft03__main{grid-row:auto}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-ft03{background:var(--color-primary)}.b-ft03__title{color:var(--color-text-on-primary)}.b-ft03__sm{background:color-mix(in srgb,var(--color-text-on-primary) 8%,transparent)}.b-ft03__sm h3{color:var(--color-text-on-primary)}.b-ft03__sm p{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}` },
    { id: "accent", label: "Акцентный", css: `.b-ft03__main{background:var(--color-primary)}.b-ft03__main h3{color:var(--color-text-on-primary)}.b-ft03__main p{color:color-mix(in srgb,var(--color-text-on-primary) 80%,transparent)}` },
  ],
};
