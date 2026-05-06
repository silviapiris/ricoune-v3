-- ============================================================================
-- bio-schema-b2-i18n.sql
-- Migration i18n du module Bio (ajout colonnes _en pour bilinguisation FR/EN)
-- Date : 06/05/2026
-- Sprint : Fix bug i18n module Bio (Plan B - sans Microsoft Translator)
-- ============================================================================
--
-- Cette migration ajoute 16 colonnes _en (14 sur bio_content + 2 sur
-- bio_timeline_events) pour permettre l'affichage bilingue des contenus
-- Bio sur les pages publiques.
--
-- Toutes les colonnes sont nullables. La page publique implémente un
-- pattern de fallback : si <champ>_en est NULL ou vide, c'est la
-- version FR qui s'affiche.
--
-- Microsoft Translator F0 sera activé dans une session future pour
-- automatiser le remplissage des colonnes _en au save admin.
-- ============================================================================

-- bio_content : 14 colonnes _en
ALTER TABLE bio_content
  ADD COLUMN IF NOT EXISTS hero_subtitle_en        TEXT,
  ADD COLUMN IF NOT EXISTS quote_text_en           TEXT,
  ADD COLUMN IF NOT EXISTS history_title_en        TEXT,
  ADD COLUMN IF NOT EXISTS history_paragraph_1_en  TEXT,
  ADD COLUMN IF NOT EXISTS history_paragraph_2_en  TEXT,
  ADD COLUMN IF NOT EXISTS portrait_alt_en         TEXT,
  ADD COLUMN IF NOT EXISTS timeline_title_en       TEXT,
  ADD COLUMN IF NOT EXISTS strip_label_en          TEXT,
  ADD COLUMN IF NOT EXISTS strip_title_en          TEXT,
  ADD COLUMN IF NOT EXISTS strip_cta_label_en      TEXT,
  ADD COLUMN IF NOT EXISTS philosophy_text_en      TEXT,
  ADD COLUMN IF NOT EXISTS cta_text_en             TEXT,
  ADD COLUMN IF NOT EXISTS cta_button_1_label_en   TEXT,
  ADD COLUMN IF NOT EXISTS cta_button_2_label_en   TEXT;

-- bio_timeline_events : 2 colonnes _en
ALTER TABLE bio_timeline_events
  ADD COLUMN IF NOT EXISTS year_en        TEXT,
  ADD COLUMN IF NOT EXISTS description_en TEXT;

-- ============================================================================
-- Vérification post-exécution
-- ============================================================================
-- Pour vérifier que les colonnes ont bien été ajoutées, exécuter :
--
-- SELECT column_name, data_type, is_nullable
-- FROM information_schema.columns
-- WHERE table_name = 'bio_content' AND column_name LIKE '%_en'
-- ORDER BY column_name;
--
-- SELECT column_name, data_type, is_nullable
-- FROM information_schema.columns
-- WHERE table_name = 'bio_timeline_events' AND column_name LIKE '%_en'
-- ORDER BY column_name;
-- ============================================================================
