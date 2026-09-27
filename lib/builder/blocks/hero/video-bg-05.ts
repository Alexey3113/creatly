import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-video-bg-05",
  name: "Hero — видео, зернистость",
  description: "Видео-фон с эффектом плёночного зерна через CSS-шум. Текстура grain накладывается поверх видео, создавая винтажную кинематографическую атмосферу. Заголовок, подзаголовок и CTA по центру.",
  category: "hero",
  subcategory: "video-bg",
  icon: "📽",
  tags: ["video", "grain", "noise", "vintage", "film", "texture", "cta"],
  motionLevel: "css",
  fields: [
    { name: "hero-video", type: "image", hint: "фоновое видео MP4, соотношение 16:9, до 15 сек", required: true },
    { name: "hero-title", type: "heading", hint: "главный заголовок 4-8 слов, яркий и запоминающийся", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание 1-2 предложения, раскрывает суть", required: true },
    { name: "hero-cta", type: "link", hint: "текст CTA-кнопки 2-4 слова", required: true },
  ],
  html: `<section class="b-hvb05" data-block="hero">
  <div class="b-hvb05__video-wrap">
    <video data-smooth-loop class="b-hvb05__video" autoplay muted loop playsinline data-field="hero-video">
      <source src="https://assets.mixkit.co/videos/4832/4832-720.mp4" type="video/mp4">
    </video>
    <div class="b-hvb05__dim"></div>
  </div>
  <div class="b-hvb05__grain"></div>
  <div class="b-hvb05__content">
    <h1 class="b-hvb05__title" data-field="hero-title" data-reveal="up">Снимаем кино, которое меняет восприятие</h1>
    <p class="b-hvb05__subtitle" data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">Продакшн полного цикла — от идеи и сценария до финального монтажа. Более 50 фильмов за 10 лет.</p>
    <a class="b-hvb05__cta" href="#" data-field="hero-cta" data-reveal="fade" style="--stagger:2">Смотреть шоурил</a>
  </div>
</section>`,
  css: `.b-hvb05{position:relative;min-height:90vh;display:flex;align-items:center;justify-content:center;overflow:hidden;background:var(--color-bg)}
.b-hvb05__video-wrap{position:absolute;inset:0;z-index:0}
.b-hvb05__video{width:100%;height:100%;object-fit:cover}
.b-hvb05__dim{position:absolute;inset:0;background:color-mix(in srgb,var(--color-bg) 55%,transparent)}
.b-hvb05__grain{position:absolute;inset:0;z-index:1;pointer-events:none;opacity:.35;mix-blend-mode:overlay;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");background-repeat:repeat;background-size:200px 200px}
.b-hvb05__content{position:relative;z-index:2;text-align:center;padding:var(--space-section) var(--space-block);max-width:780px;margin:0 auto}
.b-hvb05__title{font-family:var(--font-heading);font-size:clamp(2.25rem,5.5vw,4.25rem);color:var(--color-text-on-primary);margin:0;line-height:1.1;letter-spacing:-0.02em}
.b-hvb05__subtitle{font-family:var(--font-body);font-size:clamp(0.9375rem,1.4vw,1.1875rem);color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent);margin:1.25rem auto 2.25rem;max-width:560px;line-height:1.65}
.b-hvb05__cta{display:inline-flex;align-items:center;min-height:52px;padding:0 2.25rem;border:2px solid color-mix(in srgb,var(--color-text-on-primary) 80%,transparent);border-radius:var(--radius-full);background:transparent;color:var(--color-text-on-primary);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;letter-spacing:.04em;transition:background .3s,border-color .3s,transform .3s cubic-bezier(.16,1,.3,1)}
.b-hvb05__cta:hover{background:color-mix(in srgb,var(--color-text-on-primary) 12%,transparent);border-color:var(--color-text-on-primary);transform:translateY(-2px)}
@media(max-width:768px){.b-hvb05{min-height:80vh}.b-hvb05__content{padding:3rem 1.25rem}.b-hvb05__cta{min-height:46px;padding:0 1.75rem}}`,
  variants: [
    { id: "default", label: "Плёночное зерно", css: "" },
    { id: "heavy-grain", label: "Грубое зерно", css: `.b-hvb05__grain{opacity:.55;mix-blend-mode:multiply}` },
    { id: "warm-tint", label: "Тёплый оттенок", css: `.b-hvb05__dim{background:color-mix(in srgb,var(--color-bg) 45%,transparent);mix-blend-mode:normal}.b-hvb05__dim::after{content:"";position:absolute;inset:0;background:color-mix(in srgb,var(--color-accent) 15%,transparent);mix-blend-mode:color}` },
  ],
};
