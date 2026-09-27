import type { BlockPreset } from "../_types";

/**
 * Фичи: 3D-карточки, наклоняющиеся к курсору, с бегающим бликом.
 * Наклон пишет widgets-runtime ([data-tilt] -> --rx/--ry/--gx/--gy),
 * вся отрисовка — CSS. На тач-устройствах карточки просто статичные.
 */
export const block: BlockPreset = {
  id: "features-tilt-01",
  name: "3D-карточки с бликом",
  description: "Карточки преимуществ, которые наклоняются вслед за курсором, с живым бликом по поверхности. На мобильных — обычные карточки.",
  category: "features",
  subcategory: "tilt",
  icon: "◇",
  tags: ["features", "3d", "tilt", "glare", "interactive", "cursor", "wow", "premium"],
  motionLevel: "css",
  fields: [
    { name: "ftt01-eyebrow", type: "text", hint: "рубрика, 2-4 слова", required: false },
    { name: "ftt01-title", type: "heading", hint: "заголовок секции, 2-6 слов", required: true },
    { name: "ftt01-card-icon", type: "icon", hint: "эмодзи/символ карточки", required: false },
    { name: "ftt01-card-title", type: "heading", hint: "заголовок карточки, 2-4 слова", required: true },
    { name: "ftt01-card-text", type: "text", hint: "текст карточки, 1-2 предложения", required: true },
  ],
  html: `<section class="b-ftt01" data-block="features">
  <div class="b-ftt01__inner">
    <span class="b-ftt01__eyebrow" data-field="ftt01-eyebrow" data-reveal="fade">Почему мы</span>
    <h2 class="b-ftt01__title" data-field="ftt01-title" data-reveal="word">Преимущества, которые чувствуются</h2>
    <div class="b-ftt01__grid" data-collection="ftt01-cards">
      <article class="b-ftt01__card" data-tilt="9" data-collection-item data-reveal="up" style="--stagger:0">
        <span class="b-ftt01__icon" data-field="ftt01-card-icon">⚡</span>
        <h3 class="b-ftt01__name" data-field="ftt01-card-title">Скорость запуска</h3>
        <p class="b-ftt01__text" data-field="ftt01-card-text">От брифа до работающего сайта — за один день, не за месяц согласований.</p>
        <span class="b-ftt01__glare" aria-hidden="true"></span>
      </article>
      <article class="b-ftt01__card" data-tilt="9" data-collection-item data-reveal="up" style="--stagger:1">
        <span class="b-ftt01__icon" data-field="ftt01-card-icon">◈</span>
        <h3 class="b-ftt01__name" data-field="ftt01-card-title">Дизайн уровня студии</h3>
        <p class="b-ftt01__text" data-field="ftt01-card-text">Анимации и типографика, за которые обычно платят агентствам сотни тысяч.</p>
        <span class="b-ftt01__glare" aria-hidden="true"></span>
      </article>
      <article class="b-ftt01__card" data-tilt="9" data-collection-item data-reveal="up" style="--stagger:2">
        <span class="b-ftt01__icon" data-field="ftt01-card-icon">∞</span>
        <h3 class="b-ftt01__name" data-field="ftt01-card-title">Растёт вместе с вами</h3>
        <p class="b-ftt01__text" data-field="ftt01-card-text">Меняйте контент, добавляйте страницы и механики — без разработчиков.</p>
        <span class="b-ftt01__glare" aria-hidden="true"></span>
      </article>
    </div>
  </div>
</section>`,
  css: `.b-ftt01{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-ftt01__inner{max-width:var(--container-width,1400px);margin:0 auto;text-align:center}
.b-ftt01__eyebrow{display:block;font-family:var(--font-body);font-size:.8125rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--color-accent);margin-bottom:1rem}
.b-ftt01__title{font-family:var(--font-heading);font-size:clamp(1.85rem,3.6vw,2.9rem);letter-spacing:-.02em;color:var(--color-text);margin:0 0 3rem}
.b-ftt01__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.75rem;perspective:1100px}
.b-ftt01__card{position:relative;overflow:hidden;background:var(--color-surface);border-radius:var(--radius-lg);padding:2.75rem 2.25rem;text-align:left;box-shadow:0 22px 55px -30px color-mix(in srgb,var(--color-text) 28%,transparent);transform:rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transform-style:preserve-3d;transition:transform .2s ease-out,box-shadow .35s;will-change:transform}
.b-ftt01__card.is-tilting{transition:transform .05s linear;box-shadow:0 34px 70px -30px color-mix(in srgb,var(--color-text) 38%,transparent)}
.b-ftt01__glare{position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .3s;background:radial-gradient(420px circle at var(--gx,50%) var(--gy,50%),color-mix(in srgb,#ffffff 28%,transparent) 0%,transparent 55%)}
.b-ftt01__card.is-tilting .b-ftt01__glare{opacity:1}
.b-ftt01__icon{font-size:1.5rem;display:inline-flex;align-items:center;justify-content:center;width:3.25rem;height:3.25rem;border-radius:var(--radius-md);background:color-mix(in srgb,var(--color-accent) 12%,transparent);margin-bottom:1.5rem}
.b-ftt01__name{font-family:var(--font-heading);font-size:1.25rem;letter-spacing:-.01em;color:var(--color-text);margin:0 0 .6rem}
.b-ftt01__text{font-family:var(--font-body);font-size:.9375rem;color:var(--color-text-muted);line-height:1.65;margin:0}
@media(max-width:768px){.b-ftt01__grid{grid-template-columns:1fr;gap:1.25rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-ftt01{background:#0a0a0f}.b-ftt01__title{color:#fff}.b-ftt01__card{background:#14141c}.b-ftt01__name{color:#fff}.b-ftt01__text{color:rgba(255,255,255,.6)}.b-ftt01__glare{background:radial-gradient(420px circle at var(--gx,50%) var(--gy,50%),rgba(255,255,255,.14) 0%,transparent 55%)}` },
  ],
};
