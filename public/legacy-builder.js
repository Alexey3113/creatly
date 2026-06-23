import { i18n, demoProject } from "/builder/data.js";
import { previewBridge as previewBridgeModule } from "/builder/preview-bridge.js";
import {
  createManifest as createManifestEngine,
  evaluateQuality as evaluateQualityEngine,
  extractTokens as extractTokensEngine,
} from "/builder/engines.js";

const state = {
  language: "ru",
  viewport: "desktop",
  mode: "content",
  selectedId: null,
  blocks: [],
  fields: [],
  elements: [],
  tokens: {},
  quality: { score: 0, checks: [] },
  project: structuredClone(demoProject),
};

const dom = {
  preview: document.querySelector("#preview"),
  previewFrame: document.querySelector("#previewFrame"),
  emptyInspector: document.querySelector("#emptyInspector"),
  manifestBox: document.querySelector("#manifestBox"),
  tokenList: document.querySelector("#tokenList"),
  tokenCount: document.querySelector("#tokenCount"),
  emptyTokens: document.querySelector("#emptyTokens"),
  qualityList: document.querySelector("#qualityList"),
  qualityScore: document.querySelector("#qualityScore"),
  aiCommandInput: document.querySelector("#aiCommandInput"),
  copyAiContextButton: document.querySelector("#copyAiContextButton"),
  inspectorForm: document.querySelector("#inspectorForm"),
  selectedType: document.querySelector("#selectedType"),
  statusLabel: document.querySelector("#statusLabel"),
  htmlStatus: document.querySelector("#htmlStatus"),
  cssStatus: document.querySelector("#cssStatus"),
  jsStatus: document.querySelector("#jsStatus"),
  htmlInput: document.querySelector("#htmlInput"),
  cssInput: document.querySelector("#cssInput"),
  jsInput: document.querySelector("#jsInput"),
  projectInput: document.querySelector("#projectInput"),
  labelInput: document.querySelector("#labelInput"),
  textInput: document.querySelector("#textInput"),
  imageInput: document.querySelector("#imageInput"),
  colorInput: document.querySelector("#colorInput"),
  backgroundInput: document.querySelector("#backgroundInput"),
  fontSizeInput: document.querySelector("#fontSizeInput"),
  paddingInput: document.querySelector("#paddingInput"),
  radiusInput: document.querySelector("#radiusInput"),
  displayInput: document.querySelector("#displayInput"),
  scopeInput: document.querySelector("#scopeInput"),
  textControl: document.querySelector("#textControl"),
  imageControl: document.querySelector("#imageControl"),
  scaleSelect: document.querySelector("#scaleSelect"),
};

function applyLanguage() {
  const dict = i18n[state.language];
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const value = dict[node.dataset.i18n];
    if (value) node.textContent = value;
  });
  document.querySelector("#languageButton").textContent = state.language.toUpperCase();
}

function readFile(input) {
  const file = input.files?.[0];
  if (!file) return Promise.resolve({ text: "", name: "" });
  return file.text().then((text) => ({ text, name: file.name }));
}

function createSrcdoc() {
  const parser = new DOMParser();
  const doc = parser.parseFromString(state.project.html || "<!doctype html><html><body></body></html>", "text/html");

  doc.querySelectorAll('link[rel="stylesheet"], script[src]').forEach((node) => node.remove());

  const base = doc.createElement("base");
  base.href = state.project.baseHref || location.href;
  doc.head.prepend(base);

  const style = doc.createElement("style");
  style.dataset.builderCss = "true";
  style.textContent = state.project.css || "";
  doc.head.appendChild(style);

  const tokenStyle = doc.createElement("style");
  tokenStyle.dataset.builderTokenCss = "true";
  tokenStyle.textContent = createTokenCss();
  doc.head.appendChild(tokenStyle);

  const bridgeStyle = doc.createElement("style");
  bridgeStyle.textContent = `
    [data-builder-id] { outline-offset: 3px; }
    [data-builder-id]:hover { outline: 2px solid rgba(37,99,235,.65) !important; cursor: pointer; }
    [data-builder-selected="true"] { outline: 3px solid #2563eb !important; box-shadow: 0 0 0 6px rgba(37,99,235,.18) !important; }
  `;
  doc.head.appendChild(bridgeStyle);

  const bridge = doc.createElement("script");
  bridge.textContent = `(${previewBridgeModule.toString()})(${JSON.stringify(state.project.edits || [])});`;
  doc.body.appendChild(bridge);

  if (state.project.js) {
    const script = doc.createElement("script");
    script.textContent = state.project.js;
    doc.body.appendChild(script);
  }

  return "<!doctype html>\n" + doc.documentElement.outerHTML;
}

function createTokenCss() {
  const entries = Object.entries(state.project.tokens || {}).filter(([, value]) => value);
  if (!entries.length) return "";
  return `:root { ${entries.map(([name, value]) => `${name}: ${value};`).join(" ")} }`;
}

function renderPreview() {
  ensureProjectTokens();
  dom.preview.srcdoc = createSrcdoc();
  updateProjectMeta();
}

function normalizeItems(items) {
  state.blocks = items.filter((item) => item.type === "block");
  state.elements = items;
  state.fields = items.filter((item) => item.type !== "block" && item.field);
  state.quality = evaluateQuality();
  publishBuilderState();
  renderQuality();
  renderManifest();
  updateInspector();
}

function renderBlocks() {
  publishBuilderState();
}

function renderFields() {
  publishBuilderState();
}

function renderOutline() {
  publishBuilderState();
}

function publishBuilderState() {
  window.dispatchEvent(new CustomEvent("builder:state", {
    detail: {
      items: state.elements,
      selectedId: state.selectedId,
      quality: state.quality,
    },
  }));
}

function updateInspector() {
  const selected = state.elements.find((item) => item.id === state.selectedId);
  dom.inspectorForm.hidden = !selected;
  dom.emptyInspector.hidden = Boolean(selected);
  dom.selectedType.textContent = selected ? `${selected.type} · ${selected.tag}` : i18n[state.language].nothingSelected;
  if (!selected) return;

  const edit = normalizeParentEdit(getEdit(selected.id));
  const activeScope = dom.scopeInput.value || "all";
  const styles = { ...(selected.styles || {}), ...(edit.design.all || {}), ...(activeScope === "all" ? {} : edit.design[activeScope] || {}) };
  const isImage = selected.canEditImage;
  const canEditText = selected.canEditText;
  dom.labelInput.value = edit.content.label ?? selected.label ?? "";
  dom.textInput.value = edit.content.text ?? selected.text ?? "";
  dom.imageInput.value = edit.content.src ?? selected.src ?? "";
  dom.colorInput.value = toColor(styles.color, "#111827");
  dom.backgroundInput.value = toColor(styles.backgroundColor, "#ffffff");
  dom.fontSizeInput.value = parseInt(styles.fontSize, 10) || 16;
  dom.paddingInput.value = parseInt(styles.padding, 10) || 24;
  dom.radiusInput.value = parseInt(styles.borderRadius, 10) || 0;
  dom.displayInput.value = styles.display || "";
  dom.textControl.dataset.available = String(canEditText);
  dom.imageControl.dataset.available = String(isImage);
}

function selectInPreview(id) {
  state.selectedId = id;
  publishBuilderState();
  dom.preview.contentWindow?.postMessage({ source: "site-builder-parent", type: "select", id }, "*");
  updateInspector();
}

function getEdit(id) {
  return state.project.edits.find((item) => item.id === id);
}

function findEdit(id) {
  let edit = state.project.edits.find((item) => item.id === id);
  if (!edit) {
    edit = { id, content: {}, design: { all: {}, desktop: {}, tablet: {}, mobile: {} } };
    state.project.edits.push(edit);
    return edit;
  }
  const normalized = normalizeParentEdit(edit);
  Object.assign(edit, normalized);
  delete edit.label;
  delete edit.text;
  delete edit.src;
  delete edit.styles;
  delete edit.scopes;
  delete edit.scope;
  return edit;
}

function normalizeParentEdit(edit) {
  if (!edit) {
    return { content: {}, design: { all: {}, desktop: {}, tablet: {}, mobile: {} } };
  }
  return {
    id: edit.id,
    content: {
      label: edit.content?.label ?? edit.label,
      text: edit.content?.text ?? edit.text,
      src: edit.content?.src ?? edit.src,
    },
    design: {
      all: { ...(edit.design?.all || edit.styles || {}) },
      desktop: { ...(edit.design?.desktop || edit.scopes?.desktop || {}) },
      tablet: { ...(edit.design?.tablet || edit.scopes?.tablet || {}) },
      mobile: { ...(edit.design?.mobile || edit.scopes?.mobile || {}) },
    },
  };
}

const styleInputs = {
  colorInput: { key: "color", getValue: () => dom.colorInput.value },
  backgroundInput: { key: "backgroundColor", getValue: () => dom.backgroundInput.value },
  fontSizeInput: { key: "fontSize", getValue: () => `${dom.fontSizeInput.value}px` },
  paddingInput: { key: "padding", getValue: () => `${dom.paddingInput.value}px` },
  radiusInput: { key: "borderRadius", getValue: () => `${dom.radiusInput.value}px` },
  displayInput: { key: "display", getValue: () => dom.displayInput.value },
};

function pushEdit(event) {
  if (!state.selectedId) return;
  const selected = state.elements.find((item) => item.id === state.selectedId);
  if (!selected) return;

  const target = event?.target;
  if (!target?.id || target.id === "scopeInput") return;

  const edit = findEdit(state.selectedId);

  if (target.id === "labelInput") {
    edit.content.label = dom.labelInput.value;
  }
  if (target.id === "imageInput" && selected.canEditImage) {
    edit.content.src = dom.imageInput.value;
  }
  if (target.id === "textInput" && selected.canEditText) {
    edit.content.text = dom.textInput.value;
  }

  const styleInput = styleInputs[target.id];
  if (styleInput) {
    const scope = dom.scopeInput.value;
    const stylePatch = { [styleInput.key]: styleInput.getValue() };
    edit.design[scope] = { ...(edit.design[scope] || {}), ...stylePatch };
  }

  dom.preview.contentWindow?.postMessage({ source: "site-builder-parent", type: "edit", edit }, "*");
  dom.statusLabel.textContent = "edited";
}

function updateProjectMeta() {
  dom.htmlStatus.textContent = state.project.files?.html || "-";
  dom.cssStatus.textContent = state.project.files?.css || "-";
  dom.jsStatus.textContent = state.project.files?.js || "-";
}

function extractTokens(css = "") {
  return extractTokensEngine(css);
}

function ensureProjectTokens() {
  state.project.tokens = { ...extractTokens(state.project.css), ...(state.project.tokens || {}) };
  state.tokens = state.project.tokens;
  renderTokens();
}

function renderTokens() {
  const entries = Object.entries(state.project.tokens || {});
  dom.tokenList.innerHTML = "";
  dom.tokenCount.textContent = String(entries.length);
  dom.emptyTokens.hidden = entries.length > 0;

  entries.forEach(([name, value]) => {
    const item = document.createElement("label");
    item.className = "token-item";
    item.innerHTML = `<span><strong>${escapeHtml(name)}</strong><span>${escapeHtml(value)}</span></span>`;
    const input = document.createElement("input");
    input.type = "color";
    input.value = toColor(value, "#ffffff");
    input.addEventListener("input", () => {
      state.project.tokens[name] = input.value;
      renderPreview();
      renderManifest();
    });
    item.append(input);
    dom.tokenList.append(item);
  });
}

function evaluateQuality() {
  return evaluateQualityEngine({
    blocks: state.blocks,
    elements: state.elements,
    fields: state.fields,
    project: state.project,
  });
}

function renderQuality() {
  dom.qualityScore.textContent = `${state.quality.score}/100`;
  dom.qualityList.innerHTML = "";
  state.quality.checks.forEach((check) => {
    const item = document.createElement("div");
    item.className = "quality-item";
    item.dataset.level = check.level;
    item.innerHTML = `<strong>${escapeHtml(check.title)}</strong><span>${escapeHtml(check.detail)}</span>`;
    dom.qualityList.append(item);
  });
}

function createManifest() {
  return createManifestEngine({
    project: state.project,
    blocks: state.blocks,
    fields: state.fields,
    quality: state.quality,
  });
}

function renderManifest() {
  dom.manifestBox.value = JSON.stringify(createManifest(), null, 2);
}

function downloadProject() {
  const payload = {
    version: 1,
    savedAt: new Date().toISOString(),
    manifest: createManifest(),
    project: state.project,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${state.project.name || "site-builder-project"}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

function toColor(value, fallback) {
  if (!value) return fallback;
  const option = new Option();
  option.style.color = value;
  document.body.append(option);
  const computed = getComputedStyle(option).color;
  option.remove();
  if (computed === "rgba(0, 0, 0, 0)" || computed === "transparent") return fallback;
  const match = computed.match(/\d+/g);
  if (!match) return fallback;
  return `#${match.slice(0, 3).map((part) => Number(part).toString(16).padStart(2, "0")).join("")}`;
}

function applyScale() {
  const value = dom.scaleSelect.value;
  dom.previewFrame.style.transform = "";
  if (value !== "fit") {
    dom.previewFrame.style.transform = `scale(${value})`;
    return;
  }
  const available = dom.previewFrame.parentElement.clientWidth - 48;
  const scale = Math.min(1, available / dom.previewFrame.offsetWidth);
  dom.previewFrame.style.transform = `scale(${scale})`;
}

document.querySelector("#loadFilesButton").addEventListener("click", async () => {
  const [html, css, js] = await Promise.all([readFile(dom.htmlInput), readFile(dom.cssInput), readFile(dom.jsInput)]);
  if (!html.text) return;
  state.selectedId = null;
  state.project = {
    name: html.name.replace(/\.html?$/i, "") || "uploaded-project",
    html: html.text,
    css: css.text,
    js: js.text,
    files: { html: html.name, css: css.name, js: js.name },
    edits: [],
  };
  ensureProjectTokens();
  renderPreview();
});

document.querySelector("#loadDemoButton").addEventListener("click", () => {
  state.selectedId = null;
  state.project = structuredClone(demoProject);
  ensureProjectTokens();
  renderPreview();
});

document.querySelectorAll("[data-example]").forEach((button) => {
  button.addEventListener("click", () => loadBundledExample(button.dataset.example));
});

async function loadBundledExample(exampleId) {
  const baseHref = new URL(`examples/${exampleId}/`, location.href).href;
  const [html, css, js] = await Promise.all([
    fetch(`${baseHref}index.html`).then((response) => response.text()),
    fetch(`${baseHref}styles.css`).then((response) => response.text()),
    fetch(`${baseHref}script.js`).then((response) => response.text()),
  ]);
  state.selectedId = null;
  state.project = {
    name: `example-${exampleId}`,
    html,
    css,
    js,
    baseHref,
    files: { html: `examples/${exampleId}/index.html`, css: `examples/${exampleId}/styles.css`, js: `examples/${exampleId}/script.js` },
    edits: [],
  };
  ensureProjectTokens();
  renderPreview();
}

document.querySelector("#saveProjectButton").addEventListener("click", downloadProject);

dom.projectInput.addEventListener("change", async () => {
  const file = dom.projectInput.files?.[0];
  if (!file) return;
  const payload = JSON.parse(await file.text());
  state.selectedId = null;
  state.project = payload.project || payload;
  ensureProjectTokens();
  renderPreview();
});

document.querySelector("#languageButton").addEventListener("click", () => {
  state.language = state.language === "ru" ? "en" : "ru";
  applyLanguage();
  updateInspector();
});

dom.copyAiContextButton?.addEventListener("click", async () => {
  const context = {
    command: dom.aiCommandInput.value.trim(),
    manifest: createManifest(),
  };
  const text = JSON.stringify(context, null, 2);
  try {
    await navigator.clipboard.writeText(text);
    dom.copyAiContextButton.textContent = state.language === "ru" ? "Скопировано" : "Copied";
    setTimeout(applyLanguage, 1000);
  } catch {
    dom.aiCommandInput.value = text;
  }
});

dom.scaleSelect.addEventListener("change", applyScale);
dom.scopeInput.addEventListener("change", updateInspector);
window.addEventListener("resize", applyScale);

["input", "change"].forEach((eventName) => {
  dom.inspectorForm.addEventListener(eventName, pushEdit);
});

window.addEventListener("message", (event) => {
  const message = event.data || {};
  if (message.source !== "site-builder-preview") return;
  if (message.items) normalizeItems(message.items);
  if (message.id) state.selectedId = message.id;
  publishBuilderState();
  updateInspector();
});

window.addEventListener("builder:select", (event) => {
  const id = event.detail?.id;
  if (!id) return;
  selectInPreview(id);
});

window.addEventListener("builder:request-state", publishBuilderState);

applyLanguage();
ensureProjectTokens();
renderPreview();
requestAnimationFrame(applyScale);
