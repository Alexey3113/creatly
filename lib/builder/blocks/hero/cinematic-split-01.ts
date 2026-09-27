import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-cinematic-split-01",
  name: "Cinematic Split Scene",
  description: "Кинематографический сплит-экран. При скролле следующий блок проявляется через clip-path sneak reveal. Поддерживает data-scene morphing.",
  category: "hero",
  subcategory: "cinematic",
  icon: "◈",
  tags: ["cinematic", "split", "gsap", "scene", "dark", "image", "parallax", "premium"],
  motionLevel: "gsap",
  fields: [
    { name: "eyebrow", type: "text", hint: "Надпись над заголовком, 2-4 слова (год, категория)", required: false },
    { name: "headline", type: "heading", hint: "Заголовок 4-8 слов, крупный", required: true },
    { name: "body", type: "text", hint: "Абзац 15-25 слов", required: false },
    { name: "cta", type: "link", hint: "CTA-кнопка, 2-4 слова", required: true },
    { name: "image", type: "image", hint: "Вертикальное фото/рендер, портретная ориентация", required: false },
  ],
  html: `
<section class="b-cs1" data-scene>
  <!-- Left: text side -->
  <div class="b-cs1__left">
    <div class="b-cs1__content">
      <div class="b-cs1__eyebrow" data-reveal="fade" data-field="eyebrow">2025 Collection</div>

      <h1 class="b-cs1__title" data-reveal="clip" data-split data-field="headline">
        Искусство<br>в деталях
      </h1>

      <p class="b-cs1__body" data-reveal="up" style="--stagger:2" data-field="body">
        Каждый пиксель продуман. Каждая секунда опыта — кинематографична. Это не сайт. Это история.
      </p>

      <div class="b-cs1__cta-row" data-reveal="up" style="--stagger:3">
        <a href="#" class="b-cs1__btn" data-field="cta">Исследовать</a>
        <div class="b-cs1__line"></div>
      </div>

      <!-- Scroll counter hint -->
      <div class="b-cs1__counter" data-reveal="fade" style="--stagger:4">
        <span class="b-cs1__counter-n">01</span>
        <div class="b-cs1__counter-bar"><div class="b-cs1__counter-fill"></div></div>
        <span class="b-cs1__counter-total">04</span>
      </div>
    </div>
  </div>

  <!-- Right: visual side (parallax image) -->
  <div class="b-cs1__right">
    <div class="b-cs1__img-wrap">
      <img
        class="b-cs1__img"
        data-parallax="-0.12"
        data-field="image"
        src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=80"
        alt=""
        loading="eager"
      />
      <!-- Overlay for color grade -->
      <div class="b-cs1__overlay" aria-hidden="true"></div>
    </div>

    <!-- Floating detail card -->
    <div class="b-cs1__card" data-float="10" data-reveal="scale" style="--stagger:3">
      <div class="b-cs1__card-label">Рейтинг</div>
      <div class="b-cs1__card-val">★ 4.97</div>
    </div>
  </div>
</section>`,

  css: `
.b-cs1 {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  overflow: hidden;
  background: var(--color-bg, #08070e);
}

/* ── Left text panel ── */
.b-cs1__left {
  display: flex;
  align-items: center;
  padding: var(--space-section, 80px) clamp(28px, 6vw, 80px);
  z-index: 2;
}
.b-cs1__content {
  display: flex;
  flex-direction: column;
  gap: 28px;
  max-width: 480px;
}

.b-cs1__eyebrow {
  font-family: var(--font-body, inherit);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--color-primary, #6366f1);
}

.b-cs1__title {
  font-family: var(--font-heading, inherit);
  font-size: clamp(3rem, 6vw, 5.5rem);
  font-weight: 800;
  line-height: 1.0;
  letter-spacing: -0.04em;
  color: var(--color-text, #fff);
  margin: 0;
}

.b-cs1__body {
  font-family: var(--font-body, inherit);
  font-size: clamp(1rem, 1.4vw, 1.1rem);
  color: rgba(255,255,255,.55);
  line-height: 1.7;
  margin: 0;
  max-width: 360px;
}

.b-cs1__cta-row {
  display: flex;
  align-items: center;
  gap: 24px;
}
.b-cs1__btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 28px;
  border-radius: var(--radius-md, 10px);
  background: var(--color-primary, #6366f1);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  letter-spacing: .02em;
  font-family: var(--font-body, inherit);
  transition: all .22s cubic-bezier(.16,1,.3,1);
  position: relative;
  overflow: hidden;
}
.b-cs1__btn::after {
  content: '→';
  opacity: 0;
  transform: translateX(-4px);
  transition: all .22s cubic-bezier(.16,1,.3,1);
}
.b-cs1__btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(99,102,241,.35);
}
.b-cs1__btn:hover::after {
  opacity: 1;
  transform: translateX(0);
}
.b-cs1__line {
  flex: 1;
  height: 1px;
  background: rgba(255,255,255,.1);
  max-width: 80px;
}

/* Scene counter */
.b-cs1__counter {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 4px;
}
.b-cs1__counter-n, .b-cs1__counter-total {
  font-family: ui-monospace, monospace;
  font-size: 11px;
  color: rgba(255,255,255,.3);
  letter-spacing: .08em;
}
.b-cs1__counter-bar {
  flex: 1;
  height: 1px;
  background: rgba(255,255,255,.1);
  max-width: 80px;
  position: relative;
  overflow: hidden;
}
.b-cs1__counter-fill {
  position: absolute;
  inset: 0;
  width: 25%;
  background: rgba(255,255,255,.5);
  border-radius: 1px;
}

/* ── Right image panel ── */
.b-cs1__right {
  position: relative;
  overflow: hidden;
}
.b-cs1__img-wrap {
  position: absolute;
  inset: -10%;
  overflow: hidden;
}
.b-cs1__img {
  width: 100%;
  height: 120%;
  object-fit: cover;
  object-position: center;
  display: block;
  will-change: transform;
}
.b-cs1__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, var(--color-bg, #08070e) 0%, transparent 30%),
              linear-gradient(to top, rgba(0,0,0,.5) 0%, transparent 50%);
}

/* Floating card */
.b-cs1__card {
  position: absolute;
  bottom: 15%;
  left: -24px;
  z-index: 3;
  background: rgba(255,255,255,.07);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 14px;
  padding: 14px 20px;
  min-width: 120px;
  box-shadow: 0 24px 48px rgba(0,0,0,.4);
}
.b-cs1__card-label {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .1em;
  color: rgba(255,255,255,.4);
  margin-bottom: 4px;
}
.b-cs1__card-val {
  font-size: 18px;
  font-weight: 800;
  color: #fff;
}

/* ── Mobile ── */
@media (max-width: 768px) {
  .b-cs1 { grid-template-columns: 1fr; grid-template-rows: auto 55vw; }
  .b-cs1__right { grid-row: 1; }
  .b-cs1__img-wrap { position: relative; inset: auto; height: 100%; }
  .b-cs1__img { height: 100%; }
  .b-cs1__overlay { background: linear-gradient(to top, var(--color-bg,#08070e) 0%, transparent 60%); }
  .b-cs1__card { left: 16px; bottom: 10%; }
  .b-cs1__title { font-size: clamp(2.2rem, 8vw, 3.5rem); }
}
`,
};
