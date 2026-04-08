export interface Album {
  id: string;
  title: string;
  slug: string;
  year: number;
  description: string | null;
  cover_url: string | null;
  tracklist: string[];
  streaming_links: {
    spotify?: string;
    apple?: string;
    amazon?: string;
    youtube?: string;
    soundcloud?: string;
  };
  created_at: string;
}

export interface Concert {
  id: string;
  date: string;
  city: string;
  department: string | null;
  venue: string;
  time: string;
  type: "solo" | "groupe";
  all_ages: boolean;
  created_at: string;
}

export interface Video {
  id: string;
  title: string;
  youtube_url: string;
  thumbnail_url: string | null;
  created_at: string;
}

export interface Photo {
  id: string;
  url: string;
  alt_text: string | null;
  category: string | null;
  created_at: string;
}

export interface ContactMessage {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string | null;
  type_evenement: string | null;
  date_souhaitee: string | null;
  ville: string | null;
  message: string;
  lu: boolean;
  created_at: string;
}

export interface DevisRequest {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string | null;
  type_evenement: string | null;
  date_souhaitee: string | null;
  lieu: string | null;
  formule: string | null;
  message: string | null;
  status: "nouveau" | "en_cours" | "traite" | "refuse";
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      albums: {
        Row: Album;
        Insert: Omit<Album, "id" | "created_at">;
        Update: Partial<Omit<Album, "id" | "created_at">>;
      };
      concerts: {
        Row: Concert;
        Insert: Omit<Concert, "id" | "created_at">;
        Update: Partial<Omit<Concert, "id" | "created_at">>;
      };
      videos: {
        Row: Video;
        Insert: Omit<Video, "id" | "created_at">;
        Update: Partial<Omit<Video, "id" | "created_at">>;
      };
      photos: {
        Row: Photo;
        Insert: Omit<Photo, "id" | "created_at">;
        Update: Partial<Omit<Photo, "id" | "created_at">>;
      };
      contact_messages: {
        Row: ContactMessage;
        Insert: Omit<ContactMessage, "id" | "lu" | "created_at">;
        Update: Partial<Omit<ContactMessage, "id" | "created_at">>;
      };
      devis_requests: {
        Row: DevisRequest;
        Insert: Omit<DevisRequest, "id" | "status" | "created_at">;
        Update: Partial<Omit<DevisRequest, "id" | "created_at">>;
      };
    };
  };
}
