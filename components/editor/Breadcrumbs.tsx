import type { BuilderItem } from "@/lib/builder/types";

interface BreadcrumbsProps {
  elements: BuilderItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function Breadcrumbs({ elements, selectedId, onSelect }: BreadcrumbsProps) {
  if (!selectedId) return null;

  const selected = elements.find((e) => e.id === selectedId);
  if (!selected) return null;

  const crumbs: { id: string; label: string }[] = [];

  if (selected.type !== "block") {
    const block = elements.find((e) => e.id === selected.blockId && e.type === "block");
    if (block) crumbs.push({ id: block.id, label: block.label || block.tag });
  }

  crumbs.push({ id: selected.id, label: selected.label || selected.field || selected.tag });

  return (
    <nav className="breadcrumbs" aria-label="Element path">
      <span className="breadcrumbs__root">body</span>
      {crumbs.map((crumb, i) => (
        <span key={crumb.id}>
          <span className="breadcrumbs__sep">&rsaquo;</span>
          <button
            className={`breadcrumbs__item${i === crumbs.length - 1 ? " is-current" : ""}`}
            type="button"
            onClick={() => onSelect(crumb.id)}
          >
            {crumb.label}
          </button>
        </span>
      ))}
    </nav>
  );
}
