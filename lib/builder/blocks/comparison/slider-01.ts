import type { BlockPreset } from "../_types";

/**
 * Before/After — слайдер сравнения двух изображений.
 * Range-инпут пишет --x через widgets-runtime, клип «после»-слоя чистый CSS.
 * Работает мышью, пальцем и с клавиатуры (это нативный input).
 */
export const block: BlockPreset = {
  id: "comparison-slider-01",
  name: "До / После — слайдер",
  description: "Интерактивное сравнение двух изображений с перетаскиваемой шторкой. Ремонт, дизайн, ретушь, редизайн — всё, где важно показать разницу.",
  category: "comparison",
  subcategory: "slider",
  icon: "⇔",
  tags: ["before-after", "slider", "interactive", "compare", "wow", "portfolio"],
  motionLevel: "css",
  fields: [
    { name: "ba01-title", type: "heading", hint: "заголовок секции 2-5 слов", required: true },
    { name: "ba01-subtitle", type: "text", hint: "подзаголовок 1 предложение", required: false },
    { name: "ba01-before", type: "image", hint: "изображение «до»", required: true },
    { name: "ba01-after", type: "image", hint: "изображение «после» (та же композиция)", required: true },
    { name: "ba01-label-before", type: "text", hint: "подпись «до», 1-2 слова", required: false },
    { name: "ba01-label-after", type: "text", hint: "подпись «после», 1-2 слова", required: false },
  ],
  html: `<section class="b-ba01" data-block="comparison">
  <div class="b-ba01__inner">
    <h2 class="b-ba01__title" data-field="ba01-title" data-reveal="up">Почувствуйте разницу</h2>
    <p class="b-ba01__subtitle" data-field="ba01-subtitle" data-reveal="fade">Потяните шторку, чтобы сравнить результат нашей работы.</p>
    <div class="b-ba01__frame" data-ba data-reveal="scale">
      <img class="b-ba01__img b-ba01__img--before" data-field="ba01-before" src="https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80" alt="До" />
      <div class="b-ba01__after-wrap" aria-hidden="false">
        <img class="b-ba01__img" data-field="ba01-after" src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1400&q=80" alt="После" />
      </div>
      <span class="b-ba01__badge b-ba01__badge--before" data-field="ba01-label-before">До</span>
      <span class="b-ba01__badge b-ba01__badge--after" data-field="ba01-label-after">После</span>
      <div class="b-ba01__handle" aria-hidden="true"><span></span></div>
      <input class="b-ba01__range" type="range" min="0" max="100" value="50" aria-label="Сравнение до и после" />
    </div>
  </div>
</section>`,
  css: `.b-ba01{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-ba01__inner{max-width:960px;margin:0 auto;text-align:center}
.b-ba01__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);letter-spacing:-.02em;color:var(--color-text);margin:0 0 .75rem}
.b-ba01__subtitle{font-family:var(--font-body);font-size:1.0625rem;color:var(--color-text-muted);margin:0 auto 2.5rem;max-width:520px;line-height:1.6}
.b-ba01__frame{--x:50%;position:relative;border-radius:var(--radius-lg);overflow:hidden;aspect-ratio:16/10;cursor:ew-resize;box-shadow:0 30px 80px -20px color-mix(in srgb,var(--color-text) 25%,transparent)}
.b-ba01__img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
.b-ba01__after-wrap{position:absolute;inset:0;clip-path:inset(0 0 0 var(--x))}
.b-ba01__badge{position:absolute;top:1rem;padding:.4rem .9rem;border-radius:var(--radius-full);font-family:var(--font-body);font-size:.75rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;backdrop-filter:blur(8px);pointer-events:none;z-index:2}
.b-ba01__badge--before{left:1rem;background:rgba(10,10,15,.55);color:#fff}
.b-ba01__badge--after{right:1rem;background:color-mix(in srgb,var(--color-accent) 85%,transparent);color:var(--color-text-on-accent)}
.b-ba01__handle{position:absolute;top:0;bottom:0;left:var(--x);width:2px;background:#fff;z-index:2;pointer-events:none;transform:translateX(-1px)}
.b-ba01__handle span{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:44px;height:44px;border-radius:50%;background:#fff;box-shadow:0 4px 20px rgba(0,0,0,.35);display:grid;place-items:center}
.b-ba01__handle span::before{content:"⟨ ⟩";font-size:.8rem;letter-spacing:.05em;color:#111;font-family:var(--font-body);font-weight:700}
.b-ba01__range{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:ew-resize;margin:0;z-index:3;-webkit-appearance:none;appearance:none}
@media(max-width:768px){.b-ba01__frame{aspect-ratio:4/3}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-ba01{background:#0a0a0f}.b-ba01__title{color:#fff}.b-ba01__subtitle{color:rgba(255,255,255,.6)}` },
  ],
};
