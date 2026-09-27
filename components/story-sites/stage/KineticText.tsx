"use client";
/* KineticText — гипер-типографика по буквам. Каждой букве --i (индекс) → задержка проявления,
   прогресс берётся из --sp сцены (наследуется). Без ре-рендера на кадр. Режимы: slam|scatter|vroll|stretch. */
import { type ElementType, type CSSProperties } from "react";

type Props = { text: string; as?: ElementType; mode?: "slam" | "scatter" | "vroll" | "stretch"; start?: number; className?: string };

export function KineticText({ text, as: Tag = "span", mode = "slam", start = 0, className = "" }: Props) {
  const letters = Array.from(text);
  return (
    <Tag className={`kt ${className}`} data-kt={mode} style={{ ["--ks" as string]: start }} aria-label={text}>
      {letters.map((ch, i) => {
        const s = (i * 37) % 13;
        const style: CSSProperties = {
          ["--i" as string]: i,
          ["--kx" as string]: `${((s % 5) - 2) * 0.5}em`,
          ["--ky" as string]: `${(((s * 7) % 5) - 2) * 0.42}em`,
          ["--krot" as string]: `${(((s * 3) % 7) - 3) * 8}deg`,
        };
        return <span key={i} className="kt-l" aria-hidden style={style}>{ch === " " ? " " : ch}</span>;
      })}
    </Tag>
  );
}
