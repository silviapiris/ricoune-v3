"use client";

import { useState, FormEvent, useCallback } from "react";
import Link from "next/link";
import { Loader2, CheckCircle, XCircle, Send } from "lucide-react";
import { contactSchema } from "@/lib/validations/contact";
import type { ContactFormData } from "@/lib/validations/contact";

const INPUT_CLASS =
  "w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-rc-yellow focus:outline-none transition-colors";

const EVENT_TYPES = [
  "Mariage",
  "Fête votive / Feria",
  "Festival",
  "Soirée privée",
  "Événement d'entreprise",
  "Autre",
] as const;

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({
  className = "",
}: ContactFormProps): React.ReactElement {
  const [formData, setFormData] = useState<ContactFormData>({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    type_evenement: "",
    date_souhaitee: "",
    ville: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = useCallback(
    (field: keyof ContactFormData, value: string): void => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: FormEvent): Promise<void> => {
      e.preventDefault();
      setErrors({});
      setStatus("idle");

      const result = contactSchema.safeParse(formData);
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        for (const issue of result.error.issues) {
          const key = issue.path[0];
          if (typeof key === "string") {
            fieldErrors[key] = issue.message;
          }
        }
        setErrors(fieldErrors);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result.data),
        });
        if (!res.ok) throw new Error("Failed");
        setStatus("success");
        setFormData({
          nom: "",
          prenom: "",
          email: "",
          telephone: "",
          type_evenement: "",
          date_souhaitee: "",
          ville: "",
          message: "",
        });
      } catch {
        setStatus("error");
      } finally {
        setLoading(false);
      }
    },
    [formData],
  );

  return (
    <div className={`rc-card p-6 md:p-8 ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Ligne 1 : Nom + Prénom */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="nom" className="mb-1.5 block text-sm text-white/80">
              Nom <span className="text-red-400">*</span>
            </label>
            <input
              id="nom"
              type="text"
              required
              value={formData.nom}
              onChange={(e) => updateField("nom", e.target.value)}
              className={INPUT_CLASS}
              placeholder="Votre nom"
            />
            {errors.nom && (
              <p className="mt-1 text-xs text-red-400">{errors.nom}</p>
            )}
          </div>
          <div>
            <label htmlFor="prenom" className="mb-1.5 block text-sm text-white/80">
              Prénom <span className="text-red-400">*</span>
            </label>
            <input
              id="prenom"
              type="text"
              required
              value={formData.prenom}
              onChange={(e) => updateField("prenom", e.target.value)}
              className={INPUT_CLASS}
              placeholder="Votre prénom"
            />
            {errors.prenom && (
              <p className="mt-1 text-xs text-red-400">{errors.prenom}</p>
            )}
          </div>
        </div>

        {/* Ligne 2 : Email + Téléphone */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm text-white/80">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={INPUT_CLASS}
              placeholder="votre@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">{errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="telephone" className="mb-1.5 block text-sm text-white/80">
              Téléphone
            </label>
            <input
              id="telephone"
              type="tel"
              value={formData.telephone}
              onChange={(e) => updateField("telephone", e.target.value)}
              className={INPUT_CLASS}
              placeholder="06 00 00 00 00"
            />
          </div>
        </div>

        {/* Ligne 3 : Type événement */}
        <div>
          <label
            htmlFor="type_evenement"
            className="mb-1.5 block text-sm text-white/80"
          >
            Type d&apos;événement
          </label>
          <select
            id="type_evenement"
            value={formData.type_evenement}
            onChange={(e) => updateField("type_evenement", e.target.value)}
            className={INPUT_CLASS}
          >
            <option value="">-- Optionnel --</option>
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Ligne 4 : Date + Ville */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="date_souhaitee"
              className="mb-1.5 block text-sm text-white/80"
            >
              Date souhaitée
            </label>
            <input
              id="date_souhaitee"
              type="date"
              value={formData.date_souhaitee}
              onChange={(e) => updateField("date_souhaitee", e.target.value)}
              className={INPUT_CLASS}
            />
          </div>
          <div>
            <label htmlFor="ville" className="mb-1.5 block text-sm text-white/80">
              Ville / Lieu
            </label>
            <input
              id="ville"
              type="text"
              value={formData.ville}
              onChange={(e) => updateField("ville", e.target.value)}
              className={INPUT_CLASS}
              placeholder="Montpellier, Nimes..."
            />
          </div>
        </div>

        {/* Ligne 5 : Message */}
        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm text-white/80">
            Message <span className="text-red-400">*</span>
          </label>
          <textarea
            id="message"
            required
            rows={5}
            value={formData.message}
            onChange={(e) => updateField("message", e.target.value)}
            className={`${INPUT_CLASS} resize-none`}
            placeholder="Décrivez votre projet ou posez vos questions..."
          />
          {errors.message && (
            <p className="mt-1 text-xs text-red-400">{errors.message}</p>
          )}
        </div>

        {/* RGPD */}
        <p className="text-xs text-white/50">
          Les informations envoyées via ce site sont utilisées uniquement pour
          répondre à votre demande.
        </p>

        {/* Submit */}
        <button type="submit" disabled={loading} className="rc-btn w-full">
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Envoi en cours...
            </>
          ) : (
            <>
              <Send size={20} />
              ENVOYER LA DEMANDE
            </>
          )}
        </button>

        {/* Status messages */}
        {status === "success" && (
          <div className="rounded-xl bg-green-900/30 p-4 text-green-400">
            <div className="flex items-center gap-2">
              <CheckCircle size={20} />
              <span>
                Message envoyé avec succès ! Nous vous répondrons rapidement.
              </span>
            </div>
            <div className="mt-4 flex gap-4 justify-center">
              <Link href="/" className="rc-btn-outline text-sm">Retour a l&apos;accueil</Link>
              <Link href="/concerts" className="rc-btn-outline text-sm">Voir les concerts</Link>
            </div>
          </div>
        )}
        {status === "error" && (
          <div className="flex items-center gap-2 rounded-xl bg-red-900/30 p-4 text-red-400">
            <XCircle size={20} />
            <span>Une erreur est survenue. Veuillez réessayer.</span>
          </div>
        )}
      </form>
    </div>
  );
}
