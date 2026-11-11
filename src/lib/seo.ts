import type { Metadata } from "next";
import { site } from "@/content/site";

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description?: string;
  path: string;
}): Metadata {
  const desc = description ?? site.description;
  return {
    title,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} — ${site.name}`,
      description: desc,
      url: path,
      siteName: site.name,
      locale: site.locale,
      type: "website",
      images: [{ url: "/brand/og.jpg", width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${site.name}`,
      description: desc,
      images: ["/brand/og.jpg"],
    },
  };
}
