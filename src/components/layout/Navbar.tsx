"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Accueil", href: "/" },
  { label: "Concerts", href: "/concerts" },
  { label: "Albums", href: "/albums" },
  { label: "Vidéos", href: "/videos" },
  { label: "Photos", href: "/photos" },
  { label: "Biographie", href: "/biographie" },
  { label: "Professionnels", href: "/professionnels" },
  { label: "Contact", href: "/contact" },
];

const SCROLL_THRESHOLD = 50;

function isActivePath(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

interface DesktopNavProps {
  pathname: string;
}

function DesktopNav({ pathname }: DesktopNavProps) {
  return (
    <div className="hidden items-center gap-1 rounded-xl px-2 py-1 backdrop-blur-sm md:flex" style={{ background: "rgba(0,0,0,0.25)" }}>
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors duration-200 ${
            isActivePath(link.href, pathname)
              ? "text-rc-yellow"
              : "text-rc-white hover:text-rc-yellow"
          }`}
          style={{ textShadow: "0 1px 3px rgba(0,0,0,0.6), 0 0 1px rgba(0,0,0,0.8), 1px 0 2px rgba(0,0,0,0.5), -1px 0 2px rgba(0,0,0,0.5)" }}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

function MobileDrawer({ isOpen, onClose, pathname }: MobileDrawerProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer panel */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-72 flex-col transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ background: "rgba(26, 34, 68, 0.95)" }}
      >
        {/* Drawer header */}
        <div className="flex h-16 items-center justify-between px-5">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
            <Image
              src="/images/logo/logo-vache.png"
              alt="Ricoune"
              width={36}
              height={36}
              unoptimized
              className="rounded"
            />
          </Link>
          <button
            onClick={onClose}
            className="text-rc-white transition-colors hover:text-rc-yellow"
            aria-label="Fermer le menu"
          >
            <X size={28} />
          </button>
        </div>

        {/* Drawer links */}
        <nav className="flex flex-col gap-1 overflow-y-auto px-4 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`rounded-md px-4 py-3 text-base font-medium transition-colors duration-200 ${
                isActivePath(link.href, pathname)
                  ? "text-rc-yellow"
                  : "text-rc-white hover:text-rc-yellow"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function handleScroll(): void {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3 shadow-lg backdrop-blur-md" : "py-4"
        }`}
        style={{
          background: scrolled ? "rgba(26, 34, 68, 0.85)" : "transparent",
        }}
      >
        {/* Gradient de contraste discret — visible uniquement avant scroll */}
        {!scrolled && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
        )}
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Image
              src="/images/logo/logo-vache.png"
              alt="Ricoune logo"
              width={160}
              height={80}
              priority
              unoptimized
              className="h-12 w-auto md:h-14"
            />
          </Link>

          {/* Desktop navigation */}
          <DesktopNav pathname={pathname} />

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-rc-white transition-colors hover:text-rc-yellow md:hidden"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <MobileDrawer
        isOpen={mobileOpen}
        onClose={closeMobile}
        pathname={pathname}
      />
    </>
  );
}
