"use client";
/* ОБЩИЙ ДВИЖОК РИЛА (фирменный приём модели) — иллюстрированный кино-скроллителлинг.
   Закреплённый стек сцен; следующая ВЫЕЗЖАЕТ снизу и бесшовно накрывает предыдущую (translateY 100%→0),
   верхний край растворяется (--feather), между мирами дрейфует mist. Внутри сцены слои bg→mid→fg
   параллаксят/dolly по локальному --sp и курсору --mx/--my. Прогресс считается КАЖДЫЙ кадр в одном
   rAF (Lenis + сцены) → нет рассинхрона CSS-vh ↔ JS на ресайзе. Полностью накрытые и ещё не въехавшие
   сцены выключаются через display:none — в композиторе живут максимум 2 сцены, иначе стек из 16
   полноэкранных слоёв на ресайзе/глубоком переходе мигал пустыми заглушками (перерастер-шторм).

   ЭТО ЕДИНСТВЕННОЕ ОБЩЕЕ между 30 сайтами. Типографику копи, палитру и лендинг-блоки каждый сайт
   задаёт сам (обёртка + свой css). Reel стилизует только механику слоёв (reel.css, префикс rl-). */
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "./reel.css";

export type ReelScene = {
  id: string;
  bg: string;
  mid?: string;
  fg?: string;
  dark?: boolean;
  /** DOM-спрайты-искры (светлячки/пыльца/угли) поверх сцены */
  spark?: number;
  /** копи сцены — со своими классами сайта (reel только позиционирует контейнер .rl-copy) */
  copy?: React.ReactNode;
};

export function Reel({
  scenes,
  cue = "scroll ↓",
  vh = 125,
  className = "",
}: { scenes: ReelScene[]; cue?: string; vh?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const reel = el.querySelector<HTMLElement>(".rl-reel");
    const sc = Array.from(el.querySelectorAll<HTMLElement>(".rl-scene"));
    const n = sc.length;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(pointer:fine)").matches;
    if (reduce) { sc.forEach((s) => { s.style.setProperty("--enter", "1"); s.style.setProperty("--sp", "0.5"); }); return; }
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1, smoothWheel: true });
    const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
    let raf = 0, tx = 0, ty = 0, cx = 0, cy = 0;
    const frame = (t: number) => {
      lenis.raf(t);
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      el.style.setProperty("--mx", cx.toFixed(3)); el.style.setProperty("--my", cy.toFixed(3));
      if (reel) {
        const r = reel.getBoundingClientRect();
        const p = clamp(-r.top / Math.max(1, reel.offsetHeight - window.innerHeight));
        // enter всех сцен считаем заранее — нужен для видимости соседей
        const enters = sc.map((_, i) => (i === 0 ? 1 : clamp((p - (i - 0.85) / n) / (0.85 / n))));
        for (let i = 0; i < n; i++) {
          const enter = enters[i];
          const sp = clamp((p - i / n) / (1 / n));
          const feather = i === 0 ? 0 : clamp((1 - enter) * 6);
          const s = sc[i];
          // Держим в композиторе только сцены вокруг текущего перехода: полностью накрытые
          // следующей и ещё припаркованные под вьюпортом выключаем через display:none —
          // их GPU-слои реально освобождаются (visibility:hidden слоёв не снимает). Иначе
          // к сценам 3–4 копятся все 16 полноэкранных слоёв → на переходе и особенно на
          // ресайзе браузер мигает пустыми заглушками, пока перерастеризует всё сразу.
          const covered = i + 1 < n && enters[i + 1] >= 1;
          const parked = i > 0 && enter <= 0;
          const hidden = covered || parked;
          const want = hidden ? "none" : "";
          if (s.style.display !== want) s.style.display = want;
          s.style.setProperty("--enter", enter.toFixed(4));
          s.style.setProperty("--sp", sp.toFixed(4));
          s.style.setProperty("--feather", feather.toFixed(4));
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    const onMove = (e: PointerEvent) => { tx = (e.clientX / innerWidth) * 2 - 1; ty = (e.clientY / innerHeight) * 2 - 1; };
    if (fine) addEventListener("pointermove", onMove);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); removeEventListener("pointermove", onMove); };
  }, []);

  return (
    <div className={`rl ${className}`} ref={ref}>
      <div className="rl-reel" style={{ height: `calc(${scenes.length} * ${vh}vh)` }}>
        <div className="rl-reel-stage">
          {scenes.map((s, i) => (
            <section key={s.id} className={`rl-scene ${s.dark ? "rl-dark" : ""}`} style={{ zIndex: i + 1 }} data-scene={s.id}>
              <div className="rl-bg" style={{ backgroundImage: `url(${s.bg})` }} aria-hidden />
              <div className="rl-haze" aria-hidden />
              {i > 0 && <div className="rl-mist" aria-hidden />}
              {s.mid && <div className="rl-mid" aria-hidden><span className="rl-shadow" /><img src={s.mid} alt="" decoding="async" /></div>}
              {s.fg && <div className="rl-fg" aria-hidden><img src={s.fg} alt="" decoding="async" /></div>}
              {s.spark ? Array.from({ length: s.spark }, (_, k) => <span key={k} className={`rl-fly rl-fly-${(k % 5) + 1}`} aria-hidden />) : null}
              {s.copy != null && <div className="rl-copy">{s.copy}</div>}
            </section>
          ))}
          {cue && <div className="rl-cue" aria-hidden>{cue}</div>}
        </div>
      </div>
    </div>
  );
}
