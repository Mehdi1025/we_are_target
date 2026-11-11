import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "@fontsource-variable/inter";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource-variable/jetbrains-mono";
import "lenis/dist/lenis.css";
import "./globals.css";
import { site } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/motion/Providers";

/** Police d'affichage maison DripMyCard (titres de l'étude de cas, minuscules uniquement) */
const dmcDisplay = localFont({
  src: "../fonts/dmc-display.woff2",
  variable: "--font-dmc-display",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: [{ url: "/brand/og.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image", images: ["/brand/og.jpg"] },
  icons: { icon: "/brand/logo-mark.svg" },
};

export const viewport: Viewport = {
  themeColor: "#171717",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={dmcDisplay.variable} suppressHydrationWarning>
      <head>
        {/* Préloader : une seule fois par session (évite le flash au rechargement) */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("ta-intro-seen")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.intro="seen"}catch(e){}`,
          }}
        />
      </head>
      <body className="grain min-h-dvh">
        <a
          href="#contenu"
          className="sr-only z-[70] rounded-full bg-accent px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Aller au contenu
        </a>
        <Providers>
          <Header />
          <main id="contenu">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
