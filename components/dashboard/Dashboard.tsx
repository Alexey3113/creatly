"use client";

import { useEffect, useState, useRef } from "react";

interface ProjectItem {
  id: number;
  slug: string;
  name: string;
  published: boolean;
  publishUrl: string | null;
  updatedAt: string;
  html?: string;
}

interface TransferItem {
  id: number;
  createdAt: string;
  project: { id: number; name: string; slug: string; publishUrl: string | null };
  from: { id: number; username: string | null; firstName: string | null; email: string | null };
}

interface DashboardProps {
  user: { username?: string; firstName?: string; photoUrl?: string };
  onNewProject: () => void;
  onEditProject: (id: number) => void;
  onLogout: () => void;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "только что";
  if (mins < 60) return `${mins} мин назад`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} ч назад`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} дн назад`;
  return new Date(dateStr).toLocaleDateString("ru");
}

export function Dashboard({ user, onNewProject, onEditProject, onLogout }: DashboardProps) {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [transfers, setTransfers] = useState<TransferItem[]>([]);
  const [bellOpen, setBellOpen] = useState(false);
  const [processingTransfer, setProcessingTransfer] = useState<number | null>(null);
  const bellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => { setProjects(data.projects || []); setLoading(false); })
      .catch(() => setLoading(false));
    fetch("/api/transfers")
      .then((r) => r.json())
      .then((data) => { setTransfers(data.transfers || []); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) setBellOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  async function handleTransfer(id: number, action: "accept" | "decline") {
    setProcessingTransfer(id);
    const res = await fetch(`/api/transfers/${id}/${action}`, { method: "POST" });
    if (res.ok) {
      setTransfers((prev) => prev.filter((t) => t.id !== id));
      if (action === "accept") {
        const r = await fetch("/api/projects").then((r) => r.json());
        setProjects(r.projects || []);
      }
    }
    setProcessingTransfer(null);
  }

  async function confirmDelete() {
    if (deleteId === null) return;
    await fetch(`/api/projects/${deleteId}`, { method: "DELETE" });
    setProjects((prev) => prev.filter((p) => p.id !== deleteId));
    setDeleteId(null);
  }

  return (
    <div className="dash">
      <header className="dash-header">
        <a href="/" className="dash-header__left">
          <img src="/landing/logo.webp" alt="Creatly" width="32" height="32" style={{ borderRadius: 8 }} />
          <strong>Creatly</strong>
        </a>
        <div className="dash-header__right">
          <div className="dash-bell" ref={bellRef}>
            <button className="dash-bell__btn" type="button" onClick={() => setBellOpen((v) => !v)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>
              {transfers.length > 0 && <span className="dash-bell__badge">{transfers.length}</span>}
            </button>
            {bellOpen && (
              <div className="dash-bell__dropdown">
                <div className="dash-bell__title">Уведомления</div>
                {transfers.length === 0 ? (
                  <div className="dash-bell__empty">Нет новых уведомлений</div>
                ) : (
                  transfers.map((t) => (
                    <div className="dash-bell__item" key={t.id}>
                      <div className="dash-bell__text">
                        <strong>{t.from.firstName || t.from.username || t.from.email}</strong> хочет передать вам проект <strong>{t.project.name}</strong>
                      </div>
                      <div className="dash-bell__actions">
                        <button
                          className="dash-btn dash-btn--sm dash-btn--accept"
                          type="button"
                          disabled={processingTransfer === t.id}
                          onClick={() => handleTransfer(t.id, "accept")}
                        >
                          Принять
                        </button>
                        <button
                          className="dash-btn dash-btn--sm dash-btn--ghost"
                          type="button"
                          disabled={processingTransfer === t.id}
                          onClick={() => handleTransfer(t.id, "decline")}
                        >
                          Отклонить
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          <span className="dash-header__greeting">
            {user.firstName || user.username || "User"}
          </span>
          <button className="dash-btn dash-btn--ghost" type="button" onClick={onLogout}>Выйти</button>
        </div>
      </header>

      <div className="dash-content">
        <div className="dash-hero">
          <div>
            <h1>Мои проекты</h1>
            <p>{projects.length > 0 ? `${projects.length} проект${projects.length === 1 ? "" : projects.length < 5 ? "а" : "ов"}` : "Создайте первый сайт"}</p>
          </div>
          <button className="dash-btn dash-btn--primary" type="button" onClick={onNewProject}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            Новый проект
          </button>
        </div>

        {loading ? (
          <div className="dash-loading">
            <div className="dash-skeleton" /><div className="dash-skeleton" /><div className="dash-skeleton" />
          </div>
        ) : projects.length === 0 ? (
          <div className="dash-empty-v2">
            <div className="dash-empty-v2__header">
              <h2>Добро пожаловать в Creatly!</h2>
              <p>Выберите способ создания сайта</p>
            </div>
            <div className="dash-empty-v2__options">
              <button className="dash-empty-v2__card" type="button" onClick={onNewProject}>
                <div className="dash-empty-v2__icon dash-empty-v2__icon--ai">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
                </div>
                <strong>AI-генерация</strong>
                <span>Опишите бизнес голосом или текстом — сайт будет готов за 2 минуты</span>
              </button>
              <button className="dash-empty-v2__card" type="button" onClick={onNewProject}>
                <div className="dash-empty-v2__icon dash-empty-v2__icon--template">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M3 9h18M9 3v18" /></svg>
                </div>
                <strong>Из шаблона</strong>
                <span>Выберите готовый дизайн и настройте под себя в визуальном редакторе</span>
              </button>
            </div>
            <div className="dash-empty-v2__steps">
              <div className="dash-empty-v2__step">
                <div className="dash-empty-v2__step-num">1</div>
                <span>Расскажите о бизнесе</span>
              </div>
              <div className="dash-empty-v2__step-arrow">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10h12M12 6l4 4-4 4" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div className="dash-empty-v2__step">
                <div className="dash-empty-v2__step-num">2</div>
                <span>Отредактируйте в визуальном редакторе</span>
              </div>
              <div className="dash-empty-v2__step-arrow">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10h12M12 6l4 4-4 4" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div className="dash-empty-v2__step">
                <div className="dash-empty-v2__step-num">3</div>
                <span>Опубликуйте одним кликом</span>
              </div>
            </div>
          </div>
        ) : (
          <>
          {projects.length <= 2 && !localStorage.getItem("dash_tips_hidden") && (
            <div className="dash-tips">
              <button className="dash-tips__close" type="button" onClick={(e) => { e.currentTarget.parentElement!.remove(); localStorage.setItem("dash_tips_hidden", "1"); }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
              <div className="dash-tips__title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
                Подсказки
              </div>
              <div className="dash-tips__grid">
                <div className="dash-tips__item">
                  <strong>Кликните на карточку</strong> чтобы открыть визуальный редактор
                </div>
                <div className="dash-tips__item">
                  <strong>Двойной клик на текст</strong> в редакторе — редактирование прямо на странице
                </div>
                <div className="dash-tips__item">
                  <strong>Двойной клик на картинку</strong> — загрузите свою фотографию
                </div>
                <div className="dash-tips__item">
                  <strong>Опубликуйте</strong> — кнопка в правом верхнем углу редактора
                </div>
              </div>
            </div>
          )}
          <div className="dash-grid">
            {projects.map((p) => (
              <div className="dash-card" key={p.id} onClick={() => onEditProject(p.id)}>
                <div className="dash-card__preview">
                  <iframe
                    src={`/api/projects/${p.id}/thumbnail`}
                    className="dash-card__thumb"
                    loading="lazy"
                    tabIndex={-1}
                  />
                  <div className="dash-card__status">
                    {p.published ? (
                      <span className="dash-badge dash-badge--live">Опубликован</span>
                    ) : (
                      <span className="dash-badge dash-badge--draft">Черновик</span>
                    )}
                  </div>
                </div>
                <div className="dash-card__body">
                  <strong className="dash-card__name">{p.name}</strong>
                  {p.publishUrl && (
                    <a className="dash-card__url" href={p.publishUrl} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()}>
                      {p.publishUrl.replace("https://", "").slice(0, 40)}
                    </a>
                  )}
                  <span className="dash-card__time">{timeAgo(p.updatedAt)}</span>
                </div>
                <div className="dash-card__actions">
                  <button className="dash-btn dash-btn--sm" type="button" onClick={(e) => { e.stopPropagation(); onEditProject(p.id); }}>
                    Редактировать
                  </button>
                  <button className="dash-btn dash-btn--sm dash-btn--danger" type="button" onClick={(e) => { e.stopPropagation(); setDeleteId(p.id); }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 4h8M5.5 4V3a1 1 0 011-1h1a1 1 0 011 1v1M4.5 4v7a1 1 0 001 1h3a1 1 0 001-1V4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          </>
        )}
      </div>

      {deleteId !== null && (
        <div className="dash-modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="dash-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Удалить проект?</h3>
            <p>Это действие нельзя отменить. Все данные проекта будут удалены.</p>
            <div className="dash-modal__actions">
              <button className="dash-btn dash-btn--ghost" type="button" onClick={() => setDeleteId(null)}>Отмена</button>
              <button className="dash-btn dash-btn--danger" type="button" onClick={confirmDelete}>Удалить</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
