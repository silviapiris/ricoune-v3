# Ricoune V2 — Refonte Complete CDC V3

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refondre entierement le site ricoune.com selon le CDC Final V3 : nouveau design system bleu/jaune, 8 pages + 3 sous-pages pro, suppression boutique/newsletter, fonctionnalites back-office concerts/videos.

**Architecture:** Refactoring in-place du projet Next.js 16 existant. Le design system passe de dark-theme (rouge/or/sombre) a gradient bleu→jaune. Les donnees statiques (albums, concerts) migrent progressivement vers Supabase. Les API routes existantes (contact, devis) sont conservees et adaptees. Deux agents permanents supervisent : Architecte (conformite CDC/design) et Review E2E (fonctionnement bout-en-bout).

**Tech Stack:** Next.js 16.1.6 / React 19 / TypeScript strict / TailwindCSS 4 / Supabase / Framer Motion / Resend / Lucide React

**Agents de supervision:**
- `ricoune-architect` — Valide architecture, conformite CDC, design system, choix techniques
- `ricoune-e2e-review` — Verifie fonctionnement global : liens, boutons, formulaires, emails, navigation

---

## Phase 0 : Infrastructure & Design System

### Task 0.1 : Copier les assets fournis dans public/

**Files:**
- Create: `public/images/hero/home-concert-scene.jpg`
- Create: `public/images/bio/bio-hero.jpg`
- Create: `public/images/bio/home-bio-portrait.png`
- Create: `public/images/albums/quand-un-faineant-se-rebelle.jpg`
- Create: `public/images/albums/kukela.jpg`
- Create: `public/images/albums/y-faut-etre-gentil.jpg`
- Create: `public/images/albums/20-ans.jpg`
- Create: `public/images/albums/chat-de-jourdan.jpg`
- Create: `public/images/albums/mets-tes-lunettes.jpg`
- Create: `public/images/albums/on-y-est.jpg`
- Create: `public/images/albums/ricoune-recto.jpg`
- Create: `public/images/albums/bestof.jpg`
- Create: `public/images/artist/l-artiste.jpg`
- Create: `public/images/photos/photos-01.jpg` ... `photos-05.jpg`
- Create: `public/images/photos-hd/visuel-01.png`
- Create: `public/images/photos-hd/visuel-02.jpeg`
- Create: `public/images/pro/pro-background.webp`
- Create: `public/images/logo/ricoune-icon.png`
- Create: `public/images/logo/ricoune-favicon.ico`
- Create: `public/documents/fiche-technique-solo.pdf`
- Create: `public/documents/fiche-technique-groupe.pdf`

- [ ] **Step 1:** Creer les dossiers dans public/images et public/documents
- [ ] **Step 2:** Copier et renommer tous les assets depuis `site pour Kevin/ecoute et visus/` vers les chemins ci-dessus (noms kebab-case, extensions normalisees)
- [ ] **Step 3:** Copier les 2 fiches techniques PDF vers public/documents/
- [ ] **Step 4:** Verifier que tous les fichiers sont presents avec `ls -la`
- [ ] **Step 5:** Commit `feat: add CDC assets to public directory`

### Task 0.2 : Refondre le Design System (globals.css + fonts)

**Files:**
- Modify: `src/app/globals.css` — Remplacer entierement le theme
- Modify: `src/app/layout.tsx` — Ajouter Oswald + Raleway

- [ ] **Step 1:** Lire `src/app/globals.css` et `src/app/layout.tsx` actuels
- [ ] **Step 2:** Modifier `layout.tsx` pour importer Oswald, Inter, Raleway depuis Google Fonts

```tsx
import { Inter, Oswald, Raleway } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' })
const raleway = Raleway({ subsets: ['latin'], variable: '--font-raleway' })
```

- [ ] **Step 3:** Remplacer le theme inline dans `globals.css` :

```css
@import "tailwindcss";

@theme inline {
  /* Couleurs CDC V3 */
  --color-rc-blue: #1A4B8F;
  --color-rc-blue-mid: #7699C5;
  --color-rc-yellow: #F2C918;
  --color-rc-white: #FFFFFF;
  --color-rc-dark: #1A1A1A;
  --color-rc-card: rgba(26, 34, 68, 0.82);
  --color-rc-red: #C0392B;

  /* Fonts */
  --font-sans: var(--font-inter);
  --font-heading: var(--font-oswald);
  --font-accent: var(--font-raleway);
}

/* Gradient global CDC V3 */
body {
  background: linear-gradient(135deg, #1A4B8F 0%, #7699C5 50%, #F2C918 100%);
  background-attachment: fixed;
  color: var(--color-rc-white);
  min-height: 100vh;
}

/* Carte standard */
.rc-card {
  background: var(--color-rc-card);
  border-radius: 16px;
  backdrop-filter: blur(8px);
}

/* CTA jaune standard */
.rc-btn {
  background: var(--color-rc-yellow);
  color: var(--color-rc-dark);
  height: 48px;
  border-radius: 50px;
  font-weight: 600;
  padding: 0 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
}
.rc-btn:hover { opacity: 0.9; }

/* CTA rouge (page devis uniquement) */
.rc-btn-red {
  background: var(--color-rc-red);
  color: var(--color-rc-white);
  height: 48px;
  border-radius: 50px;
  font-weight: 600;
  padding: 0 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Scrollbar */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #1A4B8F; }
::-webkit-scrollbar-thumb { background: #7699C5; border-radius: 4px; }

html { scroll-behavior: smooth; }
```

- [ ] **Step 4:** `npm run build` pour verifier qu'il n'y a pas d'erreur
- [ ] **Step 5:** Commit `feat: replace design system with CDC V3 blue/yellow gradient`

### Task 0.3 : Supprimer la page Boutique et la Newsletter

**Files:**
- Delete: `src/app/boutique/page.tsx`
- Modify: `src/components/layout/Navbar.tsx` — Retirer Boutique du menu
- Modify: `src/components/layout/Footer.tsx` — Retirer Boutique + Newsletter

- [ ] **Step 1:** Supprimer le dossier `src/app/boutique/`
- [ ] **Step 2:** Lire `Navbar.tsx`, retirer tout lien vers /boutique
- [ ] **Step 3:** Mettre a jour l'ordre du menu : `Accueil | Concerts | Albums | Videos | Photos | Biographie | Professionnels | Contact`
- [ ] **Step 4:** Lire `Footer.tsx`, retirer le bloc newsletter et tout lien Boutique
- [ ] **Step 5:** `npm run build` pour verifier
- [ ] **Step 6:** Commit `feat: remove boutique page and newsletter, update menu order`

### Task 0.4 : Mettre a jour le favicon et les metadonnees

**Files:**
- Modify: `src/app/layout.tsx` — Metadonnees + favicon
- Create: `src/app/favicon.ico` (copie de l'asset)

- [ ] **Step 1:** Copier `public/images/logo/ricoune-favicon.ico` vers `src/app/favicon.ico`
- [ ] **Step 2:** Mettre a jour les metadonnees dans `layout.tsx` (title, description, icons)
- [ ] **Step 3:** Commit `feat: update favicon and metadata`

---

## Phase 1 : Layout Global (Navbar + Footer)

### Task 1.1 : Refondre le Navbar

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

- [ ] **Step 1:** Lire le Navbar actuel
- [ ] **Step 2:** Refondre avec :
  - Logo officiel `ricoune-icon.png` (ne pas modifier/redessiner)
  - Menu strict : `Accueil | Concerts | Albums | Videos | Photos | Biographie | Professionnels | Contact`
  - Fond semi-transparent sur scroll
  - Mobile : hamburger menu avec drawer
  - Highlight actif sur la page courante
  - Pas de lien Boutique ni Newsletter
- [ ] **Step 3:** Verifier responsive (desktop + mobile)
- [ ] **Step 4:** `npm run build`
- [ ] **Step 5:** Commit `feat: redesign navbar with CDC V3 menu order and logo`

### Task 1.2 : Refondre le Footer

**Files:**
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1:** Lire le Footer actuel
- [ ] **Step 2:** Refondre avec 3 colonnes CDC :
  - Col 1 : "La musique du Sud, partout en France."
  - Col 2 : Liens (Concerts, Albums, Contact)
  - Col 3 : Reseaux sociaux (icones)
  - Bas : "Mentions legales" (lien) + copyright
  - Integre au degrade, pas de bloc noir
  - Pas de newsletter
- [ ] **Step 3:** `npm run build`
- [ ] **Step 4:** Commit `feat: redesign footer with CDC V3 structure`

---

## Phase 2 : Page Accueil (remplacement complet)

### Task 2.1 : Hero Accueil

**Files:**
- Modify: `src/app/page.tsx` — Remplacement complet

- [ ] **Step 1:** Lire `src/app/page.tsx` actuel
- [ ] **Step 2:** Creer le hero plein ecran :
  - Image fond : `home-concert-scene.jpg` avec overlay sombre
  - Titre centre : "RICOUNE" (Oswald, bold, grand)
  - Sous-titre : "L'artiste incontournable des fetes du Sud" (Raleway)
  - 2 boutons centres sous le titre :
    - "Ecouter sur Spotify" (bouton principal jaune, icone Spotify)
    - "Demander une date" (bouton secondaire outline blanc)
  - PAS de bouton "Voir les dates"
- [ ] **Step 3:** Verifier rendu desktop + mobile
- [ ] **Step 4:** Commit `feat: create new hero section for homepage`

### Task 2.2 : Section Reseaux Sociaux (sous le hero)

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1:** Ajouter barre reseaux sociaux :
  - Boutons pill avec fond identique (rc-card) pour TOUS
  - Icones couleurs officielles des plateformes
  - Ordre : Spotify, TikTok, Instagram, Facebook, YouTube, Apple Music, Deezer
- [ ] **Step 2:** Commit `feat: add unified social media bar to homepage`

### Task 2.3 : Section Prochains Concerts

**Files:**
- Modify: `src/app/page.tsx`
- Read: `src/data/concerts.ts`

- [ ] **Step 1:** Section "Prochains concerts" avec cartes :
  - Afficher les 3 prochains concerts (tri date, filtrer passes)
  - Carte : date (jour/mois) | ville + lieu | badge solo/groupe
  - Bouton "Voir toutes les dates" → /concerts
- [ ] **Step 2:** Commit `feat: add upcoming concerts section to homepage`

### Task 2.4 : Section A Propos

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1:** Section avec photo portrait (`home-bio-portrait.png`) + texte CDC :
  - "L'univers de Ricoune, c'est avant tout la fete et la bonne humeur..."
  - 3 paragraphes exacts du CDC
  - Icones reseaux (Facebook, Instagram, YouTube, TikTok)
- [ ] **Step 2:** Commit `feat: add about section to homepage`

### Task 2.5 : Section Dernier Album

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1:** Carte "Dernier Album" :
  - Jaquette `quand-un-faineant-se-rebelle.jpg`
  - Titre + description reelle
  - Bouton Spotify + "Suivre sur Spotify"
- [ ] **Step 2:** Commit `feat: add latest album section to homepage`

### Task 2.6 : Bas de page Accueil (CDC L'Artiste)

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1:** Section Artiste :
  - 2 colonnes (image `l-artiste.jpg` gauche 40% / texte droite 60%)
  - Label "L'AME DE LA FETE"
  - Titre "RICOUNE, L'ICONE DU SUD"
  - 2 paragraphes bio + bouton "Decouvrir la biographie"
- [ ] **Step 2:** Section Univers/Actions :
  - 3 cartes cliquables : Ecouter (Spotify/Deezer), Regarder (Videos), Suivre (Instagram/TikTok)
- [ ] **Step 3:** Section CTA :
  - "ORGANISEZ VOTRE EVENEMENT AVEC RICOUNE"
  - "Mairies, comites des fetes, particuliers : mettez le feu a votre scene."
  - Bouton "Reserver / Contacter"
- [ ] **Step 4:** Commit `feat: add artist, universe and CTA sections to homepage bottom`

### Task 2.7 : Nettoyage page Accueil

- [ ] **Step 1:** Supprimer tout code residuel de l'ancienne page (sections newsletter, ancien hero, etc.)
- [ ] **Step 2:** Verifier mobile-first responsive complet
- [ ] **Step 3:** `npm run build`
- [ ] **Step 4:** Commit `refactor: clean up homepage, remove legacy code`

---

## Phase 3 : Page Biographie

### Task 3.1 : Creer la page Biographie complete

**Files:**
- Modify: `src/app/biographie/page.tsx`
- Modify: `src/components/Timeline.tsx` (adapter au nouveau design)

- [ ] **Step 1:** Lire les fichiers actuels
- [ ] **Step 2:** Hero : image `bio-hero.jpg`, titre "RICOUNE", baseline "L'artiste incontournable des scenes festives"
- [ ] **Step 3:** Citation : bloc stylise "La musique, c'est le partage..."
- [ ] **Step 4:** Histoire : titre "De Montpellier aux scenes festives", 2 blocs texte
- [ ] **Step 5:** Timeline moments cles : 1963, 1983, 1988, 2001, 2007 (adapter le composant Timeline.tsx)
- [ ] **Step 6:** Section Philosophie
- [ ] **Step 7:** CTA : bouton "Voir les prochaines dates" → /concerts
- [ ] **Step 8:** Verifier responsive + charte couleurs
- [ ] **Step 9:** `npm run build`
- [ ] **Step 10:** Commit `feat: redesign biography page per CDC`

---

## Phase 4 : Page Albums

### Task 4.1 : Refondre la page Albums

**Files:**
- Modify: `src/app/albums/page.tsx`
- Modify: `src/data/albums.ts` — Mettre a jour les coverUrl vers les nouveaux assets
- Modify: `src/app/albums/[slug]/page.tsx` — Adapter au nouveau design
- Modify: `src/app/albums/[slug]/AlbumDetailClient.tsx`

- [ ] **Step 1:** Mettre a jour `albums.ts` : coverUrl pointant vers `/images/albums/...`
- [ ] **Step 2:** Page Albums : grille de jaquettes carrees, titre + annee sous chaque jaquette
- [ ] **Step 3:** Clic → popup/modal avec liens plateformes (Spotify, YouTube, etc.)
- [ ] **Step 4:** Aucune video sur cette page, jaquettes intouchables
- [ ] **Step 5:** Responsive + charte couleurs
- [ ] **Step 6:** `npm run build`
- [ ] **Step 7:** Commit `feat: redesign albums page with square covers and platform links`

---

## Phase 5 : Page Videos

### Task 5.1 : Refondre la page Videos

**Files:**
- Modify: `src/app/videos/page.tsx`

- [ ] **Step 1:** Structure : Titre "Videos" → Video a la une (grand format iframe YouTube)
- [ ] **Step 2:** Section "Clips officiels" : grille 3/2/1 colonnes
- [ ] **Step 3:** Section "Extraits live" : grille avec badge "Live", thumbnails YouTube
- [ ] **Step 4:** CTA : "Vous aimez l'ambiance ?" → "Voir les prochaines dates" → /concerts
- [ ] **Step 5:** Hover zoom + icone play sur chaque thumbnail
- [ ] **Step 6:** Videos en popup/modal au clic (pas navigation vers YouTube)
- [ ] **Step 7:** Responsive + fond integre au degrade
- [ ] **Step 8:** `npm run build`
- [ ] **Step 9:** Commit `feat: redesign videos page with clips/lives separation`

---

## Phase 6 : Page Concerts (avec back-office)

### Task 6.1 : Refondre la page Concerts publique

**Files:**
- Modify: `src/app/concerts/page.tsx`
- Modify: `src/data/concerts.ts` — Migrer vers Supabase fetch

- [ ] **Step 1:** Titre "Concerts & Dates"
- [ ] **Step 2:** Filtres : Tous (actif par defaut) / En solo / En groupe
- [ ] **Step 3:** Carte concert : bloc gauche (jour/mois/annee), centre (ville/lieu), droite (heure/type badge)
- [ ] **Step 4:** Ligne secondaire optionnelle : adresse + telephone
- [ ] **Step 5:** Tri automatique par date croissante
- [ ] **Step 6:** Masquer concerts passes (ou section separee "Concerts passes")
- [ ] **Step 7:** CTA bas : "Vous souhaitez privatiser Ricoune ?" → "Demander un devis"
- [ ] **Step 8:** Responsive
- [ ] **Step 9:** `npm run build`
- [ ] **Step 10:** Commit `feat: redesign concerts page with new card layout and filters`

### Task 6.2 : API CRUD Concerts (back-office)

**Files:**
- Create: `src/app/api/concerts/route.ts` — GET all + POST new
- Create: `src/app/api/concerts/[id]/route.ts` — PUT + DELETE
- Create: `src/lib/validations/concerts.ts` — Schema Zod

- [ ] **Step 1:** Schema Zod pour concert (date, heure, ville, lieu, type, adresse?, telephone?)
- [ ] **Step 2:** GET /api/concerts — Fetch depuis Supabase, tri par date
- [ ] **Step 3:** POST /api/concerts — Validation Zod + insert Supabase
- [ ] **Step 4:** PUT /api/concerts/[id] — Update
- [ ] **Step 5:** DELETE /api/concerts/[id] — Delete
- [ ] **Step 6:** `npm run build`
- [ ] **Step 7:** Commit `feat: add concerts CRUD API with Zod validation`

---

## Phase 7 : Page Photos

### Task 7.1 : Refondre la page Photos

**Files:**
- Modify: `src/app/photos/page.tsx`
- Modify: `src/components/Lightbox.tsx` — Adapter au design

- [ ] **Step 1:** Grille 3/2/1 colonnes (desktop/tablette/mobile)
- [ ] **Step 2:** Photos fournies (`photos-01` a `photos-05`) + data existante
- [ ] **Step 3:** Lightbox au clic (navigation prev/next, fermeture)
- [ ] **Step 4:** CTA : "Vous souhaitez programmer Ricoune ?" → "Demander un devis" → /professionnels/demande-de-devis
- [ ] **Step 5:** Charte couleurs, pas de texte superflu
- [ ] **Step 6:** `npm run build`
- [ ] **Step 7:** Commit `feat: redesign photos page with lightbox and CTA`

---

## Phase 8 : Pages Professionnels (hub + 3 sous-pages)

### Task 8.1 : Hub Professionnels

**Files:**
- Modify: `src/app/professionnels/page.tsx`

- [ ] **Step 1:** 3 cartes : Nos formules → /professionnels/formules, Demander un devis → /professionnels/demande-de-devis, Photos HD → /professionnels/photos-hd
- [ ] **Step 2:** Design coherent avec charte
- [ ] **Step 3:** Commit `feat: redesign pro hub with 3 cards`

### Task 8.2 : Page Formules

**Files:**
- Modify: `src/app/professionnels/formules/page.tsx`

- [ ] **Step 1:** Fond photo concert (`home-concert-scene.jpg`) + overlay sombre
- [ ] **Step 2:** 2 cartes centrees :
  - Formule complete : Sur devis, Concert 1h30, 7 musiciens, Fiche technique (lien PDF `/documents/fiche-technique-groupe.pdf` target=_blank)
  - Cocktail/Show case : Sur devis, Ideal cocktail, Sono fournie sauf hors Occitanie, Fiche technique (lien PDF `/documents/fiche-technique-solo.pdf` target=_blank)
- [ ] **Step 3:** Bouton "Demander un devis" sur chaque carte + bouton global bas de page
- [ ] **Step 4:** `npm run build`
- [ ] **Step 5:** Commit `feat: redesign formulas page with PDF links`

### Task 8.3 : Page Demande de Devis

**Files:**
- Modify: `src/app/professionnels/demande-de-devis/page.tsx`
- Modify: `src/app/api/devis/route.ts` — Adapter validation
- Create: `src/lib/validations/devis.ts` — Schema Zod

- [ ] **Step 1:** Schema Zod strict :
  - nom* (string), prenom* (string), email* (email), telephone (string?)
  - type_evenement (enum obligatoire), date_souhaitee (string?), lieu (string?)
  - formule (enum: "Formule complete" | "Cocktail / Show case" | "Je ne sais pas encore")
  - message* (string)
- [ ] **Step 2:** Formulaire strict CDC :
  - L1: Nom + Prenom
  - L2: Email + Telephone
  - L3: Type evenement (dropdown avec "-- Selectionnez --")
  - L4: Date (calendrier jj/mm/aaaa) + Lieu/Ville
  - L5: Formule (radio buttons)
  - L6: Message/Precisions (textarea)
- [ ] **Step 3:** Bouton "Envoyer la demande" — ROUGE #C0392B (exception CDC)
- [ ] **Step 4:** Connecter au POST /api/devis avec validation Zod
- [ ] **Step 5:** Feedback utilisateur (succes/erreur)
- [ ] **Step 6:** `npm run build`
- [ ] **Step 7:** Commit `feat: redesign quote form with strict CDC fields and red CTA`

### Task 8.4 : Page Photos HD

**Files:**
- Modify: `src/app/professionnels/photos-hd/page.tsx`

- [ ] **Step 1:** Cartes avec apercu complet (object-fit: contain, pas cover) :
  - `visuel-01.png` — Affiche verre a ballon
  - `visuel-02.jpeg` — Affiche Ricoune en concert
  - Nom lisible + format + bouton telechargement
- [ ] **Step 2:** CTA bas : "Organisez votre evenement avec Ricoune" → "Demander un devis"
- [ ] **Step 3:** Fond : photo concert bloc CTA + overlay sombre
- [ ] **Step 4:** `npm run build`
- [ ] **Step 5:** Commit `feat: redesign HD photos page with download cards`

---

## Phase 9 : Page Contact

### Task 9.1 : Refondre la page Contact

**Files:**
- Modify: `src/app/contact/page.tsx`
- Modify: `src/app/api/contact/route.ts` — Adapter les champs
- Create: `src/lib/validations/contact.ts` — Schema Zod

- [ ] **Step 1:** Hero : titre "Contact", sous-titre "Besoin d'informations ou d'organiser un evenement ?"
- [ ] **Step 2:** Formulaire 2 colonnes :
  - Gauche : Nom*, Prenom*, Email*, Telephone?, Type evenement?, Date?, Ville?, Message*
  - SUPPRIME : champ "Formule souhaitee"
  - Mention RGPD sous le formulaire
  - Bouton "ENVOYER LA DEMANDE"
- [ ] **Step 3:** Colonne droite :
  - Reseaux sociaux (Spotify, Instagram, TikTok, Facebook, YouTube, Apple Music, Deezer)
  - Lien "Voir les formules" → /professionnels/formules
  - Localisation : "Montpellier & Sud de la France"
- [ ] **Step 4:** Schema Zod + adapter l'API route
- [ ] **Step 5:** Connecter formulaire → API → Supabase + email Resend
- [ ] **Step 6:** `npm run build`
- [ ] **Step 7:** Commit `feat: redesign contact page with sidebar and updated fields`

---

## Phase 10 : RGPD + Mentions Legales

### Task 10.1 : Pages legales

**Files:**
- Create: `src/app/mentions-legales/page.tsx`
- Create: `src/app/politique-confidentialite/page.tsx`

- [ ] **Step 1:** Lire RGPD.pdf fourni
- [ ] **Step 2:** Creer page mentions legales avec contenu du PDF
- [ ] **Step 3:** Creer page politique confidentialite
- [ ] **Step 4:** Ajouter bandeau cookies (composant simple)
- [ ] **Step 5:** Verifier liens depuis le footer
- [ ] **Step 6:** `npm run build`
- [ ] **Step 7:** Commit `feat: add legal pages and cookie banner per RGPD`

---

## Phase 11 : Polish & Validation finale

### Task 11.1 : Verification globale responsive

- [ ] **Step 1:** Tester chaque page en desktop (1440px), tablette (768px), mobile (375px)
- [ ] **Step 2:** Corriger tout debordement horizontal
- [ ] **Step 3:** Verifier toutes les images (pas de deformation, pas de filtres)
- [ ] **Step 4:** Commit `fix: responsive adjustments across all pages`

### Task 11.2 : Verification E2E liens et formulaires

- [ ] **Step 1:** Verifier CHAQUE lien de navigation (menu, footer, CTAs)
- [ ] **Step 2:** Verifier les 2 formulaires (contact + devis) : validation + envoi + feedback
- [ ] **Step 3:** Verifier les PDFs (fiches techniques) s'ouvrent dans un nouvel onglet
- [ ] **Step 4:** Verifier les boutons Spotify/YouTube ouvrent les bonnes URLs
- [ ] **Step 5:** Verifier que la page Boutique n'existe plus et n'est referencee nulle part
- [ ] **Step 6:** Verifier que la newsletter n'apparait nulle part
- [ ] **Step 7:** `npm run build` sans erreur
- [ ] **Step 8:** Commit `fix: verify all links, forms and navigation end-to-end`

### Task 11.3 : Verification design system

- [ ] **Step 1:** Verifier le gradient global sur TOUTES les pages
- [ ] **Step 2:** Verifier les cartes semi-transparentes (rgba(26,34,68,0.82))
- [ ] **Step 3:** Verifier les boutons jaunes partout SAUF page devis (rouge)
- [ ] **Step 4:** Verifier la typo (Oswald titres, Inter body, Raleway accents)
- [ ] **Step 5:** Verifier les icones sociales (meme fond pour tous)
- [ ] **Step 6:** Commit `fix: ensure design system consistency across all pages`

---

## Regles de validation pour les agents

### Agent Architecte — Checklist par page
Pour chaque page livree, verifier :
- [ ] Gradient bleu→jaune en fond (pas de fond sombre plein)
- [ ] Cartes semi-transparentes rgba(26,34,68,0.82)
- [ ] Boutons jaunes #F2C918 (sauf devis = rouge #C0392B)
- [ ] Menu strict : Accueil | Concerts | Albums | Videos | Photos | Biographie | Professionnels | Contact
- [ ] Pas de Boutique ni Newsletter
- [ ] Typos Oswald/Inter/Raleway
- [ ] Images non deformees, pas de filtres
- [ ] Logo officiel non modifie
- [ ] Mobile-first responsive
- [ ] Texte francais correct (accents, apostrophes)

### Agent Review E2E — Checklist fonctionnelle
Pour chaque livraison, verifier :
- [ ] Chaque bouton a une action (lien, submit, ou modal)
- [ ] Chaque formulaire envoie reellement (API + Supabase + email)
- [ ] Chaque lien de navigation pointe vers une page existante
- [ ] Chaque CTA redirige vers la bonne destination
- [ ] Les PDFs s'ouvrent dans un nouvel onglet
- [ ] Les liens Spotify/YouTube/reseaux menent aux bonnes URLs
- [ ] La lightbox fonctionne (ouverture, navigation, fermeture)
- [ ] Les filtres concerts fonctionnent (Tous/Solo/Groupe)
- [ ] Les concerts passes sont masques
- [ ] Aucune page 404 accessible depuis la navigation
- [ ] `npm run build` passe sans erreur
