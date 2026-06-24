"use client";

import { useState, useRef } from "react";
import { briefQuestions } from "@/lib/ai/prompts";
import { VoiceRecorder } from "./VoiceRecorder";
import type { TemplateInfo } from "@/lib/builder/templates";

interface ScrapedData {
  title: string;
  description: string;
  headings: string[];
  paragraphs: string[];
  contacts: string[];
}

interface BriefScreenProps {
  template: TemplateInfo;
  onSubmit: (data: { audioBlob?: Blob; textBrief: string; templateId: string; scrapedData?: ScrapedData }) => void;
  onBack: () => void;
}

export function BriefScreen({ template, onSubmit, onBack }: BriefScreenProps) {
  const [mode, setMode] = useState<"voice" | "text">("voice");
  const [textBrief, setTextBrief] = useState("");
  const audioBlobRef = useRef<Blob | null>(null);
  const [hasRecording, setHasRecording] = useState(false);

  const [siteUrl, setSiteUrl] = useState("");
  const [scraping, setScraping] = useState(false);
  const [scrapeError, setScrapeError] = useState("");
  const [scrapedData, setScrapedData] = useState<ScrapedData | null>(null);

  function handleRecorded(blob: Blob) {
    audioBlobRef.current = blob;
    setHasRecording(true);
  }

  async function handleScrape() {
    if (!siteUrl.trim()) return;
    setScraping(true);
    setScrapeError("");
    setScrapedData(null);

    try {
      const res = await fetch("/api/ai/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: siteUrl.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setScrapeError(data.error || "Ошибка загрузки");
      } else {
        setScrapedData(data.extracted);
      }
    } catch {
      setScrapeError("Не удалось подключиться");
    }
    setScraping(false);
  }

  function handleSubmit() {
    onSubmit({
      audioBlob: mode === "voice" ? audioBlobRef.current ?? undefined : undefined,
      textBrief: mode === "text" ? textBrief : "",
      templateId: template.id,
      scrapedData: scrapedData ?? undefined,
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
          <div className="brief-url-block">
            <label className="brief-url-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></svg>
              Есть старый сайт? <span>(необязательно)</span>
            </label>
            <div className="brief-url-row">
              <input
                className="brief-url-input"
                type="url"
                value={siteUrl}
                onChange={(e) => { setSiteUrl(e.target.value); setScrapeError(""); setScrapedData(null); }}
                placeholder="https://example.com"
              />
              <button
                className="brief-url-btn"
                type="button"
                disabled={!siteUrl.trim() || scraping}
                onClick={handleScrape}
              >
                {scraping ? "Загрузка..." : "Извлечь"}
              </button>
            </div>
            {scrapeError && <p className="brief-url-error">{scrapeError}</p>}
            {scrapedData && (
              <div className="brief-url-result">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
                <span>
                  Извлечено: {scrapedData.title ? `«${scrapedData.title}»` : "без названия"}
                  {scrapedData.headings.length > 0 && `, ${scrapedData.headings.length} заголовков`}
                  {scrapedData.paragraphs.length > 0 && `, ${scrapedData.paragraphs.length} текстов`}
                  {scrapedData.contacts.length > 0 && `, ${scrapedData.contacts.length} контактов`}
                </span>
              </div>
            )}
          </div>

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
