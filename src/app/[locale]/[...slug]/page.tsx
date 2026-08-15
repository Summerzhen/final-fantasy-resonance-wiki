import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CharacterPage, StandardPage, VisionPage } from "@/components/ffr-pages";
import { AdSlot, NativeContentAd, SidebarAds, StickyTopAd } from "@/components/adsterra-ads";
import {
  absoluteSiteUrl,
  characters,
  defaultOgImage,
  siteName,
  siteUrl,
  routeMeta,
  visions,
} from "@/lib/ffr-data";

const nestedRouteKeys: Record<string, string> = {
  "locations/sanctums-of-light": "sanctums-of-light",
  "bosses/gilgamesh": "gilgamesh",
  "bosses/ultima-weapon": "ultima-weapon",
  "guides/switch-vs-switch-2": "switch-vs-switch-2",
};

type EntitySeo = {
  name: string;
  title: string;
  description: string;
  path: string;
  sectionName: "Characters" | "Visions";
  sectionPath: "/characters" | "/visions";
  subjectDescription: string;
  image: string;
};

export function generateStaticParams() {
  return [
    ...characters.map((character) => ({ locale: "characters", slug: [character.slug] })),
    ...visions
      .filter((vision) => vision.status !== "Unknown")
      .map((vision) => ({ locale: "visions", slug: [vision.slug] })),
    ...Object.keys(nestedRouteKeys).map((path) => {
      const [locale, ...slug] = path.split("/");
      return { locale, slug };
    }),
  ];
}

function getEntitySeo(locale: string, slug: string): EntitySeo | undefined {
  if (locale === "characters") {
    const character = characters.find((entry) => entry.slug === slug);
    if (!character) return undefined;

    return {
      name: character.name,
      title: `${character.name} in Final Fantasy Resonance - Profile & Combat Info`,
      description: `${character.summary} Explore ${character.name}'s sourced Final Fantasy Resonance profile, affiliation, role details, and evidence status.`,
      path: `/characters/${character.slug}`,
      sectionName: "Characters",
      sectionPath: "/characters",
      subjectDescription: character.summary,
      image: character.image ?? defaultOgImage,
    };
  }

  if (locale === "visions") {
    const vision = visions.find((entry) => entry.slug === slug && entry.status !== "Unknown");
    if (!vision) return undefined;

    return {
      name: vision.name,
      title: `${vision.name} – Final Fantasy Resonance Vision, Abilities & Resonance`,
      description: `${vision.name} is a ${vision.status.toLowerCase()} Vision from ${vision.game} in Final Fantasy Resonance. View its current role, elements, known ability, and evidence status.`,
      path: `/visions/${vision.slug}`,
      sectionName: "Visions",
      sectionPath: "/visions",
      subjectDescription: `${vision.name} is an equippable Vision from ${vision.game}. Its current evidence status is ${vision.status}.`,
      image: defaultOgImage,
    };
  }

  return undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (slug.length !== 1) {
    const route = nestedRouteKeys[`${locale}/${slug.join("/")}`];
    const meta = route ? routeMeta[route] : undefined;
    if (!meta) return {};
    const canonical = absoluteSiteUrl(`/${locale}/${slug.join("/")}`);
    return { title: meta.title, description: meta.description, alternates: { canonical }, openGraph: { type: "article", siteName, title: meta.title, description: meta.description, url: canonical, images: [defaultOgImage] } };
  }

  const entity = getEntitySeo(locale, slug[0]);
  if (!entity) return {};

  const canonical = absoluteSiteUrl(entity.path);
  return {
    title: entity.title,
    description: entity.description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      siteName,
      title: entity.title,
      description: entity.description,
      url: canonical,
      images: [entity.image],
    },
    twitter: {
      card: "summary_large_image",
      title: entity.title,
      description: entity.description,
      images: [entity.image],
    },
  };
}

function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default async function EntityRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { locale, slug } = await params;
  if (slug.length !== 1) {
    const route = nestedRouteKeys[`${locale}/${slug.join("/")}`];
    if (!route) notFound();
    return <StandardPage route={route} />;
  }

  const entity = getEntitySeo(locale, slug[0]);
  if (!entity) notFound();

  const canonical = absoluteSiteUrl(entity.path);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entity.title,
    description: entity.description,
    inLanguage: "en",
    url: canonical,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
    },
    author: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
    about: {
      "@type": "Thing",
      name: entity.name,
      description: entity.subjectDescription,
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: entity.sectionName,
        item: absoluteSiteUrl(entity.sectionPath),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: entity.name,
        item: canonical,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <StickyTopAd />
        <NativeContentAd />
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_220px] lg:px-8">
        <div>
      {locale === "characters" ? (
        <CharacterPage slug={slug[0]} />
      ) : (
        <VisionPage slug={slug[0]} />
      )}
          <AdSlot name="banner-300x250" className="my-10" />
        </div>
        <aside className="space-y-6">
          <SidebarAds />
        </aside>
      </div>
    </>
  );
}
