/**
 * Санитизация bespoke-блоков (custom html/css, написанные AI).
 *
 * Принцип: свобода композиции — да, свобода исполнения кода — нет.
 * HTML чистится от скриптов/обработчиков/встраиваний, CSS обязан жить
 * в классах .cb-* и не тянуть внешние ресурсы. Невалидное — отклоняется
 * целиком (генерация мягко откатывается на пресетный блок).
 */

const FORBIDDEN_TAGS_RE = /<\s*\/?\s*(script|iframe|object|embed|link|meta|base|form)\b[^>]*>/gi;
const EVENT_ATTR_RE = /\s+on[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi;
const JS_URL_RE = /\s(href|src)\s*=\s*(["'])\s*javascript:[^"']*\2/gi;

/** Чистит HTML bespoke-блока. Возвращает null, если после чистки блок бессмыслен. */
export function sanitizeCustomHtml(html: string): string | null {
  if (!html || html.length > 20_000) return null;
  let out = html
    .replace(FORBIDDEN_TAGS_RE, "")
    .replace(EVENT_ATTR_RE, "")
    .replace(JS_URL_RE, " $1=\"#\"")
    .trim();
  // Корень — один <section class="cb-...">; иначе оборачиваем
  if (!/^<section[^>]*class="[^"]*cb-/.test(out)) {
    out = `<section class="cb-block">\n${out}\n</section>`;
  }
  // Редактируемость: bespoke обязан размечать тексты data-field
  if (!out.includes("data-field=")) return null;
  return out;
}

/**
 * Валидирует CSS bespoke-блока: только .cb-* селекторы (плюс @media/@keyframes
 * с теми же правилами внутри), без импортов и внешних url.
 */
export function validateCustomCss(css: string): boolean {
  if (!css || css.length > 30_000) return false;
  if (/@import|expression\s*\(|behavior\s*:/i.test(css)) return false;
  if (/url\(\s*['"]?\s*(https?:)?\/\//i.test(css)) return false; // внешние ресурсы
  // Проверяем каждый селектор верхнего уровня и внутри @media
  const flat = css.replace(/@media[^{]+\{/g, "").replace(/@keyframes\s+cb-[\w-]+\s*\{/g, "@KF{");
  const selectors = [...flat.matchAll(/(^|\})\s*([^{}@]+)\{/g)].map((m) => m[2].trim());
  for (const sel of selectors) {
    if (!sel) continue;
    if (/^\d+%$|^(from|to)(\s*,\s*(from|to|\d+%))*$/.test(sel)) continue; // кадры keyframes
    // каждый компонент через запятую должен содержать .cb-
    if (!sel.split(",").every((s) => s.includes(".cb-"))) return false;
  }
  // непарные скобки = битый css
  const opens = (css.match(/\{/g) || []).length;
  const closes = (css.match(/\}/g) || []).length;
  return opens === closes && opens > 0;
}
