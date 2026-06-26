"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./landing.css";

const IMAGES = {
  logo: "/landing/logo.webp",
  main: "/landing/main.webp",
  photo1: "/landing/photo1.webp",
  photo2: "/landing/photo2.webp",
  photo3: "/landing/photo3.webp",
  photo4: "/landing/photo4.webp",
} as const;

const VIDEOS = [
  { name: "Linea Motion", niche: "Йога-студия", video: "/sites/site8.mp4", poster: "/sites/site8-poster.webp" },
  { name: "Люмен", niche: "Разработка ИИ-решений", video: "/sites/site2.mp4", poster: "/sites/site2-poster.webp" },
  { name: "Forma", niche: "Продажа домов и квартир", video: "/sites/site3.mp4", poster: "/sites/site3-poster.webp" },
  { name: "FitMe", niche: "Фитнес-приложение", video: "/sites/site6.mp4", poster: "/sites/site6-poster.webp" },
  { name: "Место", niche: "Подбор ресторанов", video: "/sites/site5.mp4", poster: "/sites/site5-poster.webp" },
  { name: "Aeris", niche: "Архитектура домов", video: "/sites/site4.mp4", poster: "/sites/site4-poster.webp" },
  { name: "BA-climate", niche: "Магазин кондиционеров", video: "/sites/site7.mp4", poster: "/sites/site7-poster.webp" },
  { name: "Alexend sites", niche: "Портфолио", video: "/sites/site1.mp4", poster: "/sites/site1-poster.webp" },
];

const TESTIMONIALS = [
  {
    quote: "Creatly превращает голосовой бриф в сайт быстрее, чем мы раньше собирали один экран в конструкторе. Самое сильное — потом всё можно поправить прямо на странице.",
    name: "Алина Морозова",
    role: "Founder, wellness studio",
    avatar: "/landing/avatar-am.webp",
  },
  {
    quote: "Мы перестали прыгать между дизайнером, копирайтером и верстальщиком. AI даёт основу, а визуальный редактор позволяет довести лендинг до нужного уровня без хаоса.",
    name: "Илья Воронцов",
    role: "Marketing Lead, SaaS",
    avatar: "/landing/avatar-iv.webp",
  },
  {
    quote: "Мне важно быстро тестировать гипотезы. Здесь я могу собрать оффер, поменять блоки, адаптив и CTA за один вечер, не ломая дизайн.",
    name: "Мария Лебедева",
    role: "Product manager",
    avatar: "/landing/avatar-ml.webp",
  },
  {
    quote: "Для агентства это выглядит как новый производственный контур: шаблон, AI-бриф, редактор, публикация. Клиент видит результат почти сразу.",
    name: "Денис Романов",
    role: "Creative agency owner",
    avatar: "/landing/avatar-dr.webp",
  },
  {
    quote: "В Tilda мы часто упирались в однотипные блоки. Тут ощущение, что можно двигать продукт глубже: свои файлы, свои секции, свои сценарии.",
    name: "Кира Соколова",
    role: "No-code consultant",
    avatar: "/landing/avatar-ks.webp",
  },
  {
    quote: "Главное отличие — скорость без ощущения дешёвого шаблона. Можно сделать аккуратный, живой сайт и не потерять контроль над деталями.",
    name: "Никита Павлов",
    role: "E-commerce founder",
    avatar: "/landing/avatar-np.webp",
  },
];

export function LandingClient() {
  const [scrolled, setScrolled] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    h();
    return () => window.removeEventListener("scroll", h);
  }, []);

  const obs = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    obs.current = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("_in"); }),
      { threshold: 0.08 },
    );
    document.querySelectorAll("._a").forEach((el) => obs.current?.observe(el));
    return () => obs.current?.disconnect();
  }, []);

  const activeTestimonial = TESTIMONIALS[testimonialIndex];
  const prevTestimonial = TESTIMONIALS[(testimonialIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length];
  const nextTestimonial = TESTIMONIALS[(testimonialIndex + 1) % TESTIMONIALS.length];
  const shiftTestimonial = useCallback((direction: number) => {
    setTestimonialIndex((current) => (current + direction + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  return (
    <>
      <div className="L">
        {/* BG */}
        <div className="L-bg">
          <div className="L-bg__grid" />
          <div className="L-bg__g L-bg__g1" />
          <div className="L-bg__g L-bg__g2" />
          <div className="L-bg__g L-bg__g3" />
        </div>

        {/* Nav */}
        <nav className={`L-nav${scrolled ? " is-solid" : ""}`}>
          <div className="L-nav__in">
            <a href="/" className="L-nav__brand">
              <img className="L-nav__logo" src={IMAGES.logo} alt="" />
              Creatly
            </a>
            <div className="L-nav__links">
              <a href="#features">Возможности</a>
              <a href="#how">Как это работает</a>
              <a href="#pricing">Цены</a>
            </div>
            <a href="/auth" className="L-nav__cta">Войти →</a>
          </div>
        </nav>

        {/* ═══ Hero ═══ */}
        <section className="L-hero">
          <div className="L-hero__halo" aria-hidden="true" />
          <div className="L-hero__beam" aria-hidden="true" />

          <div className="L-hero__photo L-hero__photo--left">
            <img src={IMAGES.photo1} alt="Редактор типографики Creatly" />
            <span>Typography control</span>
          </div>

          <div className="L-hero__photo L-hero__photo--left-b">
            <img src={IMAGES.photo2} alt="Визуальная настройка блока сайта" />
            <span>Visual blocks</span>
          </div>

          {/* Center */}
          <div className="L-hero__center">
            <h1>Опишите бизнес —<br/>получите <span className="L-serif">готовый сайт</span></h1>
            <p>Опишите бизнес голосом — AI создаст профессиональный сайт за 2 минуты. Редактируйте прямо на странице.</p>
            <div className="L-hero__btns">
              <a href="/dashboard" className="L-btn L-btn--accent">Создать бесплатно ✦</a>
              <a href="#how" className="L-btn L-btn--glass">Как это работает →</a>
            </div>
          </div>

          <div className="L-hero__photo L-hero__photo--right">
            <img src={IMAGES.photo3} alt="AI интерфейс генерации сайта" />
            <span>AI generation</span>
          </div>

          <div className="L-hero__product" aria-label="Интерфейс Creatly">
            <div className="L-browser">
              <div className="L-browser__bar">
                <i /><i /><i />
                <span>creatly.ru</span>
                <b>AI Mode</b>
              </div>
              <video className="L-browser__video" src="/sites/demo.mp4" poster="/sites/demo-poster.webp" autoPlay muted loop playsInline preload="auto" />
            </div>
          </div>

          <div className="L-hero__stat L-hero__stat--one"><strong>2 мин</strong><span>до первого сайта</span></div>
          <div className="L-hero__stat L-hero__stat--two"><strong>10×</strong><span>быстрее Tilda-flow</span></div>
        </section>

        {/* ═══ Gallery — Сайты, созданные за минуты ═══ */}
        <section className="L-gallery _a" id="gallery">
          <div className="L-gallery__head">
            <div className="L-sh"><span className="L-tag">Примеры</span><h2>Сайты, созданные <span className="L-serif">за минуты</span></h2></div>
          </div>
          <div className="L-gallery__track">
            {VIDEOS.map((s, i) => (
              <div className="L-gallery__card _a" key={i}>
                <div className="L-gallery__thumb">
                  <video
                    className="L-gallery__video"
                    src={s.video}
                    poster={s.poster}
                    muted
                    loop
                    playsInline
                    preload="none"
                    onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                    onMouseLeave={(e) => { const v = e.target as HTMLVideoElement; v.pause(); v.currentTime = 0; }}
                  />
                </div>
                <div className="L-gallery__meta">
                  <div><div className="L-gallery__name">{s.name}</div><div className="L-gallery__niche">{s.niche}</div></div>
                  <span className="L-gallery__go">Смотреть →</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="L-divider _a" />

        {/* ═══ Features ═══ */}
        <section className="L-features" id="features">
          <div className="L-sh _a"><span className="L-tag">Возможности</span><h2>Не конструктор. <span className="L-serif">Инструмент</span></h2></div>

          {/* Wide card */}
          <div className="L-fw _a">
            <div className="L-fw__text">
              <span className="L-fw__label">✦ Искусственный интеллект</span>
              <h3>AI-генерация полного сайта</h3>
              <p>Опишите бизнес голосом или текстом — получите уникальный сайт с реальным контентом, Unsplash-фотографиями и формами. Не шаблон — дизайн под вашу нишу.</p>
              <ul className="L-fw__dots"><li>Голосовой ввод</li><li>Реальный контент</li><li>Unsplash-фото</li><li>Формы и CTA</li></ul>
            </div>
            <div className="L-fw__visual">
              <div className="L-fw__shot">
                <img src={IMAGES.photo4} alt="AI-редактор Creatly" />
              </div>
            </div>
          </div>

          {/* Feature rows */}
          <div className="L-frow _a">
            <div className="L-frow__info">
              <span className="L-frow__num">01 — AI-генерация</span>
              <h3>Полный сайт из голосового описания</h3>
              <p>Опишите бизнес голосом или текстом. AI создаст уникальный дизайн с реальным контентом, фотографиями и формами. Это не шаблон — генерация под вашу нишу.</p>
            </div>
            <div className="L-frow__visual">
              <img src={IMAGES.main} alt="Интерфейс Creatly" style={{ width: "100%", aspectRatio: "2002/1330", objectFit: "cover" }} />
            </div>
          </div>

          <div className="L-frow _a">
            <div className="L-frow__info">
              <span className="L-frow__num">02 — Inline-редактор</span>
              <h3>Кликните и меняйте. Без панелей</h3>
              <p>Текст, цвета, шрифты, изображения — всё редактируется прямо на странице. Никаких сайдбаров с 50 настройками.</p>
            </div>
            <div className="L-frow__visual">
              <div className="L-frow__mock">
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <div style={{ width: 14, height: 14, borderRadius: 3, background: "rgba(96,165,250,.3)" }} />
                  <div style={{ flex: 1, height: 6, borderRadius: 3, background: "rgba(255,255,255,.04)" }} />
                </div>
                <div style={{ height: 28, borderRadius: 5, background: "rgba(96,165,250,.06)", border: "1px dashed rgba(96,165,250,.2)", display: "flex", alignItems: "center", padding: "0 10px", fontSize: 11, color: "#60a5fa" }}>
                  Заголовок вашего сайта_
                </div>
                <div style={{ height: 12, borderRadius: 3, background: "rgba(255,255,255,.025)", width: "75%" }} />
                <div style={{ height: 12, borderRadius: 3, background: "rgba(255,255,255,.025)", width: "55%" }} />
                <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                  <div style={{ height: 22, borderRadius: 5, background: "rgba(59,130,246,.1)", border: "1px solid rgba(59,130,246,.18)", flex: 1, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#60a5fa", fontWeight: 700 }}>Кнопка CTA</div>
                  <div style={{ height: 22, borderRadius: 5, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", flex: 1 }} />
                </div>
              </div>
            </div>
          </div>

          <div className="L-frow _a">
            <div className="L-frow__info">
              <span className="L-frow__num">03 — Telegram-заявки</span>
              <h3>Лиды прямо в мессенджер</h3>
              <p>Каждая форма на сайте отправляет заявку в ваш Telegram-бот. Мгновенно. Без CRM, без почты, без потерянных лидов.</p>
            </div>
            <div className="L-frow__visual">
              <div className="L-frow__mock">
                <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "8px 10px", borderRadius: 6, background: "rgba(59,130,246,.04)", border: "1px solid rgba(59,130,246,.1)" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(59,130,246,.12)", display: "grid", placeItems: "center", fontSize: 14 }}>📲</div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#e0e8f0", marginBottom: 2 }}>Новая заявка</div>
                    <div style={{ fontSize: 9, color: "#5a7088" }}>Имя: Андрей К. / +7 925 ***</div>
                  </div>
                  <div style={{ marginLeft: "auto", fontSize: 8, color: "#3a5068" }}>сейчас</div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "8px 10px", borderRadius: 6, background: "rgba(59,130,246,.02)", border: "1px solid rgba(59,130,246,.06)", opacity: .5 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(59,130,246,.08)", display: "grid", placeItems: "center", fontSize: 14 }}>📲</div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#e0e8f0", marginBottom: 2 }}>Новая заявка</div>
                    <div style={{ fontSize: 9, color: "#5a7088" }}>Имя: Мария С. / +7 916 ***</div>
                  </div>
                  <div style={{ marginLeft: "auto", fontSize: 8, color: "#3a5068" }}>2 мин</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ How ═══ */}
        <section className="L-how" id="how">
          <div className="L-sh _a"><span className="L-tag">Процесс</span><h2>Три шага до <span className="L-serif">готового сайта</span></h2></div>
          <div className="L-how__steps L-stagger">
            {[["Расскажите о бизнесе","Голос или текст — что за бизнес, для кого, какой стиль."],["AI создаёт сайт","Уникальный дизайн с контентом и фото под вашу нишу."],["Публикуйте","Доработайте inline. Один клик — сайт в сети, заявки в Telegram."]].map(([t,d],i)=>(
              <div className="L-step _a" key={i}><div className="L-step__n">0{i+1}</div><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </section>

        <div className="L-divider _a" />

        {/* ═══ Stats ═══ */}
        <section className="L-stats _a">
          <div className="L-stats__in">
            {[["500+","Сайтов"],["2 мин","Время"],["0 ₽","Старт"],["24/7","Поддержка"]].map(([n,l],i)=>(
              <div key={i}><strong>{n}</strong><span>{l}</span></div>
            ))}
          </div>
        </section>

        {/* ═══ Testimonials ═══ */}
        <section className="L-testimonials _a" id="testimonials">
          <div className="L-sh">
            <span className="L-tag">Отзывы пользователей</span>
            <h2>Как команды собирают сайты быстрее</h2>
          </div>

          <div className="L-testimonials__stage" aria-live="polite">
            <div className="L-testimonials__glow" aria-hidden="true" />
            <article className="L-quote L-quote--ghost L-quote--left" aria-hidden="true">
              <p>{prevTestimonial.quote}</p>
              <div className="L-quote__author">
                <img className="L-quote__avatar" src={prevTestimonial.avatar} alt={prevTestimonial.name} />
                <div><strong>{prevTestimonial.name}</strong><em>{prevTestimonial.role}</em></div>
              </div>
            </article>

            <article className="L-quote L-quote--active" key={activeTestimonial.name}>
              <p>{activeTestimonial.quote}</p>
              <div className="L-quote__author">
                <img className="L-quote__avatar" src={activeTestimonial.avatar} alt={activeTestimonial.name} />
                <div><strong>{activeTestimonial.name}</strong><em>{activeTestimonial.role}</em></div>
              </div>
            </article>

            <article className="L-quote L-quote--ghost L-quote--right" aria-hidden="true">
              <p>{nextTestimonial.quote}</p>
              <div className="L-quote__author">
                <img className="L-quote__avatar" src={nextTestimonial.avatar} alt={nextTestimonial.name} />
                <div><strong>{nextTestimonial.name}</strong><em>{nextTestimonial.role}</em></div>
              </div>
            </article>
          </div>

          <div className="L-testimonials__controls">
            <button type="button" onClick={() => shiftTestimonial(-1)} aria-label="Предыдущий отзыв">←</button>
            <span>{testimonialIndex + 1} / {TESTIMONIALS.length}</span>
            <button type="button" onClick={() => shiftTestimonial(1)} aria-label="Следующий отзыв">→</button>
          </div>
        </section>

        {/* ═══ Pricing ═══ */}
        <section className="L-pricing" id="pricing">
          <div className="L-sh _a"><span className="L-tag">Выберите план</span><h2>Простое <span className="L-serif">ценообразование</span></h2></div>

          {/* Divider line */}
          <div className="L-divider _a" />

          <div className="L-pricing__g _a">
            {/* Free */}
            <div className="L-plan">
              <h3>Free</h3>
              <p className="L-plan__desc">Попробуйте AI-генерацию и создайте первый сайт бесплатно.</p>
              <div className="L-plan__price">0 ₽<span> / мес</span></div>
              <a href="/dashboard" className="L-btn L-btn--glass L-plan__btn">Начать бесплатно →</a>
              <div className="L-plan__includes">Что входит:</div>
              <ul>
                <li><svg viewBox="0 0 16 16" className="L-plan__ico"><circle cx="8" cy="8" r="7" stroke="#4b5563" strokeWidth="1.2" fill="none"/><path d="M5 8l2 2 4-4" stroke="#4b5563" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>1 сайт</li>
                <li><svg viewBox="0 0 16 16" className="L-plan__ico"><circle cx="8" cy="8" r="7" stroke="#4b5563" strokeWidth="1.2" fill="none"/><path d="M5 8l2 2 4-4" stroke="#4b5563" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>AI-генерация</li>
                <li><svg viewBox="0 0 16 16" className="L-plan__ico"><circle cx="8" cy="8" r="7" stroke="#4b5563" strokeWidth="1.2" fill="none"/><path d="M5 8l2 2 4-4" stroke="#4b5563" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>Inline-редактор</li>
                <li><svg viewBox="0 0 16 16" className="L-plan__ico"><circle cx="8" cy="8" r="7" stroke="#4b5563" strokeWidth="1.2" fill="none"/><path d="M5 8l2 2 4-4" stroke="#4b5563" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>Публикация на поддомене</li>
              </ul>
            </div>

            {/* Pro */}
            <div className="L-plan L-plan--a">
              <div className="L-plan__glow" />
              <div className="L-plan__badge">Popular</div>
              <h3>Pro</h3>
              <p className="L-plan__desc">Полный набор инструментов для бизнеса с Telegram-интеграцией.</p>
              <div className="L-plan__price">990 ₽<span> / мес</span><span className="L-plan__discount">-20%</span></div>
              <a href="/dashboard" className="L-btn L-btn--accent L-plan__btn">Подписаться →</a>
              <div className="L-plan__includes">Что входит:</div>
              <ul>
                <li><svg viewBox="0 0 16 16" className="L-plan__ico L-plan__ico--a"><circle cx="8" cy="8" r="7" fill="#3b82f6"/><path d="M5 8l2 2 4-4" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>10 сайтов</li>
                <li><svg viewBox="0 0 16 16" className="L-plan__ico L-plan__ico--a"><circle cx="8" cy="8" r="7" fill="#3b82f6"/><path d="M5 8l2 2 4-4" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>Свой домен + SSL</li>
                <li><svg viewBox="0 0 16 16" className="L-plan__ico L-plan__ico--a"><circle cx="8" cy="8" r="7" fill="#3b82f6"/><path d="M5 8l2 2 4-4" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>Telegram-заявки</li>
                <li><svg viewBox="0 0 16 16" className="L-plan__ico L-plan__ico--a"><circle cx="8" cy="8" r="7" fill="#3b82f6"/><path d="M5 8l2 2 4-4" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>Все шаблоны и блоки</li>
                <li><svg viewBox="0 0 16 16" className="L-plan__ico L-plan__ico--a"><circle cx="8" cy="8" r="7" fill="#3b82f6"/><path d="M5 8l2 2 4-4" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>Приоритетная поддержка</li>
              </ul>
            </div>

            {/* Team */}
            <div className="L-plan">
              <h3>Team</h3>
              <p className="L-plan__desc">Для агентств и команд — безлимит и white-label.</p>
              <div className="L-plan__price">2 990 ₽<span> / мес</span><span className="L-plan__discount">-20%</span></div>
              <a href="/dashboard" className="L-btn L-btn--glass L-plan__btn">Подписаться →</a>
              <div className="L-plan__includes">Что входит:</div>
              <ul>
                <li><svg viewBox="0 0 16 16" className="L-plan__ico"><circle cx="8" cy="8" r="7" stroke="#4b5563" strokeWidth="1.2" fill="none"/><path d="M5 8l2 2 4-4" stroke="#4b5563" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>Всё из Pro</li>
                <li><svg viewBox="0 0 16 16" className="L-plan__ico"><circle cx="8" cy="8" r="7" stroke="#4b5563" strokeWidth="1.2" fill="none"/><path d="M5 8l2 2 4-4" stroke="#4b5563" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>Безлимит сайтов</li>
                <li><svg viewBox="0 0 16 16" className="L-plan__ico"><circle cx="8" cy="8" r="7" stroke="#4b5563" strokeWidth="1.2" fill="none"/><path d="M5 8l2 2 4-4" stroke="#4b5563" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>White-label</li>
                <li><svg viewBox="0 0 16 16" className="L-plan__ico"><circle cx="8" cy="8" r="7" stroke="#4b5563" strokeWidth="1.2" fill="none"/><path d="M5 8l2 2 4-4" stroke="#4b5563" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>API доступ</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="L-divider _a" />

        {/* ═══ CTA ═══ */}
        <section className="L-cta _a">
          <div className="L-cta__in">
            <h2>Готовы создать <span className="L-serif">свой сайт?</span></h2>
            <p>Присоединяйтесь к сотням бизнесов.</p>
            <a href="/dashboard" className="L-btn L-btn--accent L-btn--lg">Создать бесплатно ✦</a>
          </div>
        </section>

        <footer className="L-footer"><div className="L-footer__in"><span>© 2026 Creatly</span><div className="L-footer__links"><a href="#features">Возможности</a><a href="#pricing">Цены</a><a href="/auth">Войти</a></div></div></footer>
      </div>
    </>
  );
}
