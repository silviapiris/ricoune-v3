'use client';

import { Turnstile } from '@marsidev/react-turnstile';

export default function TurnstileWidget() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!siteKey) {
    return (
      <p
        role="alert"
        className="rounded border border-red-900/50 bg-red-950/50 px-4 py-2.5 text-center text-sm text-red-400"
        style={{ fontFamily: 'var(--font-raleway)' }}
      >
        Erreur de configuration : cle Turnstile manquante.
      </p>
    );
  }

  return (
    <div className="my-4 flex justify-center">
      <Turnstile
        siteKey={siteKey}
        options={{ theme: 'dark', language: 'fr' }}
      />
    </div>
  );
}
