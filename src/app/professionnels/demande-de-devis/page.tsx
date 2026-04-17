"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { SelectField } from "@/components/ui/SelectField";
import { useLanguage } from "@/contexts/LanguageContext";

const INPUT_CLASSES =
  "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 outline-none transition-colors focus:border-rc-yellow focus:outline-none";

export default function DemandeDevisPage(): React.JSX.Element {
  const { t } = useLanguage();
  const EVENT_TYPES = t.devis.eventTypes;
  const FORMULE_OPTIONS = t.devis.formuleOptions;

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        {t.devis.title}
      </h1>

      {/* Messages feedback */}
      {success && (
        <div className="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-center text-sm text-green-400">
          {t.devis.successMsg}
          <div className="mt-4 flex gap-4 justify-center">
            <Link href="/" className="rc-btn-outline text-sm">{t.devis.backHome}</Link>
            <Link href="/concerts" className="rc-btn-outline text-sm">{t.devis.viewConcerts}</Link>
          </div>
        </div>
      )}
      {error && (
        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center text-sm text-red-400">
          {t.devis.errorMsg}
        </div>
      )}

      {/* Formulaire */}
      <div className="rounded-2xl p-8 bg-[#1F2F4A]">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Ligne 1 : Nom / Prénom */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="nom" className="mb-1 block text-sm font-medium text-white/80">
                {t.devis.nom} <span className="text-red-500">*</span>
              </label>
              <input
                id="nom"
                type="text"
                name="nom"
                required
                value={formData.nom}
                onChange={handleChange}
                className={INPUT_CLASSES}
                placeholder={t.devis.nomPlaceholder}
              />
            </div>
            <div>
              <label htmlFor="prenom" className="mb-1 block text-sm font-medium text-white/80">
                {t.devis.prenom} <span className="text-red-500">*</span>
              </label>
              <input
                id="prenom"
                type="text"
                name="prenom"
                required
                value={formData.prenom}
                onChange={handleChange}
                className={INPUT_CLASSES}
                placeholder={t.devis.prenomPlaceholder}
              />
            </div>
          </div>

          {/* Ligne 2 : Email / Téléphone */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-white/80">
                {t.devis.email} <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={INPUT_CLASSES}
                placeholder={t.devis.emailPlaceholder}
              />
            </div>
            <div>
              <label htmlFor="telephone" className="mb-1 block text-sm font-medium text-white/80">
                {t.devis.telephone}
              </label>
              <input
                id="telephone"
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className={INPUT_CLASSES}
                placeholder={t.devis.telephonePlaceholder}
              />
            </div>
          </div>

          {/* Ligne 3 : Type d'événement */}
          <div>
            <label
              id="typeEvenement-label"
              className="mb-1 block text-sm font-medium text-white/80"
            >
              {t.devis.typeEvenement} <span className="text-red-500">*</span>
            </label>
            <SelectField
              value={formData.typeEvenement}
              onChange={handleEventTypeChange}
              options={EVENT_TYPES}
              placeholder={t.devis.selectPlaceholder}
              aria-labelledby="typeEvenement-label"
            />
          </div>

          {/* Ligne 4 : Date / Lieu */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="date" className="mb-1 block text-sm font-medium text-white/80">
                {t.devis.date}
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
              <label htmlFor="lieu" className="mb-1 block text-sm font-medium text-white/80">
                {t.devis.lieu}
              </label>
              <input
                id="lieu"
                type="text"
                name="lieu"
                value={formData.lieu}
                onChange={handleChange}
                className={INPUT_CLASSES}
                placeholder={t.devis.lieuPlaceholder}
              />
            </div>
          </div>

          {/* Ligne 5 : Formule souhaitée (radio) */}
          <fieldset>
            <legend className="mb-2 block text-sm font-medium text-white/80">
              {t.devis.formule} <span className="text-red-500">*</span>
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
            <label htmlFor="message" className="mb-1 block text-sm font-medium text-white/80">
              {t.devis.message} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleChange}
              className={INPUT_CLASSES}
              placeholder={t.devis.messagePlaceholder}
            />
          </div>

          {/* RGPD */}
          <p className="text-sm text-white/50">{t.devis.rgpd}</p>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="rc-btn-red w-full disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              t.devis.submit
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
