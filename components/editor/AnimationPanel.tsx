"use client";

import { useState } from "react";
import { animationPresets, animationCategories, type AnimationPreset } from "@/lib/builder/animations";

interface AnimationPanelProps {
  selectedId: string | null;
  appliedAnimations: Record<string, string>;
  onApply: (elementId: string, presetId: string) => void;
  onRemove: (elementId: string) => void;
}

export function AnimationPanel({ selectedId, appliedAnimations, onApply, onRemove }: AnimationPanelProps) {
  const [cat, setCat] = useState<string>("entrance");
  const filtered = animationPresets.filter((a) => a.category === cat);
  const currentAnim = selectedId ? appliedAnimations[selectedId] : null;

  return (
    <div className="animation-panel">
      <div className="block-library__cats">
        {animationCategories.map((c) => (
          <button
            key={c.id}
            className={`block-library__cat${cat === c.id ? " is-active" : ""}`}
            type="button"
            onClick={() => setCat(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {!selectedId ? (
        <div className="empty-state">Выберите элемент для добавления анимации.</div>
      ) : (
        <>
          {currentAnim && (
            <div className="animation-current">
              <span>Текущая: <strong>{animationPresets.find((a) => a.id === currentAnim)?.name || currentAnim}</strong></span>
              <button className="button" type="button" onClick={() => onRemove(selectedId)}>Убрать</button>
            </div>
          )}
          <div className="block-library__list">
            {filtered.map((preset) => (
              <button
                key={preset.id}
                className={`block-library__item${currentAnim === preset.id ? " is-active-anim" : ""}`}
                type="button"
                onClick={() => onApply(selectedId, preset.id)}
              >
                <strong>{preset.name}</strong>
                <small>{preset.trigger === "scroll" ? "при скролле" : preset.trigger === "hover" ? "при наведении" : "постоянно"}</small>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
