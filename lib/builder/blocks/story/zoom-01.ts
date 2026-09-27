import type { BlockPreset } from "../_types";

/**
 * Storytelling: зум-погружение (Apple-style).
 * Изображение начинается полноэкранным; по мере скролла --p от story-runtime
 * сжимает его в аккуратную карточку с рамкой, одновременно проявляя заголовок
 * вокруг. Чистый CSS поверх --p — ни кадра JS-анимации.
 */
export const block: BlockPreset = {
  id: "story-zoom-01",
  name: "Зум-погружение",
  description: "Полноэкранное фото по мере скролла сжимается в карточку, вокруг проявляется заголовок и подпись. Эффект «камера отъезжает» как у Apple.",
  category: "story",
  subcategory: "zoom",
  icon: "◱",
  tags: ["storytelling", "zoom", "scale", "pin", "scroll", "apple", "wow", "premium"],
  motionLevel: "css",
  fields: [
    { name: "sz01-image", type: "image", hint: "крупное атмосферное фото/рендер", required: true },
    { name: "sz01-eyebrow", type: "text", hint: "рубрика, 2-4 слова", required: false },
    { name: "sz01-title", type: "heading", hint: "заголовок, 3-6 слов — появится вокруг фото", required: true },
    { name: "sz01-caption", type: "text", hint: "подпись под карточкой, 1 предложение", required: false },
  ],
  html: `<section class="b-sz01" data-block="story" data-story>
  <div class="b-sz01__stage" data-story-stage>
    <div class="b-sz01__text" aria-hidden="false">
      <span class="b-sz01__eyebrow" data-field="sz01-eyebrow">Наше пространство</span>
      <h2 class="b-sz01__title" data-field="sz01-title">Место, где рождаются идеи</h2>
    </div>
    <div class="b-sz01__frame">
      <img class="b-sz01__img" data-field="sz01-image" src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80" alt="" />
    </div>
    <p class="b-sz01__caption" data-field="sz01-caption">Каждая деталь интерьера продумана для спокойной работы</p>
  </div>
</section>`,
  css: `.b-sz01{position:relative;height:260vh;background:var(--color-bg)}
.b-sz01__stage{position:sticky;top:0;height:100vh;overflow:hidden;display:grid;place-items:center}
.b-sz01__frame{position:absolute;z-index:1;overflow:hidden;
  /* p:0 — весь экран; p:1 — карточка */
  inset:calc(var(--p,0)*14vh) calc(var(--p,0)*16vw);
  border-radius:calc(var(--p,0)*var(--radius-lg)*1.6);
  box-shadow:0 calc(var(--p,0)*45px) calc(var(--p,0)*90px) calc(var(--p,0)*-30px) color-mix(in srgb,var(--color-text) 40%,transparent)}
.b-sz01__img{width:100%;height:100%;object-fit:cover;transform:scale(calc(1.18 - var(--p,0)*0.18))}
.b-sz01__text{position:relative;z-index:0;text-align:center;opacity:calc((var(--p,0) - 0.55)*3);transform:translateY(calc((1 - var(--p,0))*30px))}
.b-sz01__eyebrow{display:block;font-family:var(--font-body);font-size:.8125rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--color-accent);margin-bottom:1rem}
.b-sz01__title{font-family:var(--font-heading);font-size:clamp(2rem,4.5vw,3.75rem);letter-spacing:-.025em;color:var(--color-text);margin:0;padding:0 var(--space-block)}
.b-sz01__title{position:relative}
.b-sz01__text{margin-bottom:56vh}
.b-sz01__caption{position:absolute;z-index:2;bottom:calc(14vh - 3.2rem);left:0;right:0;text-align:center;font-family:var(--font-body);font-size:.9rem;color:var(--color-text-muted);opacity:calc((var(--p,0) - 0.75)*4);margin:0;padding:0 var(--space-block)}
@media(max-width:768px){.b-sz01{height:220vh}.b-sz01__frame{inset:calc(var(--p,0)*16vh) calc(var(--p,0)*7vw)}.b-sz01__text{margin-bottom:60vh}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-sz01{background:#0a0a0f}.b-sz01__title{color:#fff}.b-sz01__caption{color:rgba(255,255,255,.55)}` },
  ],
};
