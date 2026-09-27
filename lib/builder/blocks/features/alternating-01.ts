import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "features-alternating-01",
  name: "Фичи — чередующиеся секции",
  description: "Два ряда: текст слева/картинка справа, затем наоборот",
  category: "features",
  subcategory: "alternating",
  icon: "◆",
  tags: ["alternating", "zigzag", "image", "two-row"],
  motionLevel: "css",
  fields: [
    { name: "features-title", type: "heading", hint: "заголовок секции", required: true },
    { name: "feature-title", type: "heading", hint: "заголовок фичи 3-6 слов", required: true },
    { name: "feature-desc", type: "text", hint: "описание фичи 2-3 предложения", required: true },
    { name: "feature-image", type: "image", hint: "изображение или скриншот", required: true },
  ],
  html: `<section class="b-ft09" data-block="features">
  <div class="b-ft09__inner" data-collection="feature-title">
    <h2 class="b-ft09__title" data-field="features-title" data-reveal="up">Как это работает</h2>
    <div class="b-ft09__row" data-reveal="up" style="--stagger:0" data-collection-item>
      <div class="b-ft09__text">
        <h3 data-field="feature-title">Настройте рабочее пространство</h3>
        <p data-field="feature-desc">Создайте проект за 2 минуты: выберите шаблон, пригласите команду, настройте роли и доступы. Никакой сложной конфигурации.</p>
      </div>
      <div class="b-ft09__media">
        <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80" alt="" data-field="feature-image">
      </div>
    </div>
    <div class="b-ft09__row b-ft09__row--reverse" data-reveal="up" style="--stagger:1" data-collection-item>
      <div class="b-ft09__text">
        <h3 data-field="feature-title">Отслеживайте прогресс</h3>
        <p data-field="feature-desc">Дашборд показывает статус всех задач, загрузку участников и дедлайны. Автоматические уведомления при отклонениях от плана.</p>
      </div>
      <div class="b-ft09__media">
        <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80" alt="" data-field="feature-image">
      </div>
    </div>
  </div>
</section>`,
  css: `.b-ft09{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-ft09__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-ft09__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 3.5rem;text-align:center;letter-spacing:-0.02em}
.b-ft09__row{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;margin-bottom:4rem}
.b-ft09__row:last-child{margin-bottom:0}
.b-ft09__row--reverse{direction:rtl}.b-ft09__row--reverse>*{direction:ltr}
.b-ft09__text h3{font-family:var(--font-heading);font-size:clamp(1.25rem,2.5vw,1.75rem);color:var(--color-text);margin:0 0 1rem}
.b-ft09__text p{font-family:var(--font-body);font-size:1.0625rem;color:var(--color-text-muted);margin:0;line-height:1.65}
.b-ft09__media img{width:100%;border-radius:var(--radius-lg);display:block}
@media(max-width:768px){.b-ft09__row,.b-ft09__row--reverse{grid-template-columns:1fr;gap:2rem;direction:ltr}.b-ft09__row{margin-bottom:3rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-ft09{background:var(--color-primary)}.b-ft09__title{color:var(--color-text-on-primary)}.b-ft09__text h3{color:var(--color-text-on-primary)}.b-ft09__text p{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}` },
    { id: "accent", label: "Акцентный", css: `.b-ft09__media img{border:2px solid var(--color-accent)}` },
  ],
};
