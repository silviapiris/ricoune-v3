"use client";

import { useEffect } from "react";
import { X, MapPin, Navigation } from "lucide-react";

interface MapModalProps {
  venue: string;
  city: string;
  postalCode: string;
  /** URL Google Maps search (format: https://www.google.com/maps/search/?api=1&query=...) */
  mapsUrl: string;
  onClose: () => void;
}

export default function MapModal({
  venue,
  city,
  postalCode,
  mapsUrl,
  onClose,
}: MapModalProps): React.ReactElement {
  // Extraire le paramètre query brut (sans decode/re-encode) pour l'URL d'itinéraire
  const queryParam = mapsUrl.match(/[?&]query=([^&]+)/)?.[1] ?? "";
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${queryParam}`;

  // Fermeture via Échap
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent): void {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Bloquer le scroll du body pendant l'ouverture
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Localisation — ${venue}, ${city}`}
    >
      {/* Overlay — clic pour fermer */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panneau modal */}
      <div
        className="relative z-10 flex w-full max-w-sm flex-col overflow-hidden rounded-2xl shadow-2xl"
        style={{ background: "rgba(26, 34, 68, 0.97)" }}
      >
        {/* En-tête */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4">
          <div className="min-w-0">
            <p className="truncate font-semibold text-white">{venue}</p>
            <p className="text-sm text-white/60">
              {city} ({postalCode})
            </p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 text-white/60 transition-colors hover:text-white"
            aria-label="Fermer"
            autoFocus
          >
            <X size={22} />
          </button>
        </div>

        {/* Corps */}
        <div className="flex flex-col items-center gap-6 px-6 py-8 text-center">
          {/* Icône lieu */}
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rc-yellow/15">
            <MapPin size={28} className="text-rc-yellow" aria-hidden="true" />
          </div>

          {/* Informations du lieu */}
          <div>
            <p className="text-base font-semibold text-white">{venue}</p>
            <p className="mt-1 text-sm text-white/60">
              {city} &mdash; {postalCode}
            </p>
          </div>

          {/* Actions Google Maps */}
          <div className="flex w-full flex-col gap-3">
            {/* Lien principal — localiser le lieu */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rc-btn w-full justify-center"
            >
              Localiser sur Google Maps
            </a>

            {/* Lien secondaire — itinéraire */}
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rc-btn-outline w-full justify-center"
            >
              <Navigation size={15} className="shrink-0" aria-hidden="true" />
              Itin&eacute;raire
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
