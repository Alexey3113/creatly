/**
 * Тест свопа медиа-тегов в fill.ts: mp4 в img-слоте -> <video>, картинка
 * в video-слоте -> <img>. Запуск: npx tsx --tsconfig tsconfig.json scripts/media-swap-test.ts
 */
import { fillFields } from "@/lib/site/fill";

let passed = 0;
let failed = 0;
function check(name: string, cond: boolean, detail = "") {
  if (cond) { passed++; console.log(`  ✓ ${name}`); }
  else { failed++; console.log(`  ✗ ${name}${detail ? ` — ${detail}` : ""}`); }
}

function main() {
  // img-слот получает видео
  const imgTpl = `<div><img class="b-hp01__media" data-field="hp01-media" src="https://x/photo.jpg" alt="" /><p data-field="hp01-title">t</p></div>`;
  const v = fillFields(imgTpl, { "hp01-media": "/uploads/1/car.mp4", "hp01-title": "Заголовок" });
  check("img -> video", v.includes("<video") && !v.includes("<img"));
  check("класс сохранён", v.includes(`class="b-hp01__media"`));
  check("src = mp4", v.includes(`src="/uploads/1/car.mp4"`));
  check("autoplay muted loop playsinline", ["autoplay", "muted", "loop", "playsinline"].every((a) => v.includes(a)));
  check("закрывающий </video>", v.includes("</video>"));
  check("alt удалён", !v.includes("alt="));
  check("текстовое поле не пострадало", v.includes(">Заголовок</p>"));

  // img-слот получает обычную картинку — как раньше
  const p = fillFields(imgTpl, { "hp01-media": "/uploads/1/photo.webp" });
  check("картинка остаётся <img>", p.includes(`<img class="b-hp01__media"`) && p.includes(`src="/uploads/1/photo.webp"`));

  // video-слот получает картинку
  const vidTpl = `<section><video class="b-sv__vid" data-field="sv-media" src="/assets/demo/a.mp4" autoplay muted loop playsinline preload="metadata"><source src="/a.mp4" /></video></section>`;
  const i = fillFields(vidTpl, { "sv-media": "https://images.unsplash.com/photo-1?auto=format" });
  check("video -> img", i.includes("<img") && !i.includes("<video"));
  check("video-атрибуты удалены", !/(autoplay|muted|loop|playsinline|preload)/.test(i));
  check("source-дети отброшены", !i.includes("<source"));
  check("src = картинка", i.includes(`src="https://images.unsplash.com/photo-1?auto=format"`));

  // video-слот получает видео — как раньше
  const vv = fillFields(vidTpl, { "sv-media": "/uploads/1/new.mp4" });
  check("видео остаётся <video>", vv.includes("<video") && vv.includes(`src="/uploads/1/new.mp4"`));

  console.log(`\n${passed} passed, ${failed} failed`);
  if (failed > 0) process.exit(1);
}
main();
