"use client";
import Link from "next/link";
import { SiteMenu } from "@/components/shared/SiteMenu";

type Site = { slug: string; brand: string; niche: string; img: string; accent: string };

// Все 23 animated-3D-parallax концепт-сайта. Превью — сильнейший кадр галереи (g1),
// clothing — из флагман-набора (look1). Роут: /visual-hooks/<slug>.
const SITES: Site[] = [
  { slug: "clothing", brand: "ALEVTYNA", niche: "Fashion lookbook", img: "clothing/look1.jpg", accent: "#7b7bd6" },
  { slug: "photographer", brand: "NORTHLIGHT", niche: "On-location photography", img: "photographer/g1.jpg", accent: "#d9611f" },
  { slug: "folkmusic", brand: "ЗОРЯ", niche: "Folk ensemble", img: "folkmusic/g1.jpg", accent: "#d9a441" },
  { slug: "womensuit", brand: "SÉVERINE", niche: "Women’s tailoring", img: "womensuit/g1.jpg", accent: "#c98a92" },
  { slug: "jprestaurant", brand: "結 YUI", niche: "Omakase", img: "jprestaurant/g1.jpg", accent: "#c0392b" },
  { slug: "rockband", brand: "FERAL", niche: "Live band", img: "rockband/g1.jpg", accent: "#e5231b" },
  { slug: "escort", brand: "ÉCLAT", niche: "Companionship concierge", img: "escort/g1.jpg", accent: "#cba75a" },
  { slug: "dj", brand: "SERAPH", niche: "DJ show", img: "dj/g1.jpg", accent: "#ff5a1e" },
  { slug: "bmw", brand: "M·WERK", niche: "Performance cars", img: "bmw/g1.jpg", accent: "#2ea6ff" },
  { slug: "skydive", brand: "SKYFALL", niche: "Skydiving", img: "skydive/g1.jpg", accent: "#bcd8cd" },
  { slug: "vinyl", brand: "AFTER HOURS", niche: "Vinyl club", img: "vinyl/g1.jpg", accent: "#b8452f" },
  { slug: "redsuit", brand: "SANGUINE", niche: "Red tailoring", img: "redsuit/g1.jpg", accent: "#cf3341" },
  { slug: "jptattoo", brand: "彫 HORI", niche: "Japanese tattoo", img: "jptattoo/g1.jpg", accent: "#d42a1e" },
  { slug: "jpclub", brand: "YORU 夜", niche: "Nightclub", img: "jpclub/g1.jpg", accent: "#ff3d7f" },
  { slug: "porsche", brand: "PORSCHE", niche: "Classic sports car", img: "porsche/g1.jpg", accent: "#e85a9c" },
  { slug: "anime", brand: "BLOOM+", niche: "Anime magazine", img: "anime/g1.jpg", accent: "#e0326e" },
  { slug: "notredame", brand: "NOTRE‑DAME", niche: "Cathedral visits", img: "notredame/g1.jpg", accent: "#cba24a" },
  { slug: "ecology", brand: "VERDA", niche: "Reforestation", img: "ecology/g1.jpg", accent: "#7dae62" },
  { slug: "skisnow", brand: "TŌJI", niche: "Ski & board rental", img: "skisnow/g1.jpg", accent: "#1f3fd6" },
  { slug: "cardealer", brand: "CONCOURS", niche: "Classic-car dealer", img: "cardealer/g1.jpg", accent: "#e2ac54" },
  { slug: "hoodie", brand: "BLOKK", niche: "Streetwear drops", img: "hoodie/g1.jpg", accent: "#e8e200" },
  { slug: "dance", brand: "KINET", niche: "Dance studio", img: "dance/g1.jpg", accent: "#c6f000" },
  { slug: "freestyle", brand: "SESSION", niche: "Skate crew", img: "freestyle/g1.jpg", accent: "#ff2b4d" },
];

export function AnimatedIndex() {
  return (
    <>
    <SiteMenu variant="bar" />
    <div className="vh-sindex ai-index">
      <header className="sx-head">
        <Link href="/visual-hooks" className="sx-brand"><span>CR</span><b>Visual Hooks · Animated concepts</b></Link>
        <span className="sx-count">{SITES.length} sites</span>
      </header>
      <div className="sx-intro">
        <h1>Animated <em>3D-parallax</em> concept sites.</h1>
        <p>Twenty-three full sites, each built from one art-directed idea — every element on its own layer, moving with scroll and cursor. Each is a live page, not a mockup.</p>
      </div>
      <div className="sx-grid">
        {SITES.map((s) => (
          <Link key={s.slug} href={`/visual-hooks/${s.slug}`} className="sx-card ai-card" style={{ ["--ac" as string]: s.accent }}>
            <div className="sx-media"><img loading="lazy" src={`/uploads/1/hooks/sites/anim/${s.img}`} alt="" /><span className="sx-open">Open ↗</span><i className="ai-dot" /></div>
            <div className="sx-meta"><b>{s.brand}</b><span>{s.niche}</span></div>
          </Link>
        ))}
      </div>
      <footer className="sx-foot"><span>A Visual Hooks concept library — animated series</span><Link href="/visual-hooks">Back to the lab</Link></footer>
    </div>
    </>
  );
}
