import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "team-bento-01",
  name: "Команда — bento: CEO крупно + 3 маленьких",
  description: "Bento-сетка: одна крупная карточка CEO (2 строки) + 3 компактные карточки рядом.",
  category: "team",
  subcategory: "bento",
  icon: "◆",
  tags: ["bento", "featured", "grid", "asymmetric", "team"],
  motionLevel: "css",
  fields: [
    { name: "team4-title", type: "heading", hint: "заголовок секции 2-5 слов", required: true },
    { name: "member4-photo", type: "image", hint: "портретное фото участника", required: true },
    { name: "member4-name", type: "heading", hint: "имя и фамилия", required: true },
    { name: "member4-role", type: "text", hint: "должность 2-4 слова", required: true },
    { name: "member4-bio", type: "text", hint: "краткое био 1-2 предложения", required: false },
  ],
  html: `<section class="b-te04" data-block="team">
  <div class="b-te04__inner">
    <h2 class="b-te04__title" data-field="team4-title" data-reveal="up">Руководство</h2>
    <div class="b-te04__bento" data-collection="team-members-bento">
      <div class="b-te04__card b-te04__card--featured" data-collection-item data-reveal="clip" style="--stagger:0">
        <img class="b-te04__photo" data-field="member4-photo" src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=800&fit=crop&crop=face" alt="Николай Орлов" />
        <div class="b-te04__overlay">
          <h3 data-field="member4-name">Николай Орлов</h3>
          <p class="b-te04__role" data-field="member4-role">Генеральный директор</p>
          <p class="b-te04__bio" data-field="member4-bio">15 лет в индустрии. Построил три компании с нуля, привлёк более $50M инвестиций.</p>
        </div>
      </div>
      <div class="b-te04__card" data-collection-item data-reveal="clip" style="--stagger:1">
        <img class="b-te04__photo" data-field="member4-photo" src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=face" alt="Татьяна Белова" />
        <div class="b-te04__overlay">
          <h3 data-field="member4-name">Татьяна Белова</h3>
          <p class="b-te04__role" data-field="member4-role">Финансовый директор</p>
        </div>
      </div>
      <div class="b-te04__card" data-collection-item data-reveal="clip" style="--stagger:2">
        <img class="b-te04__photo" data-field="member4-photo" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face" alt="Максим Егоров" />
        <div class="b-te04__overlay">
          <h3 data-field="member4-name">Максим Егоров</h3>
          <p class="b-te04__role" data-field="member4-role">Директор по развитию</p>
        </div>
      </div>
      <div class="b-te04__card" data-collection-item data-reveal="clip" style="--stagger:3">
        <img class="b-te04__photo" data-field="member4-photo" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face" alt="Наталья Иванова" />
        <div class="b-te04__overlay">
          <h3 data-field="member4-name">Наталья Иванова</h3>
          <p class="b-te04__role" data-field="member4-role">Операционный директор</p>
        </div>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-te04{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-te04__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-te04__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 2.5rem;letter-spacing:-0.02em;text-align:center}
.b-te04__bento{display:grid;grid-template-columns:1fr;gap:1.25rem}
.b-te04__card{position:relative;border-radius:var(--radius-lg);overflow:hidden;aspect-ratio:1/1}
.b-te04__card--featured{aspect-ratio:3/4}
.b-te04__photo{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s cubic-bezier(.16,1,.3,1)}
.b-te04__card:hover .b-te04__photo{transform:scale(1.05)}
.b-te04__overlay{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;padding:1.5rem;background:linear-gradient(to top,color-mix(in srgb,var(--color-primary) 85%,transparent) 0%,transparent 60%)}
.b-te04__overlay h3{font-family:var(--font-heading);font-size:1.125rem;color:var(--color-text-on-primary);margin:0 0 .2rem}
.b-te04__role{font-family:var(--font-body);font-size:.8125rem;color:color-mix(in srgb,var(--color-text-on-primary) 75%,transparent);margin:0}
.b-te04__bio{font-family:var(--font-body);font-size:.8125rem;color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent);margin:.5rem 0 0;line-height:1.5}
.b-te04__card:not(.b-te04__card--featured) .b-te04__bio{display:none}
@media(min-width:768px){.b-te04__bento{grid-template-columns:repeat(2,1fr)}.b-te04__card--featured{grid-row:span 2;aspect-ratio:auto}}
@media(min-width:1024px){.b-te04__bento{grid-template-columns:1fr 1fr 1fr}.b-te04__card--featured{grid-row:span 2;grid-column:1}.b-te04__overlay h3{font-size:1.25rem}.b-te04__card--featured .b-te04__overlay{padding:2rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-te04{background:var(--color-primary)}.b-te04__title{color:var(--color-text-on-primary)}` },
    { id: "rounded", label: "Скруглённый", css: `.b-te04__card{border-radius:var(--radius-lg)}` },
  ],
};
