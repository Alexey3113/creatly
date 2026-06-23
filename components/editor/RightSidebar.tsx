"use client";

import { useState } from "react";
import type { BuilderItem, BuilderState, BuilderStyles, ResponsiveScope } from "@/lib/builder/types";
import { StructureOutline } from "./StructureOutline";
import { AnimationPanel } from "./AnimationPanel";
import { SeoPanel } from "./SeoPanel";
import { popularFonts } from "@/lib/builder/fonts";

interface EditData {
  item: BuilderItem;
  label: string;
  text: string;
  src: string;
  styles: BuilderStyles;
}

interface RightSidebarProps {
  state: BuilderState;
  editData: EditData | null;
  selected: BuilderItem | null;
  onSelect: (id: string) => void;
  onPushEdit: (field: string, value: string) => void;
  onSetScope: (scope: ResponsiveScope) => void;
  onSetToken: (name: string, value: string) => void;
  appliedAnimations: Record<string, string>;
  onApplyAnimation: (elementId: string, presetId: string) => void;
  onRemoveAnimation: (elementId: string) => void;
  seo: { title: string; description: string; ogImage: string };
  onSeoUpdate: (field: string, value: string) => void;
}

function toHex(value: string | undefined, fallback: string): string {
  if (!value) return fallback;
  if (value.startsWith("#") && (value.length === 4 || value.length === 7 || value.length === 9)) return value;
  const m = value.match(/\d+/g);
  if (!m || m.length < 3) return fallback;
  return `#${m.slice(0, 3).map((p) => Number(p).toString(16).padStart(2, "0")).join("")}`;
}

function px(v: string | undefined): number {
  return parseInt(v || "0", 10) || 0;
}

/* ── Reusable UI components ── */

function PanelSection({ title, icon, defaultOpen = true, children }: {
  title: string; icon: React.ReactNode; defaultOpen?: boolean; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`rp-section${open ? " is-open" : ""}`}>
      <button className="rp-section__head" type="button" onClick={() => setOpen(!open)}>
        <span className="rp-section__icon">{icon}</span>
        <span className="rp-section__title">{title}</span>
        <svg className="rp-section__chevron" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M4 5.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      {open && <div className="rp-section__body">{children}</div>}
    </div>
  );
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rp-field">
      <label className="rp-field__label">{label}</label>
      <div className="rp-field__control">{children}</div>
    </div>
  );
}

function SliderInput({ value, min, max, suffix, onChange }: {
  value: number; min: number; max: number; suffix?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="rp-slider">
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(e.target.value)} />
      <div className="rp-slider__val">
        <input type="number" min={min} max={max} value={value} onChange={(e) => onChange(e.target.value)} />
        {suffix && <span>{suffix}</span>}
      </div>
    </div>
  );
}

function ColorPicker({ color, label, onChange }: { color: string; label: string; onChange: (v: string) => void }) {
  return (
    <label className="rp-color">
      <div className="rp-color__swatch" style={{ background: color }} />
      <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
      <span className="rp-color__hex">{color}</span>
      <span className="rp-color__label">{label}</span>
    </label>
  );
}

function ToggleGroup({ options, value, onChange }: {
  options: { value: string; label: React.ReactNode; title?: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="rp-toggle-group">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          className={`rp-toggle${value === o.value ? " is-active" : ""}`}
          onClick={() => onChange(o.value)}
          title={o.title}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function SpacingBox({ prefix, top, right, bottom, left, onChange, allowNegative }: {
  prefix: string; top: number; right: number; bottom: number; left: number;
  onChange: (field: string, value: string) => void; allowNegative?: boolean;
}) {
  const min = allowNegative ? -200 : 0;
  return (
    <div className="rp-spacing">
      <div className="rp-spacing__top">
        <input type="number" min={min} max={400} value={top} onChange={(e) => onChange(`${prefix}Top`, e.target.value)} />
      </div>
      <div className="rp-spacing__mid">
        <input type="number" min={min} max={400} value={left} onChange={(e) => onChange(`${prefix}Left`, e.target.value)} />
        <div className="rp-spacing__center" />
        <input type="number" min={min} max={400} value={right} onChange={(e) => onChange(`${prefix}Right`, e.target.value)} />
      </div>
      <div className="rp-spacing__bottom">
        <input type="number" min={min} max={400} value={bottom} onChange={(e) => onChange(`${prefix}Bottom`, e.target.value)} />
      </div>
    </div>
  );
}

/* ── Icons ── */
const icons = {
  type: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 7V4h16v3M9 20h6M12 4v16" strokeLinecap="round" /></svg>,
  fill: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M12 3c0 9-9 9-9 9s9 0 9 9" /></svg>,
  spacing: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="8" y="8" width="8" height="8" rx="1" strokeDasharray="2 2" /></svg>,
  radius: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 20V10a6 6 0 016-6h10" strokeLinecap="round" /></svg>,
  eye: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
  motion: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" strokeLinecap="round" /></svg>,
  palette: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="8" r="1.5" fill="currentColor" /><circle cx="8" cy="13" r="1.5" fill="currentColor" /><circle cx="16" cy="13" r="1.5" fill="currentColor" /></svg>,
  seo: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="M16.5 16.5L21 21" strokeLinecap="round" /></svg>,
  tree: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" strokeLinecap="round" /></svg>,
  content: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M9 3v18M3 9h18" /></svg>,
};

/* ── Main component ── */

type RightTab = "style" | "seo";

export function RightSidebar({ state, editData, selected, onSelect, onPushEdit, onSetScope, onSetToken, appliedAnimations, onApplyAnimation, onRemoveAnimation, seo, onSeoUpdate }: RightSidebarProps) {
  const [scope, setScope] = useState<ResponsiveScope>("all");
  const [tab, setTab] = useState<RightTab>("style");

  function handleScope(s: ResponsiveScope) {
    setScope(s);
    onSetScope(s);
  }

  const tokens = Object.entries(state.project.tokens || {});

  return (
    <aside className="sidebar sidebar--right">
      <style>{RIGHT_CSS}</style>

      {/* ── Tabs ── */}
      <div className="rp-tabs">
        <button className={`rp-tab${tab === "style" ? " is-active" : ""}`} onClick={() => setTab("style")}>Стиль</button>
        <button className={`rp-tab${tab === "seo" ? " is-active" : ""}`} onClick={() => setTab("seo")}>SEO</button>
      </div>

      {tab === "style" && (
        <div className="rp-scroll">
          {!editData ? (
            <div className="rp-empty">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="1.2">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="M9 3v18M3 9h18" />
              </svg>
              <p>Выберите элемент для редактирования</p>
              <span>Кликните в превью</span>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="rp-header">
                <div className="rp-header__tag">&lt;{selected?.tag}&gt;</div>
                <div className="rp-header__name">{editData.label || selected?.field || "Элемент"}</div>
                {selected?.type === "block" && <span className="rp-header__badge">Блок</span>}
              </div>

              {/* Responsive */}
              <div className="rp-scope">
                <ToggleGroup
                  options={[
                    { value: "all", label: "Все", title: "Все устройства" },
                    { value: "desktop", label: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>, title: "Desktop" },
                    { value: "tablet", label: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M10 18h4" /></svg>, title: "Tablet" },
                    { value: "mobile", label: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="7" y="2" width="10" height="20" rx="2.5" /><path d="M11 18h2" /></svg>, title: "Mobile" },
                  ]}
                  value={scope}
                  onChange={(v) => handleScope(v as ResponsiveScope)}
                />
              </div>

              {/* Content */}
              {(editData.item.canEditText || editData.item.canEditImage) && (
                <PanelSection title="Контент" icon={icons.content}>
                  {editData.item.canEditText && (
                    <FieldRow label="Текст">
                      <textarea className="rp-textarea" rows={3} value={editData.text} onChange={(e) => onPushEdit("text", e.target.value)} />
                    </FieldRow>
                  )}
                  {editData.item.canEditImage && (
                    <>
                      <FieldRow label="URL изображения">
                        <input className="rp-input" type="url" placeholder="https://..." value={editData.src} onChange={(e) => onPushEdit("src", e.target.value)} />
                      </FieldRow>
                      <label className="rp-upload">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 16V4M7 9l5-5 5 5M5 14v4a2 2 0 002 2h10a2 2 0 002-2v-4" /></svg>
                        Загрузить (WebP)
                        <input type="file" accept="image/*" hidden onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const img = new Image();
                          img.onload = () => {
                            const maxW = 1920, maxH = 1080;
                            let w = img.naturalWidth, h = img.naturalHeight;
                            if (w > maxW || h > maxH) { const r = Math.min(maxW / w, maxH / h); w = Math.round(w * r); h = Math.round(h * r); }
                            const c = document.createElement("canvas"); c.width = w; c.height = h;
                            c.getContext("2d")!.drawImage(img, 0, 0, w, h);
                            c.toBlob((b) => { if (!b) return; const r = new FileReader(); r.onload = () => onPushEdit("src", r.result as string); r.readAsDataURL(b); }, "image/webp", 0.85);
                            URL.revokeObjectURL(img.src);
                          };
                          img.src = URL.createObjectURL(file);
                          e.target.value = "";
                        }} />
                      </label>
                    </>
                  )}
                </PanelSection>
              )}

              {/* Typography */}
              <PanelSection title="Типографика" icon={icons.type}>
                <FieldRow label="Шрифт">
                  <select className="rp-select" value="" onChange={(e) => onPushEdit("fontFamily", e.target.value)}>
                    <option value="">Системный</option>
                    {popularFonts.map((f) => <option key={f.family} value={f.family}>{f.family}</option>)}
                  </select>
                </FieldRow>
                <FieldRow label="Размер">
                  <SliderInput value={px(editData.styles.fontSize)} min={8} max={200} suffix="px" onChange={(v) => onPushEdit("fontSize", v)} />
                </FieldRow>
                <FieldRow label="Начертание">
                  <ToggleGroup
                    options={[
                      { value: "normal", label: <span style={{ fontWeight: 400 }}>Aa</span>, title: "Обычный" },
                      { value: "bold", label: <span style={{ fontWeight: 700 }}>Aa</span>, title: "Жирный" },
                    ]}
                    value={(editData.styles.fontWeight || "").toString().match(/^[6-9]|bold/) ? "bold" : "normal"}
                    onChange={(v) => onPushEdit("fontWeight", v === "bold" ? "700" : "400")}
                  />
                </FieldRow>
                <FieldRow label="Выравнивание">
                  <ToggleGroup
                    options={[
                      { value: "left", label: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M2 3h10M2 6h7M2 9h10M2 12h5" /></svg>, title: "Лево" },
                      { value: "center", label: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M2 3h10M4 6h6M2 9h10M4 12h6" /></svg>, title: "Центр" },
                      { value: "right", label: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M2 3h10M5 6h7M2 9h10M7 12h5" /></svg>, title: "Право" },
                    ]}
                    value={editData.styles.textAlign || "left"}
                    onChange={(v) => onPushEdit("textAlign", v)}
                  />
                </FieldRow>
                <FieldRow label="Цвет">
                  <ColorPicker color={toHex(editData.styles.color, "#111827")} label="Текст" onChange={(v) => onPushEdit("color", v)} />
                </FieldRow>
              </PanelSection>

              {/* Fill */}
              <PanelSection title="Заливка" icon={icons.fill}>
                <ColorPicker color={toHex(editData.styles.backgroundColor, "#ffffff")} label="Фон" onChange={(v) => onPushEdit("backgroundColor", v)} />
              </PanelSection>

              {/* Spacing */}
              <PanelSection title="Отступы" icon={icons.spacing}>
                <FieldRow label="Padding">
                  <SpacingBox prefix="padding" top={px(editData.styles.paddingTop)} right={px(editData.styles.paddingRight)} bottom={px(editData.styles.paddingBottom)} left={px(editData.styles.paddingLeft)} onChange={onPushEdit} />
                </FieldRow>
                <FieldRow label="Margin">
                  <SpacingBox prefix="margin" top={px(editData.styles.marginTop)} right={px(editData.styles.marginRight)} bottom={px(editData.styles.marginBottom)} left={px(editData.styles.marginLeft)} onChange={onPushEdit} allowNegative />
                </FieldRow>
              </PanelSection>

              {/* Border radius */}
              <PanelSection title="Скругление" icon={icons.radius} defaultOpen={false}>
                <SliderInput value={px(editData.styles.borderRadius)} min={0} max={100} suffix="px" onChange={(v) => onPushEdit("borderRadius", v)} />
              </PanelSection>

              {/* Visibility */}
              <PanelSection title="Видимость" icon={icons.eye} defaultOpen={false}>
                <ToggleGroup
                  options={[
                    { value: "visible", label: "Виден" },
                    { value: "none", label: "Скрыт" },
                  ]}
                  value={editData.styles.display === "none" ? "none" : "visible"}
                  onChange={(v) => onPushEdit("display", v === "none" ? "none" : "")}
                />
              </PanelSection>

              {/* Animations */}
              <PanelSection title="Анимации" icon={icons.motion} defaultOpen={false}>
                <AnimationPanel selectedId={state.selectedId} appliedAnimations={appliedAnimations} onApply={onApplyAnimation} onRemove={onRemoveAnimation} />
              </PanelSection>

              {/* Design tokens */}
              {tokens.length > 0 && (
                <PanelSection title={`Цвета сайта (${tokens.length})`} icon={icons.palette} defaultOpen={false}>
                  <div className="rp-tokens">
                    {tokens.map(([name, value]) => (
                      <label className="rp-token" key={name} title={name}>
                        <div className="rp-token__dot" style={{ background: value }} />
                        <input type="color" value={toHex(value, "#ffffff")} onChange={(e) => onSetToken(name, e.target.value)} />
                        <span>{name.replace(/^--/, "")}</span>
                      </label>
                    ))}
                  </div>
                </PanelSection>
              )}
            </>
          )}
        </div>
      )}

      {tab === "seo" && (
        <div className="rp-scroll">
          <PanelSection title="SEO & Meta" icon={icons.seo}>
            <SeoPanel {...seo} onUpdate={onSeoUpdate} />
          </PanelSection>
          <PanelSection title={`Структура (${state.blocks.length} блоков)`} icon={icons.tree}>
            <StructureOutline blocks={state.blocks} fields={state.fields} selectedId={state.selectedId} onSelect={onSelect} />
          </PanelSection>
        </div>
      )}

      {/* Footer */}
      <div className="rp-footer">
        <span>{state.project.name}</span>
        <span className={`rp-footer__dot${state.status === "edited" ? " is-edited" : ""}`} />
      </div>
    </aside>
  );
}

const RIGHT_CSS = `
/* ── Right Panel ── */
.rp-tabs{display:flex;gap:2px;padding:8px 8px 0;background:var(--surface);border-bottom:1px solid var(--line)}
.rp-tab{flex:1;padding:8px 12px;border:none;background:transparent;color:var(--muted);font-size:12px;font-weight:600;cursor:pointer;border-radius:6px 6px 0 0;transition:all .15s;letter-spacing:.02em;text-transform:uppercase}
.rp-tab:hover{color:var(--ink)}
.rp-tab.is-active{background:var(--bg);color:var(--ink);box-shadow:0 -1px 0 var(--accent)}
.rp-scroll{flex:1;overflow-y:auto;padding:4px 0}

/* Section */
.rp-section{border-bottom:1px solid var(--line)}
.rp-section__head{display:flex;align-items:center;gap:8px;width:100%;padding:10px 14px;border:none;background:transparent;color:var(--ink);font-size:12px;font-weight:600;cursor:pointer;text-align:left;transition:background .12s}
.rp-section__head:hover{background:rgba(255,255,255,.03)}
.rp-section__icon{color:var(--muted);display:flex}
.rp-section__title{flex:1}
.rp-section__chevron{color:var(--muted);transition:transform .2s}
.rp-section.is-open .rp-section__chevron{transform:rotate(180deg)}
.rp-section__body{padding:0 14px 14px}

/* Field */
.rp-field{margin-bottom:12px}
.rp-field__label{display:block;font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px}
.rp-field__control{display:flex;flex-direction:column;gap:6px}

/* Inputs */
.rp-input,.rp-textarea,.rp-select{width:100%;padding:8px 10px;background:var(--surface-2);border:1px solid var(--line);border-radius:8px;color:var(--ink);font-size:13px;outline:none;transition:border-color .15s;font-family:inherit;box-sizing:border-box}
.rp-input:focus,.rp-textarea:focus,.rp-select:focus{border-color:var(--accent)}
.rp-textarea{resize:vertical;min-height:60px;line-height:1.5}
.rp-select{cursor:pointer;appearance:none;background-image:url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236b7280' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 10px center;padding-right:28px}

/* Slider */
.rp-slider{display:flex;align-items:center;gap:8px}
.rp-slider input[type=range]{flex:1;height:4px;appearance:none;background:var(--line);border-radius:2px;outline:none;cursor:pointer}
.rp-slider input[type=range]::-webkit-slider-thumb{appearance:none;width:14px;height:14px;border-radius:50%;background:var(--accent);cursor:grab;border:2px solid var(--bg)}
.rp-slider__val{display:flex;align-items:center;gap:2px;min-width:56px}
.rp-slider__val input{width:40px;padding:4px 6px;background:var(--surface-2);border:1px solid var(--line);border-radius:6px;color:var(--ink);font-size:11px;text-align:center;outline:none;font-family:ui-monospace,monospace}
.rp-slider__val input:focus{border-color:var(--accent)}
.rp-slider__val span{font-size:10px;color:var(--muted)}

/* Color */
.rp-color{display:flex;align-items:center;gap:10px;cursor:pointer;padding:6px 8px;border-radius:8px;transition:background .12s}
.rp-color:hover{background:rgba(255,255,255,.03)}
.rp-color__swatch{width:28px;height:28px;border-radius:8px;border:2px solid var(--line);flex-shrink:0}
.rp-color input[type=color]{position:absolute;opacity:0;width:0;height:0;pointer-events:none}
.rp-color__hex{font-size:12px;color:var(--ink);font-family:ui-monospace,monospace;font-weight:500}
.rp-color__label{font-size:11px;color:var(--muted);margin-left:auto}

/* Toggle group */
.rp-toggle-group{display:flex;gap:2px;background:var(--surface-2);border-radius:8px;padding:2px}
.rp-toggle{flex:1;padding:6px 8px;border:none;background:transparent;color:var(--muted);font-size:12px;font-weight:600;cursor:pointer;border-radius:6px;transition:all .15s;display:flex;align-items:center;justify-content:center}
.rp-toggle:hover{color:var(--ink)}
.rp-toggle.is-active{background:var(--surface);color:var(--ink);box-shadow:0 1px 3px rgba(0,0,0,.2)}

/* Spacing box */
.rp-spacing{display:flex;flex-direction:column;align-items:center;gap:2px}
.rp-spacing__top,.rp-spacing__bottom{display:flex;justify-content:center}
.rp-spacing__mid{display:flex;align-items:center;gap:2px;width:100%}
.rp-spacing__center{width:40px;height:28px;border-radius:6px;background:var(--surface-2);border:1px dashed var(--line);flex-shrink:0}
.rp-spacing input{width:44px;padding:4px;background:var(--surface-2);border:1px solid var(--line);border-radius:6px;color:var(--ink);font-size:11px;text-align:center;outline:none;font-family:ui-monospace,monospace;-moz-appearance:textfield}
.rp-spacing input::-webkit-inner-spin-button{-webkit-appearance:none}
.rp-spacing input:focus{border-color:var(--accent)}
.rp-spacing__mid input{flex:1}

/* Upload */
.rp-upload{display:flex;align-items:center;justify-content:center;gap:6px;padding:8px;border:1px dashed var(--line);border-radius:8px;color:var(--muted);font-size:12px;font-weight:500;cursor:pointer;transition:all .15s}
.rp-upload:hover{border-color:var(--accent);color:var(--accent);background:rgba(99,102,241,.04)}

/* Tokens */
.rp-tokens{display:grid;grid-template-columns:repeat(2,1fr);gap:6px}
.rp-token{display:flex;align-items:center;gap:6px;padding:4px 8px;border-radius:6px;cursor:pointer;transition:background .12s}
.rp-token:hover{background:rgba(255,255,255,.03)}
.rp-token__dot{width:16px;height:16px;border-radius:4px;border:1px solid var(--line);flex-shrink:0}
.rp-token input[type=color]{position:absolute;opacity:0;width:0;height:0}
.rp-token span{font-size:10px;color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}

/* Empty state */
.rp-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 20px;gap:12px;text-align:center}
.rp-empty p{color:var(--muted);font-size:13px;font-weight:500}
.rp-empty span{color:var(--line);font-size:11px}

/* Header */
.rp-header{display:flex;align-items:center;gap:8px;padding:10px 14px;border-bottom:1px solid var(--line)}
.rp-header__tag{font-size:10px;color:var(--accent);font-family:ui-monospace,monospace;background:rgba(99,102,241,.08);padding:2px 6px;border-radius:4px}
.rp-header__name{font-size:13px;font-weight:600;color:var(--ink);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.rp-header__badge{font-size:9px;font-weight:700;color:var(--accent);background:rgba(99,102,241,.1);padding:2px 6px;border-radius:4px;text-transform:uppercase;letter-spacing:.04em}

/* Scope */
.rp-scope{padding:8px 14px;border-bottom:1px solid var(--line)}

/* Footer */
.rp-footer{display:flex;align-items:center;justify-content:space-between;padding:8px 14px;border-top:1px solid var(--line);font-size:11px;color:var(--muted)}
.rp-footer__dot{width:6px;height:6px;border-radius:50%;background:var(--good)}
.rp-footer__dot.is-edited{background:var(--warn)}
`;
