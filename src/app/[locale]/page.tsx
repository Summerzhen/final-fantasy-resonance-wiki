import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StandardPage } from "@/components/ffr-pages";
import { absoluteSiteUrl, defaultOgImage, routeMeta, siteName } from "@/lib/ffr-data";

export function generateStaticParams() {
  return Object.keys(routeMeta).map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = routeMeta[locale];
  if (!meta) return {};

  const canonical = absoluteSiteUrl(`/${locale}`);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      siteName,
      title: meta.title,
      description: meta.description,
      url: canonical,
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [defaultOgImage],
    },
  };
}

export default async function RoutePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routeMeta[locale]) notFound();
  return <StandardPage route={locale} />;
}
