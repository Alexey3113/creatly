"use client";

import { useState } from "react";
import { siteTypes, colorPalettes, fontPairs, type ColorPalette, type FontPair } from "@/lib/builder/presets";

export interface OnboardingResult {
  siteType: string;
  palette: ColorPalette;
  fonts: FontPair;
  projectName: string;
}

interface OnboardingWizardProps {
  onComplete: (result: OnboardingResult) => void;
  onSkip: () => void;
}

export function OnboardingWizard({ onComplete, onSkip }: OnboardingWizardProps) {
  const [step, setStep] = useState(0);
  const [siteType, setSiteType] = useState("");
  const [palette, setPalette] = useState<ColorPalette>(colorPalettes[0]);
  const [fonts, setFonts] = useState<FontPair>(fontPairs[0]);
  const [projectName, setProjectName] = useState("");

  function next() {
    if (step < 3) setStep(step + 1);
    else onComplete({ siteType, palette, fonts, projectName: projectName || "Мой сайт" });
  }

  function back() {
    if (step > 0) setStep(step - 1);
  }

  const canNext = step === 0 ? !!siteType : step === 1 ? !!palette : step === 2 ? !!fonts : !!projectName || true;

  return (
    <div className="onb">
      <div className="onb__container">
        {/* Progress */}
        <div className="onb__progress">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`onb__dot${i === step ? " is-active" : i < step ? " is-done" : ""}`} />
          ))}
        </div>

        {/* Step 0: Site type */}
        {step === 0 && (
          <div className="onb__step">
            <h1>Что вы хотите создать?</h1>
            <p className="onb__sub">Выберите тип сайта — мы подберём структуру и блоки</p>
            <div className="onb__type-grid">
              {siteTypes.map((t) => (
                <button
                  key={t.id}
                  className={`onb__type${siteType === t.id ? " is-active" : ""}`}
                  type="button"
                  onClick={() => setSiteType(t.id)}
                >
                  <span className="onb__type-icon">{t.icon}</span>
                  <strong>{t.label}</strong>
                  <small>{t.desc}</small>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Colors */}
        {step === 1 && (
          <div className="onb__step">
            <h1>Выберите палитру</h1>
            <p className="onb__sub">Цвета можно поменять в любой момент в редакторе</p>
            <div className="onb__palette-grid">
              {colorPalettes.map((p) => (
                <button
                  key={p.id}
                  className={`onb__palette${palette.id === p.id ? " is-active" : ""}`}
                  type="button"
                  onClick={() => setPalette(p)}
                >
                  <div className="onb__palette-colors">
                    <div style={{ background: p.colors.bg }} />
                    <div style={{ background: p.colors.primary }} />
                    <div style={{ background: p.colors.secondary }} />
                    <div style={{ background: p.colors.accent }} />
                    <div style={{ background: p.colors.text }} />
                  </div>
                  <span>{p.name}</span>
                </button>
              ))}
            </div>
            {/* Preview */}
            <div className="onb__preview-bar" style={{ background: palette.colors.bg }}>
              <span style={{ color: palette.colors.text, fontWeight: 800, fontSize: 18 }}>Заголовок</span>
              <span style={{ color: palette.colors.text, opacity: .7, fontSize: 13 }}>Описание вашего проекта</span>
              <span style={{ background: palette.colors.primary, color: "#fff", padding: "6px 16px", borderRadius: 6, fontSize: 12, fontWeight: 700 }}>Кнопка</span>
            </div>
          </div>
        )}

        {/* Step 2: Fonts */}
        {step === 2 && (
          <div className="onb__step">
            <h1>Выберите шрифт</h1>
            <p className="onb__sub">Пара шрифтов для заголовков и текста</p>
            <div className="onb__font-grid">
              {fontPairs.map((f) => (
                <button
                  key={f.id}
                  className={`onb__font${fonts.id === f.id ? " is-active" : ""}`}
                  type="button"
                  onClick={() => setFonts(f)}
                >
                  <span className="onb__font-preview">{f.preview}</span>
                  <div>
                    <strong>{f.name}</strong>
                    <small>{f.heading} + {f.body}</small>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Name */}
        {step === 3 && (
          <div className="onb__step">
            <h1>Как называется проект?</h1>
            <p className="onb__sub">Можно изменить позже</p>
            <input
              className="onb__name-input"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Название проекта"
              autoFocus
            />
            <div className="onb__summary">
              <div className="onb__summary-item">
                <small>Тип</small>
                <span>{siteTypes.find((t) => t.id === siteType)?.label}</span>
              </div>
              <div className="onb__summary-item">
                <small>Палитра</small>
                <div className="onb__summary-colors">
                  {Object.values(palette.colors).map((c, i) => (
                    <div key={i} style={{ background: c, width: 16, height: 16, borderRadius: 4 }} />
                  ))}
                </div>
              </div>
              <div className="onb__summary-item">
                <small>Шрифты</small>
                <span>{fonts.heading} + {fonts.body}</span>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="onb__actions">
          {step > 0 && (
            <button className="onb__btn onb__btn--back" type="button" onClick={back}>Назад</button>
          )}
          <button className="onb__btn onb__btn--skip" type="button" onClick={onSkip}>Пропустить</button>
          <button className="onb__btn onb__btn--next" type="button" disabled={!canNext} onClick={next}>
            {step === 3 ? "Создать сайт" : "Далее"}
          </button>
        </div>
      </div>
    </div>
  );
}
