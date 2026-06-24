"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import "./landing.css";

type Niche = "coffee" | "fitness" | "lawyer" | "beauty" | "restaurant" | "agency";

interface NC {
  label: string; emoji: string; site: string; brand: string;
  bg: string; accent: string; text: string;
  kicker: string; title: string; sub: string; cta: string;
  cards: { t: string; d: string }[];
  stats: { n: string; l: string }[];
}

const N: Record<Niche, NC> = {
  coffee: { label: "Кофейня", emoji: "☕", site: "brewcraft.ru", brand: "BrewCraft", bg: "#0c0806", accent: "#d4956a", text: "#c8b4a0", kicker: "Specialty Roasters", title: "Кофе, который\nвдохновляет", sub: "Обжарка каждую неделю. Доставка на следующий день.", cta: "Выбрать кофе →", cards: [{ t: "Эфиопия Yirgacheffe", d: "Бергамот, жасмин" }, { t: "Колумбия Supremo", d: "Шоколад, карамель" }, { t: "Кения AA", d: "Смородина, цитрус" }], stats: [{ n: "12+", l: "сортов" }, { n: "24ч", l: "доставка" }, { n: "4.9", l: "рейтинг" }] },
  fitness: { label: "Фитнес", emoji: "💪", site: "ironpulse.ru", brand: "IronPulse", bg: "#060a07", accent: "#3dd68c", text: "#a0c8b0", kicker: "Smart Training", title: "Тренировки нового\nуровня", sub: "AI-трекер. Результат через 4 недели.", cta: "Начать →", cards: [{ t: "Силовые", d: "8 уровней" }, { t: "HIIT", d: "20–45 мин" }, { t: "Recovery", d: "Йога" }], stats: [{ n: "2400+", l: "клиентов" }, { n: "96%", l: "довольны" }, { n: "4нед", l: "результат" }] },
  lawyer: { label: "Юрист", emoji: "⚖️", site: "pravoved.pro", brand: "Правовед", bg: "#07080c", accent: "#9a8a72", text: "#b8b0a4", kicker: "Юридическая практика", title: "Защитим ваши\nинтересы", sub: "15 лет опыта. Первая консультация бесплатно.", cta: "Записаться →", cards: [{ t: "Корпоративное", d: "M&A" }, { t: "Суды", d: "Все инстанции" }, { t: "IP", d: "Патенты" }], stats: [{ n: "100+", l: "дел/год" }, { n: "15", l: "лет" }, { n: "94%", l: "побед" }] },
  beauty: { label: "Салон", emoji: "✨", site: "glossstudio.ru", brand: "Gloss Studio", bg: "#0c060a", accent: "#e07898", text: "#c8a8b8", kicker: "Premium Beauty", title: "Красота —\nинвестиция в себя", sub: "Топ-мастера. Онлайн-запись за 30 секунд.", cta: "Записаться →", cards: [{ t: "Стрижки", d: "Стилисты" }, { t: "Маникюр", d: "Премиум" }, { t: "Косметология", d: "Уход" }], stats: [{ n: "12", l: "мастеров" }, { n: "4.9★", l: "рейтинг" }, { n: "3k+", l: "клиентов" }] },
  restaurant: { label: "Ресторан", emoji: "🍽️", site: "umami.kitchen", brand: "Umami", bg: "#0a0806", accent: "#c89868", text: "#c0b4a4", kicker: "Fine Dining", title: "Вкус, который\nзапоминается", sub: "Авторская кухня. Бронирование онлайн.", cta: "Забронировать →", cards: [{ t: "Дегустация", d: "7 подач" }, { t: "Сезонное", d: "Локальное" }, { t: "Бранч", d: "Вс 10–15" }], stats: [{ n: "200+", l: "вин" }, { n: "7", l: "подач" }, { n: "4.8★", l: "рейтинг" }] },
  agency: { label: "Агентство", emoji: "🚀", site: "launchpad.agency", brand: "LaunchPad", bg: "#06050c", accent: "#8a70ff", text: "#b0a8c8", kicker: "Digital Growth", title: "Запускаем\nрост бизнеса", sub: "Performance, дизайн, разработка. 200+ проектов.", cta: "Обсудить →", cards: [{ t: "Performance", d: "ROI" }, { t: "Дизайн", d: "UX/UI" }, { t: "Разработка", d: "MVP" }], stats: [{ n: "200+", l: "проектов" }, { n: "5лет", l: "опыт" }, { n: "x3.2", l: "ROI" }] },
};

const GALLERY = [
  { name: "BrewCraft", niche: "Кофейня", accent: "#d4956a", bg: "#0c0806" },
  { name: "IronPulse", niche: "Фитнес", accent: "#3dd68c", bg: "#060a07" },
  { name: "Правовед", niche: "Юрфирма", accent: "#9a8a72", bg: "#07080c" },
  { name: "Gloss Studio", niche: "Салон", accent: "#e07898", bg: "#0c060a" },
  { name: "Umami", niche: "Ресторан", accent: "#c89868", bg: "#0a0806" },
  { name: "LaunchPad", niche: "Агентство", accent: "#8a70ff", bg: "#06050c" },
  { name: "ZenYoga", niche: "Йога", accent: "#38bdf8", bg: "#050810" },
  { name: "AutoLine", niche: "Автосервис", accent: "#ef4444", bg: "#0a0505" },
];

const REVIEWS = [
  { q: "Показала клиенту демо — через 3 минуты он увидел свой будущий сайт. Раньше на это уходила неделя.", name: "Алина М.", role: "Wellness-студия", site: "zenbalance.ru", c: "#3dd68c" },
  { q: "4 лендинга для A/B теста за один вечер. Конверсия +34%. В Tilda это неделя работы.", name: "Илья В.", role: "Marketing Lead", site: "datapulse.io", c: "#4a8dff" },
  { q: "AI понимает нишу. Для юриста — одна структура, для кофейни — другая. Не шаблонщик.", name: "Мария Л.", role: "Product manager", site: null, c: "#8a70ff" },
  { q: "Бриф → AI → редактор → публикация. Клиент видит результат в тот же день. Game changer.", name: "Денис Р.", role: "Digital-агентство", site: "launchpad.agency", c: "#ff6b35" },
  { q: "Кофейня, барбершоп, автосервис — каждый получил уникальный сайт, не шаблонную копию.", name: "Кира С.", role: "No-code консультант", site: null, c: "#e07898" },
  { q: "Правлю текст прямо на странице, добавляю блоки, публикую — всё за 10 минут. Идеально.", name: "Никита П.", role: "Founder", site: "freshgoods.ru", c: "#d4956a" },
];

/* ── Mini-site ── */
function MS({ n }: { n: NC }) {
  return (
    <div className="ms" style={{ background: n.bg, color: n.text }}>
      <div className="ms__hero" style={{ background: `radial-gradient(ellipse 90% 70% at 50% 0%, ${n.accent}15, transparent 55%)` }}>
        <div className="ms__nav">
          <strong style={{ color: "#fff", fontSize: 12 }}>{n.brand}</strong>
          <div className="ms__nav-r"><span>О нас</span><span>Услуги</span><span>Контакты</span></div>
        </div>
        <span className="ms__kicker" style={{ color: n.accent }}>{n.kicker}</span>
        <h2 style={{ color: "#fff", whiteSpace: "pre-line" }}>{n.title}</h2>
        <p>{n.sub}</p>
        <span className="ms__cta" style={{ background: n.accent, color: "#fff" }}>{n.cta}</span>
      </div>
      <div className="ms__cards">
        {n.cards.map((c, i) => (
          <div key={i} className="ms__card" style={{ background: `${n.accent}08`, border: `1px solid ${n.accent}12` }}>
            <div className="ms__card-vis" style={{ background: `linear-gradient(135deg, ${n.accent}10, ${n.accent}04)` }} />
            <div className="ms__card-body">
              <h4 style={{ color: "#fff" }}>{c.t}</h4>
              <p>{c.d}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="ms__stats">
        {n.stats.map((s, i) => (
          <div key={i} className="ms__stat"><strong style={{ color: n.accent }}>{s.n}</strong><span>{s.l}</span></div>
        ))}
      </div>
      <div className="ms__foot">{n.brand} © 2026</div>
    </div>
  );
}

/* ── Gallery thumbnail ── */
function GT({ accent, bg }: { accent: string; bg: string }) {
  return (
    <div className="L2-gallery__scroll" style={{ background: bg, padding: "16px 14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, opacity: .4 }}>
        <div style={{ width: 40, height: 4, borderRadius: 2, background: accent }} />
        <div style={{ display: "flex", gap: 6 }}>
          {[1, 2, 3].map(i => <div key={i} style={{ width: 18, height: 3, borderRadius: 2, background: `${accent}40` }} />)}
        </div>
      </div>
      <div style={{ background: `radial-gradient(ellipse 80% 50% at 50% 20%, ${accent}12, transparent 55%)`, padding: "20px 12px 16px", borderRadius: 6, marginBottom: 12 }}>
        <div style={{ width: "35%", height: 3, borderRadius: 2, background: `${accent}45`, marginBottom: 8 }} />
        <div style={{ width: "80%", height: 10, borderRadius: 3, background: `${accent}15`, marginBottom: 5 }} />
        <div style={{ width: "55%", height: 10, borderRadius: 3, background: `${accent}10`, marginBottom: 12 }} />
        <div style={{ width: "28%", height: 7, borderRadius: 4, background: accent, opacity: .6 }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 12 }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{ borderRadius: 5, border: `1px solid ${accent}10` }}>
            <div style={{ height: 32, background: `${accent}06`, borderRadius: "5px 5px 0 0" }} />
            <div style={{ padding: 6 }}>
              <div style={{ width: "60%", height: 3, borderRadius: 2, background: `${accent}18`, marginBottom: 3 }} />
              <div style={{ width: "80%", height: 2, borderRadius: 2, background: `${accent}0a` }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 14, justifyContent: "center", padding: "10px 0", borderTop: `1px solid ${accent}08` }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ width: 16, height: 8, borderRadius: 2, background: `${accent}25`, margin: "0 auto 3px" }} />
            <div style={{ width: 22, height: 2, borderRadius: 1, background: `${accent}12`, margin: "0 auto" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════ */
export function LandingClient() {
  const [scrolled, setScrolled] = useState(false);
  const [niche, setNiche] = useState<Niche | null>(null);
  const [genning, setGenning] = useState(false);
  const [done, setDone] = useState(false);
  const [prog, setProg] = useState(0);
  const [qi, setQi] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clr = useCallback(() => { timers.current.forEach(clearTimeout); timers.current = []; }, []);
  useEffect(() => () => clr(), [clr]);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    h();
    return () => window.removeEventListener("scroll", h);
  }, []);

  const obs = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    obs.current = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("_v"); }),
      { threshold: 0.06 },
    );
    document.querySelectorAll("._a").forEach((el) => obs.current?.observe(el));
    return () => obs.current?.disconnect();
  }, []);

  const go = useCallback((n: Niche) => {
    clr();
    setNiche(n); setGenning(true); setDone(false); setProg(0);
    [180, 450, 800, 1200, 1600, 2000].forEach((d, i) => {
      timers.current.push(setTimeout(() => setProg([10, 28, 50, 70, 88, 100][i]), d));
    });
    timers.current.push(setTimeout(() => { setGenning(false); setDone(true); }, 2400));
  }, [clr]);

  const rst = useCallback(() => {
    clr(); setNiche(null); setGenning(false); setDone(false); setProg(0);
  }, [clr]);

  const nd = niche ? N[niche] : null;

  const chk = (c: string) => (
    <svg viewBox="0 0 13 13" className="L2-pl__chk"><circle cx="6.5" cy="6.5" r="5.5" fill={c} /><path d="M4 6.5l1.5 1.5 3.5-3.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
  );

  return (
    <div className="L2">
      <div className="L2-bg"><div className="L2-bg__g L2-bg__g1" /><div className="L2-bg__g L2-bg__g2" /></div>

      {/* Nav */}
      <nav className={`L2-nav${scrolled ? " is-s" : ""}`}>
        <div className="L2-nav__in">
          <a href="/" className="L2-nav__brand"><img className="L2-nav__logo" src="/landing/logo.webp" alt="" />Creatly</a>
          <div className="L2-nav__links">
            <a href="#features">Возможности</a>
            <a href="#gallery">Примеры</a>
            <a href="#how">Процесс</a>
            <a href="#pricing">Цены</a>
          </div>
          <a href="/auth" className="L2-nav__cta">Попробовать →</a>
        </div>
      </nav>

      {/* ═══ HERO = THE DEMO ═══ */}
      <section className="L2-hero">
        <div className="L2-hero__text">
          <div className="L2-hero__pill">AI Website Builder</div>
          <h1>Опишите бизнес —<br />получите <em>готовый сайт</em></h1>
          <p className="L2-hero__sub">Выберите нишу ниже. Смотрите, как AI создаёт сайт за 3 секунды.</p>
          <div className="L2-hero__actions">
            <a href="/dashboard" className="L2-btn L2-btn--p">Создать свой сайт</a>
            <a href="#features" className="L2-btn L2-btn--g">Подробнее ↓</a>
          </div>
        </div>

        <div className="L2-demo">
          <div className="L2-demo__bar">
            <div className="L2-demo__dots"><i /><i /><i /></div>
            <div className="L2-demo__url">{nd ? nd.site : "выберите нишу ↓"}</div>
            <div className="L2-demo__tag">✦ AI</div>
          </div>
          <div className="L2-demo__body">
            <div className={`L2-pick${genning || done ? " is-h" : ""}`}>
              <div className="L2-pick__label">Выберите нишу — AI сгенерирует сайт</div>
              <div className="L2-pick__grid">
                {(Object.entries(N) as [Niche, NC][]).map(([k, d]) => (
                  <button key={k} className="L2-pick__btn" onClick={() => go(k)}>{d.emoji} {d.label}</button>
                ))}
              </div>
            </div>
            <div className={`L2-gen${genning ? " is-on" : ""}`}>
              <div className="L2-gen__ring" />
              <div className="L2-gen__t">{prog < 25 ? "Анализирую нишу..." : prog < 55 ? "Генерирую структуру..." : prog < 85 ? "Подбираю дизайн..." : "Финализирую..."}</div>
              <div className="L2-gen__bar"><div className="L2-gen__fill" style={{ transform: `scaleX(${prog / 100})` }} /></div>
            </div>
            <div className={`L2-prev${done && nd ? " is-on" : ""}`}>
              {nd && <MS n={nd} />}
            </div>
            <button className={`L2-demo__reset${done ? " is-on" : ""}`} onClick={rst}>← Другая ниша</button>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES — alternating rows, not grid ═══ */}
      <section className="L2-what" id="features">
        <div className="L2-what__label">Возможности</div>
        <h2>Не конструктор.<br /><em>Инструмент</em></h2>

        <div className="L2-feat _a">
          <div className="L2-feat__info">
            <span className="L2-feat__num">01 — AI-генерация</span>
            <h3>Полный сайт из голосового описания</h3>
            <p>Опишите бизнес голосом или текстом. AI создаст уникальный дизайн с реальным контентом, фотографиями и формами. Это не шаблон — это генерация под вашу нишу.</p>
          </div>
          <div className="L2-feat__visual">
            <img src="/landing/main.webp" alt="Интерфейс Creatly" style={{ width: "100%", aspectRatio: "2002/1330", objectFit: "cover" }} />
          </div>
        </div>

        <div className="L2-feat _a">
          <div className="L2-feat__info">
            <span className="L2-feat__num">02 — Inline-редактор</span>
            <h3>Кликните и меняйте. Без панелей</h3>
            <p>Текст, цвета, шрифты, изображения — всё редактируется прямо на странице. Никаких сайдбаров с 50 настройками. Как Figma, только для контента.</p>
          </div>
          <div className="L2-feat__visual">
            <div className="L2-feat__mock">
              <div className="L2-feat__mock-row">
                <div style={{ width: 14, height: 14, borderRadius: 3, background: "rgba(108,92,231,.3)" }} />
                <div style={{ flex: 1, height: 6, borderRadius: 3, background: "rgba(255,255,255,.04)" }} />
              </div>
              <div style={{ height: 28, borderRadius: 5, background: "rgba(108,92,231,.06)", border: "1px dashed rgba(108,92,231,.2)", display: "flex", alignItems: "center", padding: "0 10px", fontSize: 11, color: "#6c5ce7" }}>
                Заголовок вашего сайта_
              </div>
              <div style={{ height: 12, borderRadius: 3, background: "rgba(255,255,255,.025)", width: "75%" }} />
              <div style={{ height: 12, borderRadius: 3, background: "rgba(255,255,255,.025)", width: "55%" }} />
              <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                <div style={{ height: 20, borderRadius: 4, background: "rgba(255,107,53,.1)", border: "1px solid rgba(255,107,53,.15)", flex: 1, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#ff6b35" }}>Кнопка CTA</div>
                <div style={{ height: 20, borderRadius: 4, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", flex: 1 }} />
              </div>
            </div>
          </div>
        </div>

        <div className="L2-feat _a">
          <div className="L2-feat__info">
            <span className="L2-feat__num">03 — Telegram-заявки</span>
            <h3>Лиды прямо в мессенджер</h3>
            <p>Каждая форма на сайте отправляет заявку в ваш Telegram-бот. Мгновенно. Без CRM, без почты, без потерянных лидов.</p>
          </div>
          <div className="L2-feat__visual">
            <div className="L2-feat__mock">
              <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "8px 10px", borderRadius: 6, background: "rgba(0,136,204,.06)", border: "1px solid rgba(0,136,204,.1)" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(0,136,204,.15)", display: "grid", placeItems: "center", fontSize: 14 }}>📲</div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#e0e8f0", marginBottom: 2 }}>Новая заявка</div>
                  <div style={{ fontSize: 9, color: "#5a7088" }}>Имя: Андрей К. / +7 925 ***</div>
                </div>
                <div style={{ marginLeft: "auto", fontSize: 8, color: "#3a5068" }}>сейчас</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "8px 10px", borderRadius: 6, background: "rgba(0,136,204,.03)", border: "1px solid rgba(0,136,204,.06)", opacity: .5 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(0,136,204,.1)", display: "grid", placeItems: "center", fontSize: 14 }}>📲</div>
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

      {/* ═══ GALLERY — horizontal scroll ═══ */}
      <section className="L2-gallery _a" id="gallery">
        <div className="L2-gallery__head">
          <div className="L2-what__label">Примеры</div>
          <h2>Сайты, созданные <em>за минуты</em></h2>
        </div>
        <div className="L2-gallery__track">
          {GALLERY.map((s, i) => (
            <div className="L2-gallery__card" key={i}>
              <div className="L2-gallery__thumb"><GT accent={s.accent} bg={s.bg} /></div>
              <div className="L2-gallery__meta">
                <div><div className="L2-gallery__name">{s.name}</div><div className="L2-gallery__niche">{s.niche}</div></div>
                <span className="L2-gallery__go">Открыть →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ HOW ═══ */}
      <section className="L2-how _a" id="how">
        <h2>Три шага до <em>готового сайта</em></h2>
        <div className="L2-how__line">
          {[
            { n: "01", t: "Расскажите", d: "Голосом или текстом — что за бизнес, для кого, какой стиль." },
            { n: "02", t: "AI создаёт", d: "Уникальный дизайн с контентом и фото. Не шаблон — генерация." },
            { n: "03", t: "Публикуйте", d: "Отредактируйте inline. Один клик — сайт в сети, заявки в Telegram." },
          ].map((s, i) => (
            <div className="L2-how__s" key={i}><div className="L2-how__n">{s.n}</div><h3>{s.t}</h3><p>{s.d}</p></div>
          ))}
        </div>
      </section>

      {/* ═══ TESTIMONIALS — single big quote ═══ */}
      <section className="L2-quotes _a" id="testimonials">
        <h2>Бизнесы <em>уже используют</em></h2>
        <div className="L2-quote" key={qi}>
          <div className="L2-quote__text">{REVIEWS[qi].q}</div>
          <div className="L2-quote__who">
            <div className="L2-quote__ava" style={{ background: REVIEWS[qi].c }}>{REVIEWS[qi].name.split(" ").map(w => w[0]).join("")}</div>
            <div className="L2-quote__info">
              <div className="L2-quote__name">{REVIEWS[qi].name}</div>
              <div className="L2-quote__role">{REVIEWS[qi].role}</div>
              {REVIEWS[qi].site && <div className="L2-quote__site">{REVIEWS[qi].site} →</div>}
            </div>
          </div>
        </div>
        <div className="L2-quotes__nav">
          {REVIEWS.map((_, i) => (
            <button key={i} className={`L2-quotes__dot${i === qi ? " is-on" : ""}`} onClick={() => setQi(i)} />
          ))}
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section className="L2-price _a" id="pricing">
        <h2>Простое <em>ценообразование</em></h2>
        <div className="L2-price__grid">
          <div className="L2-pl">
            <h3>Free</h3>
            <p className="L2-pl__d">Первый сайт бесплатно. Навсегда.</p>
            <div className="L2-pl__p">0 ₽<span> / мес</span></div>
            <a href="/dashboard" className="L2-btn L2-btn--g L2-pl__cta">Начать бесплатно →</a>
            <div className="L2-pl__sep">Что входит</div>
            <ul>{["1 сайт", "AI-генерация", "Inline-редактор", "Поддомен"].map((x, i) => <li key={i}>{chk("#2a3444")}{x}</li>)}</ul>
          </div>
          <div className="L2-pl L2-pl--a">
            <div className="L2-pl__badge">Popular</div>
            <h3>Pro</h3>
            <p className="L2-pl__d">Домен, Telegram, все возможности.</p>
            <div className="L2-pl__p">990 ₽<span> / мес</span><span className="L2-pl__discount">-20%</span></div>
            <a href="/dashboard" className="L2-btn L2-btn--p L2-pl__cta">Подписаться →</a>
            <div className="L2-pl__sep">Что входит</div>
            <ul>{["10 сайтов", "Свой домен + SSL", "Telegram-заявки", "Все шаблоны", "Приоритет"].map((x, i) => <li key={i}>{chk("var(--acc)")}{x}</li>)}</ul>
          </div>
          <div className="L2-pl">
            <h3>Team</h3>
            <p className="L2-pl__d">Безлимит, white-label, API.</p>
            <div className="L2-pl__p">2 990 ₽<span> / мес</span><span className="L2-pl__discount">-20%</span></div>
            <a href="/dashboard" className="L2-btn L2-btn--g L2-pl__cta">Подписаться →</a>
            <div className="L2-pl__sep">Что входит</div>
            <ul>{["Всё из Pro", "Безлимит сайтов", "White-label", "API доступ"].map((x, i) => <li key={i}>{chk("#2a3444")}{x}</li>)}</ul>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="L2-cta _a">
        <div className="L2-cta__in">
          <h2>Готовы создать <em>свой сайт?</em></h2>
          <p>Результат через 2 минуты. Без кредитной карты.</p>
          <a href="/dashboard" className="L2-btn L2-btn--p L2-btn--lg">Создать бесплатно</a>
        </div>
      </section>

      <footer className="L2-footer">
        <div className="L2-footer__in">
          <span>© 2026 Creatly</span>
          <div className="L2-footer__links"><a href="#features">Возможности</a><a href="#gallery">Примеры</a><a href="#pricing">Цены</a><a href="/auth">Войти</a></div>
        </div>
      </footer>
    </div>
  );
}
