import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "footer-newsletter-01",
  name: "Футер — с подпиской",
  description: "Футер с формой подписки на рассылку, навигацией и копирайтом.",
  category: "footer",
  subcategory: "newsletter",
  icon: "✉",
  tags: ["footer", "newsletter", "subscription", "email", "navigation"],
  motionLevel: "css",
  fields: [
    { name: "footer-newsletter-heading", type: "heading", hint: "заголовок рассылки", required: true },
    { name: "footer-newsletter-text", type: "text", hint: "описание рассылки", required: false },
    { name: "footer-newsletter-placeholder", type: "text", hint: "плейсхолдер поля ввода", required: false },
    { name: "footer-newsletter-btn", type: "link", hint: "кнопка подписки", required: true },
    { name: "footer-logo", type: "text", hint: "логотип / название", required: true },
    { name: "footer-link", type: "link", hint: "ссылка навигации", required: false },
    { name: "footer-social", type: "icon", hint: "иконка соцсети", required: false },
    { name: "footer-copyright", type: "text", hint: "копирайт", required: true },
  ],
  html: `<footer class="b-fo07" data-block="footer">
  <div class="b-fo07__inner">
    <div class="b-fo07__newsletter" data-reveal="up" style="--stagger:0">
      <div class="b-fo07__newsletter-content">
        <h3 class="b-fo07__newsletter-heading" data-field="footer-newsletter-heading">Подпишитесь на рассылку</h3>
        <p class="b-fo07__newsletter-text" data-field="footer-newsletter-text">Получайте новости, статьи и специальные предложения первыми</p>
      </div>
      <div class="b-fo07__newsletter-form">
        <input class="b-fo07__input" type="email" data-field="footer-newsletter-placeholder" placeholder="Ваш email">
        <a class="b-fo07__btn" data-field="footer-newsletter-btn" href="#">Подписаться</a>
      </div>
    </div>
    <hr class="b-fo07__divider">
    <div class="b-fo07__main" data-reveal="up" style="--stagger:1">
      <div class="b-fo07__brand">
        <a class="b-fo07__logo" data-field="footer-logo" href="#">Медиа</a>
      </div>
      <nav class="b-fo07__nav" data-collection="footer-link">
        <a class="b-fo07__link" data-field="footer-link" href="#" data-collection-item>Главная</a>
        <a class="b-fo07__link" data-field="footer-link" href="#" data-collection-item>Статьи</a>
        <a class="b-fo07__link" data-field="footer-link" href="#" data-collection-item>Подкасты</a>
        <a class="b-fo07__link" data-field="footer-link" href="#" data-collection-item>О нас</a>
        <a class="b-fo07__link" data-field="footer-link" href="#" data-collection-item>Контакты</a>
      </nav>
      <div class="b-fo07__socials" data-collection="footer-social">
        <a class="b-fo07__social" data-field="footer-social" href="#" aria-label="Telegram" data-collection-item><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"></path><path d="M22 2L15 22L11 13L2 9L22 2Z"></path></svg></a>
        <a class="b-fo07__social" data-field="footer-social" href="#" aria-label="VK" data-collection-item><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.785 16.241s.288-.032.436-.192c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.598-.188 1.368 1.259 2.184 1.814.616.42 1.084.328 1.084.328l2.178-.03s1.14-.07.6-.964c-.045-.073-.32-.664-1.644-1.878-1.386-1.272-1.2-1.066.468-3.264.792-1.046 1.466-2.122 1.282-2.394-.176-.258-1.26-.12-1.26-.12l-2.45.016s-.182-.024-.316.056c-.132.078-.216.262-.216.262s-.39 1.038-.91 1.92c-1.098 1.866-1.536 1.964-1.716 1.848-.418-.272-.314-1.092-.314-1.674 0-1.82.276-2.58-.536-2.778-.27-.066-.468-.11-1.156-.116-.882-.01-1.63.002-2.052.21-.282.138-.498.446-.366.464.164.022.534.1.73.366.254.344.244 1.116.244 1.116s.146 2.14-.34 2.404c-.334.182-.792-.19-1.776-1.886-.504-.868-.884-1.828-.884-1.828s-.074-.18-.204-.276c-.158-.118-.378-.156-.378-.156l-2.328.016s-.35.01-.478.162c-.114.134-.01.414-.01.414s1.838 4.3 3.92 6.466c1.906 1.986 4.07 1.854 4.07 1.854h.98z"></path></svg></a>
        <a class="b-fo07__social" data-field="footer-social" href="#" aria-label="Instagram" data-collection-item><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"></rect><circle cx="12" cy="12" r="5"></circle><circle cx="17.5" cy="6.5" r="1.5"></circle></svg></a>
      </div>
    </div>
    <div class="b-fo07__bottom" data-reveal="fade" style="--stagger:2">
      <p class="b-fo07__copy" data-field="footer-copyright">© 2024 Медиа. Все права защищены.</p>
    </div>
  </div>
</footer>`,
  css: `.b-fo07{padding:var(--space-section) var(--space-block);background:var(--color-bg);font-family:var(--font-body);color:var(--color-text)}
.b-fo07__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-fo07__newsletter{display:flex;justify-content:space-between;align-items:center;gap:2rem;padding-bottom:2.5rem}
.b-fo07__newsletter-heading{font-family:var(--font-heading);font-size:1.25rem;font-weight:600;color:var(--color-text);margin-bottom:0.375rem}
.b-fo07__newsletter-text{color:var(--color-text-muted);font-size:0.9rem}
.b-fo07__newsletter-form{display:flex;gap:0.5rem;flex-shrink:0}
.b-fo07__input{padding:0.75rem 1rem;border:1px solid var(--color-border);border-radius:var(--radius-md);background:var(--color-bg);color:var(--color-text);font-size:0.9rem;font-family:var(--font-body);width:260px;outline:none;transition:border-color 0.2s}
.b-fo07__input:focus{border-color:var(--color-primary)}
.b-fo07__input::placeholder{color:var(--color-text-muted)}
.b-fo07__btn{display:inline-flex;align-items:center;padding:0.75rem 1.5rem;background:var(--color-primary);color:var(--color-text-on-primary);text-decoration:none;border-radius:var(--radius-md);font-weight:600;font-size:0.9rem;white-space:nowrap;transition:opacity 0.2s}
.b-fo07__btn:hover{opacity:0.85}
.b-fo07__divider{border:none;border-top:1px solid var(--color-border);margin:0 0 2rem}
.b-fo07__main{display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem}
.b-fo07__logo{font-family:var(--font-heading);font-size:1.125rem;font-weight:600;color:var(--color-text);text-decoration:none}
.b-fo07__nav{display:flex;gap:1.5rem}
.b-fo07__link{color:var(--color-text-muted);text-decoration:none;font-size:0.9rem;transition:color 0.2s}
.b-fo07__link:hover{color:var(--color-primary)}
.b-fo07__socials{display:flex;gap:0.75rem;align-items:center}
.b-fo07__social{color:var(--color-text-muted);transition:color 0.2s;display:flex;align-items:center}
.b-fo07__social:hover{color:var(--color-primary)}
.b-fo07__bottom{text-align:center;padding-top:1.5rem;border-top:1px solid var(--color-border)}
.b-fo07__copy{color:var(--color-text-muted);font-size:0.8rem}
@media(max-width:768px){.b-fo07__newsletter{flex-direction:column;text-align:center}.b-fo07__newsletter-form{width:100%;flex-direction:column}.b-fo07__input{width:100%}.b-fo07__main{flex-direction:column;gap:1.25rem;text-align:center}.b-fo07__nav{flex-wrap:wrap;justify-content:center;gap:1rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "surface-newsletter", label: "Подложка рассылки", css: `.b-fo07__newsletter{background:var(--color-bg-alt);padding:2rem;border-radius:var(--radius-lg);margin-bottom:2.5rem}` },
    { id: "dark", label: "Тёмный", css: `.b-fo07{background:var(--color-surface)}.b-fo07__input{background:var(--color-bg);border-color:var(--color-border)}` },
  ],
};
