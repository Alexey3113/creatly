"use client";

import { useState, useEffect, useRef } from "react";

interface PublishModalProps {
  projectName: string;
  publishUrl?: string | null;
  projectId?: number | null;
  onPublish: (slug: string) => Promise<{ url?: string; error?: string }>;
  onClose: () => void;
}

export function PublishModal({ projectName, publishUrl, projectId, onPublish, onClose }: PublishModalProps) {
  const [unpublishing, setUnpublishing] = useState(false);

  async function handleUnpublish() {
    if (!projectId) return;
    setUnpublishing(true);
    try {
      await fetch(`/api/projects/${projectId}/publish`, { method: "DELETE" });
      onClose();
      window.location.reload();
    } catch {
      setUnpublishing(false);
    }
  }

  const [slug, setSlug] = useState(
    projectName.toLowerCase()
      .replace(/[а-яё]/g, (c) => {
        const m: Record<string,string> = {а:"a",б:"b",в:"v",г:"g",д:"d",е:"e",ё:"yo",ж:"zh",з:"z",и:"i",й:"y",к:"k",л:"l",м:"m",н:"n",о:"o",п:"p",р:"r",с:"s",т:"t",у:"u",ф:"f",х:"h",ц:"ts",ч:"ch",ш:"sh",щ:"sch",ъ:"",ы:"y",ь:"",э:"e",ю:"yu",я:"ya"};
        return m[c] || c;
      })
      .replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 48)
  );
  const [state, setState] = useState<"idle" | "publishing" | "done" | "error">("idle");
  const [result, setResult] = useState<{ url?: string; error?: string }>({});
  const [slugStatus, setSlugStatus] = useState<{ available: boolean; reason?: string; domain?: string } | null>(null);
  const [checking, setChecking] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (!slug || slug.length < 2) {
      setSlugStatus(null);
      return;
    }
    setChecking(true);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetch(`/api/projects/check-slug?slug=${encodeURIComponent(slug)}`)
        .then((r) => r.json())
        .then((data) => { setSlugStatus(data); setChecking(false); })
        .catch(() => setChecking(false));
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [slug]);

  async function handlePublish() {
    if (!slugStatus?.available) return;
    setState("publishing");
    const res = await onPublish(slug);
    if (res.error) {
      setResult(res);
      setState("error");
    } else {
      setResult(res);
      setState("done");
    }
  }

  const canPublish = slugStatus?.available && !checking && slug.length >= 2;

  return (
    <div className="pub-backdrop" onClick={onClose}>
      <div className="pub-modal" onClick={(e) => e.stopPropagation()}>
        <div className="pub-modal__head">
          <h2>Опубликовать сайт</h2>
          <button className="pub-close" type="button" onClick={onClose}>✕</button>
        </div>

        {state === "idle" && (
          <div className="pub-modal__body">
            <label className="pub-field">
              <span>Адрес сайта</span>
              <div className="pub-url-input">
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.replace(/[^a-z0-9-]/g, "").slice(0, 48))}
                  placeholder="my-site"
                />
                <span className="pub-url-prefix">.creatly.ru</span>
              </div>
            </label>

            {/* Slug status */}
            {slug.length >= 2 && (
              <div className={`pub-slug-status${slugStatus?.available ? " is-ok" : slugStatus ? " is-taken" : ""}`}>
                {checking ? (
                  <span>Проверяем...</span>
                ) : slugStatus?.available ? (
                  <span>✓ {slugStatus.domain} — свободен</span>
                ) : slugStatus?.reason ? (
                  <span>✕ {slugStatus.reason}</span>
                ) : null}
              </div>
            )}

            <p className="pub-hint">
              Сайт будет доступен по адресу:<br />
              <strong>https://{slug || "___"}.creatly.ru</strong>
            </p>
            <button
              className="pub-btn"
              type="button"
              onClick={handlePublish}
              disabled={!canPublish}
            >
              Опубликовать
            </button>
            {publishUrl && projectId && (
              <button
                className="pub-btn pub-btn--danger"
                type="button"
                onClick={handleUnpublish}
                disabled={unpublishing}
              >
                {unpublishing ? "Снимаем..." : "Снять с публикации"}
              </button>
            )}
          </div>
        )}

        {state === "publishing" && (
          <div className="pub-modal__body pub-centered">
            <div className="pub-spinner" />
            <p>Публикуем сайт...</p>
          </div>
        )}

        {state === "done" && result.url && (
          <div className="pub-modal__body pub-centered">
            <div className="pub-success-icon">✓</div>
            <h3>Сайт опубликован!</h3>
            <a className="pub-link" href={result.url} target="_blank" rel="noopener">{result.url}</a>
            <button className="pub-btn" type="button" onClick={() => window.open(result.url, "_blank")}>Открыть сайт</button>
          </div>
        )}

        {state === "error" && (
          <div className="pub-modal__body pub-centered">
            <div className="pub-error-icon">!</div>
            <h3>Ошибка</h3>
            <p className="pub-error-text">{result.error}</p>
            <button className="pub-btn" type="button" onClick={() => setState("idle")}>Попробовать снова</button>
          </div>
        )}
      </div>
    </div>
  );
}
