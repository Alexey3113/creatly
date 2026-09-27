import type { BlockPreset } from "../_types";

/**
 * Storytelling: стек карточек внахлёст.
 * Тот же sticky-pin движок story-runtime (0 изменений в рантайме) — только
 * своя CSS-хореография классов .is-active/.is-passed: следующая карточка
 * наезжает поверх предыдущей, а пройденные остаются видны стопкой позади,
 * приглушённые и слегка повёрнутые — глубина без единого JS-эффекта.
 */
export const block: BlockPreset = {
  id: "story-stack-01",
  name: "Стек карточек",
  description: "Карточки процесса/этапов сменяют друг друга внахлёст на прилипшем экране — пройденные остаются видны стопкой позади. Хорошо для «как мы работаем» и пошаговых кейсов.",
  category: "story",
  subcategory: "stack",
  icon: "▤",
  tags: ["storytelling", "stack", "cards", "process", "pin", "scroll", "wow"],
  motionLevel: "css",
  fields: [
    { name: "ss01-eyebrow", type: "text", hint: "рубрика секции, 2-4 слова", required: false },
    { name: "ss01-title", type: "heading", hint: "заголовок секции, 2-6 слов", required: true },
    { name: "ss01-card-image", type: "image", hint: "изображение карточки", required: true },
    { name: "ss01-card-tag", type: "text", hint: "метка этапа («Этап 01»)", required: false },
    { name: "ss01-card-title", type: "heading", hint: "название этапа, 2-5 слов", required: true },
    { name: "ss01-card-text", type: "text", hint: "описание этапа, 1-2 предложения", required: false },
  ],
  html: `<section class="b-ss01" data-block="story" data-story>
  <div class="b-ss01__stage" data-story-stage>
    <header class="b-ss01__head">
      <span class="b-ss01__eyebrow" data-field="ss01-eyebrow">Как мы работаем</span>
      <h2 class="b-ss01__title" data-field="ss01-title">Четыре этапа одного проекта</h2>
    </header>
    <div class="b-ss01__deck" data-collection="ss01-cards">
      <article class="b-ss01__card" data-collection-item data-story-step>
        <img class="b-ss01__img" data-field="ss01-card-image" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80" alt="" />
        <div class="b-ss01__body">
          <span class="b-ss01__tag" data-field="ss01-card-tag">Этап 01</span>
          <h3 class="b-ss01__name" data-field="ss01-card-title">Погружение в задачу</h3>
          <p class="b-ss01__text" data-field="ss01-card-text">Разбираем цели, аудиторию и ограничения — до того как открыть редактор.</p>
        </div>
      </article>
      <article class="b-ss01__card" data-collection-item data-story-step>
        <img class="b-ss01__img" data-field="ss01-card-image" src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80" alt="" />
        <div class="b-ss01__body">
          <span class="b-ss01__tag" data-field="ss01-card-tag">Этап 02</span>
          <h3 class="b-ss01__name" data-field="ss01-card-title">Концепция и прототип</h3>
          <p class="b-ss01__text" data-field="ss01-card-text">Собираем каркас решения и проверяем его на реальном сценарии использования.</p>
        </div>
      </article>
      <article class="b-ss01__card" data-collection-item data-story-step>
        <img class="b-ss01__img" data-field="ss01-card-image" src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80" alt="" />
        <div class="b-ss01__body">
          <span class="b-ss01__tag" data-field="ss01-card-tag">Этап 03</span>
          <h3 class="b-ss01__name" data-field="ss01-card-title">Реализация</h3>
          <p class="b-ss01__text" data-field="ss01-card-text">Доводим детали до продакшн-качества: анимации, отклик интерфейса, крайние случаи.</p>
        </div>
      </article>
      <article class="b-ss01__card" data-collection-item data-story-step>
        <img class="b-ss01__img" data-field="ss01-card-image" src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80" alt="" />
        <div class="b-ss01__body">
          <span class="b-ss01__tag" data-field="ss01-card-tag">Этап 04</span>
          <h3 class="b-ss01__name" data-field="ss01-card-title">Запуск и поддержка</h3>
          <p class="b-ss01__text" data-field="ss01-card-text">Публикуем, следим за метриками и дорабатываем по фактическому поведению пользователей.</p>
        </div>
      </article>
    </div>
    <div class="b-ss01__hud">
      <span class="b-ss01__counter" data-story-counter>01 / 04</span>
      <div class="b-ss01__bar"><div class="b-ss01__bar-fill" data-story-bar></div></div>
    </div>
  </div>
</section>`,
  css: `.b-ss01{position:relative;height:400vh;background:var(--color-bg)}
.b-ss01__stage{position:sticky;top:0;height:100vh;overflow:hidden;display:flex;flex-direction:column;justify-content:center;padding:0 var(--space-block)}
.b-ss01__head{position:absolute;top:clamp(1.5rem,5vh,3rem);left:var(--space-block);right:var(--space-block);z-index:5;text-align:center}
.b-ss01__eyebrow{font-family:var(--font-body);font-size:.75rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--color-accent)}
.b-ss01__title{font-family:var(--font-heading);font-size:clamp(1.5rem,3vw,2.5rem);letter-spacing:-.02em;color:var(--color-text);margin:.5rem 0 0}
.b-ss01__deck{position:relative;max-width:760px;width:100%;margin:0 auto;height:min(60vh,540px)}
.b-ss01__card{position:absolute;inset:0;display:grid;grid-template-columns:0.9fr 1.1fr;background:var(--color-surface);border-radius:var(--radius-lg);overflow:hidden;box-shadow:0 30px 70px -25px rgba(0,0,0,.35);transform:translateY(16%) scale(.96);opacity:0;transition:transform .6s cubic-bezier(.16,1,.3,1),opacity .5s ease,filter .5s ease;pointer-events:none}
.b-ss01__card.is-active{transform:translateY(0) scale(1) rotate(0deg);opacity:1;pointer-events:auto;z-index:3}
.b-ss01__card.is-passed{transform:translateY(-7%) scale(.92) rotate(-2deg);opacity:.5;filter:blur(1.5px) saturate(.7);z-index:1}
.b-ss01__img{width:100%;height:100%;object-fit:cover;display:block}
.b-ss01__body{padding:clamp(1.25rem,3vw,2.25rem);display:flex;flex-direction:column;justify-content:center;gap:.6rem}
.b-ss01__tag{font-family:var(--font-body);font-size:.75rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--color-accent)}
.b-ss01__name{font-family:var(--font-heading);font-size:clamp(1.2rem,2.2vw,1.65rem);letter-spacing:-.01em;color:var(--color-text);margin:0}
.b-ss01__text{font-family:var(--font-body);color:var(--color-text-muted);line-height:1.6;font-size:.9375rem;margin:0}
.b-ss01__hud{position:absolute;left:var(--space-block);right:var(--space-block);bottom:clamp(1.5rem,4vh,2.5rem);display:flex;align-items:center;gap:1.25rem;z-index:5}
.b-ss01__counter{font-family:var(--font-body);font-size:.75rem;font-weight:700;letter-spacing:.14em;color:var(--color-text-muted);font-variant-numeric:tabular-nums;white-space:nowrap}
.b-ss01__bar{flex:1;height:2px;background:color-mix(in srgb,var(--color-text) 12%,transparent);border-radius:2px;overflow:hidden}
.b-ss01__bar-fill{height:100%;width:calc(var(--p,0)*100%);background:var(--color-accent)}
@media(max-width:768px){.b-ss01{height:340vh}.b-ss01__card{grid-template-columns:1fr}.b-ss01__img{height:40%}.b-ss01__deck{height:min(70vh,620px)}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-ss01{background:#0a0a0f}.b-ss01__title{color:#fff}.b-ss01__name{color:#fff}.b-ss01__card{background:#16161c}.b-ss01__counter{color:rgba(255,255,255,.55)}.b-ss01__bar{background:rgba(255,255,255,.14)}` },
  ],
};
