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
    p2: 'Author of the essential "Dans un verre à ballon" (2001), he also created the famous "cow" jingle for Interville in 2007.',
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
