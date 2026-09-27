import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-cards-05",
  name: "Hero — стопка карточек",
  description: "Текст по центру, под ним три карточки-превью со сдвигом, накладываются друг на друга",
  category: "hero",
  subcategory: "cards",
  icon: "◧",
  tags: ["cards", "stacked", "overlap", "portfolio", "showcase"],
  motionLevel: "css",
  fields: [
    { name: "hero-title", type: "heading", hint: "заголовок", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание", required: true },
    { name: "hero-cta", type: "link", hint: "CTA", required: true },
    { name: "hero-stack-1", type: "image", hint: "карточка 1 (передний план)", required: true },
    { name: "hero-stack-2", type: "image", hint: "карточка 2 (средний план)", required: true },
    { name: "hero-stack-3", type: "image", hint: "карточка 3 (задний план)", required: true },
  ],
  html: `<section class="b-hca05" data-block="hero">
  <div class="b-hca05__inner">
    <div class="b-hca05__text">
      <h1 data-field="hero-title" data-reveal="up">Портфолио, которое продаёт ваш талант</h1>
      <p data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">Покажите лучшие работы в один клик. Персональный сайт за 2 минуты.</p>
      <a class="b-btn" href="#" data-field="hero-cta" data-reveal="fade" style="--stagger:2">Создать портфолио</a>
    </div>
    <div class="b-hca05__stack" data-reveal="scale">
      <img class="b-hca05__img b-hca05__img--3" data-field="hero-stack-3" src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=600&q=80" alt="Работа 3" />
      <img class="b-hca05__img b-hca05__img--2" data-field="hero-stack-2" src="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80" alt="Работа 2" />
      <img class="b-hca05__img b-hca05__img--1" data-field="hero-stack-1" src="https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=600&q=80" alt="Работа 1" />
    </div>
  </div>
</section>`,
  css: `.b-hca05{padding:var(--space-section) var(--space-block);background:var(--color-bg);text-align:center}
.b-hca05__inner{max-width:900px;margin:0 auto}
.b-hca05 h1{font-family:var(--font-heading);font-size:clamp(2.25rem,4.5vw,3.5rem);color:var(--color-text);margin:0 0 1rem;line-height:1.1}
.b-hca05__text p{font-family:var(--font-body);color:var(--color-text-muted);font-size:1.125rem;line-height:1.6;max-width:500px;margin:0 auto 2rem}
.b-hca05__stack{position:relative;width:100%;max-width:500px;margin:3rem auto 0;aspect-ratio:4/3}
.b-hca05__img{position:absolute;width:85%;border-radius:var(--radius-lg);object-fit:cover;aspect-ratio:4/3;box-shadow:0 16px 48px rgba(0,0,0,.12);transition:transform .5s cubic-bezier(.16,1,.3,1)}
.b-hca05__img--3{top:0;left:0;transform:rotate(-4deg) translate(-8%,8%);z-index:1}
.b-hca05__img--2{top:0;left:0;transform:rotate(2deg) translate(4%,4%);z-index:2}
.b-hca05__img--1{top:0;left:0;transform:rotate(0deg);z-index:3}
.b-hca05__stack:hover .b-hca05__img--3{transform:rotate(-6deg) translate(-14%,12%)}
.b-hca05__stack:hover .b-hca05__img--2{transform:rotate(4deg) translate(8%,6%)}
@media(max-width:767px){.b-hca05{padding:3rem 1.25rem}.b-hca05__stack{max-width:320px;margin-top:2rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-hca05{background:var(--color-primary)}.b-hca05 h1{color:var(--color-text-on-primary)}.b-hca05__text p{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}` },
  ],
};
