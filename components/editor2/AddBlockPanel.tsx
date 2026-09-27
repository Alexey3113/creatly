"use client";

import { useMemo, useState } from "react";
import { blockCategories, blockPresets } from "@/lib/builder/blocks/_registry";

interface AddBlockPanelProps {
  onClose: () => void;
  onAdd: (presetId: string) => void;
}

export function AddBlockPanel({ onClose, onAdd }: AddBlockPanelProps) {
  const [category, setCategory] = useState("hero");
  const [query, setQuery] = useState("");

  const presets = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blockPresets.filter((p) => {
      if (q) {
        return (
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return p.category === category;
    });
  }, [category, query]);

  return (
    <div className="ed2-modal-overlay" onClick={onClose}>
      <style>{MODAL_CSS}</style>
      <div className="ed2-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ed2-modal-head">
          <input
            className="ed2-modal-search"
            placeholder="Поиск блока…"
            value={query}
            autoFocus
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="ed2-btn ed2-btn--ghost" onClick={onClose}>✕</button>
        </div>
        <div className="ed2-modal-body">
          <div className="ed2-modal-cats">
            {blockCategories.filter((c) => c.id !== "all").map((c) => (
              <button
                key={c.id}
                className={`ed2-chip ${category === c.id && !query ? "is-active" : ""}`}
                onClick={() => { setCategory(c.id); setQuery(""); }}
              >
                {c.icon} {c.label}
              </button>
            ))}
          </div>
          <div className="ed2-modal-grid">
            {presets.map((p) => (
              <button key={p.id} className="ed2-preset-card" onClick={() => onAdd(p.id)}>
                <div className="ed2-preset-icon">{p.icon}</div>
                <div className="ed2-preset-name">{p.name}</div>
                <div className="ed2-preset-desc">{p.description}</div>
                <div className="ed2-preset-tags">
                  <span>{p.subcategory}</span>
                  {p.motionLevel !== "css" && <span className="ed2-preset-motion">{p.motionLevel}</span>}
                </div>
              </button>
            ))}
            {!presets.length && <div className="ed2-empty">Ничего не найдено</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

const MODAL_CSS = `
.ed2-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(4px);z-index:1000;display:grid;place-items:center;padding:32px}
.ed2-modal{width:min(960px,100%);height:min(640px,100%);background:#0f1223;border:1px solid rgba(255,255,255,.1);border-radius:16px;display:flex;flex-direction:column;overflow:hidden}
.ed2-modal-head{display:flex;gap:10px;padding:14px;border-bottom:1px solid rgba(255,255,255,.07)}
.ed2-modal-search{flex:1;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:9px;color:#e2e8f0;font-size:13.5px;padding:9px 12px}
.ed2-modal-search:focus{outline:none;border-color:rgba(99,102,241,.5)}
.ed2-modal-body{display:flex;flex:1;min-height:0}
.ed2-modal-cats{width:170px;border-right:1px solid rgba(255,255,255,.07);padding:12px 8px;display:flex;flex-direction:column;gap:2px;overflow-y:auto}
.ed2-modal-cats .ed2-chip{text-align:left}
.ed2-modal-grid{flex:1;overflow-y:auto;padding:14px;display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:10px;align-content:start}
.ed2-preset-card{all:unset;border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:14px;cursor:pointer;display:flex;flex-direction:column;gap:6px}
.ed2-preset-card:hover{border-color:rgba(99,102,241,.5);background:rgba(99,102,241,.07)}
.ed2-preset-icon{font-size:20px}
.ed2-preset-name{font-size:13.5px;font-weight:700;color:#e2e8f0}
.ed2-preset-desc{font-size:11.5px;color:#94a3b8;line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.ed2-preset-tags{display:flex;gap:6px;margin-top:auto}
.ed2-preset-tags span{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#64748b;background:rgba(255,255,255,.05);padding:3px 7px;border-radius:5px}
.ed2-preset-motion{color:#a5b4fc!important;background:rgba(99,102,241,.15)!important}
`;
