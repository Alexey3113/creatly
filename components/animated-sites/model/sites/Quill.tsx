"use client";
/* QUILL — «a private athenaeum for people who still finish the book». Мир: холодная современная
   академия (НЕ пергамент/латунь) — известняк и чернила под электрическим ультрамарином лампы.
   Собран на общем движке <Reel/>; лендинг и типографика — БЕСХОЗНЫЕ (свой набор/порядок блоков,
   свой шрифт-пейринг Instrument Serif × Schibsted Grotesk, палитра ink/limestone/copper/ultramarine). */
import { Reel, type ReelScene } from "../reel";
import "./quill.css";

const A = "/uploads/1/animated/quill";
const scenes: ReelScene[] = [
  { id: "avenue", bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`, copy: (
    <>
      <span className="ql-eyebrow">A private athenaeum — reading floor no. 4</span>
      <h1>Think in<br /><em>full sentences</em> again.</h1>
      <p>QUILL is a members&rsquo; library and fellowship built for people who read slowly, argue precisely, and refuse to skim their own lives. Four rooms, one desk each, no notifications past the door.</p>
      <div className="ql-cta"><a href="#join" className="ql-btn">Request a seat</a><a href="#chambers" className="ql-ghost">Walk the halls →</a></div>
    </>
  ) },
  { id: "library", dark: true, bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <><span className="ql-idx ql-light">— 02 · the reading floor</span><h2>The Stacks</h2>
      <p className="ql-pl">Forty thousand volumes under electric ultramarine light. The catalogue is analog on purpose — you find the book by wanting it enough to look.</p></>
  ) },
  { id: "nook", dark: true, bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`, spark: 5, copy: (
    <><span className="ql-idx ql-light">— 03 · the blue hour</span><h2>Late Sessions</h2>
      <p className="ql-pl">Membership includes the hours after the building closes to the public. One lamp, one chair, rain on the glass — this is when the real reading happens.</p></>
  ) },
  { id: "courtyard", bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`, copy: (
    <><span className="ql-idx">— 04 · the cloister</span><h2 className="ql-dark-h">Between Sessions</h2>
      <p>Fellows convene here at dusk to argue about what they read. No panels, no moderators — four people and a good disagreement.</p></>
  ) },
];

const chambers = [
  { n: "01", t: "The Stacks", d: "Floor-to-ceiling ink-dark shelving under rows of electric ultramarine lamps. Silence is enforced by architecture, not signage." },
  { n: "02", t: "Study Carrels", d: "One private desk per fellow, reserved by the season, not the hour. Your books stay shelved between visits." },
  { n: "03", t: "The Blue Hour Room", d: "After-hours access to a single cold window and a chair. The collection nobody rushes through." },
];

const gallery = [
  { img: `${A}/s1-bg.webp`, t: "Avenue", d: "The walk in — cold stone as decompression." },
  { img: `${A}/s2-bg.webp`, t: "The Stacks", d: "Ultramarine light, floor to ceiling." },
  { img: `${A}/s3-bg.webp`, t: "Blue Hour Room", d: "After the building closes to the public." },
  { img: `${A}/s4-bg.webp`, t: "The Cloister", d: "Where fellows convene to disagree well." },
];

const faqs = [
  { q: "Do I need an academic background?", a: "No. We care what you have finished, not what you studied. The application asks for your reading list, not your CV." },
  { q: "What if I miss a session?", a: "The cloister convenes weekly. Miss two without notice and we ask you to sit out the season — the cohort is small on purpose." },
  { q: "Can I visit before applying?", a: "Public tours of the avenue and the courtyard run Thursdays. The stacks and the blue hour room stay fellows-only." },
  { q: "Is there wifi?", a: "In the vestibule, yes. Past the first ultramarine lamp, no — that is the entire point of the lamp." },
];

export function Quill() {
  return (
    <div className="ql">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Petrona:ital,wght@0,400;0,500;1,400&family=Schibsted+Grotesk:wght@400;500;600;700&display=swap" />

      <header className="ql-nav">
        <span className="ql-brand">QUILL</span>
        <nav>
          <a href="#chambers">Chambers</a>
          <a href="#fellowship">Fellowship</a>
          <a href="#collection">Collection</a>
          <a href="#join" className="ql-nav-cta">Request a seat</a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="read on ↓" />

      {/* MARQUEE — running strip, atmosphere/context (тип отсутствует у эталона) */}
      <div className="ql-marquee" aria-hidden>
        <div className="ql-marquee-track">
          <span>SLOW READING&nbsp;&nbsp;·&nbsp;&nbsp;CLOSED STACKS&nbsp;&nbsp;·&nbsp;&nbsp;NO ALGORITHM&nbsp;&nbsp;·&nbsp;&nbsp;FOUR DESKS ONLY&nbsp;&nbsp;·&nbsp;&nbsp;ARGUE IN PERSON&nbsp;&nbsp;·&nbsp;&nbsp;</span>
          <span>SLOW READING&nbsp;&nbsp;·&nbsp;&nbsp;CLOSED STACKS&nbsp;&nbsp;·&nbsp;&nbsp;NO ALGORITHM&nbsp;&nbsp;·&nbsp;&nbsp;FOUR DESKS ONLY&nbsp;&nbsp;·&nbsp;&nbsp;ARGUE IN PERSON&nbsp;&nbsp;·&nbsp;&nbsp;</span>
        </div>
      </div>

      {/* BIG-TYPE — problem/context, giant statement (тип отсутствует у эталона) */}
      <section className="ql-big">
        <span className="ql-kick">The problem with reading now</span>
        <p className="ql-big-line">You have not finished a book at your own desk in <em>years</em>.</p>
        <p className="ql-big-sub">Not because the books changed. Because the desk did — six tabs, four apps, one thumb, always waiting on something.</p>
      </section>

      {/* SIGNATURE — editorial pull-quotes / manifesto, dark-academia voice, quote-forward */}
      <section className="ql-editorial" id="fellowship">
        <span className="ql-kick ql-kick-light">Notes from the reading floor</span>
        <div className="ql-editorial-grid">
          <blockquote className="ql-editorial-quote ql-eq-1">
            <p>&ldquo;I stopped highlighting. If a sentence is good enough, it <em>finds you again</em> on its own.&rdquo;</p>
            <cite>Fellow in Philosophy · Reading Floor No. 2</cite>
          </blockquote>
          <blockquote className="ql-editorial-quote ql-eq-2">
            <p>&ldquo;The lamp is the whole argument. One pool of ultramarine light, nothing else <em>asking for your eyes</em>.&rdquo;</p>
            <cite>Fellow in Classics · Blue Hour Room</cite>
          </blockquote>
          <blockquote className="ql-editorial-quote ql-eq-3">
            <p>&ldquo;We are not anti-technology. We are pro <em>finishing things</em>.&rdquo;</p>
            <cite>Founding Fellow · QUILL</cite>
          </blockquote>
        </div>
      </section>

      {/* FEATURE-CARDS — capabilities */}
      <section className="ql-chambers" id="chambers">
        <div className="ql-chambers-head"><span className="ql-kick">Where a fellowship happens</span><h2>Three rooms, one rhythm.</h2></div>
        <div className="ql-chambers-grid">
          {chambers.map((c) => (
            <div className="ql-chamber-card" key={c.n}>
              <span className="ql-chamber-n">{c.n}</span>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STEPS/PROCESS — how it works */}
      <section className="ql-steps">
        <div className="ql-steps-head"><span className="ql-kick">How the fellowship works</span><h2>Eleven weeks, one cohort, no shortcuts.</h2></div>
        <ol className="ql-steps-row">
          <li><span className="ql-step-n">01</span><h3>Apply</h3><p>Two essays, no résumé. We want your reading list, not your job title.</p></li>
          <li><span className="ql-step-n">02</span><h3>Read</h3><p>A five-week intensive with a small cohort and one shared spine of texts.</p></li>
          <li><span className="ql-step-n">03</span><h3>Convene</h3><p>Weekly sessions in the cloister at dusk. Disagreement is mandatory.</p></li>
          <li><span className="ql-step-n">04</span><h3>Keep the key</h3><p>Full fellows retain lifetime desk access and borrowing rights.</p></li>
        </ol>
      </section>

      {/* SPLIT — showcase */}
      <section className="ql-split" id="collection">
        <div className="ql-split-media" style={{ backgroundImage: `url(${A}/s2-bg.webp)` }} aria-hidden />
        <div className="ql-split-copy">
          <span className="ql-kick">Why the collection stays small</span>
          <h2>Eleven thousand books we have actually read.</h2>
          <p>Every volume on these shelves was proposed, argued for and voted in by a working fellow. Nothing arrives because a donor needed a tax receipt. The catalogue is small enough that the librarian remembers who requested each book, and why.</p>
          <a href="#" className="ql-link">Read the acquisitions policy →</a>
        </div>
      </section>

      {/* GALLERY — four chambers as cover plates */}
      <section className="ql-gallery">
        <div className="ql-gallery-head"><span className="ql-kick">Four chambers, one building</span><h2>The whole route, from stone to lamp.</h2></div>
        <div className="ql-gallery-grid">
          {gallery.map((g) => (
            <div className="ql-gallery-card" key={g.t} style={{ backgroundImage: `url(${g.img})` }}>
              <div className="ql-gallery-veil" aria-hidden />
              <div className="ql-gallery-copy"><h3>{g.t}</h3><p>{g.d}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="ql-stats">
        {[["11,206", "volumes, hand-selected"], ["4", "desks per reading floor"], ["37", "fellows per cohort, never more"], ["0", "notifications past the threshold"]].map(([n, l], i) => (
          <div className="ql-stat" key={i}><b>{n}</b><span>{l}</span></div>
        ))}
      </section>

      {/* FAQ/ACCORDION — trust (тип отсутствует у эталона) */}
      <section className="ql-faq">
        <div className="ql-faq-head"><span className="ql-kick">Before you apply</span><h2>Questions we get in the vestibule.</h2></div>
        <div className="ql-faq-list">
          {faqs.map((f, i) => (
            <details className="ql-faq-item" key={i} {...(i === 0 ? { open: true } : {})}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* DEAL */}
      <section className="ql-deal" id="join">
        <div className="ql-deal-card">
          <span className="ql-kick">The fellowship</span>
          <div className="ql-price"><b>$180</b><span>/ season · desk, key &amp; eleven weeks of the reading floor</span></div>
          <p>Applications open twice a year. Cohorts are capped at thirty-seven so the cloister still fits around one table.</p>
          <a href="#" className="ql-btn">Apply for a seat</a>
          <span className="ql-note">Fewer than half of applicants admitted · Reading list required</span>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="ql-climax" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }}>
        <div className="ql-climax-veil" aria-hidden />
        <div className="ql-climax-copy"><h2>Come read like it still <em>matters</em>.</h2><a href="#join" className="ql-btn">Request a seat</a></div>
      </section>

      <footer className="ql-foot">
        <span className="ql-brand">QUILL</span>
        <span>A private athenaeum · Founded for the stubbornly literate</span>
      </footer>
    </div>
  );
}
