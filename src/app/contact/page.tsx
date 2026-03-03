"use client";

import { useState, FormEvent } from "react";
import {
  Facebook,
  Youtube,
  ExternalLink,
  MapPin,
  Send,
  Loader2,
  CheckCircle,
  XCircle,
  FileText,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      width="24"
      height="24"
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function SoundcloudIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      width="24"
      height="24"
    >
      <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.054-.048-.1-.1-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.172 1.282c.013.06.045.094.104.094.057 0 .09-.037.104-.094l.194-1.282-.194-1.332c-.014-.057-.047-.094-.104-.094m1.848-1.18c-.063 0-.11.05-.116.11l-.209 2.496.209 2.407c.006.063.053.11.116.11.065 0 .11-.047.12-.11l.236-2.407-.236-2.496c-.01-.06-.055-.11-.12-.11m.943-.253c-.072 0-.122.055-.13.12l-.194 2.75.194 2.59c.008.063.058.12.13.12.073 0 .12-.057.132-.12l.217-2.59-.217-2.75c-.012-.065-.059-.12-.132-.12m.976-.25c-.083 0-.137.063-.145.133l-.178 2.883.178 2.682c.008.073.062.133.145.133.08 0 .136-.06.147-.133l.2-2.682-.2-2.883c-.011-.07-.067-.133-.147-.133m1.037-.081c-.09 0-.148.067-.155.143l-.163 2.964.163 2.727c.007.08.065.143.155.143.088 0 .148-.063.158-.143l.183-2.727-.183-2.964c-.01-.076-.07-.143-.158-.143m1.097-.17c-.1 0-.163.076-.17.156l-.147 3.134.147 2.76c.007.083.07.157.17.157.097 0 .163-.074.173-.157l.166-2.76-.166-3.134c-.01-.08-.076-.157-.173-.157m1.108-.06c-.108 0-.175.08-.183.168l-.131 3.194.131 2.78c.008.093.075.17.183.17.107 0 .175-.077.186-.17l.147-2.78-.147-3.194c-.011-.088-.079-.169-.186-.169m1.17-.163c-.12 0-.19.09-.197.18l-.116 3.357.116 2.798c.007.098.077.18.197.18.116 0 .19-.082.2-.18l.131-2.798-.131-3.357c-.01-.09-.084-.18-.2-.18m1.18-.054c-.127 0-.2.094-.208.19l-.1 3.412.1 2.81c.008.1.081.19.208.19s.2-.09.21-.19l.114-2.81-.114-3.412c-.01-.096-.083-.19-.21-.19m1.234-.1c-.14 0-.213.102-.22.2l-.085 3.512.085 2.815c.007.103.08.2.22.2.136 0 .213-.097.224-.2l.097-2.815-.097-3.512c-.011-.098-.088-.2-.224-.2m1.168.263c-.136 0-.225.108-.233.213l-.07 3.25.07 2.817c.008.11.097.213.233.213.133 0 .225-.103.235-.213l.078-2.817-.078-3.25c-.01-.105-.102-.213-.235-.213m1.078-.353c-.023-.152-.124-.254-.271-.254-.143 0-.248.102-.27.254l-.07 3.603.07 2.82c.022.154.127.254.27.254.147 0 .248-.1.271-.254l.078-2.82zm.973-.013c-.023-.16-.133-.27-.288-.27-.152 0-.266.11-.289.27l-.054 3.617.054 2.823c.023.163.137.27.289.27.155 0 .265-.107.288-.27l.063-2.823zM11.587 7.98c-.163 0-.282.118-.305.278l-.039 3.72.039 2.809c.023.163.142.278.305.278.16 0 .282-.115.307-.278l.044-2.809-.044-3.72c-.025-.16-.147-.278-.307-.278m1.07-.647c-.17 0-.295.125-.319.29l-.022 4.367.022 2.806c.024.168.149.29.319.29.168 0 .295-.122.32-.29l.026-2.806-.026-4.367c-.025-.165-.152-.29-.32-.29m1.072-.157c-.175 0-.307.13-.332.3l-.007 4.524.007 2.798c.025.17.157.3.332.3.174 0 .307-.13.333-.3l.008-2.798-.008-4.524c-.026-.17-.159-.3-.333-.3m1.17 1.053c.007-.178-.133-.31-.316-.31-.18 0-.32.132-.345.31l-.003 3.628.007 2.793c.025.177.165.308.345.308.18 0 .309-.131.316-.308l.007-2.793zm.871-.623c-.2 0-.34.143-.356.325v.01l-.01 4.243.01 2.786c.016.177.156.322.356.322.193 0 .34-.145.356-.325l.01-2.783-.01-4.25c-.016-.18-.163-.325-.356-.328m2.59 1.498c-.146 0-.282.023-.412.066-.1-1.135-.99-2.02-2.09-2.02-.278 0-.548.055-.8.153-.094.037-.12.075-.12.15v7.293c0 .078.06.145.135.155l.015.001h3.272c.972 0 1.76-.81 1.76-1.808 0-.997-.788-1.808-1.76-1.808" />
    </svg>
  );
}

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/ricouneofficiel",
    icon: Facebook,
    color: "hover:bg-[#1877F2]/10 hover:border-[#1877F2]/30",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UC49kjqlusTVhH7hL_fT3MDg",
    icon: Youtube,
    color: "hover:bg-[#FF0000]/10 hover:border-[#FF0000]/30",
  },
  {
    name: "Spotify",
    href: "https://open.spotify.com/artist/4NcNxqo5fOC2RGY2Jrx0On",
    customIcon: "spotify",
    color: "hover:bg-[#1DB954]/10 hover:border-[#1DB954]/30",
  },
  {
    name: "Soundcloud",
    href: "https://soundcloud.com/ricouneofficial",
    customIcon: "soundcloud",
    color: "hover:bg-[#FF5500]/10 hover:border-[#FF5500]/30",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    sujet: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.nom,
          email: formData.email,
          subject: formData.sujet,
          message: formData.message,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setFormData({ nom: "", email: "", sujet: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[40vh] items-center justify-center bg-gradient-to-b from-dark-light to-dark">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-primary-dark)_0%,_transparent_70%)] opacity-20" />
        <div className="relative text-center">
          <h1 className="text-5xl font-bold tracking-wider text-white md:text-7xl">
            Contact
          </h1>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-primary" />
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left — Contact Form */}
          <AnimatedSection>
            <p className="mb-8 text-lg text-gray-300">
              N&apos;hesitez pas a prendre contact pour toute demande
              d&apos;information. Nous vous repondrons dans les plus brefs
              delais !
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="nom"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Nom *
                </label>
                <input
                  id="nom"
                  type="text"
                  required
                  value={formData.nom}
                  onChange={(e) =>
                    setFormData({ ...formData, nom: e.target.value })
                  }
                  className="w-full rounded-lg border border-dark-lighter bg-dark-light px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors focus:border-primary"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-lg border border-dark-lighter bg-dark-light px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors focus:border-primary"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="sujet"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Sujet *
                </label>
                <input
                  id="sujet"
                  type="text"
                  required
                  value={formData.sujet}
                  onChange={(e) =>
                    setFormData({ ...formData, sujet: e.target.value })
                  }
                  className="w-full rounded-lg border border-dark-lighter bg-dark-light px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors focus:border-primary"
                  placeholder="Sujet de votre message"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full resize-none rounded-lg border border-dark-lighter bg-dark-light px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors focus:border-primary"
                  placeholder="Votre message..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-light disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Envoyer
                  </>
                )}
              </button>

              {status === "success" && (
                <div className="flex items-center gap-2 rounded-lg bg-green-900/30 p-4 text-green-400">
                  <CheckCircle size={20} />
                  <span>
                    Message envoye avec succes ! Nous vous repondrons rapidement.
                  </span>
                </div>
              )}

              {status === "error" && (
                <div className="flex items-center gap-2 rounded-lg bg-red-900/30 p-4 text-red-400">
                  <XCircle size={20} />
                  <span>
                    Une erreur est survenue. Veuillez reessayer.
                  </span>
                </div>
              )}
            </form>
          </AnimatedSection>

          {/* Right — Info & Social */}
          <AnimatedSection delay={0.2}>
            <h2 className="mb-6 text-2xl font-bold text-white">
              Retrouvez Ricoune
            </h2>

            <div className="space-y-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 rounded-lg border border-dark-lighter bg-dark-light p-4 transition-all ${link.color}`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-dark-lighter">
                    {link.customIcon === "spotify" ? (
                      <SpotifyIcon />
                    ) : link.customIcon === "soundcloud" ? (
                      <SoundcloudIcon />
                    ) : (
                      link.icon && <link.icon size={24} />
                    )}
                  </div>
                  <span className="flex-1 text-lg font-medium text-white">
                    {link.name}
                  </span>
                  <ExternalLink size={18} className="text-gray-400" />
                </a>
              ))}
            </div>

            {/* Pro card */}
            <a
              href="/professionnels/demande-de-devis"
              className="mt-6 flex items-center gap-4 rounded-lg border border-secondary/30 bg-secondary/5 p-4 transition-all hover:border-secondary/50 hover:bg-secondary/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/20">
                <FileText size={24} className="text-secondary" />
              </div>
              <div className="flex-1">
                <span className="block text-lg font-medium text-white">
                  Pour les professionnels
                </span>
                <span className="text-sm text-gray-400">
                  Demande de devis pour vos evenements
                </span>
              </div>
              <ExternalLink size={18} className="text-secondary" />
            </a>

            {/* Location */}
            <div className="mt-8 flex items-center gap-3 rounded-lg border border-dark-lighter bg-dark-light p-4">
              <MapPin size={20} className="text-primary" />
              <span className="text-gray-300">
                Montpellier &amp; Sud de la France
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
