export function previewBridge(initialEdits) {
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
