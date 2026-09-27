"use client";
/* Закладки-объекты журнала — трэш-иконки как контакт-CTA (SVG, без ИИ).
   Каждая торчит из края разворота; клик = «написать/связаться». */
import type { CSSProperties } from "react";

const stop = (e: React.MouseEvent) => e.preventDefault();

type Kind = "sock" | "briefs" | "condom" | "bandage" | "tape" | "gum";

function Glyph({ kind }: { kind: Kind }) {
  const s = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (kind) {
    case "sock":
      return (
        <svg viewBox="0 0 48 48" aria-hidden {...{}}>
          <path {...s} d="M18 6h10v16l9 9a7 7 0 0 1-2 12l-4 2a7 7 0 0 1-9-4l-3-8V6Z" />
          <path {...s} d="M18 12h10M18 17h10" />
        </svg>
      );
    case "briefs":
      return (
        <svg viewBox="0 0 48 48" aria-hidden>
          <path {...s} d="M8 12h32v6c-7 1-9 5-11 14-1 4-8 4-9 0-2-9-5-13-12-14v-6Z" />
          <path {...s} d="M8 16h32" />
        </svg>
      );
    case "condom":
      return (
        <svg viewBox="0 0 48 48" aria-hidden>
          <rect {...s} x="14" y="8" width="20" height="30" rx="6" />
          <path {...s} d="M14 30h20M24 38v4" />
          <circle {...s} cx="24" cy="15" r="3" />
        </svg>
      );
    case "bandage":
      return (
        <svg viewBox="0 0 48 48" aria-hidden>
          <rect {...s} x="6" y="18" width="36" height="12" rx="6" transform="rotate(-20 24 24)" />
          <path {...s} d="M20 20l8 8M28 20l-8 8" />
        </svg>
      );
    case "tape":
      return (
        <svg viewBox="0 0 48 48" aria-hidden>
          <circle {...s} cx="24" cy="24" r="15" />
          <circle {...s} cx="24" cy="24" r="6" />
        </svg>
      );
    case "gum":
      return (
        <svg viewBox="0 0 48 48" aria-hidden>
          <path {...s} d="M10 26c4-10 24-10 28 0 3 7-4 12-14 12S7 33 10 26Z" />
          <path {...s} d="M16 24c3-3 13-3 16 0" />
        </svg>
      );
  }
}

const LABEL: Record<Kind, string> = {
  sock: "на носке",
  briefs: "на трусах",
  condom: "на резинке",
  bandage: "на пластыре",
  tape: "на скотче",
  gum: "на жвачке",
};

/** Закладка-таб: торчит из правого края разворота, клик = контакт. */
export function Bookmark({
  kind, text, top, tone = "ink", side = "right",
}: {
  kind: Kind; text: string; top: string; tone?: "ink" | "paper"; side?: "left" | "right";
}) {
  return (
    <a
      href="#"
      onClick={stop}
      className={`st-mark st-mark-${side} st-mark-${tone}`}
      style={{ ["--top" as string]: top } as CSSProperties}
      title={`${text} · закладка ${LABEL[kind]}`}
      aria-label={`${text} — закладка ${LABEL[kind]}`}
    >
      <span className="st-mark-obj"><Glyph kind={kind} /></span>
      <span className="st-mark-txt">{text}</span>
    </a>
  );
}
