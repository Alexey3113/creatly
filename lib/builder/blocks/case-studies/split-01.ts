import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "case-studies-split-01",
  name: "Кейс — сплит изображение + метрики",
  description: "Один крупный кейс: изображение занимает левую половину, справа — название клиента, описание проекта и 2-3 ключевые метрики",
  category: "case-studies",
  subcategory: "split",
  icon: "◧",
  tags: ["case-studies", "split", "detailed", "metrics", "single-case"],
  motionLevel: "css",
  fields: [
    { name: "cs03-img", type: "image", hint: "изображение кейса крупное", required: true },
    { name: "cs03-label", type: "text", hint: "метка над заголовком 1-2 слова", required: false },
    { name: "cs03-title", type: "heading", hint: "название клиента/проекта 3-6 слов", required: true },
    { name: "cs03-desc", type: "text", hint: "описание кейса 2-4 предложения", required: true },
    { name: "cs03-stat-value", type: "stat", hint: "числовой результат, например +85%", required: true },
    { name: "cs03-stat-label", type: "text", hint: "подпись к метрике 2-4 слова", required: true },
    { name: "cs03-link", type: "link", hint: "ссылка на полный кейс", required: false },
  ],
  html: `<section class="b-cs03" data-block="case-studies">
  <div class="b-cs03__inner">
    <div class="b-cs03__media" data-reveal="clip">
      <img data-field="cs03-img" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&amp;fit=crop&amp;w=900&amp;q=80" alt="Кейс">
    </div>
    <div class="b-cs03__content" data-reveal="up">
      <span class="b-cs03__label" data-field="cs03-label">Кейс-стади</span>
      <h2 data-field="cs03-title">Цифровая трансформация «АльфаТех»</h2>
      <p data-field="cs03-desc">Провели полный аудит цифровых каналов и перестроили воронку продаж. Внедрили CRM-систему, автоматизировали email-маркетинг и запустили персонализированные рекомендации на сайте. Результат превзошёл ожидания клиента.</p>
      <div class="b-cs03__stats" data-collection="cs03-stat-value">
        <div class="b-cs03__stat" data-reveal="up" style="--stagger:0" data-collection-item>
          <span class="b-cs03__stat-value" data-field="cs03-stat-value">+210%</span>
          <span class="b-cs03__stat-label" data-field="cs03-stat-label">рост выручки</span>
        </div>
        <div class="b-cs03__stat" data-reveal="up" style="--stagger:1" data-collection-item>
          <span class="b-cs03__stat-value" data-field="cs03-stat-value">−45%</span>
          <span class="b-cs03__stat-label" data-field="cs03-stat-label">стоимость лида</span>
        </div>
        <div class="b-cs03__stat" data-reveal="up" style="--stagger:2" data-collection-item>
          <span class="b-cs03__stat-value" data-field="cs03-stat-value">4.9★</span>
          <span class="b-cs03__stat-label" data-field="cs03-stat-label">оценка NPS</span>
        </div>
      </div>
      <a class="b-cs03__link" data-field="cs03-link" href="#">Читать полный кейс →</a>
    </div>
  </div>
</section>`,
  css: `.b-cs03{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-cs03__inner{max-width:var(--container-width,1400px);margin:0 auto;display:grid;grid-template-columns:1fr;gap:2.5rem;align-items:center}
.b-cs03__media{border-radius:var(--radius-lg);overflow:hidden}
.b-cs03__media img{width:100%;height:100%;object-fit:cover;display:block;aspect-ratio:4/3}
.b-cs03__label{font-family:var(--font-body);font-size:.8125rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--color-primary);display:inline-block;margin-bottom:.75rem}
.b-cs03__content h2{font-family:var(--font-heading);font-size:clamp(1.5rem,3vw,2.25rem);color:var(--color-text);margin:0 0 1rem;letter-spacing:-0.02em;line-height:1.2}
.b-cs03__content p{font-family:var(--font-body);font-size:1rem;color:var(--color-text-muted);margin:0 0 2rem;line-height:1.7}
.b-cs03__stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-bottom:2rem;padding-top:1.5rem;border-top:1px solid var(--color-border)}
.b-cs03__stat-value{font-family:var(--font-heading);font-size:clamp(1.5rem,3vw,2rem);font-weight:700;color:var(--color-primary);display:block;line-height:1.2;letter-spacing:-0.02em}
.b-cs03__stat-label{font-family:var(--font-body);font-size:.8125rem;color:var(--color-text-muted);display:block;margin-top:.25rem}
.b-cs03__link{font-family:var(--font-body);font-size:.9375rem;font-weight:600;color:var(--color-primary);text-decoration:none;display:inline-block;transition:color .2s}
.b-cs03__link:hover{color:var(--color-accent)}
@media(min-width:768px){.b-cs03__inner{grid-template-columns:1fr 1fr;gap:3.5rem}.b-cs03__media img{aspect-ratio:3/4;min-height:480px}}
@media(min-width:1024px){.b-cs03__inner{gap:5rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-cs03{background:var(--color-primary)}.b-cs03__label{color:var(--color-accent)}.b-cs03__content h2{color:var(--color-text-on-primary)}.b-cs03__content p{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-cs03__stats{border-color:color-mix(in srgb,var(--color-text-on-primary) 15%,transparent)}.b-cs03__stat-value{color:var(--color-accent)}.b-cs03__stat-label{color:color-mix(in srgb,var(--color-text-on-primary) 60%,transparent)}.b-cs03__link{color:var(--color-accent)}` },
    { id: "surface", label: "На подложке", css: `.b-cs03{background:var(--color-bg-alt)}.b-cs03__inner{background:var(--color-surface);border-radius:var(--radius-lg);padding:2.5rem;border:1px solid var(--color-border)}` },
  ],
};
