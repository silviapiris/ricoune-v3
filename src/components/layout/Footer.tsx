"use client";

import Link from "next/link";
import { Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";

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

function SoundcloudIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      width="20"
      height="20"
    >
      <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.054-.048-.1-.1-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.172 1.282c.013.06.045.094.104.094.057 0 .09-.037.104-.094l.194-1.282-.194-1.332c-.014-.057-.047-.094-.104-.094m1.848-1.18c-.063 0-.11.05-.116.11l-.209 2.496.209 2.407c.006.063.053.11.116.11.065 0 .11-.047.12-.11l.236-2.407-.236-2.496c-.01-.06-.055-.11-.12-.11m.943-.253c-.072 0-.122.055-.13.12l-.194 2.75.194 2.59c.008.063.058.12.13.12.073 0 .12-.057.132-.12l.217-2.59-.217-2.75c-.012-.065-.059-.12-.132-.12m.976-.25c-.083 0-.137.063-.145.133l-.178 2.883.178 2.682c.008.073.062.133.145.133.08 0 .136-.06.147-.133l.2-2.682-.2-2.883c-.011-.07-.067-.133-.147-.133m1.037-.081c-.09 0-.148.067-.155.143l-.163 2.964.163 2.727c.007.08.065.143.155.143.088 0 .148-.063.158-.143l.183-2.727-.183-2.964c-.01-.076-.07-.143-.158-.143m1.097-.17c-.1 0-.163.076-.17.156l-.147 3.134.147 2.76c.007.083.07.157.17.157.097 0 .163-.074.173-.157l.166-2.76-.166-3.134c-.01-.08-.076-.157-.173-.157m1.108-.06c-.108 0-.175.08-.183.168l-.131 3.194.131 2.78c.008.093.075.17.183.17.107 0 .175-.077.186-.17l.147-2.78-.147-3.194c-.011-.088-.079-.169-.186-.169m1.17-.163c-.12 0-.19.09-.197.18l-.116 3.357.116 2.798c.007.098.077.18.197.18.116 0 .19-.082.2-.18l.131-2.798-.131-3.357c-.01-.09-.084-.18-.2-.18m1.18-.054c-.127 0-.2.094-.208.19l-.1 3.412.1 2.81c.008.1.081.19.208.19s.2-.09.21-.19l.114-2.81-.114-3.412c-.01-.096-.083-.19-.21-.19m1.234-.1c-.14 0-.213.102-.22.2l-.085 3.512.085 2.815c.007.103.08.2.22.2.136 0 .213-.097.224-.2l.097-2.815-.097-3.512c-.011-.098-.088-.2-.224-.2m1.168.263c-.136 0-.225.108-.233.213l-.07 3.25.07 2.817c.008.11.097.213.233.213.133 0 .225-.103.235-.213l.078-2.817-.078-3.25c-.01-.105-.102-.213-.235-.213m1.078-.353c-.023-.152-.124-.254-.271-.254-.143 0-.248.102-.27.254l-.07 3.603.07 2.82c.022.154.127.254.27.254.147 0 .248-.1.271-.254l.078-2.82zm.973-.013c-.023-.16-.133-.27-.288-.27-.152 0-.266.11-.289.27l-.054 3.617.054 2.823c.023.163.137.27.289.27.155 0 .265-.107.288-.27l.063-2.823zM11.587 7.98c-.163 0-.282.118-.305.278l-.039 3.72.039 2.809c.023.163.142.278.305.278.16 0 .282-.115.307-.278l.044-2.809-.044-3.72c-.025-.16-.147-.278-.307-.278m1.07-.647c-.17 0-.295.125-.319.29l-.022 4.367.022 2.806c.024.168.149.29.319.29.168 0 .295-.122.32-.29l.026-2.806-.026-4.367c-.025-.165-.152-.29-.32-.29m1.072-.157c-.175 0-.307.13-.332.3l-.007 4.524.007 2.798c.025.17.157.3.332.3.174 0 .307-.13.333-.3l.008-2.798-.008-4.524c-.026-.17-.159-.3-.333-.3m1.17 1.053c.007-.178-.133-.31-.316-.31-.18 0-.32.132-.345.31l-.003 3.628.007 2.793c.025.177.165.308.345.308.18 0 .309-.131.316-.308l.007-2.793zm.871-.623c-.2 0-.34.143-.356.325v.01l-.01 4.243.01 2.786c.016.177.156.322.356.322.193 0 .34-.145.356-.325l.01-2.783-.01-4.25c-.016-.18-.163-.325-.356-.328m2.59 1.498c-.146 0-.282.023-.412.066-.1-1.135-.99-2.02-2.09-2.02-.278 0-.548.055-.8.153-.094.037-.12.075-.12.15v7.293c0 .078.06.145.135.155l.015.001h3.272c.972 0 1.76-.81 1.76-1.808 0-.997-.788-1.808-1.76-1.808" />
    </svg>
  );
}

const footerNavLinks = [
  { label: "Accueil", href: "/" },
  { label: "Biographie", href: "/biographie" },
  { label: "Albums", href: "/albums" },
  { label: "Concerts", href: "/concerts" },
  { label: "Videos", href: "/videos" },
  { label: "Photos", href: "/photos" },
  { label: "Boutique", href: "/boutique" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-dark-lighter">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Navigation
            </h3>
            <ul className="space-y-2">
              {footerNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Suivez Ricoune
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.facebook.com/ricouneofficiel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-primary"
              >
                <Facebook size={18} />
                Facebook
              </a>
              <a
                href="https://www.youtube.com/@ricoune"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-primary"
              >
                <Youtube size={18} />
                YouTube
              </a>
              <a
                href="https://open.spotify.com/artist/ricoune"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-primary"
              >
                <SpotifyIcon />
                Spotify
              </a>
              <a
                href="https://soundcloud.com/ricoune"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-primary"
              >
                <SoundcloudIcon />
                Soundcloud
              </a>
            </div>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Contact</h3>
            <div className="mb-6 flex flex-col gap-2">
              <a
                href="mailto:contact@ricoune.fr"
                className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-primary"
              >
                <Mail size={16} />
                contact@ricoune.fr
              </a>
              <span className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin size={16} />
                Sud de la France
              </span>
            </div>

            <h4 className="mb-2 text-sm font-semibold text-white">
              Newsletter
            </h4>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2"
            >
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 rounded-md border border-dark-lighter bg-dark-light px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-light"
              >
                OK
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-dark-lighter pt-6 text-center">
          <p className="text-sm text-gray-500">
            Ricoune &copy; {new Date().getFullYear()} by Kunclic
          </p>
        </div>
      </div>
    </footer>
  );
}
