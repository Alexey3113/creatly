import type { BlockPreset } from "../_types";

/**
 * Storytelling: кинетический текстовый манифест.
 * Гигантские утверждения сменяют друг друга при скролле, фон плавно
 * перетекает из тёмного в акцентный через CSS-переменную --p.
 */
export const block: BlockPreset = {
  id: "story-manifesto-01",
  name: "Манифест — кинетический текст",
  description: "Скролл-история без медиа: экран прилипает, гигантские фразы-манифесты сменяются по мере скролла, фон живёт вместе с прогрессом. Дешёвый вау-эффект без единой картинки.",
  category: "story",
  subcategory: "text",
  icon: "✦",
  tags: ["storytelling", "typography", "kinetic", "manifesto", "pin", "scroll", "wow", "premium"],
  motionLevel: "css",
  fields: [
    { name: "sm01-eyebrow", type: "text", hint: "маленькая подпись сверху, 2-4 слова", required: false },
    { name: "sm01-step-kicker", type: "text", hint: "подводка шага, 1-3 слова («Мы верим»)", required: false },
    { name: "sm01-step-line", type: "heading", hint: "фраза-манифест шага, 4-9 слов, мощная", required: true },
  ],
  html: `<section class="b-sm01" data-block="story" data-story>
  <div class="b-sm01__stage" data-story-stage>
    <div class="b-sm01__bg" aria-hidden="true"></div>
    <span class="b-sm01__eyebrow" data-field="sm01-eyebrow">Манифест</span>
    <div class="b-sm01__steps" data-collection="sm01-steps">
      <div class="b-sm01__step" data-collection-item data-story-step>
        <p class="b-sm01__kicker" data-field="sm01-step-kicker">Мы верим</p>
        <h2 class="b-sm01__line" data-field="sm01-step-line">Дизайн — это не украшение. Это решение.</h2>
      </div>
      <div class="b-sm01__step" data-collection-item data-story-step>
        <p class="b-sm01__kicker" data-field="sm01-step-kicker">Мы делаем</p>
        <h2 class="b-sm01__line" data-field="sm01-step-line">Продукты, которые продают без слов.</h2>
      </div>
      <div class="b-sm01__step" data-collection-item data-story-step>
        <p class="b-sm01__kicker" data-field="sm01-step-kicker">Мы обещаем</p>
        <h2 class="b-sm01__line" data-field="sm01-step-line">Ни одного шаблонного решения. Никогда.</h2>
      </div>
    </div>
    <div class="b-sm01__hud">
      <span class="b-sm01__counter" data-story-counter>01 / 03</span>
      <div class="b-sm01__bar"><div class="b-sm01__bar-fill"></div></div>
    </div>
  </div>
</section>`,
  css: `.b-sm01{position:relative;height:400vh;background:var(--color-primary)}
.b-sm01__stage{position:sticky;top:0;height:100vh;overflow:hidden}
.b-sm01__bg{position:absolute;inset:-20%;background:radial-gradient(ellipse at calc(20% + var(--p,0)*60%) calc(80% - var(--p,0)*60%),var(--color-accent) 0%,transparent 55%);opacity:.35;filter:blur(60px);transform:rotate(calc(var(--p,0)*40deg));transition:transform .2s linear}
.b-sm01__eyebrow{position:absolute;top:clamp(1.5rem,4vh,3rem);left:var(--space-block);font-family:var(--font-body);font-size:.75rem;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:color-mix(in srgb,var(--color-text-on-primary) 60%,transparent)}
.b-sm01__steps{position:absolute;inset:0;display:grid;place-items:center;padding:0 var(--space-block)}
.b-sm01__step{grid-area:1/1;max-width:1000px;text-align:center;opacity:0;transform:translateY(60px) scale(.97);transition:opacity .75s cubic-bezier(.16,1,.3,1),transform .75s cubic-bezier(.16,1,.3,1);pointer-events:none}
.b-sm01__step.is-active{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}
.b-sm01__step.is-passed{opacity:0;transform:translateY(-60px) scale(.97)}
.b-sm01__step:first-child:not(.is-passed):not(.is-active){opacity:1;transform:none}
.b-sm01__kicker{font-family:var(--font-body);font-size:.875rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--color-accent);margin:0 0 1.5rem}
.b-sm01__line{font-family:var(--font-heading);font-size:clamp(2.25rem,6.5vw,5.5rem);line-height:1.04;letter-spacing:-.025em;color:var(--color-text-on-primary);margin:0}
.b-sm01__hud{position:absolute;left:var(--space-block);right:var(--space-block);bottom:clamp(1.5rem,4vh,2.5rem);display:flex;align-items:center;gap:1.25rem}
.b-sm01__counter{font-family:var(--font-body);font-size:.75rem;font-weight:700;letter-spacing:.14em;color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent);font-variant-numeric:tabular-nums;white-space:nowrap}
.b-sm01__bar{flex:1;height:2px;background:color-mix(in srgb,var(--color-text-on-primary) 18%,transparent);border-radius:2px;overflow:hidden}
.b-sm01__bar-fill{height:100%;width:calc(var(--p,0)*100%);background:var(--color-accent);transition:width .15s linear}
@media(max-width:768px){.b-sm01__step{text-align:left}.b-sm01__line{font-size:clamp(1.9rem,9vw,2.75rem)}}`,
  variants: [
    { id: "primary", label: "Фирменный", css: "" },
    { id: "dark", label: "Чёрный", css: `.b-sm01{background:#0a0a0f}.b-sm01__line{color:#fff}.b-sm01__eyebrow{color:rgba(255,255,255,.55)}.b-sm01__counter{color:rgba(255,255,255,.6)}.b-sm01__bar{background:rgba(255,255,255,.16)}` },
    { id: "light", label: "Светлый", css: `.b-sm01{background:var(--color-bg)}.b-sm01__line{color:var(--color-text)}.b-sm01__eyebrow{color:var(--color-text-muted)}.b-sm01__counter{color:var(--color-text-muted)}.b-sm01__bar{background:color-mix(in srgb,var(--color-text) 12%,transparent)}.b-sm01__bg{opacity:.18}` },
  ],
};
