export const NAVIGATION = [
  { label: "Game", href: "/game" },
  { label: "Characters", href: "/characters" },
  { label: "Visions", href: "/visions" },
  { label: "Map", href: "/locations" },
  { label: "Combat", href: "/combat" },
  { label: "Espers", href: "/espers" },
  { label: "Endgame", href: "/endgame" },
  { label: "Release", href: "/release-date-platforms" },
  { label: "Beginner", href: "/beginner-guide" },
] as const;

// Compatibility export for the template's retained legal pages.
export const NAVIGATION_CONFIG = NAVIGATION.map((item) => ({ key: item.label.toLowerCase(), path: item.href, isContentType: false }));

export const INDEXABLE_ROUTES = [
  "/", "/game", "/release-date-platforms", "/editions-pre-order", "/demo",
  "/preorder", "/switch-vs-switch-2", "/how-to-get-visions", "/locations", "/locations/sanctums-of-light",
  "/endgame", "/bosses/gilgamesh", "/bosses/ultima-weapon", "/chamber-of-arms", "/colosseum",
  "/pc-system-requirements", "/characters", "/characters/rain", "/characters/lasswell",
  "/characters/fina", "/visions", "/visions/warrior-of-light", "/visions/cloud",
  "/visions/terra", "/visions/yshtola", "/combat", "/stagger-system",
  "/resonance-attacks", "/espers", "/beginner-guide", "/brave-exvius-comparison",
] as const;

export const CONTENT_TYPES: string[] = [];
