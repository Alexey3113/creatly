import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-split-right-04",
  name: "Hero — иллюстрация слева, преимущества справа",
  description: "Абстрактная форма/иллюстрация слева + заголовок и нумерованные преимущества справа",
  category: "hero",
  subcategory: "split-right",
  icon: "⬔",
  tags: ["split", "illustration", "abstract", "benefits", "numbered"],
  motionLevel: "css",
  fields: [
    { name: "hero-image", type: "image", hint: "иллюстрация или абстрактная графика", required: true },
    { name: "hero-title", type: "heading", hint: "заголовок 4-7 слов", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание 1-2 предложения", required: false },
    { name: "hero-benefit-1", type: "text", hint: "преимущество 1 — заголовок + описание", required: true },
    { name: "hero-benefit-2", type: "text", hint: "преимущество 2 — заголовок + описание", required: true },
    { name: "hero-benefit-3", type: "text", hint: "преимущество 3 — заголовок + описание", required: true },
    { name: "hero-cta", type: "link", hint: "текст CTA-кнопки", required: true },
  ],
  html: `<section class="b-hsr04" data-block="hero">
  <div class="b-hsr04__inner">
    <div class="b-hsr04__visual" data-reveal="fade" style="--stagger:0">
      <div class="b-hsr04__shape"></div>
      <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80" alt="" data-field="hero-image" />
    </div>
    <div class="b-hsr04__content">
      <h1 data-field="hero-title" data-reveal="up" style="--stagger:1">Три причины выбрать нас</h1>
      <p class="b-hsr04__desc" data-field="hero-subtitle" data-reveal="fade" style="--stagger:2">Мы создаём решения, которые помогают расти быстрее.</p>
      <div class="b-hsr04__benefits">
        <div class="b-hsr04__benefit" data-field="hero-benefit-1" data-reveal="fade" style="--stagger:3">
          <span class="b-hsr04__num">01</span>
          <div><strong>Скорость</strong><br/>Запуск за 48 часов без сложной настройки.</div>
        </div>
        <div class="b-hsr04__benefit" data-field="hero-benefit-2" data-reveal="fade" style="--stagger:4">
          <span class="b-hsr04__num">02</span>
          <div><strong>Надёжность</strong><br/>99.9% аптайм и автоматическое масштабирование.</div>
        </div>
        <div class="b-hsr04__benefit" data-field="hero-benefit-3" data-reveal="fade" style="--stagger:5">
          <span class="b-hsr04__num">03</span>
          <div><strong>Поддержка</strong><br/>Личный менеджер и ответ в течение 15 минут.</div>
        </div>
      </div>
      <a class="b-btn" href="#" data-field="hero-cta" data-reveal="fade" style="--stagger:6">Начать сейчас</a>
    </div>
  </div>
</section>`,
  css: `.b-hsr04{min-height:85vh;display:flex;align-items:center;padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-hsr04__inner{max-width:var(--container-width,1400px);margin:0 auto;display:flex;align-items:center;gap:clamp(3rem,5vw,6rem);width:100%}
.b-hsr04__visual{flex:1 1 45%;position:relative}
.b-hsr04__shape{position:absolute;inset:-10%;border-radius:50%;background:color-mix(in srgb,var(--color-primary) 8%,transparent);z-index:0}
.b-hsr04__visual img{position:relative;z-index:1;width:100%;height:auto;display:block;border-radius:var(--radius-lg);aspect-ratio:1/1;object-fit:cover}
.b-hsr04__content{flex:1 1 50%}
.b-hsr04 h1{font-family:var(--font-heading);font-size:clamp(2rem,3.5vw,3rem);color:var(--color-text);margin:0;line-height:1.12;letter-spacing:-0.02em}
.b-hsr04__desc{color:var(--color-text-muted);font-family:var(--font-body);font-size:1.0625rem;margin:1rem 0 2rem;line-height:1.6;max-width:480px}
.b-hsr04__benefits{display:flex;flex-direction:column;gap:1.5rem;margin-bottom:2.5rem}
.b-hsr04__benefit{display:flex;gap:1rem;align-items:flex-start;font-family:var(--font-body);font-size:.9375rem;color:var(--color-text);line-height:1.55}
.b-hsr04__benefit strong{font-size:1rem}
.b-hsr04__num{font-family:var(--font-heading);font-size:1.25rem;font-weight:700;color:var(--color-primary);flex-shrink:0;line-height:1.4;min-width:2rem}
.b-btn{display:inline-flex;align-items:center;min-height:52px;padding:0 2rem;border-radius:var(--radius-md);background:var(--color-primary);color:var(--color-text-on-primary);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;transition:transform .3s cubic-bezier(.16,1,.3,1),opacity .3s}
.b-btn:hover{transform:translateY(-2px);opacity:.9}
@media(max-width:767px){.b-hsr04__inner{flex-direction:column}.b-hsr04{min-height:auto;padding:3rem 1.25rem}.b-hsr04__visual{max-width:80%;margin:0 auto}}`,
  variants: [
    { id: "default", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-hsr04{background:var(--color-bg-alt)}.b-hsr04__shape{background:color-mix(in srgb,var(--color-primary) 12%,transparent)}` },
    { id: "bordered", label: "С рамками", css: `.b-hsr04__benefit{border-left:3px solid var(--color-primary);padding-left:1rem}` },
  ],
};
