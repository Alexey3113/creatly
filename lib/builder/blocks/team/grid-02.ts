import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "team-grid-02",
  name: "Команда — круглые фото, минимализм",
  description: "3 карточки с круглыми фотографиями, имя и должность по центру. Чистый минимальный стиль.",
  category: "team",
  subcategory: "grid",
  icon: "◆",
  tags: ["grid", "round", "minimal", "centered", "team"],
  motionLevel: "css",
  fields: [
    { name: "team2-title", type: "heading", hint: "заголовок секции 2-5 слов", required: true },
    { name: "team2-subtitle", type: "text", hint: "подзаголовок секции 1-2 предложения", required: false },
    { name: "member2-photo", type: "image", hint: "портретное фото (будет круглым)", required: true },
    { name: "member2-name", type: "heading", hint: "имя и фамилия", required: true },
    { name: "member2-role", type: "text", hint: "должность 2-4 слова", required: true },
  ],
  html: `<section class="b-te02" data-block="team">
  <div class="b-te02__inner">
    <h2 class="b-te02__title" data-field="team2-title" data-reveal="up">Люди за проектом</h2>
    <p class="b-te02__subtitle" data-field="team2-subtitle" data-reveal="fade" style="--stagger:1">Каждый участник привносит уникальный опыт и страсть к своему делу.</p>
    <div class="b-te02__grid" data-collection="team-members-round">
      <div class="b-te02__card" data-collection-item data-reveal="scale" style="--stagger:0">
        <img class="b-te02__avatar" data-field="member2-photo" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face" alt="Игорь Новиков" />
        <h3 data-field="member2-name">Игорь Новиков</h3>
        <p class="b-te02__role" data-field="member2-role">Основатель и CEO</p>
      </div>
      <div class="b-te02__card" data-collection-item data-reveal="scale" style="--stagger:1">
        <img class="b-te02__avatar" data-field="member2-photo" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face" alt="Анна Морозова" />
        <h3 data-field="member2-name">Анна Морозова</h3>
        <p class="b-te02__role" data-field="member2-role">Арт-директор</p>
      </div>
      <div class="b-te02__card" data-collection-item data-reveal="scale" style="--stagger:2">
        <img class="b-te02__avatar" data-field="member2-photo" src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=300&fit=crop&crop=face" alt="Сергей Кузнецов" />
        <h3 data-field="member2-name">Сергей Кузнецов</h3>
        <p class="b-te02__role" data-field="member2-role">Ведущий разработчик</p>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-te02{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-te02__inner{max-width:var(--container-width,1400px);margin:0 auto;text-align:center}
.b-te02__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem;letter-spacing:-0.02em}
.b-te02__subtitle{font-family:var(--font-body);font-size:1.0625rem;color:var(--color-text-muted);max-width:520px;margin:0 auto 3.5rem;line-height:1.6}
.b-te02__grid{display:grid;grid-template-columns:1fr;gap:3rem}
.b-te02__card{display:flex;flex-direction:column;align-items:center}
.b-te02__avatar{width:160px;height:160px;border-radius:var(--radius-full);object-fit:cover;margin-bottom:1.25rem;transition:transform .4s cubic-bezier(.16,1,.3,1);border:4px solid var(--color-border)}
.b-te02__card:hover .b-te02__avatar{transform:scale(1.06)}
.b-te02__card h3{font-family:var(--font-heading);font-size:1.125rem;color:var(--color-text);margin:0 0 .25rem;letter-spacing:-0.01em}
.b-te02__role{font-family:var(--font-body);font-size:.875rem;color:var(--color-text-muted);margin:0;line-height:1.5}
@media(min-width:768px){.b-te02__grid{grid-template-columns:repeat(3,1fr);gap:2.5rem}.b-te02__avatar{width:180px;height:180px}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "surface", label: "На подложке", css: `.b-te02{background:var(--color-bg-alt)}.b-te02__card{background:var(--color-surface);border-radius:var(--radius-lg);padding:2.5rem 2rem}` },
    { id: "accent-ring", label: "Акцентная рамка", css: `.b-te02__avatar{border-color:var(--color-accent)}` },
  ],
};
