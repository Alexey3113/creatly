"use client";

import { useEffect, useRef, useState } from "react";
import type { BuilderItem } from "@/lib/builder/types";
import { blockPresets } from "@/lib/builder/block-library";

export interface CommandAction {
  id: string;
  label: string;
  category: string;
  shortcut?: string;
  action: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  elements: BuilderItem[];
  actions: CommandAction[];
  onSelectElement: (id: string) => void;
}

export function CommandPalette({ open, onClose, elements, actions, onSelectElement }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const q = query.toLowerCase().trim();

  const matchedActions = q
    ? actions.filter((a) => a.label.toLowerCase().includes(q) || a.category.toLowerCase().includes(q))
    : actions;

  const matchedElements = q
    ? elements.filter((el) =>
        el.label.toLowerCase().includes(q) ||
        el.text.toLowerCase().includes(q) ||
        el.tag.toLowerCase().includes(q) ||
        el.field.toLowerCase().includes(q)
      ).slice(0, 8)
    : [];

  const matchedBlocks = q
    ? blockPresets.filter((b) => b.name.toLowerCase().includes(q)).slice(0, 4)
    : [];

  const allResults = [
    ...matchedActions.map((a) => ({ type: "action" as const, item: a })),
    ...matchedElements.map((el) => ({ type: "element" as const, item: el })),
    ...matchedBlocks.map((b) => ({ type: "block" as const, item: b })),
  ];

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  function execute(index: number) {
    const result = allResults[index];
    if (!result) return;
    if (result.type === "action") result.item.action();
    if (result.type === "element") onSelectElement(result.item.id);
    if (result.type === "block") {
      const act = actions.find((a) => a.id === `insert-block-${result.item.id}`);
      if (act) act.action();
    }
    onClose();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIndex((i) => Math.min(i + 1, allResults.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIndex((i) => Math.max(i - 1, 0)); }
    if (e.key === "Enter") { e.preventDefault(); execute(selectedIndex); }
    if (e.key === "Escape") onClose();
  }

  if (!open) return null;

  return (
    <div className="cmd-backdrop" onClick={onClose}>
      <div className="cmd-palette" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          className="cmd-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Поиск действий, элементов, блоков..."
        />
        <div className="cmd-results">
          {matchedActions.length > 0 && (
            <div className="cmd-group">
              <div className="cmd-group__label">Действия</div>
              {matchedActions.map((a, i) => (
                <button
                  key={a.id}
                  className={`cmd-item${selectedIndex === i ? " is-active" : ""}`}
                  type="button"
                  onClick={() => execute(i)}
                  onMouseEnter={() => setSelectedIndex(i)}
                >
                  <span>{a.label}</span>
                  {a.shortcut && <kbd>{a.shortcut}</kbd>}
                </button>
              ))}
            </div>
          )}
          {matchedElements.length > 0 && (
            <div className="cmd-group">
              <div className="cmd-group__label">Элементы</div>
              {matchedElements.map((el, idx) => {
                const i = matchedActions.length + idx;
                return (
                  <button
                    key={el.id}
                    className={`cmd-item${selectedIndex === i ? " is-active" : ""}`}
                    type="button"
                    onClick={() => execute(i)}
                    onMouseEnter={() => setSelectedIndex(i)}
                  >
                    <span><strong>{el.label || el.field || el.tag}</strong> <small>{el.text.slice(0, 40)}</small></span>
                    <kbd>{el.tag}</kbd>
                  </button>
                );
              })}
            </div>
          )}
          {matchedBlocks.length > 0 && (
            <div className="cmd-group">
              <div className="cmd-group__label">Вставить блок</div>
              {matchedBlocks.map((b, idx) => {
                const i = matchedActions.length + matchedElements.length + idx;
                return (
                  <button
                    key={b.id}
                    className={`cmd-item${selectedIndex === i ? " is-active" : ""}`}
                    type="button"
                    onClick={() => execute(i)}
                    onMouseEnter={() => setSelectedIndex(i)}
                  >
                    <span>{b.name}</span>
                    <kbd>+ блок</kbd>
                  </button>
                );
              })}
            </div>
          )}
          {allResults.length === 0 && (
            <div className="cmd-empty">Ничего не найдено</div>
          )}
        </div>
      </div>
    </div>
  );
}
