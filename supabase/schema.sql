-- Ricoune Website Database Schema

-- Albums
CREATE TABLE albums (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  year INTEGER NOT NULL,
  description TEXT,
  cover_url TEXT,
  tracklist JSONB DEFAULT '[]',
  streaming_links JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Concerts
CREATE TABLE concerts (
    id                UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
    date              DATE        NOT NULL,
    city              TEXT        NOT NULL,
    department        TEXT,
    postal_code       TEXT,
    venue             TEXT        NOT NULL,
    maps_url          TEXT,
    time              TEXT        NOT NULL,
    type              TEXT        CHECK (type IN ('solo', 'groupe')) NOT NULL,
    all_ages          BOOLEAN     DEFAULT TRUE,
    infos_speciales   TEXT,
    cancelled         BOOLEAN     DEFAULT FALSE NOT NULL,
    cancellation_note TEXT,
    created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Videos
CREATE TABLE videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  youtube_url TEXT NOT NULL,
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Photos
CREATE TABLE photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  alt_text TEXT,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Messages
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Devis (Quote) Requests
CREATE TABLE devis_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  email TEXT NOT NULL,
  telephone TEXT,
  type_evenement TEXT,
  date_souhaitee DATE,
  lieu TEXT,
  formule TEXT,
  message TEXT,
  budget TEXT,
  status TEXT DEFAULT 'nouveau' CHECK (status IN ('nouveau', 'en_cours', 'traite', 'refuse')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE concerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE devis_requests ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read albums" ON albums FOR SELECT USING (true);
CREATE POLICY "Public read concerts" ON concerts FOR SELECT USING (true);
CREATE POLICY "Public read videos" ON videos FOR SELECT USING (true);
CREATE POLICY "Public read photos" ON photos FOR SELECT USING (true);

-- Public insert policies (for forms)
CREATE POLICY "Public insert contact" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert devis" ON devis_requests FOR INSERT WITH CHECK (true);

-- Admin policies : accès complet pour utilisateurs authentifiés (back-office)
-- Note : seuls les comptes Supabase Auth créés manuellement auront ce rôle.
-- Si l'inscription publique est ouverte un jour, raffiner avec auth.uid() IN (admin_uids).

CREATE POLICY "Admin full access albums" ON albums
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access concerts" ON concerts
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access videos" ON videos
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access photos" ON photos
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access contact_messages" ON contact_messages
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access devis_requests" ON devis_requests
  FOR ALL USING (auth.role() = 'authenticated');

-- ===========================================================================
-- Postgres GRANTs : prerequis pour PostgREST
-- ===========================================================================
-- Sans ces GRANTs, le service_role recoit "permission denied" (code 42501)
-- sur toute operation CRUD via l'API REST de Supabase, MEME SI les RLS
-- policies l'autorisent. RLS et GRANTs sont deux couches independantes.
--
-- Note : pour anon et authenticated, les RLS policies suffisent (cf. les
-- "Public insert policies" et "Admin policies" plus haut). Mais service_role
-- necessite explicitement les GRANTs Postgres.
--
-- Incident a l'origine de cet ajout : 2026-04-30, sprint Concerts C1.4 -
-- migration impossible avec 42501 sur la table concerts.
-- ===========================================================================

GRANT SELECT, INSERT, UPDATE, DELETE ON public.albums           TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.concerts         TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_messages TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.devis_requests   TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.photos           TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.videos           TO service_role;

-- Note : RLS policies + GRANTs Postgres sont 2 couches independantes.
-- Sans ces GRANTs explicites, le role authenticated recoit "permission denied"
-- (code 42501) meme si les RLS policies l'autorisent.
-- Incident detecte le 30/04/2026 14h en production : page /admin/concerts
-- affichait 0 concerts car getConcerts() recevait une erreur 42501.

GRANT SELECT, INSERT, UPDATE, DELETE ON public.albums           TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.concerts         TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.devis_requests   TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.photos           TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.videos           TO authenticated;
