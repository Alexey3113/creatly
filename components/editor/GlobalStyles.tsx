"use client";

import { useState } from "react";
import { colorPalettes, fontPairs, type ColorPalette, type FontPair } from "@/lib/builder/presets";

interface GlobalStylesProps {
  onApplyPalette: (palette: ColorPalette) => void;
  onApplyFonts: (fonts: FontPair) => void;
}

export function GlobalStyles({ onApplyPalette, onApplyFonts }: GlobalStylesProps) {
  const [section, setSection] = useState<"palette" | "fonts">("palette");

  return (
    <div className="gs">
      <div className="gs__tabs">
        <button className={section === "palette" ? "is-active" : ""} type="button" onClick={() => setSection("palette")}>Палитра</button>
        <button className={section === "fonts" ? "is-active" : ""} type="button" onClick={() => setSection("fonts")}>Шрифты</button>
      </div>

      {section === "palette" && (
        <div className="gs__grid">
          {colorPalettes.map((p) => (
            <button key={p.id} className="gs__palette" type="button" onClick={() => onApplyPalette(p)} title={p.name}>
              <div className="gs__palette-row">
                {Object.values(p.colors).map((c, i) => (
                  <div key={i} className="gs__color" style={{ background: c }} />
                ))}
              </div>
              <small>{p.name}</small>
            </button>
          ))}
        </div>
      )}

      {section === "fonts" && (
        <div className="gs__font-list">
          {fontPairs.map((f) => (
            <button key={f.id} className="gs__font-btn" type="button" onClick={() => onApplyFonts(f)}>
              <strong>{f.name}</strong>
              <small>{f.heading} + {f.body}</small>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
