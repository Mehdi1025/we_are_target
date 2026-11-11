"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "@/components/ui/Icons";

const tabs = [
  { id: "projet", label: "Envoyer un message" },
  { id: "rdv", label: "Prendre rendez-vous" },
  { id: "candidature", label: "Rejoindre l’équipe" },
] as const;
type Tab = (typeof tabs)[number]["id"];

const servicesOptions = [
  "Branding & identité visuelle",
  "Création de site web",
  "Stratégie digitale & réseaux sociaux",
  "Acquisition & publicité",
  "Outils, CRM & automatisation",
  "Abonnement social media",
  "Autre",
];

const budgets = ["Moins de 2 000 €", "2 000 € – 5 000 €", "5 000 € – 10 000 €", "10 000 € – 25 000 €", "Plus de 25 000 €"];

type Status = "idle" | "sending" | "sent" | "error";

/**
 * v1 : formulaire UI uniquement.
 * [À COMPLÉTER] — brancher l’envoi (Route Handler + Resend, Formspree, n8n webhook…)
 * dans `submit()` ci-dessous.
 */
async function submit(data: Record<string, FormDataEntryValue>) {
  await new Promise((r) => setTimeout(r, 700));
  if (process.env.NODE_ENV === "development") console.info("[contact] payload", data);
  return { ok: true };
}

export function ContactForm() {
  const [tab, setTab] = useState<Tab>("projet");
  const [status, setStatus] = useState<Status>("idle");
  const [preset, setPreset] = useState<{ service?: string; message?: string }>({});

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const offre = q.get("offre");
    const sujet = q.get("sujet");
    if (sujet === "candidature") setTab("candidature");
    if (offre) {
      setPreset({
        service: "Abonnement social media",
        message: `Bonjour, je suis intéressé(e) par l’offre ${offre.charAt(0).toUpperCase() + offre.slice(1)}.`,
      });
    }
    const poste = q.get("poste");
    if (poste) setPreset({ message: `Candidature — ${poste.replace(/-/g, " ")}\n\n` });
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    setStatus("sending");
    try {
      const res = await submit({ type: tab, ...Object.fromEntries(new FormData(form)) });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-2xl border border-accent bg-accent/[0.06] p-8 md:p-12">
        <p className="label text-accent">Message reçu</p>
        <p className="display-md mt-6">Merci. Nous revenons vers vous sous 24 h.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="label mt-8 underline decoration-accent underline-offset-4 hover:text-bone"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <div>
      <div role="tablist" aria-label="Type de demande" className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "rounded-full border px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.08em] transition-colors",
              tab === t.id ? "border-bone bg-bone text-ink" : "hairline text-mute hover:text-bone",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="mt-10 grid gap-x-8 gap-y-6 md:grid-cols-2" noValidate={false}>
        {tab === "projet" && (
          <>
            <label className="md:col-span-1">
              <span className="label">Quel service recherchez-vous ?</span>
              <select name="service" className="field" defaultValue={preset.service ?? ""} key={preset.service}>
                <option value="" disabled>
                  Choisir…
                </option>
                {servicesOptions.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label>
              <span className="label">Budget estimé</span>
              <select name="budget" className="field" defaultValue="">
                <option value="" disabled>
                  Choisir…
                </option>
                {budgets.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </label>
          </>
        )}

        {tab === "rdv" && (
          <>
            <label>
              <span className="label">Date souhaitée</span>
              <input type="date" name="date" className="field" />
            </label>
            <label>
              <span className="label">Créneau</span>
              <select name="creneau" className="field" defaultValue="">
                <option value="" disabled>
                  Choisir…
                </option>
                <option>Matin (9 h – 12 h)</option>
                <option>Après-midi (14 h – 18 h)</option>
              </select>
            </label>
          </>
        )}

        <label>
          <span className="label">Votre nom *</span>
          <input name="name" required autoComplete="name" className="field" placeholder="Prénom Nom" />
        </label>
        <label>
          <span className="label">{tab === "candidature" ? "Poste visé" : "Entreprise"}</span>
          <input
            name={tab === "candidature" ? "poste" : "company"}
            autoComplete="organization"
            className="field"
            placeholder={tab === "candidature" ? "Ex. Alternance marketing" : "Nom de l’entreprise"}
          />
        </label>
        <label>
          <span className="label">Email *</span>
          <input name="email" type="email" required autoComplete="email" className="field" placeholder="vous@entreprise.fr" />
        </label>
        <label>
          <span className="label">Téléphone</span>
          <input name="phone" type="tel" autoComplete="tel" className="field" placeholder="06 00 00 00 00" />
        </label>

        {tab === "candidature" && (
          <label className="md:col-span-2">
            <span className="label">Lien portfolio / LinkedIn</span>
            <input name="portfolio" type="url" className="field" placeholder="https://" />
          </label>
        )}

        <label className="md:col-span-2">
          <span className="label">
            {tab === "candidature" ? "Parlez-nous de vous *" : "Parlez-nous de votre projet *"}
          </span>
          <textarea
            name="message"
            required
            rows={5}
            key={preset.message}
            defaultValue={preset.message}
            className="field resize-y"
            placeholder="Contexte, objectifs, délais…"
          />
        </label>

        <label className="flex items-start gap-3 text-sm text-mute md:col-span-2">
          <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-[#ff3a24]" />
          <span>
            J’accepte que mes données soient utilisées pour répondre à ma demande, conformément à la{" "}
            <Link href="/policy" className="text-bone underline decoration-accent underline-offset-4">
              politique de confidentialité
            </Link>
            . *
          </span>
        </label>

        <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
          <button
            type="submit"
            disabled={status === "sending"}
            className="group inline-flex items-center gap-3 self-start rounded-full bg-accent py-2 pl-6 pr-2 font-mono text-[0.75rem] font-medium uppercase tracking-[0.08em] text-ink transition-colors hover:bg-bone disabled:opacity-60"
          >
            {status === "sending" ? "Envoi…" : "Envoyer ma demande"}
            <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-bone">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </button>
          {status === "error" && (
            <p role="alert" className="text-sm text-accent">
              Une erreur est survenue. Écrivez-nous directement à {site.contact.email}.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
