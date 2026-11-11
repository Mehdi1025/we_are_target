import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getPost, posts, type Block } from "@/content/posts";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { ArrowRight } from "@/components/ui/Icons";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/ui/Reveal";
import { fadeUpBlur } from "@/lib/motion";
import { ContactCta } from "@/components/home/Sections";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}` });
}

function render(block: Block, i: number) {
  switch (block.type) {
    case "h2":
      return <h2 key={i}>{block.text}</h2>;
    case "ul":
      return (
        <ul key={i}>
          {block.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote
          key={i}
          className="my-12 border-l-2 border-accent pl-6 font-display text-2xl font-semibold leading-snug tracking-[-0.03em] text-bone md:text-3xl"
        >
          {block.text}
        </blockquote>
      );
    default:
      return <p key={i}>{block.text}</p>;
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    inLanguage: "fr-FR",
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article>
        <header className="shell pb-16 pt-36 md:pt-48">
          <Link href="/blog" className="label inline-flex items-center gap-2 hover:text-bone">
            <ArrowRight className="h-3 w-3 rotate-180" /> Tous les articles
          </Link>
          <p className="label mt-10 flex flex-wrap gap-4">
            <span className="text-accent">{post.category}</span>
            <span>{formatDate(post.date)}</span>
            <span>{post.readingTime} de lecture</span>
          </p>
          <SplitReveal as="h1" className="display-lg mt-6 max-w-[20ch]" text={post.title} stagger={0.04} />
          <Reveal variants={fadeUpBlur} delay={0.4}>
            <p className="mt-8 max-w-2xl text-xl text-mute">{post.excerpt}</p>
          </Reveal>
        </header>
        <div className="shell">
          <div className="prose-target mx-auto max-w-[68ch] border-t hairline pt-12">
            {post.body.map(render)}
          </div>
        </div>
      </article>

      <section className="shell mt-24">
        <p className="label mb-6">À lire aussi</p>
        <div className="grid gap-6 md:grid-cols-2">
          {others.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group rounded-2xl border hairline p-7 transition-colors hover:border-accent"
            >
              <p className="label text-accent">{p.category}</p>
              <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.03em]">{p.title}</h2>
              <p className="label mt-6">{formatDate(p.date)}</p>
            </Link>
          ))}
        </div>
      </section>

      <ContactCta />
    </>
  );
}
