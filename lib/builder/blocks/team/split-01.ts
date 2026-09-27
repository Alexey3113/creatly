import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "team-split-01",
  name: "Команда — сплит: текст + карточки",
  description: "Заголовок и описание слева, 3 карточки с фото справа в сетке. Split layout.",
  category: "team",
  subcategory: "split",
  icon: "◆",
  tags: ["split", "asymmetric", "cards", "text", "team"],
  motionLevel: "css",
  fields: [
    { name: "team3-heading", type: "heading", hint: "заголовок секции 3-6 слов", required: true },
    { name: "team3-desc", type: "text", hint: "описание команды 2-3 предложения", required: true },
    { name: "member3-photo", type: "image", hint: "портретное фото участника", required: true },
    { name: "member3-name", type: "heading", hint: "имя и фамилия", required: true },
    { name: "member3-role", type: "text", hint: "должность 2-4 слова", required: true },
  ],
  html: `<section class="b-te03" data-block="team">
  <div class="b-te03__inner">
    <div class="b-te03__text">
      <h2 data-field="team3-heading" data-reveal="word">Наша команда</h2>
      <p data-field="team3-desc">Мы объединяем экспертов из разных областей — дизайн, технологии, стратегия. Вместе мы создаём продукты, которые меняют рынок и задают новые стандарты качества.</p>
    </div>
    <div class="b-te03__cards" data-collection="team-members-split">
      <div class="b-te03__card" data-collection-item data-reveal="up" style="--stagger:1">
        <img class="b-te03__photo" data-field="member3-photo" src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=480&fit=crop&crop=face" alt="Виктор Лебедев" />
        <div class="b-te03__meta">
          <h3 data-field="member3-name">Виктор Лебедев</h3>
          <p data-field="member3-role">Продуктовый директор</p>
        </div>
      </div>
      <div class="b-te03__card" data-collection-item data-reveal="up" style="--stagger:2">
        <img class="b-te03__photo" data-field="member3-photo" src="https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&h=480&fit=crop&crop=face" alt="Ольга Федорова" />
        <div class="b-te03__meta">
          <h3 data-field="member3-name">Ольга Федорова</h3>
          <p data-field="member3-role">UX/UI дизайнер</p>
        </div>
      </div>
      <div class="b-te03__card" data-collection-item data-reveal="up" style="--stagger:3">
        <img class="b-te03__photo" data-field="member3-photo" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=480&fit=crop&crop=face" alt="Андрей Смирнов" />
        <div class="b-te03__meta">
          <h3 data-field="member3-name">Андрей Смирнов</h3>
          <p data-field="member3-role">Фронтенд-лид</p>
        </div>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-te03{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-te03__inner{max-width:var(--container-width,1400px);margin:0 auto;display:grid;grid-template-columns:1fr;gap:3rem;align-items:start}
.b-te03__text h2{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 1rem;letter-spacing:-0.02em}
.b-te03__text p{font-family:var(--font-body);font-size:1.0625rem;color:var(--color-text-muted);margin:0;line-height:1.7;max-width:480px}
.b-te03__cards{display:grid;grid-template-columns:1fr;gap:1.5rem}
.b-te03__card{background:var(--color-surface);border-radius:var(--radius-lg);overflow:hidden;box-shadow:0 22px 55px -30px color-mix(in srgb,var(--color-text) 28%,transparent);transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s}
.b-te03__card:hover{transform:translateY(-6px);box-shadow:0 34px 70px -30px color-mix(in srgb,var(--color-text) 38%,transparent)}
.b-te03__photo{width:100%;aspect-ratio:5/6;object-fit:cover;display:block;transition:transform .6s cubic-bezier(.16,1,.3,1)}
.b-te03__card:hover .b-te03__photo{transform:scale(1.045)}
.b-te03__meta{padding:1.25rem 1rem}
.b-te03__meta h3{font-family:var(--font-heading);font-size:1rem;color:var(--color-text);margin:0 0 .2rem}
.b-te03__meta p{font-family:var(--font-body);font-size:.8125rem;font-weight:600;color:var(--color-accent);margin:0}
@media(min-width:768px){.b-te03__cards{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1024px){.b-te03__inner{grid-template-columns:1fr 1.6fr;gap:4rem}.b-te03__cards{grid-template-columns:repeat(3,1fr)}.b-te03__text{position:sticky;top:2rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-te03{background:var(--color-primary)}.b-te03__text h2{color:var(--color-text-on-primary)}.b-te03__text p{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-te03__card{background:color-mix(in srgb,var(--color-text-on-primary) 8%,transparent)}.b-te03__meta h3{color:var(--color-text-on-primary)}.b-te03__meta p{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}` },
    { id: "alt-bg", label: "Альтернативный фон", css: `.b-te03{background:var(--color-bg-alt)}` },
  ],
};
