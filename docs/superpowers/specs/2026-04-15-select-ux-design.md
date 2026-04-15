# Design spec — Amélioration UX des selects (menus déroulants)

**Date :** 2026-04-15  
**Statut :** Validé  

---

## Contexte et objectif

Le site Ricoune V3 (Next.js / React / Tailwind / Headless UI) comporte deux
formulaires avec des menus déroulants de type `Listbox` (Headless UI) :

- `src/components/contact/ContactForm.tsx` — champ "Type d'événement" (optionnel)
- `src/app/professionnels/demande-de-devis/page.tsx` — champ "Type d'événement" (requis)

Les deux instances partagent exactement les mêmes classes CSS, copiées-collées.
Il n'existe pas de composant partagé.

**Trois lacunes identifiées :**
1. Hover trop discret (`bg-white/10` quasi invisible sur fond `#1e2433`)
2. Focus clavier absent — aucun style `data-[focus]` sur les options
3. Pas de séparateur visuel entre les items

L'objectif est une amélioration discrète et homogène, sans refonte visuelle,
via un composant partagé qui garantit la cohérence dans le temps.

---

## Architecture

### Nouveau composant partagé

**Emplacement :** `src/components/ui/SelectField.tsx`

Ce composant encapsule le pattern Listbox complet (bouton + dropdown + options)
avec les styles améliorés centralisés. Il est utilisé en remplacement du bloc
Listbox dans les deux formulaires.

**Aucun autre fichier de style n'est créé.** Les classes restent inline dans
le composant, conformément à la convention Tailwind existante du projet.

### Fichiers impactés

| Fichier | Nature de la modification |
|---|---|
| `src/components/ui/SelectField.tsx` | **Nouveau** — composant partagé |
| `src/components/contact/ContactForm.tsx` | Remplacement du bloc Listbox (~25 lignes) par `<SelectField>` |
| `src/app/professionnels/demande-de-devis/page.tsx` | Remplacement du bloc Listbox (~25 lignes) par `<SelectField>` |

Les imports Listbox/ChevronDown/Check sont supprimés des fichiers consommateurs.

---

## Composant SelectField

### Interface

```tsx
interface SelectFieldProps {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;      // texte si aucune valeur (défaut : "-- Sélectionnez --")
  allowEmpty?: boolean;       // ajoute une option vide en tête de liste (défaut : false)
  emptyLabel?: string;        // label de l'option vide (défaut : "-- Optionnel --")
  "aria-labelledby"?: string; // pour l'accessibilité
}
```

### Améliorations CSS appliquées

**Bouton (`ListboxButton`) — ajout focus clavier :**
```
focus-visible:ring-2 focus-visible:ring-rc-yellow/40 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent
```
Le border `focus:border-rc-yellow` existant est conservé.

**Option item (`ListboxOption`) — diff vs. état actuel :**

| État | Avant | Après |
|---|---|---|
| Hover | `hover:bg-white/10 hover:text-white` | `hover:bg-white/[0.12] hover:text-white` |
| Focus clavier | *(absent)* | `data-[focus]:bg-rc-blue/20 data-[focus]:text-white` |
| Séparateur | *(absent)* | `border-b border-white/[0.05] last:border-0` |
| Sélectionné | `data-[selected]:bg-rc-yellow/10 data-[selected]:text-rc-yellow` | identique |

L'option vide (quand `allowEmpty=true`) a les mêmes états hover/focus avec
`text-white/40` par défaut (placeholder grisé).

### Comportement

- Rendu **strictement identique** au rendu actuel hors états interactifs
- Transition d'ouverture conservée (`scale-y-95 → 100, opacity-0 → 100`)
- `ChevronDown` rotation conservée au survol de `data-[open]`
- Compatible clavier : Tab → focus bouton, Entrée/Espace → ouvre, Flèches → navigue, Entrée → sélectionne, Échap → ferme

---

## Intégration dans les formulaires

### ContactForm — avant/après (pseudo-code)

```tsx
// AVANT (~25 lignes de Listbox)
<Listbox value={formData.type_evenement} onChange={(v) => updateField(...)}>
  ...bloc complet...
</Listbox>

// APRÈS (5 lignes)
<SelectField
  value={formData.type_evenement}
  onChange={(v) => updateField("type_evenement", v)}
  options={EVENT_TYPES}
  allowEmpty
  aria-labelledby="type_evenement-label"
/>
```

### Devis — avant/après (pseudo-code)

```tsx
// AVANT (~25 lignes de Listbox)
<Listbox value={formData.typeEvenement} onChange={handleEventTypeChange}>
  ...bloc complet...
</Listbox>

// APRÈS (5 lignes)
<SelectField
  value={formData.typeEvenement}
  onChange={handleEventTypeChange}
  options={EVENT_TYPES}
  aria-labelledby="typeEvenement-label"
/>
```

---

## Contraintes respectées

- Structure des formulaires non modifiée (labels, grilles, order des champs)
- `INPUT_CLASS` / `INPUT_CLASSES` des champs texte non touchés
- Champs radio "Formule souhaitée" non touchés
- Un seul composant, pas de variantes
- Pas de nouvelles dépendances

---

## Critères de validation

- [ ] Rendu visuel desktop identique au rendu actuel (hors états interactifs)
- [ ] Hover légèrement plus visible que l'actuel
- [ ] Option active au clavier clairement mise en évidence
- [ ] Séparateurs à peine visibles entre items
- [ ] Ring focus visible sur le bouton à la navigation clavier
- [ ] Aucune régression sur mobile (dropdown positionné correctement)
- [ ] Aucune régression fonctionnelle (sélection, reset, soumission du formulaire)
