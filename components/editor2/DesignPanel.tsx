"use client";

import { useRef } from "react";
import type { SiteOp } from "@/lib/site/ops";
import type { SiteDocument } from "@/lib/site/types";
import type { DispatchOptions } from "./useSiteEditor";

interface DesignPanelProps {
  doc: SiteDocument;
  dispatch: (ops: SiteOp[], options?: DispatchOptions) => unknown;
}

const COLOR_TOKENS: { token: string; label: string }[] = [
  { token: "--color-bg", label: "Фон" },
  { token: "--color-bg-alt", label: "Фон (альтернативный)" },
  { token: "--color-surface", label: "Поверхности / карточки" },
  { token: "--color-text", label: "Текст" },
  { token: "--color-text-muted", label: "Приглушённый текст" },
  { token: "--color-primary", label: "Основной цвет" },
  { token: "--color-accent", label: "Акцент" },
  { token: "--color-border", label: "Границы" },
];

// Только шрифты с полной кириллицей — иначе русский текст падает в системный фолбэк
const HEADING_FONTS = ["Manrope", "Unbounded", "Playfair Display", "Cormorant Garamond", "Prata", "Vollkorn", "Bitter", "Bebas Neue", "Oswald", "Russo One", "Literata", "Inter Tight"];
const BODY_FONTS = ["Onest", "Golos Text", "Source Sans 3", "IBM Plex Sans", "Commissioner", "Manrope", "Rubik", "Jost", "Inter", "PT Serif", "Spectral"];

export function DesignPanel({ doc, dispatch }: DesignPanelProps) {
  // Дебаунсим color input — он стреляет на каждый пиксель движения
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  function setToken(token: string, value: string) {
    if (timers.current[token]) clearTimeout(timers.current[token]);
    timers.current[token] = setTimeout(() => {
      dispatch([{ op: "set-tokens", tokens: { [token]: value } }]);
    }, 250);
  }

  return (
    <div>
      <div className="ed2-section-title">Цвета</div>
      {COLOR_TOKENS.map(({ token, label }) => {
        const value = doc.tokens[token] || "#ffffff";
        const isHex = /^#[0-9a-fA-F]{3,8}$/.test(value.trim());
        return (
          <div className="ed2-color-row" key={token}>
            <input
              type="color"
              defaultValue={isHex ? value.trim() : "#ffffff"}
              onChange={(e) => setToken(token, e.target.value)}
            />
            <span>{label}</span>
            <code>{value}</code>
          </div>
        );
      })}

      <div className="ed2-section-title">Сцена — живой фон сайта</div>
      <div className="ed2-field">
        <label>Тип сцены</label>
        <select
          value={doc.scene?.type || "none"}
          onChange={(e) => {
            const type = e.target.value as NonNullable<typeof doc.scene>["type"];
            dispatch([{ op: "set-scene", scene: type === "none" ? undefined : { type, intensity: doc.scene?.intensity ?? 0.5, grain: doc.scene?.grain, video: doc.scene?.video, poster: doc.scene?.poster, scrub: doc.scene?.scrub } }]);
          }}
        >
          <option value="none">Выключена</option>
          <option value="aurora">Аврора — дышащие пятна света</option>
          <option value="mesh">Mesh — переливающийся градиент</option>
          <option value="field">Поле — точки со связями</option>
          <option value="liquid">Liquid — плывущие пятна</option>
          <option value="video">Видео — весь сайт сквозь один кадр</option>
        </select>
      </div>
      {doc.scene?.type === "video" && (
        <>
          <div className="ed2-field">
            <label>URL видео (5-8 сек, без склеек, частые keyframe)</label>
            <input
              value={doc.scene.video || ""}
              placeholder="/assets/… или /uploads/…"
              onChange={(e) => dispatch([{ op: "set-scene", scene: { ...doc.scene!, video: e.target.value } }], { refresh: false })}
              onBlur={(e) => dispatch([{ op: "set-scene", scene: { ...doc.scene!, video: e.target.value } }])}
            />
          </div>
          <div className="ed2-field">
            <label>Постер-кадр (мобильные / без JS)</label>
            <input
              value={doc.scene.poster || ""}
              placeholder="/assets/… .webp"
              onChange={(e) => dispatch([{ op: "set-scene", scene: { ...doc.scene!, poster: e.target.value } }], { refresh: false })}
              onBlur={(e) => dispatch([{ op: "set-scene", scene: { ...doc.scene!, poster: e.target.value } }])}
            />
          </div>
          <div className="ed2-field">
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={doc.scene.scrub !== false}
                onChange={(e) => dispatch([{ op: "set-scene", scene: { ...doc.scene!, scrub: e.target.checked } }])}
                style={{ width: "auto" }}
              />
              Скраб скроллом (иначе — луп)
            </label>
            <p style={{ fontSize: 11, color: "#64748b", margin: "6px 0 0", lineHeight: 1.5 }}>
              Весь сайт «проезжает» сквозь видео по мере скролла. На мобильных — статичный
              постер с лёгким движением (без джанка). Секциям поверх ставьте поверхность «Стекло».
            </p>
          </div>
        </>
      )}
      {doc.scene && doc.scene.type !== "none" && (
        <>
          <div className="ed2-field">
            <label>Интенсивность — {Math.round((doc.scene.intensity ?? 0.5) * 100)}%</label>
            <input
              type="range"
              min={10}
              max={100}
              defaultValue={Math.round((doc.scene.intensity ?? 0.5) * 100)}
              onMouseUp={(e) => dispatch([{ op: "set-scene", scene: { ...doc.scene!, intensity: Number((e.target as HTMLInputElement).value) / 100 } }])}
              onTouchEnd={(e) => dispatch([{ op: "set-scene", scene: { ...doc.scene!, intensity: Number((e.target as HTMLInputElement).value) / 100 } }])}
            />
          </div>
          <div className="ed2-field">
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={!!doc.scene.grain}
                onChange={(e) => dispatch([{ op: "set-scene", scene: { ...doc.scene!, grain: e.target.checked } }])}
                style={{ width: "auto" }}
              />
              Плёночное зерно
            </label>
          </div>
        </>
      )}

      <div className="ed2-section-title">Режим-фильм</div>
      <div className="ed2-field">
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={doc.cinema === true}
            onChange={(e) => dispatch([{ op: "set-cinema", enabled: e.target.checked }])}
            style={{ width: "auto" }}
          />
          Секции как слайды с переходами
        </label>
        <p style={{ fontSize: 11, color: "#64748b", margin: "6px 0 0", lineHeight: 1.5 }}>
          Скролл перелистывает полноэкранные секции с их анимацией входа. Десктоп;
          на мобильных и рядом с длинными story-блоками — обычный скролл. Задайте
          каждой секции «Появление» в её настройках.
        </p>
      </div>

      <div className="ed2-section-title">Шрифты</div>
      <div className="ed2-field">
        <label>Заголовки</label>
        <select
          value={doc.fonts.heading}
          onChange={(e) => dispatch([{ op: "set-fonts", heading: e.target.value }])}
        >
          {[...new Set([doc.fonts.heading, ...HEADING_FONTS])].map((f) => <option key={f}>{f}</option>)}
        </select>
      </div>
      <div className="ed2-field">
        <label>Основной текст</label>
        <select
          value={doc.fonts.body}
          onChange={(e) => dispatch([{ op: "set-fonts", body: e.target.value }])}
        >
          {[...new Set([doc.fonts.body, ...BODY_FONTS])].map((f) => <option key={f}>{f}</option>)}
        </select>
      </div>

      <div className="ed2-section-title">SEO страницы</div>
      <SeoFields doc={doc} dispatch={dispatch} />
    </div>
  );
}

function SeoFields({ doc, dispatch }: DesignPanelProps) {
  const page = doc.pages.find((p) => p.id === doc.activePageId) || doc.pages[0];
  return (
    <>
      <div className="ed2-field">
        <label>Title</label>
        <input
          value={page.seo.title}
          onChange={(e) => dispatch([{ op: "set-seo", seo: { title: e.target.value } }], { refresh: false })}
        />
      </div>
      <div className="ed2-field">
        <label>Description</label>
        <textarea
          value={page.seo.description}
          onChange={(e) => dispatch([{ op: "set-seo", seo: { description: e.target.value } }], { refresh: false })}
        />
      </div>
    </>
  );
}
