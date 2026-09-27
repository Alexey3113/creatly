export interface BlockField {
  name: string;
  type: "text" | "heading" | "image" | "link" | "icon" | "stat";
  hint: string;
  required: boolean;
}

export interface BlockVariant {
  id: string;
  label: string;
  css: string;
}

export interface BlockPreset {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  icon: string;
  tags: string[];
  fields: BlockField[];
  motionLevel: "css" | "gsap" | "webgl";
  html: string;
  css: string;
  variants?: BlockVariant[];
}
