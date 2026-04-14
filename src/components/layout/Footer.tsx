"use client";

import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { socialLinks } from "@/data/social-links";

interface SvgIconProps {
  className?: string;
}

function TikTokIcon({ className }: SvgIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      width="22"
      height="22"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.3 0 .59.04.86.12V9.01a6.33 6.33 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.78 1.54V6.84a4.84 4.84 0 0 1-1.02-.15z" />
    </svg>
  );
}

function SpotifyIcon({ className }: SvgIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      width="22"
      height="22"
      aria-hidden="true"
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

interface FooterNavLink {
  label: string;
  href: string;
}

const FOOTER_NAV_LINKS: FooterNavLink[] = [
  { label: "Concerts", href: "/concerts" },
  { label: "Albums", href: "/albums" },
  { label: "Vidéos", href: "/videos" },
  { label: "Photos", href: "/photos" },
  { label: "Biographie", href: "/biographie" },
  { label: "Professionnels", href: "/professionnels" },
  { label: "Contact", href: "/contact" },
];

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Facebook",
    href: socialLinks.facebook.href,
    icon: <Facebook size={22} />,
  },
  {
    label: "Instagram",
    href: socialLinks.instagram.href,
    icon: <Instagram size={22} />,
  },
  {
    label: "YouTube",
    href: socialLinks.youtube.href,
    icon: <Youtube size={22} />,
  },
  {
    label: "TikTok",
    href: socialLinks.tiktok.href,
    icon: <TikTokIcon />,
  },
  {
    label: "Spotify",
    href: socialLinks.spotify.href,
    icon: <SpotifyIcon />,
  },
];

function FooterBranding() {
  return (
    <div className="text-center md:text-left">
      <Link href="/" className="inline-block group">
        <p className="font-[family-name:var(--font-oswald)] text-3xl font-bold tracking-widest text-white transition-colors duration-200 group-hover:text-rc-yellow">
          RICOUNE
        </p>
      </Link>
      <div className="mt-2 mb-4 h-px w-10 bg-rc-yellow mx-auto md:mx-0" />
      <p className="font-[family-name:var(--font-raleway)] text-sm text-white/60 leading-relaxed max-w-[220px] mx-auto md:mx-0">
        La musique du Sud,<br />partout en France.
      </p>
    </div>
  );
}

function FooterNavigation() {
  return (
    <div className="text-center md:text-left">
      <p className="rc-section-label mb-5">Navigation</p>
      <ul className="space-y-2.5">
        {FOOTER_NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors duration-200 hover:text-white"
            >
              <span className="block w-0 h-px bg-rc-yellow transition-all duration-200 group-hover:w-3" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterSocial() {
  return (
    <div className="text-center md:text-left">
      <p className="rc-section-label mb-5">Suivez Ricoune</p>
      <div className="flex items-center justify-center md:justify-start flex-wrap gap-3">
        {SOCIAL_LINKS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all duration-200 hover:border-rc-yellow/40 hover:bg-rc-yellow/10 hover:text-rc-yellow hover:scale-110"
          >
            {social.icon}
          </a>
        ))}
      </div>
      <p className="mt-5 text-xs text-white/40 font-[family-name:var(--font-raleway)]">
        Restez connectés pour les dernières actualités
      </p>
    </div>
  );
}

function FooterBottom() {
  return (
    <div className="mt-12 pt-6 border-t border-white/[0.06]">
      <div className="flex flex-col items-center gap-3 text-center text-xs text-white/40 sm:flex-row sm:justify-between sm:text-left">
        <p className="font-[family-name:var(--font-raleway)]">
          &copy; 2026 Ricoune — Tous droits réservés
        </p>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
          <Link
            href="/mentions-legales"
            className="transition-colors duration-200 hover:text-white/70"
          >
            Mentions légales
          </Link>
          <Link
            href="/politique-confidentialite"
            className="transition-colors duration-200 hover:text-white/70"
          >
            Politique de confidentialité
          </Link>
          <span>
            Site par{" "}
            <a
              href="https://custom-digital-services.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-white/70"
            >
              Custom Digital Services
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/[0.06] bg-[#07101f]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          <FooterBranding />
          <FooterNavigation />
          <FooterSocial />
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
}
