/* SCENE-KIT · движок браузера.
   WebKit — Safari и ВСЕ браузеры iOS (Chrome/Firefox/Edge на iPhone тоже WebKit). Он считает CSS/SVG-фильтры на CPU
   и перерисовывает их при движении слоя, поэтому часть дорогих украшений там упрощается. Первый вызов ставит
   <html data-engine="webkit"> — CSS сайтов может сказать `[data-engine="webkit"] …`. */
let wk: boolean | null = null;

export function isWebKit(): boolean {
  if (wk == null) {
    const ua = navigator.userAgent;
    wk = /AppleWebKit/.test(ua) && (!/Chrome|Chromium|Edg|OPR/.test(ua) || /CriOS|FxiOS|EdgiOS/.test(ua));
    if (wk) document.documentElement.dataset.engine = "webkit";
  }
  return wk;
}
