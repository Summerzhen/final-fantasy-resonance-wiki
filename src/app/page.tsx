import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  CircleDot,
  Gamepad2,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { characters, facts, platforms, visions } from "@/lib/ffr-data";
import { DataHubCards, SectionHeading, SourcePanel, StatusBadge } from "@/components/ffr-site";
import { AdSlot, NativeContentAd, StickyTopAd } from "@/components/adsterra-ads";

const combatLoop = [
  ["01", "Read the field", "Find elemental weaknesses and cut the Stagger Gauge faster."],
  ["02", "Break the rhythm", "Empty a gauge to stagger an enemy and interrupt its plan."],
  ["03", "Claim the phase", "The character landing the break earns an end-of-turn action."],
  ["04", "Call a Vision", "Stagger every enemy to unlock one cinematic Resonance attack."],
];

export default function HomePage() {
  const confirmed = visions.filter((vision) => vision.status === "Confirmed" || vision.status === "Observed").length;
  const visibleVisions = visions.filter((vision) => vision.status !== "Unknown").slice(0, 6);

  return (
    <main className="home-main">
      <section className="hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-content">
          <div className="hero-copy">
            <div className="archive-label"><span>CRYSTAL ARCHIVE</span><i /><small>EST. 2026</small></div>
            <p className="eyebrow">THE INDEPENDENT PLAYER DATABASE</p>
            <h1><span>Final Fantasy</span><em>Resonance</em><small>Wiki</small></h1>
            <p className="lede">The Final Fantasy Resonance Wiki (FF Resonance Wiki): a sourced guide to characters, Visions, combat systems, platforms and release information.</p>
            <div className="hero-actions">
              <Link className="primary-button" href="/visions">Browse Visions <ArrowRight /></Link>
              <Link className="ghost-button" href="/characters">Browse characters <ArrowUpRight /></Link>
              <Link className="ghost-button" href="/locations">World map <ArrowUpRight /></Link>
            </div>
            <div className="chips" aria-label="Game facts">
              <span><CalendarDays />Oct 22, 2026</span>
              <span><Gamepad2 />Turn-based RPG</span>
              <span><Users />Single-player</span>
              <span><ShieldCheck />No gacha</span>
            </div>
            <p className="verified-line"><ShieldCheck /> Sourced from official material <span /> Last verified Aug 13, 2026</p>
          </div>

          <div className="hero-visual">
            <div className="visual-orbit orbit-one" aria-hidden="true" />
            <div className="visual-orbit orbit-two" aria-hidden="true" />
            <div className="media-frame">
              <Image
                src="/images/ffr/hero.jpg"
                alt="Rain and Lasswell overlooking an HD-2D landscape in Final Fantasy Resonance"
                fill
                priority
                sizes="(max-width: 900px) 94vw, 47vw"
              />
              <div className="media-vignette" />
              <div className="media-corners" aria-hidden="true"><i /><i /><i /><i /></div>
              <div className="media-caption"><span>ARCHIVE IMAGE // 001</span><b>World of Lapis</b></div>
            </div>
            <div className="crystal-seal" aria-hidden="true"><i /><i /><i /></div>
            <div className="visual-note note-a"><Sparkles /><span><small>VISION INDEX</small><b>{confirmed} / 26 identified</b></span></div>
            <div className="visual-note note-b"><CircleDot /><span><small>STATUS</small><b>Pre-release archive</b></span></div>
          </div>
        </div>

        <div className="hero-index content-shell" aria-label="Archive coverage">
          <div><span>01</span><strong>{confirmed}<small>/26</small></strong><p>Visions revealed or observed</p></div>
          <div><span>02</span><strong>{characters.length}</strong><p>Known story characters</p></div>
          <div><span>03</span><strong>{platforms.length}</strong><p>Launch platform groups</p></div>
          <Link href="/visions"><span>OPEN INDEX</span><b>Browse every record <ArrowUpRight /></b></Link>
        </div>
      </section>

      <div className="content-shell">
        <StickyTopAd />
        <NativeContentAd />
      </div>

      <section className="snapshot" aria-label="Release snapshot">
        <div className="content-shell snapshot-grid">
          {facts.slice(0, 5).map(([label, value, status], index) => (
            <div key={label}><span>{String(index + 1).padStart(2, "0")}</span><small>{label}</small><strong>{value}</strong><StatusBadge status={status} /></div>
          ))}
        </div>
      </section>

      <div className="content-shell home-content">
        <section className="archive-hubs">
          <div className="section-intro-row">
            <SectionHeading eyebrow="BROWSE THE ARCHIVE" title="Start with a record, not a headline" copy="Structured pages surface the answer first, then show exactly where every fact came from." />
            <p className="section-code">INDEX / 01-05<br />LIVE DATA LAYER</p>
          </div>
          <DataHubCards />
        </section>

        <section className="feature-panel">
          <div className="feature-art">
            <Image
              src="/images/ffr/screenshot-2.jpg"
              alt="Cloud exploring an HD-2D city in Final Fantasy Resonance"
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
            />
            <div className="feature-art-shade" />
            <div className="feature-art-label"><span>VISUAL RECORD</span><strong>Legacy heroes, rebuilt as battle roles.</strong></div>
          </div>
          <div className="feature-copy">
            <SectionHeading eyebrow="VISION TRACKER" title={`${confirmed} of 26 named or observed`} copy="One legacy hero slot is reported for each mainline Final Fantasy from I鈥揦VI, alongside ten Resonance and Brave Exvius-side Visions." />
            <div className="progress-meta"><span>REVEAL PROGRESS</span><b>{Math.round((confirmed / 26) * 100)}%</b></div>
            <div className="progress" aria-label={`${confirmed} of 26 Visions revealed`}><i style={{ width: `${(confirmed / 26) * 100}%` }} /></div>
            <div className="mini-list">
              {visibleVisions.map((vision) => (
                <Link href={`/visions/${vision.slug}`} key={vision.slug}>
                  <span>{vision.numeral}</span>
                  <div><b>{vision.name}</b><small>{vision.role} 路 {vision.element}</small></div>
                  <StatusBadge status={vision.status} />
                  <ArrowUpRight className="mini-arrow" />
                </Link>
              ))}
            </div>
            <Link className="text-link" href="/visions">Open all 26 Vision slots <ChevronRight /></Link>
          </div>
        </section>

        <AdSlot name="banner-728x90" className="my-10 hidden md:flex" />

        <section className="roster-section">
          <div className="section-intro-row">
            <SectionHeading eyebrow="CHARACTER ROSTER" title="The people carrying the crystal war" copy="The rebuilt story follows the Grandshelt knights and a growing party across a world sustained by Crystals." />
            <Link className="text-link" href="/characters">View complete roster <ArrowUpRight /></Link>
          </div>
          <div className="character-preview">
            {characters.slice(0, 6).map((character, index) => (
              <Link href={`/characters/${character.slug}`} key={character.slug}>
                <span className="character-index">{String(index + 1).padStart(2, "0")}</span>
                <small>{character.group}</small>
                <h3>{character.name}</h3>
                <p>{character.role}</p>
                <div><StatusBadge status={character.status} /><ArrowUpRight /></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="combat-band">
          <div className="combat-heading">
            <SectionHeading eyebrow="COMBAT LOOP" title="Break the field. Earn the moment." copy="A readable four-step rhythm connects weaknesses, Stagger and each Vision鈥檚 defining attack." />
            <Link className="ghost-button" href="/combat">Combat systems <ArrowRight /></Link>
          </div>
          <div className="combat-flow">
            {combatLoop.map(([number, title, copy]) => (
              <div key={number}><span>{number}</span><i aria-hidden="true" /><h3>{title}</h3><p>{copy}</p></div>
            ))}
          </div>
        </section>

        <section className="launch-section">
          <div className="launch-intro">
            <SectionHeading eyebrow="LAUNCH MATRIX" title="One date. Five platform groups." copy="Store-specific unlock times may cross into October 23 in some regions." />
            <div className="launch-date"><small>WORLDWIDE RELEASE</small><strong>22</strong><span>OCT<br />2026</span></div>
          </div>
          <div className="table-wrap"><table><thead><tr><th>Platform</th><th>Store</th><th>Release</th><th>Physical</th><th>Demo</th></tr></thead><tbody>{platforms.map((platform) => <tr key={platform.name}><th>{platform.name}</th><td>{platform.store}</td><td>{platform.release}</td><td>{platform.physical}</td><td>{platform.demo}</td></tr>)}</tbody></table></div>
        </section>

        <AdSlot name="banner-300x250" className="my-10" />

        <section className="split-section">
          <div className="faq-panel">
            <SectionHeading eyebrow="QUICK ANSWERS" title="What players are asking" />
            <details open><summary><span>01</span>Is Final Fantasy Resonance a gacha game?<ChevronRight /></summary><p>No. It is a premium, single-player RPG. Visions are earned through play rather than random pulls.</p></details>
            <details><summary><span>02</span>Is it a remake of Brave Exvius?<ChevronRight /></summary><p>It extensively rebuilds the first Brave Exvius story arc with rewritten dialogue, new presentation and systems designed for a standalone console RPG.</p></details>
            <details><summary><span>03</span>Is there a demo?<ChevronRight /></summary><p>No public demo has been announced as of August 13, 2026. Our demo page tracks every platform.</p></details>
          </div>
          <SourcePanel />
        </section>
      </div>
    </main>
  );
}
