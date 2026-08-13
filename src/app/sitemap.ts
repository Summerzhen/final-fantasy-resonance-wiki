import type { MetadataRoute } from "next";
import { INDEXABLE_ROUTES } from "@/config/navigation";
import { characters, visions } from "@/lib/ffr-data";

export const dynamic = "force-static";
const siteUrl = "https://final-fantasy-resonance.wiki";

export default function sitemap(): MetadataRoute.Sitemap {
  const entityRoutes = [
    ...characters.map(c => `/characters/${c.slug}`),
    ...visions.filter(v => v.status !== "Unknown").map(v => `/visions/${v.slug}`),
  ];
  return [...new Set([...INDEXABLE_ROUTES, ...entityRoutes])].map(path => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date("2026-08-13"),
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : path.split("/").length === 2 ? 0.85 : 0.7,
  }));
}
