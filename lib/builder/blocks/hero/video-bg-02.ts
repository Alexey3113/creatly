import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-video-bg-02",
  name: "Hero — видео-фон, текст снизу-слева",
  description: "Полноэкранное видео с градиентом снизу, заголовок и CTA в левом нижнем углу",
  category: "hero",
  subcategory: "video-bg",
  icon: "▶",
  tags: ["video", "fullscreen", "bottom-left", "gradient", "editorial", "cta"],
  motionLevel: "css",
  fields: [
    { name: "hero-video", type: "image", hint: "URL видеофайла (mp4/webm), до 15 сек, без звука", required: true },
    { name: "hero-title", type: "heading", hint: "главный заголовок 4-8 слов, мощный и ёмкий", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание 1-2 предложения, поддерживающее заголовок", required: true },
    { name: "hero-cta", type: "link", hint: "текст CTA-кнопки 2-4 слова", required: false },
  ],
  html: `<section class="b-hvb02" data-block="hero">
  <div class="b-hvb02__media">
      <video data-smooth-loop class="b-hvb02__video" autoplay muted loop playsinline preload="metadata">
      <source data-field="hero-video" src="https://assets.mixkit.co/videos/4832/4832-720.mp4" type="video/mp4">
    </video>
  </div>
  <div class="b-hvb02__overlay"></div>
  <div class="b-hvb02__inner">
    <div class="b-hvb02__content" data-reveal="up">
      <h1 data-field="hero-title">Архитектура будущего начинается сегодня</h1>
      <p class="b-hvb02__desc" data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">Проектируем пространства, где технологии и природа работают как единое целое. 50+ объектов в 12 странах.</p>
      <a class="b-hvb02__btn" href="#" data-field="hero-cta" data-reveal="fade" style="--stagger:2">Смотреть портфолио</a>
    </div>
  </div>
</section>`,
  css: `.b-hvb02{position:relative;min-height:90vh;display:flex;align-items:flex-end;overflow:hidden;background:var(--color-bg)}
.b-hvb02__media{position:absolute;inset:0;z-index:0}
.b-hvb02__video{width:100%;height:100%;object-fit:cover;display:block}
.b-hvb02__overlay{position:absolute;inset:0;z-index:1;background:linear-gradient(0deg,rgba(0,0,0,.78) 0%,rgba(0,0,0,.35) 40%,rgba(0,0,0,.05) 100%)}
.b-hvb02__inner{position:relative;z-index:2;width:100%;padding:0 var(--space-block) var(--space-section)}
.b-hvb02__content{max-width:680px}
.b-hvb02 h1{font-family:var(--font-heading);font-size:clamp(2rem,5vw,4rem);color:var(--color-text-on-primary);margin:0;line-height:1.1;letter-spacing:-0.02em}
.b-hvb02__desc{color:color-mix(in srgb,var(--color-text-on-primary) 68%,transparent);font-family:var(--font-body);font-size:1.0625rem;max-width:520px;margin:1rem 0 1.75rem;line-height:1.6}
.b-hvb02__btn{display:inline-flex;align-items:center;min-height:50px;padding:0 2rem;border-radius:var(--radius-md);background:var(--color-accent);color:var(--color-text-on-accent);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;transition:transform .3s cubic-bezier(.16,1,.3,1),opacity .3s}
.b-hvb02__btn:hover{transform:translateY(-2px);opacity:.9}
@media(max-width:768px){.b-hvb02{min-height:80vh}.b-hvb02__inner{padding:0 1.25rem 3rem}.b-hvb02 h1{font-size:clamp(1.75rem,7vw,2.5rem)}}`,
  variants: [
    { id: "bottom-gradient", label: "Градиент снизу", css: "" },
    { id: "accent-line", label: "С акцентной линией", css: `.b-hvb02__content{border-left:3px solid var(--color-accent);padding-left:1.5rem}` },
    { id: "light-gradient", label: "Светлый градиент", css: `.b-hvb02__overlay{background:linear-gradient(0deg,rgba(255,255,255,.88) 0%,rgba(255,255,255,.3) 40%,rgba(255,255,255,0) 100%)}.b-hvb02 h1{color:var(--color-text)}.b-hvb02__desc{color:var(--color-text-muted)}` },
  ],
};
