import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = "https://final-fantasy-resonance.wiki";
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/search", "/compare"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
