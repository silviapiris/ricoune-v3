"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/react";
import { ChevronDown, Check } from "lucide-react";

const EVENT_TYPES = [
  "Fête votive / Feria",
  "Festival",
  "Soirée privée",
  "Événement d'entreprise",
  "Autre",
] as const;

const FORMULE_OPTIONS = [
  "Formule complète",
  "Apéro concert / Show case",
  "Je ne sais pas encore",
] as const;

const INPUT_CLASSES =
  "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 outline-none transition-colors focus:border-rc-yellow focus:outline-none";


export default function DemandeDevisPage(): React.JSX.Element {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    typeEvenement: "",
    date: "",
    lieu: "",
    formule: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ): void {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleEventTypeChange(value: string): void {
    setFormData((prev) => ({ ...prev, typeEvenement: value }));
  }

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    setLoading(true);
    setError(false);

    if (!formData.typeEvenement) {
      setError(true);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          telephone: formData.telephone,
          type_evenement: formData.typeEvenement,
          date_souhaitee: formData.date || null,
          lieu: formData.lieu,
          formule: formData.formule,
          message: formData.message,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSuccess(true);
      setFormData({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        typeEvenement: "",
        date: "",
        lieu: "",
        formule: "",
        message: "",
      });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Titre */}
      <h1 className="mb-10 text-center text-4xl font-bold font-[family-name:var(--font-oswald)] text-white">
        Demander un devis
      </h1>

      {/* Messages feedback */}
      {success && (
        <div className="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-center text-sm text-green-400">
          Votre demande a été envoyée avec succès ! Nous vous recontacterons
          rapidement.
          <div className="mt-4 flex gap-4 justify-center">
            <Link href="/" className="rc-btn-outline text-sm">Retour à l&apos;accueil</Link>
            <Link href="/concerts" className="rc-btn-outline text-sm">Voir les concerts</Link>
          </div>
        </div>
      )}
      {error && (
        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center text-sm text-red-400">
          Une erreur est survenue. Veuillez réessayer.
        </div>
      )}

      {/* Formulaire */}
      <div className="rc-card p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Ligne 1 : Nom / Prénom */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="nom"
                className="mb-1 block text-sm font-medium text-white/80"
              >
                Nom <span className="text-red-500">*</span>
              </label>
              <input
                id="nom"
                type="text"
                name="nom"
                required
                value={formData.nom}
                onChange={handleChange}
                className={INPUT_CLASSES}
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label
                htmlFor="prenom"
                className="mb-1 block text-sm font-medium text-white/80"
              >
                Prénom <span className="text-red-500">*</span>
              </label>
              <input
                id="prenom"
                type="text"
                name="prenom"
                required
                value={formData.prenom}
                onChange={handleChange}
                className={INPUT_CLASSES}
                placeholder="Votre prénom"
              />
            </div>
          </div>

          {/* Ligne 2 : Email / Téléphone */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-white/80"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={INPUT_CLASSES}
                placeholder="votre@email.com"
              />
            </div>
            <div>
              <label
                htmlFor="telephone"
                className="mb-1 block text-sm font-medium text-white/80"
              >
                Téléphone
              </label>
              <input
                id="telephone"
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className={INPUT_CLASSES}
                placeholder="06 XX XX XX XX"
              />
            </div>
          </div>

          {/* Ligne 3 : Type d'événement */}
          <div>
            <label
              id="typeEvenement-label"
              className="mb-1 block text-sm font-medium text-white/80"
            >
              Type d&apos;événement <span className="text-red-500">*</span>
            </label>
            <Listbox value={formData.typeEvenement} onChange={handleEventTypeChange}>
              <div className="relative">
                <ListboxButton
                  aria-labelledby="typeEvenement-label"
                  className="group w-full flex items-center justify-between rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none transition-colors hover:border-white/40 focus:border-rc-yellow data-[open]:border-rc-yellow"
                >
                  <span className={formData.typeEvenement ? "text-white" : "text-white/40"}>
                    {formData.typeEvenement || "-- Sélectionnez --"}
                  </span>
                  <ChevronDown
                    className="h-4 w-4 text-white/60 transition-transform duration-200 group-data-[open]:rotate-180"
                    aria-hidden="true"
                  />
                </ListboxButton>

                <ListboxOptions
                  className="absolute z-50 mt-1 w-full overflow-hidden rounded-xl border border-white/10 bg-[#1e2433] shadow-2xl shadow-black/60 outline-none"
                  transition
                >
                  <div className="origin-top transition duration-150 ease-out data-[closed]:scale-y-95 data-[closed]:opacity-0 py-1">
                    {EVENT_TYPES.map((type) => (
                      <ListboxOption
                        key={type}
                        value={type}
                        className="group flex cursor-pointer items-center gap-3 px-4 py-3 text-white/80 transition-colors hover:bg-white/10 hover:text-white data-[selected]:bg-rc-yellow/10 data-[selected]:text-rc-yellow"
                      >
                        <Check
                          className="h-4 w-4 flex-shrink-0 text-rc-yellow opacity-0 group-data-[selected]:opacity-100 transition-opacity"
                          aria-hidden="true"
                        />
                        <span className="text-sm">{type}</span>
                      </ListboxOption>
                    ))}
                  </div>
                </ListboxOptions>
              </div>
            </Listbox>
          </div>

          {/* Ligne 4 : Date / Lieu */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="date"
                className="mb-1 block text-sm font-medium text-white/80"
              >
                Date souhaitée
              </label>
              <input
                id="date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={INPUT_CLASSES}
              />
            </div>
            <div>
              <label
                htmlFor="lieu"
                className="mb-1 block text-sm font-medium text-white/80"
              >
                Lieu / Ville
              </label>
              <input
                id="lieu"
                type="text"
                name="lieu"
                value={formData.lieu}
                onChange={handleChange}
                className={INPUT_CLASSES}
                placeholder="Ville ou lieu"
              />
            </div>
          </div>

          {/* Ligne 5 : Formule souhaitée (radio) */}
          <fieldset>
            <legend className="mb-2 block text-sm font-medium text-white/80">
              Formule souhaitée <span className="text-red-500">*</span>
            </legend>
            <div className="space-y-2">
              {FORMULE_OPTIONS.map((option) => (
                <label
                  key={option}
                  htmlFor={`formule-${option}`}
                  className="flex cursor-pointer items-center gap-3"
                >
                  <input
                    id={`formule-${option}`}
                    type="radio"
                    name="formule"
                    value={option}
                    required
                    checked={formData.formule === option}
                    onChange={handleChange}
                    className="h-4 w-4 accent-rc-yellow"
                  />
                  <span className="text-sm text-white/80">{option}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Ligne 6 : Message */}
          <div>
            <label
              htmlFor="message"
              className="mb-1 block text-sm font-medium text-white/80"
            >
              Message / Précisions <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleChange}
              className={INPUT_CLASSES}
              placeholder="Décrivez votre événement, vos besoins..."
            />
          </div>

          {/* RGPD */}
          <p className="text-sm text-white/50">
            Les informations envoyées via ce site sont utilisées uniquement pour
            répondre à votre demande.
          </p>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="rc-btn-red w-full disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              "Envoyer la demande"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
