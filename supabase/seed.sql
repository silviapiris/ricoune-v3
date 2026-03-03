-- Ricoune Website Seed Data

-- ============================================
-- Albums
-- ============================================

INSERT INTO albums (title, slug, year, description, tracklist, streaming_links) VALUES
(
  'Quand un faineant se rebelle',
  'quand-un-faineant-se-rebelle',
  2021,
  NULL,
  '[]'::jsonb,
  '{"spotify": "https://open.spotify.com/artist/4NcNxqo5fOC2RGY2Jrx0On", "apple": "https://itunes.apple.com/fr/artist/ricoune/id78593832", "amazon": "https://www.amazon.fr/s?k=ricoune", "youtube": "https://www.youtube.com/channel/UC49kjqlusTVhH7hL_fT3MDg", "soundcloud": "https://soundcloud.com/ricouneofficial"}'::jsonb
),
(
  'Face B',
  'face-b',
  2017,
  NULL,
  '["On a le web a la maison", "A 60 a l''heure sur mon tracteur", "La goutte de trop", "Je passerai demain", "Le thym ou la catin", "Face B", "Ho fache de con", "Tous les amis de moi que j''ai", "Sauvons les glacons", "Le temps s''est arrete"]'::jsonb,
  '{"spotify": "https://open.spotify.com/artist/4NcNxqo5fOC2RGY2Jrx0On", "apple": "https://itunes.apple.com/fr/artist/ricoune/id78593832", "amazon": "https://www.amazon.fr/s?k=ricoune", "youtube": "https://www.youtube.com/channel/UC49kjqlusTVhH7hL_fT3MDg", "soundcloud": "https://soundcloud.com/ricouneofficial"}'::jsonb
),
(
  'Y faut etre gentil !',
  'y-faut-etre-gentil',
  2016,
  NULL,
  '[]'::jsonb,
  '{"spotify": "https://open.spotify.com/artist/4NcNxqo5fOC2RGY2Jrx0On", "apple": "https://itunes.apple.com/fr/artist/ricoune/id78593832", "amazon": "https://www.amazon.fr/s?k=ricoune", "youtube": "https://www.youtube.com/channel/UC49kjqlusTVhH7hL_fT3MDg", "soundcloud": "https://soundcloud.com/ricouneofficial"}'::jsonb
),
(
  'C''est l''ete',
  'cest-lete',
  2015,
  'CD Collector',
  '["Un ricard tube", "Mon petit village", "Ribeiro", "On a le web", "Taureaux cariclots", "Les voeux du Maire", "Quand une femme s''en va", "Nue t''es la sur la plage", "Jean-Pierre (Nouvelle version)", "L''homme qui remontait le temps", "C''est l''ete", "La crapola"]'::jsonb,
  '{"spotify": "https://open.spotify.com/artist/4NcNxqo5fOC2RGY2Jrx0On", "apple": "https://itunes.apple.com/fr/artist/ricoune/id78593832", "amazon": "https://www.amazon.fr/s?k=ricoune", "youtube": "https://www.youtube.com/channel/UC49kjqlusTVhH7hL_fT3MDg", "soundcloud": "https://soundcloud.com/ricouneofficial"}'::jsonb
),
(
  'Le Kukela',
  'le-kukela',
  2015,
  NULL,
  '["Le Kukela", "Es tout Pagat", "Montpellier la surdouee", "Jean Pierre", "On avais tous 20 ans", "Les Bagarres", "Les Langues de Peilles", "L''histoire de ma vie", "Babou"]'::jsonb,
  '{"spotify": "https://open.spotify.com/artist/4NcNxqo5fOC2RGY2Jrx0On", "apple": "https://itunes.apple.com/fr/artist/ricoune/id78593832", "amazon": "https://www.amazon.fr/s?k=ricoune", "youtube": "https://www.youtube.com/channel/UC49kjqlusTVhH7hL_fT3MDg", "soundcloud": "https://soundcloud.com/ricouneofficial"}'::jsonb
),
(
  'Le Best Of',
  'le-best-of',
  2015,
  NULL,
  '["Dans un verre a Ballon", "Le Couscoussier", "J''mapelle Pascal Carion", "Le Berger", "He Jacques", "La Vache", "Nicollin", "Les patates", "Maryse", "Parisien", "La Feria de Nimes", "Aquilou"]'::jsonb,
  '{"spotify": "https://open.spotify.com/artist/4NcNxqo5fOC2RGY2Jrx0On", "apple": "https://itunes.apple.com/fr/artist/ricoune/id78593832", "amazon": "https://www.amazon.fr/s?k=ricoune", "youtube": "https://www.youtube.com/channel/UC49kjqlusTVhH7hL_fT3MDg", "soundcloud": "https://soundcloud.com/ricouneofficial"}'::jsonb
),
(
  'Mets tes lunettes',
  'mets-tes-lunettes',
  2015,
  NULL,
  '["Le reggae Marseillais", "Jacques a dit", "Le Roi Arthur", "La ska''ac", "Est-ce ta fete", "Ta katie t''a quittee", "La feria c''est sacre", "Allez zizou", "A Marseille", "Champion de la chaise longue"]'::jsonb,
  '{"spotify": "https://open.spotify.com/artist/4NcNxqo5fOC2RGY2Jrx0On", "apple": "https://itunes.apple.com/fr/artist/ricoune/id78593832", "amazon": "https://www.amazon.fr/s?k=ricoune", "youtube": "https://www.youtube.com/channel/UC49kjqlusTVhH7hL_fT3MDg", "soundcloud": "https://soundcloud.com/ricouneofficial"}'::jsonb
),
(
  'Ricoune 20 Ans!',
  'ricoune-20-ans',
  2015,
  NULL,
  '["La Coupo Santo", "La loi du silence", "Toro de combat, toro de Royale", "Le roi Arthur m''a dit !!!", "Parisiens", "Le Gardian", "Les langues de peilles", "Histoire de ma vie", "Le rap des villes le rap des champs", "La Saint-Louis"]'::jsonb,
  '{"spotify": "https://open.spotify.com/artist/4NcNxqo5fOC2RGY2Jrx0On", "apple": "https://itunes.apple.com/fr/artist/ricoune/id78593832", "amazon": "https://www.amazon.fr/s?k=ricoune", "youtube": "https://www.youtube.com/channel/UC49kjqlusTVhH7hL_fT3MDg", "soundcloud": "https://soundcloud.com/ricouneofficial"}'::jsonb
);

-- ============================================
-- Concerts
-- ============================================

INSERT INTO concerts (date, city, department, venue, time, type, all_ages) VALUES
('2026-04-05', 'Saint Rome de Tarn', '12', 'Bar Le Languedoc', '12:00', 'solo', TRUE),
('2026-04-18', 'Port Saint Louis du Rhone', '13', 'Salle Marcel Pagnol', '19:00', 'solo', TRUE),
('2026-05-07', 'Lattes', '34', 'Mas du cheval', '23:00', 'solo', TRUE),
('2026-05-08', 'Codolet', '30', 'Village de Codolet', '12:00', 'solo', TRUE),
('2026-05-25', 'St Aunes', '34', 'Village de St Aunes', '12:00', 'solo', TRUE),
('2026-06-05', 'Galargues', '34', 'Village de Galargues', '19:00', 'solo', TRUE),
('2026-06-12', 'Meynes', '30', 'Cave de Pazac', '19:00', 'solo', TRUE),
('2026-07-03', 'Bagnols sur Ceze', '30', 'Parc Rimbaud', '21:00', 'groupe', TRUE),
('2026-07-12', 'Aniane', '34', 'Village de Aniane', '19:00', 'solo', TRUE),
('2026-07-17', 'Adissan', '34', 'Village de Adissan', '19:00', 'solo', TRUE),
('2026-07-19', 'Port Saint Louis du Rhone', '13', 'Village', '19:00', 'solo', TRUE),
('2026-07-31', 'Albepierre Bredons', '15', 'Village d''Albepierre Bredons', '21:00', 'groupe', TRUE),
('2026-08-09', 'Mauguio', '34', 'Cafe du Midi', '12:00', 'groupe', TRUE),
('2026-08-12', 'Beziers', '34', 'Feria de Beziers', '23:00', 'groupe', TRUE),
('2026-08-14', 'La Garde Albaret St Marie', '48', 'Village de La Garde', '20:00', 'solo', TRUE),
('2026-08-15', 'Beziers', '34', 'Feria de Beziers', '23:00', 'groupe', TRUE),
('2026-08-16', 'Beziers', '34', 'Arenes de Beziers - Concert 200 musiciens', '21:00', 'solo', TRUE),
('2026-08-23', 'Villevieille', '30', 'Village de Villevieille', '12:00', 'solo', TRUE),
('2026-08-23', 'Saint Quentin La Poterie', '30', 'Village', '20:00', 'solo', TRUE);
