"use client";
/* SCENE-KIT · АКТЁР — объект, который едет вместе со зрителем через ВСЕ сцены и лендинг.
   Постоянный fixed-слой над страницей. Путь — якоря (элементы страницы в порядке документа):
   когда якорь проходит линию экрана, актёр принимает его позу; между якорями — плавная интерполяция.
   dock: поза считается ОТ ПРЯМОУГОЛЬНИКА якоря (актёр «причаливает» в блок и едет вместе с ним,
   напр. садится на карточку цены). Живость без скролла: лёгкое покачивание (bob) и крен от скорости. */
import { useEffect, useRef } from "react";
import { subscribe, lerp, smooth } from "./clock";
import { segment, selectorCache } from "./anchors";
import "./scene-kit.css";

export type ActorPose = {
  /** центр по X, % ширины экрана (или доля ширины якоря при dock) */
  x?: number;
  /** центр по Y, % высоты экрана (или доля высоты якоря при dock) */
  y?: number;
  /** масштаб */
  s?: number;
  /** поворот, градусы */
  r?: number;
  /** прозрачность 0..1 */
  o?: number;
  /** размытие, px (глубина резкости: ближе/дальше фокуса) */
  blur?: number;
  /** зеркало по X: 1 | -1 (интерполяция даёт «разворот» через сжатие) */
  fx?: number;
  /** x/y считаются внутри прямоугольника якоря */
  dock?: boolean;
  /** причал к ДРУГОМУ элементу (напр. внутри закреплённой главы): момент задаёт at, место — dockTo */
  dockTo?: string;
};

export type ActorStop = { at: string; pose: ActorPose; anchor?: number };

const DEF: Required<Omit<ActorPose, "dock" | "dockTo">> = { x: 50, y: 50, s: 1, r: 0, o: 1, blur: 0, fx: 1 };

export function Actor({
  src,
  children,
  stops,
  width = "14vw",
  zIndex = 30,
  bob = 6,
  tilt = 0.08,
  line = 0.5,
  className = "",
}: {
  src?: string;
  children?: React.ReactNode;
  stops: ActorStop[];
  width?: string;
  zIndex?: number;
  /** амплитуда покачивания, px */
  bob?: number;
  /** крен от скорости скролла, град на px/кадр */
  tilt?: number;
  /** линия экрана, на которой «срабатывает» якорь (0.5 = середина) */
  line?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const key = JSON.stringify(stops);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const list: ActorStop[] = JSON.parse(key);
    const els = selectorCache(list.map((s) => s.at));
    const anchors = list.map((s) => s.anchor ?? 0.5);
    const poseOf = (i: number, vw: number, vh: number) => {
      const p = { ...DEF, ...list[i].pose };
      if (list[i].pose.dock || list[i].pose.dockTo) {
        const n = list[i].pose.dockTo ? document.querySelector(list[i].pose.dockTo) : els()[i];
        if (n) {
          const r = n.getBoundingClientRect();
          p.x = ((r.left + r.width * (p.x / 100)) / vw) * 100;
          p.y = ((r.top + r.height * (p.y / 100)) / vh) * 100;
        }
      }
      return p;
    };
    return subscribe(({ vw, vh, vy, t, reduced }) => {
      const seg = segment(els(), vh, anchors, line);
      if (!seg) return;
      const A = poseOf(seg.a, vw, vh);
      const B = poseOf(seg.b, vw, vh);
      const k = smooth(seg.t);
      const x = lerp(A.x, B.x, k);
      const y = lerp(A.y, B.y, k);
      const s = lerp(A.s, B.s, k);
      const fx = lerp(A.fx, B.fx, k);
      const lean = reduced ? 0 : Math.max(-10, Math.min(10, vy * tilt));
      const r = lerp(A.r, B.r, k) + lean;
      const o = lerp(A.o, B.o, k);
      const bl = lerp(A.blur, B.blur, k);
      const by = reduced ? 0 : Math.sin(t / 950) * bob;
      el.style.transform = `translate3d(${x.toFixed(3)}vw, calc(${y.toFixed(3)}vh + ${by.toFixed(2)}px), 0) translate(-50%, -50%) rotate(${r.toFixed(2)}deg) scale(${(s * fx).toFixed(4)}, ${s.toFixed(4)})`;
      el.style.opacity = o.toFixed(3);
      el.style.filter = bl > 0.1 ? `blur(${bl.toFixed(1)}px)` : "";
      el.style.visibility = o < 0.01 ? "hidden" : "";
    });
  }, [key, bob, tilt, line]);

  return (
    <div ref={ref} className={`sk-actor ${className}`} style={{ width, zIndex }} aria-hidden>
      {src ? <img src={src} alt="" decoding="async" draggable={false} /> : children}
    </div>
  );
}
