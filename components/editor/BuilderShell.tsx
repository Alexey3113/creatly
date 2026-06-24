"use client";

import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { builderReducer, createInitialState, getEditForItem } from "@/lib/builder/store";
import type { BuilderProject, BuilderState, EditorMode, ResponsiveScope, ViewportOption } from "@/lib/builder/types";
import { buildSrcdoc } from "@/lib/builder/srcdoc";
import { demoProject } from "@/lib/builder/demo-project";
import { extractTokens } from "@/lib/builder/engines";
import { exportProjectAsZip } from "@/lib/builder/export-zip";
import { bakeProject } from "@/lib/builder/bake-edits";
import { blockPresets, type BlockPreset } from "@/lib/builder/block-library";
import { animationPresets, animationKeyframes } from "@/lib/builder/animations";
import { LeftSidebar } from "./LeftSidebar";
import { PreviewStage } from "./PreviewStage";
import { RightSidebar } from "./RightSidebar";
import { Topbar } from "./Topbar";
import { CommandPalette, type CommandAction } from "./CommandPalette";
import { Breadcrumbs } from "./Breadcrumbs";
import { GlobalStyles } from "./GlobalStyles";
import { AICopilot } from "./AICopilot";
import { PublishModal } from "./PublishModal";
import { TransferModal } from "./TransferModal";
import { ZoomControl } from "./ZoomControl";
import { useToast } from "./Toast";
import type { OnboardingResult } from "@/components/onboarding/OnboardingWizard";
import type { ColorPalette, FontPair } from "@/lib/builder/presets";

const EXAMPLES = ["2", "3", "4", "5"] as const;
const MAX_UNDO = 50;

interface BuilderShellProps {
  initialTemplateId?: string | null;
  uploadMode?: boolean;
  generatedSite?: { html: string; css: string; js: string } | null;
  onboardingResult?: OnboardingResult | null;
  editProjectId?: number | null;
  user?: { id: number; username?: string; firstName?: string } | null;
  onBackToGallery?: () => void;
  onBackToDashboard?: () => void;
}

export function BuilderShell({ initialTemplateId, uploadMode, generatedSite, onboardingResult, editProjectId, user, onBackToGallery, onBackToDashboard }: BuilderShellProps) {
  const [dbProjectId, setDbProjectId] = useState<number | null>(editProjectId || null);
  const [state, dispatch] = useReducer(builderReducer, demoProject, createInitialState);
  const initialLoadDone = useRef(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<ResponsiveScope>("all");
  const prevProjectKeyRef = useRef("");

  const undoStack = useRef<BuilderState[]>([]);
  const redoStack = useRef<BuilderState[]>([]);
  const stateRef = useRef(state);
  const snapshotVersion = useRef(0);
  const lastSnapshotVersion = useRef(0);
  const prevEditsRef = useRef(state.project.edits);
  const prevTokensRef = useRef(state.project.tokens);
  stateRef.current = state;
  if (state.project.edits !== prevEditsRef.current || state.project.tokens !== prevTokensRef.current) {
    prevEditsRef.current = state.project.edits;
    prevTokensRef.current = state.project.tokens;
    snapshotVersion.current++;
  }
  const styleEditSnapshotDone = useRef(false);
  const styleEditResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [appliedAnimations, setAppliedAnimations] = useState<Record<string, string>>({});
  const [currentSrcdoc, setCurrentSrcdoc] = useState("");
  const [projectLoading, setProjectLoading] = useState(!!editProjectId);
  const [seo, setSeo] = useState({ title: "", description: "", ogImage: "" });
  const [cmdOpen, setCmdOpen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const toast = useToast();
  const [publishOpen, setPublishOpen] = useState(false);
  const [transferOpen, setTransferOpen] = useState(false);

  const selected = state.elements.find((i) => i.id === state.selectedId) ?? null;
  const activeBlockId = selected?.type === "block" ? selected.id : selected?.blockId ?? null;
  const editData = state.selectedId ? getEditForItem(state, state.selectedId, scopeRef.current) : null;

  useEffect(() => {
    if (initialLoadDone.current) return;
    initialLoadDone.current = true;
    if (editProjectId) {
      fetch(`/api/projects/${editProjectId}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.project) {
            const p = data.project;
            dispatch({
              type: "load-project",
              project: {
                name: p.name,
                html: p.html,
                css: p.css,
                js: p.js,
                files: { html: "index.html", css: "styles.css", js: "script.js" },
                edits: Array.isArray(p.edits) ? p.edits : [],
                tokens: typeof p.tokens === "object" && p.tokens ? p.tokens : {},
                publishUrl: p.publishUrl || null,
              },
            });
            setDbProjectId(p.id);
          }
          setProjectLoading(false);
        });
      return;
    }
    if (generatedSite) {
      dispatch({
        type: "load-project",
        project: {
          name: "ai-generated",
          html: generatedSite.html,
          css: generatedSite.css,
          js: generatedSite.js,
          files: { html: "index.html", css: "styles.css", js: "script.js" },
          edits: [],
          tokens: extractTokens(generatedSite.css),
        },
      });
    } else if (initialTemplateId) {
      const id = initialTemplateId === "1" ? "" : initialTemplateId;
      const path = id ? `examples/${id}/` : "examples/";
      loadExample(id || "1", path);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const projectKey = `${state.project.html}\0${state.project.css}\0${state.project.js}\0${state.project.baseHref}\0${JSON.stringify(state.project.tokens || {})}`;

  function snapshot() {
    if (snapshotVersion.current === lastSnapshotVersion.current) return;
    lastSnapshotVersion.current = snapshotVersion.current;
    const s = stateRef.current;
    undoStack.current = [...undoStack.current.slice(-(MAX_UNDO - 1)), structuredClone(s)];
    redoStack.current = [];
  }

  function undo() {
    const prev = undoStack.current.pop();
    if (!prev) return;
    redoStack.current.push(structuredClone(stateRef.current));
    dispatch({ type: "restore", state: prev });
    syncIframeAfterRestore(prev);
  }

  function redo() {
    const next = redoStack.current.pop();
    if (!next) return;
    undoStack.current.push(structuredClone(stateRef.current));
    dispatch({ type: "restore", state: next });
    syncIframeAfterRestore(next);
  }

  function syncIframeAfterRestore(restored: BuilderState) {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) return;
    const key = `${restored.project.html}\0${restored.project.css}\0${restored.project.js}\0${restored.project.baseHref}\0${JSON.stringify(restored.project.tokens || {})}`;
    if (key !== prevProjectKeyRef.current) {
      prevProjectKeyRef.current = key;
      const html = buildSrcdoc(restored.project);
      iframe.srcdoc = html;
      setCurrentSrcdoc(html);
    } else {
      iframe.contentWindow.postMessage({
        source: "site-builder-parent",
        type: "restore-edits",
        edits: restored.project.edits,
      }, "*");
    }
  }

  useEffect(() => {
    if (projectKey === prevProjectKeyRef.current) return;
    prevProjectKeyRef.current = projectKey;
    const iframe = iframeRef.current;
    if (!iframe) return;
    const html = buildSrcdoc(state.project);
    iframe.srcdoc = html;
    setCurrentSrcdoc(html);
  }, [projectKey, state.project]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      const msg = event.data;
      if (msg?.source !== "site-builder-preview") return;
      if (msg.items) {
        dispatch({ type: "set-items", items: msg.items });
      }
      if ("id" in msg && msg.type === "selected") {
        dispatch({ type: "select", id: msg.id });
      }
      if (msg.type === "paste-styles" && msg.id && msg.styles) {
        snapshot();
        const styles = msg.styles as Record<string, string>;
        for (const [field, value] of Object.entries(styles)) {
          if (value) dispatch({ type: "push-edit", id: msg.id, field, value, scope: "all" });
        }
        iframeRef.current?.contentWindow?.postMessage(
          { source: "site-builder-parent", type: "edit", edit: { id: msg.id, content: {}, design: { all: styles, desktop: {}, tablet: {}, mobile: {} } } },
          "*",
        );
      }
      if (msg.type === "style-edit" && msg.id && msg.prop) {
        if (!styleEditSnapshotDone.current) {
          snapshot();
          styleEditSnapshotDone.current = true;
          clearTimeout(styleEditResetTimer.current!);
          styleEditResetTimer.current = setTimeout(() => { styleEditSnapshotDone.current = false; }, 800);
        }
        const value = msg.value || "";
        dispatch({ type: "push-edit", id: msg.id, field: msg.prop, value, scope: scopeRef.current });
      }
      if (msg.type === "insert-block-after" && typeof msg.blockIndex === "number") {
        insertAfterIndex.current = msg.blockIndex;
        dispatch({ type: "set-mode", mode: "content" });
        setShowBlockLibrary(true);
      }
      if (msg.type === "dom-changed" && typeof msg.html === "string") {
        snapshot();
        const wrappedHtml = `<!doctype html><html><head></head><body>${msg.html}</body></html>`;
        const p = stateRef.current.project;
        prevProjectKeyRef.current = `${wrappedHtml}\0${p.css}\0${p.js}\0${p.baseHref}\0${JSON.stringify(p.tokens || {})}`;
        dispatch({ type: "update-html", html: wrappedHtml });
        if (msg.action === "delete") {
          toast.show("Элемент удалён", { type: "undo", action: { label: "Отменить", onClick: () => undo() } });
        }
      }
      if (msg.type === "reset-element" && msg.id) {
        snapshot();
        dispatch({ type: "reset-element", id: msg.id });
      }
      if (msg.type === "inline-edit" && msg.id) {
        snapshot();
        if (typeof msg.text === "string") {
          dispatch({ type: "push-edit", id: msg.id, field: "text", value: msg.text, scope: "all" });
        }
        if (typeof msg.src === "string") {
          dispatch({ type: "push-edit", id: msg.id, field: "src", value: msg.src, scope: "all" });
        }
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    function handleKeyboard(e: KeyboardEvent) {
      const isMac = navigator.platform.includes("Mac");
      const mod = isMac ? e.metaKey : e.ctrlKey;
      const key = e.key.toLowerCase();
      if (mod && key === "z" && !e.shiftKey) { e.preventDefault(); undo(); }
      if (mod && key === "z" && e.shiftKey) { e.preventDefault(); redo(); }
      if (mod && key === "y") { e.preventDefault(); redo(); }
      if (mod && key === "s") { e.preventDefault(); handleSave(); }
      if (mod && key === "k") { e.preventDefault(); setCmdOpen((v) => !v); }
    }
    window.addEventListener("keydown", handleKeyboard);
    return () => window.removeEventListener("keydown", handleKeyboard);
  });

  const viewportSizes: Record<string, { w: number; h: number }> = {
    desktop: { w: 1920, h: 1080 },
    tablet:  { w: 820,  h: 1080 },
    mobile:  { w: 390,  h: 844 },
  };

  const applyScale = useCallback(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const shell = frame.parentElement;
    const stage = shell?.parentElement;

    frame.style.transform = "none";
    if (shell) {
      shell.style.width = "";
      shell.style.height = "";
    }

    const vp = stateRef.current.viewport === "split" ? "desktop" : stateRef.current.viewport;
    const dims = viewportSizes[vp] || viewportSizes.desktop;
    const frameW = dims.w;
    const frameH = dims.h;

    const availableW = Math.max(320, (stage?.clientWidth ?? 800) - 56);
    const availableH = Math.max(360, (stage?.clientHeight ?? 600) - 96);
    const scale = Math.min(1, availableW / frameW, availableH / frameH);

    frame.style.transform = `scale(${scale})`;
    if (shell) {
      shell.style.width = `${Math.ceil(frameW * scale)}px`;
      shell.style.height = `${Math.ceil(frameH * scale)}px`;
    }
  }, []);

  useEffect(() => {
    requestAnimationFrame(applyScale);
  }, [state.viewport, applyScale]);

  useEffect(() => {
    window.addEventListener("resize", applyScale);
    return () => window.removeEventListener("resize", applyScale);
  }, [applyScale]);

  function setMode(mode: EditorMode) {
    dispatch({ type: "set-mode", mode });
  }

  function setViewport(viewport: ViewportOption) {
    dispatch({ type: "set-viewport", viewport });
  }

  function selectItem(id: string) {
    dispatch({ type: "select", id });
    iframeRef.current?.contentWindow?.postMessage(
      { source: "site-builder-parent", type: "select", id },
      "*",
    );
  }

  function pushEdit(field: string, value: string) {
    if (!state.selectedId) return;
    snapshot();
    const scope = scopeRef.current;
    dispatch({ type: "push-edit", id: state.selectedId, field, value, scope });

    const contentFields = new Set(["label", "text", "src"]);
    const pxFields = new Set(["fontSize", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "marginTop", "marginRight", "marginBottom", "marginLeft", "borderRadius", "letterSpacing"]);

    const iframeEdit: Record<string, unknown> = { id: state.selectedId, content: {}, design: { all: {}, desktop: {}, tablet: {}, mobile: {} } };
    if (contentFields.has(field)) {
      (iframeEdit.content as Record<string, string>)[field] = value;
    } else {
      const cssValue = pxFields.has(field) ? `${value}px` : value;
      ((iframeEdit.design as Record<string, Record<string, string>>)[scope])[field] = cssValue;
    }

    iframeRef.current?.contentWindow?.postMessage(
      { source: "site-builder-parent", type: "edit", edit: iframeEdit },
      "*",
    );
  }

  function setScope(scope: ResponsiveScope) {
    scopeRef.current = scope;
    if (state.selectedId) {
      dispatch({ type: "select", id: state.selectedId });
    }
  }

  function setToken(name: string, value: string) {
    snapshot();
    dispatch({ type: "set-token", name, value });
  }

  async function loadFiles(htmlInput: HTMLInputElement, cssInput: HTMLInputElement, jsInput: HTMLInputElement) {
    const readFile = async (input: HTMLInputElement) => {
      const file = input.files?.[0];
      if (!file) return { text: "", name: "" };
      return { text: await file.text(), name: file.name };
    };
    const [html, css, js] = await Promise.all([readFile(htmlInput), readFile(cssInput), readFile(jsInput)]);
    if (!html.text) return;
    snapshot();
    const project: BuilderProject = {
      name: html.name.replace(/\.html?$/i, "") || "uploaded-project",
      html: html.text,
      css: css.text,
      js: js.text,
      files: { html: html.name, css: css.name, js: js.name },
      edits: [],
      tokens: extractTokens(css.text),
    };
    dispatch({ type: "load-project", project });
  }

  function loadDemo() {
    snapshot();
    dispatch({ type: "load-project", project: structuredClone(demoProject) });
  }

  async function loadExample(id: string, pathOverride?: string) {
    snapshot();
    const baseHref = new URL(pathOverride || `examples/${id}/`, location.href).href;
    const [html, css, js] = await Promise.all([
      fetch(`${baseHref}index.html`).then((r) => r.text()),
      fetch(`${baseHref}styles.css`).then((r) => r.text()),
      fetch(`${baseHref}script.js`).then((r) => r.text()),
    ]);
    const project: BuilderProject = {
      name: `example-${id}`,
      html,
      css,
      js,
      baseHref,
      files: { html: `index.html`, css: `styles.css`, js: `script.js` },
      edits: [],
      tokens: extractTokens(css),
    };
    dispatch({ type: "load-project", project });
  }

  function applyAnimation(elementId: string, presetId: string) {
    const preset = animationPresets.find((a) => a.id === presetId);
    if (!preset) return;
    setAppliedAnimations((prev) => ({ ...prev, [elementId]: presetId }));
    iframeRef.current?.contentWindow?.postMessage(
      { source: "site-builder-parent", type: "apply-animation", id: elementId, presetId, css: preset.css, trigger: preset.trigger, keyframes: animationKeyframes },
      "*",
    );
  }

  function removeAnimation(elementId: string) {
    setAppliedAnimations((prev) => {
      const next = { ...prev };
      delete next[elementId];
      return next;
    });
    iframeRef.current?.contentWindow?.postMessage(
      { source: "site-builder-parent", type: "remove-animation", id: elementId },
      "*",
    );
  }

  function applyGlobalPalette(palette: ColorPalette) {
    snapshot();
    const tokens = { ...state.project.tokens };
    const colors = palette.colors;
    const cssVarMap: Record<string, string> = {};
    const existingKeys = Object.keys(tokens);
    if (existingKeys.length) {
      const colorValues = [colors.primary, colors.secondary, colors.accent, colors.bg, colors.text];
      existingKeys.forEach((key, i) => {
        if (i < colorValues.length) cssVarMap[key] = colorValues[i];
      });
    } else {
      cssVarMap["--primary"] = colors.primary;
      cssVarMap["--secondary"] = colors.secondary;
      cssVarMap["--accent"] = colors.accent;
      cssVarMap["--bg"] = colors.bg;
      cssVarMap["--text"] = colors.text;
    }
    for (const [name, value] of Object.entries(cssVarMap)) {
      dispatch({ type: "set-token", name, value });
    }
  }

  function applyGlobalFonts(fonts: FontPair) {
    snapshot();
    const newCss = state.project.css + `\n@import url('https://fonts.googleapis.com/css2?family=${fonts.heading.replace(/ /g, "+")}&family=${fonts.body.replace(/ /g, "+")}&display=swap');\n:root{--font-heading:${fonts.heading},sans-serif;--font-body:${fonts.body},sans-serif}\nh1,h2,h3,h4,h5,h6{font-family:var(--font-heading)}\nbody,p,a,li,span{font-family:var(--font-body)}`;
    dispatch({ type: "load-project", project: { ...state.project, css: newCss } });
  }

  function handleCopilotCode(html: string, css: string) {
    snapshot();
    if (css) {
      const newCss = state.project.css + "\n" + css;
      dispatch({ type: "load-project", project: { ...state.project, css: newCss } });
    }
  }

  const insertAfterIndex = useRef<number | null>(null);
  const [showBlockLibrary, setShowBlockLibrary] = useState(false);

  function insertBlock(preset: BlockPreset) {
    snapshot();
    let newHtml: string;
    const idx = insertAfterIndex.current;
    insertAfterIndex.current = null;

    if (idx !== null) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(state.project.html || "<body></body>", "text/html");
      const blocks = doc.querySelectorAll("[data-block]");
      const target = blocks[idx];
      if (target) {
        target.insertAdjacentHTML("afterend", preset.html);
      } else {
        doc.body.insertAdjacentHTML("beforeend", preset.html);
      }
      newHtml = "<!doctype html>\n" + doc.documentElement.outerHTML;
    } else {
      newHtml = state.project.html.replace(/<\/body>/i, `${preset.html}\n</body>`);
    }

    const newCss = (state.project.css || "") + "\n" + preset.css;
    dispatch({
      type: "load-project",
      project: { ...state.project, html: newHtml, css: newCss, tokens: { ...extractTokens(newCss), ...(state.project.tokens || {}) } },
    });
  }

  async function saveProjectToDb(): Promise<number | null> {
    if (!user) return dbProjectId;
    const payload = {
      name: state.project.name,
      slug: state.project.name.toLowerCase().replace(/[^a-z0-9а-яё-]/g, "-").replace(/-+/g, "-").slice(0, 48) || "site",
      html: state.project.html,
      css: state.project.css,
      js: state.project.js,
      edits: state.project.edits,
      tokens: state.project.tokens,
    };

    if (dbProjectId) {
      await fetch(`/api/projects/${dbProjectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return dbProjectId;
    } else {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.project?.id) {
        setDbProjectId(data.project.id);
        window.history.replaceState(null, "", `/editor?project=${data.project.id}`);
        return data.project.id;
      }
      return null;
    }
  }

  async function publishSite(slug: string): Promise<{ url?: string; error?: string }> {
    try {
      const projectId = await saveProjectToDb();
      const baked = bakeProject(state.project);

      if (projectId) {
        const res = await fetch(`/api/projects/${projectId}/publish`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ html: baked.html, css: baked.css, js: baked.js }),
        });
        const data = await res.json();
        if (!res.ok) return { error: data.error || "Ошибка публикации" };
        return { url: data.url };
      }

      const res = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, html: baked.html, css: baked.css, js: baked.js }),
      });
      const data = await res.json();
      if (!res.ok) return { error: data.error || "Ошибка публикации" };
      return { url: data.url };
    } catch (err) {
      return { error: String(err) };
    }
  }

  function exportZip() {
    exportProjectAsZip(state.project);
  }

  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  useEffect(() => {
    if (state.status !== "edited" || !user) return;
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(async () => {
      setSaveStatus("saving");
      await saveProjectToDb();
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 3000);
    return () => { if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.project.edits, state.project.tokens, state.project.html, state.project.css, state.project.js, user]);

  async function handleSave() {
    setSaveStatus("saving");
    await saveProjectToDb();
    setSaveStatus("saved");
    toast.show("Проект сохранён", { type: "success", duration: 2000 });
    setTimeout(() => setSaveStatus("idle"), 2000);
  }

  function downloadProject() {
    const payload = {
      version: 1,
      savedAt: new Date().toISOString(),
      project: state.project,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${state.project.name || "project"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function openProject(input: HTMLInputElement) {
    const file = input.files?.[0];
    if (!file) return;
    snapshot();
    const payload = JSON.parse(await file.text());
    dispatch({ type: "load-project", project: payload.project || payload });
  }

  const canUndo = undoStack.current.length > 0;
  const canRedo = redoStack.current.length > 0;

  const commandActions: CommandAction[] = [
    { id: "undo", label: "Отменить", category: "edit", shortcut: "Cmd+Z", action: undo },
    { id: "redo", label: "Повторить", category: "edit", shortcut: "Cmd+Shift+Z", action: redo },
    { id: "save", label: "Сохранить проект", category: "file", shortcut: "Cmd+S", action: downloadProject },
    { id: "export", label: "Экспорт ZIP", category: "file", action: exportZip },
    { id: "demo", label: "Загрузить демо", category: "project", action: loadDemo },
    { id: "mode-content", label: "Режим: Content", category: "mode", action: () => setMode("content") },
    { id: "mode-design", label: "Режим: Design", category: "mode", action: () => setMode("design") },
    { id: "mode-structure", label: "Режим: Structure", category: "mode", action: () => setMode("structure") },
    { id: "viewport-desktop", label: "Desktop", category: "viewport", action: () => setViewport("desktop") },
    { id: "viewport-tablet", label: "Tablet", category: "viewport", action: () => setViewport("tablet") },
    { id: "viewport-mobile", label: "Mobile", category: "viewport", action: () => setViewport("mobile") },
    { id: "viewport-split", label: "Split preview", category: "viewport", action: () => setViewport("split") },
    ...blockPresets.map((bp) => ({
      id: `insert-block-${bp.id}`,
      label: `Вставить: ${bp.name}`,
      category: "block",
      action: () => insertBlock(bp),
    })),
  ];

  return (
    <div className="app-shell">
      <LeftSidebar
        blocks={state.blocks}
        fields={state.fields}
        selectedId={state.selectedId}
        activeBlockId={activeBlockId}
        examples={EXAMPLES}
        forceTab={showBlockLibrary ? "library" : undefined}
        onSelect={selectItem}
        onLoadFiles={loadFiles}
        onLoadDemo={loadDemo}
        onLoadExample={loadExample}
        onInsertBlock={(preset) => { setShowBlockLibrary(false); insertBlock(preset); }}
        onApplyPalette={applyGlobalPalette}
        onApplyFonts={applyGlobalFonts}
        onCopilotCode={handleCopilotCode}
        mode={state.mode}
        viewport={state.viewport}
        onModeChange={setMode}
        onViewportChange={setViewport}
        onPublish={() => setPublishOpen(true)}
        projectContext={`Project: ${state.project.name}, Blocks: ${state.blocks.length}, Tokens: ${JSON.stringify(state.project.tokens || {})}`}
      />
      <main className="workspace">
        <Topbar
          mode={state.mode}
          viewport={state.viewport}
          status={state.status}
          saveStatus={saveStatus}
          project={state.project}
          canUndo={canUndo}
          canRedo={canRedo}
          onModeChange={setMode}
          onViewportChange={setViewport}
          onSave={handleSave}
          onDownload={downloadProject}
          onOpen={openProject}
          onExport={exportZip}
          onPublish={() => setPublishOpen(true)}
          onUndo={undo}
          onRedo={redo}
          onBack={onBackToGallery}
          onTransfer={dbProjectId ? () => setTransferOpen(true) : undefined}
          onRename={(name) => dispatch({ type: "rename-project", name })}
          onReloadPreview={() => {
            const iframe = iframeRef.current;
            if (!iframe) return;
            iframe.srcdoc = "";
            requestAnimationFrame(() => {
              const html = buildSrcdoc(state.project);
              iframe.srcdoc = html;
              setCurrentSrcdoc(html);
            });
          }}
        />
        <Breadcrumbs elements={state.elements} selectedId={state.selectedId} onSelect={selectItem} />
        {!projectLoading && <PreviewStage viewport={state.viewport} iframeRef={iframeRef} frameRef={frameRef} srcdocHtml={currentSrcdoc} zoom={zoom} containerRef={previewContainerRef} />}
        <ZoomControl onZoomChange={setZoom} initialZoom={zoom} viewport={state.viewport} onViewportChange={setViewport} containerRef={previewContainerRef} />
      </main>
      {transferOpen && dbProjectId && (
        <TransferModal
          projectId={dbProjectId}
          projectName={state.project.name}
          onClose={() => setTransferOpen(false)}
          onSuccess={() => toast.show("Запрос на передачу отправлен", { type: "success", duration: 3000 })}
        />
      )}
      {publishOpen && (
        <PublishModal
          projectName={state.project.name}
          publishUrl={state.project.publishUrl}
          projectId={dbProjectId}
          onPublish={publishSite}
          onClose={() => setPublishOpen(false)}
        />
      )}
      <CommandPalette
        open={cmdOpen}
        onClose={() => setCmdOpen(false)}
        elements={state.elements}
        actions={commandActions}
        onSelectElement={selectItem}
      />
      <RightSidebar
        state={state}
        editData={editData}
        selected={selected}
        onSelect={selectItem}
        onPushEdit={pushEdit}
        onSetScope={setScope}
        onSetToken={setToken}
        appliedAnimations={appliedAnimations}
        onApplyAnimation={applyAnimation}
        onRemoveAnimation={removeAnimation}
        seo={seo}
        onSeoUpdate={(field, value) => setSeo((prev) => ({ ...prev, [field]: value }))}
      />
    </div>
  );
}
