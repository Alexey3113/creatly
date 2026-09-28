"use client";
/* ГЛАВНОЕ МЕНЮ ВИТРИН — вкладки семейств сайтов в шапке.
   Десктоп: вкладка открывает панель со списком сайтов семьи и превью первого экрана (наведение/клик/клавиатура).
   Телефон: бургер → лист с разделами-аккордеонами. Варианты:
   - inline — внутри шапки главной (логотип и CTA — её);
   - bar    — своя липкая полоса на страницах-галереях;
   - fab    — круглая кнопка на страницах самих сайтов (у них своя шапка) → тот же лист.
   Данные — site-directory.ts (scripts/gen-site-directory.ts). */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FontLinks } from "./FontLinks";
import { SITE_FAMILIES, familyCount, type SiteFamily } from "./site-directory";
import "./site-menu.css";

const FONTS = ["https://fonts.googleapis.com/css2?family=Unbounded:wght@500;600&family=Manrope:wght@500;600;700&display=swap"];

/** страницы-галереи: у них полоса меню, кнопка на сайтах там не нужна */
export const GALLERY_PATHS = ["/animated", "/animated/worlds", "/story2", "/story", "/visual-hooks", "/visual-hooks/sites", "/visual-hooks/animated"];

const trim = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);
function activeFamily(pathname: string): string | null {
  const p = trim(pathname);
  for (const f of SITE_FAMILIES) {
    if (trim(f.href) === p) return f.key;
    if (f.groups.some((g) => g.items.some((i) => i.href === p))) return f.key;
  }
  return null;
}

function Panel({ f, id, onPick }: { f: SiteFamily; id: string; onPick: () => void }) {
  const first = f.groups[0]?.items[0];
  const [hot, setHot] = useState(first);
  return (
    <div className="sm-panel" id={id} role="region" aria-label={f.label} data-lenis-prevent>
      <div className="sm-panel-in">
        <aside className="sm-aside">
          <div className="sm-preview">
            {hot && <img src={hot.thumb} alt="" width={360} height={225} decoding="async" />}
            {hot && <span className="sm-preview-cap"><b>{hot.name}</b>{hot.note && <i>{hot.note}</i>}</span>}
          </div>
          <p className="sm-blurb">{f.blurb}</p>
          <Link href={f.href} className="sm-all" onClick={onPick} prefetch={false}>Смотреть все · {familyCount(f)} <span aria-hidden>→</span></Link>
        </aside>
        <div className="sm-lists">
          {f.groups.map((g) => (
            <section key={g.label} className="sm-group">
              {f.groups.length > 1 && <h3 className="sm-group-t">{g.label} <span>{g.items.length}</span></h3>}
              <ul className="sm-grid">
                {g.items.map((i) => (
                  <li key={i.href}>
                    <Link href={i.href} prefetch={false} onClick={onPick} onMouseEnter={() => setHot(i)} onFocus={() => setHot(i)}>
                      <b>{i.name}</b>{i.note && <span>{i.note}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

/** лист (телефон и кнопка на сайтах): разделы-аккордеоны, в каждом — сайты с превью */
function Sheet({ open, onClose, current }: { open: boolean; onClose: () => void; current: string | null }) {
  const [openKey, setOpenKey] = useState<string | null>(current);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (open) { setOpenKey(current); closeRef.current?.focus(); } }, [open, current]);
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    addEventListener("keydown", onKey);
    return () => { html.style.overflow = prev; removeEventListener("keydown", onKey); };
  }, [open, onClose]);
  if (!open) return null;
  return createPortal(
    <div className="sm-root sm-sheet-wrap" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="sm-sheet" role="dialog" aria-modal="true" aria-label="Все сайты" data-lenis-prevent>
        <div className="sm-sheet-head">
          <Link href="/" className="sm-logo" onClick={onClose}>Creatly</Link>
          <button ref={closeRef} type="button" className="sm-x" onClick={onClose} aria-label="Закрыть меню"><span /><span /></button>
        </div>
        <nav className="sm-acc" aria-label="Витрины">
          {SITE_FAMILIES.map((f) => {
            const on = openKey === f.key;
            return (
              <section key={f.key} className={`sm-acc-f${on ? " is-open" : ""}${current === f.key ? " is-current" : ""}`}>
                <button type="button" className="sm-acc-b" aria-expanded={on} onClick={() => setOpenKey(on ? null : f.key)}>
                  <span>{f.label}</span><i>{familyCount(f)}</i>
                </button>
                {on && (
                  <div className="sm-acc-body">
                    <Link href={f.href} className="sm-all" onClick={onClose} prefetch={false}>Смотреть все <span aria-hidden>→</span></Link>
                    {f.groups.map((g) => (
                      <div key={g.label} className="sm-acc-g">
                        {f.groups.length > 1 && <h3 className="sm-group-t">{g.label} <span>{g.items.length}</span></h3>}
                        <ul>
                          {g.items.map((i) => (
                            <li key={i.href}>
                              <Link href={i.href} prefetch={false} onClick={onClose}>
                                <img src={i.thumb} alt="" width={96} height={60} loading="lazy" decoding="async" />
                                <span><b>{i.name}</b>{i.note && <em>{i.note}</em>}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </nav>
        <div className="sm-sheet-foot">
          <Link href="/auth" onClick={onClose}>Войти</Link>
          <Link href="/dashboard" className="sm-cta" onClick={onClose}>Собрать сайт</Link>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function SiteMenu({ variant = "bar", tail }: { variant?: "inline" | "bar"; tail?: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const current = activeFamily(pathname);
  const [open, setOpen] = useState<string | null>(null);
  const [sheet, setSheet] = useState(false);
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const hoverT = useRef<number>(0);

  useEffect(() => setMounted(true), []);
  // смена страницы — всё закрыто
  useEffect(() => { setOpen(null); setSheet(false); }, [pathname]);
  // Escape и клик мимо закрывают панель
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); };
    const onDown = (e: PointerEvent) => { if (!rootRef.current?.contains(e.target as Node)) setOpen(null); };
    addEventListener("keydown", onKey);
    addEventListener("pointerdown", onDown);
    return () => { removeEventListener("keydown", onKey); removeEventListener("pointerdown", onDown); };
  }, [open]);

  const later = (fn: () => void, ms: number) => { clearTimeout(hoverT.current); hoverT.current = window.setTimeout(fn, ms); };
  const fine = () => typeof window !== "undefined" && matchMedia("(hover:hover) and (pointer:fine)").matches;

  const tabs = (
    <nav className="sm-tabs" aria-label="Витрины сайтов" onMouseLeave={() => fine() && later(() => setOpen(null), 220)} onMouseEnter={() => clearTimeout(hoverT.current)}>
      <ul>
        {SITE_FAMILIES.map((f) => {
          const on = open === f.key;
          const pid = `sm-panel-${f.key}`;
          return (
            <li key={f.key} className={`${on ? "is-open" : ""}${current === f.key ? " is-current" : ""}`}
              onMouseEnter={() => fine() && later(() => setOpen(f.key), open ? 40 : 110)}>
              <button type="button" className="sm-tab" aria-expanded={on} aria-controls={pid} onClick={() => setOpen(on ? null : f.key)}>
                {f.label}<i aria-hidden />
              </button>
              {on && <Panel f={f} id={pid} onPick={() => setOpen(null)} />}
            </li>
          );
        })}
      </ul>
      {tail}
    </nav>
  );

  return (
    <div ref={rootRef} className={`sm-root sm-${variant}${open ? " has-open" : ""}`}>
      <FontLinks hrefs={FONTS} />
      {variant === "bar" ? (
        <div className="sm-bar-in">
          <Link href="/" className="sm-logo" prefetch={false}>Creatly</Link>
          {tabs}
          <Link href="/dashboard" className="sm-cta sm-bar-cta" prefetch={false}>Собрать сайт</Link>
          <button type="button" className="sm-burger" aria-label="Открыть меню сайтов" aria-expanded={sheet} onClick={() => setSheet(true)}><span /><span /><span /></button>
        </div>
      ) : (
        <>
          {tabs}
          <button type="button" className="sm-burger" aria-label="Открыть меню сайтов" aria-expanded={sheet} onClick={() => setSheet(true)}><span /><span /><span /></button>
        </>
      )}
      {mounted && <Sheet open={sheet} onClose={() => setSheet(false)} current={current} />}
    </div>
  );
}

/** кнопка меню на страницах сайтов (у них своя шапка): открывает лист со всеми витринами */
export function SiteMenuFab() {
  const pathname = usePathname() || "/";
  const [sheet, setSheet] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => setSheet(false), [pathname]);
  if (GALLERY_PATHS.includes(trim(pathname))) return null;
  return (
    <>
      <FontLinks hrefs={FONTS} />
      <button type="button" className="sm-root sm-fab" aria-label="Все сайты Creatly" onClick={() => setSheet(true)}>
        <span className="sm-fab-ic" aria-hidden><i /><i /><i /><i /></span><span className="sm-fab-t">Все сайты</span>
      </button>
      {mounted && <Sheet open={sheet} onClose={() => setSheet(false)} current={activeFamily(pathname)} />}
    </>
  );
}
