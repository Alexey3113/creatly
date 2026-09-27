import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-gradient-bold-01",
  name: "Hero — mesh-градиент",
  description: "Анимированный mesh-градиент фон, огромный заголовок, минимальный текст",
  category: "hero",
  subcategory: "gradient-bold",
  icon: "★",
  tags: ["gradient", "mesh", "animated", "bold", "expressive"],
  motionLevel: "css",
  fields: [
    { name: "hero-title", type: "heading", hint: "короткий мощный заголовок 3-5 слов", required: true },
    { name: "hero-subtitle", type: "text", hint: "одно предложение", required: true },
    { name: "hero-cta", type: "link", hint: "CTA", required: true },
  ],
  html: `<section class="b-hgb01" data-block="hero">
  <div class="b-hgb01__bg"></div>
  <div class="b-hgb01__inner">
    <h1 data-field="hero-title" data-reveal="up">Будущее начинается здесь</h1>
    <p data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">Технологии, которые меняют правила игры для вашего бизнеса.</p>
    <a class="b-btn" href="#" data-field="hero-cta" data-reveal="fade" style="--stagger:2">Узнать</a>
  </div>
</section>`,
  css: `.b-hgb01{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden}
.b-hgb01__bg{position:absolute;inset:-50%;width:200%;height:200%;background:radial-gradient(ellipse at 20% 50%,var(--color-accent),transparent 50%),radial-gradient(ellipse at 80% 20%,var(--color-primary),transparent 50%),radial-gradient(ellipse at 50% 80%,color-mix(in srgb,var(--color-accent) 50%,var(--color-primary)),transparent 50%);animation:b-hgb01-shift 12s ease-in-out infinite alternate;filter:blur(80px);z-index:0}
@keyframes b-hgb01-shift{0%{transform:translate(0,0) scale(1)}100%{transform:translate(-10%,5%) scale(1.1)}}
.b-hgb01__inner{position:relative;z-index:1;text-align:center;max-width:900px;padding:0 var(--space-block)}
.b-hgb01 h1{font-family:var(--font-heading);font-size:clamp(3rem,8vw,6.5rem);color:var(--color-text-on-primary);margin:0;line-height:.95;letter-spacing:-.03em;font-weight:800}
.b-hgb01 p{font-family:var(--font-body);color:color-mix(in srgb,var(--color-text-on-primary) 75%,transparent);font-size:1.25rem;margin:1.5rem auto 2.5rem;max-width:480px;line-height:1.5}
.b-hgb01 .b-btn{background:rgba(255,255,255,.15);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.2);color:var(--color-text-on-primary)}
.b-hgb01 .b-btn:hover{background:rgba(255,255,255,.25)}
@media(max-width:767px){.b-hgb01{min-height:80vh}}`,
  variants: [
    { id: "dark", label: "Тёмный", css: "" },
    { id: "warm", label: "Тёплый", css: `.b-hgb01__bg{background:radial-gradient(ellipse at 20% 50%,#e8a598,transparent 50%),radial-gradient(ellipse at 80% 20%,#c4613a,transparent 50%),radial-gradient(ellipse at 50% 80%,#d4a853,transparent 50%)}` },
  ],
};
