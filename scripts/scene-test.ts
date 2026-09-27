import { createEmptyDocument } from "@/lib/site/create";
import { applyOps } from "@/lib/site/ops";
import { renderPage, renderPublishHtml } from "@/lib/site/render";
import { applySceneSurfaces } from "@/lib/site/generate";

function assert(cond: boolean, msg: string) {
  if (!cond) { console.error("FAIL:", msg); process.exitCode = 1; }
  else console.log("ok:", msg);
}

let doc = createEmptyDocument("Scene");
const r = applyOps(doc, [
  { op: "add-block", presetId: "header-minimal-01" },
  { op: "add-block", presetId: "hero-centered-01" },
  { op: "add-block", presetId: "features-tilt-01" },
  { op: "add-block", presetId: "faq-accordion-02" },
  { op: "set-scene", scene: { type: "aurora", intensity: 0.6, grain: true } },
]);
assert(r.errors.length === 0, "сцена включена: " + r.errors.join(";"));
doc = r.doc;
assert(doc.scene?.type === "aurora" && doc.scene.grain === true, "doc.scene сохранена");

// невалидный тип отбрасывается
const bad = applyOps(doc, [{ op: "set-scene", scene: { type: "explosions" as never } }]);
assert(bad.errors.length === 1, "невалидный тип сцены -> ошибка");

// поверхность блока
const ftId = doc.pages[0].blocks[2].id;
doc = applyOps(doc, [
  { op: "set-block-surface", blockId: ftId, surface: "transparent", sceneTint: "#e8432d" },
]).doc;
assert(doc.pages[0].blocks[2].surface === "transparent" && doc.pages[0].blocks[2].sceneTint === "#e8432d", "surface+tint применены");

// рендер
const pub = renderPublishHtml(doc, doc.pages[0].id, { inline: true });
assert(pub.html.includes('class="cscene cscene--aurora"'), "бэкдроп-сцена в разметке");
assert(pub.html.indexOf("cscene") < pub.html.indexOf("data-bid"), "сцена — первый элемент");
assert(pub.html.includes("cscene__grain"), "зерно включено");
assert(pub.html.includes(`data-scene-tint="#e8432d"`), "tint-атрибут на блоке");
assert(pub.css.includes(".cscene{position:fixed"), "css сцены подключён");
assert(pub.css.includes(`[data-bid="${ftId}"]{background:transparent!important}`), "surface-override в css");
assert(pub.js.includes("pollTint") && pub.js.includes("cscene"), "scene-runtime в publish js");

// превью: сцена тоже видна (визуальная идентичность канваса)
const prev = renderPage(doc, doc.pages[0].id, { mode: "preview" });
assert(prev.html.includes("cscene--aurora") && prev.js.includes("pollTint"), "сцена живёт и в превью");

// выключение
doc = applyOps(doc, [{ op: "set-scene", scene: { type: "none" } }]).doc;
assert(!doc.scene, "none выключает сцену");
const off = renderPublishHtml(doc, doc.pages[0].id, { inline: true });
assert(!off.html.includes("cscene"), "бэкдроп исчез из разметки");

// canvas-типы
doc = applyOps(doc, [{ op: "set-scene", scene: { type: "field", intensity: 0.4 } }]).doc;
const field = renderPublishHtml(doc, doc.pages[0].id, { inline: true });
assert(field.html.includes("cscene__canvas"), "canvas для field-типа");
assert(field.js.includes("createRadialGradient") || field.js.includes("lineWidth"), "canvas-движок в js");

// авто-раздача поверхностей (генерация)
const auto = createEmptyDocument("Auto");
const r2 = applyOps(auto, [
  { op: "add-block", presetId: "features-three-col-01" },
  { op: "add-block", presetId: "faq-accordion-02" },
  { op: "add-block", presetId: "steps-numbered-02" },
]);
r2.doc.scene = { type: "mesh", intensity: 0.5 };
applySceneSurfaces(r2.doc);
const transparent = r2.doc.pages[0].blocks.filter((b) => b.surface === "transparent").length;
assert(transparent >= 1 && transparent < 3, `авто-поверхности: каждая вторая (${transparent} из 3)`);

console.log("\nDONE");
