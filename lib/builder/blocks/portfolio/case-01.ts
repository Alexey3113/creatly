import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "portfolio-case-01",
  name: "Портфолио — кейс крупно",
  description: "Одна работа крупным планом: wide изображение на всю ширину, описание проекта и ссылка «Смотреть проект». Идеально для главного кейса",
  category: "portfolio",
  subcategory: "case",
  icon: "◱",
  tags: ["portfolio", "case", "showcase", "single", "featured"],
  motionLevel: "css",
  fields: [
    { name: "pf03-label", type: "text", hint: "метка над заголовком 1-3 слова", required: false },
    { name: "pf03-title", type: "heading", hint: "название проекта 2-6 слов", required: true },
    { name: "pf03-desc", type: "text", hint: "описание проекта 2-4 предложения", required: true },
    { name: "pf03-img", type: "image", hint: "изображение проекта, широкое", required: true },
    { name: "pf03-link", type: "link", hint: "ссылка на проект", required: false },
    { name: "pf03-client", type: "text", hint: "название клиента 1-3 слова", required: false },
    { name: "pf03-year", type: "text", hint: "год проекта", required: false },
  ],
  html: `<section class="b-pf03" data-block="portfolio">
  <div class="b-pf03__inner">
    <div class="b-pf03__img-wrap" data-reveal="clip">
      <img data-field="pf03-img" src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1400&q=80" alt="Кейс" />
    </div>
    <div class="b-pf03__content" data-reveal="up">
      <span class="b-pf03__label" data-field="pf03-label">Избранный проект</span>
      <h2 class="b-pf03__title" data-field="pf03-title">Платформа онлайн-обучения «Знание»</h2>
      <p class="b-pf03__desc" data-field="pf03-desc">Полный цикл разработки образовательной платформы — от исследования аудитории и проектирования UX до запуска. Более 50 000 активных пользователей в первый месяц после релиза.</p>
      <div class="b-pf03__meta">
        <div class="b-pf03__meta-item">
          <span class="b-pf03__meta-label">Клиент</span>
          <span class="b-pf03__meta-value" data-field="pf03-client">EdTech Solutions</span>
        </div>
        <div class="b-pf03__meta-item">
          <span class="b-pf03__meta-label">Год</span>
          <span class="b-pf03__meta-value" data-field="pf03-year">2024</span>
        </div>
      </div>
      <a class="b-pf03__link" data-field="pf03-link" href="#">Смотреть проект →</a>
    </div>
  </div>
</section>`,
  css: `.b-pf03{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-pf03__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-pf03__img-wrap{border-radius:var(--radius-lg);overflow:hidden;margin-bottom:2.5rem}
.b-pf03__img-wrap img{width:100%;display:block;object-fit:cover;aspect-ratio:16/9;transition:transform .6s cubic-bezier(.16,1,.3,1)}
.b-pf03__img-wrap:hover img{transform:scale(1.03)}
.b-pf03__content{max-width:720px}
.b-pf03__label{display:inline-block;font-family:var(--font-body);font-size:.75rem;text-transform:uppercase;letter-spacing:.1em;color:var(--color-primary);font-weight:600;margin-bottom:.75rem}
.b-pf03__title{font-family:var(--font-heading);font-size:clamp(1.5rem,3vw,2.5rem);color:var(--color-text);margin:0 0 1rem;letter-spacing:-0.02em;line-height:1.2}
.b-pf03__desc{font-family:var(--font-body);font-size:1.0625rem;line-height:1.7;color:var(--color-text-muted);margin:0 0 1.5rem}
.b-pf03__meta{display:flex;gap:2.5rem;margin-bottom:2rem;padding-top:1.5rem;border-top:1px solid var(--color-border)}
.b-pf03__meta-label{display:block;font-family:var(--font-body);font-size:.75rem;text-transform:uppercase;letter-spacing:.08em;color:var(--color-text-muted);margin-bottom:.25rem}
.b-pf03__meta-value{font-family:var(--font-heading);font-size:1rem;font-weight:600;color:var(--color-text)}
.b-pf03__link{display:inline-flex;align-items:center;gap:.5rem;font-family:var(--font-body);font-size:1rem;font-weight:600;color:var(--color-primary);text-decoration:none;transition:gap .3s cubic-bezier(.16,1,.3,1)}
.b-pf03__link:hover{gap:.875rem}
@media(min-width:768px){.b-pf03__content{padding-left:2rem}}
@media(min-width:1024px){.b-pf03__img-wrap img{aspect-ratio:2.2/1}}`,
  variants: [
    { id: "default", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-pf03{background:var(--color-primary)}.b-pf03__label{color:var(--color-accent)}.b-pf03__title{color:var(--color-text-on-primary)}.b-pf03__desc{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-pf03__meta{border-top-color:color-mix(in srgb,var(--color-text-on-primary) 15%,transparent)}.b-pf03__meta-label{color:color-mix(in srgb,var(--color-text-on-primary) 50%,transparent)}.b-pf03__meta-value{color:var(--color-text-on-primary)}.b-pf03__link{color:var(--color-accent)}` },
    { id: "centered", label: "По центру", css: `.b-pf03__content{margin-inline:auto;text-align:center;padding-left:0}.b-pf03__meta{justify-content:center}` },
  ],
};
