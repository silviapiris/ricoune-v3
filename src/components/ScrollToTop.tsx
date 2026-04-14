"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop(): React.ReactElement | null {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Retour en haut de page"
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-rc-yellow text-rc-dark ring-2 ring-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-200 hover:scale-110 hover:shadow-[0_6px_24px_rgba(0,0,0,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-rc-yellow md:bottom-8 md:right-8"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}
