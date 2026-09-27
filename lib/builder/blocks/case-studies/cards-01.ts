import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "case-studies-cards-01",
  name: "Кейсы — 3 карточки с метриками",
  description: "Три карточки кейсов: изображение сверху, название проекта, описание и ключевая метрика результата. Hover-эффект подъёма",
  category: "case-studies",
  subcategory: "cards",
  icon: "📈",
  tags: ["case-studies", "cards", "metrics", "grid", "results"],
  motionLevel: "css",
  fields: [
    { name: "cs01-title", type: "heading", hint: "заголовок секции 3-6 слов", required: true },
    { name: "cs01-subtitle", type: "text", hint: "подзаголовок секции 1-2 предложения", required: false },
    { name: "cs01-img", type: "image", hint: "изображение кейса", required: true },
    { name: "cs01-case-title", type: "heading", hint: "название кейса 3-5 слов", required: true },
    { name: "cs01-case-desc", type: "text", hint: "описание кейса 1-2 предложения", required: true },
    { name: "cs01-stat-value", type: "stat", hint: "числовой результат, например +120%", required: true },
    { name: "cs01-stat-label", type: "text", hint: "подпись к метрике 2-4 слова", required: true },
  ],
  html: `<section class="b-cs01" data-block="case-studies">
  <div class="b-cs01__inner">
    <div class="b-cs01__header" data-reveal="up">
      <h2 data-field="cs01-title">Результаты наших клиентов</h2>
      <p data-field="cs01-subtitle">Реальные кейсы с измеримыми бизнес-результатами и конкретными цифрами роста.</p>
    </div>
    <div class="b-cs01__grid" data-collection="cases" data-collection-grid>
      <div class="b-cs01__card" data-collection-item data-reveal="up" style="--stagger:0">
        <div class="b-cs01__img-wrap">
          <img data-field="cs01-img" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80" alt="Кейс" />
        </div>
        <div class="b-cs01__body">
          <h3 data-field="cs01-case-title">Интернет-магазин электроники</h3>
          <p data-field="cs01-case-desc">Редизайн воронки продаж и оптимизация карточек товаров для увеличения среднего чека.</p>
          <div class="b-cs01__metric">
            <span class="b-cs01__metric-value" data-field="cs01-stat-value">+147%</span>
            <span class="b-cs01__metric-label" data-field="cs01-stat-label">рост конверсии</span>
          </div>
        </div>
      </div>
      <div class="b-cs01__card" data-collection-item data-reveal="up" style="--stagger:1">
        <div class="b-cs01__img-wrap">
          <img data-field="cs01-img" src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80" alt="Кейс" />
        </div>
        <div class="b-cs01__body">
          <h3 data-field="cs01-case-title">SaaS-платформа аналитики</h3>
          <p data-field="cs01-case-desc">Полный ребрендинг и запуск новой посадочной страницы с A/B-тестированием.</p>
          <div class="b-cs01__metric">
            <span class="b-cs01__metric-value" data-field="cs01-stat-value">×3.2</span>
            <span class="b-cs01__metric-label" data-field="cs01-stat-label">увеличение лидов</span>
          </div>
        </div>
      </div>
      <div class="b-cs01__card" data-collection-item data-reveal="up" style="--stagger:2">
        <div class="b-cs01__img-wrap">
          <img data-field="cs01-img" src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=600&q=80" alt="Кейс" />
        </div>
        <div class="b-cs01__body">
          <h3 data-field="cs01-case-title">Мобильное приложение банка</h3>
          <p data-field="cs01-case-desc">UX-аудит и редизайн мобильного приложения, сокративший отток пользователей.</p>
          <div class="b-cs01__metric">
            <span class="b-cs01__metric-value" data-field="cs01-stat-value">−38%</span>
            <span class="b-cs01__metric-label" data-field="cs01-stat-label">снижение оттока</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-cs01{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-cs01__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-cs01__header{text-align:center;margin-bottom:3.5rem}
.b-cs01__header h2{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem;letter-spacing:-0.02em}
.b-cs01__header p{font-family:var(--font-body);font-size:1.0625rem;color:var(--color-text-muted);max-width:560px;margin:0 auto;line-height:1.6}
.b-cs01__grid{display:grid;grid-template-columns:1fr;gap:1.75rem}
.b-cs01__card{background:var(--color-surface);border-radius:var(--radius-lg);overflow:hidden;border:1px solid var(--color-border);transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s ease}
.b-cs01__card:hover{transform:translateY(-6px);box-shadow:0 12px 32px color-mix(in srgb,var(--color-text) 8%,transparent)}
.b-cs01__img-wrap{overflow:hidden;aspect-ratio:16/10}
.b-cs01__img-wrap img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s cubic-bezier(.16,1,.3,1)}
.b-cs01__card:hover .b-cs01__img-wrap img{transform:scale(1.04)}
.b-cs01__body{padding:1.75rem 1.5rem 2rem}
.b-cs01__body h3{font-family:var(--font-heading);font-size:1.25rem;color:var(--color-text);margin:0 0 .5rem;letter-spacing:-0.01em}
.b-cs01__body p{font-family:var(--font-body);font-size:.9375rem;color:var(--color-text-muted);margin:0 0 1.25rem;line-height:1.6}
.b-cs01__metric{display:flex;align-items:baseline;gap:.5rem;padding-top:1rem;border-top:1px solid var(--color-border)}
.b-cs01__metric-value{font-family:var(--font-heading);font-size:1.75rem;font-weight:700;color:var(--color-primary);letter-spacing:-0.02em}
.b-cs01__metric-label{font-family:var(--font-body);font-size:.875rem;color:var(--color-text-muted)}
@media(min-width:768px){.b-cs01__grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1024px){.b-cs01__grid{grid-template-columns:repeat(3,1fr);gap:2rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-cs01{background:var(--color-primary)}.b-cs01__header h2{color:var(--color-text-on-primary)}.b-cs01__header p{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-cs01__card{background:color-mix(in srgb,var(--color-text-on-primary) 6%,transparent);border-color:color-mix(in srgb,var(--color-text-on-primary) 10%,transparent)}.b-cs01__body h3{color:var(--color-text-on-primary)}.b-cs01__body p{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}.b-cs01__metric{border-color:color-mix(in srgb,var(--color-text-on-primary) 12%,transparent)}.b-cs01__metric-value{color:var(--color-accent)}.b-cs01__metric-label{color:color-mix(in srgb,var(--color-text-on-primary) 60%,transparent)}` },
    { id: "accent-border", label: "Акцентная рамка", css: `.b-cs01__card{border-color:var(--color-accent)}.b-cs01__metric-value{color:var(--color-accent)}` },
  ],
};
