"use client";

interface SeoPanelProps {
  title: string;
  description: string;
  ogImage: string;
  onUpdate: (field: string, value: string) => void;
}

export function SeoPanel({ title, description, ogImage, onUpdate }: SeoPanelProps) {
  const titleLen = title.length;
  const descLen = description.length;

  return (
    <div className="seo">
      <style>{`
        .seo{display:flex;flex-direction:column;gap:16px}
        .seo-field{display:flex;flex-direction:column;gap:5px}
        .seo-field__label{display:flex;align-items:center;justify-content:space-between}
        .seo-field__label span{font-size:11px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.05em}
        .seo-field__count{font-size:10px;font-family:ui-monospace,monospace;padding:1px 5px;border-radius:4px;background:var(--surface-2)}
        .seo-field__count.is-warn{color:#f59e0b}
        .seo-field__count.is-bad{color:#f87171}
        .seo-field__count.is-ok{color:#34d399}
        .seo-input{width:100%;padding:9px 12px;background:var(--surface-2);border:1px solid var(--line);border-radius:8px;color:var(--ink);font-size:13px;outline:none;transition:border-color .15s;font-family:inherit;box-sizing:border-box}
        .seo-input:focus{border-color:var(--accent)}
        .seo-textarea{resize:vertical;min-height:56px;line-height:1.5}
        .seo-hint{font-size:10px;color:var(--muted);line-height:1.4;margin-top:-2px}

        .seo-preview{border-radius:10px;overflow:hidden;border:1px solid var(--line);background:var(--surface-2)}
        .seo-preview__label{font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;padding:10px 14px 6px}
        .seo-preview__google{padding:8px 14px 14px}
        .seo-preview__title{font-size:16px;font-weight:600;color:#8ab4f8;margin-bottom:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;line-height:1.4}
        .seo-preview__url{font-size:12px;color:#bdc1c6;margin-bottom:4px;display:flex;align-items:center;gap:4px}
        .seo-preview__url svg{flex-shrink:0}
        .seo-preview__desc{font-size:12px;color:#9aa0a6;line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
        .seo-preview__sep{height:1px;background:var(--line);margin:0}

        .seo-preview__og{padding:10px 14px 14px}
        .seo-preview__og-label{font-size:10px;color:var(--muted);margin-bottom:6px}
        .seo-preview__og-img{width:100%;aspect-ratio:1200/630;border-radius:8px;background:var(--surface);border:1px dashed var(--line);display:flex;align-items:center;justify-content:center;overflow:hidden}
        .seo-preview__og-img img{width:100%;height:100%;object-fit:cover}
        .seo-preview__og-img span{font-size:11px;color:var(--muted)}
      `}</style>

      {/* Title */}
      <div className="seo-field">
        <div className="seo-field__label">
          <span>Title</span>
          <span className={`seo-field__count${titleLen > 60 ? " is-bad" : titleLen > 50 ? " is-warn" : titleLen > 0 ? " is-ok" : ""}`}>
            {titleLen}/60
          </span>
        </div>
        <input
          className="seo-input"
          type="text"
          value={title}
          onChange={(e) => onUpdate("title", e.target.value)}
          placeholder="Заголовок страницы"
          maxLength={80}
        />
        <div className="seo-hint">Отображается во вкладке браузера и в результатах поиска</div>
      </div>

      {/* Description */}
      <div className="seo-field">
        <div className="seo-field__label">
          <span>Description</span>
          <span className={`seo-field__count${descLen > 160 ? " is-bad" : descLen > 140 ? " is-warn" : descLen > 0 ? " is-ok" : ""}`}>
            {descLen}/160
          </span>
        </div>
        <textarea
          className="seo-input seo-textarea"
          rows={3}
          value={description}
          onChange={(e) => onUpdate("description", e.target.value)}
          placeholder="Краткое описание для поисковиков..."
          maxLength={200}
        />
      </div>

      {/* OG Image */}
      <div className="seo-field">
        <div className="seo-field__label">
          <span>OG Image</span>
        </div>
        <input
          className="seo-input"
          type="url"
          value={ogImage}
          onChange={(e) => onUpdate("ogImage", e.target.value)}
          placeholder="https://example.com/og.jpg"
        />
        <div className="seo-hint">Картинка при шаринге в соцсетях (1200×630)</div>
      </div>

      {/* Google Preview */}
      <div className="seo-preview">
        <div className="seo-preview__label">Превью в Google</div>
        <div className="seo-preview__google">
          <div className="seo-preview__title">{title || "Заголовок страницы"}</div>
          <div className="seo-preview__url">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="#9aa0a6" strokeWidth="1" /><path d="M6 1c-1.5 2-1.5 8 0 10M6 1c1.5 2 1.5 8 0 10M1 6h10" stroke="#9aa0a6" strokeWidth=".8" /></svg>
            creatly.ru
          </div>
          <div className="seo-preview__desc">{description || "Описание вашего сайта для поисковых систем. Это текст, который увидят пользователи в результатах поиска."}</div>
        </div>

        {/* OG Preview */}
        <div className="seo-preview__sep" />
        <div className="seo-preview__og">
          <div className="seo-preview__og-label">Превью в соцсетях</div>
          <div className="seo-preview__og-img">
            {ogImage ? (
              <img src={ogImage} alt="OG" />
            ) : (
              <span>1200 × 630</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
