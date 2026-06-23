import JSZip from "jszip";
import type { BuilderProject } from "./types";

export async function exportProjectAsZip(project: BuilderProject): Promise<void> {
  const zip = new JSZip();

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

  let css = project.css || "";
  const tokens = project.tokens || {};
  const tokenEntries = Object.entries(tokens).filter(([, v]) => v);
  if (tokenEntries.length) {
    css = `:root {\n${tokenEntries.map(([n, v]) => `  ${n}: ${v};`).join("\n")}\n}\n\n${css}`;
  }

  const edits = project.edits || [];
  if (edits.length) {
    const rules: string[] = [];
    for (const edit of edits) {
      const id = edit.id;
      if (!id) continue;
      const el = doc.querySelector(`[data-builder-id="${id}"]`);
      if (el) {
        if (edit.content?.text) {
          if (el.tagName === "IMG") {
            el.setAttribute("src", edit.content.text);
          } else {
            el.textContent = edit.content.text;
          }
        }
        if (edit.content?.src && el.tagName === "IMG") {
          el.setAttribute("src", edit.content.src);
        }
      }

      const designs = edit.design || {};
      for (const [scope, styles] of Object.entries(designs)) {
        const entries = Object.entries(styles as Record<string, string>).filter(([, v]) => v);
        if (!entries.length) continue;
        const selector = `[data-builder-id="${id}"]`;
        const body = entries.map(([k, v]) => `  ${k.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}: ${v};`).join("\n");
        if (scope === "all") {
          rules.push(`${selector} {\n${body}\n}`);
        } else if (scope === "desktop") {
          rules.push(`@media (min-width: 1024px) {\n  ${selector} {\n  ${body}\n  }\n}`);
        } else if (scope === "tablet") {
          rules.push(`@media (min-width: 768px) and (max-width: 1023px) {\n  ${selector} {\n  ${body}\n  }\n}`);
        } else if (scope === "mobile") {
          rules.push(`@media (max-width: 767px) {\n  ${selector} {\n  ${body}\n  }\n}`);
        }
      }
    }
    if (rules.length) {
      css += `\n\n/* Builder edits */\n${rules.join("\n\n")}`;
    }
  }

  doc.querySelectorAll("[data-builder-id]").forEach((el) => el.removeAttribute("data-builder-id"));
  doc.querySelectorAll("[data-builder-selected]").forEach((el) => el.removeAttribute("data-builder-selected"));

  const html = "<!doctype html>\n" + doc.documentElement.outerHTML;

  zip.file("index.html", html);
  zip.file("styles.css", css);
  if (project.js) zip.file("script.js", project.js);

  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${project.name || "website"}.zip`;
  a.click();
  URL.revokeObjectURL(url);
}
