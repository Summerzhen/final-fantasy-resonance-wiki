export const NAVIGATION = [
  { label: "Game", href: "/game" },
  { label: "Characters", href: "/characters" },
  { label: "Visions", href: "/visions" },
  { label: "Combat", href: "/combat" },
  { label: "Espers", href: "/espers" },
] as const;

// Compatibility export for the template's retained legal pages.
export const NAVIGATION_CONFIG = NAVIGATION.map((item) => ({ key: item.label.toLowerCase(), path: item.href, isContentType: false }));

export const INDEXABLE_ROUTES = [
  "/", "/game", "/release-date-platforms", "/editions-pre-order", "/demo",
  "/pc-system-requirements", "/characters", "/characters/rain", "/characters/lasswell",
  "/characters/fina", "/visions", "/visions/warrior-of-light", "/visions/cloud",
  "/visions/terra", "/visions/yshtola", "/combat", "/stagger-system",
  "/resonance-attacks", "/espers", "/brave-exvius-comparison",
] as const;

export const CONTENT_TYPES: string[] = [];
