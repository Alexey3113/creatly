import type { BlockPreset } from "../_types";

/**
 * Storytelling: горизонтальная лента-фильмстрип.
 * Вертикальный скролл двигает ленту карточек вбок (sticky + --p от story-runtime).
 * Сигнатура: гигантские порядковые номера, наезжающие на карточки,
 * и рваный ритм ширины карточек — как контактный лист фотографа.
 */
export const block: BlockPreset = {
  id: "story-horizontal-01",
  name: "Горизонтальная лента",
  description: "Секция прилипает, и вертикальный скролл везёт ленту работ вбок. Разная ширина карточек и огромные номера — ритм киноплёнки.",
  category: "story",
  subcategory: "horizontal",
  icon: "⇆",
  tags: ["storytelling", "horizontal", "gallery", "filmstrip", "pin", "scroll", "wow", "portfolio"],
  motionLevel: "css",
  fields: [
    { name: "sh01-eyebrow", type: "text", hint: "рубрика ленты, 2-4 слова", required: false },
    { name: "sh01-title", type: "heading", hint: "заголовок секции, 2-5 слов", required: true },
    { name: "sh01-card-image", type: "image", hint: "изображение карточки", required: true },
    { name: "sh01-card-tag", type: "text", hint: "категория карточки, 1-2 слова", required: false },
    { name: "sh01-card-title", type: "heading", hint: "название карточки, 2-5 слов", required: true },
  ],
  html: `<section class="b-sh01" data-block="story" data-story>
  <div class="b-sh01__stage" data-story-stage>
    <header class="b-sh01__head">
      <span class="b-sh01__eyebrow" data-field="sh01-eyebrow">Избранные работы</span>
      <h2 class="b-sh01__title" data-field="sh01-title">Лента проектов</h2>
    </header>
    <div class="b-sh01__track" data-collection="sh01-cards">
      <article class="b-sh01__card b-sh01__card--wide" data-collection-item>
        <span class="b-sh01__num" aria-hidden="true"></span>
        <img class="b-sh01__img" data-field="sh01-card-image" src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80" alt="" />
        <div class="b-sh01__meta">
          <span class="b-sh01__tag" data-field="sh01-card-tag">Брендинг</span>
          <h3 class="b-sh01__name" data-field="sh01-card-title">Ребрендинг сети кофеен</h3>
        </div>
      </article>
      <article class="b-sh01__card" data-collection-item>
        <span class="b-sh01__num" aria-hidden="true"></span>
        <img class="b-sh01__img" data-field="sh01-card-image" src="https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=900&q=80" alt="" />
        <div class="b-sh01__meta">
          <span class="b-sh01__tag" data-field="sh01-card-tag">Веб-сайт</span>
          <h3 class="b-sh01__name" data-field="sh01-card-title">Платформа для архитекторов</h3>
        </div>
      </article>
      <article class="b-sh01__card b-sh01__card--wide" data-collection-item>
        <span class="b-sh01__num" aria-hidden="true"></span>
        <img class="b-sh01__img" data-field="sh01-card-image" src="https://images.unsplash.com/photo-1493421419110-74f4e85ba126?auto=format&fit=crop&w=1200&q=80" alt="" />
        <div class="b-sh01__meta">
          <span class="b-sh01__tag" data-field="sh01-card-tag">Айдентика</span>
          <h3 class="b-sh01__name" data-field="sh01-card-title">Фестиваль уличной культуры</h3>
        </div>
      </article>
      <article class="b-sh01__card" data-collection-item>
        <span class="b-sh01__num" aria-hidden="true"></span>
        <img class="b-sh01__img" data-field="sh01-card-image" src="https://images.unsplash.com/photo-1478358161113-b0e11994a36b?auto=format&fit=crop&w=900&q=80" alt="" />
        <div class="b-sh01__meta">
          <span class="b-sh01__tag" data-field="sh01-card-tag">Кампания</span>
          <h3 class="b-sh01__name" data-field="sh01-card-title">Запуск нового продукта</h3>
        </div>
      </article>
    </div>
    <div class="b-sh01__rail" aria-hidden="true"><div class="b-sh01__rail-fill"></div></div>
  </div>
</section>`,
  css: `.b-sh01{position:relative;height:320vh;background:var(--color-bg)}
.b-sh01__stage{position:sticky;top:0;height:100vh;overflow:hidden;display:flex;flex-direction:column;justify-content:center}
.b-sh01__head{position:absolute;top:clamp(1.5rem,5vh,3.5rem);left:var(--space-block);right:var(--space-block);display:flex;align-items:baseline;justify-content:space-between;gap:1rem;z-index:2}
.b-sh01__eyebrow{font-family:var(--font-body);font-size:.75rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--color-accent)}
.b-sh01__title{font-family:var(--font-heading);font-size:clamp(1.5rem,3vw,2.5rem);letter-spacing:-.02em;color:var(--color-text);margin:0}
.b-sh01__track{display:flex;gap:clamp(1.25rem,3vw,2.5rem);width:max-content;padding:0 var(--space-block);transform:translateX(calc(var(--p,0)*(100vw - 100% - var(--space-block)*2)));will-change:transform;counter-reset:sh01}
.b-sh01__card{position:relative;width:min(52vw,460px);flex-shrink:0;counter-increment:sh01}
.b-sh01__card--wide{width:min(72vw,640px)}
.b-sh01__num::before{content:counter(sh01,decimal-leading-zero)}
.b-sh01__num{position:absolute;top:-.55em;left:-.12em;z-index:2;font-family:var(--font-heading);font-size:clamp(4rem,9vw,7.5rem);line-height:1;font-weight:800;letter-spacing:-.04em;color:transparent;-webkit-text-stroke:1.5px color-mix(in srgb,var(--color-text) 55%,transparent);pointer-events:none}
.b-sh01__img{width:100%;aspect-ratio:3/2;object-fit:cover;border-radius:var(--radius-md);display:block}
.b-sh01__card--wide .b-sh01__img{aspect-ratio:16/9}
.b-sh01__meta{display:flex;align-items:baseline;gap:1rem;margin-top:1rem}
.b-sh01__tag{font-family:var(--font-body);font-size:.75rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--color-text-muted);white-space:nowrap}
.b-sh01__name{font-family:var(--font-heading);font-size:clamp(1.05rem,1.6vw,1.35rem);letter-spacing:-.01em;color:var(--color-text);margin:0}
.b-sh01__rail{position:absolute;left:var(--space-block);right:var(--space-block);bottom:clamp(1.5rem,4vh,2.5rem);height:2px;background:color-mix(in srgb,var(--color-text) 12%,transparent);border-radius:2px;overflow:hidden}
.b-sh01__rail-fill{height:100%;width:calc(var(--p,0)*100%);background:var(--color-accent)}
@media(max-width:768px){.b-sh01{height:280vh}.b-sh01__card{width:78vw}.b-sh01__card--wide{width:88vw}.b-sh01__head{flex-direction:column;gap:.25rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-sh01{background:#0a0a0f}.b-sh01__title{color:#fff}.b-sh01__name{color:#fff}.b-sh01__tag{color:rgba(255,255,255,.55)}.b-sh01__num{-webkit-text-stroke-color:rgba(255,255,255,.45)}.b-sh01__rail{background:rgba(255,255,255,.14)}` },
  ],
};
