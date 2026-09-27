import type { BlockPreset } from "../_types";

/**
 * Storytelling: пиннутый показ (паттерн «Nimbus Demo» / «NexaCore Process»).
 * Большое медиа прилипает по центру и слегка «дышит» на --p; рядом по шагам
 * скролла раскрываются выноски-фичи, указывающие на продукт. Флагман для SaaS,
 * продуктов, услуг «как это работает».
 */
export const block: BlockPreset = {
  id: "story-showcase-01",
  name: "Показ продукта по шагам",
  description: "Большой кадр продукта залипает по центру, а вокруг по мере скролла проявляются фичи-выноски. Тот самый SaaS-показ «смотрите, как это устроено».",
  category: "story",
  subcategory: "showcase",
  icon: "◱",
  tags: ["storytelling", "showcase", "product", "saas", "pin", "steps", "scroll", "wow", "premium"],
  motionLevel: "css",
  fields: [
    { name: "ss02-eyebrow", type: "text", hint: "рубрика, 2-4 слова", required: false },
    { name: "ss02-title", type: "heading", hint: "заголовок секции, 2-6 слов", required: true },
    { name: "ss02-image", type: "image", hint: "крупный кадр продукта/интерфейса/объекта", required: true },
    { name: "ss02-step-title", type: "heading", hint: "заголовок фичи, 2-4 слова", required: true },
    { name: "ss02-step-text", type: "text", hint: "описание фичи, 1-2 предложения", required: false },
  ],
  html: `<section class="b-ss02" data-block="story" data-story>
  <div class="b-ss02__stage" data-story-stage>
    <header class="b-ss02__head">
      <span class="b-ss02__eyebrow" data-field="ss02-eyebrow">Как это работает</span>
      <h2 class="b-ss02__title" data-field="ss02-title">Один экран — вся картина</h2>
    </header>
    <div class="b-ss02__media">
      <img data-field="ss02-image" src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80" alt="" />
    </div>
    <div class="b-ss02__steps" data-collection="ss02-steps">
      <article class="b-ss02__step" data-collection-item data-story-step>
        <span class="b-ss02__dot" aria-hidden="true"></span>
        <h3 data-field="ss02-step-title">Всё в одном месте</h3>
        <p data-field="ss02-step-text">Метрики, задачи и команда — на одном полотне, без переключений между вкладками.</p>
      </article>
      <article class="b-ss02__step" data-collection-item data-story-step>
        <span class="b-ss02__dot" aria-hidden="true"></span>
        <h3 data-field="ss02-step-title">Понятно с первого взгляда</h3>
        <p data-field="ss02-step-text">Важное — крупно, детали — по клику. Интерфейс ведёт, а не запутывает.</p>
      </article>
      <article class="b-ss02__step" data-collection-item data-story-step>
        <span class="b-ss02__dot" aria-hidden="true"></span>
        <h3 data-field="ss02-step-title">Живые данные</h3>
        <p data-field="ss02-step-text">Всё обновляется в реальном времени — вы всегда видите текущую ситуацию.</p>
      </article>
    </div>
    <div class="b-ss02__hud">
      <span class="b-ss02__counter" data-story-counter>01 / 03</span>
      <div class="b-ss02__bar"><div class="b-ss02__bar-fill" data-story-bar></div></div>
    </div>
  </div>
</section>`,
  css: `.b-ss02{position:relative;height:360vh;background:var(--color-bg)}
.b-ss02__stage{position:sticky;top:0;height:100vh;overflow:hidden;display:grid;grid-template-columns:1.35fr 1fr;align-items:center;gap:clamp(1.5rem,4vw,3.5rem);padding:0 var(--space-block)}
.b-ss02__head{position:absolute;top:clamp(1.5rem,5vh,3rem);left:var(--space-block);right:var(--space-block);z-index:3}
.b-ss02__eyebrow{font-family:var(--font-body);font-size:.75rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--color-accent)}
.b-ss02__title{font-family:var(--font-heading);font-size:clamp(1.5rem,3vw,2.5rem);letter-spacing:-.02em;color:var(--color-text);margin:.4rem 0 0}
.b-ss02__media{position:relative;height:min(64vh,560px);border-radius:var(--radius-lg);overflow:hidden;box-shadow:0 40px 90px -35px color-mix(in srgb,var(--color-text) 40%,transparent);transform:scale(calc(0.94 + var(--p,0)*0.06))}
.b-ss02__media img{width:100%;height:100%;object-fit:cover;display:block;transform:scale(calc(1.05 - var(--p,0)*0.05));transition:transform .1s linear}
.b-ss02__steps{position:relative;display:grid}
.b-ss02__step{grid-area:1/1;display:flex;flex-direction:column;gap:.75rem;max-width:420px;opacity:0;transform:translateY(28px);transition:opacity .55s cubic-bezier(.16,1,.3,1),transform .55s cubic-bezier(.16,1,.3,1);pointer-events:none}
.b-ss02__step.is-active{opacity:1;transform:none;pointer-events:auto}
.b-ss02__step:first-child:not(.is-active):not(.is-passed){opacity:1;transform:none}
.b-ss02__dot{width:2.5rem;height:2.5rem;border-radius:var(--radius-full);background:color-mix(in srgb,var(--color-accent) 15%,transparent);border:1px solid color-mix(in srgb,var(--color-accent) 40%,transparent);position:relative}
.b-ss02__dot::after{content:"";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:.65rem;height:.65rem;border-radius:50%;background:var(--color-accent)}
.b-ss02__step h3{font-family:var(--font-heading);font-size:clamp(1.3rem,2.4vw,1.9rem);letter-spacing:-.01em;color:var(--color-text);margin:0}
.b-ss02__step p{font-family:var(--font-body);font-size:1rem;color:var(--color-text-muted);line-height:1.65;margin:0}
.b-ss02__hud{position:absolute;left:var(--space-block);right:var(--space-block);bottom:clamp(1.5rem,4vh,2.5rem);display:flex;align-items:center;gap:1.25rem;z-index:3}
.b-ss02__counter{font-family:var(--font-body);font-size:.75rem;font-weight:700;letter-spacing:.14em;color:var(--color-text-muted);font-variant-numeric:tabular-nums;white-space:nowrap}
.b-ss02__bar{flex:1;height:2px;background:color-mix(in srgb,var(--color-text) 12%,transparent);border-radius:2px;overflow:hidden}
.b-ss02__bar-fill{height:100%;width:calc(var(--p,0)*100%);background:var(--color-accent)}
@media(max-width:768px){.b-ss02{height:320vh}.b-ss02__stage{grid-template-columns:1fr;align-content:center;gap:1.5rem;padding-top:5rem}.b-ss02__media{height:38vh}.b-ss02__step{max-width:none}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-ss02{background:#0a0a0f}.b-ss02__title{color:#fff}.b-ss02__step h3{color:#fff}.b-ss02__step p{color:rgba(255,255,255,.6)}.b-ss02__counter{color:rgba(255,255,255,.55)}.b-ss02__bar{background:rgba(255,255,255,.14)}` },
  ],
};
