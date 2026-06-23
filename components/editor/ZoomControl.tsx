"use client";

import { useState, useEffect, useCallback } from "react";
import type { ViewportOption } from "@/lib/builder/types";

interface ZoomControlProps {
  onZoomChange: (zoom: number) => void;
  initialZoom?: number;
  viewport: ViewportOption;
  onViewportChange: (viewport: ViewportOption) => void;
  containerRef?: React.RefObject<HTMLElement | null>;
}

export function ZoomControl({ onZoomChange, initialZoom = 100, viewport, onViewportChange, containerRef }: ZoomControlProps) {
  const [zoom, setZoom] = useState(initialZoom);

  const applyZoom = useCallback((value: number) => {
    const clamped = Math.max(25, Math.min(200, value));
    setZoom(clamped);
    onZoomChange(clamped);
  }, [onZoomChange]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && (e.key === "=" || e.key === "+")) { e.preventDefault(); applyZoom(zoom + 10); }
      if (mod && e.key === "-") { e.preventDefault(); applyZoom(zoom - 10); }
      if (mod && e.key === "0") { e.preventDefault(); applyZoom(100); }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [zoom, applyZoom]);

  return (
    <div className="zoom-bar">
      <style>{ZOOM_CSS}</style>

      {/* Viewport switcher */}
      <div className="zoom-vp">
        <button className={`zoom-vp__btn${viewport === "desktop" ? " is-active" : ""}`} onClick={() => onViewportChange("desktop")} title="Desktop 1920px">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
        </button>
        <button className={`zoom-vp__btn${viewport === "tablet" ? " is-active" : ""}`} onClick={() => onViewportChange("tablet")} title="Tablet 820px">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M10 18h4" /></svg>
        </button>
        <button className={`zoom-vp__btn${viewport === "mobile" ? " is-active" : ""}`} onClick={() => onViewportChange("mobile")} title="Mobile 390px">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><rect x="7" y="2" width="10" height="20" rx="2.5" /><path d="M11 18h2" /></svg>
        </button>
      </div>

      <div className="zoom-sep" />

      {/* Zoom controls */}
      <button className="zoom-btn" onClick={() => applyZoom(zoom - 10)} title="Уменьшить (⌘-)">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 7h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </button>
      <input
        className="zoom-slider"
        type="range"
        min={25}
        max={200}
        value={zoom}
        onChange={(e) => applyZoom(Number(e.target.value))}
      />
      <button className="zoom-val" onClick={() => applyZoom(100)} title="Сбросить (⌘0)">
        {zoom}%
      </button>
      <button className="zoom-btn" onClick={() => applyZoom(zoom + 10)} title="Увеличить (⌘=)">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 4v6M4 7h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </button>

      <div className="zoom-sep" />

      <button className="zoom-fit" onClick={() => {
        const c = containerRef?.current;
        if (!c) { applyZoom(100); return; }
        const scaleW = (c.clientWidth - 48) / 1920;
        const scaleH = (c.clientHeight - 24) / 1080;
        applyZoom(Math.round(Math.min(scaleW, scaleH) * 100));
      }} title="Вписать 1920×1080">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"><rect x="1.5" y="2.5" width="11" height="9" rx="1.5" /><path d="M4 5.5h6M4 8.5h4" /></svg>
        <span>1080p</span>
      </button>
    </div>
  );
}

const ZOOM_CSS = `
.zoom-bar{display:flex;align-items:center;gap:4px;padding:4px 8px;background:rgba(10,12,24,.92);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.06);border-radius:10px;position:fixed;bottom:16px;right:350px;z-index:999}
.zoom-vp{display:flex;gap:1px;background:rgba(255,255,255,.03);border-radius:7px;padding:2px}
.zoom-vp__btn{width:30px;height:28px;border:none;background:transparent;color:#475569;cursor:pointer;border-radius:5px;display:flex;align-items:center;justify-content:center;transition:all .15s}
.zoom-vp__btn:hover{color:#94a3b8}
.zoom-vp__btn.is-active{background:rgba(59,130,246,.12);color:#60a5fa}
.zoom-sep{width:1px;height:20px;background:rgba(255,255,255,.06);margin:0 4px}
.zoom-btn{width:28px;height:28px;border:none;background:transparent;color:#6b7fa0;cursor:pointer;border-radius:6px;display:flex;align-items:center;justify-content:center;transition:all .15s}
.zoom-btn:hover{background:rgba(255,255,255,.06);color:#e2e8f0}
.zoom-slider{width:80px;height:3px;appearance:none;background:rgba(255,255,255,.08);border-radius:2px;outline:none;cursor:pointer}
.zoom-slider::-webkit-slider-thumb{appearance:none;width:12px;height:12px;border-radius:50%;background:#60a5fa;cursor:grab;border:2px solid rgba(10,12,24,.9)}
.zoom-val{padding:2px 8px;border:none;background:transparent;color:#6b7fa0;font-size:11px;font-weight:600;font-family:ui-monospace,monospace;cursor:pointer;border-radius:4px;transition:all .15s;min-width:40px;text-align:center}
.zoom-val:hover{background:rgba(255,255,255,.06);color:#e2e8f0}
.zoom-fit{display:flex;align-items:center;gap:4px;padding:4px 10px;border:none;background:rgba(255,255,255,.04);color:#6b7fa0;font-size:10px;font-weight:600;font-family:ui-monospace,monospace;cursor:pointer;border-radius:6px;transition:all .15s;white-space:nowrap}
.zoom-fit:hover{background:rgba(59,130,246,.12);color:#60a5fa}
`;
