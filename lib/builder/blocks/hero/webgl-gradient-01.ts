import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-webgl-gradient-01",
  name: "Cinematic Gradient Hero",
  description: "Анимированный WebGL mesh-gradient фон с кинематографическим эффектом. Цвета вытекают как живые.",
  category: "hero",
  subcategory: "webgl",
  icon: "✦",
  tags: ["webgl", "gradient", "cinematic", "premium", "animated", "hero", "dark", "fullscreen"],
  motionLevel: "webgl",
  fields: [
    { name: "badge", type: "text", hint: "бейдж над заголовком, 2-4 слова", required: false },
    { name: "headline", type: "heading", hint: "Заголовок 4-7 слов, крупный", required: true },
    { name: "sub", type: "text", hint: "Подзаголовок 10-15 слов", required: false },
    { name: "cta1", type: "link", hint: "Кнопка CTA, 2-4 слова", required: false },
    { name: "cta2", type: "link", hint: "Вторичная кнопка, 2-4 слова", required: false },
  ],
  html: `
<section class="b-wg1" data-scene>
  <!-- WebGL canvas: fills the section as background -->
  <canvas class="b-wg1__canvas" data-webgl="mesh-gradient"
    data-color1="var(--color-primary,#667eea)"
    data-color2="var(--color-accent,#764ba2)"
    data-color3="#f093fb"
    data-color4="#0f0c29"
    aria-hidden="true"></canvas>

  <!-- Noise overlay for grain / depth -->
  <div class="b-wg1__noise" aria-hidden="true"></div>

  <!-- Floating ambient blobs (CSS, no JS) -->
  <div class="b-wg1__blobs" aria-hidden="true">
    <div class="b-wg1__blob b-wg1__blob--a"></div>
    <div class="b-wg1__blob b-wg1__blob--b"></div>
    <div class="b-wg1__blob b-wg1__blob--c"></div>
  </div>

  <!-- Floating foreground asset -->
  <div class="b-wg1__float" data-float="18" aria-hidden="true">
    <div class="b-wg1__orb"></div>
  </div>

  <!-- Content -->
  <div class="b-wg1__inner">
    <div class="b-wg1__badge" data-reveal="fade">
      <span class="b-wg1__badge-dot"></span>
      <span data-field="badge">Новый уровень</span>
    </div>

    <h1 class="b-wg1__title" data-reveal="clip" data-split data-field="headline">
      Будущее начинается здесь
    </h1>

    <p class="b-wg1__sub" data-reveal="up" style="--stagger:2" data-field="sub">
      Создайте сайт, который останавливает взгляд. Визуально — на уровне Apple, технически — мощнее Webflow.
    </p>

    <div class="b-wg1__actions" data-reveal="up" style="--stagger:3">
      <a href="#" class="b-wg1__btn b-wg1__btn--primary" data-field="cta1">Начать бесплатно</a>
      <a href="#" class="b-wg1__btn b-wg1__btn--ghost" data-field="cta2">Смотреть демо</a>
    </div>

    <!-- Scroll hint -->
    <div class="b-wg1__scroll" data-reveal="fade" style="--stagger:4" aria-label="Скрольте вниз">
      <div class="b-wg1__scroll-line"></div>
      <span>Скроллить</span>
    </div>
  </div>
</section>`,

  css: `
.b-wg1 {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #0f0c29;
}

/* ── WebGL canvas: absolute fill ── */
.b-wg1__canvas {
  position: absolute;
  inset: 0;
  width: 100% !important;
  height: 100% !important;
  display: block;
  z-index: 0;
}

/* ── Grain noise overlay ── */
.b-wg1__noise {
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: .04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
  pointer-events: none;
}

/* ── Soft vignette ── */
.b-wg1::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,.6) 100%);
  pointer-events: none;
}

/* ── Ambient CSS blobs (fallback / layered depth) ── */
.b-wg1__blobs { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
.b-wg1__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: .35;
  animation: b-wg1-drift 18s ease-in-out infinite alternate;
}
.b-wg1__blob--a {
  width: 600px; height: 600px;
  background: var(--color-primary, #6366f1);
  top: -200px; left: -150px;
  animation-delay: 0s;
}
.b-wg1__blob--b {
  width: 500px; height: 500px;
  background: var(--color-accent, #a855f7);
  bottom: -100px; right: -100px;
  animation-delay: -6s;
}
.b-wg1__blob--c {
  width: 400px; height: 400px;
  background: #ec4899;
  top: 30%; left: 50%;
  transform: translateX(-50%);
  animation-delay: -12s;
}
@keyframes b-wg1-drift {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(40px, -40px) scale(1.08); }
}

/* ── Floating orb ── */
.b-wg1__float {
  position: absolute;
  top: 15%; right: 10%;
  z-index: 2;
  pointer-events: none;
}
.b-wg1__orb {
  width: 280px; height: 280px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, #6366f1, #a855f7, #ec4899, #6366f1);
  filter: blur(1px);
  opacity: .18;
  box-shadow: 0 0 80px 40px rgba(99,102,241,.25);
  animation: b-wg1-spin 20s linear infinite;
}
@keyframes b-wg1-spin { to { transform: rotate(360deg); } }

/* ── Content ── */
.b-wg1__inner {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--space-section, 80px) 24px;
  max-width: 860px;
  margin: 0 auto;
  gap: 28px;
}

/* Badge */
.b-wg1__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px 6px 8px;
  border-radius: 100px;
  border: 1px solid rgba(255,255,255,.15);
  background: rgba(255,255,255,.06);
  backdrop-filter: blur(8px);
  color: rgba(255,255,255,.75);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: .01em;
}
.b-wg1__badge-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #6366f1;
  box-shadow: 0 0 0 3px rgba(99,102,241,.3);
  animation: b-wg1-pulse 2s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes b-wg1-pulse {
  0%,100% { box-shadow: 0 0 0 3px rgba(99,102,241,.3); }
  50%      { box-shadow: 0 0 0 6px rgba(99,102,241,.1); }
}

/* Headline */
.b-wg1__title {
  font-family: var(--font-heading, inherit);
  font-size: clamp(3rem, 8vw, 6.5rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: #fff;
  margin: 0;
  background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,.65) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Sub */
.b-wg1__sub {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: rgba(255,255,255,.65);
  line-height: 1.6;
  max-width: 560px;
  margin: 0;
  font-family: var(--font-body, inherit);
}

/* CTAs */
.b-wg1__actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  justify-content: center;
}
.b-wg1__btn {
  display: inline-flex;
  align-items: center;
  padding: 14px 32px;
  border-radius: var(--radius-md, 12px);
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  transition: all .22s cubic-bezier(.16,1,.3,1);
  letter-spacing: .01em;
  font-family: var(--font-body, inherit);
}
.b-wg1__btn--primary {
  background: #fff;
  color: #111;
  box-shadow: 0 0 0 0 rgba(255,255,255,0);
}
.b-wg1__btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 40px rgba(255,255,255,.15);
}
.b-wg1__btn--ghost {
  background: rgba(255,255,255,.08);
  color: #fff;
  border: 1px solid rgba(255,255,255,.15);
  backdrop-filter: blur(8px);
}
.b-wg1__btn--ghost:hover {
  background: rgba(255,255,255,.14);
  transform: translateY(-2px);
}

/* Scroll hint */
.b-wg1__scroll {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: rgba(255,255,255,.35);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: .08em;
  text-transform: uppercase;
  margin-top: 12px;
}
.b-wg1__scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, rgba(255,255,255,.5), transparent);
  animation: b-wg1-scroll 2s ease-in-out infinite;
}
@keyframes b-wg1-scroll {
  0%   { opacity: 1; transform: scaleY(1) translateY(0); }
  100% { opacity: 0; transform: scaleY(1) translateY(100%); }
}

/* ── Mobile ── */
@media (max-width: 768px) {
  .b-wg1__float { display: none; }
  .b-wg1__actions { flex-direction: column; align-items: center; }
  .b-wg1__btn { width: 100%; justify-content: center; max-width: 320px; }
}
`,
};
