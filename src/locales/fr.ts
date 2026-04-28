export type ContentItem =
  | string
  | { text: string; link: { href: string; label: string }; className?: string }
  | { list: { label: string; items: string[] } };

export interface Translations {
  nav: { home: string; concerts: string; albums: string; videos: string; photos: string; biography: string; professionals: string; contact: string };
  hero: { tagline: string; listenSpotify: string; bookDate: string };
  concerts: { title: string; viewAll: string; addCalendar: string; solo: string; group: string; all: string; noneScheduled: string; pastConcerts: string; privatize: string; requestQuote: string; specialInfo: string; archivesTitle: string; archivesCount: string; cancelled: string; cancellationNoteLabel: string };
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
    affichesTitle: string;
    portraitsTitle: string;
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
    specialInfo: "Infos spéciales",
    archivesTitle: "Archives des concerts passés",
    archivesCount: "{{count}} concerts passés",
    cancelled: "Annulé",
    cancellationNoteLabel: "Information",
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
      { year: "1963", description: "Naissance à Saint-Drézéry (près de Montpellier)" },
      { year: "1983", description: "Fonde son premier groupe \"Génération 83\"" },
      { year: "1993", description: "Le groupe devient \"Ricoune et les Counass\"" },
      { year: "1994", description: "Premier album \"Le Chat de Jourdan\"" },
      { year: "2001", description: "Naissance du nom de scène \"Ricoune\" + album \"Sans interdits\"" },
      { year: "2013", description: "Album \"Accent du Sud\" + tube \"Dans un verre à ballon\"" },
      { year: "2016", description: "\"Le Best Of, 20 ans\" (anniversaire de carrière)" },
      { year: "2021", description: "Album \"Quand un fainéant se rebelle\"" },
      { year: "2023", description: "Single \"Las Terrenas\"" },
      { year: "2024", description: "Single \"La Belle Partouze\"" },
      { year: "2025", description: "Tournée des ferias (Béziers + villages)" },
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
        title: "1. Éditeur du site",
        content: [
          "Le présent site est édité par :",
          {
            list: {
              label: "Coordonnées de l'éditeur",
              items: [
                "LA VACHACADEMY (association déclarée)",
                "SIREN : 491 030 300",
                "Siège social : 6B Rue de la Bouvine, 34160 Saint-Drézéry, France",
              ],
            },
          },
        ],
      },
      {
        title: "2. Responsable de la publication",
        content: [
          "Henri ROMAN, artiste connu sous le nom de scène « Ricoune ».",
        ],
      },
      {
        title: "3. Hébergeur",
        content: [
          "Le site est hébergé par :",
          {
            list: {
              label: "Coordonnées de l'hébergeur",
              items: [
                "Vercel Inc.",
                "440 N Barranca Ave #4133, Covina, CA 91723, USA",
                "Site web : vercel.com",
                "Serveurs de déploiement : Europe (région Paris)",
              ],
            },
          },
        ],
      },
      {
        title: "4. Conception, réalisation et maintenance",
        content: [
          "Le site a été conçu, réalisé et est maintenu par :",
          {
            text: "Custom Digital Services — Site web : ",
            link: {
              href: "https://www.custom-digital-services.com/",
              label: "custom-digital-services.com",
            },
          },
          {
            text: "Contact : ",
            link: {
              href: "mailto:sylvia.piris@custom-digital-services.com",
              label: "sylvia.piris@custom-digital-services.com",
            },
          },
        ],
      },
      {
        title: "5. Propriété intellectuelle",
        content: [
          "L'ensemble des contenus présents sur le site (textes, images, photographies, vidéos, logos, marques, éléments graphiques, sons, architecture du site) est protégé par le droit d'auteur et le droit des marques. Ils sont la propriété exclusive de Henri ROMAN et/ou de leurs auteurs respectifs.",
          "Toute reproduction, représentation, modification, publication, transmission, dénaturation, totale ou partielle du site ou de son contenu, par quelque procédé que ce soit et sur quelque support que ce soit, est interdite sans l'autorisation écrite préalable de l'éditeur.",
          "Toute exploitation non autorisée du site ou de ses contenus est susceptible de constituer une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.",
        ],
      },
      {
        title: "6. Crédits photos",
        content: [
          "Les photographies réalisées par des photographes professionnels sont signées par leurs auteurs directement sur les visuels.",
          "Les autres visuels sont issus de la collection personnelle de l'artiste. Tous droits réservés.",
        ],
      },
      {
        title: "7. Liens hypertextes",
        content: [
          "Le site peut contenir des liens hypertextes vers d'autres sites internet. L'éditeur n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu, leurs conditions d'utilisation ou leurs pratiques en matière de protection des données personnelles.",
          "La création de liens hypertextes pointant vers le présent site est autorisée, à condition qu'ils ne portent pas atteinte à l'image de l'éditeur et ne soient pas utilisés à des fins commerciales ou publicitaires sans accord préalable.",
        ],
      },
      {
        title: "8. Droit applicable et juridiction",
        content: [
          "Les présentes mentions légales sont soumises au droit français.",
          "En cas de litige relatif à l'interprétation ou à l'exécution des présentes, et à défaut de résolution amiable, les tribunaux français seront seuls compétents.",
        ],
      },
      {
        title: "9. Contact",
        content: [
          "Pour toute question concernant les présentes mentions légales, vous pouvez nous contacter via le formulaire de contact du site avec pour objet « Mentions légales ».",
        ],
      },
    ],
  },
  privacy: {
    title: "Politique de confidentialité",
    sections: [
      {
        title: "1. Préambule",
        content: [
          "La présente politique de confidentialité a pour objet d'informer les utilisateurs du site ricoune.com sur la manière dont leurs données personnelles sont collectées, utilisées et protégées, conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679) et à la loi française Informatique et Libertés modifiée.",
        ],
      },
      {
        title: "2. Responsable du traitement",
        content: [
          "Le responsable du traitement des données personnelles collectées sur ce site est :",
          {
            list: {
              label: "Identification :",
              items: [
                "Association LA VACHACADEMY",
                "Association déclarée — SIREN 491030300",
                "Siège social : 6B Rue de la Bouvine, 34160 Saint-Drézéry, France",
                "Représentée par Henri ROMAN",
              ],
            },
          },
          "Pour toute question concernant le traitement de vos données, vous pouvez nous contacter via le formulaire de contact du site en précisant « Demande RGPD » en objet.",
        ],
      },
      {
        title: "3. Données collectées et finalités",
        content: [
          "Nous collectons uniquement les données que vous nous transmettez volontairement via nos formulaires.",
          {
            list: {
              label: "Formulaire de contact :",
              items: [
                "Données collectées : nom, prénom, adresse email, numéro de téléphone (optionnel), type d'événement (optionnel), date souhaitée (optionnelle), ville (optionnelle), message.",
                "Finalité : répondre à votre demande de contact.",
                "Base légale : intérêt légitime (répondre aux sollicitations adressées à l'artiste).",
              ],
            },
          },
          {
            list: {
              label: "Formulaire de demande de devis professionnel :",
              items: [
                "Données collectées : nom, prénom, adresse email, numéro de téléphone, type d'événement, date souhaitée, ville, formule choisie, message.",
                "Finalité : traiter votre demande de devis pour une prestation artistique.",
                "Base légale : mesures précontractuelles prises à la demande de la personne concernée.",
              ],
            },
          },
          {
            list: {
              label: "Données techniques :",
              items: [
                "Données collectées : adresse IP (utilisée temporairement pour la protection anti-spam des formulaires).",
                "Finalité : sécurité du site et prévention des abus.",
                "Base légale : intérêt légitime (sécurité).",
              ],
            },
          },
        ],
      },
      {
        title: "4. Destinataires des données",
        content: [
          "Vos données sont exclusivement destinées à :",
          {
            list: {
              label: "Destinataires :",
              items: [
                "L'association LA VACHACADEMY (responsable du traitement)",
                "Henri ROMAN (destinataire final des demandes)",
              ],
            },
          },
          "Vos données ne sont jamais revendues, cédées ou transmises à des tiers à des fins commerciales ou publicitaires.",
        ],
      },
      {
        title: "5. Sous-traitants techniques",
        content: [
          "Pour assurer le fonctionnement du site, nous faisons appel aux prestataires techniques suivants, qui agissent en qualité de sous-traitants au sens du RGPD :",
          {
            list: {
              label: "Sous-traitants :",
              items: [
                "Vercel Inc. — Hébergement du site (États-Unis, cadre : Data Privacy Framework UE-USA)",
                "Resend — Acheminement des emails des formulaires (États-Unis, cadre : Data Privacy Framework UE-USA)",
              ],
            },
          },
          "Ces sous-traitants présentent des garanties suffisantes quant à la protection des données personnelles, conformément aux articles 28 et 44 à 50 du RGPD.",
        ],
      },
      {
        title: "6. Durées de conservation",
        content: [
          "Les données sont conservées pour les durées suivantes :",
          {
            list: {
              label: "Durées :",
              items: [
                "Messages du formulaire de contact : 3 ans à compter du dernier échange.",
                "Demandes de devis : 3 ans à compter de la dernière interaction commerciale.",
                "Adresses IP (protection anti-spam) : 12 mois maximum.",
              ],
            },
          },
          "À l'issue de ces durées, les données sont supprimées ou anonymisées.",
        ],
      },
      {
        title: "7. Vos droits",
        content: [
          "Conformément aux articles 15 à 22 du RGPD, vous disposez des droits suivants sur vos données personnelles :",
          {
            list: {
              label: "Droits RGPD :",
              items: [
                "Droit d'accès : obtenir la confirmation que des données vous concernant sont traitées et en recevoir une copie.",
                "Droit de rectification : demander la correction de données inexactes ou incomplètes.",
                "Droit à l'effacement (« droit à l'oubli ») : demander la suppression de vos données.",
                "Droit à la limitation du traitement : demander la suspension temporaire du traitement de vos données.",
                "Droit d'opposition : vous opposer au traitement de vos données pour des motifs légitimes.",
                "Droit à la portabilité : recevoir vos données dans un format structuré et lisible par machine.",
              ],
            },
          },
          "Pour exercer ces droits, adressez votre demande via le formulaire de contact du site en précisant « Demande RGPD » en objet. Une réponse vous sera apportée dans un délai maximum d'un mois.",
          {
            text: "Vous disposez également du droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) :",
            link: {
              href: "https://www.cnil.fr",
              label: "www.cnil.fr",
            },
          },
        ],
      },
      {
        title: "8. Sécurité des données",
        content: [
          "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles, notamment :",
          {
            list: {
              label: "Mesures de sécurité :",
              items: [
                "Chiffrement des communications (HTTPS/TLS)",
                "Protection des formulaires contre le spam (honeypot, limitation de débit)",
                "Accès restreint aux données aux seules personnes autorisées",
              ],
            },
          },
        ],
      },
      {
        title: "9. Cookies",
        content: [
          "Le site ricoune.com n'utilise aucun cookie de traçage, d'analyse d'audience ou de publicité.",
          "Seuls des cookies strictement nécessaires au fonctionnement technique du site peuvent être déposés par votre navigateur (par exemple pour mémoriser votre préférence de langue). Ces cookies ne nécessitent pas votre consentement préalable conformément à la réglementation en vigueur.",
        ],
      },
      {
        title: "10. Liens vers des sites tiers",
        content: [
          "Ce site contient des liens vers des services tiers (Google Maps, Google Calendar, plateformes de streaming musical, réseaux sociaux). Lorsque vous cliquez sur ces liens, vous êtes redirigé vers ces services qui disposent de leurs propres politiques de confidentialité, que nous vous invitons à consulter.",
        ],
      },
      {
        title: "11. Modifications de la politique",
        content: [
          "Cette politique de confidentialité peut être modifiée à tout moment pour refléter les évolutions législatives ou techniques. La date de dernière mise à jour figure en bas de cette page.",
        ],
      },
      {
        title: "12. Contact",
        content: [
          "Pour toute question relative à cette politique de confidentialité, utilisez le formulaire de contact du site.",
          "Dernière mise à jour : 23 avril 2026.",
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
    photoNames: [
      "Affiche verre à ballon",
      "Affiche Ricoune en concert",
      "Ricoune en concert (micro)",
      "Portrait chemise blanche",
      "Ricoune sur scène",
    ],
    affichesTitle: "Affiches",
    portraitsTitle: "Portraits",
  },
};
