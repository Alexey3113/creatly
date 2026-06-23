import type { BuilderProject } from "./types";

export function bakeProject(project: BuilderProject): { html: string; css: string; js: string } {
  const parser = new DOMParser();
  const doc = parser.parseFromString(project.html || "<html><body></body></html>", "text/html");

  doc.querySelectorAll('link[rel="stylesheet"]').forEach((n) => n.remove());
  doc.querySelectorAll("script[src]").forEach((n) => n.remove());

  const link = doc.createElement("link");
  link.rel = "stylesheet";
  link.href = "styles.css";
  doc.head.appendChild(link);

  if (project.js) {
    const script = doc.createElement("script");
    script.src = "script.js";
    script.defer = true;
    doc.body.appendChild(script);
  }

  const edits = project.edits || [];
  const editCssRules: string[] = [];

  for (const edit of edits) {
    if (!edit.id) continue;
    const el = doc.querySelector(`[data-builder-id="${edit.id}"]`);

    if (el && edit.content) {
      if (typeof edit.content.text === "string") {
        const isImg = el.tagName === "IMG";
        if (!isImg) {
          const hasInlineChildren = Array.from(el.children).some(
            (c) => !["BR"].includes(c.tagName) && ["SPAN", "STRONG", "EM", "B", "I", "A", "SMALL", "CODE"].includes(c.tagName),
          );
          if (hasInlineChildren) {
            const nodes = Array.from(el.childNodes);
            for (const node of nodes) {
              if (node.nodeType === 3 && node.textContent?.trim()) {
                node.textContent = edit.content.text;
                break;
              }
            }
          } else {
            const lines = edit.content.text.split("\n");
            el.textContent = "";
            for (let i = 0; i < lines.length; i++) {
              if (i > 0) el.appendChild(doc.createElement("br"));
              el.appendChild(doc.createTextNode(lines[i]));
            }
          }
        }
      }
      if (typeof edit.content.src === "string" && el.tagName === "IMG") {
        el.setAttribute("src", edit.content.src);
      }
    }

    const designs = edit.design || {};
    for (const [scope, styles] of Object.entries(designs)) {
      const entries = Object.entries(styles as Record<string, string>).filter(([, v]) => v);
      if (!entries.length) continue;
      const selector = `[data-builder-id="${edit.id}"]`;
      const body = entries.map(([k, v]) => `  ${k.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}: ${v};`).join("\n");
      if (scope === "all") {
        editCssRules.push(`${selector} {\n${body}\n}`);
      } else if (scope === "desktop") {
        editCssRules.push(`@media (min-width: 1024px) { ${selector} { ${body} } }`);
      } else if (scope === "tablet") {
        editCssRules.push(`@media (min-width: 768px) and (max-width: 1023px) { ${selector} { ${body} } }`);
      } else if (scope === "mobile") {
        editCssRules.push(`@media (max-width: 767px) { ${selector} { ${body} } }`);
      }
    }
  }

  doc.querySelectorAll("[data-builder-selected]").forEach((el) => el.removeAttribute("data-builder-selected"));
  doc.querySelectorAll("[data-builder-label]").forEach((el) => el.removeAttribute("data-builder-label"));
  doc.querySelectorAll("[data-builder-inline-edit]").forEach((el) => el.removeAttribute("data-builder-inline-edit"));

  let css = project.css || "";
  const tokens = project.tokens || {};
  const tokenEntries = Object.entries(tokens).filter(([, v]) => v);
  if (tokenEntries.length) {
    css = `:root {\n${tokenEntries.map(([n, v]) => `  ${n}: ${v};`).join("\n")}\n}\n\n${css}`;
  }
  if (editCssRules.length) {
    css += `\n\n/* Edits */\n${editCssRules.join("\n\n")}`;
  }

  const html = "<!doctype html>\n" + doc.documentElement.outerHTML;

  return { html, css, js: project.js || "" };
}
