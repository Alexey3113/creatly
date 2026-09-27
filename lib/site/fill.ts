/**
 * Движок заполнения HTML-шаблонов блоков данными из BlockNode.
 *
 * Работает без DOM (и на сервере, и в браузере): лёгкий сканер тегов,
 * который умеет три вещи:
 *  1. заменить содержимое элемента с data-field="x" (текстовые поля);
 *  2. заменить атрибут src у <img data-field="x"> (картинки);
 *  3. размножить элементы data-collection-item по массиву items.
 */

const VOID_TAGS = new Set(["img", "br", "hr", "input", "meta", "link", "source", "area", "base", "col", "embed", "track", "wbr"]);

/** Значение поля — видеофайл (по расширению или data-URI). */
function isVideoValue(value: string): boolean {
  return /\.(mp4|webm|mov)(\?|#|$)/i.test(value) || value.startsWith("data:video/");
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Позиция элемента в строке html: открывающий тег + границы содержимого. */
interface ElementSpan {
  /** Начало открывающего тега (индекс "<"). */
  start: number;
  /** Конец открывающего тега (индекс после ">"). */
  openEnd: number;
  /** Конец элемента (после закрывающего тега; для void — равен openEnd). */
  end: number;
  tag: string;
  isVoid: boolean;
}

/** Находит следующий открывающий тег с данным атрибутом, начиная с from. */
function findTagWithAttr(html: string, attr: string, from: number): number {
  // Ищем attr и откатываемся к началу его тега.
  let idx = html.indexOf(attr, from);
  while (idx !== -1) {
    const tagStart = html.lastIndexOf("<", idx);
    if (tagStart !== -1 && html[tagStart + 1] !== "/") {
      const tagEnd = html.indexOf(">", tagStart);
      if (tagEnd !== -1 && tagEnd > idx) return tagStart;
    }
    idx = html.indexOf(attr, idx + attr.length);
  }
  return -1;
}

/** Разбирает элемент, начинающийся с индекса tagStart ("<"). */
function parseElement(html: string, tagStart: number): ElementSpan | null {
  const tagMatch = /^<([a-zA-Z][a-zA-Z0-9-]*)/.exec(html.slice(tagStart));
  if (!tagMatch) return null;
  const tag = tagMatch[1].toLowerCase();
  const openEnd = html.indexOf(">", tagStart);
  if (openEnd === -1) return null;

  const isVoid = VOID_TAGS.has(tag) || html[openEnd - 1] === "/";
  if (isVoid) {
    return { start: tagStart, openEnd: openEnd + 1, end: openEnd + 1, tag, isVoid: true };
  }

  // Ищем закрывающий тег с учётом вложенности одноимённых тегов.
  const openRe = new RegExp(`<${tag}(?=[\\s>/])`, "gi");
  const closeRe = new RegExp(`</${tag}\\s*>`, "gi");
  let depth = 1;
  let pos = openEnd + 1;
  while (depth > 0) {
    openRe.lastIndex = pos;
    closeRe.lastIndex = pos;
    const open = openRe.exec(html);
    const close = closeRe.exec(html);
    if (!close) return null; // битый html — не трогаем
    if (open && open.index < close.index) {
      depth++;
      pos = open.index + open[0].length;
    } else {
      depth--;
      pos = close.index + close[0].length;
    }
  }
  return { start: tagStart, openEnd: openEnd + 1, end: pos, tag, isVoid: false };
}

/** Все элементы с данным атрибутом (не заходя внутрь найденных — flat scan). */
function findElements(html: string, attr: string): ElementSpan[] {
  const result: ElementSpan[] = [];
  let from = 0;
  while (true) {
    const tagStart = findTagWithAttr(html, attr, from);
    if (tagStart === -1) break;
    const el = parseElement(html, tagStart);
    if (!el) break;
    result.push(el);
    from = el.openEnd; // вложенные тоже находим — сканируем внутрь
  }
  return result;
}

/** Заменяет значение атрибута в открывающем теге (или добавляет его). */
function setAttr(openTag: string, name: string, value: string): string {
  const re = new RegExp(`(\\s${name}=")[^"]*(")`, "i");
  if (re.test(openTag)) return openTag.replace(re, `$1${escapeHtml(value)}$2`);
  return openTag.replace(/(\/?>)$/, ` ${name}="${escapeHtml(value)}"$1`);
}

/**
 * Заполняет data-field элементы значениями.
 * - <img data-field> — заменяется src (+alt, если задан `${name}:alt`);
 * - <a data-field> — заменяется текст (+href, если задан `${name}:href`);
 * - остальные — заменяется innerHTML (текст экранируется, \n -> <br>).
 */
export function fillFields(html: string, fields: Record<string, string>): string {
  let out = html;
  // Обрабатываем поля по одному; после каждой замены пересканируем —
  // индексы смещаются. Полей в блоке мало (<20), это дёшево.
  for (const [name, rawValue] of Object.entries(fields)) {
    if (name.includes(":")) continue; // служебные подполя (:href, :alt)
    if (typeof rawValue !== "string") continue;
    out = fillOneField(out, name, rawValue, fields[`${name}:href`], fields[`${name}:alt`]);
  }
  return out;
}

function fillOneField(html: string, name: string, value: string, href?: string, alt?: string, skipItems = false): string {
  const attr = `data-field="${name}"`;
  let from = 0;
  let out = html;
  while (true) {
    const tagStart = findTagWithAttr(out, attr, from);
    if (tagStart === -1) break;
    const el = parseElement(out, tagStart);
    if (!el) break;
    if (skipItems) {
      // Не трогаем поля внутри элементов коллекций — у них свои данные
      const inItem = allItemSpans(out).some((s) => el.start > s.start && el.start < s.end);
      if (inItem) { from = el.openEnd; continue; }
    }
    let openTag = out.slice(el.start, el.openEnd);

    if (el.tag === "img" || el.tag === "video" || el.tag === "source") {
      // Фото-слот принимает и видео (и наоборот): меняем сам тег.
      // Иначе mp4 в <img src> = битая картинка и «пустой» блок.
      if (value && el.tag === "img" && isVideoValue(value)) {
        let tag = openTag
          .replace(/^<img/i, "<video")
          .replace(/\salt="[^"]*"/i, "")
          .replace(/\s*\/?>$/, ">");
        tag = setAttr(tag, "src", value);
        for (const a of ["autoplay", "muted", "loop", "playsinline"]) {
          if (!new RegExp(`\\s${a}[\\s>=]`).test(tag)) tag = tag.replace(/>$/, ` ${a}>`);
        }
        tag += "</video>";
        out = out.slice(0, el.start) + tag + out.slice(el.end);
        from = el.start + tag.length;
        continue;
      }
      if (value && el.tag === "video" && !isVideoValue(value)) {
        let tag = openTag
          .replace(/^<video/i, "<img")
          .replace(/\s(autoplay|muted|loop|playsinline|controls)(?=[\s>])/gi, "")
          .replace(/\s(preload|poster)="[^"]*"/gi, "")
          .replace(/\s*\/?>$/, "");
        tag = setAttr(tag + " />", "src", value);
        // Закрывающий тег и <source>-дети видео отбрасываются вместе с el.end
        out = out.slice(0, el.start) + tag + out.slice(el.end);
        from = el.start + tag.length;
        continue;
      }
      if (value) openTag = setAttr(openTag, "src", value);
      if (alt && el.tag === "img") openTag = setAttr(openTag, "alt", alt);
      out = out.slice(0, el.start) + openTag + out.slice(el.openEnd);
      from = el.start + openTag.length;
      continue;
    }

    if (el.tag === "a" && href) openTag = setAttr(openTag, "href", href);
    // *слово* -> курсивный акцент (после экранирования — безопасно)
    const inner = escapeHtml(value)
      .replace(/\n/g, "<br>")
      .replace(/\*([^*\n<]+)\*/g, "<em>$1</em>");
    const closeTag = `</${el.tag}>`;
    out = out.slice(0, el.start) + openTag + inner + closeTag + out.slice(el.end);
    from = el.start + openTag.length + inner.length + closeTag.length;
  }
  return out;
}

export interface RepeatItemData {
  id: string;
  fields: Record<string, string>;
}

/** Верхнеуровневые (не вложенные друг в друга) спаны. */
function topLevel(spans: ElementSpan[]): ElementSpan[] {
  const top: ElementSpan[] = [];
  for (const s of spans) {
    if (!top.length || s.start >= top[top.length - 1].end) top.push(s);
  }
  return top;
}

export interface CollectionSpan {
  name: string;
  container: ElementSpan;
  items: ElementSpan[];
}

/**
 * Находит все именованные коллекции: элементы с data-collection="имя",
 * внутри которых лежат data-collection-item.
 */
export function findCollections(html: string): CollectionSpan[] {
  const containers = topLevel(findElements(html, 'data-collection="'));
  const result: CollectionSpan[] = [];
  for (const container of containers) {
    const open = html.slice(container.start, container.openEnd);
    const nameMatch = /data-collection="([^"]+)"/.exec(open);
    if (!nameMatch) continue;
    const innerHtml = html.slice(container.openEnd, container.end);
    const items = topLevel(findElements(innerHtml, "data-collection-item")).map((s) => ({
      ...s,
      start: s.start + container.openEnd,
      openEnd: s.openEnd + container.openEnd,
      end: s.end + container.openEnd,
    }));
    if (items.length) result.push({ name: nameMatch[1], container, items });
  }
  return result;
}

/** Спаны всех item'ов (для исключения из блочного заполнения). */
function allItemSpans(html: string): ElementSpan[] {
  return topLevel(findElements(html, "data-collection-item"));
}

/**
 * Размножает item'ы каждой именованной коллекции по её данным.
 *
 * Шаблон для i-го item'а — i-й элемент-заглушка пресета (по кругу): так
 * сохраняются авторские различия между элементами — разные дефолтные фото,
 * номера «01/02/03», размеры карточек в bento-мозаике. Данные item'а
 * перекрывают только те поля, которые заданы.
 * Каждому элементу проставляется data-item-id для адресации из редактора.
 */
export function fillCollections(html: string, collections: Record<string, RepeatItemData[]>): string {
  let out = html;
  // Идём с конца, чтобы замены не сдвигали индексы предыдущих коллекций
  const spans = findCollections(out).reverse();
  for (const { name, items: itemSpans } of spans) {
    const data = collections[name];
    if (!data?.length) continue;
    const templates = itemSpans.map((s) => out.slice(s.start, s.end));
    const rendered = data
      .map((item, i) => {
        let itemHtml = fillFields(templates[i % templates.length], item.fields);
        itemHtml = itemHtml.replace(/data-collection-item/, `data-collection-item data-item-id="${item.id}"`);
        itemHtml = itemHtml.replace(/--stagger:\s*\d+/, `--stagger:${i}`);
        return itemHtml;
      })
      .join("\n");
    out = out.slice(0, itemSpans[0].start) + rendered + out.slice(itemSpans[itemSpans.length - 1].end);
  }
  return out;
}

/**
 * Заполняет БЛОЧНЫЕ поля — пропускает элементы внутри data-collection-item,
 * чтобы значения блока не перезаписывали контент item'ов.
 */
export function fillBlockFields(html: string, fields: Record<string, string>): string {
  let out = html;
  for (const [name, rawValue] of Object.entries(fields)) {
    if (name.includes(":")) continue;
    if (typeof rawValue !== "string") continue;
    out = fillOneField(out, name, rawValue, fields[`${name}:href`], fields[`${name}:alt`], true);
  }
  return out;
}

/** Проставляет data-bid на корневой элемент фрагмента (для адресации блока). */
export function annotateRoot(html: string, blockId: string): string {
  const m = /<([a-zA-Z][a-zA-Z0-9-]*)/.exec(html);
  if (!m) return html;
  const idx = html.indexOf(m[0]);
  const insertAt = idx + m[0].length;
  return html.slice(0, insertAt) + ` data-bid="${blockId}"` + html.slice(insertAt);
}

/** Есть ли в шаблоне пресета коллекция. */
export function hasCollection(html: string): boolean {
  return html.includes("data-collection-item");
}

/** Значения data-field внутри фрагмента html. */
function extractFieldsFrom(fragment: string): Record<string, string> {
  const fields: Record<string, string> = {};
  for (const el of findElements(fragment, "data-field")) {
    const open = fragment.slice(el.start, el.openEnd);
    const nameMatch = /data-field="([^"]+)"/.exec(open);
    if (!nameMatch) continue;
    const name = nameMatch[1];
    if (fields[name] !== undefined) continue;
    if (el.tag === "img" || el.tag === "video" || el.tag === "source") {
      const srcMatch = /\ssrc="([^"]*)"/.exec(open);
      fields[name] = srcMatch?.[1] ?? "";
    } else {
      fields[name] = stripTags(fragment.slice(el.openEnd, el.end - (`</${el.tag}>`.length)));
    }
  }
  return fields;
}

/**
 * Извлекает дефолтные данные всех коллекций из шаблона пресета
 * (заглушки становятся реальными данными item'ов).
 */
export function extractDefaultCollections(html: string, uid: () => string): Record<string, RepeatItemData[]> {
  const result: Record<string, RepeatItemData[]> = {};
  for (const { name, items } of findCollections(html)) {
    result[name] = items.map((span) => ({
      id: uid(),
      fields: extractFieldsFrom(html.slice(span.start, span.end)),
    }));
  }
  return result;
}

/** Дефолтные значения блочных полей пресета (без полей внутри item'ов). */
export function extractDefaultFields(html: string): Record<string, string> {
  // Вырезаем все item-диапазоны — их поля живут в collections
  const spans = allItemSpans(html);
  let scope = "";
  let cursor = 0;
  for (const s of spans) {
    scope += html.slice(cursor, s.start);
    cursor = s.end;
  }
  scope += html.slice(cursor);
  return extractFieldsFrom(scope);
}

function stripTags(s: string): string {
  return s
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .trim();
}
