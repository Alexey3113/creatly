"use client";
/* StoryDeck — снап-дек: один жест = переход на следующую сцену, скролл заблокирован
   пока идёт анимация входа. Сцены absolute-стеком в 100dvh, нативного скролла нет.
   Активной сцене RAF пишет --sp 0→1 → существующий расчёт --lp (reveal) работает как есть.
   Архитектура по ревью codex: wheel non-passive+preventDefault, touch=pointer, лок по таймеру,
   поглощение инерции трекпада, reduced-motion без лока, inert/aria. */
import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import "./storydeck.css";

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function StoryDeck({ children, duration = 900, cooldown = 320 }: { children: ReactNode; duration?: number; cooldown?: number }) {
  const scenes = Children.toArray(children);
  const n = scenes.length;
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const st = useRef({ active: 0, animating: false, raf: 0, accum: 0, downY: 0, downX: 0, lockUntil: 0, viaKey: false });
  const goRef = useRef<(dir: number) => void>(() => {});

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = () => Array.from(root.querySelectorAll<HTMLElement>(":scope > .deck-scene"));
    const setSp = (el: HTMLElement | undefined, v: number) => el && el.style.setProperty("--sp", v.toFixed(4));
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const list = els();
    list.forEach((el, i) => {
      setSp(el, i === 0 ? 1 : 0);
      el.classList.toggle("is-active", i === 0);
      el.toggleAttribute("inert", i !== 0);
      el.setAttribute("aria-hidden", i !== 0 ? "true" : "false");
    });

    const finish = (cur: HTMLElement, nxt: HTMLElement, next: number) => {
      cur.classList.remove("is-active", "is-leaving");
      cur.toggleAttribute("inert", true);
      cur.setAttribute("aria-hidden", "true");
      setSp(cur, 0);
      nxt.classList.remove("is-entering");
      nxt.classList.add("is-active");
      nxt.toggleAttribute("inert", false);
      nxt.setAttribute("aria-hidden", "false");
      setSp(nxt, 1);
      st.current.active = next;
      st.current.animating = false;
      st.current.lockUntil = performance.now() + cooldown;
      st.current.accum = 0;
      const live = root.querySelector<HTMLElement>(".deck-live");
      if (live) live.textContent = `Сцена ${next + 1} из ${n}`;
      if (st.current.viaKey) { nxt.focus?.(); st.current.viaKey = false; }
    };

    const goTo = (next: number, instant = false) => {
      const s = st.current;
      if (s.animating || performance.now() < s.lockUntil) return;
      if (next < 0 || next >= n || next === s.active) return; // границы — поглощаем жест
      const l = els();
      const cur = l[s.active];
      const nxt = l[next];
      if (!cur || !nxt) return;
      s.animating = true;
      root.dataset.dir = next > s.active ? "fwd" : "back";
      nxt.classList.add("is-entering");
      cur.classList.add("is-leaving");
      setActive(next);
      if (reduce || instant) { finish(cur, nxt, next); return; }
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / duration);
        setSp(nxt, easeInOutCubic(p));
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
      if (Math.abs(s.accum) > 28) { const d = Math.sign(s.accum); s.accum = 0; go(d); }
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
      if (Math.abs(dy) > 46 && Math.abs(dy) > Math.abs(dx)) go(dy < 0 ? 1 : -1);
    };

    root.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("pointerdown", onDown);
    root.addEventListener("pointerup", onUp);
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(st.current.raf);
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointerup", onUp);
      window.removeEventListener("keydown", onKey);
    };
  }, [n, duration, cooldown]);

  const jump = (dir: number) => { st.current.viaKey = true; goRef.current(dir); };

  return (
    <div className="deck" ref={rootRef} role="group" aria-roledescription="журнал историй" tabIndex={0} aria-label={`Журнал историй, сцена ${active + 1} из ${n}`}>
      {scenes.map((s, i) => (
        <section key={i} tabIndex={-1} className={`deck-scene${i === 0 ? " is-active" : ""}`} data-i={i} aria-label={`Сцена ${i + 1} из ${n}`}>
          {s}
        </section>
      ))}
      <p className="deck-live" aria-live="polite" role="status">Сцена {active + 1} из {n}</p>
      <div className="deck-ctrl">
        <button type="button" className="deck-prev" onClick={() => jump(-1)} disabled={active === 0} aria-label="Предыдущая сцена">↑</button>
        <button type="button" className="deck-next" onClick={() => jump(1)} disabled={active === n - 1} aria-label="Следующая сцена">↓</button>
      </div>
      <nav className="deck-dots" aria-hidden>
        {scenes.map((_, i) => <span key={i} className={i === active ? "on" : ""} />)}
      </nav>
    </div>
  );
}
