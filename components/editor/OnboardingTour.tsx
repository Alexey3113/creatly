"use client";

import { useCallback, useEffect, useState } from "react";

interface TourStep {
  title: string;
  text: string;
  target: string | null; // CSS selector or null for center overlay
  position: "center" | "right" | "left" | "bottom";
}

const STEPS: TourStep[] = [
  {
    title: "Добро пожаловать!",
    text: "Это визуальный конструктор сайтов. Вы можете редактировать любой элемент, добавлять блоки и публиковать сайт в один клик.",
    target: null,
    position: "center",
  },
  {
    title: "Выберите элемент",
    text: "Кликните на любой элемент в превью, чтобы выделить его. Двойной клик откроет редактирование текста прямо на месте.",
    target: ".workspace",
    position: "right",
  },
  {
    title: "Панель инструментов",
    text: "Слева — библиотека блоков, шаблоны и AI-ассистент. Перетаскивайте готовые блоки на страницу или попросите AI сгенерировать контент.",
    target: ".left-sidebar",
    position: "right",
  },
  {
    title: "Стили элемента",
    text: "Справа — панель стилей выбранного элемента. Меняйте цвета, шрифты, отступы и анимации без кода.",
    target: ".right-sidebar",
    position: "left",
  },
  {
    title: "Публикация",
    text: "Нажмите «Опубликовать» в верхней панели — сайт получит уникальный URL и будет доступен всем.",
    target: ".topbar",
    position: "bottom",
  },
  {
    title: "Telegram-заявки",
    text: "Подключите Telegram-бота для сбора заявок с сайта. Все формы автоматически отправят данные в ваш чат.",
    target: null,
    position: "center",
  },
];

interface OnboardingTourProps {
  onComplete: () => void;
}

export function OnboardingTour({ onComplete }: OnboardingTourProps) {
  const [step, setStep] = useState(0);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const [spotlightStyle, setSpotlightStyle] = useState<React.CSSProperties>({});
  const [visible, setVisible] = useState(false);

  const current = STEPS[step];

  const computePosition = useCallback(() => {
    if (!current) return;

    if (!current.target || current.position === "center") {
      setTooltipStyle({
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      });
      setSpotlightStyle({ display: "none" });
      return;
    }

    const el = document.querySelector(current.target);
    if (!el) {
      setTooltipStyle({
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      });
      setSpotlightStyle({ display: "none" });
      return;
    }

    const rect = el.getBoundingClientRect();
    const pad = 8;

    setSpotlightStyle({
      position: "fixed",
      top: rect.top - pad,
      left: rect.left - pad,
      width: rect.width + pad * 2,
      height: rect.height + pad * 2,
      borderRadius: "12px",
    });

    const tooltipWidth = 340;
    const tooltipGap = 16;

    if (current.position === "right") {
      setTooltipStyle({
        position: "fixed",
        top: Math.max(16, rect.top + rect.height / 2 - 80),
        left: rect.right + tooltipGap,
      });
    } else if (current.position === "left") {
      setTooltipStyle({
        position: "fixed",
        top: Math.max(16, rect.top + rect.height / 2 - 80),
        left: rect.left - tooltipWidth - tooltipGap,
      });
    } else if (current.position === "bottom") {
      setTooltipStyle({
        position: "fixed",
        top: rect.bottom + tooltipGap,
        left: Math.max(16, rect.left + rect.width / 2 - tooltipWidth / 2),
      });
    }
  }, [current]);

  useEffect(() => {
    // Small delay so the editor renders first
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    computePosition();
    window.addEventListener("resize", computePosition);
    return () => window.removeEventListener("resize", computePosition);
  }, [visible, step, computePosition]);

  function next() {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  }

  if (!visible) return null;

  const isCenter = !current.target || current.position === "center";
  const isLast = step === STEPS.length - 1;

  return (
    <>
      <style>{`
        .ob-tour-backdrop {
          position: fixed;
          inset: 0;
          z-index: 9990;
          pointer-events: auto;
        }
        .ob-tour-backdrop__bg {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.65);
          transition: opacity 0.3s;
        }
        .ob-tour-spotlight {
          position: fixed;
          box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.65);
          z-index: 9991;
          pointer-events: none;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .ob-tour-tooltip {
          z-index: 9992;
          max-width: 340px;
          min-width: 280px;
          background: #1e1e2e;
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 16px;
          padding: 24px;
          color: #f1f5f9;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          animation: ob-tour-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          pointer-events: auto;
        }
        @keyframes ob-tour-pop {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        .ob-tour-tooltip h3 {
          margin: 0 0 8px;
          font-size: 18px;
          font-weight: 700;
          color: #c7d2fe;
        }
        .ob-tour-tooltip p {
          margin: 0 0 20px;
          font-size: 14px;
          line-height: 1.55;
          color: #94a3b8;
        }
        .ob-tour-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ob-tour-counter {
          font-size: 13px;
          color: #64748b;
        }
        .ob-tour-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .ob-tour-skip {
          background: none;
          border: none;
          color: #64748b;
          font-size: 13px;
          cursor: pointer;
          padding: 4px 8px;
          transition: color 0.2s;
        }
        .ob-tour-skip:hover {
          color: #94a3b8;
        }
        .ob-tour-next {
          background: #6366f1;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 8px 20px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .ob-tour-next:hover {
          background: #818cf8;
        }
      `}</style>

      <div className="ob-tour-backdrop">
        {/* Background overlay — only show when there is no spotlight (center mode) */}
        {isCenter && <div className="ob-tour-backdrop__bg" />}

        {/* Spotlight hole */}
        {!isCenter && (
          <div className="ob-tour-spotlight" style={spotlightStyle} />
        )}

        {/* Tooltip */}
        <div className="ob-tour-tooltip" key={step} style={tooltipStyle}>
          <h3>{current.title}</h3>
          <p>{current.text}</p>
          <div className="ob-tour-footer">
            <span className="ob-tour-counter">
              {step + 1} / {STEPS.length}
            </span>
            <div className="ob-tour-actions">
              {!isLast && (
                <button className="ob-tour-skip" type="button" onClick={onComplete}>
                  Пропустить
                </button>
              )}
              <button className="ob-tour-next" type="button" onClick={next}>
                {isLast ? "Начать работу" : "Далее"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
