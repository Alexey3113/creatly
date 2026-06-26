"use client";

import { useEffect, useState } from "react";

interface GenerationProgressProps {
  stage: "transcribing" | "analyzing" | "art-direction" | "generating" | "finalizing" | "done" | "error";
  error?: string;
  concept?: string;
}

const stages = [
  { id: "transcribing", label: "Распознаём голос...", icon: "🎤" },
  { id: "analyzing", label: "Анализируем бриф...", icon: "🧠" },
  { id: "art-direction", label: "Продумываем арт-дирекшн...", icon: "🎨" },
  { id: "generating", label: "Генерируем дизайн и код...", icon: "⚡" },
  { id: "finalizing", label: "Финализируем...", icon: "✨" },
];

export function GenerationProgress({ stage, error, concept }: GenerationProgressProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentIdx = stages.findIndex((s) => s.id === stage);

  return (
    <div className="gen-progress">
      <div className="gen-progress__card">
        <h1>Создаём ваш сайт</h1>
        <p className="gen-progress__time">{elapsed} сек</p>
        {concept && <p className="gen-progress__concept">«{concept}»</p>}

        <div className="gen-stages">
          {stages.map((s, i) => {
            let status = "pending";
            if (i < currentIdx) status = "done";
            if (i === currentIdx) status = "active";
            return (
              <div className={`gen-stage gen-stage--${status}`} key={s.id}>
                <span className="gen-stage__icon">
                  {status === "done" ? "✓" : status === "active" ? s.icon : "○"}
                </span>
                <span className="gen-stage__label">{s.label}</span>
                {status === "active" && <span className="gen-stage__pulse" />}
              </div>
            );
          })}
        </div>

        {stage === "error" && (
          <div className="gen-error">
            <strong>Ошибка</strong>
            <p>{error || "Что-то пошло не так. Попробуйте ещё раз."}</p>
          </div>
        )}
      </div>
    </div>
  );
}
