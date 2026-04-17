export type ContentItem =
  | string
  | { text: string; link: { href: string; label: string }; className?: string }
  | { list: { label: string; items: string[] } };

export interface Translations {
  nav: { home: string; concerts: string; albums: string; videos: string; photos: string; biography: string; professionals: string; contact: string };
  hero: { tagline: string; listenSpotify: string; bookDate: string };
  concerts: { title: string; viewAll: string; addCalendar: string; solo: string; group: string; all: string; noneScheduled: string; pastConcerts: string; privatize: string; requestQuote: string };
  about: { title: string; p1: string; p2: string; p3: string; learnMore: string; followOn: string };
  album: { label: string; description: string; listenSpotify: string; followSpotify: string };
  artist: { soulLabel: string; title: string; p1: string; p2: string; discoverBio: string };
  univers: { listen: string; watch: string; follow: string; watchVideos: string };
  cta: { title: string; subtitle: string; book: string };
  devis: {
    title: string; nom: string; nomPlaceholder: string; prenom: string; prenomPlaceholder: string;
    email: string; emailPlaceholder: string; telephone: string; telephonePlaceholder: string;
    typeEvenement: string; date: string; lieu: string; lieuPlaceholder: string;
    formule: string; message: string; messagePlaceholder: string; submit: string; rgpd: string;
    successMsg: string; backHome: string; viewConcerts: string; errorMsg: string; selectPlaceholder: string;
    eventTypes: readonly string[];
    formuleOptions: readonly string[];
  };
  albums: {
    title: string; subtitle: string; ctaTitle: string; ctaDesc: string; requestQuote: string;
  };
  videos: {
    title: string; officialClips: string; liveExcerpts: string; ctaText: string; viewDates: string; requestQuote: string;
  };
  photos: {
    title: string; subtitle: string; ctaText: string; requestQuote: string;
  };
  biography: {
    subtitle: string; quote: string; historyTitle: string; historyP1: string; historyP2: string;
    keyMomentsTitle: string; philosophy: string; ctaText: string; viewDates: string; requestQuote: string;
    timeline: { year: string; description: string }[];
  };
  professionals: {
    title: string; subtitle: string;
    offers: string; offersDesc: string; offersCta: string;
    quote: string; quoteDesc: string; quoteCta: string;
    media: string; mediaDesc: string; mediaCta: string;
  };
  contact: {
    title: string; subtitle: string;
    form: {
      nom: string; nomPlaceholder: string; prenom: string; prenomPlaceholder: string;
      email: string; telephone: string; telephonePlaceholder: string;
      eventType: string; date: string; city: string; cityPlaceholder: string;
      message: string; messagePlaceholder: string; rgpd: string;
      submit: string; sending: string; successMsg: string; errorMsg: string;
      backHome: string; viewConcerts: string;
    };
    sidebar: {
      social: string; professionals: string; viewFormulas: string; location: string; locationText: string;
    };
  };
  formules: {
    title: string;
    quote: string;
    cta: string;
    ctaGlobal: string;
    offers: { title: string; features: ContentItem[] }[];
  };
  legal: {
    title: string;
    sections: { title: string; content: ContentItem[] }[];
  };
  privacy: {
    title: string;
    sections: { title: string; content: ContentItem[] }[];
  };
  footer: {
    tagline: string; followLabel: string; mediaLabel: string;
    copyright: string; legal: string; privacy: string; madeBy: string; navLabel: string;
  };
  photosHd: {
    title: string;
    subtitle: string;
    download: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaBtn: string;
    photoNames: readonly string[];
  };
}

export const fr: Translations = {
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
    all: "Tous",
    noneScheduled: "Aucun concert programmé pour le moment",
    pastConcerts: "Concerts passés",
    privatize: "Vous souhaitez privatiser Ricoune ?",
    requestQuote: "Demander un devis",
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
    ],
    formuleOptions: [
      "Formule complète",
      "Apéro concert / Show case",
      "Je ne sais pas encore",
    ],
  },
  albums: {
    title: "Albums",
    subtitle: "Discographie complète",
    ctaTitle: "Envie de vivre Ricoune en live ?",
    ctaDesc: "Concerts, événements privés, festivals — Ricoune enflamme toutes les scènes.",
    requestQuote: "Demander un devis",
  },
  videos: {
    title: "Vidéos",
    officialClips: "Clips officiels",
    liveExcerpts: "Extraits live",
    ctaText: "Vous aimez l'ambiance ?",
    viewDates: "Voir les prochaines dates",
    requestQuote: "Demander un devis",
  },
  photos: {
    title: "Photos",
    subtitle: "Ricoune en images",
    ctaText: "Vous souhaitez programmer Ricoune ?",
    requestQuote: "Demander un devis",
  },
  biography: {
    subtitle: "L'artiste incontournable des scènes festives",
    quote: "La musique, c'est le partage. Je chante pour les gens, avec les gens.",
    historyTitle: "De Montpellier aux scènes festives",
    historyP1: "Né à Montpellier en 1963, Ricoune grandit bercé par la musique populaire du Sud. Très tôt, il découvre sa passion pour la scène et le contact avec le public. En 1983, il forme son premier groupe et commence à écumer les fêtes de village, les bodegas et les férias qui font vibrer l'Occitanie.",
    historyP2: "Au fil des années, Ricoune affine son style unique : un mélange de chansons festives, de reprises populaires et de compositions originales qui mettent tout le monde d'accord. Son authenticité et son énergie sur scène en font rapidement une figure incontournable du circuit festif du Sud de la France.",
    keyMomentsTitle: "Moments clés",
    philosophy: "Pour Ricoune, la musique n'est pas un métier, c'est un art de vivre. Libre, authentique, sans artifice. Sur scène, il n'y a pas de barrière entre l'artiste et son public. Chaque concert est un moment de partage, une célébration collective où tout le monde chante, danse et oublie le quotidien.",
    ctaText: "Envie de vivre l'expérience Ricoune en live ?",
    viewDates: "Voir les prochaines dates",
    requestQuote: "Demander un devis",
    timeline: [
      { year: "1963", description: "Naissance à Montpellier" },
      { year: "1983", description: "Premier groupe" },
      { year: "1988", description: "Évolution artistique, début des grandes scènes" },
      { year: "2001", description: "«\u00a0Dans un verre à ballon\u00a0», le tube qui marque une génération" },
      { year: "2007", description: "Générique de la célèbre «\u00a0vache\u00a0» d'Interville" },
    ],
  },
  professionals: {
    title: "Espace Professionnels",
    subtitle: "Tout pour organiser votre événement avec Ricoune",
    offers: "Nos formules",
    offersDesc: "Découvrez nos formules spectacle",
    offersCta: "Voir les formules",
    quote: "Demander un devis",
    quoteDesc: "Obtenez un devis personnalisé",
    quoteCta: "Demander un devis",
    media: "Photos HD",
    mediaDesc: "Téléchargez des visuels professionnels",
    mediaCta: "Télécharger les visuels",
  },
  contact: {
    title: "Contact",
    subtitle: "Besoin d'informations ou d'organiser un événement ? Nous vous répondons dans les plus brefs délais.",
    form: {
      nom: "Nom",
      nomPlaceholder: "Votre nom",
      prenom: "Prénom",
      prenomPlaceholder: "Votre prénom",
      email: "Email",
      telephone: "Téléphone",
      telephonePlaceholder: "06 00 00 00 00",
      eventType: "Type d'événement",
      date: "Date souhaitée",
      city: "Ville / Lieu",
      cityPlaceholder: "Montpellier, Nimes...",
      message: "Message",
      messagePlaceholder: "Décrivez votre projet ou posez vos questions...",
      rgpd: "Les informations envoyées via ce site sont utilisées uniquement pour répondre à votre demande.",
      submit: "ENVOYER LA DEMANDE",
      sending: "Envoi en cours...",
      successMsg: "Message envoyé avec succès ! Nous vous répondrons rapidement.",
      errorMsg: "Une erreur est survenue. Veuillez réessayer.",
      backHome: "Retour à l'accueil",
      viewConcerts: "Voir les concerts",
    },
    sidebar: {
      social: "Réseaux sociaux",
      professionals: "Professionnels",
      viewFormulas: "Voir les formules",
      location: "Localisation",
      locationText: "Montpellier & Sud de la France",
    },
  },
  formules: {
    title: "Nos Formules",
    quote: "Sur devis",
    cta: "Demander un devis",
    ctaGlobal: "Un événement sur mesure ? Contactez-nous pour un devis personnalisé.",
    offers: [
      {
        title: "Formule complète",
        features: [
          "Concert 1h30",
          "7 musiciens sur scène",
          { text: "Fiche technique", link: { href: "/documents/fiche-technique-groupe.pdf", label: "Fiche technique" } },
          "Adaptation selon vos événements",
        ],
      },
      {
        title: "Apéro concert / Show case",
        features: [
          "Idéal pour cocktail et show case",
          "Sono fournie sauf départements hors Occitanie",
          { text: "Fiche technique", link: { href: "/documents/fiche-technique-solo.pdf", label: "Fiche technique" } },
          "Adaptation selon vos événements",
        ],
      },
    ],
  },
  legal: {
    title: "Mentions légales",
    sections: [
      {
        title: "Éditeur du site",
        content: [
          "Ricoune",
          { text: "Email :", link: { href: "mailto:ricouneofficiel@gmail.com", label: "ricouneofficiel@gmail.com" } },
        ],
      },
      {
        title: "Responsable de la publication",
        content: ["Ricoune"],
      },
      {
        title: "Hébergement & technologies",
        content: [
          "Site développé avec Next.js / React et hébergé sur Vercel.",
          { text: "Vercel Inc. — 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis —", link: { href: "https://vercel.com", label: "vercel.com" }, className: "mt-1" },
        ],
      },
      {
        title: "Propriété intellectuelle",
        content: ["L'ensemble des contenus présents sur ce site est protégé par le droit de la propriété intellectuelle."],
      },
      {
        title: "Responsabilité",
        content: ["L'éditeur du site ne saurait être tenu responsable des erreurs ou omissions."],
      },
      {
        title: "Liens externes",
        content: ["L'éditeur ne peut être tenu responsable du contenu des sites externes."],
      },
    ],
  },
  privacy: {
    title: "Politique de confidentialité",
    sections: [
      {
        title: "Collecte des données",
        content: ["Les données sont collectées via les formulaires."],
      },
      {
        title: "Données collectées",
        content: ["Nom, prénom, email, téléphone, message."],
      },
      {
        title: "Finalité",
        content: ["Répondre aux demandes et établir un contact."],
      },
      {
        title: "Conservation",
        content: ["Les données sont conservées le temps nécessaire."],
      },
      {
        title: "Destinataires",
        content: ["Exclusivement Ricoune."],
      },
      {
        title: "Sécurité",
        content: ["Mesures de protection mises en place."],
      },
      {
        title: "Vos droits",
        content: [
          { text: "Accès, rectification, suppression :", link: { href: "mailto:ricouneofficiel@gmail.com", label: "ricouneofficiel@gmail.com" } },
        ],
      },
      {
        title: "Cookies",
        content: ["Utilisation à des fins de fonctionnement et statistiques."],
      },
      {
        title: "Gestion des cookies",
        content: [
          "Ce site utilise des cookies pour améliorer l'expérience utilisateur.",
          { list: { label: "Types de cookies :", items: ["techniques", "mesure d'audience"] } },
          "Vous pouvez accepter, refuser ou configurer vos choix via votre navigateur.",
          "Aucune donnée n'est vendue ou utilisée à des fins publicitaires.",
        ],
      },
    ],
  },
  footer: {
    tagline: "La musique du Sud,\npartout en France.",
    followLabel: "Suivez Ricoune",
    mediaLabel: "Concerts · Clips · Actualités",
    copyright: "© 2026 Ricoune — Tous droits réservés",
    legal: "Mentions légales",
    privacy: "Politique de confidentialité",
    madeBy: "Site par",
    navLabel: "Navigation",
  },
  photosHd: {
    title: "Photos HD",
    subtitle: "Téléchargez des visuels professionnels pour vos supports de communication",
    download: "Télécharger",
    ctaTitle: "Organisez votre événement avec Ricoune",
    ctaDesc: "Mairies, comités des fêtes, particuliers : faites appel à l'artiste incontournable du Sud.",
    ctaBtn: "Demander un devis",
    photoNames: ["Affiche verre à ballon", "Affiche Ricoune en concert"],
  },
};
