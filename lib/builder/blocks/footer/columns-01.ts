import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "footer-columns-01",
  name: "Футер — 4 колонки",
  description: "Классический футер с 4 колонками: логотип и описание, навигация, услуги, контакты. Копирайт внизу.",
  category: "footer",
  subcategory: "columns",
  icon: "▦",
  tags: ["footer", "columns", "navigation", "contacts", "classic"],
  motionLevel: "css",
  fields: [
    { name: "footer-logo", type: "text", hint: "название компании / логотип", required: true },
    { name: "footer-description", type: "text", hint: "краткое описание компании", required: true },
    { name: "footer-nav-title", type: "heading", hint: "заголовок навигации", required: true },
    { name: "footer-nav-link", type: "link", hint: "ссылка навигации", required: false },
    { name: "footer-services-title", type: "heading", hint: "заголовок услуг", required: true },
    { name: "footer-services-link", type: "link", hint: "ссылка услуги", required: false },
    { name: "footer-contacts-title", type: "heading", hint: "заголовок контактов", required: true },
    { name: "footer-contact-text", type: "text", hint: "контактная информация", required: false },
    { name: "footer-copyright", type: "text", hint: "копирайт", required: true },
  ],
  html: `<footer class="b-fo01" data-block="footer">
  <div class="b-fo01__inner">
    <div class="b-fo01__grid">
      <div class="b-fo01__col b-fo01__col--brand" data-reveal="up" style="--stagger:0">
        <a class="b-fo01__logo" data-field="footer-logo" href="#">Креатив</a>
        <p class="b-fo01__desc" data-field="footer-description">Мы создаём цифровые продукты, которые помогают бизнесу расти и развиваться в современном мире.</p>
      </div>
      <div class="b-fo01__col" data-reveal="up" style="--stagger:1">
        <h4 class="b-fo01__heading" data-field="footer-nav-title">Компания</h4>
        <ul class="b-fo01__list" data-collection="footer-nav-link">
          <li data-collection-item><a class="b-fo01__link" data-field="footer-nav-link" href="#">О нас</a></li>
          <li data-collection-item><a class="b-fo01__link" data-field="footer-nav-link" href="#">Команда</a></li>
          <li data-collection-item><a class="b-fo01__link" data-field="footer-nav-link" href="#">Карьера</a></li>
          <li data-collection-item><a class="b-fo01__link" data-field="footer-nav-link" href="#">Блог</a></li>
        </ul>
      </div>
      <div class="b-fo01__col" data-reveal="up" style="--stagger:2">
        <h4 class="b-fo01__heading" data-field="footer-services-title">Услуги</h4>
        <ul class="b-fo01__list" data-collection="footer-services-link">
          <li data-collection-item><a class="b-fo01__link" data-field="footer-services-link" href="#">Веб-дизайн</a></li>
          <li data-collection-item><a class="b-fo01__link" data-field="footer-services-link" href="#">Разработка</a></li>
          <li data-collection-item><a class="b-fo01__link" data-field="footer-services-link" href="#">Маркетинг</a></li>
          <li data-collection-item><a class="b-fo01__link" data-field="footer-services-link" href="#">Аналитика</a></li>
        </ul>
      </div>
      <div class="b-fo01__col" data-reveal="up" style="--stagger:3">
        <h4 class="b-fo01__heading" data-field="footer-contacts-title">Контакты</h4>
        <ul class="b-fo01__list" data-collection="footer-contact-text">
          <li data-collection-item><span class="b-fo01__contact" data-field="footer-contact-text">hello@creative.ru</span></li>
          <li data-collection-item><span class="b-fo01__contact" data-field="footer-contact-text">+7 (495) 123-45-67</span></li>
          <li data-collection-item><span class="b-fo01__contact" data-field="footer-contact-text">Москва, ул. Примерная, 42</span></li>
        </ul>
      </div>
    </div>
    <div class="b-fo01__bottom" data-reveal="fade" style="--stagger:4">
      <p class="b-fo01__copy" data-field="footer-copyright">© 2024 Креатив. Все права защищены.</p>
    </div>
  </div>
</footer>`,
  css: `.b-fo01{padding:var(--space-section) var(--space-block);background:var(--color-bg);font-family:var(--font-body);color:var(--color-text)}
.b-fo01__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-fo01__grid{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:3rem}
.b-fo01__logo{font-family:var(--font-heading);font-size:1.5rem;font-weight:700;color:var(--color-text);text-decoration:none;display:block;margin-bottom:1rem}
.b-fo01__desc{color:var(--color-text-muted);font-size:0.95rem;line-height:1.6;max-width:280px}
.b-fo01__heading{font-family:var(--font-heading);font-size:0.875rem;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:var(--color-text);margin-bottom:1.25rem}
.b-fo01__list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.75rem}
.b-fo01__link{color:var(--color-text-muted);text-decoration:none;font-size:0.95rem;transition:color 0.2s}
.b-fo01__link:hover{color:var(--color-primary)}
.b-fo01__contact{color:var(--color-text-muted);font-size:0.95rem}
.b-fo01__bottom{margin-top:3rem;padding-top:1.5rem;border-top:1px solid var(--color-border)}
.b-fo01__copy{color:var(--color-text-muted);font-size:0.85rem}
@media(max-width:768px){.b-fo01__grid{grid-template-columns:1fr 1fr;gap:2rem}.b-fo01__col--brand{grid-column:1/-1}}
@media(max-width:480px){.b-fo01__grid{grid-template-columns:1fr}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-fo01{background:var(--color-surface)}.b-fo01__bottom{border-color:var(--color-border)}` },
    { id: "accent-border", label: "С акцентом", css: `.b-fo01__bottom{border-color:var(--color-primary)}.b-fo01__logo{color:var(--color-primary)}` },
  ],
};
