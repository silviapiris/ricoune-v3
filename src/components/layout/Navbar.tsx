"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Facebook, Youtube } from "lucide-react";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Biographie", href: "/biographie" },
  { label: "Albums", href: "/albums" },
  { label: "Concerts", href: "/concerts" },
  { label: "Videos", href: "/videos" },
  { label: "Photos", href: "/photos" },
  {
    label: "Professionnels",
    href: "/professionnels",
    children: [
      { label: "Formules", href: "/professionnels/formules" },
      { label: "Demande de devis", href: "/professionnels/demande-de-devis" },
      { label: "Photos HD", href: "/professionnels/photos-hd" },
    ],
  },
  { label: "Boutique", href: "/boutique" },
  { label: "Contact", href: "/contact" },
];

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      width="20"
      height="20"
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
    setMobileDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-dark/95 shadow-lg backdrop-blur-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-bold tracking-widest text-white transition-colors hover:text-primary"
            >
              RICOUNE
            </Link>

            {/* Desktop nav */}
            <div className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        isActive(link.href)
                          ? "text-primary"
                          : "text-gray-300 hover:text-primary"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {dropdownOpen && (
                      <div className="absolute left-0 top-full mt-1 w-56 overflow-hidden rounded-lg bg-dark-light shadow-xl">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-4 py-3 text-sm transition-colors ${
                              isActive(child.href)
                                ? "bg-primary/10 text-primary"
                                : "text-gray-300 hover:bg-dark-lighter hover:text-primary"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "text-primary"
                        : "text-gray-300 hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>

            {/* Social icons (desktop) */}
            <div className="hidden items-center gap-3 lg:flex">
              <a
                href="https://www.facebook.com/ricouneofficiel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-primary"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.youtube.com/@ricoune"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-primary"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
              <a
                href="https://open.spotify.com/artist/ricoune"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-primary"
                aria-label="Spotify"
              >
                <SpotifyIcon />
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-white lg:hidden"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-72 transform bg-dark transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <span className="text-xl font-bold tracking-widest text-white">
            RICOUNE
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-white"
            aria-label="Fermer"
          >
            <X size={28} />
          </button>
        </div>
        <div className="flex flex-col overflow-y-auto px-4 py-4">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label}>
                <button
                  onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                  className={`flex w-full items-center justify-between rounded-md px-3 py-3 text-base font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-primary"
                      : "text-gray-300 hover:text-primary"
                  }`}
                >
                  {link.label}
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${mobileDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {mobileDropdownOpen && (
                  <div className="ml-4 flex flex-col border-l border-dark-lighter pl-3">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`rounded-md px-3 py-2 text-sm transition-colors ${
                          isActive(child.href)
                            ? "text-primary"
                            : "text-gray-400 hover:text-primary"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-3 text-base font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-primary"
                    : "text-gray-300 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            )
          )}

          {/* Mobile social links */}
          <div className="mt-6 flex items-center gap-4 border-t border-dark-lighter px-3 pt-6">
            <a
              href="https://www.facebook.com/ricouneofficiel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors hover:text-primary"
              aria-label="Facebook"
            >
              <Facebook size={22} />
            </a>
            <a
              href="https://www.youtube.com/@ricoune"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors hover:text-primary"
              aria-label="YouTube"
            >
              <Youtube size={22} />
            </a>
            <a
              href="https://open.spotify.com/artist/ricoune"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors hover:text-primary"
              aria-label="Spotify"
            >
              <SpotifyIcon />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
