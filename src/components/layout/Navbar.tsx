"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { socialLinks } from "@/data/social-links";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Translations } from "@/locales/fr";

function getNavLinks(t: Translations) {
  return [
    { label: t.nav.home, href: "/" },
    { label: t.nav.concerts, href: "/concerts" },
    { label: t.nav.albums, href: "/albums" },
    { label: t.nav.videos, href: "/videos" },
    { label: t.nav.photos, href: "/photos" },
    { label: t.nav.biography, href: "/biographie" },
    { label: t.nav.professionals, href: "/professionnels" },
    { label: t.nav.contact, href: "/contact" },
  ];
}

const SCROLL_THRESHOLD = 50;

function isActivePath(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

function LanguageSwitcher(): React.ReactElement {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex items-center gap-1 rounded-lg border border-white/20 px-1 py-0.5 text-xs font-bold">
      <button
        onClick={() => setLang("fr")}
        className={`rounded px-1.5 py-0.5 transition-colors ${
          lang === "fr"
            ? "bg-rc-yellow text-rc-dark"
            : "text-white/60 hover:text-white"
        }`}
        aria-pressed={lang === "fr"}
      >
        FR
      </button>
      <span className="text-white/30">|</span>
      <button
        onClick={() => setLang("en")}
        className={`rounded px-1.5 py-0.5 transition-colors ${
          lang === "en"
            ? "bg-rc-yellow text-rc-dark"
            : "text-white/60 hover:text-white"
        }`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}

function MobileHeaderLangSwitch(): React.ReactElement {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex items-center gap-1.5 text-xs font-semibold tracking-widest">
      <button
        onClick={() => setLang("fr")}
        className={lang === "fr" ? "text-white" : "text-white/35"}
        aria-pressed={lang === "fr"}
      >
        FR
      </button>
      <span className="text-white/20">|</span>
      <button
        onClick={() => setLang("en")}
        className={lang === "en" ? "text-white" : "text-white/35"}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}

interface DesktopNavProps {
  pathname: string;
}

function DesktopNav({ pathname }: DesktopNavProps) {
  const { t } = useLanguage();
  const navLinks = getNavLinks(t);
  return (
    <div
      className="hidden items-center gap-1 rounded-xl px-2 py-1 backdrop-blur-sm md:flex"
      style={{ background: "rgba(0,0,0,0.25)" }}
    >
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors duration-200 ${
            isActivePath(link.href, pathname)
              ? "text-rc-yellow"
              : "text-rc-white hover:text-rc-yellow"
          }`}
          style={{
            textShadow:
              "0 1px 3px rgba(0,0,0,0.6), 0 0 1px rgba(0,0,0,0.8), 1px 0 2px rgba(0,0,0,0.5), -1px 0 2px rgba(0,0,0,0.5)",
          }}
        >
          {link.label}
        </Link>
      ))}
      <LanguageSwitcher />
    </div>
  );
}

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

function MobileDrawer({ isOpen, onClose, pathname }: MobileDrawerProps) {
  const { t } = useLanguage();
  const navLinks = getNavLinks(t);
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full sm:w-80 flex-col transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ background: "rgba(26, 34, 68, 0.97)" }}
      >
        <div className="relative flex h-16 items-center justify-center px-5">
          <Link href="/" onClick={onClose}>
            <Image
              src="/images/logo/logo-vache.png"
              alt="Ricoune"
              width={40}
              height={40}
              unoptimized
              className="rounded"
            />
          </Link>
          <button
            onClick={onClose}
            className="absolute right-5 text-rc-white transition-colors hover:text-rc-yellow"
            aria-label="Fermer le menu"
          >
            <X size={26} />
          </button>
        </div>
        <div className="mx-auto w-3/4 border-t border-white/10" />
        <nav className="flex flex-1 flex-col items-center gap-0.5 overflow-y-auto py-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`w-64 rounded-lg py-3 text-center text-base font-semibold tracking-wide transition-colors duration-200 ${
                isActivePath(link.href, pathname)
                  ? "text-rc-yellow"
                  : "text-rc-white hover:text-rc-yellow"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4">
            <LanguageSwitcher />
          </div>
        </nav>
        <div className="mx-auto w-3/4 border-t border-white/10" />
        <div className="flex items-center justify-center gap-5 py-5">
          <a
            href={socialLinks.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white/60 hover:text-white transition-colors"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>
          <a
            href={socialLinks.facebook.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-white/60 hover:text-white transition-colors"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <a
            href={socialLinks.youtube.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="text-white/60 hover:text-white transition-colors"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
          <a
            href={socialLinks.spotify.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Spotify"
            className="text-white/60 hover:text-white transition-colors"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
          </a>
          <a
            href={socialLinks.tiktok.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="text-white/60 hover:text-white transition-colors"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function handleScroll(): void {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3 shadow-lg backdrop-blur-md" : "py-4"
        }`}
        style={{
          background: scrolled ? "rgba(26, 34, 68, 0.85)" : "transparent",
        }}
      >
        {!scrolled && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
        )}
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Image
              src="/images/logo/logo-vache.png"
              alt="Ricoune logo"
              width={160}
              height={80}
              priority
              unoptimized
              className="h-12 w-auto md:h-14"
            />
          </Link>
          <DesktopNav pathname={pathname} />
          <div className="flex items-center gap-2 md:hidden">
            <MobileHeaderLangSwitch />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-rc-white transition-colors hover:text-rc-yellow"
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>
      <MobileDrawer isOpen={mobileOpen} onClose={closeMobile} pathname={pathname} />
    </>
  );
}
