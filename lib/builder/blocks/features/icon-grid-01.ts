import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "features-icon-grid-01",
  name: "Фичи — 6 иконок в сетке 2x3",
  description: "Компактная сетка 2x3 с эмодзи-иконками и короткими описаниями",
  category: "features",
  subcategory: "icon-grid",
  icon: "◆",
  tags: ["icon-grid", "compact", "minimal", "six", "grid"],
  motionLevel: "css",
  fields: [
    { name: "features-title", type: "heading", hint: "заголовок секции 3-6 слов", required: true },
    { name: "features-subtitle", type: "text", hint: "подзаголовок секции 1-2 предложения", required: false },
    { name: "feature-icon", type: "icon", hint: "эмодзи-иконка", required: true },
    { name: "feature-title", type: "heading", hint: "заголовок 2-3 слова", required: true },
    { name: "feature-desc", type: "text", hint: "описание 1 предложение", required: true },
  ],
  html: `<section class="b-ft05" data-block="features">
  <div class="b-ft05__inner">
    <h2 class="b-ft05__title" data-field="features-title" data-reveal="word">Полный набор инструментов</h2>
    <p class="b-ft05__subtitle" data-field="features-subtitle" data-reveal="fade">Всё необходимое для эффективной работы команды в одном месте.</p>
    <div class="b-ft05__grid" data-collection="features" data-collection-grid>
      <div class="b-ft05__item" data-collection-item data-reveal="up" style="--stagger:0">
        <span class="b-ft05__icon" data-field="feature-icon">🎯</span>
        <h3 data-field="feature-title">Задачи</h3>
        <p data-field="feature-desc">Канбан-доски с автоматизацией переходов.</p>
      </div>
      <div class="b-ft05__item" data-collection-item data-reveal="up" style="--stagger:1">
        <span class="b-ft05__icon" data-field="feature-icon">💬</span>
        <h3 data-field="feature-title">Чат</h3>
        <p data-field="feature-desc">Встроенный мессенджер с тредами и реакциями.</p>
      </div>
      <div class="b-ft05__item" data-collection-item data-reveal="up" style="--stagger:2">
        <span class="b-ft05__icon" data-field="feature-icon">📁</span>
        <h3 data-field="feature-title">Файлы</h3>
        <p data-field="feature-desc">Облачное хранилище с версионированием до 100 ГБ.</p>
      </div>
      <div class="b-ft05__item" data-collection-item data-reveal="up" style="--stagger:3">
        <span class="b-ft05__icon" data-field="feature-icon">📅</span>
        <h3 data-field="feature-title">Календарь</h3>
        <p data-field="feature-desc">Синхронизация с Google Calendar и Outlook.</p>
      </div>
      <div class="b-ft05__item" data-collection-item data-reveal="up" style="--stagger:4">
        <span class="b-ft05__icon" data-field="feature-icon">⏱️</span>
        <h3 data-field="feature-title">Таймтрекинг</h3>
        <p data-field="feature-desc">Учёт времени по задачам и формирование отчётов.</p>
      </div>
      <div class="b-ft05__item" data-collection-item data-reveal="up" style="--stagger:5">
        <span class="b-ft05__icon" data-field="feature-icon">🔗</span>
        <h3 data-field="feature-title">Интеграции</h3>
        <p data-field="feature-desc">50+ коннекторов: Slack, Jira, GitHub, Figma.</p>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-ft05{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-ft05__inner{max-width:var(--container-width,1400px);margin:0 auto;text-align:center}
.b-ft05__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem;letter-spacing:-0.02em}
.b-ft05__subtitle{font-family:var(--font-body);font-size:1.0625rem;color:var(--color-text-muted);max-width:520px;margin:0 auto 3rem;line-height:1.6}
.b-ft05__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.b-ft05__item{padding:2.25rem 1.75rem;border-radius:var(--radius-lg);text-align:left;background:var(--color-surface);box-shadow:0 18px 45px -28px color-mix(in srgb,var(--color-text) 22%,transparent);transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s}
.b-ft05__item:hover{transform:translateY(-5px);box-shadow:0 28px 60px -28px color-mix(in srgb,var(--color-text) 32%,transparent)}
.b-ft05__icon{font-size:1.35rem;display:inline-flex;align-items:center;justify-content:center;width:2.9rem;height:2.9rem;border-radius:var(--radius-md);background:color-mix(in srgb,var(--color-accent) 12%,transparent);margin-bottom:1.1rem}
.b-ft05__item h3{font-family:var(--font-heading);font-size:1.1rem;color:var(--color-text);margin:0 0 .35rem}
.b-ft05__item p{font-family:var(--font-body);font-size:.875rem;color:var(--color-text-muted);margin:0;line-height:1.55}
@media(max-width:768px){.b-ft05__grid{grid-template-columns:repeat(2,1fr);gap:1rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-ft05{background:var(--color-primary)}.b-ft05__title{color:var(--color-text-on-primary)}.b-ft05__subtitle{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-ft05__item:hover{background:color-mix(in srgb,var(--color-text-on-primary) 8%,transparent)}.b-ft05__item h3{color:var(--color-text-on-primary)}.b-ft05__item p{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}` },
    { id: "accent", label: "Акцентный", css: `.b-ft05__item{background:var(--color-surface);border:1px solid var(--color-border)}.b-ft05__item:hover{border-color:var(--color-accent)}` },
  ],
};
