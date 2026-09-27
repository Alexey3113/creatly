import type { BlockPreset } from "../_types";

/**
 * Галерея: полка парящих объектов. Витрина вырезанных PNG-предметов
 * (материалы, фурнитура, детали продукта): каждый висит в воздухе с мягкой
 * тенью и своим ритмом покачивания, hover приподнимает. Блок создан под
 * cutout-эстетику конвейера (remove-background) — но работает и с фото.
 */
export const block: BlockPreset = {
  id: "gallery-objects-01",
  name: "Полка объектов",
  description: "Парящие вырезанные предметы (PNG-силуэты) с подписями: материалы, фурнитура, детали — у каждого свой ритм покачивания, hover приподнимает. Идеален после глав истории как «потрогать руками».",
  category: "gallery",
  subcategory: "objects",
  icon: "✦",
  tags: ["gallery", "objects", "cutout", "materials", "float", "premium", "wow", "collection"],
  motionLevel: "css",
  fields: [
    { name: "gob-eyebrow", type: "text", hint: "надзаголовок секции", required: false },
    { name: "gob-title", type: "heading", hint: "заголовок секции; *слово* — курсив", required: true },
    { name: "gob-item-image", type: "image", hint: "вырезанный предмет (PNG с прозрачностью) или фото", required: true },
    { name: "gob-item-name", type: "text", hint: "название предмета, 1-3 слова", required: true },
    { name: "gob-item-note", type: "text", hint: "подпись: материал/происхождение, 3-8 слов", required: false },
  ],
  html: `<section class="b-gob" data-block="gallery">
  <div class="b-gob__head">
    <span class="b-gob__eyebrow" data-field="gob-eyebrow">Материалы</span>
    <h2 class="b-gob__title" data-field="gob-title">Из чего собран *ваш дом*</h2>
  </div>
  <div class="b-gob__grid" data-collection="gob-items">
    <figure class="b-gob__item" data-collection-item>
      <div class="b-gob__obj"><img data-field="gob-item-image" src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80" alt="" /></div>
      <figcaption>
        <b class="b-gob__name" data-field="gob-item-name">Орех американский</b>
        <span class="b-gob__note" data-field="gob-item-note">Массив и шпон, масло-воск</span>
      </figcaption>
    </figure>
    <figure class="b-gob__item" data-collection-item>
      <div class="b-gob__obj"><img data-field="gob-item-image" src="https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=700&q=80" alt="" /></div>
      <figcaption>
        <b class="b-gob__name" data-field="gob-item-name">Латунь</b>
        <span class="b-gob__note" data-field="gob-item-note">Фурнитура собственного литья</span>
      </figcaption>
    </figure>
    <figure class="b-gob__item" data-collection-item>
      <div class="b-gob__obj"><img data-field="gob-item-image" src="https://images.unsplash.com/photo-1620812097331-ff636155488f?auto=format&fit=crop&w=700&q=80" alt="" /></div>
      <figcaption>
        <b class="b-gob__name" data-field="gob-item-name">Бархат</b>
        <span class="b-gob__note" data-field="gob-item-note">Обивка, 40 000 циклов истирания</span>
      </figcaption>
    </figure>
    <figure class="b-gob__item" data-collection-item>
      <div class="b-gob__obj"><img data-field="gob-item-image" src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80" alt="" /></div>
      <figcaption>
        <b class="b-gob__name" data-field="gob-item-name">Лён</b>
        <span class="b-gob__note" data-field="gob-item-note">Текстиль натурального плетения</span>
      </figcaption>
    </figure>
  </div>
</section>`,
  css: `.b-gob{padding:var(--space-section) var(--space-block);background:var(--color-bg-alt)}
.b-gob__head{max-width:var(--container-width);margin:0 auto clamp(2.5rem,6vh,4rem)}
.b-gob__eyebrow{display:block;font-family:var(--font-body);font-size:.8125rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--color-accent);margin-bottom:.9rem}
.b-gob__title{font-family:var(--font-heading);font-size:clamp(1.9rem,3.6vw,3rem);line-height:1.08;letter-spacing:-.02em;color:var(--color-text);margin:0;max-width:640px}
.b-gob__title em{font-style:italic;color:var(--color-accent)}
.b-gob__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(1.2rem,2.5vw,2.4rem);max-width:var(--container-width);margin:0 auto}
.b-gob__item{margin:0;text-align:center}
.b-gob__obj{height:clamp(150px,17vw,230px);display:flex;align-items:center;justify-content:center;margin-bottom:1.1rem;transition:transform .45s cubic-bezier(.16,1,.3,1)}
.b-gob__obj img{max-width:88%;max-height:100%;object-fit:contain;filter:drop-shadow(0 26px 30px rgba(0,0,0,.42));animation:gob-float 7s ease-in-out infinite}
.b-gob__item:nth-child(2) .b-gob__obj img{animation-duration:8.4s;animation-delay:-2.1s}
.b-gob__item:nth-child(3) .b-gob__obj img{animation-duration:6.2s;animation-delay:-3.4s}
.b-gob__item:nth-child(4) .b-gob__obj img{animation-duration:9.1s;animation-delay:-1.2s}
@keyframes gob-float{0%,100%{transform:translateY(0) rotate(-1.6deg)}50%{transform:translateY(-11px) rotate(1.8deg)}}
.b-gob__item:hover .b-gob__obj{transform:translateY(-8px)}
.b-gob__name{display:block;font-family:var(--font-heading);font-size:1.15rem;font-weight:600;color:var(--color-text);margin-bottom:.3rem}
.b-gob__note{font-family:var(--font-body);font-size:.86rem;line-height:1.5;color:var(--color-text-muted)}
@media(max-width:819px){.b-gob__grid{grid-template-columns:repeat(2,1fr)}}
@media(prefers-reduced-motion:reduce){.b-gob__obj img{animation:none}}`,
  variants: [
    { id: "dark", label: "Тёмная", css: "" },
    { id: "light", label: "Светлая", css: `.b-gob{background:var(--color-bg)}` },
  ],
};
