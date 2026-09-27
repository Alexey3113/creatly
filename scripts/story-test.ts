import { createEmptyDocument } from "@/lib/site/create";
import { applyOps } from "@/lib/site/ops";
import { renderPage, renderPublishHtml } from "@/lib/site/render";

function assert(cond: boolean, msg: string) {
  if (!cond) { console.error("FAIL:", msg); process.exitCode = 1; }
  else console.log("ok:", msg);
}

let doc = createEmptyDocument("Story-тест");
const r = applyOps(doc, [
  { op: "add-block", presetId: "story-video-01" },
  { op: "add-block", presetId: "story-manifesto-01" },
]);
assert(r.errors.length === 0, "story-блоки добавлены: " + r.errors.join(";"));
doc = r.doc;

const video = doc.pages[0].blocks[0];
assert(video.collections?.["sv01-steps"]?.length === 3, "3 шага видео-истории из шаблона");
assert(!!video.fields["sv01-video"], "поле видео извлечено: " + video.fields["sv01-video"]);

const addStep = applyOps(doc, [
  { op: "add-item", blockId: video.id, collection: "sv01-steps", fields: { "sv01-step-title": "Четвёртый шаг", "sv01-step-tag": "04 · Финал" } },
]);
doc = addStep.doc;
assert(doc.pages[0].blocks[0].collections!["sv01-steps"].length === 4, "add-item добавил шаг");

const preview = renderPage(doc, doc.pages[0].id, { mode: "preview" });
assert(preview.html.includes("data-story"), "data-story в html");
assert((preview.html.match(/data-story-step/g) || []).length === 7, "7 шагов в разметке (4+3)");
assert(preview.html.includes("Четвёртый шаг"), "новый шаг отрендерен");
assert(preview.js.includes("data-story"), "story-runtime в превью");
assert(preview.html.includes('data-story-mode="scrub"'), "скраб-режим у видео");

const pub = renderPublishHtml(doc, doc.pages[0].id, { inline: true });
assert(pub.js.includes("querySelectorAll(\"[data-story]\")") || pub.js.includes("[data-story]"), "story-runtime на паблише");
assert(pub.css.includes("position:sticky"), "sticky-сцена в css");
console.log("\nDONE");

// ── Главы видео: таймкод присутствует в разметке (скрытый data-field) ──
{
  const withTime = applyOps(doc, [
    { op: "update-item", blockId: video.id, itemId: video.collections!["sv01-steps"][0].id, fields: { "sv01-step-time": "2.5" } },
  ]);
  const rendered = renderPage(withTime.doc, withTime.doc.pages[0].id, { mode: "publish" });
  assert(withTime.errors.length === 0, "таймкод главы принят: " + withTime.errors.join(";"));
  assert(rendered.html.includes('data-field="sv01-step-time" hidden') , "скрытое поле таймкода в разметке");
  assert(rendered.html.includes(">2.5<"), "значение таймкода сериализовано в html");
  assert(rendered.js.includes("readChapterFields") && rendered.js.includes("ensureChapters"), "движок глав в publish js");
  assert(rendered.js.includes("video.seeking") && !rendered.js.includes("*0.18"), "гейт по seeking есть, старого lerp нет");
}
console.log("CHAPTERS DONE");
