import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleDot,
  Clock3,
  Database,
  Minus,
  Monitor,
  Shield,
  Sparkles,
  Swords,
  Users,
  Zap,
} from "lucide-react";
import { Breadcrumbs, SourcePanel, StatusBadge } from "./ffr-site";
import { CharacterExplorer, VisionExplorer } from "./data-explorers";
import { characters, combatFacts, editions, espers, facts, platforms, routeMeta, visions } from "@/lib/ffr-data";

const verified = "August 13, 2026";

export function StandardPage({ route }: { route: string }) {
  const meta = routeMeta[route];
  if (!meta) return null;
  return (
    <main className={`content-shell page-shell route-${route}`}>
      <Breadcrumbs items={[{ label: meta.title }]} />
      <header className="page-header">
        <p className="eyebrow">FIELD GUIDE · VERIFIED {verified.toUpperCase()}</p>
        <h1>{meta.title}</h1>
        <p>{meta.description}</p>
      </header>
      {renderBody(route)}
      <SourcePanel />
    </main>
  );
}

function renderBody(route: string) {
  if (route === "characters") return <CharacterDirectory />;
  if (route === "visions") return <VisionDirectory />;
  if (route === "release-date-platforms") return <ReleasePage />;
  if (route === "editions-pre-order") return <EditionsPage />;
  if (route === "demo") return <DemoPage />;
  if (route === "pc-system-requirements") return <PcRequirementsPage />;
  if (route === "combat") return <CombatSystemPage />;
  if (route === "stagger-system") return <StaggerPage />;
  if (route === "resonance-attacks") return <ResonancePage />;
  if (route === "espers") return <EsperAtlas />;
  if (route === "brave-exvius-comparison") return <ComparisonPage />;
  return <GameOverview />;
}

function CharacterDirectory() {
  const groups = Array.from(new Set(characters.map((character) => character.group)));
  return (
    <div className="character-directory">
      <div className="status-strip roster-status-strip">
        <Metric value={characters.length} label="Known records" />
        <Metric value={characters.filter((character) => character.group === "Main party").length} label="Main party" />
        <Metric value={characters.filter((character) => character.group === "Antagonists").length} label="Antagonists" />
        <Metric value={groups.length} label="Record groups" />
      </div>
      <section className="roster-map" aria-labelledby="roster-map-heading">
        <SectionLabel index="01" title="Roster map" id="roster-map-heading" copy="The current cast grouped by narrative position; combat classifications remain separate evidence fields." />
        <div className="roster-group-grid">
          {groups.map((group) => {
            const members = characters.filter((character) => character.group === group);
            return (
              <article className="roster-group-card" key={group}>
                <header><span>{String(members.length).padStart(2, "0")}</span><h3>{group}</h3></header>
                <div>{members.map((member) => <Link href={`/characters/${member.slug}`} key={member.slug}>{member.name}<ChevronRight /></Link>)}</div>
              </article>
            );
          })}
        </div>
      </section>
      <section className="directory-browser" aria-labelledby="character-browser-heading">
        <SectionLabel index="02" title="Search all character records" id="character-browser-heading" copy="Filter by group, role and evidence status, then open a field-level profile." />
        <CharacterExplorer data={characters} />
      </section>
    </div>
  );
}

function VisionDirectory() {
  const revealed = visions.filter((vision) => vision.status !== "Unknown");
  const knownRoles = Array.from(new Set(revealed.flatMap((vision) => vision.role.split(" / ")).filter((role) => role !== "Unknown")));
  return (
    <div className="vision-directory">
      <div className="status-strip vision-status-strip">
        <Metric value={visions.length} label="Total slots" />
        <Metric value={visions.filter((vision) => vision.status === "Confirmed").length} label="Confirmed" />
        <Metric value={visions.filter((vision) => vision.status === "Observed").length} label="Observed" />
        <Metric value={visions.filter((vision) => vision.status === "Unknown").length} label="Unrevealed" />
      </div>
      <section className="vision-role-index" aria-labelledby="vision-role-heading">
        <SectionLabel index="01" title="Known role language" id="vision-role-heading" copy="Role labels are shown only when present in the current sourced records." />
        <div className="tag-cloud" aria-label="Known Vision roles">{knownRoles.map((role) => <span key={role}>{role}</span>)}</div>
      </section>
      <section className="vision-system-summary" aria-labelledby="vision-system-heading">
        <SectionLabel index="02" title="What each Vision record tracks" id="vision-system-heading" />
        <div className="system-summary-grid">
          <RecordConcept icon={<Database />} title="Origin" copy="The mainline game, Brave Exvius or Resonance record attached to the Vision." />
          <RecordConcept icon={<Shield />} title="Battle role" copy="The confirmed or observed role language associated with its toolkit." />
          <RecordConcept icon={<Zap />} title="Element set" copy="Only elements already present in the current evidence record are listed." />
          <RecordConcept icon={<Sparkles />} title="Ability record" copy="A named move or the clearest sourced description of the known toolkit." />
        </div>
      </section>
      <section className="directory-browser" aria-labelledby="vision-browser-heading">
        <SectionLabel index="03" title="Browse all 26 slots" id="vision-browser-heading" copy="Unknown slots stay visible so the database never turns an unrevealed name into a guess." />
        <VisionExplorer data={visions} />
      </section>
    </div>
  );
}

function ReleasePage() {
  return (
    <div className="release-record">
      <section className="release-date-panel" aria-labelledby="release-date-heading">
        <div className="release-calendar" aria-hidden="true"><span>OCT</span><strong>22</strong><small>2026</small></div>
        <div><p className="record-kicker">WORLDWIDE RELEASE</p><h2 id="release-date-heading">Thursday, October 22, 2026</h2><p>Steam and some regional store listings may show October 23 because of timezone-specific unlocks.</p><StatusBadge status="Confirmed" /></div>
      </section>
      <section className="release-timeline" aria-labelledby="release-timeline-heading">
        <SectionLabel index="01" title="Release record" id="release-timeline-heading" />
        <ol>
          <li><span>NOW</span><div><b>Pre-release information period</b><p>Platform listings, edition contents and system requirements are live.</p></div></li>
          <li><span>OCT 22</span><div><b>Worldwide console launch</b><p>Nintendo Switch 2, Nintendo Switch, PlayStation 5 and Xbox Series X|S list this date.</p></div></li>
          <li><span>OCT 22–23</span><div><b>PC regional unlock window</b><p>Steam and Microsoft Store dates can differ by displayed timezone.</p></div></li>
        </ol>
      </section>
      <section className="platform-matrix" aria-labelledby="platform-heading">
        <SectionLabel index="02" title="Platform matrix" id="platform-heading" copy="Every platform card separates storefront, physical format and public demo status." />
        <div className="platform-card-grid">
          {platforms.map((platform) => (
            <article className="platform-card" key={platform.name}>
              <header><GamePlatformIcon name={platform.name} /><div><small>PLATFORM</small><h3>{platform.name}</h3></div></header>
              <dl><Field label="Store" value={platform.store} /><Field label="Release" value={platform.release} /><Field label="Physical" value={platform.physical} /><Field label="Demo" value={platform.demo} /></dl>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function EditionsPage() {
  const rewards = [
    ["Magitek Airship Passkey", "Cosmetic", "Changes the airship appearance"],
    ["Knight's Greatsword", "Weapon", "Early-game equipment"],
    ["Chestplate of Preparation", "Armor", "Increases experience earned"],
    ["Magicite Shard", "Item", "Early-game support"],
    ["Tent ×3", "Consumable", "Recovery"],
    ["Mist Potion ×3", "Consumable", "Recovery"],
  ];
  return (
    <div className="edition-record">
      <InfoCallout title="Best default choice" value="Standard Edition — $49.99" copy="The complete single-player game is included. Deluxe upgrades add cosmetics and early-game support items; no season pass has been announced." />
      <section aria-labelledby="edition-compare-heading">
        <SectionLabel index="01" title="Edition comparison" id="edition-compare-heading" copy="Read each package vertically or scan a single feature across the three columns." />
        <div className="edition-grid edition-comparison-grid">
          {editions.map((edition, index) => (
            <article className={`edition-card edition-tier-${index + 1}`} key={edition.name}>
              <header><span>{String(index + 1).padStart(2, "0")}</span><StatusBadge status="Confirmed" /></header>
              <h2>{edition.name}</h2><strong>{edition.usd}</strong>
              <div className="edition-feature-list"><Feature yes={edition.game}>Base game</Feature><Feature yes={edition.deluxe}>Digital Deluxe bonuses</Feature><Feature yes={edition.artbook}>Pixel art book</Feature><Feature yes={edition.soundtrack}>120-track soundtrack</Feature><Feature yes={edition.acrylic}>Acrylic block set</Feature><Feature yes={edition.card}>FFTCG promo card</Feature></div>
            </article>
          ))}
        </div>
      </section>
      <section className="reward-inventory" aria-labelledby="reward-heading">
        <SectionLabel index="02" title="Pre-order reward inventory" id="reward-heading" />
        <div className="reward-grid">{rewards.map(([item, type, use]) => <article key={item}><small>{type}</small><h3>{item}</h3><p>{use}</p></article>)}</div>
      </section>
    </div>
  );
}

function DemoPage() {
  return (
    <div className="demo-record">
      <InfoCallout title="Current status" value="No demo announced" copy={`Checked across the official site, Steam and platform announcements on ${verified}. Press hands-on footage is not a downloadable public demo.`} />
      <section aria-labelledby="demo-ledger-heading">
        <SectionLabel index="01" title="Platform status ledger" id="demo-ledger-heading" copy="A missing announcement is recorded as unknown availability, not evidence that a demo will never exist." />
        <div className="demo-ledger">
          {platforms.map((platform) => <article key={platform.name}><div><CircleDot /><h3>{platform.name}</h3></div><span>Public demo</span><strong>{platform.demo}</strong><StatusBadge status="Unknown" /></article>)}
        </div>
      </section>
    </div>
  );
}

const pcSpecs = [
  ["OS", "Windows 11, 64-bit", "Windows 11, 64-bit"],
  ["Processor", "AMD Ryzen 3 2300X / Intel Core i3-8100", "AMD Ryzen 5 2500X / Intel Core i3-8100"],
  ["Memory", "8 GB RAM", "8 GB RAM"],
  ["Graphics", "AMD Radeon RX 6400 / Intel Arc A580 / NVIDIA GeForce GTX 1650", "AMD Radeon RX 5500 XT / Intel Arc A580 / NVIDIA GeForce GTX 1650"],
  ["DirectX", "Version 12", "Version 12"],
  ["Storage", "15 GB available space", "15 GB available space"],
  ["Performance target", "1920×1080 / 30 FPS / Low", "1920×1080 / 60 FPS / Highest"],
] as const;

function PcRequirementsPage() {
  return (
    <div className="pc-record">
      <InfoCallout title="Official Steam requirements" value="Windows 11 · 8 GB RAM · 15 GB storage" copy="Steam publishes performance targets for both tiers: 1080p at 30 FPS on Low for minimum hardware and 1080p at 60 FPS on Highest for recommended hardware." />
      <section className="pc-spec-section" aria-labelledby="pc-spec-heading">
        <SectionLabel index="01" title="Two performance tiers" id="pc-spec-heading" />
        <div className="pc-tier-grid">
          <SpecTier title="Minimum" target="1080p · 30 FPS · Low" index={1} />
          <SpecTier title="Recommended" target="1080p · 60 FPS · Highest" index={2} />
        </div>
      </section>
      <section className="pc-feature-section" aria-labelledby="pc-feature-heading">
        <SectionLabel index="02" title="Confirmed PC features" id="pc-feature-heading" />
        <div className="pc-feature-grid"><RecordConcept icon={<Database />} title="Steam Cloud" copy="Supported" /><RecordConcept icon={<Gamepad2Icon />} title="Controller support" copy="Supported" /><RecordConcept icon={<Shield />} title="DRM" copy="Denuvo Anti-tamper" /></div>
        <p className="evidence-note">Source: <a href="https://store.steampowered.com/app/3259780/FINAL_FANTASY_RESONANCE/">Steam System Requirements</a> · field-level check completed {verified}.</p>
      </section>
    </div>
  );
}

function SpecTier({ title, target, index }: { title: string; target: string; index: 1 | 2 }) {
  return (
    <article className={`pc-tier pc-tier-${index}`}>
      <header><span>{String(index).padStart(2, "0")}</span><div><small>HARDWARE PROFILE</small><h3>{title}</h3></div><StatusBadge status="Confirmed" /></header>
      <p className="pc-target"><Monitor />{target}</p>
      <dl>{pcSpecs.map(([label, minimum, recommended]) => <Field key={label} label={label} value={index === 1 ? minimum : recommended} />)}</dl>
    </article>
  );
}

function CombatSystemPage() {
  const phases = [
    ["01", "Choose commands", "Read the action timeline and assign attacks, magic, support and Vision abilities."],
    ["02", "Exploit weaknesses", "Every hit reduces a Stagger Gauge; weakness hits reduce it faster."],
    ["03", "Claim bonus actions", "The character causing Stagger receives an extra action in the end-of-turn Bonus Phase."],
    ["04", "Trigger Sweeping Stagger", "Stagger every enemy in the field to give the party bonus actions and access one Resonance attack."],
  ];
  return (
    <div className="combat-record">
      <section className="combat-fact-deck" aria-labelledby="combat-facts-heading">
        <SectionLabel index="01" title="Battle specification" id="combat-facts-heading" copy="Core settings and encounter rules separated into scan-friendly mechanism cards." />
        <div className="mechanic-card-grid">{combatFacts.map(([label, value], index) => <article key={label}><span>{String(index + 1).padStart(2, "0")}</span><small>{label}</small><strong>{value}</strong></article>)}</div>
        <p className="evidence-note"><StatusBadge status="Reported" /> Party size, random encounters and speed settings come from developer interviews or preview builds.</p>
      </section>
      <section className="combat-sequence" aria-labelledby="combat-sequence-heading">
        <SectionLabel index="02" title="Turn-to-Resonance sequence" id="combat-sequence-heading" />
        <ol className="rule-flow combat-rule-flow">{phases.map(([number, title, copy]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><ArrowRight /></li>)}</ol>
      </section>
      <nav className="system-jump-grid" aria-label="Connected combat records"><Link href="/stagger-system"><Zap /><span><small>MECHANIC</small><b>Stagger system</b></span><ArrowUpRight /></Link><Link href="/resonance-attacks"><Sparkles /><span><small>DATABASE</small><b>Resonance attacks</b></span><ArrowUpRight /></Link><Link href="/visions"><Shield /><span><small>EQUIPMENT</small><b>Vision records</b></span><ArrowUpRight /></Link></nav>
    </div>
  );
}

function StaggerPage() {
  const conditions = [
    ["Normal hit", "Gauge pressure", "Reduces the Stagger Gauge", "Continue pressure"],
    ["Weakness hit", "Efficient break", "Larger Gauge reduction", "Build a faster route"],
    ["One enemy staggered", "Personal payoff", "Stagger triggered", "Breaker acts in Bonus Phase"],
    ["Every enemy staggered", "Party payoff", "Sweeping Stagger", "Party bonus phase + one Resonance"],
  ];
  return (
    <div className="stagger-record">
      <section className="rule-hero" aria-labelledby="stagger-rule-heading"><div className="rule-symbol"><Zap /></div><div><span>CORE RULE</span><h2 id="stagger-rule-heading">Empty the gauge. Earn another action.</h2><p>Official English material confirms that the character causing Stagger acts again in the end-of-turn Bonus Phase. Additional enemy penalties seen in footage remain observed rather than fully documented.</p></div></section>
      <section className="condition-ladder" aria-labelledby="condition-heading">
        <SectionLabel index="01" title="Condition ladder" id="condition-heading" copy="Each step distinguishes the input, the immediate state change and the follow-up reward." />
        <ol>{conditions.map(([condition, label, result, followup], index) => <li key={condition}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{label}</small><h3>{condition}</h3></div><dl><Field label="Immediate result" value={result} /><Field label="Follow-up" value={followup} /></dl></li>)}</ol>
      </section>
      <RuleNote status="Observed" title="Observed footage is kept separate" copy="Enemy penalties beyond the confirmed bonus-action rule are not promoted to confirmed fields until Square Enix documents them." />
    </div>
  );
}

function ResonancePage() {
  const known = visions.filter((vision) => vision.status !== "Unknown");
  return (
    <div className="resonance-record">
      <section className="resonance-trigger" aria-labelledby="resonance-trigger-heading">
        <div className="resonance-orb"><Sparkles /></div>
        <div><span>TRIGGER CONDITION</span><h2 id="resonance-trigger-heading">Sweeping Stagger</h2><p>After every enemy is staggered, the party may use one cinematic attack from an equipped Vision. Only one can be chosen per trigger.</p></div>
        <div className="trigger-rules"><RulePill number="01" text="Stagger every enemy" /><RulePill number="02" text="Open the party bonus phase" /><RulePill number="03" text="Choose one Resonance" /></div>
      </section>
      <section className="ability-catalog" aria-labelledby="ability-catalog-heading">
        <SectionLabel index="01" title="Known Vision attack and effect records" id="ability-catalog-heading" copy={`${known.length} named or observed Visions currently have a record. Wording reflects only the known data field.`} />
        <div className="ability-card-grid">
          {known.map((vision) => <Link className="ability-card" href={`/visions/${vision.slug}`} key={vision.slug}><header><span>{vision.numeral}</span><StatusBadge status={vision.status} /></header><small>{vision.game}</small><h3>{vision.name}</h3><p>{vision.ability}</p><div><span>{vision.role}</span><ArrowUpRight /></div></Link>)}
        </div>
      </section>
    </div>
  );
}

function EsperAtlas() {
  return (
    <div className="esper-record">
      <section className="esper-behavior" aria-labelledby="esper-behavior-heading"><div><Sparkles /></div><span>SUMMON BEHAVIOR</span><h2 id="esper-behavior-heading">Three-turn battlefield ally</h2><p>Espers fight alongside the party and deliver a powerful finishing move before departing. Summoning consumes substantial MP.</p><StatusBadge status="Confirmed" /></section>
      <section className="esper-atlas" aria-labelledby="esper-atlas-heading">
        <SectionLabel index="01" title="Known Esper atlas" id="esper-atlas-heading" copy="Acquisition wording and battle behavior remain individually labeled by evidence state." />
        <div className="esper-card-grid">
          {espers.map((esper, index) => <article className="esper-card" key={esper.name}><header><span>{String(index + 1).padStart(2, "0")}</span><StatusBadge status={esper.status} /></header><div className="esper-glyph" aria-hidden="true">{esper.name.slice(0, 2).toUpperCase()}</div><h3>{esper.name}</h3><dl><Field label="Route" value={esper.route} /><Field label="Behavior" value={esper.behavior} /></dl></article>)}
        </div>
      </section>
    </div>
  );
}

function ComparisonPage() {
  const rows = [
    ["Format", "Premium standalone RPG", "Free-to-play mobile live service"],
    ["Characters", "Fixed story party + equippable Visions", "Units acquired through story and gacha"],
    ["Combat", "Turn-based timeline, Stagger and Extra Phase", "Turn-based chain-focused battles"],
    ["Energy", "No stamina system announced", "Stages consumed energy"],
    ["Story", "First arc extensively rewritten and reordered", "Original serialized mobile storyline"],
    ["Platforms", "Console and PC", "iOS / Android / Amazon"],
    ["Status", "Releases October 22, 2026", "Global service ended in 2024"],
  ];
  return (
    <div className="comparison-record">
      <InfoCallout title="Short answer" value="A rebuilt premium RPG — not a gacha port" copy="Resonance retells the first FFBE story arc but removes stamina, random character pulls and live-service progression." />
      <section aria-labelledby="comparison-heading"><SectionLabel index="01" title="System-by-system comparison" id="comparison-heading" /><div className="comparison-grid"><header><span>AREA</span><b>Final Fantasy Resonance</b><b>Brave Exvius</b></header>{rows.map(([area, resonance, ffbe]) => <article key={area}><h3>{area}</h3><p>{resonance}</p><p>{ffbe}</p></article>)}</div></section>
    </div>
  );
}

function GameOverview() {
  return (
    <div className="game-overview-record">
      <div className="stat-grid game-fact-grid">{facts.map(([label, value, status]) => <div key={label}><small>{label}</small><strong>{value}</strong><StatusBadge status={status} /></div>)}</div>
      <section className="story-dossier" aria-labelledby="story-heading"><div className="story-image"><img src="/images/ffr/screenshot-3.jpg" alt="Airship flying across the Final Fantasy Resonance world map" /></div><article><span>STORY DOSSIER</span><h2 id="story-heading">A crystal story, rebuilt</h2><p>The Kingdom of Grandshelt guards the Earth Crystal until Veritas of the Dark shatters it. Airship commander Rain and deputy Lasswell survive the attack, rescue their king and set out to defend the remaining Crystals. Fina, a woman who emerges from the Crystal with no memory beyond her name, joins them.</p><p>The broad foundation comes from Final Fantasy Brave Exvius, but Resonance is presented as a rebuilt standalone game: dialogue was rewritten, events were reordered, the main scenario is voiced and the systems were reworked for consoles and PC.</p></article></section>
      <nav className="overview-jump-grid" aria-label="Continue through the game overview"><Link href="/characters"><Users /><span><small>CAST</small><b>Character records</b></span><ArrowUpRight /></Link><Link href="/visions"><Sparkles /><span><small>SYSTEM</small><b>Vision tracker</b></span><ArrowUpRight /></Link><Link href="/combat"><Swords /><span><small>MECHANICS</small><b>Combat guide</b></span><ArrowUpRight /></Link></nav>
    </div>
  );
}

export function CharacterPage({ slug }: { slug: string }) {
  const character = characters.find((entry) => entry.slug === slug);
  if (!character) return null;
  const roleEvidence = character.role.includes("Not officially") ? "Unknown" : "Confirmed";
  const jobEvidence = character.job === "Not announced" ? "Unknown" : "Confirmed";
  const relatedCharacters = characters.filter((entry) => entry.slug !== character.slug && (entry.group === character.group || entry.affiliation === character.affiliation)).slice(0, 4);
  const connectedSystems: RelatedRecord[] = [
    { href: "/characters", label: "Character database", detail: "Filter the confirmed cast by group, role and evidence status." },
    { href: "/visions", label: "Vision database", detail: "Browse the equippable roles, elements and abilities revealed so far." },
    { href: "/combat", label: "Combat systems", detail: "See how party commands, Stagger and bonus actions work together." },
    { href: "/brave-exvius-comparison", label: "Brave Exvius comparison", detail: "Compare the rebuilt story, fixed party and premium format with FFBE." },
  ];
  if (character.summary.toLowerCase().includes("esper") || character.summary.toLowerCase().includes("bahamut")) connectedSystems.splice(2, 0, { href: "/espers", label: "Espers and summons", detail: "Review the confirmed summons and their battlefield behavior." });
  const playable = character.group === "Antagonists" ? "Not announced" : "Shown with the party";
  return (
    <EntityPage kind="Character" name={character.name} summary={character.summary} status={character.status}>
      <div className="character-dossier">
        <aside className="character-identity-panel">
          <div className="identity-monogram">{character.name.slice(0, 2).toUpperCase()}</div>
          <span>CHARACTER RECORD</span><h2>{character.name}</h2><StatusBadge status={character.status} />
          <p>{character.summary}</p>
          <dl><Field label="Group" value={character.group} /><Field label="Affiliation" value={character.affiliation} /><Field label="Last verified" value={verified} /></dl>
        </aside>
        <div className="character-record-body">
          <section className="field-matrix" aria-labelledby="character-fields-heading">
            <SectionLabel index="01" title="Profile field matrix" id="character-fields-heading" copy="Each value keeps its own evidence status instead of inheriting confidence from the page title." />
            <div className="field-card-grid">
              <FieldCard label="Narrative group" value={character.group} status={character.status} />
              <FieldCard label="Combat role" value={character.role} status={roleEvidence} />
              <FieldCard label="Job" value={character.job} status={jobEvidence} />
              <FieldCard label="Affiliation" value={character.affiliation} status={character.status} />
              <FieldCard label="Playable status" value={playable} status={character.group === "Antagonists" ? "Unknown" : character.status} />
            </div>
          </section>
          <section className="relationship-panel" aria-labelledby="relationship-heading">
            <SectionLabel index="02" title="Relationship index" id="relationship-heading" copy="Connections are generated only from shared group or affiliation fields in the current database." />
            <div className="relationship-core"><span>{character.affiliation}</span><strong>{character.name}</strong><small>{character.group}</small></div>
            <div className="relationship-list">{relatedCharacters.length ? relatedCharacters.map((related) => <Link href={`/characters/${related.slug}`} key={related.slug}><span><small>{related.group}</small><b>{related.name}</b></span><ChevronRight /></Link>) : <p>No same-group or same-affiliation character record is currently available.</p>}</div>
          </section>
          <RelatedRecords title="Connected databases and systems" items={connectedSystems} />
          <RuleNote status="Unknown" title="Launch-day expansion fields" copy="Base stats, native abilities, Limit Burst, equipment options, story joins and tested builds remain unpublished rather than being guessed from Brave Exvius." />
        </div>
      </div>
    </EntityPage>
  );
}

export function VisionPage({ slug }: { slug: string }) {
  const vision = visions.find((entry) => entry.slug === slug && entry.status !== "Unknown");
  if (!vision) return null;
  const elements = vision.element.split(" / ").filter((element) => element !== "Unknown");
  const relatedVisions = visions.filter((entry) => entry.slug !== vision.slug && entry.status !== "Unknown").sort((a, b) => Number(b.game === vision.game) - Number(a.game === vision.game) || Number(b.role === vision.role) - Number(a.role === vision.role)).slice(0, 4);
  return (
    <EntityPage kind="Vision" name={vision.name} summary={`${vision.name} is an equippable Vision originating from ${vision.game}.`} status={vision.status}>
      <div className="vision-dossier">
        <section className="vision-ability-hero" aria-labelledby="vision-ability-heading">
          <div className="vision-sigil"><span>{vision.numeral}</span></div>
          <div><span>KNOWN ABILITY RECORD</span><h2 id="vision-ability-heading">{vision.ability}</h2><p>{vision.name} · {vision.game}</p><div className="element-tags">{elements.length ? elements.map((element) => <span key={element}>{element}</span>) : <span>Element not announced</span>}</div></div>
          <StatusBadge status={vision.status} />
        </section>
        <section className="vision-field-panel" aria-labelledby="vision-fields-heading">
          <SectionLabel index="01" title="Vision field matrix" id="vision-fields-heading" />
          <div className="field-card-grid vision-field-grid"><FieldCard label="Origin" value={vision.game} status={vision.status} /><FieldCard label="Role" value={vision.role} status={vision.status} /><FieldCard label="Element" value={vision.element} status={vision.status} /><FieldCard label="Known ability" value={vision.ability} status={vision.status} /><FieldCard label="Unlock route" value="Sanctum or character event; exact route not announced" status="Reported" /></div>
        </section>
        <section className="resonance-rule-panel" aria-labelledby="vision-rule-heading"><Sparkles /><div><span>RESONANCE USE</span><h2 id="vision-rule-heading">One choice after Sweeping Stagger</h2><p>After every enemy is staggered, one party member can unleash the cinematic Resonance attack belonging to their equipped Vision. Only one Resonance can be chosen during each party bonus phase.</p></div><Link href="/resonance-attacks">Open attack database <ArrowUpRight /></Link></section>
        <section className="related-vision-panel" aria-labelledby="related-vision-heading"><SectionLabel index="02" title="Associated Vision records" id="related-vision-heading" copy="Prioritized by shared origin first, then shared role." /><div className="related-vision-grid">{relatedVisions.map((related) => <Link href={`/visions/${related.slug}`} key={related.slug}><span>{related.numeral}</span><div><small>{related.game}</small><h3>{related.name}</h3><p>{related.role} · {related.element}</p></div><ArrowUpRight /></Link>)}</div></section>
        <nav className="system-jump-grid" aria-label="Connected Vision systems"><Link href="/visions"><Database /><span><small>DATABASE</small><b>All Vision records</b></span><ArrowUpRight /></Link><Link href="/stagger-system"><Zap /><span><small>TRIGGER</small><b>Stagger system</b></span><ArrowUpRight /></Link><Link href="/combat"><Swords /><span><small>SYSTEM</small><b>Combat guide</b></span><ArrowUpRight /></Link></nav>
      </div>
    </EntityPage>
  );
}

function EntityPage({ kind, name, summary, status, children }: { kind: string; name: string; summary: string; status: string; children: ReactNode }) {
  return <main className={`content-shell page-shell entity-page entity-${kind.toLowerCase()}`}><Breadcrumbs items={[{ label: `${kind}s`, href: `/${kind.toLowerCase()}s` }, { label: name }]} /><header className="page-header entity-page-header"><div><StatusBadge status={status} /></div><p className="eyebrow">{kind.toUpperCase()} DATABASE</p><h1>{name}</h1><p>{summary}</p></header>{children}<SourcePanel /></main>;
}

function Metric({ value, label }: { value: number | string; label: string }) {
  return <div><b>{value}</b><span>{label}</span></div>;
}

function SectionLabel({ index, title, id, copy }: { index: string; title: string; id: string; copy?: string }) {
  return <header className="record-section-heading"><span>{index}</span><div><small>DATABASE SECTION</small><h2 id={id}>{title}</h2>{copy && <p>{copy}</p>}</div></header>;
}

function RecordConcept({ icon, title, copy }: { icon: ReactNode; title: string; copy: string }) {
  return <article className="record-concept-card"><div>{icon}</div><h3>{title}</h3><p>{copy}</p></article>;
}

function GamePlatformIcon({ name }: { name: string }) {
  return <div className="platform-icon" aria-hidden="true">{name === "PC" ? <Monitor /> : <Gamepad2Icon />}</div>;
}

function Gamepad2Icon() {
  return <Swords aria-hidden="true" />;
}

function Field({ label, value }: { label: string; value: string }) {
  return <><dt>{label}</dt><dd>{value}</dd></>;
}

function FieldCard({ label, value, status }: { label: string; value: string; status: string }) {
  return <article className="field-card"><small>{label}</small><strong>{value}</strong><StatusBadge status={status} /></article>;
}

function RulePill({ number, text }: { number: string; text: string }) {
  return <div><span>{number}</span><b>{text}</b></div>;
}

function RuleNote({ status, title, copy }: { status: string; title: string; copy: string }) {
  return <aside className="rule-note"><StatusBadge status={status} /><div><h3>{title}</h3><p>{copy}</p></div></aside>;
}

type RelatedRecord = { href: string; label: string; detail: string };
function RelatedRecords({ title, items }: { title: string; items: RelatedRecord[] }) {
  if (!items.length) return null;
  return <section className="related-records"><header><small>RELATED RECORDS</small><h2>{title}</h2></header><div>{items.map((item) => <Link href={item.href} key={item.href}><span><b>{item.label}</b><small>{item.detail}</small></span><ArrowUpRight /></Link>)}</div></section>;
}

function InfoCallout({ title, value, copy }: { title: string; value: string; copy: string }) {
  return <section className="info-callout"><small>{title}</small><strong>{value}</strong><p>{copy}</p></section>;
}

function Feature({ yes, children }: { yes: boolean; children: ReactNode }) {
  return <p className={yes ? "included" : "excluded"}>{yes ? <Check /> : <Minus />}{children}</p>;
}
