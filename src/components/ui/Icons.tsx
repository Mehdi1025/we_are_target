import type { SocialIcon } from "@/content/site";

type P = { className?: string };

export function ArrowUpRight({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className ?? "h-4 w-4"}>
      <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
    </svg>
  );
}

export function ArrowRight({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className ?? "h-4 w-4"}>
      <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
    </svg>
  );
}

export function Plus({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className ?? "h-4 w-4"}>
      <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function Play({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className ?? "h-4 w-4"}>
      <path d="M7 4.5v15l13-7.5z" fill="currentColor" />
    </svg>
  );
}

const socialPaths: Record<SocialIcon, string> = {
  facebook:
    "M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3z",
  instagram:
    "M12 7.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm4.8-8.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2zM21 7.3c-.1-1.5-.4-2.8-1.5-3.8C18.5 2.4 17.2 2.1 15.7 2c-1.5-.1-6-.1-7.4 0-1.5.1-2.8.4-3.8 1.5C3.4 4.5 3.1 5.8 3 7.3c-.1 1.5-.1 6 0 7.4.1 1.5.4 2.8 1.5 3.8 1 1 2.3 1.4 3.8 1.5 1.5.1 6 .1 7.4 0 1.5-.1 2.8-.4 3.8-1.5 1-1 1.4-2.3 1.5-3.8.1-1.4.1-5.9 0-7.4zm-2 9.1a3 3 0 0 1-1.7 1.7c-1.2.5-4 .4-5.3.4s-4.1.1-5.3-.4a3 3 0 0 1-1.7-1.7c-.5-1.2-.4-4-.4-5.3s-.1-4.1.4-5.3a3 3 0 0 1 1.7-1.7c1.2-.5 4-.4 5.3-.4s4.1-.1 5.3.4a3 3 0 0 1 1.7 1.7c.5 1.2.4 4 .4 5.3s.1 4.1-.4 5.3z",
  x: "M17.8 3h3l-6.6 7.6L22 21h-6.1l-4.8-6.3L5.6 21h-3l7.1-8.1L2.2 3h6.2l4.3 5.7L17.8 3zm-1 16.2h1.7L7.3 4.7H5.5l11.3 14.5z",
  linkedin:
    "M6.9 21H3.3V9h3.6v12zM5.1 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM21 21h-3.6v-5.8c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H9.5V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.7 0 4.4 2.4 4.4 5.5V21z",
  youtube:
    "M22.5 7.2a2.8 2.8 0 0 0-2-2C18.8 4.8 12 4.8 12 4.8s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2C1.1 8.9 1.1 12 1.1 12s0 3.1.4 4.8a2.8 2.8 0 0 0 2 2c1.7.4 8.5.4 8.5.4s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2c.4-1.7.4-4.8.4-4.8s0-3.1-.4-4.8zM9.8 15.1V8.9l5.7 3.1-5.7 3.1z",
};

export function Social({ icon, className }: P & { icon: SocialIcon }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className ?? "h-4 w-4"}>
      <path d={socialPaths[icon]} fill="currentColor" />
    </svg>
  );
}
