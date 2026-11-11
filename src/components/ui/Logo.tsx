import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden className={cn("h-8 w-8", className)}>
      <circle cx="18" cy="22" r="15" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="18" cy="22" r="8.5" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="18" cy="22" r="2.6" fill="#ff3a24" />
      <path d="M18 22 L35 5" stroke="#ff3a24" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M28.5 5 H35 V11.5" stroke="#ff3a24" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-bone", className)}>
      <LogoMark />
      <span className="font-display text-[1.05rem] font-bold tracking-[-0.03em]">
        Target<span className="font-medium text-mute"> agency</span>
        <sup className="ml-0.5 text-[0.55em] text-accent">®</sup>
      </span>
    </span>
  );
}
