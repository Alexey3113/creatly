import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "product-showcase-features-01",
  name: "Продукт — Аннотированный скриншот",
  description: "Крупный скриншот продукта по центру с аннотациями-указателями к ключевым фичам",
  category: "product-showcase",
  subcategory: "features",
  icon: "📌",
  tags: ["product", "annotations", "features", "screenshot", "callout"],
  motionLevel: "css",
  fields: [
    { name: "ps04-title", type: "heading", hint: "заголовок секции 3-6 слов", required: true },
    { name: "ps04-image", type: "image", hint: "скриншот продукта 1000×600+", required: true },
    { name: "ps04-ann-num", type: "stat", hint: "номер аннотации (1-4)", required: true },
    { name: "ps04-ann-title", type: "heading", hint: "заголовок аннотации 2-4 слова", required: true },
    { name: "ps04-ann-desc", type: "text", hint: "описание аннотации 1 предложение", required: true },
  ],
  html: `<section class="b-ps04" data-block="product-showcase">
  <div class="b-ps04__inner">
    <h2 class="b-ps04__title" data-field="ps04-title" data-reveal="up">Анатомия продукта</h2>
    <div class="b-ps04__stage">
      <div class="b-ps04__screenshot" data-reveal="scale">
        <img class="b-ps04__img" data-field="ps04-image" src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&amp;q=80" alt="Скриншот продукта">
      </div>
      <div class="b-ps04__annotations" data-collection="ps04-ann-num">
        <div class="b-ps04__ann b-ps04__ann--tl" data-reveal="up" style="--stagger:1" data-collection-item>
          <span class="b-ps04__ann-num" data-field="ps04-ann-num">1</span>
          <div class="b-ps04__ann-body">
            <h3 data-field="ps04-ann-title">Живой дашборд</h3>
            <p data-field="ps04-ann-desc">Все ключевые метрики обновляются в реальном времени без перезагрузки</p>
          </div>
        </div>
        <div class="b-ps04__ann b-ps04__ann--tr" data-reveal="up" style="--stagger:2" data-collection-item>
          <span class="b-ps04__ann-num" data-field="ps04-ann-num">2</span>
          <div class="b-ps04__ann-body">
            <h3 data-field="ps04-ann-title">Умные фильтры</h3>
            <p data-field="ps04-ann-desc">Мгновенная фильтрация данных по десяткам параметров одновременно</p>
          </div>
        </div>
        <div class="b-ps04__ann b-ps04__ann--bl" data-reveal="up" style="--stagger:3" data-collection-item>
          <span class="b-ps04__ann-num" data-field="ps04-ann-num">3</span>
          <div class="b-ps04__ann-body">
            <h3 data-field="ps04-ann-title">Командный чат</h3>
            <p data-field="ps04-ann-desc">Встроенный мессенджер привязан к задачам и проектам</p>
          </div>
        </div>
        <div class="b-ps04__ann b-ps04__ann--br" data-reveal="up" style="--stagger:4" data-collection-item>
          <span class="b-ps04__ann-num" data-field="ps04-ann-num">4</span>
          <div class="b-ps04__ann-body">
            <h3 data-field="ps04-ann-title">Экспорт отчётов</h3>
            <p data-field="ps04-ann-desc">Выгрузка данных в PDF, Excel и Google Sheets за один клик</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-ps04{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-ps04__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-ps04__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 3rem;text-align:center;letter-spacing:-0.02em}
.b-ps04__stage{position:relative}
.b-ps04__screenshot{border-radius:var(--radius-lg);overflow:hidden;box-shadow:0 20px 60px color-mix(in srgb,var(--color-text) 10%,transparent)}
.b-ps04__img{width:100%;display:block;aspect-ratio:5/3;object-fit:cover}
.b-ps04__annotations{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;margin-top:2rem}
.b-ps04__ann{display:flex;align-items:flex-start;gap:.75rem;padding:1.25rem;background:var(--color-surface);border-radius:var(--radius-md);border-left:3px solid var(--color-accent);transition:transform .3s ease,box-shadow .3s ease}
.b-ps04__ann:hover{transform:translateY(-2px);box-shadow:0 8px 24px color-mix(in srgb,var(--color-text) 8%,transparent)}
.b-ps04__ann-num{font-family:var(--font-heading);font-size:.8rem;font-weight:700;width:1.75rem;height:1.75rem;display:flex;align-items:center;justify-content:center;border-radius:var(--radius-full);background:var(--color-accent);color:var(--color-text-on-accent);flex-shrink:0}
.b-ps04__ann-body h3{font-family:var(--font-heading);font-size:.95rem;color:var(--color-text);margin:0 0 .25rem}
.b-ps04__ann-body p{font-family:var(--font-body);font-size:.8rem;color:var(--color-text-muted);margin:0;line-height:1.5}
@media(min-width:768px){.b-ps04__annotations{grid-template-columns:1fr 1fr}}
@media(min-width:1024px){.b-ps04__annotations{position:absolute;inset:0;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:0;margin-top:0;pointer-events:none}.b-ps04__ann{pointer-events:auto;position:relative;background:var(--color-surface);backdrop-filter:blur(12px);max-width:260px;box-shadow:0 4px 16px color-mix(in srgb,var(--color-text) 8%,transparent)}.b-ps04__ann--tl{align-self:start;justify-self:start;margin:1.5rem 0 0 -2rem}.b-ps04__ann--tr{align-self:start;justify-self:end;margin:1.5rem -2rem 0 0}.b-ps04__ann--bl{align-self:end;justify-self:start;margin:0 0 1.5rem -2rem}.b-ps04__ann--br{align-self:end;justify-self:end;margin:0 -2rem 1.5rem 0}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-ps04{background:var(--color-primary)}.b-ps04__title{color:var(--color-text-on-primary)}.b-ps04__ann{background:color-mix(in srgb,var(--color-text-on-primary) 10%,transparent);border-left-color:var(--color-accent)}.b-ps04__ann-body h3{color:var(--color-text-on-primary)}.b-ps04__ann-body p{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}` },
    { id: "primary-badges", label: "Основные бейджи", css: `.b-ps04__ann-num{background:var(--color-primary);color:var(--color-text-on-primary)}.b-ps04__ann{border-left-color:var(--color-primary)}` },
  ],
};
