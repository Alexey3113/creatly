"use client";

import { useState, useRef, useEffect } from "react";
import { briefQuestions } from "@/lib/ai/prompts";
import { VoiceRecorder } from "./VoiceRecorder";

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
  onSubmit: (data: { audioBlob?: Blob; textBrief: string; scrapedData?: ScrapedData; siteMode: "classic" | "story"; mediaMode: "stock" | "higgsfield" }) => void;
  onBack: () => void;
}

const HIGS_URL = process.env.NEXT_PUBLIC_HIGS_BOT_URL || "http://127.0.0.1:3210";

export function BriefScreen({ onSubmit, onBack }: BriefScreenProps) {
  const [mode, setMode] = useState<"voice" | "text">("voice");
  const [siteMode, setSiteMode] = useState<"classic" | "story">("story");
  const [mediaMode, setMediaMode] = useState<"stock" | "higgsfield">("stock");
  const [higsOnline, setHigsOnline] = useState(false);

  // Локальный Higs Bot доступен из браузера напрямую (CORS для localhost)
  useEffect(() => {
    fetch(`${HIGS_URL}/api/health`, { signal: AbortSignal.timeout(2500) })
      .then((r) => r.json())
      .then((d) => {
        if (d?.ok) { setHigsOnline(true); setMediaMode("higgsfield"); }
      })
      .catch(() => {});
  }, []);
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
      scrapedData: scrapedData ?? undefined,
      siteMode,
      mediaMode,
    });
  }

  const canSubmit = mode === "voice" ? hasRecording : textBrief.trim().length > 20;

  return (
    <div className="brief-screen">
      <header className="brief-header">
        <button className="brief-back" type="button" onClick={onBack}>&larr; Назад</button>
        <div>
          <h1>Расскажите о вашем сайте</h1>
          <p>AI соберёт сайт из премиум-блоков под ваш бриф</p>
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

          <div className="brief-format">
            <span className="brief-format__label">Формат сайта</span>
            <div className="brief-format__cards">
              <button
                type="button"
                className={`brief-format__card ${siteMode === "story" ? "is-active" : ""}`}
                onClick={() => setSiteMode("story")}
              >
                <strong>Полноценная история</strong>
                <span>Сайт как кино: живой фон, storytelling-сцены, смелые переходы</span>
              </button>
              <button
                type="button"
                className={`brief-format__card ${siteMode === "classic" ? "is-active" : ""}`}
                onClick={() => setSiteMode("classic")}
              >
                <strong>Классический сайт</strong>
                <span>Конверсионный лендинг со спокойными анимациями</span>
              </button>
            </div>
          </div>

          <div className="brief-format">
            <span className="brief-format__label">Медиа для сайта</span>
            <div className="brief-format__cards">
              <button
                type="button"
                className={`brief-format__card ${mediaMode === "higgsfield" ? "is-active" : ""}`}
                disabled={!higsOnline}
                onClick={() => setMediaMode("higgsfield")}
              >
                <strong>Генерация Higgsfield {higsOnline ? "· онлайн" : "· недоступно"}</strong>
                <span>Уникальные кино-кадры и видео под ваш бренд. Дольше: ждём каждую генерацию</span>
              </button>
              <button
                type="button"
                className={`brief-format__card ${mediaMode === "stock" ? "is-active" : ""}`}
                onClick={() => setMediaMode("stock")}
              >
                <strong>Стоковые фото</strong>
                <span>Быстро: подобранные живые фото по теме бизнеса</span>
              </button>
            </div>
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
