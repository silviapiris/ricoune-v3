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
