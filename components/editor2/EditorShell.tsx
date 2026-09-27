"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { buildPreviewSrcdoc, PREVIEW_MSG_SOURCE, type PreviewMessage } from "@/lib/site/srcdoc";
import { DEMO_MSG_SOURCE } from "@/lib/site/demo-runtime";
import type { SiteOp } from "@/lib/site/ops";
import type { Viewport } from "@/lib/site/types";
import { blockIndex } from "@/lib/builder/blocks/_registry";
import { useSiteEditor } from "./useSiteEditor";
import { BlockInspector } from "./BlockInspector";
import { AddBlockPanel } from "./AddBlockPanel";
import { DesignPanel } from "./DesignPanel";
import { CopilotPanel } from "./CopilotPanel";

const VIEWPORT_WIDTHS: Record<Viewport, number> = { desktop: 1440, tablet: 820, mobile: 390 };

interface EditorShellProps {
  editProjectId: number | null;
  initialDocument?: import("@/lib/site/types").SiteDocument | null;
  onBackToDashboard: () => void;
}

type RightTab = "block" | "design" | "ai";

export function EditorShell({ editProjectId, initialDocument, onBackToDashboard }: EditorShellProps) {
  const editor = useSiteEditor(editProjectId, initialDocument);
  const { doc, frameDoc, dispatch, selection, setSelection } = editor;

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [rightTab, setRightTab] = useState<RightTab>("block");
  const [addBlockAt, setAddBlockAt] = useState<number | null>(null);
  const [publishState, setPublishState] = useState<"idle" | "publishing" | "done" | "error">("idle");
  const [publishUrl, setPublishUrl] = useState<string | null>(null);
  const [livePreview, setLivePreview] = useState<string | null>(null);
  const [demoRunning, setDemoRunning] = useState(false);
  const [demoDuration, setDemoDuration] = useState(45);
  const [barHidden, setBarHidden] = useState(false);
  const livePreviewFrameRef = useRef<HTMLIFrameElement | null>(null);
  const demoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const srcdoc = useMemo(
    () => (frameDoc ? buildPreviewSrcdoc(frameDoc) : ""),
    [frameDoc],
  );

  const activePage = doc?.pages.find((p) => p.id === doc.activePageId) || doc?.pages[0];

  const postToFrame = useCallback((msg: Record<string, unknown>) => {
    iframeRef.current?.contentWindow?.postMessage({ ...msg, source: `${PREVIEW_MSG_SOURCE}-host` }, "*");
  }, []);

  /** Живое обновление поля в iframe без перезагрузки. */
  const liveSetField = useCallback((blockId: string, field: string, value: string, itemId?: string) => {
    postToFrame({ type: "set-field", blockId, field, value, itemId });
  }, [postToFrame]);

  // ── сообщения от моста ──
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      const m = e.data as PreviewMessage;
      if (!m || m.source !== PREVIEW_MSG_SOURCE) return;

      if (m.type === "select") {
        setSelection({ blockId: m.blockId, field: m.field, itemId: m.itemId });
        if (m.blockId) setRightTab("block");
      }
      if (m.type === "field-edit") {
        const op: SiteOp = m.itemId
          ? { op: "update-item", blockId: m.blockId, itemId: m.itemId, fields: { [m.field]: m.value } }
          : { op: "update-fields", blockId: m.blockId, fields: { [m.field]: m.value } };
        dispatch([op], { refresh: false });
      }
      if (m.type === "image-click") {
        setSelection({ blockId: m.blockId, field: m.field, itemId: m.itemId });
        setRightTab("block");
      }
      if (m.type === "block-action") {
        const page = editor.doc?.pages.find((p) => p.id === editor.doc?.activePageId);
        const index = page?.blocks.findIndex((b) => b.id === m.blockId) ?? -1;
        if (index === -1) return;
        if (m.action === "move-up") dispatch([{ op: "move-block", blockId: m.blockId, toIndex: index - 1 }]);
        if (m.action === "move-down") dispatch([{ op: "move-block", blockId: m.blockId, toIndex: index + 1 }]);
        if (m.action === "duplicate") dispatch([{ op: "duplicate-block", blockId: m.blockId }]);
        if (m.action === "remove") {
          dispatch([{ op: "remove-block", blockId: m.blockId }]);
          setSelection({ blockId: null });
        }
        if (m.action === "add-after") setAddBlockAt(index + 1);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
    // editor.doc намеренно в deps: index блоков считается по свежему документу
  }, [dispatch, setSelection, editor.doc]);

  // ── хоткеи ──
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const meta = e.metaKey || e.ctrlKey;
      if (!meta) return;
      if (e.key === "z" && !e.shiftKey) { e.preventDefault(); editor.undo(); }
      if ((e.key === "z" && e.shiftKey) || e.key === "y") { e.preventDefault(); editor.redo(); }
      if (e.key === "s") { e.preventDefault(); editor.saveNow(); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [editor]);

  const selectBlockFromList = useCallback((blockId: string) => {
    setSelection({ blockId });
    setRightTab("block");
    postToFrame({ type: "select-block", blockId });
  }, [setSelection, postToFrame]);

  async function publish() {
    if (!editor.dbId || !doc) return;
    setPublishState("publishing");
    editor.saveNow();
    try {
      const res = await fetch(`/api/projects/${editor.dbId}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.url) { setPublishUrl(data.url); setPublishState("done"); }
      else setPublishState("error");
    } catch {
      setPublishState("error");
    }
  }

  /** Полноэкранный предпросмотр в publish-режиме: все анимации и story-механики живые. */
  async function openLivePreview() {
    if (!doc) return;
    const render = await import("@/lib/site/render");
    const out = render.renderPublishHtml(doc, doc.activePageId, { inline: true });
    setDemoRunning(false);
    setLivePreview(out.html);
  }

  function toggleDemo() {
    const win = livePreviewFrameRef.current?.contentWindow;
    if (!win) return;
    if (demoTimerRef.current) clearTimeout(demoTimerRef.current);
    if (demoRunning) {
      win.postMessage({ source: `${DEMO_MSG_SOURCE}-host`, action: "stop" }, "*");
      setDemoRunning(false);
    } else {
      win.postMessage({ source: `${DEMO_MSG_SOURCE}-host`, action: "start", durationMs: demoDuration * 1000 }, "*");
      setDemoRunning(true);
      demoTimerRef.current = setTimeout(() => setDemoRunning(false), demoDuration * 1000 + 300);
    }
  }

  function closePreview() {
    if (demoTimerRef.current) clearTimeout(demoTimerRef.current);
    setDemoRunning(false);
    setBarHidden(false);
    setLivePreview(null);
  }

  // Горячие клавиши предпросмотра: Esc — в редактор, H — плашка, Space/D — демо-скролл.
  useEffect(() => {
    if (!livePreview) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); closePreview(); }
      else if (e.key === "h" || e.key === "H" || e.key === "р" || e.key === "Р") { e.preventDefault(); setBarHidden((v) => !v); }
      else if (e.code === "Space" || e.key === "d" || e.key === "D" || e.key === "в" || e.key === "В") { e.preventDefault(); toggleDemo(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [livePreview, demoRunning, demoDuration]);

  async function exportZip() {
    if (!doc) return;
    const [{ default: JSZip }, render] = await Promise.all([
      import("jszip"),
      import("@/lib/site/render"),
    ]);
    const zip = new JSZip();
    // Локальные медиа (/assets/…, /uploads/…) зашиваем в архив,
    // а ссылки в html/css переписываем на относительные — архив самодостаточен.
    const mediaPaths = new Set<string>();
    const collectMedia = (text: string) => {
      for (const m of text.matchAll(/["'(](\/(?:assets|uploads)\/[^"')?#]+)/g)) mediaPaths.add(m[1]);
    };
    const relativize = (text: string, depth: number) => {
      const prefix = depth > 0 ? "../".repeat(depth) : "";
      return text.replace(/(["'(])\/(assets|uploads)\//g, `$1${prefix}$2/`);
    };
    for (const page of doc.pages) {
      const out = render.renderPublishHtml(doc, page.id, {});
      const dir = page.isHome ? "" : page.slug.replace(/^\//, "") + "/";
      const depth = dir ? dir.split("/").filter(Boolean).length : 0;
      collectMedia(out.html);
      collectMedia(out.css);
      zip.file(`${dir}index.html`, relativize(out.html, depth));
      zip.file(`${dir}styles.css`, relativize(out.css, depth));
      zip.file(`${dir}script.js`, out.js);
    }
    // Скачиваем медиа параллельно; недоступные пропускаем, но сообщаем
    const missing: string[] = [];
    await Promise.all([...mediaPaths].map(async (path) => {
      try {
        const res = await fetch(path);
        if (!res.ok) { missing.push(path); return; }
        zip.file(path.replace(/^\//, ""), await res.blob());
      } catch {
        missing.push(path);
      }
    }));
    if (missing.length) {
      console.warn("[export] не удалось включить в архив:", missing);
    }
    const blob = await zip.generateAsync({ type: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${doc.name || "site"}.zip`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  if (editor.loading || !doc || !activePage) {
    return <div className="ed2-loading">Загрузка редактора…</div>;
  }

  const selectedBlock = activePage.blocks.find((b) => b.id === selection.blockId) || null;

  return (
    <div className="ed2-root">
      <style>{ED2_CSS}</style>

      {/* ── Topbar ── */}
      <header className="ed2-topbar">
        <button className="ed2-btn ed2-btn--ghost" onClick={onBackToDashboard}>←</button>
        <input
          className="ed2-name"
          value={doc.name}
          onChange={(e) => dispatch([{ op: "rename-site", name: e.target.value }], { refresh: false, history: false })}
        />
        <div className="ed2-pages">
          {doc.pages.map((p) => (
            <button
              key={p.id}
              className={`ed2-chip ${p.id === doc.activePageId ? "is-active" : ""}`}
              onClick={() => { dispatch([{ op: "set-active-page", pageId: p.id }]); setSelection({ blockId: null }); }}
              onDoubleClick={() => {
                const title = prompt("Название страницы", p.title);
                if (title) dispatch([{ op: "rename-page", pageId: p.id, title }]);
              }}
            >
              {p.title}
            </button>
          ))}
          <button
            className="ed2-chip"
            onClick={() => {
              const title = prompt("Название новой страницы", "Новая страница");
              if (title) dispatch([{ op: "add-page", title }]);
            }}
          >
            +
          </button>
        </div>
        <div className="ed2-spacer" />
        <div className="ed2-viewports">
          {(Object.keys(VIEWPORT_WIDTHS) as Viewport[]).map((vp) => (
            <button key={vp} className={`ed2-chip ${viewport === vp ? "is-active" : ""}`} onClick={() => setViewport(vp)}>
              {vp === "desktop" ? "🖥" : vp === "tablet" ? "▯" : "📱"}
            </button>
          ))}
        </div>
        <button className="ed2-btn ed2-btn--ghost" onClick={editor.undo} disabled={!editor.canUndo} title="Отменить (⌘Z)">↩</button>
        <button className="ed2-btn ed2-btn--ghost" onClick={editor.redo} disabled={!editor.canRedo} title="Повторить (⇧⌘Z)">↪</button>
        <span className="ed2-save-state">{editor.saving ? "Сохраняю…" : editor.dirty ? "Не сохранено" : "Сохранено"}</span>
        <button className="ed2-btn ed2-btn--ghost" onClick={openLivePreview} title="Как будет выглядеть опубликованный сайт — с анимациями">▶ Просмотр</button>
        <button className="ed2-btn ed2-btn--ghost" onClick={exportZip}>Экспорт</button>
        <button className="ed2-btn ed2-btn--primary" onClick={publish} disabled={publishState === "publishing" || !editor.dbId}>
          {publishState === "publishing" ? "Публикую…" : "Опубликовать"}
        </button>
      </header>

      {publishState === "done" && publishUrl && (
        <div className="ed2-banner">
          Сайт опубликован: <a href={publishUrl} target="_blank" rel="noreferrer">{publishUrl}</a>
          <button className="ed2-btn ed2-btn--ghost" onClick={() => setPublishState("idle")}>✕</button>
        </div>
      )}
      {editor.lastError && (
        <div className="ed2-banner ed2-banner--error">
          {editor.lastError}
          <button className="ed2-btn ed2-btn--ghost" onClick={editor.clearError}>✕</button>
        </div>
      )}

      <div className="ed2-body">
        {/* ── Left: структура страницы ── */}
        <aside className="ed2-left">
          <div className="ed2-panel-title">Блоки страницы</div>
          <div className="ed2-block-list">
            {activePage.blocks.map((block, i) => {
              const preset = blockIndex.get(block.presetId);
              return (
                <button
                  key={block.id}
                  className={`ed2-block-item ${block.id === selection.blockId ? "is-active" : ""}`}
                  onClick={() => selectBlockFromList(block.id)}
                >
                  <span className="ed2-block-icon">{preset?.icon || "▢"}</span>
                  <span className="ed2-block-name">{preset?.name || block.presetId}</span>
                  <span className="ed2-block-idx">{i + 1}</span>
                </button>
              );
            })}
            {!activePage.blocks.length && <div className="ed2-empty">Страница пуста — добавьте первый блок</div>}
          </div>
          <button className="ed2-btn ed2-btn--full" onClick={() => setAddBlockAt(activePage.blocks.length)}>
            + Добавить блок
          </button>
        </aside>

        {/* ── Canvas ── */}
        <main className="ed2-canvas">
          <div className="ed2-frame-wrap" data-viewport={viewport}>
            <iframe
              ref={iframeRef}
              title="Превью сайта"
              className="ed2-frame"
              style={{ width: VIEWPORT_WIDTHS[viewport] }}
              sandbox="allow-scripts allow-same-origin allow-forms"
              srcDoc={srcdoc}
            />
          </div>
        </main>

        {/* ── Right: инспектор ── */}
        <aside className="ed2-right">
          <div className="ed2-tabs">
            <button className={`ed2-chip ${rightTab === "block" ? "is-active" : ""}`} onClick={() => setRightTab("block")}>Блок</button>
            <button className={`ed2-chip ${rightTab === "design" ? "is-active" : ""}`} onClick={() => setRightTab("design")}>Дизайн</button>
            <button className={`ed2-chip ${rightTab === "ai" ? "is-active" : ""}`} onClick={() => setRightTab("ai")}>AI</button>
          </div>
          <div className="ed2-right-body">
            {rightTab === "block" && (
              selectedBlock
                ? <BlockInspector doc={doc} block={selectedBlock} selection={selection} dispatch={dispatch} liveSetField={liveSetField} />
                : <div className="ed2-empty">Кликните блок на странице или в списке слева</div>
            )}
            {rightTab === "design" && <DesignPanel doc={doc} dispatch={dispatch} />}
            {rightTab === "ai" && <CopilotPanel doc={doc} replaceDocument={editor.replaceDocument} />}
          </div>
        </aside>
      </div>

      {livePreview && (
        <div className="ed2-live-preview">
          <div className={`ed2-live-preview-bar${barHidden ? " is-hidden" : ""}`}>
            <span>Предпросмотр — так сайт увидят посетители · <kbd>Esc</kbd> в редактор · <kbd>H</kbd> скрыть плашку · <kbd>Space</kbd> демо-прокрутка</span>
            <div className="ed2-demo-controls">
              <span className="ed2-demo-hint">🎬 Включи запись экрана и жми «Старт»</span>
              <select
                className="ed2-demo-select"
                value={demoDuration}
                onChange={(e) => setDemoDuration(Number(e.target.value))}
                disabled={demoRunning}
              >
                <option value={20}>20 сек</option>
                <option value={30}>30 сек</option>
                <option value={45}>45 сек</option>
                <option value={60}>60 сек</option>
                <option value={90}>90 сек</option>
              </select>
              <button className="ed2-btn ed2-btn--ghost" onClick={toggleDemo}>
                {demoRunning ? "⏹ Стоп" : "▶ Старт"}
              </button>
            </div>
            <button className="ed2-btn ed2-btn--primary" onClick={closePreview}>
              Вернуться в редактор
            </button>
          </div>
          {barHidden && (
            <button className="ed2-preview-restore" onClick={() => setBarHidden(false)} title="Показать плашку (H)">⌄</button>
          )}
          <iframe
            ref={livePreviewFrameRef}
            title="Живой предпросмотр"
            srcDoc={livePreview}
            sandbox="allow-scripts allow-same-origin allow-forms"
            onLoad={() => setDemoRunning(false)}
          />
        </div>
      )}

      {addBlockAt !== null && (
        <AddBlockPanel
          onClose={() => setAddBlockAt(null)}
          onAdd={(presetId) => {
            const result = dispatch([{ op: "add-block", presetId, index: addBlockAt }]);
            setAddBlockAt(null);
            if (result.applied) {
              // выбрать добавленный блок
              const page = result && editor.doc;
              void page;
            }
          }}
        />
      )}
    </div>
  );
}

const ED2_CSS = `
.ed2-root{display:flex;flex-direction:column;height:100vh;background:#0b0e1a;color:#e2e8f0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
.ed2-loading{display:grid;place-items:center;height:100vh;background:#0b0e1a;color:#94a3b8}
.ed2-topbar{display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid rgba(255,255,255,.07);background:#0f1223}
.ed2-name{background:transparent;border:1px solid transparent;color:#e2e8f0;font-size:14px;font-weight:600;padding:6px 10px;border-radius:8px;width:200px}
.ed2-name:hover,.ed2-name:focus{border-color:rgba(255,255,255,.12);outline:none;background:rgba(255,255,255,.03)}
.ed2-pages{display:flex;gap:6px;align-items:center;margin-left:8px}
.ed2-spacer{flex:1}
.ed2-viewports{display:flex;gap:4px;margin-right:8px}
.ed2-chip{all:unset;padding:6px 12px;border-radius:8px;font-size:12.5px;font-weight:600;color:#94a3b8;cursor:pointer;border:1px solid transparent}
.ed2-chip:hover{color:#e2e8f0;background:rgba(255,255,255,.05)}
.ed2-chip.is-active{color:#fff;background:rgba(99,102,241,.2);border-color:rgba(99,102,241,.4)}
.ed2-btn{all:unset;padding:8px 14px;border-radius:9px;font-size:13px;font-weight:600;cursor:pointer;text-align:center}
.ed2-btn:disabled{opacity:.4;cursor:default}
.ed2-btn--primary{background:#6366f1;color:#fff}
.ed2-btn--primary:hover:not(:disabled){background:#818cf8}
.ed2-btn--ghost{color:#94a3b8;border:1px solid rgba(255,255,255,.1)}
.ed2-btn--ghost:hover:not(:disabled){color:#e2e8f0;background:rgba(255,255,255,.05)}
.ed2-btn--full{display:block;margin:10px;background:rgba(99,102,241,.15);border:1px dashed rgba(99,102,241,.5);color:#a5b4fc}
.ed2-btn--full:hover{background:rgba(99,102,241,.25)}
.ed2-save-state{font-size:11.5px;color:#64748b;min-width:86px;text-align:right}
.ed2-banner{display:flex;align-items:center;gap:10px;padding:8px 16px;background:rgba(16,185,129,.12);border-bottom:1px solid rgba(16,185,129,.25);font-size:13px}
.ed2-banner a{color:#6ee7b7}
.ed2-banner--error{background:rgba(239,68,68,.12);border-color:rgba(239,68,68,.25);color:#fca5a5}
.ed2-body{display:flex;flex:1;min-height:0}
.ed2-left{width:250px;border-right:1px solid rgba(255,255,255,.07);background:#0f1223;display:flex;flex-direction:column;overflow-y:auto}
.ed2-right{width:320px;border-left:1px solid rgba(255,255,255,.07);background:#0f1223;display:flex;flex-direction:column;min-height:0}
.ed2-right-body{flex:1;overflow-y:auto;padding:12px;min-height:0}
.ed2-tabs{display:flex;gap:6px;padding:10px 12px;border-bottom:1px solid rgba(255,255,255,.07)}
.ed2-panel-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#64748b;padding:14px 14px 8px}
.ed2-block-list{flex:1;display:flex;flex-direction:column;gap:2px;padding:0 8px}
.ed2-block-item{all:unset;display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:8px;cursor:pointer;font-size:13px;color:#cbd5e1}
.ed2-block-item:hover{background:rgba(255,255,255,.04)}
.ed2-block-item.is-active{background:rgba(99,102,241,.18);color:#fff}
.ed2-block-icon{width:20px;text-align:center;opacity:.7}
.ed2-block-name{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ed2-block-idx{font-size:10.5px;color:#475569;font-family:ui-monospace,monospace}
.ed2-canvas{flex:1;overflow:auto;display:flex;justify-content:center;padding:20px;background:#080a14}
.ed2-frame-wrap{height:fit-content}
.ed2-frame{border:0;border-radius:10px;background:#fff;height:calc(100vh - 110px);max-width:100%;box-shadow:0 8px 40px rgba(0,0,0,.5)}
.ed2-empty{padding:24px 14px;color:#64748b;font-size:13px;text-align:center;line-height:1.5}
.ed2-field{margin-bottom:14px}
.ed2-field label{display:block;font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:5px}
.ed2-field input,.ed2-field textarea,.ed2-field select{width:100%;box-sizing:border-box;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:8px;color:#e2e8f0;font-size:13px;padding:8px 10px;font-family:inherit}
.ed2-field textarea{resize:vertical;min-height:60px;line-height:1.45}
.ed2-field input:focus,.ed2-field textarea:focus,.ed2-field select:focus{outline:none;border-color:rgba(99,102,241,.5)}
.ed2-item-card{border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:10px;margin-bottom:10px}
.ed2-item-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;font-size:12px;font-weight:700;color:#94a3b8}
.ed2-item-head button{all:unset;cursor:pointer;color:#64748b;padding:2px 6px;border-radius:5px}
.ed2-item-head button:hover{color:#fca5a5;background:rgba(239,68,68,.1)}
.ed2-section-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#64748b;margin:18px 0 10px}
.ed2-variants{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px}
.ed2-color-row{display:flex;align-items:center;gap:10px;margin-bottom:10px}
.ed2-color-row input[type=color]{width:34px;height:34px;border:1px solid rgba(255,255,255,.15);border-radius:8px;background:transparent;padding:2px;cursor:pointer}
.ed2-color-row span{font-size:12.5px;color:#cbd5e1;flex:1}
.ed2-color-row code{font-size:11px;color:#64748b}
.ed2-live-preview{position:fixed;inset:0;z-index:2000;background:#000;display:flex;flex-direction:column}
.ed2-live-preview-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:8px 14px;background:#0f1223;border-bottom:1px solid rgba(255,255,255,.08);font-size:12.5px;color:#94a3b8}
.ed2-live-preview iframe{flex:1;border:0;width:100%;background:#fff}
.ed2-live-preview-bar.is-hidden{display:none}
.ed2-live-preview-bar kbd{display:inline-block;padding:1px 6px;margin:0 1px;border:1px solid rgba(255,255,255,.2);border-radius:4px;background:rgba(255,255,255,.06);font:600 11px/1.4 ui-monospace,monospace;color:#cbd5e1}
.ed2-preview-restore{position:fixed;top:8px;left:50%;transform:translateX(-50%);z-index:2001;width:40px;height:22px;border:0;border-radius:0 0 10px 10px;background:rgba(15,18,35,.72);color:#94a3b8;font-size:15px;line-height:1;cursor:pointer;backdrop-filter:blur(8px);transition:background .15s,color .15s}
.ed2-preview-restore:hover{background:rgba(15,18,35,.95);color:#fff}
.ed2-demo-controls{display:flex;align-items:center;gap:10px}
.ed2-demo-hint{color:#a5b4fc;white-space:nowrap}
.ed2-demo-select{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#e2e8f0;border-radius:7px;padding:5px 8px;font-size:12px}
`;
