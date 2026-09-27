import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "team-minimal-01",
  name: "Команда — минимализм, только текст",
  description: "Только имена и должности без фотографий. Тонкие разделители, чистая типографика.",
  category: "team",
  subcategory: "minimal",
  icon: "◆",
  tags: ["minimal", "text-only", "clean", "typography", "team"],
  motionLevel: "css",
  fields: [
    { name: "team6-title", type: "heading", hint: "заголовок секции 2-5 слов", required: true },
    { name: "team6-subtitle", type: "text", hint: "подзаголовок секции 1-2 предложения", required: false },
    { name: "member6-name", type: "heading", hint: "имя и фамилия", required: true },
    { name: "member6-role", type: "text", hint: "должность 2-4 слова", required: true },
  ],
  html: `<section class="b-te06" data-block="team">
  <div class="b-te06__inner">
    <div class="b-te06__header" data-reveal="up">
      <h2 data-field="team6-title">Команда</h2>
      <p data-field="team6-subtitle" style="--stagger:1">Эксперты, которые делают проекты реальностью.</p>
    </div>
    <div class="b-te06__list" data-collection="team-members-minimal">
      <div class="b-te06__item" data-collection-item data-reveal="fade" style="--stagger:0">
        <h3 data-field="member6-name">Алексей Петров</h3>
        <span class="b-te06__role" data-field="member6-role">Генеральный директор</span>
      </div>
      <div class="b-te06__item" data-collection-item data-reveal="fade" style="--stagger:1">
        <h3 data-field="member6-name">Мария Соколова</h3>
        <span class="b-te06__role" data-field="member6-role">Креативный директор</span>
      </div>
      <div class="b-te06__item" data-collection-item data-reveal="fade" style="--stagger:2">
        <h3 data-field="member6-name">Дмитрий Волков</h3>
        <span class="b-te06__role" data-field="member6-role">Технический директор</span>
      </div>
      <div class="b-te06__item" data-collection-item data-reveal="fade" style="--stagger:3">
        <h3 data-field="member6-name">Елена Козлова</h3>
        <span class="b-te06__role" data-field="member6-role">Руководитель дизайна</span>
      </div>
      <div class="b-te06__item" data-collection-item data-reveal="fade" style="--stagger:4">
        <h3 data-field="member6-name">Сергей Кузнецов</h3>
        <span class="b-te06__role" data-field="member6-role">Ведущий разработчик</span>
      </div>
      <div class="b-te06__item" data-collection-item data-reveal="fade" style="--stagger:5">
        <h3 data-field="member6-name">Анна Морозова</h3>
        <span class="b-te06__role" data-field="member6-role">Менеджер проектов</span>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-te06{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-te06__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-te06__header{margin-bottom:3rem}
.b-te06__header h2{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem;letter-spacing:-0.02em}
.b-te06__header p{font-family:var(--font-body);font-size:1.0625rem;color:var(--color-text-muted);margin:0;line-height:1.6;max-width:480px}
.b-te06__list{display:flex;flex-direction:column}
.b-te06__item{display:flex;flex-direction:column;gap:.25rem;padding:1.25rem 0;border-bottom:1px solid var(--color-border);transition:padding-left .3s cubic-bezier(.16,1,.3,1)}
.b-te06__item:first-child{border-top:1px solid var(--color-border)}
.b-te06__item:hover{padding-left:1rem}
.b-te06__item h3{font-family:var(--font-heading);font-size:1.125rem;color:var(--color-text);margin:0;letter-spacing:-0.01em;transition:color .2s}
.b-te06__item:hover h3{color:var(--color-primary)}
.b-te06__role{font-family:var(--font-body);font-size:.8125rem;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:.06em}
@media(min-width:768px){.b-te06__item{flex-direction:row;align-items:baseline;justify-content:space-between;gap:2rem;padding:1.5rem 0}.b-te06__item h3{font-size:1.25rem}.b-te06__role{font-size:.875rem}}
@media(min-width:1024px){.b-te06__item{padding:1.75rem 0}.b-te06__item h3{font-size:1.375rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-te06{background:var(--color-primary)}.b-te06__header h2{color:var(--color-text-on-primary)}.b-te06__header p{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-te06__item h3{color:var(--color-text-on-primary)}.b-te06__item:hover h3{color:var(--color-accent)}.b-te06__role{color:color-mix(in srgb,var(--color-text-on-primary) 55%,transparent)}.b-te06__item{border-color:color-mix(in srgb,var(--color-text-on-primary) 12%,transparent)}` },
    { id: "numbered", label: "С нумерацией", css: `.b-te06__item{counter-increment:team-member;position:relative;padding-left:3rem}.b-te06__item:hover{padding-left:3.5rem}.b-te06__item::before{content:counter(team-member,decimal-leading-zero);position:absolute;left:0;top:50%;transform:translateY(-50%);font-family:var(--font-body);font-size:.75rem;color:var(--color-text-muted);letter-spacing:.04em}.b-te06__list{counter-reset:team-member}` },
  ],
};
