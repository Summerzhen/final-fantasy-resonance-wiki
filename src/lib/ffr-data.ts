export type Evidence = "Confirmed" | "Observed" | "Reported" | "Unknown";
export type Character = { slug: string; name: string; group: string; role: string; job: string; affiliation: string; summary: string; status: Evidence; image?: string };
export type Vision = { slug: string; name: string; game: string; numeral: string; role: string; element: string; ability: string; status: Evidence };

export const siteName = "Final Fantasy Resonance Wiki";
export const siteUrl = "https://final-fantasy-resonance.wiki";
export const defaultOgImage = "/images/ffr/og.png";

export function absoluteSiteUrl(pathname: string) {
  return new URL(pathname, siteUrl).toString();
}

export const sources = {
  official: { label: "Square Enix official site", href: "https://www.square-enix.com/finalfantasyresonance/en_US/" },
  steam: { label: "Steam store", href: "https://store.steampowered.com/app/3259780/FINAL_FANTASY_RESONANCE/" },
  press: { label: "Square Enix press hub", href: "https://press.na.square-enix.com/FINAL-FANTASY-RESONANCE" },
  gematsu: { label: "Gematsu announcement coverage", href: "https://www.gematsu.com/2026/06/hd-2d-rpg-final-fantasy-resonance-announced-for-ps5-xbox-series-switch-2-switch-and-pc" },
};

export const facts = [
  ["Release date", "October 22, 2026", "Confirmed"],
  ["Genre", "Turn-based role-playing game", "Confirmed"],
  ["Players", "Single-player", "Confirmed"],
  ["Business model", "Premium standalone game", "Confirmed"],
  ["Developer", "Square Enix / LANCARSE Ltd.", "Confirmed"],
  ["Main story", "Rebuilt from the first FFBE story arc", "Confirmed"],
] as const;

export const platforms = [
  { name: "Nintendo Switch 2", store: "Nintendo eShop", release: "Oct 22, 2026", physical: "Game-key card", demo: "Not announced" },
  { name: "Nintendo Switch", store: "Nintendo eShop", release: "Oct 22, 2026", physical: "Available", demo: "Not announced" },
  { name: "PlayStation 5", store: "PlayStation Store", release: "Oct 22, 2026", physical: "Available", demo: "Not announced" },
  { name: "Xbox Series X|S", store: "Microsoft Store", release: "Oct 22, 2026", physical: "Not announced", demo: "Not announced" },
  { name: "PC", store: "Steam / Microsoft Store", release: "Oct 22–23 by region", physical: "Digital", demo: "Not announced" },
];

export const characters: Character[] = [
  { slug: "rain", name: "Rain", group: "Main party", role: "Not officially classified", job: "Knight", affiliation: "Kingdom of Grandshelt", summary: "Commander of Grandshelt's airship squadron and the central hero of the journey.", status: "Confirmed", image: "/images/ffr/screenshot-4.jpg" },
  { slug: "lasswell", name: "Lasswell", group: "Main party", role: "Not officially classified", job: "Knight", affiliation: "Kingdom of Grandshelt", summary: "Rain's childhood friend and deputy commander; a knight described as Rain's equal in skill.", status: "Confirmed" },
  { slug: "fina", name: "Fina", group: "Main party", role: "White magic / Archery", job: "Not announced", affiliation: "Unknown", summary: "A mysterious girl from the Earth Crystal who remembers only her name and can communicate with espers.", status: "Confirmed" },
  { slug: "lid", name: "Lid", group: "Main party", role: "Mechabo attacker", job: "Engineer", affiliation: "Dilmagia", summary: "An aspiring engineer whose toolkit includes mechanical Mechabo arts.", status: "Confirmed" },
  { slug: "nichol", name: "Nichol", group: "Allies", role: "Not officially classified", job: "Strategist", affiliation: "Olderion Federation", summary: "A strategist associated with the water-blessed capital of Olderion.", status: "Confirmed" },
  { slug: "mysterious-woman", name: "Mysterious Woman", group: "Other", role: "Offensive magic", job: "Not announced", affiliation: "Unknown", summary: "An unnamed woman who travels with Bahamut and bears deep enmity toward Veritas of the Dark.", status: "Confirmed" },
  { slug: "veritas-of-the-dark", name: "Veritas of the Dark", group: "Antagonists", role: "Boss", job: "Armored warrior", affiliation: "Sworn Six of Paladia", summary: "The black-armored warrior pursuing the destruction of the world's Crystals.", status: "Confirmed" },
  { slug: "veritas-of-the-heavens", name: "Veritas of the Heavens", group: "Antagonists", role: "Boss", job: "Lancer", affiliation: "Sworn Six of Paladia", summary: "A cold aerial combatant who commands wind and a lance.", status: "Confirmed" },
  { slug: "veritas-of-the-waters", name: "Veritas of the Waters", group: "Antagonists", role: "Boss", job: "Mage", affiliation: "Sworn Six of Paladia", summary: "A ruthless member of the Sworn Six who fights with water magic.", status: "Confirmed" },
];

export const visions: Vision[] = [
  { slug: "warrior-of-light", name: "Warrior of Light", game: "Final Fantasy", numeral: "I", role: "Defender", element: "Earth / Lightning / Light", ability: "Ally protection and signature attack", status: "Confirmed" },
  { slug: "firion", name: "Unrevealed hero", game: "Final Fantasy II", numeral: "II", role: "Unknown", element: "Unknown", ability: "Not announced", status: "Unknown" },
  { slug: "onion-knight", name: "Unrevealed hero", game: "Final Fantasy III", numeral: "III", role: "Unknown", element: "Unknown", ability: "Not announced", status: "Unknown" },
  { slug: "cecil", name: "Cecil", game: "Final Fantasy IV", numeral: "IV", role: "Defender / Healer", element: "Light / Dark", ability: "Defense and healing toolkit", status: "Confirmed" },
  { slug: "bartz", name: "Bartz", game: "Final Fantasy V", numeral: "V", role: "Stagger", element: "Fire / Ice", ability: "Spellblade and strong stagger tools", status: "Confirmed" },
  { slug: "terra", name: "Terra", game: "Final Fantasy VI", numeral: "VI", role: "Magic", element: "Fire / Water / Ice", ability: "Multi-element magic", status: "Confirmed" },
  { slug: "cloud", name: "Cloud", game: "Final Fantasy VII", numeral: "VII", role: "Attacker", element: "Lightning / Water", ability: "Cross Slash", status: "Confirmed" },
  { slug: "squall", name: "Squall", game: "Final Fantasy VIII", numeral: "VIII", role: "Attacker", element: "Unknown", ability: "Standard attacks scale with repeated use", status: "Confirmed" },
  { slug: "zidane", name: "Zidane", game: "Final Fantasy IX", numeral: "IX", role: "Speed / Utility", element: "Unknown", ability: "Steal and vitality/speed drain", status: "Confirmed" },
  { slug: "tidus", name: "Tidus", game: "Final Fantasy X", numeral: "X", role: "Stagger support", element: "Wind / Water", ability: "Haste and stagger support", status: "Confirmed" },
  { slug: "shantotto", name: "Shantotto", game: "Final Fantasy XI", numeral: "XI", role: "Magic", element: "Lightning / Water / Dark", ability: "Multi-cast black magic", status: "Confirmed" },
  { slug: "vaan", name: "Unrevealed hero", game: "Final Fantasy XII", numeral: "XII", role: "Unknown", element: "Unknown", ability: "Not announced", status: "Unknown" },
  { slug: "lightning", name: "Lightning", game: "Final Fantasy XIII", numeral: "XIII", role: "Unknown", element: "Unknown", ability: "Identity sighted in official footage", status: "Observed" },
  { slug: "yshtola", name: "Y'shtola", game: "Final Fantasy XIV", numeral: "XIV", role: "Stagger / Healer", element: "Fire / Ice", ability: "Healing and stagger magic", status: "Confirmed" },
  { slug: "noctis", name: "Unrevealed hero", game: "Final Fantasy XV", numeral: "XV", role: "Unknown", element: "Unknown", ability: "Not announced", status: "Unknown" },
  { slug: "clive", name: "Unrevealed hero", game: "Final Fantasy XVI", numeral: "XVI", role: "Unknown", element: "Unknown", ability: "Not announced", status: "Unknown" },
  { slug: "charlotte", name: "Charlotte", game: "Brave Exvius", numeral: "FFBE", role: "Defender", element: "Ice / Water", ability: "High-durability defensive toolkit", status: "Confirmed" },
  { slug: "leah", name: "Leah", game: "Brave Exvius", numeral: "FFBE", role: "Healer", element: "Light", ability: "White magic", status: "Confirmed" },
  { slug: "tronn", name: "Tronn", game: "Brave Exvius", numeral: "FFBE", role: "Magic", element: "Fire / Ice / Lightning", ability: "Stagger-oriented black magic", status: "Confirmed" },
  { slug: "aileen", name: "Aileen", game: "Brave Exvius", numeral: "FFBE", role: "Breaker", element: "Unknown", ability: "Pilebunker defense reduction", status: "Confirmed" },
  { slug: "amelia", name: "Amelia", game: "Brave Exvius", numeral: "FFBE", role: "Unknown", element: "Unknown", ability: "Read from official livestream menu", status: "Observed" },
  ...Array.from({ length: 5 }, (_, i) => ({ slug: `unrevealed-${i + 1}`, name: "Unrevealed Vision", game: "Final Fantasy Resonance", numeral: "FFR", role: "Unknown", element: "Unknown", ability: "Not announced", status: "Unknown" as const })),
];

export const espers = [
  { name: "Siren", route: "Story / side content", behavior: "Water and wind attacks; Lunatic Voice may inflict Sleep or Silence", status: "Confirmed" },
  { name: "Ramuh", route: "Optional dungeon battle (press preview)", behavior: "Judgment Bolt deals lightning damage to all enemies", status: "Reported" },
  { name: "Ifrit", route: "Story / side content", behavior: "Hellfire deals fire damage to all enemies", status: "Confirmed" },
  { name: "Shiva", route: "Story / side content", behavior: "Diamond Dust deals ice damage to all enemies", status: "Confirmed" },
  { name: "Titan", route: "Story / side content", behavior: "Gaia's Wrath deals heavy earth damage to all enemies", status: "Confirmed" },
  { name: "Bahamut", route: "Story-related presence", behavior: "Travels with the unnamed mysterious woman; battle mechanics not announced", status: "Confirmed" },
];

export const locations = [
  { slug: "dilmagia", name: "Dilmagia", type: "Region", purpose: "A confirmed world region connected to Lid and Machinopolis.", status: "Confirmed" },
  { slug: "machinopolis", name: "Machinopolis", type: "City / sub-region", purpose: "A technology-focused location associated with Dilmagia.", status: "Confirmed" },
  { slug: "olderion", name: "Olderion", type: "Region", purpose: "The water-blessed region associated with Nichol and Aquapolis.", status: "Confirmed" },
  { slug: "aquapolis", name: "Aquapolis", type: "City / sub-region", purpose: "A confirmed location within the Olderion setting.", status: "Confirmed" },
  { slug: "sanctums-of-light", name: "Sanctums of Light", type: "Vision-related site", purpose: "Sites connected to Vision Crystals and the Vision system.", status: "Confirmed" },
  { slug: "colosseum", name: "Colosseum", type: "Battle facility", purpose: "A side-content location featuring deadly monsters and rewards.", status: "Confirmed" },
  { slug: "chamber-of-arms", name: "Chamber of Arms", type: "Challenge area", purpose: "A sealed challenge containing formidable foes within legendary weapons.", status: "Confirmed" },
] as const;

export const sideContent = [
  { slug: "gilgamesh", name: "Gilgamesh", path: "/bosses/gilgamesh", type: "Character / optional encounter", summary: "The wandering swordmaster Gilgamesh is confirmed as part of Final Fantasy Resonance side content. His location, rewards and battle details remain unannounced.", status: "Confirmed" },
  { slug: "ultima-weapon", name: "Ultima Weapon", path: "/bosses/ultima-weapon", type: "Optional boss", summary: "Square Enix has confirmed a showdown with Ultima Weapon. Exact location, stats, weaknesses and rewards are not officially revealed yet.", status: "Confirmed" },
  { slug: "chamber-of-arms", name: "Chamber of Arms", path: "/chamber-of-arms", type: "Challenge area", summary: "The Chamber of Arms contains formidable foes sealed within legendary weapons. Unlock requirements and rewards are pending release.", status: "Confirmed" },
  { slug: "colosseum", name: "Colosseum", path: "/colosseum", type: "Battle facility", summary: "The Colosseum is confirmed to feature deadly monsters and rewards. Its complete ruleset will be added after launch.", status: "Confirmed" },
] as const;

export const combatFacts = [
  ["Party size", "Up to four active members"], ["Turn model", "Pure command-based turns; no ATB gauge"],
  ["Turn display", "Timeline previews action order"], ["Encounter model", "Random encounters"],
  ["Difficulty", "Casual and Normal confirmed; third label unverified"], ["Battle speed", "Standard, 1.5× and 2×"],
  ["Weakness payoff", "Extra Stagger Gauge damage"], ["Sweeping Stagger", "Stagger every enemy to open a party-wide bonus phase"],
] as const;

export const editions = [
  { name: "Standard", usd: "$49.99", game: true, deluxe: false, artbook: false, soundtrack: false, acrylic: false, card: false },
  { name: "Digital Deluxe", usd: "$59.99", game: true, deluxe: true, artbook: false, soundtrack: false, acrylic: false, card: false },
  { name: "Collector's Edition", usd: "$209.99", game: true, deluxe: true, artbook: true, soundtrack: true, acrylic: true, card: true },
];

export const routeMeta: Record<string, { title: string; description: string }> = {
  game: { title: "Everything We Know About Final Fantasy Resonance", description: "A sourced game overview covering its story, systems, developer, release plan and relationship to Brave Exvius." },
  "release-date-platforms": { title: "Final Fantasy Resonance Release Date, Platforms & Price", description: "The October 22, 2026 release date, supported platforms, storefronts, physical formats and current launch status." },
  "editions-pre-order": { title: "Final Fantasy Resonance Preorder, Editions, Bonuses & Prices", description: "Compare Standard, Digital Deluxe and Collector's Editions, prices, contents and preorder rewards." },
  demo: { title: "Is There a Final Fantasy Resonance Demo?", description: "A platform-by-platform demo status tracker with a clear last-verified date." },
  "pc-system-requirements": { title: "Final Fantasy Resonance PC System Requirements", description: "Official minimum and recommended PC specs, including CPU, GPU, DirectX 12, storage and 1080p performance targets from Steam." },
  characters: { title: "Final Fantasy Resonance Characters", description: "Filter the known cast by group, combat role and evidence status." },
  visions: { title: "FF Resonance Visions — Final Fantasy Resonance Database", description: "Visions are equippable records in Final Fantasy Resonance. Browse the 26-slot tracker by origin, role, element, ability and reveal status." },
  combat: { title: "Final Fantasy Resonance Combat Explained", description: "Turn order, party size, Stagger, Extra Phase, Visions, difficulty and battle-speed settings." },
  "stagger-system": { title: "Final Fantasy Resonance Stagger System", description: "How weaknesses, Stagger Gauges, bonus actions and Sweeping Stagger connect." },
  "resonance-attacks": { title: "Final Fantasy Resonance Attacks Database", description: "Known Resonance attack triggers, effects and connected Visions, with evidence status." },
  espers: { title: "Final Fantasy Resonance Espers & Summons", description: "Known Espers, how they are obtained, their three-turn battle behavior and reveal status." },
  "brave-exvius-comparison": { title: "Final Fantasy Resonance vs Brave Exvius", description: "A direct comparison of story, combat, platform and business model — including why Resonance is not a gacha game." },
  locations: { title: "Final Fantasy Resonance Locations", description: "A confirmed location database covering Dilmagia, Olderion, Sanctums of Light, the Colosseum and Chamber of Arms." },
  "how-to-get-visions": { title: "How to Get Visions in Final Fantasy Resonance", description: "What is currently confirmed about Vision Crystals, Sanctums of Light and Vision unlocks before launch." },
  "sanctums-of-light": { title: "Sanctums of Light — Final Fantasy Resonance", description: "Confirmed information about Sanctums of Light and their connection to Vision Crystals." },
  preorder: { title: "Final Fantasy Resonance Preorder — Editions, Bonuses & Prices", description: "A launch-window tracker for preorder bonuses, editions and official prices." },
  "switch-vs-switch-2": { title: "Final Fantasy Resonance Switch vs Switch 2", description: "Compare file size, save transfer, upgrade path, compatibility and purchase considerations." },
  "gilgamesh": { title: "Gilgamesh — Final Fantasy Resonance", description: "Confirmed information about the wandering swordmaster Gilgamesh and the details still unknown until launch." },
  "ultima-weapon": { title: "Ultima Weapon — Final Fantasy Resonance Boss Guide", description: "Confirmed side-content information about Ultima Weapon, with unrevealed fight details clearly marked." },
  "chamber-of-arms": { title: "Chamber of Arms — Final Fantasy Resonance", description: "What is confirmed about the Chamber of Arms, its sealed foes, weapons and future rewards." },
  colosseum: { title: "Colosseum — Final Fantasy Resonance", description: "Confirmed information about the Colosseum's monsters, rewards and post-launch guide coverage." },
};
