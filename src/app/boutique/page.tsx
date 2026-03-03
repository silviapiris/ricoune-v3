"use client";

import Link from "next/link";
import { ExternalLink, Music, Disc3, Youtube } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { albums } from "@/data/albums";

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      width="28"
      height="28"
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
      width="28"
      height="28"
    >
      <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.054-.048-.1-.1-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.172 1.282c.013.06.045.094.104.094.057 0 .09-.037.104-.094l.194-1.282-.194-1.332c-.014-.057-.047-.094-.104-.094m1.848-1.18c-.063 0-.11.05-.116.11l-.209 2.496.209 2.407c.006.063.053.11.116.11.065 0 .11-.047.12-.11l.236-2.407-.236-2.496c-.01-.06-.055-.11-.12-.11m.943-.253c-.072 0-.122.055-.13.12l-.194 2.75.194 2.59c.008.063.058.12.13.12.073 0 .12-.057.132-.12l.217-2.59-.217-2.75c-.012-.065-.059-.12-.132-.12m.976-.25c-.083 0-.137.063-.145.133l-.178 2.883.178 2.682c.008.073.062.133.145.133.08 0 .136-.06.147-.133l.2-2.682-.2-2.883c-.011-.07-.067-.133-.147-.133m1.037-.081c-.09 0-.148.067-.155.143l-.163 2.964.163 2.727c.007.08.065.143.155.143.088 0 .148-.063.158-.143l.183-2.727-.183-2.964c-.01-.076-.07-.143-.158-.143m1.097-.17c-.1 0-.163.076-.17.156l-.147 3.134.147 2.76c.007.083.07.157.17.157.097 0 .163-.074.173-.157l.166-2.76-.166-3.134c-.01-.08-.076-.157-.173-.157m1.108-.06c-.108 0-.175.08-.183.168l-.131 3.194.131 2.78c.008.093.075.17.183.17.107 0 .175-.077.186-.17l.147-2.78-.147-3.194c-.011-.088-.079-.169-.186-.169m1.17-.163c-.12 0-.19.09-.197.18l-.116 3.357.116 2.798c.007.098.077.18.197.18.116 0 .19-.082.2-.18l.131-2.798-.131-3.357c-.01-.09-.084-.18-.2-.18m1.18-.054c-.127 0-.2.094-.208.19l-.1 3.412.1 2.81c.008.1.081.19.208.19s.2-.09.21-.19l.114-2.81-.114-3.412c-.01-.096-.083-.19-.21-.19m1.234-.1c-.14 0-.213.102-.22.2l-.085 3.512.085 2.815c.007.103.08.2.22.2.136 0 .213-.097.224-.2l.097-2.815-.097-3.512c-.011-.098-.088-.2-.224-.2m1.168.263c-.136 0-.225.108-.233.213l-.07 3.25.07 2.817c.008.11.097.213.233.213.133 0 .225-.103.235-.213l.078-2.817-.078-3.25c-.01-.105-.102-.213-.235-.213m1.078-.353c-.023-.152-.124-.254-.271-.254-.143 0-.248.102-.27.254l-.07 3.603.07 2.82c.022.154.127.254.27.254.147 0 .248-.1.271-.254l.078-2.82zm.973-.013c-.023-.16-.133-.27-.288-.27-.152 0-.266.11-.289.27l-.054 3.617.054 2.823c.023.163.137.27.289.27.155 0 .265-.107.288-.27l.063-2.823zM11.587 7.98c-.163 0-.282.118-.305.278l-.039 3.72.039 2.809c.023.163.142.278.305.278.16 0 .282-.115.307-.278l.044-2.809-.044-3.72c-.025-.16-.147-.278-.307-.278m1.07-.647c-.17 0-.295.125-.319.29l-.022 4.367.022 2.806c.024.168.149.29.319.29.168 0 .295-.122.32-.29l.026-2.806-.026-4.367c-.025-.165-.152-.29-.32-.29m1.072-.157c-.175 0-.307.13-.332.3l-.007 4.524.007 2.798c.025.17.157.3.332.3.174 0 .307-.13.333-.3l.008-2.798-.008-4.524c-.026-.17-.159-.3-.333-.3m1.17 1.053c.007-.178-.133-.31-.316-.31-.18 0-.32.132-.345.31l-.003 3.628.007 2.793c.025.177.165.308.345.308.18 0 .309-.131.316-.308l.007-2.793zm.871-.623c-.2 0-.34.143-.356.325v.01l-.01 4.243.01 2.786c.016.177.156.322.356.322.193 0 .34-.145.356-.325l.01-2.783-.01-4.25c-.016-.18-.163-.325-.356-.328m2.59 1.498c-.146 0-.282.023-.412.066-.1-1.135-.99-2.02-2.09-2.02-.278 0-.548.055-.8.153-.094.037-.12.075-.12.15v7.293c0 .078.06.145.135.155l.015.001h3.272c.972 0 1.76-.81 1.76-1.808 0-.997-.788-1.808-1.76-1.808" />
    </svg>
  );
}

function AppleMusicIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      width="28"
      height="28"
    >
      <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.8.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.034 1.57-.1.823-.106 1.597-.35 2.296-.81a5.046 5.046 0 001.88-2.164c.276-.588.417-1.217.489-1.862.063-.57.087-1.14.09-1.71.002-.646 0-1.29 0-1.936V6.124zm-7.27 13.35c-.39.187-.797.323-1.226.388-.476.073-.954.065-1.432.013-.3-.032-.594-.1-.882-.196-1.23-.413-1.98-1.246-2.24-2.524a4.16 4.16 0 01-.063-.803c.02-.676.217-1.292.646-1.822.478-.588 1.1-.95 1.833-1.13.46-.113.932-.155 1.405-.16.33-.002.66.023.99.06V9.4c0-.127-.01-.252-.042-.376-.035-.132-.117-.218-.25-.245-.106-.022-.216-.025-.324-.013-.163.018-.327.04-.49.066L9.7 9.796c-.103.017-.19.06-.254.15-.047.067-.07.145-.073.227-.005.15-.003.3-.003.45v8.473c0 .24-.018.48-.064.716-.094.474-.29.903-.63 1.27-.438.47-.985.726-1.602.86-.43.092-.866.12-1.305.088-.354-.026-.7-.092-1.032-.225-1.07-.43-1.662-1.22-1.81-2.366a3.3 3.3 0 01.1-1.353c.26-.826.79-1.416 1.548-1.798.462-.233.958-.35 1.47-.393.355-.03.71-.015 1.063.03V8.16c0-.34.04-.674.142-.998.128-.41.376-.72.764-.907.21-.1.435-.16.666-.195.31-.047.623-.063.937-.103l3.48-.452c.5-.065 1-.132 1.502-.193.263-.033.527-.052.793-.035.387.024.72.17.972.488.167.21.253.46.29.728.022.15.034.3.034.452V18.2c0 .247-.02.494-.066.738-.093.49-.3.93-.65 1.3-.44.47-.987.73-1.606.862-.1.02-.2.036-.3.054l-.05.008z" />
    </svg>
  );
}

function AmazonMusicIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      width="28"
      height="28"
    >
      <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685zm3.186 7.705c-.209.189-.512.201-.748.074-1.051-.872-1.238-1.276-1.814-2.106-1.735 1.767-2.962 2.297-5.209 2.297-2.66 0-4.731-1.641-4.731-4.925 0-2.565 1.391-4.309 3.37-5.164 1.715-.754 4.11-.891 5.942-1.095v-.41c0-.753.058-1.642-.383-2.294-.385-.579-1.124-.82-1.775-.82-1.205 0-2.277.618-2.54 1.897-.054.285-.261.567-.549.582l-3.061-.33c-.259-.058-.548-.266-.472-.66C6.057 1.926 9.311.5 12.229.5c1.49 0 3.439.397 4.615 1.525 1.49 1.392 1.349 3.252 1.349 5.275v4.775c0 1.435.595 2.065 1.155 2.839.196.278.24.611-.01.819-.623.52-1.731 1.49-2.34 2.034l-.001.002-.854.026zM21.483 20.36C19.025 22.19 15.41 23.5 12.255 23.5c-4.475 0-8.508-1.655-11.554-4.41-.24-.217-.025-.514.263-.345 3.29 1.915 7.36 3.066 11.564 3.066 2.834 0 5.951-.587 8.822-1.805.433-.182.796.286.133.354z" />
    </svg>
  );
}

const platforms = [
  {
    name: "Spotify",
    description: "Ecouter en streaming",
    href: "https://open.spotify.com/artist/4NcNxqo5fOC2RGY2Jrx0On",
    accent: "#1DB954",
    customIcon: "spotify",
  },
  {
    name: "Apple Music",
    description: "Acheter sur iTunes",
    href: "https://itunes.apple.com/fr/artist/ricoune/id78593832",
    accent: "#FC3C44",
    customIcon: "apple",
  },
  {
    name: "Amazon Music",
    description: "Acheter sur Amazon",
    href: "https://www.amazon.fr/s?k=ricoune",
    accent: "#00A8E1",
    customIcon: "amazon",
  },
  {
    name: "YouTube",
    description: "Regarder les clips",
    href: "https://www.youtube.com/channel/UC49kjqlusTVhH7hL_fT3MDg",
    accent: "#FF0000",
    icon: "youtube",
  },
  {
    name: "Soundcloud",
    description: "Ecouter sur Soundcloud",
    href: "https://soundcloud.com/ricouneofficial",
    accent: "#FF5500",
    customIcon: "soundcloud",
  },
];

function PlatformIcon({ platform }: { platform: (typeof platforms)[number] }) {
  if (platform.customIcon === "spotify") return <SpotifyIcon />;
  if (platform.customIcon === "apple") return <AppleMusicIcon />;
  if (platform.customIcon === "amazon") return <AmazonMusicIcon />;
  if (platform.customIcon === "soundcloud") return <SoundcloudIcon />;
  if (platform.icon === "youtube") return <Youtube size={28} />;
  return <Music size={28} />;
}

export default function BoutiquePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[40vh] items-center justify-center bg-gradient-to-b from-dark-light to-dark">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-primary-dark)_0%,_transparent_70%)] opacity-20" />
        <div className="relative text-center">
          <h1 className="text-5xl font-bold tracking-wider text-white md:text-7xl">
            Boutique
          </h1>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-primary" />
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <AnimatedSection>
          <p className="mb-12 text-center text-xl text-gray-300">
            Retrouvez toute la musique de Ricoune sur vos plateformes preferees
          </p>
        </AnimatedSection>

        {/* Platform cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((platform, index) => (
            <AnimatedSection key={platform.name} delay={index * 0.1}>
              <a
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center rounded-xl border border-dark-lighter bg-dark-light p-8 text-center transition-all hover:scale-[1.02] hover:shadow-xl"
                style={
                  {
                    "--platform-color": platform.accent,
                  } as React.CSSProperties
                }
              >
                <div
                  className="mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-colors"
                  style={{
                    backgroundColor: `${platform.accent}15`,
                    color: platform.accent,
                  }}
                >
                  <PlatformIcon platform={platform} />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">
                  {platform.name}
                </h3>
                <p className="mb-4 text-sm text-gray-400">
                  {platform.description}
                </p>
                <span
                  className="flex items-center gap-1 text-sm font-medium transition-colors"
                  style={{ color: platform.accent }}
                >
                  Ouvrir
                  <ExternalLink size={14} />
                </span>
              </a>
            </AnimatedSection>
          ))}
        </div>

        {/* Featured Albums */}
        <AnimatedSection delay={0.3} className="mt-20">
          <h2 className="mb-8 text-center text-3xl font-bold text-white">
            Discographie
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {albums.map((album) => (
              <Link
                key={album.slug}
                href={`/albums/${album.slug}`}
                className="group rounded-lg border border-dark-lighter bg-dark-light p-4 transition-all hover:border-primary/30 hover:shadow-lg"
              >
                <div className="mb-3 flex aspect-square items-center justify-center rounded-md bg-dark-lighter transition-colors group-hover:bg-primary/10">
                  <Disc3
                    size={48}
                    className="text-gray-600 transition-colors group-hover:text-primary"
                  />
                </div>
                <h3 className="text-sm font-semibold text-white line-clamp-2">
                  {album.title}
                </h3>
                <p className="mt-1 text-xs text-gray-400">{album.year}</p>
                <span className="mt-2 inline-block text-xs font-medium text-primary">
                  Decouvrir
                </span>
              </Link>
            ))}
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
