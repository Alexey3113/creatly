export function extractTokens(css = "") {
  const tokens = {};
  const matches = css.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g);
  for (const match of matches) {
    const name = match[1];
    const value = match[2].trim();
    if (/^#([0-9a-f]{3,8})$/i.test(value) || /^rgba?\(/i.test(value)) {
      tokens[name] = value;
    }
  }
  return tokens;
}

export function evaluateQuality({ blocks, elements, fields, project }) {
  const checks = [];
  const blockCount = blocks.length;
  const editableCount = elements.filter((item) => item.type !== "block").length;
  const fieldCount = fields.length;
  const imageCount = elements.filter((item) => item.type === "image").length;
  const imagesWithAlt = elements.filter((item) => item.type === "image" && item.alt).length;
  const tokenCount = Object.keys(project.tokens || extractTokens(project.css)).length;

  checks.push({
    level: blockCount ? "good" : "bad",
    title: blockCount ? `${blockCount} data-block` : "Нет data-block",
    detail: blockCount ? "Структура страницы распознана." : "AI и визуальный редактор не смогут безопасно работать без блоков.",
    points: blockCount ? 20 : 0,
  });
  checks.push({
    level: fieldCount >= Math.max(3, Math.round(editableCount * 0.25)) ? "good" : "warn",
    title: `${fieldCount} semantic fields`,
    detail: "data-field превращает DOM в понятные поля: title, subtitle, image, action.",
    points: editableCount ? Math.min(25, Math.round((fieldCount / editableCount) * 60)) : 0,
  });
  checks.push({
    level: !imageCount || imagesWithAlt === imageCount ? "good" : "warn",
    title: `${imagesWithAlt}/${imageCount} image alt`,
    detail: "Alt-тексты нужны для SEO, accessibility и AI-понимания медиа.",
    points: imageCount ? Math.round((imagesWithAlt / imageCount) * 20) : 20,
  });
  checks.push({
    level: tokenCount ? "good" : "warn",
    title: `${tokenCount} design tokens`,
    detail: "CSS variables позволяют менять стиль сайта глобально и безопасно.",
    points: tokenCount ? 20 : 5,
  });
  checks.push({
    level: project.js ? "good" : "warn",
    title: project.js ? "JS подключен" : "JS не загружен",
    detail: "Интерактивность шаблона можно проверять прямо в превью.",
    points: project.js ? 15 : 8,
  });

  return { score: Math.min(100, checks.reduce((sum, check) => sum + check.points, 0)), checks };
}

export function createManifest({ project, blocks, fields, quality }) {
  return {
    version: 1,
    project: project.name,
    blocks: blocks.map((block) => ({
      id: block.id,
      type: block.label,
      fields: fields
        .filter((field) => field.blockId === block.id)
        .map((field) => ({
          id: field.id,
          field: field.field,
          tag: field.tag,
          kind: field.type,
          text: field.text,
          src: field.src,
        })),
    })),
    designTokens: project.tokens || {},
    quality,
  };
}
