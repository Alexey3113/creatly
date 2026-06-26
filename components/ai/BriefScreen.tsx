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
  lang?: string;
  ogImage?: string;
  logo?: string;
  brandColors?: string[];
  fonts?: string[];
  nav?: string[];
  ctas?: { text: string; href: string }[];
  images?: { src: string; alt: string }[];
  socials?: string[];
  jsonLd?: string;
  looksLikeSPA?: boolean;
}

interface BriefScreenProps {
  template: TemplateInfo | null;
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
      templateId: template ? template.id : "none",
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
          <p>{template ? <>Шаблон: <strong>{template.title}</strong></> : <>Дизайн <strong>с нуля</strong> — без шаблона</>}</p>
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
                <div className="brief-url-result__head">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
                  <span>Извлечено: {scrapedData.title ? `«${scrapedData.title}»` : "без названия"}</span>
                </div>
                <div className="brief-url-result__stats">
                  {scrapedData.headings.length > 0 && <span>{scrapedData.headings.length} заголовков</span>}
                  {scrapedData.paragraphs.length > 0 && <span>{scrapedData.paragraphs.length} текстов</span>}
                  {scrapedData.nav && scrapedData.nav.length > 0 && <span>{scrapedData.nav.length} пунктов меню</span>}
                  {scrapedData.images && scrapedData.images.length > 0 && <span>{scrapedData.images.length} картинок</span>}
                  {scrapedData.contacts.length > 0 && <span>{scrapedData.contacts.length} контактов</span>}
                  {scrapedData.socials && scrapedData.socials.length > 0 && <span>{scrapedData.socials.length} соцсетей</span>}
                </div>
                {scrapedData.brandColors && scrapedData.brandColors.length > 0 && (
                  <div className="brief-url-result__colors">
                    {scrapedData.brandColors.slice(0, 6).map((c) => (
                      <span key={c} title={c} style={{ background: c }} />
                    ))}
                  </div>
                )}
                {scrapedData.looksLikeSPA && (
                  <p className="brief-url-warn">⚠ Сайт на JS — извлечено мало. Опишите бизнес в брифе подробнее.</p>
                )}
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
