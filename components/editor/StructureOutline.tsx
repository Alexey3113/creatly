import type { BuilderItem } from "@/lib/builder/types";

interface StructureOutlineProps {
  blocks: BuilderItem[];
  fields: BuilderItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function StructureOutline({ blocks, fields, selectedId, onSelect }: StructureOutlineProps) {
  return (
    <div className="outline-list" id="outlineList">
      {blocks.map((block) => {
        const blockFields = fields.filter((field) => field.blockId === block.id);
        return (
          <div className="outline-block" key={block.id}>
            <button
              className={block.id === selectedId ? "is-active" : ""}
              type="button"
              onClick={() => onSelect(block.id)}
            >
              <strong>{block.label}</strong>
              <span>{blockFields.length} fields</span>
            </button>
            {blockFields.map((field) => (
              <button
                className={`outline-field${field.id === selectedId ? " is-active" : ""}`}
                key={field.id}
                type="button"
                onClick={() => onSelect(field.id)}
              >
                <strong>{field.field || field.label}</strong>
                <small>{field.tag} · {field.text || field.src || field.path}</small>
              </button>
            ))}
          </div>
        );
      })}
    </div>
  );
}
