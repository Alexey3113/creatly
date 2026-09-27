import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "product-showcase-split-01",
  name: "Продукт — Сплит изображение + описание",
  description: "Большое изображение продукта слева (50%), описание и список фич справа",
  category: "product-showcase",
  subcategory: "split",
  icon: "🖼",
  tags: ["product", "split", "features", "image", "showcase"],
  motionLevel: "css",
  fields: [
    { name: "ps01-image", type: "image", hint: "изображение продукта 800×600+", required: true },
    { name: "ps01-title", type: "heading", hint: "название продукта 2-5 слов", required: true },
    { name: "ps01-desc", type: "text", hint: "описание продукта 2-3 предложения", required: true },
    { name: "ps01-feature-icon", type: "icon", hint: "иконка фичи", required: true },
    { name: "ps01-feature-text", type: "text", hint: "краткое описание фичи 5-10 слов", required: true },
  ],
  html: `<section class="b-ps01" data-block="product-showcase">
  <div class="b-ps01__inner">
    <div class="b-ps01__media" data-reveal="clip">
      <img class="b-ps01__img" data-field="ps01-image" src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&amp;q=80" alt="Продукт">
    </div>
    <div class="b-ps01__content" data-reveal="up">
      <h2 class="b-ps01__title" data-field="ps01-title">Умные часы NovaPulse</h2>
      <p class="b-ps01__desc" data-field="ps01-desc">Стильный аксессуар нового поколения с расширенным мониторингом здоровья. Элегантный дизайн сочетается с передовыми технологиями для вашего комфорта.</p>
      <ul class="b-ps01__features" data-collection="ps01-icon">
        <li class="b-ps01__feat" data-reveal="up" style="--stagger:1" data-collection-item>
          <span class="b-ps01__feat-icon" data-field="ps01-feature-icon">💓</span>
          <span class="b-ps01__feat-text" data-field="ps01-feature-text">Непрерывный мониторинг пульса и уровня кислорода</span>
        </li>
        <li class="b-ps01__feat" data-reveal="up" style="--stagger:2" data-collection-item>
          <span class="b-ps01__feat-icon" data-field="ps01-feature-icon">🔋</span>
          <span class="b-ps01__feat-text" data-field="ps01-feature-text">До 14 дней автономной работы без подзарядки</span>
        </li>
        <li class="b-ps01__feat" data-reveal="up" style="--stagger:3" data-collection-item>
          <span class="b-ps01__feat-icon" data-field="ps01-feature-icon">💧</span>
          <span class="b-ps01__feat-text" data-field="ps01-feature-text">Водозащита IP68 — плавание и дайвинг</span>
        </li>
        <li class="b-ps01__feat" data-reveal="up" style="--stagger:4" data-collection-item>
          <span class="b-ps01__feat-icon" data-field="ps01-feature-icon">📱</span>
          <span class="b-ps01__feat-text" data-field="ps01-feature-text">Мгновенная синхронизация с iOS и Android</span>
        </li>
      </ul>
    </div>
  </div>
</section>`,
  css: `.b-ps01{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-ps01__inner{max-width:var(--container-width,1400px);margin:0 auto;display:flex;flex-direction:column;gap:2.5rem}
.b-ps01__media{flex:1;border-radius:var(--radius-lg);overflow:hidden}
.b-ps01__img{width:100%;height:100%;min-height:320px;object-fit:cover;display:block;transition:transform .6s cubic-bezier(.22,1,.36,1)}
.b-ps01__media:hover .b-ps01__img{transform:scale(1.04)}
.b-ps01__content{flex:1;display:flex;flex-direction:column;justify-content:center}
.b-ps01__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 1.25rem;letter-spacing:-0.02em;line-height:1.15}
.b-ps01__desc{font-family:var(--font-body);font-size:1.05rem;color:var(--color-text-muted);margin:0 0 2rem;line-height:1.7;max-width:540px}
.b-ps01__features{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:1rem}
.b-ps01__feat{display:flex;align-items:flex-start;gap:.875rem;padding:1rem 1.25rem;background:var(--color-surface);border-radius:var(--radius-md);transition:box-shadow .3s ease,transform .3s ease}
.b-ps01__feat:hover{transform:translateY(-2px);box-shadow:0 8px 24px color-mix(in srgb,var(--color-text) 8%,transparent)}
.b-ps01__feat-icon{font-size:1.25rem;flex-shrink:0;margin-top:.1rem}
.b-ps01__feat-text{font-family:var(--font-body);font-size:.925rem;color:var(--color-text);line-height:1.5}
@media(min-width:768px){.b-ps01__inner{flex-direction:row;gap:3.5rem;align-items:stretch}.b-ps01__media,.b-ps01__content{flex:1 1 50%}.b-ps01__img{min-height:480px}}
@media(min-width:1024px){.b-ps01__inner{gap:4.5rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-ps01{background:var(--color-primary)}.b-ps01__title{color:var(--color-text-on-primary)}.b-ps01__desc{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-ps01__feat{background:color-mix(in srgb,var(--color-text-on-primary) 8%,transparent)}.b-ps01__feat-text{color:var(--color-text-on-primary)}` },
    { id: "accent-border", label: "Рамка акцент", css: `.b-ps01__media{border:3px solid var(--color-accent);padding:.5rem}.b-ps01__feat{border:1px solid var(--color-border)}` },
  ],
};
