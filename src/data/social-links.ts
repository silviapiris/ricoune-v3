export interface SocialLink {
  name: string;
  href: string;
  label: string;
}

export const socialLinks: Record<string, SocialLink> = {
  spotify: {
    name: "Spotify",
    href: "https://open.spotify.com/artist/4NcNxqo5fOC2RGY2Jrx0On",
    label: "Ecouter sur Spotify",
  },
  tiktok: {
    name: "TikTok",
    href: "https://www.tiktok.com/@ricoune",
    label: "Suivre sur TikTok",
  },
  instagram: {
    name: "Instagram",
    href: "https://www.instagram.com/ricouneofficiel",
    label: "Suivre sur Instagram",
  },
  facebook: {
    name: "Facebook",
    href: "https://www.facebook.com/ricouneofficiel",
    label: "Suivre sur Facebook",
  },
  youtube: {
    name: "YouTube",
    href: "https://www.youtube.com/@ricoune",
    label: "Voir sur YouTube",
  },
  appleMusic: {
    name: "Apple Music",
    href: "https://music.apple.com/fr/artist/ricoune",
    label: "Ecouter sur Apple Music",
  },
  deezer: {
    name: "Deezer",
    href: "https://www.deezer.com/search/ricoune",
    label: "Ecouter sur Deezer",
  },
};

/** Helper : get URL by key */
export function getSocialUrl(key: keyof typeof socialLinks): string {
  return socialLinks[key].href;
}
