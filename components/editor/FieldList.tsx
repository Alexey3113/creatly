import type { BuilderItem } from "@/lib/builder/types";

interface FieldListProps {
  fields: BuilderItem[];
  selectedId: string | null;
  activeBlockId: string | null;
  onSelect: (id: string) => void;
}

export function FieldList({ fields, selectedId, activeBlockId, onSelect }: FieldListProps) {
  const visibleFields = activeBlockId ? fields.filter((field) => field.blockId === activeBlockId) : [];

  if (!visibleFields.length) {
    return (
      <div className="empty-state" id="emptyFields" data-i18n="emptyFields">
        Выберите блок. Если у шаблона есть data-field, здесь появятся понятные поля для редактирования.
      </div>
    );
  }

  return (
    <div className="field-list" id="fieldList">
      {visibleFields.map((field) => (
        <button
          className={`field-item${field.id === selectedId ? " is-active" : ""}`}
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
}
