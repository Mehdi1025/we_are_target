import Link from "next/link";
import { formatDate, posts } from "@/content/posts";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ArrowUpRight } from "@/components/ui/Icons";

export const metadata = pageMetadata({
  title: "Articles",
  description: "Conseils branding, stratégie digitale, réseaux sociaux et acquisition, par Target Agency.",
  path: "/blog",
});

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHero
        n="11"
        label="Analyses & ressources"
        title="Articles récents"
        intro="Conseils branding, stratégie digitale, réseaux sociaux — et les retours d’expérience de nos projets clients."
      />
      <section className="shell pb-24">
        <Stagger as="ul" stagger={0.1} className="border-b hairline">
          {sorted.map((p) => (
            <StaggerItem as="li" key={p.slug} className="border-t hairline">
                <Link
                  href={`/blog/${p.slug}`}
                  data-cursor="view"
                  data-cursor-label="Lire"
                  className="group grid gap-4 py-10 md:grid-cols-[10rem_1fr_auto] md:items-center md:gap-10"
                >
                  <div className="label space-y-2">
                    <p className="text-accent">{p.category}</p>
                    <p>{formatDate(p.date)}</p>
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold leading-tight tracking-[-0.03em] transition-colors group-hover:text-accent md:text-4xl">
                      {p.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-mute">{p.excerpt}</p>
                  </div>
                  <span className="flex items-center gap-4">
                    <span className="label">{p.readingTime}</span>
                    <span className="grid h-12 w-12 place-items-center rounded-full border hairline transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
                      <ArrowUpRight />
                    </span>
                  </span>
                </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </>
  );
}
