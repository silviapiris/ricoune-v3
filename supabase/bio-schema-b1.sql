-- ════════════════════════════════════════════════════════════════════════════
-- BIO SCHEMA B1 — Sprint Bio admin (mai 2026)
-- Projet : ricoune-v3
-- À exécuter dans Supabase SQL Editor en UNE SEULE PASSE (tout sélectionner → Run)
-- Script idempotent : ré-exécutable sans erreur
-- ════════════════════════════════════════════════════════════════════════════
--
-- Périmètre de ce fichier :
--   1.  TABLE bio_content (singleton)
--   2.  TABLE bio_timeline_events
--   3.  INDEX
--   4.  TRIGGERS updated_at
--   5.  RLS POLICIES
--   6.  GRANTS (anon, authenticated, service_role)
--   7.  RPC reorder_timeline_events
--   8.  SEED bio_content (données de fr.ts — 1 ligne)
--   9.  SEED bio_timeline_events (11 événements de fr.ts)
--  10.  VÉRIFICATIONS (requêtes commentées à lancer manuellement)
--
-- ⚠️  NE PAS exécuter via la CLI Supabase. SQL Editor uniquement.
-- ⚠️  Aucun fichier Next.js n'est modifié par ce script.
-- ════════════════════════════════════════════════════════════════════════════


-- ─────────────────────────────────────────────────────────────────────────────
-- 1. TABLE bio_content (singleton — une seule ligne possible)
-- ─────────────────────────────────────────────────────────────────────────────
-- Mécanisme singleton : colonne `singleton BOOLEAN DEFAULT TRUE` +
-- UNIQUE(singleton) + CHECK(singleton = TRUE) interdisent toute 2ème ligne.

CREATE TABLE IF NOT EXISTS bio_content (
  id                    UUID        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  singleton             BOOLEAN     NOT NULL DEFAULT TRUE,
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Bloc Hero
  hero_subtitle         TEXT,
  hero_image_url        TEXT,

  -- Bloc Citation
  quote_text            TEXT,

  -- Bloc Histoire
  history_title         TEXT,
  history_paragraph_1   TEXT,
  history_paragraph_2   TEXT,
  portrait_image_url    TEXT,
  portrait_alt          TEXT,

  -- Bloc Frise (titre de section uniquement — événements dans bio_timeline_events)
  timeline_title        TEXT,

  -- Bloc Photo Strip
  strip_label           TEXT,
  strip_title           TEXT,
  strip_photo_1_url     TEXT,
  strip_photo_2_url     TEXT,
  strip_photo_3_url     TEXT,
  strip_cta_label       TEXT,

  -- Bloc Philosophie
  philosophy_text       TEXT,

  -- Bloc CTA double
  cta_text              TEXT,
  cta_button_1_label    TEXT,
  cta_button_2_label    TEXT,

  CONSTRAINT bio_content_one_row        UNIQUE (singleton),
  CONSTRAINT bio_content_singleton_true CHECK  (singleton = TRUE)
);


-- ─────────────────────────────────────────────────────────────────────────────
-- 2. TABLE bio_timeline_events
-- ─────────────────────────────────────────────────────────────────────────────
-- Pas de UNIQUE sur sort_order : l'intégrité est gérée par la RPC
-- reorder_timeline_events (section 7). Une contrainte UNIQUE déférable
-- serait nécessaire pour les swaps transactionnels — on évite cette
-- complexité inutile avec la RPC full-reorder.

CREATE TABLE IF NOT EXISTS bio_timeline_events (
  id          UUID        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  year        TEXT        NOT NULL,           -- texte libre : "1963", "Années 90"...
  description TEXT        NOT NULL,
  sort_order  INTEGER     NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ─────────────────────────────────────────────────────────────────────────────
-- 3. INDEX
-- ─────────────────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_bio_timeline_sort
  ON bio_timeline_events(sort_order ASC);


-- ─────────────────────────────────────────────────────────────────────────────
-- 4. TRIGGERS updated_at
-- ─────────────────────────────────────────────────────────────────────────────
-- Note : schema.sql existant ne contient aucune fonction trigger générique
-- réutilisable. On crée 2 fonctions spécifiques avec CREATE OR REPLACE.

CREATE OR REPLACE FUNCTION update_bio_content_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION update_bio_timeline_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Triggers (DROP IF EXISTS pour idempotence)
DROP TRIGGER IF EXISTS bio_content_updated_at ON bio_content;
CREATE TRIGGER bio_content_updated_at
  BEFORE UPDATE ON bio_content
  FOR EACH ROW EXECUTE FUNCTION update_bio_content_timestamp();

DROP TRIGGER IF EXISTS bio_timeline_updated_at ON bio_timeline_events;
CREATE TRIGGER bio_timeline_updated_at
  BEFORE UPDATE ON bio_timeline_events
  FOR EACH ROW EXECUTE FUNCTION update_bio_timeline_timestamp();


-- ─────────────────────────────────────────────────────────────────────────────
-- 5. RLS POLICIES
-- ─────────────────────────────────────────────────────────────────────────────
-- DROP POLICY IF EXISTS avant chaque CREATE POLICY pour idempotence.
-- (CREATE POLICY n'est pas idempotent nativement sous PostgreSQL.)

ALTER TABLE bio_content         ENABLE ROW LEVEL SECURITY;
ALTER TABLE bio_timeline_events ENABLE ROW LEVEL SECURITY;

-- bio_content
DROP POLICY IF EXISTS "Public read bio_content"        ON bio_content;
DROP POLICY IF EXISTS "Admin full access bio_content"  ON bio_content;

CREATE POLICY "Public read bio_content"
  ON bio_content
  FOR SELECT
  USING (true);

CREATE POLICY "Admin full access bio_content"
  ON bio_content
  FOR ALL
  USING (auth.role() = 'authenticated');

-- bio_timeline_events
DROP POLICY IF EXISTS "Public read bio_timeline_events"       ON bio_timeline_events;
DROP POLICY IF EXISTS "Admin full access bio_timeline_events" ON bio_timeline_events;

CREATE POLICY "Public read bio_timeline_events"
  ON bio_timeline_events
  FOR SELECT
  USING (true);

CREATE POLICY "Admin full access bio_timeline_events"
  ON bio_timeline_events
  FOR ALL
  USING (auth.role() = 'authenticated');


-- ─────────────────────────────────────────────────────────────────────────────
-- 6. GRANTS
-- ─────────────────────────────────────────────────────────────────────────────
-- Obligatoire : cf. incident 42501 du 30/04/2026 (Sprint Concerts C1.4).
-- Sans ces GRANTs explicites, PostgREST renvoie "permission denied" (42501)
-- même si les RLS policies autorisent l'opération.

-- Rôle authenticated (admin connecté)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bio_content         TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bio_timeline_events TO authenticated;

-- Rôle service_role (utilisé par les Server Actions Next.js côté serveur)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bio_content         TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bio_timeline_events TO service_role;

-- Rôle anon (lecture publique — page /biographie accessible sans auth)
GRANT SELECT ON public.bio_content         TO anon;
GRANT SELECT ON public.bio_timeline_events TO anon;


-- ─────────────────────────────────────────────────────────────────────────────
-- 7. RPC reorder_timeline_events
-- ─────────────────────────────────────────────────────────────────────────────
-- Signature : reorder_timeline_events(event_ids uuid[]) RETURNS void
-- Reçoit le tableau complet des UUIDs dans le nouvel ordre voulu.
-- Réassigne tous les sort_orders en une transaction (atomique).
-- Appelée depuis la Server Action reorderTimeline() dans B4.
--
-- Pattern inspiré du moveVideo() du Sprint Vidéos, mais plus robuste :
-- move_video fait 2 UPDATE en parallèle (swap) ; cette RPC réécrit
-- tous les sort_orders en une passe → pas de collision possible.

CREATE OR REPLACE FUNCTION reorder_timeline_events(event_ids uuid[])
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  i integer;
BEGIN
  FOR i IN 1..array_length(event_ids, 1) LOOP
    UPDATE bio_timeline_events
    SET    sort_order = i - 1   -- 0-indexé, cohérent avec sort_order vidéos/albums
    WHERE  id = event_ids[i];
  END LOOP;
END;
$$;

GRANT EXECUTE ON FUNCTION reorder_timeline_events(uuid[]) TO authenticated;
GRANT EXECUTE ON FUNCTION reorder_timeline_events(uuid[]) TO service_role;


-- ─────────────────────────────────────────────────────────────────────────────
-- 8. SEED bio_content
-- ─────────────────────────────────────────────────────────────────────────────
-- Source : src/locales/fr.ts — section biography (lignes 218–246)
-- Textes reproduits au caractère près (apostrophes échappées en '')
--
-- Mapping fr.ts → colonne :
--   biography.subtitle       → hero_subtitle
--   biography.quote          → quote_text
--   biography.historyTitle   → history_title
--   biography.historyP1      → history_paragraph_1
--   biography.historyP2      → history_paragraph_2
--   biography.bioPortraitAlt → portrait_alt
--   biography.keyMomentsTitle→ timeline_title
--   biography.stripLabel     → strip_label
--   biography.stripTitle     → strip_title
--   biography.stripCta       → strip_cta_label
--   biography.philosophy     → philosophy_text
--   biography.ctaText        → cta_text
--   biography.viewDates      → cta_button_1_label
--   biography.requestQuote   → cta_button_2_label
--
-- hero_image_url    : NULL — fallback local /images/bio/bio-hero.webp (B2)
--                    L'admin uploadera dans le bucket "bio" lors de B3.
-- portrait_image_url: NULL — fallback local /images/bio/ricoune-bio.webp (B2)
-- strip_photo_X_url : URLs Supabase Storage (bucket "photos") fournies par l'admin.
--
-- ON CONFLICT (singleton) DO NOTHING : si la ligne existe déjà, le re-run
-- ne crée pas de doublon (garantie idempotence).

INSERT INTO bio_content (
  hero_subtitle,
  hero_image_url,
  quote_text,
  history_title,
  history_paragraph_1,
  history_paragraph_2,
  portrait_image_url,
  portrait_alt,
  timeline_title,
  strip_label,
  strip_title,
  strip_photo_1_url,
  strip_photo_2_url,
  strip_photo_3_url,
  strip_cta_label,
  philosophy_text,
  cta_text,
  cta_button_1_label,
  cta_button_2_label
)
VALUES (
  -- hero_subtitle (fr.ts: biography.subtitle)
  'L''artiste incontournable des scènes festives',

  -- hero_image_url : NULL — uploadé par l'admin dans B3 (bucket "bio")
  NULL,

  -- quote_text (fr.ts: biography.quote)
  'La musique, c''est le partage. Je chante pour les gens, avec les gens.',

  -- history_title (fr.ts: biography.historyTitle)
  'De Montpellier aux scènes festives',

  -- history_paragraph_1 (fr.ts: biography.historyP1)
  'Né à Montpellier en 1963, Ricoune grandit bercé par la musique populaire du Sud. Très tôt, il découvre sa passion pour la scène et le contact avec le public. En 1983, il forme son premier groupe et commence à écumer les fêtes de village, les bodegas et les férias qui font vibrer l''Occitanie.',

  -- history_paragraph_2 (fr.ts: biography.historyP2)
  'Au fil des années, Ricoune affine son style unique : un mélange de chansons festives, de reprises populaires et de compositions originales qui mettent tout le monde d''accord. Son authenticité et son énergie sur scène en font rapidement une figure incontournable du circuit festif du Sud de la France.',

  -- portrait_image_url : NULL — uploadé par l'admin dans B3 (bucket "bio")
  NULL,

  -- portrait_alt (fr.ts: biography.bioPortraitAlt)
  'Portrait de Ricoune, artiste auteur-compositeur',

  -- timeline_title (fr.ts: biography.keyMomentsTitle)
  'Moments clés',

  -- strip_label (fr.ts: biography.stripLabel)
  'EN SCÈNE',

  -- strip_title (fr.ts: biography.stripTitle)
  'Toujours là où ça vibre',

  -- strip_photo_1_url : URL Supabase Storage (bucket "photos") validée
  'https://ulwyypcxocpudwxkgceo.supabase.co/storage/v1/object/public/photos/2a01c934-3c7f-4adb-b36c-c68619a1ad67-800x665.jpg',

  -- strip_photo_2_url : URL Supabase Storage (bucket "photos") validée
  'https://ulwyypcxocpudwxkgceo.supabase.co/storage/v1/object/public/photos/3O8A5428-786x1000.jpg',

  -- strip_photo_3_url : URL Supabase Storage (bucket "photos") validée
  'https://ulwyypcxocpudwxkgceo.supabase.co/storage/v1/object/public/photos/3O8A5540-800x462.jpg',

  -- strip_cta_label (fr.ts: biography.stripCta)
  'Voir toute la galerie',

  -- philosophy_text (fr.ts: biography.philosophy)
  'Pour Ricoune, la musique n''est pas un métier, c''est un art de vivre. Libre, authentique, sans artifice. Sur scène, il n''y a pas de barrière entre l''artiste et son public. Chaque concert est un moment de partage, une célébration collective où tout le monde chante, danse et oublie le quotidien.',

  -- cta_text (fr.ts: biography.ctaText)
  'Envie de vivre l''expérience Ricoune en live ?',

  -- cta_button_1_label (fr.ts: biography.viewDates)
  'Voir les prochaines dates',

  -- cta_button_2_label (fr.ts: biography.requestQuote)
  'Demander un devis'
)
ON CONFLICT (singleton) DO NOTHING;


-- ─────────────────────────────────────────────────────────────────────────────
-- 9. SEED bio_timeline_events (11 événements)
-- ─────────────────────────────────────────────────────────────────────────────
-- Source : src/locales/fr.ts — section biography.timeline (lignes 233–245)
-- 11 événements reproduits au caractère près.
-- Les guillemets doubles (") ne nécessitent pas d'échappement en SQL
-- (seules les apostrophes simples ' doivent être doublées en '').
--
-- Idempotence : le bloc INSERT ne s'exécute QUE si la table est vide.
-- Si la table contient déjà des lignes (re-run), le WHERE NOT EXISTS
-- bloque l'insertion et évite les doublons.
-- sort_order démarre à 0 (cohérent avec sort_order vidéos : 0, 1, 2...).

INSERT INTO bio_timeline_events (year, description, sort_order)
SELECT v.year, v.description, v.sort_order
FROM (
  VALUES
    ('1963', 'Naissance à Saint-Drézéry (près de Montpellier)',                    0),
    ('1983', 'Fonde son premier groupe "Génération 83"',                            1),
    ('1993', 'Le groupe devient "Ricoune et les Counass"',                          2),
    ('1994', 'Premier album "Le Chat de Jourdan"',                                  3),
    ('2001', 'Naissance du nom de scène "Ricoune" + album "Sans interdits"',        4),
    ('2013', 'Album "Accent du Sud" + tube "Dans un verre à ballon"',               5),
    ('2016', '"Le Best Of, 20 ans" (anniversaire de carrière)',                     6),
    ('2021', 'Album "Quand un fainéant se rebelle"',                                7),
    ('2023', 'Single "Las Terrenas"',                                               8),
    ('2024', 'Single "La Belle Partouze"',                                          9),
    ('2025', 'Tournée des ferias (Béziers + villages)',                            10)
) AS v(year, description, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM bio_timeline_events);


-- ─────────────────────────────────────────────────────────────────────────────
-- 10. VÉRIFICATIONS POST-EXÉCUTION
-- ─────────────────────────────────────────────────────────────────────────────
-- Lancer ces requêtes MANUELLEMENT dans le SQL Editor après l'exécution
-- du script pour valider que tout s'est bien passé.

-- ✅ Doit retourner 1
-- SELECT count(*) AS nb_lignes_bio_content FROM bio_content;

-- ✅ Doit retourner 11
-- SELECT count(*) AS nb_evenements FROM bio_timeline_events;

-- ✅ Doit afficher les 11 années dans l'ordre (1963 → 2025)
-- SELECT year, sort_order, LEFT(description, 50) AS description_debut
-- FROM bio_timeline_events
-- ORDER BY sort_order;

-- ✅ Doit afficher les textes seedés
-- SELECT hero_subtitle, quote_text, history_title, timeline_title
-- FROM bio_content;

-- ✅ Doit afficher les URLs strip (non NULL) et les URLs images (NULL)
-- SELECT
--   hero_image_url,
--   portrait_image_url,
--   LEFT(strip_photo_1_url, 60) AS strip_1,
--   LEFT(strip_photo_2_url, 60) AS strip_2,
--   LEFT(strip_photo_3_url, 60) AS strip_3
-- FROM bio_content;

-- ✅ Test contrainte singleton : doit lever une erreur (duplicate key)
-- INSERT INTO bio_content DEFAULT VALUES;

-- ✅ Vérifier que les GRANTs sont actifs (depuis un rôle anon)
-- SET ROLE anon;
-- SELECT hero_subtitle FROM bio_content;
-- RESET ROLE;

-- ════════════════════════════════════════════════════════════════════════════
-- FIN DU SCRIPT B1
-- Prochain sprint : B2 — brancher /biographie sur Supabase (lecture seule)
-- ════════════════════════════════════════════════════════════════════════════
