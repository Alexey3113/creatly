import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-bento-04",
  name: "Hero — бенто-дашборд",
  description: "Дашборд-стиль: слева крупный блок с заголовком и CTA, справа сетка 2×2 из карточек с иконками и описаниями",
  category: "hero",
  subcategory: "bento",
  icon: "⊞",
  tags: ["bento", "dashboard", "grid", "features", "saas", "cards"],
  motionLevel: "css",
  fields: [
    { name: "hero-title", type: "heading", hint: "главный заголовок 5-8 слов", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание 1-2 предложения", required: true },
    { name: "hero-cta", type: "link", hint: "текст CTA-кнопки", required: true },
    { name: "feat-1-title", type: "heading", hint: "заголовок карточки 1", required: true },
    { name: "feat-1-desc", type: "text", hint: "описание карточки 1", required: true },
    { name: "feat-2-title", type: "heading", hint: "заголовок карточки 2", required: true },
    { name: "feat-2-desc", type: "text", hint: "описание карточки 2", required: true },
    { name: "feat-3-title", type: "heading", hint: "заголовок карточки 3", required: true },
    { name: "feat-3-desc", type: "text", hint: "описание карточки 3", required: true },
    { name: "feat-4-title", type: "heading", hint: "заголовок карточки 4", required: true },
    { name: "feat-4-desc", type: "text", hint: "описание карточки 4", required: true },
  ],
  html: `<section class="b-hbn04" data-block="hero">
  <div class="b-hbn04__inner">
    <div class="b-hbn04__main" data-reveal="up">
      <div class="b-hbn04__badge" data-reveal="fade" style="--stagger:0">Новинка 2026</div>
      <h1 data-field="hero-title">Управляйте проектами на скорости мысли</h1>
      <p data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">Единое пространство для задач, документов и аналитики. Всё, что нужно команде — в одном окне.</p>
      <a class="b-hbn04__cta" href="#" data-field="hero-cta" data-reveal="fade" style="--stagger:2">Начать бесплатно</a>
    </div>
    <div class="b-hbn04__grid">
      <div class="b-hbn04__card" data-reveal="up" style="--stagger:1">
        <div class="b-hbn04__icon"><svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="12" stroke="currentColor" stroke-width="2"/><path d="M9 14l3 3 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <h3 data-field="feat-1-title">Автоматизация</h3>
        <p data-field="feat-1-desc">Настройте триггеры и забудьте о рутинных задачах навсегда</p>
      </div>
      <div class="b-hbn04__card" data-reveal="up" style="--stagger:2">
        <div class="b-hbn04__icon"><svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="3" y="3" width="22" height="22" rx="4" stroke="currentColor" stroke-width="2"/><path d="M8 14h12M14 8v12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></div>
        <h3 data-field="feat-2-title">Интеграции</h3>
        <p data-field="feat-2-desc">Более 200 подключений к вашим любимым сервисам</p>
      </div>
      <div class="b-hbn04__card" data-reveal="up" style="--stagger:3">
        <div class="b-hbn04__icon"><svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M14 3l3.5 7 7.5 1-5.5 5.2L20.8 24 14 20.2 7.2 24l1.3-7.8L3 11l7.5-1L14 3z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg></div>
        <h3 data-field="feat-3-title">Аналитика</h3>
        <p data-field="feat-3-desc">Отслеживайте прогресс команды в реальном времени</p>
      </div>
      <div class="b-hbn04__card" data-reveal="up" style="--stagger:4">
        <div class="b-hbn04__icon"><svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="10" r="5" stroke="currentColor" stroke-width="2"/><path d="M5 24c0-5 4-8 9-8s9 3 9 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></div>
        <h3 data-field="feat-4-title">Совместная работа</h3>
        <p data-field="feat-4-desc">Приглашайте участников и работайте над задачами вместе</p>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-hbn04{padding:var(--space-section) var(--space-block);background:var(--color-bg);min-height:85vh;display:flex;align-items:center}
.b-hbn04__inner{max-width:var(--container-width,1400px);margin:0 auto;display:grid;grid-template-columns:1fr;gap:2.5rem;align-items:center;width:100%}
@media(min-width:1024px){.b-hbn04__inner{grid-template-columns:1.2fr 1fr;gap:3rem}}
.b-hbn04__badge{display:inline-block;font-family:var(--font-body);font-size:.8rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--color-primary);background:color-mix(in srgb,var(--color-primary) 10%,transparent);padding:.35rem .9rem;border-radius:var(--radius-full);margin-bottom:1.5rem}
.b-hbn04__main h1{font-family:var(--font-heading);font-size:clamp(2.25rem,4.5vw,3.75rem);color:var(--color-text);margin:0 0 1.25rem;line-height:1.08;letter-spacing:-0.025em}
.b-hbn04__main p{font-family:var(--font-body);color:var(--color-text-muted);font-size:1.125rem;line-height:1.65;margin:0 0 2rem;max-width:520px}
.b-hbn04__cta{display:inline-flex;align-items:center;gap:.5rem;font-family:var(--font-body);font-size:1rem;font-weight:600;color:var(--color-text-on-primary);background:var(--color-primary);padding:.85rem 2rem;border-radius:var(--radius-md);text-decoration:none;transition:opacity .25s ease,transform .25s ease}
.b-hbn04__cta:hover{opacity:.88;transform:translateY(-1px)}
.b-hbn04__grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
@media(max-width:600px){.b-hbn04__grid{grid-template-columns:1fr}}
.b-hbn04__card{background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:1.5rem;display:flex;flex-direction:column;gap:.5rem;transition:transform .3s ease,box-shadow .3s ease}
.b-hbn04__card:hover{transform:translateY(-3px);box-shadow:0 8px 30px rgba(0,0,0,.08)}
.b-hbn04__icon{width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:color-mix(in srgb,var(--color-primary) 10%,transparent);border-radius:var(--radius-md);color:var(--color-primary);margin-bottom:.25rem}
.b-hbn04__card h3{font-family:var(--font-heading);font-size:1rem;font-weight:700;color:var(--color-text);margin:0;line-height:1.3}
.b-hbn04__card p{font-family:var(--font-body);font-size:.875rem;color:var(--color-text-muted);margin:0;line-height:1.5}`,
  variants: [
    {
      id: "hero-bento-04-outlined",
      label: "Контурные иконки + тонкая рамка",
      css: `.b-hbn04{padding:var(--space-section) var(--space-block);background:var(--color-bg);min-height:85vh;display:flex;align-items:center}
.b-hbn04__inner{max-width:var(--container-width,1400px);margin:0 auto;display:grid;grid-template-columns:1fr;gap:2.5rem;align-items:center;width:100%}
@media(min-width:1024px){.b-hbn04__inner{grid-template-columns:1.2fr 1fr;gap:3rem}}
.b-hbn04__badge{display:inline-block;font-family:var(--font-body);font-size:.8rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--color-accent);background:color-mix(in srgb,var(--color-accent) 10%,transparent);padding:.35rem .9rem;border-radius:var(--radius-full);margin-bottom:1.5rem}
.b-hbn04__main h1{font-family:var(--font-heading);font-size:clamp(2.25rem,4.5vw,3.75rem);color:var(--color-text);margin:0 0 1.25rem;line-height:1.08;letter-spacing:-0.025em}
.b-hbn04__main p{font-family:var(--font-body);color:var(--color-text-muted);font-size:1.125rem;line-height:1.65;margin:0 0 2rem;max-width:520px}
.b-hbn04__cta{display:inline-flex;align-items:center;gap:.5rem;font-family:var(--font-body);font-size:1rem;font-weight:600;color:var(--color-primary);background:transparent;padding:.8rem 2rem;border:2px solid var(--color-primary);border-radius:var(--radius-md);text-decoration:none;transition:all .25s ease}
.b-hbn04__cta:hover{background:var(--color-primary);color:var(--color-text-on-primary)}
.b-hbn04__grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
@media(max-width:600px){.b-hbn04__grid{grid-template-columns:1fr}}
.b-hbn04__card{background:transparent;border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:1.5rem;display:flex;flex-direction:column;gap:.5rem;transition:border-color .3s ease}
.b-hbn04__card:hover{border-color:var(--color-primary)}
.b-hbn04__icon{width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:transparent;border:1.5px solid var(--color-border);border-radius:var(--radius-md);color:var(--color-primary);margin-bottom:.25rem}
.b-hbn04__card h3{font-family:var(--font-heading);font-size:1rem;font-weight:700;color:var(--color-text);margin:0;line-height:1.3}
.b-hbn04__card p{font-family:var(--font-body);font-size:.875rem;color:var(--color-text-muted);margin:0;line-height:1.5}`,
    },
    {
      id: "hero-bento-04-dark-cards",
      label: "Тёмные карточки + акцентная кнопка",
      css: `.b-hbn04{padding:var(--space-section) var(--space-block);background:var(--color-bg);min-height:85vh;display:flex;align-items:center}
.b-hbn04__inner{max-width:var(--container-width,1400px);margin:0 auto;display:grid;grid-template-columns:1fr;gap:2.5rem;align-items:center;width:100%}
@media(min-width:1024px){.b-hbn04__inner{grid-template-columns:1.2fr 1fr;gap:3rem}}
.b-hbn04__badge{display:inline-block;font-family:var(--font-body);font-size:.8rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--color-accent);background:color-mix(in srgb,var(--color-accent) 12%,transparent);padding:.35rem .9rem;border-radius:var(--radius-full);margin-bottom:1.5rem}
.b-hbn04__main h1{font-family:var(--font-heading);font-size:clamp(2.25rem,4.5vw,3.75rem);color:var(--color-text);margin:0 0 1.25rem;line-height:1.08;letter-spacing:-0.025em}
.b-hbn04__main p{font-family:var(--font-body);color:var(--color-text-muted);font-size:1.125rem;line-height:1.65;margin:0 0 2rem;max-width:520px}
.b-hbn04__cta{display:inline-flex;align-items:center;gap:.5rem;font-family:var(--font-body);font-size:1rem;font-weight:600;color:var(--color-text-on-accent);background:var(--color-accent);padding:.85rem 2rem;border-radius:var(--radius-md);text-decoration:none;transition:opacity .25s ease,transform .25s ease}
.b-hbn04__cta:hover{opacity:.88;transform:translateY(-1px)}
.b-hbn04__grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
@media(max-width:600px){.b-hbn04__grid{grid-template-columns:1fr}}
.b-hbn04__card{background:var(--color-bg-alt);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:1.5rem;display:flex;flex-direction:column;gap:.5rem;transition:transform .3s ease,box-shadow .3s ease}
.b-hbn04__card:hover{transform:translateY(-3px);box-shadow:0 8px 30px rgba(0,0,0,.12)}
.b-hbn04__icon{width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:color-mix(in srgb,var(--color-accent) 12%,transparent);border-radius:var(--radius-md);color:var(--color-accent);margin-bottom:.25rem}
.b-hbn04__card h3{font-family:var(--font-heading);font-size:1rem;font-weight:700;color:var(--color-text);margin:0;line-height:1.3}
.b-hbn04__card p{font-family:var(--font-body);font-size:.875rem;color:var(--color-text-muted);margin:0;line-height:1.5}`,
    },
    {
      id: "hero-bento-04-gradient",
      label: "Градиентный фон главного блока",
      css: `.b-hbn04{padding:var(--space-section) var(--space-block);background:linear-gradient(160deg,var(--color-bg) 60%,color-mix(in srgb,var(--color-primary) 6%,var(--color-bg)));min-height:85vh;display:flex;align-items:center}
.b-hbn04__inner{max-width:var(--container-width,1400px);margin:0 auto;display:grid;grid-template-columns:1fr;gap:2.5rem;align-items:center;width:100%}
@media(min-width:1024px){.b-hbn04__inner{grid-template-columns:1.2fr 1fr;gap:3rem}}
.b-hbn04__badge{display:inline-block;font-family:var(--font-body);font-size:.8rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--color-primary);background:color-mix(in srgb,var(--color-primary) 10%,transparent);padding:.35rem .9rem;border-radius:var(--radius-full);margin-bottom:1.5rem}
.b-hbn04__main h1{font-family:var(--font-heading);font-size:clamp(2.25rem,4.5vw,3.75rem);color:var(--color-text);margin:0 0 1.25rem;line-height:1.08;letter-spacing:-0.025em}
.b-hbn04__main p{font-family:var(--font-body);color:var(--color-text-muted);font-size:1.125rem;line-height:1.65;margin:0 0 2rem;max-width:520px}
.b-hbn04__cta{display:inline-flex;align-items:center;gap:.5rem;font-family:var(--font-body);font-size:1rem;font-weight:600;color:var(--color-text-on-primary);background:var(--color-primary);padding:.85rem 2rem;border-radius:var(--radius-md);text-decoration:none;transition:opacity .25s ease,transform .25s ease}
.b-hbn04__cta:hover{opacity:.88;transform:translateY(-1px)}
.b-hbn04__grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
@media(max-width:600px){.b-hbn04__grid{grid-template-columns:1fr}}
.b-hbn04__card{background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:1.5rem;display:flex;flex-direction:column;gap:.5rem;backdrop-filter:blur(8px);transition:transform .3s ease,box-shadow .3s ease}
.b-hbn04__card:hover{transform:translateY(-3px);box-shadow:0 8px 30px rgba(0,0,0,.08)}
.b-hbn04__icon{width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:color-mix(in srgb,var(--color-primary) 10%,transparent);border-radius:var(--radius-md);color:var(--color-primary);margin-bottom:.25rem}
.b-hbn04__card h3{font-family:var(--font-heading);font-size:1rem;font-weight:700;color:var(--color-text);margin:0;line-height:1.3}
.b-hbn04__card p{font-family:var(--font-body);font-size:.875rem;color:var(--color-text-muted);margin:0;line-height:1.5}`,
    },
  ],
};
