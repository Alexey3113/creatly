/* SCENE-KIT · якоря. Путь любого сквозного слоя (актёр, атмосфера, бэкдроп) задаётся ЯКОРЯМИ —
   элементами страницы в порядке документа. Якорь «активен», когда его центр (или точка anchor по высоте)
   проходит линию вьюпорта (по умолчанию середину экрана). Между двумя соседними якорями — интерполяция.
   Метод не зависит от длины страницы и переживает ресайз: считаем по getBoundingClientRect каждый кадр.
   Внутри sticky-контейнеров якоря НЕ ставим (их rect не движется) — для рила есть маркеры data-reel-mark. */

export type Seg = { a: number; b: number; t: number };

/**
 * @param els    элементы якорей (null — пропуск)
 * @param anchors доля высоты элемента, которая должна совпасть с линией вьюпорта (0.5 = центр)
 * @param line   линия вьюпорта в долях высоты (0.5 = середина экрана)
 */
export function segment(els: (Element | null)[], vh: number, anchors?: number[], line = 0.5): Seg | null {
  let prevI = -1;
  let prevD = 0;
  let first = -1;
  let last = -1;
  for (let i = 0; i < els.length; i++) {
    const el = els[i];
    if (!el) continue;
    const r = el.getBoundingClientRect();
    const d = r.top + r.height * (anchors?.[i] ?? 0.5) - vh * line;
    if (first < 0) {
      first = i;
      if (d >= 0) return { a: i, b: i, t: 0 };
    }
    if (prevI >= 0 && prevD <= 0 && d > 0) {
      return { a: prevI, b: i, t: -prevD / Math.max(1e-6, d - prevD) };
    }
    prevI = i;
    prevD = d;
    last = i;
  }
  if (last < 0) return null;
  return { a: last, b: last, t: 0 };
}

/** Кэш элементов по селекторам с ленивым перезапросом (элементы могут появиться позже). */
export function selectorCache(selectors: string[]) {
  let els: (Element | null)[] = selectors.map((s) => document.querySelector(s));
  let tick = 0;
  return () => {
    if (els.some((e) => !e || !e.isConnected) && tick++ % 20 === 0) els = selectors.map((s) => document.querySelector(s));
    return els;
  };
}

/** hex/rgb → [r,g,b] */
export function parseColor(c: string): [number, number, number] {
  const s = c.trim();
  if (s.startsWith("#")) {
    const h = s.length === 4 ? s.slice(1).split("").map((x) => x + x).join("") : s.slice(1, 7);
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  const m = s.match(/(\d+(?:\.\d+)?)[ ,]+(\d+(?:\.\d+)?)[ ,]+(\d+(?:\.\d+)?)/);
  return m ? [+m[1], +m[2], +m[3]] : [0, 0, 0];
}

export function mixColor(a: [number, number, number], b: [number, number, number], t: number): string {
  const r = Math.round(a[0] + (b[0] - a[0]) * t);
  const g = Math.round(a[1] + (b[1] - a[1]) * t);
  const bl = Math.round(a[2] + (b[2] - a[2]) * t);
  return `rgb(${r} ${g} ${bl})`;
}
