export interface BlockVariant {
  id: string;
  label: string;
  css: string;
}

export interface BlockPreset {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  html: string;
  css: string;
  variants?: BlockVariant[];
}

export const blockPresets: BlockPreset[] = [
  {
    id: "hero-centered",
    name: "Hero по центру",
    description: "Заголовок, подзаголовок и кнопка — всё по центру на тёмном фоне",
    category: "hero",
    icon: "◆",
    html: `<section class="sb-hero-centered" data-block="hero">
  <p class="sb-eyebrow" data-field="eyebrow">Подзаголовок</p>
  <h1 data-field="title">Заголовок вашего проекта</h1>
  <p class="sb-hero-desc" data-field="subtitle">Описание, которое объясняет суть вашего продукта или услуги в одном-двух предложениях.</p>
  <a class="sb-btn" href="#" data-field="action">Начать</a>
</section>`,
    css: `.sb-hero-centered{text-align:center;padding:100px 40px;background:linear-gradient(135deg,#0f172a,#1e293b)}.sb-hero-centered h1{font-size:clamp(36px,6vw,72px);color:#fff;margin:0 auto;max-width:800px;line-height:1.05}.sb-hero-centered .sb-eyebrow{color:#818cf8;font-weight:800;text-transform:uppercase;letter-spacing:.08em;font-size:14px}.sb-hero-centered .sb-hero-desc{color:#94a3b8;font-size:18px;max-width:560px;margin:20px auto 32px;line-height:1.6}.sb-btn{display:inline-flex;align-items:center;min-height:48px;padding:0 28px;border-radius:10px;background:#6366f1;color:#fff;text-decoration:none;font-weight:800;font-size:15px}`,
    variants: [
      { id: "dark", label: "Тёмный", css: `.sb-hero-centered{background:linear-gradient(135deg,#0f172a,#1e293b)}` },
      { id: "light", label: "Светлый", css: `.sb-hero-centered{background:#fff}.sb-hero-centered h1{color:#0f172a}.sb-hero-centered .sb-hero-desc{color:#64748b}` },
      { id: "gradient", label: "Градиент", css: `.sb-hero-centered{background:linear-gradient(135deg,#667eea,#764ba2)}` },
    ],
  },
  {
    id: "hero-split",
    name: "Hero с картинкой",
    description: "Текст слева, большое изображение справа — классический split layout",
    category: "hero",
    icon: "◧",
    html: `<section class="sb-hero-split" data-block="hero">
  <div>
    <h1 data-field="title">Создавайте без ограничений</h1>
    <p data-field="subtitle">Интуитивный конструктор, который не стоит между вами и вашей идеей.</p>
    <a class="sb-btn" href="#" data-field="action">Попробовать бесплатно</a>
  </div>
  <img data-field="image" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" alt="Preview" />
</section>`,
    css: `.sb-hero-split{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;padding:80px 60px;background:#fff}.sb-hero-split h1{font-size:clamp(32px,4vw,56px);margin:0;line-height:1.1;color:#0f172a}.sb-hero-split p{color:#64748b;font-size:18px;line-height:1.6;margin:16px 0 32px}.sb-hero-split img{width:100%;border-radius:16px;object-fit:cover;aspect-ratio:4/3}@media(max-width:768px){.sb-hero-split{grid-template-columns:1fr;padding:40px 24px}}`,
    variants: [
      { id: "light", label: "Светлый", css: `.sb-hero-split{background:#fff}` },
      { id: "dark", label: "Тёмный", css: `.sb-hero-split{background:#0f172a}.sb-hero-split h1{color:#fff}.sb-hero-split p{color:#94a3b8}` },
    ],
  },
  {
    id: "features-3col",
    name: "3 преимущества",
    description: "Три карточки с иконками — покажите ключевые фичи продукта",
    category: "features",
    icon: "▦",
    html: `<section class="sb-features" data-block="features">
  <h2 data-field="title">Почему выбирают нас</h2>
  <div class="sb-features-grid">
    <article data-field="feature"><div class="sb-feat-icon">⚡</div><h3>Быстро</h3><p>Результат за минуты, не за недели.</p></article>
    <article data-field="feature"><div class="sb-feat-icon">✎</div><h3>Просто</h3><p>Никакого кода — только визуальный редактор.</p></article>
    <article data-field="feature"><div class="sb-feat-icon">⚙</div><h3>Гибко</h3><p>Полный контроль над каждым пикселем.</p></article>
  </div>
</section>`,
    css: `.sb-features{padding:80px 60px;text-align:center;background:#fafbff}.sb-features h2{font-size:36px;margin:0 0 48px;color:#0f172a}.sb-features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;max-width:1000px;margin:0 auto}.sb-features-grid article{padding:32px;border-radius:16px;background:#fff;border:1px solid #e2e8f0;text-align:left}.sb-feat-icon{font-size:28px;margin-bottom:12px}.sb-features-grid h3{margin:0 0 8px;font-size:18px;color:#0f172a}.sb-features-grid p{margin:0;color:#64748b;line-height:1.6;font-size:15px}@media(max-width:768px){.sb-features{padding:40px 24px}.sb-features-grid{grid-template-columns:1fr}}`,
    variants: [
      { id: "light", label: "Светлый", css: `.sb-features{background:#fafbff}` },
      { id: "dark", label: "Тёмный", css: `.sb-features{background:#0f172a}.sb-features h2{color:#fff}.sb-features-grid article{background:#1e293b;border-color:#334155}.sb-features-grid h3{color:#fff}.sb-features-grid p{color:#94a3b8}` },
    ],
  },
  {
    id: "cta-banner",
    name: "Призыв к действию",
    description: "Яркий баннер с заголовком и кнопкой — мотивируйте к действию",
    category: "cta",
    icon: "▶",
    html: `<section class="sb-cta" data-block="cta">
  <h2 data-field="title">Готовы начать?</h2>
  <p data-field="subtitle">Присоединяйтесь к тысячам компаний, которые уже используют наш продукт.</p>
  <a class="sb-btn sb-btn--light" href="#" data-field="action">Начать бесплатно</a>
</section>`,
    css: `.sb-cta{text-align:center;padding:80px 40px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:20px;margin:40px}.sb-cta h2{font-size:clamp(28px,4vw,48px);color:#fff;margin:0 0 16px}.sb-cta p{color:rgba(255,255,255,.8);font-size:18px;margin:0 auto 32px;max-width:480px;line-height:1.6}.sb-btn--light{background:#fff;color:#6366f1}`,
    variants: [
      { id: "purple", label: "Фиолетовый", css: `.sb-cta{background:linear-gradient(135deg,#6366f1,#8b5cf6)}` },
      { id: "blue", label: "Синий", css: `.sb-cta{background:linear-gradient(135deg,#2563eb,#0ea5e9)}` },
      { id: "green", label: "Зелёный", css: `.sb-cta{background:linear-gradient(135deg,#059669,#10b981)}` },
    ],
  },
  {
    id: "pricing-3col",
    name: "Тарифы",
    description: "Три колонки с ценами — Старт, Про, Команда",
    category: "pricing",
    icon: "⊞",
    html: `<section class="sb-pricing" data-block="pricing">
  <h2 data-field="title">Тарифы</h2>
  <div class="sb-pricing-grid">
    <div class="sb-plan"><h3>Старт</h3><div class="sb-price">0 ₽</div><p>Для личных проектов</p><ul><li>1 сайт</li><li>Базовые шаблоны</li><li>Экспорт HTML</li></ul><a class="sb-btn sb-btn--outline" href="#">Выбрать</a></div>
    <div class="sb-plan sb-plan--accent"><h3>Про</h3><div class="sb-price">990 ₽/мес</div><p>Для бизнеса</p><ul><li>10 сайтов</li><li>Все шаблоны</li><li>AI-генерация</li><li>Приоритетная поддержка</li></ul><a class="sb-btn" href="#">Выбрать</a></div>
    <div class="sb-plan"><h3>Команда</h3><div class="sb-price">2 990 ₽/мес</div><p>Для агентств</p><ul><li>Безлимит сайтов</li><li>White-label</li><li>API доступ</li></ul><a class="sb-btn sb-btn--outline" href="#">Выбрать</a></div>
  </div>
</section>`,
    css: `.sb-pricing{padding:80px 60px;text-align:center;background:#fff}.sb-pricing h2{font-size:36px;margin:0 0 48px;color:#0f172a}.sb-pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:960px;margin:0 auto}.sb-plan{padding:32px;border:1px solid #e2e8f0;border-radius:16px;text-align:left}.sb-plan--accent{border-color:#6366f1;background:#f5f3ff}.sb-plan h3{font-size:20px;margin:0 0 8px;color:#0f172a}.sb-price{font-size:32px;font-weight:800;color:#0f172a;margin-bottom:8px}.sb-plan p{color:#64748b;margin:0 0 20px;font-size:14px}.sb-plan ul{list-style:none;padding:0;margin:0 0 24px}.sb-plan li{padding:6px 0;color:#334155;font-size:14px;border-bottom:1px solid #f1f5f9}.sb-btn--outline{background:transparent;border:2px solid #e2e8f0;color:#0f172a}@media(max-width:768px){.sb-pricing{padding:40px 24px}.sb-pricing-grid{grid-template-columns:1fr}}`,
  },
  {
    id: "testimonials",
    name: "Отзывы клиентов",
    description: "Цитаты довольных клиентов — вызывают доверие к продукту",
    category: "social",
    icon: "❝",
    html: `<section class="sb-testimonials" data-block="testimonials">
  <h2 data-field="title">Что говорят клиенты</h2>
  <div class="sb-test-grid">
    <blockquote><p data-field="text">"Лучший конструктор, который я использовал. Результат за 20 минут."</p><cite data-field="author">Анна К., дизайнер</cite></blockquote>
    <blockquote><p data-field="text">"Наконец-то сайт можно сделать без разработчика и без компромиссов."</p><cite data-field="author">Максим Д., предприниматель</cite></blockquote>
  </div>
</section>`,
    css: `.sb-testimonials{padding:80px 60px;background:#f8fafc}.sb-testimonials h2{font-size:36px;margin:0 0 48px;text-align:center;color:#0f172a}.sb-test-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;max-width:900px;margin:0 auto}.sb-test-grid blockquote{margin:0;padding:28px;border-radius:16px;background:#fff;border:1px solid #e2e8f0}.sb-test-grid p{font-size:16px;line-height:1.6;color:#334155;margin:0 0 16px;font-style:italic}.sb-test-grid cite{color:#6366f1;font-weight:700;font-size:14px;font-style:normal}@media(max-width:768px){.sb-testimonials{padding:40px 24px}.sb-test-grid{grid-template-columns:1fr}}`,
  },
  {
    id: "footer-simple",
    name: "Футер",
    description: "Простой футер с логотипом, ссылками и копирайтом",
    category: "footer",
    icon: "▬",
    html: `<footer class="sb-footer" data-block="footer">
  <div class="sb-footer-inner">
    <div><strong data-field="brand">Creatly</strong><p data-field="copyright">© 2026. Все права защищены.</p></div>
    <nav><a href="#" data-field="link">О нас</a><a href="#" data-field="link">Контакты</a><a href="#" data-field="link">Политика</a></nav>
  </div>
</footer>`,
    css: `.sb-footer{padding:40px 60px;background:#0f172a;color:#94a3b8}.sb-footer-inner{display:flex;justify-content:space-between;align-items:center;max-width:1200px;margin:0 auto}.sb-footer strong{color:#fff;font-size:16px;display:block}.sb-footer p{margin:4px 0 0;font-size:13px}.sb-footer nav{display:flex;gap:24px}.sb-footer a{color:#94a3b8;text-decoration:none;font-size:14px;font-weight:600}.sb-footer a:hover{color:#fff}@media(max-width:768px){.sb-footer{padding:24px}.sb-footer-inner{flex-direction:column;gap:20px;text-align:center}}`,
  },
  // ── Collection blocks ──
  {
    id: "products-grid",
    name: "Каталог товаров",
    description: "Карточки товаров с фото, названием и ценой — добавляй и удаляй прямо в редакторе",
    category: "collection",
    icon: "🛍",
    html: `<section class="sb-products" data-block="products" data-collection="products">
  <h2 data-field="title">Наши товары</h2>
  <p class="sb-products-subtitle" data-field="subtitle">Выберите то, что подходит именно вам</p>
  <div class="sb-products-grid" data-collection-grid>
    <article class="sb-product-card" data-collection-item>
      <img data-field="image" src="https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&q=80" alt="Товар" />
      <div class="sb-product-body">
        <h3 data-field="name">Торт «Наполеон»</h3>
        <p data-field="description">Классический слоёный торт с нежным кремом и хрустящими коржами.</p>
        <div class="sb-product-footer">
          <span class="sb-product-price" data-field="price">2 500 ₽</span>
          <a class="sb-btn sb-btn--sm" href="#" data-field="action">Заказать</a>
        </div>
      </div>
    </article>
    <article class="sb-product-card" data-collection-item>
      <img data-field="image" src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80" alt="Товар" />
      <div class="sb-product-body">
        <h3 data-field="name">Торт «Медовик»</h3>
        <p data-field="description">Медовые коржи со сметанным кремом — вкус знакомый с детства.</p>
        <div class="sb-product-footer">
          <span class="sb-product-price" data-field="price">2 200 ₽</span>
          <a class="sb-btn sb-btn--sm" href="#" data-field="action">Заказать</a>
        </div>
      </div>
    </article>
    <article class="sb-product-card" data-collection-item>
      <img data-field="image" src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80" alt="Товар" />
      <div class="sb-product-body">
        <h3 data-field="name">Торт «Прага»</h3>
        <p data-field="description">Шоколадный бисквит с шоколадным кремом и зеркальной глазурью.</p>
        <div class="sb-product-footer">
          <span class="sb-product-price" data-field="price">2 800 ₽</span>
          <a class="sb-btn sb-btn--sm" href="#" data-field="action">Заказать</a>
        </div>
      </div>
    </article>
  </div>
</section>`,
    css: `.sb-products{padding:80px 60px;background:#fff}.sb-products h2{font-size:36px;margin:0 0 8px;color:#0f172a;text-align:center}.sb-products-subtitle{text-align:center;color:#64748b;font-size:16px;margin:0 0 48px}.sb-products-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:24px;max-width:1200px;margin:0 auto}.sb-product-card{border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;background:#fff;transition:box-shadow .2s,transform .2s}.sb-product-card:hover{box-shadow:0 8px 30px rgba(0,0,0,.08);transform:translateY(-2px)}.sb-product-card img{width:100%;aspect-ratio:4/3;object-fit:cover}.sb-product-body{padding:20px}.sb-product-body h3{margin:0 0 8px;font-size:18px;color:#0f172a}.sb-product-body p{margin:0 0 16px;color:#64748b;font-size:14px;line-height:1.5}.sb-product-footer{display:flex;align-items:center;justify-content:space-between}.sb-product-price{font-size:20px;font-weight:800;color:#0f172a}.sb-btn--sm{display:inline-flex;align-items:center;height:36px;padding:0 18px;border-radius:8px;background:#6366f1;color:#fff;text-decoration:none;font-weight:700;font-size:13px}@media(max-width:768px){.sb-products{padding:40px 24px}}`,
    variants: [
      { id: "light", label: "Светлый", css: `.sb-products{background:#fff}` },
      { id: "dark", label: "Тёмный", css: `.sb-products{background:#0f172a}.sb-products h2{color:#fff}.sb-products-subtitle{color:#94a3b8}.sb-product-card{background:#1e293b;border-color:#334155}.sb-product-body h3{color:#fff}.sb-product-body p{color:#94a3b8}.sb-product-price{color:#fff}` },
      { id: "warm", label: "Тёплый", css: `.sb-products{background:#fffbf5}.sb-product-card{border-color:#f5e6d3}.sb-btn--sm{background:#d97706}` },
    ],
  },
  {
    id: "portfolio-grid",
    name: "Портфолио / Кейсы",
    description: "Сетка кейсов с изображениями — покажите свои лучшие работы",
    category: "collection",
    icon: "◫",
    html: `<section class="sb-portfolio" data-block="portfolio" data-collection="portfolio">
  <h2 data-field="title">Наши работы</h2>
  <div class="sb-portfolio-grid" data-collection-grid>
    <article class="sb-portfolio-card" data-collection-item>
      <img data-field="image" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80" alt="Кейс" />
      <div class="sb-portfolio-overlay">
        <h3 data-field="name">Редизайн интернет-магазина</h3>
        <p data-field="description">Увеличили конверсию на 40% за 3 месяца</p>
      </div>
    </article>
    <article class="sb-portfolio-card" data-collection-item>
      <img data-field="image" src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80" alt="Кейс" />
      <div class="sb-portfolio-overlay">
        <h3 data-field="name">Мобильное приложение</h3>
        <p data-field="description">От идеи до запуска за 8 недель</p>
      </div>
    </article>
    <article class="sb-portfolio-card" data-collection-item>
      <img data-field="image" src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=600&q=80" alt="Кейс" />
      <div class="sb-portfolio-overlay">
        <h3 data-field="name">Корпоративный сайт</h3>
        <p data-field="description">Современный дизайн и быстрая загрузка</p>
      </div>
    </article>
    <article class="sb-portfolio-card" data-collection-item>
      <img data-field="image" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80" alt="Кейс" />
      <div class="sb-portfolio-overlay">
        <h3 data-field="name">Маркетплейс услуг</h3>
        <p data-field="description">Платформа объединяющая 500+ специалистов</p>
      </div>
    </article>
  </div>
</section>`,
    css: `.sb-portfolio{padding:80px 60px;background:#0f172a}.sb-portfolio h2{font-size:36px;margin:0 0 48px;color:#fff;text-align:center}.sb-portfolio-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px;max-width:1200px;margin:0 auto}.sb-portfolio-card{position:relative;border-radius:16px;overflow:hidden;aspect-ratio:4/3;cursor:pointer}.sb-portfolio-card img{width:100%;height:100%;object-fit:cover;transition:transform .4s}.sb-portfolio-card:hover img{transform:scale(1.05)}.sb-portfolio-overlay{position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,.8) 0%,transparent 60%);display:flex;flex-direction:column;justify-content:flex-end;padding:24px;opacity:0;transition:opacity .3s;pointer-events:none}.sb-portfolio-card:hover .sb-portfolio-overlay{opacity:1;pointer-events:auto}.sb-portfolio-overlay h3{color:#fff;font-size:18px;margin:0 0 4px}.sb-portfolio-overlay p{color:rgba(255,255,255,.7);font-size:14px;margin:0}@media(max-width:768px){.sb-portfolio{padding:40px 24px}.sb-portfolio-grid{grid-template-columns:1fr}}`,
    variants: [
      { id: "dark", label: "Тёмный", css: `.sb-portfolio{background:#0f172a}` },
      { id: "light", label: "Светлый", css: `.sb-portfolio{background:#fff}.sb-portfolio h2{color:#0f172a}.sb-portfolio-overlay{background:linear-gradient(0deg,rgba(0,0,0,.7) 0%,transparent 50%)}` },
    ],
  },
  {
    id: "team-grid",
    name: "Команда",
    description: "Карточки сотрудников с фото, именем и должностью",
    category: "collection",
    icon: "👥",
    html: `<section class="sb-team" data-block="team" data-collection="team">
  <h2 data-field="title">Наша команда</h2>
  <p class="sb-team-subtitle" data-field="subtitle">Люди, которые делают продукт</p>
  <div class="sb-team-grid" data-collection-grid>
    <article class="sb-team-card" data-collection-item>
      <img data-field="image" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" alt="Фото" />
      <h3 data-field="name">Алексей Иванов</h3>
      <p data-field="description">CEO & Основатель</p>
    </article>
    <article class="sb-team-card" data-collection-item>
      <img data-field="image" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" alt="Фото" />
      <h3 data-field="name">Мария Петрова</h3>
      <p data-field="description">Дизайн-директор</p>
    </article>
    <article class="sb-team-card" data-collection-item>
      <img data-field="image" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" alt="Фото" />
      <h3 data-field="name">Дмитрий Козлов</h3>
      <p data-field="description">Ведущий разработчик</p>
    </article>
  </div>
</section>`,
    css: `.sb-team{padding:80px 60px;background:#fff;text-align:center}.sb-team h2{font-size:36px;margin:0 0 8px;color:#0f172a}.sb-team-subtitle{color:#64748b;font-size:16px;margin:0 0 48px}.sb-team-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:32px;max-width:1000px;margin:0 auto}.sb-team-card{text-align:center}.sb-team-card img{width:140px;height:140px;border-radius:50%;object-fit:cover;margin:0 auto 16px;display:block;border:4px solid #f1f5f9}.sb-team-card h3{margin:0 0 4px;font-size:18px;color:#0f172a}.sb-team-card p{margin:0;color:#6366f1;font-size:14px;font-weight:600}@media(max-width:768px){.sb-team{padding:40px 24px}}`,
    variants: [
      { id: "light", label: "Светлый", css: `.sb-team{background:#fff}` },
      { id: "dark", label: "Тёмный", css: `.sb-team{background:#0f172a}.sb-team h2{color:#fff}.sb-team-subtitle{color:#94a3b8}.sb-team-card h3{color:#fff}.sb-team-card img{border-color:#334155}` },
    ],
  },
  {
    id: "services-list",
    name: "Список услуг",
    description: "Карточки услуг с иконкой, описанием и ценой",
    category: "collection",
    icon: "☰",
    html: `<section class="sb-services" data-block="services" data-collection="services">
  <h2 data-field="title">Услуги</h2>
  <div class="sb-services-list" data-collection-grid>
    <article class="sb-service-card" data-collection-item>
      <div class="sb-service-icon" data-field="icon">🎂</div>
      <div class="sb-service-body">
        <h3 data-field="name">Торты на заказ</h3>
        <p data-field="description">Авторские торты любой сложности по вашему дизайну. Свежие ингредиенты, доставка в день заказа.</p>
      </div>
      <div class="sb-service-price" data-field="price">от 3 000 ₽</div>
    </article>
    <article class="sb-service-card" data-collection-item>
      <div class="sb-service-icon" data-field="icon">🧁</div>
      <div class="sb-service-body">
        <h3 data-field="name">Капкейки</h3>
        <p data-field="description">Набор из 6 или 12 штук с кремом по вашему выбору. Идеально для праздников.</p>
      </div>
      <div class="sb-service-price" data-field="price">от 1 200 ₽</div>
    </article>
    <article class="sb-service-card" data-collection-item>
      <div class="sb-service-icon" data-field="icon">🍰</div>
      <div class="sb-service-body">
        <h3 data-field="name">Десерт-бар</h3>
        <p data-field="description">Полное оформление сладкого стола на мероприятие. Кенди-бар под ключ.</p>
      </div>
      <div class="sb-service-price" data-field="price">от 8 000 ₽</div>
    </article>
  </div>
</section>`,
    css: `.sb-services{padding:80px 60px;background:#fafbff}.sb-services h2{font-size:36px;margin:0 0 48px;color:#0f172a;text-align:center}.sb-services-list{max-width:800px;margin:0 auto;display:flex;flex-direction:column;gap:16px}.sb-service-card{display:flex;align-items:center;gap:20px;padding:24px;border-radius:16px;background:#fff;border:1px solid #e2e8f0;transition:box-shadow .2s}.sb-service-card:hover{box-shadow:0 4px 20px rgba(0,0,0,.06)}.sb-service-icon{font-size:32px;flex-shrink:0;width:56px;height:56px;display:flex;align-items:center;justify-content:center;background:#f1f5f9;border-radius:14px}.sb-service-body{flex:1;min-width:0}.sb-service-body h3{margin:0 0 4px;font-size:17px;color:#0f172a}.sb-service-body p{margin:0;color:#64748b;font-size:14px;line-height:1.5}.sb-service-price{font-weight:800;font-size:16px;color:#6366f1;white-space:nowrap}@media(max-width:768px){.sb-services{padding:40px 24px}.sb-service-card{flex-direction:column;text-align:center}.sb-service-price{margin-top:8px}}`,
    variants: [
      { id: "light", label: "Светлый", css: `.sb-services{background:#fafbff}` },
      { id: "dark", label: "Тёмный", css: `.sb-services{background:#0f172a}.sb-services h2{color:#fff}.sb-service-card{background:#1e293b;border-color:#334155}.sb-service-icon{background:#334155}.sb-service-body h3{color:#fff}.sb-service-body p{color:#94a3b8}.sb-service-price{color:#818cf8}` },
    ],
  },
  // ── Hero with levitating images ──
  {
    id: "hero-levitate",
    name: "Hero с левитацией",
    description: "Заголовок слева, летающие карточки-скриншоты справа под углом",
    category: "hero",
    icon: "◈",
    html: `<section class="sb-hero-lev" data-block="hero">
  <div class="sb-hero-lev__text">
    <p class="sb-eyebrow" data-field="eyebrow">Новый подход</p>
    <h1 data-field="title">Создаём продукты,<br>которые люди любят</h1>
    <p data-field="subtitle">Мы объединяем дизайн, технологии и стратегию чтобы ваш бизнес рос быстрее конкурентов.</p>
    <div class="sb-hero-lev__btns">
      <a class="sb-btn" href="#" data-field="action">Начать проект</a>
      <a class="sb-btn sb-btn--ghost" href="#" data-field="action2">Смотреть кейсы →</a>
    </div>
  </div>
  <div class="sb-hero-lev__cards">
    <img class="sb-lev-card sb-lev-1" data-field="image" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80" alt="Screenshot" />
    <img class="sb-lev-card sb-lev-2" data-field="image" src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&q=80" alt="Screenshot" />
    <img class="sb-lev-card sb-lev-3" data-field="image" src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=500&q=80" alt="Screenshot" />
  </div>
</section>`,
    css: `.sb-hero-lev{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;padding:100px 60px;background:#0f172a;overflow:hidden}.sb-hero-lev__text .sb-eyebrow{color:#818cf8;font-weight:800;text-transform:uppercase;letter-spacing:.08em;font-size:13px;margin:0 0 16px}.sb-hero-lev h1{font-size:clamp(32px,4.5vw,58px);color:#fff;margin:0 0 20px;line-height:1.08}.sb-hero-lev p{color:#94a3b8;font-size:17px;line-height:1.6;margin:0 0 32px;max-width:480px}.sb-hero-lev__btns{display:flex;gap:12px;flex-wrap:wrap}.sb-btn--ghost{background:transparent;border:1.5px solid rgba(255,255,255,.2);color:#fff;text-decoration:none;display:inline-flex;align-items:center;min-height:48px;padding:0 24px;border-radius:10px;font-weight:700;font-size:15px;transition:all .2s}.sb-btn--ghost:hover{border-color:rgba(255,255,255,.5);background:rgba(255,255,255,.05)}.sb-hero-lev__cards{position:relative;height:420px}.sb-lev-card{position:absolute;width:280px;border-radius:16px;box-shadow:0 25px 50px rgba(0,0,0,.4);transition:transform .4s ease;object-fit:cover;aspect-ratio:4/3}.sb-lev-1{top:0;left:10%;transform:rotate(-6deg) translateY(0);animation:sb-lev 6s ease-in-out infinite}.sb-lev-2{top:60px;left:35%;transform:rotate(4deg) translateY(0);animation:sb-lev 6s ease-in-out 1s infinite}.sb-lev-3{top:120px;left:5%;transform:rotate(-3deg) translateY(0);animation:sb-lev 6s ease-in-out 2s infinite}@keyframes sb-lev{0%,100%{transform:rotate(var(--r,0deg)) translateY(0)}50%{transform:rotate(var(--r,0deg)) translateY(-18px)}}.sb-lev-1{--r:-6deg}.sb-lev-2{--r:4deg}.sb-lev-3{--r:-3deg}@media(max-width:768px){.sb-hero-lev{grid-template-columns:1fr;padding:60px 24px;text-align:center}.sb-hero-lev__cards{height:300px}.sb-lev-card{width:200px}}`,
    variants: [
      { id: "dark", label: "Тёмный", css: `.sb-hero-lev{background:#0f172a}` },
      { id: "gradient", label: "Градиент", css: `.sb-hero-lev{background:linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#312e81 100%)}` },
      { id: "light", label: "Светлый", css: `.sb-hero-lev{background:#f8fafc}.sb-hero-lev h1{color:#0f172a}.sb-hero-lev p{color:#64748b}.sb-lev-card{box-shadow:0 25px 50px rgba(0,0,0,.12)}` },
    ],
  },
  // ── Products with hover flip ──
  {
    id: "products-flip",
    name: "Товары с переворотом",
    description: "Карточки переворачиваются при наведении — спереди фото, сзади описание и кнопка",
    category: "collection",
    icon: "🔄",
    html: `<section class="sb-flip-products" data-block="products" data-collection="products">
  <h2 data-field="title">Наши товары</h2>
  <div class="sb-flip-grid" data-collection-grid>
    <article class="sb-flip-card" data-collection-item>
      <div class="sb-flip-inner">
        <div class="sb-flip-front">
          <img data-field="image" src="https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=500&q=80" alt="Товар" />
          <h3 data-field="name">Торт «Наполеон»</h3>
          <span class="sb-flip-price" data-field="price">2 500 ₽</span>
        </div>
        <div class="sb-flip-back">
          <p data-field="description">Классический слоёный торт с нежным кремом и хрустящими коржами. 12 порций, вес 1.5 кг.</p>
          <a class="sb-btn sb-btn--sm" href="#" data-field="action">Заказать</a>
        </div>
      </div>
    </article>
    <article class="sb-flip-card" data-collection-item>
      <div class="sb-flip-inner">
        <div class="sb-flip-front">
          <img data-field="image" src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80" alt="Товар" />
          <h3 data-field="name">Торт «Медовик»</h3>
          <span class="sb-flip-price" data-field="price">2 200 ₽</span>
        </div>
        <div class="sb-flip-back">
          <p data-field="description">Медовые коржи со сметанным кремом — вкус знакомый с детства. 10 порций.</p>
          <a class="sb-btn sb-btn--sm" href="#" data-field="action">Заказать</a>
        </div>
      </div>
    </article>
    <article class="sb-flip-card" data-collection-item>
      <div class="sb-flip-inner">
        <div class="sb-flip-front">
          <img data-field="image" src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&q=80" alt="Товар" />
          <h3 data-field="name">Торт «Прага»</h3>
          <span class="sb-flip-price" data-field="price">2 800 ₽</span>
        </div>
        <div class="sb-flip-back">
          <p data-field="description">Шоколадный бисквит с шоколадным кремом и зеркальной глазурью. 12 порций.</p>
          <a class="sb-btn sb-btn--sm" href="#" data-field="action">Заказать</a>
        </div>
      </div>
    </article>
  </div>
</section>`,
    css: `.sb-flip-products{padding:80px 60px;background:#fff;text-align:center}.sb-flip-products h2{font-size:36px;margin:0 0 48px;color:#0f172a}.sb-flip-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:28px;max-width:1100px;margin:0 auto;perspective:1200px}.sb-flip-card{height:380px;cursor:pointer}.sb-flip-inner{position:relative;width:100%;height:100%;transition:transform .6s cubic-bezier(.4,0,.2,1);transform-style:preserve-3d}.sb-flip-card:hover .sb-flip-inner{transform:rotateY(180deg)}.sb-flip-front,.sb-flip-back{position:absolute;inset:0;backface-visibility:hidden;border-radius:16px;overflow:hidden;display:flex;flex-direction:column}.sb-flip-front{background:#fff;border:1px solid #e2e8f0}.sb-flip-front img{width:100%;height:220px;object-fit:cover}.sb-flip-front h3{margin:16px 16px 4px;font-size:17px;color:#0f172a;text-align:left}.sb-flip-price{margin:0 16px 16px;font-size:22px;font-weight:800;color:#6366f1;text-align:left}.sb-flip-back{transform:rotateY(180deg);background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:32px;justify-content:center;align-items:center;text-align:center}.sb-flip-back p{color:rgba(255,255,255,.9);font-size:16px;line-height:1.6;margin:0 0 24px}.sb-flip-back .sb-btn--sm{background:#fff;color:#6366f1}@media(max-width:768px){.sb-flip-products{padding:40px 24px}.sb-flip-card{height:340px}}`,
    variants: [
      { id: "light", label: "Светлый", css: `.sb-flip-products{background:#fff}` },
      { id: "dark", label: "Тёмный", css: `.sb-flip-products{background:#0f172a}.sb-flip-products h2{color:#fff}.sb-flip-front{background:#1e293b;border-color:#334155}.sb-flip-front h3{color:#fff}` },
    ],
  },
  // ── Bento grid features ──
  {
    id: "features-bento",
    name: "Bento-сетка",
    description: "Модная bento-сетка с карточками разных размеров и hover-эффектами",
    category: "features",
    icon: "⊞",
    html: `<section class="sb-bento" data-block="features">
  <h2 data-field="title">Возможности платформы</h2>
  <div class="sb-bento-grid">
    <article class="sb-bento-card sb-bento-wide">
      <div class="sb-bento-icon">⚡</div>
      <h3 data-field="title">Быстрый старт</h3>
      <p data-field="text">Запустите сайт за 5 минут без единой строки кода. Выберите шаблон и начните редактировать.</p>
    </article>
    <article class="sb-bento-card">
      <div class="sb-bento-icon">🎨</div>
      <h3 data-field="title">Дизайн-система</h3>
      <p data-field="text">Цвета, шрифты и стили — всё настраивается глобально.</p>
    </article>
    <article class="sb-bento-card">
      <div class="sb-bento-icon">📱</div>
      <h3 data-field="title">Адаптивность</h3>
      <p data-field="text">Каждый сайт идеально выглядит на любом устройстве.</p>
    </article>
    <article class="sb-bento-card">
      <div class="sb-bento-icon">🤖</div>
      <h3 data-field="title">AI-помощник</h3>
      <p data-field="text">Генерируйте контент и дизайн с помощью искусственного интеллекта.</p>
    </article>
    <article class="sb-bento-card sb-bento-wide">
      <div class="sb-bento-icon">🚀</div>
      <h3 data-field="title">Мгновенная публикация</h3>
      <p data-field="text">Один клик — и ваш сайт в сети. Без серверов, без домена, без головной боли.</p>
    </article>
  </div>
</section>`,
    css: `.sb-bento{padding:80px 60px;background:#0f172a}.sb-bento>h2{font-size:36px;color:#fff;margin:0 0 48px;text-align:center}.sb-bento-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;max-width:1100px;margin:0 auto}.sb-bento-card{padding:32px;border-radius:20px;background:#1e293b;border:1px solid #334155;transition:transform .3s,box-shadow .3s,border-color .3s}.sb-bento-card:hover{transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,.3);border-color:#6366f1}.sb-bento-wide{grid-column:span 2}.sb-bento-icon{font-size:32px;margin-bottom:16px;width:56px;height:56px;display:flex;align-items:center;justify-content:center;border-radius:14px;background:rgba(99,102,241,.12)}.sb-bento-card h3{color:#fff;font-size:20px;margin:0 0 8px}.sb-bento-card p{color:#94a3b8;font-size:15px;line-height:1.6;margin:0}@media(max-width:768px){.sb-bento{padding:40px 24px}.sb-bento-grid{grid-template-columns:1fr}.sb-bento-wide{grid-column:span 1}}`,
    variants: [
      { id: "dark", label: "Тёмный", css: `.sb-bento{background:#0f172a}` },
      { id: "glass", label: "Стекло", css: `.sb-bento{background:linear-gradient(135deg,#0f172a,#1e1b4b)}.sb-bento-card{background:rgba(255,255,255,.05);backdrop-filter:blur(12px);border-color:rgba(255,255,255,.1)}.sb-bento-card:hover{border-color:rgba(129,140,248,.5);background:rgba(255,255,255,.08)}` },
      { id: "light", label: "Светлый", css: `.sb-bento{background:#f8fafc}.sb-bento>h2{color:#0f172a}.sb-bento-card{background:#fff;border-color:#e2e8f0}.sb-bento-card:hover{border-color:#6366f1;box-shadow:0 20px 40px rgba(0,0,0,.06)}.sb-bento-card h3{color:#0f172a}.sb-bento-card p{color:#64748b}` },
    ],
  },
  // ── Testimonials carousel-style ──
  {
    id: "testimonials-cards",
    name: "Отзывы — карточки",
    description: "Стильные карточки отзывов с фото, рейтингом и hover-эффектом подъёма",
    category: "social",
    icon: "★",
    html: `<section class="sb-reviews" data-block="testimonials" data-collection="testimonials">
  <h2 data-field="title">Отзывы клиентов</h2>
  <div class="sb-reviews-grid" data-collection-grid>
    <article class="sb-review-card" data-collection-item>
      <div class="sb-review-stars">★★★★★</div>
      <p data-field="text">"Лучший конструктор на рынке. Сделали сайт за один день, клиенты в восторге!"</p>
      <div class="sb-review-author">
        <img data-field="image" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" alt="Фото" />
        <div>
          <strong data-field="name">Анна Козлова</strong>
          <span data-field="description">Владелица кофейни</span>
        </div>
      </div>
    </article>
    <article class="sb-review-card" data-collection-item>
      <div class="sb-review-stars">★★★★★</div>
      <p data-field="text">"Перешли с Tilda и не пожалели. Редактор удобнее в разы, а результат профессиональнее."</p>
      <div class="sb-review-author">
        <img data-field="image" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="Фото" />
        <div>
          <strong data-field="name">Максим Дроздов</strong>
          <span data-field="description">CEO, TechStart</span>
        </div>
      </div>
    </article>
    <article class="sb-review-card" data-collection-item>
      <div class="sb-review-stars">★★★★★</div>
      <p data-field="text">"AI-генерация сэкономила нам 2 недели работы. Просто рассказали идею — и сайт готов."</p>
      <div class="sb-review-author">
        <img data-field="image" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" alt="Фото" />
        <div>
          <strong data-field="name">Дмитрий Волков</strong>
          <span data-field="description">Маркетолог</span>
        </div>
      </div>
    </article>
  </div>
</section>`,
    css: `.sb-reviews{padding:80px 60px;background:#f8fafc;text-align:center}.sb-reviews h2{font-size:36px;margin:0 0 48px;color:#0f172a}.sb-reviews-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:24px;max-width:1100px;margin:0 auto}.sb-review-card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:28px;text-align:left;transition:transform .3s,box-shadow .3s}.sb-review-card:hover{transform:translateY(-6px);box-shadow:0 16px 40px rgba(0,0,0,.08)}.sb-review-stars{color:#f59e0b;font-size:18px;letter-spacing:2px;margin-bottom:16px}.sb-review-card p{color:#334155;font-size:16px;line-height:1.6;margin:0 0 20px;font-style:italic}.sb-review-author{display:flex;align-items:center;gap:12px}.sb-review-author img{width:44px;height:44px;border-radius:50%;object-fit:cover}.sb-review-author strong{display:block;font-size:15px;color:#0f172a}.sb-review-author span{font-size:13px;color:#64748b}@media(max-width:768px){.sb-reviews{padding:40px 24px}}`,
    variants: [
      { id: "light", label: "Светлый", css: `.sb-reviews{background:#f8fafc}` },
      { id: "dark", label: "Тёмный", css: `.sb-reviews{background:#0f172a}.sb-reviews h2{color:#fff}.sb-review-card{background:#1e293b;border-color:#334155}.sb-review-card p{color:#cbd5e1}.sb-review-author strong{color:#fff}.sb-review-author span{color:#94a3b8}.sb-review-card:hover{box-shadow:0 16px 40px rgba(0,0,0,.3)}` },
    ],
  },
  // ── Stats / Numbers ──
  {
    id: "stats-row",
    name: "Цифры и факты",
    description: "Ключевые метрики в ряд — впечатлите цифрами",
    category: "features",
    icon: "📊",
    html: `<section class="sb-stats" data-block="stats">
  <div class="sb-stats-grid">
    <div class="sb-stat">
      <div class="sb-stat-num" data-field="title">500+</div>
      <p data-field="text">Проектов запущено</p>
    </div>
    <div class="sb-stat">
      <div class="sb-stat-num" data-field="title">99%</div>
      <p data-field="text">Довольных клиентов</p>
    </div>
    <div class="sb-stat">
      <div class="sb-stat-num" data-field="title">24/7</div>
      <p data-field="text">Поддержка</p>
    </div>
    <div class="sb-stat">
      <div class="sb-stat-num" data-field="title">5 мин</div>
      <p data-field="text">Среднее время запуска</p>
    </div>
  </div>
</section>`,
    css: `.sb-stats{padding:60px;background:linear-gradient(135deg,#6366f1,#8b5cf6)}.sb-stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:40px;max-width:1000px;margin:0 auto;text-align:center}.sb-stat-num{font-size:clamp(36px,5vw,56px);font-weight:900;color:#fff;line-height:1;margin-bottom:8px}.sb-stat p{color:rgba(255,255,255,.75);font-size:15px;margin:0;font-weight:500}@media(max-width:768px){.sb-stats{padding:40px 24px}.sb-stats-grid{grid-template-columns:repeat(2,1fr);gap:32px}}`,
    variants: [
      { id: "purple", label: "Фиолетовый", css: `.sb-stats{background:linear-gradient(135deg,#6366f1,#8b5cf6)}` },
      { id: "dark", label: "Тёмный", css: `.sb-stats{background:#0f172a}.sb-stat-num{background:linear-gradient(135deg,#818cf8,#c084fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent}` },
      { id: "light", label: "Светлый", css: `.sb-stats{background:#fff}.sb-stat-num{color:#6366f1}.sb-stat p{color:#64748b}` },
    ],
  },
  // ── Gallery masonry ──
  {
    id: "gallery-masonry",
    name: "Галерея-мозаика",
    description: "Фотогалерея в стиле Pinterest с эффектом увеличения при наведении",
    category: "collection",
    icon: "🖼",
    html: `<section class="sb-gallery" data-block="gallery" data-collection="gallery">
  <h2 data-field="title">Галерея</h2>
  <div class="sb-gallery-grid" data-collection-grid>
    <article class="sb-gallery-item sb-gal-tall" data-collection-item>
      <img data-field="image" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80" alt="Фото" />
    </article>
    <article class="sb-gallery-item" data-collection-item>
      <img data-field="image" src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80" alt="Фото" />
    </article>
    <article class="sb-gallery-item" data-collection-item>
      <img data-field="image" src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=600&q=80" alt="Фото" />
    </article>
    <article class="sb-gallery-item sb-gal-tall" data-collection-item>
      <img data-field="image" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80" alt="Фото" />
    </article>
    <article class="sb-gallery-item" data-collection-item>
      <img data-field="image" src="https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&q=80" alt="Фото" />
    </article>
    <article class="sb-gallery-item" data-collection-item>
      <img data-field="image" src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80" alt="Фото" />
    </article>
  </div>
</section>`,
    css: `.sb-gallery{padding:80px 60px;background:#0f172a}.sb-gallery h2{font-size:36px;color:#fff;margin:0 0 48px;text-align:center}.sb-gallery-grid{display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:200px;gap:12px;max-width:1100px;margin:0 auto}.sb-gallery-item{border-radius:12px;overflow:hidden;position:relative}.sb-gal-tall{grid-row:span 2}.sb-gallery-item img{width:100%;height:100%;object-fit:cover;transition:transform .4s ease}.sb-gallery-item:hover img{transform:scale(1.08)}@media(max-width:768px){.sb-gallery{padding:40px 24px}.sb-gallery-grid{grid-template-columns:repeat(2,1fr);grid-auto-rows:160px}.sb-gal-tall{grid-row:span 1}}`,
    variants: [
      { id: "dark", label: "Тёмный", css: `.sb-gallery{background:#0f172a}` },
      { id: "light", label: "Светлый", css: `.sb-gallery{background:#fff}.sb-gallery h2{color:#0f172a}.sb-gallery-item{box-shadow:0 2px 8px rgba(0,0,0,.08)}` },
    ],
  },
  // ── Contact / Form section ──
  {
    id: "contact-form",
    name: "Контакты с формой",
    description: "Секция контактов с формой обратной связи и информацией",
    category: "cta",
    icon: "✉",
    html: `<section class="sb-contact" data-block="contact">
  <div class="sb-contact-grid">
    <div class="sb-contact-info">
      <h2 data-field="title">Свяжитесь с нами</h2>
      <p data-field="subtitle">Мы ответим в течение 24 часов</p>
      <div class="sb-contact-row">
        <span>📧</span>
        <p data-field="text">hello@example.com</p>
      </div>
      <div class="sb-contact-row">
        <span>📞</span>
        <p data-field="text">+7 (999) 123-45-67</p>
      </div>
      <div class="sb-contact-row">
        <span>📍</span>
        <p data-field="text">Москва, ул. Примерная, д. 1</p>
      </div>
    </div>
    <form class="sb-contact-form" onsubmit="return false;">
      <input type="text" placeholder="Ваше имя" />
      <input type="email" placeholder="Email" />
      <textarea placeholder="Сообщение" rows="4"></textarea>
      <button class="sb-btn" type="submit">Отправить</button>
    </form>
  </div>
</section>`,
    css: `.sb-contact{padding:80px 60px;background:#fff}.sb-contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;max-width:1000px;margin:0 auto;align-items:start}.sb-contact-info h2{font-size:32px;margin:0 0 8px;color:#0f172a}.sb-contact-info>p{color:#64748b;margin:0 0 32px;font-size:16px}.sb-contact-row{display:flex;align-items:center;gap:12px;margin-bottom:16px}.sb-contact-row span{font-size:20px}.sb-contact-row p{margin:0;color:#334155;font-size:15px}.sb-contact-form{display:flex;flex-direction:column;gap:14px}.sb-contact-form input,.sb-contact-form textarea{width:100%;padding:14px 16px;border:1px solid #e2e8f0;border-radius:10px;font-size:15px;color:#0f172a;background:#f8fafc;outline:none;transition:border-color .2s;box-sizing:border-box;font-family:inherit}.sb-contact-form input:focus,.sb-contact-form textarea:focus{border-color:#6366f1}.sb-contact-form textarea{resize:vertical;min-height:100px}.sb-contact-form .sb-btn{align-self:flex-start;border:0;cursor:pointer}@media(max-width:768px){.sb-contact{padding:40px 24px}.sb-contact-grid{grid-template-columns:1fr}}`,
    variants: [
      { id: "light", label: "Светлый", css: `.sb-contact{background:#fff}` },
      { id: "dark", label: "Тёмный", css: `.sb-contact{background:#0f172a}.sb-contact-info h2{color:#fff}.sb-contact-info>p{color:#94a3b8}.sb-contact-row p{color:#cbd5e1}.sb-contact-form input,.sb-contact-form textarea{background:#1e293b;border-color:#334155;color:#f1f5f9}.sb-contact-form input:focus,.sb-contact-form textarea:focus{border-color:#6366f1}` },
    ],
  },
  // ── Logo cloud ──
  {
    id: "logo-cloud",
    name: "Логотипы клиентов",
    description: "Полоса логотипов компаний для социального доказательства",
    category: "social",
    icon: "◎",
    html: `<section class="sb-logos" data-block="logos">
  <p data-field="title">Нам доверяют</p>
  <div class="sb-logos-row">
    <span data-field="text">Google</span>
    <span data-field="text">Microsoft</span>
    <span data-field="text">Apple</span>
    <span data-field="text">Amazon</span>
    <span data-field="text">Meta</span>
  </div>
</section>`,
    css: `.sb-logos{padding:40px 60px;background:#f8fafc;text-align:center}.sb-logos>p{color:#94a3b8;font-size:13px;text-transform:uppercase;letter-spacing:.08em;font-weight:700;margin:0 0 24px}.sb-logos-row{display:flex;align-items:center;justify-content:center;gap:48px;flex-wrap:wrap;max-width:900px;margin:0 auto}.sb-logos-row span{font-size:22px;font-weight:800;color:#cbd5e1;letter-spacing:-.02em;transition:color .2s}.sb-logos-row span:hover{color:#6366f1}@media(max-width:768px){.sb-logos{padding:24px}.sb-logos-row{gap:24px}}`,
    variants: [
      { id: "light", label: "Светлый", css: `.sb-logos{background:#f8fafc}` },
      { id: "dark", label: "Тёмный", css: `.sb-logos{background:#0f172a}.sb-logos>p{color:#64748b}.sb-logos-row span{color:#475569}.sb-logos-row span:hover{color:#818cf8}` },
    ],
  },
  // ── FAQ accordion ──
  {
    id: "faq-section",
    name: "FAQ — Вопросы и ответы",
    description: "Раскрывающиеся вопросы-ответы в стильном формате",
    category: "features",
    icon: "❓",
    html: `<section class="sb-faq" data-block="faq" data-collection="faq">
  <h2 data-field="title">Частые вопросы</h2>
  <div class="sb-faq-list" data-collection-grid>
    <details class="sb-faq-item" data-collection-item>
      <summary data-field="name">Сколько стоит создание сайта?</summary>
      <p data-field="description">Базовый план бесплатный. Для бизнеса — от 990 ₽/мес с расширенным функционалом, AI-генерацией и приоритетной поддержкой.</p>
    </details>
    <details class="sb-faq-item" data-collection-item>
      <summary data-field="name">Нужно ли знать программирование?</summary>
      <p data-field="description">Нет. Весь процесс визуальный — вы редактируете прямо на странице. Для продвинутых есть доступ к HTML/CSS/JS.</p>
    </details>
    <details class="sb-faq-item" data-collection-item>
      <summary data-field="name">Можно ли подключить свой домен?</summary>
      <p data-field="description">Да, на тарифе Про и выше. Мы поможем настроить DNS и SSL-сертификат бесплатно.</p>
    </details>
    <details class="sb-faq-item" data-collection-item>
      <summary data-field="name">Как перенести сайт с другой платформы?</summary>
      <p data-field="description">Загрузите HTML/CSS файлы через редактор или используйте AI-генерацию — опишите что нужно, и мы создадим с нуля.</p>
    </details>
  </div>
</section>`,
    css: `.sb-faq{padding:80px 60px;background:#fff}.sb-faq h2{font-size:36px;margin:0 0 48px;color:#0f172a;text-align:center}.sb-faq-list{max-width:700px;margin:0 auto;display:flex;flex-direction:column;gap:12px}.sb-faq-item{border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;transition:border-color .2s}.sb-faq-item[open]{border-color:#6366f1}.sb-faq-item summary{padding:18px 24px;font-size:16px;font-weight:700;color:#0f172a;cursor:pointer;list-style:none;display:flex;align-items:center;justify-content:space-between;transition:background .2s}.sb-faq-item summary::-webkit-details-marker{display:none}.sb-faq-item summary::after{content:"+";font-size:20px;color:#94a3b8;font-weight:400;transition:transform .2s}.sb-faq-item[open] summary::after{transform:rotate(45deg);color:#6366f1}.sb-faq-item summary:hover{background:#f8fafc}.sb-faq-item p{padding:0 24px 18px;margin:0;color:#64748b;font-size:15px;line-height:1.6}@media(max-width:768px){.sb-faq{padding:40px 24px}}`,
    variants: [
      { id: "light", label: "Светлый", css: `.sb-faq{background:#fff}` },
      { id: "dark", label: "Тёмный", css: `.sb-faq{background:#0f172a}.sb-faq h2{color:#fff}.sb-faq-item{border-color:#334155;background:#1e293b}.sb-faq-item[open]{border-color:#6366f1}.sb-faq-item summary{color:#f1f5f9}.sb-faq-item summary:hover{background:#334155}.sb-faq-item p{color:#94a3b8}` },
    ],
  },
];

export const blockCategories = [
  { id: "all", label: "Все", icon: "⊕" },
  { id: "hero", label: "Hero", icon: "◆" },
  { id: "features", label: "Фичи", icon: "▦" },
  { id: "collection", label: "Каталог", icon: "🛍" },
  { id: "cta", label: "CTA", icon: "▶" },
  { id: "pricing", label: "Цены", icon: "⊞" },
  { id: "social", label: "Отзывы", icon: "❝" },
  { id: "footer", label: "Футер", icon: "▬" },
];
