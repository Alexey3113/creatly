import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "features-bento-02",
  name: "Фичи — Bento 2x3 с изображениями",
  description: "Bento-сетка 2x3: чередование карточек с текстом и изображениями",
  category: "features",
  subcategory: "bento",
  icon: "◆",
  tags: ["bento", "grid", "images", "asymmetric", "modern"],
  motionLevel: "css",
  fields: [
    { name: "features-title", type: "heading", hint: "заголовок секции 3-6 слов", required: true },
    { name: "feature-img", type: "image", hint: "изображение карточки 800x600", required: true },
    { name: "feature-title", type: "heading", hint: "заголовок карточки 2-4 слова", required: true },
    { name: "feature-desc", type: "text", hint: "описание карточки 1-2 предложения", required: true },
    { name: "feature-stat", type: "stat", hint: "ключевая метрика, напр. 99.9%", required: false },
  ],
  html: `<section class="b-ft04" data-block="features">
  <div class="b-ft04__inner">
    <h2 class="b-ft04__title" data-field="features-title" data-reveal="word">Всё для масштабирования</h2>
    <div class="b-ft04__grid" data-collection="feature-title">
      <div class="b-ft04__cell b-ft04__cell--wide" data-reveal="up" data-collection-item>
        <h3 data-field="feature-title">Облачная инфраструктура</h3>
        <p data-field="feature-desc">Автоматическое масштабирование до 10 000 запросов в секунду без простоев.</p>
        <span class="b-ft04__stat" data-field="feature-stat">99.9%</span>
      </div>
      <div class="b-ft04__cell b-ft04__cell--img" data-reveal="scale" style="--stagger:1" data-collection-item>
        <img data-field="feature-img" src="/placeholder-feature-1.jpg" alt="" loading="lazy">
      </div>
      <div class="b-ft04__cell b-ft04__cell--img" data-reveal="scale" style="--stagger:2" data-collection-item>
        <img data-field="feature-img" src="/placeholder-feature-2.jpg" alt="" loading="lazy">
      </div>
      <div class="b-ft04__cell" data-reveal="up" style="--stagger:2" data-collection-item>
        <h3 data-field="feature-title">API-first подход</h3>
        <p data-field="feature-desc">REST и GraphQL эндпоинты с документацией и песочницей для тестирования.</p>
      </div>
      <div class="b-ft04__cell" data-reveal="up" style="--stagger:3" data-collection-item>
        <h3 data-field="feature-title">Мониторинг 24/7</h3>
        <p data-field="feature-desc">Мгновенные алерты в Telegram и Slack при отклонении метрик.</p>
      </div>
      <div class="b-ft04__cell b-ft04__cell--accent" data-reveal="up" style="--stagger:3" data-collection-item>
        <h3 data-field="feature-title">Поддержка команды</h3>
        <p data-field="feature-desc">Выделенный менеджер и среднее время ответа — 12 минут.</p>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-ft04{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-ft04__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-ft04__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 3rem;text-align:center;letter-spacing:-0.02em}
.b-ft04__grid{display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:auto auto;gap:1.5rem}
.b-ft04__cell{background:var(--color-surface);border-radius:var(--radius-lg);padding:2.25rem 2rem;display:flex;flex-direction:column;justify-content:flex-end;box-shadow:0 20px 50px -30px color-mix(in srgb,var(--color-text) 26%,transparent);transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s}
.b-ft04__cell:hover{transform:translateY(-5px);box-shadow:0 30px 65px -30px color-mix(in srgb,var(--color-text) 36%,transparent)}
.b-ft04__cell--wide{grid-column:span 2}
.b-ft04__cell--img{padding:0;overflow:hidden}
.b-ft04__cell--img img{width:100%;height:100%;object-fit:cover;display:block}
.b-ft04__cell--accent{background:var(--color-accent)}
.b-ft04__cell--accent h3{color:var(--color-text-on-accent)}
.b-ft04__cell--accent p{color:color-mix(in srgb,var(--color-text-on-accent) 80%,transparent)}
.b-ft04__cell h3{font-family:var(--font-heading);font-size:1.2rem;color:var(--color-text);margin:0 0 .4rem}
.b-ft04__cell p{font-family:var(--font-body);font-size:.9rem;color:var(--color-text-muted);margin:0;line-height:1.55}
.b-ft04__stat{font-family:var(--font-heading);font-size:clamp(2.5rem,4vw,3.5rem);letter-spacing:-.03em;color:var(--color-accent);font-weight:800;margin-top:1rem;line-height:1}
@media(max-width:768px){.b-ft04__grid{grid-template-columns:1fr}.b-ft04__cell--wide{grid-column:auto}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-ft04{background:var(--color-primary)}.b-ft04__title{color:var(--color-text-on-primary)}.b-ft04__cell{background:color-mix(in srgb,var(--color-text-on-primary) 8%,transparent)}.b-ft04__cell h3{color:var(--color-text-on-primary)}.b-ft04__cell p{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}` },
    { id: "accent", label: "Акцентный", css: `.b-ft04__cell--accent{background:var(--color-primary)}.b-ft04__cell--accent h3{color:var(--color-text-on-primary)}` },
  ],
};
