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

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

type SceneProps = { transition?: string; className?: string };

export function StageDeck({ children, duration = 1000, cooldown = 300 }: { children: ReactNode; duration?: number; cooldown?: number }) {
  const scenes = Children.toArray(children);
  const n = scenes.length;
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const st = useRef({ active: 0, animating: false, raf: 0, accum: 0, downY: 0, downX: 0, lockUntil: 0, viaKey: false });
  const goRef = useRef<(dir: number) => void>(() => {});

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = () => Array.from(root.querySelectorAll<HTMLElement>(":scope > .stage-scene"));
    const setVar = (el: HTMLElement | undefined, name: string, v: number) => el && el.style.setProperty(name, v.toFixed(4));
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const list = els();
    list.forEach((el, i) => {
      setVar(el, "--sp", i === 0 ? 1 : 0);
      setVar(el, "--ep", 0);
      el.classList.toggle("is-active", i === 0);
      el.toggleAttribute("inert", i !== 0);
      el.setAttribute("aria-hidden", i !== 0 ? "true" : "false");
    });

    const finish = (cur: HTMLElement, nxt: HTMLElement, next: number) => {
      cur.classList.remove("is-active", "is-leaving");
      cur.toggleAttribute("inert", true);
      cur.setAttribute("aria-hidden", "true");
      setVar(cur, "--sp", 0); setVar(cur, "--ep", 0);
      nxt.classList.remove("is-entering");
      nxt.classList.add("is-active");
      nxt.toggleAttribute("inert", false);
      nxt.setAttribute("aria-hidden", "false");
      setVar(nxt, "--sp", 1); setVar(nxt, "--ep", 0);
      st.current.active = next;
      st.current.animating = false;
      st.current.lockUntil = performance.now() + cooldown;
      st.current.accum = 0;
      const live = root.querySelector<HTMLElement>(".stage-live");
      if (live) live.textContent = `Сцена ${next + 1} из ${n}`;
      if (st.current.viaKey) { nxt.focus?.(); st.current.viaKey = false; }
    };

    const goTo = (next: number, instant = false) => {
      const s = st.current;
      if (s.animating || performance.now() < s.lockUntil) return;
      if (next < 0 || next >= n || next === s.active) return;
      const l = els();
      const cur = l[s.active];
      const nxt = l[next];
      if (!cur || !nxt) return;
      s.animating = true;
      root.dataset.dir = next > s.active ? "fwd" : "back";
      // переход диктует ВХОДЯЩАЯ сцена (при back — уходящая, чтобы обратка зеркалила)
      const drive = (next > s.active ? nxt : cur).dataset.transition || "zoom";
      root.dataset.trans = drive;
      nxt.classList.add("is-entering");
      cur.classList.add("is-leaving");
      setVar(nxt, "--sp", 0); setVar(cur, "--ep", 0);
      setActive(next);
      if (reduce || instant) { finish(cur, nxt, next); return; }
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / duration);
        const e = easeInOutCubic(p);
        setVar(nxt, "--sp", e);
        setVar(cur, "--ep", e);
        if (p < 1) s.raf = requestAnimationFrame(tick);
        else finish(cur, nxt, next);
      };
      s.raf = requestAnimationFrame(tick);
    };
    const go = (dir: number) => goTo(st.current.active + dir);
    goRef.current = go;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const s = st.current;
      if (s.animating || performance.now() < s.lockUntil) { s.accum = 0; return; }
      s.accum += e.deltaY;
      if (Math.abs(s.accum) > 30) { const d = Math.sign(s.accum); s.accum = 0; go(d); }
    };
    const interactive = (el: EventTarget | null) =>
      el instanceof Element && !!el.closest("a,button,input,textarea,select,[contenteditable],[data-scroll]");
    const onKey = (e: KeyboardEvent) => {
      if (interactive(e.target)) return;
      st.current.viaKey = true;
      if (["ArrowDown", "PageDown", " ", "Spacebar"].includes(e.key)) { e.preventDefault(); go(1); }
      else if (["ArrowUp", "PageUp"].includes(e.key)) { e.preventDefault(); go(-1); }
      else if (e.key === "Home") { e.preventDefault(); goTo(0, true); }
      else if (e.key === "End") { e.preventDefault(); goTo(n - 1, true); }
      else st.current.viaKey = false;
    };
    const onDown = (e: PointerEvent) => { st.current.downY = e.clientY; st.current.downX = e.clientX; };
    const onUp = (e: PointerEvent) => {
      if (interactive(e.target)) return;
      const dy = e.clientY - st.current.downY;
      const dx = e.clientX - st.current.downX;
      if (Math.abs(dy) > 48 && Math.abs(dy) > Math.abs(dx)) go(dy < 0 ? 1 : -1);
    };

    // сглаженный pointer-канал: пишет --px/--py [-1..1] в корень .stage; слои активной сцены
    // читают их через inherit (visual drift задаётся per-site в CSS). Не влияет на переходы.
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
    root.addEventListener("pointerup", onUp);
    window.addEventListener("keydown", onKey);
    if (fine && !reduce) { root.addEventListener("pointermove", onPMove); root.addEventListener("pointerleave", onPLeave); }
    return () => {
      cancelAnimationFrame(st.current.raf);
      cancelAnimationFrame(praf);
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointerup", onUp);
      window.removeEventListener("keydown", onKey);
      root.removeEventListener("pointermove", onPMove);
      root.removeEventListener("pointerleave", onPLeave);
    };
  }, [n, duration, cooldown]);

  const jump = (dir: number) => { st.current.viaKey = true; goRef.current(dir); };

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
