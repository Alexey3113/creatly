"use client";
/* ScrollStage — «reel»-движок модуля /animated. Наследует ДНК StageDeck (контракт CSS-переменных,
   единый RAF, reduced-motion→мгновенный финал), но вместо дискретного snap-дека — НЕПРЕРЫВНЫЙ
   scroll-scrub на нативном высоком скролле + Lenis-инерция.
   L0 Transport: Lenis (+нативный скролл).  L1 Clock: ОДИН RAF/страница пишет CSS-переменные батчем
   и раздаёт прогресс зарегистрированным трекам.  L2 Track: см. useTrack ниже.
   Контракт корня .reel: --scroll[0..1 страница] · --vel[clamp] · --px/--py[-1..1 курсор]. */
import Lenis from "lenis";
import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";

type TrackFn = (vpProgress: number, vel: number) => void;
type Ctx = { register: (fn: TrackFn) => () => void; reduced: boolean };
const StageCtx = createContext<Ctx | null>(null);
export const useStage = () => useContext(StageCtx);

export function ScrollStage({ children, className = "" }: { children: ReactNode; className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const tracks = useRef<Set<TrackFn>>(new Set());
  const reducedRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    reducedRef.current = reduced;

    // reduced-motion: без инерции и RAF — сразу финальный кадр (треки в vpProgress=1)
    if (reduced) {
      tracks.current.forEach((fn) => fn(1, 0));
      root.style.setProperty("--scroll", "1");
      return;
    }

    const fine = matchMedia("(pointer:fine)").matches;
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    let raf = 0, lastScroll = 0, cx = 0, cy = 0, tx = 0, ty = 0;

    const frame = (time: number) => {
      lenis.raf(time);
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const s = Math.min(1, Math.max(0, window.scrollY / max));
      const vel = Math.max(-3, Math.min(3, (window.scrollY - lastScroll) * 0.05));
      lastScroll = window.scrollY;
      // сглаженный курсор
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      root.style.setProperty("--scroll", s.toFixed(4));
      root.style.setProperty("--vel", vel.toFixed(3));
      root.style.setProperty("--px", cx.toFixed(3));
      root.style.setProperty("--py", cy.toFixed(3));
      // раздать прогресс трекам (каждый сам знает своё окно)
      tracks.current.forEach((fn) => fn(s, vel));
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onMove = (e: PointerEvent) => { tx = (e.clientX / window.innerWidth) * 2 - 1; ty = (e.clientY / window.innerHeight) * 2 - 1; };
    if (fine) window.addEventListener("pointermove", onMove);

    return () => { cancelAnimationFrame(raf); lenis.destroy(); if (fine) window.removeEventListener("pointermove", onMove); };
  }, []);

  const register = (fn: TrackFn) => { tracks.current.add(fn); return () => { tracks.current.delete(fn); }; };

  return (
    <StageCtx.Provider value={{ register, reduced: reducedRef.current }}>
      <div className={`reel ${className}`} ref={rootRef}>{children}</div>
    </StageCtx.Provider>
  );
}
