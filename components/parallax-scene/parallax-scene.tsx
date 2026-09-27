"use client";
/**
 * Движок animated 3D-parallax сцен (по архитектуре codex).
 * Все слои — отдельные DOM-элементы; хореография целиком на CSS-переменных
 * (--sp прогресс сцены, --px/--py сглаженный курсор), без React re-render на скролл.
 * Любой <SceneMedia> позже меняется на <video> без правки Layer.
 */
import React, { useEffect, useRef, type CSSProperties } from "react";

type V = string | number;
export type SceneTransform = { x?: V; y?: V; scale?: number; rotate?: string; opacity?: number };
export type SceneMask = "none" | "soft" | "radial" | "diag-in" | "diag-out" | "curtain";

// Сцена: sticky-вьюпорт высотой heightVh, пишет --sp/--px/--py в корень секции.
export function ParallaxScene({
  heightVh = 220, pointer = true, background, className, children, id, transitionOut,
}: {
  heightVh?: number; pointer?: boolean; background?: React.ReactNode; className?: string;
  children: React.ReactNode; id?: string; transitionOut?: { type: "diagonal" | "curtain" | "crossfade"; angle?: number; color?: string; start?: number };
}) {
  const ref = useSceneProgress<HTMLDivElement>(pointer);
  const tvars = transitionOut
    ? ({ ["--tr-start"]: transitionOut.start ?? 0.8, ["--tr-angle"]: `${transitionOut.angle ?? -12}deg`, ["--tr-color"]: transitionOut.color ?? "var(--bg, #0a0d12)" } as CSSProperties)
    : undefined;
  return (
    <section ref={ref} id={id} className={`ps-scene ${className || ""}`} style={{ height: `${heightVh}vh` }}>
      <div className="ps-sticky">
        {background && <div className="ps-site-bg">{background}</div>}
        <div className="ps-viewport">{children}</div>
        {transitionOut && <div className={`ps-trans ps-trans-${transitionOut.type}`} style={tvars} aria-hidden />}
      </div>
    </section>
  );
}

// Слой: depth-параллакс + phase-окно + from/to интерполяция. Всё через CSS-переменные.
export function Layer({
  depth = 0.4, z = 1, phase = [0, 1], from, to, cursor, mask = "none", blend, fit, position, className, children, style,
}: {
  depth?: number; z?: number; phase?: readonly [number, number];
  from?: SceneTransform; to?: SceneTransform; cursor?: { x?: number; y?: number };
  mask?: SceneMask; blend?: string; fit?: "cover" | "contain"; position?: string;
  className?: string; children: React.ReactNode; style?: CSSProperties;
}) {
  const f = { x: "0px", y: "0px", scale: 1, rotate: "0deg", opacity: 1, ...from };
  const t = { x: "0px", y: "0px", scale: 1, rotate: "0deg", opacity: 1, ...to };
  const [s, e] = phase;
  const vars: CSSProperties = {
    ["--start"]: s, ["--inv"]: 1 / Math.max(0.0001, e - s),
    ["--fx"]: f.x, ["--tx"]: t.x, ["--fy"]: f.y, ["--ty"]: t.y,
    ["--fsc"]: f.scale, ["--tsc"]: t.scale, ["--frot"]: f.rotate, ["--trot"]: t.rotate,
    ["--fop"]: f.opacity, ["--top"]: t.opacity,
    ["--depth"]: depth, ["--cx"]: `${cursor?.x ?? 0}px`, ["--cy"]: `${cursor?.y ?? 0}px`,
    zIndex: z, ...(blend ? { mixBlendMode: blend as CSSProperties["mixBlendMode"] } : {}),
    ...(fit ? { ["--fit"]: fit } : {}), ...(position ? { ["--pos"]: position } : {}), ...style,
  } as CSSProperties;
  return <div className={`ps-layer ps-mask-${mask} ${className || ""}`} style={vars}>{children}</div>;
}

// Медиа-слой (img → позже video). object-fit/position наследуются из Layer через --fit/--pos.
export function SceneMedia({ src, alt = "", className }: { src: string; alt?: string; className?: string }) {
  return <img src={src} alt={alt} className={`ps-media ${className || ""}`} loading="lazy" draggable={false} />;
}

// Reveal одной строки: клип/подлёт по своему окну прогресса (--lnp).
export function LineReveal({ children, start = 0, end = 1, fromX = "0px", className }: {
  children: React.ReactNode; start?: number; end?: number; fromX?: string; className?: string;
}) {
  const vars = { ["--ls"]: start, ["--linv"]: 1 / Math.max(0.0001, end - start), ["--lfx"]: fromX } as CSSProperties;
  return <span className={`ps-line ${className || ""}`} style={vars}><span>{children}</span></span>;
}

// Титул с type-occlusion: back-строки (за субъектом) + front-строки (перед). Каждая строка — reveal по логическим точкам.
export function SceneTitle({ back = [], front = [], phase = [0.12, 0.5], backZ = 4, frontZ = 6, className }: {
  back?: React.ReactNode[]; front?: React.ReactNode[]; phase?: readonly [number, number]; backZ?: number; frontZ?: number; className?: string;
}) {
  const [s, e] = phase; const n = Math.max(1, back.length + front.length); const stag = (e - s) / (n + 1);
  let i = 0;
  const line = (node: React.ReactNode, fromX: string) => {
    const st = s + i * stag; const en = Math.min(1, st + stag * 2.2); i++;
    return <LineReveal key={i} start={st} end={en} fromX={fromX}>{node}</LineReveal>;
  };
  return (
    <div className={`ps-title ${className || ""}`}>
      {back.length > 0 && <h1 className="ps-title-back" style={{ zIndex: backZ }}>{back.map((l) => line(l, "-6vw"))}</h1>}
      {front.length > 0 && <div className="ps-title-front" style={{ zIndex: frontZ }} aria-hidden>{front.map((l) => line(l, "6vw"))}</div>}
    </div>
  );
}

// Хук сцены: --sp (скролл-прогресс) + сглаженные --px/--py (курсор). Один RAF, IO-гейт, reduced-motion.
export function useSceneProgress<T extends HTMLElement>(pointer = true) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // reduced-motion: замираем на осмысленном КОНЕЧНОМ состоянии (контент раскрыт, до перехода 0.86), а не на середине
    if (reduce) { el.style.setProperty("--sp", "0.84"); return; }
    let raf = 0, active = false;
    const compute = () => { raf = 0; const r = el.getBoundingClientRect(); const travel = Math.max(1, el.offsetHeight - window.innerHeight); el.style.setProperty("--sp", Math.max(0, Math.min(1, -r.top / travel)).toFixed(4)); };
    const onScroll = () => { if (!raf && active) raf = requestAnimationFrame(compute); };
    const io = new IntersectionObserver((es) => { active = es[0].isIntersecting; el.classList.toggle("is-active", active); if (active) onScroll(); }, { threshold: 0 });
    io.observe(el); addEventListener("scroll", onScroll, { passive: true }); addEventListener("resize", onScroll); compute();
    // сглаженный курсор
    const fine = pointer && matchMedia("(pointer:fine)").matches;
    let praf = 0, tx = 0, ty = 0, cx = 0, cy = 0;
    const tick = () => { praf = 0; cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08; el.style.setProperty("--px", cx.toFixed(3)); el.style.setProperty("--py", cy.toFixed(3)); if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) praf = requestAnimationFrame(tick); };
    const onMove = (e: PointerEvent) => { const r = el.getBoundingClientRect(); tx = ((e.clientX - r.left) / r.width) * 2 - 1; ty = ((e.clientY - r.top) / r.height) * 2 - 1; if (!praf) praf = requestAnimationFrame(tick); };
    const onLeave = () => { tx = 0; ty = 0; if (!praf) praf = requestAnimationFrame(tick); };
    if (fine) { el.addEventListener("pointermove", onMove); el.addEventListener("pointerleave", onLeave); }
    return () => { cancelAnimationFrame(raf); cancelAnimationFrame(praf); io.disconnect(); removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); if (fine) { el.removeEventListener("pointermove", onMove); el.removeEventListener("pointerleave", onLeave); } };
  }, [pointer]);
  return ref;
}
