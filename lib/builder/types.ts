export type EditorMode = "content" | "design" | "structure" | "ai";
export type ViewportMode = "desktop" | "tablet" | "mobile";
export type ViewportOption = ViewportMode | "split";
export type ResponsiveScope = "all" | ViewportMode;

export type BuilderItemType = "block" | "element" | "image";

export interface BuilderStyles {
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontFamily?: string;
  fontWeight?: string;
  fontStyle?: string;
  textAlign?: string;
  textDecoration?: string;
  letterSpacing?: string;
  lineHeight?: string;
  padding?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  margin?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  borderRadius?: string;
  display?: string;
  backgroundImage?: string;
}

export interface BuilderItem {
  id: string;
  blockId: string;
  type: BuilderItemType;
  tag: string;
  label: string;
  field: string;
  semanticId: string;
  text: string;
  path: string;
  src: string;
  alt: string;
  styles: BuilderStyles;
  canEditText: boolean;
  canEditImage: boolean;
}

export interface BuilderEdit {
  id: string;
  content: {
    label?: string;
    text?: string;
    src?: string;
  };
  design: Record<ResponsiveScope, BuilderStyles>;
}

export interface BuilderProject {
  name: string;
  html: string;
  css: string;
  js: string;
  baseHref?: string;
  files: {
    html?: string;
    css?: string;
    js?: string;
  };
  edits: BuilderEdit[];
  tokens?: Record<string, string>;
  publishUrl?: string | null;
}

export interface QualityCheck {
  level: "good" | "warn" | "bad";
  title: string;
  detail: string;
  points: number;
}

export interface QualityReport {
  score: number;
  checks: QualityCheck[];
}

export interface BuilderState {
  viewport: ViewportOption;
  mode: EditorMode;
  selectedId: string | null;
  blocks: BuilderItem[];
  fields: BuilderItem[];
  elements: BuilderItem[];
  quality: QualityReport;
  project: BuilderProject;
  status: "ready" | "edited";
}
