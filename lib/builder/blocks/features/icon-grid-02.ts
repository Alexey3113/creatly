import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "features-icon-grid-02",
  name: "Фичи — 4 крупные иконки 2x2",
  description: "Сетка 2x2 с крупными иконками и подробным описанием каждой фичи",
  category: "features",
  subcategory: "icon-grid",
  icon: "◆",
  tags: ["icon-grid", "large-icons", "2x2", "detailed"],
  motionLevel: "css",
  fields: [
    { name: "features-title", type: "heading", hint: "заголовок секции 3-6 слов", required: true },
    { name: "feature-icon", type: "icon", hint: "крупная эмодзи-иконка", required: true },
    { name: "feature-title", type: "heading", hint: "заголовок карточки 2-4 слова", required: true },
    { name: "feature-desc", type: "text", hint: "подробное описание 2-3 предложения", required: true },
  ],
  html: `<section class="b-ft06" data-block="features">
  <div class="b-ft06__inner">
    <h2 class="b-ft06__title" data-field="features-title" data-reveal="up">Возможности платформы</h2>
    <div class="b-ft06__grid" data-collection="features" data-collection-grid>
      <div class="b-ft06__card" data-collection-item data-reveal="up" style="--stagger:0">
        <span class="b-ft06__icon" data-field="feature-icon">🚀</span>
        <h3 data-field="feature-title">Быстрый запуск</h3>
        <p data-field="feature-desc">Разверните проект за 5 минут без настройки серверов. Автоматический CI/CD и мониторинг из коробки.</p>
      </div>
      <div class="b-ft06__card" data-collection-item data-reveal="up" style="--stagger:1">
        <span class="b-ft06__icon" data-field="feature-icon">🧠</span>
        <h3 data-field="feature-title">AI-ассистент</h3>
        <p data-field="feature-desc">Встроенный искусственный интеллект анализирует данные и предлагает оптимизации. Обучается на ваших процессах.</p>
      </div>
      <div class="b-ft06__card" data-collection-item data-reveal="up" style="--stagger:2">
        <span class="b-ft06__icon" data-field="feature-icon">🔄</span>
        <h3 data-field="feature-title">Синхронизация</h3>
        <p data-field="feature-desc">Данные синхронизируются в реальном времени между всеми устройствами. Работайте офлайн — изменения подтянутся автоматически.</p>
      </div>
      <div class="b-ft06__card" data-collection-item data-reveal="up" style="--stagger:3">
        <span class="b-ft06__icon" data-field="feature-icon">📈</span>
        <h3 data-field="feature-title">Аналитика роста</h3>
        <p data-field="feature-desc">Отслеживайте ключевые метрики: конверсии, LTV, отток. Еженедельные отчёты с рекомендациями по улучшению.</p>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-ft06{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-ft06__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-ft06__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 3rem;text-align:center;letter-spacing:-0.02em}
.b-ft06__grid{display:grid;grid-template-columns:repeat(2,1fr);gap:2.5rem}
.b-ft06__card{padding:2.5rem;border-radius:var(--radius-lg);background:var(--color-surface);transition:transform .3s}
.b-ft06__card:hover{transform:translateY(-4px)}
.b-ft06__icon{font-size:3rem;display:block;margin-bottom:1.25rem}
.b-ft06__card h3{font-family:var(--font-heading);font-size:1.375rem;color:var(--color-text);margin:0 0 .75rem}
.b-ft06__card p{font-family:var(--font-body);font-size:1rem;color:var(--color-text-muted);margin:0;line-height:1.65}
@media(max-width:768px){.b-ft06__grid{grid-template-columns:1fr;gap:1.5rem}.b-ft06__card{padding:2rem 1.5rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-ft06{background:var(--color-primary)}.b-ft06__title{color:var(--color-text-on-primary)}.b-ft06__card{background:color-mix(in srgb,var(--color-text-on-primary) 8%,transparent)}.b-ft06__card h3{color:var(--color-text-on-primary)}.b-ft06__card p{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}` },
    { id: "accent", label: "Акцентный", css: `.b-ft06__card{border:2px solid var(--color-border)}.b-ft06__card:hover{border-color:var(--color-accent)}` },
  ],
};
