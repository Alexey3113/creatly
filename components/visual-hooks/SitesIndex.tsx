"use client";
import Link from "next/link";

type Site = { slug: string; brand: string; niche: string; img: string };
const SITES: Site[] = [
  { slug: "forge", brand: "FORGE", niche: "Bespoke knives", img: "forge-hero.jpg" },
  { slug: "vessel", brand: "VESSEL", niche: "Fashion", img: "vessel.jpg" },
  { slug: "phantom", brand: "PHANTOM", niche: "Electric auto", img: "phantom.jpg" },
  { slug: "horologe", brand: "HOROLOGE", niche: "Watchmaking", img: "horologe.jpg" },
  { slug: "lume", brand: "LUME", niche: "Fine jewellery", img: "lume.jpg" },
  { slug: "mono", brand: "MONO", niche: "Architecture", img: "mono.jpg" },
  { slug: "haven", brand: "HAVEN", niche: "Shoreline retreat", img: "haven.jpg" },
  { slug: "tide", brand: "TIDE", niche: "Cold-water club", img: "tide-hero.jpg" },
  { slug: "canto", brand: "CANTO", niche: "Hi-fi audio", img: "canto-hero.jpg" },
  { slug: "atlas", brand: "ATLAS", niche: "Expedition gear", img: "atlas-hero.jpg" },
  { slug: "noct", brand: "NOCT", niche: "Natural wine", img: "noct-hero.jpg" },
  { slug: "roast", brand: "ROAST", niche: "Coffee roastery", img: "roast.jpg" },
  { slug: "steep", brand: "STEEP", niche: "Whole-leaf tea", img: "steep.jpg" },
  { slug: "loaf", brand: "LOAF", niche: "Bakery", img: "loaf.jpg" },
  { slug: "plat", brand: "PLAT", niche: "Tasting kitchen", img: "plat.jpg" },
  { slug: "sol", brand: "SOL", niche: "Solar energy", img: "sol-hero.jpg" },
  { slug: "dew", brand: "DEW", niche: "Skincare", img: "dew.jpg" },
  { slug: "balm", brand: "BALM", niche: "Day spa", img: "balm.jpg" },
  { slug: "stem", brand: "STEM", niche: "Floristry", img: "stem.jpg" },
  { slug: "clay", brand: "CLAY", niche: "Ceramics", img: "clay.jpg" },
  { slug: "form", brand: "FORM", niche: "Furniture", img: "form.jpg" },
  { slug: "velo", brand: "VÉLO", niche: "Bicycles", img: "velo.jpg" },
  { slug: "thread", brand: "THREAD", niche: "Tailoring", img: "thread.jpg" },
  { slug: "barb", brand: "BARB", niche: "Barbershop", img: "barb.jpg" },
  { slug: "ledger", brand: "LEDGER", niche: "Banking", img: "ledger.jpg" },
  { slug: "iron", brand: "IRON", niche: "Strength gym", img: "iron.jpg" },
  { slug: "swell", brand: "SWELL", niche: "Surfboards", img: "swell.jpg" },
  { slug: "nib", brand: "NIB", niche: "Fine writing", img: "nib.jpg" },
  { slug: "wick", brand: "WICK", niche: "Candles", img: "wick.jpg" },
  { slug: "fern", brand: "FERN", niche: "Plants", img: "fern.jpg" },
  { slug: "fetch", brand: "FETCH", niche: "Pet care", img: "fetch.jpg" },
  { slug: "cacao", brand: "CACAO", niche: "Chocolate", img: "cacao.jpg" },
  { slug: "hide", brand: "HIDE", niche: "Leather goods", img: "hide.jpg" },
  { slug: "comb", brand: "COMB", niche: "Raw honey", img: "comb.jpg" },
  { slug: "spice", brand: "SPICE", niche: "Spice merchant", img: "spice.jpg" },
  { slug: "lens", brand: "LENS", niche: "Film portraits", img: "lens.jpg" },
  { slug: "wax", brand: "WAX", niche: "Record shop", img: "wax.jpg" },
  { slug: "spine", brand: "SPINE", niche: "Bookshop", img: "spine.jpg" },
  { slug: "cask", brand: "CASK", niche: "Whisky", img: "cask.jpg" },
  { slug: "pour", brand: "POUR", niche: "Cocktail bar", img: "pour.jpg" },
  { slug: "grove", brand: "GROVE", niche: "Olive oil", img: "grove.jpg" },
  { slug: "curd", brand: "CURD", niche: "Cheesemonger", img: "curd.jpg" },
  { slug: "stride", brand: "STRIDE", niche: "Running", img: "stride.jpg" },
  { slug: "botanic", brand: "BOTANIC", niche: "Gin distillery", img: "botanic.jpg" },
  { slug: "ink", brand: "INK", niche: "Tattoo studio", img: "ink.jpg" },
  { slug: "selvedge", brand: "SELVEDGE", niche: "Raw denim", img: "selvedge.jpg" },
  { slug: "mane", brand: "MANE", niche: "Hair studio", img: "mane.jpg" },
  { slug: "deck", brand: "DECK", niche: "Skate shop", img: "deck.jpg" },
  { slug: "lather", brand: "LATHER", niche: "Apothecary", img: "lather.jpg" },
  { slug: "malt", brand: "MALT", niche: "Craft brewery", img: "malt.jpg" },
];

export function SitesIndex() {
  return (
    <div className="vh-sindex">
      <header className="sx-head">
        <Link href="/visual-hooks" className="sx-brand"><span>CR</span><b>Visual Hooks · Business sites</b></Link>
        <span className="sx-count">{SITES.length} concepts</span>
      </header>
      <div className="sx-intro">
        <h1>A site for <em>every business.</em></h1>
        <p>Full concept sites, one per niche, each built from a single art-directed idea. Every one is a live page, not a mockup.</p>
      </div>
      <div className="sx-grid">
        {SITES.map((s) => (
          <Link key={s.slug} href={`/visual-hooks/${s.slug}`} className="sx-card">
            <div className="sx-media"><img loading="lazy" src={`/uploads/1/hooks/sites/${s.img}`} alt="" /><span className="sx-open">Open ↗</span></div>
            <div className="sx-meta"><b>{s.brand}</b><span>{s.niche}</span></div>
          </Link>
        ))}
      </div>
      <footer className="sx-foot"><span>A Visual Hooks concept library</span><Link href="/visual-hooks">Back to the lab</Link></footer>
    </div>
  );
}
