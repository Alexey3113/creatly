import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-video-bg-01",
  name: "Hero — видео-фон, центр",
  description: "Полноэкранное видео с тёмным оверлеем, текст по центру + CTA-кнопка",
  category: "hero",
  subcategory: "video-bg",
  icon: "▶",
  tags: ["video", "fullscreen", "centered", "overlay", "dark", "cta"],
  motionLevel: "css",
  fields: [
    { name: "hero-video", type: "image", hint: "URL видео (mp4/webm), 3-6 сек, зацикленное, без звука, тонкое движение", required: true },
    { name: "hero-eyebrow", type: "text", hint: "короткий лейбл 2-3 слова, uppercase", required: false },
    { name: "hero-title", type: "heading", hint: "главный заголовок 5-8 слов, яркий и конкретный", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание 1-2 предложения с цифрами/фактами", required: true },
    { name: "hero-cta", type: "link", hint: "текст CTA-кнопки 2-4 слова", required: true },
  ],
  html: `<section class="b-hvb01" data-block="hero">
  <div class="b-hvb01__media">
      <video data-smooth-loop class="b-hvb01__video" autoplay muted loop playsinline preload="metadata">
      <source data-field="hero-video" src="https://assets.mixkit.co/videos/4832/4832-720.mp4" type="video/mp4">
    </video>
  </div>
  <div class="b-hvb01__overlay"></div>
  <div class="b-hvb01__inner">
    <p class="b-hvb01__eyebrow" data-field="hero-eyebrow" data-reveal="fade">Цифровое агентство</p>
    <h1 data-field="hero-title" data-reveal="up">Превращаем идеи в цифровые продукты мирового уровня</h1>
    <p class="b-hvb01__desc" data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">Более 300 запущенных проектов за 10 лет. Разработка, дизайн и маркетинг под ключ.</p>
    <a class="b-hvb01__btn" href="#" data-field="hero-cta" data-reveal="fade" style="--stagger:2">Начать проект</a>
  </div>
</section>`,
  css: `.b-hvb01{position:relative;min-height:90vh;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden;background:var(--color-bg)}
.b-hvb01__media{position:absolute;inset:0;z-index:0}
.b-hvb01__video{width:100%;height:100%;object-fit:cover;display:block}
.b-hvb01__overlay{position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,rgba(0,0,0,.45) 0%,rgba(0,0,0,.65) 100%)}
.b-hvb01__inner{position:relative;z-index:2;max-width:820px;padding:var(--space-section) var(--space-block);margin:0 auto}
.b-hvb01 h1{font-family:var(--font-heading);font-size:clamp(2.25rem,5.5vw,4.5rem);color:var(--color-text-on-primary);margin:0;line-height:1.08;letter-spacing:-0.02em}
.b-hvb01__eyebrow{color:var(--color-accent);font-family:var(--font-body);font-weight:700;text-transform:uppercase;letter-spacing:.12em;font-size:.8125rem;margin:0 0 1.25rem}
.b-hvb01__desc{color:color-mix(in srgb,var(--color-text-on-primary) 72%,transparent);font-family:var(--font-body);font-size:1.125rem;max-width:560px;margin:1.25rem auto 2.25rem;line-height:1.65}
.b-hvb01__btn{display:inline-flex;align-items:center;min-height:54px;padding:0 2.25rem;border-radius:var(--radius-md);background:var(--color-accent);color:var(--color-text-on-accent);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;transition:transform .3s cubic-bezier(.16,1,.3,1),opacity .3s}
.b-hvb01__btn:hover{transform:translateY(-2px);opacity:.9}
@media(max-width:768px){.b-hvb01{min-height:80vh}.b-hvb01__inner{padding:3rem 1.25rem}}`,
  variants: [
    { id: "dark-overlay", label: "Тёмный оверлей", css: "" },
    { id: "primary-overlay", label: "Брендовый оверлей", css: `.b-hvb01__overlay{background:linear-gradient(180deg,color-mix(in srgb,var(--color-primary) 75%,transparent) 0%,color-mix(in srgb,var(--color-primary) 90%,transparent) 100%)}.b-hvb01 h1{color:var(--color-text-on-primary)}.b-hvb01__desc{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}` },
    { id: "minimal", label: "Минимальный", css: `.b-hvb01__overlay{background:rgba(0,0,0,.3)}.b-hvb01__eyebrow{display:none}` },
  ],
};
