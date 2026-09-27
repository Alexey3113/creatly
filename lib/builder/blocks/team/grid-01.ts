import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "team-grid-01",
  name: "Команда — сетка 4 карточки с соцсетями",
  description: "4 карточки: фото, имя, должность, иконки соцсетей. Hover-эффект с elevation.",
  category: "team",
  subcategory: "grid",
  icon: "◆",
  tags: ["grid", "cards", "social", "hover", "team"],
  motionLevel: "css",
  fields: [
    { name: "team-title", type: "heading", hint: "заголовок секции 2-5 слов", required: true },
    { name: "team-subtitle", type: "text", hint: "подзаголовок секции 1-2 предложения", required: false },
    { name: "member-photo", type: "image", hint: "портретное фото участника", required: true },
    { name: "member-name", type: "heading", hint: "имя и фамилия", required: true },
    { name: "member-role", type: "text", hint: "должность 2-4 слова", required: true },
    { name: "member-social", type: "icon", hint: "иконки соцсетей (SVG)", required: false },
  ],
  html: `<section class="b-te01" data-block="team">
  <div class="b-te01__inner">
    <h2 class="b-te01__title" data-field="team-title" data-reveal="up">Наша команда</h2>
    <p class="b-te01__subtitle" data-field="team-subtitle" data-reveal="fade" style="--stagger:1">Профессионалы, которые стоят за каждым успешным проектом.</p>
    <div class="b-te01__grid" data-collection="team-members">
      <div class="b-te01__card" data-collection-item data-reveal="up" style="--stagger:0">
        <div class="b-te01__photo-wrap">
          <img class="b-te01__photo" data-field="member-photo" src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face" alt="Алексей Петров" />
        </div>
        <div class="b-te01__info">
          <h3 data-field="member-name">Алексей Петров</h3>
          <p class="b-te01__role" data-field="member-role">Генеральный директор</p>
          <div class="b-te01__socials" data-field="member-social">
            <a href="#" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
            <a href="#" aria-label="Twitter"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
          </div>
        </div>
      </div>
      <div class="b-te01__card" data-collection-item data-reveal="up" style="--stagger:1">
        <div class="b-te01__photo-wrap">
          <img class="b-te01__photo" data-field="member-photo" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face" alt="Мария Соколова" />
        </div>
        <div class="b-te01__info">
          <h3 data-field="member-name">Мария Соколова</h3>
          <p class="b-te01__role" data-field="member-role">Креативный директор</p>
          <div class="b-te01__socials" data-field="member-social">
            <a href="#" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
          </div>
        </div>
      </div>
      <div class="b-te01__card" data-collection-item data-reveal="up" style="--stagger:2">
        <div class="b-te01__photo-wrap">
          <img class="b-te01__photo" data-field="member-photo" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face" alt="Дмитрий Волков" />
        </div>
        <div class="b-te01__info">
          <h3 data-field="member-name">Дмитрий Волков</h3>
          <p class="b-te01__role" data-field="member-role">Технический директор</p>
          <div class="b-te01__socials" data-field="member-social">
            <a href="#" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
            <a href="#" aria-label="Twitter"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
          </div>
        </div>
      </div>
      <div class="b-te01__card" data-collection-item data-reveal="up" style="--stagger:3">
        <div class="b-te01__photo-wrap">
          <img class="b-te01__photo" data-field="member-photo" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face" alt="Елена Козлова" />
        </div>
        <div class="b-te01__info">
          <h3 data-field="member-name">Елена Козлова</h3>
          <p class="b-te01__role" data-field="member-role">Руководитель дизайна</p>
          <div class="b-te01__socials" data-field="member-social">
            <a href="#" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-te01{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-te01__inner{max-width:var(--container-width,1400px);margin:0 auto;text-align:center}
.b-te01__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem;letter-spacing:-0.02em}
.b-te01__subtitle{font-family:var(--font-body);font-size:1.0625rem;color:var(--color-text-muted);max-width:560px;margin:0 auto 3rem;line-height:1.6}
.b-te01__grid{display:grid;grid-template-columns:1fr;gap:2rem}
.b-te01__card{background:var(--color-surface);border-radius:var(--radius-lg);overflow:hidden;transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s ease}
.b-te01__card:hover{transform:translateY(-6px);box-shadow:0 20px 40px color-mix(in srgb,var(--color-text) 10%,transparent)}
.b-te01__photo-wrap{overflow:hidden;aspect-ratio:4/5}
.b-te01__photo{width:100%;height:100%;object-fit:cover;transition:transform .5s cubic-bezier(.16,1,.3,1)}
.b-te01__card:hover .b-te01__photo{transform:scale(1.04)}
.b-te01__info{padding:1.5rem 1.25rem 1.75rem}
.b-te01__info h3{font-family:var(--font-heading);font-size:1.125rem;color:var(--color-text);margin:0 0 .25rem;letter-spacing:-0.01em}
.b-te01__role{font-family:var(--font-body);font-size:.875rem;color:var(--color-text-muted);margin:0 0 1rem;line-height:1.5}
.b-te01__socials{display:flex;gap:.75rem;justify-content:center}
.b-te01__socials a{color:var(--color-text-muted);transition:color .2s}
.b-te01__socials a:hover{color:var(--color-primary)}
@media(min-width:768px){.b-te01__grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1024px){.b-te01__grid{grid-template-columns:repeat(4,1fr)}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-te01{background:var(--color-primary)}.b-te01__title{color:var(--color-text-on-primary)}.b-te01__subtitle{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-te01__card{background:color-mix(in srgb,var(--color-text-on-primary) 8%,transparent)}.b-te01__info h3{color:var(--color-text-on-primary)}.b-te01__role{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}.b-te01__socials a{color:color-mix(in srgb,var(--color-text-on-primary) 60%,transparent)}.b-te01__socials a:hover{color:var(--color-accent)}` },
    { id: "bordered", label: "С рамкой", css: `.b-te01__card{border:1px solid var(--color-border);background:var(--color-bg)}` },
  ],
};
