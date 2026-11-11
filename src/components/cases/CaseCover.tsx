import type { CaseStudy } from "@/content/cases";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Visuel typographique de remplacement.
 * [À COMPLÉTER] — remplacer par <Image src="/cases/{slug}.jpg" … /> quand les visuels sont prêts.
 */
export function CaseCover({
  item,
  className,
  large,
  inset,
}: {
  item: CaseStudy;
  className?: string;
  large?: boolean;
  /** Marge intérieure accrue quand le visuel est en parallax (bords rognés) */
  inset?: boolean;
}) {
  if (item.image) {
    return (
      <div className={cn("relative isolate overflow-hidden rounded-2xl bg-ink-2", className)}>
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes={large ? "95vw" : "(max-width: 768px) 92vw, 46vw"}
          className="object-cover"
        />
      </div>
    );
  }

  const initials = item.client
    .replace(/[^A-Za-zÀ-ÿ ]/g, " ")
    .split(" ")
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-2xl",
        item.cover === "accent" && "bg-accent text-ink",
        item.cover === "outline" && "border hairline bg-ink-2 text-bone",
        item.cover === "grid" && "bg-bone text-ink",
        className,
      )}
    >
      {item.cover === "grid" && (
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
      )}
      {item.cover === "outline" && (
        <div aria-hidden className="absolute -bottom-1/3 -right-1/4 -z-10 h-[90%] w-[70%] rounded-full bg-accent/25 blur-3xl" />
      )}
      <div className={cn("flex h-full flex-col justify-between", inset ? "px-6 py-[14%] md:px-8" : "p-6 md:p-8")}>
        <div className="flex items-start justify-between font-mono text-[0.68rem] uppercase tracking-[0.08em] opacity-70">
          <span>{item.sector.startsWith("[") ? item.services[0] : item.sector}</span>
          <span>{item.year}</span>
        </div>
        <p
          aria-hidden
          className={cn(
            "font-display font-bold leading-[0.8] tracking-[-0.07em]",
            large ? "text-[clamp(6rem,20vw,18rem)]" : "text-[clamp(4.5rem,11vw,9rem)]",
          )}
        >
          {initials}
          <span className={item.cover === "accent" ? "text-bone" : "text-accent"}>.</span>
        </p>
      </div>
    </div>
  );
}
