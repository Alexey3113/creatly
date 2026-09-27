# analitic/audit — инструменты аудита визуальной архитектуры (2026-09-28)

Отчёт: `docs/audit/AUDIT-2026-09.md`. Здесь — воспроизводимые инструменты и сырые данные.

- `tools/mkjobs.mjs out.json` — список всех 182 страниц (семья, id, url, режим scroll|deck).
- `tools/cap.mjs jobs.json [id|fam…]` — раскадровка: headless Chrome (`channel:"chrome"` = GPU Metal + H.264),
  1440×900, кадр каждые ~0.55 экрана (deck: сцена в покое + кадр через 330 мс после жеста) + meta.json
  (длина, sticky/fixed, видео/canvas, битые картинки, ошибки, 4xx). ENV: OUT, CONC, FORCE. Резюмируемый.
- `tools/sheet.mjs [fam|id…]` — контакт-листы `frames/<fam>/<id>/sheet.jpg` и «стены» `walls/<fam>-<hero|q1|mid|q3>-N.jpg`.
- `tools/metrics.mjs [-v]` — покрытие кадра изображением (пустой кадр: cov<0.03), где кончается кино → `metrics.json`.
- `tools/fontall.mjs jobs.json out.json` — какие font-family реально зарегистрированы/загружены на каждой странице → `fonts.json`.

Нужны: node 22, dev-сервер на :3011 (`npx next dev -p 3011`). Кадры (`frames/`) в git не входят (медиа).
