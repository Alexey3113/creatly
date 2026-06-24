import { useState, useRef, useEffect } from "react";
import type { BuilderProject, EditorMode, ViewportOption } from "@/lib/builder/types";

interface TopbarProps {
  mode: EditorMode;
  viewport: ViewportOption;
  status: "ready" | "edited";
  saveStatus: "idle" | "saving" | "saved";
  project: BuilderProject;
  canUndo: boolean;
  canRedo: boolean;
  onModeChange: (mode: EditorMode) => void;
  onViewportChange: (viewport: ViewportOption) => void;
  onSave: () => void;
  onDownload: () => void;
  onOpen: (input: HTMLInputElement) => void;
  onExport: () => void;
  onPublish: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onBack?: () => void;
  onRename?: (name: string) => void;
  onReloadPreview?: () => void;
  onTransfer?: () => void;
}

export function Topbar({
  status, saveStatus, project, canUndo, canRedo,
  onSave, onExport, onPublish, onUndo, onRedo, onBack, onRename, onReloadPreview, onTransfer,
}: TopbarProps) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(project.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setName(project.name); }, [project.name]);
  useEffect(() => { if (editing) inputRef.current?.select(); }, [editing]);

  function commit() {
    const trimmed = name.trim();
    if (trimmed && trimmed !== project.name) onRename?.(trimmed);
    setEditing(false);
  }
  return (
    <>
      <style>{TOPBAR_CSS}</style>
      <header className="topbar">
        <div className="topbar__left">
          {onBack && (
            <button className="tb2-btn" type="button" onClick={onBack} title="Назад к проектам">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
            </button>
          )}
          <div className="tb2-project">
            <span className="tb2-project__dot" />
            {editing ? (
              <input
                ref={inputRef}
                className="tb2-project__input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={commit}
                onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") { setName(project.name); setEditing(false); } }}
                maxLength={60}
              />
            ) : (
              <strong onClick={() => setEditing(true)} title="Кликните чтобы переименовать">{project.name || "Без названия"}</strong>
            )}
            <span className={`tb2-status${saveStatus === "saving" ? " is-saving" : saveStatus === "saved" ? " is-saved" : status === "edited" ? " is-edited" : ""}`}>
              {saveStatus === "saving" ? "Сохранение..." : saveStatus === "saved" ? "Сохранено" : status === "edited" ? "Изменён" : ""}
            </span>
          </div>
        </div>

        <div className="tb2-center">
          <div className="tb2-actions">
            <button className="tb2-btn" type="button" disabled={!canUndo} onClick={onUndo} title="Отменить (⌘Z)">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6" /><path d="M21 17a9 9 0 00-9-9 9 9 0 00-6.69 3L3 13" /></svg>
            </button>
            <button className="tb2-btn" type="button" disabled={!canRedo} onClick={onRedo} title="Повторить (⌘⇧Z)">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7v6h-6" /><path d="M3 17a9 9 0 019-9 9 9 0 016.69 3L21 13" /></svg>
            </button>
          </div>
        </div>

        <div className="topbar__right">
          <button className="tb2-btn" type="button" onClick={onReloadPreview} title="Перезагрузить превью">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2v6h-6" /><path d="M3 12a9 9 0 0115.35-6.36L21 8" /><path d="M3 22v-6h6" /><path d="M21 12a9 9 0 01-15.35 6.36L3 16" /></svg>
          </button>
          <button className="tb2-btn" type="button" onClick={onSave} title="Сохранить (⌘S)">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" /><path d="M17 21v-8H7v8" /><path d="M7 3v5h8" /></svg>
          </button>
          <button className="tb2-btn" type="button" onClick={onExport} title="Скачать ZIP">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><path d="M7 10l5 5 5-5" /><path d="M12 15V3" /></svg>
          </button>
          {onTransfer && (
            <button className="tb2-btn" type="button" onClick={onTransfer} title="Передать проект">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4-4v-2" /><path d="M16 3h5v5" /><path d="M21 3l-9 9" /></svg>
            </button>
          )}
          <button className="tb2-publish" type="button" onClick={onPublish}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></svg>
            Опубликовать
          </button>
        </div>
      </header>
    </>
  );
}

const TOPBAR_CSS = `
.topbar{display:flex;align-items:center;justify-content:space-between;padding:0 12px;height:48px;background:#0b0b0b;backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,.05);position:relative;z-index:20}
.topbar__left,.topbar__right{display:flex;align-items:center;gap:6px}
.tb2-btn{width:34px;height:34px;border:none;background:transparent;color:#7a8ba8;cursor:pointer;border-radius:8px;display:flex;align-items:center;justify-content:center;transition:all .15s}
.tb2-btn:hover{background:rgba(255,255,255,.06);color:#e2e8f0}
.tb2-btn:disabled{opacity:.3;cursor:default}
.tb2-btn:disabled:hover{background:transparent}
.tb2-project{display:flex;align-items:center;gap:8px;padding:0 8px;height:34px;border-radius:8px;cursor:default}
.tb2-project__dot{width:8px;height:8px;border-radius:50%;background:#34d399;flex-shrink:0}
.tb2-project strong{font-size:13px;color:#e2e8f0;font-weight:600;cursor:pointer;padding:2px 6px;border-radius:4px;transition:background .15s}
.tb2-project strong:hover{background:rgba(255,255,255,.06)}
.tb2-project__input{font-size:13px;color:#e2e8f0;font-weight:600;background:rgba(255,255,255,.06);border:1px solid rgba(99,102,241,.4);border-radius:4px;padding:2px 6px;outline:none;font-family:inherit;width:180px}
.tb2-status{font-size:11px;font-weight:500;color:#475569;transition:color .2s}
.tb2-status.is-saving{color:#60a5fa}
.tb2-status.is-saved{color:#34d399}
.tb2-status.is-edited{color:#f59e0b}
.tb2-center{position:absolute;left:50%;transform:translateX(-50%)}
.tb2-actions{display:flex;align-items:center;gap:2px;padding:2px;background:rgba(255,255,255,.03);border-radius:10px;border:1px solid rgba(255,255,255,.04)}
.tb2-publish{display:flex;align-items:center;gap:6px;padding:0 16px;height:34px;border:none;border-radius:8px;background:linear-gradient(135deg,#3b82f6,#2563eb);color:#fff;font-size:13px;font-weight:600;cursor:pointer;transition:all .2s;box-shadow:0 2px 12px rgba(59,130,246,.25)}
.tb2-publish:hover{box-shadow:0 4px 20px rgba(59,130,246,.35);transform:translateY(-1px)}
`;
