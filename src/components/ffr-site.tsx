"use client";

import Link from "next/link";
import { type KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  Database,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Swords,
  X,
} from "lucide-react";
import { NAVIGATION } from "@/config/navigation";

export function StatusBadge({ status }: { status: string }) {
  const key = status.toLowerCase();
  return <span className={`status status-${key}`}>{status}</span>;
}

const searchDestinations = [
  ...NAVIGATION.map((item) => ({ ...item, group: "Archive" })),
  { href: "/release-date-platforms", label: "Release date & platforms", group: "Launch" },
  { href: "/editions-pre-order", label: "Editions & pre-order", group: "Launch" },
  { href: "/demo", label: "Demo tracker", group: "Launch" },
  { href: "/pc-system-requirements", label: "PC requirements", group: "Launch" },
  { href: "/locations", label: "Map & locations", group: "World" },
  { href: "/beginner-guide", label: "Beginner guide", group: "Guides" },
  { href: "/stagger-system", label: "Stagger system", group: "Systems" },
  { href: "/resonance-attacks", label: "Resonance attacks", group: "Systems" },
  { href: "/brave-exvius-comparison", label: "Brave Exvius comparison", group: "Game" },
  { href: "/locations", label: "Locations database", group: "World" },
  { href: "/how-to-get-visions", label: "How to get Visions", group: "Systems" },
  { href: "/preorder", label: "Preorder & editions", group: "Launch" },
  { href: "/endgame", label: "Endgame hub", group: "Side content" },
  { href: "/bosses/gilgamesh", label: "Gilgamesh", group: "Side content" },
  { href: "/bosses/ultima-weapon", label: "Ultima Weapon", group: "Side content" },
  { href: "/chamber-of-arms", label: "Chamber of Arms", group: "Side content" },
  { href: "/colosseum", label: "Colosseum", group: "Side content" },
];

function CrystalMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`crystal-mark${compact ? " is-compact" : ""}`} aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function trapFocus(event: KeyboardEvent<HTMLElement>) {
  if (event.key !== "Tab") return;
  const focusable = Array.from(
    event.currentTarget.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => element.offsetParent !== null);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const menuButton = useRef<HTMLButtonElement>(null);
  const searchButton = useRef<HTMLButtonElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return searchDestinations.slice(0, 8);
    return searchDestinations.filter((item) => `${item.label} ${item.group}`.toLowerCase().includes(term));
  }, [query]);

  useEffect(() => {
    if (!menuOpen && !searchOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (searchOpen) {
        setSearchOpen(false);
        searchButton.current?.focus();
      } else {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    if (searchOpen) requestAnimationFrame(() => searchInput.current?.focus());
  }, [searchOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    requestAnimationFrame(() => menuButton.current?.focus());
  };

  const closeSearch = () => {
    setSearchOpen(false);
    requestAnimationFrame(() => searchButton.current?.focus());
  };

  return (
    <>
      <div className="notice">
        <span>Independent archive</span>
        <span>Unofficial fan-made wiki</span>
        <span>Verified Aug 28, 2026</span>
      </div>
      <header className="site-header">
        <div className="nav-shell">
          <Link href="/" className="brand" aria-label="FF Resonance Wiki home">
            <CrystalMark compact />
            <span className="brand-type">
              <b>FF Resonance</b>
              <small>Crystal Archive</small>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {NAVIGATION.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
          </nav>
          <div className="nav-actions">
            <button
              ref={searchButton}
              type="button"
              className="search-button"
              onClick={() => {
                setMenuOpen(false);
                setSearchOpen(true);
              }}
              aria-label="Search the archive"
              aria-expanded={searchOpen}
              aria-controls="archive-search"
            >
              <Search size={17} />
              <span>Search archive</span>
              <kbd>/</kbd>
            </button>
            <button
              ref={menuButton}
              type="button"
              className="menu-button"
              onClick={() => {
                setSearchOpen(false);
                setMenuOpen(true);
              }}
              aria-label="Open navigation"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-overlay" role="presentation">
          <section
            id="mobile-navigation"
            className="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            onKeyDown={trapFocus}
          >
            <div className="mobile-drawer-head">
              <div className="brand">
                <CrystalMark compact />
                <span className="brand-type"><b>FF Resonance</b><small>Crystal Archive</small></span>
              </div>
              <button type="button" aria-label="Close navigation" onClick={closeMenu}><X /></button>
            </div>
            <p className="mobile-kicker">Navigate the archive</p>
            <nav aria-label="Mobile navigation">
              {NAVIGATION.map((item) => (
                <Link key={item.href} href={item.href} onClick={closeMenu}>
                  <span>{item.label}</span>
                  <ChevronRight size={18} />
                </Link>
              ))}
            </nav>
            <button
              type="button"
              className="mobile-search-trigger"
              onClick={() => {
                setMenuOpen(false);
                setSearchOpen(true);
              }}
            >
              <Search size={18} /> Search all records
            </button>
            <p className="mobile-disclaimer">Unofficial and not affiliated with Square Enix.</p>
          </section>
        </div>
      )}

      {searchOpen && (
        <div className="search-overlay" role="presentation">
          <section
            id="archive-search"
            className="search-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Search the archive"
            onKeyDown={trapFocus}
          >
            <div className="search-dialog-head">
              <div><span>CRYSTAL INDEX</span><h2>Find a record</h2></div>
              <button type="button" aria-label="Close search" onClick={closeSearch}><X /></button>
            </div>
            <label className="search-field">
              <Search size={20} aria-hidden="true" />
              <span className="sr-only">Search records</span>
              <input
                ref={searchInput}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try ‘Visions’, ‘Stagger’ or ‘demo’"
              />
              <kbd>ESC</kbd>
            </label>
            <div className="search-results" aria-live="polite">
              {results.length ? results.map((item) => (
                <Link key={item.href} href={item.href} onClick={closeSearch}>
                  <span><small>{item.group}</small><b>{item.label}</b></span>
                  <ArrowUpRight size={17} />
                </Link>
              )) : <p>No matching record. Try a broader term.</p>}
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-identity">
          <div className="brand">
            <CrystalMark compact />
            <span className="brand-type"><b>FF Resonance</b><small>Crystal Archive</small></span>
          </div>
          <p>An independent, evidence-led player database for Final Fantasy Resonance.</p>
          <span className="footer-coordinate">ARCHIVE // LPS-2026</span>
        </div>
        <FooterColumn title="Explore" links={[["Game overview", "/game"], ["Characters", "/characters"], ["Visions", "/visions"], ["Map", "/locations"]]} />
        <FooterColumn title="Release" links={[["Platforms", "/release-date-platforms"], ["Preorder", "/preorder"], ["Editions", "/editions-pre-order"], ["PC requirements", "/pc-system-requirements"]]} />
        <FooterColumn title="Systems" links={[["Beginner guide", "/beginner-guide"], ["Stagger", "/stagger-system"], ["Resonance attacks", "/resonance-attacks"], ["Espers", "/espers"], ["Endgame", "/endgame"], ["FFBE comparison", "/brave-exvius-comparison"]]} />
      </div>
      <div className="legal">Final Fantasy Resonance Wiki is an independent fan-made reference site. FINAL FANTASY, FINAL FANTASY RESONANCE, related characters, artwork and game assets are trademarks or copyrighted works of Square Enix Holdings Co., Ltd. and/or its affiliates. Original editorial text, design and data organization © 2026 final-fantasy-resonance.wiki.</div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[][] }) {
  return <div><h3>{title}</h3>{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>;
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return <nav aria-label="Breadcrumb" className="breadcrumbs"><Link href="/">Home</Link>{items.map((item, i) => <span key={item.label}><ChevronRight size={14} />{item.href && i < items.length - 1 ? <Link href={item.href}>{item.label}</Link> : item.label}</span>)}</nav>;
}

export function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <div className="section-heading"><span>{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>;
}

export function SourcePanel() {
  return (
    <section className="source-panel">
      <div><ShieldCheck /><h2>Evidence, not guesswork</h2></div>
      <p>Every field is labeled <StatusBadge status="Confirmed" />, <StatusBadge status="Observed" />, <StatusBadge status="Reported" /> or <StatusBadge status="Unknown" />. “Unknown” means Square Enix has not announced it — we do not fill gaps with speculation.</p>
      <div className="source-links"><a href="https://www.square-enix.com/finalfantasyresonance/en_US/">Official game site</a><a href="https://store.steampowered.com/app/3259780/FINAL_FANTASY_RESONANCE/">Steam listing</a><a href="https://press.na.square-enix.com/FINAL-FANTASY-RESONANCE">Press hub</a><a href="https://www.rpgsite.net/news/21171-final-fantasy-resonance-screenshots-gilgamesh-ultima-weapon">August 24 update</a></div>
    </section>
  );
}

export const hubCards = [
  { href: "/characters", icon: BookOpen, title: "Characters", count: "All cast", copy: "Story characters, playable status and Vision characters." },
  { href: "/visions", icon: Sparkles, title: "Visions", count: "25 revealed", copy: "Roles, origins, abilities, Magicite and reveal status." },
  { href: "/locations", icon: Database, title: "Map & locations", count: "World hub", copy: "Regions, towns, dungeons, shrines and Espers." },
  { href: "/endgame", icon: Swords, title: "Endgame", count: "New hub", copy: "Mighty Foes, Secret Dungeons, Gilgamesh and Ultima Weapon." },
  { href: "/beginner-guide", icon: Swords, title: "Beginner guide", count: "Start here", copy: "Characters, combat, Visions, Espers and platforms." },
  { href: "/release-date-platforms", icon: Database, title: "Launch database", count: "5 platforms", copy: "Dates, stores, editions and demo status." },
];

export function DataHubCards() {
  return (
    <div className="hub-grid">
      {hubCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Link href={card.href} className="hub-card" key={card.href}>
            <div className="hub-card-top"><span>INDEX {String(index + 1).padStart(2, "0")}</span><b>{card.count}</b></div>
            <div className="hub-icon"><Icon /></div>
            <h3>{card.title}</h3>
            <p>{card.copy}</p>
            <span className="hub-card-link">Open records <ArrowUpRight size={16} /></span>
          </Link>
        );
      })}
    </div>
  );
}
