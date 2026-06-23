export const i18n = {
  ru: {
    appName: "Site Builder",
    appSubtitle: "Редактор HTML-шаблонов",
    sourceTitle: "Источник",
    mvpBadge: "MVP",
    htmlFile: "HTML файл",
    cssFile: "CSS файл",
    jsFile: "JavaScript файл",
    loadFiles: "Загрузить",
    loadDemo: "Демо",
    blocksTitle: "Блоки",
    fieldsTitle: "Поля блока",
    outlineTitle: "Структура",
    aiCommandTitle: "AI-команда",
    draft: "draft",
    copyAiContext: "Скопировать контекст",
    emptyFields: "Выберите блок. Если у шаблона есть data-field, здесь появятся понятные поля для редактирования.",
    emptyBlocks: "В шаблоне нет элементов с data-block. Добавьте data-block к секциям, чтобы Builder мог распознать структуру.",
    aiTitle: "AI",
    manifest: "manifest",
    aiStub: "Генерация и голосовой бриф",
    qualityTitle: "Production score",
    tokensTitle: "Дизайн-система",
    emptyTokens: "CSS variables не найдены. На следующих этапах Builder сможет предложить токены автоматически.",
    scale: "Масштаб",
    saveJson: "Сохранить JSON",
    loadJson: "Открыть JSON",
    inspectorTitle: "Настройки",
    nothingSelected: "ничего",
    emptyInspector: "Выберите блок или элемент прямо в превью.",
    elementLabel: "Название",
    textLabel: "Текст",
    imageLabel: "Изображение",
    textColor: "Цвет текста",
    background: "Фон",
    fontSize: "Размер текста",
    padding: "Внутренний отступ",
    radius: "Скругление",
    visibility: "Показ",
    visible: "Виден",
    hidden: "Скрыт",
    breakpoint: "Режим",
    projectTitle: "Проект",
    ready: "готов",
    htmlStatus: "HTML",
    cssStatus: "CSS",
    jsStatus: "JS",
  },
  en: {
    appName: "Site Builder",
    appSubtitle: "HTML template editor",
    sourceTitle: "Source",
    mvpBadge: "MVP",
    htmlFile: "HTML file",
    cssFile: "CSS file",
    jsFile: "JavaScript file",
    loadFiles: "Load",
    loadDemo: "Demo",
    blocksTitle: "Blocks",
    fieldsTitle: "Block fields",
    outlineTitle: "Structure",
    aiCommandTitle: "AI command",
    draft: "draft",
    copyAiContext: "Copy context",
    emptyFields: "Select a block. If the template has data-field attributes, semantic editable fields will appear here.",
    emptyBlocks: "No data-block elements were found. Add data-block to sections so Builder can detect the page structure.",
    aiTitle: "AI",
    manifest: "manifest",
    aiStub: "Generation and voice brief",
    qualityTitle: "Production score",
    tokensTitle: "Design system",
    emptyTokens: "No CSS variables found. Builder will be able to suggest tokens automatically in later stages.",
    scale: "Scale",
    saveJson: "Save JSON",
    loadJson: "Open JSON",
    inspectorTitle: "Inspector",
    nothingSelected: "none",
    emptyInspector: "Select a block or element in the preview.",
    elementLabel: "Label",
    textLabel: "Text",
    imageLabel: "Image",
    textColor: "Text color",
    background: "Background",
    fontSize: "Font size",
    padding: "Padding",
    radius: "Radius",
    visibility: "Display",
    visible: "Visible",
    hidden: "Hidden",
    breakpoint: "Mode",
    projectTitle: "Project",
    ready: "ready",
    htmlStatus: "HTML",
    cssStatus: "CSS",
    jsStatus: "JS",
  },
};

export const demoProject = {
  name: "demo-project",
  html: `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Demo landing</title>
  </head>
  <body>
    <main>
      <section class="hero" data-block="hero">
        <div class="hero__content">
          <p class="eyebrow" data-field="eyebrow">AI website studio</p>
          <h1 data-field="title">Соберите сайт, который можно редактировать без кода</h1>
          <p data-field="subtitle">Блоки размечены data-block, а текст, изображения и стили доступны в правой панели.</p>
          <a class="button" href="#features" data-field="primaryAction">Посмотреть возможности</a>
        </div>
        <img data-field="image" src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80" alt="Рабочее пространство" />
      </section>
      <section class="features" id="features" data-block="features">
        <article>
          <h2 data-field="featureTitle">Быстрый старт</h2>
          <p data-field="featureText">Загрузите HTML, CSS и JS, затем редактируйте результат в визуальном превью.</p>
        </article>
        <article>
          <h2 data-field="featureTitle">Адаптивность</h2>
          <p data-field="featureText">Переключайтесь между desktop, tablet и mobile, чтобы проверять состояние сайта.</p>
        </article>
        <article>
          <h2 data-field="featureTitle">JSON проекта</h2>
          <p data-field="featureText">Первая версия сохраняет состояние проекта в JSON для следующей загрузки.</p>
        </article>
      </section>
      <section class="cta" data-block="cta">
        <h2 data-field="title">Готово для следующей итерации</h2>
        <p data-field="subtitle">Позже сюда можно добавить экспорт, шаблоны, голосовой бриф и AI-генерацию.</p>
      </section>
    </main>
  </body>
</html>`,
  css: `:root {
  --ink: #111827;
  --muted: #5f6878;
  --accent: #2563eb;
  --soft: #f0f5ff;
}
* { box-sizing: border-box; }
body {
  margin: 0;
  color: var(--ink);
  font-family: Inter, system-ui, sans-serif;
  background: #ffffff;
}
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 44%);
  gap: 32px;
  align-items: center;
  min-height: 720px;
  padding: 72px;
  background: linear-gradient(135deg, #f7f9ff, #ffffff 58%, #eaf1ff);
}
.hero h1 {
  max-width: 780px;
  margin: 0;
  font-size: clamp(42px, 7vw, 92px);
  line-height: .95;
  letter-spacing: 0;
}
.hero p {
  max-width: 620px;
  color: var(--muted);
  font-size: 20px;
  line-height: 1.55;
}
.eyebrow {
  color: var(--accent);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: .08em;
}
.button {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  padding: 0 20px;
  border-radius: 8px;
  color: white;
  background: var(--accent);
  text-decoration: none;
  font-weight: 800;
}
.hero img {
  width: 100%;
  aspect-ratio: 4 / 5;
  border-radius: 22px;
  object-fit: cover;
  box-shadow: 0 28px 80px rgba(37,99,235,.2);
}
.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  padding: 42px 72px;
}
.features article, .cta {
  border: 1px solid #dce5f5;
  border-radius: 12px;
  background: #fff;
  padding: 28px;
}
.features p, .cta p { color: var(--muted); line-height: 1.6; }
.cta {
  margin: 0 72px 72px;
  background: var(--soft);
}
@media (max-width: 760px) {
  .hero, .features {
    grid-template-columns: 1fr;
    padding: 28px;
  }
  .hero { min-height: auto; }
  .cta { margin: 0 28px 28px; }
}`,
  js: `document.querySelectorAll('.button').forEach((button) => {
  button.addEventListener('click', () => {
    button.textContent = 'Выбрано';
  });
});`,
  files: { html: "demo.html", css: "demo.css", js: "demo.js" },
  edits: [],
};
