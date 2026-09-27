import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "case-studies-quote-01",
  name: "Кейс — цитата клиента + метрики",
  description: "Крупная цитата клиента в стиле blockquote с фото и именем автора, под которой расположены 3 ключевые метрики результатов",
  category: "case-studies",
  subcategory: "quote",
  icon: "❝",
  tags: ["case-studies", "quote", "testimonial", "stats", "blockquote"],
  motionLevel: "css",
  fields: [
    { name: "cs05-quote", type: "text", hint: "цитата клиента 2-4 предложения", required: true },
    { name: "cs05-author-img", type: "image", hint: "фото автора цитаты", required: true },
    { name: "cs05-author-name", type: "heading", hint: "имя и фамилия автора", required: true },
    { name: "cs05-author-role", type: "text", hint: "должность и компания автора", required: true },
    { name: "cs05-stat-value", type: "stat", hint: "числовой результат, например +95%", required: true },
    { name: "cs05-stat-label", type: "text", hint: "подпись к метрике 2-4 слова", required: true },
  ],
  html: `<section class="b-cs05" data-block="case-studies">
  <div class="b-cs05__inner">
    <div class="b-cs05__quote-block" data-reveal="fade">
      <div class="b-cs05__quote-mark">“</div>
      <blockquote class="b-cs05__quote" data-field="cs05-quote">Сотрудничество превзошло все ожидания. За три месяца мы увидели результаты, которых не могли добиться за два года собственными силами. Команда полностью погрузилась в наш бизнес и предложила решения, о которых мы даже не думали.</blockquote>
      <div class="b-cs05__author">
        <img class="b-cs05__author-img" data-field="cs05-author-img" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&amp;fit=crop&amp;w=120&amp;h=120&amp;q=80" alt="Автор">
        <div class="b-cs05__author-info">
          <span class="b-cs05__author-name" data-field="cs05-author-name">Алексей Петров</span>
          <span class="b-cs05__author-role" data-field="cs05-author-role">CEO, ТехноСтарт</span>
        </div>
      </div>
    </div>
    <div class="b-cs05__stats" data-reveal="up" data-collection="cs05-stat-value">
      <div class="b-cs05__stat" style="--stagger:0" data-collection-item>
        <span class="b-cs05__stat-value" data-field="cs05-stat-value">+280%</span>
        <span class="b-cs05__stat-label" data-field="cs05-stat-label">рост трафика</span>
      </div>
      <div class="b-cs05__stat" style="--stagger:1" data-collection-item>
        <span class="b-cs05__stat-value" data-field="cs05-stat-value">−62%</span>
        <span class="b-cs05__stat-label" data-field="cs05-stat-label">стоимость клиента</span>
      </div>
      <div class="b-cs05__stat" style="--stagger:2" data-collection-item>
        <span class="b-cs05__stat-value" data-field="cs05-stat-value">×4.5</span>
        <span class="b-cs05__stat-label" data-field="cs05-stat-label">окупаемость ROI</span>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-cs05{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-cs05__inner{max-width:860px;margin:0 auto}
.b-cs05__quote-block{text-align:center;margin-bottom:3rem}
.b-cs05__quote-mark{font-family:var(--font-heading);font-size:5rem;line-height:1;color:var(--color-primary);opacity:.3;margin-bottom:-1rem}
.b-cs05__quote{font-family:var(--font-heading);font-size:clamp(1.25rem,2.5vw,1.625rem);color:var(--color-text);line-height:1.6;margin:0 0 2rem;padding:0;border:none;font-style:normal;letter-spacing:-0.01em}
.b-cs05__author{display:flex;align-items:center;justify-content:center;gap:1rem}
.b-cs05__author-img{width:3.5rem;height:3.5rem;border-radius:var(--radius-full);object-fit:cover;border:2px solid var(--color-border)}
.b-cs05__author-info{text-align:left}
.b-cs05__author-name{font-family:var(--font-heading);font-size:1rem;font-weight:600;color:var(--color-text);display:block}
.b-cs05__author-role{font-family:var(--font-body);font-size:.875rem;color:var(--color-text-muted);display:block;margin-top:.125rem}
.b-cs05__stats{display:grid;grid-template-columns:1fr;gap:1.5rem;padding-top:2.5rem;border-top:1px solid var(--color-border)}
.b-cs05__stat{text-align:center;padding:1.25rem}
.b-cs05__stat-value{font-family:var(--font-heading);font-size:clamp(2rem,4vw,2.75rem);font-weight:800;color:var(--color-primary);display:block;line-height:1.1;letter-spacing:-0.03em}
.b-cs05__stat-label{font-family:var(--font-body);font-size:.875rem;color:var(--color-text-muted);display:block;margin-top:.375rem}
@media(min-width:768px){.b-cs05__stats{grid-template-columns:repeat(3,1fr);gap:2rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-cs05{background:var(--color-primary)}.b-cs05__quote-mark{color:var(--color-accent)}.b-cs05__quote{color:var(--color-text-on-primary)}.b-cs05__author-img{border-color:color-mix(in srgb,var(--color-text-on-primary) 20%,transparent)}.b-cs05__author-name{color:var(--color-text-on-primary)}.b-cs05__author-role{color:color-mix(in srgb,var(--color-text-on-primary) 60%,transparent)}.b-cs05__stats{border-color:color-mix(in srgb,var(--color-text-on-primary) 15%,transparent)}.b-cs05__stat-value{color:var(--color-accent)}.b-cs05__stat-label{color:color-mix(in srgb,var(--color-text-on-primary) 60%,transparent)}` },
    { id: "surface-card", label: "На карточке", css: `.b-cs05__inner{background:var(--color-surface);border-radius:var(--radius-lg);padding:3rem 2.5rem;border:1px solid var(--color-border);max-width:900px}` },
  ],
};
