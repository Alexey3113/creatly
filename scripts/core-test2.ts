import { createEmptyDocument } from "@/lib/site/create";
import { applyOps } from "@/lib/site/ops";
import { renderPage } from "@/lib/site/render";
import { presetSchema } from "@/lib/site/schema";

function assert(cond: boolean, msg: string) {
  if (!cond) { console.error("FAIL:", msg); process.exitCode = 1; }
  else console.log("ok:", msg);
}

let doc = createEmptyDocument("Тест");

// 1. Сплит с двумя коллекциями
const r1 = applyOps(doc, [
  { op: "add-block", presetId: "comparison-split-01" },
  { op: "add-block", presetId: "footer-dark-01" },
  { op: "add-block", presetId: "gallery-grid-01" },
]);
assert(r1.errors.length === 0, "add-block: " + r1.errors.join("; "));
doc = r1.doc;

const split = doc.pages[0].blocks[0];
assert(Object.keys(split.collections || {}).length === 2, `у сплита 2 коллекции: ${Object.keys(split.collections || {}).join(", ")}`);
assert(split.fields["cm04-side-title-1"] === "Без нас" && split.fields["cm04-side-title-2"] === "С нами", "заголовки сторон уникальны");

const footer = doc.pages[0].blocks[1];
assert(Object.keys(footer.collections || {}).length === 4, `у футера 4 коллекции: ${Object.keys(footer.collections || {}).join(", ")}`);

// 2. Правки: разные значения в item'ах разных коллекций
const withoutItems = split.collections!["cm04-without-items"];
const withItems = split.collections!["cm04-with-items"];
const r2 = applyOps(doc, [
  { op: "update-item", blockId: split.id, itemId: withoutItems[0].id, fields: { "cm04-side-item": "✕ Бюджет уходит в никуда" } },
  { op: "update-item", blockId: split.id, itemId: withItems[0].id, fields: { "cm04-side-item": "✓ Каждый рубль под контролем" } },
  { op: "add-item", blockId: split.id, collection: "cm04-with-items", fields: { "cm04-side-item": "✓ Новый пункт" } },
  { op: "update-fields", blockId: split.id, fields: { "cm04-title": "Из хаоса в рост", "несуществующее-поле": "мусор" } },
]);
assert(r2.errors.length === 0, "операции: " + r2.errors.join("; "));
doc = r2.doc;
assert(!("несуществующее-поле" in doc.pages[0].blocks[0].fields), "мусорное поле отброшено валидацией");

// 3. Рендер: стороны различаются, футер-колонки различаются
const page = renderPage(doc, doc.pages[0].id, { mode: "preview" });
assert(page.html.includes("Бюджет уходит в никуда") && page.html.includes("Каждый рубль под контролем"), "items разных коллекций различаются");
assert(page.html.includes("Без нас") && page.html.includes("С нами"), "обе стороны сплита в html");
assert(page.html.includes("Навигация") && page.html.includes("Услуги") && page.html.includes("Контакты"), "3 разных заголовка колонок футера");
assert(page.html.includes("Брендинг") && page.html.includes("Главная"), "разные ссылки в разных колонках футера");
assert((page.html.match(/cm04-with-items/g) || []).length >= 1, "коллекция with отрендерена");
assert(page.html.includes("✓ Новый пункт"), "add-item в нужную коллекцию");
// preview: reveal отключён
assert(page.css.includes("[data-reveal]{opacity:1!important"), "reveal выключен в превью");
assert(page.html.includes("onerror="), "img onerror-фолбэк");
// незакрытых тегов не потеряли: контейнеры коллекций на месте
assert(page.html.includes('data-collection="cm04-without-items"') && page.html.includes('data-collection="cm04-with-items"'), "оба контейнера живы");

// 4. Publish: reveal включён с failsafe
const pub = renderPage(doc, doc.pages[0].id, { mode: "publish" });
assert(pub.css.includes("html.rv [data-reveal]"), "reveal в publish за классом html.rv");
assert(pub.js.includes("2500"), "failsafe-таймер в publish js");

// 5. Схема галереи
const gl = presetSchema("gallery-grid-01")!;
assert(gl.collections.has("gl01-img"), "коллекция галереи в схеме");
assert(gl.blockFields.has("gl01-title"), "блочные поля галереи в схеме");

// 6. Легаси items мигрируют
import { normalizeDocument } from "@/lib/site/create";
const legacyBlock = doc.pages[0].blocks[2];
const legacy = structuredClone(doc);
const b = legacy.pages[0].blocks[2] as { collections?: unknown; items?: unknown };
b.items = Object.values(legacyBlock.collections!)[0];
delete b.collections;
normalizeDocument(legacy);
assert(!!legacy.pages[0].blocks[2].collections, "легаси items -> collections");

console.log("\nDONE");
