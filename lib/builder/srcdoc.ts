import type { BuilderProject } from "./types";
import { previewBridgeSource } from "./preview-bridge-source";

function createTokenCss(tokens: Record<string, string>): string {
  const entries = Object.entries(tokens).filter(([, v]) => v);
  if (!entries.length) return "";
  return `:root { ${entries.map(([n, v]) => `${n}: ${v};`).join(" ")} }`;
}

export function buildSrcdoc(project: BuilderProject): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(
    project.html || "<!doctype html><html><body></body></html>",
    "text/html",
  );

  doc.querySelectorAll('link[rel="stylesheet"], script[src]').forEach((n) => n.remove());

  const base = doc.createElement("base");
  base.href = project.baseHref || location.href;
  doc.head.prepend(base);

  const style = doc.createElement("style");
  style.dataset.builderCss = "true";
  style.textContent = project.css || "";
  doc.head.appendChild(style);

  const tokenStyle = doc.createElement("style");
  tokenStyle.dataset.builderTokenCss = "true";
  tokenStyle.textContent = createTokenCss(project.tokens || {});
  doc.head.appendChild(tokenStyle);

  const bridgeStyle = doc.createElement("style");
  bridgeStyle.textContent = `
    [data-builder-id] { cursor: pointer; transition: outline-color .15s, box-shadow .15s; }
    [data-builder-id]:hover { outline: 1.5px dashed rgba(99,102,241,.5) !important; outline-offset: 2px; }
    [data-builder-id][data-builder-selected] { outline: 2px solid #6366f1 !important; outline-offset: 2px; }
    [data-builder-inline-edit="true"] {
      outline: 2px solid #6366f1 !important;
      outline-offset: 4px;
      cursor: text !important;
      min-height: 1em;
      box-shadow: 0 0 0 4px rgba(99,102,241,.1) !important;
    }
    img[data-builder-id]:hover { outline: 2px solid rgba(99,102,241,.6) !important; outline-offset: 0; cursor: pointer; }
    [data-collection-item]:hover { outline: 1.5px dashed rgba(99,102,241,.4) !important; outline-offset: -1px; }
    [data-block]:hover { outline: 1px dashed rgba(148,163,184,.25) !important; outline-offset: -1px; }
  `;
  doc.head.appendChild(bridgeStyle);

  const bridgeScript = doc.createElement("script");
  bridgeScript.textContent = `(${previewBridgeSource})(${JSON.stringify(project.edits || [])});`;
  doc.body.appendChild(bridgeScript);

  if (project.js) {
    const script = doc.createElement("script");
    script.textContent = project.js;
    doc.body.appendChild(script);
  }

  return "<!doctype html>\n" + doc.documentElement.outerHTML;
}
