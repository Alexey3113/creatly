const i18n = {
  ru: {
    appName: "Site Builder",
    appSubtitle: "Редактор HTML-шаблонов",
    sourceTitle: "Источник",
    mvpBadge: "MVP",
    htmlFile: "HTML файл",
    cssFile: "CSS файл",
    jsFile: "JavaScript файл",
    loadFiles: "Загрузить",
    loadDemo: "Демо",
    blocksTitle: "Блоки",
    fieldsTitle: "Поля блока",
    outlineTitle: "Структура",
    aiCommandTitle: "AI-команда",
    draft: "draft",
    copyAiContext: "Скопировать контекст",
    emptyFields: "Выберите блок. Если у шаблона есть data-field, здесь появятся понятные поля для редактирования.",
    emptyBlocks: "В шаблоне нет элементов с data-block. Добавьте data-block к секциям, чтобы Builder мог распознать структуру.",
    aiTitle: "AI",
    manifest: "manifest",
    aiStub: "Генерация и голосовой бриф",
    qualityTitle: "Production score",
    tokensTitle: "Дизайн-система",
    emptyTokens: "CSS variables не найдены. На следующих этапах Builder сможет предложить токены автоматически.",
    scale: "Масштаб",
    saveJson: "Сохранить JSON",
    loadJson: "Открыть JSON",
    inspectorTitle: "Настройки",
    nothingSelected: "ничего",
    emptyInspector: "Выберите блок или элемент прямо в превью.",
    elementLabel: "Название",
    textLabel: "Текст",
    imageLabel: "Изображение",
    textColor: "Цвет текста",
    background: "Фон",
    fontSize: "Размер текста",
    padding: "Внутренний отступ",
    radius: "Скругление",
    visibility: "Показ",
    visible: "Виден",
    hidden: "Скрыт",
    breakpoint: "Режим",
    projectTitle: "Проект",
    ready: "готов",
    htmlStatus: "HTML",
    cssStatus: "CSS",
    jsStatus: "JS",
  },
  en: {
    appName: "Site Builder",
    appSubtitle: "HTML template editor",
    sourceTitle: "Source",
    mvpBadge: "MVP",
    htmlFile: "HTML file",
    cssFile: "CSS file",
    jsFile: "JavaScript file",
    loadFiles: "Load",
    loadDemo: "Demo",
    blocksTitle: "Blocks",
    fieldsTitle: "Block fields",
    outlineTitle: "Structure",
    aiCommandTitle: "AI command",
    draft: "draft",
    copyAiContext: "Copy context",
    emptyFields: "Select a block. If the template has data-field attributes, semantic editable fields will appear here.",
    emptyBlocks: "No data-block elements were found. Add data-block to sections so Builder can detect the page structure.",
    aiTitle: "AI",
    manifest: "manifest",
    aiStub: "Generation and voice brief",
    qualityTitle: "Production score",
    tokensTitle: "Design system",
    emptyTokens: "No CSS variables found. Builder will be able to suggest tokens automatically in later stages.",
    scale: "Scale",
    saveJson: "Save JSON",
    loadJson: "Open JSON",
    inspectorTitle: "Inspector",
    nothingSelected: "none",
    emptyInspector: "Select a block or element in the preview.",
    elementLabel: "Label",
    textLabel: "Text",
    imageLabel: "Image",
    textColor: "Text color",
    background: "Background",
    fontSize: "Font size",
    padding: "Padding",
    radius: "Radius",
    visibility: "Display",
    visible: "Visible",
    hidden: "Hidden",
    breakpoint: "Mode",
    projectTitle: "Project",
    ready: "ready",
    htmlStatus: "HTML",
    cssStatus: "CSS",
    jsStatus: "JS",
  },
};

const demoProject = {
  name: "demo-project",
  html: `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Demo landing</title>
  </head>
  <body>
    <main>
      <section class="hero" data-block="hero">
        <div class="hero__content">
          <p class="eyebrow" data-field="eyebrow">AI website studio</p>
          <h1 data-field="title">Соберите сайт, который можно редактировать без кода</h1>
          <p data-field="subtitle">Блоки размечены data-block, а текст, изображения и стили доступны в правой панели.</p>
          <a class="button" href="#features" data-field="primaryAction">Посмотреть возможности</a>
        </div>
        <img data-field="image" src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80" alt="Рабочее пространство" />
      </section>
      <section class="features" id="features" data-block="features">
        <article>
          <h2 data-field="featureTitle">Быстрый старт</h2>
          <p data-field="featureText">Загрузите HTML, CSS и JS, затем редактируйте результат в визуальном превью.</p>
        </article>
        <article>
          <h2 data-field="featureTitle">Адаптивность</h2>
          <p data-field="featureText">Переключайтесь между desktop, tablet и mobile, чтобы проверять состояние сайта.</p>
        </article>
        <article>
          <h2 data-field="featureTitle">JSON проекта</h2>
          <p data-field="featureText">Первая версия сохраняет состояние проекта в JSON для следующей загрузки.</p>
        </article>
      </section>
      <section class="cta" data-block="cta">
        <h2 data-field="title">Готово для следующей итерации</h2>
        <p data-field="subtitle">Позже сюда можно добавить экспорт, шаблоны, голосовой бриф и AI-генерацию.</p>
      </section>
    </main>
  </body>
</html>`,
  css: `:root {
  --ink: #111827;
  --muted: #5f6878;
  --accent: #2563eb;
  --soft: #f0f5ff;
}
* { box-sizing: border-box; }
body {
  margin: 0;
  color: var(--ink);
  font-family: Inter, system-ui, sans-serif;
  background: #ffffff;
}
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 44%);
  gap: 32px;
  align-items: center;
  min-height: 720px;
  padding: 72px;
  background: linear-gradient(135deg, #f7f9ff, #ffffff 58%, #eaf1ff);
}
.hero h1 {
  max-width: 780px;
  margin: 0;
  font-size: clamp(42px, 7vw, 92px);
  line-height: .95;
  letter-spacing: 0;
}
.hero p {
  max-width: 620px;
  color: var(--muted);
  font-size: 20px;
  line-height: 1.55;
}
.eyebrow {
  color: var(--accent);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: .08em;
}
.button {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  padding: 0 20px;
  border-radius: 8px;
  color: white;
  background: var(--accent);
  text-decoration: none;
  font-weight: 800;
}
.hero img {
  width: 100%;
  aspect-ratio: 4 / 5;
  border-radius: 22px;
  object-fit: cover;
  box-shadow: 0 28px 80px rgba(37,99,235,.2);
}
.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  padding: 42px 72px;
}
.features article, .cta {
  border: 1px solid #dce5f5;
  border-radius: 12px;
  background: #fff;
  padding: 28px;
}
.features p, .cta p { color: var(--muted); line-height: 1.6; }
.cta {
  margin: 0 72px 72px;
  background: var(--soft);
}
@media (max-width: 760px) {
  .hero, .features {
    grid-template-columns: 1fr;
    padding: 28px;
  }
  .hero { min-height: auto; }
  .cta { margin: 0 28px 28px; }
}`,
  js: `document.querySelectorAll('.button').forEach((button) => {
  button.addEventListener('click', () => {
    button.textContent = 'Выбрано';
  });
});`,
  files: { html: "demo.html", css: "demo.css", js: "demo.js" },
  edits: [],
};

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
  blockList: document.querySelector("#blockList"),
  blockCount: document.querySelector("#blockCount"),
  fieldList: document.querySelector("#fieldList"),
  fieldCount: document.querySelector("#fieldCount"),
  emptyBlocks: document.querySelector("#emptyBlocks"),
  emptyFields: document.querySelector("#emptyFields"),
  emptyInspector: document.querySelector("#emptyInspector"),
  manifestBox: document.querySelector("#manifestBox"),
  tokenList: document.querySelector("#tokenList"),
  tokenCount: document.querySelector("#tokenCount"),
  emptyTokens: document.querySelector("#emptyTokens"),
  qualityList: document.querySelector("#qualityList"),
  qualityScore: document.querySelector("#qualityScore"),
  outlineList: document.querySelector("#outlineList"),
  outlineCount: document.querySelector("#outlineCount"),
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
  bridge.textContent = `(${previewBridge.toString()})(${JSON.stringify(state.project.edits || [])});`;
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

function previewBridge(initialEdits) {
  const editableSelector = "h1,h2,h3,h4,h5,h6,p,a,button,span,strong,em,small,li,img,article";
  const textTags = new Set(["H1", "H2", "H3", "H4", "H5", "H6", "P", "A", "BUTTON", "SPAN", "STRONG", "EM", "SMALL", "LI"]);
  const styleState = {};

  function shortText(element) {
    const raw = element.tagName === "IMG" ? element.getAttribute("alt") || element.getAttribute("src") : element.textContent;
    return (raw || "").trim().replace(/\s+/g, " ").slice(0, 90);
  }

  function fieldName(element) {
    if (element.dataset.field) return element.dataset.field;
    if (element.tagName === "IMG") return "image";
    if (element.matches("h1,h2,h3")) return "title";
    if (element.matches("p,small,li")) return "text";
    if (element.matches("a,button")) return "action";
    return "";
  }

  function fieldLabel(element) {
    return element.dataset.label || element.dataset.field || element.getAttribute("aria-label") || fieldName(element) || element.tagName.toLowerCase();
  }

  function canEditTextContent(element) {
    if (!textTags.has(element.tagName)) return false;
    return [...element.children].every((child) => child.tagName === "BR");
  }

  function pathFor(element) {
    const parts = [];
    let node = element;
    while (node && node.nodeType === 1 && node !== document.body) {
      const parent = node.parentElement;
      if (!parent) break;
      const same = [...parent.children].filter((child) => child.tagName === node.tagName);
      const index = same.indexOf(node) + 1;
      parts.unshift(`${node.tagName.toLowerCase()}:nth-of-type(${index})`);
      node = parent;
    }
    return parts.join(">");
  }

  function collect() {
    let index = 0;
    const all = [];
    document.querySelectorAll("[data-block]").forEach((block, blockIndex) => {
      if (!block.dataset.builderId) block.dataset.builderId = `block-${blockIndex + 1}`;
      all.push({
        id: block.dataset.builderId,
        blockId: block.dataset.builderId,
        type: "block",
        tag: block.tagName.toLowerCase(),
        label: block.dataset.block || `block-${blockIndex + 1}`,
        field: "",
        semanticId: block.dataset.block || `block-${blockIndex + 1}`,
        text: shortText(block),
        path: pathFor(block),
        src: "",
        alt: "",
        styles: getElementStyles(block),
        canEditText: false,
        canEditImage: false,
      });

      block.querySelectorAll(editableSelector).forEach((element) => {
        if (element.closest("[data-builder-ignore]")) return;
        if (!element.dataset.builderId) {
          index += 1;
          element.dataset.builderId = `${block.dataset.builderId}-el-${index}`;
        }
        all.push({
          id: element.dataset.builderId,
          blockId: block.dataset.builderId,
          type: element.tagName === "IMG" ? "image" : "element",
          tag: element.tagName.toLowerCase(),
          label: fieldLabel(element),
          field: fieldName(element),
          semanticId: `${block.dataset.block || block.dataset.builderId}.${fieldName(element) || element.tagName.toLowerCase()}`,
          text: shortText(element),
          path: pathFor(element),
          src: element.getAttribute("src") || "",
          alt: element.getAttribute("alt") || "",
          styles: getElementStyles(element),
          canEditText: canEditTextContent(element),
          canEditImage: element.tagName === "IMG",
        });
      });
    });
    return all;
  }

  function getElementStyles(element) {
    const computed = getComputedStyle(element);
    return {
      color: element.style.color || computed.color,
      backgroundColor: element.style.backgroundColor || computed.backgroundColor,
      fontSize: element.style.fontSize || computed.fontSize,
      padding: element.style.padding || computed.padding,
      borderRadius: element.style.borderRadius || computed.borderRadius,
      display: element.style.display || computed.display,
    };
  }

  function select(id) {
    document.querySelectorAll("[data-builder-selected]").forEach((node) => node.removeAttribute("data-builder-selected"));
    const element = document.querySelector(`[data-builder-id="${CSS.escape(id)}"]`);
    if (!element) return;
    element.dataset.builderSelected = "true";
    window.parent.postMessage({ source: "site-builder-preview", type: "selected", id, items: collect() }, "*");
  }

  function applyEdit(edit) {
    const element = document.querySelector(`[data-builder-id="${CSS.escape(edit.id)}"]`);
    if (!element) return;
    const normalized = normalizeEdit(edit);
    if (typeof normalized.content.label === "string") {
      element.dataset.builderLabel = normalized.content.label;
    }
    if (typeof normalized.content.text === "string" && canEditTextContent(element)) {
      element.textContent = normalized.content.text;
    }
    if (typeof normalized.content.src === "string" && element.tagName === "IMG") {
      element.setAttribute("src", normalized.content.src);
    }
    styleState[normalized.id] = mergeDesign(styleState[normalized.id], normalized.design);
    renderGeneratedStyles();
  }

  function normalizeEdit(edit) {
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

  function mergeDesign(current = {}, next = {}) {
    return {
      all: { ...(current.all || {}), ...(next.all || {}) },
      desktop: { ...(current.desktop || {}), ...(next.desktop || {}) },
      tablet: { ...(current.tablet || {}), ...(next.tablet || {}) },
      mobile: { ...(current.mobile || {}), ...(next.mobile || {}) },
    };
  }

  function renderGeneratedStyles() {
    let style = document.querySelector("[data-builder-generated-styles]");
    if (!style) {
      style = document.createElement("style");
      style.dataset.builderGeneratedStyles = "true";
      document.head.appendChild(style);
    }
    const rules = [];
    Object.entries(styleState).forEach(([id, design]) => {
      const selector = `[data-builder-id="${CSS.escape(id)}"]`;
      const allBody = styleBody(design.all);
      if (allBody) rules.push(`${selector} { ${allBody} }`);

      const desktopBody = styleBody(design.desktop);
      const tabletBody = styleBody(design.tablet);
      const mobileBody = styleBody(design.mobile);
      if (desktopBody) rules.push(`@media (min-width: 1024px) { ${selector} { ${desktopBody} } }`);
      if (tabletBody) rules.push(`@media (min-width: 768px) and (max-width: 1023px) { ${selector} { ${tabletBody} } }`);
      if (mobileBody) rules.push(`@media (max-width: 767px) { ${selector} { ${mobileBody} } }`);
    });
    style.textContent = rules.join("\n");
  }

  function styleBody(styles = {}) {
    return Object.entries(styles)
      .filter(([, value]) => value)
      .map(([key, value]) => `${kebab(key)}:${value} !important;`)
      .join("");
  }

  function kebab(value) {
    return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
  }

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-builder-id]");
    if (!target) return;
    event.preventDefault();
    event.stopPropagation();
    select(target.dataset.builderId);
  }, true);

  window.addEventListener("message", (event) => {
    const message = event.data || {};
    if (message.source !== "site-builder-parent") return;
    if (message.type === "select") select(message.id);
    if (message.type === "edit") {
      applyEdit(message.edit);
      window.parent.postMessage({ source: "site-builder-preview", type: "changed", items: collect() }, "*");
    }
  });

  initialEdits.forEach(applyEdit);
  window.parent.postMessage({ source: "site-builder-preview", type: "ready", items: collect() }, "*");
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
  renderBlocks();
  renderFields();
  renderOutline();
  renderQuality();
  renderManifest();
  updateInspector();
}

function renderBlocks() {
  dom.blockList.innerHTML = "";
  dom.blockCount.textContent = String(state.blocks.length);
  dom.emptyBlocks.hidden = state.blocks.length > 0;

  state.blocks.forEach((block) => {
    const button = document.createElement("button");
    button.className = `block-item${block.id === state.selectedId ? " is-active" : ""}`;
    button.type = "button";
    button.innerHTML = `<strong>${escapeHtml(block.label)}</strong><small>${escapeHtml(block.tag)} · ${escapeHtml(block.text || block.path)}</small>`;
    button.addEventListener("click", () => selectInPreview(block.id));
    dom.blockList.appendChild(button);
  });
}

function renderFields() {
  const selected = state.elements.find((item) => item.id === state.selectedId);
  const activeBlockId = selected?.type === "block" ? selected.id : selected?.blockId;
  const fields = activeBlockId ? state.fields.filter((field) => field.blockId === activeBlockId) : [];
  dom.fieldList.innerHTML = "";
  dom.fieldCount.textContent = String(fields.length);
  dom.emptyFields.hidden = fields.length > 0;

  fields.forEach((field) => {
    const button = document.createElement("button");
    button.className = `field-item${field.id === state.selectedId ? " is-active" : ""}`;
    button.type = "button";
    button.innerHTML = `<strong>${escapeHtml(field.field || field.label)}</strong><small>${escapeHtml(field.tag)} · ${escapeHtml(field.text || field.src || field.path)}</small>`;
    button.addEventListener("click", () => selectInPreview(field.id));
    dom.fieldList.appendChild(button);
  });
}

function renderOutline() {
  if (!dom.outlineList) return;
  dom.outlineList.innerHTML = "";
  dom.outlineCount.textContent = String(state.blocks.length);

  state.blocks.forEach((block) => {
    const wrapper = document.createElement("div");
    wrapper.className = "outline-block";

    const fields = state.fields.filter((field) => field.blockId === block.id);
    const blockButton = document.createElement("button");
    blockButton.type = "button";
    blockButton.className = block.id === state.selectedId ? "is-active" : "";
    blockButton.innerHTML = `<strong>${escapeHtml(block.label)}</strong><span>${fields.length} fields</span>`;
    blockButton.addEventListener("click", () => selectInPreview(block.id));
    wrapper.append(blockButton);

    fields.forEach((field) => {
      const fieldButton = document.createElement("button");
      fieldButton.type = "button";
      fieldButton.className = `outline-field${field.id === state.selectedId ? " is-active" : ""}`;
      fieldButton.innerHTML = `<strong>${escapeHtml(field.field || field.label)}</strong><small>${escapeHtml(field.tag)} · ${escapeHtml(field.text || field.src || field.path)}</small>`;
      fieldButton.addEventListener("click", () => selectInPreview(field.id));
      wrapper.append(fieldButton);
    });

    dom.outlineList.append(wrapper);
  });
}

function applyMode() {
  document.querySelectorAll("[data-mode]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mode === state.mode);
  });

  document.querySelectorAll("[data-mode-panel]").forEach((panel) => {
    const modes = panel.dataset.modePanel.split(/\s+/);
    panel.hidden = !modes.includes(state.mode);
  });

  document.querySelectorAll("[data-control-group]").forEach((control) => {
    const modes = control.dataset.controlGroup.split(/\s+/);
    const available = control.dataset.available !== "false";
    control.hidden = !modes.includes(state.mode) || !available;
  });
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
  applyMode();
}

function selectInPreview(id) {
  state.selectedId = id;
  renderBlocks();
  renderFields();
  renderOutline();
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
  const tokens = {};
  const matches = css.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g);
  for (const match of matches) {
    const name = match[1];
    const value = match[2].trim();
    if (/^#([0-9a-f]{3,8})$/i.test(value) || /^rgba?\(/i.test(value)) {
      tokens[name] = value;
    }
  }
  return tokens;
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
  const checks = [];
  const blockCount = state.blocks.length;
  const editableCount = state.elements.filter((item) => item.type !== "block").length;
  const fieldCount = state.fields.length;
  const imageCount = state.elements.filter((item) => item.type === "image").length;
  const imagesWithAlt = state.elements.filter((item) => item.type === "image" && item.alt).length;
  const tokenCount = Object.keys(state.project.tokens || extractTokens(state.project.css)).length;

  checks.push({
    level: blockCount ? "good" : "bad",
    title: blockCount ? `${blockCount} data-block` : "Нет data-block",
    detail: blockCount ? "Структура страницы распознана." : "AI и визуальный редактор не смогут безопасно работать без блоков.",
    points: blockCount ? 20 : 0,
  });
  checks.push({
    level: fieldCount >= Math.max(3, Math.round(editableCount * 0.25)) ? "good" : "warn",
    title: `${fieldCount} semantic fields`,
    detail: "data-field превращает DOM в понятные поля: title, subtitle, image, action.",
    points: editableCount ? Math.min(25, Math.round((fieldCount / editableCount) * 60)) : 0,
  });
  checks.push({
    level: !imageCount || imagesWithAlt === imageCount ? "good" : "warn",
    title: `${imagesWithAlt}/${imageCount} image alt`,
    detail: "Alt-тексты нужны для SEO, accessibility и AI-понимания медиа.",
    points: imageCount ? Math.round((imagesWithAlt / imageCount) * 20) : 20,
  });
  checks.push({
    level: tokenCount ? "good" : "warn",
    title: `${tokenCount} design tokens`,
    detail: "CSS variables позволяют менять стиль сайта глобально и безопасно.",
    points: tokenCount ? 20 : 5,
  });
  checks.push({
    level: state.project.js ? "good" : "warn",
    title: state.project.js ? "JS подключен" : "JS не загружен",
    detail: "Интерактивность шаблона можно проверять прямо в превью.",
    points: state.project.js ? 15 : 8,
  });

  return { score: Math.min(100, checks.reduce((sum, check) => sum + check.points, 0)), checks };
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
  return {
    version: 1,
    project: state.project.name,
    blocks: state.blocks.map((block) => ({
      id: block.id,
      type: block.label,
      fields: state.fields
        .filter((field) => field.blockId === block.id)
        .map((field) => ({
          id: field.id,
          field: field.field,
          tag: field.tag,
          kind: field.type,
          text: field.text,
          src: field.src,
        })),
    })),
    designTokens: state.project.tokens || {},
    quality: state.quality,
  };
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

document.querySelectorAll("[data-viewport]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-viewport]").forEach((item) => item.classList.toggle("is-active", item === button));
    state.viewport = button.dataset.viewport;
    dom.previewFrame.dataset.viewport = state.viewport;
    requestAnimationFrame(applyScale);
  });
});

document.querySelectorAll("[data-mode]").forEach((button) => {
  button.addEventListener("click", () => {
    state.mode = button.dataset.mode;
    applyMode();
    updateInspector();
  });
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
  renderBlocks();
  renderFields();
  renderOutline();
  updateInspector();
});

applyLanguage();
applyMode();
ensureProjectTokens();
renderPreview();
requestAnimationFrame(applyScale);
