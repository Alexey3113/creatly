"use client";
/* ДВИЖОК РИЛА v2 — иллюстрированный кино-скроллителлинг как ОДИН ПЛАН с режиссёрским таймлайном
   (аудит 2026-09-28 → docs/audit/VISUAL-ARCHITECTURE.md).

   Было (v1): следующая плита выезжала снизу и накрывала предыдущую; у сцены было ~15% «чистого» времени,
   85% скролла на экране висели две картинки и два заголовка; слои зумились почти одинаково — глубины не было.

   Стало:
   • ПАРТИТУРА. Глава = удержание (hold, по умолчанию 42% её длины: одна сцена, копи читается, камера
     почти стоит) + переход. Длину и долю удержания можно задать на главу (len/hold).
   • КОПИ ЭСТАФЕТОЙ. Заголовок уходящей сцены гаснет в первой трети перехода, новый проявляется в последней —
     двух заголовков одновременно не бывает.
   • СКЛЕЙКИ ИЗ МИРА (scene.into — как ВХОДИМ в сцену), всё скрабится скроллом:
       rise — наезд снизу с растушёвкой (как v1, но с параллаксом уходящей);
       descend / ascend — камера спускается / поднимается ОДНИМ полотном, шов = природная полоса (tint);
       pan — камера едет вбок (путь по горизонтали), дальний план отстаёт, ближний обгоняет;
       flythrough — ближний и средний план уходящей сцены пролетают мимо камеры, новая встаёт из глубины;
       portal — камера влетает в точку сцены (окно, арка, зрачок: scene.portal), новая раскрывается кругом;
       sweep — полоса света (луч, рассвет, фонарь) проходит по кадру и уносит старую сцену;
       occlude — тёмный силуэт переднего плана вырастает на весь экран, под ним уже новая сцена;
       lightshift — та же композиция, меняется свет, вспышка.
   • ГЛУБИНА. bg ≈ +6% за главу, mid ≈ +14%, fg ≈ +30% и уходит вниз — ближний план обгоняет дальний (depth).
   • ЗАСТЫВАНИЕ. scene.freeze — стоп-кадр внутри удержания: камера встаёт, кадр слегка обесцвечивается,
     выходит титр/цифра (контент — сайта).
   • МАРКЕРЫ для сквозных слоёв scene-kit (Actor/Atmosphere/Backdrop): в высокой дорожке рила стоят
     невидимые якоря data-reel-mark="s{i}" (середина удержания), "t{i}" (середина перехода i→i+1), "end".
   Прогресс считается КАЖДЫЙ кадр в едином rAF scene-kit (после Lenis) — актёры и сцены видят одну позицию.
   ЭТО ЕДИНСТВЕННОЕ ОБЩЕЕ между 30 сайтами. Сайт задаёт палитру (--rl-void/--rl-spark), копи и лендинг. */
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { subscribe, useLenisInClock, smooth as E, win, clamp01 } from "@/components/scene-kit/clock";
import "./reel.css";

export type ReelTransition = "rise" | "descend" | "ascend" | "pan" | "flythrough" | "portal" | "sweep" | "occlude" | "lightshift";

export type ReelScene = {
  id: string;
  bg: string;
  mid?: string;
  fg?: string;
  dark?: boolean;
  /** DOM-спрайты-искры (светлячки/пыльца/угли) поверх сцены */
  spark?: number;
  /** копи сцены — со своими классами сайта (reel позиционирует контейнер .rl-copy) */
  copy?: React.ReactNode;
  /** как камера ВХОДИТ в эту сцену (для первой не используется). По умолчанию rise */
  into?: ReelTransition;
  /** точка портала на ПРЕДЫДУЩЕЙ сцене, % экрана (для into:"portal") */
  portal?: { x: number; y: number };
  /** цвет шва/вспышки/окклюзии на входе в сцену (по умолчанию палитра сайта) */
  tint?: string;
  /** относительная длина главы (1 = unit vh скролла) */
  len?: number;
  /** доля удержания главы 0..1 */
  hold?: number;
  /** стоп-кадр внутри удержания: титр/цифра */
  freeze?: React.ReactNode;
  /** object-position mid-вырезки (увести героя из-под копи) */
  midPos?: string;
  /** сдвиг mid по X, vw (midPos по X не работает, когда вырезка упирается в ширину кадра) */
  midShift?: number;
  /** масштаб mid (герой меньше/больше без правки ассета) */
  midScale?: number;
  /** шов спуска/подъёма: высота полосы (vh) и плотность 0..1.5 */
  seam?: { h?: number; o?: number };
  /** маска fg-полосы: [где начинается проявление, где полностью видно], % высоты (по умолчанию [52, 72]).
      Ниже — чтобы полупрозрачная кромка травы/скал не ложилась «призраком» на героя */
  fgMask?: [number, number];
  /** background-position плиты */
  bgPos?: string;
};

/** селектор маркера рила для якорей scene-kit: reelMark("s2") середина удержания, reelMark("a2")/reelMark("h2")
    начало/конец удержания (актёр держит позу весь стоп-кадр), reelMark("t1") середина перехода, reelMark("end") */
export const reelMark = (key: string) => `[data-reel-mark="${key}"]`;

const OUT_ON_TOP = new Set<ReelTransition>(["flythrough", "occlude"]);
const needs = (t: ReelTransition | undefined, ...k: ReelTransition[]) => !!t && k.includes(t);

export function Reel({
  scenes,
  cue = "scroll ↓",
  unit = 140,
  hold = 0.42,
  depth = 1,
  className = "",
}: {
  scenes: ReelScene[];
  cue?: string;
  /** скролл на единицу длины главы, vh */
  unit?: number;
  /** доля удержания по умолчанию */
  hold?: number;
  /** множитель параллакса слоёв */
  depth?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const n = scenes.length;
  const lens = scenes.map((s) => s.len ?? 1);
  const holds = scenes.map((s) => Math.min(0.9, Math.max(0.1, s.hold ?? hold)));
  const starts: number[] = [];
  lens.reduce((acc, l, i) => ((starts[i] = acc), acc + l), 0);
  const total = lens.reduce((a, b) => a + b, 0);
  const holdEnd = (i: number) => starts[i] + (i === n - 1 ? lens[i] : holds[i] * lens[i]);
  // маркеры: середина удержания и середина перехода (u → top в дорожке так, чтобы центр совпал с серединой экрана)
  const marks: Array<[string, number]> = [];
  scenes.forEach((_, i) => {
    marks.push([`a${i}`, starts[i] + (i === 0 ? 0.001 : 0)]);
    marks.push([`h${i}`, holdEnd(i) - 0.001]);
    marks.push([`s${i}`, (starts[i] + holdEnd(i)) / 2]);
    if (i < n - 1) marks.push([`t${i}`, (holdEnd(i) + starts[i] + lens[i]) / 2]);
  });
  marks.push(["end", total]);
  const key = JSON.stringify({ lens, holds, into: scenes.map((s) => s.into), p: scenes.map((s) => s.portal), f: scenes.map((s) => !!s.freeze), depth });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reel = el.querySelector<HTMLElement>(".rl-reel");
    const sc = Array.from(el.querySelectorAll<HTMLElement>(".rl-scene"));
    const q = <T extends HTMLElement>(s: HTMLElement, sel: string) => s.querySelector<T>(sel);
    const parts = sc.map((s) => ({
      s,
      world: q(s, ".rl-world")!,
      bg: q(s, ".rl-bg")!,
      mid: q(s, ".rl-mid"),
      fg: q(s, ".rl-fg"),
      copy: q(s, ".rl-copy"),
      haze: q(s, ".rl-haze"),
      mist: q(s, ".rl-mist"),
    }));
    // эффекты шва живут на уровне сцены-сцены НАД всеми сценами (иначе их режет маска/перекрывает соседняя)
    const fx = {
      seam: el.querySelector<HTMLElement>(".rl-fx-seam"),
      beam: el.querySelector<HTMLElement>(".rl-fx-beam"),
      bloom: el.querySelector<HTMLElement>(".rl-fx-bloom"),
      occ: el.querySelector<HTMLElement>(".rl-fx-occ"),
    };
    const cueEl = el.querySelector<HTMLElement>(".rl-cue");
    const into = scenes.map((s) => s.into ?? "rise");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { el.classList.add("rl-reduced"); return; }

    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1, smoothWheel: true });
    useLenisInClock(lenis);
    const fine = matchMedia("(pointer:fine)").matches;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e: PointerEvent) => { tx = (e.clientX / innerWidth) * 2 - 1; ty = (e.clientY / innerHeight) * 2 - 1; };
    if (fine) addEventListener("pointermove", onMove);
    const frozenSp: Array<number | null> = sc.map(() => null);
    const D = depth;

    const unsub = subscribe(({ vh }) => {
      if (!reel) return;
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      const r = reel.getBoundingClientRect();
      const travel = Math.max(1, reel.offsetHeight - vh);
      const u = (clamp01(-r.top / travel)) * total;

      if (cueEl) {
        const h0 = holdEnd(0);
        cueEl.style.opacity = (1 - E(win(u, h0 * 0.45, h0 * 0.95))).toFixed(3);
      }

      for (let i = 0; i < n; i++) {
        const P = parts[i];
        const U = starts[i], L = lens[i];
        const hEnd = holdEnd(i);
        const tin = i === 0 ? 1 : win(u, holdEnd(i - 1), U);
        const tout = i === n - 1 ? 0 : win(u, hEnd, U + L);
        const live = tin > 0 && tout < 1;
        const want = live ? "" : "none";
        if (P.s.style.display !== want) P.s.style.display = want;
        if (!live) continue;

        // локальный ход камеры: вход 0→.3, удержание .3→.7, уход .7→1
        let sp: number;
        if (i > 0 && u < U) sp = 0.3 * tin;
        else if (u <= hEnd) sp = 0.3 + 0.4 * win(u, U, hEnd);
        else sp = 0.7 + 0.3 * tout;
        // застывание: камера встаёт в середине удержания
        const frz = !!scenes[i].freeze && u >= U + (hEnd - U) * 0.22 && u <= U + (hEnd - U) * 0.88;
        if (frz) { if (frozenSp[i] == null) frozenSp[i] = sp; sp = frozenSp[i]!; } else frozenSp[i] = null;
        if (P.s.dataset.frozen !== (frz ? "1" : "")) { if (frz) P.s.dataset.frozen = "1"; else delete P.s.dataset.frozen; }

        // база: глубина (ближний план обгоняет дальний)
        let st = 0, sx = 0, ss = 1, so = 1, ox = 50, oy = 50;
        let bs = 1.03 + sp * 0.06 * D, by = (0.5 - sp) * 2 * D, bx = 0, bo = 1, bb = 0;
        let ms = (1.0 + sp * 0.14 * D) * (scenes[i].midScale ?? 1), my = (0.5 - sp) * 5 * D, mxo = scenes[i].midShift ?? 0, mo = 1, mb = 0;
        let fs = 1.02 + sp * 0.3 * D, fy = (sp - 0.5) * 10 * D, fxo = 0, fo = 1, fb = 0, fl = 1;
        let clip = "", mask = "", mist = 0;

        // ВХОД в сцену
        const Tin = into[i];
        if (i > 0 && tin < 1) {
          const t = E(tin);
          const f = clamp01((1 - tin) * 5);
          switch (Tin) {
            case "rise":
              st = (1 - t) * 100; by -= (1 - t) * 10 * D; fy += (1 - t) * 8 * D; mist = f;
              mask = `linear-gradient(180deg, transparent 0, transparent ${(f * 3).toFixed(2)}%, #000 ${(f * 13).toFixed(2)}%, #000 100%)`;
              break;
            case "descend":
              st = (1 - t) * 100; by -= (1 - t) * 14 * D; fy += (1 - t) * 10 * D;
              break;
            case "ascend":
              st = -(1 - t) * 100; by += (1 - t) * 14 * D; fy -= (1 - t) * 10 * D;
              break;
            case "pan":
              sx = (1 - t) * 88; bx -= (1 - t) * 18 * D; fxo += (1 - t) * 12 * D;
              mask = `linear-gradient(90deg, transparent 0, transparent ${(f * 2).toFixed(2)}%, #000 ${(f * 12).toFixed(2)}%, #000 100%)`;
              break;
            case "flythrough":
              ss = 1.3 - 0.3 * t; mo = E(win(tin, 0.35, 0.9)); fo = E(win(tin, 0.55, 1));
              break;
            case "portal": {
              const p = scenes[i].portal ?? { x: 50, y: 45 };
              ox = p.x; oy = p.y;
              clip = `circle(${(Math.pow(tin, 1.6) * 150).toFixed(2)}% at ${p.x}% ${p.y}%)`;
              ss = 1.35 - 0.35 * t;
              break;
            }
            case "sweep": {
              const P0 = t * 140 - 20;
              mask = `linear-gradient(100deg, #000 ${(P0 - 16).toFixed(2)}%, transparent ${(P0 + 4).toFixed(2)}%)`;
              break;
            }
            case "occlude":
              ss = 1.12 - 0.12 * t;
              break;
            case "lightshift":
              so = E(tin);
              break;
          }
        }

        // УХОД из сцены — по типу входа СЛЕДУЮЩЕЙ
        const Tout = i < n - 1 ? into[i + 1] : undefined;
        if (Tout && tout > 0) {
          const t = E(tout);
          switch (Tout) {
            case "rise": st = -t * 14; by += t * 4 * D; fy -= t * 6 * D; break;
            case "descend": st = -t * 100; by += t * 12 * D; fy -= t * 10 * D; break;
            case "ascend": st = t * 100; by -= t * 12 * D; fy += t * 10 * D; break;
            case "pan": sx = -t * 100; bx += t * 18 * D; fxo -= t * 12 * D; break;
            case "flythrough":
              fs *= 1 + t * 1.8; fy += t * 18; fb = t * 12; fo = 1 - E(win(tout, 0.3, 0.75));
              ms *= 1 + t * 0.9; mo = 1 - E(win(tout, 0.2, 0.65)); mb = t * 5;
              bs *= 1 + t * 0.5; bo = 1 - E(win(tout, 0.3, 0.95));
              break;
            case "portal": {
              const p = scenes[i + 1].portal ?? { x: 50, y: 45 };
              ox = p.x; oy = p.y; ss = 1 + t * t * 1.8;
              break;
            }
            case "sweep": ss = 1 + t * 0.04; break;
            case "occlude": {
              const g = E(win(tout, 0, 0.6));
              fs *= 1 + g * 3.2; fy -= g * 30; fl = 1 - t * 0.85; fo = 1 - E(win(tout, 0.62, 0.92));
              mo = bo = 1 - E(win(tout, 0.32, 0.55));
              break;
            }
            case "lightshift": break;
          }
        }

        // z: уходящая поверх входящей только для пролёта и окклюзии
        const z = Tout && tout > 0 && OUT_ON_TOP.has(Tout) ? n + 2 : i + 1;
        if (P.s.style.zIndex !== String(z)) P.s.style.zIndex = String(z);

        P.s.style.transform = `translate3d(${sx.toFixed(3)}%, ${st.toFixed(3)}%, 0) scale(${ss.toFixed(4)})`;
        P.s.style.transformOrigin = `${ox}% ${oy}%`;
        P.s.style.opacity = so < 0.999 ? so.toFixed(3) : "";
        P.s.style.clipPath = clip;
        P.s.style.setProperty("-webkit-mask-image", mask || "none");
        P.s.style.setProperty("mask-image", mask || "none");

        P.bg.style.transform = `translate3d(calc(${bx.toFixed(2)}vw + ${(cx * -10).toFixed(2)}px), calc(${by.toFixed(2)}vh + ${(cy * -6).toFixed(2)}px), 0) scale(${bs.toFixed(4)})`;
        P.bg.style.opacity = bo < 0.999 ? bo.toFixed(3) : "";
        if (P.haze) P.haze.style.opacity = bo < 0.999 ? bo.toFixed(3) : "";
        P.bg.style.filter = bb > 0.1 ? `blur(${bb.toFixed(1)}px)` : "";
        if (P.mid) {
          P.mid.style.transform = `translate3d(calc(${mxo.toFixed(2)}vw + ${(cx * -20).toFixed(2)}px), calc(${my.toFixed(2)}vh + ${(cy * -10).toFixed(2)}px), 0) scale(${ms.toFixed(4)})`;
          P.mid.style.opacity = mo < 0.999 ? mo.toFixed(3) : "";
          P.mid.style.filter = mb > 0.1 ? `blur(${mb.toFixed(1)}px)` : "";
        }
        if (P.fg) {
          P.fg.style.transform = `translate3d(calc(${fxo.toFixed(2)}vw + ${(cx * -34).toFixed(2)}px), calc(${fy.toFixed(2)}vh + ${(cy * -12).toFixed(2)}px), 0) scale(${fs.toFixed(4)})`;
          P.fg.style.opacity = fo < 0.999 ? fo.toFixed(3) : "";
          const fil = (fb > 0.1 ? `blur(${fb.toFixed(1)}px) ` : "") + (fl < 0.999 ? `brightness(${fl.toFixed(3)})` : "");
          P.fg.style.filter = fil;
        }
        if (P.copy) {
          const cin = i === 0 ? 1 : E(win(tin, 0.72, 1));
          const cout = i === n - 1 ? 1 : 1 - E(win(tout, 0, 0.28));
          const co = cin * cout;
          P.copy.style.opacity = co.toFixed(3);
          P.copy.style.transform = `translate3d(0, ${((1 - cin) * 3 - (1 - cout) * 3).toFixed(2)}vh, 0)`;
          P.copy.style.pointerEvents = co > 0.5 ? "" : "none";
          P.copy.style.visibility = co < 0.01 ? "hidden" : "";
        }
        if (P.mist) P.mist.style.opacity = (mist * 0.85).toFixed(3);
      }

      // ЭФФЕКТЫ ШВА: активен максимум один переход (удержания их разделяют)
      let j = -1, tj = 0;
      for (let i = 1; i < n; i++) { const t = win(u, holdEnd(i - 1), starts[i]); if (t > 0 && t < 1) { j = i; tj = t; break; } }
      const T = j > 0 ? into[j] : undefined;
      const tint = j > 0 ? (scenes[j].tint ?? "") : "";
      const setFx = (node: HTMLElement | null, o: number, extra?: (n: HTMLElement) => void) => {
        if (!node) return;
        node.style.opacity = o.toFixed(3);
        node.style.visibility = o < 0.005 ? "hidden" : "";
        if (o >= 0.005) { node.style.setProperty("--fx-tint", tint || ""); extra?.(node); }
      };
      // шов спуска/подъёма: полоса (поверхность воды, облачный слой) на линии стыка
      const sm = j > 0 ? scenes[j].seam : undefined;
      setFx(fx.seam, T === "descend" || T === "ascend" ? Math.min(1, Math.sin(Math.PI * tj) * (sm?.o ?? 1.15)) : 0, (s) => {
        const y = T === "descend" ? (1 - E(tj)) * 100 : E(tj) * 100;
        s.style.height = `${sm?.h ?? 46}vh`;
        s.style.transform = `translate3d(0, calc(${y.toFixed(2)}vh - 50%), 0)`;
      });
      // луч: светящаяся полоса ведёт кромку раскрытия новой сцены
      setFx(fx.beam, T === "sweep" ? Math.sin(Math.PI * tj) : 0, (b) => { b.style.left = `${(E(tj) * 140 - 20).toFixed(2)}%`; });
      // вспышка смены света
      setFx(fx.bloom, T === "lightshift" ? Math.sin(Math.PI * tj) * 0.85 : 0);
      // окклюзия: вуаль цвета силуэта закрывает щели на пике перекрытия
      setFx(fx.occ, T === "occlude" ? E(win(tj, 0.3, 0.46)) * (1 - E(win(tj, 0.58, 0.74))) : 0);
    });
    return () => { unsub(); useLenisInClock(null); lenis.destroy(); removeEventListener("pointermove", onMove); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return (
    <div className={`rl ${className}`} ref={ref}>
      <div className="rl-reel" style={{ height: `calc(${total * unit}vh + 100vh)` }}>
        {marks.map(([k, u]) => (
          <i key={k} className="rl-mark" data-reel-mark={k} style={{ top: `calc(${(u * unit).toFixed(2)}vh + 50vh)` }} aria-hidden />
        ))}
        <div className="rl-reel-stage">
          {scenes.map((s, i) => {
            const tin = s.into ?? "rise";
            return (
              <section key={s.id} className={`rl-scene ${s.dark ? "rl-dark" : ""}`} style={{ zIndex: i + 1, ["--rl-tint" as string]: s.tint, ...(s.fgMask ? { ["--rl-fg-a" as string]: `${s.fgMask[0]}%`, ["--rl-fg-b" as string]: `${s.fgMask[1]}%` } : {}) }} data-scene={s.id} data-into={i > 0 ? tin : undefined}>
                <div className="rl-world">
                  <div className="rl-bg" style={{ backgroundImage: `url(${s.bg})`, backgroundPosition: s.bgPos }} aria-hidden />
                  <div className="rl-haze" aria-hidden />
                  {s.mid && <div className="rl-mid" aria-hidden><span className="rl-shadow" /><img src={s.mid} alt="" decoding="async" style={{ objectPosition: s.midPos }} /></div>}
                  {s.fg && <div className="rl-fg" aria-hidden><img src={s.fg} alt="" decoding="async" /></div>}
                  {s.spark ? Array.from({ length: s.spark }, (_, k) => <span key={k} className={`rl-fly rl-fly-${(k % 5) + 1}`} aria-hidden />) : null}
                </div>
                {i > 0 && tin === "rise" && <div className="rl-mist" aria-hidden />}
                {s.freeze != null && <div className="rl-freeze">{s.freeze}</div>}
                {s.copy != null && <div className="rl-copy">{s.copy}</div>}
              </section>
            );
          })}
          {scenes.some((s, i) => i > 0 && needs(s.into, "descend", "ascend")) && <div className="rl-fx rl-fx-seam" aria-hidden />}
          {scenes.some((s, i) => i > 0 && s.into === "sweep") && <div className="rl-fx rl-fx-beam" aria-hidden />}
          {scenes.some((s, i) => i > 0 && s.into === "lightshift") && <div className="rl-fx rl-fx-bloom" aria-hidden />}
          {scenes.some((s, i) => i > 0 && s.into === "occlude") && <div className="rl-fx rl-fx-occ" aria-hidden />}
          {cue && <div className="rl-cue" aria-hidden>{cue}</div>}
        </div>
      </div>
    </div>
  );
}
