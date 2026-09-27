import type { BlockPreset } from "../_types";

/**
 * Storytelling: прогрессивная подсветка текста при скролле.
 * Не пин-секция — обычный поток. Текст «загорается» слово за словом по мере
 * прохождения блока через вьюпорт (эффект уровня apple.com), с помощью
 * text-runtime (data-reveal="highlight"). Дешёвый, но очень заметный wow.
 */
export const block: BlockPreset = {
  id: "story-highlight-01",
  name: "Подсветка текста при скролле",
  description: "Крупное утверждение, которое «загорается» слово за словом по мере скролла — приглушённый текст постепенно становится полноцветным. Обычный поток страницы, без пина.",
  category: "story",
  subcategory: "highlight",
  icon: "✎",
  tags: ["storytelling", "typography", "highlight", "kinetic", "scroll", "wow"],
  motionLevel: "css",
  fields: [
    { name: "hl01-kicker", type: "text", hint: "рубрика над утверждением, 2-4 слова", required: false },
    { name: "hl01-statement", type: "heading", hint: "крупное утверждение, 15-30 слов — чем длиннее, тем заметнее эффект", required: true },
  ],
  html: `<section class="b-hl01" data-block="story">
  <div class="b-hl01__inner">
    <p class="b-hl01__kicker" data-field="hl01-kicker" data-reveal="word">Наш подход</p>
    <p class="b-hl01__statement" data-field="hl01-statement" data-reveal="highlight">Мы не добавляем эффекты ради эффектов — каждая деталь работает на то, чтобы посетитель понял суть и поверил в первые три секунды на странице.</p>
  </div>
</section>`,
  css: `.b-hl01{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-hl01__inner{max-width:920px;margin:0 auto}
.b-hl01__kicker{font-family:var(--font-body);font-size:.8125rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--color-accent);margin:0 0 1.5rem}
.b-hl01__statement{font-family:var(--font-heading);font-size:clamp(1.75rem,4vw,3.25rem);line-height:1.35;letter-spacing:-.01em;margin:0}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-hl01{background:#0a0a0f}.b-hl01__statement{color:#fff}.b-hl01__statement .rv-unit{color:rgba(255,255,255,.35)}.b-hl01__statement .rv-unit.is-lit{color:#fff}` },
  ],
};
