"use client";
/* StageDeck — кино-движок нового поколения (STORY v2). Эволюция StoryDeck:
   - двойной канал: входящей сцене RAF пишет --sp 0→1, УХОДЯЩЕЙ --ep 0→1 (раньше уход был зашит в CSS);
   - per-scene переход через data-transition (zoom|wipe-x|wipe-y|iris|smash|cut) на сцене → дек ставит
     data-trans/data-dir, CSS красит и вход, и уход одним переходом;
   - 3D-перспектива на деке (Layer может rotateX/Y/translateZ);
   - лок на время анимации, reduced-motion → мгновенный финальный кадр, wheel/свайп/клавиши, inert/aria.
   Слои внутри сцен — те же <Layer> из parallax-scene (читают --sp сцены). */
import { Children, cloneElement, useEffect, useRef, useState, isValidElement, type ReactNode, type ReactElement } from "react";
import "@/components/parallax-scene/parallax-scene.css";
import "./stagedeck.css";

type SceneProps = { transition?: string; className?: string };

export function StageDeck({ children, duration = 1000, cooldown = 300 }: { children: ReactNode; duration?: number; cooldown?: number }) {
  const scenes = Children.toArray(children);
  const n = scenes.length;
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const goRef = useRef<(dir: number) => void>(() => {});
  void duration; void cooldown; // v1-API: длительность/кулдаун больше не нужны — переход ведёт зритель

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const list = Array.from(root.querySelectorAll<HTMLElement>(":scope > .stage-scene"));
    const setVar = (el: HTMLElement | undefined, name: string, v: number) => el && el.style.setProperty(name, v.toFixed(4));
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clampPos = (v: number) => Math.max(0, Math.min(n - 1, v));

    /* ── SCRUB + SNAP ─────────────────────────────────────────────────────────────
       pos — куда ведёт зритель (float, индекс сцены), vis — сглаженная видимая позиция.
       Между i и i+1: входящей --sp = f, уходящей --ep = f (те же CSS-переходы, но их ведёт скролл/палец,
       можно остановиться и вернуться). Пауза ввода → доводка к ближайшей сцене по направлению (удержание). */
    let pos = 0, vis = 0, raf = 0, lastInput = 0, lastDir = 1, dragging = false, activeIdx = 0, pair = -1;
    let ghosts: Array<{ at: (e: number) => void; destroy: () => void }> = [];
    const unit = () => Math.max(380, innerHeight * 0.55);

    const markActive = (k: number) => {
      list.forEach((el, j) => {
        const on = j === k;
        el.classList.toggle("is-active", on);
        el.toggleAttribute("inert", !on);
        el.setAttribute("aria-hidden", on ? "false" : "true");
        if (!introRunning || j !== 0) { setVar(el, "--sp", on ? 1 : 0); setVar(el, "--ep", 0); }
      });
      if (activeIdx !== k) {
        activeIdx = k;
        setActive(k);
        const live = root.querySelector<HTMLElement>(".stage-live");
        if (live) live.textContent = `Сцена ${k + 1} из ${n}`;
        if (viaKey) { list[k].focus?.({ preventScroll: true }); viaKey = false; }
      }
    };

    /* SHARED ELEMENTS: [data-share="key"] в соседних сценах — призрак перелетает из A в B по прогрессу */
    const copyProps = ["font-family", "font-size", "font-weight", "font-style", "letter-spacing", "line-height", "color", "text-transform",
      "-webkit-text-stroke", "text-shadow", "white-space", "text-align", "object-fit", "object-position", "border-radius", "filter", "opacity",
      "background-color", "background-image", "background-size", "background-position", "box-shadow", "border", "outline", "padding", "box-sizing"];
    const makeGhost = (a: HTMLElement, r: DOMRect) => {
      const g = a.cloneNode(true) as HTMLElement;
      const cs = getComputedStyle(a);
      copyProps.forEach((p) => g.style.setProperty(p, cs.getPropertyValue(p)));
      g.removeAttribute("data-share");
      Object.assign(g.style, { position: "fixed", left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px`,
        margin: "0", transform: "none", zIndex: "60", pointerEvents: "none", visibility: "visible", maxWidth: "none", maxHeight: "none" });
      g.setAttribute("aria-hidden", "true");
      return g;
    };
    // геометрия элемента: центр по bounding box, собственный размер (без поворота), угол и скругление
    const geom = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      let ang = 0;
      const m = cs.transform && cs.transform !== "none" ? cs.transform.match(/matrix\(([^)]+)\)/) : null;
      if (m) { const [a, b] = m[1].split(",").map(parseFloat); ang = (Math.atan2(b, a) * 180) / Math.PI; }
      const w0 = el.offsetWidth || r.width, h0 = el.offsetHeight || r.height;
      // масштаб предков (слои дека масштабируются): bounding box = w·|cos|+h·|sin| при повороте ang
      const c = Math.abs(Math.cos((ang * Math.PI) / 180)), s = Math.abs(Math.sin((ang * Math.PI) / 180));
      const k = r.width / Math.max(1, w0 * c + h0 * s);
      return { cx: r.left + r.width / 2, cy: r.top + r.height / 2, w: w0 * k, h: h0 * k, ang, rad: (parseFloat(cs.borderTopLeftRadius) || 0) * k };
    };
    const setupShared = (cur: HTMLElement, nxt: HTMLElement) => {
      const out: typeof ghosts = [];
      cur.querySelectorAll<HTMLElement>("[data-share]").forEach((a) => {
        const k = a.getAttribute("data-share");
        const b = k ? nxt.querySelector<HTMLElement>(`[data-share="${CSS.escape(k)}"]`) : null;
        if (!b) return;
        const prev = nxt.style.getPropertyValue("--sp");
        nxt.style.setProperty("--sp", "1");
        const B = geom(b);
        nxt.style.setProperty("--sp", prev || "0");
        const A = geom(a);
        if (!A.w || !B.w) return;
        const ra = a.getBoundingClientRect();
        const g = makeGhost(a, ra);
        g.style.transformOrigin = "50% 50%";
        root.appendChild(g);
        a.style.visibility = "hidden";
        b.style.visibility = "hidden";
        const L = (x: number, y: number, e: number) => x + (y - x) * e;
        const place = (e: number) => {
          const k2 = e * e * (3 - 2 * e);
          const w = L(A.w, B.w, k2), h = L(A.h, B.h, k2);
          g.style.width = `${w}px`; g.style.height = `${h}px`;
          g.style.left = `${L(A.cx, B.cx, k2) - w / 2}px`; g.style.top = `${L(A.cy, B.cy, k2) - h / 2}px`;
          g.style.transform = `rotate(${L(A.ang, B.ang, k2).toFixed(2)}deg)`;
          g.style.borderRadius = `${L(A.rad, B.rad, k2).toFixed(1)}px`;
        };
        place(0);
        out.push({ at: place, destroy: () => { g.remove(); a.style.visibility = ""; b.style.visibility = ""; } });
      });
      return out;
    };
    const teardownPair = () => {
      if (pair < 0) return;
      ghosts.forEach((g) => g.destroy()); ghosts = [];
      list[pair]?.classList.remove("is-leaving");
      list[pair + 1]?.classList.remove("is-entering");
      pair = -1;
    };
    const setPair = (i: number) => {
      if (pair === i) return;
      teardownPair();
      pair = i;
      const cur = list[i], nxt = list[i + 1];
      root.dataset.trans = nxt.dataset.transition || "zoom";
      root.dataset.dir = "fwd";
      stopIntro();
      [cur, nxt].forEach((el) => { el.classList.remove("is-active"); el.toggleAttribute("inert", true); });
      cur.classList.add("is-leaving"); nxt.classList.add("is-entering");
      setVar(cur, "--sp", 1);
      ghosts = setupShared(cur, nxt);
    };
    const render = () => {
      const i = Math.floor(vis + 1e-6), f = vis - i;
      if (f < 0.0015 || i >= n - 1) { teardownPair(); delete root.dataset.trans; markActive(Math.round(clampPos(vis))); return; }
      setPair(i);
      setVar(list[i + 1], "--sp", f);
      setVar(list[i], "--ep", f);
      ghosts.forEach((g) => g.at(f));
    };
    const snapTarget = () => {
      const base = Math.floor(pos), frac = pos - base;
      if (frac < 1e-4) return base;
      return clampPos(lastDir > 0 ? (frac > 0.12 ? base + 1 : base) : (frac < 0.88 ? base : base + 1));
    };
    const loop = () => {
      raf = 0;
      const now = performance.now();
      const idle = !dragging && now - lastInput > 170;
      if (idle) pos = snapTarget();
      vis += (pos - vis) * (reduce ? 1 : 0.13);
      if (Math.abs(pos - vis) < 0.0006) vis = pos;
      render();
      if (vis !== pos || !idle) raf = requestAnimationFrame(loop);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
    const go = (dir: number) => { pos = clampPos(Math.round(vis) + dir); lastDir = dir; lastInput = 0; kick(); };
    goRef.current = go;
    let viaKey = false;

    /* ОБЛОЖКА СОБИРАЕТСЯ ПРИ ЗАГРУЗКЕ (раньше стояла сразу в финальном кадре) */
    let introRunning = !reduce;
    let introRaf = 0;
    const stopIntro = () => { if (introRunning) { introRunning = false; cancelAnimationFrame(introRaf); setVar(list[0], "--sp", 1); } };
    list.forEach((el, i) => { setVar(el, "--sp", i === 0 ? (reduce ? 1 : 0) : 0); setVar(el, "--ep", 0); el.classList.toggle("is-active", i === 0); el.toggleAttribute("inert", i !== 0); el.setAttribute("aria-hidden", i !== 0 ? "true" : "false"); });
    if (introRunning) {
      const t0 = performance.now();
      const tick = (now: number) => {
        const k = Math.min(1, (now - t0) / 1500);
        setVar(list[0], "--sp", 1 - Math.pow(1 - k, 3));
        if (k < 1 && introRunning) introRaf = requestAnimationFrame(tick); else introRunning = false;
      };
      introRaf = requestAnimationFrame(tick);
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const d = e.deltaMode === 1 ? e.deltaY * 32 : e.deltaY;
      pos = clampPos(pos + d / unit());
      lastDir = Math.sign(d) || lastDir;
      lastInput = performance.now();
      kick();
    };
    const interactive = (el: EventTarget | null) =>
      el instanceof Element && !!el.closest("a,button,input,textarea,select,[contenteditable],[data-scroll]");
    const onKey = (e: KeyboardEvent) => {
      if (interactive(e.target)) return;
      viaKey = true;
      if (["ArrowDown", "PageDown", " ", "Spacebar"].includes(e.key)) { e.preventDefault(); go(1); }
      else if (["ArrowUp", "PageUp"].includes(e.key)) { e.preventDefault(); go(-1); }
      else if (e.key === "Home") { e.preventDefault(); pos = 0; lastInput = 0; kick(); }
      else if (e.key === "End") { e.preventDefault(); pos = n - 1; lastInput = 0; kick(); }
      else viaKey = false;
    };
    // тач/перо: палец ведёт переход напрямую
    let y0 = 0, p0 = 0, pid = -1;
    const onDown = (e: PointerEvent) => { if (e.pointerType === "mouse" || interactive(e.target)) return; pid = e.pointerId; y0 = e.clientY; p0 = pos; dragging = true; };
    const onMoveTouch = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pid) return;
      const d = (y0 - e.clientY) / unit();
      pos = clampPos(p0 + d * 1.25);
      lastDir = Math.sign(d) || lastDir;
      lastInput = performance.now();
      kick();
    };
    const onUp = (e: PointerEvent) => { if (e.pointerId !== pid) return; dragging = false; pid = -1; lastInput = performance.now(); kick(); };

    // сглаженный pointer-канал: --px/--py [-1..1] в корень .stage (дрейф слоёв за мышью, per-site CSS)
    const fine = matchMedia("(pointer:fine)").matches;
    let praf = 0, ptx = 0, pty = 0, pcx = 0, pcy = 0;
    const ptick = () => {
      praf = 0;
      pcx += (ptx - pcx) * 0.08; pcy += (pty - pcy) * 0.08;
      root.style.setProperty("--px", pcx.toFixed(3));
      root.style.setProperty("--py", pcy.toFixed(3));
      if (Math.abs(ptx - pcx) > 0.001 || Math.abs(pty - pcy) > 0.001) praf = requestAnimationFrame(ptick);
    };
    const onPMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      ptx = ((e.clientX - r.left) / r.width) * 2 - 1;
      pty = ((e.clientY - r.top) / r.height) * 2 - 1;
      if (!praf) praf = requestAnimationFrame(ptick);
    };
    const onPLeave = () => { ptx = 0; pty = 0; if (!praf) praf = requestAnimationFrame(ptick); };

    root.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMoveTouch);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    window.addEventListener("keydown", onKey);
    if (fine && !reduce) { root.addEventListener("pointermove", onPMove); root.addEventListener("pointerleave", onPLeave); }
    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(praf);
      cancelAnimationFrame(introRaf);
      teardownPair();
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMoveTouch);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("keydown", onKey);
      root.removeEventListener("pointermove", onPMove);
      root.removeEventListener("pointerleave", onPLeave);
    };
  }, [n]);

  const jump = (dir: number) => { goRef.current(dir); };

  return (
    <div className="stage" ref={rootRef} role="group" aria-roledescription="кино-история" tabIndex={0} aria-label={`Кино-история, сцена ${active + 1} из ${n}`}>
      {scenes.map((s, i) => {
        const el = isValidElement(s) ? (s as ReactElement<SceneProps>) : null;
        const trans = el?.props?.transition || "zoom";
        const child = el ? cloneElement(el, { transition: undefined }) : s;
        return (
          <section key={i} tabIndex={-1} data-transition={trans} className={`stage-scene${i === 0 ? " is-active" : ""}`} data-i={i} aria-label={`Сцена ${i + 1} из ${n}`}>
            <div className="stage-inner">{child}</div>
          </section>
        );
      })}
      <p className="stage-live" aria-live="polite" role="status">Сцена {active + 1} из {n}</p>
      <div className="stage-ctrl">
        <button type="button" onClick={() => jump(-1)} disabled={active === 0} aria-label="Предыдущая сцена">↑</button>
        <button type="button" onClick={() => jump(1)} disabled={active === n - 1} aria-label="Следующая сцена">↓</button>
      </div>
      <nav className="stage-dots" aria-hidden>{scenes.map((_, i) => <span key={i} className={i === active ? "on" : ""} />)}</nav>
    </div>
  );
}

/** Обёртка-сцена: несёт тип перехода. Дети — обычные <Layer> из parallax-scene + foreground-слои. */
export function Scene({ children, transition = "zoom", className = "" }: { children: ReactNode; transition?: string; className?: string }) {
  return <div className={`scene-body ${className}`} data-transition={transition}>{children}</div>;
}
