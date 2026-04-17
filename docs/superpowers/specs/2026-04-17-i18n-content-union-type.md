# Spec — i18n ContentItem union type refactor

**Date:** 2026-04-17  
**Status:** Approved — implementing

## Objective

Replace flat key/value translation strings in `legal`, `privacy`, and `formules` sections with structured arrays, enabling dynamic rendering via `map()` and eliminating all hardcoded text from components.

## ContentItem union type

```ts
export type ContentItem =
  | string
  | { text: string; link: { href: string; label: string }; className?: string }
  | { list: { label: string; items: string[] } };
```

- `string` → plain `<p>` paragraph
- `{ text, link }` → paragraph with inline styled `<a>` (email or URL)
- `{ list }` → label + `<ul>` bullet list
- `className?` → optional CSS class on the paragraph (used for `mt-1` on hosting address)

## New Translations interface sections

```ts
legal: {
  title: string;
  sections: { title: string; content: ContentItem[] }[];
};

privacy: {
  title: string;
  sections: { title: string; content: ContentItem[] }[];
};

formules: {
  title: string;
  quote: string;
  cta: string;
  ctaGlobal: string;
  offers: { title: string; features: ContentItem[] }[];
};
```

## Keys removed

- `legal`: `editor`, `publication`, `hosting`, `hostingBuiltWith`, `hostingAnd`, `hostingCountry`, `intellectual`, `intellectualContent`, `responsibility`, `responsibilityContent`, `externalLinks`, `externalLinksContent`
- `privacy`: all flat `collection`/`collectionContent`/`data`/... pairs + `cookiesTypeList`, `cookiesTypes`, `cookiesChoice`, `cookiesNoAds`, etc.
- `formules`: `fullOffer`, `showcase`, `fullItems`, `showcaseItems`, `technicalSheet`

## Component rendering

### Legal / Privacy — shared `renderItem` helper (inline per component)

```tsx
function renderItem(item: ContentItem, idx: number): React.ReactNode {
  if (typeof item === "string") return <p key={idx}>{item}</p>;
  if ("list" in item) return (
    <div key={idx}>
      <p className="mb-2">{item.list.label}</p>
      <ul className="mb-4 list-disc pl-6">
        {item.list.items.map((li) => <li key={li}>{li}</li>)}
      </ul>
    </div>
  );
  return (
    <p key={idx} className={item.className}>
      {item.text}{" "}
      <a href={item.link.href}
         target={item.link.href.startsWith("mailto:") ? undefined : "_blank"}
         rel="noopener noreferrer"
         className="text-rc-yellow underline transition-colors duration-200 hover:text-rc-yellow/80">
        {item.link.label}
      </a>
    </p>
  );
}
```

### Formules — own rendering (check icon + conditional link)

```tsx
{typeof feature === "string"
  ? feature
  : <a href={feature.link.href} target="_blank" rel="noopener noreferrer" className="text-rc-yellow underline">{feature.link.label}</a>}
```

## Files changed

| File | Change |
|---|---|
| `src/locales/fr.ts` | Interface + FR data for legal/privacy/formules |
| `src/locales/en.ts` | EN data for legal/privacy/formules |
| `src/app/mentions-legales/MentionsLegalesContent.tsx` | `sections.map()` + `renderItem` |
| `src/app/politique-confidentialite/PrivacyContent.tsx` | `sections.map()` + `renderItem` |
| `src/app/professionnels/formules/page.tsx` | `offers.map()` + `features.map()` |

## Constraints

- Zero CSS changes
- Zero routing changes
- Visual output strictly identical
- No new pages or components
