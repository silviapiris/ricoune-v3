export interface Album {
  slug: string;
  title: string;
  year: number;
  description?: string;
  coverUrl: string;
  tracklist: string[];
  streaming: {
    spotify?: string;
    apple?: string;
    amazon?: string;
    youtube?: string;
    soundcloud?: string;
  };
}

const defaultStreaming = {
  spotify: "https://open.spotify.com/artist/4NcNxqo5fOC2RGY2Jrx0On",
  apple: "https://itunes.apple.com/fr/artist/ricoune/id78593832",
  amazon: "https://www.amazon.fr/s?k=ricoune",
  youtube: "https://www.youtube.com/channel/UC49kjqlusTVhH7hL_fT3MDg",
  soundcloud: "https://soundcloud.com/ricouneofficial",
};

export const albums: Album[] = [
  {
    slug: "quand-un-faineant-se-rebelle",
    title: "Quand un fain\u00e9ant se rebelle",
    year: 2021,
    coverUrl: "https://www.ricoune.com/wp-content/uploads/2021/12/Ricoune-Pochette-Quand-un-fainéant-se-rebelle-couleur-Automne-copie-400x400.jpg",
    tracklist: [],
    streaming: { ...defaultStreaming },
  },
  {
    slug: "face-b",
    title: "Face B",
    year: 2017,
    coverUrl: "https://www.ricoune.com/wp-content/uploads/2017/11/POCHETTE-RICOUNE-FACE-B-1-400x400.jpg",
    tracklist: [
      "On a le web \u00e0 la maison",
      "A 60 \u00e0 l\u2019heure sur mon tracteur",
      "La goutte de trop",
      "Je passerai demain",
      "Le thym ou la catin",
      "Face B",
      "Ho fache de con",
      "Tous les amis de moi que j\u2019ai",
      "Sauvons les glacons",
      "Le temps s\u2019est arr\u00eat\u00e9",
    ],
    streaming: { ...defaultStreaming },
  },
  {
    slug: "y-faut-etre-gentil",
    title: "Y faut \u00eatre gentil !",
    year: 2016,
    coverUrl: "https://www.ricoune.com/wp-content/uploads/2016/01/Jaquette-y-faut-etre-gentil-400x400.jpg",
    tracklist: [],
    streaming: { ...defaultStreaming },
  },
  {
    slug: "cest-lete",
    title: "C\u2019est l\u2019\u00e9t\u00e9",
    year: 2015,
    description: "CD Collector",
    coverUrl: "https://www.ricoune.com/wp-content/uploads/2015/06/Jaquette-CLT-400x400.jpg",
    tracklist: [
      "Un ricard tube",
      "Mon petit village",
      "Ribeiro",
      "On a le web",
      "Taureaux cariclots",
      "Les voeux du Maire",
      "Quand une femme s\u2019en va",
      "Nue t\u2019es la sur la plage",
      "Jean-Pierre (Nouvelle version)",
      "L\u2019homme qui remontait le temps",
      "C\u2019est l\u2019\u00e9t\u00e9",
      "La crapola",
    ],
    streaming: { ...defaultStreaming },
  },
  {
    slug: "le-kukela",
    title: "Le Kukela",
    year: 2015,
    coverUrl: "https://www.ricoune.com/wp-content/uploads/2015/02/ricoune_lekukela-400x400.jpg",
    tracklist: [
      "Le Kuk\u00e9la",
      "Es tout Pagat",
      "Montpellier la surdou\u00e9e",
      "Jean Pierre",
      "On avais tous 20 ans",
      "Les Bagarres",
      "Les Langues de Peilles",
      "L\u2019histoire de ma vie",
      "Babou",
    ],
    streaming: { ...defaultStreaming },
  },
  {
    slug: "le-best-of",
    title: "Le Best Of",
    year: 2015,
    coverUrl: "https://www.ricoune.com/wp-content/uploads/2015/02/ricoune_bestof-400x400.jpg",
    tracklist: [
      "Dans un verre \u00e0 Ballon",
      "Le Couscoussier",
      "J\u2019mapelle Pascal Carion",
      "Le Berger",
      "H\u00e9 Jacques",
      "La Vache",
      "Nicollin",
      "Les patates",
      "Maryse",
      "Parisien",
      "La F\u00e9ria de N\u00eemes",
      "Aquilou",
    ],
    streaming: { ...defaultStreaming },
  },
  {
    slug: "mets-tes-lunettes",
    title: "Mets tes lunettes",
    year: 2015,
    coverUrl: "https://www.ricoune.com/wp-content/uploads/2015/02/ricouhe_mtleccsb-400x400.jpg",
    tracklist: [
      "Le reggae Marseillais",
      "Jacques \u00e0 dit",
      "Le Roi Arthur",
      "La ska\u2019ac",
      "Est-ce ta f\u00eate",
      "Ta katie t\u2019a quitt\u00e9e",
      "La f\u00e9ria c\u2019est sacr\u00e9",
      "Allez zizou",
      "A Marseille",
      "Champion de la chaise longue",
    ],
    streaming: { ...defaultStreaming },
  },
  {
    slug: "ricoune-20-ans",
    title: "Ricoune 20 Ans!",
    year: 2015,
    coverUrl: "https://www.ricoune.com/wp-content/uploads/2015/02/ricoune_20ans-400x400.jpg",
    tracklist: [
      "La Coupo Santo",
      "La loi du silence",
      "Toro de combat, toro de Royale",
      "Le roi Arthur m\u2019a dit !!!",
      "Parisiens",
      "Le Gardian",
      "Les langues de peilles",
      "Histoire de ma vie",
      "Le rap des villes le rap des champs",
      "La Saint-Louis",
    ],
    streaming: { ...defaultStreaming },
  },
];

export function getAlbumBySlug(slug: string): Album | undefined {
  return albums.find((a) => a.slug === slug);
}
