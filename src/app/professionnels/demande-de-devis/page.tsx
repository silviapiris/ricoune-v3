"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

const EVENT_TYPES = [
  "Mariage",
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
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): void {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    setLoading(true);
    setError(false);

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
              htmlFor="typeEvenement"
              className="mb-1 block text-sm font-medium text-white/80"
            >
              Type d&apos;événement <span className="text-red-500">*</span>
            </label>
            <select
              id="typeEvenement"
              name="typeEvenement"
              required
              value={formData.typeEvenement}
              onChange={handleChange}
              className={INPUT_CLASSES}
            >
              <option value="" disabled>
                -- Sélectionnez --
              </option>
              {EVENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
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
