/* SCENE-KIT · единые часы страницы.
   ОДИН requestAnimationFrame на всю страницу: если сайт использует Lenis, он регистрирует его здесь,
   и часы сначала продвигают Lenis, потом читают scrollY и раздают кадр подписчикам по порядку
   (рил → актёры → погода → атмосфера). Так все слои видят ОДНУ и ту же позицию скролла в кадре —
   без дрожи «актёр отстаёт от сцены на кадр». */

export type Frame = {
  /** scrollY после продвижения Lenis */
  y: number;
  /** сглаженная скорость скролла, px/кадр (вниз > 0) */
  vy: number;
  vw: number;
  vh: number;
  /** время rAF, мс */
  t: number;
  /** шаг кадра, мс (ограничен 50) */
  dt: number;
  /** prefers-reduced-motion */
  reduced: boolean;
};

type Sub = (f: Frame) => void;
type LenisLike = { raf: (t: number) => void };

const subs = new Set<Sub>();
let raf = 0;
let lastY = 0;
let lastT = 0;
let vy = 0;
let lenis: LenisLike | null = null;
let reducedMq: MediaQueryList | null = null;

function loop(t: number) {
  if (lenis) lenis.raf(t);
  const y = window.scrollY;
  const dt = lastT ? Math.min(50, t - lastT) : 16.7;
  lastT = t;
  const dy = y - lastY;
  lastY = y;
  vy += (dy - vy) * 0.18;
  if (Math.abs(vy) < 0.01) vy = 0;
  const f: Frame = { y, vy, vw: window.innerWidth, vh: window.innerHeight, t, dt, reduced: !!reducedMq?.matches };
  subs.forEach((fn) => fn(f));
  raf = requestAnimationFrame(loop);
}

/** Подписка на кадр. Возвращает отписку. Первый подписчик запускает цикл, последний — останавливает. */
export function subscribe(fn: Sub): () => void {
  subs.add(fn);
  if (!raf) {
    reducedMq = matchMedia("(prefers-reduced-motion: reduce)");
    lastY = window.scrollY;
    lastT = 0;
    raf = requestAnimationFrame(loop);
  }
  return () => {
    subs.delete(fn);
    if (!subs.size && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };
}

/** Рил регистрирует свой Lenis — часы будут крутить его первым делом в каждом кадре. */
export function useLenisInClock(l: LenisLike | null) {
  lenis = l;
}

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/** плавный шаг 0→1 */
export const smooth = (t: number) => {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
};
/** окно [a,b] → 0..1 */
export const win = (v: number, a: number, b: number) => clamp01((v - a) / Math.max(1e-6, b - a));
