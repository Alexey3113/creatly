import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "footer-dark-01",
  name: "Футер — тёмный премиум",
  description: "Тёмный премиальный футер с акцентной линией сверху, 4 колонки, элегантная типографика.",
  category: "footer",
  subcategory: "dark",
  icon: "■",
  tags: ["footer", "dark", "premium", "accent", "columns"],
  motionLevel: "css",
  fields: [
    { name: "footer-logo", type: "text", hint: "логотип / название", required: true },
    { name: "footer-description", type: "text", hint: "краткое описание", required: false },
    { name: "footer-col-title-1", type: "heading", hint: "заголовок колонки 1", required: true },
    { name: "footer-col-title-2", type: "heading", hint: "заголовок колонки 2", required: true },
    { name: "footer-col-title-3", type: "heading", hint: "заголовок колонки 3", required: true },
    { name: "footer-link", type: "link", hint: "ссылка навигации", required: false },
    { name: "footer-social", type: "icon", hint: "иконка соцсети", required: false },
    { name: "footer-contact-text", type: "text", hint: "контактная информация", required: false },
    { name: "footer-copyright", type: "text", hint: "копирайт", required: true },
  ],
  html: `<footer class="b-fo06" data-block="footer">
  <div class="b-fo06__accent-line"></div>
  <div class="b-fo06__inner">
    <div class="b-fo06__grid">
      <div class="b-fo06__col b-fo06__col--brand" data-reveal="up" style="--stagger:0">
        <a class="b-fo06__logo" data-field="footer-logo" href="#">Премиум</a>
        <p class="b-fo06__desc" data-field="footer-description">Создаём исключительный цифровой опыт для амбициозных брендов по всему миру.</p>
        <div class="b-fo06__socials" data-collection="footer-social">
          <a class="b-fo06__social" data-field="footer-social" href="#" aria-label="Telegram" data-collection-item><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"></path><path d="M22 2L15 22L11 13L2 9L22 2Z"></path></svg></a>
          <a class="b-fo06__social" data-field="footer-social" href="#" aria-label="Instagram" data-collection-item><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"></rect><circle cx="12" cy="12" r="5"></circle><circle cx="17.5" cy="6.5" r="1.5"></circle></svg></a>
          <a class="b-fo06__social" data-field="footer-social" href="#" aria-label="X" data-collection-item><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg></a>
        </div>
      </div>
      <div class="b-fo06__col" data-reveal="up" style="--stagger:1">
        <h4 class="b-fo06__heading" data-field="footer-col-title-1">Навигация</h4>
        <ul class="b-fo06__list" data-collection="footer-nav-links">
          <li data-collection-item><a class="b-fo06__link" data-field="footer-link" href="#">Главная</a></li>
          <li data-collection-item><a class="b-fo06__link" data-field="footer-link" href="#">О нас</a></li>
          <li data-collection-item><a class="b-fo06__link" data-field="footer-link" href="#">Проекты</a></li>
          <li data-collection-item><a class="b-fo06__link" data-field="footer-link" href="#">Карьера</a></li>
        </ul>
      </div>
      <div class="b-fo06__col" data-reveal="up" style="--stagger:2">
        <h4 class="b-fo06__heading" data-field="footer-col-title-2">Услуги</h4>
        <ul class="b-fo06__list" data-collection="footer-service-links">
          <li data-collection-item><a class="b-fo06__link" data-field="footer-link" href="#">Брендинг</a></li>
          <li data-collection-item><a class="b-fo06__link" data-field="footer-link" href="#">UX/UI дизайн</a></li>
          <li data-collection-item><a class="b-fo06__link" data-field="footer-link" href="#">Разработка</a></li>
          <li data-collection-item><a class="b-fo06__link" data-field="footer-link" href="#">Консалтинг</a></li>
        </ul>
      </div>
      <div class="b-fo06__col" data-reveal="up" style="--stagger:3">
        <h4 class="b-fo06__heading" data-field="footer-col-title-3">Контакты</h4>
        <ul class="b-fo06__list" data-collection="footer-contacts">
          <li data-collection-item><span class="b-fo06__contact" data-field="footer-contact-text">info@premium.ru</span></li>
          <li data-collection-item><span class="b-fo06__contact" data-field="footer-contact-text">+7 (495) 999-88-77</span></li>
          <li data-collection-item><span class="b-fo06__contact" data-field="footer-contact-text">Москва, Пресненская наб. 12</span></li>
        </ul>
      </div>
    </div>
    <div class="b-fo06__bottom" data-reveal="fade" style="--stagger:4">
      <p class="b-fo06__copy" data-field="footer-copyright">© 2024 Премиум. Все права защищены.</p>
    </div>
  </div>
</footer>`,
  css: `.b-fo06{background:var(--color-surface);font-family:var(--font-body);color:var(--color-text);position:relative}
.b-fo06__accent-line{height:3px;background:linear-gradient(90deg,var(--color-primary),var(--color-accent))}
.b-fo06__inner{max-width:var(--container-width,1400px);margin:0 auto;padding:var(--space-section) var(--space-block)}
.b-fo06__grid{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:3rem}
.b-fo06__logo{font-family:var(--font-heading);font-size:1.5rem;font-weight:700;color:var(--color-text);text-decoration:none;display:block;margin-bottom:1rem}
.b-fo06__desc{color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;max-width:260px;margin-bottom:1.5rem}
.b-fo06__socials{display:flex;gap:0.875rem;align-items:center}
.b-fo06__social{color:var(--color-text-muted);transition:color 0.2s;display:flex;align-items:center}
.b-fo06__social:hover{color:var(--color-accent)}
.b-fo06__heading{font-family:var(--font-heading);font-size:0.75rem;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;color:var(--color-text);margin-bottom:1.25rem}
.b-fo06__list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.625rem}
.b-fo06__link{color:var(--color-text-muted);text-decoration:none;font-size:0.9rem;transition:color 0.2s}
.b-fo06__link:hover{color:var(--color-accent)}
.b-fo06__contact{color:var(--color-text-muted);font-size:0.9rem}
.b-fo06__bottom{margin-top:3rem;padding-top:1.5rem;border-top:1px solid var(--color-border)}
.b-fo06__copy{color:var(--color-text-muted);font-size:0.8rem;letter-spacing:0.02em}
@media(max-width:768px){.b-fo06__grid{grid-template-columns:1fr 1fr;gap:2rem}.b-fo06__col--brand{grid-column:1/-1}}
@media(max-width:480px){.b-fo06__grid{grid-template-columns:1fr}}`,
  variants: [
    { id: "gradient-line", label: "Градиент", css: "" },
    { id: "solid-accent", label: "Одноцветная линия", css: `.b-fo06__accent-line{background:var(--color-primary)}` },
    { id: "no-line", label: "Без линии", css: `.b-fo06__accent-line{display:none}` },
  ],
};
