import Image from "next/image";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/** Fichier maître fourni par la charte (fond transparent — fond sombre du site). */
export const LOGO = {
  src: "/brand/logo-target-agency.png",
  width: 821,
  height: 316,
  alt: `${site.name} — Target agency`,
} as const;

export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src={LOGO.src}
      alt=""
      width={LOGO.width}
      height={LOGO.height}
      aria-hidden
      className={cn("h-5 w-auto", className)}
    />
  );
}

export function Logo({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src={LOGO.src}
      alt={LOGO.alt}
      width={LOGO.width}
      height={LOGO.height}
      priority={priority}
      className={cn("h-8 w-auto md:h-9", className)}
    />
  );
}
