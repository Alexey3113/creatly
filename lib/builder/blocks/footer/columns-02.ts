import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "footer-columns-02",
  name: "Футер — 3 колонки элегантный",
  description: "Тонкий элегантный футер с 3 колонками: логотип, ссылки, социальные иконки.",
  category: "footer",
  subcategory: "columns",
  icon: "▤",
  tags: ["footer", "columns", "elegant", "social", "minimal"],
  motionLevel: "css",
  fields: [
    { name: "footer-logo", type: "text", hint: "логотип / название", required: true },
    { name: "footer-tagline", type: "text", hint: "слоган под логотипом", required: false },
    { name: "footer-link", type: "link", hint: "ссылка навигации", required: false },
    { name: "footer-social", type: "icon", hint: "иконка соцсети", required: false },
    { name: "footer-copyright", type: "text", hint: "копирайт", required: true },
  ],
  html: `<footer class="b-fo02" data-block="footer">
  <div class="b-fo02__inner">
    <div class="b-fo02__grid">
      <div class="b-fo02__col" data-reveal="up" style="--stagger:0">
        <a class="b-fo02__logo" data-field="footer-logo" href="#">Студия</a>
        <p class="b-fo02__tagline" data-field="footer-tagline">Дизайн и технологии</p>
      </div>
      <div class="b-fo02__col b-fo02__col--links" data-reveal="up" style="--stagger:1">
        <nav class="b-fo02__nav" data-collection="footer-link">
          <a class="b-fo02__link" data-field="footer-link" href="#" data-collection-item>Проекты</a>
          <a class="b-fo02__link" data-field="footer-link" href="#" data-collection-item>Услуги</a>
          <a class="b-fo02__link" data-field="footer-link" href="#" data-collection-item>О нас</a>
          <a class="b-fo02__link" data-field="footer-link" href="#" data-collection-item>Контакты</a>
          <a class="b-fo02__link" data-field="footer-link" href="#" data-collection-item>Блог</a>
        </nav>
      </div>
      <div class="b-fo02__col b-fo02__col--social" data-reveal="up" style="--stagger:2">
        <div class="b-fo02__socials" data-collection="footer-social">
          <a class="b-fo02__social" data-field="footer-social" href="#" aria-label="Telegram" data-collection-item><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"></path><path d="M22 2L15 22L11 13L2 9L22 2Z"></path></svg></a>
          <a class="b-fo02__social" data-field="footer-social" href="#" aria-label="VK" data-collection-item><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.785 16.241s.288-.032.436-.192c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.598-.188 1.368 1.259 2.184 1.814.616.42 1.084.328 1.084.328l2.178-.03s1.14-.07.6-.964c-.045-.073-.32-.664-1.644-1.878-1.386-1.272-1.2-1.066.468-3.264.792-1.046 1.466-2.122 1.282-2.394-.176-.258-1.26-.12-1.26-.12l-2.45.016s-.182-.024-.316.056c-.132.078-.216.262-.216.262s-.39 1.038-.91 1.92c-1.098 1.866-1.536 1.964-1.716 1.848-.418-.272-.314-1.092-.314-1.674 0-1.82.276-2.58-.536-2.778-.27-.066-.468-.11-1.156-.116-.882-.01-1.63.002-2.052.21-.282.138-.498.446-.366.464.164.022.534.1.73.366.254.344.244 1.116.244 1.116s.146 2.14-.34 2.404c-.334.182-.792-.19-1.776-1.886-.504-.868-.884-1.828-.884-1.828s-.074-.18-.204-.276c-.158-.118-.378-.156-.378-.156l-2.328.016s-.35.01-.478.162c-.114.134-.01.414-.01.414s1.838 4.3 3.92 6.466c1.906 1.986 4.07 1.854 4.07 1.854h.98z"></path></svg></a>
          <a class="b-fo02__social" data-field="footer-social" href="#" aria-label="Instagram" data-collection-item><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"></rect><circle cx="12" cy="12" r="5"></circle><circle cx="17.5" cy="6.5" r="1.5"></circle></svg></a>
        </div>
      </div>
    </div>
    <div class="b-fo02__bottom" data-reveal="fade" style="--stagger:3">
      <p class="b-fo02__copy" data-field="footer-copyright">© 2024 Студия. Все права защищены.</p>
    </div>
  </div>
</footer>`,
  css: `.b-fo02{padding:var(--space-section) var(--space-block);background:var(--color-bg);font-family:var(--font-body);color:var(--color-text)}
.b-fo02__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-fo02__grid{display:grid;grid-template-columns:1fr 2fr 1fr;gap:2rem;align-items:start}
.b-fo02__logo{font-family:var(--font-heading);font-size:1.25rem;font-weight:600;color:var(--color-text);text-decoration:none;display:block;margin-bottom:0.25rem}
.b-fo02__tagline{color:var(--color-text-muted);font-size:0.8rem;letter-spacing:0.05em;text-transform:uppercase}
.b-fo02__nav{display:flex;flex-wrap:wrap;gap:1.5rem;justify-content:center}
.b-fo02__link{color:var(--color-text-muted);text-decoration:none;font-size:0.9rem;transition:color 0.2s;position:relative}
.b-fo02__link:hover{color:var(--color-primary)}
.b-fo02__link::after{content:"";position:absolute;bottom:-2px;left:0;width:0;height:1px;background:var(--color-primary);transition:width 0.3s}
.b-fo02__link:hover::after{width:100%}
.b-fo02__col--social{display:flex;justify-content:flex-end}
.b-fo02__socials{display:flex;gap:1rem;align-items:center}
.b-fo02__social{color:var(--color-text-muted);transition:color 0.2s;display:flex;align-items:center}
.b-fo02__social:hover{color:var(--color-primary)}
.b-fo02__bottom{margin-top:2.5rem;padding-top:1.25rem;border-top:1px solid var(--color-border);text-align:center}
.b-fo02__copy{color:var(--color-text-muted);font-size:0.8rem;letter-spacing:0.03em}
@media(max-width:768px){.b-fo02__grid{grid-template-columns:1fr;text-align:center;gap:1.5rem}.b-fo02__col--social{justify-content:center}.b-fo02__nav{justify-content:center}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "bordered", label: "С рамкой сверху", css: `.b-fo02{border-top:1px solid var(--color-border)}` },
    { id: "accent-bg", label: "Альтернативный фон", css: `.b-fo02{background:var(--color-bg-alt)}` },
  ],
};
