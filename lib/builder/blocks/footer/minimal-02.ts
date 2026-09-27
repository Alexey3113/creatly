import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "footer-minimal-02",
  name: "Футер — двухстрочный с разделителем",
  description: "Две строки: навигация сверху, копирайт и соцсети снизу, горизонтальный разделитель между ними.",
  category: "footer",
  subcategory: "minimal",
  icon: "≡",
  tags: ["footer", "minimal", "two-row", "divider"],
  motionLevel: "css",
  fields: [
    { name: "footer-link", type: "link", hint: "ссылка навигации", required: false },
    { name: "footer-social", type: "icon", hint: "иконка соцсети", required: false },
    { name: "footer-copyright", type: "text", hint: "копирайт", required: true },
  ],
  html: `<footer class="b-fo04" data-block="footer">
  <div class="b-fo04__inner">
    <nav class="b-fo04__nav" data-reveal="up" style="--stagger:0" data-collection="footer-link">
      <a class="b-fo04__link" data-field="footer-link" href="#" data-collection-item>Главная</a>
      <a class="b-fo04__link" data-field="footer-link" href="#" data-collection-item>О компании</a>
      <a class="b-fo04__link" data-field="footer-link" href="#" data-collection-item>Услуги</a>
      <a class="b-fo04__link" data-field="footer-link" href="#" data-collection-item>Портфолио</a>
      <a class="b-fo04__link" data-field="footer-link" href="#" data-collection-item>Блог</a>
      <a class="b-fo04__link" data-field="footer-link" href="#" data-collection-item>Контакты</a>
    </nav>
    <hr class="b-fo04__divider">
    <div class="b-fo04__bottom" data-reveal="fade" style="--stagger:1">
      <p class="b-fo04__copy" data-field="footer-copyright">© 2024 Компания. Все права защищены.</p>
      <div class="b-fo04__socials" data-collection="footer-social">
        <a class="b-fo04__social" data-field="footer-social" href="#" aria-label="Telegram" data-collection-item><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"></path><path d="M22 2L15 22L11 13L2 9L22 2Z"></path></svg></a>
        <a class="b-fo04__social" data-field="footer-social" href="#" aria-label="VK" data-collection-item><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.785 16.241s.288-.032.436-.192c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.598-.188 1.368 1.259 2.184 1.814.616.42 1.084.328 1.084.328l2.178-.03s1.14-.07.6-.964c-.045-.073-.32-.664-1.644-1.878-1.386-1.272-1.2-1.066.468-3.264.792-1.046 1.466-2.122 1.282-2.394-.176-.258-1.26-.12-1.26-.12l-2.45.016s-.182-.024-.316.056c-.132.078-.216.262-.216.262s-.39 1.038-.91 1.92c-1.098 1.866-1.536 1.964-1.716 1.848-.418-.272-.314-1.092-.314-1.674 0-1.82.276-2.58-.536-2.778-.27-.066-.468-.11-1.156-.116-.882-.01-1.63.002-2.052.21-.282.138-.498.446-.366.464.164.022.534.1.73.366.254.344.244 1.116.244 1.116s.146 2.14-.34 2.404c-.334.182-.792-.19-1.776-1.886-.504-.868-.884-1.828-.884-1.828s-.074-.18-.204-.276c-.158-.118-.378-.156-.378-.156l-2.328.016s-.35.01-.478.162c-.114.134-.01.414-.01.414s1.838 4.3 3.92 6.466c1.906 1.986 4.07 1.854 4.07 1.854h.98z"></path></svg></a>
        <a class="b-fo04__social" data-field="footer-social" href="#" aria-label="X" data-collection-item><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg></a>
      </div>
    </div>
  </div>
</footer>`,
  css: `.b-fo04{padding:var(--space-section) var(--space-block);background:var(--color-bg);font-family:var(--font-body);color:var(--color-text)}
.b-fo04__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-fo04__nav{display:flex;flex-wrap:wrap;justify-content:center;gap:2rem}
.b-fo04__link{color:var(--color-text);text-decoration:none;font-size:0.9rem;font-weight:500;transition:color 0.2s}
.b-fo04__link:hover{color:var(--color-primary)}
.b-fo04__divider{border:none;border-top:1px solid var(--color-border);margin:2rem 0}
.b-fo04__bottom{display:flex;justify-content:space-between;align-items:center}
.b-fo04__copy{color:var(--color-text-muted);font-size:0.85rem}
.b-fo04__socials{display:flex;gap:0.75rem;align-items:center}
.b-fo04__social{color:var(--color-text-muted);transition:color 0.2s;display:flex;align-items:center}
.b-fo04__social:hover{color:var(--color-primary)}
@media(max-width:768px){.b-fo04__nav{gap:1rem}.b-fo04__bottom{flex-direction:column;gap:1rem;text-align:center}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-fo04{background:var(--color-surface)}` },
    { id: "accent-line", label: "Акцентный разделитель", css: `.b-fo04__divider{border-color:var(--color-primary)}` },
  ],
};
