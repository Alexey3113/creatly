import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "footer-big-01",
  name: "Футер — большой расширенный",
  description: "Большой футер с логотипом, описанием компании, 4 колонками ссылок, соцсетями и копирайтом.",
  category: "footer",
  subcategory: "big",
  icon: "▧",
  tags: ["footer", "big", "extended", "columns", "social", "comprehensive"],
  motionLevel: "css",
  fields: [
    { name: "footer-logo", type: "text", hint: "логотип / название", required: true },
    { name: "footer-description", type: "text", hint: "описание компании", required: true },
    { name: "footer-col1-title", type: "heading", hint: "заголовок 1-й колонки", required: true },
    { name: "footer-col2-title", type: "heading", hint: "заголовок 2-й колонки", required: true },
    { name: "footer-col3-title", type: "heading", hint: "заголовок 3-й колонки", required: true },
    { name: "footer-col4-title", type: "heading", hint: "заголовок 4-й колонки", required: true },
    { name: "footer-link", type: "link", hint: "ссылка навигации", required: false },
    { name: "footer-social", type: "icon", hint: "иконка соцсети", required: false },
    { name: "footer-copyright", type: "text", hint: "копирайт", required: true },
    { name: "footer-legal-link", type: "link", hint: "юридическая ссылка", required: false },
  ],
  html: `<footer class="b-fo08" data-block="footer">
  <div class="b-fo08__inner">
    <div class="b-fo08__top">
      <div class="b-fo08__brand" data-reveal="up" style="--stagger:0">
        <a class="b-fo08__logo" data-field="footer-logo" href="#">Корпорация</a>
        <p class="b-fo08__desc" data-field="footer-description">Мы — команда профессионалов, создающих инновационные цифровые решения для бизнеса. Более 10 лет опыта и сотни успешных проектов.</p>
        <div class="b-fo08__socials" data-collection="footer-social">
          <a class="b-fo08__social" data-field="footer-social" href="#" aria-label="Telegram" data-collection-item><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"></path><path d="M22 2L15 22L11 13L2 9L22 2Z"></path></svg></a>
          <a class="b-fo08__social" data-field="footer-social" href="#" aria-label="VK" data-collection-item><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.785 16.241s.288-.032.436-.192c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.598-.188 1.368 1.259 2.184 1.814.616.42 1.084.328 1.084.328l2.178-.03s1.14-.07.6-.964c-.045-.073-.32-.664-1.644-1.878-1.386-1.272-1.2-1.066.468-3.264.792-1.046 1.466-2.122 1.282-2.394-.176-.258-1.26-.12-1.26-.12l-2.45.016s-.182-.024-.316.056c-.132.078-.216.262-.216.262s-.39 1.038-.91 1.92c-1.098 1.866-1.536 1.964-1.716 1.848-.418-.272-.314-1.092-.314-1.674 0-1.82.276-2.58-.536-2.778-.27-.066-.468-.11-1.156-.116-.882-.01-1.63.002-2.052.21-.282.138-.498.446-.366.464.164.022.534.1.73.366.254.344.244 1.116.244 1.116s.146 2.14-.34 2.404c-.334.182-.792-.19-1.776-1.886-.504-.868-.884-1.828-.884-1.828s-.074-.18-.204-.276c-.158-.118-.378-.156-.378-.156l-2.328.016s-.35.01-.478.162c-.114.134-.01.414-.01.414s1.838 4.3 3.92 6.466c1.906 1.986 4.07 1.854 4.07 1.854h.98z"></path></svg></a>
          <a class="b-fo08__social" data-field="footer-social" href="#" aria-label="Instagram" data-collection-item><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"></rect><circle cx="12" cy="12" r="5"></circle><circle cx="17.5" cy="6.5" r="1.5"></circle></svg></a>
          <a class="b-fo08__social" data-field="footer-social" href="#" aria-label="X" data-collection-item><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg></a>
        </div>
      </div>
      <div class="b-fo08__columns">
        <div class="b-fo08__col" data-reveal="up" style="--stagger:1">
          <h4 class="b-fo08__heading" data-field="footer-col1-title">Компания</h4>
          <ul class="b-fo08__list" data-collection="footer-link">
            <li data-collection-item><a class="b-fo08__link" data-field="footer-link" href="#">О нас</a></li>
            <li data-collection-item><a class="b-fo08__link" data-field="footer-link" href="#">Команда</a></li>
            <li data-collection-item><a class="b-fo08__link" data-field="footer-link" href="#">Карьера</a></li>
            <li data-collection-item><a class="b-fo08__link" data-field="footer-link" href="#">Новости</a></li>
            <li data-collection-item><a class="b-fo08__link" data-field="footer-link" href="#">Партнёры</a></li>
          </ul>
        </div>
        <div class="b-fo08__col" data-reveal="up" style="--stagger:2">
          <h4 class="b-fo08__heading" data-field="footer-col2-title">Услуги</h4>
          <ul class="b-fo08__list" data-collection="footer-link-2">
            <li data-collection-item><a class="b-fo08__link" data-field="footer-link" href="#">Веб-разработка</a></li>
            <li data-collection-item><a class="b-fo08__link" data-field="footer-link" href="#">Мобильные приложения</a></li>
            <li data-collection-item><a class="b-fo08__link" data-field="footer-link" href="#">UX/UI дизайн</a></li>
            <li data-collection-item><a class="b-fo08__link" data-field="footer-link" href="#">SEO продвижение</a></li>
            <li data-collection-item><a class="b-fo08__link" data-field="footer-link" href="#">Аналитика</a></li>
          </ul>
        </div>
        <div class="b-fo08__col" data-reveal="up" style="--stagger:3">
          <h4 class="b-fo08__heading" data-field="footer-col3-title">Ресурсы</h4>
          <ul class="b-fo08__list" data-collection="footer-link-3">
            <li data-collection-item><a class="b-fo08__link" data-field="footer-link" href="#">Блог</a></li>
            <li data-collection-item><a class="b-fo08__link" data-field="footer-link" href="#">Кейсы</a></li>
            <li data-collection-item><a class="b-fo08__link" data-field="footer-link" href="#">Документация</a></li>
            <li data-collection-item><a class="b-fo08__link" data-field="footer-link" href="#">FAQ</a></li>
            <li data-collection-item><a class="b-fo08__link" data-field="footer-link" href="#">Вебинары</a></li>
          </ul>
        </div>
        <div class="b-fo08__col" data-reveal="up" style="--stagger:4">
          <h4 class="b-fo08__heading" data-field="footer-col4-title">Контакты</h4>
          <ul class="b-fo08__list">
            <li><span class="b-fo08__contact">info@corp.ru</span></li>
            <li><span class="b-fo08__contact">+7 (495) 555-00-11</span></li>
            <li><span class="b-fo08__contact">+7 (495) 555-00-22</span></li>
            <li><span class="b-fo08__contact">Москва, Тверская ул. 1</span></li>
            <li><span class="b-fo08__contact">Пн–Пт: 9:00–18:00</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="b-fo08__bottom" data-reveal="fade" style="--stagger:5">
      <p class="b-fo08__copy" data-field="footer-copyright">© 2024 Корпорация. Все права защищены.</p>
      <nav class="b-fo08__legal" data-collection="footer-legal-link">
        <a class="b-fo08__legal-link" data-field="footer-legal-link" href="#" data-collection-item>Политика конфиденциальности</a>
        <a class="b-fo08__legal-link" data-field="footer-legal-link" href="#" data-collection-item>Условия использования</a>
        <a class="b-fo08__legal-link" data-field="footer-legal-link" href="#" data-collection-item>Карта сайта</a>
      </nav>
    </div>
  </div>
</footer>`,
  css: `.b-fo08{padding:var(--space-section) var(--space-block);background:var(--color-bg);font-family:var(--font-body);color:var(--color-text)}
.b-fo08__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-fo08__top{display:grid;grid-template-columns:1.2fr 2.8fr;gap:4rem;margin-bottom:3rem}
.b-fo08__logo{font-family:var(--font-heading);font-size:1.5rem;font-weight:700;color:var(--color-text);text-decoration:none;display:block;margin-bottom:1rem}
.b-fo08__desc{color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;margin-bottom:1.5rem;max-width:300px}
.b-fo08__socials{display:flex;gap:1rem;align-items:center}
.b-fo08__social{color:var(--color-text-muted);transition:color 0.2s;display:flex;align-items:center}
.b-fo08__social:hover{color:var(--color-primary)}
.b-fo08__columns{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem}
.b-fo08__heading{font-family:var(--font-heading);font-size:0.8rem;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:var(--color-text);margin-bottom:1.25rem}
.b-fo08__list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.625rem}
.b-fo08__link{color:var(--color-text-muted);text-decoration:none;font-size:0.9rem;transition:color 0.2s}
.b-fo08__link:hover{color:var(--color-primary)}
.b-fo08__contact{color:var(--color-text-muted);font-size:0.9rem}
.b-fo08__bottom{display:flex;justify-content:space-between;align-items:center;padding-top:2rem;border-top:1px solid var(--color-border)}
.b-fo08__copy{color:var(--color-text-muted);font-size:0.8rem}
.b-fo08__legal{display:flex;gap:1.5rem}
.b-fo08__legal-link{color:var(--color-text-muted);text-decoration:none;font-size:0.8rem;transition:color 0.2s}
.b-fo08__legal-link:hover{color:var(--color-primary)}
@media(max-width:1024px){.b-fo08__top{grid-template-columns:1fr}.b-fo08__columns{grid-template-columns:repeat(2,1fr)}}
@media(max-width:768px){.b-fo08__columns{grid-template-columns:1fr}.b-fo08__bottom{flex-direction:column;gap:1rem;text-align:center}.b-fo08__legal{flex-wrap:wrap;justify-content:center;gap:1rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-fo08{background:var(--color-surface)}` },
    { id: "accent-top", label: "Акцентная линия", css: `.b-fo08{border-top:3px solid var(--color-primary)}` },
  ],
};
