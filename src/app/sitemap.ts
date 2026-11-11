import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { cases } from "@/content/cases";
import { posts } from "@/content/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/cases", "/blog", "/about-us", "/career", "/contacts", "/legal", "/policy", "/terms"];
  return [
    ...staticRoutes.map((r) => ({
      url: `${site.url}${r}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: r === "" ? 1 : ["/legal", "/policy", "/terms"].includes(r) ? 0.2 : 0.8,
    })),
    ...cases.map((c) => ({ url: `${site.url}/cases/${c.slug}`, lastModified: now, priority: 0.6 })),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: new Date(p.date), priority: 0.6 })),
  ];
}
