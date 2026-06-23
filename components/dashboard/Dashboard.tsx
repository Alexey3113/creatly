"use client";

import { useEffect, useState } from "react";

interface ProjectItem {
  id: number;
  slug: string;
  name: string;
  published: boolean;
  publishUrl: string | null;
  updatedAt: string;
  html?: string;
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

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => { setProjects(data.projects || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

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
          <div className="dash-empty" onClick={onNewProject}>
            <div className="dash-empty__icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect x="4" y="4" width="40" height="40" rx="12" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                <path d="M24 16v16M16 24h16" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h2>Создайте первый сайт</h2>
            <p>Опишите бизнес голосом или текстом — AI сгенерирует сайт за 2 минуты</p>
          </div>
        ) : (
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
