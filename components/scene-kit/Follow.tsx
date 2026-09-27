"use client";
/* SCENE-KIT · FOLLOW — любые числовые CSS-переменные по якорям (как Atmosphere, но для чисел):
   <Follow target=".xx-gauge" stops={[{ at: reelMark("s1"), vars: { "--depth": 0 } }, { at: ".xx-cta", vars: { "--depth": 212 } }]} />
   Пишет интерполированные значения каждый кадр на цель (по умолчанию — родитель). Счётчики, высотомеры,
   положение солнца, яркость фонаря — без своих rAF в каждом сайте. */
import { useEffect, useRef } from "react";
import { subscribe, smooth, lerp } from "./clock";
import { segment, selectorCache } from "./anchors";

export type FollowStop = { at: string; vars: Record<string, number>; anchor?: number };

export function Follow({ stops, target, line = 0.5, unit = "", round = false }: {
  stops: FollowStop[]; target?: string; line?: number;
  /** суффикс единицы для всех значений (например "vh"); пусто — голое число */
  unit?: string;
  round?: boolean;
}) {
  const key = JSON.stringify(stops);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const list: FollowStop[] = JSON.parse(key);
    const els = selectorCache(list.map((s) => s.at));
    const anchors = list.map((s) => s.anchor ?? 0.5);
    const names = Array.from(new Set(list.flatMap((s) => Object.keys(s.vars))));
    const host = (target ? document.querySelector<HTMLElement>(target) : ref.current?.parentElement) ?? document.documentElement;
    return subscribe(({ vh }) => {
      const seg = segment(els(), vh, anchors, line);
      if (!seg) return;
      const k = smooth(seg.t);
      for (const n of names) {
        const a = list[seg.a].vars[n] ?? list[seg.b].vars[n] ?? 0;
        const b = list[seg.b].vars[n] ?? a;
        const v = lerp(a, b, k);
        host.style.setProperty(n, (round ? Math.round(v).toString() : v.toFixed(3)) + unit);
      }
    });
  }, [key, target, line, unit, round]);
  return <span ref={ref} hidden aria-hidden />;
}
