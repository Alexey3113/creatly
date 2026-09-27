import type { BlockPreset } from "../_types";

/**
 * Галерея: живая сетка (паттерн «Pixel Grid Hover» / «Nike Hover»).
 * Плитки приглушены (grayscale), под курсором расцветают, увеличиваются и
 * выдвигают подпись; соседи слегка тускнеют. На тач-устройствах плитки
 * подсвечиваются по очереди ([data-hover-cycle] в widgets-runtime).
 */
export const block: BlockPreset = {
  id: "gallery-hover-grid-01",
  name: "Живая сетка",
  description: "Сетка приглушённых плиток, которые расцветают и выдвигают подпись под курсором. На мобильных оживают по очереди сами. Портфолио, услуги, кейсы.",
  category: "gallery",
  subcategory: "hover-grid",
  icon: "▦",
  tags: ["gallery", "hover", "grid", "reveal", "interactive", "cursor", "wow", "portfolio"],
  motionLevel: "css",
  fields: [
    { name: "hg01-eyebrow", type: "text", hint: "рубрика, 2-4 слова", required: false },
    { name: "hg01-title", type: "heading", hint: "заголовок секции, 2-6 слов", required: true },
    { name: "hg01-tile-image", type: "image", hint: "изображение плитки", required: true },
    { name: "hg01-tile-label", type: "text", hint: "категория, 1-2 слова", required: false },
    { name: "hg01-tile-name", type: "heading", hint: "название, 2-4 слова", required: true },
  ],
  html: `<section class="b-hg01" data-block="gallery">
  <div class="b-hg01__inner">
    <header class="b-hg01__head">
      <span class="b-hg01__eyebrow" data-field="hg01-eyebrow" data-reveal="fade">Избранное</span>
      <h2 class="b-hg01__title" data-field="hg01-title" data-reveal="word">Наведите — оживёт</h2>
    </header>
    <div class="b-hg01__grid" data-hover-cycle data-collection="hg01-tiles">
      <article class="b-hg01__tile" data-hc-tile data-collection-item data-reveal="up" style="--stagger:0">
        <img data-field="hg01-tile-image" src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80" alt="" />
        <div class="b-hg01__meta"><span data-field="hg01-tile-label">Брендинг</span><h3 data-field="hg01-tile-name">Сеть кофеен</h3></div>
      </article>
      <article class="b-hg01__tile" data-hc-tile data-collection-item data-reveal="up" style="--stagger:1">
        <img data-field="hg01-tile-image" src="https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=800&q=80" alt="" />
        <div class="b-hg01__meta"><span data-field="hg01-tile-label">Веб</span><h3 data-field="hg01-tile-name">Платформа</h3></div>
      </article>
      <article class="b-hg01__tile" data-hc-tile data-collection-item data-reveal="up" style="--stagger:2">
        <img data-field="hg01-tile-image" src="https://images.unsplash.com/photo-1493421419110-74f4e85ba126?auto=format&fit=crop&w=800&q=80" alt="" />
        <div class="b-hg01__meta"><span data-field="hg01-tile-label">Айдентика</span><h3 data-field="hg01-tile-name">Фестиваль</h3></div>
      </article>
      <article class="b-hg01__tile" data-hc-tile data-collection-item data-reveal="up" style="--stagger:3">
        <img data-field="hg01-tile-image" src="https://images.unsplash.com/photo-1478358161113-b0e11994a36b?auto=format&fit=crop&w=800&q=80" alt="" />
        <div class="b-hg01__meta"><span data-field="hg01-tile-label">Кампания</span><h3 data-field="hg01-tile-name">Запуск</h3></div>
      </article>
      <article class="b-hg01__tile" data-hc-tile data-collection-item data-reveal="up" style="--stagger:4">
        <img data-field="hg01-tile-image" src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80" alt="" />
        <div class="b-hg01__meta"><span data-field="hg01-tile-label">Тревел</span><h3 data-field="hg01-tile-name">Маршруты</h3></div>
      </article>
      <article class="b-hg01__tile" data-hc-tile data-collection-item data-reveal="up" style="--stagger:5">
        <img data-field="hg01-tile-image" src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80" alt="" />
        <div class="b-hg01__meta"><span data-field="hg01-tile-label">Эко</span><h3 data-field="hg01-tile-name">Ферма</h3></div>
      </article>
    </div>
  </div>
</section>`,
  css: `.b-hg01{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-hg01__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-hg01__head{margin-bottom:2.5rem}
.b-hg01__eyebrow{display:block;font-family:var(--font-body);font-size:.8125rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--color-accent);margin-bottom:.75rem}
.b-hg01__title{font-family:var(--font-heading);font-size:clamp(1.85rem,3.6vw,2.9rem);letter-spacing:-.02em;color:var(--color-text);margin:0}
.b-hg01__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
.b-hg01__tile{position:relative;aspect-ratio:4/5;border-radius:var(--radius-lg);overflow:hidden;cursor:pointer;transition:transform .45s cubic-bezier(.16,1,.3,1),filter .45s,box-shadow .45s}
.b-hg01__tile img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) brightness(.72);transition:filter .5s,transform .7s cubic-bezier(.16,1,.3,1)}
.b-hg01__grid:hover .b-hg01__tile{filter:brightness(.6)}
.b-hg01__grid .b-hg01__tile:hover,.b-hg01__tile.is-active{filter:none;transform:translateY(-6px) scale(1.02);box-shadow:0 30px 60px -25px color-mix(in srgb,var(--color-text) 40%,transparent);z-index:2}
.b-hg01__tile:hover img,.b-hg01__tile.is-active img{filter:none;transform:scale(1.08)}
.b-hg01__meta{position:absolute;left:0;right:0;bottom:0;padding:1.5rem 1.25rem 1.1rem;background:linear-gradient(to top,rgba(8,8,12,.82),transparent);transform:translateY(38%);opacity:0;transition:transform .45s cubic-bezier(.16,1,.3,1),opacity .45s}
.b-hg01__tile:hover .b-hg01__meta,.b-hg01__tile.is-active .b-hg01__meta{transform:none;opacity:1}
.b-hg01__meta span{font-family:var(--font-body);font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--color-accent)}
.b-hg01__meta h3{font-family:var(--font-heading);font-size:1.25rem;color:#fff;margin:.25rem 0 0}
@media(max-width:768px){.b-hg01__grid{grid-template-columns:repeat(2,1fr);gap:.6rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-hg01{background:#0a0a0f}.b-hg01__title{color:#fff}` },
  ],
};
