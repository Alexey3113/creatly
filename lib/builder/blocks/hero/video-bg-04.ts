import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-video-bg-04",
  name: "Hero — видео, кинематограф",
  description: "Кинематографический стиль с letterbox-эффектом: видео на весь экран, широкие полосы сверху и снизу создают атмосферу широкоформатного кино. Минималистичный текст по центру.",
  category: "hero",
  subcategory: "video-bg",
  icon: "🎬",
  tags: ["video", "cinematic", "letterbox", "minimal", "widescreen", "film"],
  motionLevel: "css",
  fields: [
    { name: "hero-video", type: "image", hint: "фоновое видео MP4, соотношение 16:9, до 15 сек", required: true },
    { name: "hero-title", type: "heading", hint: "главный заголовок 3-6 слов, лаконичный и ёмкий", required: true },
    { name: "hero-subtitle", type: "text", hint: "подзаголовок 1 предложение, дополняет заголовок", required: false },
  ],
  html: `<section class="b-hvb04" data-block="hero">
  <div class="b-hvb04__video-wrap">
    <video data-smooth-loop class="b-hvb04__video" autoplay muted loop playsinline data-field="hero-video">
      <source src="https://assets.mixkit.co/videos/4832/4832-720.mp4" type="video/mp4">
    </video>
    <div class="b-hvb04__overlay"></div>
  </div>
  <div class="b-hvb04__bar b-hvb04__bar--top"></div>
  <div class="b-hvb04__bar b-hvb04__bar--bottom"></div>
  <div class="b-hvb04__content">
    <h1 class="b-hvb04__title" data-field="hero-title" data-reveal="up">Искусство движений</h1>
    <p class="b-hvb04__subtitle" data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">Каждый кадр — история, каждая секунда — эмоция</p>
  </div>
</section>`,
  css: `.b-hvb04{position:relative;min-height:90vh;display:flex;align-items:center;justify-content:center;overflow:hidden;background:var(--color-bg)}
.b-hvb04__video-wrap{position:absolute;inset:0;z-index:0}
.b-hvb04__video{width:100%;height:100%;object-fit:cover}
.b-hvb04__overlay{position:absolute;inset:0;background:linear-gradient(to bottom,color-mix(in srgb,var(--color-bg) 30%,transparent),color-mix(in srgb,var(--color-bg) 50%,transparent))}
.b-hvb04__bar{position:absolute;left:0;right:0;z-index:2;background:var(--color-bg)}
.b-hvb04__bar--top{top:0;height:clamp(3rem,10vh,7rem)}
.b-hvb04__bar--bottom{bottom:0;height:clamp(3rem,10vh,7rem)}
.b-hvb04__content{position:relative;z-index:3;text-align:center;padding:var(--space-section) var(--space-block);max-width:800px;margin:0 auto}
.b-hvb04__title{font-family:var(--font-heading);font-size:clamp(2.25rem,5vw,4.5rem);color:var(--color-text-on-primary);margin:0;line-height:1.08;letter-spacing:-0.025em;text-transform:uppercase}
.b-hvb04__subtitle{font-family:var(--font-body);font-size:clamp(0.9375rem,1.5vw,1.25rem);color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent);margin:1rem auto 0;max-width:520px;line-height:1.6;letter-spacing:.04em}
@media(max-width:768px){.b-hvb04{min-height:80vh}.b-hvb04__bar--top,.b-hvb04__bar--bottom{height:2rem}.b-hvb04__content{padding:3rem 1.25rem}}`,
  variants: [
    { id: "default", label: "Тёмные полосы", css: "" },
    { id: "accent-bars", label: "Акцентные полосы", css: `.b-hvb04__bar{background:var(--color-primary)}.b-hvb04__overlay{background:linear-gradient(to bottom,color-mix(in srgb,var(--color-primary) 25%,transparent),color-mix(in srgb,var(--color-primary) 45%,transparent))}` },
    { id: "thin-bars", label: "Узкие полосы", css: `.b-hvb04__bar--top,.b-hvb04__bar--bottom{height:clamp(1.5rem,4vh,3rem)}.b-hvb04__title{text-transform:none;letter-spacing:-0.02em}` },
  ],
};
