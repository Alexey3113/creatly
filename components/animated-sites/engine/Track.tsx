"use client";
/* L2 Track — примитив прогресса сцены. useTrack(ref) регистрируется в общем RAF ScrollStage и на
   каждом кадре пишет элементу --t [0..1] по его положению во вьюпорте. mode:
   - "through": 0 когда верх элемента у низа вьюпорта → 1 когда низ элемента у верха (для reveal/parallax);
   - "pin": 0..1 пока элемент высотой >100vh проходит закреплённым (для scrub-сцен).
   Всё визуальное решается в CSS от --t; JS только пишет число. */
import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import { useStage } from "./ScrollStage";

export function useTrack<T extends HTMLElement>(mode: "through" | "pin" = "through") {
  const ref = useRef<T>(null);
  const stage = useStage();
  useEffect(() => {
    const el = ref.current; if (!el || !stage) return;
    if (stage.reduced) { el.style.setProperty("--t", "1"); return; }
    const compute = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let t: number;
      if (mode === "pin") t = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - vh)));
      else t = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      el.style.setProperty("--t", t.toFixed(4));
    };
    const unregister = stage.register(compute);
    compute();
    return unregister;
  }, [stage, mode]);
  return ref;
}

/* Сцена: секция-контейнер. pinned=true делает высокую scrub-сцену со sticky-вьюпортом. */
export function Scene({ children, className = "", pinned = false, vh = 100, style }: {
  children: ReactNode; className?: string; pinned?: boolean; vh?: number; style?: CSSProperties;
}) {
  const ref = useTrack<HTMLElement>(pinned ? "pin" : "through");
  return (
    <section ref={ref} className={`scene ${pinned ? "scene-pin" : ""} ${className}`} style={{ ["--vh" as string]: `${vh}`, ...style }}>
      {pinned ? <div className="scene-sticky">{children}</div> : children}
    </section>
  );
}
