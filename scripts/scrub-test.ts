import { createEmptyDocument } from "@/lib/site/create";
import { applyOps } from "@/lib/site/ops";
import { renderPage, renderPublishHtml } from "@/lib/site/render";
function assert(c: boolean, m: string){ if(!c){console.error("FAIL:",m);process.exitCode=1;} else console.log("ok:",m); }

let doc = createEmptyDocument("V");
let r = applyOps(doc, [
  { op: "add-block", presetId: "hero-centered-01" },
  { op: "set-scene", scene: { type: "video", video: "/assets/demo/luxury.mp4", poster: "/assets/demo/luxury.webp", scrub: true, intensity: 1 } },
]);
assert(r.errors.length === 0, "video-сцена принята: " + r.errors.join(";"));
doc = r.doc;
assert(doc.scene?.type === "video" && doc.scene.scrub === true && doc.scene.video === "/assets/demo/luxury.mp4", "поля video-сцены сохранены");

const pub = renderPublishHtml(doc, doc.pages[0].id, { inline: true });
assert(pub.html.includes('class="cscene__video"') && pub.html.includes("luxury.mp4"), "video-элемент в разметке");
assert(pub.html.includes('class="cscene__poster"') && pub.html.includes("luxury.webp"), "постер в разметке");
assert(pub.html.includes('data-scene-scrub="1"'), "флаг скраба");
assert(pub.html.includes("cscene__scrim"), "скрим для читаемости");
assert(pub.css.includes(".cscene--video .cscene__poster") && pub.css.includes("cscene-kb"), "Ken-Burns постера (мобилки)");
assert(pub.js.includes("isMobile") && pub.js.includes("cscene__video") && pub.js.includes("seekTarget=p*"), "глобальный скраб + моб-ветка в runtime");
assert(pub.js.includes("isPreview"), "превью-ветка (статичный кадр)");

// луп-режим
const loopDoc = applyOps(doc, [{ op: "set-scene", scene: { type: "video", video: "/x.mp4", scrub: false } }]).doc;
assert(loopDoc.scene?.scrub === false, "scrub=false -> луп");
const pubL = renderPublishHtml(loopDoc, loopDoc.pages[0].id, { inline: true });
assert(!pubL.html.includes('data-scene-scrub="1"'), "нет флага скраба в лупе");

// смена типа обратно на aurora не тащит video-поля
const au = applyOps(doc, [{ op: "set-scene", scene: { type: "aurora" } }]).doc;
assert(au.scene?.type === "aurora" && !au.scene.video, "смена типа очищает video");

console.log("\nDONE");
