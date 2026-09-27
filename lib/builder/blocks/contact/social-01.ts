import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "contact-social-01",
  name: "Контакт — соцсети",
  description: "Заголовок с крупными иконками социальных сетей и email-контактом",
  category: "contact",
  subcategory: "social",
  icon: "🔗",
  tags: ["contact", "social", "links", "icons", "telegram", "vk"],
  motionLevel: "css",
  fields: [
    { name: "contact-heading", type: "heading", hint: "Заголовок", required: true },
    { name: "contact-description", type: "text", hint: "Описание", required: false },
    { name: "contact-email", type: "text", hint: "Email", required: true },
    { name: "social-telegram", type: "link", hint: "Telegram", required: false },
    { name: "social-vk", type: "link", hint: "VKontakte", required: false },
    { name: "social-youtube", type: "link", hint: "YouTube", required: false },
    { name: "social-instagram", type: "link", hint: "Instagram", required: false },
    { name: "social-github", type: "link", hint: "GitHub", required: false },
  ],
  html: `<section class="b-cn07" data-block="contact">
  <div class="b-cn07__inner">
    <h2 class="b-cn07__heading" data-field="contact-heading" data-reveal="up" style="--stagger:0">Мы в социальных сетях</h2>
    <p class="b-cn07__desc" data-field="contact-description" data-reveal="up" style="--stagger:1">Подписывайтесь, чтобы быть в курсе новостей и обновлений</p>
    <div class="b-cn07__grid" data-reveal="scale" style="--stagger:2">
      <a class="b-cn07__card" href="#" data-field="social-telegram" aria-label="Telegram">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
        <span class="b-cn07__card-label">Telegram</span>
      </a>
      <a class="b-cn07__card" href="#" data-field="social-vk" aria-label="VKontakte">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.12-5.335-3.202C4.624 10.857 4 8.756 4 8.4c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.864 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V10.5c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.644v3.168c0 .373.17.508.271.508.22 0 .407-.135.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.762-.491h1.744c.525 0 .644.27.525.644-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.78 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.491-.085.745-.576.745z"/></svg>
        <span class="b-cn07__card-label">ВКонтакте</span>
      </a>
      <a class="b-cn07__card" href="#" data-field="social-youtube" aria-label="YouTube">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
        <span class="b-cn07__card-label">YouTube</span>
      </a>
      <a class="b-cn07__card" href="#" data-field="social-instagram" aria-label="Instagram">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        <span class="b-cn07__card-label">Instagram</span>
      </a>
      <a class="b-cn07__card" href="#" data-field="social-github" aria-label="GitHub">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
        <span class="b-cn07__card-label">GitHub</span>
      </a>
    </div>
    <div class="b-cn07__email" data-reveal="up" style="--stagger:3">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
      <a class="b-cn07__email-link" href="mailto:info@company.ru" data-field="contact-email">info@company.ru</a>
    </div>
  </div>
</section>`,
  css: `.b-cn07{background:var(--color-bg);padding:var(--space-section) var(--space-block)}
.b-cn07__inner{max-width:900px;margin:0 auto;text-align:center}
.b-cn07__heading{font-family:var(--font-heading);font-size:clamp(2rem,4vw,3rem);color:var(--color-text);margin:0 0 1rem}
.b-cn07__desc{font-family:var(--font-body);font-size:1.125rem;color:var(--color-text-muted);line-height:1.7;margin:0 0 3rem}
.b-cn07__grid{display:flex;flex-wrap:wrap;justify-content:center;gap:1.25rem;margin-bottom:3rem}
.b-cn07__card{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.75rem;width:140px;height:140px;border-radius:var(--radius-lg);background:var(--color-surface);border:1px solid var(--color-border);color:var(--color-text-muted);text-decoration:none;transition:border-color 0.2s,color 0.2s,transform 0.2s}
.b-cn07__card:hover{border-color:var(--color-primary);color:var(--color-primary);transform:translateY(-4px)}
.b-cn07__card-label{font-family:var(--font-body);font-size:0.8125rem;font-weight:500}
.b-cn07__email{display:flex;align-items:center;justify-content:center;gap:0.5rem;color:var(--color-text-muted)}
.b-cn07__email-link{font-family:var(--font-body);font-size:1rem;color:var(--color-text);text-decoration:none;transition:color 0.2s}
.b-cn07__email-link:hover{color:var(--color-primary)}
@media(max-width:768px){.b-cn07__grid{gap:0.75rem}.b-cn07__card{width:110px;height:110px}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-cn07{background:var(--color-bg-alt)}.b-cn07__card{background:var(--color-bg)}` },
    { id: "filled", label: "Заливка", css: `.b-cn07__card{background:var(--color-bg-alt);border-color:transparent}.b-cn07__card:hover{background:var(--color-primary);color:var(--color-text-on-primary);border-color:transparent}` },
  ],
};
