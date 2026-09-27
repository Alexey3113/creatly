import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "product-showcase-bento-01",
  name: "Продукт — Bento-сетка",
  description: "Bento-grid: крупный скриншот продукта (2 колонки) и 3 фичи-карточки с иконками",
  category: "product-showcase",
  subcategory: "bento",
  icon: "▦",
  tags: ["product", "bento", "grid", "features", "cards", "screenshot"],
  motionLevel: "css",
  fields: [
    { name: "ps06-title", type: "heading", hint: "заголовок секции 3-6 слов", required: true },
    { name: "ps06-image", type: "image", hint: "главный скриншот продукта 1000×600+", required: true },
    { name: "ps06-image-caption", type: "text", hint: "подпись к скриншоту 3-8 слов", required: false },
    { name: "ps06-card-icon", type: "icon", hint: "иконка фичи", required: true },
    { name: "ps06-card-title", type: "heading", hint: "заголовок карточки 2-4 слова", required: true },
    { name: "ps06-card-desc", type: "text", hint: "описание карточки 1-2 предложения", required: true },
  ],
  html: `<section class="b-ps06" data-block="product-showcase">
  <div class="b-ps06__inner">
    <h2 class="b-ps06__title" data-field="ps06-title" data-reveal="up">Всё, что нужно в одном месте</h2>
    <div class="b-ps06__grid">
      <div class="b-ps06__hero" data-reveal="up">
        <img class="b-ps06__hero-img" data-field="ps06-image" src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&amp;q=80" alt="Скриншот продукта">
        <p class="b-ps06__hero-caption" data-field="ps06-image-caption">Главная панель управления</p>
      </div>
      <div class="b-ps06__cards" data-collection="ps06-card-icon">
        <div class="b-ps06__card" data-reveal="up" style="--stagger:1" data-collection-item>
          <span class="b-ps06__card-icon" data-field="ps06-card-icon">⚡</span>
          <h3 class="b-ps06__card-title" data-field="ps06-card-title">Мгновенный поиск</h3>
          <p class="b-ps06__card-desc" data-field="ps06-card-desc">Находите любой документ, задачу или сообщение за доли секунды с помощью умного полнотекстового поиска.</p>
        </div>
        <div class="b-ps06__card" data-reveal="up" style="--stagger:2" data-collection-item>
          <span class="b-ps06__card-icon" data-field="ps06-card-icon">🔗</span>
          <h3 class="b-ps06__card-title" data-field="ps06-card-title">API-интеграции</h3>
          <p class="b-ps06__card-desc" data-field="ps06-card-desc">Подключайте Slack, Jira, Figma и ещё 40+ сервисов. Данные синхронизируются автоматически.</p>
        </div>
        <div class="b-ps06__card" data-reveal="up" style="--stagger:3" data-collection-item>
          <span class="b-ps06__card-icon" data-field="ps06-card-icon">🛡</span>
          <h3 class="b-ps06__card-title" data-field="ps06-card-title">Безопасность</h3>
          <p class="b-ps06__card-desc" data-field="ps06-card-desc">Шифрование AES-256, двухфакторная аутентификация и гибкие роли доступа для каждого участника.</p>
        </div>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-ps06{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-ps06__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-ps06__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 3rem;text-align:center;letter-spacing:-0.02em}
.b-ps06__grid{display:grid;grid-template-columns:1fr;gap:1.5rem}
.b-ps06__hero{border-radius:var(--radius-lg);overflow:hidden;background:var(--color-surface);position:relative}
.b-ps06__hero-img{width:100%;aspect-ratio:16/10;object-fit:cover;display:block;transition:transform .6s cubic-bezier(.22,1,.36,1)}
.b-ps06__hero:hover .b-ps06__hero-img{transform:scale(1.03)}
.b-ps06__hero-caption{font-family:var(--font-body);font-size:.8rem;color:var(--color-text-muted);margin:0;padding:.75rem 1.25rem;background:var(--color-surface);text-align:center}
.b-ps06__cards{display:grid;grid-template-columns:1fr;gap:1.25rem}
.b-ps06__card{background:var(--color-surface);border-radius:var(--radius-md);padding:1.75rem 1.5rem;transition:transform .3s ease,box-shadow .3s ease}
.b-ps06__card:hover{transform:translateY(-3px);box-shadow:0 12px 32px color-mix(in srgb,var(--color-text) 8%,transparent)}
.b-ps06__card-icon{font-size:1.5rem;display:block;margin-bottom:.75rem;width:2.75rem;height:2.75rem;display:flex;align-items:center;justify-content:center;background:color-mix(in srgb,var(--color-accent) 12%,transparent);border-radius:var(--radius-md)}
.b-ps06__card-title{font-family:var(--font-heading);font-size:1.1rem;color:var(--color-text);margin:0 0 .5rem}
.b-ps06__card-desc{font-family:var(--font-body);font-size:.875rem;color:var(--color-text-muted);margin:0;line-height:1.6}
@media(min-width:768px){.b-ps06__grid{grid-template-columns:2fr 1fr}.b-ps06__hero{grid-row:1/1;grid-column:1/2}.b-ps06__cards{grid-column:2/3;grid-row:1/1}}
@media(min-width:1024px){.b-ps06__grid{gap:2rem}.b-ps06__card{padding:2rem 1.75rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-ps06{background:var(--color-primary)}.b-ps06__title{color:var(--color-text-on-primary)}.b-ps06__card{background:color-mix(in srgb,var(--color-text-on-primary) 6%,transparent)}.b-ps06__card-title{color:var(--color-text-on-primary)}.b-ps06__card-desc{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}.b-ps06__hero-caption{background:color-mix(in srgb,var(--color-text-on-primary) 6%,transparent);color:color-mix(in srgb,var(--color-text-on-primary) 60%,transparent)}.b-ps06__card-icon{background:color-mix(in srgb,var(--color-accent) 15%,transparent)}` },
    { id: "bordered", label: "С рамкой", css: `.b-ps06__card{border:1px solid var(--color-border);background:transparent}.b-ps06__hero{border:1px solid var(--color-border)}` },
  ],
};
