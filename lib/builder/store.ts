import type { BuilderEdit, BuilderItem, BuilderProject, BuilderState, BuilderStyles, EditorMode, QualityReport, ResponsiveScope, ViewportMode, ViewportOption } from "./types";
import { extractTokens, evaluateQuality } from "./engines";

export type BuilderAction =
  | { type: "set-mode"; mode: EditorMode }
  | { type: "set-viewport"; viewport: ViewportOption }
  | { type: "select"; id: string | null }
  | { type: "load-project"; project: BuilderProject }
  | { type: "set-items"; items: BuilderItem[] }
  | { type: "set-token"; name: string; value: string }
  | { type: "push-edit"; id: string; field: string; value: string; scope: ResponsiveScope }
  | { type: "reset-element"; id: string }
  | { type: "update-html"; html: string }
  | { type: "rename-project"; name: string }
  | { type: "restore"; state: BuilderState };

export function createInitialState(project: BuilderProject): BuilderState {
  const tokens = { ...extractTokens(project.css), ...(project.tokens || {}) };
  return {
    viewport: "desktop",
    mode: "content",
    selectedId: null,
    blocks: [],
    fields: [],
    elements: [],
    quality: { score: 0, checks: [] },
    project: { ...project, tokens },
    status: "ready",
  };
}

function normalizeEdit(edit?: BuilderEdit): BuilderEdit {
  const empty = { all: {}, desktop: {}, tablet: {}, mobile: {} };
  if (!edit) return { id: "", content: {}, design: empty };
  return {
    id: edit.id,
    content: { ...edit.content },
    design: {
      all: { ...(edit.design?.all || {}) },
      desktop: { ...(edit.design?.desktop || {}) },
      tablet: { ...(edit.design?.tablet || {}) },
      mobile: { ...(edit.design?.mobile || {}) },
    },
  };
}

function findOrCreateEdit(edits: BuilderEdit[], id: string): { edit: BuilderEdit; list: BuilderEdit[] } {
  const existing = edits.find((e) => e.id === id);
  if (existing) {
    const normalized = normalizeEdit(existing);
    return { edit: normalized, list: edits.map((e) => (e.id === id ? normalized : e)) };
  }
  const edit = normalizeEdit();
  edit.id = id;
  return { edit, list: [...edits, edit] };
}

const contentFields = new Set(["label", "text", "src"]);
function px(v: string): string {
  const n = parseFloat(v);
  return isNaN(n) ? v : `${n}px`;
}
const styleFields: Record<string, (v: string) => BuilderStyles> = {
  color: (v) => ({ color: v }),
  backgroundColor: (v) => ({ backgroundColor: v }),
  fontSize: (v) => ({ fontSize: px(v) }),
  padding: (v) => ({ padding: px(v) }),
  paddingTop: (v) => ({ paddingTop: px(v) }),
  paddingRight: (v) => ({ paddingRight: px(v) }),
  paddingBottom: (v) => ({ paddingBottom: px(v) }),
  paddingLeft: (v) => ({ paddingLeft: px(v) }),
  marginTop: (v) => ({ marginTop: px(v) }),
  marginRight: (v) => ({ marginRight: px(v) }),
  marginBottom: (v) => ({ marginBottom: px(v) }),
  marginLeft: (v) => ({ marginLeft: px(v) }),
  borderRadius: (v) => ({ borderRadius: px(v) }),
  display: (v) => ({ display: v }),
  fontFamily: (v) => ({ fontFamily: v }),
  fontWeight: (v) => ({ fontWeight: v }),
  fontStyle: (v) => ({ fontStyle: v }),
  textAlign: (v) => ({ textAlign: v }),
  textDecoration: (v) => ({ textDecoration: v }),
  letterSpacing: (v) => ({ letterSpacing: px(v) }),
  lineHeight: (v) => ({ lineHeight: v }),
  backgroundImage: (v) => ({ backgroundImage: v }),
};

export function builderReducer(state: BuilderState, action: BuilderAction): BuilderState {
  switch (action.type) {
    case "set-mode":
      return { ...state, mode: action.mode };

    case "set-viewport":
      return { ...state, viewport: action.viewport };

    case "select":
      return { ...state, selectedId: action.id };

    case "load-project": {
      const tokens = { ...extractTokens(action.project.css), ...(action.project.tokens || {}) };
      return {
        ...state,
        selectedId: null,
        blocks: [],
        fields: [],
        elements: [],
        quality: { score: 0, checks: [] },
        project: { ...action.project, tokens },
        status: "ready",
      };
    }

    case "set-items": {
      const blocks = action.items.filter((i) => i.type === "block");
      const fields = action.items.filter((i) => i.type !== "block" && i.field);
      const quality = evaluateQuality(blocks, action.items, fields, state.project);
      return { ...state, blocks, fields, elements: action.items, quality };
    }

    case "set-token": {
      const tokens = { ...state.project.tokens, [action.name]: action.value };
      return {
        ...state,
        project: { ...state.project, tokens },
        status: "edited",
      };
    }

    case "push-edit": {
      const { edit, list } = findOrCreateEdit(state.project.edits, action.id);
      if (contentFields.has(action.field)) {
        edit.content = { ...edit.content, [action.field]: action.value };
      }
      const styleFn = styleFields[action.field];
      if (styleFn) {
        edit.design[action.scope] = { ...(edit.design[action.scope] || {}), ...styleFn(action.value) };
      }
      return {
        ...state,
        project: { ...state.project, edits: list.map((e) => (e.id === action.id ? edit : e)) },
        status: "edited",
      };
    }

    case "reset-element": {
      const filtered = state.project.edits.filter((e) => e.id !== action.id);
      return {
        ...state,
        project: { ...state.project, edits: filtered },
        status: "edited",
      };
    }

    case "update-html":
      return {
        ...state,
        project: { ...state.project, html: action.html },
        status: "edited",
      };

    case "rename-project":
      return { ...state, project: { ...state.project, name: action.name }, status: "edited" };

    case "restore":
      return action.state;

    default:
      return state;
  }
}

export function getEditForItem(state: BuilderState, id: string, scope: ResponsiveScope) {
  const item = state.elements.find((e) => e.id === id);
  if (!item) return null;
  const edit = normalizeEdit(state.project.edits.find((e) => e.id === id));
  const styles = {
    ...(item.styles || {}),
    ...(edit.design.all || {}),
    ...(scope === "all" ? {} : edit.design[scope] || {}),
  };
  return {
    item,
    label: edit.content.label ?? item.label ?? "",
    text: edit.content.text ?? item.text ?? "",
    src: edit.content.src ?? item.src ?? "",
    styles,
  };
}
