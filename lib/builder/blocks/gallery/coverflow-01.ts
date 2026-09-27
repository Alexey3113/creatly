import type { BlockPreset } from "../_types";

/**
 * Галерея: 3D-карусель под углом (паттерн «Media Card Carousel»).
 * Карточки-фото раскладываются веером в перспективе: центральная — фронтально
 * и крупно, боковые уходят вглубь под углом (rotateY+translateZ). Авто-прокрутка,
 * клик по карточке и свайп — через widgets-runtime [data-coverflow].
 */
export const block: BlockPreset = {
  id: "gallery-coverflow-01",
  name: "3D-карусель карточек",
  description: "Фото-карточки веером в перспективе: центральная фронтально, боковые под углом уходят вглубь. Авто-прокрутка + клик + свайп. Портфолио, продукты, кейсы.",
  category: "gallery",
  subcategory: "coverflow",
  icon: "◧",
  tags: ["gallery", "carousel", "coverflow", "3d", "tilt", "interactive", "wow", "premium"],
  motionLevel: "css",
  fields: [
    { name: "cf01-eyebrow", type: "text", hint: "рубрика, 2-4 слова", required: false },
    { name: "cf01-title", type: "heading", hint: "заголовок секции, 2-6 слов", required: true },
    { name: "cf01-card-image", type: "image", hint: "изображение карточки (вертикальное)", required: true },
    { name: "cf01-card-tag", type: "text", hint: "категория, 1-2 слова", required: false },
    { name: "cf01-card-name", type: "heading", hint: "название, 2-4 слова", required: true },
  ],
  html: `<section class="b-cf01" data-block="gallery">
  <div class="b-cf01__inner">
    <header class="b-cf01__head">
      <span class="b-cf01__eyebrow" data-field="cf01-eyebrow" data-reveal="fade">Избранное</span>
      <h2 class="b-cf01__title" data-field="cf01-title" data-reveal="word">Работы, которыми гордимся</h2>
    </header>
    <div class="b-cf01__stage">
      <div class="b-cf01__track" data-coverflow data-collection="cf01-cards">
        <article class="b-cf01__card" data-cf-card data-collection-item>
          <img data-field="cf01-card-image" src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=700&q=80" alt="" />
          <div class="b-cf01__meta"><span data-field="cf01-card-tag">Брендинг</span><h3 data-field="cf01-card-name">Сеть кофеен</h3></div>
        </article>
        <article class="b-cf01__card" data-cf-card data-collection-item>
          <img data-field="cf01-card-image" src="https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=700&q=80" alt="" />
          <div class="b-cf01__meta"><span data-field="cf01-card-tag">Веб</span><h3 data-field="cf01-card-name">Платформа</h3></div>
        </article>
        <article class="b-cf01__card" data-cf-card data-collection-item>
          <img data-field="cf01-card-image" src="https://images.unsplash.com/photo-1493421419110-74f4e85ba126?auto=format&fit=crop&w=700&q=80" alt="" />
          <div class="b-cf01__meta"><span data-field="cf01-card-tag">Айдентика</span><h3 data-field="cf01-card-name">Фестиваль</h3></div>
        </article>
        <article class="b-cf01__card" data-cf-card data-collection-item>
          <img data-field="cf01-card-image" src="https://images.unsplash.com/photo-1478358161113-b0e11994a36b?auto=format&fit=crop&w=700&q=80" alt="" />
          <div class="b-cf01__meta"><span data-field="cf01-card-tag">Кампания</span><h3 data-field="cf01-card-name">Запуск</h3></div>
        </article>
        <article class="b-cf01__card" data-cf-card data-collection-item>
          <img data-field="cf01-card-image" src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=700&q=80" alt="" />
          <div class="b-cf01__meta"><span data-field="cf01-card-tag">Тревел</span><h3 data-field="cf01-card-name">Маршруты</h3></div>
        </article>
      </div>
    </div>
    <p class="b-cf01__hint" aria-hidden="true">Кликните карточку или листайте свайпом</p>
  </div>
</section>`,
  css: `.b-cf01{padding:var(--space-section) 0;background:var(--color-primary);overflow:hidden}
.b-cf01__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-cf01__head{text-align:center;padding:0 var(--space-block);margin-bottom:2.5rem}
.b-cf01__eyebrow{display:block;font-family:var(--font-body);font-size:.8125rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--color-accent);margin-bottom:.75rem}
.b-cf01__title{font-family:var(--font-heading);font-size:clamp(1.85rem,3.6vw,2.9rem);letter-spacing:-.02em;color:var(--color-text-on-primary);margin:0}
.b-cf01__stage{position:relative;height:min(60vh,520px);perspective:1600px}
.b-cf01__track{position:absolute;inset:0;transform-style:preserve-3d}
.b-cf01__card{position:absolute;top:50%;left:50%;width:min(34vw,300px);aspect-ratio:3/4;border-radius:var(--radius-lg);overflow:hidden;cursor:pointer;box-shadow:0 40px 80px -30px rgba(0,0,0,.6);transition:transform .6s cubic-bezier(.16,1,.3,1),opacity .6s;transform:translate(-50%,-50%)}
.b-cf01__card img{width:100%;height:100%;object-fit:cover;display:block;filter:brightness(.8);transition:filter .5s}
.b-cf01__card.is-center img{filter:none}
.b-cf01__meta{position:absolute;left:0;right:0;bottom:0;padding:1.5rem 1.25rem 1.1rem;background:linear-gradient(to top,rgba(8,8,12,.85),transparent);opacity:0;transition:opacity .5s}
.b-cf01__card.is-center .b-cf01__meta{opacity:1}
.b-cf01__meta span{font-family:var(--font-body);font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--color-accent)}
.b-cf01__meta h3{font-family:var(--font-heading);font-size:1.25rem;color:#fff;margin:.25rem 0 0}
.b-cf01__hint{text-align:center;font-family:var(--font-body);font-size:.75rem;letter-spacing:.14em;text-transform:uppercase;color:color-mix(in srgb,var(--color-text-on-primary) 45%,transparent);margin:2rem 0 0}
@media(max-width:768px){.b-cf01__card{width:60vw}}`,
  variants: [
    { id: "brand", label: "Брендовый", css: "" },
    { id: "dark", label: "Чёрный", css: `.b-cf01{background:#0a0a0f}` },
    { id: "light", label: "Светлый", css: `.b-cf01{background:var(--color-bg)}.b-cf01__title{color:var(--color-text)}.b-cf01__hint{color:var(--color-text-muted)}` },
  ],
};
