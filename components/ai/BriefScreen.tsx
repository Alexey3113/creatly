"use client";

import { useState, useRef } from "react";
import { briefQuestions } from "@/lib/ai/prompts";
import { VoiceRecorder } from "./VoiceRecorder";
import type { TemplateInfo } from "@/lib/builder/templates";

interface BriefScreenProps {
  template: TemplateInfo;
  onSubmit: (data: { audioBlob?: Blob; textBrief: string; templateId: string }) => void;
  onBack: () => void;
}

export function BriefScreen({ template, onSubmit, onBack }: BriefScreenProps) {
  const [mode, setMode] = useState<"voice" | "text">("voice");
  const [textBrief, setTextBrief] = useState("");
  const audioBlobRef = useRef<Blob | null>(null);
  const [hasRecording, setHasRecording] = useState(false);

  function handleRecorded(blob: Blob) {
    audioBlobRef.current = blob;
    setHasRecording(true);
  }

  function handleSubmit() {
    onSubmit({
      audioBlob: mode === "voice" ? audioBlobRef.current ?? undefined : undefined,
      textBrief: mode === "text" ? textBrief : "",
      templateId: template.id,
    });
  }

  const canSubmit = mode === "voice" ? hasRecording : textBrief.trim().length > 20;

  return (
    <div className="brief-screen">
      <header className="brief-header">
        <button className="brief-back" type="button" onClick={onBack}>&larr; Назад</button>
        <div>
          <h1>Расскажите о вашем сайте</h1>
          <p>Шаблон: <strong>{template.title}</strong></p>
        </div>
      </header>

      <div className="brief-content">
        <div className="brief-questions">
          <h2>Постарайтесь ответить на эти вопросы</h2>
          <p className="brief-questions__hint">Не обязательно на все — расскажите главное</p>
          <ol className="brief-questions__list">
            {briefQuestions.map((q) => (
              <li key={q.id}>
                <span>{q.text}</span>
                <small>{q.hint}</small>
              </li>
            ))}
          </ol>
        </div>

        <div className="brief-input">
          <div className="brief-mode-switch">
            <button
              className={mode === "voice" ? "is-active" : ""}
              type="button"
              onClick={() => setMode("voice")}
            >
              Голосовое сообщение
            </button>
            <button
              className={mode === "text" ? "is-active" : ""}
              type="button"
              onClick={() => setMode("text")}
            >
              Текстовый бриф
            </button>
          </div>

          {mode === "voice" ? (
            <div className="brief-voice-area">
              <p className="brief-voice-tip">
                Нажмите запись и расскажите о вашем проекте. AI проанализирует речь и создаст сайт.
              </p>
              <VoiceRecorder onRecorded={handleRecorded} />
            </div>
          ) : (
            <textarea
              className="brief-textarea"
              value={textBrief}
              onChange={(e) => setTextBrief(e.target.value)}
              placeholder="Опишите ваш проект: название, чем занимаетесь, для кого, какой стиль, какие разделы нужны на сайте..."
              rows={12}
            />
          )}

          <button
            className="brief-submit"
            type="button"
            disabled={!canSubmit}
            onClick={handleSubmit}
          >
            Создать сайт с AI
          </button>
        </div>
      </div>
    </div>
  );
}
