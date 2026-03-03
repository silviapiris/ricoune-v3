"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

const eventTypes = [
  "Fete votive",
  "Feria",
  "Mariage",
  "Anniversaire",
  "Festival",
  "Soiree privee",
  "Evenement d'entreprise",
  "Autre",
];

const formuleOptions = [
  "The Ricoune Show",
  "L'ApeRicoune",
  "Je ne sais pas encore",
];

export default function DemandeDevisPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      alert("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full rounded-lg border border-dark-lighter bg-dark-light px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-primary";

  return (
    <div>
      {/* Hero */}
      <section className="relative flex h-[40vh] items-center justify-center bg-gradient-to-b from-dark-light to-dark">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(194,47,40,0.15),transparent_70%)]" />
        <div className="relative text-center">
          <h1 className="text-5xl font-bold tracking-wider text-white md:text-6xl">
            Demande de Devis
          </h1>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-primary" />
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl border border-green-500/30 bg-dark-light p-8 text-center"
          >
            <CheckCircle size={48} className="mx-auto mb-4 text-green-500" />
            <h2 className="mb-2 text-2xl font-bold text-white">
              Demande envoyee !
            </h2>
            <p className="text-gray-400">
              Votre demande a bien ete envoyee ! Nous vous repondrons dans les
              plus brefs delais.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-8 text-center text-gray-400">
              N&apos;hesitez pas a nous contacter pour toute demande
              d&apos;information ou de devis. Nous vous repondrons dans les plus
              brefs delais !
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nom / Prenom */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-300">
                    Nom *
                  </label>
                  <input
                    type="text"
                    name="nom"
                    required
                    value={formData.nom}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-300">
                    Prenom *
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    required
                    value={formData.prenom}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Votre prenom"
                  />
                </div>
              </div>

              {/* Email / Telephone */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-300">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-300">
                    Telephone
                  </label>
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="06 XX XX XX XX"
                  />
                </div>
              </div>

              {/* Type d'evenement */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">
                  Type d&apos;evenement
                </label>
                <select
                  name="typeEvenement"
                  value={formData.typeEvenement}
                  onChange={handleChange}
                  className={inputClasses}
                >
                  <option value="">-- Selectionnez --</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date / Lieu */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-300">
                    Date souhaitee
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-300">
                    Lieu / Ville
                  </label>
                  <input
                    type="text"
                    name="lieu"
                    value={formData.lieu}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Ville ou lieu"
                  />
                </div>
              </div>

              {/* Formule souhaitee */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Formule souhaitee
                </label>
                <div className="space-y-2">
                  {formuleOptions.map((option) => (
                    <label
                      key={option}
                      className="flex cursor-pointer items-center gap-3"
                    >
                      <input
                        type="radio"
                        name="formule"
                        value={option}
                        checked={formData.formule === option}
                        onChange={handleChange}
                        className="h-4 w-4 accent-primary"
                      />
                      <span className="text-sm text-gray-300">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">
                  Message / Precisions
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="Decrivez votre evenement, vos besoins..."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-light disabled:opacity-50"
              >
                {loading ? (
                  <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <>
                    <Send size={16} />
                    Envoyer la demande
                  </>
                )}
              </button>
            </form>
          </motion.div>
        )}
      </section>
    </div>
  );
}
