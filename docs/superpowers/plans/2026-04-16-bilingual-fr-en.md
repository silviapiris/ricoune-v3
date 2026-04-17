# Bilingual FR/EN System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a FR/EN language toggle covering the Navbar, Homepage, and Devis form — no routing, instant React state switch.

**Architecture:** A `LanguageContext` (React Context) holds `lang` ("fr"|"en"), `setLang`, and `t` (typed translations object). A `LanguageProvider` client component wraps the app body via a dedicated `Providers` wrapper (needed because `layout.tsx` is a Server Component). Each targeted component calls `useLanguage()` to access `t`.

**Tech Stack:** React Context, TypeScript, Next.js App Router (no external i18n library)

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Create | `src/locales/fr.ts` | All French strings |
| Create | `src/locales/en.ts` | All English strings (same shape) |
| Create | `src/contexts/LanguageContext.tsx` | Context, hook, Provider |
| Create | `src/components/layout/Providers.tsx` | Client wrapper for layout.tsx |
| Modify | `src/app/layout.tsx` | Use `<Providers>` around body children |
| Modify | `src/components/layout/Navbar.tsx` | Add LanguageSwitcher, use `t.nav.*` |
| Modify | `src/components/home/HeroSection.tsx` | Use `t.hero.*` |
| Modify | `src/components/home/ConcertsPreview.tsx` | Use `t.concerts.*` |
| Modify | `src/components/home/AboutSection.tsx` | Use `t.about.*` |
| Modify | `src/components/home/LatestAlbum.tsx` | Use `t.album.*` |
| Modify | `src/components/home/ArtistSection.tsx` | Use `t.artist.*` |
| Modify | `src/components/home/UniversSection.tsx` | Use `t.univers.*` |
| Modify | `src/components/home/CtaSection.tsx` | Use `t.cta.*` |
| Modify | `src/app/professionnels/demande-de-devis/page.tsx` | Use `t.devis.*` |

---

## Task 1: Locale files

**Files:**
- Create: `src/locales/fr.ts`
- Create: `src/locales/en.ts`

- [ ] **Step 1: Create `src/locales/fr.ts`**

```typescript
export const fr = {
  nav: {
    home: "Accueil",
    concerts: "Concerts",
    albums: "Albums",
    videos: "Vidéos",
    photos: "Photos",
    biography: "Biographie",
    professionals: "Professionnels",
    contact: "Contact",
  },
  hero: {
    tagline: "L'artiste incontournable des fêtes du Sud",
    listenSpotify: "Écouter sur Spotify",
    bookDate: "Demander une date",
  },
  concerts: {
    title: "Prochains concerts",
    viewAll: "Voir toutes les dates",
    addCalendar: "Ajouter à Google Calendar",
    solo: "En Solo",
    group: "En Groupe",
  },
  about: {
    title: "À propos de Ricoune",
    p1: "L'univers de Ricoune, c'est avant tout la fête et la bonne humeur.",
    p2: "Artiste emblématique du Sud de la France, il enflamme les scènes avec ses chansons festives, populaires et entraînantes.",
    p3: "À travers ses concerts, Ricoune partage une énergie communicative et rassemble toutes les générations autour d'un même esprit de convivialité.",
    learnMore: "En savoir plus",
    followOn: "Suivre Ricoune sur",
  },
  album: {
    label: "DERNIER ALBUM",
    description:
      "Le dernier opus de Ricoune, c'est pure musique du Sud. De la bonne humeur, des chansons populaires qui rassemblent, et l'énergie festive qui fait sa signature.",
    listenSpotify: "Écouter sur Spotify",
    followSpotify: "Suivre sur Spotify",
  },
  artist: {
    soulLabel: "L'AME DE LA FÊTE",
    title: "RICOUNE, L'ICÔNE DU SUD",
    p1: "Véritable icône des fêtes votives et des férias du Sud de la France, Ricoune est l'artiste incontournable du milieu festif.",
    p2: "Auteur de l'incontournable « Dans un verre à ballon », lancé en 2001, il est aussi le créateur du générique de la fameuse « vache » d'Interville en 2007.",
    discoverBio: "Découvrir la biographie",
  },
  univers: {
    listen: "Écouter",
    watch: "Regarder",
    follow: "Suivre",
    watchVideos: "Voir les vidéos",
  },
  cta: {
    title: "ORGANISEZ VOTRE ÉVÉNEMENT AVEC RICOUNE",
    subtitle:
      "Mairies, comités des fêtes, particuliers\u00a0: mettez le feu à votre scène.",
    book: "Réserver / Contacter",
  },
  devis: {
    title: "Demander un devis",
    nom: "Nom",
    nomPlaceholder: "Votre nom",
    prenom: "Prénom",
    prenomPlaceholder: "Votre prénom",
    email: "Email",
    emailPlaceholder: "votre@email.com",
    telephone: "Téléphone",
    telephonePlaceholder: "06 XX XX XX XX",
    typeEvenement: "Type d'événement",
    date: "Date souhaitée",
    lieu: "Lieu / Ville",
    lieuPlaceholder: "Ville ou lieu",
    formule: "Formule souhaitée",
    message: "Message / Précisions",
    messagePlaceholder: "Décrivez votre événement, vos besoins...",
    submit: "Envoyer la demande",
    submitting: "Envoi...",
    rgpd:
      "Les informations envoyées via ce site sont utilisées uniquement pour répondre à votre demande.",
    successMsg:
      "Votre demande a été envoyée avec succès\u00a0! Nous vous recontacterons rapidement.",
    backHome: "Retour à l'accueil",
    viewConcerts: "Voir les concerts",
    errorMsg: "Une erreur est survenue. Veuillez réessayer.",
    selectPlaceholder: "-- Sélectionnez --",
    eventTypes: [
      "Fête votive / Feria",
      "Festival",
      "Soirée privée",
      "Événement d'entreprise",
      "Autre",
    ] as const,
    formuleOptions: [
      "Formule complète",
      "Apéro concert / Show case",
      "Je ne sais pas encore",
    ] as const,
  },
} as const;

export type Translations = typeof fr;
```

- [ ] **Step 2: Create `src/locales/en.ts`**

```typescript
import type { Translations } from "./fr";

export const en: Translations = {
  nav: {
    home: "Home",
    concerts: "Concerts",
    albums: "Albums",
    videos: "Videos",
    photos: "Photos",
    biography: "Biography",
    professionals: "Professionals",
    contact: "Contact",
  },
  hero: {
    tagline: "The unmissable artist of Southern festivals",
    listenSpotify: "Listen on Spotify",
    bookDate: "Request a date",
  },
  concerts: {
    title: "Upcoming concerts",
    viewAll: "View all dates",
    addCalendar: "Add to Google Calendar",
    solo: "Solo",
    group: "Group",
  },
  about: {
    title: "About Ricoune",
    p1: "Ricoune's world is all about celebration and good vibes.",
    p2: "An iconic artist from the South of France, he sets stages alight with his festive, popular, and catchy songs.",
    p3: "Through his concerts, Ricoune shares a contagious energy and brings every generation together in a spirit of joy.",
    learnMore: "Learn more",
    followOn: "Follow Ricoune on",
  },
  album: {
    label: "LATEST ALBUM",
    description:
      "Ricoune's latest record is pure Southern music — good vibes, crowd-pleasing songs, and the festive energy that defines his signature style.",
    listenSpotify: "Listen on Spotify",
    followSpotify: "Follow on Spotify",
  },
  artist: {
    soulLabel: "THE SOUL OF THE PARTY",
    title: "RICOUNE, THE ICON OF THE SOUTH",
    p1: "A true icon of the village festivals and férias of Southern France, Ricoune is the unmissable artist of the festive scene.",
    p2: "Author of the essential \"Dans un verre à ballon\" (2001), he also created the famous \"cow\" jingle for Interville in 2007.",
    discoverBio: "Discover the biography",
  },
  univers: {
    listen: "Listen",
    watch: "Watch",
    follow: "Follow",
    watchVideos: "Watch videos",
  },
  cta: {
    title: "ORGANIZE YOUR EVENT WITH RICOUNE",
    subtitle:
      "Town halls, festival committees, individuals\u00a0: set your stage on fire.",
    book: "Book / Contact",
  },
  devis: {
    title: "Request a quote",
    nom: "Last name",
    nomPlaceholder: "Your last name",
    prenom: "First name",
    prenomPlaceholder: "Your first name",
    email: "Email",
    emailPlaceholder: "your@email.com",
    telephone: "Phone",
    telephonePlaceholder: "+33 6 XX XX XX XX",
    typeEvenement: "Event type",
    date: "Preferred date",
    lieu: "Venue / City",
    lieuPlaceholder: "City or venue",
    formule: "Preferred package",
    message: "Message / Details",
    messagePlaceholder: "Describe your event and needs...",
    submit: "Send request",
    submitting: "Sending...",
    rgpd:
      "Information submitted through this site is used solely to respond to your request.",
    successMsg:
      "Your request has been sent successfully! We will get back to you shortly.",
    backHome: "Back to home",
    viewConcerts: "View concerts",
    errorMsg: "An error occurred. Please try again.",
    selectPlaceholder: "-- Select --",
    eventTypes: [
      "Village festival / Feria",
      "Festival",
      "Private party",
      "Corporate event",
      "Other",
    ] as const,
    formuleOptions: [
      "Full package",
      "Apéro concert / Showcase",
      "I don't know yet",
    ] as const,
  },
};
```

- [ ] **Step 3: Commit**

```bash
git add src/locales/fr.ts src/locales/en.ts
git commit -m "feat(i18n): locale files fr + en"
```

---

## Task 2: LanguageContext

**Files:**
- Create: `src/contexts/LanguageContext.tsx`

- [ ] **Step 1: Create the context, hook, and provider**

```typescript
// src/contexts/LanguageContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { fr, type Translations } from "@/locales/fr";
import { en } from "@/locales/en";

type Lang = "fr" | "en";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  const [lang, setLang] = useState<Lang>("fr");
  const t = lang === "fr" ? fr : en;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/contexts/LanguageContext.tsx
git commit -m "feat(i18n): LanguageContext + useLanguage hook"
```

---

## Task 3: Providers wrapper + layout

**Files:**
- Create: `src/components/layout/Providers.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create `src/components/layout/Providers.tsx`**

`layout.tsx` is a Server Component — it cannot directly use the `LanguageProvider` (a Client Component) as a wrapper without this thin adapter:

```typescript
// src/components/layout/Providers.tsx
"use client";

import { LanguageProvider } from "@/contexts/LanguageContext";
import type { ReactNode } from "react";

export default function Providers({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return <LanguageProvider>{children}</LanguageProvider>;
}
```

- [ ] **Step 2: Modify `src/app/layout.tsx`**

Replace the `<body>` content to wrap everything in `<Providers>`:

```typescript
import type { Metadata } from "next";
import { Inter, Oswald, Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/CookieBanner";
import ScrollToTop from "@/components/ScrollToTop";
import Providers from "@/components/layout/Providers";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin"] });
const raleway = Raleway({ variable: "--font-raleway", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ricoune — Site Officiel",
  description:
    "Ricoune, l'artiste incontournable des fetes du Sud de la France. Concerts, albums, videos et demandes de devis.",
  icons: { icon: "/images/logo/ricoune-favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${oswald.variable} ${raleway.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Providers.tsx src/app/layout.tsx
git commit -m "feat(i18n): Providers wrapper injected into layout"
```

---

## Task 4: Navbar — LanguageSwitcher + nav labels

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Replace `NAV_LINKS` static array with a function and add LanguageSwitcher**

Replace the entire `src/components/layout/Navbar.tsx` with:

```typescript
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
          lang === "fr" ? "bg-rc-yellow text-rc-dark" : "text-white/60 hover:text-white"
        }`}
        aria-pressed={lang === "fr"}
      >
        FR
      </button>
      <span className="text-white/30">|</span>
      <button
        onClick={() => setLang("en")}
        className={`rounded px-1.5 py-0.5 transition-colors ${
          lang === "en" ? "bg-rc-yellow text-rc-dark" : "text-white/60 hover:text-white"
        }`}
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
    <div className="hidden items-center gap-2 rounded-xl px-2 py-1 backdrop-blur-sm md:flex" style={{ background: "rgba(0,0,0,0.25)" }}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors duration-200 ${
            isActivePath(link.href, pathname)
              ? "text-rc-yellow"
              : "text-rc-white hover:text-rc-yellow"
          }`}
          style={{ textShadow: "0 1px 3px rgba(0,0,0,0.6), 0 0 1px rgba(0,0,0,0.8), 1px 0 2px rgba(0,0,0,0.5), -1px 0 2px rgba(0,0,0,0.5)" }}
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
          <a href={socialLinks.instagram.href} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/60 hover:text-white transition-colors">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href={socialLinks.facebook.href} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/60 hover:text-white transition-colors">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href={socialLinks.youtube.href} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-white/60 hover:text-white transition-colors">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
          <a href={socialLinks.spotify.href} target="_blank" rel="noopener noreferrer" aria-label="Spotify" className="text-white/60 hover:text-white transition-colors">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
          </a>
          <a href={socialLinks.tiktok.href} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-white/60 hover:text-white transition-colors">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
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
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-rc-white transition-colors hover:text-rc-yellow md:hidden"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>
      <MobileDrawer isOpen={mobileOpen} onClose={closeMobile} pathname={pathname} />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat(i18n): Navbar — LanguageSwitcher + translated nav labels"
```

---

## Task 5: Homepage sections

**Files:**
- Modify: `src/components/home/HeroSection.tsx`
- Modify: `src/components/home/ConcertsPreview.tsx`
- Modify: `src/components/home/AboutSection.tsx`
- Modify: `src/components/home/LatestAlbum.tsx`
- Modify: `src/components/home/ArtistSection.tsx`
- Modify: `src/components/home/UniversSection.tsx`
- Modify: `src/components/home/CtaSection.tsx`

### 5a — HeroSection

- [ ] **Step 1: Add `useLanguage` to HeroSection**

In `src/components/home/HeroSection.tsx`, add the import at the top:

```typescript
import { useLanguage } from "@/contexts/LanguageContext";
```

Inside `HeroSection()`, add as first line:

```typescript
const { t } = useLanguage();
```

Replace the tagline text (appears twice — mobile and desktop):

```typescript
// mobile (line ~39) and desktop (line ~97)
// Replace: L&apos;artiste incontournable des f&ecirc;tes du Sud
// With:
{t.hero.tagline}
```

Replace both "Écouter sur Spotify" button texts:

```typescript
// Replace: &Eacute;couter sur Spotify (both occurrences)
// With:
{t.hero.listenSpotify}
```

Replace both "Demander une date" link texts:

```typescript
// Replace: Demander une date (both occurrences)
// With:
{t.hero.bookDate}
```

### 5b — ConcertsPreview

- [ ] **Step 1: Add `useLanguage` to ConcertsPreview**

In `src/components/home/ConcertsPreview.tsx`, add:

```typescript
import { useLanguage } from "@/contexts/LanguageContext";
```

Inside `ConcertsPreview()`, add:

```typescript
const { t } = useLanguage();
```

Make the following replacements:

```typescript
// "Prochains concerts" → {t.concerts.title}
// "Ajouter à Google Calendar" → {t.concerts.addCalendar}
// "En Solo" (in badge) → {t.concerts.solo}
// "En Groupe" (in badge) → {t.concerts.group}
// "Voir toutes les dates" → {t.concerts.viewAll}
```

Note: `formatMonth` uses `"fr-FR"` locale — update it to use the active lang:

```typescript
// Change formatMonth signature to accept lang:
function formatMonth(dateStr: string, lang: "fr" | "en"): string {
  const locale = lang === "fr" ? "fr-FR" : "en-US";
  const date = new Date(dateStr);
  return date
    .toLocaleDateString(locale, { month: "short" })
    .toUpperCase()
    .replace(".", "");
}

// Pass lang when calling:
{formatMonth(concert.date, lang)}
```

Add `lang` to the destructure:

```typescript
const { t, lang } = useLanguage();
```

### 5c — AboutSection

- [ ] **Step 1: Add `useLanguage` to AboutSection**

```typescript
import { useLanguage } from "@/contexts/LanguageContext";
```

Inside `AboutSection()`:

```typescript
const { t } = useLanguage();
```

Replacements:

```typescript
// h2: "À propos de Ricoune" → {t.about.title}
// p1: "L'univers de Ricoune..." → {t.about.p1}
// p2: "Artiste emblématique..." → {t.about.p2}
// p3: "À travers ses concerts..." → {t.about.p3}
// Link "En savoir plus" → {t.about.learnMore}
// aria-label: `Suivre Ricoune sur ${social.name}` → `${t.about.followOn} ${social.name}`
```

### 5d — LatestAlbum

- [ ] **Step 1: Add `useLanguage` to LatestAlbum**

```typescript
import { useLanguage } from "@/contexts/LanguageContext";
```

Inside `LatestAlbum()`:

```typescript
const { t } = useLanguage();
```

Replacements:

```typescript
// rc-section-label: "DERNIER ALBUM" → {t.album.label}
// p description → {t.album.description}
// "Écouter sur Spotify" → {t.album.listenSpotify}
// "Suivre sur Spotify" → {t.album.followSpotify}
```

### 5e — ArtistSection

- [ ] **Step 1: Add `useLanguage` to ArtistSection**

```typescript
import { useLanguage } from "@/contexts/LanguageContext";
```

Inside `ArtistSection()`:

```typescript
const { t } = useLanguage();
```

Replacements:

```typescript
// rc-section-label: "L'AME DE LA FÊTE" → {t.artist.soulLabel}
// h2: "RICOUNE, L'ICÔNE DU SUD" → {t.artist.title}
// p1 → {t.artist.p1}
// p2 → {t.artist.p2}
// Link "Découvrir la biographie" → {t.artist.discoverBio}
```

### 5f — UniversSection

- [ ] **Step 1: Add `useLanguage` to UniversSection**

The `CARDS` array is defined outside the component. Move it inside `UniversSection()` (or into a `getCards(t)` function) so it can use translations:

```typescript
import { useLanguage } from "@/contexts/LanguageContext";
import type { Translations } from "@/locales/fr";

function getCards(t: Translations, socialLinks: typeof import("@/data/social-links").socialLinks) {
  return [
    {
      title: t.univers.listen,
      icon: (/* same SVG as before */),
      links: [
        { label: "Spotify", href: socialLinks.spotify.href, external: true },
        { label: "Deezer", href: socialLinks.deezer.href, external: true },
      ],
      mainHref: socialLinks.spotify.href,
    },
    {
      title: t.univers.watch,
      icon: (/* same SVG */),
      links: [{ label: t.univers.watchVideos, href: "/videos" }],
      mainHref: "/videos",
    },
    {
      title: t.univers.follow,
      icon: (/* same SVG */),
      links: [
        { label: "Instagram", href: socialLinks.instagram.href, external: true },
        { label: "TikTok", href: socialLinks.tiktok.href, external: true },
      ],
      mainHref: socialLinks.instagram.href,
    },
  ];
}
```

Inside `UniversSection()`:

```typescript
const { t } = useLanguage();
const CARDS = getCards(t, socialLinks);
```

### 5g — CtaSection

- [ ] **Step 1: Add `useLanguage` to CtaSection**

```typescript
import { useLanguage } from "@/contexts/LanguageContext";
```

Inside `CtaSection()`:

```typescript
const { t } = useLanguage();
```

Replacements:

```typescript
// h2 → {t.cta.title}
// p → {t.cta.subtitle}
// Link → {t.cta.book}
```

- [ ] **Step 2: Commit all homepage sections**

```bash
git add src/components/home/
git commit -m "feat(i18n): homepage sections translated (Hero, Concerts, About, Album, Artist, Univers, CTA)"
```

---

## Task 6: Devis form

**Files:**
- Modify: `src/app/professionnels/demande-de-devis/page.tsx`

The devis page currently defines `EVENT_TYPES` and `FORMULE_OPTIONS` as top-level `as const` arrays. These must become locale-driven. The form also uses a hardcoded `INPUT_CLASSES` constant and several JSX string literals.

- [ ] **Step 1: Modify `src/app/professionnels/demande-de-devis/page.tsx`**

Add import:

```typescript
import { useLanguage } from "@/contexts/LanguageContext";
```

Remove the top-level `EVENT_TYPES` and `FORMULE_OPTIONS` constants (they'll come from `t.devis`).

Inside `DemandeDevisPage()`, add as first line:

```typescript
const { t } = useLanguage();
const EVENT_TYPES = t.devis.eventTypes;
const FORMULE_OPTIONS = t.devis.formuleOptions;
```

Change `SelectField` `placeholder` prop:

```typescript
placeholder={t.devis.selectPlaceholder}
```

Replace all translatable strings in the JSX:

```typescript
// h1 → {t.devis.title}

// success div:
// "Votre demande a été envoyée..." → {t.devis.successMsg}
// "Retour à l'accueil" → {t.devis.backHome}
// "Voir les concerts" → {t.devis.viewConcerts}

// error div:
// "Une erreur est survenue..." → {t.devis.errorMsg}

// labels:
// "Nom" → {t.devis.nom}
// "Prénom" → {t.devis.prenom}
// "Email" → {t.devis.email}
// "Téléphone" → {t.devis.telephone}
// "Type d'événement" → {t.devis.typeEvenement}
// "Date souhaitée" → {t.devis.date}
// "Lieu / Ville" → {t.devis.lieu}
// "Formule souhaitée" → {t.devis.formule}
// "Message / Précisions" → {t.devis.message}

// placeholders:
// "Votre nom" → {t.devis.nomPlaceholder}
// "Votre prénom" → {t.devis.prenomPlaceholder}
// "votre@email.com" → {t.devis.emailPlaceholder}
// "06 XX XX XX XX" → {t.devis.telephonePlaceholder}
// "Ville ou lieu" → {t.devis.lieuPlaceholder}
// "Décrivez votre événement..." → {t.devis.messagePlaceholder}

// submit button:
// "Envoyer la demande" → {t.devis.submit}

// RGPD text → {t.devis.rgpd}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/professionnels/demande-de-devis/page.tsx
git commit -m "feat(i18n): devis form fully translated"
```

---

## Task 7: Final verification + push

- [ ] **Step 1: TypeScript check**

```bash
cd ricoune-v3 && npx tsc --noEmit 2>&1 | grep -v "photos/page.tsx"
```

Expected: no errors (the pre-existing photos/page.tsx errors are unrelated).

- [ ] **Step 2: Manual smoke test on localhost:3000**

- Click EN → all nav labels switch to English
- Homepage tagline, buttons, section headings switch to English
- `/professionnels/demande-de-devis` — all labels, placeholders, options switch to English
- Click FR → everything reverts to French
- No visual layout shift

- [ ] **Step 3: Push**

```bash
git push origin main
```

Expected: Vercel deployment triggers automatically.
