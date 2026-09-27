"use client";
/* KineticText — гипер-типографика по буквам. Каждой букве --i (индекс) → задержка проявления,
   прогресс берётся из --sp сцены (наследуется). Без ре-рендера на кадр. Режимы: slam|scatter|vroll|stretch.
   Буквы сгруппированы в слова (.kt-w, nowrap): перенос строки только МЕЖДУ словами — иначе inline-block
   буквы рвали слово посередине («BUIL / D»). */
import { type CSSProperties } from "react";

type Tag = "span" | "h1" | "h2" | "h3" | "p" | "div" | "em" | "strong";
type Props = { text: string; as?: Tag; mode?: "slam" | "scatter" | "vroll" | "stretch"; start?: number; className?: string };

export function KineticText({ text, as: Tag = "span", mode = "slam", start = 0, className = "" }: Props) {
  let i = 0;
  const words = text.split(" ");
  return (
    <Tag className={`kt ${className}`} data-kt={mode} style={{ ["--ks" as string]: start } as CSSProperties} aria-label={text}>
      {words.map((w, wi) => (
        <span key={wi}>
          <span className="kt-w" aria-hidden>
            {Array.from(w).map((ch) => {
              const k = i++;
              const s = (k * 37) % 13;
              const style: CSSProperties = {
                ["--i" as string]: k,
                ["--kx" as string]: `${((s % 5) - 2) * 0.5}em`,
                ["--ky" as string]: `${(((s * 7) % 5) - 2) * 0.42}em`,
                ["--krot" as string]: `${(((s * 3) % 7) - 3) * 8}deg`,
              };
              return <span key={k} className="kt-l" style={style}>{ch}</span>;
            })}
          </span>
          {wi < words.length - 1 ? (i++, " ") : null}
        </span>
      ))}
    </Tag>
  );
}
