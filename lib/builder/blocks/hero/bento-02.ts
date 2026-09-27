import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-bento-02",
  name: "Hero — bento асимметричный 3 колонки",
  description: "Трёхколоночная bento-сетка: заголовок слева, изображение по центру, две карточки статистики справа",
  category: "hero",
  subcategory: "bento",
  icon: "⊟",
  tags: ["bento", "grid", "asymmetric", "stat", "image"],
  motionLevel: "css",
  fields: [
    { name: "hero-title", type: "heading", hint: "главный заголовок 5-8 слов", required: true },
    { name: "hero-subtitle", type: "text", hint: "подзаголовок 1-2 предложения", required: true },
    { name: "hero-cta", type: "link", hint: "текст CTA-кнопки 2-4 слова", required: true },
    { name: "hero-image", type: "image", hint: "вертикальное фото продукта или команды", required: true },
    { name: "hero-stat1-number", type: "stat", hint: "крупная цифра, напр. 98%", required: true },
    { name: "hero-stat1-label", type: "text", hint: "подпись к первой цифре", required: true },
    { name: "hero-stat2-number", type: "stat", hint: "крупная цифра, напр. 24/7", required: true },
    { name: "hero-stat2-label", type: "text", hint: "подпись ко второй цифре", required: true },
  ],
  html: `<section class="b-hbn02" data-block="hero">
  <div class="b-hbn02__grid">
    <div class="b-hbn02__text" data-reveal="up">
      <h1 data-field="hero-title">Решения, которые масштабируют ваш результат</h1>
      <p class="b-hbn02__desc" data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">Автоматизация процессов с гарантией результата. Внедрение от 2 недель, поддержка 24/7.</p>
      <a class="b-btn" href="#" data-field="hero-cta" data-reveal="fade" style="--stagger:2">Получить демо</a>
    </div>
    <div class="b-hbn02__img" data-reveal="fade" style="--stagger:1">
      <img data-field="hero-image" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Команда" />
    </div>
    <div class="b-hbn02__stats">
      <div class="b-hbn02__stat-card" data-reveal="fade" style="--stagger:2">
        <span class="b-hbn02__stat-num" data-field="hero-stat1-number">98%</span>
        <span class="b-hbn02__stat-lbl" data-field="hero-stat1-label">Клиентов продлевают подписку</span>
      </div>
      <div class="b-hbn02__stat-card" data-reveal="fade" style="--stagger:3">
        <span class="b-hbn02__stat-num" data-field="hero-stat2-number">24/7</span>
        <span class="b-hbn02__stat-lbl" data-field="hero-stat2-label">Поддержка без выходных</span>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-hbn02{padding:var(--space-section) var(--space-block);background:var(--color-bg);min-height:85vh;display:flex;align-items:center;justify-content:center}
.b-hbn02__grid{max-width:var(--container-width,1400px);width:100%;margin:0 auto;display:grid;grid-template-columns:1.2fr .9fr .9fr;grid-template-rows:1fr;gap:1.25rem;min-height:520px}
.b-hbn02__text{background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:3rem 2.5rem;display:flex;flex-direction:column;justify-content:center;gap:1.25rem}
.b-hbn02__text h1{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0;line-height:1.12;letter-spacing:-0.02em}
.b-hbn02__desc{font-family:var(--font-body);color:var(--color-text-muted);font-size:1.0625rem;line-height:1.6;margin:0;max-width:420px}
.b-hbn02__img{background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);overflow:hidden}
.b-hbn02__img img{width:100%;height:100%;object-fit:cover;display:block}
.b-hbn02__stats{display:grid;grid-template-rows:1fr 1fr;gap:1.25rem}
.b-hbn02__stat-card{background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:2rem 1.75rem;display:flex;flex-direction:column;justify-content:center;gap:.5rem}
.b-hbn02__stat-num{font-family:var(--font-heading);font-size:clamp(2rem,3.5vw,3rem);color:var(--color-primary);font-weight:800;line-height:1;letter-spacing:-0.03em}
.b-hbn02__stat-lbl{font-family:var(--font-body);color:var(--color-text-muted);font-size:.875rem;line-height:1.4;font-weight:500}
.b-btn{display:inline-flex;align-items:center;min-height:52px;padding:0 2rem;border-radius:var(--radius-md);background:var(--color-accent);color:var(--color-text-on-accent);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;transition:transform .3s cubic-bezier(.16,1,.3,1),opacity .3s;width:fit-content}
.b-btn:hover{transform:translateY(-2px);opacity:.9}
@media(max-width:1023px){.b-hbn02__grid{grid-template-columns:1fr 1fr;grid-template-rows:auto auto}.b-hbn02__text{grid-column:1 / -1}}
@media(max-width:767px){.b-hbn02{min-height:auto;padding:3rem 1.25rem}.b-hbn02__grid{grid-template-columns:1fr;gap:1rem}.b-hbn02__text{padding:2.5rem 1.5rem}.b-hbn02__stats{grid-template-rows:auto;grid-template-columns:1fr 1fr}.b-hbn02__stat-card{padding:1.5rem 1.25rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-hbn02{background:var(--color-primary)}.b-hbn02__text,.b-hbn02__stat-card,.b-hbn02__img{background:color-mix(in srgb,var(--color-text-on-primary) 8%,transparent);border-color:color-mix(in srgb,var(--color-text-on-primary) 12%,transparent)}.b-hbn02__text h1{color:var(--color-text-on-primary)}.b-hbn02__desc,.b-hbn02__stat-lbl{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}` },
    { id: "bordered", label: "Выраженные рамки", css: `.b-hbn02__text,.b-hbn02__stat-card,.b-hbn02__img{border-width:2px;border-color:var(--color-text)}.b-hbn02__stat-num{color:var(--color-accent)}` },
  ],
};
