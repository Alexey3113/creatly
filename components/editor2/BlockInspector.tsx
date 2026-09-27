"use client";

import { useRef, useState } from "react";
import { blockIndex } from "@/lib/builder/blocks/_registry";
import type { BlockField } from "@/lib/builder/blocks/_types";
import type { SiteOp } from "@/lib/site/ops";
import type { BlockNode, SiteDocument } from "@/lib/site/types";
import type { DispatchOptions, Selection } from "./useSiteEditor";

interface BlockInspectorProps {
  doc: SiteDocument;
  block: BlockNode;
  selection: Selection;
  dispatch: (ops: SiteOp[], options?: DispatchOptions) => unknown;
  liveSetField: (blockId: string, field: string, value: string, itemId?: string) => void;
}

/** Человеческое имя коллекции из data-collection идентификатора. */
function collectionLabel(name: string): string {
  const tail = name.replace(/^[a-z]{2}\d{2}-/, "").replace(/-/g, " ");
  return tail.charAt(0).toUpperCase() + tail.slice(1);
}

const SURFACES: { id: "solid" | "transparent" | "veil"; label: string }[] = [
  { id: "solid", label: "Свой фон" },
  { id: "transparent", label: "Сцена" },
  { id: "veil", label: "Стекло" },
];

const ENTERS: { id: string; label: string }[] = [
  { id: "none", label: "Без анимации" },
  { id: "fade", label: "Затухание" },
  { id: "slide-left", label: "Въезд слева" },
  { id: "slide-right", label: "Въезд справа" },
  { id: "rise", label: "Снизу вверх" },
  { id: "fall", label: "Сверху вниз" },
  { id: "zoom-in", label: "Наплыв (zoom)" },
  { id: "zoom-through", label: "Пролёт насквозь" },
  { id: "rotate", label: "Поворот 3D" },
];

export function BlockInspector({ doc, block, dispatch, liveSetField }: BlockInspectorProps) {
  const preset = blockIndex.get(block.presetId);

  // Bespoke-блок: полей-схемы нет, редактируем то, что размечено data-field в его html
  if (block.custom) {
    const setField = (name: string, value: string) => {
      dispatch([{ op: "update-fields", blockId: block.id, fields: { [name]: value } }], { refresh: false });
      liveSetField(block.id, name, value);
    };
    const entries = Object.entries(block.fields).filter(([k]) => !k.includes(":"));
    return (
      <div>
        <div className="ed2-section-title">✦ Авторский блок</div>
        <p className="ed2-hint" style={{ fontSize: 12, color: "#64748b", margin: "0 0 12px" }}>
          Уникальная секция, написанная AI под ваш бренд. Тексты — ниже.
        </p>
        {entries.map(([name, value]) => (
          <div className="ed2-field" key={name}>
            <label title={name}>{name.replace(/^cb-/, "").replace(/-/g, " ")}</label>
            {String(value).length > 60
              ? <textarea value={value} onChange={(e) => setField(name, e.target.value)} />
              : <input value={value} onChange={(e) => setField(name, e.target.value)} />}
          </div>
        ))}
        {!entries.length && <div className="ed2-empty">В этом блоке нет редактируемых полей</div>}
      </div>
    );
  }

  if (!preset) return <div className="ed2-empty">Неизвестный блок: {block.presetId}</div>;
  const sceneOn = !!doc.scene && doc.scene.type !== "none";

  const fieldSpec = new Map<string, BlockField>(preset.fields.map((f) => [f.name, f]));

  function updateBlockField(field: string, value: string) {
    dispatch([{ op: "update-fields", blockId: block.id, fields: { [field]: value } }], { refresh: false });
    liveSetField(block.id, field, value);
  }

  function updateItemField(itemId: string, field: string, value: string) {
    dispatch([{ op: "update-item", blockId: block.id, itemId, fields: { [field]: value } }], { refresh: false });
    liveSetField(block.id, field, value, itemId);
  }

  function renderField(name: string, value: string, onChange: (v: string) => void, key?: string) {
    const spec = fieldSpec.get(name);
    const label = spec?.hint || name;
    if (spec?.type === "image") {
      return <ImageField key={key || name} label={label} value={value} onChange={onChange} />;
    }
    const long = value.length > 60 || spec?.type === "text";
    return (
      <div className="ed2-field" key={key || name}>
        <label title={name}>{label}</label>
        {long
          ? <textarea value={value} onChange={(e) => onChange(e.target.value)} />
          : <input value={value} onChange={(e) => onChange(e.target.value)} />}
      </div>
    );
  }

  return (
    <div>
      <div className="ed2-section-title">{preset.icon} {preset.name}</div>

      {preset.variants && preset.variants.length > 0 && (
        <div className="ed2-variants">
          {preset.variants.map((v) => (
            <button
              key={v.id}
              className={`ed2-chip ${(block.variantId || preset.variants![0].id) === v.id ? "is-active" : ""}`}
              onClick={() => dispatch([{ op: "set-variant", blockId: block.id, variantId: v.id }])}
            >
              {v.label}
            </button>
          ))}
        </div>
      )}

      {sceneOn && (
        <>
          <div className="ed2-section-title">Поверхность над сценой</div>
          <div className="ed2-variants">
            {SURFACES.map((s) => (
              <button
                key={s.id}
                className={`ed2-chip ${(block.surface || "solid") === s.id ? "is-active" : ""}`}
                onClick={() => dispatch([{ op: "set-block-surface", blockId: block.id, surface: s.id }])}
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="ed2-field">
            <label>Тон сцены на этом блоке (морфинг при скролле)</label>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input
                type="color"
                defaultValue={block.sceneTint || "#2f54eb"}
                onChange={(e) => dispatch([{ op: "set-block-surface", blockId: block.id, sceneTint: e.target.value }], { history: false })}
                style={{ width: 34, height: 34, padding: 2 }}
              />
              <button
                className="ed2-btn ed2-btn--ghost"
                style={{ padding: "6px 10px", fontSize: 12 }}
                onClick={() => dispatch([{ op: "set-block-surface", blockId: block.id, sceneTint: null }])}
              >
                Сбросить
              </button>
              <span style={{ fontSize: 11, color: "#64748b" }}>{block.sceneTint || "базовый акцент"}</span>
            </div>
          </div>
        </>
      )}

      {(preset.html.includes("__scrim") || preset.html.includes("__shade")) && (() => {
        const raw = block.styles?.all?.root?.["--scrim"];
        // shade (радиальное затемнение на постерах hero/video) по умолчанию ВЫКЛ —
        // чистое фото/видео; scrim (градиент у пролога/глав) по умолчанию ВКЛ
        const defaultOn = !preset.html.includes("__shade");
        const strength = raw !== undefined ? parseFloat(raw) : (defaultOn ? 1 : 0);
        const on = strength > 0;
        return (
          <div className="ed2-field">
            <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span>Тень под текстом</span>
              <input
                type="checkbox"
                checked={on}
                onChange={(e) => dispatch([{ op: "set-style", blockId: block.id, field: "root", props: { "--scrim": e.target.checked ? "1" : "0" } }])}
              />
            </label>
            {on && (
              <input
                type="range" min={0.2} max={1} step={0.05}
                value={strength}
                onChange={(e) => dispatch([{ op: "set-style", blockId: block.id, field: "root", props: { "--scrim": e.target.value } }], { history: false })}
              />
            )}
          </div>
        );
      })()}

      <div className="ed2-field">
        <label>Появление при скролле</label>
        <select
          value={block.enter || "none"}
          onChange={(e) => dispatch([{ op: "set-block-enter", blockId: block.id, enter: e.target.value as never }])}
        >
          {ENTERS.map((en) => <option key={en.id} value={en.id}>{en.label}</option>)}
        </select>
      </div>

      {Object.keys(block.fields).map((name) =>
        renderField(name, block.fields[name] ?? "", (v) => updateBlockField(name, v)),
      )}

      {Object.entries(block.collections || {}).map(([name, items]) => (
        <div key={name}>
          <div className="ed2-section-title">{collectionLabel(name)} ({items.length})</div>
          {items.map((item, i) => (
            <div className="ed2-item-card" key={item.id}>
              <div className="ed2-item-head">
                <span>#{i + 1}</span>
                <span>
                  {i > 0 && (
                    <button title="Вверх" onClick={() => dispatch([{ op: "move-item", blockId: block.id, itemId: item.id, toIndex: i - 1 }])}>↑</button>
                  )}
                  {items.length > 1 && (
                    <button title="Удалить элемент" onClick={() => dispatch([{ op: "remove-item", blockId: block.id, itemId: item.id }])}>✕</button>
                  )}
                </span>
              </div>
              {Object.keys(item.fields).map((fname) =>
                renderField(fname, item.fields[fname] ?? "", (v) => updateItemField(item.id, fname, v), `${item.id}:${fname}`),
              )}
            </div>
          ))}
          <button
            className="ed2-btn ed2-btn--full"
            style={{ margin: "4px 0 12px" }}
            onClick={() => dispatch([{ op: "add-item", blockId: block.id, collection: name }])}
          >
            + Добавить элемент
          </button>
        </div>
      ))}
    </div>
  );
}

function isVideoUrl(url: string): boolean {
  return /\.(mp4|webm|mov)(\?|#|$)/i.test(url);
}

/** Поле-медиа: превью (картинка или видео) + загрузка файла + URL. */
function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File) {
    setUploading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      if (data.url) onChange(data.url);
      else setError(data.error || "Ошибка загрузки");
    } catch {
      setError("Ошибка сети");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="ed2-field">
      <label>{label}</label>
      {value && (isVideoUrl(value) ? (
        <video
          src={value}
          muted
          loop
          playsInline
          autoPlay
          style={{ width: "100%", height: 90, objectFit: "cover", borderRadius: 8, marginBottom: 6, background: "rgba(255,255,255,.05)" }}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt=""
          style={{ width: "100%", height: 90, objectFit: "cover", borderRadius: 8, marginBottom: 6, background: "rgba(255,255,255,.05)" }}
        />
      ))}
      <div style={{ display: "flex", gap: 6 }}>
        <input value={value} placeholder="URL или загрузите файл" onChange={(e) => onChange(e.target.value)} style={{ flex: 1 }} />
        <button
          className="ed2-btn ed2-btn--ghost"
          style={{ padding: "6px 10px", whiteSpace: "nowrap" }}
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
        >
          {uploading ? "…" : "📁"}
        </button>
      </div>
      {error && <div style={{ color: "#fca5a5", fontSize: 11, marginTop: 4 }}>{error}</div>}
      <input
        ref={fileRef}
        type="file"
        accept="image/*,video/mp4,video/webm,video/quicktime"
        style={{ display: "none" }}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) upload(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}
