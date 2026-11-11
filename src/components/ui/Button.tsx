import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/motion/Magnetic";
import { ArrowUpRight } from "./Icons";

type Variant = "primary" | "ghost" | "light";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-ink hover:bg-bone",
  ghost: "border border-line text-bone hover:border-bone hover:bg-bone hover:text-ink",
  light: "bg-bone text-ink hover:bg-accent",
};

export const buttonClass = (variant: Variant = "primary", className?: string) =>
  cn(
    "group relative inline-flex items-center gap-3 overflow-hidden rounded-full py-2 pl-5 pr-2 font-mono text-[0.72rem] font-medium uppercase tracking-[0.08em] transition-colors duration-500",
    variants[variant],
    className,
  );

/** Libellé qui « roule » au survol (le texte sort par le haut, revient par le bas) */
export function RollText({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}

export function ArrowBadge() {
  return (
    <span className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-ink/90 text-bone">
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-out-expo group-hover:-translate-y-6 group-hover:translate-x-6" />
      <ArrowUpRight className="absolute h-3.5 w-3.5 -translate-x-6 translate-y-6 transition-transform duration-500 ease-out-expo group-hover:translate-x-0 group-hover:translate-y-0" />
    </span>
  );
}

/** `className` s'applique au conteneur magnétique (marges, alignement), `linkClassName` au bouton */
export function ButtonLink({
  variant = "primary",
  className,
  wrapperClassName,
  linkClassName,
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; wrapperClassName?: string; linkClassName?: string }) {
  return (
    <Magnetic className={cn(className, wrapperClassName)}>
      <Link {...props} className={buttonClass(variant, linkClassName)}>
        <RollText>{children}</RollText>
        <ArrowBadge />
      </Link>
    </Magnetic>
  );
}
