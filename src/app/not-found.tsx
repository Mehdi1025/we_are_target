import { ButtonLink } from "@/components/ui/Button";
import { Index } from "@/components/ui/Section";
import { SplitReveal } from "@/components/motion/SplitReveal";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[80dvh] flex-col justify-center pt-28">
      <Index n="404">Page introuvable</Index>
      <SplitReveal as="h1" by="char" className="display-xxl mt-8" text="Hors cible" accent />
      <p className="mt-8 max-w-md text-lg text-mute">
        Cette page n’existe pas ou a été déplacée. Revenons à l’essentiel.
      </p>
      <ButtonLink href="/" className="mt-10 self-start">
        Retour à l’accueil
      </ButtonLink>
    </section>
  );
}
