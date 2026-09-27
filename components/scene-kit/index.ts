/* SCENE-KIT — сквозная визуальная архитектура (docs/audit/VISUAL-ARCHITECTURE.md).
   Примитивы, общие для всех семейств сайтов: часы страницы, актёр, погода, атмосфера, бэкдроп. */
export { subscribe, useLenisInClock, clamp01, lerp, smooth, win, type Frame } from "./clock";
export { segment, selectorCache, parseColor, mixColor } from "./anchors";
export { Actor, type ActorPose, type ActorStop } from "./Actor";
export { Weather, type WeatherKind } from "./Weather";
export { Atmosphere, Backdrop, type AtmStop, type Plate } from "./Atmosphere";
