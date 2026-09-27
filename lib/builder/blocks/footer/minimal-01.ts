import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "footer-minimal-01",
  name: "Футер — минимал однострочный",
  description: "Минимальный однострочный футер: логотип слева, ссылки по центру, соцсети справа.",
  category: "footer",
  subcategory: "minimal",
  icon: "─",
  tags: ["footer", "minimal", "single-row", "clean"],
  motionLevel: "css",
  fields: [
    { name: "footer-logo", type: "text", hint: "логотип / название", required: true },
    { name: "footer-link", type: "link", hint: "ссылка навигации", required: false },
    { name: "footer-social", type: "icon", hint: "иконка соцсети", required: false },
  ],
  html: `<footer class="b-fo03" data-block="footer">
  <div class="b-fo03__inner" data-reveal="fade" style="--stagger:0">
    <a class="b-fo03__logo" data-field="footer-logo" href="#">Бренд</a>
    <nav class="b-fo03__nav" data-collection="footer-link">
      <a class="b-fo03__link" data-field="footer-link" href="#" data-collection-item>Главная</a>
      <a class="b-fo03__link" data-field="footer-link" href="#" data-collection-item>Проекты</a>
      <a class="b-fo03__link" data-field="footer-link" href="#" data-collection-item>О нас</a>
      <a class="b-fo03__link" data-field="footer-link" href="#" data-collection-item>Контакты</a>
    </nav>
    <div class="b-fo03__socials" data-collection="footer-social">
      <a class="b-fo03__social" data-field="footer-social" href="#" aria-label="Telegram" data-collection-item><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"></path><path d="M22 2L15 22L11 13L2 9L22 2Z"></path></svg></a>
      <a class="b-fo03__social" data-field="footer-social" href="#" aria-label="X" data-collection-item><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg></a>
      <a class="b-fo03__social" data-field="footer-social" href="#" aria-label="Instagram" data-collection-item><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"></rect><circle cx="12" cy="12" r="5"></circle><circle cx="17.5" cy="6.5" r="1.5"></circle></svg></a>
    </div>
  </div>
</footer>`,
  css: `.b-fo03{padding:1.5rem var(--space-block);background:var(--color-bg);font-family:var(--font-body);color:var(--color-text)}
.b-fo03__inner{max-width:var(--container-width,1400px);margin:0 auto;display:flex;align-items:center;justify-content:space-between}
.b-fo03__logo{font-family:var(--font-heading);font-size:1.125rem;font-weight:600;color:var(--color-text);text-decoration:none}
.b-fo03__nav{display:flex;gap:1.5rem}
.b-fo03__link{color:var(--color-text-muted);text-decoration:none;font-size:0.875rem;transition:color 0.2s}
.b-fo03__link:hover{color:var(--color-primary)}
.b-fo03__socials{display:flex;gap:0.75rem;align-items:center}
.b-fo03__social{color:var(--color-text-muted);transition:color 0.2s;display:flex;align-items:center}
.b-fo03__social:hover{color:var(--color-primary)}
@media(max-width:768px){.b-fo03__inner{flex-direction:column;gap:1rem;text-align:center}.b-fo03__nav{flex-wrap:wrap;justify-content:center;gap:1rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "bordered", label: "С линией", css: `.b-fo03{border-top:1px solid var(--color-border)}` },
    { id: "surface", label: "На подложке", css: `.b-fo03{background:var(--color-surface);border-radius:var(--radius-lg);margin:0 var(--space-block) var(--space-block)}` },
  ],
};
