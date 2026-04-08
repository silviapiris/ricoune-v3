"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const COOKIE_CONSENT_KEY = "ricoune-cookie-consent";

export default function CookieBanner(): React.ReactElement | null {
  const [showBanner, setShowBanner] = useState<boolean>(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (consent === null) {
      setShowBanner(true);
    }
  }, []);

  function handleAccept(): void {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setShowBanner(false);
  }

  function handleRefuse(): void {
    localStorage.setItem(COOKIE_CONSENT_KEY, "refused");
    setShowBanner(false);
  }

  if (!showBanner) {
    return null;
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 rc-card rounded-t-xl px-4 py-6 sm:px-6"
      role="dialog"
      aria-label="Bandeau cookies"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p
          className="text-sm text-rc-white/80 leading-relaxed sm:max-w-2xl"
          style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
        >
          Ce site utilise des cookies pour améliorer votre expérience. En
          continuant votre navigation, vous acceptez leur utilisation.{" "}
          <Link
            href="/politique-confidentialite"
            className="text-rc-yellow underline transition-colors duration-200 hover:text-rc-yellow/80"
          >
            En savoir plus
          </Link>
        </p>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={handleRefuse}
            className="rc-btn-outline h-10 px-5 text-sm"
            aria-label="Refuser les cookies"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="rc-btn h-10 px-5 text-sm"
            aria-label="Accepter les cookies"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
