import { createEmptyDocument } from "@/lib/site/create";
import { applyOps } from "@/lib/site/ops";
import { renderPage, renderPublishHtml } from "@/lib/site/render";

function assert(c: boolean, m: string){ if(!c){console.error("FAIL:",m);process.exitCode=1;} else console.log("ok:",m); }

// Путь B: enter-переходы
let doc = createEmptyDocument("T");
let r = applyOps(doc, [
  { op: "add-block", presetId: "hero-centered-01" },
  { op: "add-block", presetId: "features-three-col-01" },
  { op: "add-block", presetId: "cta-banner-02" },
]);
doc = r.doc;
const [b0, b1, b2] = doc.pages[0].blocks;
const r2 = applyOps(doc, [
  { op: "set-block-enter", blockId: b0.id, enter: "fade" },
  { op: "set-block-enter", blockId: b1.id, enter: "slide-left" },
  { op: "set-block-enter", blockId: b2.id, enter: "zoom-through" },
]);
assert(r2.errors.length === 0, "enter применён: " + r2.errors.join(";"));
doc = r2.doc;
assert(doc.pages[0].blocks[1].enter === "slide-left", "enter сохранён в модели");

const bad = applyOps(doc, [{ op: "set-block-enter", blockId: b0.id, enter: "warp" as never }]);
assert(bad.errors.length === 1, "невалидный enter -> ошибка");

const pub = renderPublishHtml(doc, doc.pages[0].id, { inline: true });
assert(pub.html.includes('data-enter="slide-left"') && pub.html.includes('data-enter="zoom-through"'), "data-enter в разметке");
assert(pub.css.includes("html.tx [data-enter]") && pub.css.includes('data-enter="zoom-through"'), "CSS переходов входа");
assert(pub.css.includes("@media(max-width:768px)") && pub.css.includes("transform:none!important"), "моб-деградация до fade");
assert(pub.js.includes('classList.add("tx")') && pub.js.includes("tx-in"), "runtime входов");

// превью: переходы заглушены
const prev = renderPage(doc, doc.pages[0].id, { mode: "preview" });
assert(prev.css.includes("[data-enter]{opacity:1!important"), "в канвасе enter выключен");

// Путь A: режим-фильм
const cin = applyOps(doc, [{ op: "set-cinema", enabled: true }]).doc;
assert(cin.cinema === true, "cinema включён");
const pubC = renderPublishHtml(cin, cin.pages[0].id, { inline: true });
assert(pubC.html.includes('class="cinema-deck"'), "cinema-обёртка в разметке");
assert(pubC.css.includes("html.cinema-on,html.cinema-on body{overflow:hidden") && pubC.css.includes(".cin-active"), "CSS режима-фильма");
assert(pubC.js.includes("cinema-deck") && pubC.js.includes("transformFor") && pubC.js.includes("tall"), "cinema-контроллер + авто-выключение на длинных блоках");
assert(pubC.js.includes("cinema-dots") && pubC.js.includes("cinema-progress"), "точки навигации + прогресс");

// выключение
const off = applyOps(cin, [{ op: "set-cinema", enabled: false }]).doc;
assert(!off.cinema, "cinema выключается");
assert(!renderPublishHtml(off, off.pages[0].id, {inline:true}).html.includes('class="cinema-deck"'), "обёртка-div исчезает");

console.log("\nDONE");
