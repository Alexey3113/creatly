"use client";

import { useState, useRef } from "react";
import { templates, categories, type TemplateInfo } from "@/lib/builder/templates";

interface TemplateGalleryProps {
  onSelect: (templateId: string) => void;
  onUpload: () => void;
  onAIGenerate: (templateId: string) => void;
}

function TemplateCard({ template, onSelect, onAI, onHover, isHovered }: {
  template: TemplateInfo;
  onSelect: () => void;
  onAI: () => void;
  onHover: (hovered: boolean) => void;
  isHovered: boolean;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const basePath = template.id === "1" ? "/examples/" : `/examples/${template.id}/`;

  return (
    <div
      className={`gallery-card${isHovered ? " is-hovered" : ""}`}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onClick={onSelect}
    >
      <div className="gallery-card__preview">
        <iframe
          ref={iframeRef}
          src={`${basePath}index.html`}
          title={template.title}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
        />
        <div className="gallery-card__overlay">
          <button className="gallery-card__cta" type="button" onClick={(e) => { e.stopPropagation(); onSelect(); }}>
            Использовать шаблон
          </button>
          <button className="gallery-card__cta gallery-card__cta--ai" type="button" onClick={(e) => { e.stopPropagation(); onAI(); }}>
            Создать с AI
          </button>
        </div>
      </div>
      <div className="gallery-card__info">
        <div className="gallery-card__badge" style={{ background: template.color }} />
        <div>
          <strong>{template.title}</strong>
          <span>{template.description}</span>
        </div>
      </div>
    </div>
  );
}

export function TemplateGallery({ onSelect, onUpload, onAIGenerate }: TemplateGalleryProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = activeCategory === "all"
    ? templates
    : templates.filter((t) => t.category === activeCategory);

  return (
    <div className="gallery">
      <header className="gallery__header">
        <div className="gallery__brand">
          <span className="brand__mark">B</span>
          <div>
            <strong>Creatly</strong>
            <small>Выберите шаблон или загрузите свой</small>
          </div>
        </div>
        <button className="button button--primary" type="button" onClick={onUpload}>
          Загрузить свои файлы
        </button>
      </header>

      <div className="gallery__hero">
        <h1>Создайте сайт за минуты</h1>
        <p>Выберите шаблон, настройте под себя, экспортируйте чистый код.</p>
        <button className="button button--primary gallery__scratch" type="button" onClick={() => onAIGenerate("none")}>
          ✨ Создать с AI с нуля — без шаблона
        </button>
      </div>

      <nav className="gallery__categories">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`gallery__cat${activeCategory === cat.id ? " is-active" : ""}`}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      <div className="gallery__grid">
        {filtered.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onSelect={() => onSelect(template.id)}
            onAI={() => onAIGenerate(template.id)}
            onHover={(h) => setHoveredId(h ? template.id : null)}
            isHovered={hoveredId === template.id}
          />
        ))}
      </div>
    </div>
  );
}
