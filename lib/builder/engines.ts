import type { BuilderItem, BuilderProject, QualityCheck, QualityReport } from "./types";

export function extractTokens(css: string): Record<string, string> {
  const tokens: Record<string, string> = {};
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

export function evaluateQuality(
  blocks: BuilderItem[],
  elements: BuilderItem[],
  fields: BuilderItem[],
  project: BuilderProject,
): QualityReport {
  const checks: QualityCheck[] = [];
  const blockCount = blocks.length;
  const editableCount = elements.filter((i) => i.type !== "block").length;
  const fieldCount = fields.length;
  const imageCount = elements.filter((i) => i.type === "image").length;
  const imagesWithAlt = elements.filter((i) => i.type === "image" && i.alt).length;
  const tokenCount = Object.keys(project.tokens || extractTokens(project.css)).length;

  checks.push({
    level: blockCount ? "good" : "bad",
    title: blockCount ? `${blockCount} data-block` : "Нет data-block",
    detail: blockCount ? "Структура страницы распознана." : "Без data-block редактор не может распознать структуру.",
    points: blockCount ? 20 : 0,
  });
  checks.push({
    level: fieldCount >= Math.max(3, Math.round(editableCount * 0.25)) ? "good" : "warn",
    title: `${fieldCount} semantic fields`,
    detail: "data-field превращает DOM в понятные поля для редактирования.",
    points: editableCount ? Math.min(25, Math.round((fieldCount / editableCount) * 60)) : 0,
  });
  checks.push({
    level: !imageCount || imagesWithAlt === imageCount ? "good" : "warn",
    title: `${imagesWithAlt}/${imageCount} image alt`,
    detail: "Alt-тексты нужны для SEO и accessibility.",
    points: imageCount ? Math.round((imagesWithAlt / imageCount) * 20) : 20,
  });
  checks.push({
    level: tokenCount ? "good" : "warn",
    title: `${tokenCount} design tokens`,
    detail: "CSS variables для глобальной настройки стиля.",
    points: tokenCount ? 20 : 5,
  });
  checks.push({
    level: project.js ? "good" : "warn",
    title: project.js ? "JS подключен" : "JS не загружен",
    detail: "Интерактивность шаблона в превью.",
    points: project.js ? 15 : 8,
  });

  return { score: Math.min(100, checks.reduce((sum, c) => sum + c.points, 0)), checks };
}
