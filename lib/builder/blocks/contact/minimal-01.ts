import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "contact-minimal-01",
  name: "Контакт — минимальный",
  description: "Минималистичный блок: email, телефон и ссылки на соцсети",
  category: "contact",
  subcategory: "minimal",
  icon: "◯",
  tags: ["contact", "minimal", "social", "email", "phone"],
  motionLevel: "css",
  fields: [
    { name: "contact-heading", type: "heading", hint: "Заголовок", required: true },
    { name: "contact-email", type: "text", hint: "Email", required: true },
    { name: "contact-phone", type: "text", hint: "Телефон", required: true },
    { name: "social-telegram", type: "link", hint: "Ссылка Telegram", required: false },
    { name: "social-vk", type: "link", hint: "Ссылка VK", required: false },
    { name: "social-youtube", type: "link", hint: "Ссылка YouTube", required: false },
  ],
  html: `<section class="b-cn05" data-block="contact">
  <div class="b-cn05__inner">
    <h2 class="b-cn05__heading" data-field="contact-heading" data-reveal="up" style="--stagger:0">Контакты</h2>
    <div class="b-cn05__contacts" data-reveal="up" style="--stagger:1">
      <a class="b-cn05__link" href="mailto:info@company.ru" data-field="contact-email">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        info@company.ru
      </a>
      <span class="b-cn05__divider"></span>
      <a class="b-cn05__link" href="tel:+74951234567" data-field="contact-phone">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        +7 (495) 123-45-67
      </a>
    </div>
    <div class="b-cn05__social" data-reveal="up" style="--stagger:2">
      <a class="b-cn05__social-link" href="#" data-field="social-telegram" aria-label="Telegram">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
      </a>
      <a class="b-cn05__social-link" href="#" data-field="social-vk" aria-label="VKontakte">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.12-5.335-3.202C4.624 10.857 4 8.756 4 8.4c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.864 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V10.5c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.644v3.168c0 .373.17.508.271.508.22 0 .407-.135.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.762-.491h1.744c.525 0 .644.27.525.644-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.78 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.491-.085.745-.576.745z"/></svg>
      </a>
      <a class="b-cn05__social-link" href="#" data-field="social-youtube" aria-label="YouTube">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
      </a>
    </div>
  </div>
</section>`,
  css: `.b-cn05{background:var(--color-bg);padding:var(--space-section) var(--space-block)}
.b-cn05__inner{max-width:720px;margin:0 auto;text-align:center}
.b-cn05__heading{font-family:var(--font-heading);font-size:clamp(2rem,4vw,3rem);color:var(--color-text);margin:0 0 2.5rem}
.b-cn05__contacts{display:flex;align-items:center;justify-content:center;gap:1.5rem;margin-bottom:2.5rem;flex-wrap:wrap}
.b-cn05__link{display:inline-flex;align-items:center;gap:0.5rem;font-family:var(--font-body);font-size:1.125rem;color:var(--color-text);text-decoration:none;transition:color 0.2s}
.b-cn05__link:hover{color:var(--color-primary)}
.b-cn05__divider{width:1px;height:24px;background:var(--color-border)}
.b-cn05__social{display:flex;align-items:center;justify-content:center;gap:1.25rem}
.b-cn05__social-link{display:flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:var(--radius-full);background:var(--color-bg-alt);color:var(--color-text-muted);text-decoration:none;transition:background 0.2s,color 0.2s}
.b-cn05__social-link:hover{background:var(--color-primary);color:var(--color-text-on-primary)}
@media(max-width:768px){.b-cn05__contacts{flex-direction:column;gap:1rem}.b-cn05__divider{width:40px;height:1px}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-cn05{background:var(--color-bg-alt)}` },
    { id: "bordered", label: "С рамкой", css: `.b-cn05__inner{border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:3rem}` },
  ],
};
