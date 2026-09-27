import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "case-studies-cards-02",
  name: "Кейсы — 2 карточки с крупными цифрами",
  description: "Две большие карточки кейсов с акцентом на крупных числовых результатах. Изображение сверху, большая метрика, описание",
  category: "case-studies",
  subcategory: "cards",
  icon: "🔢",
  tags: ["case-studies", "cards", "big-numbers", "stats", "impact"],
  motionLevel: "css",
  fields: [
    { name: "cs02-title", type: "heading", hint: "заголовок секции 3-6 слов", required: true },
    { name: "cs02-subtitle", type: "text", hint: "подзаголовок секции 1-2 предложения", required: false },
    { name: "cs02-img", type: "image", hint: "изображение кейса", required: true },
    { name: "cs02-stat-value", type: "stat", hint: "крупная цифра результата, например +150%", required: true },
    { name: "cs02-stat-label", type: "text", hint: "подпись к метрике 2-4 слова", required: true },
    { name: "cs02-case-title", type: "heading", hint: "название клиента/проекта 2-5 слов", required: true },
    { name: "cs02-case-desc", type: "text", hint: "описание кейса 1-2 предложения", required: true },
  ],
  html: `<section class="b-cs02" data-block="case-studies">
  <div class="b-cs02__inner">
    <div class="b-cs02__header" data-reveal="up">
      <h2 data-field="cs02-title">Цифры говорят сами за себя</h2>
      <p data-field="cs02-subtitle">Ключевые результаты проектов, которыми мы гордимся.</p>
    </div>
    <div class="b-cs02__grid" data-collection="cs02-img">
      <div class="b-cs02__card" data-reveal="up" style="--stagger:0" data-collection-item>
        <div class="b-cs02__img-wrap">
          <img data-field="cs02-img" src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&amp;fit=crop&amp;w=800&amp;q=80" alt="Кейс">
        </div>
        <div class="b-cs02__body">
          <div class="b-cs02__stat">
            <span class="b-cs02__stat-value" data-field="cs02-stat-value">+150%</span>
            <span class="b-cs02__stat-label" data-field="cs02-stat-label">конверсия продаж</span>
          </div>
          <h3 data-field="cs02-case-title">FinTech-стартап «Монета»</h3>
          <p data-field="cs02-case-desc">Переработали пользовательский путь от регистрации до первого депозита. Упростили верификацию и добавили геймификацию.</p>
        </div>
      </div>
      <div class="b-cs02__card" data-reveal="up" style="--stagger:1" data-collection-item>
        <div class="b-cs02__img-wrap">
          <img data-field="cs02-img" src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&amp;fit=crop&amp;w=800&amp;q=80" alt="Кейс">
        </div>
        <div class="b-cs02__body">
          <div class="b-cs02__stat">
            <span class="b-cs02__stat-value" data-field="cs02-stat-value">×3</span>
            <span class="b-cs02__stat-label" data-field="cs02-stat-label">объём продаж</span>
          </div>
          <h3 data-field="cs02-case-title">Маркетплейс «ТоргСити»</h3>
          <p data-field="cs02-case-desc">Запустили новую систему рекомендаций и персонализированные email-кампании, утроившие среднемесячный GMV.</p>
        </div>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-cs02{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-cs02__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-cs02__header{text-align:center;margin-bottom:3.5rem}
.b-cs02__header h2{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem;letter-spacing:-0.02em}
.b-cs02__header p{font-family:var(--font-body);font-size:1.0625rem;color:var(--color-text-muted);max-width:520px;margin:0 auto;line-height:1.6}
.b-cs02__grid{display:grid;grid-template-columns:1fr;gap:2rem}
.b-cs02__card{background:var(--color-surface);border-radius:var(--radius-lg);overflow:hidden;border:1px solid var(--color-border);transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s ease}
.b-cs02__card:hover{transform:translateY(-5px);box-shadow:0 16px 40px color-mix(in srgb,var(--color-text) 10%,transparent)}
.b-cs02__img-wrap{overflow:hidden;aspect-ratio:16/9}
.b-cs02__img-wrap img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s cubic-bezier(.16,1,.3,1)}
.b-cs02__card:hover .b-cs02__img-wrap img{transform:scale(1.03)}
.b-cs02__body{padding:2rem 2rem 2.25rem}
.b-cs02__stat{margin-bottom:1.25rem}
.b-cs02__stat-value{font-family:var(--font-heading);font-size:clamp(2.5rem,5vw,3.75rem);font-weight:800;color:var(--color-primary);display:block;line-height:1.1;letter-spacing:-0.03em}
.b-cs02__stat-label{font-family:var(--font-body);font-size:.9375rem;color:var(--color-text-muted);display:block;margin-top:.25rem}
.b-cs02__body h3{font-family:var(--font-heading);font-size:1.25rem;color:var(--color-text);margin:0 0 .5rem;letter-spacing:-0.01em}
.b-cs02__body p{font-family:var(--font-body);font-size:.9375rem;color:var(--color-text-muted);margin:0;line-height:1.6}
@media(min-width:768px){.b-cs02__grid{grid-template-columns:repeat(2,1fr);gap:2.5rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-cs02{background:var(--color-primary)}.b-cs02__header h2{color:var(--color-text-on-primary)}.b-cs02__header p{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-cs02__card{background:color-mix(in srgb,var(--color-text-on-primary) 6%,transparent);border-color:color-mix(in srgb,var(--color-text-on-primary) 10%,transparent)}.b-cs02__stat-value{color:var(--color-accent)}.b-cs02__stat-label{color:color-mix(in srgb,var(--color-text-on-primary) 60%,transparent)}.b-cs02__body h3{color:var(--color-text-on-primary)}.b-cs02__body p{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}` },
    { id: "gradient-stat", label: "Градиент цифр", css: `.b-cs02__stat-value{background:linear-gradient(135deg,var(--color-primary),var(--color-accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}` },
  ],
};
