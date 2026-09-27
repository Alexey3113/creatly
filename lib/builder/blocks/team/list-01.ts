import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "team-list-01",
  name: "Команда — горизонтальный список с hover-био",
  description: "Горизонтальные строки: фото + имя + должность. При hover раскрывается биография.",
  category: "team",
  subcategory: "list",
  icon: "◆",
  tags: ["list", "horizontal", "hover", "expandable", "team"],
  motionLevel: "css",
  fields: [
    { name: "team5-title", type: "heading", hint: "заголовок секции 2-5 слов", required: true },
    { name: "member5-photo", type: "image", hint: "портретное фото участника", required: true },
    { name: "member5-name", type: "heading", hint: "имя и фамилия", required: true },
    { name: "member5-role", type: "text", hint: "должность 2-4 слова", required: true },
    { name: "member5-bio", type: "text", hint: "краткое био 1-2 предложения", required: false },
  ],
  html: `<section class="b-te05" data-block="team">
  <div class="b-te05__inner">
    <h2 class="b-te05__title" data-field="team5-title" data-reveal="word">Кто мы</h2>
    <div class="b-te05__list" data-collection="team-members-list">
      <div class="b-te05__row" data-collection-item data-reveal="up" style="--stagger:0">
        <img class="b-te05__photo" data-field="member5-photo" src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face" alt="Павел Громов" />
        <div class="b-te05__main">
          <h3 data-field="member5-name">Павел Громов</h3>
          <p class="b-te05__role" data-field="member5-role">Стратегический директор</p>
        </div>
        <p class="b-te05__bio" data-field="member5-bio">Более 12 лет в консалтинге. Работал с Fortune 500 компаниями, специализируется на цифровой трансформации.</p>
      </div>
      <div class="b-te05__row" data-collection-item data-reveal="up" style="--stagger:1">
        <img class="b-te05__photo" data-field="member5-photo" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face" alt="Ксения Давыдова" />
        <div class="b-te05__main">
          <h3 data-field="member5-name">Ксения Давыдова</h3>
          <p class="b-te05__role" data-field="member5-role">Директор по маркетингу</p>
        </div>
        <p class="b-te05__bio" data-field="member5-bio">Эксперт в growth-маркетинге. Увеличила выручку предыдущей компании в 4 раза за 18 месяцев.</p>
      </div>
      <div class="b-te05__row" data-collection-item data-reveal="up" style="--stagger:2">
        <img class="b-te05__photo" data-field="member5-photo" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" alt="Роман Васильев" />
        <div class="b-te05__main">
          <h3 data-field="member5-name">Роман Васильев</h3>
          <p class="b-te05__role" data-field="member5-role">Технический лид</p>
        </div>
        <p class="b-te05__bio" data-field="member5-bio">Full-stack разработчик с опытом в высоконагруженных системах. Open-source контрибьютор.</p>
      </div>
      <div class="b-te05__row" data-collection-item data-reveal="up" style="--stagger:3">
        <img class="b-te05__photo" data-field="member5-photo" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face" alt="Дарья Попова" />
        <div class="b-te05__main">
          <h3 data-field="member5-name">Дарья Попова</h3>
          <p class="b-te05__role" data-field="member5-role">Руководитель проектов</p>
        </div>
        <p class="b-te05__bio" data-field="member5-bio">Сертифицированный PMP. Провела более 80 проектов от идеи до запуска без срыва дедлайнов.</p>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-te05{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-te05__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-te05__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 2.5rem;letter-spacing:-0.02em}
.b-te05__list{display:flex;flex-direction:column;gap:0}
.b-te05__row{display:grid;grid-template-columns:56px 1fr;grid-template-rows:auto 0fr;gap:0 1rem;align-items:center;padding:1.25rem 0;border-bottom:1px solid var(--color-border);transition:grid-template-rows .35s cubic-bezier(.16,1,.3,1)}
.b-te05__row:first-child{border-top:1px solid var(--color-border)}
.b-te05__row:hover{grid-template-rows:auto 1fr}
.b-te05__photo{width:56px;height:56px;border-radius:var(--radius-full);object-fit:cover;grid-row:1}
.b-te05__main{display:flex;flex-direction:column;gap:.125rem;grid-row:1}
.b-te05__main h3{font-family:var(--font-heading);font-size:1rem;color:var(--color-text);margin:0}
.b-te05__role{font-family:var(--font-body);font-size:.8125rem;color:var(--color-text-muted);margin:0}
.b-te05__bio{font-family:var(--font-body);font-size:.875rem;color:var(--color-text-muted);margin:0;line-height:1.6;grid-column:2;overflow:hidden;opacity:0;transition:opacity .3s ease .1s}
.b-te05__row:hover .b-te05__bio{opacity:1}
@media(min-width:768px){.b-te05__row{grid-template-columns:64px 200px 1fr;gap:0 1.5rem}.b-te05__photo{width:64px;height:64px}.b-te05__main{flex-direction:row;gap:1rem;align-items:baseline}.b-te05__bio{grid-column:3;grid-row:1;opacity:0;overflow:hidden}.b-te05__row:hover .b-te05__bio{opacity:1}.b-te05__row{grid-template-rows:auto}}
@media(min-width:1024px){.b-te05__row{grid-template-columns:72px 260px 1fr;gap:0 2rem;padding:1.5rem 0}.b-te05__photo{width:72px;height:72px}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-te05{background:var(--color-primary)}.b-te05__title{color:var(--color-text-on-primary)}.b-te05__main h3{color:var(--color-text-on-primary)}.b-te05__role{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}.b-te05__bio{color:color-mix(in srgb,var(--color-text-on-primary) 60%,transparent)}.b-te05__row{border-color:color-mix(in srgb,var(--color-text-on-primary) 15%,transparent)}` },
    { id: "compact", label: "Компактный", css: `.b-te05__row{padding:.875rem 0}.b-te05__photo{width:44px;height:44px}` },
  ],
};
