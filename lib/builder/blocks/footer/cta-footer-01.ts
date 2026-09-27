import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "footer-cta-footer-01",
  name: "Футер — CTA + навигация",
  description: "Футер с CTA-секцией сверху (заголовок + кнопка) и навигацией снизу.",
  category: "footer",
  subcategory: "cta-footer",
  icon: "▣",
  tags: ["footer", "cta", "action", "navigation", "conversion"],
  motionLevel: "css",
  fields: [
    { name: "footer-cta-heading", type: "heading", hint: "заголовок CTA", required: true },
    { name: "footer-cta-text", type: "text", hint: "подзаголовок CTA", required: false },
    { name: "footer-cta-button", type: "link", hint: "кнопка CTA", required: true },
    { name: "footer-logo", type: "text", hint: "логотип / название", required: true },
    { name: "footer-link", type: "link", hint: "ссылка навигации", required: false },
    { name: "footer-social", type: "icon", hint: "иконка соцсети", required: false },
    { name: "footer-copyright", type: "text", hint: "копирайт", required: true },
  ],
  html: `<footer class="b-fo05" data-block="footer">
  <div class="b-fo05__inner">
    <div class="b-fo05__cta" data-reveal="up" style="--stagger:0">
      <h2 class="b-fo05__cta-heading" data-field="footer-cta-heading">Готовы начать проект?</h2>
      <p class="b-fo05__cta-text" data-field="footer-cta-text">Свяжитесь с нами и мы обсудим вашу идею</p>
      <a class="b-fo05__cta-btn" data-field="footer-cta-button" href="#">Обсудить проект</a>
    </div>
    <hr class="b-fo05__divider">
    <div class="b-fo05__main" data-reveal="up" style="--stagger:1">
      <div class="b-fo05__brand">
        <a class="b-fo05__logo" data-field="footer-logo" href="#">Агентство</a>
      </div>
      <nav class="b-fo05__nav" data-collection="footer-link">
        <a class="b-fo05__link" data-field="footer-link" href="#" data-collection-item>Проекты</a>
        <a class="b-fo05__link" data-field="footer-link" href="#" data-collection-item>Услуги</a>
        <a class="b-fo05__link" data-field="footer-link" href="#" data-collection-item>Команда</a>
        <a class="b-fo05__link" data-field="footer-link" href="#" data-collection-item>Блог</a>
        <a class="b-fo05__link" data-field="footer-link" href="#" data-collection-item>Контакты</a>
      </nav>
      <div class="b-fo05__socials" data-collection="footer-social">
        <a class="b-fo05__social" data-field="footer-social" href="#" aria-label="Telegram" data-collection-item><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"></path><path d="M22 2L15 22L11 13L2 9L22 2Z"></path></svg></a>
        <a class="b-fo05__social" data-field="footer-social" href="#" aria-label="Instagram" data-collection-item><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"></rect><circle cx="12" cy="12" r="5"></circle><circle cx="17.5" cy="6.5" r="1.5"></circle></svg></a>
        <a class="b-fo05__social" data-field="footer-social" href="#" aria-label="X" data-collection-item><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg></a>
      </div>
    </div>
    <div class="b-fo05__bottom" data-reveal="fade" style="--stagger:2">
      <p class="b-fo05__copy" data-field="footer-copyright">© 2024 Агентство. Все права защищены.</p>
    </div>
  </div>
</footer>`,
  css: `.b-fo05{padding:var(--space-section) var(--space-block);background:var(--color-bg);font-family:var(--font-body);color:var(--color-text)}
.b-fo05__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-fo05__cta{text-align:center;padding-bottom:3rem}
.b-fo05__cta-heading{font-family:var(--font-heading);font-size:clamp(1.75rem,4vw,2.5rem);font-weight:700;color:var(--color-text);margin-bottom:0.75rem}
.b-fo05__cta-text{color:var(--color-text-muted);font-size:1.05rem;margin-bottom:1.75rem;max-width:480px;margin-left:auto;margin-right:auto}
.b-fo05__cta-btn{display:inline-block;padding:0.875rem 2.25rem;background:var(--color-primary);color:var(--color-text-on-primary);text-decoration:none;border-radius:var(--radius-full);font-weight:600;font-size:0.95rem;transition:opacity 0.2s}
.b-fo05__cta-btn:hover{opacity:0.85}
.b-fo05__divider{border:none;border-top:1px solid var(--color-border);margin:0 0 2.5rem}
.b-fo05__main{display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem}
.b-fo05__logo{font-family:var(--font-heading);font-size:1.125rem;font-weight:600;color:var(--color-text);text-decoration:none}
.b-fo05__nav{display:flex;gap:1.5rem}
.b-fo05__link{color:var(--color-text-muted);text-decoration:none;font-size:0.9rem;transition:color 0.2s}
.b-fo05__link:hover{color:var(--color-primary)}
.b-fo05__socials{display:flex;gap:0.75rem;align-items:center}
.b-fo05__social{color:var(--color-text-muted);transition:color 0.2s;display:flex;align-items:center}
.b-fo05__social:hover{color:var(--color-primary)}
.b-fo05__bottom{text-align:center;padding-top:1.5rem;border-top:1px solid var(--color-border)}
.b-fo05__copy{color:var(--color-text-muted);font-size:0.8rem}
@media(max-width:768px){.b-fo05__main{flex-direction:column;gap:1.25rem;text-align:center}.b-fo05__nav{flex-wrap:wrap;justify-content:center;gap:1rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "accent-cta", label: "Акцентный CTA", css: `.b-fo05__cta{background:var(--color-bg-alt);padding:3rem;border-radius:var(--radius-lg);margin-bottom:2.5rem}` },
    { id: "dark", label: "Тёмный", css: `.b-fo05{background:var(--color-surface)}` },
  ],
};
