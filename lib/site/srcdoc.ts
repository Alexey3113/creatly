/**
 * Превью документа в iframe редактора: рендер + мост.
 *
 * Мост v2 — тонкий: он НЕ хранит правки и НЕ меняет модель. Он только
 * сообщает родителю о взаимодействиях (select / field-edit / block-action),
 * а родитель применяет операцию к документу и, если нужно, перерисовывает.
 * Инлайн-редактирование текста меняет DOM локально (без перерисовки iframe),
 * модель обновляется параллельно той же операцией.
 */

import { cinematicRuntime } from "@/lib/builder/cinematic-runtime";
import { fontsLink, pageMotionLevel, renderPage } from "./render";
import type { SiteDocument } from "./types";

export const PREVIEW_MSG_SOURCE = "creatly-preview";

/** Сообщения из iframe в редактор. */
export type PreviewMessage =
  | { source: typeof PREVIEW_MSG_SOURCE; type: "ready" }
  | { source: typeof PREVIEW_MSG_SOURCE; type: "select"; blockId: string | null; field?: string; itemId?: string }
  | { source: typeof PREVIEW_MSG_SOURCE; type: "field-edit"; blockId: string; field: string; itemId?: string; value: string }
  | { source: typeof PREVIEW_MSG_SOURCE; type: "image-click"; blockId: string; field: string; itemId?: string }
  | { source: typeof PREVIEW_MSG_SOURCE; type: "block-action"; blockId: string; action: "move-up" | "move-down" | "duplicate" | "remove" | "add-after" };

const BRIDGE_CSS = `
[data-bid] { position: relative; }
[data-bid].pv-hover { outline: 1.5px dashed rgba(99,102,241,.55); outline-offset: -1px; }
[data-bid].pv-selected { outline: 2px solid #6366f1; outline-offset: -2px; }
[data-field]:not(img):hover { outline: 1px dashed rgba(99,102,241,.45); outline-offset: 2px; cursor: pointer; }
img[data-field]:hover { outline: 2px solid rgba(99,102,241,.6); cursor: pointer; }
[contenteditable="true"][data-field] { outline: 2px solid #6366f1 !important; outline-offset: 3px; cursor: text; box-shadow: 0 0 0 4px rgba(99,102,241,.12); }
.pv-toolbar { position: absolute; top: 8px; right: 8px; z-index: 99999; display: flex; gap: 4px;
  background: rgba(15,18,35,.92); border: 1px solid rgba(255,255,255,.1); border-radius: 8px; padding: 4px; }
.pv-toolbar button { all: unset; width: 26px; height: 26px; display: grid; place-items: center; border-radius: 6px;
  color: #cbd5e1; font: 600 13px/1 system-ui; cursor: pointer; }
.pv-toolbar button:hover { background: rgba(99,102,241,.25); color: #fff; }
`;

/**
 * Исходник моста. Выполняется внутри iframe.
 * Держим без зависимостей и без знания о модели — только DOM + postMessage.
 */
const BRIDGE_JS = `(function () {
  var SRC = ${JSON.stringify(PREVIEW_MSG_SOURCE)};
  var selected = null;
  var toolbar = null;

  function post(msg) { msg.source = SRC; window.parent.postMessage(msg, "*"); }

  function ctx(el) {
    var field = el.closest("[data-field]");
    var item = el.closest("[data-item-id]");
    var block = el.closest("[data-bid]");
    return {
      blockId: block ? block.getAttribute("data-bid") : null,
      itemId: item ? item.getAttribute("data-item-id") : undefined,
      field: field ? field.getAttribute("data-field") : undefined,
      fieldEl: field, blockEl: block
    };
  }

  function makeToolbar(block) {
    removeToolbar();
    toolbar = document.createElement("div");
    toolbar.className = "pv-toolbar";
    var actions = [["\\u2191","move-up"],["\\u2193","move-down"],["\\u2750","duplicate"],["+","add-after"],["\\u2715","remove"]];
    actions.forEach(function (a) {
      var b = document.createElement("button");
      b.textContent = a[0];
      b.title = a[1];
      b.addEventListener("click", function (e) {
        e.stopPropagation();
        post({ type: "block-action", blockId: block.getAttribute("data-bid"), action: a[1] });
      });
      toolbar.appendChild(b);
    });
    block.appendChild(toolbar);
  }
  function removeToolbar() { if (toolbar) { toolbar.remove(); toolbar = null; } }

  function selectBlock(block) {
    if (selected) selected.classList.remove("pv-selected");
    selected = block;
    if (block) { block.classList.add("pv-selected"); makeToolbar(block); }
    else removeToolbar();
  }

  // hover подсветка блока
  document.addEventListener("mouseover", function (e) {
    var block = e.target.closest && e.target.closest("[data-bid]");
    document.querySelectorAll("[data-bid].pv-hover").forEach(function (n) { n.classList.remove("pv-hover"); });
    if (block && block !== selected) block.classList.add("pv-hover");
  });

  // клик: выбор блока/поля; картинки — сразу image-click
  document.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest(".pv-toolbar")) return;
    var c = ctx(e.target);
    var link = e.target.closest && e.target.closest("a");
    if (link) e.preventDefault();
    if (!c.blockId) { selectBlock(null); post({ type: "select", blockId: null }); return; }
    selectBlock(c.blockEl);
    if (c.fieldEl && c.fieldEl.tagName === "IMG") {
      post({ type: "image-click", blockId: c.blockId, field: c.field, itemId: c.itemId });
      return;
    }
    post({ type: "select", blockId: c.blockId, field: c.field, itemId: c.itemId });
  }, true);

  // даблклик: инлайн-редактирование текстового поля
  document.addEventListener("dblclick", function (e) {
    var c = ctx(e.target);
    if (!c.fieldEl || c.fieldEl.tagName === "IMG" || !c.blockId) return;
    e.preventDefault();
    var el = c.fieldEl;
    el.setAttribute("contenteditable", "true");
    el.focus();
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges(); sel.addRange(range);

    function commit() {
      el.removeAttribute("contenteditable");
      el.removeEventListener("blur", commit);
      el.removeEventListener("keydown", onKey);
      var value = el.innerText.replace(/\\u00a0/g, " ").replace(/\\n{2,}/g, "\\n").trim();
      post({ type: "field-edit", blockId: c.blockId, field: c.field, itemId: c.itemId, value: value });
    }
    function onKey(ev) {
      if (ev.key === "Enter" && !ev.shiftKey) { ev.preventDefault(); el.blur(); }
      if (ev.key === "Escape") { el.blur(); }
    }
    el.addEventListener("blur", commit);
    el.addEventListener("keydown", onKey);
  });

  // команды из редактора
  window.addEventListener("message", function (e) {
    var m = e.data || {};
    if (m.source !== SRC + "-host") return;
    if (m.type === "select-block") {
      var block = m.blockId ? document.querySelector('[data-bid="' + m.blockId + '"]') : null;
      selectBlock(block);
      if (block) block.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    if (m.type === "set-field") {
      var root = document.querySelector('[data-bid="' + m.blockId + '"]');
      if (!root) return;
      var scope = m.itemId ? root.querySelector('[data-item-id="' + m.itemId + '"]') : root;
      if (!scope) return;
      var el = scope.querySelector('[data-field="' + m.field + '"]');
      if (!el) return;
      if (el.tagName === "IMG") el.setAttribute("src", m.value);
      else el.innerText = m.value;
    }
  });

  post({ type: "ready" });
})();`;

export function buildPreviewSrcdoc(doc: SiteDocument, pageId?: string): string {
  const page = doc.pages.find((p) => p.id === (pageId || doc.activePageId)) || doc.pages[0];
  const rendered = renderPage(doc, page.id, { mode: "preview", pageHref: () => "#" });
  const motion = pageMotionLevel(page);

  return `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${page.title}</title>
${fontsLink(doc)}
<style>${rendered.css}</style>
<style>${BRIDGE_CSS}</style>
</head>
<body>
${rendered.html}
<script>window.__creatlyPreviewMode=true;</script>
<script>${rendered.js}</script>
${motion !== "css" ? `<script>${cinematicRuntime}</script>` : ""}
<script>${BRIDGE_JS}</script>
</body>
</html>`;
}
