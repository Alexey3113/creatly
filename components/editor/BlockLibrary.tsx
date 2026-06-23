"use client";

import { useMemo, useRef, useState } from "react";
import { blockPresets, blockCategories, type BlockPreset } from "@/lib/builder/block-library";

interface BlockLibraryProps {
  onInsert: (preset: BlockPreset) => void;
}

function BlockCard({ preset, onInsert }: { preset: BlockPreset; onInsert: (p: BlockPreset) => void }) {
  const [activeVariant, setActiveVariant] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const variantCss = preset.variants?.[activeVariant]?.css || "";
  const fullCss = preset.css + variantCss;

  const srcdoc = useMemo(() => {
    return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box;margin:0}body{font-family:Inter,system-ui,sans-serif;overflow:hidden}${fullCss}</style></head><body>${preset.html}</body></html>`;
  }, [preset.html, fullCss]);

  function handleInsert() {
    if (preset.variants?.length) {
      const merged = { ...preset, css: fullCss };
      onInsert(merged);
    } else {
      onInsert(preset);
    }
  }

  return (
    <div className="bl-card">
      <div className="bl-card__preview">
        <iframe
          ref={iframeRef}
          srcDoc={srcdoc}
          title={preset.name}
          sandbox="allow-same-origin"
          loading="lazy"
        />
      </div>

      <div className="bl-card__body">
        <div className="bl-card__meta">
          <span className="bl-card__icon">{preset.icon}</span>
          <div>
            <strong className="bl-card__name">{preset.name}</strong>
            <p className="bl-card__desc">{preset.description}</p>
          </div>
        </div>

        {preset.variants && preset.variants.length > 1 && (
          <div className="bl-card__variants">
            {preset.variants.map((v, i) => (
              <button
                key={v.id}
                className={`bl-variant${activeVariant === i ? " is-active" : ""}`}
                type="button"
                onClick={() => setActiveVariant(i)}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}

        <button className="bl-card__insert" type="button" onClick={handleInsert}>
          + Добавить на страницу
        </button>
      </div>
    </div>
  );
}

export function BlockLibrary({ onInsert }: BlockLibraryProps) {
  const [cat, setCat] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = blockPresets.filter((b) => {
    if (cat !== "all" && b.category !== cat) return false;
    if (search) {
      const q = search.toLowerCase();
      return b.name.toLowerCase().includes(q) || b.description.toLowerCase().includes(q) || b.category.includes(q);
    }
    return true;
  });

  return (
    <div className="bl">
      <input
        className="bl__search"
        type="text"
        placeholder="Поиск блоков..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="bl__cats">
        {blockCategories.map((c) => (
          <button
            key={c.id}
            className={`bl__cat${cat === c.id ? " is-active" : ""}`}
            type="button"
            onClick={() => setCat(c.id)}
          >
            <span className="bl__cat-icon">{c.icon}</span>
            {c.label}
          </button>
        ))}
      </div>

      <div className="bl__grid">
        {filtered.length === 0 && (
          <div className="bl__empty">Блоки не найдены</div>
        )}
        {filtered.map((preset) => (
          <BlockCard key={preset.id} preset={preset} onInsert={onInsert} />
        ))}
      </div>
    </div>
  );
}
