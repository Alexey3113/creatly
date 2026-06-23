"use client";

import { useRef, useState } from "react";
import type { BuilderItem, EditorMode, ViewportOption } from "@/lib/builder/types";
import type { BlockPreset } from "@/lib/builder/block-library";
import { BlockList } from "./BlockList";
import { FieldList } from "./FieldList";
import { BlockLibrary } from "./BlockLibrary";
import { GlobalStyles } from "./GlobalStyles";
import { AICopilot } from "./AICopilot";
import type { ColorPalette, FontPair } from "@/lib/builder/presets";
import { IntegrationsPanel } from "./IntegrationsPanel";

const logoImage = { src: "/landing/logo.webp" };

interface LeftSidebarProps {
  blocks: BuilderItem[];
  fields: BuilderItem[];
  selectedId: string | null;
  activeBlockId: string | null;
  examples: readonly string[];
  forceTab?: Tab;
  onSelect: (id: string) => void;
  onLoadFiles: (html: HTMLInputElement, css: HTMLInputElement, js: HTMLInputElement) => void;
  onLoadDemo: () => void;
  onLoadExample: (id: string) => void;
  onInsertBlock: (preset: BlockPreset) => void;
  onApplyPalette: (palette: ColorPalette) => void;
  onApplyFonts: (fonts: FontPair) => void;
  onCopilotCode: (html: string, css: string) => void;
  mode: EditorMode;
  viewport: ViewportOption;
  onModeChange: (mode: EditorMode) => void;
  onViewportChange: (viewport: ViewportOption) => void;
  onPublish: () => void;
  projectContext: string;
}

type Tab = "blocks" | "library" | "style" | "ai" | "source" | "integrations" | "publish" | "seo";

function RailIcon({ name }: { name: string }) {
  const common = { width: 19, height: 19, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "ai") return <svg {...common}><path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6L12 3z" /><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" /></svg>;
  if (name === "design") return <svg {...common}><path d="M12 3v18" /><path d="M5 8h14" /><path d="M7 8l-2 8a4 4 0 0 0 8 0l-2-8" /><path d="M17 8l-2 8a4 4 0 0 0 8 0l-2-8" /></svg>;
  if (name === "templates") return <svg {...common}><rect x="3" y="4" width="7" height="7" rx="1.5" /><rect x="14" y="4" width="7" height="7" rx="1.5" /><rect x="3" y="15" width="7" height="5" rx="1.5" /><rect x="14" y="15" width="7" height="5" rx="1.5" /></svg>;
  if (name === "publish") return <svg {...common}><path d="M12 16V4" /><path d="M7 9l5-5 5 5" /><path d="M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" /></svg>;
  if (name === "telegram") return <svg {...common}><path d="M21 4L3.8 11.2c-.8.3-.7 1.4.1 1.6l4.4 1.3 1.7 5.2c.2.7 1.1.8 1.5.2l2.5-3.5 4.7 3.4c.6.4 1.5.1 1.6-.7L21 4z" /><path d="M8.4 14.1L21 4" /></svg>;
  if (name === "seo") return <svg {...common}><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4 4" /><path d="M8.5 11h5" /><path d="M11 8.5v5" /></svg>;
  if (name === "files") return <svg {...common}><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v5h5" /><path d="M9 13h6" /><path d="M9 17h4" /></svg>;
  return <svg {...common}><path d="M4 5h16" /><path d="M4 12h16" /><path d="M4 19h16" /></svg>;
}

function DeviceIcon({ device }: { device: "desktop" | "tablet" | "mobile" }) {
  const common = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (device === "desktop") return <svg {...common}><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" /></svg>;
  if (device === "tablet") return <svg {...common}><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M10 18h4" /></svg>;
  return <svg {...common}><rect x="7" y="2" width="10" height="20" rx="2.5" /><path d="M11 18h2" /></svg>;
}

const devices: { id: "desktop" | "tablet" | "mobile"; label: string }[] = [
  { id: "desktop", label: "Компьютер" },
  { id: "tablet", label: "Планшет" },
  { id: "mobile", label: "Телефон" },
];

export function LeftSidebar({
  blocks, fields, selectedId, activeBlockId, examples, forceTab,
  onSelect, onLoadFiles, onLoadDemo, onLoadExample, onInsertBlock,
  onApplyPalette, onApplyFonts, onCopilotCode, mode, viewport, onModeChange, onViewportChange, onPublish, projectContext,
}: LeftSidebarProps) {
  const htmlRef = useRef<HTMLInputElement>(null);
  const cssRef = useRef<HTMLInputElement>(null);
  const jsRef = useRef<HTMLInputElement>(null);
  const [tab, setTab] = useState<Tab>("blocks");
  const [panelOpen, setPanelOpen] = useState(false);
  const appliedForceTab = useRef<string | undefined>(undefined);
  if (forceTab && forceTab !== appliedForceTab.current) {
    appliedForceTab.current = forceTab;
    if (tab !== forceTab) setTab(forceTab);
    if (!panelOpen) setPanelOpen(true);
  } else if (!forceTab) {
    appliedForceTab.current = undefined;
  }

  function activate(nextTab: Tab) {
    if (nextTab === "publish") {
      onPublish();
      return;
    }
    setPanelOpen((open) => nextTab !== tab || !open);
    setTab(nextTab);
    if (nextTab === "ai") onModeChange("ai");
    if (nextTab === "style") onModeChange("design");
    if (nextTab === "blocks" || nextTab === "library" || nextTab === "source") onModeChange("content");
    if (nextTab === "seo") onModeChange("structure");
  }

  const railItems: { tab: Tab; icon: string; label: string; hint: string; active?: boolean }[] = [
    { tab: "ai", icon: "ai", label: "AI", hint: "Генерация и правки", active: mode === "ai" },
    { tab: "style", icon: "design", label: "Дизайн", hint: "Глобальная визуальная система", active: mode === "design" },
    { tab: "library", icon: "templates", label: "Шаблоны", hint: "Блоки и секции" },
    { tab: "blocks", icon: "blocks", label: "Структура", hint: "Блоки текущей страницы" },
    { tab: "integrations", icon: "telegram", label: "Telegram", hint: "Интеграции и заявки" },
    { tab: "seo", icon: "seo", label: "SEO", hint: "Meta, Open Graph, структура", active: mode === "structure" },
    { tab: "source", icon: "files", label: "Файлы", hint: "HTML, CSS, JS" },
    { tab: "publish", icon: "publish", label: "Публикация", hint: "Опубликовать сайт" },
  ];

  return (
    <aside className={`sidebar sidebar--left${panelOpen ? " is-expanded" : ""}`}>
      <div className="editor-rail">
        <div className="brand brand--rail">
            <img className="L-nav__logo" src={logoImage.src} alt="" />
        </div>

        <div className="editor-rail__items">
          {railItems.map((item) => (
            <button
              key={item.tab}
              className={(tab === item.tab || item.active) ? "is-active" : ""}
              type="button"
              onClick={() => activate(item.tab)}
              title={item.hint}
              aria-label={item.label}
            >
              <RailIcon name={item.icon} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-panel">
        <button className="sidebar-panel__close" type="button" onClick={() => setPanelOpen(false)} aria-label="Закрыть панель">×</button>
        <div className="brand brand--panel">
          <div>
            <strong>{tab === "ai" ? "AI Co-pilot" : tab === "style" ? "Дизайн" : tab === "library" ? "Шаблоны" : tab === "integrations" ? "Telegram" : tab === "seo" ? "SEO" : tab === "source" ? "Файлы проекта" : "Структура"}</strong>
            <small>{tab === "ai" ? "Промпты, код и новые блоки" : tab === "style" ? "Палитры, шрифты и токены" : tab === "library" ? "Готовые секции сайта" : tab === "integrations" ? "Заявки и внешние сервисы" : tab === "seo" ? "Поисковый контур сайта" : tab === "source" ? "Импорт HTML, CSS, JS" : "Блоки и элементы страницы"}</small>
          </div>
        </div>

      {tab === "source" && (
        <section className="panel">
          <label className="file-picker">
            <span>HTML файл</span>
            <input ref={htmlRef} type="file" accept=".html,text/html" />
          </label>
          <label className="file-picker">
            <span>CSS файл</span>
            <input ref={cssRef} type="file" accept=".css,text/css" />
          </label>
          <label className="file-picker">
            <span>JavaScript файл</span>
            <input ref={jsRef} type="file" accept=".js,text/javascript" />
          </label>
          <div className="button-row">
            <button className="button button--primary" type="button" onClick={() => {
              if (htmlRef.current && cssRef.current && jsRef.current) onLoadFiles(htmlRef.current, cssRef.current, jsRef.current);
            }}>Загрузить</button>
            <button className="button" type="button" onClick={onLoadDemo}>Демо</button>
          </div>
          <div className="example-grid">
            {examples.map((id) => (
              <button key={id} type="button" onClick={() => onLoadExample(id)}>Ex {id}</button>
            ))}
          </div>
        </section>
      )}

      {tab === "blocks" && (
        <>
          <section className="panel">
            <div className="panel__head">
              <h2>Блоки</h2>
              <span>{blocks.length}</span>
            </div>
            <BlockList blocks={blocks} selectedId={selectedId} onSelect={onSelect} />
          </section>
          <section className="panel">
            <div className="panel__head">
              <h2>Поля блока</h2>
              <span>{activeBlockId ? fields.filter((f) => f.blockId === activeBlockId).length : 0}</span>
            </div>
            <FieldList fields={fields} selectedId={selectedId} activeBlockId={activeBlockId} onSelect={onSelect} />
          </section>
        </>
      )}

      {tab === "library" && (
        <section className="panel" style={{ flex: 1 }}>
          <BlockLibrary onInsert={onInsertBlock} />
        </section>
      )}

      {tab === "style" && (
        <section className="panel" style={{ flex: 1 }}>
          <div className="panel__head"><h2>Глобальные стили</h2></div>
          <p style={{ fontSize: 11, color: "var(--muted)", margin: "0 0 8px", lineHeight: 1.4 }}>
            Смените палитру или шрифт всего сайта в один клик
          </p>
          <GlobalStyles onApplyPalette={onApplyPalette} onApplyFonts={onApplyFonts} />
        </section>
      )}

      {tab === "ai" && (
        <section className="panel" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div className="panel__head"><h2>AI Co-pilot</h2></div>
          <AICopilot onApplyCode={onCopilotCode} projectContext={projectContext} />
        </section>
      )}

      {tab === "integrations" && (
        <section className="panel" style={{ flex: 1 }}>
          <div className="panel__head"><h2>Telegram-интеграция</h2></div>
          <p style={{ fontSize: 12, color: "var(--muted)", margin: "0 0 12px", lineHeight: 1.5 }}>
            Подключите Telegram-бота, чтобы получать заявки с сайта прямо в чат. Все формы на опубликованном сайте будут отправлять данные вам в Telegram.
          </p>
          <IntegrationsPanel />
        </section>
      )}
      {tab === "seo" && (
        <section className="panel" style={{ flex: 1 }}>
          <div className="panel__head"><h2>SEO</h2></div>
          <p style={{ fontSize: 12, color: "var(--muted)", margin: "0", lineHeight: 1.5 }}>
            Панель SEO открыта справа. Здесь позже появится общий аудит страниц, sitemap и robots.txt.
          </p>
        </section>
      )}
      </div>
    </aside>
  );
}
