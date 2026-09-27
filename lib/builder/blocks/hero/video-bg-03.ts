import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-video-bg-03",
  name: "Hero — сплит, видео + текст",
  description: "Разделённый экран: видео слева, текстовый контент справа на цветном фоне",
  category: "hero",
  subcategory: "video-bg",
  icon: "▶",
  tags: ["video", "split", "two-column", "cta", "structured"],
  motionLevel: "css",
  fields: [
    { name: "hero-video", type: "image", hint: "URL видеофайла (mp4/webm), до 15 сек, без звука", required: true },
    { name: "hero-eyebrow", type: "text", hint: "короткий лейбл 2-3 слова, uppercase", required: false },
    { name: "hero-title", type: "heading", hint: "главный заголовок 4-7 слов, конкретный", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание 2-3 предложения с фактами", required: true },
    { name: "hero-cta", type: "link", hint: "текст CTA-кнопки 2-4 слова", required: true },
    { name: "hero-cta-secondary", type: "link", hint: "текст вторичной ссылки 2-4 слова", required: false },
  ],
  html: `<section class="b-hvb03" data-block="hero">
  <div class="b-hvb03__media">
      <video data-smooth-loop class="b-hvb03__video" autoplay muted loop playsinline preload="metadata">
      <source data-field="hero-video" src="https://assets.mixkit.co/videos/4832/4832-720.mp4" type="video/mp4">
    </video>
  </div>
  <div class="b-hvb03__content">
    <div class="b-hvb03__inner">
      <p class="b-hvb03__eyebrow" data-field="hero-eyebrow" data-reveal="fade">Платформа аналитики</p>
      <h1 data-field="hero-title" data-reveal="up">Данные, которые двигают бизнес вперёд</h1>
      <p class="b-hvb03__desc" data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">Объединяем все источники данных в единую панель. Автоматические отчёты, прогнозы на базе ИИ и мгновенные инсайты для команд любого масштаба.</p>
      <div class="b-hvb03__actions" data-reveal="fade" style="--stagger:2">
        <a class="b-hvb03__btn" href="#" data-field="hero-cta">Попробовать бесплатно</a>
        <a class="b-hvb03__link" href="#" data-field="hero-cta-secondary">Смотреть демо →</a>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-hvb03{display:grid;grid-template-columns:1fr 1fr;min-height:85vh;overflow:hidden}
.b-hvb03__media{position:relative;overflow:hidden}
.b-hvb03__video{width:100%;height:100%;object-fit:cover;display:block;position:absolute;inset:0}
.b-hvb03__content{display:flex;align-items:center;background:var(--color-bg);padding:var(--space-section) var(--space-block)}
.b-hvb03__inner{max-width:520px;margin:0 auto}
.b-hvb03__eyebrow{color:var(--color-accent);font-family:var(--font-body);font-weight:700;text-transform:uppercase;letter-spacing:.12em;font-size:.8125rem;margin:0 0 1.25rem}
.b-hvb03 h1{font-family:var(--font-heading);font-size:clamp(1.75rem,3vw,3rem);color:var(--color-text);margin:0;line-height:1.12;letter-spacing:-0.02em}
.b-hvb03__desc{color:var(--color-text-muted);font-family:var(--font-body);font-size:1.0625rem;margin:1.25rem 0 2rem;line-height:1.65}
.b-hvb03__actions{display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap}
.b-hvb03__btn{display:inline-flex;align-items:center;min-height:52px;padding:0 2rem;border-radius:var(--radius-md);background:var(--color-primary);color:var(--color-text-on-primary);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;transition:transform .3s cubic-bezier(.16,1,.3,1),opacity .3s}
.b-hvb03__btn:hover{transform:translateY(-2px);opacity:.9}
.b-hvb03__link{color:var(--color-primary);font-family:var(--font-body);font-weight:600;font-size:.9375rem;text-decoration:none;transition:color .2s}
.b-hvb03__link:hover{color:var(--color-accent)}
@media(max-width:768px){.b-hvb03{grid-template-columns:1fr;min-height:auto}.b-hvb03__media{min-height:50vw;position:relative}.b-hvb03__content{padding:3rem 1.25rem}}`,
  variants: [
    { id: "light-right", label: "Светлый", css: "" },
    { id: "dark-right", label: "Тёмный", css: `.b-hvb03__content{background:var(--color-primary)}.b-hvb03 h1{color:var(--color-text-on-primary)}.b-hvb03__desc{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-hvb03__btn{background:var(--color-accent);color:var(--color-text-on-accent)}.b-hvb03__link{color:var(--color-text-on-primary)}` },
    { id: "reversed", label: "Инвертированный", css: `.b-hvb03{direction:rtl}.b-hvb03__content{direction:ltr}.b-hvb03__media{direction:ltr}` },
  ],
};
