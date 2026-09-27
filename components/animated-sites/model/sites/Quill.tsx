"use client";
/* QUILL — «a private athenaeum for people who still finish the book». Мир: холодная современная
   академия (НЕ пергамент/латунь) — известняк и чернила под электрическим ультрамарином лампы.
   Шрифт-пейринг Petrona × Schibsted Grotesk, палитра ink/limestone/copper/ultramarine.
   СКВОЗНАЯ АРХИТЕКТУРА (аудит 2026-09): актёр — ОДНА ультрамариновая лампа, постоянный источник света:
   фонарь аллеи → её свет заливает кадр (sweep) → лампа над столом в читальне (стоп-кадр «11,206») →
   пролёт сквозь стеллажи (flythrough) → лампа в нише → зум сквозь окно (portal) → арка двора → в лендинге
   лампа по очереди подсвечивает цитаты и садится над карточкой членства. Секции чередуют чернила и известняк. */
import { useEffect } from "react";
import { Reel, reelMark, type ReelScene } from "../reel";
import { Actor, Weather, Atmosphere, Backdrop, subscribe } from "@/components/scene-kit";
import { FontLinks } from "@/components/shared/FontLinks";
import "./quill.css";

const A = "/uploads/1/animated/quill";
const scenes: ReelScene[] = [
  { id: "avenue", bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, len: 1.1, hold: 0.5, copy: (
    <>
      <span className="ql-eyebrow">A private athenaeum — reading floor no. 4</span>
      <h1>Think in<br /><em>full sentences</em> again.</h1>
      <p>QUILL is a members&rsquo; library and fellowship for people who read slowly, argue precisely, and refuse to skim their own lives. Four rooms, one desk each, no notifications past the door.</p>
      <div className="ql-cta"><a href="#join" className="ql-btn">Request a seat</a><a href="#chambers" className="ql-ghost">Walk the halls →</a></div>
    </>
  ) },
  { id: "library", dark: true, into: "sweep", tint: "#4a5aff", len: 1.2, hold: 0.55, bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`,
    freeze: (<div className="ql-freeze"><b>11,206</b><span>volumes · one lamp each</span></div>), copy: (
    <><span className="ql-idx ql-light">— 02 · the reading floor</span><h2>The Stacks</h2>
      <p className="ql-pl">Forty thousand volumes under electric ultramarine light. The catalogue is analog on purpose — you find the book by wanting it enough to look.</p></>
  ) },
  { id: "nook", dark: true, into: "flythrough", bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, copy: (
    <><span className="ql-idx ql-light">— 03 · the blue hour</span><h2>Late Sessions</h2>
      <p className="ql-pl">Membership includes the hours after the building closes. One lamp, one chair, rain on the glass — this is when the real reading happens.</p></>
  ) },
  { id: "courtyard", dark: true, into: "portal", portal: { x: 70, y: 46 }, bg: `${A}/s4-bg.webp`, fg: `${A}/s4-fg.webp`, copy: (
    <><span className="ql-idx ql-light">— 04 · the cloister</span><h2>Between Sessions</h2>
      <p className="ql-pl">Fellows convene here at dusk to argue about what they read. No panels, no moderators — four people and a good disagreement.</p></>
  ) },
];

const chambers = [
  { n: "01", t: "The Stacks", d: "Floor-to-ceiling ink-dark shelving under rows of electric ultramarine lamps. Silence is enforced by architecture, not signage." },
  { n: "02", t: "Study Carrels", d: "One private desk per fellow, reserved by the season, not the hour. Your books stay shelved between visits." },
  { n: "03", t: "The Blue Hour Room", d: "After-hours access to a single cold window and a chair. The collection nobody rushes through." },
];

const faqs = [
  { q: "Do I need an academic background?", a: "No. We care what you have finished, not what you studied. The application asks for your reading list, not your CV." },
  { q: "Can I visit before applying?", a: "Public tours of the avenue and the courtyard run Thursdays. The stacks and the blue hour room stay fellows-only." },
  { q: "Is there wifi?", a: "In the vestibule, yes. Past the first ultramarine lamp, no — that is the entire point of the lamp." },
];

/* лампа «читает» цитату, ближайшую к середине экрана: data-lit на ней (подсветка — CSS) */
function useLampReading(sel: string) {
  useEffect(() => {
    let last: Element | null = null;
    return subscribe(({ vh }) => {
      const qs = document.querySelectorAll(sel);
      let best: Element | null = null, bd = vh * 0.34;
      qs.forEach((q) => { const r = q.getBoundingClientRect(); const d = Math.abs(r.top + r.height / 2 - vh / 2); if (d < bd) { bd = d; best = q; } });
      if (best === last) return;
      last?.removeAttribute("data-lit");
      (best as Element | null)?.setAttribute("data-lit", "");
      last = best;
    });
  }, [sel]);
}

export function Quill() {
  useLampReading(".ql-editorial-quote");
  return (
    <div className="ql">
      <FontLinks hrefs={["https://fonts.googleapis.com/css2?family=Petrona:ital,wght@0,400;0,500;1,400&family=Schibsted+Grotesk:wght@400;500;600;700&display=swap"]} />

      <header className="ql-nav">
        <span className="ql-brand">QUILL</span>
        <nav>
          <a href="#fellowship">Fellowship</a>
          <a href="#chambers">Chambers</a>
          <a href="#collection">Collection</a>
          <a href="#join" className="ql-nav-cta">Request a seat</a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="read on ↓" />

      {/* СКВОЗНОЙ СЛОЙ: свет лампы под лендингом, дождь аллеи → пыль в луче, сама лампа */}
      <Atmosphere stops={[
        { at: ".ql-big", color: "#0c0f17" }, { at: ".ql-editorial", color: "#0a0d22" }, { at: ".ql-chambers", color: "#171b22" },
        { at: ".ql-steps", color: "#0d1016" }, { at: ".ql-card", color: "#0f1220" }, { at: ".ql-deal", color: "#0b0e26" }, { at: ".ql-climax", color: "#090b10" },
      ]} />
      <Backdrop from=".ql-big" dim={0.55} plates={[
        { at: ".ql-big", src: `${A}/s2-bg.webp`, pos: "50% 100%" }, { at: ".ql-editorial", src: `${A}/s3-bg.webp`, pos: "50% 100%" },
        { at: ".ql-steps", src: `${A}/s1-bg.webp` }, { at: ".ql-card", src: `${A}/s2-bg.webp`, pos: "50% 100%" }, { at: ".ql-deal", src: `${A}/s4-bg.webp` },
      ]} />
      <Weather kind="rain" count={34} color="#7f8fc0" between={[reelMark("s0"), reelMark("t0")]} world={0.3} zIndex={31} />
      <Weather kind="dust" count={24} color="#b9c2ff" between={[reelMark("t0"), ".ql-chambers"]} world={0.6} zIndex={31} seed={11} />
      <Actor className="ql-lamp-actor" width="15vw" zIndex={32} bob={2} tilt={0} stops={[
        { at: reelMark("s0"), pose: { x: 60.4, y: 69, s: 0.9, o: 1 } },
        { at: reelMark("t0"), pose: { x: 64, y: 44, s: 2.6, o: 0.85, blur: 6 } },
        { at: reelMark("s1"), pose: { x: 70, y: 49, s: 1, o: 1 } },
        { at: reelMark("t1"), pose: { x: 52, y: 38, s: 1.6, o: 0.7, blur: 4 } },
        { at: reelMark("s2"), pose: { x: 28.4, y: 44, s: 1.1, o: 1 } },
        { at: reelMark("t2"), pose: { x: 70, y: 46, s: 2.2, o: 0.4, blur: 8 } },
        { at: reelMark("s3"), pose: { x: 84, y: 55, s: 0.9, o: 1 } },
        { at: ".ql-big", pose: { x: 50, y: 20, s: 0.8, o: 0.6 } },
        { at: ".ql-eq-1", anchor: 0.5, pose: { x: -2, y: 18, s: 0.85, o: 1, dock: true } },
        { at: ".ql-eq-2", anchor: 0.5, pose: { x: -2, y: 18, s: 0.85, o: 1, dock: true } },
        { at: ".ql-eq-3", anchor: 0.5, pose: { x: -2, y: 18, s: 0.85, o: 1, dock: true } },
        { at: ".ql-chambers", pose: { x: 80, y: 20, s: 0.6, o: 0 } },
        { at: ".ql-card", pose: { x: 50, y: 20, s: 0.6, o: 0 } },
        { at: ".ql-faq", pose: { x: 50, y: 70, s: 0.6, o: 0 } },
        { at: ".ql-deal-card", anchor: 0.5, pose: { x: 50, y: 0, s: 1.1, o: 1, dock: true } },
        { at: ".ql-climax", pose: { x: 50, y: 30, s: 1.4, o: 0 } },
      ]}><div className="ql-lamp"><i /></div></Actor>

      {/* BIG-TYPE — проблема (чернила) */}
      <section className="ql-big">
        <span className="ql-kick">The problem with reading now</span>
        <p className="ql-big-line">You have not finished a book at your own desk in <em>years</em>.</p>
        <p className="ql-big-sub">Not because the books changed. Because the desk did — six tabs, four apps, one thumb, always waiting on something.</p>
      </section>

      {/* ЦИТАТЫ — лампа подсвечивает их по очереди */}
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

      {/* ЗАЛЫ — известняк */}
      <section className="ql-chambers" id="chambers">
        <div className="ql-chambers-head"><span className="ql-kick">Where a fellowship happens</span><h2>Three rooms, one rhythm.</h2></div>
        <div className="ql-chambers-grid">
          {chambers.map((c) => (
            <div className="ql-chamber-card" key={c.n}><span className="ql-chamber-n">{c.n}</span><h3>{c.t}</h3><p>{c.d}</p></div>
          ))}
        </div>
      </section>

      {/* ШАГИ — чернила */}
      <section className="ql-steps">
        <div className="ql-steps-head"><span className="ql-kick ql-kick-light">How the fellowship works</span><h2>Eleven weeks, one cohort, no shortcuts.</h2></div>
        <ol className="ql-steps-row">
          <li><span className="ql-step-n">01</span><h3>Apply</h3><p>Two essays, no résumé. We want your reading list, not your job title.</p></li>
          <li><span className="ql-step-n">02</span><h3>Read</h3><p>A five-week intensive with a small cohort and one shared spine of texts.</p></li>
          <li><span className="ql-step-n">03</span><h3>Convene</h3><p>Weekly sessions in the cloister at dusk. Disagreement is mandatory.</p></li>
          <li><span className="ql-step-n">04</span><h3>Keep the key</h3><p>Full fellows retain lifetime desk access and borrowing rights.</p></li>
        </ol>
      </section>

      {/* СПЛИТ — известняк */}
      <section className="ql-split" id="collection">
        <div className="ql-split-media" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }} aria-hidden />
        <div className="ql-split-copy">
          <span className="ql-kick">Why the collection stays small</span>
          <h2>Eleven thousand books we have actually read.</h2>
          <p>Every volume on these shelves was proposed, argued for and voted in by a working fellow. Nothing arrives because a donor needed a tax receipt. The librarian remembers who requested each book, and why.</p>
          <a href="#" className="ql-link">Read the acquisitions policy →</a>
        </div>
      </section>

      {/* КАТАЛОЖНАЯ КАРТОЧКА — вместо полосы из четырёх цифр */}
      <section className="ql-card">
        <div className="ql-index">
          <span className="ql-index-hole" aria-hidden />
          <div className="ql-index-head"><b>QL 028.9</b><span>Quill Athenaeum — holdings &amp; terms</span></div>
          <dl>
            <div><dt>Volumes</dt><dd>11,206 <small>hand-selected, each voted in</small></dd></div>
            <div><dt>Desks</dt><dd>4 <small>per reading floor</small></dd></div>
            <div><dt>Cohort</dt><dd>37 <small>fellows, never more</small></dd></div>
            <div><dt>Signal</dt><dd>0 <small>notifications past the threshold</small></dd></div>
          </dl>
          <span className="ql-index-stamp" aria-hidden>Reading room · do not remove</span>
        </div>
      </section>

      {/* FAQ — известняк */}
      <section className="ql-faq">
        <div className="ql-faq-head"><span className="ql-kick">Before you apply</span><h2>Questions we get in the vestibule.</h2></div>
        <div className="ql-faq-list">
          {faqs.map((f, i) => (
            <details className="ql-faq-item" key={i} {...(i === 0 ? { open: true } : {})}><summary>{f.q}</summary><p>{f.a}</p></details>
          ))}
        </div>
      </section>

      {/* ЧЛЕНСТВО — лампа садится над карточкой */}
      <section className="ql-deal" id="join">
        <div className="ql-deal-card">
          <span className="ql-kick ql-kick-light">The fellowship</span>
          <div className="ql-price"><b>$180</b><span>/ season · desk, key &amp; eleven weeks of the reading floor</span></div>
          <p>Applications open twice a year. Cohorts are capped at thirty-seven so the cloister still fits around one table.</p>
          <a href="#" className="ql-btn">Apply for a seat</a>
          <span className="ql-note">Fewer than half of applicants admitted · Reading list required</span>
        </div>
      </section>

      <section className="ql-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
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
