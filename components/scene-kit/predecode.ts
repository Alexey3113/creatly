/* SCENE-KIT · заранее декодировать картинки.
   WebKit (Safari, все браузеры iOS) декодирует картинку в момент ПЕРВОЙ ОТРИСОВКИ — синхронно, в главном потоке,
   и сбрасывает декодированное у картинок, ушедших с экрана. Полноэкранная плита 2000 px или вырезка 1856×2304 —
   это 40–70 мс, то есть рывок прокрутки ровно тогда, когда картинка въезжает в кадр (и так при каждом проходе).
   `img.decode()` делает то же самое асинхронно, вне главного потока, и кладёт результат в общий для URL кэш —
   им пользуются и <img>, и CSS-фоны. Поэтому картинки, до которых осталось около экрана прокрутки, декодируются
   заранее. В Chrome декодирование и так вне главного потока — там это просто безвредно. */
import { useEffect, type RefObject } from "react";

const pool = new Map<string, HTMLImageElement>();

/** декодировать картинку по URL (для CSS-фонов и слоёв, которых ещё нет в раскладке) */
export function predecode(src: string) {
  let im = pool.get(src);
  if (!im) {
    im = new Image();
    im.decoding = "async";
    im.src = src;
    pool.set(src, im);
  }
  im.decode().catch(() => {});
}

/** картинки `selector` внутри root декодируются, когда до них остаётся `margin` прокрутки (и снова — при каждом
    возвращении). Не для слоёв, которые включаются display'ем в момент показа (сцены рила): decode() в тот же кадр,
    что и первая отрисовка, в WebKit дороже, чем без него, — такие слои декодирует их владелец заранее (predecode). */
export function usePredecode(root: RefObject<HTMLElement | null>, selector = "img", margin = "150% 0px") {
  useEffect(() => {
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((es) => {
      for (const e of es) if (e.isIntersecting) (e.target as HTMLImageElement).decode().catch(() => {});
    }, { rootMargin: margin });
    el.querySelectorAll(selector).forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, [root, selector, margin]);
}
