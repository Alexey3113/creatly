import type { BuilderItem } from "@/lib/builder/types";

interface BlockListProps {
  blocks: BuilderItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function BlockList({ blocks, selectedId, onSelect }: BlockListProps) {
  if (!blocks.length) {
    return (
      <div className="empty-state" id="emptyBlocks" data-i18n="emptyBlocks">
        В шаблоне нет элементов с data-block. Добавьте data-block к секциям, чтобы Builder мог распознать структуру.
      </div>
    );
  }

  return (
    <div className="block-list" id="blockList">
      {blocks.map((block) => (
        <button
          className={`block-item${block.id === selectedId ? " is-active" : ""}`}
          key={block.id}
          type="button"
          onClick={() => onSelect(block.id)}
        >
          <strong>{block.label}</strong>
          <small>{block.tag} · {block.text || block.path}</small>
        </button>
      ))}
    </div>
  );
}
