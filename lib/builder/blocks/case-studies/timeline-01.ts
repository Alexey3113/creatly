import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "case-studies-timeline-01",
  name: "Кейс — таймлайн этапов",
  description: "Кейс в формате таймлайна: 4 этапа с вертикальной линией-коннектором, точками, заголовками, описаниями и результатами на каждом шаге",
  category: "case-studies",
  subcategory: "timeline",
  icon: "⏳",
  tags: ["case-studies", "timeline", "steps", "process", "vertical"],
  motionLevel: "css",
  fields: [
    { name: "cs04-title", type: "heading", hint: "заголовок секции 3-6 слов", required: true },
    { name: "cs04-subtitle", type: "text", hint: "подзаголовок секции 1-2 предложения", required: false },
    { name: "cs04-step-label", type: "text", hint: "метка этапа, например Этап 1", required: true },
    { name: "cs04-step-title", type: "heading", hint: "заголовок этапа 3-5 слов", required: true },
    { name: "cs04-step-desc", type: "text", hint: "описание этапа 1-2 предложения", required: true },
    { name: "cs04-step-stat", type: "stat", hint: "результат этапа, например +40%", required: false },
    { name: "cs04-step-stat-label", type: "text", hint: "подпись к метрике этапа", required: false },
  ],
  html: `<section class="b-cs04" data-block="case-studies">
  <div class="b-cs04__inner">
    <div class="b-cs04__header" data-reveal="up">
      <h2 data-field="cs04-title">Путь к результату</h2>
      <p data-field="cs04-subtitle">Как мы за 4 месяца увеличили продажи клиента в 5 раз — пошагово.</p>
    </div>
    <div class="b-cs04__timeline" data-collection="steps">
      <div class="b-cs04__step" data-collection-item data-reveal="up" style="--stagger:0">
        <div class="b-cs04__dot"></div>
        <div class="b-cs04__step-content">
          <span class="b-cs04__step-label" data-field="cs04-step-label">Этап 1</span>
          <h3 data-field="cs04-step-title">Аудит и аналитика</h3>
          <p data-field="cs04-step-desc">Глубокий анализ текущих метрик, конкурентов и пользовательского поведения. Выявили 12 критических точек потери конверсии.</p>
          <div class="b-cs04__step-metric">
            <span class="b-cs04__step-stat" data-field="cs04-step-stat">12</span>
            <span class="b-cs04__step-stat-text" data-field="cs04-step-stat-label">проблем найдено</span>
          </div>
        </div>
      </div>
      <div class="b-cs04__step" data-collection-item data-reveal="up" style="--stagger:1">
        <div class="b-cs04__dot"></div>
        <div class="b-cs04__step-content">
          <span class="b-cs04__step-label" data-field="cs04-step-label">Этап 2</span>
          <h3 data-field="cs04-step-title">Прототипирование и тесты</h3>
          <p data-field="cs04-step-desc">Создали 3 варианта прототипов и протестировали на реальных пользователях. Выбрали лучший по результатам A/B-тестов.</p>
          <div class="b-cs04__step-metric">
            <span class="b-cs04__step-stat" data-field="cs04-step-stat">+40%</span>
            <span class="b-cs04__step-stat-text" data-field="cs04-step-stat-label">CTR на прототипе</span>
          </div>
        </div>
      </div>
      <div class="b-cs04__step" data-collection-item data-reveal="up" style="--stagger:2">
        <div class="b-cs04__dot"></div>
        <div class="b-cs04__step-content">
          <span class="b-cs04__step-label" data-field="cs04-step-label">Этап 3</span>
          <h3 data-field="cs04-step-title">Разработка и запуск</h3>
          <p data-field="cs04-step-desc">Поэтапный запуск нового дизайна с мониторингом всех ключевых метрик в реальном времени.</p>
          <div class="b-cs04__step-metric">
            <span class="b-cs04__step-stat" data-field="cs04-step-stat">×2.3</span>
            <span class="b-cs04__step-stat-text" data-field="cs04-step-stat-label">рост конверсии</span>
          </div>
        </div>
      </div>
      <div class="b-cs04__step" data-collection-item data-reveal="up" style="--stagger:3">
        <div class="b-cs04__dot"></div>
        <div class="b-cs04__step-content">
          <span class="b-cs04__step-label" data-field="cs04-step-label">Этап 4</span>
          <h3 data-field="cs04-step-title">Масштабирование</h3>
          <p data-field="cs04-step-desc">Оптимизировали рекламные кампании и подключили новые каналы привлечения. Вышли на стабильный рост.</p>
          <div class="b-cs04__step-metric">
            <span class="b-cs04__step-stat" data-field="cs04-step-stat">×5</span>
            <span class="b-cs04__step-stat-text" data-field="cs04-step-stat-label">объём продаж</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-cs04{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-cs04__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-cs04__header{text-align:center;margin-bottom:3.5rem}
.b-cs04__header h2{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem;letter-spacing:-0.02em}
.b-cs04__header p{font-family:var(--font-body);font-size:1.0625rem;color:var(--color-text-muted);max-width:520px;margin:0 auto;line-height:1.6}
.b-cs04__timeline{position:relative;max-width:720px;margin:0 auto;padding-left:2.5rem}
.b-cs04__timeline::before{content:"";position:absolute;left:.6875rem;top:0;bottom:0;width:2px;background:var(--color-border)}
.b-cs04__step{position:relative;padding-bottom:2.5rem}
.b-cs04__step:last-child{padding-bottom:0}
.b-cs04__dot{position:absolute;left:-2.5rem;top:.25rem;width:1.375rem;height:1.375rem;border-radius:var(--radius-full);background:var(--color-primary);border:3px solid var(--color-bg);z-index:1;transition:transform .3s}
.b-cs04__step:hover .b-cs04__dot{transform:scale(1.25)}
.b-cs04__step-content{background:var(--color-surface);border-radius:var(--radius-md);padding:1.75rem;border:1px solid var(--color-border);transition:box-shadow .3s}
.b-cs04__step:hover .b-cs04__step-content{box-shadow:0 8px 24px color-mix(in srgb,var(--color-text) 6%,transparent)}
.b-cs04__step-label{font-family:var(--font-body);font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:var(--color-primary);display:block;margin-bottom:.5rem}
.b-cs04__step-content h3{font-family:var(--font-heading);font-size:1.125rem;color:var(--color-text);margin:0 0 .5rem;letter-spacing:-0.01em}
.b-cs04__step-content p{font-family:var(--font-body);font-size:.9375rem;color:var(--color-text-muted);margin:0 0 1rem;line-height:1.6}
.b-cs04__step-metric{display:flex;align-items:baseline;gap:.5rem;padding-top:.75rem;border-top:1px solid var(--color-border)}
.b-cs04__step-stat{font-family:var(--font-heading);font-size:1.5rem;font-weight:700;color:var(--color-primary);letter-spacing:-0.02em}
.b-cs04__step-stat-text{font-family:var(--font-body);font-size:.8125rem;color:var(--color-text-muted)}
@media(min-width:768px){.b-cs04__timeline{padding-left:3.5rem}.b-cs04__timeline::before{left:1.1875rem}.b-cs04__dot{left:-3.5rem;width:1.5rem;height:1.5rem}.b-cs04__step-content{padding:2rem}}
@media(min-width:1024px){.b-cs04__timeline{max-width:800px}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-cs04{background:var(--color-primary)}.b-cs04__header h2{color:var(--color-text-on-primary)}.b-cs04__header p{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-cs04__timeline::before{background:color-mix(in srgb,var(--color-text-on-primary) 20%,transparent)}.b-cs04__dot{background:var(--color-accent);border-color:var(--color-primary)}.b-cs04__step-content{background:color-mix(in srgb,var(--color-text-on-primary) 6%,transparent);border-color:color-mix(in srgb,var(--color-text-on-primary) 10%,transparent)}.b-cs04__step-label{color:var(--color-accent)}.b-cs04__step-content h3{color:var(--color-text-on-primary)}.b-cs04__step-content p{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}.b-cs04__step-metric{border-color:color-mix(in srgb,var(--color-text-on-primary) 12%,transparent)}.b-cs04__step-stat{color:var(--color-accent)}.b-cs04__step-stat-text{color:color-mix(in srgb,var(--color-text-on-primary) 60%,transparent)}` },
    { id: "accent-dots", label: "Акцентные точки", css: `.b-cs04__dot{background:var(--color-accent)}.b-cs04__step-label{color:var(--color-accent)}.b-cs04__step-stat{color:var(--color-accent)}` },
  ],
};
